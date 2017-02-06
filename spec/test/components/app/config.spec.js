describe('app: config', function() {
  beforeEach(module('webApp'));

  describe('factory: config', function() {
    var config = null;
    beforeEach(inject(function(appConfig) {
      config = appConfig;
    }));
  });
});