import { Plant } from "./plant";

export class Device {
  id?: number;
  tag = '';
  lastCalibration?: Date;
  plant = new Plant();
}