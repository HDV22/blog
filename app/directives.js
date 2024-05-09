//directives.js
angular.module('app.directives', [])
	.directive('navigationbar', [function(){
		return  {
				restrict: 'E', 
				templateUrl: 'partials/navigationbar.html',
				};
	}]);;
   