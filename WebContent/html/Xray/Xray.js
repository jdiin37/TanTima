
$(document).ready(function(){
	
	$('input[name=xrayRadio]:radio').unbind('change').bind('change', function(event) {
		var XRAYRadio = event.target;
		var XRAYRadioVal ="";
		if(XRAYRadio.checked){
			XRAYRadioVal = XRAYRadio.value;
//			console.log(XRAYRadioVal);
			
			if(XRAYRadioVal=="自訂"){
				var start = $("#inputXraySDate").val();
				var end = $("#inputXrayEDate").val();
				var xrayCustomRange = start+"|"+ end;
				
				if(start.length==0||end.length==0){
					alert("請輸入正確的日期格式");
				}else{
					ajax_getXrayList("XrayReportService",xrayCustomRange);
//					console.log("RadioValue Custom:"+xrayCustomRange);
				}
				
			}else {
				ajax_getXrayList("XrayReportService",XRAYRadioVal);
//				console.log("RadioValue:"+radioValue);
			}
			
			
			
			

		}

	});
	
	
	$("#inputXraySDate").on('click', function(event) {
		var labRadio = $('input:radio[name="xrayRadio"]:checked').val();
//		$('input:radio[name="sumRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		if(labRadio!="自訂"){
			$('input:radio[name="xrayRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		}

		});	

	/**檢驗趨彙 自訂 日期範圍 結束日 click監聽器 ***/	
	$("#inputXrayEDate").on('click',  function(event) {
		var labRadio = $('input:radio[name="xrayRadio"]:checked').val();
//		$('input:radio[name="sumRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		if(labRadio!="自訂"){
			$('input:radio[name="xrayRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		}

		});	
	
/**檢驗彙總 自訂日期範圍 起始日 change監聽器 ***/	
	$("#inputXraySDate").unbind('change').bind('change', function(event) {
		
		/**民國年*/
		var y =(parseInt($(this).val().substring(0, 3))+1911);
		var m = $(this).val().substring(3, 5);
		var d = $(this).val().substring(5, 7);
		
		var radioValue = $('input:radio[name="xrayRadio"]:checked').val();
		var start = $("#inputXraySDate").val();
		var end = $("#inputXrayEDate").val();
		var xrayCustomRange = start+"|"+ end;
		
		if(start.length==7&&end.length==7){
			if(moment(y+m+d+"","YYYYMMDD").isValid()){
				$(this).tooltip('destroy');
				ajax_getXrayList("XrayReportService",xrayCustomRange);

			}else{
				$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
			}
		}else{
			$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
		}
		
		
		


		
		
		

		});	

	
	$("#inputXrayEDate").unbind('change').bind('change', function(event) {
		
		/***民國年**/
		var y =(parseInt($(this).val().substring(0, 3))+1911);
		var m = $(this).val().substring(3, 5);
		var d = $(this).val().substring(5, 7);
		
		var radioValue = $('input:radio[name="xrayRadio"]:checked').val();
		var start = $("#inputXraySDate").val();
		var end = $("#inputXrayEDate").val();
		var xrayCustomRange = start+"|"+ end;
		
		if(start.length==7&&end.length==7){
			if(moment(y+m+d+"","YYYYMMDD").isValid()){
				$(this).tooltip('destroy');
				ajax_getXrayList("XrayReportService",xrayCustomRange);

			}else{
				$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
			}
		}else{
			$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
		}
		
		
		
		

		});	
	
	
	//按下搜尋按鈕
	$("#searchXrayRange").on('click',function(event) {
		var start = $("#inputXraySDate").val();
		var end = $("#inputXrayEDate").val();
		var xrayCustomRange = start+"|"+ end;
//		ajax_getXrayList("XrayReportService",xrayCustomRange);
		
		
		var sY =(parseInt(start.substring(0, 3))+1911);
		var sM = start.substring(3, 5);
		var sD = start.substring(5, 7);
		
		var eY =(parseInt(end.substring(0, 3))+1911);
		var eM = end.substring(3, 5);
		var eD = end.substring(5, 7);
		
		
		if(start.length==7&&end.length==7){
			if(moment(sY+sM+sD+"","YYYYMMDD").isValid()&&moment(eY+eM+eD+"","YYYYMMDD").isValid()){
				$("#inputXraySDate").tooltip('destroy');
				$("#inputXrayEDate").tooltip('destroy');
				ajax_getXrayList("XrayReportService",xrayCustomRange);

			}else{
				if(!moment(sY+sM+sD+"","YYYYMMDD").isValid()){
					$("#inputXraySDate").attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
				}
				
				if(!moment(eY+eM+eD+"","YYYYMMDD").isValid()){
					$("#inputXrayEDate").attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
				}
				
			}
		}else{
			if(!moment(sY+sM+sD+"","YYYYMMDD").isValid()){
				$("#inputXraySDate").attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
			}
			
			if(!moment(eY+eM+eD+"","YYYYMMDD").isValid()){
				$("#inputXrayEDate").attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
			}
		}
		
		

		});	
  
	
});

function XrayReportListInputObj(empNo,sessionID,chartNo,range,method){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.chartNo = chartNo;
	this.range = range;
	this.method = method;
};



function XrayReportPrimaryKeysInputObj(empNo,sessionID,xrayType,inpOpd,viewDate,chartNo,serno,seqNo,method){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.xrayType = xrayType;
	this.inpOpd = inpOpd;
	this.viewDate = viewDate;
	this.chartNo = chartNo;
	this.serno = serno;
	this.seqNo = seqNo;	
	this.method = method;
};


function renderXray(){

	
	var xrayBodyHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+90);
    
    var xrayDetailReasonHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+50+285);
//    console.log("xrayDetailReasonHeight:"+xrayDetailReasonHeight);
    
    
    ajax_getXrayList("XrayReportService","month");

//	setTimeout(function(){ 
		resizePanelBody("XrayListBody",xrayBodyHeight);
		resizePanelBody("xrayDetailReason",xrayDetailReasonHeight);
//    }, 200);
	
	
	
}

