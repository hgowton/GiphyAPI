$(document).ready(function() {
    //Pregenerated array of buttons
    var emotions = ["joy", "laugh", "scream", "anger", "chill"];
    
        
    //queryURL to access Giphy API
    function displayEmotionInfo() {
        var emotion = $(this).attr("data-emotion");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=FxSy0NuHdoAdOmyUSNxmS0N5NET0TqeZ&limit=30";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data
            console.log(results);

            var randomSelection = Math.floor(Math.random()*30)
            console.log(randomSelection)

            for (var i = randomSelection; i < randomSelection+10; i++) {
                if (results[i].rating !== "r") {

                    //Creating a div to hold the rating and image with class of animal
                    var emotionDiv = $("<div>");
                    emotionDiv.addClass("emotions");

                    //Storing the rating data
                    var rating = results[i].rating;

                    //Creating a paragraph tag to hold the rating
                    var p = $("<p>").text("Rating: " + rating);
                    
                    //Creating element to hold gif
                    var gifURL = $("<img>");
                    gifURL.addClass("gif");
                    //NEED TO ADD data attributes for still and animate with urls
                    gifURL.attr("alt", results[i].title);


                    //Assigning gif to image
                    gifURL.attr("src", results[i].images.fixed_height_still.url);
                    gifURL.attr("data-animate", results[i].images.fixed_height.url);
                    gifURL.attr("data-still", results[i].images.fixed_height_still.url);

                    //Displaying the rating and image to the start of emotionDiv
                    emotionDiv.append(p);
                    emotionDiv.append(gifURL);

                    //Adding the entire image and rating to the previous
                    $("#emotions-view").prepend(emotionDiv);
                }
            
            };

        });
    }

    //NEED TO ADD on click toggle
    $(document).on("click", ".gif", function(){
        if ($(this).attr("src") === $(this).attr("data-still")) {
            $(this).attr("src", $(this).attr("data-animate"));
        }else {
            $(this).attr("src", $(this).attr("data-still"));
        }
    })

    function createButtons() {
        //Creates buttons from the search
        $("#buttons-view").empty();

        //Looping through the pregenerated array
        for (var i = 0; i < emotions.length; i++) {
            var a = $("<button>");
            a.addClass("emotion-btn");
            a.attr("data-emotion", emotions[i]);
            a.text(emotions[i]);
            $("#buttons-view").append(a);
        }
    };


    //Click event for adding a new button to the screen and the animals array
    $("#add-emotion").on("click", function(event) {
        //Allows user to press enter or click add button and prevents the form from trying to submit itself
        event.preventDefault();        
        let emotionInput = $("#emotion-input").val();

        if (emotionInput !== "") {
            //Grabs text from the search input box
            var emotion = $("#emotion-input").val().trim();
            //Adds the animal into the animals array
            emotions.push(emotion);
            
            //generates button for the newly added animal
            createButtons();
            
            $("#alertMessage").addClass("displayNone")
            
            //Clears the select emotion field
            $("#emotion-input").val("");
        } else{
            //Display message will appear if user does not enter something into the field and input box will clear
            $("#alertMessage").text("Please type an emotion.")
            $("#alertMessage").removeClass("displayNone")
            //Clears the select emotion field
            $("#emotion-input").val("");
        }
    });

    $(document).on("click", ".emotion-btn", displayEmotionInfo);

    createButtons();
})