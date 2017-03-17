var app  = angular.module("restaurantApp", ['ngMaterial'])

app.controller("restController", function($scope, $http){
$scope.search = function(){
    debugger
$http.defaults.headers.common.user_key = "4b0d3ef99f469fe811b8d83f950242f6";
$http.get("https://developers.zomato.com/api/v2.1/search?q="+$scope.name)
    .then(function(response) {
        $scope.zip= response;
        console.log("hello");
    });
};
});