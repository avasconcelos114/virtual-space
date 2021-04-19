<template>
  <a-entity
    :visible="position && position.x !== undefined && position.z !== undefined"
    :position="`${position.x} 0 ${position.z}`"
  >
    <a-cylinder color="black" height="6" position="0 3.5 0" radius="0.01" segments-radial="3" />
    <a-plane
      position="0 0.87 0"
      rotation="90 90 0"
      width="0.75"
      height="1.35"
      color="#2984FF"
      material="side: double; shader: flat"
    />
    <a-entity
      rotation="0 90 0"
      look-at="[camera]"
      geometry="primitive: plane; width: 6; height: 2"
      material="transparent: true; src: #EmployeeCard; side: double"
      position="0 6.8 0.25"
      scale="2.2 2.2 2.2"
    >
      <a-image
        height="1.5"
        width="1.5"
        position="-1.8 0 0.03"
        cross-origin="anonymous"
        :src="`#${employee.id}`"
      />
      <a-text
        color="#000000"
        shader="msdf"
        height="8"
        width="8"
        anchor="right"
        baseline="bottom"
        x-offset="7.1"
        z-offset="0.15"
        font="https://raw.githubusercontent.com/myso-kr/aframe-fonts-korean/master/fonts/ofl/nanumgothic/NanumGothic-Bold.json"
        :value="`${
          employee.profile.display_name.split('-')[0] ||
          employee.profile.real_name.split('-')[0] ||
          ''
        }`"
        position="0 0.35 0"
      />
      <a-text
        color="#000000"
        shader="msdf"
        height="8"
        width="8"
        anchor="right"
        x-offset="7.1"
        z-offset="0.15"
        font="https://raw.githubusercontent.com/myso-kr/aframe-fonts-korean/master/fonts/ofl/nanumgothic/NanumGothic-Bold.json"
        :value="`${
          employee.profile.display_name.split('-')[1] ||
          employee.profile.real_name.split('-')[1] ||
          ''
        }`"
        position="0 0 0"
      />
    </a-entity>
  </a-entity>
</template>

<script>
export default {
  name: 'EmployeeCard',
  props: {
    position: {
      type: Object,
      required: true,
    },
    employee: {
      type: Object,
      required: true,
    },
  },
};
</script>
