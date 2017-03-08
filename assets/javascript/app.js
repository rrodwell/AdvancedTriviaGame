$(document).ready(function() {

  var questions = [
    
    {
      question: "What year did the Yellow Jackets win the Orange Bowl?",
      options: ["1999","2010","2014","2005"],
      answer: "2014",
      imageUrl: "assets/images/oragebowl.jpg",
    },
    
    {
      question: "What is the number of the only retired jersey in Georgia Tech history?",
      options: ["19","81","5","23"],
      answer: "19",
      imageUrl: "assets/images/clint.jpg",
    },
    
    {
      question: "Who was the Yellow Jacket's Quaterback last season?",
      options: ["Vad Lee","Justin Thomas","Mathew Jordan","Joshua Nesbitt"],
      answer: "Justin Thomas",
      imageUrl: "assets/images/justinthomas.jpg",
    },
    
    {
      question: "What was the final score of Tech's highest scoring football game?",
      options: ["222-0","79-32","185-111","56-7"],
      answer: "222-0",
      imageUrl: "assets/images/ga-tech-222-0.jpg",
    },
    
    {
      question: "How many National Championships has Georgia Tech won?",
      options: ["0","7","4","2"],
      answer: "4",
      imageUrl: "assets/images/nationalchamp.jpg",
    },
    
    {
      question: "What bowl game did GT play in last season?",
      options: ["Orange Bowl","TaxSlayer Bowl","Rose Bowl","SunBowl"],
      answer: "TaxSlayer Bowl",
      imageUrl: "assets/images/taxslayer.jpg",
    }
  ];

  //Variables to count correct answers vs wrong
  var correctAnswer = 0;
  var wrongAnswer = 0;

  var questionTimer;
  var answerTimer;
  //Amount of time per question
  var questionTime = 300;
  var answerTime = 5;
  var currentQuestion = 3;
  var userPicks = [];
  
  //Done button to move onto next screen
  function renderDoneButton() {
    var doneButton = $("<a>");
    doneButton.addClass("btn btn-lg btn-danger");
    doneButton.text("Done");
    $("#button").append(doneButton);

  };

  //Start over button to reset game
  function renderStartOver() {
    var startOverButton = $("<a>");
    startOverButton.addClass("btn btn-lg btn-primary");
    startOverButton.text("Start Over");
    $("#startButton").append(startOverButton);

  };

  //  The run function sets an interval
  function run() {
    questionTimer = setInterval(decrement, 1000);
  };

  //  The decrement function to count down timer per question.
  function decrement() {
    questionTime--;
    //  Show the number in the #show-number tag.
    $("#gameTimer").html("<h3>" + questionTime + " seconds</h3>");
    //  Once number hits zero...
    if (questionTime === 0) {
      stop();
      timeOutAnswer();
    }
  };

  function answer(){
    console.log("done");
    $(".game").empty();
    $("#button").empty();
    questionTime = 300;
    setTimeout(populatePage, 1000 * 3);
    //If button clicked equals the questions.answer
      //print congrats to screen
      //correct answer was ...
      //image 
      //add correct 
    //Else if undefinded 
      //print uh oh times up 
      //correct answer 
      //image 
      //add wrong
    //Else
      //print oops wrong answer
      //correct answer was ...
      //image
      //add wrong 
    //if ()

    currentQuestion++;
  };

  //  The stop function
  function stop() {
    clearInterval(questionTimer);
  };

  //Will display the correct answer when time runs out
  function timeOutAnswer(){
    $(".game").empty()
    $("#doneButton").empty()
    $("#textOutput").html("<h3> Uh oh, times up!</h3>")
    answer();
  };

  //Populate Questions
  function populatePage() {
    run();
    $("#startButton").empty();
    $("#gameArea").empty();
    if (currentQuestion < questions.length){
      var game = $("<div>");
      game.addClass("game");

      var questionDiv = $("<div>"); 
      questionDiv.addClass("questionDiv"+currentQuestion);
      questionDiv.append("<h4>" +questions[currentQuestion].question+"</h4>");
      for (var j = 0; j < questions[currentQuestion].options.length; j++) {
         var inputOptions = $("<a class='btn btn-lg btn-default' id='"+questions[currentQuestion].options[j]+"'>");
         inputOptions.text(questions[currentQuestion].options[j]+" ");
         questionDiv.append(inputOptions);
      }
      game.append(questionDiv);
      $("#gameArea").append(game);
      renderDoneButton();
      console.log(currentQuestion);
    } else {
      finishedGame();
    }
    
  };

  //Computes score
  function score() {
    for (var i = 0; i < questions.length; i++) {
     userPicks.push($("[name=question"+i+"]:checked").val());

    };
    console.log(userPicks);
  
    for(var i =0; i < questions.length; i++){
      if (questions[i].answer === userPicks[i]) {
        correctAnswer++;
        console.log("Correct: " + correctAnswer + "| Wrong: " + wrongAnswer);
      } else if (userPicks[i] === "undefined") {
        wrongAnswer++;
        console.log("Correct: " + correctAnswer + "| Wrong: " + wrongAnswer);
      } else {
        wrongAnswer++;
        console.log("Correct: " + correctAnswer + "| Wrong: " + wrongAnswer);
      }
    }
  };

  function finishedGame(){
    $(".game").empty()
    $(".game")
      .append("<h3 id='completed'>Finished!</h3>")
      .append("<p><strong>Correct Answers:</strong> " + correctAnswer + "</p>")
      .append("<p><strong>Wrong Answers:</strong> " + wrongAnswer + "</p>")
    $("#doneButton").empty()
    renderStartOver();
  }


  //On click of start button...
  $("#successStart").on("click", function() {
    populatePage();
  });

  $("#button").on("click", function() {
      stop();
      answer();
  });



      //alert(questions.question1.options[0]);
});

