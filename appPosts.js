
// Reads the image URL and updates the preview box to the right
// of the page to show the image
function readImageURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#user-img').attr('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Updates the user-description element in the preivew box to the right 
// with the text from the <textarea> when the <textarea> loses focus
function updateUserDescription() {
    $('.description').focusout(function() {
        $('#user-description').text($('.description').val());
    });
}

// Updates the preview-url element in the preview box to the right with the
// text from the url input box
function updateUserURL() {
    $('.site-url').focusout(function() {
        $('#preview-url').text($('.site-url').val())
    });
}



$(document).ready(function() {
    updateUserDescription();
    updateUserURL();
})




/*-----------------------------------------------------------------
------------        EXPERIMENTAL FACEBOOK TESTS         -----------
-----------------------------------------------------------------*/

// "js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9";

// REQUEST LAST NAME OF CURRENT USER
/*
function lastName() {
    $('.post-to-fb').click(function() {
        FB.api('/me', {fields: 'last_name'}, function(response) {
            console.log(response);
        })
    })
}
*/

// PUBLISH STATUS MESSAGE TO CURRENT USER'S FEED
function publishFBPost() {
    $('.post-to-fb').click(function() {

        FB.login(function(response) {
            console.log(response);
        }, {scope: 'user_posts'});

        var userPost = "This is a custom message sent from OUTSIDE Facebook!";

        FB.api('/me/feed', 'post', { message: userPost }, function(response) {
            if (!response || response.error) {
                console.log('Error posting message');
                console.log(response.error);
            } else {
                console.log('SUCCESS!');
                console.log('Post ID: ' + response.id);
            }
        })
    })
}