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

The `POST /register` API will accept the following JSON. Some `List<string>`s
can be empty, but none of the attributes may be missing.

```typescript
interface UserInfo {
    highestEducation: EducationType;
    currentSubjects: List<Subject>;
    homeCountry: CountryName;
    // If empty target countries -> any target country is acceptable.
    targetCountries: List<CountryName>;
    estimatedGrades: List<EstimatedGrade>;
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

## Required Data from Data Collectors

- Entry requirements:
    - Minimum grade (typical grade).
    - Recognised education types (e.g. IB / A-Level / other).
    - Language requirements:
        - For each country:
            - Recognized language exam
            - Minimum language exam grade requirement
    - Interview requirements.
- Finance requirements:
    - Course fees
    - Available sponsorships
- Visa requirements:
    - For each country.
