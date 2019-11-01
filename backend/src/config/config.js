import convict from 'convict';

const configSchema = {
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
    env: 'PORT',
    arg: 'port'
  },
  database: {
    host: {
      doc: 'Database hostname / IP.',
      format: '*',
      default: 'mongodb://127.0.0.1/'
    },
    name: {
      doc: 'Database name.',
      format: String,
      default: 'project_access'
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
