/* eslint-disable */
<template>
  <div id="hist">
     <p>
      <h4>Distribution of visit against age</h4>
  </div>
</template>

<script>
import * as d3 from "d3";
import Bus from '../assets/bus.js';

export default {
  name: "App",
  data(){
    return{
      data:undefined,
      svg:undefined,
      x:undefined,
      y:undefined,
      yAxis:undefined,
      u:undefined,
      height1:undefined,
      select_data_from_hist:undefined
    }
  },
  created(){
    Bus.$on("Map_select_data", (val) => {
                this.data = val;})},
  mounted() {
    this.generateHist();
    this.handle()
  },
  //watch:{handle(newval){
    //this.age=newval,
    //this.generateHist()}},
  methods: {
    handle: function () {
    Bus.$on("Map_select_data", (val) => {
                this.data = val;
                this.updatehist()
              })},
    generateHist() {
      //let age = this.$root.age_select
      var min = 10;
      var max = 70;
      var domain = [min,max];
      var a = [19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,30,30,30,30,30,31,31,31,31,31,31,31,31,32,32,32,32,32,32,32,32,33,35,35,35,35,35,35,35,35,35,35,35,35,35,35,36,36,36,36,36,36,36,36,36,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,41,41,41,41,41,41,41,41,41,41,41,42,42,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,45,45,45,45,45,45,45,45,45,45,45,45,46,46,46,46,46,46,46,46,46,46,47,47,47,47,47,47,47,47,47,47,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,53,53,53,53,53,53,53,53,53,53,53,53,53,55,55,55,55,55,55,55,55,55,55,55,55,56,56,56,56,56,56,56,56,56,56,57,57,57,57,57,57,57,57,57,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,59,59,59,59,61,61,61,61,61,61,61,61,61,61,62,62,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65]
      var margin = { top: 10, right: 10, bottom: 30, left: 20 },
        width1 = 300 - margin.left - margin.right
      this.height1 = 270 - margin.top - margin.bottom;
      const svg1 = d3
        .select("#hist")
        .append("svg")
        .attr("width", width1 + margin.left + margin.right)
        .attr("height", this.height1 + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var x = d3
          .scaleLinear()
          .domain(domain) 
          .range([0, width1]); 
        
        svg1.append("g")
          .attr("transform", "translate(0," + this.height1 + ")")
          .call(d3.axisBottom(x));
          // Y axis: initialization
        var y = d3.scaleLinear()
          .range([this.height1, 0]);
        this.yAxis = svg1.append("g")
        var nBin=24
        var histogram = d3
          .histogram()
          .domain(x.domain()) // then the domain of the graphic
          .thresholds(x.ticks(nBin)); // then the numbers of bins

        // And apply this function to data to get the bins
        var bins = histogram(a);
        // Add the svg element to the body and set the dimensions and margins of the graph

        y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
        this.yAxis
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y));
        this.u = svg1
          .selectAll("rect")
          .data(bins)

        this.u.enter()
          .append("rect")
          .attr("x", 1)
          .merge(this.u)
          .transition()
          .attr("height", (d)=>this.height1 - y(d.length))
          .attr("transform", function(d) { 
            return "translate(" + x(d.x0) + "," + y(d.length) + ")"; 
          })
          .attr("width", function(d) {
            return x(d.x1) - x(d.x0) - 1})
          .attr("fill", "#6495ED")
          this.x = x
          this.y = y
          this.svg = svg1}, 
updatehist(){
var all_data = this.data
var age = []
for(var i=0, len=this.data.length-1; i<len; i++){
  var d = this.data[i]
  age.push(parseInt(d.properties.age))}
var svg1 = this.svg
var x = this.x
var y = this.y
// The number of bins 
var nBin=24
var histogram = d3
  .histogram()
  .domain(x.domain()) // then the domain of the graphic
  .thresholds(x.ticks(nBin)); // then the numbers of bins

// And apply this function to data to get the bins
var bins = histogram(age);
// Add the svg element to the body and set the dimensions and margins of the graph
y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
this.yAxis
.transition()
.duration(1000)
.call(d3.axisLeft(y));

this.u = svg1
  .selectAll("rect")
  .data(bins)

  this.u.enter()
  .append("rect")
  .attr("x", 1)
  .merge(this.u)
  .transition()
  .attr('height', (d)=>this.height1 - y(d.length))
  .attr("transform", function(d) { 
    return "translate(" + x(d.x0) + "," + y(d.length) + ")"; 
  })
  .attr("width", function(d) {
    return x(d.x1) - x(d.x0) - 1})
  .attr("fill", "#6495ED")
  .attr("id",function(d){
    return 20+2*(x(d.x0)-70)/14
  })
var select_age_by_column = []
this.u.on("click",function(){
    var that = this
    select_age_by_column.push(that.id)
    d3.select(that)
    .transition()
    .duration(500)
    .attr("fill", "#BC8F8F");
var select_data_from_hist = []
for(i=0, len=all_data.length-1; i<len; i++){
  d = parseInt(all_data[i].properties.age)
  for(var j=0,len2=select_age_by_column.length;j<len2;j++){
    if(d-2<select_age_by_column[j]){
      if (d>select_age_by_column[j]-1){
      select_data_from_hist.push(all_data[i])
    }}
  }}
Bus.$emit("Hist_select_data", select_data_from_hist)
})
}}
}
</script>