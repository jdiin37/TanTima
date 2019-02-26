function switchHtml(htmlFile){	
	htmlFile+='?_=' + (new Date()).getTime();
//	console.log(htmlFile);
	$("#root").load(htmlFile);
}



var filterList_single = function(tableID, column, val) {
	var myfilter = {
		groupOp: "AND",
		rules: []
	};
	myfilter.rules.push({
		field: column,
		op: "eq",
		data: val
	});
	$("#" + tableID).setGridParam({
		postData: {
			filters: JSON.stringify(myfilter)
		},
		search: true
	}).trigger('reloadGrid', [{
		page: 1
	}]);		
}

//ruleObjArray Example:
//[{field: column,op: op,data: val},{field: column,op: op,data: val}];
var filterList_multi = function(tableID,ruleObjArray) {
	var myfilter = {
		groupOp: "eq",
		rules: []
	};
	
	for(i=0;i<ruleObjArray.length;i++){
		myfilter.rules.push(ruleObjArray[i])
	}
	
	$("#" + tableID).setGridParam({
		postData: {
			filters: JSON.stringify(myfilter)
		},
		search: true
	}).trigger('reloadGrid', [{
		page: 1
	}]);		
}

function getRightNowDate(){
	var date = moment().format('YYYYMMDD');
	var year = (date.substr(0,4))-1911;
	var month = (date.substr(4,2));
	var day = (date.substr(6,2));
//	console.log(year+"/"+month+"/"+day);
	
	return year+""+month+""+day;
}

function getRightNowTimeSecond(){
	var time = moment().format('HHmmss');
	return time;
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function setBlock(second){	
	$.blockUI({message:  '<h1>Please wait...</h1>', css: {
        border: 'none',
        padding: '15px',
        backgroundColor: '#000',
        '-webkit-border-radius': '10px',
        '-moz-border-radius': '10px',
        opacity: .5,
        color: '#fff'
    } });
	setTimeout(function(){
		$.unblockUI();
	}, second)		
}

var userHeight = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
var userWidth = window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;

function resizeGrid() {
      
	  if(grid = $('.ui-jqgrid-btable:visible')) {
	    grid.each(function(index) {
	      var gridId = $(this).attr('id');
	      var gridHeight = 0;
	      var numOfRow = 10;
	      if(gridId == "PatList"){  //病人清單
	    	  var navbar = $(".navbar").height(); 
	  		  gridHeight = userHeight - (navbar+150); 
//	    	  numOfRow = Math.floor(gridHeight/18);
//	  		numOfRow = 50;
	    	  
//	  		$(".jqGridPatList_BgStyle").css('min-height', (gridHeight+130) +'px').css('max-height', (gridHeight+130) +'px')
//			 .css('min-width', (userWidth-102) +'px').css('max-width', (userWidth-102) +'px');

	    	 
	      }else if(gridId == "UdDetailList"){
	    	  var PatientInfoBarHeight = $(".PatientInfoBar").height();
	    	  var pageTabSwitchHeight = $("#ul-pageTabSwitch").height();
	    	  var udRadioGroupHeight = $("#udRadioGroup").height();
	    	  gridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+175); 

//	    	  $(".jqGridUDList_BgStyle").css('min-height', (gridHeight+100) +'px').css('max-height', (gridHeight+100) +'px')
//	    		 .css('min-width', (userWidth-117) +'px').css('max-width', (userWidth-117) +'px');
//	    	  resizePanelBody("jqGridUDList_BgStyle",(gridHeight+100)); 
	    	  
	      }else if(gridId == "StatDetailList"){
	    	  var PatientInfoBarHeight = $(".PatientInfoBar").height();
	    	  var pageTabSwitchHeight = $("#ul-pageTabSwitch").height();
	    	  var stListWidth = $("#StatList").width();
	    	  gridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+175); 
//	    	  $(".jqGridStList_BgStyle").css('min-height', (gridHeight+100) +'px').css('max-height', (gridHeight+100) +'px')
//	    		 .css('min-width', (userWidth-stListWidth-117) +'px').css('max-width', (userWidth-stListWidth-117) +'px');
	    	  
//	    	  $('#' + gridId).setGridWidth($(".jqGridStList_BgStyle").width);
	    	  
	    	  
	      }else if(gridId == "StatList"){
	    	  var PatientInfoBarHeight = $(".PatientInfoBar").height();
	    	  var pageTabSwitchHeight = $("#ul-pageTabSwitch").height();
	    	  gridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+90); 
	    	  
//	    	  $(".jqGridAcnt_BgStyle").css('min-height', (gridHeight+100) +'px').css('max-height', (gridHeight+100) +'px')
//	    		 .css('min-width', (userWidth-600) +'px').css('max-width', (userWidth-600) +'px');
//	    	  $('#' + gridId).setGridWidth($(".jqGridAcnt_BgStyle").width);
//	    	  $("#StatList").css('min-height', (gridHeight+100) +'px').css('max-height', (gridHeight+100) +'px')
//	    		 .css('min-width', (userWidth-600) +'px').css('max-width', (userWidth-600) +'px');
	    	  
	      }else if(gridId == "TakeHomeList"){
	    	  var PatientInfoBarHeight = $(".PatientInfoBar").height();
	    	  var pageTabSwitchHeight = $("#ul-pageTabSwitch").height();
	    	  gridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+80); 
	    	  
	      }else if(gridId == "TakeHomeDetailList"){
	    	  var PatientInfoBarHeight = $(".PatientInfoBar").height();
	    	  var pageTabSwitchHeight = $("#ul-pageTabSwitch").height();
	    	  var takeHomeListWidth = $("#TakeHomeList").width();
	    	  gridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+130); 
//	    	  $(".jqGridTakeHomeList_BgStyle").css('min-height', (gridHeight+100) +'px').css('max-height', (gridHeight+100) +'px')
//	    		 .css('min-width', (userWidth-takeHomeListWidth-70) +'px').css('max-width', (userWidth-takeHomeListWidth-70) +'px');
	    	  resizePanelBody("jqGridTakeHomeList_BgStyle",(gridHeight+100));
	    	  $('#' + gridId).setGridWidth($(".jqGridTakeHomeList_BgStyle").width);
	    	  
	      }else if(gridId == "XrayList"){
	    	  var PatientInfoBarHeight = $(".PatientInfoBar").height();
	    	  var pageTabSwitchHeight = $("#ul-pageTabSwitch").height();
	    	  var RadioBgStyle  =  $(".RadioBgStyle").height();
	    	  gridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+25+100); 

		    	  
	      }else if(gridId =="XrayPosList"){ //影像照射位置
	    	  gridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+RadioBgStyle+300); 

	    	  
	      }else if(gridId =="LabList"){
	    	  var RadioBgStyle  =  $(".RadioBgStyle").height();
	    	  gridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+RadioBgStyle+110);
