//判斷是新增還是編輯狀態
var TPRFlagObj = {
	AddOrEdit:""
		}


function getRightNowTime(){
	var time = moment().format('HHmm');
	return time;
}

//判斷input 的值是否正確  尚未完成 1050525 可以輸入0  注射量 / 出血量 / 引流(左右) /羊水量 / Urine
function isValidNumber(id){
		
	if($("#"+id).val()!=""){
		var val = parseFloat($("#"+id).val());
		var min = parseFloat($("#"+id).attr('min'));
		
		if(isNaN(val)&&$(this).val()!=""){
			$("#"+id).attr('style','background:red;color:white;');
			return false;
		}else if($("#"+id).val()==""){
			$("#"+id).attr('style','background:white;color:black');
			return true;
		}else if(val==0){
			$("#"+id).attr('style','background:white;color:black');
			return true;
		}else if(val<min){
			$("#"+id).attr('style','background:red;color:white;');
			return false;
		}else{
			$("#"+id).attr('style','background:white;color:black');
			return true;
		}
	}else{
		$("#"+id).attr('style','background:white;color:black');
		return true;
	}
	

			
}

// 不可輸入 0 , 但可為空字串   體溫 / 脈搏 / 呼吸 / 體重 /收縮壓 / 舒張壓 / 身高 
function isCorrectRangeNumber(id){
	
	var val = parseFloat($("#"+id).val());
	var min = parseFloat($("#"+id).attr('min'));
    var max = parseFloat($("#"+id).attr('max'));
    
    if($("#"+id).val()==""){
    	$("#"+id).attr('style','background:white;color:black');
    	return true;
    }else{

    	    if(val==0){
    	    	 $("#"+id).attr('style','background:red;color:white;');
    			return false;
    		}else if(val<min||val>max){
    			 $("#"+id).attr('style','background:red;color:white;');
    			return false;
    		}else{
    			$("#"+id).attr('style','background:white;color:black');
    			return true;
    		}
    	    
    	
    }
	
	
	
	
}


