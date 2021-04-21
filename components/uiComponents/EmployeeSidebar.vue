<template>
  <div class="sidebar__wrapper">
    <div>
      <h2 class="sidebar__header__text">EMPLOYEE DIRECTORY</h2>
      <input v-model="searchValue" class="search__input" type="input" placeholder="Search..." />
    </div>

    <div class="employee__wrapper">
      <Employee
        v-for="(employee, index) in filteredEmployeeList || fullEmployeeList"
        :key="employee.id + index"
        :employee="employee"
        :index="index"
      />
    </div>
  </div>
</template>

<script>
import { WebClient } from '@slack/web-api';
// import {EMPLOYEE_LIST_MOCK_API_RESPONSE} from '../../constants/api_mockup';
import Employee from './Employee.vue';

export default {
  name: 'EmployeeSidebar',
  components: {
    Employee,
  },
  data() {
    return {
      fullEmployeeList: [],
      filteredEmployeeList: null,
      searchValue: '',
      isLoading: true,
    };
  },
  watch: {
    searchValue(val) {
      if (val.length > 0) {
        this.filteredEmployeeList = this.fullEmployeeList.filter(function (employee) {
          const field =
            employee.profile.display_name.split('-').length > 1
              ? employee.profile.display_name
              : employee.profile.real_name;
          return new RegExp(val.toLowerCase()).test(field.toLowerCase());
        });
        return;
      }
      this.filteredEmployeeList = this.fullEmployeeList;
    },
  },
  mounted() {
    this.getEmployeeList();
  },
  methods: {
    async getEmployeeList() {
      try {
        if (process.env.SLACK_TOKEN) {
          const client = new WebClient(process.env.SLACK_TOKEN);
          delete client.axios.defaults.headers['User-Agent'];
          const data = await client.users.list({
            team_id: 'T095YKK96',
          });
          this.isLoading = false;

          const filteredMembers = data.members.filter(function (employee) {
            return !employee.deleted && !employee.is_bot && employee.id !== 'USLACKBOT';
          });

          this.fullEmployeeList = filteredMembers;
        }
      } catch (e) {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';

.employee__wrapper {
  overflow-y: auto;
  height: calc(100% - 190px);
}
.search__input {
  width: calc(100% - 8px);
  height: 30px;
  padding-left: 5px;
  margin: 5px 4px;
  color: #9ea3ac;
  background: #2c2e33;
  border: 1px solid #444549;
  font-family: 'Share Tech Mono', Arial, Helvetica, serif;
  font-size: 13px;
  font-weight: 700;
}
.search__input:focus {
  border: 1px solid #58595e;
}
.sidebar__wrapper {
  width: 370px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #25272b;
  color: #9ea3ac;
  padding: 20px;

  @include respond-to(xs, sm) {
    display: none;
  }
}
.sidebar__header__text {
  font-family: 'Big Shoulders Text';
  font-weight: 300;
  font-size: 42px;
}
</style>
