
if(!window.bw){
	bw  = {};
}

if(!window.tags){
	tags  = {};
}


function getTplPath(path){
	return tpl_root + path;
}

//多终端视频播放
var sUserAgent = navigator.userAgent.toLowerCase();
var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
var bIsAndroid = sUserAgent.match(/android/i) == "android";
var bIsSafari = sUserAgent.match(/safari/i) == "safari";
var bIsTouch = bIsIpad || bIsIphoneOs || bIsAndroid;

var windowHeight = document.documentElement.clientHeight;
var windowWidth = document.documentElement.clientWidth;


$(function() {
	bw.studyVideoPlay();

	bw.h2Fold();
	bw.initNav();
	bw.initLayout();
	bw.initVideoBox();
	bw.initMainTab();
	bw.initVideoPlayer();
	bw.initTips();
	bw.initHome();
	bw.initDaGang();
	bw.initWords();
	bw.initTeacher();
	bw.onWindowResize();
	bw.shiTi();
	bw.zhuanJiaJiangZhuo();
	bw.biJi();
	bw.xueXi();
	bw.shenRuXueXi();
	bw.init();
	bw.contentMinHeight();
	bw.referImgMarginTop();
	bw.secLiWidth();
	bw.teacherImgHeight();
	tags.multiPic();
	tags.singlePic();
	tags.video();
	tags.videoPlayer();
	bw.studyToPage();
	tags.typeBox();
	tags.keywords();


	//TODO
	//$(".r_rightbox").find("ul li").addClass("button white");

	
});


tags.typeBox = function(dom){
	if(!dom) dom = document.body;
	$(dom).find("p, .questionCon").each(function(n){
		var html = $(this).html();
		html = html.replace(/_{6,}/g,function($0){
			return "<input class='typebox' type='text' size='"+ $0.length +"' />";
		});
		$(this).html(html);
	});
}


//课程学习页面内分页
bw.studyToPage = function(){

	var _study = $(".study_main .study_content");
	var _study_height = _study.height();
	var defalt_height = 1200;
	var size = parseInt(_study_height/defalt_height)+4;
	var tab_height = 0;
	var tag = 0;

	if(!_study.length) return false;
	if(_study_height <= defalt_height) return false;
	if(windowWidth < 480) return false;

	var _list = $('<ul class="tab_list"></ul>');

	for(var i=0; i<size; i++){
		var _tab = $('<div class="tab"></div>');
		_tab.appendTo(_study);
	}

	_list.appendTo(_study);

	_study.children().not(".tab").not(".tab_list").each(function(){
		var _this = $(this);
		var _height = _this.outerHeight(true);

		tab_height += _height;

		if(tab_height > defalt_height){
			tab_height = _height;
			tag++;
		}
		_this.clone().appendTo($(".tab:eq("+ tag +")"));
	});

	_study.children().not(".tab").not(".tab_list").remove();

	_study.find(".tab").each(function(){
		var tab_html = $(this).children().size();
		if(!tab_html){
			$(this).remove();
		}
	});
	var tab_size = _study.find(".tab").size();

	for(var i=0; i<tab_size; i++){
		var _li = $("<li>"+ (i+1) +"</li>");
		_li.appendTo(_list);
	}

	_study.find(".tab:eq(0)").show().siblings(".tab").hide();
	_study.find(".tab_list li:eq(0)").addClass("cur");
	_study.find(".tab_list li").click(function(){
		var ids = $(this).index();
		$("html").scrollTop(0);
		$(this).addClass("cur").siblings().removeClass("cur");
		_study.find(".tab:eq("+ ids +")").fadeIn().siblings(".tab").hide();
	});
}

//教师导言h2折叠展开
bw.h2Fold = function(){
	$(".data_bg h2").click(function(){
		$(this).toggleClass("hide");
		$(this).nextUntil("h2").toggle();
	});
}

//页面跳转更新导航样式
bw.initNav = function(){

	location.href.match(/([^/]*)$/);
	var str = RegExp.$1;

	$(".topBarTab li").each(function(){
		var _this = $(this);
		var href = $(this).find("a").attr("href");
		$(".secBarTab li").each(function(){
			var sec_href = $(this).find("a").attr("href");
			if(sec_href == href) {
				_this.addClass("cur");
			}
		});

		if(str.indexOf('chapter') >= 0 && href.indexOf('chapter') >= 0 && str.indexOf('zhuan_jia_jiang_zuo') < 0 && str.indexOf('an_li_ku') < 0){
			_this.addClass("cur");
		}
		if(str.indexOf('index') >= 0 && href.indexOf('index') >= 0){
			_this.addClass("cur");
		}
	});

	$(".secBarTab li").each(function(){
		var href = $(this).find("a").attr("href");
		href.match(/([^/]*)$/);
		var href_str = RegExp.$1;
		if(href_str == str){
			$(this).addClass("cur");
		}
		if(str.indexOf("jiao_shi_dao_yan") >= 0 && href_str.indexOf("jiao_shi_dao_yan") >= 0){
			var d1 = $(this).index();
			$(".secBarTab li:eq("+ d1 +")").addClass("cur");
		}
		if(str.indexOf("zhuan_jia_jiang_zuo") >= 0 && href_str.indexOf("zhuan_jia_jiang_zuo") >= 0){			
			var d2 = $(this).index();
			$(".secBarTab li:eq("+ d2 +")").addClass("cur");
		}
		if(str.indexOf("an_li_ku") >= 0 && href_str.indexOf("an_li_ku") >= 0){			
			var d3 = $(this).index();
			$(".secBarTab li:eq("+ d3 +")").addClass("cur");
		}
	});
}