$(document).ready(function(){
	

    var tprTotalWidth = $(".tabs").width(); 
    
    var PatientInfoBarHeight = $(".PatientInfoBar").height()>0?$(".PatientInfoBar").height():38;
	var pageTabSwitchHeight = $("#ul-pageTabSwitch").height()>0?$("#ul-pageTabSwitch").height():57;
    
    var TPRRecordListGridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+100);
    resizePanelBody("TPRChartContainer",TPRRecordListGridHeight);
    resizePanelBody("TChartContainer",TPRRecordListGridHeight);
    resizePanelBody("PChartContainer",TPRRecordListGridHeight);
    resizePanelBody("RChartContainer",TPRRecordListGridHeight);
    resizePanelBody("BPChartContainer",TPRRecordListGridHeight);
    resizePanelBody("WeightChartContainer",TPRRecordListGridHeight);
    resizePanelBody("IOChartContainer",TPRRecordListGridHeight);
    
//    var tprEachLiWidth = (tprTotalWidth/9)+0.7;
//    var tprEachLiWidth = (100/9);

//    $("#ul-TPRTabSwitch > li").css('min-width', eachLiWidth +'px').css('max-width', eachLiWidth +'px');
    $("#ul-TPRTabSwitch > li").css('width', '11%');
    
	
	
	// 預設顯示第一個 Tab  1070528 註解
	var showTab = 8;
//	var defaultLi = $('#ul-TPRTabSwitch > li').eq(showTab).addClass('active');
//	$(defaultLi.find('a').attr('href')).siblings().hide();
	
//	setTimeout(function(){
//		$("#ul-TPRTabSwitch li:nth-child(9) a").trigger("click");  //1070331 註解 不用trigger
//	});
	
	
	// 當 li 頁籤被點擊時...
	// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
	$('#ul-TPRTabSwitch > li').click(function() {
				
		// 找出 li 中的超連結 href(#id)
		var $this = $(this),
			clickTab = $this.find('a').attr('href');
		// 把目前點擊到的 li 頁籤加上 .active
		// 並把兄弟元素中有 .active 的都移除 class
				
		
		if(clickTab=="#Add"){
			$("#editRecordDate").tooltip('destroy');//清除tooltip
			$("#editRecordDate").attr('style','background:white;color:black');
			$("#editRecordTime").tooltip('destroy');
			$("#editRecordTime").attr('style','background:white;color:black');
			TPRFlagObj.AddOrEdit = "Add";	
			$("#AddTPRHead").html("新增 TPR 生命徵象紀錄單");
			$(".tprTabs").hide();
			clearAllTPRInputData(getRightNowDate(),getRightNowTime());
			var AddTPRBodyHeight =  userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+60); 
			resizePanelBody("AddTPRPanel",AddTPRBodyHeight);
		}else{
			$(".tprTabs").show();
		}
		$this.addClass('active').siblings('.active').removeClass('active');
		// 淡入相對應的內容並隱藏兄弟元素
//		$(clickTab).stop(false, true).fadeIn().siblings().hide();
		$(clickTab).stop(false, true).fadeIn(function(){
			if(clickTab=="#TPRRecord"){
		    $("#TPRRecordList").jqGrid('destroyFrozenColumns');
			$("#TPRRecordList").jqGrid('setFrozenColumns');		
			}
		}).siblings().hide();

		return false;
	}).find('a').focus(function(){
		this.blur();
	});
	
	
    var tabContainerHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+20);
	$(".tab_container").css('min-height', tabContainerHeight +'px').css('max-height', tabContainerHeight +'px');
	
	renderTPR();  //1070528 註解
	
	$("#editRecordDate").on('change', function(event) { //TPR紀錄 日期輸入
		
		var tprInputDate = replaceAll($(this).val(),"/",'');
		
		var editY =(parseInt(tprInputDate.substring(0, 3))+1911);
		var editM = tprInputDate.substring(3, 5);
		var editD = tprInputDate.substring(5, 7);
		
		if(tprInputDate.length==7&&moment(editY+editM+editD+"","YYYYMMDD").isValid()){	    	 
			$(this).tooltip('destroy');
			$(this).attr('style','background:white;color:black');
	     }else{	
	    	 $(this).attr('style','background:red;color:white;');
	    	 $(this).attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
	     }
		
//		console.log("editDate:"+tprInputDate);
		
		});
	
	
	$("#editRecordTime").on('change',function(event){ //TPR紀錄 時間輸入
		
		var tprInputTime = replaceAll($(this).val(),":",'');
		
		 if(tprInputTime.length==4&&moment(tprInputTime+"","HHmm").isValid()){
	    	 $("#editRecordTime").tooltip('destroy');
	    	 $(this).attr('style','background:white;color:black');
	     }else{
	    	 $(this).attr('style','background:red;color:white;');
	    	 $("#editRecordTime").attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
	     }
		
	});

		
	//取消 
	$("#btnCancel").on('click', function(event) {
		$(".tprTabs").show();
		showTab = 8;
		var defaultLi = $('#ul-TPRTabSwitch > li').eq(showTab).addClass('active');
		$(defaultLi.find('a').attr('href')).siblings().hide();
		$("#TPRRecord").show();
		
		});	
	
	//送出
	$("#btnSend").on('click', function(event) {
		
		//驗證數值是否正常
		
		//判斷input 的值是否正確  尚未完成 1050525 可以輸入0  注射量 / 出血量 / 引流(左右) /羊水量 / Urine
		var iFludis = isValidNumber("editIFluids");
		var bleed = isValidNumber("editBleed");
		var draL = isValidNumber("editDraL");
		var draR = isValidNumber("editDraR");
		var aFluid = isValidNumber("editAFluid");
		var urine = isValidNumber("editUrine");
//		console.log("iFludis:"+iFludis+";bleed:"+bleed+";draL:"+draL+";draR:"+draR+";aFluid:"+aFluid+";urine:"+urine);
		
		
//		 不可輸入 0 , 但可為空字串   體溫 / 脈搏 / 呼吸 / 體重 /收縮壓 / 舒張壓 / 身高 
		 var temp = isCorrectRangeNumber("editTemp");
		 var pulse =isCorrectRangeNumber("editPulse");
		 var resp = isCorrectRangeNumber("editResp");
		 var weight = isCorrectRangeNumber("editWeight");
		 var sp = isCorrectRangeNumber("editSP");
		 var dp = isCorrectRangeNumber("editDP");
		 var height = isCorrectRangeNumber("editHeight");
		 
//		 console.log("editTemp:"+temp+";editPulse:"+pulse+";editResp:"+resp+";editWeight:"+weight
//				 +";editSP:"+sp+";editDP:"+dp+";editHeight:"+height);
		 var isRDate = false;
		 var inputDateVal = $("#editRecordDate").val();
		 inputDateVal = replaceAll(inputDateVal,"/",'');
		 var rY =(parseInt(inputDateVal.substring(0, 3))+1911);
		 var rM = inputDateVal.substring(3, 5);
	     var rD = inputDateVal.substring(5, 7);
//	     console.log(rY+''+rM+''+rD);
	     
	     var isRTime = false;
	     var inputTimeVal = $("#editRecordTime").val();
	     inputTimeVal = replaceAll(inputTimeVal,":",'');
	     
	     if(inputDateVal.length==7&&moment(rY+rM+rD+"","YYYYMMDD").isValid()){
	    	 isRDate = true;
	    	 $("#editRecordDate").attr('style','background:white;color:black');
	    	 $("#editRecordDate").tooltip('destroy');
	     }else{
	    	 isRDate = false; 
	    	 $("#editRecordDate").attr('style','background:red;color:white;');
	    	 $("#editRecordDate").attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
	     }
	     
	     if(inputTimeVal.length==4&&moment(inputTimeVal+"","HHmm").isValid()){
	    	 isRTime = true;
	    	 $("#editRecordTime").attr('style','background:white;color:black');
	    	 $("#editRecordTime").tooltip('destroy');
	     }else{
	    	 isRTime = false;
	    	 $("#editRecordTime").attr('style','background:red;color:white;');
	    	 $("#editRecordTime").attr('title', '日期格式錯誤').tooltip('fixTitle').tooltip('show');
	     }
	     
	     
			
		
		//全部數值需正確無誤方能送出
		if(iFludis==true && bleed==true && draL==true && draR==true && aFluid==true && urine==true 
				&& temp==true && pulse==true && resp == true && weight==true && sp==true && dp==true 
				&& height==true&&isRDate==true&&isRTime==true){
			
			if(TPRFlagObj.AddOrEdit=="Add"){ 
				ajax_insertTPRRecord("TPRRecordMADService"); //新增紀錄
			}else{
				ajax_updateTPRRecord("TPRRecordMADService");  //編輯紀錄
			}
			
			
		}
		else {
			alert("請檢查是否輸入正確的數值");
		}

		
		
	});
	
	
	$("#stoolTimeSelect").change(function() {
		
		$("#showStoolSelVal").html($(this).val()+ $("#stoolTypeSelect").val());
		
	});
	
     $("#stoolTypeSelect").change(function() {
		
		$("#showStoolSelVal").html($("#stoolTimeSelect").val()+$(this).val());
		
	});
	
	
	//增加一筆
	$("#plusStool").on('click', function(event) {
		var stoolTimes= $("#stoolTimeSelect").val();
		var stooltype = $("#stoolTypeSelect").val();
		$("#showStoolSelVal").html(stoolTimes+stooltype);		
		$("#stoolRecordText").append(stoolTimes+stooltype+";");
		
		});	
	
	//清除全部 
	$("#clearAllStool").on('click', function(event) {
		$("#stoolRecordText").html("");
		
		});	
	
	//減少一筆
	$("#minusStool").on('click', function(event) {
//		console.log("Minus ");
		var stoolVal =  $("#stoolRecordText").html();
		if(stoolVal.length>0){
			if(stoolVal.lastIndexOf(';')){
				var stool = stoolVal.substring(0, stoolVal.length-1);	
			}else{
				var stool = stoolVal+";";
			}
			
			var stoolArray = stool.split(';');
//			console.log(stoolArray);
			
			if(stoolArray.length==1){
				$("#stoolRecordText").html("");	
			}else{
				stoolArray.splice((stoolArray.length-1),(stoolArray.length-1));
//				console.log(stoolArray);
				$("#stoolRecordText").html("");
				for(var i=0;i<stoolArray.length;i++){
					$("#stoolRecordText").append(stoolArray[i]+";");
				}
			}
			
			
		}
		
		
		
		
		});	
	
	
	
	

});

function renderTPR(){
	ajax_getTPRRecordList("TPRRecordService");
	ajax_getTPRAllLineChartData("TPRRecordService");
}




