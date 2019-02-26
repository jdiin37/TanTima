$(document).ready(function(){
  $("#inpPatListPage").hide();
	$('#logout').click(function(){  //登出
		
//		setTimeout(function(){ 
			switchHtml("/TanTimaServices/html/login/login.html");
//	    }, 200);
		
			
	});
	
   $('#reload').click(function(){  //重新整理
	   $("#inpPatListPage").hide();
	   $(".loading").show();
	   window.localStorage.setItem("docSelect",$("#docSelect").val());  //setItem
	   window.localStorage.setItem("nsSelect",$("#nsSelect").val());  //setItem
		
	   ajax_getPatList("PatientListService");

			
	});

	
	ajax_getPatList("PatientListService");
	renderQueryPatient();


});


//查詢病人清單
function PatientListInputObj(empNo,sessionID,method){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.method = method;
	
};

//查詢病人歷史住院紀錄清單  {"empNo":"ORCL","sessionID":1,"chartNo":77384,"method":"getPatinpListByChartNo"}
function ChartNoListInputObj(empNo,sessionID,chartNo,method){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.chartNo = chartNo;
	this.method = method;
	
};



function renderQueryPatient(){

//搜尋病歷號		
$('#query_chartNo').on('change', function(event) {
		if ($(this).val().length == 0 || number_regex.test($(this).val())) {
			if ($(this).val().length > 0){
				ajax_getChartNoList("PatientListService",$(this).val());
			}else{
				var docValue = $("#docSelect").val();
				var nsValue = $("#nsSelect").val();
				$("#docSelect").val(docValue).trigger('change');
				$("#nsSelect").val(nsValue).trigger('change');
				$(this).val("");
			}
				
		} else {
//			stateChange(false, '#query_chartNo', "請輸入數字");
		}
		
//		console.log("query_chartNo");
	})
	
}

function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

//病人歷史住院清單
function ajax_getChartNoList(serviceName,chartNo){
	

	var InpPatParam = new ChartNoListInputObj(LoginObj.empNo,LoginObj.session_id,chartNo,"getPatinpListByChartNo");
	
	$.when(ajax_Post(serviceName,JSON.stringify(InpPatParam))).done(
			function(dataInp) {
			 var ChartNoListArray =[];
					if (dataInp.status == "Success") {
						$.each(dataInp.resultSet, function(index, obj) {
							ChartNoListArray.push(obj);
						});
					} else {
						var ajaxErrMsg = dataInp.errorMessage;
					}

				jqGrid_PatList("#PatList","#PatList_Pager",ChartNoListArray);
				
				
			
			});
	
}

