var gConcepts;
var conceptList = [{title: 'Concept 1'}, {title: 'Concept 2'}, {title: 'Concept 3'}, {title: 'Concept 4'}, {title: 'Concept 5'}];

function initConcepts()
{
    gConcepts = g.select('g.course-concepts');
    gConcepts
        .style('opacity', 0);

    conceptList.forEach(function(concept)
    {
        initConcept(concept);
    });

    redrawConcepts();

    gConcepts
        .transition().delay(1200).duration(800).style("opacity", 1);
}

function redrawConcepts()
{
    setConceptPositions();
    drawConcepts();
}

function setConceptPositions()
{
    conceptList.forEach(function(concept)
    {
        concept.x = concept.point.x;
        concept.y = concept.point.y;
    });
}

function drawConcepts()
{
    var concepts = gConcepts.selectAll('g.concept').data(conceptList);

    var conceptEnter = concepts.enter().append('g')
        .attr('class', 'concept');

    concepts
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    conceptEnter.append('circle')
        .attr('r', 10);

    conceptEnter.append('text')
        .attr('x', 20)
        .attr('y', 7)
        .text(function(d) { return d.title; });
}

function initConcept(concept)
{
    var numberConcept = conceptList.indexOf(concept);
    var percent = numberConcept / (conceptList.length-1);
    var positionPercent = 0.1 + percent * 0.8;

    var pointNumber = Math.round((numberPoints-1) * positionPercent);
    var point = points[pointNumber];
    if(!point)
    {
        return console.error('couldnt find point at ', pointNumber);
    }

    concept.point = point;


}