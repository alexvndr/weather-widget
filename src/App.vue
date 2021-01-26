<template>
  <div id="app">
    <!-- access root props via $root -->
    <div class="widget_wrapper" v-show="!settings">
      <i class="ri-settings-3-line settings" @click="showSettings"></i>

      <!-- CONTENT -->

      <div class="widget_content" v-for="city in cities" :key="city.id">
        <div class="header">
          {{city.name ? city.name : 'City'}}, {{city.sys ? city.sys.country : 'Country'}}
        </div>
        <div class="main-info">
          <img :src="`http://openweathermap.org/img/wn/${city.weather ? city.weather[0].icon : '01d'}@2x.png`" :alt="city.weather ? city.weather[0].main : 'Icon'">
          <p>{{city.main ? city.main.temp + '°C' : '0°C'}}</p>
        </div>
        <div class="sub-info">
          <p>Feels like {{city.main ? city.main.feels_like + '°C' : '0°C'}}</p>
          <p>{{city.weather ? city.weather[0].main : 'Clear'}}</p>
        </div>
        <div class="w_p">
          <div class="wind">
            <i class="ri-navigation-fill"></i>
            <p>{{city.wind ? city.wind.speed + 'm/s' : '0m/s'}}</p>
            <p>{{getDirection}}</p>
          </div>
          <div class="pressure">
            <i class="ri-compass-4-line"></i>
            {{city.main ? city.main.pressure + 'hPa' : '0hPa'}}
          </div>
        </div>
        <div class="extra">
          <p>Humidity: {{city.main ? city.main.humidity + '%' : '0%'}}</p>
          <p>Visibility: {{city.visibility ? city.visibility + 'm' : '0m'}}</p>
        </div>
      </div>
    </div>

    <!-- SETTINGS -->

    <div class="widget_settings" v-show="settings">
      <div>
        <i class="ri-close-line close_btn" @click="showSettings"></i>
        <div class="header">
          Settings
        </div>
        <draggable 
          :list="cities"
          :disabled="!enabled"
          class="list-group"
          ghost-class="ghost"
          @start="dragging = true && checkMove"
          @end="dragging = false"
          @change="checkMove">
            <div class="widget_content" v-for="(city) in cities" :key="city.id" id="listItem">
              <i class="ri-menu-line"></i>
              <p>{{city.name ? city.name : 'City'}}, {{city.sys ? city.sys.country : 'Country'}}</p>
              <i class="ri-delete-bin-line" @click="removeCity(city.id)"></i>
            </div>
        </draggable>
      </div>
      <div class="widget_add">
        <div class="input">
          <label for="add">Add Location:</label>
          <input type="text" id="add" v-model="cityToAdd">
        </div>
        <div class="enter">
          <i class="ri-arrow-go-back-fill ri-xl" @click="addNew"></i>
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
import draggable from "@/vuedraggable";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      settings: false,
      cityToAdd: '',
      enabled: true,
      cities: []
    }
  },
  computed: {
    ...mapGetters([
        'getCity',
        'getCurrentCity',
        'getCities',
    ]),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
        dragging: false
      };
    },
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
    },
  },
  methods: {
    ...mapMutations([
      'fetchCity',
      'fetchCurrentCity',
      'addCity',
      'removeCity',
      'checkMove'
    ]),
    showSettings() {
      this.settings = !this.settings;
    },
    addNew() {
      if (this.cityToAdd.length > 0) {
        this.addCity(this.cityToAdd);
        this.cityToAdd = '';
      }
    },
  },
  mounted() {

    this.cities = this.getCities;
    
    if (localStorage.getItem('CITIES') === null){
      localStorage.setItem('CITIES', JSON.stringify([]))
    }
    if (this.getCities.length === 0) {
      this.fetchCurrentCity()
    }
  },  
}
</script>
