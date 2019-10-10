let visitor;

$(document).ready(function () {

  var generateNewTweet = function () {
    var $messages = $('.messages');
    $messages.html('');
    var index = streams.home.length - 1;
    while (index >= 0) {
      var tweet = streams.home[index];
      // creating  a div wrapper
      var $tweet = $("<div></div>");

      //populaes the random tweet message & inserts it into the div wrapper
      //$tweet.html(`<div class = ${tweet.user}><span class= user-name>@${tweet.user}</span>: ${tweet.message} - <span class = created-time >Posted at ${tweet.created_at}</span></div>`);

      const $user = $(`<div class="user btn btn-link" onclick="loadStream('${tweet.user}')"> @${tweet.user}</div>`);
      $user.appendTo($tweet);

      const $message = $(`<div class="message"> "${tweet.message}"</div>`);
      $message.appendTo($tweet);

      const $timestamp = $(`<div class="created-time">${tweet.created_at}</div>`);
      $timestamp.appendTo($tweet);

      //adds the tweet to the body of the html
      $tweet.appendTo($messages);
      index--;
    }
  }
  generateNewTweet();
  // setInterval(generateNewTweet, 1500);

  //button which shows and hides the Tweet Stream
  $(".btn-success").click(function () {
    $(".text_block,.messages").toggle();
  });

  // click to show shawndrost timeline
  $(".user-name").on('click', function (event) {
    event.preventDefault();


    $(".text_block,.messages").hide();
    $("#timeline-title").removeClass("hidden");
  })


});

//Post function, grabs the input name and message and calls write Tweet Function
function post() {
  visitor = $('#inputName').val();
  var message = $('#inputMsg').val();
  if (!streams.users[visitor]) {
    streams.users[visitor] = [];
  }
  $("#inputForm").trigger('reset');
  writeTweet(message);
}

// utility function for letting students add "write a tweet" functionality
var writeTweet = function (message) {
  var tweet = {};
  var d = new Date();
  var n = d.toLocaleTimeString();
  if (!visitor) {
    throw new Error('set the global visitor property!');
  }
  var tweet = {};
  tweet.user = visitor;
  tweet.message = message;
  tweet.created_at = n;
  addTweet(tweet);
};

function filterUserTweet(user) {
  $(".history").html("");
  $(".showTweetButton").prop("disabled", false);
  var userTweet = tweetFeed.filter(tweet => tweet.user === user);
  var index = userTweet.length - 1;

  while (index >= 0) {
    var $filerTweet = $("<div class=userTweet></div>");

    $filerTweet.text(
      "@" + userTweet[index].user + ": " + userTweet[index].message
    );


    $filerTweet.appendTo($(".history"));
    $filterTweetTime.appendTo($(".history"));
    index -= 1;
  }
  filterBefore = true;
}
