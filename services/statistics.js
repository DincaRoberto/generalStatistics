/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var statistics = function()
{
    var obj = {};
    
    obj.points = [];
    
    obj.avg = new Phaser.Point(0,0);
    
    obj.info = {};
    
    obj.info.deviation = 0;
    
    obj.median = new Phaser.Point(0,0);
    obj.q1 = new Phaser.Point(0,0);
    obj.q2 = new Phaser.Point(0,0);
    
    obj.computeAvg = function()
    {
       
        var avgX = 0;
        var avgY = 0;
        
        for(var i=0; i<obj.points.length; i++)
        {
            avgX += obj.points[i].x;
            avgY += obj.points[i].y;
        }

        obj.avg.x = (avgX/obj.points.length).toFixed(2);
        obj.avg.y = (avgY/obj.points.length).toFixed(2);
        
        var diffAvg = [];
        
        for(var i=0; i<obj.points.length; i++)
        {
            var dist = Phaser.Point.distance(obj.points[i], obj.avg);
            diffAvg.push(dist*dist);
        }
        
        var deviation = 0;
        
        for(var i=0; i<diffAvg.length; i++)
        {
            deviation += diffAvg[i];
        }
        
        deviation /= diffAvg.length;
        
        deviation = Math.sqrt(deviation).toFixed(2);
        
        obj.info.deviation = deviation;
    };
    
    obj.computeMedian = function()
    {
        var tempPoint = obj.points.slice(0);
        
        tempPoint.sort(dynamicSort("x"));
        
        obj.median.x = tempPoint[Math.floor(tempPoint.length/2)].x;
        
        obj.q1.x = tempPoint[Math.floor(tempPoint.length/4)].x;
        obj.q2.x = tempPoint[Math.floor(3*tempPoint.length/4)].x;
        
        tempPoint.sort(dynamicSort("y"));
        
        obj.median.y = tempPoint[Math.floor(tempPoint.length/2)].y;
        
        obj.q1.y = tempPoint[Math.floor(tempPoint.length/4)].y;
        obj.q2.y = tempPoint[Math.floor(3*tempPoint.length/4)].y;
    }
    
    obj.addPoint = function(p)
    {
        obj.points.push(p);
        
        obj.computeAvg();
        obj.computeMedian();
    }
    
    obj.removeElem = function()
    {
        var i = 0;
        while(i<obj.points.length)
        {
            var dist = Phaser.Point.distance(obj.points[i], obj.avg);
            
            if (dist > obj.info.deviation)
            {
                obj.points.splice(i,1);
            }
            else
            {
                i++;
            }
        }
        
        obj.computeAvg();
        obj.computeMedian();
        
        console.log(obj.points.length);
        
        /*obj.points.sort(dynamicSort("x"));
        
        console.log(obj.points);*/
    }
    
    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    
    return obj;
}
