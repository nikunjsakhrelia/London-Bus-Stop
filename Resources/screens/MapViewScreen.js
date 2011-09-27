// create main window
var win = Titanium.UI.currentWindow;

//variables..	
var arrAnn = [];

//Edit button onleft..
var btnLocate = Ti.UI.createButton({ title:'Locate' });
win.setLeftNavButton(btnLocate);

//Main View of Current Window
var mainView = Ti.UI.createView({
	width: Titanium.Platform.displayCaps.platformWidth,
	height: Titanium.Platform.displayCaps.platformHeight-40,
	backgroundColor:'#ffffff',
	top:0,
	left:0
});
win.add(mainView);

//create the search bar
var search = Titanium.UI.createSearchBar({
    //showCancel:true,
    height:43,
    top:0,
	autocorrect:false
});
mainView.add(search);
	

//Create annotation..
var ann = Titanium.Map.createAnnotation({
	latitude:51.41780853,
    longitude:0.07896770,
    title:"TREVOR CLOSE",
    //subtitle:'surat',
    //image:'dining_icon.png',
    pincolor: Titanium.Map.ANNOTATION_PURPLE,
    animate:false,
    draggable:true,
    rightButton:Titanium.UI.iPhone.SystemButton.EDIT,
    isRightButtonClicked:false
});
arrAnn.push(ann);

var ann1 = Titanium.Map.createAnnotation({
	latitude:51.30,
    longitude:0.700,
    title:"TREVOR CLOSE",
   // subtitle:'surat1',
    pincolor: Titanium.Map.ANNOTATION_RED,
    animate:false,
    draggable:true,
    rightButton:Titanium.UI.iPhone.SystemButton.EDIT,
    isRightButtonClicked:false
});
//arrAnn.push(ann1);

//Mapview object..
var mapView = Ti.Map.createView({
  mapType: Ti.Map.STANDARD_TYPE,
  region:{
  	latitude:20.5800, longitude:72.5400,
 	latitudeDelta:0.5, longitudeDelta:0.5
  },
  animate:true,
  regionFit:true,
  userLocation:true,
  top:40,
  height:mainView.height - 110
});

mapView.addAnnotations(arrAnn);
mapView.selectAnnotation(arrAnn[0]);

mainView.add(mapView);

///////////////////////////////////////
/// Functions ..


///////////////////////////////////////
///Custom  Events....


///////////////////////////////////////
/// Events....
//Click event handler for Back button..
btnLocate.addEventListener('click',function(e){
	
});

//////Search relaetd events..
//to allow the keyboard to appear when the search bar is clicked.
search.addEventListener('focus',function(e){
	search.focus();
});
	
//cancel button in the search bar
search.addEventListener('cancel',function(e){
	search.blur();
	search.value="";
});
	
//allow searching
search.addEventListener('return',function(e){
	search.blur();
});

//window's clsoe event..
win.addEventListener('close',function(e){
	
});

//window's focus event..
win.addEventListener('focus',function(e){	
	if(Ti.App.glbTabVars._isMapFromTab == 0) {
		win.setLeftNavButton();
		Ti.App.glbTabVars = { _isSearchFromTab:Ti.App.glbTabVars._isSearchFromTab, _isMapFromTab:1 };
	}
	else {
		win.setLeftNavButton(btnLocate);
	}
});