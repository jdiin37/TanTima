$(document).ready(function(){		
	if(true){
		switchHtml("/TanTimaServices/html/login/login.html");
	}else{
		
	}
	
	var is_mobile = false;

    if( $('#mobile-flag').css('display')=='none') {
        is_mobile = true;       
    }
    
	
    
    
//    window.onbeforeunload = function() {        return "Dude, are you sure you want to leave? Think of the kittens!";    }
	
	
    $(window).resize(function() {
    	
	    // now i can use is_mobile to run javascript conditionally
	    if (is_mobile) {
	    	/*overwrite height 100% by window height on page load*/
			$(document).ready(function(){
				$('html,body').css('height',$(window).height());
			});

			/*update height to window height on resize if new height is bigger - deals with addressbar hiding*/
			$(window).resize(function(){
				if($('html').height()<$(window).height()){
					$('html,body').css('height',$(window).height());
				}
			});

			 /*update height on orientation change only if no input focused as the keyboard showing up triggers orientation change in media query listener too*/
			var mql = window.matchMedia("(orientation: portrait)");
			mql.addListener(function(){
				if($('input:focus').length == 0){
					$('html,body').css('height',$(window).height());
				}
			});
	        //Conditional script here
	    }else{
			userHeight = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;
	
			userWidth = window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;	
			
			resizeGrid(); //resizeGrid 如果畫面size更動
			
			var totalWidth = $(".PatientInfoBar").width(); 
			if(totalWidth){
				var eachLiWidth = (totalWidth/9);
		//	    $("ul.tabs li").css('min-width', eachLiWidth +'px').css('max-width', eachLiWidth +'px');
		//	    $("#ul-TPRTabSwitch > li").css('min-width', (eachLiWidth+0.7) +'px').css('max-width', (eachLiWidth+0.7) +'px');
			}
			
			if($('#PatList')){
				 var navbar = $(".navbar").height(); 
		  		  patListGridHeight = userHeight - (navbar); 
		  		$('#PatList').setGridHeight(patListGridHeight);
			}
			
			
			//Container Height 
			var PatientInfoBarHeight = $(".PatientInfoBar").height();
			var pageTabSwitchHeight = $("#ul-pageTabSwitch").height();
			var RadioBgStyle  =  $(".RadioBgStyle").height();
						
			$.when($(".PatientInfoBar")).done(function(){
				
				   var FocusListHeadHeight = $("#FocusListHead").height();
				    var FocusTopDetailHeight = $("#FocusTopDetail").height();
				    
				    var tabContainerHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+20);
					$(".tab_container").css('min-height', tabContainerHeight +'px').css('max-height', tabContainerHeight +'px');
					
//					var outNoteBodyHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+160); 
//					$(".outNoteBodyBg").css('min-height', (outNoteBodyHeight) +'px').css('max-height', (outNoteBodyHeight) +'px');
					
					var outNoteBodyHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+152); 
					resizePanelBody('outNoteBodyBg',(outNoteBodyHeight)); //重設 OutNoteBody
					
					var xrayBodyHeight =  userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+90);
				//	$("#XrayListBody").css('min-height', xrayBodyHeight +'px').css('max-height', xrayBodyHeight +'px');
				
				//	 var xrayDetailReasonHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+RadioBgStyle+230);
				//	 $("#xrayDetailReason").css('min-height', xrayDetailReasonHeight +'px').css('max-height', xrayDetailReasonHeight +'px');
					
					var xrayDetailReasonHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+50+285);
					$("#XrayListBody").css('min-height', (xrayBodyHeight) +'px').css('max-height', (xrayBodyHeight) +'px');
					    $("#xrayDetailReason").css('min-height', xrayDetailReasonHeight +'px').css('max-height', xrayDetailReasonHeight +'px');
				//	  console.log("xrayDetailReasonHeight"+xrayDetailReasonHeight);
					var FocusListHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+70);
				    $('#FocusList').setGridHeight(FocusListHeight);
					resizePanelBody("FocusRightBody",(FocusListHeight+30));
					resizePanelBody("FocusDARTArea",(FocusListHeight-180));
					resizePanelBody("scrollBody-DART",(FocusListHeight-140));
					
					
//					var FocusDARTAreaHeight = ($(window).height())-(PatientInfoBarHeight+pageTabSwitchHeight+FocusListHeadHeight+FocusTopDetailHeight);
//				      resizePanelBody("FocusDARTArea",FocusDARTAreaHeight);  
				   
				   //Lab	   
				   var labTxtContentHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+RadioBgStyle+70+85);
				   var LabContentPanelHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+80);
				   var LabLineChartHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+110+100);
				
				   if($("#LabLineChart")){
					   resizePanelBody("LabLineChart",(LabLineChartHeight-80));		   
				   }
				   
				   resizePanelBody("LabContentPanel",(LabContentPanelHeight));	   
				   resizePanelBody("is_txt_content",(labTxtContentHeight));//文字型
				   resizePanelBody("Lab_lineChartContent",(LabLineChartHeight));//檢驗趨勢圖
				   
				   
				   var PatientRecordListHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+45); 
				    //病人歷史紀錄 高度
				    resizePanelBody("searchHistory",PatientRecordListHeight);
				    
				    //TPR頁面 Resize
				    var TPRRecordListGridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+100);
				    resizePanelBody("TPRChartContainer",TPRRecordListGridHeight);
				    resizePanelBody("TChartContainer",TPRRecordListGridHeight);
				    resizePanelBody("PChartContainer",TPRRecordListGridHeight);
				    resizePanelBody("RChartContainer",TPRRecordListGridHeight);
				    resizePanelBody("BPChartContainer",TPRRecordListGridHeight);
				    resizePanelBody("WeightChartContainer",TPRRecordListGridHeight);
				    resizePanelBody("IOChartContainer",TPRRecordListGridHeight);
				    

				    	
				    			    	
				    	  var UDgridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+165); 
				    	  var StgridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+60); 
				    	  var StDetailgridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+150);
				    	  var TakeHomeDetailgridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+110);
				    	  var LabgridHeight = userHeight - (PatientInfoBarHeight+pageTabSwitchHeight+110); 
				    	  $('#UdDetailList').setGridHeight(UDgridHeight);
				    	  $('#StatDetailList').setGridHeight(StDetailgridHeight);
				    	  $('#StatList').setGridHeight(StgridHeight);
				    	  $('#TakeHomeList').setGridHeight(StgridHeight);
				    	  $('#TakeHomeDetailList').setGridHeight(TakeHomeDetailgridHeight);
				    	  $('#LabList').setGridHeight(LabgridHeight);
				    	  $('#XrayList').setGridHeight(LabgridHeight);
				    	  
				    	  
				    	  if($(window).height()<400){
				    			var labFormGridHeight = ($(window).height());
				    			$('#LabDataList').setGridHeight(labFormGridHeight);
				    			var TPRRecordListGridHeight = ($(window).height())-180;
				    			$('#TPRRecordList').setGridHeight(TPRRecordListGridHeight);
				    			
				    		}else{
				    			 labFormGridHeight = ($(window).height()-265);
				    			$('#LabDataList').setGridHeight(labFormGridHeight);
				    			
				    			TPRRecordListGridHeight = ($(window).height()-150);
				    			$('#TPRRecordList').setGridHeight(TPRRecordListGridHeight);
				    			
				    		}
				    	  
			
			
			});
			
			
			
			
						
		  		    
		 
		    	  
		    	  

	    }
		
		
	});
    

	
	
//	window.onload = function(){
//		  
//		
//		};
		
});

var PatInfoObj = { 
		empNo : "",
		sessionID:0,
		chartNo:"",
		serno:0,
		ptName:"",
		sex:"",
		ckinDate:"",
		dischargeDate:"",
		zone:"",
		ptName:"",
		birthDate:""
			
	};

