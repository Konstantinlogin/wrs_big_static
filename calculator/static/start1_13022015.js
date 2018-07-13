function number_format(number, decimals, dec_point, thousands_sep) {
	//  example 13: number_format('1 000,50', 2, '.', ' ');
	//  returns 13: '100 050.00'
	//  example 14: number_format(1e-8, 8, '.', '');
	//  returns 14: '0.00000001'

	number = (number + '')
		.replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec);
			return '' + (Math.round(n * k) / k)
				.toFixed(prec);
		};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
		.split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '')
		.length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1)
			.join('0');
	}
	return s.join(dec);
}


jQuery(function (){
	
	var sex = 'F';
	var age = 28;
	var cash = 120000;
	var defaultCash = 180346;
	var work_year = 2009;
	var salary = 25000;
	var sumYearVz = 4000;
	var sumMonthVz = 0;
	var sumMonthVzWork = 0;
	var sumOnceVz = 0;
	var years_pay = 3;
	var prcStrah;
	var prcNak;
	var prcNpo;
	var prcSof;
	var yield_npf = 6.6;
	var yield_npo = 0.072;
	var yield_pfr = 6.84;
	var pension_age_m = 60;
	var pension_age_f = 55;
	var fv = 4558.93;

	var kpv1 = 1;
	var kpv2 = 1;
	var spk = 74.27;
	var spk_before_01012015 = 64.1;
	var year = 2016;
	var sof = 'N';
	
	var ipk_gl;
	var ipk66_gl;
	var ipk2015_gl;
	var salary_gl;
	
	initValue = 
	function(){
	
		slider_age
		
			$( "#slider_age" ).closest('.wrap__drag-slider').find( ".amount" ).val(age);
			$( "#slider_age" ).slider("value", age);
			
			$( "#slider_cash" ).closest('.wrap__drag-slider').find( ".amount" ).val(cash);
			$( "#slider_cash" ).slider("value", cash);
			
			$( "#slider_work_year" ).closest('.wrap__drag-slider').find( ".amount" ).val(work_year);
			$( "#slider_work_year" ).slider("value", work_year);
			
			$( "#slider_salary" ).closest('.wrap__drag-slider').find( ".amount" ).val(salary);
			$( "#slider_salary" ).slider("value", salary);
			
			$( "#slider_sumYearVz" ).closest('.wrap__drag-slider').find( ".amount" ).val(sumYearVz);
			$( "#slider_sumYearVz" ).slider("value", sumYearVz);
			
			$( "#slider_years_pay" ).closest('.wrap__drag-slider').find( ".amount" ).val(years_pay);
			$( "#slider_years_pay" ).slider("value", years_pay);
			
			$( "#slider_sumMonthVz" ).closest('.wrap__drag-slider').find( ".amount" ).val(sumMonthVz);
			$( "#slider_sumMonthVz" ).slider("value", sumMonthVz);
			
			$( "#slider_sumMonthVzWork" ).closest('.wrap__drag-slider').find( ".amount" ).val(sumMonthVzWork);
			$( "#slider_sumMonthVzWork" ).slider("value", sumMonthVzWork);
			
			$( "#slider_sumOnceVz" ).closest('.wrap__drag-slider').find( ".amount" ).val(sumOnceVz);
			$( "#slider_sumOnceVz" ).slider("value", sumOnceVz);
	}
		
	
	dontKnow = 
	function(){
	
		var checkbox = document.getElementById("check3");
		
		if (checkbox.checked){
			$( "#slider_cash" ).slider('disable');	
			$( "#slider_cash" ).addClass( "ui-slider-disabled" );
			$( "#slider_cash" ).addClass( "ui-state-disabled" );
			$( "#slider_cash" ).addClass( "ui-disabled" );
			$( "#slider_cash" ).closest('.wrap__drag-slider').find( ".amount" ).val(defaultCash);
			cash = defaultCash;
			$( "#slider_cash" ).slider("value", defaultCash);
		}
		else{
			$( "#slider_cash" ).slider('enable');	
			$( "#slider_cash" ).removeClass( "ui-slider-disabled" );
			$( "#slider_cash" ).removeClass( "ui-state-disabled" );
			$( "#slider_cash" ).removeClass( "ui-disabled" );
		}
		printColumn();
		
	}

	calcSof =
	function (){
		var x = 0;
		var age_ = age;
		
		if (sof == 'Y'){
			if (sex == 'M'){
				if(age_ >= pension_age_m)age_ = pension_age_m-1;
				x = parseFloat((sumYearVz*Math.pow(1+yield_npf/100,years_pay)+(sumYearVz*Math.pow(1+yield_npf/100,years_pay+1)-sumYearVz*(1+yield_npf/100))/(yield_npf/100))*Math.pow(1+yield_npf/100,(pension_age_m-age_-years_pay)));
			}
			else{
				if(age_ >= pension_age_f)age_ = pension_age_f-1; 
				x = parseFloat((sumYearVz*Math.pow(1+yield_npf/100,years_pay)+(sumYearVz*Math.pow(1+yield_npf/100,years_pay+1)-sumYearVz*(1+yield_npf/100))/(yield_npf/100))*Math.pow(1+yield_npf/100,(pension_age_f-age_-years_pay)));
			}
		}
		
		return x*2;
	}
			
	calcSum = 
	function (){
		var x = Math.round(calcStrah(),0) + Math.round(calcNak()/228,0) + Math.round(calcSof()/228,0)+Math.round(calcNpo()/228,0);			
		return x;	
	}

	calcNak =
	function (){
		var sum_pens_nak;	
		var age_ = age;
		
		if (sex == 'M'){
			if(age_ >= pension_age_m)age_ = pension_age_m-1; 
			sum_pens_nak = parseFloat(cash*Math.pow(1+yield_npf/100,pension_age_m-age_)+((salary*0.06*12)*Math.pow(1+yield_npf/100,((pension_age_m-1)-age_)+1)-(salary*0.06*12)*(1+yield_npf/100))/(yield_npf/100));
		}
		else{
			if(age_ >= pension_age_f)age_ = pension_age_f-1; 
			sum_pens_nak = parseFloat(cash*Math.pow(1+yield_npf/100,pension_age_f-age_)+((salary*0.06*12)*Math.pow(1+yield_npf/100,((pension_age_f-1)-age_)+1)-(salary*0.06*12)*(1+yield_npf/100))/(yield_npf/100));
		}
		return sum_pens_nak;
	}	
	
	calcAll = 
	function (){
		var x = Math.round((Math.round(calcNak()/228,0) + Math.round(calcNpo()/228,0) + Math.round(calcSof()/228,0))*228,0);
		
		return x;	
	}
	
	calcStrah =
	function calcStrah(){
		var ipk_before_01012015;
		var ipk;
		var ipk66;
		var age_ = age;
		var salary_;
		
		if (salary >= 66334){
			salary_ = 66334;
		}
		else{
			salary_ = salary;
		}
		
				
		if (work_year < 2016){
			ipk_before_01012015 = (((salary_*0.1*12)*Math.pow(1+yield_pfr/100,year-work_year)+((salary_*0.1*12)*Math.pow(1+yield_pfr/100,year-work_year)-(salary_*0.1*12)*(1+yield_pfr/100))/(yield_pfr/100))/228)/spk_before_01012015;
		}
		else {
			ipk_before_01012015 = 0;
		}
				
		if (sex == 'M'){
			if(age_ >= pension_age_m)age_ = pension_age_m-1; 
			ipk = (((salary_*0.1*12)/(796000*0.16))*10)*(pension_age_m-age_-(year-work_year))+ipk_before_01012015;				
			//ipk66 =(salary_*0.1*12)/(((((salary_*12)-796000)*0.1))*10)*(pension_age_m-age_-(year-work_year))+ipk_before_01012015
		}
		else{
			if(age_ >= pension_age_f)age_ = pension_age_f-1; 
			ipk = (((salary_*0.1*12)/(796000*0.16))*10)*(pension_age_f-age_-(year-work_year))+ipk_before_01012015;
			//ipk66 =(salary_*0.1*12)/(((((salary_*12)-796000)*0.1))*10)*(pension_age_f-age_-(year-work_year))+ipk_before_01012015
		}
		
	//	if (salary_ >= 66334){
	//		ipk = ipk + ipk66;
	//	}
		
		ipk_gl = ipk;
		ipk66_gl = ipk66;
		ipk2015_gl = ipk_before_01012015;
		salary_gl = salary_;
		var x = parseFloat((fv*kpv1)+(ipk*kpv2*spk));
		return x;
	}
	
	calcNpo = 
	function calcNpo(){
		var x;
		var n;
		
		if (sex == 'M'){
			n = (pension_age_m-age);
		}
		else{
			n = (pension_age_f-age);
		}
		
		x = sumOnceVz*Math.pow((1 + yield_npo), n) + ((sumMonthVz+sumMonthVzWork)*12) * Math.pow((1 + yield_npo), n); 
		
		for(var i = 1; i < n+1; i++){
				x = x + ((sumMonthVz+sumMonthVzWork)*12) * Math.pow((1 + yield_npo), (n-i)); 
		}
		
		return x;
	}
		
	sofHideShow =
	function (){
			
		var checkbox = document.getElementById("check1");
		
		if (checkbox.checked){
			document.getElementById("sofBox").style.display = "block";
			document.getElementById("column4").style.display = "block";
			document.getElementById("current_sof").style.display = "block";
			sof = 'Y';
		}
		else{
			document.getElementById("sofBox").style.display = "none";
			document.getElementById("column4").style.display = "none";
			document.getElementById("current_sof").style.display = "none";
			sof = 'N';
		}
		printColumn();
	}	
	
	printColumn = 
	function (){
	
	/*	if (work_year == year || (sex == 'M' && age == (pension_age_m-1)) || (sex == 'F' && age == (pension_age_f-1))){
			prcStrah = 100;
			$('.graph .column3').css('height', 330*prcStrah/100);
			
			if (sof == 'Y'){
				prcSof = 0;
				$('.graph .column4').css('height', 330*prcSof/100);
			}
								
			$("#acc_sum").html(number_format(0,0,' ',' ' ));
			$("#ins_sum").html(number_format(fv,0,' ',' ' ));
			$("#sof_sum").html(number_format(0,0,' ',' ' ));
			$("#npo_sum").html(number_format(0,0,' ',' ' ));
			
			$("#sum").html(number_format(fv,0,' ',' ' ));
			$("#all").html(number_format(0,0,' ',' ' ));
			
			document.getElementById("column4").style.display = "none";
			document.getElementById("current_sof").style.display = "none";
		}
		else{*/
		
			prcStrah = (calcStrah()*330)/calcSum();
			prcNak = (calcNak()*330)/calcSum();
			prcNpo = (calcNpo()*330)/calcSum();
			prcSof = (calcSof()*330)/calcSum();
			
			if (sof == 'Y'){
				document.getElementById("column4").style.display = "block";
				document.getElementById("current_sof").style.display = "block";
			}
							
			$('.graph .column3').css('height', prcStrah);
			$('.graph .column2').css('height', prcNak/228+prcStrah);
			$('.graph .column4').css('height', prcSof/228+prcNak/228+prcStrah);
			$('.graph .column5').css('height', prcNpo/228+prcSof/228+prcNak/228+prcStrah);
													
			$("#acc_sum").html(number_format(calcNak()/228,0,' ',' ' ));
			$("#ins_sum").html(number_format(calcStrah(),0,' ',' ' ));
			$("#sof_sum").html(number_format(calcSof()/228,0,' ',' ' ));
			$("#npo_sum").html(number_format(calcNpo()/228,0,' ',' ' ));
				
			$("#sum").html(number_format(calcSum(),0,' ',' ' ));
			$("#all").html(number_format(calcAll(),0,' ',' ' ));
		//}
	}	
			
	$('.sex input[type=radio]').Custom({
		customStyleClass: 'checkbox',
		customHeight: '19',
		enableHover: true,
	});
	$('.user-type__row input[type=checkbox]').Custom({
		customStyleClass: 'checkbox',
		customHeight: '15',
		enableHover: true
	});
	$('.wrap-check input[type=checkbox]').Custom({
		customStyleClass: 'checkbox',
		customHeight: '15',
		enableHover: true
	});
					
	if ($('.drag-slider').length) {

		$('.drag-slider').each(function () {
			var el = $(this);
			el.slider({
				range:'min',
				value:0,
				min: parseInt(el.attr('data-min')),
				max: parseInt(el.attr('data-max')),
				step: parseInt(el.attr('data-step')),
				slide: function( event, ui ) {

					if(el.hasClass('your-age')){
						var index_age = $(this).closest('.wrap__drag-slider').find( ".amount" ).val();
						age = ui.value;
						printColumn();						
					}
					if(el.hasClass('cash')){
						el.closest('.wrap__drag-slider').find( ".amount" ).val(number_format(ui.value,0,' ',' ' ));
						cash = ui.value;
						printColumn();
					}	
					if(el.hasClass('work_year')){
						el.closest('.wrap__drag-slider').find( ".amount" ).val(ui.value);
						work_year = ui.value;
						printColumn();
					}
					if(el.hasClass('salary')){
						el.closest('.wrap__drag-slider').find( ".amount" ).val(number_format(ui.value,0,' ',' ' ));
						salary = ui.value;
						printColumn();
					}
					if(el.hasClass('sumYearVz')){
						el.closest('.wrap__drag-slider').find( ".amount" ).val(number_format(ui.value,0,' ',' ' ));
						sumYearVz = ui.value;
						printColumn();
					}
					if(el.hasClass('sumMonthVz')){
						el.closest('.wrap__drag-slider').find( ".amount" ).val(number_format(ui.value,0,' ',' ' ));
						sumMonthVz = ui.value;
						printColumn();
					}
					if(el.hasClass('sumMonthVzWork')){
						el.closest('.wrap__drag-slider').find( ".amount" ).val(number_format(ui.value,0,' ',' ' ));
						sumMonthVzWork = ui.value;
						printColumn();
					}
					if(el.hasClass('sumOnceVz')){
						el.closest('.wrap__drag-slider').find( ".amount" ).val(number_format(ui.value,0,' ',' ' ));
						sumOnceVz = ui.value;
						printColumn();
					}
					if(el.hasClass('years_pay')){
						el.closest('.wrap__drag-slider').find( ".amount" ).val(ui.value);
						years_pay = ui.value;
						printColumn();						
					}else{
						el.closest('.wrap__drag-slider').find( ".amount" ).val(ui.value);
					}
				}
			});
			el.closest('.wrap__drag-slider').find( ".amount" ).val(el.slider( "value" ) );
		});
	}
	
	func =
	function (){
	 alert('age: ' + age  + '\n'
		   + 'cash: ' + cash + '\n'
		   + 'work_year: ' + work_year + '\n'
		   + 'salary_gl: ' +salary_gl + '\n'
		   + 'sumYearVz: ' +sumYearVz + '\n'
		   + 'years_pay: ' +years_pay + '\n'
		   + 'ipk_gl: ' +ipk_gl + '\n'
		   + 'ipk66_gl: ' +ipk66_gl + '\n'
		   + 'ipk2015_gl: ' +ipk2015_gl + '\n');
	}
	
	setSex =
	function (p_sex){
				
		var radios = document.getElementsByName("p_t03");
		var slider = $('#slider_age');
		var max_age;
			
		$("#sex").val(p_sex);
		sex = $("#sex").val();
		
		for(var i = 0; i < radios.length; i++){
			if(radios[i].checked){
				sex = radios[i].value;
			}
		}
						
		/*
		if (sex == 'M'){
			slider.slider({min:14, max: pension_age_m-1});
			$("#middle_age").html(parseInt(14+(pension_age_m-1-14)/2));
			$("#max_age").html(pension_age_m-1);
		}
		else{
			slider.slider({min:14, max: pension_age_f-1});
			$("#middle_age").html(parseInt(14+(pension_age_f-1-14)/2));
			$("#max_age").html(pension_age_f-1);
			if (age > pension_age_f-1){
				age = pension_age_f-1;
				$( "#slider_age" ).find( ".amount" ).val(number_format(age,0,' ',' ' ));
				$( "#slider_age" ).slider("value", pension_age_f-1);
				$( "#slider_age" ).closest('.wrap__drag-slider').find( ".amount" ).val(pension_age_f-1);
			}
		}*/
		
		printColumn();
	}
	
	sofHideShow();
	initValue();
	setSex('F');
});