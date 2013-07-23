var initEditor = function() {
    tinymce.init({
        mode: "textareas"
    });
};

var postTextBlock = function(blockID) {
    var postData = {};
    postData.blockIndex = blockID;
    tinyMCE.triggerSave();
    postData.content = $('#' + blockID).attr("value");
    postData.linkType = 'text';
    console.log(postData);
    
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
    });
};

$(function() {
    $( "#sortable" ).sortable({
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
});