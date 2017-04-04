

// 选择关闭元素，移除 .tag/.js-tag 的祖先（关闭按钮在tag内）

const selector = ".js-close";


$("body").on("click", selector, function(e){
	let $close = $(this);
	let $parents = $close.parents(".tag, .js-tag");

	$parents.remove();

});
