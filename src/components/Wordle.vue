/* eslint-disable */
<template>
  <div id="Wordle">
     <p>
      <h4>Wordle</h4>
  </div>
</template>


<script>
import * as d3 from "d3";

export default {
  name: "App",
  data(){
    return{
      svg3:undefined
    }
  },
  //created(){
    //Bus.$on("Map_place", (val) => {
                //this.place = val;}),
    //Bus.$on("Map_places", (val) => {
                //this.places = val;})},
  mounted() {
    this.generateWord()
  },
  methods: {
    generateWord() {

// set the dimensions and margins of the graph
var margin = {top: 0, right: 5, bottom: 40, left: 30},
    width = 300 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#Wordle")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// Parse the Data
d3.csv("sushi_wordcount.csv", function(data) {

data.sort(function(b, a) {
  return a.count - b.count;
});


// Add X axis
var x = d3.scaleLinear()
  .domain([0, 130])
  .range([ 0, width]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Y axis
var y = d3.scaleBand()
  .range([ 0, height ])
  .domain(data.map(function(d) { return d.word; }))
  .padding(1);
svg.append("g")
  .call(d3.axisLeft(y))

// Lines
svg.selectAll("myline")
  .data(data)
  .enter()
  .append("line")
    .attr("x1", function(d) { return x(d.count); })
    .attr("x2", x(0))
    .attr("y1", function(d) { return y(d.word); })
    .attr("y2", function(d) { return y(d.word); })
    .attr("stroke", "grey")

// Circles
svg.selectAll("mycircle")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", function(d) { return x(d.count); })
    .attr("cy", function(d) { return y(d.word); })
    .attr("r", "7")
    .style("fill", "#6495ED")
    .attr("stroke", "black")
    .on("mouseover", function(d){return mouseover(d)})
    .on("mousemove", function(d){return tooltip.style("top",
    (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").attr("data-html", "true").html('Word:'+d.word+'<br/>'+'Count:'+d.count+'  Poet:'+d.name)})
    .on("mouseout", function(){return tooltip.style("visibility", "hidden")})
});
var tooltip = d3.select("#Wordle")
    .append("div")
    .style("width",'100px')
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
     .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")
let self = this
function mouseover(d){
	tooltip.style("visibility", "visible")
	.html('Word:'+d.word+'<br/>'+'Count:'+d.count+'  Poet:'+d.name)
	d3.select("#Wordle")
	.on('mouseover', function(){self.GLOBAL.Log_file.push(['timestamp',new Date().getTime()/1000,'hover-wordle-position',d3.mouse(this),d.word,'\n']); })
}
}}
}

</script>