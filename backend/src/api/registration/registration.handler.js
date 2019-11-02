const RegistrationInfoSchema = {
  type: 'object',
  properties: {
    highestEducation: {
      type: 'string',
      enum: ['IB', 'A-Level', 'SAT', 'Other'],
      required: true
    },
    subjects: {
      type: 'array',
      items: {
        type: 'string'
      },
      required: true
    },
    grades: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          subject: {
            type: 'string',
            required: true
          },
          grade: {
            type: 'string',
            required: true
          }
        }
      },
      required: true
    },
    homeCountry: {
      type: 'string',
      required: true
    },
    targetCountries: {
      type: 'array',
      items: {
        type: 'string'
      },
      required: true
    },
    age: {
      type: 'integer',
      minimum: 1,
      required: true
    },
    acceptableFinanceRange: {
      type: 'object',
      properties: {
        lower: {
          type: 'integer',
          minimum: 0,
          required: true
        },
        upper: {
          type: 'integer',
          minimum: 0,
          required: true
        }
      },
      required: true
    }
  }
};

const registrationHandler = (request, response) => {
  response.status(200);
  response.json(request.body);
};

export { registrationHandler, RegistrationInfoSchema };
