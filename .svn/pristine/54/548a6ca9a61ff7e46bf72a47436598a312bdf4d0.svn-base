/**
 * 護理紀錄畫面 專用 js檔
 */

$(document).ready(function(){
	
//	var PatientInfoBarHeight = $(".PatientInfoBar").height()>0?$(".PatientInfoBar").height():38;
//	var pageTabSwitchHeight = $("#ul-pageTabSwitch").height()>0?$("#ul-pageTabSwitch").height():57;
//    var FocusListHeadHeight = $("#FocusListHead").height();
//    var FocusTopDetailHeight = $("#FocusTopDetail").height();
//    var FocusListHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+70);
//
//    
//    var FocusDARTAreaHeight = ($(window).height())-(PatientInfoBarHeight+pageTabSwitchHeight+FocusListHeadHeight+FocusTopDetailHeight);
//	resizePanelBody("FocusDARTArea",FocusDARTAreaHeight);
//	
//	 if(userHeight<400){
//		 resizePanelBody("FocusDARTArea",($(window).height()-100)); 
//	 }else{
//		 resizePanelBody("FocusDARTArea",FocusDARTAreaHeight); 
//	 }
	
	var FocusListHeight = userHeight - (38+57+20);
	resizePanelBody("FocusRightBody",(FocusListHeight)); 
	resizePanelBody("FocusDARTArea",(FocusListHeight-200));
	resizePanelBody("scrollBody-DART",(FocusListHeight-160));
	
	$("#focusAddContent").hide();
	ajax_getSamplePersonList("NoteSampleNurService"); //取得範本人員清單
	//取得片語清單
	
	

	
});


var focusFlagObj = {
		addOrEdit:""
			}

/**1070727 add by IvyLin ↓ **/

/**取得範本人員清單**/
function FocusSamplePersonList(empNo,sessionID,method){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.method = method;
};


/**取得範本人員 類別**/
function FocusSamplePersonDetailList(empNo,sessionID,noteEmpNo,method){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.noteEmpNo = noteEmpNo;
	this.method = method;
};

/**取得片語 類別清單**/
function FocusPhraseTypeList(empNo,sessionID,phraseEmpNo,method){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.phraseEmpNo = phraseEmpNo;
	this.method = method;
};

/**取得片語資料**/
function FocusPhraseTypeDataList(empNo,sessionID,phraseEmpNo,type,method){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.phraseEmpNo = phraseEmpNo;
	this.type = type;
	this.method = method;
};

/**1070727 add by IvyLin ↑ **/

//Focus 查詢清單
function FocusListInputObj(empNo,sessionID,chartNo,serno,method){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.chartNo = chartNo;
	this.serno = serno;
	this.method = method;
};

//Focus CRUD Obj物件
function FocusCRUDInputObj(empNo,sessionID,dataParameters,method){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.dataParameters = dataParameters;
	this.method = method;
	
}

//Focus dataParameters 新增 (參數尚未確定) 
function FocusInsertParameterInputObj(chart_no,serno,progress_date,progress_time,focus_txt,content_d,content_a,content_r,content_t,memo,keyin_clerk){                                                     
	this.chart_no = chart_no;
	this.serno = serno;
	this.progress_date = progress_date;
	this.progress_time = progress_time;
	this.focus_txt = focus_txt;
	this.content_d = content_d;
	this.content_a = content_a;
	this.content_r = content_r;
	this.content_t = content_t;
	this.memo = memo;
	this.keyin_clerk = keyin_clerk;	
}

//Focus dataParameters 編輯 (參數尚未確定)
function FocusUpdateParameterInputObj(chart_no,serno,progress_date,progress_time,focus_txt,content_d,content_a,content_r,content_t,memo,modify_clerk){                                                     
	this.chart_no = chart_no;
	this.serno = serno;
	this.progress_date = progress_date;
	this.progress_time = progress_time;
	this.focus_txt = focus_txt;
	this.content_d = content_d;
	this.content_a = content_a;
	this.content_r = content_r;
	this.content_t = content_t;
	this.memo = memo;
	this.modify_clerk = modify_clerk;	
}

//Focus dataParameters  刪除 (參數尚未確定)
function FocusDeleteParmeterInputObj(chart_no,serno,progress_date,progress_time){
	this.chart_no = chart_no;
	this.serno = serno;
	this.progress_date = progress_date;
	this.progress_time = progress_time;
	
}



function renderFocus(){
			
	ajax_getFocusList("NurseProgressService");
	
	
}

/**ajax 取得範本人員清單
 * ***/
