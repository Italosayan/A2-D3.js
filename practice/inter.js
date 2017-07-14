function createSoccerViz() {

	//Import data
	d3.csv("wordcup.csv", function(data){
		overallTeamViz(data);
	})

	//Handle data
	function overallTeamViz(incomingdata){

		//Locate the main g
		d3.select("svg")
		.append("g")
		.attr("id","teamsG")
		.attr("transform","translate(50,300)")
		// enter the mini G's
		.selectAll("g")
		.data(incomingdata)
		.enter()
		.append("g")
		.attr("class", "overallG")
		.attr("transform",
			function(d,i){return "translate("+(i*50)+" ,0)"});

		//For all the mini G's variable
		var teamG = d3.selectAll("g.overallG");

		//Append circles and their style inside the mini G's
		teamG
		.append("circle")
		.attr("r",0)
		.transition().delay(function(d,i){return i*100}).duration(500).attr("r",40)
		.transition().duration(500).attr("r",20)
		.style("fill", "pink")
		.style("stroke", "black")
		.style("stroke-width","1px")

		//text of the mini G's
		teamG
		.append("text")
		.style("text-anchor","middle")
		.attr("y",30)
		.style("font-size","10px")
		.text(function(d) {return d.team;});

		//d3.keys takes the data and returns an array object
		var dataKeys = d3.keys(incomingdata[0]).filter(function(el){
			return el != "team" && el != "region";
 		});

 		//Create the buttoms with the html that and link them to the buttonclick function
 		d3.select("#controls").selectAll("button.teams")
 		.data(dataKeys).enter()
 		.append("button")
 		.on("click",buttonclick)
 		.html(function(d) {return d;});

 		//datakeyp returns the win or loss array. Use all the elements in the array
 		//anonymous functions are used.
 		function buttonclick(datakeyp){
 			var maxValue = d3.max(incomingdata, function(d){
 				return parseFloat(d[datakeyp]);
 			});

 			var radiusScale = d3.scaleLinear().domain([0, maxValue]).range([2,20]);

 			teamG
 			.select("circle")
 			.transition().duration(1000)
 			.attr("r",function(d){
 				return radiusScale(d[datakeyp]);
 			});
 		};

 		//d.region is the region of the team the user goes over(with the mouse)
 		//p.region is the region of all the teams
 		teamG.on("mouseover",highlightregion);
 		function highlightregion(d) {
 			teamG.select("circle")
 			.style("fill",function(p){
 				return p.region == d.region ? "red" : "gray";
 			});
 		};
 		//When mouse is out return to normal
 		teamG.on("mouseout", function(){
 			teamG.select("circle").style("fill","pink");
 		})
 	}
}
