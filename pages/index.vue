<template>
  <div class="main__wrapper">
    <Scene scene-assets-path="office" room="office">
      <a-entity
        id="office-wrapper"
        aframe-drag-component="speed: 0.1"
        geometry-merger="preserveOriginal: false"
        position="-32 8 1"
        rotation="0 0 -43"
        scale="2.3 2.3 2.3"
      >
        <a-gltf-model position="0 0 0" rotation="0 90 0" src="#WantedOffice" />

        <a-plane
          v-for="key in Object.keys(seatMapping)"
          :key="key"
          :color="employeeMapping[key] ? 'gray' : 'white'"
          width="0.75"
          height="1.35"
          :position="`${seatMapping[key].x} 0.85 ${seatMapping[key].z}`"
          rotation="90 90 0"
          material="side: double; shader: flat"
        />

        <employee-card
          v-if="
            activeEmployee !== null &&
            seatMapping[employeeSeat[activeEmployee.profile.email]] !== undefined
          "
          :position="seatMapping[employeeSeat[activeEmployee.profile.email]]"
          :employee="activeEmployee"
        />
        <meeting-room-marker
          v-for="marker in busyIdentifiers"
          :key="marker.title"
          :marker="marker"
        />
      </a-entity>
    </Scene>
    <EmployeeSidebar v-if="isLoaded" />
  </div>
</template>

<script>
// import axios from 'axios';
import { mapGetters } from 'vuex';

import constants from '../constants';
import { MEETING_ROOM_MOCK_API_RESPONSE } from '../constants/api_mockup';

import Scene from '../components/sceneComponents/Scene';
import EmployeeSidebar from '../components/uiComponents/EmployeeSidebar';

import EmployeeCard from '../components/sceneComponents/EmployeeCard';
import MeetingRoomMarker from '../components/sceneComponents/MeetingRoomMarker';

export default {
  components: {
    Scene,
    EmployeeSidebar,
    MeetingRoomMarker,
    EmployeeCard,
  },
  data() {
    return {
      busyIdentifiers: constants.MEETING_ROOM_CALENDARS,
      seatMapping: constants.SEAT_MAPPING,
      employeeMapping: constants.EMPLOYEE_SEAT_TEST,

      employeeSeat: constants.EMPLOYEE_SEAT,
    };
  },
  computed: {
    ...mapGetters({
      isLoaded: 'scene/isLoaded',
      activeEmployee: 'office/activeEmployee',
    }),
  },
  mounted() {
    this.getMeetingRoomAvailability();
  },
  methods: {
    getMeetingRoomAvailability() {
      const data = MEETING_ROOM_MOCK_API_RESPONSE;
      // const timeMin = new Date().toISOString();
      // const timeMax = new Date().toISOString();
      // const items = [];

      // Object.keys(constants.MEETING_ROOM_CALENDARS).forEach((id) => {
      //     items.push({id});
      // });

      // const params = {
      //     timeMin,
      //     timeMax,
      //     items,
      // };

      // const {data} = await axios.post('https://www.googleapis.com/calendar/v3/freeBusy?key=AIzaSyA--F5rICdNuOs1TJRjvhxSLjN2XEbCEiY', params, {
      //     headers: {
      //         'Authorization': `Bearer ${token}`,
      //     },
      // });
      if (data.calendars) {
        for (const key in data.calendars) {
          if (data.calendars[key].busy.length > 0) {
            this.busyIdentifiers[key].isBusy = true;
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.main__wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
}
</style>
