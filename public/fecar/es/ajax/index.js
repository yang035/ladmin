

let i = 0;
let $body = $(document);

$.ajaxSetup({
	cache: false
});

$body.ajaxStart(function(){
	i = layer.load(2);
}).ajaxComplete(function(){
	layer.close(i);
});
