var app = angular.module('B2B', ['ngResource']);

app.service("DataService", function ($resource) {

    this.getTranslation = function($scope, language) {
        var languageFilePath = 'json/translation_' + language + '.json';

        $resource(languageFilePath).get(function (data) {
            $scope.translation = data;
        });
    };

    this.getProducts = function ($scope) {
        $resource('json/products.json').query(function (data) {
            $scope.products = data;
        });
    }
    
    this.cart = new shoppingCart("shoppingCart");

});

app.controller('appController', ['$scope', 'DataService', function ($scope, DataService) {

    $scope.cart = DataService.cart;

    $scope.translate = function () {
        DataService.getTranslation($scope, $scope.selectedLanguage);
        localStorage.setItem('language', $scope.selectedLanguage);
    };

    $scope.loadProducts = function () {
        DataService.getProducts($scope);
    };

    if (localStorage.getItem('language') != undefined) {
        $scope.selectedLanguage = localStorage.getItem('language');
    } else {
        $scope.selectedLanguage = "EN";
    }

    $scope.loadProducts();
    $scope.translate();

}]);