function callRenderXray(){
	var XRAYRadoBtn = $('input:radio[name="xrayRadio"]:checked').val();
	if(XRAYRadoBtn!="month"){
//		$('input:radio[name="xrayRadio"]:first').unbind('change');
    	$('input[name=xrayRadio]:radio:first').prop("checked", true).trigger('change');//預設 1個月
    }else{
    	ajax_getXrayList("XrayReportService","month");
    }
}

function getThisDate(days){
	
	var now = new Date();
	var month = now.getMonth()+1;
	var day = now.getDate();
	var year = now.getFullYear();
	var m = parseInt(month);
	var d = parseInt(day);
	var M = m<10?'0'+m:m;
	var D = d<10?'0'+d:d;
	var Y = year<1000?year:year-1911;

//	setTimeout(function(){ 
		$("#inputXrayEDate").val(Y+M+D+"");//自訂日期 endDate
//    }, 200);
	

	
	/** 測試 加減日期時間  one week ago**/
	var newDate = DateAdd("d", (parseInt(days)*-1), now);
	var newY = newDate.getFullYear();
	var newM = newDate.getMonth()+1;
	var newD = newDate.getDate();
	var lastY = newY<1000?newY:newY-1911;
	var lastM = newM<10?'0'+newM:newM;
	var lastD = newD<10?'0'+newD:newD;

//	setTimeout(function(){ 
		$("#inputXraySDate").val(lastY+lastM+lastD+"");//自訂日期 startDate
//    }, 200);
	
	
	
	
	/****/

}








/**
 *  //預設month
 * */
