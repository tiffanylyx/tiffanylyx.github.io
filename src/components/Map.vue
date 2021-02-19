/* eslint-disable */
<template>
  <div id="map">
    <p>
      <h4>Footprint</h4>
  </div>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson"
//import Vue from 'vue';
import Bus from '../assets/bus.js';
//var msgCenter = new Vue()
export default {
  name: "App",
  data() {
    return {
      select_data:'',
      Hist_select_data:'',
      myCircle:'',
      myLink:'',
      svg:''
    };
  },
  //created() {
    // 在需要的传递数据的时候调用sendData方法，这里模拟调用
    //this.sendData();
  //},
  mounted() {
    this.generateArc();
    this.handle()
    //this.sendData();
  },
  methods: {
    handle: function () {
    Bus.$emit("Map_age", this.select_value),
    Bus.$on("Hist_select_data", (val) => {
      this.Hist_select_data=val;
      this.select_new_point()})},

    generateArc() {
      const width = 600;
      const height = 600;

      const projection = d3.geoAlbers()
          .center([0, 30])
          .rotate([-110, 0])
          .parallels([20, 60])
          .translate([width / 2, height / 2])
          .scale(1370)


      const path = d3.geoPath()
          .projection(projection)
          .pointRadius(2);
      const svg = d3
        .select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      let self = this
      d3.json("sushi_map.json", function(error, point) {
      var subunits = topojson.feature(point, point.objects.china),
      places = topojson.feature(point, point.objects.places);
  var zoom = d3.zoom()
      .scaleExtent([0.5,3])//用于设置最小和最大的缩放比例
      .on("zoom",zoomed) 

  //svg.call(zoom); //调用缩放拖拽功能
 
//编写 平移函数
function reset() {
    
      svg.transition().duration(750).call( //duration过渡时间
        zoom.transform,
        d3.zoomIdentity, //控制缩放中心的为鼠标当前位置
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2]) //弹性动画的圆心位置
      );
}
// 缩放函数
function zoomed() {
    const transform = d3.event.transform; //识别鼠标事件
    console.log('Zoom-Map-Value',transform)
    group.attr("transform", transform); //将缩放结果传给g
    var k = Math.sqrt(100 / projection.scale()); //修改地图尺寸
    group.attr("stroke-width", 1 / k); //修改对应的属性
}

    var group = svg.append("g").attr("id","group").datum({
    x: 0,
    y: 0
  }).on("click", reset);  //定义点击事件
      var g1 = group.append("g").attr("id","for_path"); //新增组，用于存储不同对象
      var g2 = group.append("g").attr("id","for_circle");
      var g3 = group.append("g").attr("id","for_line").attr("pointer-events","none");


  g1.selectAll(".subunit")
      .data(subunits.features)
    .enter().append("path")
      .attr("class", function(d) { return "subunit " + d.id; })
      .attr("d", path)
      .attr('stroke','#222')
      .attr('stroke-width','1px')
      .attr('fill','#ddd');

// 
var link1s = [
  {type: "LineString", age:0,coordinates: [[0,0],[0,0]]}
]
    for(var i=0, len=places.features.length-1; i<len; i++){
    // (note: loop until length - 1 since we're getting the next
    //  item with i+1)
        link1s.push({
            type: "LineString",
            age : places.features[i].properties.age,
            coordinates: [
                [ places.features[i].geometry.coordinates[0], places.features[i].geometry.coordinates[1]],
                [ places.features[i+1].geometry.coordinates[0], places.features[i+1].geometry.coordinates[1]]]
        });
    }
    g3.append('svg:defs').append('svg:marker')
        .attr('id', 'end-arrow')
        .attr('viewBox', '0 -5 8 8')
        .attr('refX', 8)
        .attr('markerWidth', 3)//箭头参数适当按需调整
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')//绘制箭头形状
        .attr('fill', '#483D8B');
  // 加label
  self.myCircle = g2.selectAll(".place-point")
      .data(places.features)
    .enter()
    .append("circle")
      .attr("class", "place-point")
      .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
      .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
      .attr("dy", ".35em")
      .attr("r", function(d) { return d.properties.age/8; })
      .attr("fill", "#6495ED")
      .attr("opacity",0.7)
  self.myLink = g3.selectAll("myPath")
      .data(link1s)
      .enter()
      .append("path")
        .attr("d", function(d){ return path(d)})
        .style("fill", "none")
        .style("stroke", "#483D8B")
        .style("stroke-width", 1.6)
        .style("opacity",0.5)
        .attr("marker-end", "url(#end-arrow)")
  self.svg = svg
  /*
  svg
    .call( d3.brush()                 // Add the brush feature using the d3.brush function
      .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("end", updata_chart)
    )
    */
var allGroup = ['none',"select area", "zoom1", "show point info"]
var dropdownButton = d3.select("#map")
  .append('select')
  .on("change", dropchange)

// add the options to the button
dropdownButton // Add a button
  .selectAll('myOptions') // Next 4 lines add 6 options = 6 colors
  .data(allGroup)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) 

var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
var g4 = group.append("g").attr("id","for_brush"); //

function dropchange(){
  var newCereal = d3.select(this).property('value')
  if (newCereal=='zoom1'){
    svg.call(zoom)
  }
  else if (newCereal=='select area'){
    svg.on('.zoom', null)
    g4.style("display","block")
  g4
    .call( d3.brush()                 // Add the brush feature using the d3.brush function
      .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("end", updata_chart)
    )    
  }
  else if ((newCereal=='show point info'))
    {svg.on('.zoom', null)
      g4.style("display","none")
      self.myCircle.on("mouseover", function(d){return tooltip.style("visibility", "visible").text(d.properties.name+','+d.properties.age+'岁'),
      d3.select(this).attr("fill","#BC8F8F"),
      d3.select("#map").on('mousemove', function()
    {console.log('Hover-Map-Position',d3.mouse(this)); });})
    .on("mousemove", function(d){return tooltip.style("top",
    (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(d.properties.name+','+d.properties.age+'岁');})
    .on("mouseout", function(){return tooltip.style("visibility", "hidden"),d3.select(this).transition().duration(500).attr("fill","#6495ED");})
    }
    /*
  else if ((newCereal='zoom1')) {
self.svg.call(zoom)
  }*/
}

  function updata_chart(){
    var select_data = update_data()
  Bus.$emit("Map_select_data", select_data)
  }

  function update_data() {
    var select_data = []
    var extent = d3.event.selection
    self.myCircle.classed("selected_first", function(d){ return isBrushed(extent, projection(d.geometry.coordinates)[0],projection(d.geometry.coordinates)[1]) } )
    console.log('Brush-Map-Position',extent)
    for(i=0, len=places.features.length-1; i<len; i++){
      var d = places.features[i]
      if(isBrushed(extent, projection(d.geometry.coordinates)[0],projection(d.geometry.coordinates)[1]))
        {//a = a+parseInt(d.properties.age)}
        select_data.push(d)}
      }
      return select_data
      }

function isBrushed(brush_coords, cx, cy) {
       var x0 = brush_coords[0][0],
           x1 = brush_coords[1][0],
           y0 = brush_coords[0][1],
           y1 = brush_coords[1][1];
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
  }

  })},
  
  select_new_point(){
    var data = this.Hist_select_data
    this.myCircle.classed("selected_second", function(d){return isSelectedByHist(d)})
    //this.myLink.style("stroke",function(d) {return LinkisSelectedByHist(d)})
    //this.myLink.style("opacity",function(d) {return LinkisSelectedByHist_O(d)})
    //this.myLink.style("stroke-width",function(d) {return LinkisSelectedByHist_S(d)})
    
function isSelectedByHist(a){
  for(var i=0,len=data.length;i<len;i++){
    var geo = data[i].geometry.coordinates
    var age_select = data[i].properties.age
    if (a.geometry.coordinates==geo){
      if(a.properties.age==age_select){
        return (1==1)
      }}}
  return (1==0)}
}}
};
</script>
<style>

