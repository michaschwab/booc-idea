var gConcepts;
var conceptList = [{id: '1', title: 'Basics', short: '1', color: '#99adeb'}, {id: '2', title: 'Theories of Inference', short: '2', color: '#f2c4ae'}, {id: '3', title: 'Maximum Likelihood Estimation', short: '3', color: '#d6acff'}, {id: '4', title: 'Model Dependence', short: '4', color: '#b8e68a'}, {id: '5', title: 'Assessing Models and Estimators', short: '5', color: '#ffbfc0'}, {id: '6', title: 'Multiple Regression', short: '6', color: '#9ee2e8'}, {id: '7', title: 'Research Design', short: '7', color: '#ffffd1'}];

var conceptsById = {};
conceptList.forEach(function(concept)
{
    conceptsById[concept.id] = concept;
});

function initConcepts()
{
    gConcepts = g.select('g.course-concepts');
    /*gConcepts
        .style('opacity', 0);*/

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
        .attr('r', 15)
        .style('fill', function(d) { return d.color; });

    conceptEnter.append('text')
        .attr('x', 0.5)
        .attr('y', 1)
        .attr('class', 'concept-short')
        .text(function(d) { return d.short; });

    conceptEnter.append('text')
        .attr('x', 30)
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