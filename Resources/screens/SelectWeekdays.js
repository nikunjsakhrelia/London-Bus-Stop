// create main window
var win = Titanium.UI.currentWindow;

//Array for data display..
var arrOptions = [
	{optionTitle:'Every Monday', hasCheck:false, abbr:'Mon'},
	{optionTitle:'Every Tuesday', hasCheck:false, abbr:'Tue'},
	{optionTitle:'Every Wednesday', hasCheck:false, abbr:'Wed'},
	{optionTitle:'Every Thursday', hasCheck:false, abbr:'Thu'},
	{optionTitle:'Every Friday', hasCheck:false, abbr:'Fri'},
	{optionTitle:'Every Saturday', hasCheck:false, abbr:'Sat'},
	{optionTitle:'Every Sunday', hasCheck:false, abbr:'Sun'}
];


//Main View of Current Window
var mainView = Ti.UI.createView({ width: Titanium.Platform.displayCaps.platformWidth, height:Titanium.Platform.displayCaps.platformHeight, backgroundColor:'#ffffff', top:0, left:0 });
win.add(mainView);

//Table to display days..
var tblDays = Ti.UI.createTableView({ width:Titanium.Platform.displayCaps.platformWidth, height:Titanium.Platform.displayCaps.platformHeight, top:-5, left:0, separatorColor:'#B9BCC1', scrollable:false, style:Titanium.UI.iPhone.TableViewStyle.GROUPED });
mainView.add(tblDays);

//section for table..
var sectionDays = Titanium.UI.createTableViewSection(); 


/////////////////////
////Functions...
//This will form the table of settings..
var showData = function()
{
	try
	{
		if(arrOptions.length > 0)
		{
			//variables for table data.
			var rowData = [];
			//clean up table..
			tblDays.data = rowData;
			
			var arrlen = arrOptions.length;
			for(i=0; i<arrlen; i++)
			{
				//create new row.
				var row = Ti.UI.createTableViewRow({ height:35, width:Titanium.Platform.displayCaps.platformWidth - 20, hasCheck:arrOptions[i].hasCheck, row_index:i });

				//click event handler for row click.
				row.addEventListener('click',function(e){
					if(e.row.hasCheck) { 
						e.row.hasCheck = false; 
						arrOptions[e.row.row_index].hasCheck = false;
					}
					else { 
						e.row.hasCheck = true; 
						arrOptions[e.row.row_index].hasCheck = true;						
					}
				});
				
				//create view to hold row items.
				var row_view = Ti.UI.createView({ width:Titanium.Platform.displayCaps.platformWidth - 20 });
	
				//Create label to display name.
				var lblOptionTitle = Ti.UI.createLabel({ text:arrOptions[i].optionTitle, width:Titanium.Platform.displayCaps.platformWidth - 50, height:'30', left:'20', top:'2', color:'#000', font:{fontSize:14, fontFamily:'TrebuchetMS-Bold'} });
				row_view.add(lblOptionTitle);
							
				//Add row view to row.
				row.add(row_view);
				
				//Assign className to each row.
				row.className = 'ItemRow';
				
				//add row to section.
				sectionDays.add(row);
			}
			
			//Set table's data source.
			tblDays.setData([sectionDays]);
		}
	}
	catch(err) {
		Ti.API.info('Exception in Select Weekdays showdata() - ' + err);
	}
};


///////////////////////////
///Events...
//window's open event..
win.addEventListener('open',function(e){
	showData();
});

//window's close event..
win.addEventListener('close',function(e){
	Ti.App.fireEvent('setWeekDays',{weekdays:arrOptions});
});


