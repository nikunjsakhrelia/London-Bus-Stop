// create main window
var win = Titanium.UI.currentWindow;

//Getting bundled variables...
var bus_stop_name = '';
if(win.stop_name) { bus_stop_name = win.stop_name; }

//Setting title of window..
win.title = bus_stop_name;

//To make tabs visible..
win.tabGroup.animate({ bottom:0 });

//Right side Button to add the stop to favourites..
var btnAddBusStop = Ti.UI.createButton({ title:'+' });
win.setRightNavButton(btnAddBusStop);

//Temporary array for data..
var arrData = [
	{dest_name:'TREVOR CLOSE', bus_number:'123', time_left:'5'},
	{dest_name:'SEVENOAKS ROAD / ORPINGTON WAR MEMORIAL', bus_number:'434', time_left:'15'},
	{dest_name:'WATERS ROAD', bus_number:'4567', time_left:'8'},
	{dest_name:'ST MARY MAGDALENE CHURCH', bus_number:'12', time_left:'21'},
	{dest_name:'WOOLWICH ROAD / BEDONWELL ROAD', bus_number:'787', time_left:'20'},
	{dest_name:'MARKET PLACE / BEXLEYHEATH CLOCK TOWER', bus_number:'789', time_left:'4'}
];

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
var tblData = Titanium.UI.createTableView({
	width:Titanium.Platform.displayCaps.platformWidth,
	height:220,
	top:0,
	//left:10,
	//borderWidth:1,
	//borderRadius: 10,
	//borderColor:'#888',
	backgroundColor:'#FFF',
	separatorColor:'#888'//,
	//search:search
});

// add table view to the view
dataView.add(tblData);


//////////////////////////////////////////////////////////
//View to display Buses that stop at particuar stop..
var viewBusesDest = Ti.UI.createView({ height:35, width:Titanium.Platform.displayCaps.platformWidth - 20, left:10, bottom:165, borderRadius:10, borderColor:'#888', borderWidth:'2', backgroundGradient:{type:'linear', colors:['#FFF','#FFF'], backFillStart:false} });
dataView.add(viewBusesDest);

//Label to dispaly Refresh..
var lblBusesDest = Ti.UI.createLabel({ text:'Buses that stops here: 345, 45, 67', height:'30', width:Titanium.Platform.displayCaps.platformWidth - 20, top:0, left:10, textAlign:'center', color:'#000', font:{fontSize:11, fontFamily:'Verdana'} });
viewBusesDest.add(lblBusesDest);

/////////////////////////////
//View to display Refresh buttons..
var viewRefresh = Ti.UI.createView({ height:35, width:Titanium.Platform.displayCaps.platformWidth - 20, left:10, bottom:125, borderRadius:10, borderColor:'#888', borderWidth:'2', backgroundGradient:{type:'linear', colors:['#E7E7E7','#999'], backFillStart:false} });
dataView.add(viewRefresh);

//Now add Refresh icon..
var refreshIcon = Ti.UI.createImageView({ image:'../images/refresh.png', height:25, width:25, top:5, left:100 });
viewRefresh.add(refreshIcon);

//Label to dispaly Refresh..
var lblRefresh = Ti.UI.createLabel({ text:'Refresh', height:'25', width:100, top:5, left:130, color:'#000', font:{fontSize:16, fontFamily:'TrebuchetMS-Bold'} });
viewRefresh.add(lblRefresh);


/////////////////////////////
//View to display Alarm button..
var viewAlarm = Ti.UI.createView({ height:35, width:Titanium.Platform.displayCaps.platformWidth - 20, left:10, bottom:80, borderRadius:10, borderColor:'#888', borderWidth:'2', backgroundGradient:{type:'linear', colors:['#E7E7E7','#999'], backFillStart:false} });
dataView.add(viewAlarm);

//Now add alarm icon..
var alarmIcon = Ti.UI.createImageView({ image:'../images/alarm.png', height:25, width:25, top:5, left:90 });
viewAlarm.add(alarmIcon);

//Label to dispaly alarm..
var lblAlarm = Ti.UI.createLabel({ text:'Set Alarm', height:'25', width:100, top:5, left:120, color:'#000', font:{fontSize:16, fontFamily:'TrebuchetMS-Bold'} });
viewAlarm.add(lblAlarm);


///////////////////////////
///Functions...
//This function gets the data...
var getBusStops = function()
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
				var row = Ti.UI.createTableViewRow({ height:40, width:Titanium.Platform.displayCaps.platformWidth - 20, bus_stop_name:arrData[i].dest_name });

				//click event handler for row click.
				row.addEventListener('click',function(e){
					
				});
			
				//create view to hold row items.
				var row_view = Ti.UI.createView({ width:Titanium.Platform.displayCaps.platformWidth - 20 });

				//Create label to display bus no..
				var lblBusNo = Ti.UI.createLabel({ text:arrData[i].bus_number, width:40, height:'40', left:'10', top:'0', color:'#888', font:{fontSize:12, fontFamily:'TrebuchetMS-Bold'} });
				row_view.add(lblBusNo);
	
				//Create label to display stop name.
				var lblDestName = Ti.UI.createLabel({ text:arrData[i].dest_name, width:120, height:'40', left:'50', top:'0', color:'#000', font:{fontSize:12, fontFamily:'TrebuchetMS-Bold'} });
				row_view.add(lblDestName);

				//Create label to display time left.
				var lblTimeLeft = Ti.UI.createLabel({ text:arrData[i].time_left + ' mins', width:50, height:'40', right:'10', top:'0', color:'#000', font:{fontSize:11, fontFamily:'TrebuchetMS-Bold'} });
				row_view.add(lblTimeLeft);
			
				//Add row view to row.
				row.add(row_view);
				
				//Assign className to each row.
				row.className = 'ItemRow';
				
				//Push row to array.
				rowData.push(row);
			}
			//Set table's data source.
			tblData.data = rowData;
		}
	}
	catch(err) {
		Ti.API.info('Exception in BusStopScreen getbusstops() - ' + err);
	}
}();


///////////////////////////
///Events...
//Click event handler for Add Button for Add stop tp favourite..
btnAddBusStop.addEventListener('click',function(e){
	var confirmDialog = Titanium.UI.createAlertDialog({
	  title: 'Confirm Add',
	  message: 'Are you sure to Add this stop to Favourite ?',
	  buttonNames: ['OK','Cancel']
	}); 
	confirmDialog.show();
	
	confirmDialog.addEventListener('click',function(e){
		switch(e.index)
		{
			case 0:		//ok is clciked..
				//close current win..
				Ti.UI.currentWindow.close();
				
				//Fire event to refresh favourites list..
				Ti.App.fireEvent('refreshFavourites');
				break;
				
			case 1:
				confirmDialog.hide();
				break;
		}
	});
});

//Clickc event handler fro refersh button...
viewRefresh.addEventListener('click',function(e){
	alert("Data will be fetched from server..");
	return;
});

//Click event handler for set alarm button...
viewAlarm.addEventListener('click',function(e){
	var newWin1 = Ti.UI.createWindow();
	newWin1.url = 'AddAlarm.js';
	newWin1.caller_screen = Ti.App.glbConstants._busStopScreen;
	newWin1.bus_stop_name = bus_stop_name;
	newWin1.title = 'Set Alarm';
	Ti.UI.currentWindow.title = 'Back';
	Titanium.UI.currentTab.open(newWin1,{animated:true});
});

//event handelr for window's focus event...
win.addEventListener('focus',function(e){
	Ti.UI.currentWindow.title = bus_stop_name;
});
