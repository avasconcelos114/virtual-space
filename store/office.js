export const state = () => ({
  activeEmployee: null,
});

export const getters = {
  activeEmployee: (state) => {
    return state.activeEmployee;
  },
};

export const mutations = {
  setActiveEmployee(state, activeEmployee) {
    if (state.activeEmployee?.id === activeEmployee?.id) {
      state.activeEmployee = null;
      return;
    }
    state.activeEmployee = activeEmployee;
  },
};
// -----------------------------------------------------------------
export const actions = {
  setActiveEmployee(context, activeEmployee) {
    context.commit('setActiveEmployee', activeEmployee);
  },
};
