const registerUser = persistenceHandler => async ({
  highestEducation,
  subjects,
  grades,
  homeCountry,
  targetCountries,
  age,
  acceptableFinanceRange
}) => {
  return persistenceHandler({
    highestEducation,
    subjects,
    grades,
    homeCountry,
    targetCountries,
    age,
    acceptableFinanceRange
  });
};

export default registerUser;
