var adtimer = null;
function adChanges(flkty,adPage,adTotal){
	clearTimeout(adtimer);
	adChangeTime = 1000;
	if(adPage == adTotal){
		adPage = 0;
	}else{
		adPage++;
	}
	flkty.select(adPage);
	adtimer = setTimeout(function(){
		adChanges(flkty,adPage,adTotal);
	},adChangeTime);
}