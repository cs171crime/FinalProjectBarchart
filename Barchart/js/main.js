// DATA-SETS
// Global variable with 1198 pizza deliveries
console.log(FINALheroinbyhood);


createVisualization();

function createVisualization() {
    dataSummary(deliveryData);
    renderBarChart(deliveryData);
}

// Function to summarize data

function dataFilter() {
    var selectBox_Area = document.getElementById("select-Area");
    var selectedValue_Area = selectBox_Area.options[selectBox_Area.selectedIndex].value;

    var selectBox_orderType = document.getElementById("select-orderType");
    var selectedValue_orderType = selectBox_orderType.options[selectBox_orderType.selectedIndex].value;
    console.log(selectedValue_orderType);

    var exper = deliveryData;

    if (selectedValue_Area === "all" && selectedValue_orderType === "all") {
        dataSummary(deliveryData);
        renderBarChart(deliveryData);
    }

    else if (selectedValue_Area !== "all" && selectedValue_orderType === "all") {
        exper = deliveryData.filter(function (value) {
            return (value.area === selectedValue_Area);
        });
        console.log(exper);
        dataSummary(exper);
        renderBarChart(exper);
    }

    else if (selectedValue_Area === "all" && selectedValue_orderType !== "all") {
        exper = deliveryData.filter(function (value) {
            return (value.order_type === selectedValue_orderType);
        })

        console.log(exper);
        dataSummary(exper);
        renderBarChart(exper);
    }

    else {
        exper = deliveryData.filter(function (value) {
            return (value.area === selectedValue_Area);
        })
        exper = exper.filter(function (value) {
            return (value.order_type === selectedValue_orderType);
        })

        console.log(exper);
        dataSummary(exper);
        renderBarChart(exper);
    }

}
/* ************************************************************
 *
 * ADD YOUR CODE HERE
 * (accordingly to the instructions in the HW2 assignment)
 *
 * 1) Filter data
 * 2) Display key figures
 * 3) Display bar chart
 * 4) React to user input and start with (1)
 *
 * ************************************************************/



