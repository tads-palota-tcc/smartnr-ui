import { Device } from './device';

export class CalibrationSummary {
  id = 0;
  executionDate = new Date();
  reportNumber = '';
  executorCompany = '';
  file = new File();
  status: 'DONE' | 'WAITING_REPORT' = 'WAITING_REPORT';
}

export class Calibration extends CalibrationSummary {
  type?: 'PSI' | 'PSV';
  comments?: string;
  cost: number = 0;
  device = new Device();
}

class File {
  id?: number;
  name: string = '';
  url: string = '';
}