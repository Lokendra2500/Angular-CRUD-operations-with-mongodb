/**
 * Created by Lokendra on 3/15/2016.
 */

var contact_app = angular.module('contactApp', []);

contact_app.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
	console.log("from Controller");

	var refresh = function(){
	$http.get('/contactList').success(function(response){
			console.log("I got the data");
			$scope.contactList = response;
			$scope.contact = "";
	});
};

refresh();

	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/contactList', $scope.contact).success(function(response){
			console.log(response);
			refresh();
		});
	};

	$scope.removeContact = function(id){
		console.log(id);
		$http.delete('/contactList/' + id).success(function(response){
			refresh();
		});
	};

	$scope.editContact = function(id){
		console.log(id);
		$http.get('/contactList/' +id).success(function(response){
			$scope.contact = response;
		});
	};

	$scope.updateContact = function(){
		console.log($scope.contact._id);
		$http.put('/contactList/'+$scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	};

	$scope.clearContact = function(){
		$scope.contact = "";
	};
}]);