function  ajax_getSamplePersonList(serviceName){
    var box='';
	var cmParam = new FocusSamplePersonList(PatInfoObj.empNo,PatInfoObj.sessionID,"getEmpListFromNoteSampleNur"); //取得範本人員清單

	var PersonArray = [];
	$.when(ajax_Post(serviceName,JSON.stringify(cmParam))).done(function(dataList){			
		if (dataList.status == "Success") {
			$.each(dataList.resultSet, function(index, obj) {
				box+= '<option value='+obj.emp_no+'>'+obj.emp_no+" "+obj.emp_name+'</option>';
				PersonArray.push(obj);
			});			
			$("#samplerSelect").html(box);
			
			ajax_getSamplePersonDetailList("NoteSampleNurService",PersonArray[0]["emp_no"]); //預設帶第一筆
			
			$("#samplerSelect").change(function() {
				ajax_getSamplePersonDetailList("NoteSampleNurService",$(this).val());
				
			});
			
		} else {
			var ajaxErrMsg = dataList.errorMessage;
			$("#sampleTypeSelect").html("");
			PersonArray = [];
			

		}				

	});
	
	
}

/***
 * 取得範本人員詳細清單
 * */
function  ajax_getSamplePersonDetailList(serviceName,noteEmpNo){
    var box='';
	var cmParam = new FocusSamplePersonDetailList(PatInfoObj.empNo,PatInfoObj.sessionID,noteEmpNo,"getNoteSampleNurByEmpNo"); //取得範本人員清單

	var SamplePersonArray = [];
	$.when(ajax_Post(serviceName,JSON.stringify(cmParam))).done(function(dataList){			
		if (dataList.status == "Success") {
			$.each(dataList.resultSet, function(index, obj) {
				box+= '<option value='+obj.kind_no+'>'+obj.kind_no+'</option>';
				SamplePersonArray.push(obj);
			});			
			$("#sampleTypeSelect").html(box);
			$("#sample_D").html(SamplePersonArray[0]['sample_d']);
			$("#sample_A").html(SamplePersonArray[0]['sample_a']);
			$("#sample_R").html(SamplePersonArray[0]['sample_r']);
			$("#sample_T").html(SamplePersonArray[0]['sample_t']);
			$("#sample_Z").html('');
			
			
			$("#sampleTypeSelect").change(function() {
				var index = parseInt(this.selectedIndex); // index 轉出來會變成字串 所以要轉型為 int
		
				$("#sample_D").html(SamplePersonArray[index]['sample_d']);
				$("#sample_A").html(SamplePersonArray[index]['sample_a']);
				$("#sample_R").html(SamplePersonArray[index]['sample_r']);
				$("#sample_T").html(SamplePersonArray[index]['sample_t']);
				
			});
			
		} else {
			var ajaxErrMsg = dataList.errorMessage;
			SamplePersonArray = [];
			$("#sampleTypeSelect").html("");
			$("#sample_D").html("");
			$("#sample_A").html("");
			$("#sample_R").html("");
			$("#sample_T").html("");
			
			

		}				

	});
	
	
};



/*** CRUD ajax ***/
//查詢清單
var ajax_getFocusList = function(serviceName){
//	
	var cmParam = new FocusListInputObj(PatInfoObj.empNo,PatInfoObj.sessionID,PatInfoObj.chartNo,PatInfoObj.serno,"getNurseProgressByChartNoSerno");

	var FocusArray = [];
	$.when(ajax_Post(serviceName,JSON.stringify(cmParam))).done(function(dataList){			
		if (dataList.status == "Success") {
			$.each(dataList.resultSet, function(index, obj) {		
				FocusArray.push(obj);
			});
			
			jqGrid_focusList("#FocusList","#FocusList_Pager",FocusArray);
			$("#btnCopyPreOne").prop('disabled', false);
		
			
			
		} else {
			var ajaxErrMsg = dataList.errorMessage;
			noDataFound(ajaxErrMsg,"FocusList");
			clearFocusDetailData();
			//暫放 
			FocusArray = [];
			jqGrid_focusList("#FocusList","#FocusList_Pager",FocusArray);
	    	//清空暫存 右側畫面資料
			$("#btnCopyPreOne").prop('disabled', true);

		}				

	});
	
	
};

/** ajax 新增 Focus 記錄 (尚未接API) 1070723 add
 * @serviceName 尚未定義
 * @method 尚未定義
 * */
