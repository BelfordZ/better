// TEMPLATES :: RUSTIC-WATERTON :: EDIT :: RUSTIC-WATERTON.JS

$(function() {
    $( "#sortable" ).sortable({
        forcePlaceholderSize: true,
        placeholder: "ui-state-highlight",
        handle: ".moveButton",
        cancel: "",
        axis: "y",
        start: function(event, ui) {
            ui.placeholder.html("<div></div>");
            elementStartPos = ui.item.index();
            console.log(elementStartPos);
        },  
        stop: function(event, ui) {
            tinymce.init({
                mode: "textareas"
            });
            elementFinishPos = ui.item.index();
            console.log(elementFinishPos);
            var postData = {
                'startIndex': elementStartPos,
                'finishIndex': elementFinishPos
            };
            
            $.post("edit", postData)
            .always(function() {
                console.log("block reordering request sent");
            })
            .done(function(res) {
                if (res == 'ok') {
                    window.location.reload();
                    $('#ajaxResult').html('<div class="well postResults">Update Successful!</div>');
                    setTimeout(function() {
                        $('#ajaxResult').fadeOut(1200, function() {
                            $('#ajaxResult').html('');
                            $('#ajaxResult').show();
                        });
                    }, 1000);
                }
            });
        }
    });
    $( "#sortable" ).disableSelection();
});

var postTextBlock = function(blockID) {
    var postData = {};
    postData.blockIndex = blockID;
    postData.content = {};
    postData.date = tinyMCE.get(0).getContent();
    postData.body = tinyMCE.get(1).getContent();
    postData.blockType = 'block1';
    
    $.post("upload-text", postData)
        .always(function() {
            console.log("request sent");
        })
        .done(function(res) {
            if (res == 'ok') {
                $('#ajaxResult').html('<div class="well postResults">Update Successful!</div>');
                setTimeout(function() {
                    $('#ajaxResult').fadeOut(1200, function() {
                        $('#ajaxResult').html('');
                        $('#ajaxResult').show();
                    });
                }, 1000);
            }
            window.location.reload();
        });
};

var makeTextEditable = function(blockID) {
    var weddingDate = $(".wedding-date-wrapper." + blockID);
    var ourStory = $(".our-story-wrapper." + blockID);
    
    weddingDate.addClass("editable");
    //var weddingDateTextBox = "<textarea class='simple'>" + weddingDate.html() + "</textarea>";
    //weddingDate.html(weddingDateTextBox);
        
    var ourStoryTextBox = "<textarea class='full'>" + ourStory.html() + "</textarea>";
    ourStory.html(ourStoryTextBox);
    
    var saveButton = "<a class='btn btn-success' onclick='postTextBlock(" +
                        blockID + ")'>Save Text</a>";
    $('.text-wrapper.' + blockID).append(saveButton);
    tinymce.init({
        selector : ".editable",
        inline: true,
        menubar: false
    });
    tinymce.init({
        mode : "specific_textareas",
        editor_selector : "full"
    });
};

var makeImageEditable = function(blockID) {
    var imgHolder = $('.img-wrapper.' + blockID).html();
    imgHolder += "<form action='upload-image' enctype='multipart/form-data' method='post'>";
    imgHolder += "<input id='"+blockID+"' type='file' name='inputImg'>";
    imgHolder += "<input type='hidden' name='blockIndex' value='" + blockID + "'>";
    imgHolder += "<input type='hidden' name='blockType' value='" + blockID + "'>";
    imgHolder += "<input type='submit' class='btn btn-success' value='Save Image'>";
    imgHolder += "</form>";
    $('.img-wrapper.' + blockID).html(imgHolder);
}

var makeBlock1Editable = function(blockID) {
    // Needs to first make 2 new holders for both image and text
    // then should insert them into the dom(naked), and call
    // makeTextEditable and makeImageEditable
    makeTextEditable(blockID);
    makeImageEditable(blockID);
}



var makeBlock2Editable = function(blockID) {
    // Needs to first make 2 new holders for both image and text
    // then should insert them into the dom(naked), and call
    // makeTextEditable and makeImageEditable
    var venueName = $('.map-text.' + blockID).find('#venue-name');
    var venueAddress = $('.map-text.' + blockID).find('#venue-address');
    var venueBody = $('.map-text.' + blockID).find('#venue-body');

    //var newTextBox1 = "<textarea class='editable'>" + venueName.html() + "</textarea>";
    //var newTextBox2 = "<textarea class='editable'>" + venueAddress.html() + "</textarea>";
    //var newTextBox3 = "<textarea class='full'>" + venueBody.html() + "</textarea>";
    
    //venueName.html(newTextBox1);
    //venueAddress.html(newTextBox2);
    venueName.addClass("editable");
    venueAddress.addClass("editable");
    //venueBody.html(newTextBox3);
    venueBody.addClass("editable");
    
    var saveButton = "<a class='btn btn-success' onclick='postMapTextBlock("+blockID+")'>Save Text</a>";
    $('.text-wrapper.' + blockID).append(saveButton);
    tinymce.init({
        selector : ".editable",
        inline: true,
        menubar: false
    });
    /*
    tinymce.init({
        mode : "specific_textareas",
        editor_selector : "full"
    });
    */
}

var postMapTextBlock = function(blockID) {
    var postData = {};
    postData.blockIndex = blockID;
    postData.content = {};
    postData.date = tinyMCE.get(0).getContent();
    postData.body = tinyMCE.get(1).getContent();
    postData.blockType = 'block1';
    
    $.post("upload-text", postData)
        .always(function() {
            console.log("request sent");
        })
        .done(function(res) {
            if (res == 'ok') {
                $('#ajaxResult').html('<div class="well postResults">Update Successful!</div>');
                setTimeout(function() {
                    $('#ajaxResult').fadeOut(1200, function() {
                        $('#ajaxResult').html('');
                        $('#ajaxResult').show();
                    });
                }, 1000);
            }
            window.location.reload();
        });
}