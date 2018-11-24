//Data Struct for Crime Type
var crimeFields = ["Marijuana", "Heroin"];

//Load Data
d3.csv("data/allData.csv", function(error, data) {
    var crimeMap = {};
    data.forEach(function(d) {
        var crime = d.neighborhood;
        crimeMap[crime] = [];

        // { cerealName: [ bar1Val, bar2Val, ... ] }
        crimeFields.forEach(function(field) {
            crimeMap[crime]
                .push( +d[field] );
        });

        data.forEach(function (d) {
            d.Marijuana = +d.Marijuana;
            d.Heroin = +d.Heroin;
        });
    });
    makeVis(crimeMap);
});

var makeVis = function(crimeMap) {

    // Define dimensions of vis
    var margin = { top: 30, right: 50, bottom: 30, left: 50 },
        width  = 550 - margin.left - margin.right,
        height = 250 - margin.top  - margin.bottom;

    // Make x scale
    var xScale = d3.scaleBand()
        .domain(crimeFields)
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
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform","translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-70)")
        .attr("dx", "-.8em")
        .attr("dy",".25em")
        .style("text-anchor", "end")
        .style("font-size", "8px");

    // Create yAxis
    var yAxis = d3.axisLeft(yScale);

    // Add yAxis to canvas
    var yAxisHandleForUpdate = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    yAxisHandleForUpdate.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value");

    var updateBars = function(data) {
        // First update the y-axis domain to match data
        yScale.domain( d3.extent(data) );
        yAxisHandleForUpdate.call(yAxis);

        var bars = svg.selectAll(".bar").data(data);

        // Add bars for new data
        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function(d,i) {
                return xScale( crimeFields[i] );
            })
            .attr("width", xScale.bandwidth())
            .attr("y", function(d,i) {
                return yScale(d);
            })
            .attr("height", function(d,i) {
                return height - yScale(d);
            });

        // Update old ones, already have x / width from before
        bars
            .transition().duration(250)
            .attr("y", function(d,i) {
                return yScale(d);
            })
            .attr("height", function(d,i) {
                return height - yScale(d);
            });

        // Remove old ones
        bars.exit().remove();
    };

    // Handler for dropdown value change
    var dropdownChange = function() {
        var newCrime = d3.select(this).property('value'),
            newData   = crimeMap[newCrime];
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
    updateBars(initialData);
};











