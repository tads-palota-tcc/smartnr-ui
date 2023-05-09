import { Plant } from "./plant";

export class PressureSafetyValve {
  id?: number;
  tag = '';
  description = '';
  manufacturer = '';
  model = '';
  bodySize = '';
  openingPressure = 0;
  closingPressure = 0;
  lastCalibration?: Date;
  plant = new Plant();
}