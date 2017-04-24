var todoApp = angular.module('TodoApp', ['firebase']);


todoApp.controller('TodoCtrl', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray) {

        // CREATE A FIREBASE REFERENCE
        var todosRef = new Firebase('https://sizzling-fire-2546.firebaseio.com');
        var meals = $firebaseArray(todosRef.child('faxes'));
        // GET TODOS AS AN ARRAY
        $scope.todos =  meals;

    }]);