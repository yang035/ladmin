

// 异步设置包含图片预览和上传的异步表单
// 同 ajax-form-file 和 pic-preview

function initPicForm(){

	const selector = {
		form : ".js-ajax-form-pic",
		del : ".del",
		moduleFile : ".m-file",
		add : ".js-add-pic",
		wrap : ".js-file-wrap",
		file : "input[type='file']",
		name : "p",
		img : "img",
		submit : "[type='submit']"
	}


	let $form = $(selector.form);

	$form.each(function(i){
		let $form = $(this);

		$form.on("click", selector.del, function(){
			let $this = $(this);

			$this.parents(selector.moduleFile).remove();
		});


		let $wrap = $form.find(selector.wrap);
		let $add = $form.find(selector.add);

		let tpl = getTemplate(".jst-pic-file");

		$add.on("click", function(){
			let $m = $(tpl);

			let $file = $m.find(selector.file);
			let $img = $m.find(selector.img);
			let $name = $m.find(selector.name);

			let reader = new FileReader();

			$file.on("change", function(event){
				let file = this.files[0];

				reader.addEventListener("load", function () {
					$img.prop("src", reader.result);
				});

				if(file){
					reader.readAsDataURL(file);
					$wrap.append($m);
				}

				$name.text(file.name);
			});

			$m.find(selector.file).trigger("click");
		});

		$form.on("submit", function(){
			let $this = $(this);
			let formData = new FormData($this.get(0));

			let $btn = $this.find(selector.submit);

			$.ajax({
				url: $this.prop("action"),
				type: "POST",
				data: formData,
				dataType: "json",
				async: false,
				cache: false,
				contentType: false,
				processData: false
			}).done( (data) => {
				window.method.ajaxdata(data);
			}).fail( () => {
				layer.msg("请求服务器失败", option.msgFailed);
			});

			return false;
		});
	});
}


module.exports = initPicForm;
