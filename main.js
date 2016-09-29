var vis, width, height, g, gLine, path;
var w = window,
    d = document,
    e = d.documentElement,
    body = d.getElementsByTagName('body')[0],
    windowWidth = w.innerWidth || e.clientWidth || g.clientWidth,
    windowHeight = w.innerHeight|| e.clientHeight|| g.clientHeight;
var tau = 2 * Math.PI;

/*
var line = d3.line()
    .curve(d3.curveBasis);
*/

var line = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .interpolate("linear");
var lineBasis = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .interpolate("basis");

var points = [];
var numberPoints = 500;
var radius = windowHeight / 7;
var maxAngle = 1.9 * Math.PI; // almost full circle
var startAngle = - 0.95 * Math.PI;
var lineLength = Math.round(maxAngle * radius);
var distanceBetweenPoints = lineLength / numberPoints;
var circleLine;
var isStraight = true;

init();

function init()
{
    vis = d3.select('.content').select('svg#vis');
    updateWindow();

    draw();
}

function draw()
{
    var centering = vis.select("g.centering").attr("transform", "translate(" + (width / 2 - radius) + "," + height / 2 + ")");
    g = centering.select('g.rotation');

    makeCircleLine();
    initConcepts();
    initDependencies();
}

function startAnimation()
{
    d3.select(".course-progression")
        .style("opacity", 1)
        .transition().duration(400).style("opacity", 0);

    d3.selectAll(".concept .concept-title")
        .style("opacity", 1)
        .transition().duration(400).style("opacity", 0);

    d3.selectAll(".controls")
        .style("opacity", 1)
        .transition().duration(400).style("opacity", 0);

    window.setTimeout(function()
    {
        isStraight = false;

        circleLine.transition()
            .duration(2000)
            .attrTween("d", tween());

        vis.select('g.translation')
            .attr("transform", "translate(0,0)")
            .transition()
            .duration(2000)
            .attr("transform", "translate(" + radius + ",0)");

    }, 500);

    /*window.setTimeout(function()
    {
        g
            .transition()
            .duration(2000)
            .attrTween("transform", tween);

        function tween(d, i, a) {
            return d3.interpolateString("rotate(0)", "rotate(90)");
        }
    }, 2800);*/


    return false;
}

function tween()
{
    return function()
    {
        return function(t)
        {
            var iteration = Math.round(t * (numberPoints / 2 - 1));

            redrawConcepts();
            redrawDeps();

            return bendLine(iteration);
        }

    }
}


function updateWindow()
{
    windowWidth = w.innerWidth || e.clientWidth || body.clientWidth;
    windowHeight = w.innerHeight|| e.clientHeight|| body.clientHeight;

    width = windowWidth - 3;
    height = windowHeight - 5;

    vis.attr("width", width).attr("height", height);
}
window.onresize = updateWindow;