/**取得住院中患者清單***/
function ajax_getPatList(serviceName) {
	
//	var InpPatParam = new PatientListInputObj(LoginObj.empNo,LoginObj.session_id,1200,"getPatientListDischarge");
	var InpPatParam = new PatientListInputObj(LoginObj.empNo,LoginObj.session_id,"getPatinpListInp");
//	window.localStorage.setItem("LoginObj",JSON.stringify(LoginObj));  //setItem
	
	$.when(ajax_Post(serviceName,JSON.stringify(InpPatParam))).done(
			function(dataInp) {
			 var QueryPatArray =[];
					if (dataInp.status == "Success") {
						$.each(dataInp.resultSet, function(index, obj) {
							QueryPatArray.push(obj);
						});
					} else {
						var ajaxErrMsg = dataInp.errorMessage;
					}

				jqGrid_PatList("#PatList","#PatList_Pager",QueryPatArray);
				
				
				
				//醫師姓名
				/**var docName = QueryPatArray.map(function(obj) { return obj.vs_name; }); 
				
				docName = docName.filter(function(v,i) { 
					return docName.indexOf(v) == i; //過濾重複的日期，return true;
					
				}); 
				docName.sort();
				var box=null;
				box+="<option></option>";
				for(var i=0;i<docName.length;i++){
					box+= '<option>'+docName[i]+'</option>';
				}
				$("#docSelect").html(box);**/
				
				//醫師姓名
				var docList = removeDuplicates(QueryPatArray, "vs_name");
				docList.sort(function(a,b) {
				    return a.vs_name < b.vs_name?-1:1; //asc
				    //return a.key < b.key?-1:1;   // Asc 
			         //return a.key < b.key?1:-1;  // Desc
				});
				var box="";
				box+="<option value=''></option>";
				for(var i=0;i<docList.length;i++){
					box+= '<option value='+docList[i]["vs"]+'>'+docList[i]["vs"]+" "+docList[i]["vs_name"]+'</option>';
				}
				$("#docSelect").html(box);
				
				
				
				var nsList = removeDuplicates(QueryPatArray, "ns_name");
				nsList.sort(function(a,b) {
				    return a.ns_name < b.ns_name?-1:1; //asc
				    //return a.key < b.key?-1:1;   // Asc 
			         //return a.key < b.key?1:-1;  // Desc
				});
				
				var box="";
				box+="<option value=''></option>";
				for(var i=0;i<nsList.length;i++){
					box+= '<option value='+nsList[i]["ns"]+'>'+nsList[i]["ns"]+" "+nsList[i]["ns_name"]+'</option>';
				}
				$("#nsSelect").html(box);
				
				
				$("#nsSelect").change(function() {
					
					var nsArray = setPatListNewArray(QueryPatArray,$("#docSelect").val(),$(this).val());
					jqGrid_PatList("#PatList","#PatList_Pager",nsArray);	
					
					
				});
				
				$("#docSelect").change(function() {
					
					var docArray = setPatListNewArray(QueryPatArray,$(this).val(),$("#nsSelect").val());
					jqGrid_PatList("#PatList","#PatList_Pager",docArray);
					
					
				});
				
				var treat_title = localStorage.getItem("treat_title");
				var empNo = localStorage.getItem("empNo");
				if(treat_title=="DOCTOR"){ //如果是醫師登入
//					console.log("treat_title:"+treat_title);
					for(var i=0;i<docList.length;i++){
						
						if(docList[i]["vs"]==empNo){
							$("#docSelect").val(empNo).trigger('change');							
						}else {
							$("#docSelect").val("");
						}
					}
					
					window.localStorage.setItem("docSelect",$("#docSelect").val());  
					window.localStorage.setItem("nsSelect","");  
					window.localStorage.setItem("treat_title","");  //把treat_title 歸零
				}
				
				
				var getDocSelect = localStorage.getItem("docSelect");
			 	var getNusSelect = localStorage.getItem("nsSelect");
				
			 	//記住選單值
				if(getDocSelect!=undefined||getNusSelect!=undefined){
					// 護理站
					try{
						$("#nsSelect").val(getNusSelect).trigger('change');
					}catch(e){
						$("#nsSelect").val("").trigger('change');//如果原本選的護理站不存在了 將值設為第一個
					}
					
					//醫師
					try{
						$("#docSelect").val(getDocSelect).trigger('change');
					}catch(e){
						$("#docSelect").val("").trigger('change'); //如果原本選的醫師不存在了 將值設為第一個
					}
					
					
				}
				
				
				
				
				
				//護理站
				/**var nsName = QueryPatArray.map(function(obj) { return obj.ns_name; }); 
				
				nsName = nsName.filter(function(v,i) { 
					return nsName.indexOf(v) == i; //過濾重複的日期，return true;
					
				}); 
				nsName.sort();
				var box=null;
				box+="<option></option>";
				for(var i=0;i<nsName.length;i++){
					box+= '<option>'+nsName[i]+'</option>';
				}
				$("#nsSelect").html(box);**/
				
//				hideLoading();
				showLoadingFunction("inpPatListPage");
				
			});	
};

/** 過濾 醫師 護理站清單
 * originalArray 物件陣列
 * docValue 醫師代號
 * nsValue 護理站代號
 * **/
function setPatListNewArray(originalArray,docValue,nsValue){
	
	if(docValue===""&&nsValue===""){
		return originalArray;
	}else if(docValue!==""&&nsValue===""){
		  var newArr = $.grep(originalArray,function(o,index){
		        return (o.vs==docValue);
		     });
		    
		    return newArr;
	}else if(docValue===""&&nsValue!==""){
		 var newArr = $.grep(originalArray,function(o,index){
		        return (o.ns==nsValue);
		     });
		    
		    return newArr;
	}else if(docValue!=""&&nsValue!=""){
		 var newArr = $.grep(originalArray,function(o,index){
		        return (o.ns==nsValue&&o.vs==docValue);
		     });
		    
		    return newArr;
	}else {
		return originalArray;
	}
    

};

/***
 * 病人清單 jqGrid
 * */
