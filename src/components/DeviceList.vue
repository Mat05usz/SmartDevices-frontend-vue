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
  props:{
    clickedDevice: Object as PropType<SmartDevice>,
    setClickedDevice: Function
  },
  data() {
    return {
      devices: [] as SmartDevice[],
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
  watch:{
    devices(newDevices: SmartDevice[]){
      if(this.clickedDevice && this.setClickedDevice)
      {
        this.setClickedDevice(newDevices.filter(device => device.id === this.clickedDevice?.id)[0]);
      }
    }
  }
});
</script>

<template >
<div class="device-list" v-if="devices !== null">
  <DeviceComponent v-for="(device, index) in devices" :key="index" :deviceProps="{device: device, showDetailed: false, setClickedDevice: setClickedDevice}"></DeviceComponent>
  </div>
</template>

<style lang="scss">
.device-list{

    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(300px, 100vw), 1fr));
    grid-auto-rows: 1fr;
    place-items: center;
    row-gap: 2rem;
}
</style>