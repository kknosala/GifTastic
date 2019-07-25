$(document).ready(function() {
    
    // Array of searches
    var actorArray = ['Keanu Reeves', 'Terry Cruz', 'Adam Samberg', 'Leslie Nielsen', 'Bryan Cranston', 'Jim Carrey', 'Will Ferrel', 'Rowan Atkinson', 'Simon Pegg'];
    
    // Varibales used in code
    var apiKey = 'KpAFDpzhrqGAiuF7cxcm6XQmXZ32I0M4';
    var name = '';
    var viewCount = 0;
    var currentActor = '';

    //Function for displaying buttons
    function displayButtons(){
        // clears container
        $('#button-container').empty();
        // for loop to make buttons for each item in array
        for(var i = 0; i < actorArray.length; i++){
            // creates new button
            var actorButton = $('<button>');
            // adds classes to the new button
            actorButton.addClass('movie-button btn btn-primary m-2');
            // creates attribute from name of actor
            actorButton.attr('actor-name', actorArray[i]);
            // creates button text from array information
            actorButton.text(actorArray[i]);
            // adds button to the container
            $('#button-container').append(actorButton);

        }
    }

    // Function to pull info from API and display in #gif-display field
    function postGif() {
        // clears out anything in field
        $('#gif-display').empty();
        // api url used
        var apiURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + name + '&limit=' + viewCount;
        // ajax call
        $.ajax({
            url: apiURL,
            method: "GET"
        }).then(function(response) {
            // for loop to pull as many responses as chosen (default 10)
            for(var i = 0; i < response.data.length; i++){
                // creates div
                var gifDiv = $('<div>')
                // pulls screen cap info
                var stillGif = response.data[i].images.fixed_height_still.url;
                // pulls gif info
                var motionGif = response.data[i].images.fixed_height.url;
                // pulls rating info
                var gifRating = response.data[i].rating;
                // sets rating info to upper case
                gifRating = gifRating.toUpperCase();
                // adds m-2 class to div
                gifDiv.addClass('m-2')
                // appends rating to div
                gifDiv.append('<p>Rated: ' + gifRating);
                // creates image tag
                var gifImage = $('<img>');
                // adds attributes to image
                gifImage.attr({'src':stillGif, 'image-still':stillGif, 'image-motion':motionGif, 'alt':response.data[i].title, 'motion':'still'});
                // add class to image, used for click event below
                gifImage.addClass('Gif-Image')
                // appends gifImage to created div
                gifDiv.append(gifImage);
                // appends created div to proper location in HTML
                $('#gif-display').append(gifDiv);

            }

        })
    }
    // displays all items in array on site start-up
    displayButtons();
    // on click event to add new actors from form.
    $('#add-actor').on('click', function(event){
        // prevents page from relaoding when form submitted
        event.preventDefault();
        // checks if text has been enter in form field
        if($('#name-search').val()){
            // sets field value to a value
            var actor = $('#name-search').val().trim();
            // adds actor to array if not already present
            if(actorArray.indexOf(actor) === -1){
                actorArray.push(actor);
            }
            // redraws buttons with new entry added
            displayButtons();
            // sets name variable for ajax call to value entered
            name = actor;
            // sets currentActor global field to the same as the name used in ajax call. This var is used in the function to add additional gifs later on
            currentActor = name;
            // sets view count in ajax call to what was selected
            viewCount = $('#how-many').val();
            // runs ajax call
            postGif();
            // displays section in HTML to add more gifs if wanted
            $('.show-more-gifs').show();
            // resets search field
            $('#name-search').val('');
            // resets amount field
            $('#how-many').val(1);
        }
            
    })
    // unpause and pause for gif images
    $(document).on('click', '.Gif-Image', function() {
        // pulls the current value of the 'motion' attribute on image
        animate = $(this).attr('motion')
        // if statement for either still or animated value of 'motion' attribute
        if(animate === 'still'){
            // sets source of image to the gif url
            $(this).attr('src', $(this).attr('image-motion'));
            // changes motion attribute to animated
            $(this).attr('motion', 'animated');
        }else if (animate === 'animated'){
            // sets srource of image to the screencap url
            $(this).attr('src', $(this).attr('image-still'));
            // sets motion attribute to still
            $(this).attr('motion', 'still');
        }
    });
    // runs the ajax call when the actor button is clicked
    $(document).on('click', '.movie-button', function(){
        // sets name var to the value of the 'actor-name' attribute on the button for the ajax call
        name = $(this).attr('actor-name');
        // sets currentActor global variable to the name value to see additional pictures using function below
        currentActor = name;
        // sets a default viewCount value
        viewCount = 10;
        // runs ajax call
        postGif()
        // displays more gif options in html
        $('.show-more-gifs').show();
    })
    // displays more gifs for current actor
    $(document).on('click', '#more-gifs', function(){
        // prevents page reload when form submitted
        event.preventDefault();
        // checks to see if there is a value set in the currentActor variable
        if(currentActor){
            // sets name var to the currentActor value for the ajax call
            name = currentActor
            // adds the selected number to the view count amount. Had to change the values to numbers to make it work.
            viewCount = Number($('#how-many-more').val()) + Number(viewCount);
            // runs ajax call
            postGif()
            // resets selection field to 1
            $('#how-many-more').val(1);
        }
    })



})