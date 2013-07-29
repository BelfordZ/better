$(function() {
    $( "#sortable" ).sortable({
        forcePlaceholderSize: true,
        placeholder: "ui-state-highlight",
        handle: ".moveButton",
        cancel: '',
        start: function(event, ui) {
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
    var blockContent = $("#block" + blockID + " .inner-block-text").html();
    var textArea = "<textarea id='" + blockID + "'>" + blockContent + "</textarea>";
    var editableBlock = textArea + "<a class='btn btn-success' onclick='postTextBlock(" +
                        blockID + ")'>Save Changes</a>";
    $('#block' + blockID).html(editableBlock);
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
    postData.content = $('#' + blockID).attr("files");
    postData.linkType = 'gallery';
    console.log(postData);
    
    $.post("edit", postData)
        .always(function() {
            console.log("request sent");
        })
        .done(function(res) {
            console.log("res");
    });
};

var makeImageEditable = function(blockID) {
    var liteBox = $("#modal-alert");
    liteBox.modal('show');
}

var makeBlock1Editable = function(blockID) {
    // Needs to first make 2 new holders for both image and text
    // then should insert them into the dom(naked), and call
    // makeTextEditable and makeGalleryEditable
    
    
}