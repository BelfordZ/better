var postTextBlock = function(blockID) {
    var postData = {};
    postData.linkIndex = blockID;
    postData.content = $('#' + blockID).attr("value");
    postData.linkType = 'text';
    console.log(postData);
    
    $.post("edit", postData)
        .always(function() {
            console.log("request sent");
        })
        .done(function(res) {
            console.log("res");
    });
};