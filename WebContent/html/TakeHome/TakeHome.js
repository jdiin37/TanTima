
$(document).ready(function(){
	
	

});


function renderTakeHome(){
	
//	setTimeout(function(){ 
		ajax_getTakeHomeList("Inpcht2Service");
//    }, 200);
	
	
}

var TakeHomeArray=[];

function getInpTakeHomeStatObj(empNo,sessionID,chartNo,serno,method){
	this.empNo = empNo;
	this.sessionID = sessionID;
	this.chartNo = chartNo;
	this.serno = serno;
	this.method = method;
	
};

var acntDateObj = function(acnt_date){
	this.acnt_date = acnt_date;
	
}; 



/**呼叫STAT API **/
function ajax_getTakeHomeList(serviceName){

	var cmParam = new getInpTakeHomeStatObj(PatInfoObj.empNo,PatInfoObj.sessionID,PatInfoObj.chartNo,PatInfoObj.serno,"getInpcht2TakeHomeByChartNoSerno");			
	 TakeHomeArray=[];
	 var request = $.when(ajax_Post(serviceName,JSON.stringify(cmParam))).done(
			function(data) {
				
					if (data.status == "Success") {
						//console.log(data.resultSet.length);
						$.each(data.resultSet, function(index, obj) {
							TakeHomeArray.push(obj);

						});
						
						
						var acntDateArray = [];
						var acntDate = TakeHomeArray.map(function(obj) { return obj.acnt_date; }); 
						
						acntDate = acntDate.filter(function(v,i) { 
							return acntDate.indexOf(v) == i; //過濾重複的日期，return true;
							
						});  
						
						for(var i=0;i<acntDate.length;i++){
							var actObj = new acntDateObj(acntDate[i]);
							acntDateArray.push((actObj));	
						}
						
						jqGrid_TakeHomeList("#TakeHomeList","#TakeHomeList_Pager",acntDateArray); //帳款日期
						jqGrid_TakeHomeDetailList("#TakeHomeDetailList","#TakeHomeDetailList_Pager",TakeHomeArray);
						filterList_single("TakeHomeDetailList","acnt_date",acntDateArray[0].acnt_date);
						
					} else {
					  var ajaxErrMsg = data.errorMessage;
					  jqGrid_TakeHomeList("#TakeHomeList","#TakeHomeList_Pager",acntDateArray); //帳款日期
//					  jqGrid_TakeHomeDetailList("#TakeHomeDetailList","#TakeHomeDetailList_Pager",TakeHomeArray);
					  noDataFound(ajaxErrMsg,"TakeHomeList");
					  noDataFound(ajaxErrMsg,"TakeHomeDetailList");
					  
//					  if(ajaxErrMsg.includes('No Data Found')){
//						  alert("查無出院帶藥紀錄");
//					  }
					  
					}
					
					
					
					
					
					
				
			});

    request.onreadystatechange = null;
	request.abort = null;
	request = null;
	
}


var setTakeHomeDetailArray = function(originalArray,filterVal){
    
    var newArr = $.grep(originalArray,function(o,index){
//    	 console.log((o.acnt_date==filterVal));
        return (o.acnt_date==filterVal);
     });
    
    return newArr;
};


//takehome 日期清單
var jqGrid_TakeHomeList = function(tableName,pagerName,arrayData){
	 var tableGrid = $(tableName);
	 var takeGridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+60);
	 	$(tableName).jqGrid({
	    datatype: "local",
	    rownumbers: true,
	    rownumWidth:40,
//	    rowNum: Math.floor((pageHeight - 220)/33),
//	    rowNum : "-1", //表顯示全部
//	    rowNum:5000,
	    height: takeGridHeight,
	    pagerpos:'left',
	    width:null,
	    colModel: [
//	    { label: '帳款日期',name: 'acnt_date', width: 100,formatter: function(cellvalue, options, rowobject){
//            return '<span  onclick="filterUdList('+"\'" + rowobject.acnt_date+"\'"+');">'+ rowobject.acnt_date +'</span>';
//
//        }},
        {label: '帳款日期',name: 'acnt_date', width: 90},
        	       	      
	    ],
	    viewrecords: false, // show the current page, data rang and total records on the toolbar
	    onSelectRow:getSelectedRow,
	    shrinkToFit: false,
//	    sortable:true,  //可否拖曳排序
//		pager: pagerName,
		gridComplete: function () {
			$(this).jqGrid('setSelection', 1, true);
      }
		
		
	});
