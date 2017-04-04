

(function(){
    let $layer = $(".js-layer-add");
    let $elAdd = $(".js-auction-session-add");

    $elAdd.on("click", function(){
        layer.open({
            title: "新增场次",
            type: 1,
            content: $layer
        });
    });

})();