function ajax_getXrayList(serviceName,range){
	

    var cmParam = new XrayReportListInputObj(PatInfoObj.empNo,PatInfoObj.sessionID,PatInfoObj.chartNo,range,"getXrayReportByChartNoDateRange");

	
	var XrayArray = [];
	$.when(ajax_Post(serviceName,JSON.stringify(cmParam))).done(function(dataXrayList){			
		if (dataXrayList.status == "Success") {
			$.each(dataXrayList.resultSet, function(index, obj) {		
				XrayArray.push(obj);
			});	
			
//			var RadioBgStyle  =  $(".RadioBgStyle").height();
//			var xrayBodyHeight =  userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+RadioBgStyle+160);
//			$("#XrayListBody").css('min-height', xrayBodyHeight +'px').css('max-height', xrayBodyHeight +'px');
//			
//			 var xrayDetailReasonHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+RadioBgStyle+240);
//			 $("#xrayDetailReason").css('min-height', xrayDetailReasonHeight +'px').css('max-height', xrayDetailReasonHeight +'px');
		} else {
			ajaxErrMsg = dataXrayList.errorMessage;
			noDataFound(ajaxErrMsg,"XrayList");
	    	clearXrayData();
//	    	var RadioBgStyle  =  $(".RadioBgStyle").height();
//	    	var xrayBodyHeight =  userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+RadioBgStyle+160);
//			 $("#XrayListBody").css('min-height', (xrayBodyHeight) +'px').css('max-height', (xrayBodyHeight) +'px');
//			var xrayDetailReasonHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+RadioBgStyle+240);
//			$("#xrayDetailReason").css('min-height', xrayDetailReasonHeight +'px').css('max-height', xrayDetailReasonHeight +'px');
			
			 
	    	

		}	
		jqGrid_XrayList("#XrayList","#XrayList_Pager",XrayArray);		

	});
	
	
};


//取得影像 畫面右側資料 1070131 
// XrayReportService 
function ajax_getXrayDetailData(serviceName,xrayType,inpOpd,viewDate,serno,seqNo){
	
	var cmParam = new EMRXrayReportPrimaryKeysInputObj(UserObj.emp_no,UserObj.session_id,xrayType,inpOpd,viewDate,PatObj.chart_no,serno,seqNo,"getXrayReportByPrimaryKeys");
//	var cmParam = new EMRAllInputObj(UserObj.emp_no,UserObj.session_id,PatObj.chart_no,"getXrayCountByChartNoGroupByType");

		 var request = $.when(ajax_Post(serviceName,JSON.stringify(cmParam))).done(
					function(data) {
						
						if (data.status == "Success") {
							
//							$('#xray_ReportDate').html(formatDateTime(data.resultSet.report_date)+"  "+formatDateTime(data.resultSet.report_time)); //格式化報告日期
							$('#xray_ReportDate').html(data.resultSet.report_date+"  "+data.resultSet.report_time); //報告日期
							$('#xray_ReportMan').html(data.resultSet.reporter_name); //報告人員
							$('#xray_ReportType').html(data.resultSet.xray_type+"  "+data.resultSet.xray_name);//X光類別
							$('#xray_ReportDoctor').html(data.resultSet.doctor_name);//醫師
							$('#xray_dianoReason').html(data.resultSet.diagnosis);//醫囑原因
							$('#xray_findingReason').html(data.resultSet.report);//報告內容
							
							
							
						
						} else {
							var ajaxErrMsg = data.errorMessage;
							clearXrayData();
						}	
											

					});
		 
		    request.onreadystatechange = null;
			request.abort = null;
			request = null;
	
};


//取得影像 照射位置 1070202 
//XrayReportService 
function ajax_getXrayPosListData(serviceName,xrayType,inpOpd,viewDate,serno,seqNo){
	
	var XrayPosArray = [];
 
	var cmParam = new XrayReportPrimaryKeysInputObj(PatInfoObj.empNo,PatInfoObj.sessionID,xrayType,inpOpd,viewDate,PatInfoObj.chartNo,serno,seqNo,"getXrayordByXrayTypeInpOPdViewDateChartNoSerNoSeqNo");

		 var request = $.when(ajax_Post(serviceName,JSON.stringify(cmParam))).done(
					function(data) {
						
						if (data.status == "Success") {
							
							$.each(data.resultSet, function(index, obj) {		
								XrayPosArray.push(obj);
																	
								});	
						
						} else {
							var ajaxErrMsg = data.errorMessage;
							noDataFound(ajaxErrMsg,"XrayPosList");
							
//							var xrayDetailReasonHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+RadioBgStyle+210);
//							$("#xrayDetailReason").css('min-height', xrayDetailReasonHeight +'px').css('max-height', xrayDetailReasonHeight +'px');
							
						}
						
						jqGrid_XrayPosList("#XrayPosList","#XrayPosList_Pager",XrayPosArray);
						
												

					});
		 
		    request.onreadystatechange = null;
			request.abort = null;
			request = null;
   	
	
};




