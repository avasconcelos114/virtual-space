export const state = () => ({
  isLoaded: false,
  dynamicAssets: [],
});

export const getters = {
  isLoaded: (state) => {
    return state.isLoaded;
  },
  dynamicAssets: (state) => {
    return state.dynamicAssets;
  },
};

export const mutations = {
  setSceneLoaded(state, isLoaded) {
    state.isLoaded = isLoaded;
  },
  setDynamicAssets(state, dynamicAssets) {
    let temp = Object.assign([], state.dynamicAssets);
    temp.push(dynamicAssets);
    temp = [...new Set([...temp])];
    state.dynamicAssets = temp;
  },
};

export const actions = {
  setSceneLoaded(context, isLoaded) {
    context.commit('setSceneLoaded', isLoaded);
  },
  setDynamicAssets(context, dynamicAssets) {
    context.commit('setDynamicAssets', dynamicAssets);
  },
};