function ajax_insertFocus(serviceName){
	
	   var progress_date= $("#inputProgressDate").val();    
	   progress_date = replaceAll(progress_date,"/",'');
	    
		var progress_time = $("#inputProgressTime").val();	
		progress_time = replaceAll(progress_time,":",'');
		
		var focus_txt = $("#inputFocusTxt").val();
		var content_d = $("#input-contentD").val();
		var content_a = $("#input-contentA").val();
		var content_r = $("#input-contentR").val();
		var content_t = $("#input-contentT").val();
		var memo = $("#input-contentZ").val();
		var keyin_clerk = PatInfoObj.empNo;
					
		var dataParameters = new FocusInsertParameterInputObj(parseInt(PatInfoObj.chartNo),parseInt(PatInfoObj.serno),progress_date,progress_time,
				focus_txt,content_d,content_a,content_r,content_t,memo,keyin_clerk);
		
		var insertFocusParm = new FocusCRUDInputObj(PatInfoObj.empNo,parseInt(PatInfoObj.sessionID),dataParameters,"method");
		console.log(JSON.stringify(insertFocusParm));
		//正式接API時 再將 註解開啟
		/**$.when(ajax_Post(serviceName,JSON.stringify(insertFocusParm))).done(
				function(data) {
		
						if (data.status == "Success") {
							
							//如果新增成功則呼叫 查詢API
							
						} else {
							var ajaxErrMsg = data.errorMessage;
							alert(" 新增失敗 "+ajaxErrMsg);
						}									
				
				});**/
		
	}

/** ajax 編輯 Focus 記錄 (尚未接API) 1070723 add
 * @serviceName 尚未定義
 * @method 尚未定義
 * */
function ajax_UpdateFocus(serviceName){
	
	   var progress_date= $("#inputProgressDate").val();    
	   progress_date = replaceAll(progress_date,"/",'');
	    
		var progress_time = $("#inputProgressTime").val();	
		progress_time = replaceAll(progress_time,":",'');
		
		var focus_txt = $("#inputFocusTxt").val();
		var content_d = $("#input-contentD").val();
		var content_a = $("#input-contentA").val();
		var content_r = $("#input-contentR").val();
		var content_t = $("#input-contentT").val();
		var memo = $("#input-contentZ").val();
		var modify_clerk = PatInfoObj.empNo;
					
		var dataParameters = new FocusUpdateParameterInputObj(parseInt(PatInfoObj.chartNo),parseInt(PatInfoObj.serno),progress_date,progress_time,
				focus_txt,content_d,content_a,content_r,content_t,memo,modify_clerk);
		
		var updateFocusParm = new FocusCRUDInputObj(PatInfoObj.empNo,parseInt(PatInfoObj.sessionID),dataParameters,"method");
		console.log(JSON.stringify(updateFocusParm));
		//正式接API時 再將 註解開啟
		/**$.when(ajax_Post(serviceName,JSON.stringify(updateFocusParm))).done(
				function(data) {
		
						if (data.status == "Success") {
							
							//如果新增成功則呼叫 查詢API
							
						} else {
							var ajaxErrMsg = data.errorMessage;
							alert(" 修改失敗 "+ajaxErrMsg);
						}									
				
				});**/
		
	}

/** ajax 刪除 Focus 記錄 (尚未接API) 1070723 add 
 * @serviceName 尚未定義
 * @method 尚未定義
 * **/
function ajax_deleteFocus(serviceName,progress_date,progress_time){
	
	var dataParameters = new FocusDeleteParmeterInputObj(parseInt(PatInfoObj.chartNo),parseInt(PatInfoObj.serno),progress_date,progress_time);
	
	var deleteFocusParm = new FocusCRUDInputObj(PatInfoObj.empNo,parseInt(PatInfoObj.sessionID),dataParameters,"method");
	console.log("刪除");
	console.log(JSON.stringify(deleteFocusParm));
	/**$.when(ajax_Post(serviceName,JSON.stringify(deleteFocusParm))).done(
			function(data) {
	
					if (data.status == "Success") {
						//如果成功刪除 則呼叫 查詢API 
													
						
					} else {
						var ajaxErrMsg = data.errorMessage;
						alert("刪除失敗 "+ajaxErrMsg);
//						console.log("Delete Focus:"+data.status);
					}				
			
			});**/
	
}



/***使用者點擊的 Grid position**/
function getFocusListPosition(gridId){
	var grid = $(gridId);
	var rowKey = grid.jqGrid('getGridParam',"selrow");
	return rowKey;
}




/**Focus **/
//var selectedRows = {};

function jqGrid_focusList(tableName,pagerName,arrayData){	
	var focusGridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+70);
