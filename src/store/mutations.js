import { findIndex } from 'lodash';

export default {
    fetchCity(state, payload) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=131fd97adce8356087f5c6ceebc48282&units=metric`;
        return fetch(url)
        .then(response => response.json())
        .then(data => {
            state.city = data;
        });
    },

    checkMove(state) {
        localStorage.setItem('CITIES', JSON.stringify(state.cities));
    },

    addCity(state, payload) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=131fd97adce8356087f5c6ceebc48282&units=metric`;
        return fetch(url)
        .then(response => {
            response.json()
        })
        .then(data => {
            let exists = false;
            exists = state.cities.some((city) => {
                return city.id === data.id
            })
            if(!exists) {
                state.cities.push(data);
            }
            localStorage.setItem('CITIES', JSON.stringify(state.cities));
        });
    },

    removeCity(state, id) {
        const index = findIndex(state.cities, { id: id })
        if (index > -1) state.cities.splice(index, 1)
        localStorage.setItem('CITIES', JSON.stringify(state.cities));
    },

    fetchCurrentCity(state, payload) {
        let long = ""
        let lat = ""
        function showPosition(position) {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            let url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;
            return fetch(url)
            .then(response => response.json())
            .then(data => {
                state.currentCity = data.city;
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${data.city}&appid=131fd97adce8356087f5c6ceebc48282&units=metric`;
                return fetch(url)
                .then(response => response.json())
                .then(data => {
                    state.city = data;
                    state.cities.push(...state.cities, state.city)
                    localStorage.setItem('CITIES', JSON.stringify(state.cities));
                });
            });
        }
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}