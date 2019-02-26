
$(document).ready(function(){
	
	$(document).on('keyup', 'input[type=number]', function(event) {
		
		val = parseFloat($(this).val());
		min = parseFloat($(this).attr('min'));
		max = parseFloat($(this).attr('max'));
		
			if(isNaN(val)&&$(this).val()!=""){
				$(this).attr('title', '非數字  請輸入數字').tooltip('fixTitle').tooltip('show');
				$(this).val("");
			}else{
				$(this).attr('style','background:white;color:black');
				$(this).tooltip('destroy');
			}

//		console.log(val + ";" + min + ";" +max);
			
			
			if(val > max){
				$(this).attr('title', '數值太大').tooltip('fixTitle').tooltip('show');
				$(this).attr('style','background:red;color:white;');
//				$(this).addClass('text-danger').removeClass('text-danger');

			}else if(val < min){
				$(this).attr('title', '數值太小').tooltip('fixTitle').tooltip('show');
				$(this).attr('style','background:red;color:white;');
			}else{			
				$(this).attr('style','background:white;color:black');
				$(this).tooltip('destroy');
			}

		
			
	});
	
	
	

});





