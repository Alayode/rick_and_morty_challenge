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

	$scope.chooseAnswer = function ( qIndex,aIndex){
		// alert( qIndex  +  'and' + aIndex );
		var questionState = $scope.myQuestions[qIndex].questionState;
		
		if( questionState != 'answered' ){
			$scope.myQuestions[qIndex].selectedAnswer = aIndex;
			var correctAnswer = $scope.myQuestions[qIndex].correct;
		// lets create a condition to check if the aIndex equals  the correctAnswer
		//  and we're also going ot set their score to +1'

		if(aIndex === correctAnswer){
			$scope.myQuestions[qIndex].correctness = 'correct';
			$scope.score += 1;
		} else {
			// if the correctness is not true then we will
			$scope.myQuestions[qIndex].correctness = 'incorrect';
		}
		$scope.myQuestions[qIndex].questionState = 'answered';
		
		}
	}
	// If the selectedAnswer equals the indexAnwser
	$scope.isSelected = function(aIndex,qIndex){
		return  $scope.myQuestions[qIndex].selectedAnswer === aIndex;
	}
	// if the questionIndex equal the active index
	$scope.isCorrect = function(qIndex,aIndex){
					return  $scope.myQuestions[qIndex].correctAnswer === aIndex;
				}


	}]);



})();