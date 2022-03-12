<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import DeviceComponent from "./DeviceComponent.vue";
import {
  returnDeviceObject,
  SmartDevice,
} from "../interfaces/DeviceInterfaces";
import { PropType } from "vue";

export default defineComponent({
  components: {
    DeviceComponent,
  },
  data() {
    return {
      devices: [] as SmartDevice[],
      x: {
          device: this.devices,
            detailed: false
      }
    };
  },
  mounted() {
    console.log("Mounted DeviceList");

    this.handleSocketConnection();
  },
  methods: {
    handleSocketConnection() {
      let connection = new WebSocket("ws://api.com/v1/refresh");
      connection.onmessage = (event) => {
        let data = JSON.parse(event.data);
        let fetchedDevices: SmartDevice[] = [];

        for (let device of data) {
          let values = Object.values(device);

          fetchedDevices.push(
            returnDeviceObject(values[0] as any, values.slice(1) as any)
          );
        }
        this.devices = fetchedDevices;
      };
    },
  },
});
</script>

<template >
<div v-if="devices !== null">
  <device-component v-for="(device, index) in devices" :key="index" :deviceProps="{device: device, isDetailed: false}"></device-component>
  <!--<template v-for="(device, index) in devices" :key="index">
      {{device}}
  </template>-->
  </div>
</template>