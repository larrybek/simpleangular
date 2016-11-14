var myApp = angular.module('loginApp', ['ngRoute', 'firebase']);



myApp.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    if (error === "AUTH_REQUIRED") {
    	$rootScope.message = 'Sorry you must to be login to have access to this page';
      $location.path("/home");
    }
  });
}]);


myApp.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: "views/login.html",
		controller: "RegistrationController"
	}).when('/register', {
		templateUrl: "views/registration.html",
		controller: "RegistrationController"
	}).when('/success', {
		templateUrl: "views/success.html",
		controller: "SuccessController",
		resolve: {
			currentAuth: function(Authentication){
				return Authentication.requireAuth();
			} // Current Auth
		}// Resolve
	}).otherwise({
		redirectTo: "/login"
	});
}]);