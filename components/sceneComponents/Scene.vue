<template>
  <div class="scene__wrapper">
    <a-scene
      id="main-scene"
      embedded
      keyboard-shortcuts="enterVR: false"
      :fog="fog"
      background="color: #ddd"
    >
      <!-- inspector-plugin-recast -->
      <Assets :scene-assets-path="sceneAssetsPath" />

      <!-- Light 1 -->
      <a-light
        type="ambient"
        position="25 25 -7"
        color="white"
        light="type: hemisphere; intensity: 0.950"
        visible=""
      />

      <!-- Shadow Camera -->
      <a-entity
        class="environment"
        position="33 34 10"
        light="intensity: 0.85; castShadow: false; shadowCameraLeft: -95; shadowCameraBottom: -95; shadowCameraRight: 95; shadowCameraTop: 95; shadowRadius: 50; shadowCameraFar: 100; shadowCameraNear: 1"
        visible=""
      />
      <a-entity
        class="environment"
        position="-25.202 10.952 -11.966"
        light="intensity: 0.85; castShadow: false; shadowCameraLeft: -95; shadowCameraBottom: -95; shadowCameraRight: 95; shadowCameraTop: 95; shadowRadius: 50; shadowCameraFar: 100; shadowCameraNear: 1"
        visible=""
      />

      <Player />

      <!-- Each scene's elements are rendered below -->
      <slot></slot>
    </a-scene>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Assets from '../sceneComponents/Assets.vue';
import Player from '../sceneComponents/Player.vue';
export default {
  name: 'Scene',
  components: {
    Assets,
    Player,
  },
  props: {
    room: {
      type: String,
      default() {
        return '';
      },
    },
    fog: {
      type: String,
      default() {
        return '';
      },
    },
    sceneAssetsPath: {
      type: String,
      default() {
        return '';
      },
    },
    isPlayerMovable: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  computed: {
    ...mapGetters({
      isLoaded: 'scene/isLoaded',
    }),
  },
  mounted() {
    document.querySelector('a-scene').addEventListener('loaded', this.setLoaded);
  },
  methods: {
    setLoaded() {
      this.$store.dispatch('scene/setSceneLoaded', true);
    },
  },
};
</script>

<style lang="scss" scoped>
.scene__wrapper {
  flex: 4;
}
</style>
