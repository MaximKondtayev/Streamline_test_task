import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    storedItems: [],
  },
  getters: {
    itemLists: state => {
      return state.storedItems
    }
  },
  mutations: {
    addItemToList(state, item) {
      state.storedItems.push(item._name);
      localStorage.setItem('itemsList', JSON.stringify(state.storedItems));
    },
    removeItem(state, index) {
      state.storedItems.splice(index, 1);
    },
    setItemList(state, itemList) {
      state.storedItems = itemList;
    },
  },
  actions: {
    loadItemList({ commit }) {
      const storedItemList = localStorage.getItem('itemsList');
      if (storedItemList) {
        commit('setItemList', JSON.parse(storedItemList));
      }
    },
    removeItem({ commit, state }, index) {
      commit('removeItem', index);
      localStorage.setItem('itemsList', JSON.stringify(state.storedItems));
    },
  }
})