function clearAllTPRInputData(assess_date,assess_time){
	
	$("#editRecordDate").val(assess_date);
	$("#editRecordTime").val(assess_time);	    	
	$("#editTemp").val("");
	$("#editPulse").val("");	    	
	$("#editResp").val("");	    	
	$("#editWeight").val("");
	$("#editSP").val("");
  	$("#editDP").val("");
  	$("#editHeight").val("");
  	$("#editIFluids").val("");      	
  	$("#editBleed").val("");
  	$("#editDraL").val("");	      	
  	$("#editDraR").val("");	      	
  	$("#editAFluid").val("");	      	
  	$("#editUrine").val("");
  	$("#editStool").val("");
}

function TPRRecordListInputObj(empNo,sessionID,chartNo,serno,method){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.chartNo = chartNo;
	this.serno = serno;
	this.method = method;
};

//TPR CRU  
// insertTPRRecord
// updateTPRRecordByPrimaryKeys
function TPRCRUDInputObj(empNo,sessionID,dataParameters,method){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.dataParameters = dataParameters;
	this.method = method;
	
}

//TPR insert Parameter
function TPRInsertParameterInputObj(chart_no,serno,assess_date,assess_time,temperature,systolic_pressure,diastolic_pressure,pulse,respiration,weight
		,iv_fluids,urine,stool,bleed,amniotic_fluid,drainage_l,drainage_r,height,keyin_clerk){                                                     
	this.chart_no = chart_no;
	this.serno = serno;
	this.assess_date = assess_date;
	this.assess_time = assess_time;
	this.temperature = temperature;
	this.systolic_pressure = systolic_pressure;
	this.diastolic_pressure = diastolic_pressure;
	this.pulse = pulse;
	this.respiration =respiration;
	this.weight = weight;
	this.iv_fluids =iv_fluids;
	this.urine = urine;
	this.stool = stool;
	this.bleed = bleed;
	this.amniotic_fluid = amniotic_fluid;
	this.drainage_l = drainage_l;
	this.drainage_r = drainage_r;
	this.height = height;
	this.keyin_clerk = keyin_clerk;
	
}

//TPR update Parameter
function TPRUpdateParameterInputObj(chart_no,serno,assess_date,assess_time,temperature,systolic_pressure,diastolic_pressure,pulse,respiration,weight
		,iv_fluids,urine,stool,bleed,amniotic_fluid,drainage_l,drainage_r,height,modify_clerk){                                                     
	this.chart_no = chart_no;
	this.serno = serno;
	this.assess_date = assess_date;
	this.assess_time = assess_time;
	this.temperature = temperature;
	this.systolic_pressure = systolic_pressure;
	this.diastolic_pressure = diastolic_pressure;
	this.pulse = pulse;
	this.respiration =respiration;
	this.weight = weight;
	this.iv_fluids =iv_fluids;
	this.urine = urine;
	this.stool = stool;
	this.bleed = bleed;
	this.amniotic_fluid = amniotic_fluid;
	this.drainage_l = drainage_l;
	this.drainage_r = drainage_r;
	this.height = height;
	this.modify_clerk = modify_clerk;
	
}



//deleteTPRRecordByPrimaryKeys
function TPRDeleteParmeterInputObj(chart_no,serno,assess_date,assess_time){
	this.chart_no = chart_no;
	this.serno = serno;
	this.assess_date = assess_date;
	this.assess_time = assess_time;
	
}


/***TPR insert ajax  TPRRecordMADService ***/
function ajax_insertTPRRecord(serviceName){
	
   var assess_date= $("#editRecordDate").val();    
    assess_date = replaceAll(assess_date,"/",'');
    
	var assess_time = $("#editRecordTime").val();	
	assess_time = replaceAll(assess_time,":",'');
	
//	console.log("insert ajax: assess_date=>"+assess_date+" ;assess_time=>"+assess_time);
	
	var temperature = $("#editTemp").val() ==""?0.0 : parseFloat($("#editTemp").val());
	var systolic_pressure = $("#editSP").val()==""?0 : parseInt($("#editSP").val());
	var diastolic_pressure = $("#editDP").val()==""?0 : parseInt($("#editDP").val());
	var pulse = $("#editPulse").val()==""?0 : parseInt($("#editPulse").val());
	var respiration = $("#editResp").val()==""?0:parseInt($("#editResp").val());
	var weight = $("#editWeight").val()==""?0.0:parseFloat($("#editWeight").val());
	var iv_fluids = $("#editIFluids").val()==""?0:parseInt($("#editIFluids").val());
	var urine = $("#editUrine").val()==""?0:parseInt($("#editUrine").val());
	var stool = $("#editStool").val();
	var bleed = $("#editBleed").val()==""?0:parseInt($("#editBleed").val());
	var amniotic_fluid = $("#editAFluid").val()==""?0:parseInt($("#editAFluid").val());
	var drainage_l = $("#editDraL").val()==""?0:parseInt($("#editDraL").val());
	var drainage_r = $("#editDraR").val()==""?0:parseInt($("#editDraR").val());
	var height = $("#editHeight").val()==""?0.0:parseFloat($("#editHeight").val());
	var keyin_clerk = PatInfoObj.empNo;
	

	var dataParameters = new TPRInsertParameterInputObj(parseInt(PatInfoObj.chartNo),parseInt(PatInfoObj.serno),assess_date,assess_time,temperature,systolic_pressure,diastolic_pressure,pulse,respiration,weight
			,iv_fluids,urine,stool,bleed,amniotic_fluid,drainage_l,drainage_r,height,keyin_clerk);
	
	var insertTPRParm = new TPRCRUDInputObj(PatInfoObj.empNo,parseInt(PatInfoObj.sessionID),dataParameters,"insertTPRRecord");
//	console.log(JSON.stringify(insertTPRParm));
	$.when(ajax_Post(serviceName,JSON.stringify(insertTPRParm))).done(
			function(dataInp) {
	
					if (dataInp.status == "Success") {
						
//                       ajax_getTPRRecordList("TPRRecordService");
						renderTPR();
						
						$(".tprTabs").show();
						showTab = 8;
						var defaultLi = $('#ul-TPRTabSwitch > li').eq(showTab).addClass('active');
						$(defaultLi.find('a').attr('href')).siblings().hide();
						$("#TPRRecord").show();
						
					} else {
						var ajaxErrMsg = dataInp.errorMessage;
						alert(" 新增失敗 "+ajaxErrMsg);
					}
					
					

					
				
			
			});
	
}

//function replaceAll(str, find, replace) {
//    return str.replace(new RegExp(find, 'g'), replace);
//}


