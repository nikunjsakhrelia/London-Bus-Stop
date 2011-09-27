// create main window
var win = Titanium.UI.currentWindow;

// Temporary array to display data..
var arrData = [
	{alarm_time:'23:19', stop_name:'WATERS ROAD', bus_number:'100011,1234,565,998'},
	{alarm_time:'10:00', stop_name:'SEVENOAKS ROAD / ORPINGTON WAR MEMORIAL', bus_number:'100012,12'},
	{alarm_time:'09:05', stop_name:'ST MARY MAGDALENE CHURCH', bus_number:'100013,67657,676,678,999'}
];

//Edit button onleft..
var btnEditAlarm = Ti.UI.createButton({ title:'Edit' });
win.setLeftNavButton(btnEditAlarm);

//Add button on right..
var btnAddAlarm = Ti.UI.createButton({ title:'+' });
win.setRightNavButton(btnAddAlarm);

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
var tblAlarm = Titanium.UI.createTableView({
	width:Titanium.Platform.displayCaps.platformWidth - 20,
	top:10,
	left:10,
	borderWidth:1,
	borderRadius: 10,
	borderColor:'#888',
	backgroundColor:'#FFF',
	separatorColor:'#888'
});

// add table view to the window
dataView.add(tblAlarm);

///////////////////////////////////////
/// Functions ..

/* This function gets the data. */
var getAlarms = function()
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
				var row = Ti.UI.createTableViewRow({ height:50, width:Titanium.Platform.displayCaps.platformWidth - 20, hasChild:true });

				//click event handler for row click.
				row.addEventListener('click',function(e){
				
				});
			
				//create view to hold row items.
				var row_view = Ti.UI.createView({ width:Titanium.Platform.displayCaps.platformWidth - 20 });
	
				//Create label to display name.
				var lblStopName = Ti.UI.createLabel({ text:arrData[i].stop_name, width:Titanium.Platform.displayCaps.platformWidth - 110, height:'25', left:'20', top:'0', color:'#000', font:{fontSize:13, fontFamily:'TrebuchetMS-Bold'} });
				row_view.add(lblStopName);

				//Create label to display name.
				var lblAlarmTime = Ti.UI.createLabel({ text:arrData[i].alarm_time, width:40, height:'25', right:'20', top:'0', color:'#203550', font:{fontSize:14, fontFamily:'TrebuchetMS-Bold'} });
				row_view.add(lblAlarmTime);
				
				//Create label to display bus number.....
				var lblBusNo = Ti.UI.createLabel({ text:arrData[i].bus_number, width:Titanium.Platform.displayCaps.platformWidth - 55, height:'20', left:'20', top:'25', color:'#999', font:{fontSize:11, fontFamily:'TrebuchetMS'} });
				row_view.add(lblBusNo);
				
				//Add row view to row.
				row.add(row_view);
				
				//Assign className to each row.
				row.className = 'ItemRow';
				
				//Push row to array.
				rowData.push(row);
				
				//set height for table as per rows..
				tblAlarm.height += row.height;
			}
			//Set table's data source.
			tblAlarm.data = rowData;
		}
	}
	catch(err) {
		Ti.API.info('Exception in MyAlarms getAlarms() - ' + err);
	}
}();

//This function refreshes favourites list..
var refreshAlarm = function()
{
	alert('Alarm added...');
};

///////////////////////////////////////
/// Events....
//Click event handler for Edit button..
btnEditAlarm.addEventListener('click',function(e){
	if(btnEditAlarm.title == "Done")
	{
		tblAlarm.editing = false;
		btnEditAlarm.title = "Edit";
		win.setRightNavButton(btnAddAlarm);
	}
	else if(btnEditAlarm.title == "Edit")
	{
		tblAlarm.editing = true;
		tblAlarm.editable = true;		
//		tblAlarm.allowsSelectionDuringEditing = true;
		
		btnEditAlarm.title = "Done";
		win.setRightNavButton();
	} 
});

//Click event handler for Add to Fav (+) button..
btnAddAlarm.addEventListener('click',function(e){
	
	var newWin1 = Ti.UI.createWindow();
	newWin1.url = 'AddAlarm.js';
	newWin1.caller_screen = Ti.App.glbConstants._myAlarms;
	newWin1.title = 'Set Alarm';
	Ti.UI.currentWindow.title = 'Back';
	Titanium.UI.currentTab.open(newWin1,{animated:true});

});

//window's focus event handler..
win.addEventListener('focus',function(e){
	Ti.UI.currentWindow.title = 'Alarm';
});

//window's close event handler..
win.addEventListener('close',function(e){
	Ti.App.removeEventListener('refreshAlarm',refreshAlarm);
});

///////////////////////////////////////
/// Custom Events....
Ti.App.addEventListener('refreshAlarm',refreshAlarm);
