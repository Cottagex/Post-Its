
// Color values
const FB_COLOR = '#3B5998';
const TWITTER_COLOR = '#4099FF';
const PINTEREST_COLOR = '#C92228';
const TUMBLR_COLOR = '#35465C';
let PREV_SELECTED_TAB;  // used for putting the shadow back on the previus selected tab in the click handler for the social media tabs (changeInputColorBox())

// Reads the image URL and updates the preview box to the right
// of the page to show the image
function readImageURL(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();

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
    let $navBtns = $('.social-media-btns').find('a');

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
    let $id = $(element).attr('id');
    let $inputBox = $('.media-input-box');
    let color = '';

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

// Checks whether the text area is empty or not. Currently only supports
// P, TEXTAREA and INPUT tags but can be added to to include any HTML tag you like
// @ param any jQuery selector
function isTextEmpty($selector) {
    let elementType = $selector.get(0).tagName;
    
    if (elementType === 'P') {
        if ($selector.is(':empty')) {
            return true;
        } else {
            return false;
        }
    } else if (elementType === 'TEXTAREA' || elementType === 'INPUT') {
        if ($selector.val().length <= 0) {
            return true;
        } else {
            return false;
        }
    }
}

// TODO 
// Make sure that the file selected IS an image
// https://stackoverflow.com/questions/29805909/jquery-how-to-check-if-uploaded-file-is-an-image-without-checking-extensions


function isImagePathEmpty($selector) {
    if ($selector.get(0).tagName === 'INPUT' && $selector.attr('type') === 'file') {
        if ($selector.val() === '') {
            return true;
        } else {
            return false;
        }
    }
    // it's not a file so just return false;    
    return false;
}

function getDescriptionText() {
    return $('.description').val();
}

function getUserUrl() {
    return $('.site-url').val();
}

function getImagePath() {
    return $('#user-file').val();
}

// Convert an image into a base64 encoded string. This function is mainly
// used so that we can convert an image so it will be usable inside the JSON
// string we are sending over Ajax
function getBase64Image(imgElem) {
    let canvas = document.createElement('canvas');
    canvas.width = imgElem.clientWidth;
    canvas.height = imgElem.clientHeight;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(imgElem, 0, 0);
    let dataURL = canvas.toDataURL('image/png'); // returns the content of the current canvas as an image that you can use as a source for another canvas or an HTML element
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function sendPost($selector) {

    $selector.on('click', function(e) {
        //if ($('#user-img').attr('src') === '#');
       
        let description = getDescriptionText();
        let userUrl = getUserUrl();

        // TODO Get the actual image not the fake path
        let imgElem = getImagePath();
        
        // TODO add better checking here. Maybe an error if it is empty
        /*
        if(!isImagePathEmpty($('#user-file'))) {
            let image = JSON.stringify(getBase64Image(imgElem));
        }
        */

        let image = getBase64Image("C:\\Users\\Public\\Pictures\\Sample Pictures\\Koala.jpg");
        $.ajax({
            method: 'POST',
            url: '192.168.0.233',
            dataType: 'json',
            data: '{"description": "' + description + '", "url": "' + userUrl + '", "image": "' + image + '"}'
        });
        
    });
}

$(document).ready(function() {
    updateUserDescription();
    updateUserURL();
    addNavClickListener();
    sendPost($('#social-post-btn'));
});