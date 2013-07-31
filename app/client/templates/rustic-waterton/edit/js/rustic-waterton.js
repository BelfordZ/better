// TEMPLATES :: RUSTIC-WATERTON :: EDIT :: RUSTIC-WATERTON.JS

$(function() {
    $( "#sortable" ).sortable({
        forcePlaceholderSize: true,
        placeholder: "ui-state-highlight",
        handle: ".moveButton",
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
    postData.content = tinyMCE.get(blockID).getContent();
    postData.linkType = 'text';
    
    $.post("edit", postData)
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
        undoMakeTextEditable(postData.content, blockID);
    });
};

var makeTextEditable = function(blockID) {
    var blockContent = $(".text-wrapper." + blockID).html();
    var textArea = "<textarea id='" + blockID + "'>" + blockContent + "</textarea>";
    var editableBlock = textArea + "<a class='btn btn-success' onclick='postTextBlock(" +
                        blockID + ")'>Save Changes</a>";
    $('.text-wrapper.' + blockID).html(editableBlock);
    tinymce.init({
        mode: "textareas"
    });
};

var undoMakeTextEditable = function(blockContent, blockID) {
    var moveButton = "<button class='btn moveButton'><i class='icon-move'></i></button>";
    var editButton = "<button class='editButton btn btn-primary' onclick='makeTextEditable(" + blockID + ")'>";
    editButton += "<i class='icon-pencil'></i></button>"
    var buttons = moveButton + editButton;
    var editableBlock = buttons + "<div class='inner-block-text'>" + blockContent + "</div>";

    $('#block' + blockID).html(editableBlock);
};

var postGalleryBlock = function(blockID) {
    var postData = {};
    postData.linkIndex = blockID;
    postData.content = $('#imgBlock' + blockID).attr("files");
    postData.linkType = 'block1-img';
    
    console.log(postData);
    
    $.post("upload-image", postData)
        .always(function() {
            console.log("request sent");
        })
        .done(function(res) {
            console.log(res);
    });
};

var makeImageEditable = function(blockID) {
    var imgHolder = $('.img-wrapper.' + blockID).html();
    imgHolder += "<form action='upload-image' enctype='multipart/form-data' method='post'>";
    imgHolder += "<input id='"+blockID+"' type='file' name='inputImg'>";
    imgHolder += "<input type='hidden' name='blockIndex' value='" + blockID + "'>";
    imgHolder += "<input type='hidden' name='blockType' value='" + blockID + "'>";
    imgHolder += "<input type='submit' class='btn btn-success' value='Save Changes'>";
    imgHolder += "</form>";
    /*
    var imgHolder = $('.img-wrapper.' + blockID).html();
    imgHolder += '<form id="imgBlock'+blockID+'" enctype="multipart/form-data"><input type="file" name="inputImg" id="files"></form><button class="changeImg btn btn-success" onclick="postGalleryBlock(' + blockID + ')">Change Image</button>';
    */
    $('.img-wrapper.' + blockID).html(imgHolder);
}

var makeBlock1Editable = function(blockID) {
    // Needs to first make 2 new holders for both image and text
    // then should insert them into the dom(naked), and call
    // makeTextEditable and makeGalleryEditable
    makeTextEditable(blockID);
    makeImageEditable(blockID);

}