//	$(tableName).jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
	$(tableName).jqGrid('clearGridData');
	$(tableName).jqGrid('setGridParam', {data: arrayData});
	var rowNumTotal = 0;
	if(arrayData==null){
		rowNumTotal =0;
	}else{
		rowNumTotal = arrayData.length;
	}
	$(tableName).setGridParam({rowNum:rowNumTotal});
	$(tableName).trigger('reloadGrid');
//	AppendPager("TakeHomeList","TakeHomeList" + "_pager","TakeHomeList"+"_tot",takeGridHeight);// 使用在  STAT,出院帶藥 帳款日期Grid上
//	$(tableName).jqGrid("navGrid", pagerName,
//			{ add: false, edit: false, del: false, search: true, view: true, refresh: false });

	function getSelectedRow() {
		
		var grid = $(tableName);
		var rowKey = grid.jqGrid('getGridParam',"selrow");		
		if(rowKey){
			var acnt_date = $(tableName).jqGrid('getCell',rowKey,'acnt_date');
			filterList_single("TakeHomeDetailList","acnt_date",acnt_date);
//			jqGrid_TakeHomeDetailList("#TakeHomeDetailList","#TakeHomeDetailList_Pager",setTakeHomeDetailArray(TakeHomeArray,acnt_date));


		}else{
			 alert("沒有資料被選擇");
		}
  
	}
}


