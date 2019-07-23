$(document).ready(function() {
    
    //Array of searches
    var actorArray = ['Keanu Reeves', 'Terry Cruz', 'Adam Samberg', 'Leslie Nielsen', 'Bryan Cranston', 'Jim Carrey', 'Will Ferrel', 'Rowan Atkinson', 'Simon Pegg'];
    
    //Function for displaying buttons
    function displayButtons(){

        $('#button-container').empty();

        for(var i = 0; i < actorArray.length; i++){

            var actorButton = $('<button>');

            actorButton.addClass('movie-button btn btn-primary m-2');
            actorButton.attr('actor-name', actorArray[i]);
            actorButton.text(actorArray[i]);

            $('#button-container').append(actorButton);

        }
    }

    function postGif() {

        $('#gif-display').empty();

        var apiKey = 'KpAFDpzhrqGAiuF7cxcm6XQmXZ32I0M4';
        var name = $(this).attr('actor-name');
        var viewCount = 10;

        var apiURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + name + '&limit=' + viewCount;

        $.ajax({
            url: apiURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            
            for(var i = 0; i < response.data.length; i++){

                var gifDiv = $('<div>')
                var gifUrl = response.data[i].images.fixed_height.url;
                console.log(gifUrl);
                var gifRating = response.data[i].rating;

                gifDiv.addClass('m-2')

                gifDiv.append('<p>Rated: ' + gifRating);

                var gifImage = $('<img>');

                gifImage.attr('src', gifUrl);
                gifImage.attr('alt', response.data[i].title);
                gifImage.attr('motion', 'still');

                gifDiv.append(gifImage);

                $('#gif-display').append(gifDiv);

            }

        })
    }
        
    $('#add-actor').on('click', function(event){
            
        event.preventDefault();

        var actor = $('#name-search').val().trim();

        actorArray.push(actor);

        displayButtons();

        $('#actor-search').reset();
            
    })
    

    displayButtons();
    $(document).on('click', '.movie-button', postGif)





})