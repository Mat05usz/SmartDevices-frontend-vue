<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core'
import { DeviceProps } from '../interfaces/PropsInterfaces';

export default defineComponent({
    props: {
        deviceProps: {
            type: Object as PropType<DeviceProps>,
            required: true
        }
    },
});
</script>

<template>
  <div class="device-wrapper">
      testd
  </div>
</template>