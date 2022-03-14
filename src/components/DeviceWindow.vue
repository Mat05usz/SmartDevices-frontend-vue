<script lang="ts">
import { DeviceData, SmartDevice } from "@/interfaces/DeviceInterfaces";
import { DeviceProps } from "@/interfaces/PropsInterfaces";
import { defineComponent } from "@vue/runtime-core";
import { PropType } from "vue";
import DeviceComponent from "./DeviceComponent.vue";

export default defineComponent({

    props:{
        d : Object as PropType<SmartDevice>
        ,
        deviceProps: Object as PropType<DeviceProps>
    },
    components:{
        DeviceComponent
    },
    data(){
        return{
            device: this.deviceProps?.device,
            setClickedDevice: this.deviceProps?.setClickedDevice
        }
    },
    computed:{
        deviceWindowStyle(){

            return this.device ? "block" : "none";
        },
        deviced(){
            return this.deviceProps?.device;
        }
        
    },
    methods:{
        clicked(){
            if(this.setClickedDevice)
                this.setClickedDevice(null);
        }
    },
    

})
</script>

<template>

   <div 
      class="device-window"
      :style="{display: deviceWindowStyle }"
    >
    
        <div class="close-button-wrapper" @click="clicked"><span  className="iconify close-button" data-icon="carbon:close"></span></div>
      

      <DeviceComponent :deviceProps="{device: deviced, showDetailed: true, setClickedDevice: deviceProps.setClickedDevice}" />
    </div>
</template>

<style lang="scss">
.device-window {
    touch-action: none;
    user-select: none;
    width: 400px;
    max-width: 98vw;
    margin: 0;
    display: none;
    position: absolute;
    z-index: 999;
    .close-button
    {
        position: absolute;
        right: 2px;
        font-size: 2rem;
        cursor: pointer;
        color: gray;
        z-index: 1;
    }

    .device-wrapper{
        width: 100%;
        cursor:inherit;
        height: 100%;
        overflow-y: hidden;
    }
  }
</style>