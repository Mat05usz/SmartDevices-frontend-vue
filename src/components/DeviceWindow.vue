<script lang="ts">
import interact from "interactjs";
import { DeviceProps } from "@/interfaces/PropsInterfaces";
import { defineComponent } from "@vue/runtime-core";
import { PropType } from "vue";
import DeviceComponent from "./DeviceComponent.vue";

export default defineComponent({
  props: {
    deviceProps: Object as PropType<DeviceProps>,
  },
  components: {
    DeviceComponent,
  },
  data() {
    return {
      setClickedDevice: this.deviceProps?.setClickedDevice,
      wasClickedBefore: false,
    };
  },
  computed: {
    deviceUpdated() {
      return this.deviceProps?.device;
    },
  },
  methods: {
    clicked() {
      if (this.setClickedDevice) this.setClickedDevice(null);
    },
  },
  mounted() {
    if (this.deviceUpdated && !this.wasClickedBefore) {
      let deviceWindow = document.querySelector(
        ".device-window"
      ) as HTMLDivElement;
      deviceWindow.style.top = `${window.scrollY + window.screen.height / 2}px`;
      deviceWindow.style.left = `${window.scrollX + window.screen.width / 2}px`;

      deviceWindow.style.transform = "translate(-50%, -50%)";
      this.wasClickedBefore = true;
    }

    interact(".device-window")
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: document.querySelector("body") as HTMLBodyElement,
            endOnly: true,
          }),
        ],
        listeners: {
          move(event) {
            var target = event.target;

            // keep the dragged position in the data-x/data-y attributes
            var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
            var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

            // translate the element
            target.style.transform = "translate(" + x + "px, " + y + "px)";

            // update the posiion attributes
            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);
          },
        },
      })
      .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        listeners: {
          move(event) {
            var target = event.target;
            var x = parseFloat(target.getAttribute("data-x")) || 0;
            var y = parseFloat(target.getAttribute("data-y")) || 0;

            // update the element's style
            target.style.width = event.rect.width + "px";
            target.style.height = event.rect.height + "px";

            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.transform = "translate(" + x + "px," + y + "px)";

            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);
          },
        },
        modifiers: [
          interact.modifiers.restrictSize({
            min: { width: 300, height: 400 },
            max: { width: 600, height: 600 },
          }),
        ],

        inertia: true,
      });
  },
});
</script>

<template>
  <div class="device-window">
    <div class="close-button-wrapper" @click="clicked">
      <span className="iconify close-button" data-icon="carbon:close"></span>
    </div>

    <DeviceComponent
      :deviceProps="{
        device: deviceUpdated,
        showDetailed: true,
        setClickedDevice: deviceProps.setClickedDevice,
      }"
    />
  </div>
</template>

<style lang="scss">
.device-window {
  touch-action: none;
  user-select: none;
  width: 400px;
  max-width: 98vw;
  margin: 0;
  display: block;
  position: absolute;
  z-index: 999;
  .close-button {
    position: absolute;
    right: 2px;
    font-size: 2rem;
    cursor: pointer;
    color: gray;
    z-index: 1;
  }

  .device-wrapper {
    width: 100%;
    cursor: inherit;
    height: 100%;
    overflow-y: hidden;
  }
}
</style>