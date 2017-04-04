

function ajaxdata(data){
	if(data.status === 1){
		layer.closeAll();
		layer.msg(data.msg, window.option.msgSuccess);
		setTimeout( () => {
			$("form").resetForm();
		}, 1600 );
	}else{
		layer.msg(data.msg, window.option.msgFailed);
	}
	if(data.type === 1){
		setTimeout( () => {
			location.reload();
		}, 1500 );
	}else if(data.type === 2){
		setTimeout( () => {
			location.href = data.url;
		}, 1500 );
	}else if(data.type === 3){
		setTimeout( () => {
			try {
				window.top.closeTabNow();
			}catch(e){}
		}, 1500);
	}else if(data.type === 4){
		setTimeout( () => {
			try {
				window.top.closeTabNowAndFresh();
			}catch(e){}
		}, 1500);
	}else if(data.type === 5){
		setTimeout( () => {
			try {
				window.top.appendMainFrame(data.url);
				window.top.closeTab(location.href);
			}catch(e){}
		}, 1500);
	}
}


module.exports = ajaxdata;