//	    	  resizePanelBody("labListBody",(gridHeight-130));    
	    	  
	      }else if(gridId=="LabDataList"){
	    	  var RadioBgStyle  =  $(".RadioBgStyle").height();
	    	  gridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+RadioBgStyle+100+175);
	    	  
	      }else if(gridId=="LabSumList"){ //檢驗彙總	    	 
	    	  var sumRadioGroup =  $("#sumRadioGroup").height();	    		
	    	  gridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+100+150+sumRadioGroup);
	      }else if(gridId=="TPRRecordList"){
	  
	    	  gridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+55+100);
//	    	  console.log("TPRRecordHeight:"+gridHeight);
	      }else if(gridId=="dartzList"){
	    	  gridHeight = 320;
	      }
	      $('#' + gridId).setGridHeight(gridHeight);
//	      $('#' + gridId).setGridWidth(userWidth-30);
//	      AppendPager(gridId,gridId + "_pager",gridId+"_tot",gridHeight);// 使用在  STAT,出院帶藥 帳款日期Grid上
	      
//	      console.log("ResizeGrid:"+gridHeight);

	    });
	  }

	}


function AppendPager(jgGrid,pagerID,totalID,girdheight){
	var recordCnt = $('#'+ jgGrid).getGridParam("reccount");
	var NumOfRow = getPagerCnt('#'+jgGrid);
	var NumOfPage = recordCnt/ NumOfRow + 1;
	var pageOption = "";
	var i = 0;
	for (i=0;i<Math.floor(NumOfPage);i++){
		pageOption += '<option value="' + i+'">'
		+ (i + 1) + '</option>';
	}
	
	$('#'+ pagerID).html("").append(pageOption);
	$('#'+ totalID).html(i);
	
	$('#'+ pagerID).change(function() {
		//alert($(this).val() * Math.floor(NumOfRow));
		scrollToRow(jgGrid, $(this).val() * Math.floor(NumOfRow));
	});
	
	function scrollToRow(targetGrid, id) {
		var rowHeight = 27; // Default
		var index = jQuery('#' +targetGrid).getInd(id);
		jQuery('#'+ targetGrid).closest(".ui-jqgrid-bdiv").scrollTop(rowHeight * index);
	}		
	
	function getPagerCnt(targetGrid){
		return (girdheight-45)/25;   //-45是扣掉header
	}
}

function DateAdd(interval, number, date) {
    switch (interval) {
    case "y": {
        date.setFullYear(date.getFullYear() + number);
        return date;
        break;
    }
    case "q": {
        date.setMonth(date.getMonth() + number * 3);
        return date;
        break;
    }
    case "m": {
        date.setMonth(date.getMonth() + number);
        return date;
        break;
    }
    case "w": {
        date.setDate(date.getDate() + number * 7);
        return date;
        break;
    }
    case "d": {
        date.setDate(date.getDate() + number);
        return date;
        break;
    }
    case "h": {
        date.setHours(date.getHours() + number);
        return date;
        break;
    }
    case "m": {
        date.setMinutes(date.getMinutes() + number);
        return date;
        break;
    }
    case "s": {
        date.setSeconds(date.getSeconds() + number);
        return date;
        break;
    }
    default: {
        date.setDate(d.getDate() + number);
        return date;
        break;
    }
    }
}

