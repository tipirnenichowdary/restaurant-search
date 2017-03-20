var app  = angular.module("restaurantApp", ['ngMaterial'])
app.run(['$rootScope', function($rootScope){
    $rootScope.cityIds = {};
}]);
app.controller("restController",['$rootScope','$scope', '$http', 'cityFactory','hotelsList', function($rootScope, $scope, $http, cityFactory, hotelsList){
$scope.value = false;
$scope.search = function(){
$http.defaults.headers.common["user-key"] = "4b0d3ef99f469fe811b8d83f950242f6";

var idList = cityFactory.getCityId($scope.name)
.then(function(response) {
    var cityIdList =[];
        var results = response.data;
        var value;
        if(results.location_suggestions != null && results.location_suggestions.length == 0)
        {
         $scope.value = true;
        } 
        else
        {
            for(var obj in results.location_suggestions)
            {
               cityIdList.push(results.restaurants[obj].restaurant.id);
            }
        }
        console.log(cityIdList);
       $scope.finalData =  hotelsList.getdata(cityIdList);
    });
}
}])

app.factory("cityFactory",['$http',function($http){
            
    var cityIds = {
       getCityId : function(name){return $http.get("https://developers.zomato.com/api/v2.1/cities?q="+name)
    
     
}
   };
   return cityIds;
}]);

app.service("hotelsList",['$http',function($http){
    var i;
  this.getdata = function(idList){
        for(i = 0; i<idList.length; i++)
    {
        var url = "https://developers.zomato.com/api/v2.1/search?entity_id="+ idList[i];
    this.hotel = function(){ $http.get(url)
    .then(function(response) {
        console.log("hi");
    })
}
    }
  }
}]);