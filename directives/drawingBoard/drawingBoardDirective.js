/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var drawingBoardController = function($scope, statistics)
{
    //$scope.points = [];
    $scope.avg = statistics.avg;
    $scope.info = {};
    $scope.info = statistics.info;
    $scope.points = statistics.points;
    $scope.median = statistics.median;
    $scope.q1 = statistics.q1;
    $scope.q2 = statistics.q2;
    
    $scope.update = function() {
     
        /*if ($scope.points.length == 0) return;
        
        var avgX = 0;
        var avgY = 0;
        
        for(var i=0; i<$scope.points.length; i++)
        {
            avgX += $scope.points[i].x;
            avgY += $scope.points[i].y;
        }
        
        $scope.avg.x = avgX/$scope.points.length;
        $scope.avg.y = avgY/$scope.points.length;
        
        var diffAvg = [];
        
        for(var i=0; i<$scope.points.length; i++)
        {
            var dist = Phaser.Point.distance($scope.points[i], $scope.avg);
            diffAvg.push(dist*dist);
        }
        
        var deviation = 0;
        
        for(var i=0; i<diffAvg.length; i++)
        {
            deviation += diffAvg[i];
        }
        
        deviation /= diffAvg.length;
        
        deviation = Math.sqrt(deviation);
        
        $scope.deviation = deviation;*/
    }
    
    $scope.game = new Phaser.Game(800, 600, Phaser.CANVAS, document.getElementById('graph'), { create: create, update:$scope.update, render: render });
    var game = $scope.game;

    function render() {
        game.context.fillStyle = 'rgb(0,255,255)';
        for(var i=0; i<$scope.points.length; i++)
        {
            game.context.fillRect($scope.points[i].x, $scope.points[i].y, 4, 4);
        }
        
        var context = game.context;
        game.context.fillStyle = 'rgb(255,100,100)';
        game.context.fillRect($scope.q1.x, $scope.q1.y, 5, 5);
        context.strokeStyle = 'rgb(255,100,100)';
        context.beginPath();
        context.moveTo(0, $scope.q1.y);
        context.lineTo(800, $scope.q1.y);
        context.stroke();
        
        context.beginPath();
        context.moveTo($scope.q1.x, 0);
        context.lineTo($scope.q1.x, 600);
        context.stroke();
        
        
        game.context.fillStyle = 'rgb(100,255,100)';
        game.context.fillRect($scope.q2.x, $scope.q2.y, 5, 5);
        
        context.strokeStyle = 'rgb(100,255,100)';
        context.beginPath();
        context.moveTo(0, $scope.q2.y);
        context.lineTo(800, $scope.q2.y);
        context.stroke();
        
        context.beginPath();
        context.moveTo($scope.q2.x, 0);
        context.lineTo($scope.q2.x, 600);
        context.stroke();
        
        //game.context.strokeStyle = 'rgba(150,100,0,0.5)';
        
        
        context.strokeStyle = 'rgba(100,100,105,0.5)';
        context.beginPath();
        context.moveTo(0, $scope.median.y);
        context.lineTo(800, $scope.median.y);
        context.stroke();
        
        context.beginPath();
        context.moveTo($scope.median.x, 0);
        context.lineTo($scope.median.x, 600);
        context.stroke();
        

        game.context.beginPath();
        game.context.fillStyle = 'rgba(50,20,105,0.5)';
        game.context.arc($scope.avg.x,$scope.avg.y,$scope.info.deviation,0,2*Math.PI);
        game.context.fill();
        game.context.closePath();

        game.context.fillStyle = 'rgb(255,255,255)';
        game.context.fillRect($scope.avg.x, $scope.avg.y, 6, 6);

    }


    function create() {
        var graphics = game.add.graphics(300, 200);
    }
    
    $scope.boardClicked = function(ev)
    {
        $scope.addpoint({message:ev});
    }
}

var drawingBoardDirective =  function()
{
    return {
        restrict: 'E',
        scope: {
            
            addpoint: "&"
        },
        controller:drawingBoardController,
        templateUrl: "directives/drawingBoard/drawingBoard.html"
    }
}