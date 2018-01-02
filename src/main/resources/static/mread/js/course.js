$(function(){

	var windowHeight = document.documentElement.clientHeight;
	var windowWidth = document.documentElement.clientWidth;

	$(".all_discuss li").click(function(){
		var ids = $(this).index();

		$("html").css("overflow","hidden");
		$(".discuss_bg").fadeIn(500);
		$(".discuss_content .tab:eq("+ ids +")").show().siblings().hide();
		$(".discuss_content").fadeIn(500);
	});

	$(".discuss_smbg").click(function(){
		$("html").css("overflow","hidden");
		$(".discuss_bg").fadeIn(500);
		//$(".discuss_container").fadeIn(500);
		$(".record").fadeIn(500);

	});
	var script = '<div class="script"></div>';
	var script_html = '<script src="js/jquery.js"></script><script src="js/jquery.roundabout2.js"></script>';
	$(script).appendTo($("body"));
	$(".discuss_bg").click(function(){		
		window.location.reload();/*
		$("html").css("overflow-y","scroll");
		$(".discuss_bg").fadeOut(500);
		$(".discuss_container").fadeOut(500);
		$(".script").empty();
		$(".record").fadeOut(500);*/
	});

	$("input.discuss").click(function(){
		$("html").css("overflow","hidden");
		$(".discuss_bg").fadeIn(500);
		$(".discuss_container").fadeIn(500);

		$(script_html).appendTo($(".script"));
		roundabout();
	});

	function roundabout(){

		$('#myroundabout').roundabout({
			autoplay: true,//自动播放
			autoplayDuration: 3000,//时间
			autoplayPauseOnHover: true,//自动鼠标移上停滞
			//shape: 'figure8',  //支持属性theJuggler、figure8、waterWheel、square、conveyorBeltLeft、conveyorBeltRight、goodbyeCruelWorld、diagonalRingLeft、diagonalRingRight、rollerCoaster、tearDrop、tickingClock、flurry、nowSlide、risingEssence随便换 
			minOpacity: 1
		});

	}


	//roundabout();

	function btnReset(){
		$(".pic_upload, .smile_container").hide();
	}
	btnReset();
	$(".discuss_middle .btn .pic").click(function(){
		$(".smile_container").hide();
		$(".pic_upload").toggle();
	});
	$(".discuss_middle .btn .smile").click(function(){
		$(".pic_upload").hide();
		$(".smile_container").toggle();
	});


	var discom = $("#myroundabout");
	var discuss_size = discom.find("li").size();
	$(".btn").find("input.send").click(function(){
		var val = $(this).parent().find("input[type=text]").val();
		var time = new Date();
		time = time.toLocaleString();
		$('<li><p><span class="comment_author">匿名('+ (discuss_size+1) +'楼)</span>:<span class="comment_time">'+ time +'</span></p><p><span class="comment_content">'+ val +'</span></p></li>').appendTo($("#myroundabout"));
		$(this).parent().find("input[type=text]").val('');

		discom.find("li:last").addClass("roundabout-in-focus").siblings().removeClass("roundabout-in-focus");
		discuss_size++;
		roundabout();
	});





	var playbtn = '<i class="playbtn"></i>';
	$(playbtn).appendTo($(".exp"));

	$(".exp").click(function(){
		$('<div class="zoom_all"><iframe src="js/8-3/main.html"></iframe></div>').appendTo($("body"));
		$('<div class="zoom_bg"></div>').appendTo($("body")).click(function(){
			$(".zoom_all").remove();
			$(".zoom_bg").remove();
			$("html").css("overflow-y","scroll");
		});
		$("html").css("overflow-y","hidden");
	});

	/*首页图片切换*/
	$(".main .img_box img:eq(0)").show().siblings().hide();
	$(".main .img_text span:eq(0)").show().siblings("span").hide();

	$(".img_dot_list li").click(function(){
		var ids = $(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");
		$(".img_box").find("img:eq("+ ids +")").fadeIn(500).siblings().hide();
		$(".img_text").find("span:eq("+ ids +")").fadeIn(500).siblings("span").hide();
	});

	var img_i = 0;
	var img_size = $(".main .img_box img").size();

	var time = setInterval(function(){
		img_i++;
		if(img_i == img_size) img_i = 0;
		$(".img_dot_list li:eq("+ img_i +")").click();
	},3000);

	$(".img_box").hover(function(){
		clearInterval(time);
	},function(){
		time = setInterval(function(){
			img_i++;
			if(img_i == img_size) img_i = 0;
			$(".img_dot_list li:eq("+ img_i +")").click();
		},3000);
	});

	/*ppt图片放映*/
	$(".ppt").each(function(){
		var img_size = $(this).find("img").size();
		var i = 0;
		$(this).find("img:eq(0)").show().siblings("img").hide();
		$(this).click(function(){
			$(this).find("i").hide();
			i++;
			if(i == img_size) i=0;
			$(this).find("img:eq("+ i +")").show().siblings("img").hide();
		});
	});

	$(".questionCon img").attr("align","absmiddle");

	/*导学切换*/
	$(".video_text .video_text_container:eq(0)").show().siblings().hide();
	$(".video_left .video_area:eq(0)").show().siblings().hide();

	$(".video_right li").click(function(){
		var video_ids = $(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");
		$(".video_left .video_area:eq("+ video_ids +")").find("img, i").show();
		$(".video_text_container:eq("+ video_ids +")").fadeIn(300).siblings().hide();
		$(".video_left .video_area:eq("+ video_ids +")").fadeIn(300).siblings().hide();
		$(".video_left .bw_video_player").hide();
	});

	$(".more").click(function(){
		$(".nav_container").slideToggle();
	});

	$(window).resize(function(){
		windowWidth = document.documentElement.clientWidth;
		if(windowWidth > 480){
			$(".nav_container").show();
		}else{
			$(".nav_container").hide();
		}
	});

	$(".answer_btn").click(function(){
		$(this).find(".full_zoom").show();
	});

	$(".bw_video_player").parent().css({
		"textIndent":"0"
	});

	$(".study").find(".bw_video_player").each(function(){
		var name =$(this).attr("data-video-name");
		$(this).wrap('<div class="video_area"></div>');
		$(this).after('<img src="'+ bw.getVideoImg(name) +'">');
		$(this).after('<i class="playbtn"></i>');
	});

	$(".video_area").click(function(){

		$(this).find(".bw_video_player").show();
		$(this).find("img").hide();
		$(this).find(".playbtn").hide();
	});

	var winWidth = document.documentElement.clientWidth;

	$(window).resize(function(){
		if(winWidth < 950){
			$(".study").find(".video_area").each(function(){
				$(this).find(".bw_video_player").hide();
				$(this).find("img").show();
				$(this).find(".playbtn").show();
			});
		}
	});


	$(".stage").append('<div class="shutup">X</div>');
	$(".stage_a").click(function(){
		$(".bw_video_player:first").show().appendTo($(".stage"));
	});
	$(".stage_b").click(function(){
		$(".bw_video_player:eq(1)").show().appendTo($(".stage"));
	});
	$(".stage_c").click(function(){
		$(".bw_video_player:last").show().appendTo($(".stage"));
	});

	$(".shutup").click(function(){
		$(".stage").find(".bw_video_player").remove();
	});

	$(".fancybox_list li:eq(0)").addClass("cur").siblings().removeClass("cur");

	$(".fancybox_list").each(function(){
		var ids = $(this).find("li").size();
		$(this).css("width",ids*15);
	});

	$(".bw_video_player").each(function(){
		var img_width = $(this).width();
		var img_height = $(this).height();
		$(this).parent().find("img").css({
			"width": img_width,
			"height": img_height
		});
	});

	//$('<textarea rows="30" cols="50" name="editor01"></textarea>').appendTo($(".study_main")).after('<input type="button" class="btn button white" value="提交">');
	//CKEDITOR.replace('editor01');

	//选择排序
	var select_tag = 1;
	//$(".select_options").before('<p class="select_title">选择排序</p>');
	//$(".select_options").before('<h2>选择排序</h2>');
	$(".select_options").after('<p class="select_results"></p>');
	$(".select_results").after('<p class="select_btn"><input type="button" class="button white" value="提交"><input type="button" class="button white" value="重置" onclick="window.location.reload()"></p>');
	$(".select_options p").each(function(){
		var idx = $(this).index();
		$(this).attr("data-index", idx);
	});
	$(".select_options p").click(function(){
		var li_html = $(this).html();
		var ids = $(this).index();
		if(!($(this).hasClass("gray"))){
			$(this).addClass("gray");
			$(".select_results").append("<span data-index="+ ids +">"+ li_html +"</span>").find("span").each(function(){
				$(this).click(function(){
					var data_index = $(this).attr("data-index");
					$(this).remove();
					$(".select_options p:eq("+ data_index +")").removeClass("gray");
				});
			});
		}
	});

	$(".select_btn input:eq(0)").click(function(){
		var i = 0;
		var j = 0;
		$(".select_options").find("p.gray").each(function(){
			if($(this).hasClass("right")) i++;
			else j++;
		});
		if(i == 4 && j == 0) alert("亲，你蒙对了！");
		else alert("亲，你蒙都没蒙对！");
	});

	function selectAddNumber(){
		$(".select_results").find("span").each(function(){
			var ids = $(this).index();
			$(this+":before").css({
				"content": (ids+1) + "."
			});
		});
	}

	//添加评论

	/*$(".comment_contain").after('<div class="comment_add"><p><span>用户名</span><input type="text"></p><p><span>内　容</span><textarea name="editor01" id="editor"></textarea></p><p><input type="button" class="button white" value="提交"><input type="button" class="button white" value="重置"></p></div>');
	CKEDITOR.replace('editor01');

	function getContent(){
		return CKEDITOR.instances.editor.getData();
	}

	$(".comment_add").find("input[type=button]:eq(0)").click(function(){
		//var val = $(this).parents(".comment_add").find("textarea").val();
		var val = getContent();
		var author = $(this).parents(".comment_add").find("input[type=text]").val();
		var time = new Date();
		if(!author) author = '匿名';
		$(this).parents(".comment_add").find("textarea").val('');
		CKEDITOR.instances.editor.setData('');
		$(this).parents(".comment_add").find("input[type=text]").val('');
		$(".comment_contain").find("ul").append('<li><p><span class="comment_author">'+ author +'</span><span class="comment_time">'+ time.toLocaleString() +'</span></p><p><span class="comment_content">'+ val +'</span></p></li>');
	});

	$(".comment_add").find("input[type=button]:eq(1)").click(function(){
		$(this).parents(".comment_add").find("input[type=text]").val('');
		$(this).parents(".comment_add").find("textarea").val('');
	});*/

	//词汇
	$(".tab_contain:eq(2)").empty();
	$(".study_main").find(".show_key").each(function(){
		var key_name = $(this).html();
		var key_des = unescape($(this).attr("data-des"));
		$(".tab_contain:eq(2)").append('<div class="word"><div class="wl"><h2>'+ key_name +'</h2><p>'+ key_des +'</p></div></div>');
	});

	//拖动排序

	$(".screen_img li").each(function(){
		var ids = $(this).index();
		$(this).find("img").attr("data-index",ids);
	});

	var $drag = $(".screen_img .link_cont"),
		$drop = $(".screen_number .link_cont li");

	var $drag2 = $(".screen_number .link_cont");
	var drag_num = 0;

	var html, html2;
	var drag_tag = 0;

	$("li", $drag).draggable({
		revert: "invalid",
		containment: "document",
		helper: "clone",
		cursor: "move",
		start: function(){
			html = $(this).html();
			$(this).empty();
		},
		stop: function(){
			$(this).html(html);
			if(drag_tag){
				drag_tag = 0;
				$(this).empty();
			}			
		}
	});

	$drop.droppable({
		accept: ".screen_img>.link_cont>li",
		drop: function(event,ui){
			var drop_n = $(this).index();
			if(html){
				alert(html);
				$(this).html(html);
				panDuanImg(drop_n);
			}
		}
	});

	$drag.droppable({
		
	});

	$("li", $drag2).draggable({
		//revert: "invalid",
		containment: "document",
		helper: "clone",
		cursor: "move",
		start: function(){
			html2 = html = $(this).html();
			$(this).empty();
		},
		stop: function(){
			var ids = $(this).index();
			var cur_html = $(this).html();
			$(this).empty();
			if(html2){
				$(this).html(html2);
			}
			panDuanImg(ids);

			var li = $(".screen_number .link_cont li:eq("+ ids +")");
			var dt_index = li.find("img").attr("data-index");

			if(!(li.html())){
				$(".screen_img .link_cont li:eq("+ dt_index +")").append(cur_html);
			}
		}
	});

	$("li", $drag2).droppable({
		accept: ".screen_img>.link_cont>li, .screen_number>.link_cont>li",
		drop: function(event,ui){
			var drop_n = $(this).index();
			html2 = $(this).html();

			drag_tag = 1;

			if(html){
				$(this).html(html);
				panDuanImg(drop_n);
				
			}
		}
	});

	$(".screen_panduan li").removeAttr("class");

	function panDuanImg(n){
		var right_arr = [2,1,0];
		var num_li = $(".screen_number li:eq("+ n +")");
		var img_index = num_li.find("img").attr("data-index");
		var pan_li = $(".screen_panduan li:eq("+ n +")");
		if(img_index == right_arr[n]){
			pan_li.removeAttr("class").addClass("right");
			num_li.addClass("screen_play").append('<span class="playbtn"></span>');
			$(".playbtn").click(function(){
				screenPlay(n);
			});
		}else{
			pan_li.removeAttr("class").addClass("error");
			num_li.removeClass("screen_play").find(".playbtn").remove();
		}
	}
	var play_tag = 1;
	function screenPlay(n){
		$("html").css("overflow","hidden");
		if(play_tag){
			play_tag = 0;
			$('<div class="screen_zoom_bg"></div>').appendTo($("body")).click(function(){
				screenPlayHidden();
			});	
			$('<div class="screen_zoom"></div>').appendTo($("body"));
			videoAppend(n);		
		}
	};


	function screenPlayHidden(){
		play_tag = 1;
		$(".screen_zoom_bg").remove();
		$(".screen_zoom").remove();
		$("html").css("overflow-y","scroll");
	}


	//var video_size = $(".video_area").size();
	//alert(video_size);

	function videoAppend(n){
		$(".video_area:eq("+ n +")").clone(true).appendTo($(".screen_zoom")).click();
	}


	//讨论区

	/*var discuss_idx = 0;
	var discom = $(".discuss_middle .discuss_comment");
	var discuss_size = discom.find("li").size();

	discussShow(0);

	function discussShow(n){
		discom.find("li:eq("+ n +")").fadeIn(500).siblings().hide();
		discom.find("li:eq("+ (n-1) +")").clone().appendTo($(".discuss_left ul").empty()).show();
		if((n+1) == discuss_size) n = -1;
		discom.find("li:eq("+ (n+1) +")").clone().appendTo($(".discuss_right ul").empty()).show();	
	}
	$(".discuss_right").click(function(){
		discuss_idx++;
		if(discuss_idx == discuss_size) discuss_idx = 0;
		discussShow(discuss_idx);
	});
	$(".discuss_left").click(function(){
		discuss_idx--;
		if(discuss_idx == -1 ) discuss_idx = discuss_size-1;
		if(discuss_idx == -2 ) discuss_idx = discuss_size-2;
		discussShow(discuss_idx);
	});

	$(".discuss_middle .btn").find("input[type=text]").val('');

	$(".discuss_middle .btn").find("input[type=button]:eq(0)").click(function(){
		var val = $(this).parent().find("input[type=text]").val();
		var time = new Date();
		time = time.toLocaleString();
		$('<li><p><span class="comment_author">匿名('+ (discuss_size+1) +'楼)</span>:<span class="comment_time">'+ time +'</span></p><p><span class="comment_content">'+ val +'</span></p></li>').appendTo(discom);
		$(this).parent().find("input[type=text]").val('');
		discuss_size = discom.find("li").size();
		discuss_idx = -1;
		discussShow(discuss_size-1);
	});

	$(document.body).keypress(function(e){
		if(e.keyCode == 13){
			$(".discuss_middle .btn").find("input[type=button]:eq(0)").click();
		}

	});*/


	
});