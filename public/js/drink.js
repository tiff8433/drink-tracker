angular.module('drinkTracker.drink', [])
.controller('MainController', function($scope){
      $scope.data = {
      drinks: [],
      user: {},
      count: 0
    };

    $scope.addDrink = function(){
      var image;
      if ($scope.newDrink === 'beer'){
        image = 'fa fa-beer'
      } else if ($scope.newDrink === 'wine'){
        image = 'fa fa-glass'
      } else if ($scope.newDrink === 'liquor') {
        image = 'fa fa-cubes'
      } else if ($scope.newDrink === 'cocktail'){
        image = 'fa fa-umbrella'
      }
      $scope.data.drinks.push({'type':$scope.newDrink, 'remove':false, 'created_at': new Date(), 'image': image});
      $scope.data.count++;
      $scope.newDrink=""
    };
    $scope.startOver = function(){
      $scope.data.drinks = [];
      $scope.data.count = 0;
    };
    $scope.calculateBAC=function(){
      var doseInGrams = $scope.data.drinks.length * 14;
      var genderConstant = $scope.gender === "female" ? 0.55 : 0.68;
      var weightInGrams = $scope.weight/0.0022046;
      var elapsedTime = $scope.hours;
      $scope.data.user.BAC = Math.max(0, (doseInGrams/(weightInGrams * genderConstant))*100 - (elapsedTime * 0.015));
      if ($scope.data.user.BAC > 0.08){
        $scope.data.user.limit = true;
      } else {
        $scope.data.user.limit = false;
      }
    };
    
    $scope.$watch(function(){return $scope.data.count}, function(){
      $scope.calculateBAC();
    });
    $scope.$watch(function(){return $scope.hours}, function(){
      $scope.calculateBAC();
    });
    $scope.$watch(function(){return $scope.gender}, function(){
      $scope.calculateBAC();
    });
    $scope.$watch(function(){return $scope.weight}, function(){
      $scope.calculateBAC();
    });
});