


$(document).ready(function(){
	
//	w3.includeHTML();//載入 各個頁面的div 
//	renderIncludeHtmlURL();
	
	//登出按鈕
	$('#img-logout').click(function(){		
		switchHtml("/TanTimaServices/html/login/login.html");	    	
	});
	
	//回病人清單
	$('#img-back-patlist').click(function(){
		
		switchHtml("/TanTimaServices/html/inpPatList/inpPatList.html");
		/***返回病人清單時，將 
		 * 護理記錄畫面的Dialog彈跳視窗 全部刪除 1.deleteFocusDiv 2.phraseSampleDialog 3.focusTxtListDialog 
		 * TPR畫面的 Dialog彈跳視窗 刪除 1.deleteTPRDiv
		 * **/
		$("#deleteFocusDiv").remove();
		$("#phraseSampleDialog").remove();
		$("#deleteTPRDiv").remove();
		$("#focusTxtListDialog").remove();
		
		
		
		
	});
//	resizeGrid();
	
		 var PatientInfoBarHeight = $(".PatientInfoBar").height()>0?$(".PatientInfoBar").height():38;
		 var pageTabSwitchHeight = $("#ul-pageTabSwitch").height()>0?$("#ul-pageTabSwitch").height():57;
         var totalWidth = $(".tabs").width(); 
   
    
    var PatientRecordListHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+45); 
    //病人歷史紀錄 高度
    resizePanelBody("searchHistory",PatientRecordListHeight);

    var eachLiWidth = (totalWidth/9);//-1
    
//    $("ul.tabs li").css('min-width', eachLiWidth +'px').css('max-width', eachLiWidth +'px');
    //$("ul.tabs li").css('width', '11%');
	
	
	// 預設顯示第一個 Tab
	var showTab = 1;
//	var defaultLi = $('ul.tabs li').eq(showTab).addClass('active');
//	$(defaultLi.find('a').attr('href')).siblings().hide();
 
	// 當 li 頁籤被點擊時...
	// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
	$('ul.tabs li').click(function() {
		// 找出 li 中的超連結 href(#id)
		var $this = $(this),
			clickTab = $this.find('a').attr('href');
		
		if(clickTab=="#searchHistory"){
			if($("#searchHistory").is(':visible')){
				$("#searchHistory").addClass("hide").removeClass('show').fadeOut('fast');	
				$("#main_tab_container").css('margin-left','0px');
			}else{
				$("#searchHistory").addClass("show").removeClass('hide').fadeIn('fast');
				$("#main_tab_container").css('margin-left','140px');
			}
			
			return false;
		}
		// 把目前點擊到的 li 頁籤加上 .active
		// 並把兄弟元素中有 .active 的都移除 class
		$this.addClass('active').siblings('.active').removeClass('active');
		// 淡入相對應的內容並隱藏兄弟元素
		$(clickTab).stop(false, true).fadeIn(function(){
			if(clickTab =="#ud"){ //frozen Columns for jqGrid
			 $("#UdDetailList").jqGrid('destroyFrozenColumns');
				$("#UdDetailList").jqGrid('setFrozenColumns');
			}else if(clickTab =="#stat"){
			    $("#StatDetailList").jqGrid('destroyFrozenColumns');
				$("#StatDetailList").jqGrid('setFrozenColumns');
			}else if(clickTab =="#takeHome"){
			   $("#TakeHomeDetailList").jqGrid('destroyFrozenColumns');
				$("#TakeHomeDetailList").jqGrid('setFrozenColumns');
			}			
		}).siblings().hide();
		
		return false;
	}).find('a').focus(function(){
		this.blur();
	});
	

	$('ul.tabs li').eq(showTab).trigger('click');
	
    var tabContainerHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+20);
	$(".tab_container").css('min-height', tabContainerHeight +'px').css('max-height', tabContainerHeight +'px');
	
	$("#common_chartNo").html(PatInfoObj.chartNo+"/"+PatInfoObj.ptName+"/"+PatInfoObj.sex);
	$("#common_ckinDate").html((PatInfoObj.ckinDate)+" ~ "+(PatInfoObj.dischargeDate));
	$("#common_zone").html(PatInfoObj.zone);
	
	ajax_getRecordChartNoList("PatientListService");
	
	
	
	//查詢病人歷史清單
	
	


});

//依據住院日期排序
function sortObj(objArray,orderBy){
	
	objArray.sort(function(a,b){
		if(orderBy=="asc"){
			return a.ckin_date-b.ckin_date;
		}else{
			return b.ckin_date-a.ckin_date;
		}
	});  
	
}

function changeCkinRecordDate(ReChartNoListArray,id){
	setBlock(500);
	var serno = ReChartNoListArray[id].serno;
	var ckinDate = ReChartNoListArray[id].ckin_date;
	var dischargeDate = ReChartNoListArray[id].discharge_date;
	
//	console.log("serno:"+serno+" ;ckinDate:"+ckinDate+" ;"+dischargeDate);
	PatInfoObj.serno = serno;
	$("#common_ckinDate").html(formatDateTime(ckinDate)+" ~ "+formatDateTime(filterNull(dischargeDate))); //改變Toolbar 住院期間
	
	//隱藏暫存 畫面
	$("#Lab_SumLineChartContent").hide();
	
	$.when(callRenderAllPage()).done(function(){
//		console.log("renderAll then renderTPR()");
		renderTPR();
	});
	
//	PatInfoObj.serno = serno;
//	PatInfoObj.ckinDate = ckinDate;
//	PatInfoObj.dischargeDate = dischargeDate; //住院中
//	PatInfoObj.zone = "四季台安";
	
	
}

