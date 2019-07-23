$(document).ready(function() {
    
    //Array of searches
    var actorArray = ['Keanu Reeves', 'Terry Cruz', 'Adam Samberg', 'Leslie Nielsen', 'Bryan Cranston', 'Jim Carrey', 'Will Ferrel', 'Rowan Atkinson', 'Simon Pegg'];

    //Function for displaying buttons
    function displayButtons(){

        $('#button-container').empty();

        for(var i = 0; i < actorArray.length; i++){

            var actorButton = $('<button>');

            actorButton.addClass('movie-button');
            actorButton.attr('actor-name', actorArray[i]);
            actorButton.text(actorArray[i]);

            $('#button-container').append(actorButton);

        }
    }

    function getInfo() {

        var apiKey = 'KpAFDpzhrqGAiuF7cxcm6XQmXZ32I0M4';
        var name = $(this).attr('actor-name');
        var viewCount = 1;

        var apiURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + name + '&limit=' + viewCount;

        $.ajax({
            url: apiURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
        })
    }

    displayButtons();
    $(document).on('click', '.movie-button', getInfo)





})