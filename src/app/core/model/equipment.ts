import { Area } from './area';

export class Equipment {
  id?: number;
  tag = '';
  name = '';
  area = new Area();
  hydrostaticTestPressure = 0;
  maxOperationPressure = 0;
  maxAllowedWorkPressure = 0;
  manufacturer = '';
  model = '';
  serialNumber = '';
  manufactureYear = '';
  projectCode = '';
  projectCodeEditionYear = '';
  diameter = 0;
  volume = 0;
  fluidClass = '';
  category?: string;
  hasTwoWideExits = false;
  hasVentilation = false;
  hasMaintenanceAccess = false;
  hasLocalLighting = false;
  hasEmergencyLighting = false;
  hasIdentificationTag = false;
  hasCategoryTag = false;
  hasDatabook = false;
  hasSafetyJournal = false;
  hasInstallationProject = false;
  pressureSafetyValves: any[] = [];
  pressureIndicators: any[] = [];
  active = false;
}