//	resizePanelBody("FocusRightBody",(focusGridHeight+40)); 
	var tableGrid = $(tableName);
	$(tableName).jqGrid({
	    datatype: "local",
//	    height: Math.floor($(window).height()-255),
	    height:focusGridHeight,
	    colModel: [
//	        { label: '年份', name: 'years', width: 50 },
	   	 { label: '編', name: 'keyin_clerk', width: 45,align:'center',hidden:false,frozen:true,formatter: function(cellvalue, options, rowobject){
//	            return '<img src="/TanTimaServices/css/img/modify_36.png" onclick="editFocusBtn('+"\'"+rowobject.progress_date+"\',"+"\'"+rowobject.progress_time+"\',"+"\'"+rowobject.focus_txt+"\',"+"\'"+rowobject.content_d+"\',"+"\'"+rowobject.content_a+"\',"+"\'"+rowobject.content_r+"\',"+"\'"+rowobject.content_t+"\',"+"\'"+rowobject.memo+"\',"+"\'"+rowobject.keyin_clerk+"\'"+');" class="toolbar-img-style  alt="修改" title="修改"/>';	     
	   		 return '<img src="/TanTimaServices/css/img/modify_36.png" onclick="editFocusBtn('+"\'"+rowobject.progress_date+"\',"+"\'"+rowobject.progress_time+"\',"+"\'"+rowobject.focus_txt+"\',"+"\'"+rowobject.keyin_clerk+"\'"+');" class="toolbar-img-style  alt="修改" title="修改"/>';   
	   	 }},//編輯button
	        { label: '刪', name: 'keyin_clerk', width: 45,align:'center',hidden:false,frozen:true,formatter: function(cellvalue, options, rowobject){
	        	if(rowobject.keyin_clerk!==PatInfoObj.empNo){
	        		return '<img src="/TanTimaServices/css/img/delete_36.png" onclick="deleteFocusBtn('+"\'"+rowobject.keyin_clerk+"\',"+"\'"+rowobject.progress_date+"\',"+"\'"+rowobject.progress_time+"\'"+');" class="toolbar-img-style  alt="刪除" title="刪除"/>';
	        	}else{
	        		 return '<img src="/TanTimaServices/css/img/delete_36.png"  onclick="deleteFocusBtn('+"\'"+rowobject.keyin_clerk+"\',"+"\'"+rowobject.progress_date+"\',"+"\'"+rowobject.progress_time+"\'"+');" class="toolbar-img-style  alt="刪除" title="刪除"/>';
//	        		 return '<img src="/TanTimaServices/css/img/delete_36.png" data-toggle="modal" data-target="#Modal_DeleteTPR" onclick="deleteTPRBtn('+"\'"+rowobject.keyin_clerk+"\',"+"\'"+rowobject.assess_date+"\',"+"\'"+rowobject.assess_time+"\'"+');" class="toolbar-img-style delete-tpr alt="刪除" title="刪除"/>';
	        	}
	           	     
	        }},//delete button
	        { label: 'Date', name: 'progress_date', width: 115,formatter: formatDateTime },
	        { label: 'Time', name: 'progress_time', width: 105,formatter: formatDateTime},
	        { label: 'Focus', name: 'focus_txt', width: 120},
	        { label: '住院序號', name: 'serno', width: 50,hidden:true},
	        { label: 'D', name: 'content_d', width: 50,hidden:true},
	        { label: 'A', name: 'content_a', width: 50,hidden:true},
	        { label: 'R', name: 'content_r', width: 50,hidden:true},
	        { label: 'T', name: 'content_t', width: 50,hidden:true},
	        { label: '醫師', name: 'order_dr', width: 50,hidden:true},
	        { label: '醫師', name: 'doctor_name', width: 50,hidden:true},
	        { label: '護士', name: 'keyin_clerk', width: 50,hidden:true},
	        { label: '護士', name: 'keyin_clerk_name', width: 50,hidden:true},
	        { label: 'chart_no', name: 'chart_no', width: 50,hidden:true},
	        { label: 'serno', name: 'serno', width: 50,hidden:true},
	        { label: 'focus_no', name: 'focus_no', width: 50,hidden:true},
	        { label: 'end_date', name: 'end_date', width: 50,hidden:true},
	        { label: 'end_time', name: 'end_time', width: 50,hidden:true},
	        { label: 'stop_reason', name: 'stop_reason', width: 50,hidden:true},
	        { label: 'memo', name: 'memo', width: 50,hidden:true},

	    ],
	    viewrecords: true, // show the current page, data rang and total records on the toolbar
	    onSelectRow:getSelectedRow,
	    pagerpos:'left',
//	    width: null,
//	    shrinkToFit: true,
//	    sortable:true,  //可否拖曳排序
//	    caption: "Focus護理紀錄",
//		pager: pagerName,
		gridComplete: function () {

			$(this).jqGrid('setSelection', 1, true);
        }
                
	});
//	$(tableName).jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false});
//	searchOperators:true,defaultSearch: "cn"
	$(tableName).jqGrid('clearGridData');
	$(tableName).jqGrid('setGridParam', {data: arrayData});
	$(tableName).setGridParam({rowNum:arrayData.length});
	$(tableName).trigger('reloadGrid');
