'use strict';

describe('Service: AgentConfigService', function () {

  // load the service's module
  beforeEach(module('dockuiApp'));

  // instantiate service
  var AgentConfigService;
  beforeEach(inject(function (_AgentConfigService_) {
    AgentConfigService = _AgentConfigService_;
  }));

  it('should do something', function () {
    expect(!!AgentConfigService).toBe(true);
  });

});
