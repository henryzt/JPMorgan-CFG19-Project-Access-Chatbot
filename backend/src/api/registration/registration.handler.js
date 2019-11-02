import registerUser from './registration.persistence';

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

const createRegistrationHandler = persistenceHandler => async (request, response) => {
  const [status, data] = await registerUser(persistenceHandler)(request.body);

  switch (status) {
    case 'success': {
      response.status(201);
      response.json(data);
      break;
    }
    case 'bad-request': {
      response.status(400);
      response.json({
        errorType: '@error/bad-request'
      });
      break;
    }
    default: {
      response.status(500);
      response.json({
        errorType: '@error/internal-server-error'
      });
    }
  }
};

export { createRegistrationHandler, RegistrationInfoSchema };
