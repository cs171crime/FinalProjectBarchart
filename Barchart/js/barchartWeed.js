//Sources:
// For Bar-Chart Structure: https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
// Watched Following Video for Help with Implementing Barchart structure: https://www.youtube.com/watch?v=Fjmxh-gnBM0


//Set Chart Area
var margin = 60,
    width = 880,
    height = 500;

//Set SVG
var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + 300)
    .attr("height", 2500)
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

    //Translate Bar downwards and fix the tick labels
    svg.append("g")
        .attr("transform","translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-70)")
        .attr("dx", "-.8em")
        .attr("dy",".25em")
        .style("text-anchor", "end")
        .style("font-size", "8px");

    //Create yAxis
    var yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .call(yAxis)
        .style("font-size","8px");

    //Draw in Bars - From First Website Sourced at Header of File
    svg.selectAll()
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d) => xScale(d.neighborhood))
        .attr('y', (d) => yScale(d.MarijuanaCrimes))
        .attr('height', (d) => height - yScale(d.MarijuanaCrimes))
        .attr('width', xScale.bandwidth());

    //Add Labels for y axis
    svg.append('text')
        .attr('x', -220)
        .attr('y', -45)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Marijuana Crimes');

    //Add Labels for x axis
    svg.append('text')
        .attr('x', width / 2 + margin)
        .attr('y', 700)
        .attr('text-anchor', 'middle')
        .text('Neighborhood')
        .style("font-size", "20px");

    //Add Title for Barchart
    svg.append('text')
        .attr('x', width / 2 + margin)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('Marijuana Crimes in Boston');

    //Label the bars with the data for each neighborhood - TEMP: Add Dynamic Tooltips
    svg.selectAll()
        .data(data)
        .enter()
        .append("text")
        .text(function(d) {
            return d.MarijuanaCrimes;
        })
        .attr("x", function(d) {
            return xScale(d.neighborhood) + xScale.bandwidth()/2;
        })
        .attr("y", function(d) {
            return yScale(d.MarijuanaCrimes) + 7;
        })
        .style("fill", "white")
        .style("text-anchor", "middle")
        .style("font-size", "8px");


})
