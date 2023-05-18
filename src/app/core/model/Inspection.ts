import { Area } from "./area";

export class Inspection {
  id = 0;
  executorCompany = '';
  reportNumber = '';
  comments = '';
  status: 'WAITING_REPORT' | 'DONE' = 'WAITING_REPORT';
  cost = 0.0;
  executionDate = new Date();
  equipment = new Equipment();
  test = new Test();
  file = new File();
}

class Equipment {
  id = 0;
  tag = '';
  area = new Area();
}

class Test {
  id = 0;
  name = '';
}

class File {
  id?: number;
  name: string = '';
  url: string = '';
}