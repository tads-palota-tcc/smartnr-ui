import { ApplicableTestResponse } from './applicable-tests';
import { Area } from './area';
import { PressureIndicator } from './pressure-indicator';
import { PressureSafetyValve } from './pressure-safety-valve';

export class Equipment {
  id = 0;
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
  pressureSafetyValves: PressureSafetyValve[] = [];
  pressureIndicators: PressureIndicator[] = [];
  applicableTests: ApplicableTestResponse[] = [];
  active = false;
  databookFile = new File();
  safetyJournalFile = new File();
  installationProjectFile = new File();
}

export class EquipmentSituation {
  id = 0;
  tag = '';
  plant = '';
  expiredInspections = 0;
  nextToExpireInspections = 0;
  expiredCalibrations = 0;
  nextToExpireCalibrations = 0;
}

class File {
  id = 0;
  name = '';
  type = '';
  url = '';
}