<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import DeviceList from './components/DeviceList.vue'

export default defineComponent({

  components:{
    DeviceList
  }

})

</script>

<template>
<DeviceList/>
 <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
  -->
</template>

<style>

</style>
