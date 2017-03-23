var app  = angular.module("restaurantApp", ['ngMaterial'])
app.run(['$rootScope', function($rootScope){
    $rootScope.cityIds = {};
}]);
app.controller("restController",['$rootScope','$scope', '$http', 'cityFactory','hotelsList', function($rootScope, $scope, $http, cityFactory, hotelsList){

$rootScope.a = hotelsList.getdata(6);
$scope.value = false;
$scope.search = function(){
$http.defaults.headers.common["user-key"] = "4b0d3ef99f469fe811b8d83f950242f6";

var idList = cityFactory.getCityId($scope.name)
.then(function(response) {
    var cityIdList =[];
        var results = response.data;
        $scope.results = results;
        var value;
        if(results.location_suggestions != null && results.location_suggestions.length == 0)
        {
         $scope.value = true;
        } 
        else
        {
            for(var obj in results.location_suggestions)
            {
               cityIdList.push(results.location_suggestions[obj].country_id);
            }
        }
        console.log(cityIdList)
    });
$scope.FindHotels = function(id)
{ 
$scope.hotList = hotelsList.getdata(id);
    
}
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
  this.getdata = function(id){ 
        var url = "https://developers.zomato.com/api/v2.1/search?entity_id="+id+"&entity_type=city";
        $http.get(url).then(function(response) {
        console.log("hi");
        var i = response;
       
        }); 
    return i; 
  }
}]);