//	$('#currentList').show();
//	$('#chartBaseList').hide();
	
	function getSelectedRow() {
		
		 var grid = $(tableName);
		 var rowKey = grid.jqGrid('getGridParam',"selrow");
		
		if(rowKey){
//			console.log('點擊第'+rowKey+'筆');
			//護士
//			var keyin_clerk = $(tableName).jqGrid('getCell',rowKey,'keyin_clerk');
			var keyin_clerk_name = $(tableName).jqGrid('getCell',rowKey,'keyin_clerk_name');
			
			//醫師
			var doctor_name =  $(tableName).jqGrid('getCell',rowKey,'doctor_name');
			
	    	var progressDate = $(tableName).jqGrid('getCell',rowKey,'progress_date');	    	
	    	var progressTime = $(tableName).jqGrid('getCell',rowKey,'progress_time');
	    	var focus = $(tableName).jqGrid('getCell',rowKey,'focus_txt');
	    	var content_d = $(tableName).jqGrid('getCell',rowKey,'content_d');
	    	var content_a = $(tableName).jqGrid('getCell',rowKey,'content_a');
	    	var content_r = $(tableName).jqGrid('getCell',rowKey,'content_r'); 
	    	var content_t = $(tableName).jqGrid('getCell',rowKey,'content_t');
	    	var memo = $(tableName).jqGrid('getCell',rowKey,'memo');
	    	
	    	setFocusData("focusNurse",filterNull(keyin_clerk_name));
	    	setFocusData("focusDoctor",filterNull(doctor_name));
	    	
			setFocusData("focusDate",filterNull(progressDate));
			setFocusData("focusTime",filterNull(progressTime));
			setFocusData("focusNote",filterNull(focus));
			
			
			setFocusData("content_D",filterNull(content_d));
			setFocusData("content_A",filterNull(content_a));
			setFocusData("content_R",filterNull(content_r));
			setFocusData("content_T",filterNull(content_t));
			setFocusData("memo",filterNull(memo));
			
			
			if(focusFlagObj.addOrEdit="Edit"){ //如果使用者點下 編輯按鈕 則將該行的rowData 分別設定給 Dartz input 框 
				$("#input-contentD").val(filterNull(content_d));
				$("#input-contentA").val(filterNull(content_a));
				$("#input-contentR").val(filterNull(content_r));
				$("#input-contentT").val(filterNull(content_t));
				$("#input-contentZ").val(filterNull(memo));
			}
			
			
			

			
	    	

		}else{
//			 alert("沒有資料被選擇");
		}
		
	}  	
}

//設定 Focus 護理紀錄 DART內文  for html()
function setFocusData(tag,data){  
	document.getElementById(tag).innerText=data
}


//取得護理紀錄 畫面右側資料 
var clearFocusDetailData = function(){
	
	$('#focusNurse').html(""); //護士
	$('#focusDate').html(""); //日期
	$('#focusTime').html("");//時間
	$('#focusDoctor').html("");//訪視醫師
	$('#focusNote').html("");//focus	
	$('#content_D').html("");//內容D
	$('#content_A').html("");//內容A
	$('#content_R').html("");//內容R
	$('#content_T').html("");//內容T
	$('#memo').html("");//備註 memo	
};


/***1070719 CRUD ***/
var dartzList = [
	{type:'D',phrase:'病人胃痛'},
	{type:'D',phrase:'病人頭痛'},
	{type:'D',phrase:'病人牙痛'},
	{type:'D',phrase:'病人眼睛痛'},
	{type:'D',phrase:'病人鼻塞'},
	{type:'D',phrase:'病人心絞痛'},
	{type:'A',phrase:'讓病人吃胃藥'},
	{type:'A',phrase:'讓病人吃頭痛藥'},
	{type:'A',phrase:'讓病人吃止痛藥'},
	{type:'A',phrase:'讓病人滴眼藥水'},
	{type:'A',phrase:'讓病人服用阿斯匹林'},
	{type:'A',phrase:'讓病人吊點滴'},
	{type:'R',phrase:'服完胃藥病人得到舒緩'},
	{type:'R',phrase:'服完頭痛藥病人不再暈眩'},
	{type:'R',phrase:'滴完眼藥水病人視力變得清晰'},
	{type:'R',phrase:'病人體溫下降至37.1'},
	{type:'R',phrase:'病人吊完點滴紅血球恢復正常數值'},
	{type:'R',phrase:'病人心跳恢復正常，不再忽快忽慢'},
	{type:'T',phrase:'叮嚀病人少吃烤炸辣刺激性食物'},
	{type:'T',phrase:'請病人多溫喝水'},
	{type:'T',phrase:'教導病人少滑手機，讓眼睛適當休息'},
	{type:'T',phrase:'勸病人少喝含咖啡因的飲料'},
	{type:'T',phrase:'請病人回家熱敷'},
	{type:'T',phrase:'教導病人按摩眼窩'},
	{type:'Z',phrase:'病人會咬人'},
	{type:'Z',phrase:'病人有夢遊症'},
	{type:'Z',phrase:'病人會打人'},
	
];

