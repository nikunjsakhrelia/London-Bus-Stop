// create main window
var win = Titanium.UI.currentWindow;

//Getting bundled data..
var caller_screen = '';
if(win.caller_screen) { caller_screen = win.caller_screen; }

// Temporary array to display data..
var arrData = [
	{stop_name:'TREVOR CLOSE', no_of_buses:'12'},
	{stop_name:'SEVENOAKS ROAD / ORPINGTON WAR MEMORIAL', no_of_buses:'17'},
	{stop_name:'WATERS ROAD', no_of_buses:'22'},
	{stop_name:'ST MARY MAGDALENE CHURCH', no_of_buses:'2'},
	{stop_name:'WOOLWICH ROAD / BEDONWELL ROAD', no_of_buses:'16'}
];

//Sort an array...
arrData.sort(function(a, b){
	var nameA = a.stop_name.toLowerCase(), nameB = b.stop_name.toLowerCase();
	if (nameA < nameB)  {//sort string ascending
		return -1;
	}	
	if (nameA > nameB) {
	 	return 1;
	} 	
	return 0; 	 //default return value (no sorting)
});
	
//Edit button onleft..
var btnBack = Ti.UI.createButton({ title:'Back' });


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
	
// create table view
var tblData = Titanium.UI.createTableView({
	width:Titanium.Platform.displayCaps.platformWidth,
	top:50,
	//left:10,
	//borderWidth:1,
	//borderRadius: 10,
	//borderColor:'#888',
	backgroundColor:'#FFF',
	separatorColor:'#888'//,
	//search:search
});

// add table view to the window
mainView.add(tblData);

///////////////////////////////////////
/// Functions ..

/* This function gets the data. */
var getData = function()
{
	try
	{
		if(arrData.length > 0)
		{
			//variables for table data.
			var rowData = [];
			var rowHeight = 0;

			var arrlen = arrData.length;
			for(i=0; i<arrlen; i++)
			{
				//create new row.
				var row = Ti.UI.createTableViewRow({ height:50, width:Titanium.Platform.displayCaps.platformWidth - 20, hasChild:true, stop_name:arrData[i].stop_name });

				//click event handler for row click.
				row.addEventListener('click',function(e){
					
					if(caller_screen == Ti.App.glbConstants._addAlarm)
					{
						Ti.UI.currentWindow.close();
						//fire event to send bus stop name..
						Ti.App.fireEvent('setBusStopName',{bus_stop_name:e.row.stop_name});
					}
					else if(caller_screen == Ti.App.glbConstants._myFavouriteStops)
					{
						Ti.UI.currentWindow.close();
						//fire event to refresh favourite list..
						Ti.App.fireEvent('refreshFavourites');
					}
					else {
						win.tabGroup.setActiveTab(0); 	//here, index 0 means favourite tab...
						//fire event to refresh favourite list..
						Ti.App.fireEvent('refreshFavourites');
					}
					
					//var newWin = Ti.UI.createWindow();
					//newWin.url = 'BusStopScreen.js';
					//newWin.caller_screen = Ti.App.glbConstants._myFavouriteStops;
					//Titanium.UI.currentTab.open(newWin,{animated:true});
				});
			
				//create view to hold row items.
				var row_view = Ti.UI.createView({ height:50, width:Titanium.Platform.displayCaps.platformWidth - 20 });
	
				//Create label to display name.
				var lblStopName = Ti.UI.createLabel({ text:arrData[i].stop_name, width:Titanium.Platform.displayCaps.platformWidth - 60, height:'25', left:'10', top:'0', color:'#000', font:{fontSize:12, fontFamily:'TrebuchetMS-Bold'} });
				row_view.add(lblStopName);

				//Create label to display no of buses that stop at that bus stop...
				var lblNoOfBuses = Ti.UI.createLabel({ text:arrData[i].no_of_buses + ' bus(es) stops here', width:Titanium.Platform.displayCaps.platformWidth - 60, height:'20', left:'10', top:'25', color:'#999', font:{fontSize:11, fontFamily:'TrebuchetMS'} });
				row_view.add(lblNoOfBuses);
			
				//Add row view to row.
				row.add(row_view);
				
				//Assign className to each row.
				row.className = 'ItemRow';
				
				//Push row to array.
				rowData.push(row);
				
				rowHeight += row.height;
			}
			//Set table's data source.
			tblData.data = rowData;
			
			tblData.height = rowHeight;
		}
	}
	catch(err) {
		Ti.API.info('Exception in MyFavouritesStops getfav() - ' + err);
	}
}();


///////////////////////////////////////
///Custom  Events....


///////////////////////////////////////
/// Events....
//Click event handler for Back button..
btnBack.addEventListener('click',function(e){
	win.tabGroup.setActiveTab(0); 	//here, index 0 means favourite tab...
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
	if(Ti.App.glbTabVars._isSearchFromTab == 1) {
	//	win.setLeftNavButton();
	}
	else {
	//	win.setLeftNavButton(btnBack);
	//	Ti.App.glbTabVars = { _isSearchFromTab:1, _isMapFromTab:Ti.App.glbTabVars._isMapFromTab };		
	}
});