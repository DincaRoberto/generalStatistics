/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var appInstance = angular.module("DesignPatters",[]);


appInstance.factory('statistics', statistics);

appInstance.controller('MainCtrl', function($scope, $rootScope, $http, statistics) {

    $scope.points = [];

    $scope.addOnClick = function(ev)
    {
        //$scope.points.push(new Phaser.Point(ev.offsetX, ev.offsetY));
        statistics.addPoint(new Phaser.Point(ev.offsetX, ev.offsetY));
    };
    
    $scope.removeElem = function()
    {
        statistics.removeElem();
    }
    
    
});

appInstance.directive('drawingboard', drawingBoardDirective);
appInstance.directive('infoBoard', infoBoardDirective);

