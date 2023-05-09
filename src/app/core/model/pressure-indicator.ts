import { Plant } from "./plant";

export class PressureIndicator {
  id?: number;
  tag = '';
  description = '';
  manufacturer = '';
  model = '';
  gaugeSize = '';
  connectionSize = '';
  maxGauge = 0;
  minGauge = 0;
  lastCalibration?: Date;
  plant = new Plant();
}