//ajax_getRecordChartNoList("PatientListService");
//病人歷史住院清單
function ajax_getRecordChartNoList(serviceName){
	
	$("#recordListView").html("");
	var InpPatParam = new ChartNoListInputObj(PatInfoObj.empNo,PatInfoObj.sessionID,PatInfoObj.chartNo,"getPatinpListByChartNo");
	
	$.when(ajax_Post(serviceName,JSON.stringify(InpPatParam))).done(
			function(dataInp) {
			 var ReChartNoListArray =[];
					if (dataInp.status == "Success") {
						$.each(dataInp.resultSet, function(index, obj) {
//							console.log("Record:"+dataInp.resultSet.length);
//							 renderRecordChartNoList(index,obj);
							ReChartNoListArray.push(obj);
						});
						
						sortObj(ReChartNoListArray,"desc");
//						console.log(ReChartNoListArray);
						renderRecordChartNoList(ReChartNoListArray);
//						for(var i=0;i<ReChartNoListArray.length;i++){
//							
//						}
						
						
						
						
						
						
						 $("#recordListView>li").on("click",function(){

							 var i = $(this).index();//索引值		
							 
							 $(".recordCount-active").removeClass("recordCount-active");
							 $('#recordListView>li').eq(i).find('.recordCount').addClass("recordCount-active").find('.recordCount').siblings().removeClass("recordCount-active");
							 
							 changeCkinRecordDate(ReChartNoListArray,i);
							 //將 UD ST  RadioButton 歸零   Xray Lab 
							 $('input:radio[name="udRadio"]:first').prop("checked", true).trigger('change');//切換帳款日期時 都先切回radioButton 值 為 全部 UD
//							 $('input:radio[name="stRadio"]:first').prop("checked", true).trigger('change');//切換帳款日期時 都先切回radioButton 值 為 全部 ST
							 
//						    	PatInfoObj.serno = serno;
//						    	PatInfoObj.ckinDate = ckinDate;
//						    	PatInfoObj.dischargeDate = dischargeDate;
//						    	PatInfoObj.zone = "四季台安";

							
								
							 });
						
						
						
					} else {
						var ajaxErrMsg = dataInp.errorMessage;
					}

			
				
			
			});
	
}

function renderRecordChartNoList(obj){
	/**var formatDisDate = formatDateTime(obj.discharge_date)==""?"住院中":formatDateTime(obj.discharge_date);
	var chartList = "";
	chartList+= '<li><div class="recordCount">'+(index+1)+'</div>';
	chartList+= '<div class="recordContent listViewItemFont">';
	chartList+= '<div class="re-Ckin">'+formatDateTime(obj.ckin_date)+'</div>';
	
	if(formatDisDate=="住院中"){
		chartList+= '<div class="re-Dis" style="color:#fff">'+formatDisDate+'</div>';
	}else{
		chartList+= '<div class="re-Dis">'+formatDisDate+'</div>';	
	}

//	chartList+= '<div class="re-Dis">'+formatDateTime(obj.discharge_date)+'</div>';
	chartList+= '<div class="re-inDays">住院'+obj.admit_days+'天</div>';
	chartList+= '<div class="re-doc">'+filterNull(obj.vs_name)+'</div>';
	chartList+= '<div class="re-div">'+filterNull(obj.div_name)+'</div>';
	chartList+= '<div class="re-hosp">四季台安</div>';
	chartList+=  '</div></li>';
	$("#recordListView").append(chartList);**/
	
	for(var i=0;i<obj.length;i++){
		var formatDisDate = formatDateTime(obj[i].discharge_date)==""?"住院中":formatDateTime(obj[i].discharge_date);
		var chartList = "";
		chartList+= '<li><div class="recordCount">'+(i+1)+'</div>';
		chartList+= '<div class="recordContent listViewItemFont">';
		chartList+= '<div class="re-Ckin">'+formatDateTime(obj[i].ckin_date)+'</div>';
		
		if(formatDisDate=="住院中"){
			chartList+= '<div class="re-Dis" style="color:#fff">'+formatDisDate+'</div>';
		}else{
			chartList+= '<div class="re-Dis">'+formatDisDate+'</div>';	
		}

//		chartList+= '<div class="re-Dis">'+formatDateTime(obj.discharge_date)+'</div>';
		chartList+= '<div class="re-inDays">住院'+obj[i].admit_days+'天</div>';
		chartList+= '<div class="re-doc">'+filterNull(obj[i].vs_name)+'</div>';
		chartList+= '<div class="re-div">'+filterNull(obj[i].div_name)+'</div>';
		chartList+= '<div class="re-hosp">' + PatInfoObj.zone +'</div>'; //20180524
		chartList+=  '</div></li>';
		$("#recordListView").append(chartList);
		
	}
	
	
//	return chartList;
}









