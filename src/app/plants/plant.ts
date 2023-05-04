export class PlantSummaryResponse {
  id: number;
  code: string;
  name: string;
  active: boolean;

  constructor() {
    this.id = 0;
    this.code = '';
    this.name = '';
    this.active = false;
  }
}