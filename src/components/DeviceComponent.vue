<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core'
import { DeviceProps } from '../interfaces/PropsInterfaces';

export default defineComponent({
    props: {
        deviceProps: Object as PropType<DeviceProps>
    },
    
    
});
</script>

<template>
  <div class="device-wrapper">
      {{deviceProps.device}}
  </div>
</template>