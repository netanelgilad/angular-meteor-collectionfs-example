angular.module('example', ['angular-meteor']);

angular.module('example').controller('ExampleCtrl', ['$meteor', '$scope', function ($meteor, $scope) {

    $scope.images = $meteor.collection(Images, false, Images);

    $scope.addImage = function () {
        $('<input type="file">').bind("change", function (event) {
            // There is a bug in angular-meteor that causes this code not to
            // work. Once it is solves should be possible with:
            //$scope.images.save(event.target.files[0]);

            // this is temporary
            Images.insert(event.target.files[0], function(error, result) {
                if (error) {
                    console.log('error', error);
                }
                else {
                    console.log(result);
                }
            });
        }).click();
    };

    $scope.removeImage = function(image) {
      $scope.images.remove(image);
    };

    $scope.url = function (image, store) {
        if (!image) return null;

        return image.url({store: store});
    }
}]);