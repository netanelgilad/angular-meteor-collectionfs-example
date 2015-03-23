angular.module('example', ['angular-meteor', 'ui.router']);

angular.module("example").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function ($urlRouterProvider, $stateProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('app', {
                url: '/',
                templateUrl: 'client/example.ng.html',
                controller: 'ExampleCtrl'
            })
            .state('app.image', {
                url: ':imageId',
                templateUrl: 'client/image.ng.html',
                controller: 'ImageCtrl'
            });
    }]);

angular.module('example').controller('ExampleCtrl', ['$meteor', '$scope', function ($meteor, $scope) {

    $scope.images = $meteor.collection(function () {
        return Images.find();
    });

    $scope.addImage = function () {
        $('<input type="file">').bind("change", function (event) {
            Images.insert(event.target.files[0]);
        }).click();
    };

    $scope.url = function (image, store) {
        if (!image) return null;

        // Ideally, the following line would have worked
        //return image.url({store: store});
        var file = Images.findOne(image._id);
        return file.url({store: store}) + '&updatedAt=' + file.copies[store].updatedAt.getTime();
    }

}]);

angular.module('example').controller('ImageCtrl', ['$scope', '$meteor', '$stateParams', function ($scope, $meteor, $stateParams) {
    // Ideally, the following line would have worked
    //$scope.image = $meteor.object(Images, $stateParams.imageId);

    //Used this way, the image is not loader instantly on page refresh
    $scope.image = Images.findOne($stateParams.imageId);

    $scope.update = function() {
        $meteor.call('setThumbnail', $scope.image._id, $scope.coordinates);
    }

}]);

angular.module('example').directive('cropper', function () {
    return {
        restrict: 'A',
        scope: {
            coordinates: '='
        },
        link: function (scope, element) {
            element.click(function () {
                element.cropper({
                    aspectRatio: 1,
                    crop: function (data) {
                        scope.$apply(function() {
                            scope.coordinates = data;
                        });
                    }
                });
            });
        }
    }
});