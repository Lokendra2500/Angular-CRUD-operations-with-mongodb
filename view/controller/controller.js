/**
 * Auther: Lokendra Prajapati
 * Date: March 15, 2016
 * Purpose: This controller file contains all the methods, that will help to perform CRUD operations in database(MongoDB database).
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

	$scope.addContact = function(){				//Add contact information in to database
		console.log($scope.contact);
		/*
		* This POST method tells the server for adding the contact into database, 
		* This method send the request to the server.
		*/
		$http.post('/contactList', $scope.contact).success(function(response){ 
			console.log(response);
			refresh();
		});
	};

	$scope.removeContact = function(id){		//Remove the contact from database
		console.log(id);
		$http.delete('/contactList/' + id).success(function(response){
			refresh();
		});
	};

	$scope.editContact = function(id){		// Edit contact information
		console.log(id);
		$http.get('/contactList/' +id).success(function(response){
			$scope.contact = response;
		});
	};

	$scope.updateContact = function(){		// Update the contact information
		console.log($scope.contact._id);
		$http.put('/contactList/'+$scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	};

	$scope.clearContact = function(){
		$scope.contact = "";
	};
}]);