/**
 * Dartz 片語視窗 清單  
 * ***/
function jqGrid_dartzList(tableName,arrayData){	
	var tableGrid = $(tableName);
	$(tableName).jqGrid({
	    datatype: "local",
	    height: 320,
	    colModel: [
	    	{ label: 'type', name: 'type', width: 50,hidden:false},
	        { label: 'phrase', name: 'phrase', width: 500,hidden:false},

	    ],
	    viewrecords: true, // show the current page, data rang and total records on the toolbar
	    onSelectRow:getSelectedRow,
	    pagerpos:'left',
		gridComplete: function () {

//			$(this).jqGrid('setSelection', 1, true);
        }
                
	});
	$(tableName).jqGrid('clearGridData');
	$(tableName).jqGrid('setGridParam', {data: arrayData});
	$(tableName).setGridParam({rowNum:arrayData.length});
	$(tableName).trigger('reloadGrid');

	function getSelectedRow() {
		
		 var grid = $(tableName);
		 var rowKey = grid.jqGrid('getGridParam',"selrow");
		 
		
		if(rowKey){
		   var phrase = $(tableName).jqGrid('getCell',rowKey,'phrase');
		   
		}else{
//			 alert("沒有資料被選擇");
		}
		
	}  	
}

var focusTxtList = [
	{focus_no:1,focus_txt:'自然產'},
	{focus_no:2,focus_txt:'轉入'},
	{focus_no:3,focus_txt:'剖腹產'},
	{focus_no:4,focus_txt:'婦科手術'},
	{focus_no:5,focus_txt:'乳房手術'},
	{focus_no:6,focus_txt:'術前準備'},
	{focus_no:7,focus_txt:'移除尿管'},
	{focus_no:8,focus_txt:'低血紅素'},
	{focus_no:9,focus_txt:'脹氣'},
	{focus_no:10,focus_txt:'移除引流管'},
	{focus_no:11,focus_txt:'紅疹'},
	{focus_no:12,focus_txt:'請假'},
	{focus_no:13,focus_txt:'安胎'},
	{focus_no:14,focus_txt:'哺乳'},
	{focus_no:15,focus_txt:'脹奶'},
	
];

/**
 * 問題或診斷 視窗 清單  
 * ***/
function jqGrid_focusTxtList(tableName,arrayData){	
	var tableGrid = $(tableName);
	$(tableName).jqGrid({
	    datatype: "local",
	    height: 330,
	    colModel: [
	    	{ label: 'focus_no', name: 'focus_no', width: 50,hidden:true},
	        { label: '問題或診斷', name: 'focus_txt', width: 500,hidden:false},

	    ],
	    viewrecords: true, // show the current page, data rang and total records on the toolbar
	    onSelectRow:getSelectedRow,
	    pagerpos:'left',
		gridComplete: function () {

//			$(this).jqGrid('setSelection', 1, true);
        }
                
	});
	$(tableName).jqGrid('clearGridData');
	$(tableName).jqGrid('setGridParam', {data: arrayData});
	$(tableName).setGridParam({rowNum:arrayData.length});
	$(tableName).trigger('reloadGrid');

	function getSelectedRow() {
		
		 var grid = $(tableName);
		 var rowKey = grid.jqGrid('getGridParam',"selrow");
		 
		
		if(rowKey){
		   var focusTxt = $(tableName).jqGrid('getCell',rowKey,'focus_txt');
		   
		}else{
//			 alert("沒有資料被選擇");
		}
		
	}  	
}


/***表格cell 編輯按鈕 Focus**/
function editFocusBtn(progressDate,progressTime,focus,keyin_clerk){
	
	
	if(PatInfoObj.empNo=="orcl"){ //keyin_clerk!==PatInfoObj.empNo  正式接API後須改回
//		alert("您並非 "+keyin_clerk+" 輸入者， 無修改權限");
	}else{
		focusFlagObj.addOrEdit="Edit"; //編輯狀態	
		progressDate = replaceAll(progressDate,"/",'');
		progressTime = replaceAll(progressTime,":",'');
	    
		$("#inputProgressDate").val((progressDate));
		$("#inputProgressTime").val((progressTime));

		
		$("#inputFocusTxt").val(filterNull(focus));
		

		$("#focusAddContent").show();
		$("#FocusCol").hide();
		$("#AddFocusHead").html("編輯 DART 記錄");
		
	}
	
	
	
}

