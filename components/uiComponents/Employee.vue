<template>
  <div
    v-if="!employee.is_restricted"
    ref="wrapper"
    class="employee__container"
    :isactive="activeEmployee && activeEmployee.id === employee.id"
    :style="{ 'animation-delay': `${30 * (index + 1)}ms` }"
    @click="selectEmployee()"
  >
    <div class="employee__image__wrapper">
      <img
        class="employee__image"
        :src="
          (employee.profile.image_192 &&
            `/thumbnail/${employee.profile.image_192
              .replace('https://avatars.slack-edge.com/', '')
              .replace('/', '%2F')}`) ||
          'https://static.wanted.co.kr/images/profile_default.png'
        "
      />
    </div>
    <div class="employee__details">
      <p id="employee__details__name">
        {{ getName() }}
      </p>
      <p>
        EMAIL: <span>{{ employee.profile.email }}</span>
      </p>
      <p>
        TEAM: <span>{{ getTeam() }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Employee',
  props: {
    employee: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters({
      activeEmployee: 'office/activeEmployee',
    }),
  },
  methods: {
    getName() {
      const { employee } = this.$props;
      const name =
        employee.profile.display_name.split('-')[0] ||
        employee.profile.real_name.split('-')[0] ||
        '-';
      return name.trim().toUpperCase();
    },
    getTeam() {
      const { employee } = this.$props;
      const team =
        employee.profile.display_name.split('-')[1] ||
        employee.profile.real_name.split('-')[1] ||
        '-';
      return team.trim();
    },
    selectEmployee() {
      const { employee } = this.$props;
      const src =
        '/thumbnail/' +
        employee.profile.image_192
          .replace('https://avatars.slack-edge.com/', '')
          .replace('/', '%2F');
      this.$store.dispatch('office/setActiveEmployee', this.$props.employee);
      this.$store.dispatch('scene/setDynamicAssets', {
        id: employee.id,
        src,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#employee__details__name {
  font-size: 22px;
  font-weight: 900;
  margin: 0px;
  margin-bottom: 3px;
}
.employee__details > p {
  margin: 2px;
  font-size: 14px;
  font-weight: 400;
}
.employee__details > p > span {
  font-weight: 900;
  display: inline-block;
  background: #31343c;
  padding: 2px;
  border-radius: 2px;
}
.employee__container {
  display: flex;
  flex-direction: row;
  position: relative;
  animation: 180ms cubic-bezier(0, 0, 0.66, 1) 0s 1 slideInFromBottom;
  animation-fill-mode: forwards;
  top: 30px;
  visibility: hidden;
  align-items: center;
  height: 100px;
  margin-bottom: 5px;
  padding: 5px;
  cursor: pointer;
}
.employee__container[isactive='true'] {
  background: #373a41 !important;
}
.employee__container:hover {
  background: #2c2e33;
}
.employee__image__wrapper {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
.employee__image {
  object-fit: cover;
  object-position: center right;
  background: #d8d8d8;
  width: 100%;
  height: 100%;
}

@keyframes slideInFromBottom {
  0% {
    top: 30px;
  }
  1% {
    visibility: visible;
  }
  100% {
    top: 0px;
    visibility: visible;
  }
}
</style>
