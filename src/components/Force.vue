/* eslint-disable */s
<template>
  <div id="force">
    <p>
      <h4>Places connection</h4>
  </div>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson"
import Bus from '../assets/bus.js';

export default {
  name: "App",
  data(){
    return{
      data:undefined,
      place:[],
      all_places:{},
      svg2:undefined,
      width2 :undefined,
      height2 : undefined,
      Hist_select_data:'',
      nodeElements:undefined
    }
  },
  //created(){
    //Bus.$on("Map_place", (val) => {
                //this.place = val;}),
    //Bus.$on("Map_places", (val) => {
                //this.places = val;})},
  mounted() {
    this.generateForce()
    this.handle()
  },
  methods: {
    handle: function () {
    Bus.$on("Map_select_data", (val) => {
                this.data = val
                this.updateForce()
              }),
    Bus.$on("Hist_select_data", (val) => {
                this.Hist_select_data = val
                this.select_new_point()
              })
  },
    generateForce() {
var data_place = []
var width2 = 300,
    height2 = 300;
this.width2 = width2
this.height2 = height2
const svg2 = d3.select("#force").append("svg")

  svg2.attr("width", width2)
    .attr("height", height2);

// center marker
svg2.append('circle')
    .attr('r', 3)
    .attr('cx', width2 / 2)
    .attr('cy', height2 / 2);
this.svg2 = svg2
let self = this
d3.json("sushi_map.json", function(error, point) {
  const places_all = topojson.feature(point, point.objects.places)

var nodes = []
var links=[]
    for(var i=0, len=data_place.length;i<len;i++){
        nodes.push({"name":data_place[i]})
      }
    for(i=1, len=places_all.features.length-1; i<len; i++){
    // (note: loop until length - 1 since we're getting the next
    //  item with i+1)
    var place1 = places_all.features[i].properties.name.toString()
    var place2 = places_all.features[i+1].properties.name.toString()
    // if ((place1 in data)&&(place2 in data)){
    var a = check_in(data_place, place1)
    var b = check_in(data_place, place2)
    if((a=="TRUE") && (b=="TRUE")){
      var index1 = data_place.findIndex(check_equal1)
      var index2 = data_place.findIndex(check_equal2)
      links.push({"source": index1, "target": index2})
    }
}
function check_equal1(place){return place.toString()==place1}
function check_equal2(place){return place.toString()==place2}
function check_in(data, place){
  for(var i=0, len=places_all.features.length-1; i<len; i++){
    var d = data[i]
    if(d== place){
      return 'TRUE'
    }}
  return 'False'
}
var linkElements = svg2.selectAll()
        .data(links)
        .enter()
        .append('line')
        .attr('stroke', 'black')
        .attr('stroke-width', '2px');
self.nodeElements = svg2.selectAll()
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('fill', 'red')
        .call(d3.drag()
              .on('start', dragstarted)
              .on('drag', dragged)
              .on('end', dragended));
var textElements = svg2.selectAll()
  .data(nodes)
  .enter().append('text')
    .text(node => node.name)
    .attr('font-size', 15)
    .attr('dx', 15)
    .attr('dy', 4)
const simulation = d3.forceSimulation()
          .force('link', d3.forceLink().distance(60))
          .force('charge', d3.forceManyBody())
          .force('center', d3.forceCenter(width2 / 2, height2 / 2));

simulation
    .nodes(nodes)
    .on('tick', () => {
  linkElements
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
  self.nodeElements
    .attr('cx', node => node.x)
    .attr('cy', node => node.y)
  textElements
    .attr('x', node => node.x)
    .attr('y', node => node.y)
})

simulation
    .force('link')
    .links(links);

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
})},
updateForce(){
  let self = this
function unique(arr) {
    return arr.filter(function(item, index, arr) {
      // 取出元素, 该元素在数组中第一次出现的索引 === 当前索引值
      return arr.indexOf(item, 0) === index;
    });
}
function countTimes(data) {
    return data.reduce(function(time, name) {
        if (name in time) {
            time[name]++;
        } else {
            time[name] = 1;
        }
        return time;
    }, {});
}

var data_select = []
var data_select1 = []
var place_count = []
for(var i=0, len=this.data.length-1; i<len; i++){
  var d = this.data[i]
  data_select1.push(d.properties.name.toString())}
  data_select = unique(data_select1)
  place_count = countTimes(data_select1)
var max_count = 0
for(i in place_count){
  var item = place_count[i];
  if (item>max_count){
    max_count = item
  }
}
  var height2 = this.height2
  var width2 = this.width2
  var svg2 = this.svg2
d3.json("sushi_map.json", function(error, point) {
  const places_all = topojson.feature(point, point.objects.places)

  svg2.selectAll("*").remove();
  svg2.append('circle')
    .attr('r', 5)
    .attr('cx', width2 / 2)
    .attr('cy', height2 / 2);
var nodes = []
var links=[]
    for(var i=0, len=data_select.length;i<len;i++){
        nodes.push({"name":data_select[i]})
      }
    for(i=1, len=places_all.features.length-1; i<len; i++){
    // (note: loop until length - 1 since we're getting the next
    //  item with i+1)
    var place1 = places_all.features[i].properties.name.toString()
    var place2 = places_all.features[i+1].properties.name.toString()
    // if ((place1 in data)&&(place2 in data)){
    var a = check_in(data_select, place1)
    var b = check_in(data_select, place2)
    if((a=="TRUE") && (b=="TRUE")){
      var index1 = data_select.findIndex(check_equal1)
      var index2 = data_select.findIndex(check_equal2)
      links.push({"source": index1, "target": index2})
    }}
function check_in(data, place){
  for(var i=0, len=places_all.features.length-1; i<len; i++){
    var d = data[i]
    if(d== place){
      return 'TRUE'
    }}
  return 'False'
}
var linkElements = svg2.selectAll()
        .data(links)
        .enter()
        .append('line')
        .attr('stroke', 'black')
        .attr('stroke-width', '2px');
self.nodeElements = svg2.selectAll()
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', function(node){return 7*(place_count[node.name]+4)/(5+max_count)})
        .attr('fill', '#6495ED')
        .call(d3.drag()
              .on('start', dragstarted)
              .on('drag', dragged)
              .on('end', dragended));
var textElements = svg2.selectAll()
  .data(nodes)
  .enter().append('text')
    .text(node => node.name)
    .attr('font-size', 10)
    .attr('dx', 8)
    .attr('dy', 4)

const simulation = d3.forceSimulation()
          .force('link', d3.forceLink().distance(25))
          .force('charge', d3.forceManyBody())
          .force('center', d3.forceCenter(width2 / 2, height2 / 2));

simulation
    .nodes(nodes)
    .on('tick', () => {
  linkElements
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
  self.nodeElements
    .attr('cx', node => node.x)
    .attr('cy', node => node.y)
  textElements
    .attr('x', node => node.x)
    .attr('y', node => node.y)
})

simulation
    .force('link')
    .links(links);

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
    console.log('Drag-Force-Drag From',d.x,d.y)
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    console.log('Drag-Force-Drag To',d.fx,d.fy)
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
function check_equal1(place){return place.toString()==place1}
function check_equal2(place){return place.toString()==place2}})
},
select_new_point(){
  var data = this.Hist_select_data
  this.nodeElements.attr('fill', function(d){return isSelectedByHist(d)})
function isSelectedByHist(a){
  for(var i=0,len=data.length;i<len;i++){
    var place = data[i].properties.name
      if(a.name==place){
        console.log('in')
        return '#BC8F8F'}
    }
  return '#6495ED'}

}
}}
</script>

<style>

.selected{
  fill: yellow;
}