//Pregenerated array of buttons
var animals = ["snake", "salamander", "beaver", "fish", "tadpole"];

function createButtons() {
    //Creates buttons from the search
    $("#buttons-view").empty();

    //Looping through the pregenerated array
    for (var i = 0; i < animals.length; i++) {

        var a = $("<button>");
        a.addClass("animalVar");
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

createButtons();

//queryURL to access Giphy API
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=FxSy0NuHdoAdOmyUSNxmS0N5NET0TqeZ";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
});