/***TPR update ajax  TPRRecordMADService ***/
function ajax_updateTPRRecord(serviceName){
	
    var assess_date= $("#editRecordDate").val();
    
    assess_date = replaceAll(assess_date,"/",'');
    
	var assess_time = $("#editRecordTime").val();
	
	assess_time = replaceAll(assess_time,":",'');
	
//	console.log("update ajax: assess_date=>"+assess_date+" ;assess_time=>"+assess_time);
	
	var temperature = $("#editTemp").val() ==""?0.0 : parseFloat($("#editTemp").val());
	var systolic_pressure = $("#editSP").val()==""?0 : parseInt($("#editSP").val());
	var diastolic_pressure = $("#editDP").val()==""?0 : parseInt($("#editDP").val());
	var pulse = $("#editPulse").val()==""?0 : parseInt($("#editPulse").val());
	var respiration = $("#editResp").val()==""?0:parseInt($("#editResp").val());
	var weight = $("#editWeight").val()==""?0.0:parseFloat($("#editWeight").val());
	var iv_fluids = $("#editIFluids").val()==""?0:parseInt($("#editIFluids").val());
	var urine = $("#editUrine").val()==""?0:parseInt($("#editUrine").val());
	var stool = $("#editStool").val();
	var bleed = $("#editBleed").val()==""?0:parseInt($("#editBleed").val());
	var amniotic_fluid = $("#editAFluid").val()==""?0:parseInt($("#editAFluid").val());
	var drainage_l = $("#editDraL").val()==""?0:parseInt($("#editDraL").val());
	var drainage_r = $("#editDraR").val()==""?0:parseInt($("#editDraR").val());
	var height = $("#editHeight").val()==""?0.0:parseFloat($("#editHeight").val());
	var modify_clerk = PatInfoObj.empNo;
	

	var dataParameters = new TPRUpdateParameterInputObj(parseInt(PatInfoObj.chartNo),parseInt(PatInfoObj.serno),assess_date,assess_time,temperature,systolic_pressure,diastolic_pressure,pulse,respiration,weight
			,iv_fluids,urine,stool,bleed,amniotic_fluid,drainage_l,drainage_r,height,modify_clerk);
	
	var updateTPRParm = new TPRCRUDInputObj(PatInfoObj.empNo,parseInt(PatInfoObj.sessionID),dataParameters,"updateTPRRecordByPrimaryKeys");
//	console.log(JSON.stringify(updateTPRParm));
	$.when(ajax_Post(serviceName,JSON.stringify(updateTPRParm))).done(
			function(dataInp) {
	
					if (dataInp.status == "Success") {
						
//						console.log("TPR Update:"+dataInp.status);
//						ajax_getTPRRecordList("TPRRecordService");
						renderTPR();
						
						$(".tprTabs").show();
						showTab = 8;
						var defaultLi = $('#ul-TPRTabSwitch > li').eq(showTab).addClass('active');
						$(defaultLi.find('a').attr('href')).siblings().hide();
						$("#TPRRecord").show();
						
						
						
					} else {
						var ajaxErrMsg = dataInp.errorMessage;
						alert(" 修改失敗 "+ajaxErrMsg);
					}

					
				
			
			});
	
}

//ajax 刪除TPR
/*** TPRRecordMADService ***/
function ajax_deleteTPRRecord(serviceName,assess_date,assess_time){
	

	var dataParameters = new TPRDeleteParmeterInputObj(parseInt(PatInfoObj.chartNo),parseInt(PatInfoObj.serno),assess_date,assess_time);
	
	var deleteTPRParm = new TPRCRUDInputObj(PatInfoObj.empNo,parseInt(PatInfoObj.sessionID),dataParameters,"deleteTPRRecordByPrimaryKeys");
//	console.log(JSON.stringify(deleteTPRParm));
	$.when(ajax_Post(serviceName,JSON.stringify(deleteTPRParm))).done(
			function(dataInp) {
	
					if (dataInp.status == "Success") {
						
						
//						ajax_getTPRRecordList("TPRRecordService");
						renderTPR();
												
						
					} else {
						var ajaxErrMsg = dataInp.errorMessage;
						alert(ajaxErrMsg);
						console.log("Delete TPR:"+dataInp.status);
					}

					
				
			
			});
	
}


function ajax_getTPRRecordList(serviceName){
	

	var TPRListParam = new TPRRecordListInputObj(PatInfoObj.empNo,PatInfoObj.sessionID,PatInfoObj.chartNo,PatInfoObj.serno,"getTPRRecordByChartNoSerno");
	
	$.when(ajax_Post(serviceName,JSON.stringify(TPRListParam))).done(
			function(dataInp) {
			 var TPRRecordArray =[];
					if (dataInp.status == "Success") {
						$.each(dataInp.resultSet, function(index, obj) {
							TPRRecordArray.push(obj);
						});
					} else {
						var ajaxErrMsg = dataInp.errorMessage;
						clearGridData("TPRRecordList");
						jqGrid_TPRRecordList("#TPRRecordList","#TPRRecordList_Pager",TPRRecordArray);	
					}

					jqGrid_TPRRecordList("#TPRRecordList","#TPRRecordList_Pager",TPRRecordArray);
					
				
						
			
					
					
					
//					$.when(jqGrid_TPRRecordList("#TPRRecordList","#TPRRecordList_Pager",TPRRecordArray)).done(function(){
//						
//						$("#TPRRecordList").jqGrid('setFrozenColumns');
//					});
//					
					
					
					
//					var TPRRecordListGridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+55+100);
//					 $('#TPRRecordList').setGridHeight(gridHeight);
				
			
			});
	
}

/***編輯 **/
function editTPRBtn(keyin_clerk){
//	console.log("keyin_clerk:"+keyin_clerk);
	$("#editRecordDate").tooltip('destroy');//清除tooltip
	$("#editRecordDate").attr('style','background:white;color:black');
	$("#editRecordTime").tooltip('destroy');
	$("#editRecordTime").attr('style','background:white;color:black');
	
	
	if(keyin_clerk!==PatInfoObj.empNo){
		
		alert("您並非 "+keyin_clerk+" 輸入者， 無修改權限");
	}else{
		TPRFlagObj.AddOrEdit = "Edit";	
		$(".tprTabs").hide();
		showTab = 0;
		var defaultLi = $('#ul-TPRTabSwitch > li').eq(showTab).addClass('active');
		$(defaultLi.find('a').attr('href')).siblings().hide();
		$("#AddTPRHead").html("編輯 TPR 生命徵象紀錄單");
		$("#Add").show();
	}
	
	
}

