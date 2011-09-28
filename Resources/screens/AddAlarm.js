// create main window
var win = Titanium.UI.currentWindow;

//To make tabs visible..
win.tabGroup.animate({ bottom:0 });

///Getting bundled data...
var caller_screen = '';
if(win.caller_screen) { caller_screen = win.caller_screen; }

var bus_stop_name = 'Select';
if(win.bus_stop_name) { bus_stop_name = win.bus_stop_name; }

////variables..
var isInfoDisplayed = false;
var selected_time;

//variable to store options....
var arrOptions = [
	{optionTitle:'Repeat', hasChild:true, winUrl:'SelectWeekdays.js', winTitle:'Repeat', optionValue:'Never'},
	{optionTitle:'Station', hasChild:true, winUrl:'SearchScreen.js', winTitle:'Search', optionValue:bus_stop_name},
	{optionTitle:'Bus', hasChild:true, winUrl:'SelectBuses.js', winTitle:'Bus', optionValue:'Select'},
	{optionTitle:'Adjust', hasChild:true, winUrl:'SetAdjustTime.js', winTitle:'Set Adjust Time', optionValue:'0 min.'}
];


//Save button on right side to save alarm settings...
var btnSave = Ti.UI.createButton({ title:'Save' });
win.setRightNavButton(btnSave);

//Main View of Current Window
var mainView = Ti.UI.createView({ width: Titanium.Platform.displayCaps.platformWidth, height: Titanium.Platform.displayCaps.platformHeight-40, backgroundColor:'#ffffff', top:0, left:0 });
win.add(mainView);

//data view to store data..
var dataView = Ti.UI.createScrollView({ width: mainView.width, height: mainView.height, contentHeight:'auto', contentWidth:mainView.width, backgroundColor:'#ffffff', top:0, left:0 });
mainView.add(dataView);

//Table to display options..
var tblSettings = Ti.UI.createTableView({ width:Titanium.Platform.displayCaps.platformWidth, height:175, top:-10, left:0, separatorColor:'#B9BCC1', scrollable:false, style:Titanium.UI.iPhone.TableViewStyle.GROUPED });
dataView.add(tblSettings);

//section for table..
var sectionSetting = Titanium.UI.createTableViewSection(); 

//////Time picker for time settingss..
var value = new Date();
var pickerTime = Titanium.UI.createPicker({ type:Titanium.UI.PICKER_TYPE_TIME, value:value, bottom:70, zIndex:1 });
// turn on the selection indicator (off by default)
pickerTime.selectionIndicator = true;
dataView.add(pickerTime);

///////////////////////////
///Functions...
//This function displays search screen..
var showNewScreen = function(pWinUrl, pWinTitle)
{
	var newWin1 = Ti.UI.createWindow();
	newWin1.url = pWinUrl;
	newWin1.caller_screen = Ti.App.glbConstants._addAlarm;
	newWin1.title = pWinTitle;
	Titanium.UI.currentTab.open(newWin1,{animated:true});
};

//This function returns row view with custom data...
var getRow = function(pData)
{
	try
	{
		//create new row.
		var row = Ti.UI.createTableViewRow({ height:35, width:Titanium.Platform.displayCaps.platformWidth - 20, hasChild:pData.hasChild, win_url:pData.winUrl, win_title:pData.winTitle });

		//click event handler for row click.
		row.addEventListener('click',function(e){
			//call function to display screen..
			if(e.row.win_title == 'Search' && bus_stop_name == "Select")  {
				showNewScreen(e.row.win_url, e.row.win_title);
			}
			else if(e.row.win_title != 'Search')  {
				showNewScreen(e.row.win_url, e.row.win_title);
			}
		});
				
		//create view to hold row items.
		var row_view = Ti.UI.createView({ width:Titanium.Platform.displayCaps.platformWidth - 20 });
	
		//Create label to display name.
		var lblOptionTitle = Ti.UI.createLabel({ text:pData.optionTitle, width:60, height:'30', left:'20', top:'2', color:'#000', font:{fontSize:14, fontFamily:'TrebuchetMS-Bold'} });
		row_view.add(lblOptionTitle);
				
		//display option selected value..
		var lblOptionValue = Ti.UI.createLabel({ text:pData.optionValue, width:Titanium.Platform.displayCaps.platformWidth - 130, textAlign:'right', height:'30', left:'90', top:'2', color:'#4A6C9B', font:{fontSize:13, fontFamily:'TrebuchetMS-Bold'} });
		row_view.add(lblOptionValue);
			
		//Add row view to row.
		row.add(row_view);
				
		//Assign className to each row.
		row.className = 'ItemRow';
		
		return row;
	}
	catch(err) {
		Ti.API.info("" + err);
	}
};

