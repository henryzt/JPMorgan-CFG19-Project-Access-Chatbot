const MockUsers = [
  {
    userId: 1,
    personalInfo: {
      highestEducation: 'IB',
      subjects: ['Chemistry HL', 'Mathematics HL', 'English SL'],
      grades: [
        { subject: 'Chemistry HL', grade: 'F' },
        { subject: 'Mathematics HL', grade: 'C' },
        { subject: 'English HL', grade: 'A' }
      ],
      homeCountry: "People's Republic of China",
      targetCountries: ['United Kingdom', 'United States of America'],
      age: 18,
      acceptableFinanceRange: {
        lower: 0,
        upper: 100000
      }
    }
  }
];

const MockUniversities = [
  {
    universityName: 'University College London',
    country: 'United Kingdom'
  }
];

const InMemoryDatabase = {
  data: {
    uuid: 1,
    users: MockUsers,
    universities: MockUniversities,
    unversityCourseInfo: []
  }
};

const registerHandler = db => async ({
  highestEducation,
  subjects,
  grades,
  homeCountry,
  targetCountries,
  age,
  acceptableFinanceRange
}) => {
  const newUser = {
    highestEducation,
    subjects,
    grades,
    homeCountry,
    targetCountries,
    age,
    acceptableFinanceRange
  };

  // eslint-disable-next-line
  db.data.uuid += 1;
  const { uuid } = db.data;

  db.data.users.push({
    userId: uuid,
    personalInfo: { ...newUser }
  });

  return ['success', uuid];
};

const getSupportedUniversitiesHandler = db => async () => {
  return ['success', db.data.universities.map(universityInfo => universityInfo.universityName)];
};

export { InMemoryDatabase, registerHandler, getSupportedUniversitiesHandler };
