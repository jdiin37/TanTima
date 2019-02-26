//LabRecordService
//{"empNo":"ORCL","sessionID":1,"chartNo":170869,"range":"1050601|1051230","method":"getLabListByChartNoDateRange"}
//四季台安
$(document).ready(function(){
	
	$('input[name=labRadio]:radio').unbind('change').bind('change', function(event) {
		var LABRadio = event.target;
		var LABRadioVal ="";
		if(LABRadio.checked){
			LABRadioVal = LABRadio.value;
//			console.log(LABRadioVal);
			
			if(LABRadioVal=="自訂"){
				var start = $("#inputLabSDate").val();
				var end = $("#inputLabEDate").val();
				var labCustomRange = start+"|"+ end;
				
				if(start.length==0||end.length==0){
					alert("請輸入正確的日期格式");
				}else{
//					setBlock(500);
					ajax_getLabList("LabRecordService",labCustomRange);
//					console.log("RadioValue Custom:"+xrayCustomRange);
				}
				
			}else {
//				setBlock(500);
				ajax_getLabList("LabRecordService",LABRadioVal);
//				console.log("RadioValue:"+radioValue);
			}


		}

	});
	
	
	$("#searchLabRange").on('click', function(event) {
		var start = $("#inputLabSDate").val();
		var end = $("#inputLabEDate").val();
		var labCustomRange = start+"|"+ end;
		if(start.length<7||end.length<7){
			alert("請輸入完整日期");
		}else{
			ajax_getLabList("LabRecordService",labCustomRange);
		}
		

		});	
	
	

//檢驗最外圍 RadioButton & Input 監聽器	
	$("#inputLabSDate").on('click', function(event) {
		var labRadio = $('input:radio[name="labRadio"]:checked').val();
//		$('input:radio[name="sumRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		if(labRadio!="自訂"){
			$('input:radio[name="labRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		}

		});	

	$("#inputLabEDate").on('click', function(event) {
		var labRadio = $('input:radio[name="labRadio"]:checked').val();
//		$('input:radio[name="sumRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		if(labRadio!="自訂"){
			$('input:radio[name="labRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		}

		});
	
	$('#inputLabSDate').unbind('change').bind('change', function(event) {
		
		/**民國年*/
		var y =(parseInt($(this).val().substring(0, 3))+1911);
		var m = $(this).val().substring(3, 5);
		var d = $(this).val().substring(5, 7);
		
		var radioValue = $('input:radio[name="labRadio"]:checked').val();
		var start = $("#inputLabSDate").val();
		var end = $("#inputLabEDate").val();
		var labCustomRange = start+"|"+ end;
		
		if(start.length==7&&end.length==7){
			if(moment(y+m+d+"","YYYYMMDD").isValid()){
				$(this).tooltip('destroy');
//				setBlock(500);
				ajax_getLabList("LabRecordService",labCustomRange);

			}else{
				$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');				
//				stateChange(false, '#inputSumSDate', "請輸入正確的日期格式");
			}
		}else{
			$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
//			stateChange(false, '#inputSumSDate', "請輸入正確的日期格式");
		}
		

		});	


	$('#inputLabEDate').unbind('change').bind('change', function(event) {
		
		/***民國年**/
		var y =(parseInt($(this).val().substring(0, 3))+1911);
		var m = $(this).val().substring(3, 5);
		var d = $(this).val().substring(5, 7);
		
		var radioValue = $('input:radio[name="labRadio"]:checked').val();
		var start = $("#inputLabSDate").val();
		var end = $("#inputLabEDate").val();
		var labCustomRange = start+"|"+ end;
		
		if(start.length==7&&end.length==7){
			if(moment(y+m+d+"","YYYYMMDD").isValid()){
				$(this).tooltip('destroy');
//				setBlock(500);
				ajax_getLabList("LabRecordService",labCustomRange);

			}else{
				$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
//				stateChange(false, '#inputSumSDate', "請輸入正確的日期格式");
			}
		}else{
			$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
//			stateChange(false, '#inputSumSDate', "請輸入正確的日期格式");
		}
		
		

		});		
	
	
	
	/**檢驗彙總 按鈕監聽器**/
	$("#btnLabSummary1").on('click', function(event) {
//		$('input:radio[name="labRadio"]:first').prop("checked", true).trigger('change');//預設1個月
		
		
		var labRadioChoice = $('input:radio[name="labRadio"]:checked').val();
		
		var startDate = $("#inputLabSDate").val();
		var endDate = $("#inputLabEDate").val();
		
		$("#inputSumSDate").val(startDate);
		$("#inputSumEDate").val(endDate);
		
		var kindId = getKindIdByLabList();
		var labItems = getLabItemByLabDataList();
//		console.log("kindId: "+kindId+";labItems: "+labItems);
		
		if(kindId==""||labItems==""){
			
			alert("請選擇檢驗項目");
			
		}else{
			
			if(labRadioChoice=="自訂"){
				if(startDate.length==0||endDate.length==0){
					
					alert("請輸入日期範圍");
				}else{
					var radioValue = $('input:radio[name=labRadio]:checked').val();
					
					setTimeout(function(){ 
						$('input:radio[name="sumRadio"]').val([radioValue]).trigger('change');
				    }, 200);
					
			    	
			    	$('#is_form > .active').next('li').find('a').trigger('click');

				}
			}else{

				var radioValue = $('input:radio[name=labRadio]:checked').val();

//		    	setTimeout(function(){ 
		    		$('input:radio[name="sumRadio"]').val([radioValue]).trigger('change');
//			    }, 200);
		    	
		    	$('#is_form > .active').next('li').find('a').trigger('click');

		    	
			}
			
		}	

	});
	
/**************檢驗 趨勢圖  自訂日期監聽器  1070521******************/

	
	
	$("#inputLabChartSDate").on('click', function(event) {
		var labRadio = $('input:radio[name="labChartRadio"]:checked').val();
//		$('input:radio[name="sumRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		if(labRadio!="自訂"){
			$('input:radio[name="labChartRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		}

		});	

	$("#inputLabChartEDate").on('click', function(event) {
		var labRadio = $('input:radio[name="labChartRadio"]:checked').val();
//		$('input:radio[name="sumRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		if(labRadio!="自訂"){
			$('input:radio[name="labChartRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		}

		});
	
	$('#inputLabChartSDate').unbind('change').bind('change', function(event) {
		
		/**民國年*/
		var y =(parseInt($(this).val().substring(0, 3))+1911);
		var m = $(this).val().substring(3, 5);
		var d = $(this).val().substring(5, 7);
		var startD = $("#inputLabChartSDate").val();
			if(startD.length==7){
				if(moment(y+m+d+"","YYYYMMDD").isValid()){
					$(this).tooltip('destroy');
					 showLineChartContent();//顯示趨勢圖
				     ajax_getLineChartData("LabRecordService","LabChart");

				}else{
					$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
				}
			}else{
				$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');

			}
			
			
			

		});	


	$('#inputLabChartEDate').unbind('change').bind('change', function(event) {
		
		/***民國年**/
		var y =(parseInt($(this).val().substring(0, 3))+1911);
		var m = $(this).val().substring(3, 5);
		var d = $(this).val().substring(5, 7);
		var endD = $("#inputLabChartEDate").val();
			if(endD.length==7){
				if(moment(y+m+d+"","YYYYMMDD").isValid()){
					$(this).tooltip('destroy');
					showLineChartContent();//顯示趨勢圖
				     ajax_getLineChartData("LabRecordService","LabChart");

				}else{
					
					$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
				}
			}else{
				$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
			}
	
		
			

		});	
	
/********* 檢驗彙總  趨勢圖  自訂日期監聽器  1070521 ↓*********/
	
	
	$("#inputLabSumChartSDate").on('click',function(event) {
		var labRadio = $('input:radio[name="labSumChartRadio"]:checked').val();
//		$('input:radio[name="sumRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		if(labRadio!="自訂"){
			$('input:radio[name="labSumChartRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		}

		});	

	$("#inputLabSumChartEDate").on('click', function(event) {
		var labRadio = $('input:radio[name="labSumChartRadio"]:checked').val();
//		$('input:radio[name="sumRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		if(labRadio!="自訂"){
			$('input:radio[name="labSumChartRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		}

		});
	
	$('#inputLabSumChartSDate').unbind('change').bind('change', function(event) {
		
		/**民國年*/
		var y =(parseInt($(this).val().substring(0, 3))+1911);
		var m = $(this).val().substring(3, 5);
		var d = $(this).val().substring(5, 7);
		var startD = $("#inputLabSumChartSDate").val();
			if(startD.length==7){
				if(moment(y+m+d+"","YYYYMMDD").isValid()){
					$(this).tooltip('destroy');
					showSumLineChartContent();//顯示趨勢圖
				     ajax_getLineChartData("LabRecordService","LabSum");

				}else{
					$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
				}
			}else{
				$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
			}
			
			

		

		});	


	$('#inputLabSumChartEDate').unbind('change').bind('change', function(event) {
		
		/***民國年**/
		var y =(parseInt($(this).val().substring(0, 3))+1911);
		var m = $(this).val().substring(3, 5);
		var d = $(this).val().substring(5, 7);
		var endD = $("#inputLabSumChartEDate").val();
			if(endD.length==7){
				if(moment(y+m+d+"","YYYYMMDD").isValid()){
					$(this).tooltip('destroy');
					showSumLineChartContent();//顯示趨勢圖
				     ajax_getLineChartData("LabRecordService","LabSum");

				}else{
					$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');	
				}
			}else{
				$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
			}
			
			
	
		
		
		

		});	
	
	
/***  檢驗彙總 趨勢圖 自訂日期監聽器  1070521 ↑****/
	
	
	/********************檢驗彙總 RadioButton 監聽器***********/
	$('input[name=sumRadio]:radio').unbind('change').bind('change', function(event) {
		var radio = event.target;
		var radioValue ="";
		if(radio.checked){
			radioValue = radio.value;
			
			
			var startD = $("#inputSumSDate").val();//開始日期
			var endD = $("#inputSumEDate").val();//開始日期
			
			var kindId = getKindIdByLabList();
			var labItems = getLabItemByLabDataList();
//			console.log("kindId: "+kindId+";labItems: "+labItems);
			
			if(kindId==""||labItems==""){
				alert('請選擇檢驗項目');
				$('#is_form > .active').prev('li').find('a').trigger('click');
				 clearGridData("LabSumList");
			}else{
				if(radioValue=="自訂"){
					
					if(startD.length==7&&endD.length==7){
						
						ajax_getLabSummaryData("LabRecordService","Sum",kindId,labItems);
						$("#labSumPage_Title").html("檢驗彙總表  日期範圍&emsp;"+ startD+" ~ "+ endD);
//						stateChange(true, '#inputSumSDate');
//						stateChange(true, '#inputSumEDate');
					}else{
//						stateChange(false, '#inputSumSDate', "請輸入正確的日期格式");
//						stateChange(false, '#inputSumEDate', "請輸入正確的日期格式");
						
					}
				}else{
					
					if(isCheckedSelectedRow()){
						ajax_getLabSummaryData("LabRecordService","Sum",kindId,labItems);
//						stateChange(true, '#inputSumSDate');
//						stateChange(true, '#inputSumEDate');
					}
					
					
				}
			}
			
		
			
		}
		

		


	});
	
	/**檢驗彙總 自訂 日期範圍 起始日 click監聽器 ***/	
	$("#inputSumSDate").on('click', function(event) {
		var labRadio = $('input:radio[name="sumRadio"]:checked').val();
//		$('input:radio[name="sumRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		if(labRadio!="自訂"){
			$('input:radio[name="sumRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		}

		});	

	/**檢驗趨彙 自訂 日期範圍 結束日 click監聽器 ***/	
	$("#inputSumEDate").on('click', function(event) {
		var labRadio = $('input:radio[name="sumRadio"]:checked').val();
//		$('input:radio[name="sumRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		if(labRadio!="自訂"){
			$('input:radio[name="sumRadio"]:last').prop("checked", true).trigger('change');//自訂日期
		}

		});	
	
/**檢驗彙總 自訂日期範圍 起始日 change監聽器 ***/	
	$('#inputSumSDate').unbind('change').bind('change', function(event) {
		
		/**民國年*/
		var y =(parseInt($(this).val().substring(0, 3))+1911);
		var m = $(this).val().substring(3, 5);
		var d = $(this).val().substring(5, 7);
		
		var startD = $("#inputSumSDate").val();//開始日期
		
		var kindId = getKindIdByLabList();
		var labItems = getLabItemByLabDataList();
		
		if(kindId==""||labItems==""){
			alert("請選擇檢驗項目");
		}else{
			if(startD.length==7){
				if(moment(y+m+d+"","YYYYMMDD").isValid()){
					$(this).tooltip('destroy');
					ajax_getLabSummaryData("LabRecordService","Sum",kindId,labItems);

				}else{
					$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
				}
			}else{
				$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
			}
		}
		
		
		
		
		
		
		

		});	


	$('#inputSumEDate').unbind('change').bind('change', function(event) {
		
		/***民國年**/
		var y =(parseInt($(this).val().substring(0, 3))+1911);
		var m = $(this).val().substring(3, 5);
		var d = $(this).val().substring(5, 7);
//		console.log(y+m+d+"");
		
		var endD = $("#inputSumEDate").val();//開始日期
		
		var kindId = getKindIdByLabList();
		var labItems = getLabItemByLabDataList();
		
		if(kindId==""||labItems==""){
			alert("請選擇檢驗項目");
		}else{
			if(endD.length==7){
				if(moment(y+m+d+"","YYYYMMDD").isValid()){
					$(this).tooltip('destroy');
					ajax_getLabSummaryData("LabRecordService","Sum",kindId,labItems);
				}else{
					$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
				}
			}else{
				$(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
			}
			
			
		}		

		});	
	
//查詢檢驗彙總日期範圍 button 監聽器
	$("#searchSumRange").on('click', function(event) {
//		var start = $("#inputSumSDate").val();
//		var end = $("#inputSumEDate").val();
		var kindId = getKindIdByLabList();
		var labItems = getLabItemByLabDataList();
//		var labCustomRange = start+"|"+ end;
		if(start.length<7||end.length<7){
			alert("請輸入完整日期");
		}else{
			ajax_getLabSummaryData("LabRecordService","Sum",kindId,labItems);
		}
		

		});	
	
/**返回 檢驗項目清單(上一頁)***/
	$("#backToLabDataList").on('click', function(event) {
		hideLineChartContent();

		});	
	
/**返回 檢驗項目清單(上一頁)***/
	$("#backToLabSumList").on('click', function(event) {
		hideSumLineChartContent();

		});		
	
/**檢驗彙總 趨勢圖 按鈕***/
	$("#labSumLineChart").on('click', function(event) {
//		showSumLineChartContent();
		
		
		var labRadioChoice = $('input:radio[name="sumRadio"]:checked').val();
		
		var startDate = $("#inputSumSDate").val();
		var endDate = $("#inputSumEDate").val();
		
		$("#inputLabSumChartSDate").val(startDate);
		$("#inputLabSumChartEDate").val(endDate);
		
		var kindId = getKindIdByLabList();
		var labItems = getLabItemByLabSumDetailList();
//		console.log("kindId: "+kindId+";labItems: "+labItems);
		
		if(kindId==""||labItems==""){
			
			alert("請選擇檢驗項目");
			
		}else{
			
			if(labRadioChoice=="自訂"){
				if(startDate.length==0||endDate.length==0){
					
					alert("請輸入日期範圍");
				}else{
					
					setTimeout(function(){ 
						$('input:radio[name="labSumChartRadio"]').val([labRadioChoice]).trigger('change');
				    }, 200);
					
			    	

				}
			}else{

//		    	setTimeout(function(){ 
		    		$('input:radio[name="labSumChartRadio"]').val([labRadioChoice]).trigger('change');
//			    }, 200);


		    	
			}
			
		}	

		});
	
/***檢驗 彙總 趨勢圖 ***/
	// 檢驗趨勢圖 
	
	$('input[name=labSumChartRadio]:radio').unbind('change').bind('change', function(event) {
		var radio = event.target;
		var radioValue ="";
		if(radio.checked){
			radioValue = radio.value;
			
			if(radioValue=="自訂"){
				var start = $("#inputLabSumChartSDate").val();
				var end = $("#inputLabSumChartEDate").val();
				var labCustomRange = start+"|"+ end;
				
				if(start.length==0||end.length==0){
					alert("請輸入正確的日期格式");
				}else{
					showSumLineChartContent();//顯示趨勢圖

				     ajax_getLineChartData("LabRecordService","LabSum");
				}
				
			}else {
				
				showSumLineChartContent();//顯示趨勢圖

				 ajax_getLineChartData("LabRecordService","LabSum");
			}


		}

	});
	
	
	
/***檢驗趨勢圖 1070515 add***/
	/**點下檢驗趨勢圖按鈕 ***/	
	$("#btnLabLineChart1").on('click', function(event) {

        var labRadioChoice = $('input:radio[name="labRadio"]:checked').val();
//        console.log("Click LineChart:"+labRadioChoice);
		
		var startDate = $("#inputLabSDate").val();
		var endDate = $("#inputLabEDate").val();
		
		$("#inputLabChartSDate").val(startDate);
		$("#inputLabChartEDate").val(endDate);
		
		var kindId = getKindIdByLabList();
		var labItems = getLabItemByLabDataList();
		
		
		if(kindId==""||labItems==""){
			alert("請選擇檢驗項目");
		}else{
			if(labRadioChoice=="自訂"){
				if(startDate.length==0||endDate.length==0){
					
					alert("請輸入日期範圍");
				}else{
				     
				     showLineChartContent();//顯示趨勢圖
//				     console.log("LabLineChart in 自訂");
				     $('input:radio[name="labChartRadio"]').val([labRadioChoice]).trigger('change');
//				     ajax_getLineChartData("LabRecordService","LabChart");
				}
			}else{
				
			    $('input:radio[name="labChartRadio"]').val([labRadioChoice]).trigger('change');
			    showLineChartContent();//顯示趨勢圖
//			    ajax_getLineChartData("LabRecordService","LabChart");
//			    console.log("LabLineChart in other");
//				getLabSelectedRow();
			}
		}

	});
	
	// 檢驗趨勢圖 
	
	$('input[name=labChartRadio]:radio').unbind('change').bind('change', function(event) {
		var radio = event.target;
		var radioValue ="";
		if(radio.checked){
			radioValue = radio.value;
			
			if(radioValue=="自訂"){
				var start = $("#inputLabChartSDate").val();
				var end = $("#inputLabChartEDate").val();
				var labCustomRange = start+"|"+ end;
				
				if(start.length==0||end.length==0){
					alert("請輸入正確的日期格式");
				}else{
//					 setBlock(500);
					 showLineChartContent();//顯示趨勢圖
				     ajax_getLineChartData("LabRecordService","LabChart");
				}
				
			}else {
//				setBlock(500);
				 showLineChartContent();//顯示趨勢圖
				 ajax_getLineChartData("LabRecordService","LabChart");
			}


		}

	});

});


function LabListInputObj(empNo,sessionID,chartNo,range,method){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.chartNo = chartNo;
	this.range = range;
	this.method = method;
};

//檢驗表格/檢驗文字型
var LabFormInputObj = function(empNo,sessionID,reportNo,chartNo,method){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.reportNo = reportNo;
	this.chartNo = chartNo;
	this.method = method;
};


//GermAntibio //細菌報告表格 
function GermAntibioInputObj(empNo,sessionID,reportNo,method,germGroup,rptType){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.reportNo = reportNo;
	this.method = method;
	this.germGroup = germGroup;
	this.rptType = rptType;
};

//檢驗彙總表 input 
var getLabSummaryDataInputObj = function(empNo,sessionID,chartNo,kindId,range,labItems,method){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.chartNo = chartNo;
	this.kindId = kindId;
	this.range =range;
	this.labItems = labItems;
	this.method = method;
	
};


//{"empNo":"ORCL","sessionID":1,"reportNo":"010518A300045","chartNo":912473,"method":"getqueryEnterqryItem"}  //檢驗表格型報告
//{"empNo":"ORCL","sessionID":1,"reportNo":"021110NE00001","chartNo":912473,"method":"getqueryEnterqryItem"} //檢驗 病理報告
//{"empNo":"ORCL","sessionID":1,"reportNo":"990616A800008","method":"getenterqryGermresult","germGroup":"2285","rptType":"B"}  //細菌報告  上半部資料 
//{"empNo":"ORCL","sessionID":1,"reportNo":"9110152200030","method":"getenterqryGermAntibio","germGroup":"2284","rptType":"B"}  //細菌報告 底部資料 (Grid)

function renderLab(){
	
	//設定 labListBody 高
	var RadioBgStyle  =  $(".RadioBgStyle").height();
	var labBodyHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+RadioBgStyle+70);
	var LabContentPanelHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+RadioBgStyle+90);
//	console.log("LabContentPanelHeight:"+LabContentPanelHeight);
//	resizePanelBody("labListBody",labBodyHeight);   
	
//	ajax_getLabList("LabRecordService","month"); //預設一個月
//	$('input:radio[name="labRadio"]:first').prop("checked", true).trigger('change');//預設一個月
	ajax_getLabList("LabRecordService","month");
	
	setTimeout(function(){ 
		resizePanelBody("LabContentPanel", ($(window).height())-180);
//		resizePanelBody("is_txt_content",(labBodyHeight-100));//文字型
		resizePanelBody("Lab_txtContent1",(labBodyHeight-130));//文字型
		resizePanelBody("germDiv",(labBodyHeight-90));//細菌報告
		
		
    }, 200);
	
}

function callRenderLab(){
	var LabRadoBtn = $('input:radio[name="labRadio"]:checked').val();
	if(LabRadoBtn!="month"){		
    	$('input[name=labRadio]:radio:first').prop("checked", true).trigger('change');//預設 1個月
    }else{
    	ajax_getLabList("LabRecordService","month");
    }
}

function getLabThisDate(days){
	
	var now = new Date();
	var month = now.getMonth()+1;
	var day = now.getDate();
	var year = now.getFullYear();
	var m = parseInt(month);
	var d = parseInt(day);
	var M = m<10?'0'+m:m;
	var D = d<10?'0'+d:d;
	var Y = year<1000?year:year-1911;

	setTimeout(function(){ 
		$("#inputLabEDate").val(Y+M+D+"");//自訂日期 endDate
		$("#inputSumEDate").val(Y+M+D+"");//自訂日期 endDate
		
    }, 200);
	

	
	/** 測試 加減日期時間  one week ago**/
	var newDate = DateAdd("d", (parseInt(days)*-1), now);
	var newY = newDate.getFullYear();
	var newM = newDate.getMonth()+1;
	var newD = newDate.getDate();
	var lastY = newY<1000?newY:newY-1911;
	var lastM = newM<10?'0'+newM:newM;
	var lastD = newD<10?'0'+newD:newD;

	setTimeout(function(){ 
		$("#inputLabSDate").val(lastY+lastM+lastD+"");//自訂日期 startDate
		$("#inputSumSDate").val(lastY+lastM+lastD+"");//自訂日期 startDate		
    }, 200);
	
	
	
	
	/****/

}





/**
 * 取得 檢驗清單 range = Year,All,Date
 * serviceName = LabRecordService
 * ajax_getLabList("LabRecordService","Year");
 * */
var ajax_getLabList = function(serviceName,range){
	$("#LabSumContainer").html(""); //先清空暫存的 檢驗彙總
	
	var labListParam = new LabListInputObj(PatInfoObj.empNo,PatInfoObj.sessionID,PatInfoObj.chartNo,range,"getLabListByChartNoDateRange");			

	
	var LabArray = [];
	$.when(ajax_Post(serviceName,JSON.stringify(labListParam))).done(function(labList){			
		if (labList.status == "Success") {
			$.each(labList.resultSet, function(index, obj) {		
				LabArray.push(obj);
			});		
		} else {
			ajaxErrMsg = labList.errorMessage;
			noDataFound(ajaxErrMsg,"LabList");	    
	    	//清空暫存 右側畫面資料 (清空 文字型 || 表格型 ||檢驗彙總 ||趨勢圖)
	    	$("#is_form").show();//顯示表格與檢驗彙總標籤
	    	$("#is_txt").hide();
	    	$("#is_txt_content").hide();
			$("#Lab_txtContent1").hide();
			$("#is_form_content").show();//顯示表格區塊
			$("#is_germ_content").hide();//隱藏細菌區塊
			$("#Lab_lineChartContent").hide();
			clearGridData("LabDataList");//清空 檢驗表格資料
			
			
			
				
			
			
			

		}

		jqGrid_LabList("#LabList","#LabList_Pager",LabArray);		
	
	});
	
	
};


//檢驗清單 
function jqGrid_LabList(tableName,pagerName,arrayData){		//檢驗清單
	var RadioBgStyle  =  $(".RadioBgStyle").height();
	var labGridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+RadioBgStyle+130);
	$(tableName).jqGrid({
	    datatype: "local",
	    height: labGridHeight,
	    colModel: [
	    	{ label: 'I/O/E', name: 'pt_source', width: 90,hidden:true },//檢查 是門/急/住
	        { label: '單號', name: 'lab_reportno', width: 90,hidden:true },
	        { label: '病歷號', name: 'chart_no', width: 90,hidden:true },
	        { label: 'germ_group', name: 'germ_group', width: 90,hidden:true },//抓細菌用參數
	        { label: 'kind_flag', name: 'kind_flag', width: 50,hidden:true },//判斷 檢驗報告主類型 參數
	        { label: 'rpt_type', name: 'rpt_type', width: 90,hidden:true },//抓細菌用參數

//	        { label: '檢驗日期', name: 'lab_date', width: 90,hidden:true },
//	        { label: '年份', name: 'years', width: 45 },	        
	        { label: '看診日期', name: 'lab_date', width: 90},
	        { label: '檢驗類別', name: 'kind_name', width: 170,align:'left' },
	        { label: '種類id', name: 'kind_id', width: 60,hidden:true },
	        { label: '種類', name: 'report_subtitle', width: 120,hidden:true,align:'center' },
//	        { label: '種類', name: 'report_subtitle', width: 120,align:'center',formatter: function(cellvalue, options, rowobject){
//	            return '<button type="button" class="btn btn-primary btn-sm ButtonfontSize">'+ cellvalue +'</button>';
//	        }},
	    ],
	    viewrecords: true, // show the current page, data rang and total records on the toolbar
	    //caption: "病歷主檔",
//	    scroll :true, //鼠標滾動翻頁,
//	    rownumbers: true, //count 序號
//	    rownumWidth:50,
//	    multiselect: true, //多選 checkBox
	    onSelectRow:getSelectedRow,
	    ondblClickRow: function(rowId) {
	    	
        },
//	    rowNum: "-1",
		loadComplete : function () {
			$(this).jqGrid('setSelection', 1, true);
		},
		width: null,	   
		shrinkToFit: false,
		sortable: false,
//			pager: pagerName,
//			pagerpos:'left',
	});

	$(tableName).jqGrid('clearGridData');
	$(tableName).jqGrid('setGridParam', {search: false, postData: { "filters": ""},data: arrayData});
	$(tableName).setGridParam({rowNum:arrayData.length});
	$(tableName).trigger('reloadGrid');
	//$("#LabList").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
	function getSelectedRow() {
		
		 var grid = $(tableName);
		 var rowKey = grid.jqGrid('getGridParam',"selrow");		
		if(rowKey){

	    	var reportNo = $(tableName).jqGrid('getCell',rowKey,'lab_reportno');
			var kindFlag = $(tableName).jqGrid('getCell',rowKey,'kind_flag');
			var germGroup = $(tableName).jqGrid('getCell',rowKey,'germ_group');
			var rptType = $(tableName).jqGrid('getCell',rowKey,'rpt_type');
			var chartNo = $(tableName).jqGrid('getCell',rowKey,'chart_no');
			
			var rptTypeName = $(tableName).jqGrid('getCell',rowKey,'kind_name');
			var germName = $(tableName).jqGrid('getCell',rowKey,'kind_name');
			
			var labDate = $(tableName).jqGrid('getCell',rowKey,'lab_date');
			var kindName = $(tableName).jqGrid('getCell',rowKey,'kind_name');
			
			$("#labListHead").html(labDate+"&emsp;"+kindName);
			$("#LabSumContainer").html(""); //先清空暫存的 檢驗彙總
			
			// kind_flag = A 一般檢驗報告 B 細菌報告  E,K 病理報告
			if(kindFlag=="A"){
//				$('#is_form >').first('li').find('a').trigger('click');
				ajax_getLabDataFormList("LabReportService",reportNo,chartNo);
				hideLineChartContent(); //隱藏趨勢圖
				hideSumLineChartContent();//隱藏彙總趨勢圖

			}else if(kindFlag=="B"){
				$("#is_germ_content").show();
				$("#is_form").hide();
				$("#is_form_content").hide();
				$("#is_txt").hide();
				$("#is_txt_content").hide();
				$("#LabForm").hide();
				$("#Lab_lineChartContent").hide();
				
				
				
				ajax_getGermDetailData("LabReportService",reportNo,germGroup,rptType,rptTypeName,germName);
				
				setTimeout(function(){ 
					ajax_getGermAntibioList("LabReportService",reportNo,germGroup,rptType); 
				}, 200);
			}else if(kindFlag=="E"||kindFlag=="K"){ //病理報告
				$("#is_form").hide();//顯示表格標籤
				$("#is_form_content").hide();//顯示表格區塊
				$("#is_germ_content").hide();//隱藏細菌區塊
				$("#is_txt").show();
				$("#is_txt_content").show();
				$("#Lab_txtContent1").show();
				ajax_isTxtLabContent("LabReportService",reportNo,chartNo);

				
				
				
			}
			/**else if(kindFlag=="K"){
				$("#is_form").hide();//顯示表格標籤
				$("#is_form_content").hide();//顯示表格區塊
				$("#is_germ_content").hide();//隱藏細菌區塊
			}**/
			
			//清除趨勢圖 1070312
//			ClearLineChartCanvas();


		}else{
//			 alert("沒有資料被選擇");
		}
		
		
	}
}

function showLineChartContent(){		
	
	$("#is_germ_content").hide();
	$("#is_txt").hide();
	$("#is_txt_content").hide();
	$("#Lab_txtContent1").hide();	
	$("#is_form").show();
	$("#is_form_content").show();
	$("#LabForm").hide();
	$("#Lab_lineChartContent").show();
	
}

function showSumLineChartContent(){
	$("#is_germ_content").hide();
	$("#is_txt").hide();
	$("#is_txt_content").hide();
	$("#Lab_txtContent1").hide();	
	$("#is_form").show();
	$("#is_form_content").show();
//	$("#LabForm").hide();
//	$("#Lab_lineChartContent").hide();
	
	//隱藏彙總 顯示彙總趨勢圖
	$("#sumRadioGroup").hide();
	$("#labSumLineChart").hide();
	$("#LabSumContainer").hide();	
	$("#Lab_SumLineChartContent").show();

}

function hideLineChartContent(){		
	
	$("#is_germ_content").hide();
	$("#is_txt").hide();
	$("#is_txt_content").hide();
	$("#Lab_txtContent1").hide();	
	$("#is_form").show();
	$("#is_form_content").show();
	$("#LabForm").show();
	$("#Lab_lineChartContent").hide();
	
}


function hideSumLineChartContent(){
	$("#is_germ_content").hide();
	$("#is_txt").hide();
	$("#is_txt_content").hide();
	$("#Lab_txtContent1").hide();	
	$("#is_form").show();
	$("#is_form_content").show();
//	$("#LabForm").hide();
//	$("#Lab_lineChartContent").hide();
	
	//隱藏彙總 顯示彙總趨勢圖
	$("#sumRadioGroup").show();
	$("#labSumLineChart").show();
	$("#LabSumContainer").show();	
	$("#Lab_SumLineChartContent").hide();

}


/*********************檢驗結果 表格型 jqGrid*******************/
function jqGrid_LabDataList(tableName,pagerName,arrayData){		

	
	if($(window).height()<400){
		labFormGridHeight = $(window).height();
	}else{
		var labFormGridHeight = ($(window).height()-355);	
	}
//	labFormGridHeight = $(window).height();
	
	
	$(tableName).jqGrid({
	    datatype: "local",
	    height: labFormGridHeight,
	    colModel: [
	    	{ label: 'lab_status', name: 'lab_status', width: 90,hidden:true },
	    	{ label: '檢驗名稱', name: 'assay_id', width:195,hidden:false },
	    	{ label: '檢驗值', name: 'result_val', width: 160,formatter:function(cellvalue, options, rowobject){
	    		//檢驗值  L(低於) , H(高於) , N(正常) , A(不正常) , U
	    		if(rowobject.result_status=="E"||rowobject.result_status=="T"||rowobject.result_status=="C"){
	    			return "<span class='text-danger'>"+cellvalue + "</span>";	
	    		}else {
	    			return "<span class='text-primary'>"+cellvalue + "</span>";	
	    		}
	    	}},
	    	/**{label:'檢驗值',name:'result_val',width:150,formatter:function(cellvalue, options, rowobject){
	    		if($.isNumeric(cellvalue)){
	    			if(rowobject.male==null&&rowobject.female==null&&rowobject.child==null){
	    				return "<span class='text-primary'>"+cellvalue + "</span>";		
	    			}else if(rowobject.male!=null){
	    				var male = rowobject.male.split("-");   				
	    				if(male[0]==undefined||male[1]==undefined){
	    					return "<span class='text-primary'>"+cellvalue + "</span>";	
	    				}else if(cellvalue<parseFloat(male[0])||cellvalue>parseFloat(male[1])){	    			
	    					return "<span class='text-danger'>"+cellvalue + "</span>";	
	    				}else{
	    					return "<span class='text-primary'>"+cellvalue + "</span>";		
	    				}
	    				
	    			}else if(rowobject.female!=null){
	    				var female = rowobject.female.split("-");
	    				if(female[0]==undefined||female[1]==undefined){
	    					return "<span class='text-primary'>"+cellvalue + "</span>";			
	    				}else if(cellvalue<parseFloat(female[0])||cellvalue>parseFloat(female[1])){
	    					return "<span class='text-danger'>"+cellvalue + "</span>";	
	    				}else{
	    					return "<span class='text-primary'>"+cellvalue + "</span>";		
	    				}
	    			}
	    			else {
	    				return "<span class='text-primary'>"+cellvalue + "</span>";	
	    			}
	    			
	    			
	    		}else{
	    			return "<span class='text-primary'>"+cellvalue + "</span>";
	    		}
	    	}},  **/
	        { label: '單位', name: 'unit', width: 160,hidden:false },
	        { label: 'instr_kind', name: 'instr_kind', width: 120,hidden:true },
	        { label: 'assay_judgetype', name: 'assay_judgetype', width: 90,hidden:true },
	        { label: 'result_status', name: 'result_status', width: 100,hidden:true },
//	        { label: '檢驗範圍值', name: 'report_normalrange', width: 200 },
	        { label: '正常範圍值', name: 'normal_val', width: 185 },
//	        { label: '女性範圍值', name: 'female', width: 120 },
//	        { label: '小孩範圍值', name: 'child', width: 100,hidden:true },
	       
//	        { label: '單位', name: 'unit', width: 45 },
//	        { label: '開始值', name: 'start_value', width: 45,formatter:function(cellvalue, options, rowobject){
//	        	filterNull(cellvalue);
//	        } },
//	        { label: '結束值', name: 'end_value', width: 45,formatter:function(cellvalue, options, rowobject){
//	        	filterNull(cellvalue);
//	        } },
	        
	      
//	        { label: '種類', name: 'report_subtitle', width: 120,formatter: function(cellvalue, options, rowobject){
//	            return '<button type="button" class="btn btn-primary btn-sm">'+ cellvalue +'</button>';
//	        }},
	    ],
	    viewrecords: true, // show the current page, data rang and total records on the toolbar
	    //caption: "病歷主檔",
	    onSelectRow:getSelectedRow,
	    multiselect: true, //多選 checkBox
	    ondblClickRow: function(rowId) {
	    	
        },
	    width: null,
//	    rowNum: Math.floor((pageHeight - 220)/33),
	    shrinkToFit: false,
	    sortable: true,
//		pager: pagerName,
//		pagerpos:'left',
		loadComplete : function () {
//			$(this).jqGrid('setSelection', 1, true);
		}
	});
	$(tableName).jqGrid('clearGridData');
	$(tableName).jqGrid('setGridParam', {search: false, postData: { "filters": ""},data: arrayData});
	$(tableName).setGridParam({rowNum:arrayData.length});
	$(tableName).trigger('reloadGrid');
	//$("#LabList").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
	function getSelectedRow() {
	    var grid = $(tableName);
	    var rowKey = grid.jqGrid('getGridParam',"selrow");
	    if (rowKey){
//	    	$('#labListHead').html($(tableName).jqGrid('getCell',rowKey,'lab_date') + " " + $(tableName).jqGrid('getCell',rowKey,'report_subtitle') + " 病患:" + PatObj.chart_no + " "+PatObj.pt_name + " " + PatObj.sex_name + " " + PatObj.age+"歲");
//	    	$('#labListBody').html(rowKey);
	    
	    }
	    else{
//	        alert("沒有資料被選擇");
	    }
	}
	
}


/***細菌報告 表格數據**/
function jqGrid_GermAntibioList(tableName,pagerName,arrayData){		
	$(tableName).jqGrid({
	    datatype: "local",
	    height: 250,
//	    height: 250,
	    colModel: [
	    	{ label: '細菌名稱', name: 'germ_name', width: 300 },
	    	{ label: '菌1', name: 'anti_result1', width:100 },
	    	{ label: '菌2', name: 'anti_result2', width: 100 },
	        { label: '菌3', name: 'anti_result3', width: 100 },
	        { label: 'anti_flag1', name: 'anti_flag1', width: 90,hidden:true },
	        { label: 'anti_flag2', name: 'anti_flag2', width: 120,hidden:true },
	        { label: 'anti_flag3', name: 'anti_flag3', width: 90,hidden:true },
	       
	             
	    ],
	    viewrecords: true, // show the current page, data rang and total records on the toolbar
	    //caption: "病歷主檔",
	    onSelectRow:getSelectedRow,
//	    multiselect: true, //多選 checkBox
	    ondblClickRow: function(rowId) {
	    	
        },
	    width: null,
//	    rowNum: Math.floor((pageHeight - 220)/24),
	    shrinkToFit: false,
	    sortable: true,
//		pager: pagerName,
//		pagerpos:'left',
		loadComplete : function () {
//			$(this).jqGrid('setSelection', 1, true);
		}
	});
	$(tableName).jqGrid('clearGridData');
	$(tableName).jqGrid('setGridParam', {search: false, postData: { "filters": ""},data: arrayData});
	$(tableName).setGridParam({rowNum:arrayData.length});
	$(tableName).trigger('reloadGrid');
	//$("#LabList").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
	function getSelectedRow() {
	    var grid = $(tableName);
	    var rowKey = grid.jqGrid('getGridParam',"selrow");
	    if (rowKey){
//	    	$('#labListHead').html($(tableName).jqGrid('getCell',rowKey,'lab_date') + " " + $(tableName).jqGrid('getCell',rowKey,'report_subtitle') + " 病患:" + PatObj.chart_no + " "+PatObj.pt_name + " " + PatObj.sex_name + " " + PatObj.age+"歲");
//	    	$('#labListBody').html(rowKey);
	    
	    }
	    else{
	        alert("沒有資料被選擇");
	    }
	}
	
}

/**取得 Lab表格 數據資料    **/
var ajax_getLabDataFormList = function(serviceName,reportNo,chartNo){
	$("#is_form").show();//顯示表格標籤
	$("#is_form_content").show();//顯示表格區塊
	$("#is_germ_content").hide();//隱藏細菌區塊
	$("#is_txt").hide();
	$("#is_txt_content").hide();
	
	var cmParam = new LabFormInputObj(PatInfoObj.empNo,PatInfoObj.sessionID,reportNo,chartNo,"getqueryEnterqryItem");	
	var LabFormArray = [];
	$.when(ajax_Post(serviceName,JSON.stringify(cmParam))).done(function(labFormList){			
		if (labFormList.status == "Success") {
			$.each(labFormList.resultSet, function(index, obj) {		
				LabFormArray.push(obj);
			});		
		} else {
			ajaxErrMsg = labFormList.errorMessage;
			noDataFound(ajaxErrMsg,"LabDataList");
//	    	$('#labListHead').html(" 病患:" + PatObj.chart_no + " "+PatObj.pt_name + " " + PatObj.sex_name + " " + PatObj.age+"歲");
	    	//清空暫存 右側畫面資料

		}	
		jqGrid_LabDataList("#LabDataList","#LabDataList_Pager",LabFormArray);		
		
	});
	
	
};



//取得KindId
function getKindIdByLabList(){
	var kindId ="";
	var grid = $("#LabList");
	var rowKey = grid.jqGrid('getGridParam',"selrow");
	if(rowKey){
		kindId = grid.jqGrid('getCell',rowKey,"kind_id");	
	}else{
		kindId="";
	}
	
	
	return kindId;
}

//取得 LabSumDetailListItem 取得檢驗彙總 items
function getLabItemByLabSumDetailList() {
	var labItems = "";
    var grid2 = $("#LabSumList");
    var rowKeys = grid2.jqGrid('getGridParam',"selarrrow");//回傳陣列，一次取得多列data select array row
    if(rowKeys.length>0){
    	for(var i=0;i<rowKeys.length;i++){
    		var rowId = rowKeys[i];
    		var rwoData = grid2.jqGrid("getRowData",rowId); //取得某列的 所有物件
    		labItems+=rwoData.assay_id+"|";

    	}
    	labItems=labItems.substring(0,labItems.length-1); 

    	
    }else{
    	labItems="";
    }
    
    return labItems;
    
}

//取得LabDataListItem
function getLabItemByLabDataList(){	
	var  labItems ="";
	var grid2 = $("#LabDataList");
	var rowKeys = grid2.jqGrid('getGridParam',"selarrrow");//回傳陣列，一次取得多列data select array row
	    if(rowKeys.length>0){
	    	for(var i=0;i<rowKeys.length;i++){
	    		var rowId = rowKeys[i];
	    		var rwoData = grid2.jqGrid("getRowData",rowId); //取得某列的 所有物件
	    		labItems+=rwoData.assay_id+"|";

	    		
	    	}
	    	labItems=labItems.substring(0,labItems.length-1); 

	    }else{
	    	labItems="";
	    }
	    
	    return labItems;
	
}

function isCheckedSelectedRow(){
	
	var grid2 = $("#LabDataList");
    var rowKeys = grid2.jqGrid('getGridParam',"selarrrow");
    if(rowKeys.length>0){
    	
    	return true;
    }else {
    	return false;
    }
}


function renderSummaryColName(arrayData){
	var colModel = [];

	for(var j=0;j<arrayData[0].detailData.length;j++){
		var label = arrayData[0].detailData[j].lab_date;
		
		colModel.push(label);
	}

	return colModel;
	
}

function renderSummaryModel(arrayData){
	var colModel = [];
	var col;
		    
	for(var j=0;j<arrayData[0].detailData.length;j++){
				
		colModel.push(countFunction(j));
	}
     
//    console.log(colModel);
	
	return colModel;
	
}

var countFunction = function(j){
	var col;
//	if(j==j){
		col = {  name: 'detailData', width:100,formatter:function(cellvalue, options, rowobject){
			
//			console.log(cellvalue[j].lab_status);
			if((cellvalue[j].lab_status=="L")||(cellvalue[j].lab_status=="H")||(cellvalue[j].lab_status=="A")){
    			return "<span class='text-danger'>"+filterNull(cellvalue[j].result_val) + "</span>";	
    		}else {
    			return "<span class='text-primary'>"+filterNull(cellvalue[j].result_val) + "</span>";	
    		}

//	    	return "<span>"+cellvalue[j].result_val+"</span>";
//	    	return "<span>"+rowobject[j].result_val+"</span>";


	    } };
//	}
	
	return col;
	
};


/** ajax 取得檢驗彙總表 1070322 modify**/ 
var ajax_getLabSummaryData = function(serviceName,from,kindId,labItems){
	$("#LabSumContainer").html("");
	$("#LabSumContainer").append("<table id='LabSumList' class='table-hover'></table><div id='LabSumList_Pager'></div>");
	

	
	var LabSummaryJsonlObj=[];
	var colNames = ["檢驗項目","單位","檢驗標準","檢驗範圍"];
	var colModels = [ 
		 { name: 'assay_id', width: 150,hidden:false,frozen:true },
	     
		 { name: 'detailData', width: 120,frozen:true,formatter:function(cellvalue, options, rowobject){
	        	return "<span>"+filterNull(cellvalue[0].unit)+"</span>";
	        	 
	        } },
	    {  name: 'detailData', width: 120,hidden:true,frozen:true,formatter:function(cellvalue, options, rowobject){
	        	return "<span>"+cellvalue[0].lab_status+"</span>";
	        	 
	        } },
	    {  name: 'detailData', width: 120,frozen:true,formatter:function(cellvalue, options, rowobject){
	        	return "<span>"+filterNull(cellvalue[0].real_normal_range)+"</span>";
 	 
	        } },]
	
	
	
	
	if(from=="LabSum"){ //點下"彙總"按鈕
		var range =  $('input:radio[name="labRadio"]:checked').val();
		if(range=="自訂"){
			var startD = $("#inputLabSDate").val();//開始日期
			var endD = $("#inputLabEDate").val();//結束日期
			range = startD+"|"+endD;
		}
	}else{//從"彙總頁面"選擇 日期範圍
		var range =  $('input:radio[name="sumRadio"]:checked').val();
		if(range=="自訂"){
			var startD = $("#inputSumSDate").val();//開始日期
			var endD = $("#inputSumEDate").val();//結束日期
			range = startD+"|"+endD;
		}
		
		var exchangeRange;
//	    month|season|halfYear|year
	    if(range=="month"){
	    	exchangeRange = '1個月';
	    }else if(range=="season"){
	    	exchangeRange = '3個月';
	    }else if(range=="halfYear"){
	    	exchangeRange = '半年';
	    }else if(range=="year"){
	    	exchangeRange = '1年';
	    }else{
	    	exchangeRange = startD+" ~ "+endD;
	    }
		
		
	}
	

//	console.log("ajax_labItems:"+labItems);
	var cmParam = new getLabSummaryDataInputObj(PatInfoObj.empNo,PatInfoObj.sessionID,PatInfoObj.chartNo,kindId,range,labItems,"getMatrixLabDdataByChartNoLabTypeLabItemsAndRange");
//    console.log(JSON.stringify(cmParam));
	var request = $.when(ajax_Post(serviceName,JSON.stringify(cmParam))).done(
			function(data) {
				if (data.status == "Success") {
//					setBlock(500);
					$("#labSumLineChart").show(); //1070515 註解
					 $.each(data.resultSet, function(index, obj) {
						 LabSummaryJsonlObj.push(obj);
						 
					                   });
					 
					 var summ = renderSummaryColName(LabSummaryJsonlObj);
					 for(var i=0;i<summ.length;i++){
						 colNames.push(summ[i]); 
					 }
					 
//					 console.log(colNames);
					 
					 var colm = renderSummaryModel(LabSummaryJsonlObj);

					 for(var i=0;i<colm.length;i++){
						 colModels.push(colm[i]); 
					 }
					 
//					 jqGrid_LabSummaryList("#LabSumList","#LabSumList_Pager",LabSummaryJsonlObj,colNames,colModels);//設定 檢驗彙總
					 
					 
						$.when(jqGrid_LabSummaryList("#LabSumList","#LabSumList_Pager",LabSummaryJsonlObj,colNames,colModels)).done(function(){
							
						setTimeout(function(){
							$("#LabSumList").jqGrid('destroyFrozenColumns');
							$("#LabSumList").jqGrid('setFrozenColumns');
						},200);
							
							
						});
					 
					 
					 /**清空 隱藏參數**/
//						$("#strLabSumItem").html("");//檢驗項目
//						$("#strLabSumKindId").html("");//kindId
						
					

				} else {
					var ajaxErrMsg = data.errorMessage;
					noDataFound(ajaxErrMsg,"LabSumList");
					$("#LabSumContainer").html("<span class='EMRLabelBold'>查無資料</span>");
					$("#labSumLineChart").hide();//1070515註解


					
					
				}	
										

			});

		request.onreadystatechange = null;
		request.abort = null;
		request = null; 
		
		
	
	
	
}

//檢驗彙總表  需修改高度
function jqGrid_LabSummaryList(tableName,pagerName,arrayData,colNames,colModels){		
	
	
	if($(window).height()<400){
		labSumGridHeight = ($(window).height())-35;
	}else{
		var labSumGridHeight = ($(window).height()-415);
	}
	
	
	
	$(tableName).jqGrid({
	    datatype: "local",
	    height: labSumGridHeight,
	    colNames:colNames,
	    colModel: colModels,
	    viewrecords: true, // show the current page, data rang and total records on the toolbar
	    multiselect: true, //多選 checkBox
//	    sortable: true,
	    onSelectRow:getSelectedRow,
	    ondblClickRow: function(rowId) {
	    	
        },
        hoverrows:false,
        width: null,
//        rowNum: Math.floor((pageHeight - 300)/33),
	    shrinkToFit:false,
	    //sortable: true,
//		pager: pagerName,
//		pagerpos:'left'
	});
	$(tableName).jqGrid('clearGridData');
//	$(tableName).jqGrid('destroyFrozenColumns');
//	$(tableName).jqGrid('setFrozenColumns');
	$(tableName).jqGrid('setGridParam', {search: false, postData: { "filters": ""},data: arrayData});
	$(tableName).setGridParam({rowNum:arrayData.length});
	$(tableName).trigger('reloadGrid');
	//$(tableName).jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
	
	function getSelectedRow() {
	    
	}
}

function setGermData(tag,data){
	document.getElementById(tag).innerText=data
}


/**取得細菌上半部資料*
 * **/
var ajax_getGermDetailData = function(serviceName,reportNo,germGroup,rptType,rptTypeName,germName){
	
	var cmParam = new GermAntibioInputObj(PatInfoObj.empNo,PatInfoObj.sessionID,reportNo,"getenterqryGermresult",germGroup,rptType);
	
	$.when(ajax_Post(serviceName,JSON.stringify(cmParam))).done(function(data){			
		if (data.status == "Success") {
			
			setGermData("germLabNo",filterNull(data.resultSet[0].lab_reportno));
			setGermData("germPtName",filterNull(data.resultSet[0].pt_name));
			setGermData("germRptName",filterNull(rptTypeName));
			setGermData("sampleDoc",filterNull(data.resultSet[0].sample_doc));
			setGermData("epiCell",filterNull(data.resultSet[0].epi_cell));
//			setGermData("germTitle",filterNull(data.resultSet[0].report_text));
			setGermData("germTitle",filterNull(germName));
			setGermData("germDocName",filterNull(data.resultSet[0].dr_id));
			setGermData("pmn",filterNull(data.resultSet[0].pmn));
			setGermData("germReqDate",filterNull(data.resultSet[0].req_date));
			setGermData("germLabDate",filterNull(data.resultSet[0].lab_date));
			setGermData("germResDate",filterNull(data.resultSet[0].res_date));

			setGermData("resisMark1",filterNull(data.resultSet[0].resistance_markers1));
			setGermData("resisMark2",filterNull(data.resultSet[0].resistance_markers2));
			setGermData("resisMark3",filterNull(data.resultSet[0].resistance_markers3));
			setGermData("resisGerm1",filterNull(data.resultSet[0].resistance_germ1));
			setGermData("resisGerm2",filterNull(data.resultSet[0].resistance_germ2));
			setGermData("resisGerm3",filterNull(data.resultSet[0].resistance_germ3));				
			setGermData("germName1",formatDateTime(data.resultSet[0].germ_name1));
			setGermData("germName2",formatDateTime(data.resultSet[0].germ_name2));
			setGermData("germName3",filterNull(data.resultSet[0].germ_name3));
			setGermData("germQty1",formatDateTime(data.resultSet[0].germ_qty1));
			setGermData("germQty2",formatDateTime(data.resultSet[0].germ_qty2));
			setGermData("germQty3",formatDateTime(data.resultSet[0].germ_qty3));				
			setGermData("germDoc1",filterNull(data.resultSet[0].germ_doc1));
			setGermData("germDoc2",filterNull(data.resultSet[0].germ_doc2));
			setGermData("germDoc3",filterNull(data.resultSet[0].germ_doc3));

				
				
//			});		
		} else {
			var ajaxErrMsg = data.errorMessage;
			clearGermDetailData();
//			console.log("getOpDetailErrMsg="+ajaxErrMsg);//如查無資料須清除所有文字
			
			
		}	
		
		

		
	});
	
	
};

//細菌報告 list清單
var ajax_getGermAntibioList = function(serviceName,reportNo,germGroup,rptType){
	var cmParam = new GermAntibioInputObj(PatInfoObj.empNo,PatInfoObj.sessionID,reportNo,"getenterqryGermAntibio",germGroup,rptType);	
	var GermAntibioArray = [];
	$.when(ajax_Post(serviceName,JSON.stringify(cmParam))).done(function(dataXrayList){			
		if (dataXrayList.status == "Success") {
			$.each(dataXrayList.resultSet, function(index, obj) {		
				GermAntibioArray.push(obj);
			});		
		} else {
			ajaxErrMsg = dataXrayList.errorMessage;
			noDataFound(ajaxErrMsg,"GermAntibioList");
//	    	$('#labListHead').html(" 病患:" + PatObj.chart_no + " "+PatObj.pt_name + " " + PatObj.sex_name + " " + PatObj.age+"歲");
	    	//清空暫存 右側畫面資料

		}	
		jqGrid_GermAntibioList("#GermAntibioList","#GermAntibioList_Pager",GermAntibioArray);		
		
	});
	
	
};


var ajax_isTxtLabContent = function(serviceName,reportNo,chartNo){
//	var labTxtContent = document.getElementById("#Lab_txtContent1");
	var cmParam = new LabFormInputObj(PatInfoObj.empNo,PatInfoObj.sessionID,reportNo,chartNo,"getqueryEnterqryItem");
	
	$.when(ajax_Post(serviceName,JSON.stringify(cmParam))).done(function(data){			
		if (data.status == "Success") {
			
			$("#Lab_txtContent1").html((data.resultSet[0].report));
//			console.log(data.resultSet[0].report);
			
//			$.each(data.resultSet, function(index, obj) {		
//				$("#Lab_txtContent1").html(filterNull(obj));
//			});	
			
			
//			setGermData("Lab_txtContent1",filterNull(data.resultSet[0].report));
		
//			});		
		} else {
			var ajaxErrMsg = data.errorMessage;
			$("#Lab_txtContent1").html(ajaxErrMsg);
//			clearGermDetailData();
//			console.log("getOpDetailErrMsg="+ajaxErrMsg);//如查無資料須清除所有文字
			
			
		}	
		
		

		
	});
	
};

//檢驗趨勢圖
/**獲取趨勢圖資料 一次顯示所有檢驗項目 data **/
var ajax_getLineChartData = function(serviceName,from){
	
	var kindId = getKindIdByLabList();
	
	if(from=="LabSum"){		
		var labItems = getLabItemByLabSumDetailList();
		$("#sumLineChartMsg").hide();
		$("#LabSumLineChartContainer").html("");
		$("#LabSumLineChartContainer").append('<canvas id="LabSumLineChart" style="display:none;"></canvas><span class="EMRLabelBold" id="sumLineChartMsg" style="display:none;"></span>');
		var ctx = document.getElementById('LabSumLineChart').getContext('2d');
		
		var range =  $('input:radio[name="labSumChartRadio"]:checked').val();
		if(range=="自訂"){
			var startD = $("#inputLabSumChartSDate").val();//開始日期
			var endD = $("#inputLabSumChartEDate").val();//結束日期
			range = startD+"|"+endD;
		}
	}else if(from=="LabChart"){
		var labItems = getLabItemByLabDataList();
		$("#lineChartMsg").hide();
		$("#LabLineChartContainer").html("");
		$("#LabLineChartContainer").append('<canvas id="LabLineChart" style="display:none;"></canvas><span class="EMRLabelBold" id="lineChartMsg" style="display:none;"></span>');
		var ctx = document.getElementById('LabLineChart').getContext('2d');
		
		var range =  $('input:radio[name="labChartRadio"]:checked').val();
		if(range=="自訂"){
			var startD = $("#inputLabChartSDate").val();//開始日期
			var endD = $("#inputLabChartEDate").val();//結束日期
			range = startD+"|"+endD;
		}
	}
	
	
	
	
	
	
	
	 var exchangeRange;
//   month|season|halfYear|year
   if(range=="month"){
   	exchangeRange = '1個月';
   }else if(range=="season"){
   	exchangeRange = '3個月';
   }else if(range=="halfYear"){
   	exchangeRange = '半年';
   }else if(range=="year"){
   	exchangeRange = '1年';
   }else{
   	exchangeRange = startD+" ~ "+endD;
   }
	
   
	var cmParam = new getLabSummaryDataInputObj(PatInfoObj.empNo,PatInfoObj.sessionID,PatInfoObj.chartNo,kindId,range,labItems,"getMatrixLabDdataByChartNoLabTypeLabItemsAndRange");
//	console.log(JSON.stringify(cmParam));
	var LineChartJsonlObj =[];
	var arrayListOBJ=[];
	
	var request = $.when(ajax_Post(serviceName,JSON.stringify(cmParam))).done(
	function(data) {
		if (data.status == "Success") {
			
			$("#LabLineChart").show();
			$("#LabSumLineChart").show();

			
			 $.each(data.resultSet, function(index, obj) {
				 LineChartJsonlObj.push(obj);
				 
			                   });
			 
			 var XDataTime = renderSummaryColName(LineChartJsonlObj);
			 
			 /**設定 LineChart data**/
			    var dataLabelArray = [];
				var dataLabelList = [];
				
				for(var i=0;i<LineChartJsonlObj.length;i++){
				     for(var j=0;j<LineChartJsonlObj[i].detailData.length;j++){
				       dataLabelArray.push(LineChartJsonlObj[i].detailData[j].result_val);	 
				     }
				     var dataV = new dataLabel(dataLabelArray);
				     dataLabelList.push(dataV);
				     dataLabelArray = [];
				     
				}
//			          console.log("dataLabelList=>"+JSON.stringify(dataLabelList)); 
			          
			          
			          for(var k=0;k<LineChartJsonlObj.length;k++){
			      		//dataList.push(((25+i)*2)-4);
			      		//var emp = new datasets("Label_"+i,dataList[i].dataLabel,getRandomColor());
			      		var emp = new datasets(LineChartJsonlObj[k].assay_id,dataLabelList[k].dataLabel,getRandomColor());
			      		arrayListOBJ.push(emp);
			      	}
			          
//			          console.log(arrayListOBJ);
			 
				
			 /***填入 趨勢圖資料***/
			 
				var config = {
						 //是否顯示動畫
		                animation:true,
		                //動畫分多少步完成
		                animationSteps:200,
					    // The type of chart we want to create
					    type: 'line',
					    responsive: true,
//					    scaleFontSize : 20,
					    pointDot: true,
		                pointDotRadius: 12,
		                pointDotStrokeWidth: 4,
		                /**showTooltips: false,
		                
		                onAnimationComplete: function() {//动画完成后显示对应的数据
                            var ctx = this.chart.ctx;
                            ctx.font = this.scale.font;
                            ctx.fillStyle = this.scale.textColor;
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            this.datasets.forEach(function(dataset) {
                                dataset.points.forEach(function(bar) {
                                    ctx.fillText(points.value, bar.x, bar.y);
                                });
                            });
                        },**/
		                
		                
		               
//					    pointDotRadius: 6, //点的半径

					    // The data for our dataset
					    data: {
					    	//X軸檢驗日期
					    	labels: XDataTime,
//					        labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December","January", "February", "March", "April", "May", "June", "July","August","September","October","November","December","January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
					        datasets: arrayListOBJ,
					    },

					    // Configuration options go here
					    options: {
					    	 plugins: {
					    	      datalabels: {
					    	         // hide datalabels for all datasets
					    	         display: false //隱藏 線 上的 dataLable數值 
					    	      }
					    	    },	
					    	
					     spanGaps: true,//不斷線 1070411
					      elements:{
					       line:{
					        tension:0,
					        fill: false,
					        pointStyle: 'circle',
					       }	  
					      },
					      tooltips:{
					        mode:'point',
					        borderWidth:100,
					        titleFontSize:16,
					        titleSpacing:10,
					        backgroundColor:'black',
					        titleFontColor:'#fff',
					        bodyFontSize:16,
					        bodySpacing:2
					      },
					      title:{
					        display:false,
					        text:"檢驗趨勢圖",
					        position:'top',
					        fontSize: 20,
					      },
					      layout:{
					        padding:{
					        	left:20,
					        	right:20,
					        	top:20,
					        	bottom:10
					        }	  
					      },
					      scales: {
				              xAxes: [{
				                      display: true,
				                      scaleLabel: {
				                          display: true,
				                          labelString: '檢驗日期',
				                          position:'right',
				                          fontSize: 16,
				                      }
				                  }],
				              yAxes: [{
				                      display: true,
				                      ticks: {
				                          beginAtZero: true,
//				                          steps: 10, 
//				                          stepValue: 5,
				                          fontSize: 16,
				                          //max: 1000  //最大值
				                      }
				                  }]
				          },
//				          plotOptions: { series: { connectNulls: true } }, //1070411 add 預防斷線
					      legend:{
					      position:'bottom',
					      padding:{
					        	left:10,
					        	right:10,
					        	top:10,
					        	bottom:10
					        },
					      labels:{
					       boxWidth:8,
//					       fontColor:'black',
					       fontSize: 16,	   
					       //fontColor:'rbg(60,180,100)'
					      }
					      	  
					      }
					    	
					    
					    }
					}
				
				try{
					var chart = new Chart(ctx,config);
				}catch(e){
//					console.log(e);
				}
				
				var LabLineChartHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+110+100);
				 
				   if($("#LabLineChart")){
					   resizePanelBody("LabLineChart",(LabLineChartHeight-95));		   
				   }
				  
				   if($("#LabSumLineChart")){
					   resizePanelBody("LabSumLineChart",(LabLineChartHeight-95));
				   }
				

				
			 
			
			 /***填入 趨勢圖資料***/
			
			

		} else {
			var ajaxErrMsg = data.errorMessage;
			
			if(from=="LabChart"){
				$("#LabLineChart").hide();
				$("#lineChartMsg").show();
				$("#lineChartMsg").html("查無資料");
				console.log("Fail LabChart:"+from);
			}else{
				$("#LabSumLineChart").hide();
				$("#sumLineChartMsg").show();
				$("#sumLineChartMsg").html("查無資料");
//				console.log("Fail SumChart:"+from);
			}
			
			

		
			
			
		}	
								

	});

request.onreadystatechange = null;
request.abort = null;
request = null; 

	
};


function datasets (label,data,borderColor){
	this.label = label;
	this.data = data;
	this.borderColor = borderColor;
//	this.fill = fill;
	//this.strokeColor = strokeColor;
	//this.pointColor = pointColor;
	//this.backgroundColor = backgroundColor;
};

/**趨勢圖 label資料名稱**/
function dataLabel(dataLabel){
	this.dataLabel = dataLabel;
};

/**亂數 color**/
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

