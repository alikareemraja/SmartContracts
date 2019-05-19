$( document ).ready(function() {
	setTimeout(slideLetsGoIn, 1500);
	// setTimeout(slideEditNotice, 1500);
	userHasExploredScrolling = false;
	step = 1;
	$("#letsGo").click(letsGo);
});


function letsGo(){
	$("#letsGo").css("display","none").css('bottom','-70px');

	if (step == 1) {
	
		$("#orpay").css("display","inline");
	} else if (step == 2) {

		//need to undo the CSS hack for Firefox
		$("#needToWrite").attr('style', 'padding-top:10px !important;');
		$("#needToWrite").stop().animate({
			top: "1.5%",
			fontSize: "350%",
			easing: "easein"
		}, 500, function() {		
			$("#googleFit").css("display","inline-block");
		});

		$("#circle").stop().animate({
			top: "-225px",
			left: "-227px",
			easing: "easein"
		}, 100, function() {});

	} else if (step == 3) {

		$("#howItWorks").css("display","inline-block");
	} else if (step == 4) {

		createContract();
	}



	setTimeout(slideLetsGoIn, 1000);
	step += 1;
	$(".steps").css("display","none")
	$("#step-" + step.toString()).css("display","inline");
}



function slideEditNotice(){
	$("#circle").css("display","inline");
	$("#circle").stop().animate({
		top: "-125px",
		left: "-127px",
		easing: "easein"
	}, 200, function() {
		
	});
}

function slideLetsGoIn(){
	$("#letsGo").css("display","inline");
	$("#letsGo").stop().animate({
		bottom: "6%",
		easing: "easein"
	}, 200);
}


