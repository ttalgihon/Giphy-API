$(document).ready(function(){
    // An array that hold a list of animals, the array will be used to create buttons
    var animalArray = ["dog","cat","hedgehog","rabbit","hamster","fox","wolf","penguin","kangaroo"];
    
    // A function that adds the array above as button elements to the webpage.
    function makingButtons(){
        $(".buttonsArea").empty();
        for (var i = 0; i < animalArray.length; i++) {
            var btncreated = $("<button>");
            btncreated.addClass("btn btn-outline-info animal-btn");
            btncreated.attr("value",animalArray[i]);
            btncreated.text(animalArray[i]);
            $(".buttonsArea").append(btncreated);
        }
    };makingButtons()

    //Puts the search bar text into the array.
    $("#submitButton").on("click", function(event){
        event.preventDefault();
        // This line will grab the text typed into the search bar.
        var inputAnimal = $("#inputBar").val().trim();
        // The value from the search bar is put into the array.
        animalArray.push(inputAnimal);
        makingButtons();
    });
    
    /* The click-listener will watch to see which button the user clicks...
    and clear the previous GIFs from the page to display the new GIF picked by the user */
    $(".animal-btn").on("click", function(){
        // This empties the webpage of any previous GIFS beign displayed
        $("div.col-sm-8").empty();

        // Acessing the GIPHY API.
        // "$(this) refers to the button that was clicked
        var qValue = $(this).attr('value');
        var APIkey = '5dEk32QTWRRL9CGmYQg3Ucg8xBWIDfxI';
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + qValue + "&api_key=" + APIkey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .then(function(x){
            // Storing an array of results in the 'result' var
            var result = x.data;

            // Looping over every result item
            for (var u = 0; u < result.length; u++) {

                // Only take action in the gif don't have an R rating.
                if (result[u].rating !== "r"){

                    // Creating a div for the gif images
                    var anDIV = $("<div>")

                    // Grabs the rating of the image [PG , PG-13 , etc..]
                    var rating = result[u].rating;

                    var pa = $("<p>").text("Rating: " + rating);
    
                    var animated = result[u].images.fixed_height.url;
                    var still = result[u].images.fixed_height_still.url;
    
                    var anIMG = $("<img>");
                    anIMG.attr("src", animated);
                    anIMG.attr("data-still:", still);
                    anIMG.attr("data-animate", animated)
                    anIMG.attr("data-state", still);
                    anIMG.addClass("gifImage");
                    
                    var oo = anDIV.append(pa);
                    anDIV.append(anIMG);
                    
                    $("div.col-sm-8").append(anDIV);
                }
            }
        });
    });  
}); 