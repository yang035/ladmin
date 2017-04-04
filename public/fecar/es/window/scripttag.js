

// 获取url和模版的方法

function getTemplate(selector){
	return $(selector).html();
}


const urlSelector = ".js-be-url";

function getUrl(){
	let o = {};
	let $url = $(urlSelector);

	$url.each(function(){
		let $this = $(this);

		try{
			$.extend(o, JSON.parse($this.text()) );
		}catch(e){ }

	});

	return o;
}


window.getTemplate = getTemplate;
window.getUrl = getUrl;
