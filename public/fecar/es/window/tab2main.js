

// a[target="tab"]（appendMainFrame）为新增一个tab
// tab包括tab标签和对应的iframe子页面，保存在hash中，key为url
// 所有针对tab的操作均以src（url）为参数，而后在hash[src]中寻找对应tab和iframe进行处理
// 注意结尾放入window中的方法

const createFrame = require("../module/create-frame");

const scrollWidth = 120 * 3;
const tabWidth = 120;

const selector = {
	content: ".js-main-content",
	wrapTab: ".jsw-main-tab",
	listTab: ".jsl-main-tab",
	titleTab: ".js-title",
	closeTab: ".close",
	closeTabAll: ".js-tab-close",
	refreshTab: ".js-tab-refresh",
	prevTab: ".js-tab-prev",
	nextTab: ".js-tab-next"
}

let $elContent = $(selector.content);
let $wrapTab = $(selector.wrapTab);
let $listTab = $(selector.listTab);

let $btnFresh = $(selector.refreshTab);
let $prevTab = $(selector.prevTab);
let $nextTab = $(selector.nextTab);
let $btnCloseAll = $(selector.closeTabAll);

const listWidth = $listTab.width();
const scrollOffset = $listTab.position().left;

let hash = {};

function appendMainFrame(src){
    if( hash[src] ){
        showTab(src);
		switchTab(src);
        refreshTab(src);

        return;
    }

	let f = createFrame(src);
	let id = idGenerator();

	f.id = id;

	let $tab = appendTab(id);
    let $f = $(f);
    hash[src] = {$tab, $f};

	f.addEventListener("load", function(){
		let title = this.contentWindow.document.title;

		title = (title === "") ? "无标题" : title;

		$tab.prop("title", title);
		$tab.find(selector.titleTab).text(title);
		removeLoading(src);
	});

	$elContent.children("iframe").hide();
	$elContent.append(f);


	$tab.on("click", function(){
        showTab(src);
		switchTab(src);
	});

	$tab.find(selector.closeTab).on("click", function(event){
		event.preventDefault();

        closeTab(src);
	});

}


function showTab(src){
    hash[src].$f.show().siblings().hide();
    hash[src].$tab.addClass("active").siblings().removeClass("active");
}

function closeTab(src){
    hash[src].$f.remove();

    let $tab = hash[src].$tab;

    if($tab.hasClass("active")){
        let $prev = $tab.prev();
        if($prev.length > 0){
            $prev.trigger("click");
        }else{
            $tab.next().trigger("click");
        }
    }

    $tab.remove();
	delete hash[src];
}

function switchTab(src){
    let left = hash[src].$tab.position().left;
	let scrollLeft = $listTab.scrollLeft();

	if(left > listWidth - tabWidth){
		animateScroll(scrollLeft + left - (listWidth - tabWidth) - scrollOffset);
	}else if(left < scrollOffset){
		animateScroll(scrollLeft + left - scrollOffset);
	}
}

function refreshTab(src){
	addLoading(src);
    hash[src].$f.get(0).contentWindow.location.reload(true);
}

function refreshToInit(src){
	addLoading(src);
    hash[src].$f.get(0).contentWindow.location.href = src;
}

function animateScroll(left){
	$listTab.stop(true).animate({
		"scrollLeft": left + "px"
	}, 200);
}

function addLoading(src){
	hash[src].$tab.addClass("loading");
}

function removeLoading(src){
	hash[src].$tab.removeClass("loading");
}


$("body").on("click", 'a[target="tab"]', function(event){
	let src = $(this).prop("href");
	event.preventDefault();

    appendMainFrame(src);
});


$btnFresh.on("click", function(){
	let src = $elContent.children("iframe:visible").prop("src");

	refreshTab(src);
});

$btnCloseAll.on("click", function(){
	if(Object.keys(hash).length < 1){
		return;
	}

	layer.confirm(
		"是否关闭所有标签？",
		(index) => {

		for(let i in hash){
			if(hash.hasOwnProperty(i)){
				hash[i].$f.remove();
				hash[i].$tab.remove();
				delete hash[i];
			}
		}

		layer.close(index);
	});
});


$prevTab.on("click", function(){
	animateScroll($listTab.scrollLeft() - scrollWidth);
});

$nextTab.on("click", function(){
	animateScroll($listTab.scrollLeft() + scrollWidth);
});


function idGenerator(){
	return (new Date()).getTime();
}

function appendTab(id){
	let templateTab = getTemplate(".jst-main-tab");
	let o = {
		id,
	}
	let $tab = $(template.compile(templateTab)(o));

	$tab.addClass("active loading");

	let $tabActive = $listTab.children(".active");
	if($tabActive.length === 0){
		$listTab.append($tab);
	}else{
		$tabActive.after($tab);
	}
	$tab.siblings().removeClass("active");

	let left = $tab.position().left;
	let scrollLeft = $listTab.scrollLeft();

	if(left > listWidth - tabWidth){
		$listTab.scrollLeft(scrollLeft + left - (listWidth - tabWidth));
	}

	return $tab;
}


window.appendMainFrame = appendMainFrame;
window.closeTab = closeTab;
window.refreshToInit = refreshToInit;
window.closeTabNow = function(){
	$listTab.children(".active").find(selector.closeTab).trigger("click");
}
window.closeTabNowAndFresh = function(){
	$listTab.children(".active").find(selector.closeTab).trigger("click");
	setTimeout(() => {
		$btnFresh.trigger("click");
	}, 200);
}