//基本布局
bw.initLayout = function(){
	$(".more_tool").click(function() {
		$(".topBarTab").slideToggle();
	});

	$(".contain_box img:eq(0)").css("opacity","1").siblings("img").css("opacity","0");

	//去除首尾的竖线
	$(".topBarTab").find("li:first").css("borderLeft", "none");
	$(".topBarTab").find("li:last").css("borderRight", "none");
}

//初始化tip提示
bw.initTips = function(dom){
	dom = dom || document.body;
	$(dom).find(".tip").hover(function(){
		$(this).find(".tipblock").toggle();
	}); 
}

//视频XXX初始化
bw.initVideoBox = function(dom){
	dom = dom || document.body;
	var video_img_scale = 720 / 480;
	var video_img_width = $(dom).find(".video_area").width();
	var video_img_height = parseInt(video_img_width/video_img_scale);

	$(dom).find(".video_area").css("height",video_img_height);
	$(dom).find(".videoBox .sidelist, .sidelist .inner").css("height",video_img_height);

	$(window).resize(function(){
		video_img_width = $(dom).find(".video_area").width();
		video_img_height = parseInt(video_img_width/video_img_scale);
		$(dom).find(".videoBox .sidelist, .sidelist .inner").css("height", video_img_height);
		$(dom).find(".video_area").css("height",video_img_height);
	});
}

//布局相关初始化
bw.initMainTab = function(){
	//首页slide图片自适应显示
	var winWidth = document.documentElement.clientWidth;

	if(winWidth <= 480){
		$(".mainScope").find(".mainTab").each(function(){
			var ids = $(this).index();
			$(this).find("img").attr("src",getTplPath("images/a"+ (ids+1) +".png"));
		});
	}

	$(window).resize(function(){
		winWidth = document.documentElement.clientWidth;
		if(winWidth <= 480){			
			$(".mainScope").find(".mainTab").each(function(){
				var ids = $(this).index();
				$(this).find("img").attr("src",getTplPath("images/a"+ (ids+1) +".png"));
			});
		}else{
			$(".mainScope").find(".mainTab").each(function(){
				var ids = $(this).index();
				$(this).find("img").attr("src",getTplPath("images/pic"+ (ids+1) +".png"));
			});
		}
	});
}

bw.initVideoPlayer = function(dom){
	dom = dom || document.body;
	var video_scale = 720 / 480;
	$(dom).find(".video_area").click(function(){
		$(".bw_video_player").show();
		$(this).find("img").hide();
		$(this).find(".playbtn").hide();
	});

	var video_area_width = $(dom).find(".video_area").width();
	var video_area_height = $(dom).find(".video_area").height();
	var video_play_width = $(dom).find(".playbtn").width();
	$(dom).find(".bw_video_player").css({
		"width": video_area_width,
		"height": video_area_width/video_scale
	});

	$(window).resize(function(){
		video_area_width = $(dom).find(".video_area").width();
		video_area_height = $(dom).find(".video_area").height();
		video_play_width = $(dom).find(".playbtn").width();
		$(dom).find(".bw_video_player").css({
			"width": video_area_width,
			"height": video_area_width/video_scale
		}).empty();
		tags.videoPlayer();
	});
}

//tab切换效果通用js
jQuery.jqtab = function(tabtit, tab_conbox, event, curclass) {
	$(tabtit).children().eq(0).addClass(curclass).siblings().removeClass(curclass);
	$(tab_conbox).children().eq(0).show().siblings().hide();

	$(tabtit).find("li").bind(event, function() {
		var actIndex = $(this).index();
		$(this).addClass(curclass).siblings().removeClass(curclass);
		$(tab_conbox).children().eq(actIndex).show().siblings().hide();
		return false;
	});
};



//首页content切换
bw.initHome = function(dom){
	dom = dom || document.body;
	var ids = 0;
	var liLen = $(dom).find(".mainTabBtn li").size();
	if (liLen) {
		$(dom).find(".mainTabBtn li").click(function() {
			ids = $(this).index();
			$(this).addClass("mainTabCur").siblings().removeClass("mainTabCur");
			$(this).parents(".main").find(".mainTab:eq(" + ids + ")").fadeIn(600).siblings(".mainTab").hide();
		});

		$(dom).find(".mainBtnLeft").click(function() {
			if (ids) {
				$(this).parents(".main").find("li:eq(" + (ids - 1) + ")").addClass("mainTabCur").siblings().removeClass("mainTabCur");
				$(this).parents(".main").find(".mainTab:eq(" + (ids - 1) + ")").fadeIn(600).siblings(".mainTab").hide();
				ids -= 1;
			} else {
				$(this).parents(".main").find("li:eq(" + (liLen - 1) + ")").addClass("mainTabCur").siblings().removeClass("mainTabCur");
				$(this).parents(".main").find(".mainTab:eq(" + (liLen - 1) + ")").fadeIn(600).siblings(".mainTab").hide();
				ids = liLen - 1;
			}
		});

		$(dom).find(".mainBtnRight").click(function() {
			if (ids < liLen - 1) {
				ids += 1;
				$(this).parents(".main").find("li:eq(" + (ids) + ")").addClass("mainTabCur").siblings().removeClass("mainTabCur");
				$(this).parents(".main").find(".mainTab:eq(" + (ids) + ")").fadeIn(600).siblings(".mainTab").hide();
			} else {
				$(this).parents(".main").find("li:eq(0)").addClass("mainTabCur").siblings().removeClass("mainTabCur");
				$(this).parents(".main").find(".mainTab:eq(0)").fadeIn(600).siblings(".mainTab").hide();
				ids = 0;
			}
		});

		$(dom).find(".mainLeft").click(function() {
			$(dom).find(".mainBtnLeft").click();
		});
		$(dom).find(".mainRight").click(function() {
			$(dom).find(".mainBtnRight").click();
		});

		picTimer = setInterval(function(){
			$(dom).find('.mainBtnRight').click();
		}, 4000);

		$(dom).find(".mainScope").hover(function() {
			clearInterval(picTimer);
		}, function() {
			picTimer = setInterval(function(){
				$(dom).find('.mainBtnRight').click();
			}, 4000);
		});
	}
}

