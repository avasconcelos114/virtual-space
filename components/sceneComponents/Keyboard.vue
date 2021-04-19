<template>
  <a-entity id="keyboard" :position="position" :rotation="rotation" />
</template>

<script>
export default {
  name: 'Keyboard',
  props: {
    isDismissable: Boolean,
    position: {
      type: String,
      default() {
        return '0 0 0';
      },
    },
    rotation: {
      type: String,
      default() {
        return '0 0 0';
      },
    },
  },
  mounted() {
    const keyboard = document.createElement('a-entity');
    keyboard.setAttribute(
      'a-keyboard',
      `
            locale: en;
            dismissable: ${this.isDismissable};
        `,
    );
    document.querySelector('#keyboard').appendChild(keyboard);
  },
};
</script>
