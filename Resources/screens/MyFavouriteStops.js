// create main window
var win = Titanium.UI.currentWindow;

// Temporary array to display data..
var arrData = [
	{stop_name:'TREVOR CLOSE'},
	{stop_name:'SEVENOAKS ROAD / ORPINGTON WAR MEMORIAL'},
	{stop_name:'WATERS ROAD'},
	{stop_name:'ST MARY MAGDALENE CHURCH'},
	{stop_name:'WOOLWICH ROAD / BEDONWELL ROAD'},
	{stop_name:'MARKET PLACE / BEXLEYHEATH CLOCK TOWER'}
];

//Edit button onleft..
var btnEditFav = Ti.UI.createButton({ title:'Edit' });
win.setLeftNavButton(btnEditFav);

//Add button on right..
var btnAddToFav = Ti.UI.createButton({ title:'+' });
win.setRightNavButton(btnAddToFav);

//Main View of Current Window
var mainView = Ti.UI.createView({
	width: Titanium.Platform.displayCaps.platformWidth,
	height: Titanium.Platform.displayCaps.platformHeight-40,
	backgroundColor:'#ffffff',
	top:0,
	left:0
});
win.add(mainView);

var dataView = Ti.UI.createView({
	width: mainView.width,
	height: mainView.height,
	backgroundColor:'#ffffff',
	top:0,
	left:0
});
mainView.add(dataView);

// create table view
var tblFavourites = Titanium.UI.createTableView({
	width:Titanium.Platform.displayCaps.platformWidth - 20,
	height:dataView.height - 200,
	top:10,
	left:10,
	borderWidth:1,
	borderRadius: 10,
	borderColor:'#888',
	backgroundColor:'#FFF',
	separatorColor:'#888'
});

// add table view to the window
dataView.add(tblFavourites);

//Locate Me button...
var btnLocateMe = Ti.UI.createLabel({ text:'Locate me', height:'40', width:Titanium.Platform.displayCaps.platformWidth, top:'320', color:'#000', textAlign:'center', font:{fontSize:15, fontFamily:'TrebuchetMS-Bold' },
	//backgroundImage:'../images/grey_button.png' 
	//backgroundColor:'#999' 
	backgroundGradient:{type:'linear', colors:['#E7E7E7','#999'], backFillStart:false} 
});
dataView.add(btnLocateMe);


///////////////////////////////////////
/// Functions ..
//This function redirects to Bus stop screen..
var showBusStopScreen = function(pStopName)
{
	var newWin = Ti.UI.createWindow();
	newWin.url = 'BusStopScreen.js';
	newWin.caller_screen = Ti.App.glbConstants._myFavouriteStops;
	newWin.stop_name = pStopName;
//	newWin.open({ modal:true, transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT });
//	newWin.open({modal:true});
	Ti.UI.currentWindow.title = 'Back';
	Titanium.UI.currentTab.open(newWin,{animated:true});
};

// This function gets the data.
var getFavourites = function()
{
	try
	{
		if(arrData.length > 0)
		{
			//variables for table data.
			var rowData = [];

			var arrlen = arrData.length;
			for(i=0; i<arrlen; i++)
			{
				//create new row.
				var row = Ti.UI.createTableViewRow({ height:40, width:Titanium.Platform.displayCaps.platformWidth - 20, hasChild:true, bus_stop_name:arrData[i].stop_name });

				//click event handler for row click.
				row.addEventListener('click',function(e){
					showBusStopScreen(e.row.bus_stop_name);	
				});
			
				//create view to hold row items.
				var row_view = Ti.UI.createView({ width:Titanium.Platform.displayCaps.platformWidth - 20 });
	
				//Create label to display name.
				var lblName = Ti.UI.createLabel({ text:arrData[i].stop_name, width:Titanium.Platform.displayCaps.platformWidth - 50, height:'40', left:'20', top:'0', color:'#000', font:{fontSize:12, fontFamily:'TrebuchetMS-Bold'} });
				row_view.add(lblName);
			
				//Add row view to row.
				row.add(row_view);
				
				//Assign className to each row.
				row.className = 'ItemRow';
				
				//Push row to array.
				rowData.push(row);
			}
			//Set table's data source.
			tblFavourites.data = rowData;
		}
	}
	catch(err) {
		Ti.API.info('Exception in MyFavouritesStops getfav() - ' + err);
	}
}();

//This function refreshes favourites list..
var refreshFavourites = function()
{
	alert('XYZ bus stop added to Favourites..');
};

///////////////////////////////////////
/// Events....
//Click event handler for Edit button..
btnEditFav.addEventListener('click',function(e){
	if(btnEditFav.title == "Done")
	{
		tblFavourites.editing = false;
		btnEditFav.title = "Edit";
		win.setRightNavButton(btnAddToFav);
	}
	else if(btnEditFav.title == "Edit")
	{
		tblFavourites.editing = true;
		tblFavourites.editable = true;		
//		tblFavourites.allowsSelectionDuringEditing = true;
		
		btnEditFav.title = "Done";
		win.setRightNavButton();
	} 
});

//Click event handler for Add to Fav (+) button..
btnAddToFav.addEventListener('click',function(e){
	Ti.App.glbTabVars = { _isSearchFromTab:0, _isMapFromTab:Ti.App.glbTabVars._isMapFromTab };
	//win.tabGroup.setActiveTab(1); 	//here, index 1 means search tab...
	var newWin1 = Ti.UI.createWindow();
	newWin1.url = 'SearchScreen.js';
	newWin1.caller_screen = Ti.App.glbConstants._myFavouriteStops;
	newWin1.title = 'Search';
	Ti.UI.currentWindow.title = 'Back';
	Titanium.UI.currentTab.open(newWin1,{animated:true});
});

//Click event handler for Where I am Now? button..
btnLocateMe.addEventListener('click',function(e){
	Ti.App.glbTabVars = { _isSearchFromTab:Ti.App.glbTabVars._isSearchFromTab, _isMapFromTab:0 };
	win.tabGroup.setActiveTab(2); 	//here, index 2 means map tab...
});

//window's close event handler..
win.addEventListener('close',function(e){
	Ti.App.removeEventListener('refreshFavourites',refreshFavourites);
});

win.addEventListener('focus',function(e){
	Ti.UI.currentWindow.title = 'Home / Favourites';	
});

///////////////////////////////////////
/// Custom Events....
Ti.App.addEventListener('refreshFavourites',refreshFavourites);
