export default {
    fetchCity(state, payload) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=131fd97adce8356087f5c6ceebc48282&units=metric`;
        return fetch(url)
        .then(response => response.json())
        .then(data => {
            state.city = data;
        });
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
                });
            });
        }
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}