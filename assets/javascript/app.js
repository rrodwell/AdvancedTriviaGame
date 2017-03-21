console.log("hi!");
  var questions = [

    {
      question: "What year did the Yellow Jackets win the Orange Bowl?",
      options: ["1999","2010","2014","2005"],
      answer: 2,
      imageUrl: "assets/images/orangebowl.jpg",
    },

    {
      question: "What is the number of the only retired jersey in Georgia Tech history?",
      options: ["19","81","5","23"],
      answer: 0,
      imageUrl: "assets/images/clint.jpg",
    },

    {
      question: "Who was the Yellow Jacket's Quaterback last season?",
      options: ["Vad Lee","Justin Thomas","Mathew Jordan","Joshua Nesbitt"],
      answer: 1,
      imageUrl: "assets/images/justinthomas.jpg",
    },

    {
      question: "What was the final score of Tech's highest scoring football game?",
      options: ["222-0","79-32","185-111","56-7"],
      answer: 0,
      imageUrl: "assets/images/ga-tech-222-0.jpg",
    },

    {
      question: "How many National Championships has Georgia Tech won?",
      options: ["0","7","4","2"],
      answer: 2,
      imageUrl: "assets/images/nationalchamp.jpg",
    },

    {
      question: "What bowl game did GT play in last season?",
      options: ["Orange Bowl","TaxSlayer Bowl","Rose Bowl","SunBowl"],
      answer: 1,
      imageUrl: "assets/images/taxslayer.jpg",
    },

    {
      question: "Who is the all-time leading scorer in GaTech history?",
      options: ["Justin Thomas","Travis Bell","Harrison Butker","Calvin Johnson"],
      answer: 2,
      imageUrl: "assets/images/harrisonbutker.jpg",
    }
  ];

  //Variables to count correct answers vs wrong
  var correctAnswer = 0;
  var wrongAnswer = 0;

  var questionTimer;
  var answerTimer;

  //Amount of time per question
  var questionTime = 20;
  var currentQuestion = 0;
  var userPicks = [];

  //Start over button to reset game
  function renderStartOver() {
    var startOverButton = $("<a>");
    startOverButton.addClass("btn btn-lg btn-primary");
    startOverButton.attr("id", "startOver");
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
    $("#gameTimer").html("<h3>" + questionTime + " seconds</h3>");
    if (questionTime === 0) {
      stop();
      timeOutAnswer();
    }
  };

  function guessCorrect(guess){
      var message = $("<div>");
      message.append("<h3 id='completed'>Correct!</h3>");
      var rightAnswer = $("<p>");
      rightAnswer.text("The correct answer was "+ questions[currentQuestion].options[questions[currentQuestion].answer]+"!");
      message.append(rightAnswer);
      var answerImg = $("<img>");
      answerImg.attr("src", questions[currentQuestion].imageUrl);
      message.append(answerImg);
      $(".game").append(message);
      correctAnswer++;
  };

  function guessWrong(){
      var message = $("<div>");
      message.append("<h3 id='wrong'>Sorry, that was the wrong answer...</h3>");
      var rightAnswer = $("<p>");
      rightAnswer.text("The correct answer was "+ questions[currentQuestion].options[questions[currentQuestion].answer]+"!");
      message.append(rightAnswer);
      var answerImg = $("<img>");
      answerImg.attr("src", questions[currentQuestion].imageUrl);
      message.append(answerImg);
      $(".game").append(message);
      wrongAnswer++;
  };

  function guessUndefined(guess){
      var message = $("<div>");
      message.append("<h3 id='undefined'>Uh oh! Looks like you ran out of time...</h3>");
      var rightAnswer = $("<p>");
      rightAnswer.text("The correct answer was "+ questions[currentQuestion].options[questions[currentQuestion].answer]+"!");
      message.append(rightAnswer);
      var answerImg = $("<img>");
      answerImg.attr("src", questions[currentQuestion].imageUrl);
      message.append(answerImg);
      $(".game").append(message);
      wrongAnswer++;
  };

  function answer(){
    $(".game").empty();
    questionTime = 20;
    setTimeout(populatePage, 1000 * 5);
    console.log("TADA!");
    stop();
    var userGuess = $(this).attr("data-name");
    console.log(userGuess);
    if (userGuess === questions[currentQuestion].options[questions[currentQuestion].answer]){
      guessCorrect(userGuess);
    } else if(userGuess === undefined) {
      guessUndefined(userGuess);
    } else {
      guessWrong(userGuess);
    }
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
         var inputOptions = $("<button class='btn btn-lg btn-default' data-name='"+questions[currentQuestion].options[j]+"'>");
         inputOptions.addClass("options-btn");
         inputOptions.text(questions[currentQuestion].options[j]+" ");
         questionDiv.append(inputOptions);
      }
      game.append(questionDiv);
      $("#gameArea").append(game);
    } else {
      finishedGame();
    }

  };

  function finishedGame(){
    stop();
    $(".game").empty()
    $("#gameArea")
      .append("<h3 id='completed'>Finished!</h3>")
      .append("<h4><strong>Correct Answers:</strong> " + correctAnswer + "</h4>")
      .append("<h4><strong>Wrong Answers:</strong> " + wrongAnswer + "</h4>")
    $("#doneButton").empty()
    renderStartOver();
  }

  function restart(){
    correctAnswer = 0;
    wrongAnswer = 0;
    currentQuestion = 0;
    userPicks = [];
    questionTime = 20;
    populatePage();
  }

  //On click of start button...
  $("#successStart").on("click", function() {
    populatePage();
  });

  $(document).on("click", "#startOver", restart);

  $(document).on("click", ".options-btn", answer);


  //--------------Google Sign Test------------------//

  function onSignIn(googleUser) {
   var profile = googleUser.getBasicProfile();
   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
   console.log('Name: ' + profile.getName());
   console.log('Image URL: ' + profile.getImageUrl());
   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
   gapi.auth2.init();
 }

 function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }
  function onFailure(error) {
    console.log(error);
  }
  function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
