/* eslint-disable no-unused-vars */
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

const InMemoryDatabase = {
  data: {
    uuid: 1,
    users: MockUsers,
    universityCourseInfo: {}
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
  return ['success', Object.keys(db.data.universityCourseInfo)];
};

const universityNameMatches = universityName => ([name, _value]) =>
  name.toLowerCase().trim() === universityName.toLowerCase().trim();

const getUniversityInfoHandler = db => async universityName => {
  const entries = Object.entries(db.data.universityCourseInfo);

  return ['success', entries.filter(universityNameMatches(universityName))];
};

const courseNameMatches = targetCourseName => ([courseName]) =>
  targetCourseName &&
  courseName &&
  targetCourseName.toLowerCase().trim() === courseName.toLowerCase().trim();

const getCourseInfoHandler = db => async ({ targetUniversityName, targetCourseName }) => {
  const universityEntries = Object.entries(db.data.universityCourseInfo);
  const [[universityName, courses]] = universityEntries.filter(
    universityNameMatches(targetUniversityName)
  );

  const course = courses ? courses.filter(courseNameMatches(targetCourseName)) : [];

  const [[courseName, qualificationType, duration, score]] = course;

  return ['success', { universityName, courseName, qualificationType, duration, score }];
};

const getRankedCoursesHandler = db => async () => {
  const universityEntries = Object.entries(db.data.universityCourseInfo);
  const nonNullUniversityEntries = universityEntries.filter(([_, courseInfo]) => {
    return courseInfo !== null;
  });

  const sortUniversityCourses = courseInfo =>
    courseInfo.sort((a, b) => {
      const [_a1, _a2, _a3, scoreA] = a;
      const [_b1, _b2, _b3, scoreB] = b;

      if (scoreA > scoreB) return -1;
      if (scoreA < scoreB) return 1;
      return 0;
    });

  const orderedCourseUniversityEntries = nonNullUniversityEntries.map(
    ([universityName, courseInfo]) => {
      return {
        universityName,
        courseInfo: sortUniversityCourses(courseInfo)
      };
    }
  );

  // We retain the highest ranked course of each university.
  const highestCourseUniversities = orderedCourseUniversityEntries.map(
    ({ universityName, courseInfo }) => {
      const [courseName, qualificationType, duration, rating] = courseInfo[0];
      return {
        universityName,
        course: { courseName, qualificationType, duration, rating }
      };
    }
  );

  const universitiesSortedByCourse = highestCourseUniversities.sort((a, b) => {
    if (a.course.rating > b.course.rating) return -1;
    if (a.course.rating < b.course.rating) return 1;
    return 0;
  });

  const topThreeCourses = universitiesSortedByCourse.slice(0, 3);

  return ['success', topThreeCourses];
};

export {
  InMemoryDatabase,
  registerHandler,
  getSupportedUniversitiesHandler,
  getUniversityInfoHandler,
  getCourseInfoHandler,
  getRankedCoursesHandler
};
