<template>
  <a-entity
    :key="marker.title"
    :position="`${marker.x} 4 ${marker.z}`"
    scale="1.5 1.5 1.5"
    look-at="[camera]"
  >
    <a-text
      align="center"
      :color="marker.isBusy ? '#DF4440' : '#1DAA7F'"
      width="7"
      position="0 0 0.15"
      height="7"
      :value="marker.title"
    />
    <!-- animation="property: rotation; from: 0 0 0; to: 0 360 0; loop: true; dur: 12000; easing: linear;" -->
    <a-gltf-model
      position="0 0 0"
      rotation="0 0 0"
      scale="0.8 0.8 0.8"
      :src="marker.isBusy ? '#WantedTokenRed' : '#WantedTokenGreen'"
    />
  </a-entity>
</template>

<script>
export default {
  name: 'MeetingRoomMarker',
  props: {
    marker: {
      type: Object,
      required: true,
    },
  },
};
</script>
