
/*****************************************/
/*   DRAW BAR CHART - ALREADY COMPLETE   */
/*****************************************/


// Chart area
var margin = {top: 60, right: 20, bottom: 40, left: 80},
    width = $('#chart-area').width() - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

width = width > 600 ? 600 : width;
width = width < 400 ? 400 : width;

//Create SVG Canvas
var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Load Data (Check to see if data/FINALheroinbyhood notation is correct!)
d3.csv("data/FINALheroinbyhood.csv", function(error, data) {

    //Go through data, convert 'string' to numerical data so as to visualize
    data.forEach(function (d) {
        d.HeroinCrimes = +d.HeroinCrimes;
    });

    //Set domain
    xScale.domain(data.map(function (d) {
        return d.neighborhood;
    }));

    //Set Range
    yScale.domain([0, d3.max(data, function (d) {
        return d.HeroinCrimes;
    })]);

    //Create xAxis
    var xAxis = d3.axisBottom()
        .scale(x);

    //Create yAxis
    var yAxis = d3.axisLeft()
        .scale(y);


    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);


    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function (d) {
            return x(d.neighborhood);
        })
        .attr("width", x.bandwidth())
        .attr("y", function (d) {
            return y(d.HeroinCrimes);
        })
        .attr("height", function (d) {
            return height - y(d.value);
        });


    xScale = d3.scaleBand()
        .domain(data.map(d => d.neighborhood))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.HeroinCrimes)]).nice()
        .range([height - margin.bottom, margin.top]);
});





