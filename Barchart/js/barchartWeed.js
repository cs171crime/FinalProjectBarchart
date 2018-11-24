//Sources:
// For Bar-Chart Structure: https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/


//Set Chart Area
var margin = 60,
    width = 880,
    height = 500;

//Set SVG
var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + 300)
    .attr("height", 2000)
    .append("g")
    .attr("transform", "translate(60,60)");

//Load Data (Check to see if data/heroinData notation is correct!)
d3.csv("data/weedData.csv", function(error, data) {

    //Go through data, convert 'string' to numerical data so as to visualize
    data.forEach(function (d) {
        d.MarijuanaCrimes = +d.MarijuanaCrimes;
    });

    data.sort(function(a,b) {
        return b.MarijuanaCrimes - a.MarijuanaCrimes;
    });

    //Create yScale
    var yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, function(d) {
            return d.MarijuanaCrimes
        })]);

    var xScale = d3.scaleBand()
        .range([0,width])
        .domain(data.map((d) => d.neighborhood))
        .padding(.1);

    //Create xAxis
    var xAxis = d3.axisBottom(xScale);

    svg.append("g")
        .attr("transform","translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-70)")
        .attr("dx", "-.8em")
        .attr("dy",".25em")
        .style("text-anchor", "end");

    //Create yAxis
    var yAxis = d3.axisLeft(yScale);
    svg.append("g").call(yAxis);

    //Draw in Bars - From Website Sourced at Header of File
    svg.selectAll()
    //Below Code to Sort not working?
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d) => xScale(d.neighborhood))
        .attr('y', (d) => yScale(d.MarijuanaCrimes))
        .attr('height', (d) => height - yScale(d.MarijuanaCrimes))
        .attr('width', xScale.bandwidth());

})
