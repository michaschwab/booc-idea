var deps = [{ from: '2', to: '4'}, { from: '3', to: '5'}, { from: '3', to: '6'}, { from: '2', to: '7'}];
var gDeps;

function initDependencies()
{
    gDeps = g.select('g.course-dependencies');

    gDeps
        .style('opacity', 0);

    redrawDeps();
}

function redrawDeps()
{
    gDeps.selectAll('path').remove();

    deps.forEach(function(dep)
    {
        var conceptFrom = conceptsById[dep.from];
        var conceptTo = conceptsById[dep.to];
        var yDistance = conceptTo.y - conceptFrom.y;
        var xDistance = Math.round(conceptTo.x - conceptFrom.x);
        var bendPoint;

        /*if(isStraight)
        {
            bendPoint = {x: -yDistance + 200, y: yDistance / 2 + conceptFrom.y};
        }
        else*/
        {
            //bendPoint = {x: 0, y: yDistance / 2 + conceptFrom.y};
            bendPoint = {x: -yDistance * 0.3 + 100, y: yDistance / 2 + conceptFrom.y};
        }

        gDeps.append("path")
        //.attr("d", line(points));
            .style({'marker-end': 'url(#depEnd)'})
            .attr("d", lineBasis([conceptFrom, bendPoint, conceptTo]));
    });
}