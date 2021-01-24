<template>
  <div id="app">
    <!-- access root props via $root -->
    <div class="widget_wrapper" v-show="!settings">
      <i class="ri-settings-3-line settings"></i>
      <div class="widget_content">
        <div class="header">
          {{getCity.name ? getCity.name : 'City'}}, {{getCity.sys ? getCity.sys.country : 'Country'}}
        </div>
        <div class="main-info">
          <img :src="`http://openweathermap.org/img/wn/${getCity.weather ? getCity.weather[0].icon : '01d'}@2x.png`" :alt="getCity.weather ? getCity.weather[0].main : 'Icon'">
          <p>{{getCity.main ? getCity.main.temp + '°C' : '0°C'}}</p>
        </div>
        <div class="sub-info">
          <p>Feels like {{getCity.main ? getCity.main.feels_like + '°C' : '0°C'}}</p>
          <p>{{getCity.weather ? getCity.weather[0].main : 'Clear'}}</p>
        </div>
        <div class="w_p">
          <div class="wind">
            <i class="ri-compass-discover-fill"></i>
            <p>{{getCity.wind ? getCity.wind.speed + 'm/s' : '0m/s'}}</p>
            <p>{{getDirection}}</p>
          </div>
          <div class="pressure">
            <i class="ri-compass-4-line"></i>
            {{getCity.main ? getCity.main.pressure + 'hPa' : '0hPa'}}
          </div>
        </div>
        <div class="extra">
          <p>Humidity: {{getCity.main ? getCity.main.humidity + '%' : '0%'}}</p>
          <p>Visibility: {{getCity.visibility ? getCity.visibility + 'm' : '0m'}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions,
  mapMutations
} from "vuex";
export default {
  data: () => ({
    settings: false,
  }),
  computed: {
    ...mapGetters([
        'getCity',
        'getCurrentCity',
    ]),
    getDirection() {
      var deg = this.getCity.wind ? this.getCity.wind.deg : '0'
      if (deg>11.25 && deg<=33.75){
        return "NNE";
      }else if (deg>33.75 && deg<=56.25){
        return "ENE";
      }else if (deg>56.25 && deg<=78.75){
        return "E";
      }else if (deg>78.75 && deg<=101.25){
        return "ESE";
      }else if (deg>101.25 && deg<=123.75){
        return "ESE";
      }else if (deg>123.75 && deg<=146.25){
        return "SE";
      }else if (deg>146.25 && deg<=168.75){
        return "SSE";
      }else if (deg>168.75 && deg<=191.25){
        return "S";
      }else if (deg>191.25 && deg<=213.75){
        return "SSW";
      }else if (deg>213.75 && deg<=236.25){
        return "SW";
      }else if (deg>236.25 && deg<=258.75){
        return "WSW";
      }else if (deg>258.75 && deg<=281.25){
        return "W";
      }else if (deg>281.25 && deg<=303.75){
        return "WNW";
      }else if (deg>303.75 && deg<=326.25){
        return "NW";
      }else if (deg>326.25 && deg<=348.75){
        return "NNW";
      }else{
        return "N"; 
      }
    }
  },
  methods: {
    ...mapMutations([
      'fetchCity',
      'fetchCurrentCity'
    ]),
  },
  mounted() {
    this.fetchCurrentCity();
  },  
}
</script>
