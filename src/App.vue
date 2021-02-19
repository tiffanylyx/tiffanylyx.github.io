/* eslint-disable */
<template>
  <div id="main" style="width:1200px;">
    <div id="Selecter" style = "width:1200px">
      <Selecter/>
    </div>
    <div id="poem" style="width:300px;float: left">
      <div id = 'Wordle'>
        <Wordle/>
      </div>
    </div>
    <div id="map" style="width:600px;float:left">
      <Map msg="Welcome to Your Vue.js App"/>
    </div>
    <div id='charts' style="width:300px;float:left">
      <div id='forceplot' >
        <Force/>
      </div>
      <div id='histplot' >
        <Hist msg="Welcome to Your Vue.js App"/>
      </div>
    </div>
  </div>
</template>

<script>
import Selecter from './components/Selecter.vue'
import Map from './components/Map.vue'
import Hist from './components/Hist.vue'
import Force from './components/Force.vue'
//import Wordle from './components/Wordle.vue'

export default {
  name: 'App',
  components: {
    Selecter,
    Map,
    Hist,
    Force,
    //Wordle
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-image:url(background.jpg);
  background-size: cover;
}
</style>
