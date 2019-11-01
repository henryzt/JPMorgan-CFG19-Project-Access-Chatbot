# Interop

Team 14

Note url query parameters `${queryParameter}` are required to be filled in.

## Register User with Information

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
    acceptableFinanceRange: Range;
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
interface Range {
    lower: uint;
    upper: uint;
}
```

### Request Supported Universities

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

### Get Course Information (for a Specific University)

Get info for a course for a specified university.

`GET /university/${universityName}/course/${couseName}`

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
