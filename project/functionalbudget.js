// Importing the data
d3.csv("funcional.csv", function(error,data) {
	data.forEach(function(d){
		//Casting the variables
		d.Soles2017 = parseInt(d.Soles2017)
		d.Porcentaje2017 = parseFloat(d.Porcentaje2017)
		d.Soles2016 = parseInt(d.Soles2016)
		d.Porcentaje2016 = parseFloat(d.Porcentaje2016)
		d.Soles2015 = parseInt(d.Soles2015)
		d.Porcentaje2015 = parseFloat(d.Porcentaje2015)
		d.Soles2014 = parseInt(d.Soles2014)
		d.Porcentaje2014 = parseFloat(d.Porcentaje2014)
	});
	//Sorting in a descending order
	data.sort(function(a,b) { return b.Soles2017 - a.Soles2017 ;});
	dataViz(data);
});


function dataViz(incomingdata){
	//Getting the maximun value in order to use as a scale latter
	var max2017 = d3.max(incomingdata, function(el) {return el.Soles2017;})
	var yScale = d3.scaleLinear().domain([0,max2017]).range([0,100]).clamp(true);

	//Appending a group to the svg
	d3.select("svg")
	.append("g")
	.attr("id","masterg")
	.attr("transform","translate(140,40)")
	//Appeding sub groups to the initial group
	.selectAll("g").data(incomingdata).enter().append("g")
	.attr("class","func")
	.attr("transform",
		function(d,i){ return "translate(" + 10 + "," + (i*38) + ")";
	});
	// Entering "función" text
	d3.select("svg")
	.append("text")
	.attr("x",20)
	.attr("y",30)
	.style("text-anchor","center")
	.style("font-size","20px")
	.text("Funci\u00f3n");

	//A variable to refer to all the subgroups
	var funcs = d3.selectAll("g.func");

	var S2017 = [];
	// Max range of Yscale
	var iter = 75 + 40;
	//S2017 will be used as positioning of the circles using an acumulation.
	//The idea is to acumulate the radio of all circles to place the next one.
	for (var i = 0; i < incomingdata.length; i++) {
		if (i==0){
			S2017.push(Math.round(75));
		} else {
			iter = iter + 20 + yScale(incomingdata[i].Soles2017);
			S2017.push(Math.round(iter));
		}
	};
	console.log(S2017)

	//Append a circle in each subgroup
	funcs
	.append("circle")
	.attr("cx",200)
	.attr("cy", function(d,i){return S2017[i]})
	.attr("r",0)
	.style("fill", "#e74c3c")
	.style("stroke", "#b45c1f")
	.style("stroke-width","1px")
	.transition().delay(function(d,i){return i*100}).duration(500).attr("r",function(d,i){return yScale(d.Soles2017)})

	//Append a text(area of spending) in each subgroup
	funcs
	.append("text")
	.attr("x",-130)
	.attr("y", function(d,i){return S2017[i]})
	.style("text-anchor","left")
	.style("font-size","20px")
	.text(function(d) {return d.FUNCIONAL;});

	//Append a text(percentage spent) in each subgroup
	funcs
	.append("text")
	.attr("x",185)
	.attr("y", function(d,i){return S2017[i]})
	.style("text-anchor","center")
	.style("font-size","15px")
	.text(function(d) {return Math.round(d.Porcentaje2017 * 10000) / 100;});

}