/*** 表格cell 刪除按鈕 Focus***/
function deleteFocusBtn(keyin_clerk,progress_date,progress_time){
	

	if(PatInfoObj.empNo=="orcl"){  //keyin_clerk!==PatInfoObj.empNo  正式接API後須改回
		
//		alert("您並非 "+keyin_clerk+" 輸入者， 無刪除權限");
	}else{
		
		$('#showFocusDelDate').html(progress_date);
		$('#showFocusDelTime').html(progress_time);
		 
		$("#deleteFocusDiv").dialog({
           closeOnEscape: true,
		   title:"刪除 DART 記錄",
		   height: 230,
		   width:400,
		   modal: true,           
           draggable: true,
           resizable: true,
		   buttons:[
		   { 'id':'dialogBtnDelFocus',
			 'text':"確定",
			 'class': 'btn btn-primary btn-OK',
			 'click':function(){
				 progress_date = replaceAll(progress_date,"/",'');
				 progress_time = replaceAll(progress_time,":",'');
				 //呼叫 刪除 DART的 Method 尚未定義
				 ajax_deleteFocus("serviceName",progress_date,progress_time);
				 
                 $(this).dialog("close");//關閉視窗
			 },
			 'style':'overflow: hidden;'
			   
		   },
		   { 'id':'dialogBtnCancelFocus',
				 'text':"取消",
				 'class': 'btn btn-primary',
				 'click':function(){
	                 $(this).dialog("close");
				 },
				 'style':'overflow: hidden;'
				   
			   }
			   ]
          
    });

//		alert('開啟DART刪除提示視窗');	
	}
	
}

function initFocusInputData(){
//	$("#inputProgressDate").val("");
//	$("#inputProgressTime").val("");
	$('#inputFocusTxt').val("");//問題或診斷
	$('#input-contentD').val("");//D
	$('#input-contentA').val("");//A	
	$('#input-contentR').val("");//R
	$('#input-contentT').val("");//T
	$('#input-contentZ').val("");//Z
	
//	$('#content_T').html("");//內容T
//	$('#memo').html("");//備註 memo	
}



/**
 * 新增一筆 Focus 按鈕 Click監聽器 自動帶入 日期時間
 * */
$('#btnAddFocus').click(function(){ 
	   $("#FocusCol").hide();
	   $("#focusAddContent").show();
	   $("#AddFocusHead").html("新增 DART 記錄");
	   focusFlagObj.addOrEdit="Add";
	   initFocusInputData();
	   $("#inputProgressDate").val(getRightNowDate());
	   $("#inputProgressTime").val(getRightNowTimeSecond());
	 			
	});


/**新增 複製上一筆記錄***/
function getCopyItemFromGrid(tableName){
	 var grid = $(tableName);
	 var rowKey = grid.jqGrid('getGridParam',"selrow");
	 if(rowKey){
		    var focus = $(tableName).jqGrid('getCell',rowKey,'focus_txt');
			var content_d = $(tableName).jqGrid('getCell',rowKey,'content_d');
			var content_a = $(tableName).jqGrid('getCell',rowKey,'content_a');
			var content_r = $(tableName).jqGrid('getCell',rowKey,'content_r'); 
			var content_t = $(tableName).jqGrid('getCell',rowKey,'content_t');
			var memo = $(tableName).jqGrid('getCell',rowKey,'memo'); 
			$("#inputProgressDate").val(getRightNowDate());
			$("#inputProgressTime").val(getRightNowTimeSecond());
			$("#inputFocusTxt").val(focus);
			$("#input-contentD").val(content_d);
			$("#input-contentA").val(content_a);
			$("#input-contentR").val(content_r);
			$("#input-contentT").val(content_t);
			$("#input-contentZ").val(memo);
		
	 }
	
}

/**
 * Copy上一筆記錄
 * */
$('#btnCopyPreOne').click(function(){ 
	   $("#FocusCol").hide();
	   $("#focusAddContent").show();
	   $("#AddFocusHead").html("新增 DART 記錄");
	   focusFlagObj.addOrEdit="Add";
	   getCopyItemFromGrid("#FocusList");
	 
	   
			
	});

/**
 * 取消按鈕 (新增/編輯)
 * ***/
$('#btnFocusCancel').click(function(){ 
	   $("#FocusCol").show();
	   $("#focusAddContent").hide();
	   initFocusInputData();
	   
			
	});

/**
 * 送出按鈕 (新增/編輯)
 * */
$('#btnFocusSend').click(function(){ 
	   
	   if(focusFlagObj.addOrEdit=="Add"){ //呼叫 新增 API
		   console.log(focusFlagObj.addOrEdit);
		   ajax_insertFocus();
	   }else{//呼叫 編輯 API
		   console.log(focusFlagObj.addOrEdit);
		   ajax_UpdateFocus();
	   }
	   
	   $("#focusAddContent").hide();
	   $("#FocusCol").show();
	   initFocusInputData();
	   			
	});

/****
 * 取得使用者 點擊 問題或診斷清單的 jqGrid cellValue 
 * */

