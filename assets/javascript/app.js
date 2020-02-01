$(document).ready(function() {
    //Pregenerated array of buttons
    var animals = ["snake", "salamander", "beaver", "fish", "tadpole"];
    
        
    //queryURL to access Giphy API
    function displayAnimalInfo() {
        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=FxSy0NuHdoAdOmyUSNxmS0N5NET0TqeZ&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data
            console.log(results);

            for (var i = 0; i <results.length; i++) {
                if (results[i].rating !== "r") {

                    //Creating a div to hold the rating and image with class of animal
                    var animalDiv = $("<div>");

                    //Storing the rating data
                    var rating = results[i].rating;
                    console.log(rating)

                    //Creating a paragraph tag to hold the rating
                    var p = $("<p>").text("Rating: " + rating);
                    
                    //Creating element to hold gif
                    var gifURL = $("<img>");
                    gifURL.addClass("gif");
                    //NEED TO ADD data attributes for still and animate with urls
                    gifURL.attr("alt", "moving animal image");


                    //Assigning gif to image
                    gifURL.attr("src", results[i].images.original_still.url);
                    gifURL.attr("data-animate", results[i].images.original.url);
                    gifURL.attr("data-still", results[i].images.original_still.url);

                    //Displaying the rating and image to the start of the animalDiv
                    animalDiv.append(p);
                    animalDiv.append(gifURL);

                    //Adding the entire image and rating to the previous
                    $("#animals-view").prepend(animalDiv);
                }
            
            };

        });
    }

    //NEED TO ADD on click toggle
    $(document).on("click", ".gif", function(){
        console.log("click")
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
        for (var i = 0; i < animals.length; i++) {
            var a = $("<button>");
            a.addClass("animal-btn");
            a.attr("data-animal", animals[i]);
            a.text(animals[i]);
            $("#buttons-view").append(a);
        }
    };


    //Click event for adding a new button to the screen and the animals array
    $("#add-animal").on("click", function(event) {
        //Allows user to press enter or click add button and prevents the form from trying to submit itself
        event.preventDefault();

        //Grabs text from the search input box
        var animal = $("#animal-input").val().trim();
        //Adds the animal into the animals array
        animals.push(animal);

        //generates button for the newly added animal
        createButtons();
    });

    $(document).on("click", ".animal-btn", displayAnimalInfo);

    createButtons();
})