function jqGrid_PatList(tableName,pagerName,dataArray){	
	 var navbar = $(".navbar").height(); 
	 var PatListGridHeight = userHeight - (navbar+150);
	
	$(tableName).jqGrid({
	    datatype: "local",
	    height: PatListGridHeight,
	    colModel: [
	        { label: '病歷號碼', name: 'chart_no', width: 85,align:'right',frozen:false },//備註 1070605 frozen:true
	        { label: '床位', name: 'bed_no', width: 85,frozen:false },//備註 1070605 frozen:true
	        { label: '患者姓名', name: 'pt_name', width: 110,align:'left',frozen:false },//備註 1070605 frozen:true
	        { label: ' ', name: 'sex_name', width: 30,align:'center' },
	        //身分 負擔 卡號
	        { label: '身分', name: 'type_name', width: 55,align:'center' },
	        { label: '負擔', name: 'part_no', width: 60,align:'center' },
	        { label: '卡號', name: 'card_seq', width: 60,align:'center' },	     
	        { label: '住院日期', name: 'ckin_date', width: 110,formatter: formatDateTime },
	        { label: '醫師', name: 'vs', width: 125,align:'left',formatter: function(cellvalue, options, rowobject){
	            return '<span class="EMRLabel">'+filterNull(rowobject.vs)+" "+filterNull(rowobject.vs_name)+'</span>';	        	
	        }},       
	        { label: '出院日期', name: 'discharge_date', width: 110,formatter: formatDateTime },
	        { label: '住院<br/>日數', name: 'admit_days', width: 50,align:'center' },
	        //備註 status
	        { label: '備註', name: 'status', width: 120,align:'left'},
	        { label: 'birth_date', name: 'birth_date', width: 500,align:'left',hidden:true},
	        { label: '住院序號', name: 'serno', width: 90,hidden:true }
	    ],
	    viewrecords: true, // show the current page, data rang and total records on the toolbar
	    //caption: "門診、住院、出院",
	    scrollOffset: 0,
//	    rowNum: Math.floor(PatListGridHeight/30),	
//	    rowNum:0,
//	    rowNum : dataArray.length,
	    gridComplete: function () {
	    	
//	    	 var dataAll = $(this).jqGrid('getGridParam','data');
//	    	 console.log(dataAll.length);
//	    	 $(this).jqGrid('setGridParam', 'rowNum', dataAll.length);
	    	
      },
	    //rowList: [10, 20, 30],
	    onSelectRow:getSelectedRow,
	    ondblClickRow: function(rowId) {

	 
	    	
        },        
	    width: null,
	    shrinkToFit: false,
	    sortable: false,
//		pager: pagerName
	});
	
	$(tableName).jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" ,clearSearch: false});
	$(tableName).jqGrid('clearGridData');
	$(tableName).jqGrid('setGridParam', {data: dataArray});
	$(tableName).setGridParam({rowNum:dataArray.length});
	$(tableName).trigger('reloadGrid');

	function getSelectedRow() {
		   window.localStorage.setItem("docSelect",$("#docSelect").val());  //setItem
		 	window.localStorage.setItem("nsSelect",$("#nsSelect").val());  //setItem
		    	
		    switchHtml("/TanTimaServices/html/ContentPage/ContentPage.html"); 
		    	
		    	var grid = $(tableName);
			    var rowKey = grid.jqGrid('getGridParam',"selrow");
			    if(rowKey){
			    	var chart_no =  $(tableName).jqGrid('getCell',rowKey,'chart_no');
			    	var serno = $(tableName).jqGrid('getCell',rowKey,'serno');
			    	var empNo = localStorage.getItem("empNo");  //getItem
				    var sessionID = localStorage.getItem("sessionID");  //getItem
				    var sex = $(tableName).jqGrid('getCell',rowKey,'sex_name');//性別
				    var ckinDate = $(tableName).jqGrid('getCell',rowKey,'ckin_date');//住院日期
				    var dischargeDate =$(tableName).jqGrid('getCell',rowKey,'discharge_date');//出院日期
				    var ptName = $(tableName).jqGrid('getCell',rowKey,'pt_name');//出院日期
				    
				    var birth_date = $(tableName).jqGrid('getCell',rowKey,'birth_date');//出院日期

//			    	console.log("chart_no="+chart_no+" ; serno="+serno);
			    	PatInfoObj.empNo = empNo;
			    	PatInfoObj.sessionID = sessionID;
			    	PatInfoObj.chartNo = chart_no;
			    	PatInfoObj.serno = serno;
			    	PatInfoObj.sex = sex;
			    	PatInfoObj.ckinDate = ckinDate;
			    	PatInfoObj.dischargeDate = dischargeDate;
			    	
			    	var ZoneSetObj = JSON.parse(localStorage.getItem("ZoneSet"));
			    	if(ZoneSetObj==undefined){
			    		PatInfoObj.zone = "四季台安";
			    	}else {
			    		PatInfoObj.zone = ZoneSetObj[0].zone_name;
			    	}
			    	
			    	
//			    	PatInfoObj.zone = "四季台安";
			    	PatInfoObj.ptName = ptName;
			    	PatInfoObj.birthDate = birth_date;
			    	
			    	
			    	
			    	
			    	
			    }
	}
	

}