function jqGrid_XrayList(tableName,pagerName,arrayData){		//影像清單
//	var RadioBgStyle  =  $(".RadioBgStyle").height();
//	console.log("XrayList RadioBgStyle:"+RadioBgStyle);
	var xrayGridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+25+100);

	$(tableName).jqGrid({
	    datatype: "local",
	    height: xrayGridHeight,
	    colModel: [
	        { label: '日期', name: 'view_date', width: 90 },
	        { label: '報告類別', name: 'xray_name', width: 160,hidden:false },
	        { label: 'xray_type', name: 'xray_type', width: 90,hidden:true },	       
	        { label: 'inp_opd', name: 'inp_opd', width: 90,hidden:true },
	        { label: 'serno', name: 'serno', width: 90,hidden:true },
	        { label: 'seq_no', name: 'seq_no', width: 90,hidden:true },	       
	        { label: 'doctor_no', name: 'doctor_no', width: 90,hidden:true },	        
	        { label: 'doctor_name', name: 'doctor_name', width: 90,hidden:true },
	        { label: 'reporter', name: 'reporter', width: 90,hidden:true },
	        { label: 'reporter_name', name: 'reporter_name', width: 90,hidden:true },	        
	        { label: 'report', name: 'report', width: 90,hidden:true },
	        { label: 'complaint', name: 'complaint', width: 90,hidden:true },

	        
	        


	        
	    ],
	    viewrecords: true, // show the current page, data rang and total records on the toolbar
	    //caption: "病歷主檔",
	    onSelectRow:getSelectedRow,
	    ondblClickRow: function(rowId) {
	    	
        },
        width: null,
//        rowNum: arrayData.length,
	    shrinkToFit:false,
	    sortable: false,
//		pager: pagerName,
//		pagerpos:'left',
		loadComplete : function () {
			$(this).jqGrid('setSelection', 1, true);
		}
	});
	$(tableName).jqGrid('clearGridData');
	$(tableName).jqGrid('setGridParam', {search: false, postData: { "filters": ""},data: arrayData});
	$(tableName).setGridParam({rowNum:arrayData.length});
//	if(arrayData.length==1){
//		$(tableName).setGridParam({rowNum:50});
//	}
	$(tableName).trigger('reloadGrid');
	//$("#XrayList").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
	
	function getSelectedRow() {
		
	    var grid = $(tableName);
	    var rowKey = grid.jqGrid('getGridParam',"selrow");
	    if (rowKey){
	    	var xrayType = $(tableName).jqGrid('getCell',rowKey,'xray_type');
	    	var inpOpd = $(tableName).jqGrid('getCell',rowKey,'inp_opd');
	    	var viewDate = $(tableName).jqGrid('getCell',rowKey,'view_date');	    	
	    	var seqNo = $(tableName).jqGrid('getCell',rowKey,'seq_no');
	    	var serno = $(tableName).jqGrid('getCell',rowKey,'serno');
	    	var reporter = $(tableName).jqGrid('getCell',rowKey,'reporter');
	    	var reporter_name = $(tableName).jqGrid('getCell',rowKey,'reporter_name');
	    	var xray_name = $(tableName).jqGrid('getCell',rowKey,'xray_name');
	    	var doctor_no = $(tableName).jqGrid('getCell',rowKey,'doctor_no');
	    	var doctor_name = $(tableName).jqGrid('getCell',rowKey,'doctor_name');
	    	var complaint = $(tableName).jqGrid('getCell',rowKey,'complaint');
	    	var report = $(tableName).jqGrid('getCell',rowKey,'report');

	    	//影像報告Detail 
	    	$('#xray_ReportDate').html(formatDateTime(filterNull(viewDate))); //報告日期
			$('#xray_ReportMan').html(filterNull(reporter)+"&emsp;"+filterNull(reporter_name)); //報告人員
			$('#xray_ReportType').html(filterNull(xrayType)+"&emsp;"+filterNull(xray_name));//X光類別
			$('#xray_ReportDoctor').html(filterNull(doctor_no)+"&emsp;"+filterNull(doctor_name));//醫師
			$('#xray_dianoReason').html(filterNull(complaint));//醫囑原因
			$('#xray_findingReason').html(filterNull(report));//報告內容

	    	ajax_getXrayPosListData("XrayReportService",xrayType,inpOpd,viewDate,serno,seqNo);
			
	    	
	    		    		    
	    }
	    else{
	        alert("沒有資料被選擇");
	    }
	}
}



