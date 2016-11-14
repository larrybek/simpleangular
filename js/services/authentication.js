myApp.factory('Authentication', 
	['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', function(
		$rootScope, $firebaseAuth, $firebaseObject, $location){

	var auth = $firebaseAuth();

	auth.$onAuthStateChanged(function(authData){
		if(authData){
			var ref = firebase.database().ref("users");

			var userObject = $firebaseObject(ref.child(authData.uid));
			$rootScope.loggeUser = userObject; 
		}else{
			$rootScope.loggeUser = ''; 
		}
	});

	var myObject = {
		login: function(user){

			auth.$signInWithEmailAndPassword(user.email, user.password)
			.then(function(firebaseUser) {
				$location.path('/success');
	      	}).catch(function(error) {
		        $rootScope.message = error.message;
		    });
		}, // login

		logout: function(){
			return auth.$signOut();
		},  // logout

		requireAuth: function(){
			return auth.$requireSignIn();
		}, // requireAuth

		registration: function(user){
			var self = this;
			$rootScope.message = null;

			auth.$createUserWithEmailAndPassword(user.email, user.password)
	        .then(function(firebaseUser) {
	        	var ref = firebase.database().ref("users").child(firebaseUser.uid).set({
	        		regUser: firebaseUser.uid,
	        		date: firebase.database.ServerValue.TIMESTAMP,
	        		firstname: user.firstname,
	        		lastname: user.lastname,
	        		email: user.email
	        	});

	        	self.login(user);

	          $rootScope.message = "Hi " + user.firstname + ', you have successfully registered.';
	        }).catch(function(error) {
	          $rootScope.message = error;
	        });
		}, // register

		deleteUser: function(user){
			$rootScope.message = null;
			var userId = auth.$getAuth().uid;
			var ref = firebase.database().ref("users").child(userId).remove();
			
	      	// Delete the currently signed-in user
	      	auth.$deleteUser().then(function() {
	        	$rootScope.message = "User deleted";
	        	
	      	}).catch(function(error) {
	        	$rootScope.message = error;
	      	});
		}
	};

	return myObject;
}]);