function deleteTPRBtn(keyin_clerk,assess_date,assess_time){
	

	if(keyin_clerk!==PatInfoObj.empNo){
		
		alert("您並非 "+keyin_clerk+" 輸入者， 無刪除權限");
	}else{		

		$('#showTprDelDate').html(assess_date);
		$('#showTprDelTime').html(assess_time);
		 
		$("#deleteTPRDiv").dialog({
           closeOnEscape: true,
		   title:"刪除 TPR 生命徵象紀錄單",
		   height: 230,
		   width:400,
		   modal: true,           
           draggable: true,
           resizable: true,
		   buttons:[
		   { 'id':'dialogBtnDelTPR',
			 'text':"確定",
			 'class': 'btn btn-primary btn-OK',
			 'click':function(){
				 assess_date = replaceAll(assess_date,"/",'');
    			 assess_time = replaceAll(assess_time,":",'');
          	     ajax_deleteTPRRecord("TPRRecordMADService",assess_date,assess_time); 
                 $(this).dialog("close");
			 },
			 'style':'overflow: hidden;'
			   
		   },
		   { 'id':'dialogBtnCancelTPR',
				 'text':"取消",
				 'class': 'btn btn-primary',
				 'click':function(){
	                 $(this).dialog("close");
				 },
				 'style':'overflow: hidden;'
				   
			   }
			   ]
          
    });
		
//		$('#Modal_DeleteTPR').modal('show');
//
//		 $('#Modal_DeleteTPR').on('show.bs.modal', function (event) { //彈跳視窗 跳出時
//			 $('#showTprDelDate').html(assess_date);
//			 $('#showTprDelTime').html(assess_time);
//
//			});
//		 
//		 $('#dialog_btnDeleteTPR').click(function(){
//			 assess_date = replaceAll(assess_date,"/",'');
//			 assess_time = replaceAll(assess_time,":",'');
//			 ajax_deleteTPRRecord("TPRRecordMADService",assess_date,assess_time); 
//		 });
		 
	
		
		
		
	}
	
}


