import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default state = () => ({
  cities: [],
})

export const getters = {
  getCities(state) {
    return state.cities
  }
}
