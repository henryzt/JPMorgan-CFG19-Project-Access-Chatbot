import convict from 'convict';

const configSchema = {
  env: {
    doc: 'Application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  ip: {
    doc: 'Server IP address to bind to.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS'
  },
  port: {
    doc: 'Port for server to handle requests from.',
    format: 'port',
    default: 8080,
    env: 'PORT'
  },
  database: {
    host: {
      doc: 'Database hostname / IP.',
      format: '*',
      default: 'mongodb://127.0.0.1/',
      env: 'DB_HOST'
    },
    databaseName: {
      doc: 'Database name.',
      format: String,
      default: 'project_access',
      env: 'DB_NAME'
    },
    userName: {
      doc: 'MongoDB user name.',
      format: String,
      env: 'DB_USERNAME'
    },
    password: {
      doc: 'MongoDB password.',
      format: '*',
      sensitive: true,
      env: 'DB_PASSWORD'
    },
    poolSize: {
      doc: 'Number of simulatenous connections.',
      format: 'nat',
      default: 4
    }
  },
  logging: {
    doc: 'Log file settings.',
    fileName: {
      doc: 'Name of log file.',
      format: String,
      default: 'access.log',
      env: 'LOG_FILE_NAME'
    },
    basePath: {
      doc: 'Base path of log file.',
      format: String,
      default: `log`,
      env: 'LOG_BASE_PATH'
    },
    interval: {
      doc: 'How long before log file is rotated.',
      format: String,
      default: '1d',
      env: 'LOG_INTERVAL'
    },
    fileSize: {
      doc: 'How large before log file is rotated.',
      format: String,
      default: '10M',
      env: 'LOG_FILE_SIZE'
    },
    compressionMethod: {
      doc: 'How is the log file compressed.',
      format: ['gzip'],
      default: 'gzip',
      env: 'LOG_COMPRESSION'
    }
  }
};

const config = convict(configSchema);

// Load configuration file. Default location:
// '${PROJECT_ROOT}/config/config.json'
config.loadFile('../config/config.json');

// Validate configuration file.
config.validate({ allowed: 'strict' });

export default config;