function jqGrid_TPRRecordList(tableName,pagerName,dataArray){	//門診住院出院
//	 var TPRRecordListGridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+55+100);
//	 $('#' + gridId).setGridHeight(gridHeight);
//	 console.log(TPRRecordListGridHeight);
	
	var PatientInfoBarHeight = $(".PatientInfoBar").height();
    var pageTabSwitchHeight = $("#ul-pageTabSwitch").height();
    var ulTPRTabSwitchHeight  =  $("#ul-TPRTabSwitch").height();
	 
		var TPRRecordListGridHeight = (($(window).height())-(PatientInfoBarHeight+pageTabSwitchHeight+ulTPRTabSwitchHeight+80));
		if($(window).height()<350){
			TPRRecordListGridHeight = ($(window).height())-168;
		}
		
//		console.log("TPRRecordListGridHeight:"+TPRRecordListGridHeight);
		
	
	$(tableName).jqGrid({
	    datatype: "local",
	    height: TPRRecordListGridHeight,
	    colModel: [	    	
	   	 { label: '編', name: 'keyin_clerk', width: 45,align:'center',hidden:false,frozen:true,formatter: function(cellvalue, options, rowobject){
	            return '<img src="/TanTimaServices/css/img/modify_36.png" onclick="editTPRBtn('+"\'"+rowobject.keyin_clerk+"\'"+');" class="toolbar-img-style modify-tpr alt="修改" title="修改"/>';	     
	        }},//編輯button
	        { label: '刪', name: 'keyin_clerk', width: 45,align:'center',hidden:false,frozen:true,formatter: function(cellvalue, options, rowobject){
	        	if(rowobject.keyin_clerk!==PatInfoObj.empNo){
	        		return '<img src="/TanTimaServices/css/img/delete_36.png" onclick="deleteTPRBtn('+"\'"+rowobject.keyin_clerk+"\',"+"\'"+rowobject.assess_date+"\',"+"\'"+rowobject.assess_time+"\'"+');" class="toolbar-img-style delete-tpr alt="刪除" title="刪除"/>';
	        	}else{
	        		 return '<img src="/TanTimaServices/css/img/delete_36.png"  onclick="deleteTPRBtn('+"\'"+rowobject.keyin_clerk+"\',"+"\'"+rowobject.assess_date+"\',"+"\'"+rowobject.assess_time+"\'"+');" class="toolbar-img-style delete-tpr alt="刪除" title="刪除"/>';
//	        		 return '<img src="/TanTimaServices/css/img/delete_36.png" data-toggle="modal" data-target="#Modal_DeleteTPR" onclick="deleteTPRBtn('+"\'"+rowobject.keyin_clerk+"\',"+"\'"+rowobject.assess_date+"\',"+"\'"+rowobject.assess_time+"\'"+');" class="toolbar-img-style delete-tpr alt="刪除" title="刪除"/>';
	        	}
	           	     
	        }},//delete button
	        { label: '日期', name: 'assess_date', width: 110,align:'center',formatter: formatDateTime,frozen:true},
	        { label: '時間', name: 'assess_time', width: 85,align:'center',formatter: formatDateTime,frozen:true},
	        { label: '體溫<br/>(°C)', name: 'pt_name', width: 55,align:'center',frozen:false,formatter:function(cellvalue, options, rowobject){
	    		
	    		if(rowobject.temperature>37.5){
	    			return "<span class='text-danger'>"+rowobject.temperature + "</span>";	
	    		}else if(rowobject.temperature==0.0){
	    			return "<span style='opacity:0;'>"+"" + "</span>";	
	    		}else {
	    			return "<span class='text-dark'>"+rowobject.temperature + "</span>";	
	    		}
	    	}},
	        { label: '脈搏<br/>(次/分)', name: 'pt_name', width: 80,align:'center',frozen:false,formatter:function(cellvalue, options, rowobject){
	    		
	    		if(rowobject.pulse>100){
	    			return "<span class='text-danger'>"+rowobject.pulse + "</span>";	
	    		}else if(rowobject.pulse==0){
	    			return "<span style='opacity:0;'>"+"" + "</span>";	
	    		}else {
	    			return "<span class='text-dark'>"+rowobject.pulse + "</span>";	
	    		}
	    	}},
	        { label: '呼吸<br/>(次/分)', name: 'pt_name', width: 80,align:'center',frozen:true,formatter:function(cellvalue, options, rowobject){
	    		
	    		if(rowobject.respiration==0){
	    			return "<span style='opacity:0;'>"+"" + "</span>";
	    		}else {
	    			return "<span class='text-dark'>"+rowobject.respiration + "</span>";	
	    		}
	    	}},
	        { label: '血壓(mmHg)<br/>收縮/舒張壓', name: 'pt_name', width: 115,align:'center',formatter: function(cellvalue, options, rowobject){
	        	var SP = filterNull(rowobject.systolic_pressure)==0?"":filterNull(rowobject.systolic_pressure);
	        	var DP = filterNull(rowobject.diastolic_pressure)==0?"":filterNull(rowobject.diastolic_pressure);
	        	return '<span class="EMRLabel">'+SP+" / "+DP+'</span>';
	        	/**if(SP!=""&&SP>=90&&SP<=120 &&DP!=""&&DP>=60&&DP<=90){  // 收縮 & 舒張 正常
	        		return '<span class="EMRLabel">'+SP+" / "+DP+'</span>';	
	        	}else if(SP!=""&&SP>=90&&SP<=120){ //收縮(正常)/ 舒張(異常)
	        		return '<span class="EMRLabel">'+SP+"</span>"+" / "+"<span class='text-danger'>"+DP+"</span>";	
	        	}else if(DP!=""&&DP>=60&&DP<=90){ //收縮(異常) /舒張(正常)
	        		return '<span class="text-danger">'+SP+"</span>"+" / "+"<span class='EMRLabel'>"+DP+"</span>";	
	        	}else if(SP==""&&DP==""){  //無輸入
	        		return '<span class="EMRLabel">'+SP+" / "+DP+'</span>';
	        	}else {  //收縮(異常)/ 舒張(異常)
	        		return '<span class="text-danger">'+SP+'</span> / <span class="text-danger">'+DP+'</span>';
	        	}**/
	                    	
	        	        } },
	        { label: '身高<br/>(cm)', name: 'pt_name', width: 75,align:'center',formatter:function(cellvalue, options, rowobject){	    		
	    		if(rowobject.height==0.0){
	    			return "<span style='opacity:0;'>"+"" + "</span>";
	    		}else {
	    			return "<span class='text-dark'>"+rowobject.height + "</span>";	
	    		}
	    	}},
	        { label: '體重<br/>(kg)', name: 'pt_name', width: 75,align:'center',formatter:function(cellvalue, options, rowobject){	    		
	    		if(rowobject.weight==0.0){
	    			return "<span style='opacity:0;'>"+"" + "</span>";
	    		}else {
	    			return "<span class='text-dark'>"+rowobject.weight + "</span>";	
	    		}
	    	}},	     
	        { label: '注射量<br/>(cc)', name: 'iv_fluids', width: 80,align:'center'},
	        { label: '出血量<br/>(cc)', name: 'bleed', width: 80,align:'center'},
	        { label: 'Urine<br/>尿(cc)', name: 'urine', width: 80,align:'center'},
	        { label: '引流(左/右)<br/>(cc)', name: 'pt_name', width: 130,align:'center',formatter: function(cellvalue, options, rowobject){
	            return '<span class="EMRLabel">'+filterNull(rowobject.drainage_l)+" / "+filterNull(rowobject.drainage_r)+'</span>';	        	
	        }},	        
	        { label: '羊水量<br/>(cc)', name: 'amniotic_fluid', width: 80,align:'center'},
	        { label: 'Stool大便<br>(次)', name: 'stool', width: 110,align:'left',hidden:false},
	        
	   
	        
	        { label: 'chart_no', name: 'chart_no', width: 150,align:'center',hidden:true},
	        { label: 'serno', name: 'serno', width: 150,align:'center',hidden:true},
	        { label: 'keyin_clerk', name: 'keyin_clerk', width: 150,align:'center',hidden:true},//輸入者
	        { label: 'keyin_clerk_name', name: 'keyin_clerk_name', width: 150,align:'center',hidden:true},//輸入者
	        { label: 'modify_clerk', name: 'modify_clerk', width: 150,align:'center',hidden:true},//編輯者
	        { label: 'modify_clerk_name', name: 'modify_clerk_name', width: 150,align:'center',hidden:true},//編輯者
	        { label: '收縮壓', name: 'systolic_pressure', width: 115,align:'center',hidden:true },
	        { label: '舒張壓', name: 'diastolic_pressure', width: 115,align:'center',hidden:true },
	        { label: '引流左', name: 'drainage_l', width: 115,align:'center',hidden:true },
	        { label: '引流右', name: 'drainage_r', width: 115,align:'center',hidden:true },
	        
	        { label: 'pulse', name: 'pulse', width: 115,align:'center',hidden:true },
	        { label: 'temperature', name: 'temperature', width: 115,align:'center',hidden:true },
	        { label: 'respiration', name: 'respiration', width: 115,align:'center',hidden:true },
	        
	        { label: 'weight', name: 'weight', width: 115,align:'center',hidden:true },
	        { label: 'height', name: 'height', width: 115,align:'center',hidden:true },
	        

	        

	    ],
	    viewrecords: true, // show the current page, data rang and total records on the toolbar

	    scrollOffset: 0,
//	    rowNum: Math.floor(PatListGridHeight/30),	
//	    rowNum:0,
//	    rowNum : dataArray.length,
	    gridComplete: function () {
	    	
//	    	$(this).jqGrid('setFrozenColumns');
	    	
     },
	    //rowList: [10, 20, 30],
	    onSelectRow:getSelectedRow,
	    /**ondblClickRow: function(rowId) {
	   

	    	var grid = $(tableName);
		    var rowKey = grid.jqGrid('getGridParam',"selrow");
		    if(rowKey){
	
		    }
	    	
       },  **/      
	    width: null,
	    shrinkToFit: false,
//	    sortable: true,
//		pager: pagerName
	});		
//	$(tableName).jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" ,clearSearch: false});
	$(tableName).jqGrid('clearGridData');
	$(tableName).jqGrid('setGridParam', {data: dataArray});
	$(tableName).setGridParam({rowNum:dataArray.length});
	$(tableName).trigger('reloadGrid');
	
	
function getSelectedRow() {
		
	    var grid = $(tableName);
	    var rowKey = grid.jqGrid('getGridParam',"selrow");
	    if (rowKey){
	    	
	    	var rwoData = grid.jqGrid("getRowData",rowKey); //取得某列的 所有物件
	    	
	    	var assess_date = rwoData.assess_date;	    	
	    	var assess_time = rwoData.assess_time;
	    	var temperature = rwoData.temperature; 
	    	var systolic_pressure = rwoData.systolic_pressure; 
	    	var diastolic_pressure = rwoData.diastolic_pressure;  
	    	var pulse = rwoData.pulse; 
	    	var respiration = rwoData.respiration;  
	    	var weight = rwoData.weight;
	    	var height = rwoData.height;
	    	var iv_fluids = rwoData.iv_fluids;
	    	var urine = rwoData.urine; 
	    	var stool = rwoData.stool; 
	    	var bleed = rwoData.bleed; 
	    	var amniotic_fluid = rwoData.amniotic_fluid; 
	    	var drainage_l = rwoData.drainage_l; 
	    	var drainage_r = rwoData.drainage_r; 
	    	
	    	assess_date =  replaceAll(assess_date,"/",'');
	    	assess_time = replaceAll(assess_time,":",'');

	    	$("#editRecordDate").val(assess_date);
	    	$("#editRecordTime").val(assess_time);	    	
	    	$("#editTemp").val(temperature==0?"":temperature);
	    	$("#editPulse").val(pulse==0?"":pulse);	    	
	    	$("#editResp").val(respiration==0?"":respiration);	    	
	    	$("#editWeight").val(weight==0?"":weight);
	    	$("#editSP").val(systolic_pressure==0?"":systolic_pressure);
	      	$("#editDP").val(diastolic_pressure==0?"":diastolic_pressure);
	      	$("#editHeight").val(height==0?"":height);
	      	$("#editIFluids").val(iv_fluids);      	
	      	$("#editBleed").val(bleed);
	      	$("#editDraL").val(drainage_l);	      	
	      	$("#editDraR").val(drainage_r);	      	
	      	$("#editAFluid").val(amniotic_fluid);	      	
	      	$("#editUrine").val(urine);
	      	$("#editStool").val(stool);
	    	
	    	
	    
	    }
	    
}
	    
	

}

