require("//d3js.org/d3.v3.min.js");
require("JS/graph.js");
var GetInitStartTime = function () {
        $.ajax({
            url: 'http://localhost:8080/service/time/start',
            type: 'GET',
            dataType:'json',
            success: function(data) {
                var start =JSON.parse(JSON.stringify(data.stt));
                document.getElementById("stt").value=start;
                var valueSlider =document.getElementById("valueSlider");
                valueSlider.innerHTML=start;
                valueSlider.value=start;
                valueSlider.min=parseInt(start);
                setCalendarDate(start);
                //alert(JSON.stringify(data));
            },
            error:function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    };
    var GetEndTime = function () {
        $.ajax({
            url: 'http://localhost:8080/service/time/end',
            type: 'GET',
            dataType:'json',
            success: function(data) {
                var end =JSON.parse(JSON.stringify(data.stt));
                document.getElementById("valueSlider").max =end;
                show();
                //alert(JSON.stringify(data));
            },
            error:function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }

        });
    };
var show = function () {
    var start = parseInt(document.getElementById('stt').value);
    document.getElementById('valueSlider').value = start;
    var end = start + parseInt(document.getElementById('gap').value);
    var data2 = [];
    $.ajax({
        url: 'http://localhost:8080/service/data',
        type: 'GET',
        data: 'start=' + start + '&end=' + end, // or $('#myform').serializeArray()
        dataType: 'json',
        success: function (data) {
            var X = JSON.parse(JSON.stringify(data.map.X.myArrayList));

            var Y = JSON.parse(JSON.stringify(data.map.Y.myArrayList));

            for (i = 0; i < X.length; i++) {

                data2.push({x: X[i], y: Y[i]});
            }
            draw(data2);
            //alert(JSON.stringify(data));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}
function sendFile() {
    var file = document.getElementById('fileupload').files[0];
    var fd = new FormData();
    fd.append( 'file', file);
    $.ajax({
        url: 'http://localhost:8080/service/file/upload',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',



        success: function(data) {
            alert("file upload sucessfull");
            GetInitStartTime();
            GetEndTime();
            show();
            //alert(JSON.stringify(data));
        },
        error:function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}
function  play(start,chunk) {
    var start=parseInt(document.getElementById('stt').value);
    var chunk =parseInt(document.getElementById('gap').value)
    var end = parseInt(start) + (500*parseInt(chunk));

    // var data2 =[];
    var xList,yList,tList;
    $.ajax({

        url: 'http://localhost:8080/service/data/chunk',
        type: 'GET',
        data: 'start='+start+'&end='+end, // or $('#myform').serializeArray()
        dataType:'json',

        success: function(data) {
            alert("data loaded");
            xList=JSON.parse(JSON.stringify(data.X));
            yList=JSON.parse(JSON.stringify(data.Y));
            tList=JSON.parse(JSON.stringify(data.T));
            for (var i = 0; i <= 500; i=i+1){
                var s=parseInt(start)+(i*1000);
                doScaledTimeout2(i,s,tList,chunk,xList,yList);
            }
            //alert(JSON.stringify(data));
        },
        error:function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 1500 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var z = d3.scale.category10();

var colorZ=d3.scale.linear()
    .range([0,255]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// Compute the series names ("y1", "y2", etc.) from the loaded CSV.
// Map the data to an array of arrays of {x, y} tuples.
var draw=function (data) {
    svg.selectAll(".series").remove();
    svg.selectAll(".g").remove();
    var seriesNames = d3.keys(data[0])
        .filter(function(d) { return d !== "x"; })
        .sort();
    var series = seriesNames.map(function(series) {
        return data.map(function(d) {
            return {x: +parseFloat(d.x), y: +parseFloat(d.y),c:100};
        });
    });
    // Compute the scales’ domains.
    x.domain(d3.extent([-71,40])).nice();
    y.domain(d3.extent([4,65])).nice();

    // Add the x-axis.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.svg.axis().scale(x).orient("bottom"));
    // Add the y-axis.
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.svg.axis().scale(y).orient("left"));
    // Add the points!
    svg.selectAll(".series")
        .data(series)
        .enter().append("g")
        .attr("class", "series")


        .selectAll(".point")
        .data(function(d) {

            return d; })
        .enter().append("circle")
        .attr("class", "point")
        .style("fill", function (d) {
        alert(d.c);
        return d3.rgb(0,0,d.c);
         })
        .attr("r", 4.5)
        .attr("cx", function(d) {
            return x(parseFloat(d.x));})
        .attr("cy", function(d) {
            return y(parseFloat(d.y));});

};
function require(script) {
    $.ajax({
        url: script,
        dataType: "script",
        async: false,
        success: function () {

        },
        error: function () {
            throw new Error("Could not load script " + script);
        }
    });
}
var colors = d3.scale.linear()
    .domain([5, 20])
    .range(['#909FA3','#0087A7'])
