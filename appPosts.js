
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
