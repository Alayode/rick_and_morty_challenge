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
			$scope.myQuestions[qIndex].correctAnswer = correctAnswer;
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
		/* Percentage Meter */
		$scope.percentage = (($scope.score / $scope.totalQuestions)*100).toFixed(2);
	}
	// If the selectedAnswer equals the indexAnwser
	$scope.isSelected = function(aIndex,qIndex){
		return  $scope.myQuestions[qIndex].selectedAnswer === aIndex;
	}
	// if the questionIndex equal the active index
	$scope.isCorrect = function(qIndex,aIndex){
	     return  $scope.myQuestions[qIndex].correctAnswer === aIndex;
				}
	// applying the selectContinue function to the click event to continue the 
	// quizApp.
    $scope.selectContinue = function(){
				return $scope.activeQuestion += 1;
			}


			$scope.createShareLinks = function(percentage){
				 var url = 'http://kayode.me';

				 var emailLink = '<a class="button email" href="mailto:?subject = Try to beat my quiz score!&ampl body=I scored a '+percentage+'% on this quiz about rick and morty. Try to beat my score at '+url+'">Email a friend</a>'
				  
				 var twitterLink = '<a class="button twitter" target="_blank" href="http://twitter.com/share?text=I scored a ' + percentage + '%25 on this quiz about Rick and Morty. Try to beat my score at&amp;hashtags=RickAndMortyQuiz&amp;url=' + url + '">Tweet Your Score</a>';
				 var newMarkup = emailLink + twitterLink;

				 return $sce.trustAsHtml(newMarkup);
			}
	}]);



})();