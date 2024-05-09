//controllers.js
angular.module('app.controllers', ['app.directives'])

    .controller('PostController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
        $scope.posts = [];
        $scope.selectedPost = {};

        $http.get('server/posts.json').then(function(response) {
        $scope.posts = response.data;
        console.log($scope.posts); 
    })
    .catch(function(error) {
		console.error('Error fetching posts:', error);
	});
}])
    .controller('SinglePostController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
        $http.get('server/posts.json').success(function(data){
        $scope.post = data[$routeParams.id];
    });
}])
    .controller('AddPostController', function($scope) {
        // Initialize posts array with data from localStorage or an empty array
        $scope.posts = JSON.parse(localStorage.getItem('posts')) || [];

        $scope.newPost = {
            id: null,
            title: '',
            content: ''
        };

        // Initialize selectedPost as null
        $scope.selectedPost = null;

        $scope.savePost = function() {
            if ($scope.newPost.id == null) {
                // Generate a unique ID (you may use a more robust method)
                $scope.newPost.id = new Date().getTime();
                $scope.posts.push($scope.newPost);

                // Save updated posts array to localStorage
                localStorage.setItem('posts', JSON.stringify($scope.posts));
            } else {
                for (var i in $scope.posts) {
                    if ($scope.posts[i].id == $scope.newPost.id) {
                        $scope.posts[i] = $scope.newPost;

                        // Save updated posts array to localStorage
                        localStorage.setItem('posts', JSON.stringify($scope.posts));
                    }
                }
            }
        $scope.newPost = { id: null, title: '', content: '' }; // Clear input fields
        };
        $scope.edit = function(id) {
            // Find the post with the specified ID
            for (var i = 0; i < $scope.posts.length; i++) {
                if ($scope.posts[i].id === id) {
                    // Set the newPost object to the post with the specified ID
                    $scope.newPost = angular.copy($scope.posts[i]);
                    break;
                }
            }
        };
    
        $scope.delete = function(id) {
            // Find the post with the specified ID and remove it from the posts array
            for (var i in $scope.posts) {
                if ($scope.posts[i].id == id) {
                    $scope.posts.splice(i, 1);
                    // Save updated posts array to localStorage
                    localStorage.setItem('posts', JSON.stringify($scope.posts));
                    // Clear the selectedPost if it was deleted
                    if ($scope.selectedPost && $scope.selectedPost.id == id) {
                        $scope.selectedPost = null;
                    }
                    break;
                }
            }
        };
    });