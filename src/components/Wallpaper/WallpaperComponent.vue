<script setup lang="ts"></script>

<template>
  <div class="wallpaper">
    <div class="items-layout">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.wallpaper {
  width: 100vw;
  height: 100vh;
  background-image: url('/src/assets/images/wallpapers/aurora.jpg');
  background-size: 150vw auto;
  background-position: -30vw -30vh;
  position: relative;
  isolation: isolate;
}

.wallpaper:after {
  content: '';
  position: absolute;
  background: white;
  z-index: -1;
  opacity: 0.4;
  inset: 0;
}

.items-layout {
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
</style>
