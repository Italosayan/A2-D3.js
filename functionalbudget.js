
d3.csv("firstgraph.csv", function(error,data) {
	data.forEach(function(d){
		d.Soles = parseInt(d.Soles)
		d.Porcentaje = parseFloat(d.Porcentaje)
	});
	dataViz(data);
});

var yScale = d3.scaleLinear().domain([0,30000]).range([0,100]).clamp(true);
var radioscale = d3.scaleLinear().domain([0,30000]).range([0,20]).clamp(true);

function dataViz(incomingdata){

	d3.select("svg")
	.selectAll("rect")
	.data(incomingdata)
	.enter()
	.append("rect")
	.attr("width",20)
	.attr("height",function(d) {return yScale(d.Soles);})
	.style("fill","green")
	.style("stroke","red")
	.style("stroke-width", "2px")
	.style("opacity",.25)
	.attr("x", function(d,i) {return i*23+20})
	.attr("y", function(d) {return 200-yScale(d.Soles);});

	d3.select("svg:nth-child(2)")
	.selectAll("circle")
	.data(incomingdata)
	.enter()
	.append("circle")
	.style("fill","blue")
	.style("stroke","green")
	.style("stroke-width", "3px")
	.style("opacity",.25)
	.attr("cx", function(d,i) {return 300})
	.attr("cy", function(d,i) {return i*42+30})
	.transition().delay(1000).duration(3000).attr("r", function(d) {return radioscale(d.Soles)+4;});

	var ggg = d3.select("svg:nth-child(2)")
	.selectAll("g")
	.data(incomingdata)
	.enter()
	.append("g")
	.attr("transform",function(d,i) {
		return "translate(" + 10 + "," + (i*42+30) + ")";
	});

	ggg.append("text")
	.text(function(d) { return d.FUNCIONAL + " " + Math.round(d.Porcentaje*100*10)/10 + "%" ; });
}





