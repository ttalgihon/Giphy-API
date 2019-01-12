$(document).ready(function(){
    // An array that hold a list of animals, the array will be used to create buttons
    var animalArray = ["dog","cat","hedgehog","rabbit","hamster"];
    
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
    }

    //Puts the search bar text into the array.
    $("#submitButton").on("click", function(event){
        event.preventDefault();
        // This line will grab the text typed into the search bar.
        var inputAnimal = $("#inputBar").val().trim();
        // The value from the search bar is put into the array.
        animalArray.push(inputAnimal);
        makingButtons();
    })
    
    /* The click-listener will watch to see which button the user clicks...
    and clear the previous GIFs from the page to display the new GIF picked by the user */
    $(".animal-btn").click(function(){

        // This empties the webpage of any previous GIFS beign displayed
        $(".giphyDivImages").empty();

        // Acessing the GIPHY API.
        var attrToObtain = $(this).attr("value");
        var APIkey = '5dEk32QTWRRL9CGmYQg3Ucg8xBWIDfxI';
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ attrToObtain +"&api_key="+ APIkey +"&limit=10";
        console.log("this-2", this);
        console.log("obtainvariable-3", attrToObtain);
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(x){
            var result = x.data;

            console.log("qurl-4", queryURL);
            console.log("meta-5", x);

            for (var u = 0; u < result.length; u++) {
                var anDIV = $("<div class=\"animalItem\"></div>")
                var rating = result[u].rating;
                var p = $("<p>").text("Rating: " + rating);

                var animated = result[u].images.fixed_height.url;
                var still = result[u].images.fixed_height_still.url;


                var anIMG = $("<img>");
                anIMG.attr("src", "still");
                anIMG.attr("data-still:", "still");
                anIMG.attr("data-animate", "animated")
                anIMG.attr("data-state", "still");
                anIMG.addClass("gifImage");
                
                anDIV.append(p);
                anDIV.append(anIMG);
                
                $(".giphyDivImages").append(anDIV);
            }
        })
    })

    $(document).click(".gifImage", function(){
        var state = $(this).attr("data-state");
    
        if (state === "still"){
            $(this).attr("src",$(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state","still");
        }
    })
    makingButtons()
}); 



