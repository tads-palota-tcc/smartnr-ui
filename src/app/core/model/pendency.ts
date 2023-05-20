export class PendencyCreationRequest {
  responsible = new UserRequest();
  description = '';
  action = '';
  deadLine = new Date();
  status: 'STARTED' | 'COMPLETED' | 'CANCELED' = 'STARTED';
  cost = 0;
  type: 'MANDATORY' | 'RECOMMENDATION' | 'OPTIONAL' = 'MANDATORY';
  inspection = new InspectionRequest();
}

export class PendencyResponse {
  id = 0;
  author = new UserResponse();
  responsible = new UserResponse();
  description = '';
  action = '';
  openedAt = new Date();
  deadLine = new Date();
  type: 'MANDATORY' | 'RECOMMENDATION' | 'OPTIONAL' = 'MANDATORY';
  status: 'STARTED' | 'COMPLETED' | 'CANCELED' = 'STARTED';
  inspection = new InspectionResponse();
}

class UserRequest {
  id = 0;
}

class UserResponse {
  id = 0;
  name = '';
}

class InspectionRequest {
  id = 0;
}

class InspectionResponse {
  id = 0;
  applicableTest = new ApplicableTestResponse();
}

class ApplicableTestResponse {
  test = new TestResponse();
  equipment = new EquipmentResponse();
}

class EquipmentResponse {
  id = 0;
  tag = '';
  area = new AreaResponse();
}

class AreaResponse {
  id = 0;
  code = 0;
  plant = new PlantResponse()
}

class PlantResponse {
  id = 0;
  code = '';
}

class TestResponse {
  id = 0;
  name = '';
}