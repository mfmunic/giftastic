$(document).ready(function(){

var animals = ["dog","cat", "tiger", "lion", "platypus", "whale", "octopus", "moose", "eagle", "penguin", "giraffe"];

for(i=0; i<animals.length; i++){
    $("#buttons").append($("<button class=buts id=but"+i+" data-animal="+animals[i]+">"+animals[i]+"</button>"))
    $("#but"+i).on("click", findGIF)
}


//from the user input
$("#addAnimal").on("click",addButton)

function addButton(event){
      
    event.preventDefault();

    var animal = $("#newAnimal").val()
    $("#newAnimal").empty()
    animals.push(animal);
    $("#buttons").empty()

    for(i=0; i<animals.length; i++){
    	$("#buttons").append($("<button class=buts id=but"+i+" data-animal="+animals[i]+">"+animals[i]+"</button>"))
    	$("#but"+i).on("click", findGIF)
	}

}//end of addButton function


function findGIF(){
	$("#displayResults").empty();


	var animal = $(this).attr("data-animal");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+animal+"&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
    	url: queryURL,
        method: "GET"
    }).done(function(response) {

        console.log(response)

        var results = response.data;

		for (var i = 0; i < results.length; i++) {

			var gifDiv = $("<div class=item></div>");

			var imageUrl = results[i].images.original_still.url;
        	var aniImage = $("<img id=ani"+i+">");

			var rating = $("<p>").text("Rating: " + results[i].rating);

			aniImage.attr("class", "fig");
            aniImage.attr("src", imageUrl);
        	aniImage.attr("alt", animal+" image");
        	aniImage.attr("data-animate", results[i].images.original.url);
        	aniImage.attr("data-still", results[i].images.original_still.url);
        	aniImage.attr("data-state", "still");

        	gifDiv.append(aniImage);
        	gifDiv.append(rating);

            $("#displayResults").prepend(gifDiv);

            $("#ani"+i).on("click", function(){

				var state = $(this).attr("data-state");

				console.log($(this))

				if(state === "still"){
					$(this).attr("src",$(this).attr("data-animate"))
					$(this).attr("data-state", "animate")
				} else {
					$(this).attr("src",$(this).attr("data-still"))
					$(this).attr("data-state", "still")
				}//end of if else
			})//end of click function

        }//end for loop

    });//end of AJAX
}//end of function



})//end of document ready