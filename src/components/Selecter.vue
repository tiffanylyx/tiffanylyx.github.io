/* eslint-disable */
<template>
  <div id="Selecter">
    <h4>Select The Poet</h4>
  </div>
</template>

<script>
import * as d3 from "d3";
import Bus from '../assets/bus.js';

export default {
  name: "App",
  data(){
    return{
      svg4:undefined
    }
  },
  //created(){
    //Bus.$on("Map_place", (val) => {
                //this.place = val;}),
    //Bus.$on("Map_places", (val) => {
                //this.places = val;})},
  mounted() {
    this.choose_poet();
  },
  methods: {
    choose_poet() {
var allPoet = ['Su Shi',"Huang Tingjian", "Xin Qiji", "Ouyang Xiu"]
var dropdownButton = d3.select("#Selecter")
  .append('select')
  .on("change", dropchange)

// add the options to the button
dropdownButton // Add a button
  .selectAll('myOptions') // Next 4 lines add 6 options = 6 colors
  .data(allPoet)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) 
let self = this
function dropchange(){
	var newPoet = d3.select(this).property('value')
	self.GLOBAL.Log_file.push(['timestamp',new Date().getTime()/1000,"Button-Poet-Value",newPoet,'\n'])
	Bus.$emit("Select_Poet", newPoet)
 }

}}   	
}
</script>