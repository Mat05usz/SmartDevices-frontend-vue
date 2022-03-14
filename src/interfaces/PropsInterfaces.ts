import { SmartDevice } from "./DeviceInterfaces";

export interface DeviceProps {
    device: SmartDevice;
    showDetailed: boolean;
    setClickedDevice?: (newDevice: SmartDevice | null)=> void;
  }