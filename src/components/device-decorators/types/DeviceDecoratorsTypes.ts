export type DeviceDecorators = "brightness" | "color" | "temperature" | "powerConsumption";

export interface DeviceDecoratorsState {
    deviceDecorator: Record<DeviceDecorators, string>
}