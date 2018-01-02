
String.prototype.trim=function() {
	return this.replace(/(^\s*)|(\s*$)/g,'');
};

//多终端视频播放
var sUserAgent = navigator.userAgent.toLowerCase();
var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
var bIsAndroid = sUserAgent.match(/android/i) == "android";
var bIsSafari = sUserAgent.match(/safari/i) == "safari";
var bIsTouch = bIsIpad || bIsIphoneOs || bIsAndroid;

if(!bw)var bw={};

var    
	PAN_DUAN  = 0,
	XUAN_ZE   = 1,
	WEN_DA    = 2,
	TIAN_KONG = 3,
	DUO_XUAN = 4;

//试卷标注属性 {时长}
//题块标注属性 {题型, 分值}
//题目标注属性 {答案}


bw.getExamData = function(){
	$(".bw_exam").find("img").attr("align","absmiddle");
	$(".bw_exam").hide();
	var exam = {
		idx: 1,
		count: 0,
		blocks: [],
		check: function(){
			var _this = this;
			$(".question_result").remove();
			$(".questionbox").each(function(){
				var blkIdx = parseInt($(this).attr("data-block-index"));
				var quesIdx = parseInt($(this).attr("data-ques-index"));
				var num = $("li.question_num_" + blkIdx + "_" + quesIdx);
				var block = _this.blocks[blkIdx];
				var ques = block.questions[quesIdx];
				
				//显示答案
				var result = "<div class='question_result'><span>正确答案：</span>";
				if(PAN_DUAN == block.type){
					result += (ques.right.length ? (ques.right[0]?"√" : "×")  : ""); 
					result += "<p>";
					if(ques.ans.length){
						for(var i=0;i<ques.ans.length;i++){
							result +=  $("<div>" + ques.ans[i] + "</div>").text().trim() + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
						}
					}
					result += "</p>";
					if(ques.right.length){
						if(($("#ans_"+ blkIdx +"_"+ quesIdx +"_0").is(":checked") && ques.right[0]) || 
								($("#ans_"+ blkIdx +"_"+ quesIdx +"_1").is(":checked") && !ques.right[0])){
							num.removeClass("red").addClass("green");
						}else{
							num.removeClass("green").addClass("red");
						}
					}
				}
				if(XUAN_ZE == block.type){
					for(var i=0;i<ques.right.length;i++){
						result += "<p>" + ques.ans[ques.right[i]] + "</p>";
					}
					if(ques.right.length){
						if($("#ans_"+ blkIdx +"_"+ quesIdx +"_" + ques.right[0]).is(":checked")){
							num.removeClass("red").addClass("green");
						}else{
							num.removeClass("green").addClass("red");
						}
					}
				}
				if(DUO_XUAN == block.type){
					for(var i=0;i<ques.right.length;i++){
						result += "<p>" + ques.ans[ques.right[i]] + "</p>";
					}
					if(ques.right.length){
						var r = true;
						for(var i=0;i<ques.ans.length;i++){
							if(($("#ans_"+ blkIdx +"_"+ quesIdx +"_" + i).is(":checked") && ques.right.join(",").indexOf(i+"")==-1) ||
								(!$("#ans_"+ blkIdx +"_"+ quesIdx +"_" + i).is(":checked") && ques.right.join(",").indexOf(i+"")!=-1)
							){
								r = false;
							}
						}
						if(r){
							num.removeClass("red").addClass("green");
						}else{
							num.removeClass("green").addClass("red");
						}
					}
				}
				if(TIAN_KONG == block.type){
					result += "<p>";
					for(var i=0;i<ques.ans.length;i++){
						result +=  $("<div>" + ques.ans[i] + "</div>").text() + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
					}
					result += "</p>";
					var r = true;
					$(this).find("input").each(function(i){
						if(ques.right.length >= i+1  && ques.right[i] != $(this).val().trim()){
							r = false;
						}
					});
					if(r){
						num.removeClass("red").addClass("green");
					}else{
						num.removeClass("green").addClass("red");
					}
				}
				if(WEN_DA == block.type){
					result += "<p>";
					if(ques.ans.length){
						result += ques.ans[0];
					}
					result += "</p>";
				}
				result += "</div>";
				$(this).append(result);
			});
		}
	};
	
	exam.index = function(){
		return this.idx ++;
	}
	var cs = getDomInfo($(".bw_exam .bw_exam_title"));
	exam.time = parseInt(cs[0]);
	
	$(".bw_exam .bw_question_block").each(function(){
		exam.blocks.push( parseBlock($(this)) );		
	});
	return exam;
	
	function parseBlock(blk){
		var block = {
				questions:[]
			};
		var cs = getDomInfo($(blk).find(".bw_block_title"));
		block.type = parseInt(cs[0]);
		block.score = parseInt(cs[1]);
		block.title = $(blk).find(".bw_block_title").html();
		
		$(blk).find(".bw_question").each(function(){
			block.questions.push(parseQuestion(block,$(this)));	
		});
		return block;
	}
	
	function parseQuestion(block,ques){
		exam.count++;
		var question = {ques:"",ans:[],right:[]};
		var cs = getDomInfo(ques.find(".bw_ques"));
		question.ques = ques.find(".bw_ques").html();
		//question.ans = cs;
		ques.find(".bw_ans").each(function(i){
			if(block.type == PAN_DUAN){
				question.right.push($(this).text().indexOf("{1}")!=-1);
			}
			if(block.type == XUAN_ZE || block.type == DUO_XUAN){
				if($(this).text().indexOf("{1}")!=-1){
					question.right.push(i);
				}
			}
			if(block.type == TIAN_KONG){
				question.ques = question.ques.replace(/\_{3,}/g,function($0){
					return "<input type='text' size='"+ $0.length +"' value=''/>";
				});
				question.right.push($(this).text().trim());
			}
			question.ans.push($(this).html().replace(/\{\d\}/,""));
		});
		return question;
	}
	
	function getDomInfo(dom){
		var obj = {params:[]};
		var html = $(dom).html();
		if(html && html.match(/\{(.*?)\}/i)){
			obj.params = RegExp.$1.split(",");
		}
		dom.html(html && html.replace(/\{.*?\}/ig,""));
		return obj.params;
	}
	
};