//TPR 趨勢圖 1070522
function ajax_getTPRAllLineChartData(serviceName){
	//TPR
	$("#TPRChartContainer").html('');
	$("#TPRChartContainer").append('<canvas id="TPRLineChart" style="display:none;"></canvas>');
	//T
	$("#TChartContainer").html('');
	$("#TChartContainer").append('<canvas id="TLineChart" style="display:none;"></canvas>');
	
	//P
	$("#PChartContainer").html('');
	$("#PChartContainer").append('<canvas id="PLineChart" style="display:none;"></canvas>');
	
	//R 
	$("#RChartContainer").html('');
	$("#RChartContainer").append('<canvas id="RLineChart" style="display:none;"></canvas>');
	
	//BP 
	$("#BPChartContainer").html('');
	$("#BPChartContainer").append('<canvas id="BPLineChart" style="display:none;"></canvas>');
	
	//Weight
	$("#WeightChartContainer").html('');
	$("#WeightChartContainer").append('<canvas id="WeightLineChart" style="display:none;"></canvas>');	
	
	// IO 注射量/出血量/Urine
	$("#IOChartContainer").html('');
	$("#IOChartContainer").append('<canvas id="IOLineChart" style="display:none;"></canvas>');	
	
	var ctx = document.getElementById('TPRLineChart').getContext('2d');
	var ctxT = document.getElementById('TLineChart').getContext('2d');
	var ctxP = document.getElementById('PLineChart').getContext('2d');
	var ctxR = document.getElementById('RLineChart').getContext('2d');
	var ctxBP = document.getElementById('BPLineChart').getContext('2d');
	var ctxWeight = document.getElementById('WeightLineChart').getContext('2d');
	var ctxIO = document.getElementById('IOLineChart').getContext('2d');
	var allCtx = [ctx,ctxT,ctxP,ctxR,ctxBP,ctxWeight,ctxIO];

	
	var LineChartJsonlObj =[];
	var arrayListOBJ=[];//TPR
	var tArrayObj = [];//T
	var pArrayObj = [];//P
	var rArrayObj = [];//R
	var bpArrayObj = [];//BP
	var weightArrayObj = [];//Weight
	var ioArrayObj = [];//IO
	var allLineChartObj = []; 
	
	
	var TPRChartListParam = new TPRRecordListInputObj(PatInfoObj.empNo,PatInfoObj.sessionID,PatInfoObj.chartNo,PatInfoObj.serno,"getTPRRecordByChartNoSerno");
	debugger;
	var request = $.when(ajax_Post(serviceName,JSON.stringify(TPRChartListParam))).done(
	function(data) {
		//debugger;
		if (data.status == "Success") {

			$("#TPRLineChart").show();
			$("#TLineChart").show();
			$("#PLineChart").show();
			$("#RLineChart").show();
			$("#BPLineChart").show();
			$("#WeightLineChart").show();
			$("#IOLineChart").show();
			
			
			 $.each(data.resultSet, function(index, obj) {
				 LineChartJsonlObj.push(obj);
				 
			                   });
			 
			 var XDataTime = renderRecordDateColName(LineChartJsonlObj);


				var tArray = [];
				var pArray = [];
				var rArray = [];
				var tprArray=[];
				
				var spArray =[];
				var dpArray = [];
				var BPAllArray = [];
				
				var weightArray = [];
				
				var ifArray = [];//注射量
				var bleedArray = [];//出血量
				var urineArray = [];//Urine
				var IOAllArray = [];//IO 全
				
				for(var i=0;i<LineChartJsonlObj.length;i++){
					
					tArray.push(LineChartJsonlObj[i].temperature==0?null:LineChartJsonlObj[i].temperature);
					pArray.push(LineChartJsonlObj[i].pulse==0?null:LineChartJsonlObj[i].pulse);
					rArray.push(LineChartJsonlObj[i].respiration==0?null:LineChartJsonlObj[i].respiration);
					
					spArray.push(LineChartJsonlObj[i].systolic_pressure==0?null:LineChartJsonlObj[i].systolic_pressure);//收縮壓
					dpArray.push(LineChartJsonlObj[i].diastolic_pressure==0?null:LineChartJsonlObj[i].diastolic_pressure);//舒張壓					
					weightArray.push(LineChartJsonlObj[i].weight==0?null:LineChartJsonlObj[i].weight);//體重
					
					ifArray.push(LineChartJsonlObj[i].iv_fluids==0?null:LineChartJsonlObj[i].iv_fluids);//注射量
					bleedArray.push(LineChartJsonlObj[i].bleed==0?null:LineChartJsonlObj[i].bleed);//出血量
					urineArray.push(LineChartJsonlObj[i].urine==0?null:LineChartJsonlObj[i].urine);//Urine
				
				     
				}
				
				//TPR
				var dataT = new dataLabel(tArray);
				var dataP = new dataLabel(pArray);
				var dataR = new dataLabel(rArray);
				tprArray.push(dataT);
				tprArray.push(dataP);
				tprArray.push(dataR);
				
				//BP 血壓
				var dataSP = new dataLabel(spArray);
				var dataDP = new dataLabel(dpArray);
				BPAllArray.push(dataSP);
				BPAllArray.push(dataDP);
				
				//IO
				var dataIf = new dataLabel(ifArray);
				var dataBleed = new dataLabel(bleedArray);
				var dataUrine = new dataLabel(urineArray);
				IOAllArray.push(dataIf);
				IOAllArray.push(dataBleed);
				IOAllArray.push(dataUrine);
				

			          
			          var tprLabel = ["體溫","脈搏","呼吸"];
			          var tLabel = "體溫";
			          var pLabel = "脈搏";
			          var rLabel = "呼吸";
			          var bpLabel = ["收縮壓","舒張壓"];
			          var weightLabel = "體重";
			          var ioLabel = ["注射量","出血量","Urine"];
			          
			          var tprColor = ["#2259CA","#F13967","#292929"];
			          var tColor = "#2259CA";
			          var pColor = "#F13967";
			          var rColor = "#292929";
			          var bpColor = ["#088DBA","#139B53"];
			          var weightColor = "#442978";
			          var ioColor = ["#868686","#FF1705","#FFCE43"];
			      
			      // TPR    
			          for(var k=0;k<tprArray.length;k++){
			      		var emp = new datasets(tprLabel[k],tprArray[k].dataLabel,tprColor[k]);
			      		arrayListOBJ.push(emp);
			      		 
			      	}
			         
			          
			     //T 
			     var tObj = new datasets(tLabel,tArray,tColor);   
			     tArrayObj.push(tObj);
			     
			     //P
			     var pObj = new datasets(pLabel,pArray,pColor);
			     pArrayObj.push(pObj);
			     
			     //R
			     var rObj = new datasets(rLabel,rArray,rColor);
			     rArrayObj.push(rObj);
			     
			     //BP		    
			     for(var k=0;k<BPAllArray.length;k++){
			      		var bpObj = new datasets(bpLabel[k],BPAllArray[k].dataLabel,bpColor[k]);
			      		bpArrayObj.push(bpObj);
			      	}
			     
			     //Weight
			     var weightObj = new datasets(weightLabel,weightArray,weightColor);
			     weightArrayObj.push(weightObj);
			     
			     //IO			     
			     for(var k=0;k<IOAllArray.length;k++){
			      		var ioObj = new datasets(ioLabel[k],IOAllArray[k].dataLabel,ioColor[k]);
			      		ioArrayObj.push(ioObj);
			      	}
			     
			     allLineChartObj = [arrayListOBJ,tArrayObj,pArrayObj,rArrayObj,bpArrayObj,weightArrayObj,ioArrayObj];
			     var tprColor = ["#2259CA","#F13967","#292929"];
		          var tColor = "#2259CA";
		          var pColor = "#F13967";
		          var rColor = "#292929";
		          var bpColor = ["#088DBA","#139B53"];
		          var weightColor = "#442978";
		          var ioColor = ["#868686","#FF1705","#FFCE43"];
			     datalabelColor = ["#292929","#2259CA","#F13967","#292929","#292929","#442978","#292929"];
			     var minSteps = [5,34,30,5,10,30,0];
			     var maxSteps = [170,42,170,80,300,200,5000];
			     var stepSizes = [20,1,20,10,20,10,500];
			     
			     
			     //設定 趨勢圖  一次畫7個趨勢圖
			     for(var i=0;i<allCtx.length;i++){
			    	 
						var config = {

								datasetStroke : true,
								showDatasetLabels : true,
//				                animation:true,		               
//				                animationSteps:200,
							    // The type of chart we want to create
							    type: 'line',
							    responsive: true,
							    pointDot: true,
				                pointDotRadius: 12,
				                pointDotStrokeWidth: 16,

							    data: {
							    	//X軸檢驗日期
							    	labels: XDataTime,
							        datasets: allLineChartObj[i],
							    },
							    
							    // Configuration options go here
							    options: {
							    	  plugins: {
						                    datalabels: {
						                    	align	: 'bottom',
						            			anchor : 'bottom',
						                        color: datalabelColor[i],
//						                        offset:12,
						                        font: {
						                            weight: 'bold',
						                            size: 16,
						                        },

						                    },
						                   
						                    /**pan: {
						                    	   enabled: true,
						                    	   mode: 'xy',
						                    	   limits: {
						                    		 max: 10,
						                    	     min: 0.5
						                    	   },
						                    	   limits: {
						                    		 max: 10,
							                    	 min: 0.5
						                    	   }
						                    	 },
						                    	 zoom: {
						                    	   enabled: true,
						                    	   mode: 'xy',
						                    	   limits: {
							                    		 max: 10,
								                    	 min: 0.5
							                    	   }
						                    	 }**/

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
						                          beginAtZero: false,
						                          min:minSteps[i], //1070530 add 
						                          max:maxSteps[i], //1070530 add 
						                          stepSize:stepSizes[i],//1070530 add
//						                          steps:10,
//						                          stepValue:10,
//						                          steps: 10, 
//						                          stepValue: 1,
//						                          fontSize: 16,
						                          //max: 1000  //最大值
						                      }
						                  }]
						          },
//						          plotOptions: { series: { connectNulls: true } }, //1070411 add 預防斷線
							      legend:{
							      position:'bottom',
							      padding:{
							        	left:10,
							        	right:10,
							        	top:10,
							        	bottom:10
							        },
							      labels:{
							       boxWidth:15,
//							       fontColor:'black',
							       fontSize: 18,	   
							       //fontColor:'rbg(60,180,100)'
							      }
							      	  
							      }
							    	
							    
							    }
							}
					 
						
						try{
							var chart = new Chart(allCtx[i],config); //TPR 所有趨勢圖 
						}catch(e){

						}
			     }
			     
			     
	

			
			

		} else {
			var ajaxErrMsg = data.errorMessage;

			
		}	
								

	});

request.onreadystatechange = null;
request.abort = null;
request = null; 

	
};

function renderRecordDateColName(arrayData){
	var colModel = [];

	for(var j=0;j<arrayData.length;j++){
		var date = formatDateTime(arrayData[j].assess_date);
		var time = formatDateTime(arrayData[j].assess_time);
		
		colModel.push(date+" "+time);
	}

	return colModel;
	
}




