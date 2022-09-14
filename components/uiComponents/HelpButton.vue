<template>
  <div class="help__wrapper">
    <button type="button" class="help__button" @click="handleOpenModal">?</button>
    <div v-if="isModalOpen">HOWDY</div>
  </div>
</template>

<script>
export default {
  name: 'HelpButton',
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    handleOpenModal() {
      this.isModalOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.help__wrapper {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 1;
}
.help__button {
  height: 35px;
  width: 35px;
  background: rgba(255, 255, 255, 0.3);
  border: 3px solid #fff;
  font-weight: bold;
  color: #000;
  border-radius: 50%;
  outline: none;

  &:hover {
    background: rgba(255, 255, 255, 0.6);
    cursor: pointer;
  }
}
</style>