//This will form the table of settings..
var showData = function()
{
	try
	{
		if(arrOptions.length > 0)
		{
			//variables for table data.
			var rowData = [];
			
			var arrlen = arrOptions.length;
			for(i=0; i<arrlen; i++)
			{
				var row = getRow(arrOptions[i]);
				
				//add row to section.
				sectionSetting.add(row);
			}
			//Set table's data source.
			tblSettings.setData([sectionSetting]);
		}
	}
	catch(err) {
		Ti.API.info('Exception in Add Alarm showdata() - ' + err);
	}
};

//This function is the handler for setBusStopName event to set bus stop name..
var setBusStopName = function(e){
	arrOptions[1].optionValue = e.bus_stop_name;
	var upd_row = getRow(arrOptions[1]);
	tblSettings.updateRow(1,upd_row);
};

//This is the handler function for setWeekDays event..
var setWeekDays = function(e)
{
	var csv_days = '';
	var weeklen = e.weekdays.length;
	for(i=0; i<weeklen; i++) 
	{
		if(e.weekdays[i].hasCheck) {
			if(csv_days) {
				csv_days += ','+ e.weekdays[i].abbr;
			}
			else {
				csv_days = e.weekdays[i].abbr;			
			}			
		}
	}
	
	if(csv_days) {
		arrOptions[0].optionValue = csv_days;
		var upd_row = getRow(arrOptions[0]);
		tblSettings.updateRow(0,upd_row);
	}	
};

//This function sets the selected bus numbers..
var setBusNumbers = function(e)
{
	if(e.csv_buses) {
		arrOptions[2].optionValue = e.csv_buses;
		var upd_row = getRow(arrOptions[2]);
		tblSettings.updateRow(2,upd_row);
	}
};

//This function sets the Adjust time....
var setAdjustTime = function(e)
{
	if(e.adjust_time) {
		arrOptions[3].optionValue = e.adjust_time + " min.";
		var upd_row = getRow(arrOptions[3]);
		tblSettings.updateRow(3,upd_row);
	}
};


///////////////////////////
///Custom Events...
Ti.App.addEventListener('setWeekDays',setWeekDays);
Ti.App.addEventListener('setBusStopName',setBusStopName);
Ti.App.addEventListener('setBusNumbers',setBusNumbers);
Ti.App.addEventListener('setAdjustTime',setAdjustTime);

///////////////////////////
///Events...
//event handler for change event of tiem picker..
pickerTime.addEventListener('change',function(e)
{
	selected_time = e.value.getHours()+":"+e.value.getMinutes();
});

//clcik handler for save button..
btnSave.addEventListener('click',function(e){

});

//window's open event..
win.addEventListener('open',function(e){
	selected_time = pickerTime.value.getHours()+":"+pickerTime.value.getMinutes();
	showData();
});

//window's clsoe event..
win.addEventListener('close',function(e){
	Ti.App.removeEventListener('setWeekDays',setWeekDays);
	Ti.App.removeEventListener('setBusStopName',setBusStopName);
	Ti.App.removeEventListener('setBusNumbers',setBusNumbers);
	Ti.App.removeEventListener('setAdjustTime',setAdjustTime);	
});	