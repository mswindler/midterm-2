angular.module('items', [])
.controller('MainCtrl', [
  '$scope', '$http',
  function($scope, $http) {
    
    $scope.ballots = [];
    $scope.candidates = [];

    $scope.getAll = function() {
	    console.log("in getAll");
      return $http.get('/voting').success(function(data) {
	      console.log("success");
        angular.copy(data, $scope.candidates);
      });
    };

    $scope.getAll();

    $scope.create = function(candidate) {
       return $http.post('/voting', candidate).success(function(data){
	 $scope.candidates.push(data);
       });
    };

    $scope.dovote = function() {
      console.log("in dovote");
      angular.forEach($scope.candidates, function(value, key) {
        if(value.selected) {
          $scope.upvote(value);
          console.log(value);
	  $scope.ballots.push(value);
        };
      });
    }

    $scope.upvote = function(candidate) {
      return $http.put('/voting/'+candidate._id+'/upvote')
      .success(function(data) {
        console.log("upvote worked");
        candidate.quantity += 1;
      });
    }

    $scope.addCandidate = function() {
      var newCan = {name:$scope.formContent, quantity:0, price:$scope.formPrice};
      console.log(newCan);
      $scope.create(newCan);
      $scope.formContent = '';
    };

    $scope.incrementUpvotes = function(candidate) {
      $scope.upvote(candidate);
    };

    $scope.delete = function(candidate) {
      console.log("in delete");
      $http.delete('/voting/'+candidate._id)
      .success(function(data) {
        console.log("delete worked");
      });
      $scope.getAll();
    };    

  }
]);
