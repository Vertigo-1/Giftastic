$(document).ready(function() {
  var topics = [
    "Attack on Titan",
    "Samurai Champloo",
    "Death Note",
    "Cowboy Bebop",
    "Tokyo Ghoul",
    "Akira",
    "Vampire Hunter D"
  ];

  function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
      //can't get spacing (mr-2) or button class to work on this
      var a = $("<button type=button class='btn mr-2 btn-dark'>");
      a.addClass("animelist");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#buttons-view").append(a);
    }
  }
  renderButtons();

  $(document).on("click", ".animelist", function() {
    var anime = $(this).html();

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      anime +
      "&api_key=X8yVraqK0yefAlqBRiZXy1B9AqDRqZ8m&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;
      $("#anime-view").empty();
      for (var j = 0; j < results.length; j++) {
        var imageDiv = $("<div>");
        var imageView = results[j].images.fixed_height.url;
        var still = results[j].images.fixed_height_still.url;

        var gifImage = $("<img>")
          .attr("src", still)
          .attr("data-animate", imageView)
          .attr("data-still", still);
        gifImage.attr("data-state", "still");
        $("#anime-view").prepend(gifImage);
        gifImage.on("click", playGif);
        var rating = results[j].rating;

        var displayRated = $("<p>").text("Rating: " + rating);
        $("#anime-view").prepend(displayRated);
      }
    });

    //created function to play and stop gif animation
    function playGif() {
      var state = $(this).attr("data-state");

      if (state == "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
      }
    }
  });
  //On click funtion to add the input to create new button
  $(document).on("click", "#add-anime", function() {
    if (
      $("#anime-input")
        .val()
        .trim() == ""
    ) {
      //can't search blank
      alert("You can't leave the input blank!");
    } else {
      var animel = $("#anime-input")
        .val()
        .trim();
      topics.push(animel);
      $("#anime-input").val("");
      renderButtons();
      return false;
    }
  });
});
