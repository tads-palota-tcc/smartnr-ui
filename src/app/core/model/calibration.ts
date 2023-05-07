export class CalibrationSummary {
  id = 0;
  executionDate = new Date();
  reportNumber = '';
  executorCompany = '';
  status: 'DONE' | 'WAITING_REPORT' = 'WAITING_REPORT';
}