//設定 html 文字
function setHtml(tag,data){
	//用innerText 方可吃傳來字串中/n轉成<br/>
    try{
    	document.getElementById(tag).innerText=data; //data 可能會有null	
    }catch(e){
    	
    }		
	
}


var filterNull = function(value) {
//	return value==null||value=="[object Window]"?"":value;
	return (value=="null"||value === undefined || value === null||value=="[object Window]"?"":value); 
}

//格式化日期
function formatDateTime(cellValue, options, rowObject) {
	   if(cellValue === undefined || cellValue === null||cellValue=="[object Window]"||cellValue==""||cellValue=="null"){
		   return "";
		   
	   }else{
			if(cellValue.length==7){
	   			 var y = cellValue.substring(0,3);
	   			 var m = cellValue.substring(3,5);
	   			 var d = cellValue.substring(5,7);
//	   			 console.log(y+"/"+m+"/"+d);
	   			 if(cellValue.startsWith("0")){
	   				var y = cellValue.substring(1,3); //如果民國年小於 100年 ，去除前面的0
	   			 }
	   				return y+"/"+m+"/"+d;
	   				
	   			}else if(cellValue.length==6){
	   			 var hh = cellValue.substring(0,2);
	   			 var mm = cellValue.substring(2,4);
	   			 var ss = cellValue.substring(4,6);
//	   			 console.log(hh+":"+mm+":"+ss);
	   				return hh+":"+mm+":"+ss;
	   				
	   			}else if(cellValue.length==11){ //例:手術輸入日期 10702261546
	   				
	   			 var y = cellValue.substring(0,3);
	   			 var m = cellValue.substring(3,5);
	   			 var d = cellValue.substring(5,7);
	   			 if(cellValue.startsWith("0")){
	   				var y = cellValue.substring(1,3); //如果民國年小於 100年 ，去除前面的0
	   			 }
	   			 var hh = cellValue.substring(7,9);
	   			 var mm = cellValue.substring(9,11);
	   			 
	   			return y+"/"+m+"/"+d+"  "+hh+":"+mm;
	   				
	   				
	   			}else{
	   			 var hh = cellValue.substring(0,2);
	   			 var mm = cellValue.substring(2,4);
//	   			 console.log(hh+":"+mm);
	   				return hh+":"+mm;
	   				
	   			}
	   }
	  
         };

function noDataFound(ajaxErrMsg,tableID){			
    if(ajaxErrMsg.includes('No Data Found')){
       $("#" + tableID).jqGrid("clearGridData", true).trigger("reloadGrid");	 
       }
}

function clearGridData(tableID){
	$("#" + tableID).jqGrid("clearGridData", true).trigger("reloadGrid");		
}

function resizePanelBody(id,gridHeight){
	$('#'+id).css('min-height', (gridHeight) +'px').css('max-height', (gridHeight) +'px');

}

//顯示進度條 固定  病人清單欄位
function showLoadingFunction(showId) {
//    console.log(showId);
    setTimeout(function(){ 
    	showPage(showId,200); 
    	if(showId=="inpPatListPage"){
    		/***1070605 註解***/
//    		$("#PatList").jqGrid('destroyFrozenColumns');
//    		$("#PatList").jqGrid('setFrozenColumns');
    	}
    	
    }, 200);
}

function showPage(showId) {
	$(".loading").hide();
	$("#"+showId).show();
//  document.getElementsByClassName("loading").style.display = "none";
//  document.getElementById(showId).style.display = "block";
}


var ajax_url = function() {
//	return "/TanTimaServices/servlets/ServletAgent";	
		//return 'servlets/ServletAgent';
//		return "http://172.168.1.60:8888/TanTimaServices/servlets/ServletAgent";//暫時
		return "http://172.16.2.189:8080/TanTimaServices/servlets/ServletAgent";//主要

}

var getAjaxData = function (serviceName,pcsParam){
	return{
		serviceName : serviceName,
		parameters : pcsParam
	};
};

function ajax_Post(serviceName,paramData){
//	$(".loading").show();
	return $.ajax({
				method : "POST",
				url : ajax_url(),
				data : getAjaxData(serviceName,paramData),
				dataType : "json",
				success: function(){
//					$(".loading").hide();
					setBlock(500);
				    },
				error: function(jqXHR, textStatus, errorThrown) {
					if(jqXHR.status==500){  //500 Error
						alert(" 500 Error ");
					}   
				}
			});	
}

number_regex = /^\d+$/;
years_regex = /^([1-9]?\d|100)$/;
ROCdata_regex = /^\d{3}\d{2}\d{2}$/;
char_regex = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
var isNumber_regex =  /[^%&',;=?$\x22]+/; 

function stateChange(state, objID, msg) {
	if (state) {
		// $(objID).parent().removeClass('has-error').addClass('has-success');
		$(objID).parent().removeClass('has-error')
		$(objID).tooltip('destroy');
	} else {
		$(objID).parent().removeClass('has-success').addClass('has-error');
		$(objID).tooltip({
			title : msg,
			placement : "bottom"
		}).tooltip('show');
	}
}
