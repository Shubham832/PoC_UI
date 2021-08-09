var userApp = angular.module('userApp', ['ngRoute']);

userApp.config(['$routeProvider', function($routeProvider){

    $routeProvider
    .when('/', {
        templateUrl:'views/login.html',
        controller:'loginController'
    })
    .when('/home', {
        templateUrl:'views/home.html'
    })
    .when('/register',{
        templateUrl:'views/registration.html',
        controller:'userController'
    }) 
    .when('/reg-success',{
        templateUrl:'views/regSuccess.html',
        controller:'userController'
    }) 
    .otherwise({
        redirectTo:'/'
    });

}]);

userApp.controller('userController', ['$scope','$location',  '$http', function($scope ,$location, $http){
    $scope.addUser = function(){

        
        $http.post('http://localhost:8080/user1/webapi/users/add', $scope.user).success(function(data){
        console.log("done", data);
        console.log($scope.user);
        $location.path('/login');
    })
    }
    $scope.reset = function(){
        $scope.user='';
    }
}]);

userApp.controller('loginController', [ '$scope','$location', '$http', function($scope, $location,$http){

    $scope.loginUser = function(){
        var data1 = {params:{email: $scope.user.email, password: $scope.user.password}};
        $http.get('http://localhost:8080/user1/webapi/users', data1).success(function(data, status){
        console.log("done", data);
        if (status == 204){
            console.log("User not found");
        }
        $location.path('/home');
    });
    }

}] )