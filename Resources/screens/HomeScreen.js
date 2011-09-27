//Create reference of window..
var win = Ti.UI.currentWindow;

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//////////////////////////////
// create home window and tab..

var winHome = Titanium.UI.createWindow({  
    title:'Home / Favourites',
    backgroundColor:'#fff',
    url:'MyFavouriteStops.js'
});
var tabHome = Titanium.UI.createTab({  
    icon:'../images/home.png',
    title:'Home',
    window:winHome
});

//////////////////////////////
// create search window and tab..
var winSearch = Titanium.UI.createWindow({  
    title:'Search',
    backgroundColor:'#fff',
    url:'SearchScreen.js'
});
var tabSearch = Titanium.UI.createTab({  
    icon:'../images/map.png',
    title:'Search',
    window:winSearch
});


//////////////////////////////
// create map window and tab..
var winMap = Titanium.UI.createWindow({  
    title:'Map',
    backgroundColor:'#fff',
    url:'MapViewScreen.js'
});
var tabMap = Titanium.UI.createTab({  
    icon:'../images/search_map.png',
    title:'Map',
    window:winMap
});


//////////////////////////////
// create alarm window and tab..
var winAlarm = Titanium.UI.createWindow({  
    title:'Alarm',
    backgroundColor:'#fff',
    url:'MyAlarms.js'
});
var tabAlarm = Titanium.UI.createTab({  
    icon:'../images/alarm.png',
    title:'Alarm',
    window:winAlarm
});


//////////////////////////////
// create settings window and tab..
var winSetting = Titanium.UI.createWindow({  
    title:'Settings',
    backgroundColor:'#fff'
});
var tabSetting = Titanium.UI.createTab({  
    icon:'../images/settings.png',
    title:'Settings',
    window:winSetting
});


//
//  add tabs
//
tabGroup.addTab(tabHome);  
tabGroup.addTab(tabSearch); 
tabGroup.addTab(tabMap);
tabGroup.addTab(tabAlarm);
tabGroup.addTab(tabSetting);

// open tab group
tabGroup.open();

//add tab group to current window..
win.add(tabGroup);


///////////////////////////////
//////Functions..
//This function changes active tab winodw..
var setSearchForHome = function(e)
{
	tabGroup.close();
	tabHome.window = winSearch;
	tabGroup.open();
};


///////////////////////////////
//////Custom events..
Ti.App.addEventListener('setSearchForHome',setSearchForHome);