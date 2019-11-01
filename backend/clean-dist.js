const rimraf = require('rimraf');

rimraf('dist', () => {
  console.log('dist');
});
