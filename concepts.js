var gConcepts;
var conceptList = [{id: '1', title: 'Concept 1', short: '1'}, {id: '2', title: 'Concept 2', short: '2'}, {id: '3', title: 'Concept 3', short: '3'}, {id: '4', title: 'Concept 4', short: '4'}, {id: '5', title: 'Concept 5', short: '5'}];

var conceptsById = {};
conceptList.forEach(function(concept)
{
    conceptsById[concept.id] = concept;
});

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
        .attr('r', 11);

    conceptEnter.append('text')
        .attr('x', 0.5)
        .attr('y', 1)
        .attr('class', 'concept-short')
        .text(function(d) { return d.short; });

    conceptEnter.append('text')
        .attr('x', 20)
        .attr('y', 1)
        .attr('class', 'concept-title')
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