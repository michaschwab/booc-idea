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

    d3.select('body').on('click', startAnimation);
    d3.select('body').on('keydown', startAnimation);
}

function draw()
{
    var centering = vis.select("g.centering").attr("transform", "translate(" + (width / 2 - radius) + "," + height / 2 + ")");
    g = centering.select('g.rotation');

    makeCircleLine();
    initConcepts();
    initDependencies();
}
/*
function animationStep1()
{
    gConcepts
        .transition().duration(800).style("opacity", 1);
}*/

function animationStep1()
{
    d3.select(".course-progression")
        .style("opacity", 1)
        .transition().duration(400).style("opacity", 0);

    d3.select(".course-shortcuts")
        .style("opacity", 0)
        .transition().duration(400).style("opacity", 1);

    gDeps
        .transition().duration(800).style("opacity", 1);
}
function animationStep2()
{
    d3.selectAll(".concept .concept-title")
        .style("opacity", 1)
        .transition().duration(400).style("opacity", 0);

    d3.select(".course-shortcuts")
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
}
function animationStep3()
{
    vis.select('g.translation')
        .attr("transform", "translate(" + radius + ",0)")
        .transition()
        .duration(1000)
        .attr("transform", "translate(" + radius / 3 + ",0)");

    vis.select("g.zoom")
        .transition()
        .duration(1000)
        .attrTween("transform", tweenZoom);

    d3.select(".booc-label")
        .style("opacity", 0)
        .transition().delay(1000).duration(400).style("opacity", 1);


    function tweenZoom(d, i, a) {
        return d3.interpolateString("scale(1)", "scale(3)");
    }

    d3.select('#animationButton').classed('disabled', 'true');
    /*d3.selectAll(".controls")
        .style("opacity", 1)
        .transition().duration(400).style("opacity", 0);*/
}

var animationStepNumber = 1;

function startAnimation()
{
    if(animationStepNumber == 1)
        animationStep1();
    if(animationStepNumber == 2)
        animationStep2();
    if(animationStepNumber == 3)
        animationStep3();
    if(animationStepNumber == 4)
        animationStep4();

    d3.select('#currentAnimationStep').text(animationStepNumber);

    animationStepNumber++;

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

    d3.event.preventDefault();
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