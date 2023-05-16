import { Area } from './area';

export class ApplicableTest {
  test = new Test();
  frequency?: number;
  frequencyType?: 'DAY' | 'MONTH' | 'YEAR';
}

export class Test {
  id?: number;
  name?: string;
  description?: string;
  frequency?: number;
  frequencyType?: 'DAY' | 'MONTH' | 'YEAR';
}

export class ApplicableTestResponse {
  testId?: number;
  name = '';
  frequency?: number;
  frequencyType?: 'DAY' | 'MONTH' | 'YEAR';
  lastTestDate?: Date;
  nextTestDate?: Date;
}