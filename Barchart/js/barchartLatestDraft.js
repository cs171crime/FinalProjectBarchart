
//Data Struct for Crime Type
var neighborhoods = ["Allston",
    "Allston / Brighton",
    "Back Bay",
    "Beacon Hill",
    "Boston",
    "Brighton",
    "Charlestown",
    "Dorchester",
    "Downtown / Financial District",
    "East Boston",
    "Fenway / Kenmore / Audubon Circle / Longwood",
    "Greater Mattapan",
    "Hyde Park",
    "Jamaica Plain",
    "Mattapan",
    "Mission Hill",
    "Roslindale",
    "Roxbury",
    "South Boston",
    "South Boston / South Boston Waterfront",
    "South End",
    "West Roxbury"];



// Define dimensions of vis
var margin = { top: 30, right: 50, bottom: 30, left: 50 },
    width  = 550 - margin.left - margin.right,
    height = 250 - margin.top  - margin.bottom;

// Make x scale
var xScale = d3.scaleBand()
    .domain(neighborhoods)
    .range([0,width])
    .padding(.1);

//Create yScale - domain to be defined on "bar update"
var yScale = d3.scaleLinear()
    .range([height, 0]);

/*var xScale = d3.scaleBand()
    .domain(data.map((d) => d.neighborhood))
    .padding(.1); */

//Draw Canvas
//Set SVG
var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Create xAxis
var xAxis = d3.axisBottom(xScale);

//Add xAxis to canvas - translate and fix ticks


// Create yAxis
var yAxis = d3.axisLeft(yScale);

/*svg.append("g")
    .attr("class", "x axis")
    .attr("transform","translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-70)")
    .attr("dx", "-.8em")
    .attr("dy",".25em")
    .style("text-anchor", "end")
    .style("font-size", "8px");*/

svg.append("g")
    .attr("class", "x-axis axis")
    .attr("transform","translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-70)")
    .attr("dx", "-.8em")
    .attr("dy",".25em")
    .style("text-anchor", "end")
    .style("font-size", "8px");


svg.append("g")
    .attr("class", "y-axis axis")
    .attr(yAxis);

// Add yAxis to canvas

loadData();

Object.defineProperty(window, 'data', {
    get: function() { return _data; },

    set: function(value) {
        _data = value;

        updateVisualization();
    }
});

//Load Data
//Load Data

function loadData() {
    d3.csv("data/allData.csv", function(error, csv) {

        console.log(csv);


        csv.forEach(function (d, i) {
            /* var neigh = d.neighborhood;
             var marij = +d.Marijuana;
             var her = +d.Heroin;

             displayData.push({
                 neighborhood: neigh,
                 marijuana: marij,
                 heroin: her});*/

            d.Marijuana = +d.Marijuana;
            d.Heroin = +d.Heroin;


            // { cerealName: [ bar1Val, bar2Val, ... ] }
            /* neighborhoods.forEach(function (field) {

                 crimeMap[crime]
                     .push(+d[counter]);

             });

             data.forEach(function (d) {
                 d.Marijuana = +d.Marijuana;
                 d.Heroin = +d.Heroin;
             });*/
        });

        data = csv;

        console.log(data);



    });
}



/* // Handler for dropdown value change
 var dropdownChange = function() {
     var newCrime = d3.select(this).property('value'),
         newData = crimeMap[newCrime];
     updateBars(newData);
 };

 // Get names of cereals, for dropdown
 var crimes = Object.keys(crimeMap).sort();

 var dropdown = d3.select("#chart-area")
     .insert("select", "svg")
     .on("change", dropdownChange);

 dropdown.selectAll("option")
     .data(crimes)
     .enter()
     .append("option")
     .attr("value", function (d) {
         return d;
     });

 var initialData = crimeMap[ crimes[0] ];
 updateBars(initialData);*/

function updateVisualization() {

    // First update the y-axis domain to match data

    // yAxisHandleForUpdate.call(yAxis);

    var grouping = d3.select("#selector").node().value;

    console.log(data);
    var maxY = d3.max(data, function (d) {
        if (grouping == "Marijuana") {
            return d.Marijuana;
        } else {
            console.log("fucl");
            console.log(d);
            return d.Heroin;
        }
    });
    console.log(maxY);
    yScale.domain([0, maxY]);

    var bars = svg.selectAll(".bar").data(data);

    // Add bars for new data
    bars.enter()
        .append("rect")
        .attr("fill", "purple")
        .attr("class", "bar")
        .merge(bars)
        .attr("x", function(d,i) {
            return xScale( neighborhoods[i] );
        })
        .attr("width", xScale.bandwidth())
        .attr("y", function(d,i) {
            if (grouping == "Marijuana") return yScale(d.Marijuana);
            else return yScale(d.Heroin);
        })
        .attr("height", function(d,i) {
            if (grouping == "Marijuana") return height - yScale(d.Marijuana);
            else return height - yScale(d.Heroin);
        });

    bars.exit().remove();





    // yScale.domain( d3.extent(displayData.) );
    /* var yAxisHandleForUpdate = svg.append("g")
         .attr("class", "y axis")
         .call(yAxis);

     yAxisHandleForUpdate.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", ".71em")
         .style("text-anchor", "end")
         .text("Value");*/

    svg.select(".x-axis")
        .transition()
        .call(xAxis);

    svg.select(".y-axis")
        .transition()
        .call(yAxis);
}





/*

        var bars = svg.selectAll(".bar").data(data);

        // Add bars for new data
        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("fill", "purple")
            .attr("x", function(d,i) {
                return xScale( neighborhoods[i] );
            })
            .attr("width", xScale.bandwidth())
            .attr("y", function(d,i) {
                return yScale(i);
            })
            .attr("height", function(d,i) {
                return height - yScale(i);
            });
*/

// Update old ones, already have x / width from before

// Remove old ones
// bars.exit().remove();














