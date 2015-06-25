'use strict';

describe('Service: ImageListService', function () {

  // load the service's module
  beforeEach(module('dockuiApp'));

  // instantiate service
  var ImageListService;
  beforeEach(inject(function (_ImageListService_) {
    ImageListService = _ImageListService_;
  }));

  it('should do something', function () {
    expect(!!ImageListService).toBe(true);
  });

});
