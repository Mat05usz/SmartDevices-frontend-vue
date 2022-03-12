<script lang="ts">
import { defineComponent, Prop, PropType } from 'vue'
import { DeviceDecorators, DeviceDecoratorsState } from './types/DeviceDecoratorsTypes';
import BrightnessDecorator from './BrightnessDecorator.vue';
import ColorDecorator from './ColorDecorator.vue';
import PowerConsumptionDecorator from './PowerConsumptionDecorator.vue';
import TemperatureDecorator from './TemperatureDecorator.vue';

export default defineComponent({
    
    props: {
        decorator: String as PropType<DeviceDecorators>,
        argument: [Number, String]
    },
    components:{
        BrightnessDecorator,
        ColorDecorator,
        PowerConsumptionDecorator,
        TemperatureDecorator
    },
    data(){
        return{
            deviceDecorator: {
                brightness: "BrightnessDecorator",
                color: "ColorDecorator",
                powerConsumption: "PowerConsumptionDecorator",
                temperature: "TemperatureDecorator"
            }
        } as DeviceDecoratorsState
    }

})
</script>

<template>
    <component :is="deviceDecorator[decorator]" :argument="argument"></component>
</template>