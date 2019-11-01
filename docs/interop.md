# Interop

Team 14

## Information API

Note url query parameters `${queryParameter}` are required to be filled in.

### User Registration

#### Register a New User

A `User` should supply the following information:

- Current subjects (`List<Subject>`, `Subject: string`).
- Home Country (`HomeCountry: string`).
- Target Country (`TargetCountry: Optional<string>`).
- Estimated Grade (`Grade: string`).
- Age (`Age: { x : int | 0 < x <= 100 }`).
- Finance range (`FinanceRange: (lowerBound: int, higherBound: int)`).
- High School education type (`EducationType: string`), e.g. `'IB', 'A-Level'`.

The `POST /register` API will accept the `UserInfo` JSON. Some `List<string>`s
can be empty, but none of the attributes may be missing.

```typescript
interface UserInfo {
    highestEducation: EducationType;
    subjects: List<Subject>;
    // Either estimated, predicted or actual grades (after exams)
    grades: List<GradeInfo>;
    homeCountry: CountryName;
    // If empty target countries -> any target country is acceptable.
    targetCountries: List<CountryName>;
    age: uint;
    acceptableFinanceRange: FinanceRange;
}

type Subject = string;
type CountryName = string;

interface GradeInfo {
    subject: Subject;
    grade: Grade;
}

type Grade = string;

type EducationType = "IB" | "A-Level" | "SAT" | "other";

// Required: lower < upper
interface FinanceRange {
    lower: uint;
    upper: uint;
}
```

#### Returns

`201 Created` on success. Returns a `AccountInfo` JSON response:

```typescript
interface AccountInfo {
    userId: uint;
}
```

When using the `GET /match` endpoint, the `userId` is a required parameter
so we can track which user is who.

`400 Bad Request` on malformed request.

### Supported Universities

#### Request Supported Universities

`GET /universities`

#### Returns

`200 OK` in JSON format (`SupportedUniversities`):

```typescript
interface SupportedUniversities {
    supportedUniversities: List<UniversityInfo>
}

interface UniversityInfo {
    universityName: string;
    country: string;
}
```

### University Information

#### Request University Information

`GET /university/${univerityName}`

#### Returns

`200 OK` in JSON format (`UniversityInfo`):

```typescript
interface UniversityInfo {
    universityName: string;
    country: string;
    availableSponsorships: List<SponsorshipInfo>;
}

interface SponsorshipInfo {
    sponsorshipName: string;
    deductionAmount: uint;
    details: string;
}
```

### Course Information (for a Specific University)

#### Request Course Information

Get info for a course for a specified university.

`GET /university/${universityName}/course/${couseName}`

#### Returns

`200 OK` with `CourseInfo` JSON.

```typescript
interface CourseInfo {
    universityName: string;
    courseName: string;
    qualificationType: QualificationType;
    // Recognized entry requirements
    entryRequirements: List<EntryRequirement>;
    financeRequirements: FinanceRequirement;
    requiresInterview: boolean;
    requiresEntranceTests: boolean;
    entranceTests: List<EntranceTestInfo>;
}

type QualificationType = "Bachelors" | "Masters" | "other";

interface EntryRequirement {
    educationType: EducationType;
    minimumGrades: List<GradeInfo>;
}

type EducationType = "IB" | "A-Level" | "SAT" | "other";

interface GradeInfo {
    courseOrComponentName: string;
    minimumGrade: Grade;
};

type Grade = string;

interface FinanceRequirement {
    courseAnnualFee: uint;
}

interface EntranceTestInfo {
    testName: string;
    minimumGrades: List<GradeInfo>;
}
```

## Match API

The Match API provides user tailored university and course recommendation.
Based on the returned university and course, the API consumer can present this 
information to the end user in a easy-to-comprehend manner.

### Match Universities

Send an `AccountInfo` JSON to `GET /match/university`:

```typescript
interface AccountInfo {
    userId: uint;
}
```

#### Returns

`200 OK` with `MatchedUniversitiesInfo` response:

```typescript
interface MatchedUniversitiesInfo {
    matchedUniversities: List<UniversityInfo>
}

interface UniversityInfo {
    universityName: string;
    country: string;
}
```

The API consumer can use the `UniversityInfo` to fetch their corresponding
information with the Information API.

### Match Major

This is for a generic major, e.g. "Computer Science", not necessarily tied to
a particular university or qualification type.

Send an `AccountInfo` JSON to `GET /match/majors`:

```typescript
interface AccountInfo {
    userId: uint;
}
```

#### Returns

`200 OK` with `MatchedMajorsInfo` response:

```typescript
interface MatchedMajorsInfo {
    matchedMajors: List<MajorInfo>;
}

interface MajorInfo {
    majorName: string;
}
```

### Match Course

This is for a specific University's specific course, e.g. 
`UCL BSc Computer Science`.

Send an `AccountInfo` JSON to `GET /match/courses`:

#### Returns

`200 OK` with `MatchedCoursesInfo` response.

```typescript
interface MatchedCoursesInfo {
    matchedCourses: List<CourseInfo>;
}

interface CourseInfo {
    courseName: string;
    qualificationType: QualificationType;
    universityName: string;
}

type QualificationType = "Bachelors" | "Masters" | "other";
```
