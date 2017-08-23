
// Color values
var FB_COLOR = '#3B5998';
var TWITTER_COLOR = '#4099FF';
var PINTEREST_COLOR = '#C92228';
var TUMBLR_COLOR = '#35465C';
var PREV_SELECTED_TAB;  // used for putting the shadow back on the previus selected tab in the click handler for the social media tabs (changeInputColorBox())

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

// JQuery .on() attach an event handler function for one or more events to the selected elements
function addNavClickListener() {
    var $navBtns = $('.social-media-btns').find('a');

    $navBtns.each(function() {
        // find which social media tab was current when the page loaded
        // (this is most like the fb tab)
        if ($(this).hasClass('current')) {
            PREV_SELECTED_TAB = this;
        }

        $(this).on('click', function() {
            changeInputBoxColor(this);
        });
    });
}

function changeInputBoxColor(element) {
    var $id = $(element).attr('id');
    var $inputBox = $('.media-input-box');
    var color = '';

    switch($id) {
        case 'fb-btn':
            color = FB_COLOR;
            break;
        case 'twitter-btn':
            color = TWITTER_COLOR;
            break;
        case 'pinterest-btn':
            color = PINTEREST_COLOR;
            break;
        case 'tumblr-btn':
            color = TUMBLR_COLOR;
            break;
        default:
            color = FB_COLOR;
    }
    $inputBox.css('background-color', color);
    $(element).addClass('current');
    
    if (PREV_SELECTED_TAB !== undefined) {
        $(PREV_SELECTED_TAB).removeClass('current');
    }
    PREV_SELECTED_TAB = element;
} 

$(document).ready(function() {
    updateUserDescription();
    updateUserURL();
    addNavClickListener();
})