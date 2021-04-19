<template>
  <a-assets id="mainAssets" />
</template>

<script>
import { mapGetters } from 'vuex';
import constants from '../../constants';

export default {
  name: 'Assets',
  props: {
    sceneAssetsPath: {
      type: String,
      default() {
        return '';
      },
    },
  },
  computed: {
    ...mapGetters({
      dynamicAssets: 'scene/dynamicAssets',
    }),
  },
  watch: {
    dynamicAssets(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.addModels(newValue, true);
      }
    },
  },
  mounted() {
    this.setAssetsFromPath();
  },
  methods: {
    addModels(assets, isImage) {
      const mainAssets = document.getElementById('mainAssets');

      // Load scene's static assets
      if (assets) {
        assets.forEach((asset) => {
          const element = document.createElement(
            isImage || asset.endsWith('.png') ? 'img' : 'a-asset-item',
          );
          if (isImage) {
            element.id = asset.id;
            element.setAttribute('cross-origin', 'anonymous');
            element.setAttribute('src', asset.src);
            mainAssets.appendChild(element);
            return;
          }

          const assetId = asset.split('.')[0];
          element.id = assetId;
          element.setAttribute('src', `/models/scenes/${this.$props.sceneAssetsPath}/${asset}`);
          mainAssets.appendChild(element);
        });
      }
    },
    setAssetsFromPath() {
      const assets = constants.assets[this.$props.sceneAssetsPath];
      this.addModels(assets);
    },
  },
};
</script>
