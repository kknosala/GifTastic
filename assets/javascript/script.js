$(document).ready(function() {
    
    //Array of searches
    var actorArray = ['Keanu Reeves', 'Terry Cruz', 'Adam Samberg', 'Leslie Nielsen', 'Bryan Cranston', 'Jim Carrey', 'Will Ferrel', 'Rowan Atkinson', 'Simon Pegg'];
    
    var apiKey = 'KpAFDpzhrqGAiuF7cxcm6XQmXZ32I0M4';
    var name = '';
    var viewCount = 0;
    var currentActor = '';

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

        var apiURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + name + '&limit=' + viewCount;

        $.ajax({
            url: apiURL,
            method: "GET"
        }).then(function(response) {
            
            for(var i = 0; i < response.data.length; i++){

                var gifDiv = $('<div>')
                var stillGif = response.data[i].images.fixed_height_still.url;
                var motionGif = response.data[i].images.fixed_height.url;
                var gifRating = response.data[i].rating;

                gifDiv.addClass('m-2')
                gifDiv.append('<p>Rated: ' + gifRating);

                var gifImage = $('<img>');

                gifImage.attr({'src':stillGif, 'image-still':stillGif, 'image-motion':motionGif, 'alt':response.data[i].title, 'motion':'still'});
                gifImage.addClass('Gif-Image')
                gifDiv.append(gifImage);

                $('#gif-display').append(gifDiv);

            }

        })
    }
        
    displayButtons();

    $('#add-actor').on('click', function(event){
            
        event.preventDefault();

        if($('#name-search').val()){
            var actor = $('#name-search').val().trim();

            if(actorArray.indexOf(actor) === -1){
                actorArray.push(actor);
            }

            displayButtons();

            name = actor;
            currentActor = name;

            viewCount = $('#how-many').val();
            console.log('view count' + viewCount)
            postGif();
        }
            
    })

    $(document).on('click', '.Gif-Image', function() {
        animate = $(this).attr('motion')

        if(animate === 'still'){
            $(this).attr('src', $(this).attr('image-motion'));
            $(this).attr('motion', 'animated');
        }else if (animate === 'animated'){
            $(this).attr('src', $(this).attr('image-still'));
            $(this).attr('motion', 'still');
        }
    });
    
    $(document).on('click', '.movie-button', function(){
        
        name = $(this).attr('actor-name');
        currentActor = name;
        viewCount = 10;
        postGif()
    })

    $(document).on('click', '#more-gifs', function(){

        event.preventDefault();
        
        if(currentActor){
            name = currentActor
            console.log('view count before' + viewCount)
            viewCount = Number($('#how-many-more').val()) + Number(viewCount);
            console.log('view count after' + viewCount)
            postGif()
        }
    })



})