//教学大纲
bw.initDaGang = function(dom){
	dom = dom || document.body;
	$(dom).find(".s_rightbox").find("ul").hide();
	$(dom).find(".s_rightbox").find("span").click(function(){
		$(this).next().toggle();
	});
}

//课程词典
bw.initWords = function(dom){
	dom = dom || document.body;
	var init_letter = 0;

	//课程词典
	var init_first = 1;
	
	$(dom).find(".wordTab").each(function() {
		var a = $(this).index(".wordTab");
		var tag = $(this).find(".wordList").size();
		if(init_first && tag){
			init_letter = a;
			init_first = 0;
		}
		if (!tag) {
			$(dom).find(".letterList").find("li:eq(" + a + ")").attr("disabled", "disabled").addClass("gray");
		}
	});	
	$(dom).find(".wordTab:eq("+ init_letter +")").show().siblings(".wordTab").hide();
	$(dom).find(".letterList li:eq("+ init_letter +")").addClass("letterCur").siblings().removeClass("letterCur");
	$(dom).find(".letterList li").click(function() {
		var ltLi_num = $(this).index(".letterList li");
		var col;
		var winWid = $(window).width();
		$(this).addClass("letterCur").siblings().removeClass("letterCur");
		$(dom).find(".scope").find(".wordTab:eq(" + ltLi_num + ")").show().siblings(".wordTab").hide();

	});
}

