
$(function(){

    addSplash();

});

function addSplash(){
    let $lsItems = $(".js-splash-banner");
    let $splashButton = $(".js-splash-theme");
    let $form = $(".js-ajax-form-file");
    
    $splashButton.on("change", ":radio", function(){
        let $this = $(this);
        let type = $this.data("type");
        

        if(type === "all"){
            $lsItems.find("[data-type]").show();
        }else{
            $lsItems.find("[data-type]").hide();
            $lsItems.find("[data-type='" + type + "']").show();
        }
    });


    $form.on("click", ".del", function(){
        let $this = $(this);
        $this.siblings("img").removeAttr("src");
    });


    $lsItems.find("input[type=file]").on("change", function(){
    
        let file = this.files[0];
        let that = this;

        if(window.FileReader){
            let reader = new FileReader();
            reader.addEventListener("load", function () {
                $(that).siblings().prop("src", reader.result);
            });

            if(file){
                reader.readAsDataURL(file);
            }
        }
    });
}


