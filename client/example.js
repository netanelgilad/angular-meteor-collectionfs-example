angular.module('example', ['angular-meteor']);

angular.module('example').controller('ExampleCtrl', ['$meteor', '$scope', function($meteor, $scope) {

    $scope.coords = {};

    $scope.setData = function(data) {
        $scope.$apply(function() {
            $scope.coords = data;
        });
    };

    $scope.images = $meteor.collection(function() {
        return Images.find();
    });

    $scope.addImage = function () {
        $('<input type="file">').bind("change", function (event) {
            Images.insert(event.target.files[0]);
        }).click();
    };

    $scope.editThumbnail = function(image) {
        img().cropper({
            aspectRatio: 883 / 295
        });
    };

    $scope.url = function(image, store) {
        return image.url({store: store});
    }

}]);

angular.module('example').directive('cropper', function() {
    return {
        restrict: 'A',
        link : function(scope, element) {
            element.click(function() {
                element.cropper({
                    aspectRatio: 1,
                    crop: function(data) {
                        scope.setData(data);
                    }
                });
            });
        }
    }
});