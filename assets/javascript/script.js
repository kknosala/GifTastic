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

    displayButtons();






})