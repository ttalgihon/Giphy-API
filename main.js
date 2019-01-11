$(document).ready(function(){
    // An array that hold a list of animals, the array will be used to create buttons
    var animalArray = ["dog","cat","hedgehog","rabbit","hamster"];
    console.log("array", animalArray);
    
    // A function that adds the array above as button elements to the webpage.
    function makingButtons(){
        for (var i = 0; i < animalArray.length; i++) {
            var btncreated = $("<button>").addClass("btn btn-outline-info").attr("type","button").text(animalArray[i]);
            $(".buttonsArea").append(btncreated);
        }

    }
    makingButtons();

    $(document).click("y", function(){
        $(y).removeClass("live")
        $(this).addClass("live")
     });
});