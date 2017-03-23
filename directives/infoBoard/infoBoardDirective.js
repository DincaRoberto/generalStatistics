/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var infoBoardController = function($scope, $rootScope, statistics)
{
    $scope.avg = new Phaser.Point(0, 0);
    $scope.deviation = 0;
    $scope.median = statistics.median;
    $scope.avg = statistics.avg;
    $scope.info = statistics.info;
    $scope.q1 = statistics.q1;
    $scope.q2 = statistics.q2;
    $scope.points = statistics.points;

}

var infoBoardDirective =  function()
{
    return {
        restrict: 'E',
        scope: {
           
        },
        controller:infoBoardController,
        templateUrl: "directives/infoBoard/infoBoard.html"
    }
}