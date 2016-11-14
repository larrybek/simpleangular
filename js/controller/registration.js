// let's create a re-usable factory that generates the $firebaseAuth instance
myApp.controller('RegistrationController', ['$scope', "Authentication", function($scope, Authentication){

	$scope.login = function(){
		Authentication.login($scope.user);
	}

	$scope.registration = function(){
		Authentication.registration($scope.user);
	} // rergiser

	$scope.logout = function(){
		Authentication.logout();
	} // rergiser

	$scope.delete = function(){
		Authentication.deleteUser();
	} // rergiser

}]) // controller