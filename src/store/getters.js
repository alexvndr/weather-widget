export default {
    getCity (state) {
        return state.city
    },
    getCities (state) {
        if (JSON.parse(localStorage.getItem('CITIES')).length > 0){
            state.cities = JSON.parse(localStorage.getItem('CITIES'))
        }else{
            state.cities = []
        }
        return state.cities
    },

    getCurrentCity (state) {
        return state.currentCity
    },
}