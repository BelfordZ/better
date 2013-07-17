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