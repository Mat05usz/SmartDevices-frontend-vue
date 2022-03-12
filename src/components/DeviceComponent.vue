<script lang="ts">
import { DeviceConnectionStates, DeviceTypes } from "@/interfaces/DeviceInterfaces";
import { defineComponent, PropType } from "@vue/runtime-core";
import { render } from "vue";
import { DeviceProps } from '../interfaces/PropsInterfaces';
import '../styles/device.scss';
import DeviceDecorators from './device-decorators/DeviceDecorators.vue'





/*
  A probably overly complicated way to get SVGs based on the type of the device and a field
  we want to provide an icon for.
  It goes like this: deviceDecorators[**type** we want to access][type's **field** that we want to get specific SVG from]
  in return we get a function that when called with proper parameter (like brightness or colour) returns a JSX with SVG
*/

/*const deviceDecorators: Record<
  DeviceTypes,
  | Record<"brightness" | "color", Function>
  | Record<"powerConsumption", Function>
  | Record<
      "temperature",
      Function
    >
> = {
  bulb: {
    brightness: (brightness: number) => { return brightness},
    color: (color: string) => { return color;}
  },
  outlet: {
    powerConsumption: (powerConsumption: number) => { return powerConsumption
    }
  },
  temperatureSensor: {
    temperature: (temperature: number) => { return  temperature } 
    
  },
};*/



export default defineComponent({
    components:{
      DeviceDecorators
    },
  props: {
    deviceProps: Object as PropType<DeviceProps>,
  },
  data() {
    return {
      fields: this.deviceProps?.device.getFields(),
      statusDotColors: {
  connected: "#39C336",
  disconnected: "#E71F1F",
  poorConnection: "#E0C11D",
} as Record<DeviceConnectionStates, string>,

deviceBackgroundColors:  {
  bulb: "#FEF6AA",
  outlet: "#7ADA4C",
  temperatureSensor: "#f17e77",
}as Record<DeviceTypes, string>,
    };
  },
  computed: {
    filterFields() {
      return this.fields?.filter((field, index) => {
        return this.deviceProps?.showDetailed && index > 3;
      });
    },
  },
  watch:{
      deviceProps(){
          this.fields =  this.deviceProps?.device.getFields()
          
      }
  }
});
</script>

<template>
  <div class="device-wrapper">
    <p class="device-type">
      <b>{{ fields[0][1] }}</b>
      <span class="coloured-background" :style="{backgroundColor: deviceBackgroundColors[deviceProps.device.type]}"></span>
    </p>
    <p class="device-id">
      <i>{{ fields[1][1] }}</i>
      <span class="coloured-background" :style="{backgroundColor: deviceBackgroundColors[deviceProps.device.type]}"></span>
    </p>
    <p class="device-name">
      <b>{{ fields[2][1] }}</b>
    </p>
    <div class="device-status">
      <p class="device-status-title">{{ fields[3][0] }}</p>
      <p class="device-status-state">
        <b>{{ fields[3][1] }}</b>
      </p>
      <div class="status-dot-container">
        <span class="device-status-dot" style=""></span>
      </div>
    </div>
    <div
      class="device-details"
      v-for="(field, index) in filterFields"
      :key="index"
    >
      <div class="device-detail" key="{index}">
        <p class="device-detail-title">{{ field[0] }}</p>
        <p class="device-detail-value">
          <b>{{ field[1] }}</b>
        </p>
        <div
          v-if="field[0] !== 'Turned On'"
          class="device-detail-decorator"
        >
        <DeviceDecorators :decorator="Object.keys(deviceProps.device)[index + 4]" :argument="field[1]" />
          <!-- {{
                      //Check comment above the definition to understand what it does
                      //Object.keys(device)[index + 4] is an offset to get to fields that have SVG representation
                      //deviceDecorators[device.type][Object.keys(device)[index + 4]](entry[1])
          }} -->
        </div>
      </div>
    </div>
  </div>
</template>