//教师介绍
bw.initTeacher = function(dom){
	dom = dom || document.body;
	var t_name_num = $(dom).find(".t_name li").size();
	var t_tab_num = $(dom).find(".tab_teacher li").size();
	var tag = 1;
	var teacher_tag = 0;
	if (t_name_num) {
		if(t_name_num == 1){
			$(dom).find(".t_leftbox .t_leftmiddlebox .prev, .t_leftbox .t_leftmiddlebox .next").css({
				"opacity": "0",
				"cursor": "default"
			});
		}else{
			var t_width = $(dom).find(".t_name li").width();
			var t_size = $(dom).find(".t_name li").size();
			var t_name_width = $(dom).find(".t_name").outerWidth(true);
			$(window).resize(function(){
				t_name_width = $(dom).find(".t_name").outerWidth(true);
			});		
			function initShowTeacher(init){
				$(dom).find(".t_name li:eq("+ init +")").show().siblings().hide();
				$(dom).find(".t_lefttopbox, .t_leftbottombox, .t_rightbox").find(".tab:eq("+ init +")").show().siblings(".tab").hide();
			}
			function showNextTeacher(){
				if(tag){
					tag = 0;
					teacher_tag++;
					if(teacher_tag == t_size) teacher_tag = 0;
					$(dom).find(".t_lefttopbox, .t_leftbottombox, .t_rightbox").find(".tab:eq("+ teacher_tag +")").show().siblings(".tab").hide();
					$(dom).find(".t_name li:eq("+ teacher_tag +")").show().css({
						"left": t_name_width,
						"zIndex": 2
					}).animate({
						left: 0
					});
					$(dom).find(".t_name li:eq("+ (teacher_tag-1) +")").animate({
						left: -t_name_width
					},function(){
						tag = 1;
						$(this).css({
							"left": 0,
							"zIndex": 1
						});
					});	

					if(t_tab_num){
						$(dom).find(".tab_teacher li:eq("+ teacher_tag +")").addClass("cur").siblings().removeClass("cur");
					}			
				}
			}
			function showPrevTeacher(){	
				if(tag){
					tag = 0;
					$(dom).find(".t_name li:eq("+ teacher_tag +")").animate({
						left: t_name_width
					},function(){
						$(this).css({
							"left": 0,
							"zIndex": 1
						});
					});
					teacher_tag--;
					if(teacher_tag == -1) teacher_tag = t_size - 1;
					$(dom).find(".t_lefttopbox, .t_leftbottombox, .t_rightbox").find(".tab:eq("+ teacher_tag +")").show().siblings(".tab").hide();
					$(dom).find(".t_name li:eq("+ teacher_tag +")").show().css({
						"left": -t_name_width,
						"zIndex": 2
					}).animate({
						left: 0
					},function(){
						tag = 1;
					});	

					if(t_tab_num){
						$(dom).find(".tab_teacher li:eq("+ teacher_tag +")").addClass("cur").siblings().removeClass("cur");
					}			
				}
			}
			initShowTeacher(0);
			$(dom).find(".t_leftmiddlebox .next").click(function(){
				showNextTeacher();
			});
			$(dom).find(".t_leftmiddlebox .prev").click(function(){
				showPrevTeacher();
			});
			
		}
	}
	/*$(dom).find(".teach_li_tab li").click(function() {
		var num = $(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");
		$(this).parents(".tab").find(".teach_li_tab_content:eq(" + num + ")").show().siblings(".teach_li_tab_content").hide();
	});*/
	$(dom).find(".teach_li_tab_content h2").click(function(){
		$(this).toggleClass("show");
		$(this).nextUntil("h2").toggle();
	}).filter("h2").click();

	//teacher tab切换
	$(dom).find(".tab_teacher li:eq(0)").addClass("cur");
	$(dom).find(".tab_teacher li").click(function(){
		var t_li_ids = $(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");
		initShowTeacher(t_li_ids);
		teacher_tag = t_li_ids;
	});
}


//window resize
bw.onWindowResize = function(){


	$(window).resize(function() {

		//二级菜单
		var winWidth = $(window).width();
		if (winWidth > 480) {
			$(".topBarTab").show();
		} else {
			$(".secBar").hide();
		}

		//windowHeight windowWidth
		windowHeight = document.documentElement.clientHeight;
		windowWidth = document.documentElement.clientWidth;


	});
}


//试题页面
bw.shiTi = function(){
	//课程评价

	$(".qusetion_num").find("ul li").addClass("button white");

	if ($(".question_right li").size()) {

		var question_left_offset = $(".question_left").offset();
		var question_left_width = $(".question_left").outerWidth(true);
		var question_right_offset = $(".question_right").offset();
		var question_right_width = $(".question_right").width();


		var s_width = $(".content .scope").width();

		$(window).resize(function() {

			question_left_width = $(".question_left").outerWidth(true);
			question_right_width = s_width - question_left_width;
			e_resetPosition();
			s_width = $(".content .scope").width();

		});

		function e_resetPosition() {

			question_left_offset = $(".question_left").offset();
			question_left_width = $(".question_left").outerWidth(true);
			//$(".t_topbox").css("width", s_width);
			$(".question_right").css("left", question_left_offset.left + question_left_width);

		}

		setInterval(function() {
			e_resetPosition();
			var window_top = $(window).scrollTop();

			if (windowWidth >= 480) {
				if (window_top >= question_left_offset.top) {
					$(".question_right").css({
						"position": "fixed",
						"top": 0,
						"left": question_left_offset.left + question_left_width,
						"width": question_right_width
					});
				} else {
					$(".question_right").css({
						"position": "static",
						"width": "30%"
					});
				}
			} else {
				$(".question_right").css({
					"position": "static",
					"width": "100%"
				});
			}

		}, 100);

		//题号定位
		$(".question_right li").click(function() {
			var li_index = $(this).index();
			var el = $(".question_left").find(".questionbox:eq(" + li_index + ")").offset();
			$("html, body").animate({
				scrollTop: el.top
			}, 300);
			return false;
		});

		$(".question_left").find("input").click(function() {
			var in_par_que = $(this).parents(".questionbox");
			var in_index = in_par_que.index(".questionbox");

			$(".question_right").find("li:eq(" + in_index + ")").addClass("black");

		});

		//做完一题自动滚动到下一题
		$("li.f-cb").click(function(){
			
		});

		function reset() {
			$("textarea").val("");
			$(".question_right li").removeClass("black").removeClass("cur");
			$(".question_left").find("input:radio").attr("checked", false);
		}
		reset();
		$(".reset").click(function() {
			reset();
		});
		$(".submit").click(function() {
			var val = $("textarea").val();
			if (val) {
				reset();
				alert("您的意见已提交，谢谢参与！");
			} else {
				alert("意见不能为空！");
			}
		});

		//尺寸小于480px，试题选项变化


		function questionChoiceChange(){

			if (windowWidth <= 480) {

				$(".questionbox").each(function() {
					var i = $(this).index();
					var name = $(this).find(".select_choice input").attr("name");
					$(this).find(".question_choice li").each(function() {
						var id = $(this).parent().attr("for");
						$(this).prepend("<input type='radio' id='" + id + "' name='" + name + "'>");
					});
					$(this).find(".select_choice").hide();
				});
			} else {
				$(".questionbox").each(function() {
					$(this).find(".question_choice li").each(function() {
						$(this).find("input").remove();
					});
					$(this).find(".select_choice").show();
				});
			}
			
		}

		questionChoiceChange();
		
	}

	$(".li_fi").each(function() {
		$(this).find("a:eq(0)").hide();
	});


	//试卷侧栏导航定位
	if ($(".test_sidelist li").size()) {

		$(".questionbox").find("img").attr("align","absmiddle");

		if (windowWidth <= 480) {
			$(".questionbox").each(function() {
				var i = $(this).index();
				var name = $(this).find(".select_choice input").attr("name");
				$(this).find(".question_choice li").each(function() {
					var id = $(this).parent().attr("for");
					$(this).prepend("<input type='radio' id='" + id + "' name='" + name + "'>");
				});
				if ($(this).find(".select_choice ul li").size() > 3) {
					$(this).find(".select_choice").hide();
				}
			});

			$(".reset").click(function() {
				$(".questionbox").each(function() {
					var sel_size = $(this).find(".select_choice li").size();
					if (sel_size > 3) {
						$(this).find(".select_choice").hide();
					}
				});

			});
		}



		$(".test_sidelist").find("ul li ul li").addClass("button white");

		var testBox = $(".test_main").offset();
		var testBox_width = $(".test_main").outerWidth(true);
		var t_topbox_offset = $(".t_topbox .t_ta ul").offset();
		var t_topbox_width = $(".t_topbox").width();
		var t_topbox_height = $(".t_topbox").outerHeight(true);
		var test_sidelist_offset = $(".test_sidelist").offset();
		var test_sidelist_width = $(".test_sidelist").width();
		var t_ta_height = $(".t_topbox .t_ta span").outerHeight(true) + 2;
		var s_width = $(".content .scope").width();

		if(!testBox) return false;

		$(window).resize(function() {
			testBox_width = $(".test_main").outerWidth(true);
			test_sidelist_width = s_width - testBox_width;

			resetPosition();
			s_width = $(".content .scope").width();
			$(".t_topbox").css("width","100%");

		});

		function resetPosition() {
			testBox = $(".test_main").offset();
			testBox_width = $(".test_main").outerWidth(true);
			//$(".t_topbox").css("width", s_width);
			if(testBox_width){
				$(".test_sidelist").css("left", testBox.left + testBox_width);
			}
			
		}

		setInterval(function() {
			resetPosition();
			var window_top = $(window).scrollTop();

			if (windowWidth >= 600) {
				if (window_top >= t_topbox_offset.top + 20) {
					$(".t_topbox").css({
						"position": "fixed",
						"top": - t_ta_height,
						"width": s_width
					});
					$(".test_sidelist").css({
						"position": "fixed",
						"top": 90 - t_ta_height,
						"left": testBox.left + testBox_width,
						"width": test_sidelist_width
					});
					$(".test_main").css("marginTop", t_topbox_height);
				} else {
					$(".t_topbox").css({
						"position": "static",
						"top": 0
					});
					$(".test_sidelist").css({
						"position": "static",
						"width": "30%"
					});
					$(".test_main").css("marginTop", "0");
				}

			} else {
				$(".test_sidelist").css({
					"position": "static",
					"width": "100%"
				});
			}
		}, 100);
	}

	//试题导航
	if ($(".test_sidelist li").size()) {

		var t_top_height = $(".t_topbox").height();

		//试题右侧导航
		$(".test_sidelist li li").click(function() {
			var li_index = $(this).index();
			var li_par_index = $(this).parents("li").index();
			var el = $(".test_main").find(".tab:eq(" + li_par_index + ")").find(".questionbox:eq(" + li_index + ")").offset();
			$("html, body").animate({
				scrollTop: el.top - t_top_height + t_ta_height
			}, 300);
			return false;
		});

		//试题上侧导航
		$(".t_topbox li").click(function() {
			var t_index = $(this).index();
			var els = $(".test_main").find(".tab:eq(" + t_index + ")").offset();
			$("html, body").animate({
				scrollTop: els.top - t_top_height + t_ta_height
			}, 300);
			$(this).addClass("cur").siblings().removeClass("cur");
		});

		//试题上侧导航滚动切换
		var TTop = $(".t_topbox").find(".t_ta").height();
		setInterval(function() {
			var Top = $(window).scrollTop();
			$(".testBox").find(".tab").each(function() {
				var TabIndex = $(this).index();
				var TabTop = $(this).offset().top - TTop;
				var TabHeight = $(this).height() - TTop;
				var Height = TabTop + TabHeight;

				if (TabTop < Top && Top < Height && TabIndex != 4) {
					$(".t_ta").find("li:eq(" + TabIndex + " )").addClass("cur").siblings().removeClass("cur");

				}
			});
		}, 100);


		$(".testBox").find(".question_ans").hide();

		$(":input").not("input[type=button]").val('').attr("checked",false);
	}
}

//专家讲座视频定位
bw.zhuanJiaJiangZhuo = function(){
		
	if ($(".sidelist li").size()) {
	
		var idx = $(".sidelist li.cur").index();
		var li_height = $(".sidelist li").outerHeight(true);
		var name = $(".sidelist li.cur").find(".en").html();
		var li_num = $(".sidelist li.cur").find(".m_num").html();
		
		$(".sidelist").scrollTop((idx - 3) * li_height);
		
		$(".number_cir").html(li_num);
		$(".name_en").html(name);
		
		
		$(".sidelist li").hover(function(){
			$(this).attr("title",$(this).find(".en").html());
		});
		

		function nameShow() {
			$(".name_en, .name_zh").hide();
			$(".name_en").fadeIn(300, function() {
				$(".name_zh").fadeIn(300);
			});
		}

		function nameHide() {
			$(".name_zh").fadeOut(500, function() {
				$(".name_en").fadeOut(500);
			});
		}

		$(".number_cir").click(function() {
			nameShow();
		});

		nameShow();

		$(".bw_image_center").fadeIn(500);



		$(".sidelist li").click(function() {
			nameShow();
			$(this).addClass("cur").siblings().removeClass("cur");

			$(".number_cir").html($(this).find(".m_num").html());
			$(".name_en").html($(this).find(".en").html());
			$(".name_zh").html($(this).find(".zh").html());
		});


		/*$(".video_down").click(function() {
			var list_length = $(".sidelist li").size();
			var list_li_height = $(".sidelist li").outerHeight(true);
			var list_cur = $(".sidelist li.cur").index();

			nameShow();

			if (list_cur == list_length - 1) {
				list_cur = -1;
			}

			var li_next = $(".sidelist li:eq(" + (list_cur + 1) + ")");

			li_next.addClass("cur").siblings().removeClass("cur");
			$(".sidelist").scrollTop((list_cur - 1) * list_li_height);


			$(".number_cir").html(li_next.find(".m_num").html());
			$(".name_en").html(li_next.find(".en").html());
			$(".name_zh").html(li_next.find(".zh").html());
		});*/


		$("a.detail").click(function(){
			$(".video_select_area").slideToggle();
			/*if(windowWidth <= 768){
				$(".sidelist .inner").slideUp();
				$(".responsive_videolist").animate({
					height: "40px"
				});
			}*/
			return false;
		});

		//$(".sidelist .btn").css("bottom","0");
		$(".sidelist .btn a").click(function(){
			return false;
		});
		//$(".sidelist .inner").css("height",);

		var list_li_height = $(".video_play_list li").outerHeight(true);
		var video_play_list_height = $(".video_play_list").outerHeight(true);
		var sidelist_inner_height = $(".sidelist .inner").outerHeight(true);
		var scrollTop = 0;

		$(".sidelist .inner").animate({
			scrollTop: "0"
		});

		if(windowWidth <= 480){
			$(".video_play_list").css("margin","0");
			$(".lecture_video .videoBox .sidelist, .sidelist .inner").css("height","auto");			
		}

		$(window).resize(function(){
			list_li_height = $(".video_play_list li").outerHeight(true);
			ideo_play_list_height = $(".video_play_list").outerHeight(true);
			sidelist_inner_height = $(".sidelist .inner").outerHeight(true);

			if(windowWidth <= 768 && windowWidth > 480){
				$(".video_select_area").show();
			}else if(windowWidth <= 480){
				$(".video_select_area").hide();
				$(".video_play_list").css("margin","0");
				$(".lecture_video .videoBox .sidelist, .sidelist .inner").css("height","auto");
			}
		});

		if(video_play_list_height <= sidelist_inner_height){
			$(".btn a.up, .btn a.down").addClass("disabled");
			return false;
		}

		$("a.down").click(function(){
			if(scrollTop < (video_play_list_height - sidelist_inner_height)){
				scrollTop += list_li_height;
				$(".sidelist .inner").animate({
					scrollTop: scrollTop
				});				
			}
			return false;
		});
		$("a.up").click(function(){
			if(scrollTop > 0){
				scrollTop -= list_li_height;
				$(".sidelist .inner").animate({
					scrollTop: scrollTop
				});
			}
			return false;				
		});
		//按住不放
				
	}
}


//提交笔记
bw.biJi = function(){
	if ($("#submit")) {
		$(".note_list li:last").addClass("last");
		$("#submit").click(function() {
			var note_content = $("textarea").val();
			var note_time = new Date();
			var note_html = "<li><p><span class='author_name'>匿名</span><span class='note_time'>" + note_time.toLocaleString() + "</span><span class='delete'><a href='###'>删除</a></span></p><p><span class='note_main'>" + note_content + "</span></p></li>";
			if (note_content) {
				$(note_html).appendTo($(".note_list")).find(".delete").bind("del_click");
				$(".note_list li:last").addClass("last").siblings().removeClass("last");
			} else {
				alert("笔记不能为空！");
			}
			$("textarea").val("");
		});
		$("#reset").click(function() {
			$("textarea").val("");
		});
		$(".delete").click(function() {
			var choice = confirm("您确认要删除吗？", function() {}, null);
			if (choice) {
				$(this).parents("li").detach();
			}
		});
	}
}

//学习
bw.xueXi = function(){


	$(".menu li ul").hide();
	$(".menu li").find("span,a").click(function() {
		if($(this).parent("li").find("li").length){
			$(this).parent("li").find("ul").toggle();
		}
	});


	//隐藏、显示学习目录

	var study_box_height = $(".study_box").outerHeight(true);
	var top_list_height = $(".top_list").outerHeight(true);
	var chapter_sidelist_height = $(".chapter_sidelist").outerHeight(true);
	var sidelist_width = $(".chapter_sidelist").outerWidth();

	//alert(chapter_sidelist_height);

	if(windowWidth <= 768){
		$(".hideRightBtn").addClass("hideLeftBtn");
	}
	$(window).resize(function(){
		if(windowWidth <= 768){
			$(".study_box").css({
				"width": "100%"
			});
			$(".study_box .study_main").css({
				"margin": "0"
			});
			$(".chapter_sidelist").css({
				"margin": "0 -280px 0 0",
				"position": "absolute"
			});
			$(".hideRightBtn").addClass("hideLeftBtn");

			study_box_height = $(".study_box").outerHeight(true);
			$('.tab_contain').css("height", study_box_height);

			sidelist_width = $(".chapter_sidelist").outerWidth();
			$(".chapter_sidelist").css({
				"marginRight": -sidelist_width
			});
			$(".hideSideBtn").css({
				"left": "-23px"
			});

			$(".study_box").removeClass("study_box_opacity");
		}else{
			$(".chapter_sidelist").css({
				"position": "static",
				"margin": "0"
			});			
			$(".study_box").css({
				"width": "70%"
			});
			$(".study_box .study_main").css({
				"margin": "0 10px 0 0"
			});
			$(".hideRightBtn").removeClass("hideLeftBtn");

			$(".hideSideBtn").css("left","-23px");

			$('.tab_contain').css({
				"height": "auto",
				"max-height": "auto"
			});
		}
	});

	$(".hideSideBtn").click(function(){
		if (windowWidth > 768){
			if($(".hideRightBtn").hasClass("hideLeftBtn")){
				$(".chapter_sidelist").css("position","static").animate({
					marginRight: "0"
				});
				$(".hideRightBtn").removeClass("hideLeftBtn");
				$(".study_box").animate({
					width: "70%"
				});
				$(".study_box .study_main").css({
					marginRight: "10px"
				});
			}else{				
				$(".chapter_sidelist").css({
					"position": "absolute",
					"right": "0"
				}).animate({
					marginRight: "-30%"
				});
				$(".hideRightBtn").addClass("hideLeftBtn");
				$(".study_box").animate({
					width: "100%"
				},function(){					
					$(".study_box .study_main").css({
						marginRight: "0"
					});
				});
			}
		}else{
			var sidelist_width = $(".chapter_sidelist").outerWidth();

			/*chapter_sidelist_height = $(".chapter_sidelist").outerHeight(true);
			$('.tab_contain').css("height", chapter_sidelist_height-top_list_height - 12);*/
			study_box_height = $(".study_box").outerHeight(true);
			$('.tab_contain').css("max-height", study_box_height-40);

			if($(".hideRightBtn").hasClass("hideLeftBtn")){
				$(".chapter_sidelist").animate({
					marginRight: "0"
				},function(){
					$(".hideSideBtn").animate({
						left: "0"
					});
				});
				$(".hideRightBtn").removeClass("hideLeftBtn");
				
				$(".study_box").addClass("study_box_opacity");
			}else{
				$(".chapter_sidelist").animate({
					marginRight: -sidelist_width
				},function(){
					$(".hideSideBtn").animate({
						left: "-23px"
					});
				});
				$(".hideRightBtn").addClass("hideLeftBtn");
				$(".study_box").removeClass("study_box_opacity");
			}
		}
	});

	//导航目录圆圈背景竖线
	/*$(".tab_contain:eq(0)").css({
		"background": "url(images/list_bg.png) -30px 0 repeat-y"
	});*/

	//课程内容章的印章
	$("<div class='chapter_name'></div>").appendTo($(".study_main"));
	$(".study_main .chapter_name").html($(".menu .cur").attr("title"));

	/*$(".chapter_name, .section_name").css({
		"maxWidth": 
	});*/

	//课程学习夜tab切换
	$("#tab").find("li").click(function() {
		var list_num = $(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");
		$(this).parents(".scope").find(".tab_contain:eq(" + list_num + ")").fadeIn().siblings(".tab_contain").hide();
	});

}

//深入学习页面
bw.shenRuXueXi = function(){

	$.jqtab(".d_leftbox ul", ".d_rightbox", "mouseenter", "cur"); 
	//深入学习二维码
	/*$(".d_rightbox li").hover(function() {
		$(this).parents(".d_rightbox").find("img").hide();
		$(this).find("img").show();
	}, function() {
		$(this).find("img").hide();
	});*/

	$(".d_rightbox").find(".tab:eq(0)").fadeIn().siblings().hide();

	var d_box_height = $(".d_box .inner").outerHeight(true);

	if(windowWidth > 1000){
		$(".d_leftbox, .d_rightbox").css("height", d_box_height);
	}else{
		$(".d_leftbox, .d_rightbox").css("height", "auto");
	}

	$(window).resize(function(){
		if(windowWidth > 1000){
			$(".d_leftbox, .d_rightbox").css("height", d_box_height);
		}else{
			$(".d_leftbox, .d_rightbox").css("height", "auto");
		}
	});
}

//返回顶部
bw.toTop = function(){
	$(document).scroll(function() {
		var h = $(window).height();
		var t = $(document).scrollTop();
		if (t > h) {
			$(".top").fadeIn("slow");
		} else {
			$(".top").fadeOut("slow");
		}
	});
	$(".top").click(function(evt) {
		//$(document).scrollTop(0);
		evt.preventDefault();
		var sc_top = $(document).scrollTop();
		var ini_h = 1;
		timer = setInterval(function() {
			if (sc_top <= ini_h) {
				$(window).scrollTop(0);
				timer && clearInterval(timer);
			} else {
				sc_top = sc_top - ini_h;
				$(window).scrollTop(sc_top);
			}
			ini_h += 100;
		}, 10);
	});
}

bw.contentMinHeight = function(){
	/*var top_height = $(".topNav").outerHeight(true);
	var footer_height = $(".footer").outerHeight(true);

	$(".content").css("minHeight",windowHeight - top_height - footer_height);

	$(window).resize(function(){
		top_height = $(".topNav").outerHeight(true);
		footer_height = $(".footer").outerHeight(true);
		$(".content").css("minHeight",windowHeight - top_height - footer_height);
	});*/
}

bw.referImgMarginTop = function(){
	/*$(".refer").each(function(){
		var _this = $(this);
		var refer_height = _this.find(".refer_img").outerHeight(true);
		var refer_img_height = _this.find("img").outerHeight(true);

		_this.find("img").css("marginTop",(refer_height-refer_img_height)/2);
	});*/
}

bw.secLiWidth = function(){
	var secLiSize = $(".secBarTab li").size();
	if(windowWidth <= 480){
		$(".secBarTab li").css("width",(100/secLiSize)+"%");
	}
	$(window).resize(function(){
		if(windowWidth <= 480){
			$(".secBarTab li").css("width",(100/secLiSize)+"%");
		}else{
			$(".secBarTab li").css("width","auto");
		}
	});
}

bw.teacherImgHeight = function(){
	
}



//处理视屏标签
//<div class="bw_video_player" data-player-id="player1" data-video-name="xxxxx"></div>
tags.videoPlayer = function(dom){
	if(!dom) dom = document.body;
	$(dom).find(".bw_video_player").each(function(){
		var html = videoHtml({
			width: $(this).width(),
			height: $(this).height(),
			id: $(this).attr("data-player-id"),
			url: bw.getVideoUrl($(this).attr("data-video-name"))
		});
		$(this).append(html);
		$(this).parent().css("width",$(this).width());
	});

	function videoHtml(opt) {
		var prevPath = video_root.indexOf("http")==-1? "../../" : "";//for export package load video files
		var flvHtml = '<embed id="'+ opt.id +'" name="'+ opt.id +'" src="common_files/images/CuPlayerMiniV3_Black_S.swf" flashvars="&CuPlayerFile=' + prevPath + opt.url + '&CuPlayerWidth=' + opt.width + '&CuPlayerHeight=' + opt.height + '&CuPlayerAutoPlay=true&CuPlayerAutoRepeat=true&CuPlayerShowControl=false&CuPlayerAutoHideControl=false&CuPlayerAutoHideTime=5&CuPlayerVolume=80&CuPlayerGetNext=false" quality="high" bgcolor="#000000" width="' + opt.width + '" height="' + opt.height + '" name="simplevideostreaming" align="middle" allowScriptAccess="sameDomain" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></embed>';
		var mp4Html = '<video style="background:#000;" id="'+ opt.id +'" name="'+ opt.id +'" src="' + opt.url + '" width="' + opt.width + '" height="' + opt.height + '" autoplay="autoplay" controls="controls"></video>';
		if (bIsTouch) {
			return mp4Html;
		} else{
			return flvHtml;
		}
	}

	$(".video_area").click(function(){
		$(this).addClass("hide_video_tag");
	});
}

tags.multiPic = function(dom){
	if(!dom) dom = document.body;
	$(dom).find(".ke-bw-imgs").each(function(n){
		var data = $(this).attr("data-bw-attr");
		data = parse_json(unescape(data));

		var sub = '<ul class="fancybox_list">';

		var html = '<div class="bw_image_center full_zoom" style="width: '+ $(this).width() +'px;">' ;
		for(var i=0 ;i < data.imgs.length;i++){

			html += '<a class="fancybox'+ n +'" rel="gallery1" href="'+ data.imgs[i].url +'" title="'+ data.subtit +'" style="'+ (i==0?'':'display:none;') +'">';
			html += '<img src="'+ data.imgs[i].url +'" alt="" style="height: '+ $(this).height() +'px;width: '+ $(this).width() +'px;"/>';
			html += '<span>'+ data.subtit +'</span>'
			html += '</a>';

			sub += '<li data-index="'+ i +'">'+ (i+1) +'</li>';
		}

		sub += '</ul>';

		html += sub;

		html +=	'</div>';
		//alert(html);
		$(this).after(html).remove();
		$(".fancybox"+ n).fancybox({
			prevEffect	: 'none',
			nextEffect	: 'none',
			helpers	: {
				title	: {
					type: 'inside'
				},
				thumbs	: {
					width	: 50,
					height	: 50
				}
			}
		}).parent("div").find("li").click(function(){
				var idx = $(this).attr("data-index");
				$(this).parent("ul").parent("div").find("a:eq("+ idx +")").show().siblings("a").hide();
				$(this).addClass("cur").siblings().removeClass("cur");
		});

		$(".fancybox_list").css({
			"width": data.imgs.length*16
		}).find("li:eq(0)").addClass("cur");
	});


}


tags.singlePic = function(dom){
	if(!dom) dom = document.body;
	$(dom).find(".ke-bw-img").each(function(n){
		var data = $(this).attr("data-bw-attr");
		data = parse_json(unescape(data));

		var html = '<div class="bw_image_center full_zoom" style="width: '+ $(this).width() +'px;">' ;

		html += '<a class="fancybox_sgl'+ n +'" rel="gallery1" href="'+ data.bigurl +'" title="'+ data.subtit +'">';
		html += '<img src="'+ data.url +'" alt="" height="'+ $(this).height() +'" width="'+ $(this).width() +'"/>';
		html += '<span>'+ data.subtit +'</span>'
		html += '</a>';
		html +=	'</div>';
		//alert(html);
		$(this).after(html).remove();
		$(".fancybox_sgl" + n).fancybox({
			prevEffect	: 'none',
			nextEffect	: 'none',
			helpers	: {
				title	: {
					type: 'inside'
				}
			}
		});
	});
}


tags.video = function(dom){
	if(!dom) dom = document.body;
	$(dom).find(".ke-bw-video").each(function(n){
		var data = $(this).attr("data-bw-attr");
		data = parse_json(unescape(data));

		var html = '<div data-video-name="'+ data.videoName  +'" data-player-id="bw_video_'+ n +'" style="width: '+ data.width +'px;height: '+ (data.height?data.height:300) +'px;" class="bw_video_player"></div>';
		$(this).after(html).remove();
	});
}


tags.keywords = function(dom){
	
	var des_contain = '<div class="des_contain"></div>';
	$(".study_main").find("h2, h3, .bw_image_center").find("span").removeClass("show_key");
	function showTip(e){
		var des = unescape($(this).attr("data-des"));
		$(des_contain).appendTo($("body")).html(des);

		var tip_width = $(".des_contain").outerWidth(true);
		var tip_height = $(".des_contain").outerHeight(true);
		var winHeight = document.documentElement.clientHeight;
		var winWidth = document.documentElement.clientWidth;

		var top;
		var left;

		if(e.pageX+tip_width >= winWidth){
			top = e.pageY;
			left = winWidth - tip_width;
		}else{
			top = e.pageY;
			left = e.pageX;
		}

		$(".des_contain").css({
			"left": left,
			"top": top
		});
	}
	function hideTip(){
		$(".des_contain").remove();
	}
	if(bIsTouch){
		$(".show_key").click(showTip);
	} else {
		$(".show_key").hover(showTip,hideTip);
	}
}



bw.init = function(){
	var col = $("li[data-columnid="+ columnid +"]");
	if(col.length){
		col.addClass("cur");
	}
	col.parent("ul").show().parent("li").addClass("cur");


};


//课程学习页面视频插件
bw.studyVideoPlay = function(dom){
	dom = dom || document.body;
	$(dom).find(".study").find(".bw_video_player").each(function(){
		var name =$(this).attr("data-video-name");
		$(this).wrap('<div class="video_area"></div>');
		$(this).after('<img src="'+ bw.getVideoImg(name) +'">');
		$(this).after('<i class="playbtn"></i>');
	});

	$(dom).find(".video_area").click(function(){

		$(this).find(".bw_video_player").show();
		$(this).find("img").hide();
		$(this).find(".playbtn").hide();
	});
}

