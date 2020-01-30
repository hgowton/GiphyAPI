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
        console.log(queryURL);
        console.log(results);

        //Creating a div to hold the animal
        var animalDiv = $("div class='animal'>");

        //Storing the rating data
        var rating = results.data.data[2].rating;
        console.log(results.data[2].rating)

        //Creating a paragraph tag to hold the rating
        var pOne = $("<p>").text("Rating: " + rating);

        //Displaying the rating
        animalDiv.append(pOne);

        //Creating element to hold gif
        var imgURL = response.data[2].url;
        console.log(response.data[2].url);

        //Creating the image location
        var image = $("<img>").attr("src", imgURL);

        //Displaying image
        animalDiv.append(image);

        //Adding the entire image and rating to the previous
        $("#animals-view").prepend(animalDiv);

    });
}

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