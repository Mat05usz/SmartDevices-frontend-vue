<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import DeviceList from './components/DeviceList.vue'
import { setupMockSocketServer } from './mock-api/MockSocket';
import setupMockFetch from './mock-api/MockFetch';

setupMockSocketServer();
//setupMockFetch();

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
*,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    
  }
  
  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd,
  ul {
    margin: 0;
    padding: 0;
  }
  
  /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
  ul[role="list"],
  ol[role="list"] {
    list-style: none;
  }
  
  /* Set core root defaults */
  html {
    scroll-behavior: smooth;
  }
  
  /* Set core body defaults */
  body {
    min-height: 100vh;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
    background-color: var(--clr-dark);
    overflow-x: hidden;
  }
  
  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }
  
  /* Make images easier to work with */
  img,
  picture {
    max-width: 100%;
    display: block;
  }
  
  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
  
  /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }
  
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
</style>