// var NumOfRow = Math.floor(($(window).height()-255)/36);
 var jqGrid_TakeHomeDetailList = function(tableName,pagerName,arrayData){
	 var tableGrid = $(tableName);
	 var takeGridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+110);
	 	$(tableName).jqGrid({
	    datatype: "local",
//	    scrollOffset: 0,
	    sortcolumn: 'rec_count',
	    sortdirection: 'asc',
	    rowNum:100,
	    height: takeGridHeight,
	    width:null,
	    colModel: [
	    	{ label: '序', name: 'rec_count', width: 40,search:false,hidden:false,align:'center',frozen:true},
	        { label: '用藥名稱', name: 'full_name',width: 280,align:'left',frozen:true},
	        { label: '帳款日期',name: 'acnt_date', width: 100,hidden:true},
	        { label: '1.藥品  2.處置  3.材料', name: 'price_type', width: 150,hidden:true},
//	        { label: '1.藥品  2.處置  3.材料', name: 'price_type', width: 150,formatter:formatStatPriceType},
//	        { label: '單次量', name: 'qty', width: 70,align:'right'},
	        { label: '單次量', name: 'qty', width: 80,align:'left',formatter:function(cellvalue, options, rowobject){
    			return "<span class='text-dark'>"+filterNull(rowobject.qty)+" "+filterNull(rowobject.unit) + "</span>";	
    	
    	}},
	        { label: '用法', name: 'use_name_e', width: 70,align:'left'},
	        { label: '天數', name: 'day', width: 50,align:'right'},
//			{ label: '單位', name: 'unit', width: 80,align:'center'},
//	        { label: '常規用法', name: 'use', width: 90,align:'left'},
//			{ label: '單位', name: 'use_name_e', width: 50,align:'center'},
//			{ label: '總量', name: 'tqty', width: 50,align:'right'},
	        { label: '總量', name: 'tqty', width: 80,align:'left',formatter:function(cellvalue, options, rowobject){
    			return "<span class='text-dark'>"+filterNull(rowobject.tqty)+" "+filterNull(rowobject.unit)+"</span>";	
    	
    	}},
//			{ label: '單位', name: 'unit', width: 50,align:'center'},
			{ label: '途徑', name: 'method_name_e', width: 70,align:'left'},
			{ label: '急', name: 'emg', width: 40,align:'center'},
//			{ label: '出院帶藥 Y/N', name: 'take_home', width: 100,formatter: "checkbox",edittype: "checkbox", editoptions: {value: "Y:N"},formatoptions:{disabled: true}},
			{ label: '實用量', name: 'do_tqty', width: 70,align:'right'},
			{ label: '就醫科別', name: 'div_name', width: 100,align:'center'},
			{ label: '開始日期', name: 'start_date', width: 110,formatter: formatDateTime,align:'left'},
			{ label: '時間', name: 'start_time', width: 70,formatter: formatDateTime,align:'center'},
			{ label: 'DC日期', name: 'end_date', width: 110,formatter: formatDateTime,align:'left'},
			{ label: '時間', name: 'end_time', width: 70,formatter: formatDateTime,align:'center'},
			{ label: '批價代號', name: 'code', width: 100,align:'left'},
			{ label: '加成', name: 'add_rate', width: 100,align:'right'},
			{ label: '金額', name: 'amt', width: 100,align:'right'},
			{ label: '自費', name: 'self', width: 50,align:'center'},
			{ label: '庫別', name: 'stock', width: 60,align:'left'},
			{ label: '醫師', name: 'doctor_name', width: 70,align:'center'},
//			{ label: '手術醫師', name: 'op_doctor_no', width: 70},
			{ label: '開刀部位', name: 'order_pos', width: 80,align:'left'},
			{ label: '批價員', name: 'cashier_name', width: 70,align:'center'},
			{ label: '補差額', name: 'he_add_fee', width: 100,align:'right'},
//			{ label: '折扣', name: 'acnt_discount', width: 100},
//			{ label: '折扣註記', name: 'acnt_discount_remark', width: 100},
			{ label: '影像來源', name: 'dicom_flag', width: 100,align:'left'},
			{ label: '事前審查編號', name: 'project_no', width: 120,align:'left'},
			
	      
	    ],
	    viewrecords: true, // show the current page, data rang and total records on the toolbar
//	    onSelectRow:getSelectedRow,
	    width: null,
	    shrinkToFit: false,
//	    sortable:true,  //可否拖曳排序
		pager: pagerName,
		gridComplete: function () {
	
          }
		
		
	});
//	$(tableName).jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
	$(tableName).jqGrid('clearGridData');
	$(tableName).jqGrid('setGridParam', {data: arrayData});
//	$(tableName).jqGrid('setFrozenColumns');
	$(tableName).trigger('reloadGrid');
//	$(tableName).jqGrid("navGrid", pagerName,
//			{ add: false, edit: false, del: false, search: true, view: true, refresh: false });

	function getSelectedRow(rowId,status,e) {
		
		if(status===true){
			//須隨之改變的html
		}
		
	
      
	}
	/**function getSelectedRow() {
	    var grid = $(tableName);
	    var rowKey = grid.jqGrid('getGridParam',"selrow");
	   if (rowKey){        
	    	PatObj.chart_no = rowKey;
	    	showLoading();
	    	ajax_getChartByChartNo();
	    	$('#collapseMain').collapse('show');
	    	setPageVisible("queryPage",false);
	    	setPageVisible("mainPage",true);
	    }
	    else{
	        alert("沒有資料被選擇");
	    }
	}  **/
}
 
 
 /** 1.藥品/2.處置/3.材料**/
 function formatStatPriceType(cellValue, options, rowObject) {
 	
 	switch(cellValue){
 	case 1:
 		return "藥品";
 		break;
 	case 2:
 		return "處置";
 		break;
 	case 3:
 		return "材料";
 		break;
 		default:
 		
 	}

         		  
 }; 
 
 
 