.selected_first {
  stroke: black;
  stroke-width: 1px;
}
.selected_second {
  opacity: 1;
  stroke: black;
  stroke-width: 1px;
  fill: #BC8F8F;
}
.subunit.SCT { fill: #ddc; }
.subunit.WLS { fill: #cdd; }
.subunit.NIR { fill: #cdc; }
.subunit.ENG { fill: #dcd; }

.subunit.IRL,
.subunit-label.IRL {
  display: none;
}

.subunit-boundary {
  fill: none;
  stroke: #777;
  stroke-dasharray: 2,2;
  stroke-linejoin: round;
}

.subunit-boundary.IRL {
  stroke: #aaa;
}

.subunit-label {
  fill: #777;
  fill-opacity: .5;
  font-size: 20px;
  font-weight: 300;
  text-anchor: middle;
}
.place-point
.place
.place-label {
  fill: #444;
}

text {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 10px;
  pointer-events: none;
}
#label {
  position: absolute;
  left: 10px;
  font-weight: 100;
  font-family: "Proxima Nova", "Montserrat", sans-serif;
}

.hover {
    fill: yellow;   
}
/*
#sliderContainer {
    text-align: center;
    top: 600px;
    left:10px;
}
#histplot{
    text-align: center;
    top: 600px;
    left:10px;
}
#map {
    top: 2000px;
    left:1000px;
}
*/
</style>