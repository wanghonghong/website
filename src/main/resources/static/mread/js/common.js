$(function() {

	var video_img_scale = 720 / 480;
	var video_img_width = $(".video_area").width();

	$(".video_area").css("height",video_img_width/video_img_scale);

	$(".videoBox .sidelist").css("height",$(".videoBox .video_area").height());
	$(window).resize(function(){
		video_img_width = $(".video_area").width();
		$(".videoBox .sidelist").css("height",$(".videoBox .video_area").height());
		$(".video_area").css("height",video_img_width/video_img_scale);
	});

	//首页slide图片自适应显示
	var winWidth = document.documentElement.clientWidth;

	if(winWidth <= 480){
		$(".mainScope").find(".mainTab").each(function(){
			var ids = $(this).index();
			$(this).find("img").attr("src","images/a"+ (ids+1) +".png");
		});
	}

	$(window).resize(function(){
		winWidth = document.documentElement.clientWidth;
		if(winWidth <= 480){			
			$(".mainScope").find(".mainTab").each(function(){
				var ids = $(this).index();
				$(this).find("img").attr("src","images/a"+ (ids+1) +".png");
			});
		}else{
			$(".mainScope").find(".mainTab").each(function(){
				var ids = $(this).index();
				$(this).find("img").attr("src","images/pic"+ (ids+1) +".png");
			});
		}
	});

	var video_scale = 720 / 480;

	

	var video_area_width = $(".video_area").width();
	var video_area_height = $(".video_area").height();
	var video_play_width = $(".playbtn").width();
	/*$(".playbtn").css({
		"left": (video_area_width - video_play_width) / 2,
		"top": (video_area_height - video_play_width) / 2
	});*/
	$(".bw_video_player").css({
		"width": video_area_width,
		"height": video_area_width/video_scale
	});

	$(window).resize(function(){
		video_area_width = $(".video_area").width();
		video_area_height = $(".video_area").height();
		video_play_width = $(".playbtn").width();
		/*$(".playbtn").css({
			"left": (video_area_width - video_play_width) / 2,
			"top": (video_area_height - video_play_width) / 2
		});*/
		$(".bw_video_player").css({
			"width": video_area_width,
			"height": video_area_width/video_scale
		}).empty();
		tags.videoPlayer();

	});


	$(".tip").hover(function(){
		$(this).find(".tipblock").toggle();
	}); 

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

	$.jqtab(".d_leftbox ul", ".d_rightbox .inner", "mouseenter", "cur"); //深入学习页面切换



	//页面跳转更新导航样式
	location.href.match(/([^/]*)$/);
	var str = RegExp.$1;

	if(str.indexOf('chapter') >= 0){
		$(".nav li:eq(3)").addClass("cur");
	}
	if(str.indexOf('index') >= 0){
		$(".nav li:eq(0)").addClass("cur");
	}

	var li_cur = $(".secBarTab").find(".secBarCur").index();
	var li_out_width = $(".secBarTab li").outerWidth(true);
	var li_width = $(".secBarTab li").width();
	$(".secBarTab").after('<div class="secBarBotLine"><div class="sp"><span></span></div></div>');
	$(".secBarBotLine .sp").css("width", li_out_width);
	$(".secBarBotLine span").css("width", li_width);
	$(".secBarBotLine .sp").css("left", li_out_width * li_cur);
	$(".secBarTab li").hover(function() {
		var li_dex = $(this).index();
		$(".secBarBotLine .sp").stop().animate({
			left: li_out_width * li_dex
		}, 100);
	}, function() {
		$(".secBarTab").hover(function() {

		}, function() {
			$(".secBarBotLine .sp").stop().animate({
				left: li_out_width * li_cur
			});
		})

	});

	$(".nav li").each(function(){
		var _this = $(this);
		var href = $(this).find("a").attr("href");
		$(".secBarTab li").each(function(){
			var sec_href = $(this).find("a").attr("href");
			if(sec_href == href) {
				_this.addClass("cur");
			}
		});
	});

	$(".secBarTab li").each(function(){
		var href = $(this).find("a").attr("href");
		href.match(/([^/]*)$/);
		var href_str = RegExp.$1;
		if(href_str == str){
			$(this).addClass("cur");
		}
		if(str.indexOf("jiao_shi_dao_yan") >= 0){
			$(".secBarTab li:eq(0)").addClass("cur");
		}
		if(str.indexOf("zhuan_jia_jiang_zuo") >= 0){
			$(".secBarTab li:eq(0)").addClass("cur");
		}
		if(str.indexOf("an_li_ku") >= 0){
			$(".secBarTab li:eq(4)").addClass("cur");
		}
	});

	$(".more_tool").click(function() {
		$(".topBarTab").slideToggle();
	});

	//学习内容列表导航
		/*
	var chapterListNum;
	$(".menu li").each(function() {
		var chapter_href = $(this).find("a").attr("href");
		if (chapter_href && str == chapter_href) {
			chapterListNum = $(this).parents("li").index();
			$(this).addClass("cur").siblings().removeClass("cur");
			$(this).parents("li").addClass("cur").siblings().removeClass("cur");
		}
	});


	//一级导航

	var classStr = $("body").attr("class");
	if (classStr) {
		classStr.match(/nav(\d{1,2})/);
		var class_i = RegExp.$1;
		$("#nav" + class_i).addClass("cur").siblings().removeClass("cur");
	}*/

	//去除首尾的竖线
	$(".topBarTab").find("li:first").css("borderLeft", "none");
	$(".topBarTab").find("li:last").css("borderRight", "none");

	//$("#nav0").css("borderLeft", "none");
	//$("#nav5").css("borderRight", "none");

	//教学大纲课程目录
	$(".chapterbox").find("ul").hide();
	$(".chapterbox:eq(0)").addClass("comBgColor");
	$(".chapterbox:eq(0)").find("ul").show();
	$(".chapterbox:eq(0)").find("span").addClass("cur");
	$(".chapterbox").find("span").click(function() {
		var ul = $(this).parent().find("ul");
		var chapterbox = $(this).parent();
		if (ul.is(":visible")) {
			$(this).removeClass("cur");
			chapterbox.removeClass("comBgColor");
			ul.slideUp(200);
		} else {
			$(this).addClass("cur");
			chapterbox.addClass("comBgColor");
			ul.slideDown(200);
			chapterbox.siblings(".chapterbox").find("ul").slideUp(200);
			chapterbox.siblings(".chapterbox").removeClass("comBgColor").find("span").removeClass("cur");
		}
	});

	if ($(".f_leftbox").find(".tab").size()) {
		$(".fea_picbox").find("img:eq(0)").show().siblings("img").hide();
		$(".f_leftbox").find(".tab:eq(0)").show().siblings(".tab").hide();
		$(".fea_piclist li").click(function() {
			var click_li = $(this).index();
			$(this).addClass("cur").siblings().removeClass("cur");
			$(".fea_picbox").find("img:eq(" + click_li + ")").fadeIn().siblings("img").hide();
			$(".f_leftbox").find(".tab:eq(" + click_li + ")").show().siblings(".tab").hide();
		});

	}

	//content切换
	var ids = 0;
	var liLen = $(".mainTabBtn li").size();
	if (liLen) {
		$(".mainTabBtn li").click(function() {
			ids = $(this).index();
			$(this).addClass("mainTabCur").siblings().removeClass("mainTabCur");
			$(this).parents(".main").find(".mainTab:eq(" + ids + ")").fadeIn(600).siblings(".mainTab").hide();
		});

		$(".mainBtnLeft").click(function() {
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

		$(".mainBtnRight").click(function() {
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

		$(".mainLeft").click(function() {
			$(".mainBtnLeft").click();
		});
		$(".mainRight").click(function() {
			$(".mainBtnRight").click();
		});

		picTimer = setInterval("$('.mainBtnRight').click()", 4000);

		$(".mainScope").hover(function() {
			clearInterval(picTimer);
		}, function() {
			picTimer = setInterval("$('.mainBtnRight').click()", 4000);
		});
	}


	//调查问卷显示与隐藏
	var winHeight = document.documentElement.clientHeight;


	var pic_height = $(".pic_box").height();
	if (pic_height) {
		$(".pic_box").find("span").css({
			top: pic_height - 44
		});
		$(".pic_box").hover(function() {
			$(this).find("span").stop().animate({
				top: "0"
			});
		}, function() {
			var pic_height = $(this).height();
			$(this).find("span").stop().animate({
				top: pic_height - 44
			});
		});
	}

	var init_letter = 0;

	$(".intro_box").hide().find("p:eq(0)").css("font-weight", "bold");
	$(".pic_cli .pic_box").click(function() {
		var a = $(this).index(".pic_box");
		var arr = "<p class='arrow_bg'></p>"
		$(this).parent().find(".intro_box:eq(" + a + ")").show().siblings(".intro_box").hide();
		$(".arrow_bg").remove();
		$(arr).appendTo($(this));
	});

	//课程词典
	var init_first = 1;
	
	$(".wordTab").each(function() {
		var a = $(this).index(".wordTab");
		var tag = $(this).find(".wordList").size();
		if(init_first && tag){
			init_letter = a;
			init_first = 0;
		}
		if (!tag) {
			$(".letterList").find("li:eq(" + a + ")").attr("disabled", "disabled").addClass("gray");
		}
	});	
	$(".wordTab:eq("+ init_letter +")").show().siblings(".wordTab").hide();
	$(".letterList li:eq("+ init_letter +")").addClass("letterCur").siblings().removeClass("letterCur");
	$(".letterList li").click(function() {
		var ltLi_num = $(this).index(".letterList li");
		var col;
		var winWid = $(window).width();
		$(this).addClass("letterCur").siblings().removeClass("letterCur");
		$(".scope").find(".wordTab:eq(" + ltLi_num + ")").show().siblings(".wordTab").hide();

	});

	//教学日历

	$(".weekList li").click(function() {
		var li_dex = $(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");
		$(".s_topbox .title h1").empty().append($(this).html()).hide().fadeIn();
		$(".weekCon").find(".weekTab:eq(" + li_dex + ")").slideDown().siblings().hide();
	});

	$(".weekCon").find(".weekTab").each(function() {
		var td = $(this).find("table thead");
		td.find("td:eq(0)").attr("width", "15%");
		td.find("td:eq(1)").attr("width", "5%");
		td.find("td:eq(2)").attr("width", "50%");
		td.find("td:eq(3)").attr("width", "30%");
	});

	/*$(".ca_box li.c_fi").hover(function() {
		var li_offset = $(this).offset();
		var li_num = $(this).find(".week_num").html();
		$(".circle").animate({
			top: li_offset.top - 109
		}, 100).html(li_num);

	});*/

	//教师介绍

	if ($(".t_name li").size()) {


		var t_width = $(".t_name li").width();
		var t_size = $(".t_name li").size();
		var teacher_tag = 0;

		var t_name_width = $(".t_name").outerWidth(true);
		/*$(".t_leftbox .t_leftmiddlebox .t_name ul li").css("width",t_name_width);
		$(".t_leftbox .t_leftmiddlebox .t_name ul").css("width",t_name_width*t_size);*/

		$(window).resize(function(){
			t_name_width = $(".t_name").outerWidth(true);
			/*$(".t_leftbox .t_leftmiddlebox .t_name ul li").css("width",t_name_width);
			$(".t_leftbox .t_leftmiddlebox .t_name ul").css("width",t_name_width*t_size);
			$(".t_name li:eq("+ teacher_tag +")").stop().animate({
				left: 0
			});*/
		});

		
		function initShowTeacher(){
			$(".t_name li:eq(0)").show().siblings().hide();
			$(".t_lefttopbox, .t_leftbottombox, .t_rightbox").find(".tab:eq(0)").show().siblings(".tab").hide();
		}

		function showNextTeacher(){
			teacher_tag++;
			if(teacher_tag == t_size) teacher_tag = 0;
			$(".t_lefttopbox, .t_leftbottombox, .t_rightbox").find(".tab:eq("+ teacher_tag +")").show().siblings(".tab").hide();
			$(".t_name li:eq("+ teacher_tag +")").show().css({
				"left": t_name_width,
				"zIndex": 2
			}).animate({
				left: 0
			});

			$(".t_name li:eq("+ (teacher_tag-1) +")").animate({
				left: -t_name_width
			}).css({
				"left": 0,
				"zIndex": 1
			});
		}

		function showPrevTeacher(){			

			$(".t_name li:eq("+ teacher_tag +")").animate({
				left: t_name_width
			}).css({
				"left": 0,
				"zIndex": 1
			});

			teacher_tag--;
			if(teacher_tag == -1) teacher_tag = t_size - 1;
			$(".t_lefttopbox, .t_leftbottombox, .t_rightbox").find(".tab:eq("+ teacher_tag +")").show().siblings(".tab").hide();
			$(".t_name li:eq("+ teacher_tag +")").show().css({
				"left": -t_name_width,
				"zIndex": 2
			}).animate({
				left: 0
			});
		}

		initShowTeacher();

		$(".t_leftmiddlebox .next").click(function(){
			showNextTeacher();
		});
		$(".t_leftmiddlebox .prev").click(function(){
			showPrevTeacher();
		});

		

		/*$(".t_leftmiddlebox .next").click(function() {
			teacher_tag++;
			if(teacher_tag == t_size) teacher_tag = 0;
			$(".t_lefttopbox, .t_leftbottombox, .t_rightbox").find(".tab:eq("+ teacher_tag +")").show().siblings(".tab").hide();
			$(".t_name ul").stop().animate({
				left: -t_name_width*teacher_tag
			});
		});

		$(".t_leftmiddlebox .prev").click(function() {
			teacher_tag--;
			if(teacher_tag == -1) teacher_tag = t_size - 1;
			$(".t_lefttopbox, .t_leftbottombox, .t_rightbox").find(".tab:eq("+ teacher_tag +")").show().siblings(".tab").hide();
			$(".t_name ul").stop().animate({
				left: -t_name_width*teacher_tag
			});
		});*/

	}

	$(".content_li").find("span").click(function() {
		$(this).next("ol").toggle();
	});


	$(".teach_li_tab li").click(function() {
		var num = $(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");
		$(this).parents(".tab").find(".teach_li_tab_content:eq(" + num + ")").show().siblings(".teach_li_tab_content").hide();
	});

	$(".teach_li_tab_content h2").click(function(){
		$(this).nextUntil("h2").toggle();
	}).filter(":not(:first)").click();


	$(window).resize(function() {
		var winWidth = $(window).width();
		if (winWidth > 480) {
			$(".nav_container").show();
		} else {
			$(".nav_container").hide();
		}
	});

	$(".tool").hover(function() {
		$(this).stop().animate({
			right: 0
		});
	}, function() {
		$(this).stop().animate({
			right: "-86px"
		});
	});

	var chapli_width = $(".chapter_list").find("li").outerWidth(true);
	var list = $(".chapter_list").find("ul");
	var tag = 1;
	if (chapli_width) {
		$(".chapter").find(".right").click(function() {
			var left = parseInt(list.css("left"));
			if (tag) {
				tag = 0;
				list.animate({
					left: "-=" + chapli_width + "px"
				}, function() {
					list.css({
						"left": left + "px"
					});
					list.append(list.find("li:first").detach());
					left += chapli_width;
					tag = 1;
				});
			}
		});
		$(".chapter").find(".left").click(function() {
			if (tag) {
				tag = 0;
				list.prepend(list.find("li:last").detach());
				var left = parseInt(list.css("left"));
				left -= chapli_width;
				list.css({
					"left": left + "px"
				});
				list.animate({
					left: "+=" + chapli_width + "px"
				}, function() {
					tag = 1;
				});
			}
		});
	}


	$(".bw_example").find("p:first").wrap("<b></b>");

	//tab切换
	$("#tab").find("li").click(function() {
		var list_num = $(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");
		$(this).parents(".scope").find(".tab_contain:eq(" + list_num + ")").fadeIn().siblings(".tab_contain").hide();
	});


	var windowHeight = document.documentElement.clientHeight;
	var windowWidth = document.documentElement.clientWidth;


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
			resetPosition();
			s_width = $(".content .scope").width();

		});

		function e_resetPosition() {

			question_left_offset = $(".question_left").offset();
			question_left_width = $(".question_left").outerWidth(true);
			$(".t_topbox").css("width", s_width);
			$(".question_right").css("left", question_left_offset.left + question_left_width);

		}

		setInterval(function() {
			e_resetPosition();
			var window_top = $(window).scrollTop();
			$(window).resize(function() {
				windowWidth = document.documentElement.clientWidth;
			});
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

			/*$(".question_left").find(".questionbox").each(function(){
				var quesBox_top = $(this).offset().top;
				var quesBox_num = $(this).index(".questionbox");
				if(quesBox_top <= (window_top+100)){
					$(".qusetion_num ul").find("li").removeClass("cur");
					$(".qusetion_num li:eq("+quesBox_num+")").addClass("cur").siblings(".test_sidelist li li").removeClass("cur");
				}
			});*/
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

		function reset() {
			$("textarea").val("");
			$(".question_right li").removeClass("black").removeClass("cur");
			$(".question_left").find("input:radio").attr("checked", false);
		}
		reset();
		$(".reset").click(function() {
			reset();
		});
		/*$(".submit").click(function() {
			var val = $("textarea").val();
			if (val) {
				reset();
				alert("您的意见已提交，谢谢参与！");
			} else {
				alert("意见不能为空！");
			}
		});*/

		//尺寸小于480px，试题选项变化

		$(window).resize(function() {
			windowWidth = document.documentElement.clientWidth;
		});

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

		}

	}

	$(".li_fi").each(function() {
		$(this).find("a:eq(0)").hide();
	});


	//试卷侧栏导航定位
	if ($(".test_sidelist li").size()) {
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
		$(window).resize(function() {
			testBox_width = $(".test_main").outerWidth(true);
			test_sidelist_width = s_width - testBox_width;

			resetPosition();
			s_width = $(".content .scope").width();


		});

		function resetPosition() {
			testBox = $(".test_main").offset();
			testBox_width = $(".test_main").outerWidth(true);
			$(".t_topbox").css("width", s_width);
			$(".test_sidelist").css("left", testBox.left + testBox_width);
		}

		setInterval(function() {
			resetPosition();
			var window_top = $(window).scrollTop();
			$(window).resize(function() {
				windowWidth = document.documentElement.clientWidth;
			});
			if (windowWidth >= 600) {
				if (window_top >= t_topbox_offset.top) {
					$(".t_topbox").css({
						"position": "fixed",
						"top": - t_ta_height,
						"width": s_width
					});
					$(".test_sidelist").css({
						"position": "fixed",
						"top": 100 - t_ta_height,
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


		//清除选择值和已填值


		/*TODO
		//判定选择和判断已做题
		$(".test_main").find("input").click(function() {
			var in_par = $(this).parents(".tab");
			var in_par_que = $(this).parents(".questionbox");
			var in_par_index = in_par.index();
			var in_index = in_par_que.index();

			$(".test_sidelist").find(".li_fi:eq(" + in_par_index + ")").find("li:eq(" + (in_index - 1) + ")").addClass("black");

		});
		*/


		//隐藏答案
		//$(".t_topbox").find("li:last").hide();
		//$(".testBox").find(".tab:last").hide();
		$(".testBox").find(".question_ans").hide();


		
	}

	//专家讲座视频定位
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


		$(".video_down").click(function() {
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
		});


	}


	$(".r_rightbox").find("ul li").addClass("button white");

	//提交笔记
	if ($("#submit")) {
		$(".note_list li:last").addClass("last");
		$("#submit").click(function() {
			var note_content = $(this).parents(".tab_contain").find("textarea").val();
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
			return false;
		});
	}


	//导航目录hover显示title
	if (!$(".study_box").hasClass("lecture_video")) {

		$(".cir").each(function() {
			var par = $(this).parent();
			var section_num = par.find("span:eq(0)").html();
			var section_cir = par.find("span:eq(1)").html();
			var section_name = par.find("span:eq(2)").html();
			par.attr("title", section_num + section_cir + section_name);
		});

		$(".menu").find("li ul li").each(function() {
			var span_html = $(this).find("span").html();
			$(this).find("a").attr("title", span_html);
		});
	}

	$(".menu li ul").hide();
	//$(".menu li ul:eq(" + chapterListNum + ")").show();
	$(".menu li").find("span,a").click(function() {
		if($(this).parent("li").find("li").length){
			//alert($(this).find("li").length);
			$(this).parent("li").find("ul").toggle();
		}
	});

	//隐藏、显示学习目录

	var windowWidth = document.documentElement.clientWidth;
	$(".hideSideBtn").click(function() {
		if ($(".chapter_sidelist").width()) {
			$(".chapter_sidelist").animate({
				width: "0",
				height: "0"
			});
			if ($(".study_box").hasClass("lecture_video")) {
				$(".study_box").animate({
					width: "100%"
				});
			} else {
				$(".study_box").animate({
					width: "100%"
				});
			}
			$(".hideRightBtn").addClass("hideLeftBtn");
			$(this).attr("title", "打开课程目录");
			if (windowWidth <= 768) {
				$(".hideSideBtn").animate({
					left: "-23px"
				});/*
				$(".chapter_sidelist").animate({
					top: "230px"
				});*/
			}
		} else {

			if (windowWidth <= 768) {
				$(".chapter_sidelist").animate({
					width: "60%",
					height: "100%",
					top: "0"
				});
				$(".study_box").animate({
					width: "40%",
					height: "100%"
				});
				$(".hideSideBtn").animate({
					left: "0"
				});
			} else {

				$(".chapter_sidelist").animate({
					width: "30%",
					height: "100%"
				});
				if ($(".study_box").hasClass("lecture_video")) {
					$(".study_box").animate({
						width: "69.2%"
					});
				} else {
					$(".study_box").animate({
						width: "69.2%"
					});
				}
				$(".hideRightBtn").removeClass("hideLeftBtn");
				$(this).attr("title", "隐藏课程目录");

			}
		}
	});

	//导航目录圆圈背景竖线
	$(".tab_contain:eq(0)").css({
		"background": "url(images/list_bg.png) -30px 0 repeat-y"
	});


	//深入学习页面模块切换
	var deep_par = $(".prev").parents("div");
	if (deep_par.hasClass("deepin")) {
		var img_li = $(".imgbox").find("li");
		var img_width = img_li.outerWidth(true);
		var tag = 1;
		var i = 0;
		var picbox_width = $(".deepin_picBox").outerWidth(true);
		var act_width = picbox_width;
		$(".deepin_picBox").css("height", picbox_width);
		$(".deepin_picBox").find("img").css({
			"width": act_width,
			"height": picbox_width
		});
		$(".prev, .next").css({
			"marginTop": picbox_width / 2 - 20
		});

		img_width = picbox_width;

		$(window).resize(function() {
			var picbox_width = $(".deepin_picBox").width();
			img_width = img_li.outerWidth(true);

			$(".deepin_picBox").css("height", picbox_width);
			$(".deepin_picBox").find("img").css({
				"width": act_width,
				"height": picbox_width
			});
			$(".prev, .next").css({
				"marginTop": picbox_width / 2 - 20
			});

			img_width = picbox_width;
		});

		$(".deepin").each(function() {
			$(this).find(".deepin_add .tab:first").show().siblings(".tab").hide();
		});


		$(".next").click(function() {
			var par = $(this).parent();
			var img_size = par.find("li").size();
			var imgbox = $(this).parent().find(".imgbox");
			if (tag && i < (img_size - 1)) {
				tag = 0;
				i++;
				imgbox.animate({
					left: -img_width * i
				}, function() {
					tag = 1;
				});
				par.parents(".deepin").find(".tab:eq(" + i + ")").fadeIn().siblings().hide();
			}
		});
		$(".prev").click(function() {
			var par = $(this).parent();
			var img_size = par.find("li").size();
			var imgbox = $(this).parent().find(".imgbox");
			if (tag && i) {
				tag = 0;
				i--;
				imgbox.animate({
					left: -img_width * i
				}, function() {
					tag = 1;
				});
				par.parents(".deepin").find(".tab:eq(" + i + ")").fadeIn().siblings().hide();
			}
		});
	}


	$(".d_leftbox").find("li:last").css("border", "none");

	$(".d_rightbox li").hover(function() {
		$(this).parents(".d_rightbox").find("img").hide();
		$(this).find("img").show();
	}, function() {
		$(this).find("img").hide();
	});

	$(".d_rightbox").find(".tab:eq(0)").fadeIn().siblings().hide();

	//课程内容章的印章
	$("<div class='chapter_name'></div>").appendTo($(".study_main"));
	$(".study_main .chapter_name").html($(".menu .cur").attr("title"));


	


});



//多终端视频播放
var sUserAgent = navigator.userAgent.toLowerCase();
var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
var bIsAndroid = sUserAgent.match(/android/i) == "android";
var bIsSafari = sUserAgent.match(/safari/i) == "safari";
var bIsTouch = bIsIpad || bIsIphoneOs || bIsAndroid;



function video(opt) {
	var videobox_width = $(".video").outerWidth(true);
	var videobox_height = videobox_width * 1200 / 1920;
	var flvHtml = '<embed src="common_files/images/CuPlayerMiniV3_Black_S.swf" flashvars="&CuPlayerFile=' + opt.flv + '&CuPlayerWidth=' + opt.width + '&CuPlayerHeight=' + opt.height + '&CuPlayerAutoPlay=false&CuPlayerAutoRepeat=true&CuPlayerShowControl=false&CuPlayerAutoHideControl=false&CuPlayerAutoHideTime=5&CuPlayerVolume=80&CuPlayerGetNext=false" quality="high" bgcolor="#000000" width="' + opt.width + '" height="' + opt.height + ' "name="simplevideostreaming" align="middle" allowScriptAccess="sameDomain" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></embed>';
	var mp4Html = '<video src="' + opt.mp4 + '" width="' + opt.width + '" height="' + opt.height + '" autoplay="autoplay" controls="controls"></video>';
	var mp4ChgHtml = '<video src="' + opt.mp4 + '" width="' + videobox_width + '" height="' + videobox_height + '" autoplay="autoplay" controls="controls"></video>';
	var flvChgHtml = '<embed src="common_files/images/CuPlayerMiniV3_Black_S.swf" flashvars="&CuPlayerFile=' + opt.flv + '&CuPlayerWidth=' + videobox_width + '&CuPlayerHeight=' + videobox_height + '&CuPlayerAutoPlay=false&CuPlayerAutoRepeat=true&CuPlayerShowControl=false&CuPlayerAutoHideControl=false&CuPlayerAutoHideTime=5&CuPlayerVolume=80&CuPlayerGetNext=false" quality="high" bgcolor="#000000" width="' + videobox_width + '" height="' + videobox_height + ' "name="simplevideostreaming" align="middle" allowScriptAccess="sameDomain" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></embed>';

	if (opt.width && opt.height) {
		if (bIsIpad || bIsIphoneOs) {
			document.write(mp4Html);
		} else if (bIsAndroid) {
			document.write(flvHtml);
		} else if (bIsSafari) {
			document.write(mp4Html);

		} else {
			document.write(flvHtml);
		}
	} else {
		if (bIsIpad || bIsIphoneOs) {
			document.write(mp4ChgHtml);
		} else if (bIsAndroid) {
			document.write(flvChgHtml);
		} else if (bIsSafari) {
			document.write(mp4ChgHtml);
			
		} else {
			document.write(flvChgHtml);
		}
	}

	$(".lecture_video .videoBox").css("height", videobox_height);
	$(".lecture_video").css({
		"height": videobox_height + 76,
		"min-height": videobox_height + 76
	});
}

function v_dx(opt) {
	var v_scale = 1920 / 1200;

	setInterval(function() {

		opt.width = $(".content .scope").width() - 16;
		opt.height = opt.width / v_scale;

	}, 100);

	var flvHtml = '<embed src="common_files/images/CuPlayerMiniV3_Black_S.swf" flashvars="&CuPlayerFile=' + opt.flv + '&CuPlayerWidth=' + opt.width + '&CuPlayerHeight=' + opt.height + '&CuPlayerAutoPlay=false&CuPlayerAutoRepeat=true&CuPlayerShowControl=false&CuPlayerAutoHideControl=false&CuPlayerAutoHideTime=5&CuPlayerVolume=80&CuPlayerGetNext=false" quality="high" bgcolor="#000000" width="' + opt.width + '" height="' + opt.height + ' "name="simplevideostreaming" align="middle" allowScriptAccess="sameDomain" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></embed>';
	var mp4Html = '<video src="' + opt.mp4 + '" width="' + opt.width + '" height="' + opt.height + '" autoplay="autoplay" controls="controls"></video>';


	if (opt.width && opt.height) {
		if (bIsIpad || bIsIphoneOs) {
			document.write(mp4Html);
		} else if (bIsAndroid) {
			document.write(flvHtml);
		} else {
			document.write(flvHtml);
		}
	}

}


function site() {
	var h = $(window).height();
	var t = $(document).scrollTop();
	if (t > h) {
		$(".top").fadeIn("slow");
	} else {
		$(".top").fadeOut("slow");
	}
}



$(document).ready(function(e) {
	$(document).scroll(function() {
		site();
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
});



var tags = {};

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
	});

	function videoHtml(opt) {
		var flvHtml = '<embed id="'+ opt.id +'" name="'+ opt.id +'" src="common_files/images/CuPlayerMiniV3_Black_S.swf" flashvars="&CuPlayerFile=' + opt.url + '&CuPlayerWidth=' + opt.width + '&CuPlayerHeight=' + opt.height + '&CuPlayerAutoPlay=true&CuPlayerAutoRepeat=false&CuPlayerShowControl=false&CuPlayerAutoHideControl=false&CuPlayerAutoHideTime=5&CuPlayerVolume=80&CuPlayerGetNext=false" quality="high" bgcolor="#000000" width="' + opt.width + '" height="' + opt.height + ' "name="simplevideostreaming" align="middle" allowScriptAccess="sameDomain" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></embed>';
		var mp4Html = '<video id="'+ opt.id +'" name="'+ opt.id +'" src="' + opt.url + '" width="' + opt.width + '" height="' + opt.height + '" autoplay="autoplay" controls="controls"></video>';
		if (bIsIpad || bIsIphoneOs || bIsSafari) {
			return mp4Html;
		} else{
			return flvHtml;
		}
	}
}

tags.multiPic = function(dom){
	if(!dom) dom = document.body;
	$(dom).find(".ke-bw-imgs").each(function(n){
		var data = $(this).attr("data-bw-attr");
		data = parse_json(unescape(data));

		var sub = '<ul class="fancybox_list">';

		var html = '<div class="bw_image_center full_zoom" >' ;
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
	});


}


tags.singlePic = function(dom){
	if(!dom) dom = document.body;
	$(dom).find(".ke-bw-img").each(function(n){
		var data = $(this).attr("data-bw-attr");
		data = parse_json(unescape(data));

		var html = '<div class="bw_image_center full_zoom" >' ;

		html += '<a class="fancybox_sgl'+ n +'" rel="gallery1" href="'+ data.bigurl +'" title="'+ data.subtit +'">';
		html += '<img src="'+ data.url +'" alt="" style="height: '+ $(this).height() +'px;width: '+ $(this).width() +'px;"/>';
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

if(!window.bw){
	window.bw  = {};
}

bw.init = function(){
	var col = $("li[data-columnid="+ columnid +"]");
	if(col.length){
		col.addClass("cur");
	}
	col.parent("ul").show().parent("li").addClass("cur");


};

$(function(){
	bw.init();
	tags.keywords();
	tags.multiPic();
	tags.singlePic();
	tags.video();
	tags.videoPlayer();
})




