$( document ).ready(function() {
	setTimeout(slideLetsGoIn, 1500);
	setTimeout(slideEditNotice, 1500);
	userHasExploredScrolling = false;
	step = 1;
	$("#letsGo").click(letsGo);
});

function redirect(){
    $("#letsGo").css("display","none").css('bottom','-70px');

    step += 1;
    $("#orpay").css("display","inline");
    step += 1;
	$(".steps").css("display","none")
	$("#step-" + step.toString()).css("display","inline");


		$("#needToWrite").attr('style', 'padding-top:10px !important; font-size:350% !important; top:1.5%;');
		
		$("#circle").stop().animate({
			top: "-225px",
			left: "-227px",
			easing: "easein"
		}, 100, function() {});

		$("#r-distance").text($("#quantity").text());
		$("#r-valueInEther").text(parseInt($("#amount").text(), 10) * 0.0044);
		$("#r-valueInEur").text($("#amount").text());
		$("#r-duration").text($("#deadlineDate").text());


		$("#howItWorks").css("display","inline-block");

		setTimeout(slideLetsGoIn, 1000);
	step += 1;
	$(".steps").css("display","none")
	$("#step-" + step.toString()).css("display","inline");
	document.getElementById("googleFit").style.display="none";
}

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
		}, 400, function() {		
			$("#googleFit").css("display","inline-block");
		});

		$("#circle").stop().animate({
			top: "-225px",
			left: "-227px",
			easing: "easein"
		}, 100, function() {});

	} else if (step == 3) {


        var f = document.createElement("form");
        f.setAttribute('method',"post");
        f.setAttribute('action',"/oauth");

        var email = document.createElement("input"); //input element, text
        email.setAttribute('type',"text");
        email.setAttribute('name',"email");
        text = document.getElementById('email').value
        email.setAttribute('value', text);

        /*var goal = document.createElement("input"); //input element, text
        goal.setAttribute('type',"text");
        goal.setAttribute('name',"goal");
        text = document.getElementById('email').value
        email.setAttribute('value', text);*/


        var distance = document.createElement("input"); //input element, text
        distance.setAttribute('type',"text");
        distance.setAttribute('name',"distance");
        text = parseInt($('#quantity').text(), 10);
        distance.setAttribute('value', text);


        var duedate = document.createElement("input"); //input element, text
        duedate.setAttribute('type',"text");
        duedate.setAttribute('name',"duedate");
        text = parseInt($('#deadlineDate').text(), 10);
        duedate.setAttribute('value', text);

        var amount = document.createElement("input"); //input element, text
        amount.setAttribute('type',"text");
        amount.setAttribute('name',"amount");
        text = parseInt($('#amount').text(), 10);
        amount.setAttribute('value', text);

        var s = document.createElement("input"); //input element, Submit button
        s.setAttribute('type',"submit");
        s.setAttribute('value',"Submit");

        f.appendChild(email);
        f.appendChild(distance);
        f.appendChild(duedate);
        f.appendChild(amount);
        f.appendChild(s);
        document.body.appendChild(f);
        f.submit()


		$("#r-distance").text($("#quantity").text());
		$("#r-valueInEther").text(parseInt($("#amount").text(), 10) * 0.0044);
		$("#r-valueInEur").text($("#amount").text());
		$("#r-duration").text($("#deadlineDate").text());

		$("#howItWorks").css("display","none"); //inline-block
	} else if (step == 4) {

		createContract();
        $("#letsGo").css("visibility","hidden");
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


