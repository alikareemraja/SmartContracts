$( document ).ready(function() {

	setInterval(handleParameterChange,1000);

});




function handleParameterChange(){

	//convert from pages. Average words/page = 231
	var numberOfWords = Math.round(parseFloat($("#quantity").text())*231);
	var deadlineDate = $("#deadlineDate").text();
	var deadlineTime = $("#deadlineTime").text();


	if(deadlineDate.toLowerCase()=="tonight"){
		deadlineDate="today";
	}

	theDeadline = Date.create(deadlineDate+" at "+deadlineTime);
	
	//change the time text
	if(theDeadline>Date.now()){
		$("#timer").text(countdown(Date.now(), theDeadline, countdown.DAYS|countdown.HOURS|countdown.MINUTES).toString());
	}else{
		if(theDeadline=="Invalid Date"){
			$("#timer").text("to finish your sentences");
		}else{
			$("#timer").text("to have a good relationship with Superman");
		}
	}

	//determine a judgement of the length, 0=really really short, 1=short, 2=moderate length, 3=pretty long, 4=really long, 5=way too long
	var wordsPerPage = 231;
	var judgementOfLength=0; 

	if(numberOfWords<=wordsPerPage/2){
		judgementOfLength=0;//less than 1/2
	}else if(numberOfWords>wordsPerPage/2&&numberOfWords<=wordsPerPage*2){ 
		judgementOfLength=0;//between 1/2 and 2
	}else if(numberOfWords>wordsPerPage*2&&numberOfWords<=wordsPerPage*5){
		judgementOfLength=1;//between 2 and 5
	}else if(numberOfWords>wordsPerPage*5&&numberOfWords<=wordsPerPage*10){
		judgementOfLength=2;//between 5 and 10
	}else if(numberOfWords>wordsPerPage*10&&numberOfWords<=wordsPerPage*25){
		judgementOfLength=3;//between 10 and 25
	}else if(numberOfWords>wordsPerPage*25&&numberOfWords<=wordsPerPage*45){
		judgementOfLength=4;//between 25 and 45
	}else{
		judgementOfLength=5;//over 45
	}

	//change our judgement of the time text
	if(theDeadline.isBetween('now','1 hour from now')){

		if(judgementOfLength<=1){
			$("#timeJudgement").text("you might get really lucky");
		}else if(judgementOfLength==2){
			$("#timeJudgement").text("you're probably not going to make it");
		}else if(judgementOfLength>2){
			$("#timeJudgement").text("there's just no way");
		}

	}else if(theDeadline.isBetween('1 hour from now','3 hour from now')){

		if(judgementOfLength==0){
			$("#timeJudgement").text("you can probably do it");
		}else if(judgementOfLength==1){
			$("#timeJudgement").text("it's going to be close");
		}else if(judgementOfLength==2){
			$("#timeJudgement").text("you might get lucky, but probably not");
		}else if(judgementOfLength>=3){
			$("#timeJudgement").text("there's just no way");
		}

	}else if(theDeadline.isBetween('3 hour from now','5 hour from now')){

		if(judgementOfLength<=1){
			$("#timeJudgement").text("you got this, just concentrate");
		}else if(judgementOfLength==2){
			$("#timeJudgement").text("there's a chance");
		}else if(judgementOfLength==3){
			$("#timeJudgement").text("you're probably not going to be able to do it");
		}else if(judgementOfLength>3){
			$("#timeJudgement").text("there's just no way");
		}

	}else if(theDeadline.isBetween('5 hour from now','10 hour from now')){

		if(judgementOfLength<=1){
			$("#timeJudgement").text("you got this");
		}else if(judgementOfLength==2){
			$("#timeJudgement").text("you may actually be able to do it");
		}else if(judgementOfLength==3){
			$("#timeJudgement").text("you're really going to have to concentrate on this one");
		}else if(judgementOfLength>3){
			$("#timeJudgement").text("there's just no way");
		}
		

	}else if(theDeadline.isBetween('10 hours from now','24 hours from now')){

		if(judgementOfLength<=2){
			$("#timeJudgement").text("you got this");
		}else if(judgementOfLength==3){
			$("#timeJudgement").text("you're going to need some luck");
		}else if(judgementOfLength>3){
			$("#timeJudgement").text("it's not happening");
		}
		

	}else if(theDeadline.isBetween('24 hours from now','36 hours from now')){

		if(judgementOfLength<3){
			$("#timeJudgement").text("you got this, you just need to concentrate");
		}else if(judgementOfLength==3){
			$("#timeJudgement").text("you're going to need some coffee");
		}else if(judgementOfLength==4){
			$("#timeJudgement").text("tears will be shed");
		}else if(judgementOfLength==5){
			$("#timeJudgement").text("you're totally screwed");
		}

	}else if(theDeadline.isBetween('36 hours from now','48 hours from now')){

		if(judgementOfLength<3){
			$("#timeJudgement").text("you can do it with some concentration");
		}else if(judgementOfLength==3){
			$("#timeJudgement").text("tears will be shed");
		}else if(judgementOfLength==4){
			$("#timeJudgement").text("you should just give up now");
		}else if(judgementOfLength==5){
			$("#timeJudgement").text("you're totally screwed");
		}

	}else if(theDeadline.isBetween('48 hours from now','72 hours from now')){

		if(judgementOfLength<3){
			$("#timeJudgement").text("you can do it");
		}else if(judgementOfLength==3){
			$("#timeJudgement").text("tears will be shed, but you'll make it");
		}else if(judgementOfLength==4){
			$("#timeJudgement").text("you're in trouble");
		}else if(judgementOfLength==5){
			$("#timeJudgement").text("you might just make it");
		}
	}else {
		$("#timeJudgement").text("you even have time to plan");
	}

	//if it turned out that they entered in a past date 
	if(theDeadline<=Date.now()){
		$("#timeJudgement").text("you're done for");
	}

	if(theDeadline=="Invalid Date"){
		$("#timeJudgement").text("inputting a valid date");
	}

	//average composition speed: 19wpm 
	minutesToFinishWithoutDistraction = Math.round(numberOfWords/19);
	expectedFinishTime = Date.create(Math.round(numberOfWords/19)+" minutes from now");
	//set the text to the amount of time it would take
	$("#nonStopTime").text(countdown(Date.now(), expectedFinishTime, countdown.DAYS|countdown.HOURS|countdown.MINUTES).toString());
	$("#finishTime").text(expectedFinishTime.format(function(value, unit, ms, loc) {// Returns an absolute date, but only if the offset is greater than a day.
		if(ms.abs() > (1).day()) {
			return '{Weekday} at {12hr}:{mm}{tt}';
		}else{
			return '{12hr}:{mm}{tt}';
		}
	}));


	//Average productive time per 8 hours: 2 hours and 53 minutes, which gives multiplier 2.774.  
	minutesToFinishWithDistraction = Math.round((numberOfWords/19)*2.774);
	expectedFinishTimeWithDistraction = Date.create(minutesToFinishWithDistraction+" minutes from now");
	//set the text to the amount of time it would take
	$("#distractionTime").text(countdown(Date.now(), expectedFinishTimeWithDistraction, countdown.DAYS|countdown.HOURS|countdown.MINUTES).toString());
	$("#finishTimeWithDistraction").text(expectedFinishTimeWithDistraction.format(function(value, unit, ms, loc) {// Returns an absolute date, but only if the offset is greater than a day.
		if(ms.abs() > (1).day()) {
			return '{Weekday} at {12hr}:{mm}{tt}';
		}else{
			return '{12hr}:{mm}{tt}';
		}
	}));

	//Hours of research per word count: 1 hour per 300 words. 
	minutesToFinishResearchAndDistraction = minutesToFinishWithDistraction + Math.round(((numberOfWords/300)*60));
	expectedFinishTimeWithResearchAndDistraction = Date.create(minutesToFinishResearchAndDistraction+" minutes from now");
	//set the text to the amount of time it would take
	$("#researchTime").text(countdown(Date.now(), expectedFinishTimeWithResearchAndDistraction, countdown.DAYS|countdown.HOURS|countdown.MINUTES).toString());
	$("#finishTimeWithResearch").text(expectedFinishTimeWithResearchAndDistraction.format(function(value, unit, ms, loc) {// Returns an absolute date, but only if the offset is greater than a day.
		if(ms.abs() > (1).day()) {
			return '{Weekday} at {12hr}:{mm}{tt}';
		}else{
			return '{12hr}:{mm}{tt}';
		}
	}));


	//Average percent of wasted time on Facebook: 41%
	timeWastedOnFacebook = Math.round(((minutesToFinishWithDistraction - minutesToFinishWithoutDistraction)*0.41));
	timeToWasteOnFacebook = Date.create(timeWastedOnFacebook+" minutes from now");
	$("#timeOnFacebook").text(countdown(Date.now(), timeToWasteOnFacebook, countdown.DAYS|countdown.HOURS|countdown.MINUTES).toString());

	//average reading speed: 200wpm.  
	timeToRead = Date.create(Math.ceil(numberOfWords/200)+" minutes from now");
	//set the text to the amount of time it would take
	$("#timeToRead").text(countdown(Date.now(), timeToRead, countdown.DAYS|countdown.HOURS|countdown.MINUTES).toString());

	
	//average calories burned: 46 per half hour for 140 pound individuals  
	numberOfMinutesToType = numberOfWords/19;
	caloriesBurned = Math.ceil((numberOfMinutesToType/30)*46);
	$("#caloriesBurned").text(caloriesBurned);
	

	//number of hours coffee stays in system: 2-5 hours. We'll use 2. 
	numberOfCupsOfCoffee = Math.ceil(minutesToFinishWithDistraction/(60*2));
	$("#numberOfCoffeeCups").text(numberOfCupsOfCoffee);
	if(numberOfCupsOfCoffee==1){
		$("#cupOrCups").text("cup");
	}else{
		$("#cupOrCups").text("cups");
	}

	//Hours of proofreading per word count
	proofReadingTime = Math.round(((numberOfWords/666)*60));
	expectedTimeProofreading = Date.create(proofReadingTime+" minutes from now");
	//set the text to the amount of time it would take
	$("#timeToSpendEditing").text(countdown(Date.now(), expectedTimeProofreading, countdown.DAYS|countdown.HOURS|countdown.MINUTES).toString());


	//10-15 page paper should have 5-8 sources. So we'll say 1 source for every 425 words. And 3 references per source. 
	estimatedNumberOfSources=Math.ceil(numberOfWords/425);
	if(estimatedNumberOfSources==1){
		$("#sourceOrSources").text("source");
	}else{
		$("#sourceOrSources").text("sources");
	}
	
	estimatedNumberOfReferences = Math.floor(estimatedNumberOfSources * 2.5); 

	$("#numberOfSources").text(estimatedNumberOfSources);
	$("#numberOfReferences").text(estimatedNumberOfReferences);




}