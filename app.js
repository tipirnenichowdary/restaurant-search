var app  = angular.module("restaurantApp", ['ngMaterial'])
app.run(['$rootScope', function($rootScope){
    $rootScope.cityIds = {};
}]);
app.controller("restController",['$rootScope','$scope', '$http', 'cityFactory', function($rootScope, $scope, $http, cityFactory){

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


}

$scope.FindHotels = function(id){ 
    var url = "https://developers.zomato.com/api/v2.1/search?entity_id="+id+"&entity_type=city";
        $http.get(url).then(function(response) {
            $scope.hotList = response.data;
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