/**如果 影像清單為空 則清除暫存資料***/
function clearXrayData(){
	
	$('#xray_ReportDate').html(""); //報告日期
	$('#xray_ReportMan').html(""); //報告人員
	$('#xray_ReportType').html("");//X光類別
	$('#xray_ReportDoctor').html("");//醫師
	$('#xray_dianoReason').html("");//醫囑原因
	$('#xray_findingReason').html("");//報告內容
	//清除 照射位置 jqGird Data
	clearGridData("XrayPosList");//清除影像照射位置的jqGrid data
	
};


/**1070131 影像照射位置***/
function jqGrid_XrayPosList(tableName,pagerName,arrayData){
//	var RadioBgStyle  =  $(".RadioBgStyle").height();
//	var xrayDetailReasonHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+RadioBgStyle+330);
//	 $("#xrayDetailReason").css('min-height', xrayDetailReasonHeight +'px').css('max-height', xrayDetailReasonHeight +'px');
//	 var xrayBodyHeight =  userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+RadioBgStyle+30);
//	 $("#XrayListBody").css('min-height', (xrayBodyHeight) +'px').css('max-height', (xrayBodyHeight) +'px');
	$(tableName).jqGrid({
	    datatype: "local",
	    height: 100,
	    colModel: [
	        { label: '序', name: 'rec_count', width: 45,hidden:false },
	        { label: 'X光影像', name: 'access_no', width: 80,hidden:true,align:'center',formatter: function(cellvalue, options, rowobject){
//	            return '<button type="button"  onclick="showXrayBtnClick();" class="btn btn-primary btn-sm ButtonfontSize">'+ cellvalue +'</button>';
	            return '<button type="button"  onclick="showXrayBtnClick('+"\'"+cellvalue+"\'"+');" class="btn btn-link btn-img24 img24_Preview" title="'+cellvalue+'"></button>';
//	        	return '<button type="button"  onclick="XrayTypeBtnClick('+"\'" + rowobject.cat_type+"\'"+",\'"+rowobject.chart_no+"\'"+",\'"+rowobject.xray_type+"\'"+');"class="btn btn-primary btn-sm">'+ cellvalue +'</button>';
	        }},
	        
//	        { label: 'X光流水號', name: 'seq_no', width: 120},	        
	        { label: '照射位置', name: 'xray_pos', width: 110 },
	        { label: '部位角度名稱', name: 'angle_name', width: 240 },
	        { label: '片子種類', name: 'xray_size', width: 90},
	        { label: 'X光片尺寸', name: 'size_name', width: 100 },
	        { label: '片數', name: 'qty', width: 70 },
//	        { label: '廢片數量', name: 'bad_qty', width: 90 },
	        { label: 'access_no', name: 'access_no', width: 160,hidden:true },

	    ],
	    viewrecords: true, // show the current page, data rang and total records on the toolbar
	    //caption: "病歷主檔",
	    onSelectRow:getSelectedRow,
	    ondblClickRow: function(rowId) {
	    	
        },
        width: null,
//        rowNum:arrayData.length,
//        rowNum: Math.floor((pageHeight - 220)/33),
	    shrinkToFit:false,
//	    sortable: true,
//		pager: pagerName,
		pagerpos:'left',
		loadComplete : function () {
//			$(this).jqGrid('setSelection', 1, true);
		}
	});
	$(tableName).jqGrid('clearGridData');
	$(tableName).jqGrid('setGridParam', {search: false, postData: { "filters": ""},data: arrayData});
	$(tableName).setGridParam({rowNum:arrayData.length});
	$(tableName).trigger('reloadGrid');
	//$("#XrayList").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
	
	function getSelectedRow() {
		
	    var grid = $(tableName);
	    var rowKey = grid.jqGrid('getGridParam',"selrow");
	    if (rowKey){
	    	
	    	
	    		    		    
	    }
	    else{
//	        alert("沒有資料被選擇");
	    }
	}
}










