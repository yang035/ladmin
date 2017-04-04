

// 图片预览，使用FileReader生成base64，放至img src中
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL

const selector = {
	main: ".js-pic-preview",
	img: "img",
	file: "input[type='file']",
	name: ".js-pic-name"
}

$(selector.main).each(function(){
	let $this = $(this);
	let $img = $this.find(selector.img);
	let $file = $this.find(selector.file);
	let $name = $this.find(selector.name);

	$file.on("change", function(){
		let file = this.files[0];

		let reader = new FileReader();

		reader.addEventListener("load", function () {
			$img.prop("src", reader.result);
		});

		if(file){
			reader.readAsDataURL(file);

			$name.addClass("active").text(file.name);
		}
	});
});
