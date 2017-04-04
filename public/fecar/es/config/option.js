

// https://github.com/Eonasdan/bootstrap-datetimepicker
let datetimepicker = {
	format: "YYYY-MM-DD HH:mm:ss",
	dayViewHeaderFormat: "YYYY-MM",
	sideBySide: true,
	locale: 'zh-cn'
}


let datetimenosecondpicker = {
	format: "YYYY-MM-DD HH:mm",
	dayViewHeaderFormat: "YYYY-MM",
	sideBySide: false,
	locale: 'zh-cn'
}


// https://github.com/uxsolutions/bootstrap-datepicker
let datepicker = {
	language: 'zh-CN',
	format: "yyyy-mm-dd",
	autoclose: true,
	todayHighlight: true,
	weekStart: 0
}

// https://github.com/jdewit/bootstrap-timepicker
let timepicker = {
	minuteStep: 15,
	showSeconds: true,
	secondStep: 15,
	showMeridian: false,
	defaultTime: false,
	defaultTime: "12:00:00"
}


// https://github.com/aexmachina/jquery-bonsai
let bonsai = {
	expandAll: true
}

let bonsaiRadio = {
	expandAll: true,
	createInputs: "radio"
}

let bonsaiCheckbox = {
	expandAll: true,
	createInputs: "checkbox",
	checkboxes: true
}


// https://github.com/malsup/form
let ajaxForm = {
	dataType: "json",
	success: data => {
		if(data.status === 1){
			$("button[type='submit']").prop("disabled", "true");
			
			layer.closeAll();
			layer.msg(data.msg, window.option.msgSuccess);
			setTimeout( () => {
				$(".js-ajax-form").resetForm();
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
	},
	error: () => {
		layer.msg("请求服务器失败", window.option.msgFailed);
	},
	always: ()=> {
		$("button[type='submit']").prop("disabled", "false");
	}
}


// http://www.layui.com/doc/modules/layer.html
let msgDefault = {
	time: 1000
}

let msgSuccess = {
	time: 1500,
	icon: 1
}

let msgFailed = {
	time: 1500,
	icon: 2
}

let msgWarn = {
	time: 1500,
	icon: 7
}


let layerDefault = {
	maxWidth: 800,
	shift: 5
}

module.exports = {
	datetimepicker,
	datetimenosecondpicker,
	datepicker,
	timepicker,
	bonsai,
	bonsaiRadio,
	bonsaiCheckbox,
	ajaxForm,
	msgDefault,
	msgSuccess,
	msgFailed,
	msgWarn,
	layerDefault
}
