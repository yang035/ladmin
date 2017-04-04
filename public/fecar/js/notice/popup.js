
$(function(){

    popupMessage();

});

function popupMessage(){
    let $sendButton = $(".js-send-title");
    let $lsItems = $(".js-send-content");

    $lsItems.find("[data-sendtype=specify]").hide();

    $sendButton.on("change", ":radio", function(){

        $lsItems.find("[data-sendtype]").hide();
        
        let $this = $(this);
        let sendtype = $this.data("sendtype");
        $lsItems.find("[data-sendtype='" + sendtype + "']").show();
        
    });
}
