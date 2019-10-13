let visitor;
$(document).ready(function () {

  var generateNewTweet = function () {
    var $messages = $('.messages');
    $messages.html('');
    var index = streams.home.length - 1;
    while (index >= 0) {
      var tweet = streams.home[index];
      // creating  a div wrapper
      var $tweet = $('<div class=' + "'"+tweet.user+ ' user'+ "'"+'></div>');

      //populaes the random tweet message & inserts it into the div wrapper

      //$tweet.html(`<div class = ${tweet.user}><span class= user-name>${tweet.user}</span>: ${tweet.message} - <span class = created-time >Posted at ${tweet.created_at}</span></div>`);

      const $user = $(`<div class="btn btn-link">${tweet.user}</div>`);
      $user.appendTo($tweet);

      const $message = $(`<div class="message"> "${tweet.message}"</div>`);
      $message.appendTo($tweet);

      const $timestamp = $(`<div class="created-time">Posted at ${tweet.created_at}</div>`);
      $timestamp.appendTo($tweet);

      //adds the tweet to the body of the html
      $tweet.appendTo($messages);
      index--;
    }
  }

  generateNewTweet();
  //var generate = setInterval(generateNewTweet, 1500);

  //button which shows and hides the Tweet Stream
  $(".btn-success").click(function () {

    $(".user").show();
    $('.text_block').html('Latest Tweet');

  });

  $(".user").on("click", function () {

    var name = $(this).text();
    var name = name.split(" ");
    //console.log(name[0]);
     $('.user').not('.' + name[0]).hide();
     $('.text_block').html(name[0] + '\'s Timeline');



      //$('.messages:not('.sharksforcheap')').hide(); // hide everything that isn't #myDiv
      //$('.sharksforcheap').appendTo('.messages');

      // // append this to the other element
      // $('.sharksforcheap').appendTo(".user-timeline");
      // // then empty the exisiting container
      // $(".messages").hide();
      // $(".text_block").hide();
      // $("#timeline-title").text("sharksforcheap Timeline")


  });



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

//utility function for letting students add "write a tweet" functionality

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
  console.log(tweet);
  addTweet(tweet);
};