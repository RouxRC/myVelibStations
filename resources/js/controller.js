'use strict';
// Velib controller
angular.module('Velib.controllers', ['Velib.config'])
  .controller('VelibCtrl', function($scope, $http, GROUPS) {
    $scope.groups = GROUPS;

    $scope.groups.forEach(function(group, i){
        group.id = i + 1;
        group.stations.forEach(function(station){
            station.available = "X";
            station.free = "X";
            station.date = "";
            station.class = "";
            station.fetching = false;
        });
    });

    $scope.refresh = function(group_id) {
        var fresh = new Date() - 1000 * 60 * 30;
        $scope.groups.filter(function(group){
            return group.id == group_id;
        }).forEach(function(group){
            group.stations.forEach(function(s){
                s.fetching = true;
                $http.get("data/"+s.id)
                .success(function(data, status, headers, config) {
                    s.available = data.available;
                    s.free = data.free;
                    s.date = data.updated * 1000;
                    s.outdated = s.date < fresh;
                    s.class = "";
                    s.fetching = false;
                }).error(function(data, status, headers, config) {
                    s.class = "error";
                    s.fetching = false;
                });
            })
        });
    }

    // Load data at startup and autorefresh every 30 sec
    $scope.refreshAll = function() {
        for(var i=0 ; i<$scope.groups.length ; i++) {
            $scope.refresh($scope.groups[i].id);
        }
    };
    setInterval($scope.refreshAll, 30000);
    $scope.refreshAll();
});