//结构化NODE
bw.getNodes = function(dom){
	if(!dom) dom = document.body;
	$(dom).find(".bw_node_wrap").hide();
	var nodes = [];
	var node = $(dom).find(".bw_node_wrap:first");
	while(node.length){
		nodes.push(parseNode(node));
		node = node.next(".bw_node_wrap");
	}
	function parseNode(node){
		var nd = new Array();
		nd.toString= function(){return node.find(".bw_node:first").html().trim()};
		nd.html= node.find(".bw_node:first").html().trim();
		nd.text= node.find(".bw_node:first").text().trim();
		nd.img = (function(){
			return node.find("img:first").length ? node.find("img:first").attr("src") : "";
		})();
		nd.imgs =  (function(){
			var urls = [];
			node.find("img").each(function(){
				urls.push($(this).attr("src"));
			});
			return urls;
		})();
		nd.video = (function(){
			var data = node.find("img.ke-bw-video:first").attr("data-bw-attr");
			if(!data)return {};
			data = parse_json(unescape(data));
			data = bw.video(data);
			
			return data;
		})();
		
		var snode = node.find(".bw_node_wrap:first");
		while(snode.length){
			nd.push(parseNode(snode));
			snode = snode.next(".bw_node_wrap");
		}
		return nd;
	}
	$(dom).find(".bw_node_wrap").remove();
	return nodes;
}

bw.video = function(data){
	data.img = function(){
		return video_root + this.videoName + ".png";
	}
	data.url = function(){
		return video_root + this.videoName + ((bIsTouch) ? ".mp4" : ".flv");
		//return video_root + this.videoName + ((bIsTouch) ? ".mp4" : ".mp4");
	} 
	return data;
}

bw.getVideoUrl = function(name){
	//return video_root + name +  ((bIsTouch) ? ".mp4" : ".mp4");
	return video_root + name +  ((bIsTouch) ? ".mp4" : ".flv");
} 

bw.getVideoImg = function(name){
	return video_root + name + ".png";
}









