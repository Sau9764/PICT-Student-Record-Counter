const $ = require('jquery')
const fs = require('fs')
const readline = require('readline');

// Request for the data to node js server
$("#myButton").click(function(){
	$.ajax({
		url: 'http://localhost:9000/',
		dataType: 'json',
		success: function(data){
			console.log("Request Sent");
		}
	});
})

// Reading the file saved on node js sever
function myFunction(){

	// readline 
	const readInterface = readline.createInterface({
		input: fs.createReadStream('F:/Project/# Resume Projects/3 PICT Student Record Analyzer/google-sheet-api/StudentData.txt'),
		output: process.stdout,
		console: false
	});

	readInterface.on('line', function(line) {
		var obj = JSON.parse(line);
		myCreateFunction(obj);
	});


}

// Getting object and display to app
function myCreateFunction(obj) {

  var table = document.getElementById("myTable");
  var row = table.insertRow(table.rows.rowCount);
  row.id = "tableRows";
  row.insertCell(0).innerHTML = obj.enterfullname;
  row.insertCell(1).innerHTML = obj.enterfinalcgpa;
  row.insertCell(2).innerHTML = obj.selectbranch;
  row.insertCell(3).innerHTML = obj.passoutyear;

}

// Function calling as soon as the index page is loaded and content read the data
myFunction();

// $("ViewData").click(myFunction());

// Display the graph for the data representation
function viewGraph(){
	am4core.ready(function() {
		// Themes begin
		am4core.useTheme(am4themes_animated);
		// Themes end
		// Create chart instance
		var chart = am4core.create("chartdiv", am4charts.PieChart);
		// Add data
		chart.data = [ {
		"country": "Lithuania",
		"litres": 501.9
		}, {
		"country": "Czechia",
		"litres": 301.9
		}, {
		"country": "Ireland",
		"litres": 201.1
		}, {
		"country": "Germany",
		"litres": 165.8
		}, {
		"country": "Australia",
		"litres": 139.9
		}, {
		"country": "Austria",
		"litres": 128.3
		}, {
		"country": "UK",
		"litres": 99
		}, {
		"country": "Belgium",
		"litres": 60
		}, {
		"country": "The Netherlands",
		"litres": 50
		} ];

		// Add and configure Series
		var pieSeries = chart.series.push(new am4charts.PieSeries());
		pieSeries.dataFields.value = "litres";
		pieSeries.dataFields.category = "country";
		pieSeries.slices.template.stroke = am4core.color("#fff");
		pieSeries.slices.template.strokeWidth = 2;
		pieSeries.slices.template.strokeOpacity = 1;

		// This creates initial animation
		pieSeries.hiddenState.properties.opacity = 1;
		pieSeries.hiddenState.properties.endAngle = -90;
		pieSeries.hiddenState.properties.startAngle = -90;

	}); // end am4core.ready()
}


// // using normal read
	// var filepath = "F:/Project/google-sheet-api/StudentData.txt";
	// fs.readFile(filepath, 'utf-8', (err, data) => {
	// 	if(err){
	// 		alert("An error ocurred reading the file :" + err.message);
	// 		return;
	// 	}
	// 	document.getElementById("content").innerHTML = data;
	// 	console.log(data);
	// });