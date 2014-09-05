'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.tinymceOptions = {
		    theme: 'modern',
		    plugins: [
		        'advlist autolink lists link charmap print preview anchor',
		        'searchreplace visualblocks code fullscreen',
		        'insertdatetime media table contextmenu paste emoticons code'
		    ],
		    menubar: false,
        	toolbar_items_size: 'small',
        	style_formats: [
	                {title: 'Bold text', inline: 'b'},
	                {title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
	                {title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
	                {title: 'Example 1', inline: 'span', classes: 'example1'},
	                {title: 'Example 2', inline: 'span', classes: 'example2'},
	                {title: 'Table styles'},
	                {title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
	        ],
		    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link emoticons | preview code'
		};

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);