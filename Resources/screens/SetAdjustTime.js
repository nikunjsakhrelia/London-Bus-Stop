// create main window
var win = Titanium.UI.currentWindow;

//Main View of Current Window
var mainView = Ti.UI.createView({ width: Titanium.Platform.displayCaps.platformWidth, height:Titanium.Platform.displayCaps.platformHeight, backgroundColor:'#ffffff', top:0, left:0 });
win.add(mainView);

//Table to display days..
var tblData = Ti.UI.createTableView({ width:Titanium.Platform.displayCaps.platformWidth, height:Titanium.Platform.displayCaps.platformHeight, top:0, left:0, separatorColor:'#FFF', scrollable:false, style:Titanium.UI.iPhone.TableViewStyle.GROUPED });
mainView.add(tblData);

//section for table..
var sectionData = Titanium.UI.createTableViewSection(); 

////////////////////////////////////
///Begin : Row for Info
//Row for displaying info..
var rowInfo = Ti.UI.createTableViewRow({ height:95, width:Titanium.Platform.displayCaps.platformWidth - 20 });

//label to display info..
var info = "Adjust all times by the time it takes you to reach the bus stop to know how long you have been before leaving (rather than how long it is till the next bus).";
var lblInfo = Ti.UI.createLabel({text:info, textAlign:'center', height:90, width:260, top:0, left:15, color:'#000', font:{fontSize:13, fontFamily:'TrebuchetMS'} });
rowInfo.add(lblInfo);

//Add row to section...
sectionData.add(rowInfo);

///End : Row for Info
////////////////////////////////////

////////////////////////////////////
///Begin : Row for Adjust text box
//Row for displaying info..
var rowText = Ti.UI.createTableViewRow({ height:80, width:Titanium.Platform.displayCaps.platformWidth - 20 });

////////Adjust button...
var txtAdjust = Titanium.UI.createTextField({ hintText:'Adjust (0-59)', height:40, width:Titanium.Platform.displayCaps.platformWidth - 130, top:10, left:10, borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, color:'#000', font:{fontSize:12, fontFamily:'TrebuchetMS'} });
rowText.add(txtAdjust);

//Label to display minutse beside adjust field.. 
var lblAdjustMin = Ti.UI.createLabel({text:'minutes', height:40, width:50, top:10, right:40, color:'#000', font:{fontSize:14, fontFamily:'TrebuchetMS'} });
rowText.add(lblAdjustMin);


//Add row to section...
//sectionData.add(rowText);

///End : Row for Adjust text box
////////////////////////////////////

//Set table's data source...
tblData.setData([sectionData]);

///////////////////////////////////////
//////Time picker for time settingss..
var data = [];
var selected_time = 0;
var pickerTime = Titanium.UI.createPicker({selectionIndicator:true, bottom:80});

for(i=0; i<60; i++)
{
	var str = i + '';
	data[i] = Titanium.UI.createPickerRow({title:str});
}

pickerTime.add(data);

mainView.add(pickerTime);


///////////////////////////////////////
/////////Function..
function isNumber(element, fieldname)
{
	var el = element;
	var num = new Number(el.value);
	if(isNaN(num))
	{
		alert(fieldname + " takes Number only.");
		el.value = "";
		el.focus();
		return false;
	}
	else{
		return true;
	}
}

///////////////////////////////////////
/////////Events..
//txtAdjust blur event...
/*txtAdjust.addEventListener('blur',function(e){
	if(isNumber(txtAdjust,'Adjust Time'))
	{
		if(txtAdjust.value < 0 || txtAdjust.value > 60)
		{
			alert('Time must be between 0 and 59.');
			return;
		}
	}
});
*/

pickerTime.addEventListener('change',function(e){
	selected_time = e.row.title;
});

//window's close event..
win.addEventListener('close',function(e){
	
	Ti.App.fireEvent('setAdjustTime',{adjust_time:selected_time});
	
/*	if(isNumber(txtAdjust,'Adjust Time'))
	{
		if(txtAdjust.value < 0 || txtAdjust.value > 59)
		{
			alert('Time must be between 0 and 59.');
			return;
		}
		else {
			Ti.App.fireEvent('setAdjustTime',{adjust_time:txtAdjust.value});	
		}
	}
*/	
});