function getFocusTxtCellValue(){
	var grid = $("#focusTxtList");
	var rowKey = grid.jqGrid('getGridParam',"selrow");
	var focusTxt = '';
	if(rowKey){
	    focusTxt = grid.jqGrid('getCell',rowKey,'focus_txt');	
	}else{
		focusTxt = '';
	}
	
	return focusTxt;
}


/**
 * 開啟 問題或診斷清單 Dialog  將資料接成 jqGrid表格  (API 尚未有資料 )
 * ***/
$('#openFocusTxtList').click(function(){
	//先給定 jqGrid 資料，再開啟 Dialog 畫面 讓使用者選擇
	jqGrid_focusTxtList("#focusTxtList",focusTxtList);
	
	$("#focusTxtListDialog").dialog({
        closeOnEscape: true,
		   title:"問題或診斷視窗",
		   height: 500,
		   width:530,
		   modal: true,           
        draggable: true,
        resizable: true,
		   buttons:[
		   { 'id':'btnFocusTxtOk',
			 'text':"確定",
			 'class': 'btn btn-primary btn-OK',
			 'click':function(){
			  $("#inputFocusTxt").val(getFocusTxtCellValue());  	      
              $(this).dialog("close");//關閉視窗
			 },
			 'style':'overflow: hidden;'
			   
		   },
		   { 'id':'btnFocusTxtCancel',
				 'text':"取消",
				 'class': 'btn btn-primary',
				 'click':function(){
	                 $(this).dialog("close");
				 },
				 'style':'overflow: hidden;'
				   
	       }
			   ]
       
 });
});

/**
 * 開啟 範本/片語 視窗 按鈕 
 * */
$('#btnDartzDemo').click(function(){
	
	jqGrid_dartzList("#dartzList",dartzList);
	filterList_single("dartzList","type",$("#dartzSelect").val());	
	
	$("#phraseSampleDialog").dialog({
        closeOnEscape: true,
		   title:"片語視窗",
		   height: 600,
		   width:600,
		   modal: true,           
        draggable: true,
        resizable: true,
//		   buttons:[
//		   { 'id':'btnSampleOk',
//			 'text':"帶入",
//			 'class': 'btn btn-primary btn-OK',
//			 'click':function(){
//				//將資料帶進 DARTZ 問題或診斷的 html中
//       	      
//              $(this).dialog("close");//關閉視窗
//			 },
//			 'style':'overflow: hidden;'
//			   
//		   },
//		   { 'id':'btnSampleCancel',
//				 'text':"放棄",
//				 'class': 'btn btn-primary',
//				 'click':function(){
//	                 $(this).dialog("close");
//				 },
//				 'style':'overflow: hidden;'
//				   
//			   }
//			   ]
       
 });
	     			
	});

/**監聽器 select change **/
$("#sampleTypeSelect").change(function() {
	
	$("#sample_D").html('');
	$("#sample_A").html('');
	$("#sample_R").html('');
	$("#sample_T").html('');
	$("#sample_Z").html('');
	
	
	
});

/**
 * 片語 DARTZ select change 監聽器 
 * **/
$("#dartzSelect").change(function() {
	
	filterList_single("dartzList","type",$(this).val());	
});



/**範本文字 DARTZ 帶入按鈕
 * ***/
$('#btnSampleOk').click(function(){ 
	
	$("#inputFocusTxt").val($("#sampleTypeSelect").val()); //問題或診斷 DARTZ
	$("#input-contentD").val($("#sample_D").html());
	$("#input-contentA").val($("#sample_A").html());
	$("#input-contentR").val($("#sample_R").html());
	$("#input-contentT").val($("#sample_T").html());
	$("#input-contentZ").val($("#sample_Z").html());
	
	$("#phraseSampleDialog").dialog("close");
	   			
	});

/**片語 帶入按鈕
 * ***/
$('#btnPhraseOk').click(function(){ 
	
	 var grid = $("#dartzList");
	 var rowKey = grid.jqGrid('getGridParam',"selrow");
	 var phrase = '';
	 if(rowKey){
	     phrase = grid.jqGrid('getCell',rowKey,'phrase');	
	 }else{
		 phrase = '';
	 }
	
//	console.log($("#dartzSelect").val());
	
	switch($("#dartzSelect").val()){
	 case 'D':
     $("#input-contentD").val(phrase);
     break;
     
	 case 'A':
	 $("#input-contentA").val(phrase);
	 break;
	 
	 case 'R':
     $("#input-contentR").val(phrase);
     break;
     
	 case 'T':
	 $("#input-contentT").val(phrase);
	 break;
	 
	 case 'Z':
     $("#input-contentZ").val(phrase);
     break;
     default:
	}
	
	$("#phraseSampleDialog").dialog("close");
	   			
	});

/** 片語/範本 放棄按鈕 關閉視窗***/
$('.ClosePhraseSampleDialog').click(function(){ 
	
	$("#phraseSampleDialog").dialog("close");
	   			
	});



