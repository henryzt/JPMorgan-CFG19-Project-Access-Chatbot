# Interop

Team 14

## Initial User Registration

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
    currentSubjects: List<Subject>;
    estimatedGrades: List<EstimatedGrade>;
    homeCountry: CountryName;
    // If empty target countries -> any target country is acceptable.
    targetCountries: List<CountryName>;
    age: uint;
    acceptableFinanceRange: Range;
}

type Subject = string;
type CountryName = string;

interface EstimatedGrade {
    subject: Subject;
    gradeType: EducationType;
    letterGrade: string;
}

type EducationType = "IB" | "A-Level" | "SAT" | "other";

// Required: lower < upper
interface Range {
    lower: uint;
    upper: uint;
}
```

## Provided REST API Endpoints

Note `${queryParameter}` is required to be filled in.

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

### University Info

#### Request University Info

`GET /university/${univerityName}`

#### Returns

`200 OK` in JSON format (`UniversityInfo`):

```typescript
interface UniversityInfo {
    universityName: string;
    country: string;
    availableSponsorships: List<SponsorshipInfo>;
}
```

```typescript
interface CourseInfo {
    courseName: string;
    // Recognized entry requirements
    entryRequirements: List<EntryRequirement>;
    financeRequirements: FinanceRequirement;
    requiresInterview: boolean;
    requiresAdditionalExams: boolean;
}

interface EntryRequirement {
    educationType: EducationType;
    minimumGrades: List<Grade>;
}

type EducationType = "IB" | "A-Level" | "SAT" | "other";

interface FinanceRequirement {
    courseAnnualFee: uint;
}

interface SponsorshipInfo {
    sponsorshipName: string;
    deductionAmount: uint;
    details: string;
}
```
