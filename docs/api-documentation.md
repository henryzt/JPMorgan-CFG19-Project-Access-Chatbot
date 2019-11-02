# API Documentation

Code for Good Team 14

Two API categories:

1. Information API
    - Request info about courses, universities and majors.
2. Match API
    - Request a match to universities, majors and courses.

## Information API

Main endpoints:

- User registration: `POST /register`
- Get supported university: `GET /supportedUniversities`
- Get university info: `GET /university/${universityName}`
- Get course info: `GET /university/${universityName}/course/${courseName}`

Note url query parameters `${queryParameter}` are required to be filled in.

### User Registration

#### Register a New User

The `POST /register` API will accept the `RegistrationInfo` JSON.

```typescript
interface RegistrationInfo {
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

type EducationType = "IB" | "A-Level" | "SAT" | "other";

type Subject = string;

interface GradeInfo {
    subject: Subject;
    grade: Grade;
}

type Grade = string;

type CountryName = string;

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

`GET /supportedUniversities`

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
		duration: uint;   	
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

Main endpoints:

- Match universities: `GET /match/universities`
- Match majors: `GET /match/majors`
- Match courses: `GET /match/courses`

### Match Universities

Send an `AccountInfo` JSON to `GET /match/universities`:

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
