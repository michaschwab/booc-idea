function makeCircleLine()
{
    gLine = g.select('g.course-line');

    for(var i = 0; i < numberPoints; i++)
    {
        var percent = i / (numberPoints-1);

        var point = {};
        point.x1 = radius;
        point.y1 = distanceBetweenPoints * i - distanceBetweenPoints * numberPoints / 2;

        var angle = percent * maxAngle + startAngle;

        point.x2 = Math.cos(angle) * radius;
        point.y2 = Math.sin(angle) * radius;

        point.x = point.x1;
        point.y = point.y1;

        points.push(point);
    }

    circleLine = gLine.append("path")
        //.attr("d", line(points));
        .style({'marker-end': 'url(#depEnd)', 'marker-start': 'url(#timeStart)'})
        .attr("d", bendLine(0));
}

function bendLine(iteration)
{
    var stepSize = Math.ceil(numberPoints / 70);
    var fixedPoint = Math.round(numberPoints / 2);
    var absoluteStep = iteration;

    bendToLine(fixedPoint, absoluteStep, 1, stepSize);
    bendToLine(fixedPoint, absoluteStep, -1, stepSize);

    return line(points);
}

function bendToLine(fixedPoint, absoluteStep, plusMinus, stepSize)
{
    var step = fixedPoint + absoluteStep * plusMinus;

    var pt = points[step];
    if(!pt || !pt.x2)
    {
        console.log('couldnt find point at ', step, pt);
    }
    else
    {
        for(var j = 0; j <= absoluteStep; j++)
        {
            var previousPoint = points[fixedPoint + j * plusMinus];
            previousPoint.x = previousPoint.x2;
            previousPoint.y = previousPoint.y2;
        }
        //pt.x = pt.x2;
        //pt.y = pt.y2;

        var diffX = pt.x - points[step-stepSize * plusMinus].x;
        var diffY = pt.y - points[step-stepSize * plusMinus].y;
        var distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
        //console.log(distance, diffX, diffY);

        var eachDiffX = diffX / distance * distanceBetweenPoints;
        var eachDiffY = diffY / distance * distanceBetweenPoints;

        //update points
        for(var i = step+1; i < numberPoints && i >= 0; i += plusMinus)
        {
            var localStep = i - (step+1);

            points[i].x = pt.x + eachDiffX * localStep * plusMinus;
            points[i].y = pt.y + eachDiffY * localStep * plusMinus;
        }
    }
}