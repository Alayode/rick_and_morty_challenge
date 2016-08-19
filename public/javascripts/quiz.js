(function(){

	var app = angular.module('rickNMortyQuiz',[]);

	app.controller('MortyController', ['$scope', '$http','$sce', function($scope,$http,$sce){
		// the entire application will be controlled within this controller
		
		$scope.score = 0;
		$scope.activeQuestion = -1;
		$scope.activeQUestionAnswered = 0;
		$scope.percentage = 0;

		$http.get('../javascripts/quiz_data.json').then(function(quizData){
			$scope.myQuestions = quizData.data;
			$scope.totalQuestions =  $scope.myQuestions.length;
	});



	}]);



})();