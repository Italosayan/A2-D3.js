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
	.attr("transform","translate(140,100)")
	//Appeding sub groups to the initial group
	.selectAll("g").data(incomingdata).enter().append("g")
	.attr("class","func")

	// Entering "función" text
	d3.select("svg")
	.append("text")
	.attr("x",20)
	.attr("y",40)
	.style("text-anchor","center")
	.style("font-size","23px")
	.text("Funci\u00f3n del estado");

	//Entering year text
	var years = ["2017","2016","2015","2014"]
	d3.select("svg")
	.append("g").attr("id","yeartexts")
	.attr("transform", "translate(410,0)")
	.selectAll("text").data(years).enter().append("text")
	.attr("x",function(d,i){return i*200;})
	.attr("y",40)
	.style("text-anchor","center")
	.style("font-size","23px")
	.text(function(d){return d;});

	//A variable to refer to all the subgroups
	var funcs = d3.selectAll("g.func");

	var S2017 = [];
	// Max range of Yscale
	var iter = 75 + 45;
	//S2017 will be used as positioning of the circles using an acumulation.
	//The idea is to accumulate the radio of all circles to place the next one.	
	for (var i = 0; i < incomingdata.length; i++) {
		if (i==0){
			S2017.push(Math.round(75));
		} else {
			iter = iter + 20 + yScale(incomingdata[i].Soles2017);
			S2017.push(Math.round(iter));
		}
	};

	d3.select("svg")
	.append("g")
	.attr("id","textfunc")
	.attr("transform","translate(130,90)")
	//Appeding sub groups to the initial group
	.selectAll("g").data(incomingdata).enter().append("g")
	.append("text")
	.attr("x",-100)
	.attr("y", function(d,i){return S2017[i]*1.05})
	.style("text-anchor","left")
	.style("font-size","20px")
	.text(function(d) {return d.FUNCIONAL;});

	//Append a circle in each subgroup
	funcs
	.append("circle")
	.attr("cx",300)
	.attr("cy", function(d,i){return S2017[i]})
	.attr("r",0)
	.attr("class",function(d,i) {return d.FUNCIONAL;})
	.transition().delay(function(d,i){return i*100}).duration(500).attr("r",function(d,i){return yScale(d.Soles2017)})
	//Append a text(percentage spent) in each subgroup;
	funcs
	.append("text")
	.attr("class", function(d,i) {return d.FUNCIONAL;})
	.text(function(d){return Math.round(d.Porcentaje2017*10000)/100 +"%"; })
	.attr("x", 280)
	.attr("y",function(d,i){return S2017[i]+5})
	.attr("visibility","hidden");

	//2016
	funcs
	.append("circle")
	.attr("cx",500)
	.attr("cy", function(d,i){return S2017[i]})
	.attr("r",0)
	.attr("class",function(d,i) {return d.FUNCIONAL;})
	.transition().delay(function(d,i){return i*100}).duration(500).attr("r",function(d,i){return yScale(d.Soles2016)})
	//Percentaje text 2016
	funcs
	.append("text")
	.attr("class", function(d,i) {return d.FUNCIONAL;})
	.text(function(d){return Math.round(d.Porcentaje2016*10000)/100 +"%"; })
	.attr("x", 480)
	.attr("y",function(d,i){return S2017[i]+5})
	.attr("visibility","hidden");

	//2015
	funcs
	.append("circle")
	.attr("cx",700)
	.attr("cy", function(d,i){return S2017[i]})
	.attr("r",0)
	.attr("class",function(d,i) {return d.FUNCIONAL;})
	.transition().delay(function(d,i){return i*100}).duration(500).attr("r",function(d,i){return yScale(d.Soles2015)})
	//2015 Percentaje text
	funcs
	.append("text")
	.attr("class", function(d,i) {return d.FUNCIONAL;})
	.text(function(d){return Math.round(d.Porcentaje2015*10000)/100 +"%"; })
	.attr("x", 680)
	.attr("y",function(d,i){return S2017[i]+5})
	.attr("visibility","hidden");

	//2014
	funcs
	.append("circle")
	.attr("cx",900)
	.attr("cy", function(d,i){return S2017[i]})
	.attr("r",0)
	.attr("class",function(d,i) {return d.FUNCIONAL;})
	.transition().delay(function(d,i){return i*100}).duration(500).attr("r",function(d,i){return yScale(d.Soles2014)})
	//2014 Percentage text
	funcs
	.append("text")
	.attr("class", function(d,i) {return d.FUNCIONAL;})
	.text(function(d){return Math.round(d.Porcentaje2014*10000)/100 +"%"; })
	.attr("x", 880)
	.attr("y",function(d,i){return S2017[i]+5})
	.attr("visibility","hidden");

	var hola = d3.select("#masterg")
	console.log(hola)


	d3.selectAll("circle")
	.on("mouseover",percentageshow);

	function percentageshow(d){
		d3.selectAll("circle")
		.style("stroke",function(p){
			return p.FUNCIONAL == d.FUNCIONAL ? "black" : "none";
		})
		.style("stroke-width","2px")
		.style("stroke-dasharray","10 5")

		d3.select("#masterg").selectAll("text")
		.attr("visibility",function(p){
			console.log("ppp");
			console.log(p);
			return p.FUNCIONAL == d.FUNCIONAL ? "visible" : "hidden";
		});
	}

	d3.selectAll("circle")
	.on("mouseout", function(){
		d3.selectAll("circle")
		.style("stroke","none");

		d3.select("#masterg").selectAll("text")
		.attr("visibility","hidden")
	})

}





