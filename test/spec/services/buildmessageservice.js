'use strict';

describe('Service: BuildMessageService', function () {

  // load the service's module
  beforeEach(module('dockuiApp'));

  // instantiate service
  var BuildMessageService;
  beforeEach(inject(function (_BuildMessageService_) {
    BuildMessageService = _BuildMessageService_;
  }));

  it('should do something', function () {
    expect(!!BuildMessageService).toBe(true);
  });

});
