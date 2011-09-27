// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#FFF');

//
// create base UI tab and root window
//
var rootWin = Titanium.UI.createWindow({
	//width:Ti.Platform.displayCaps.platformWidth,
	//height:Ti.Platform.displayCaps.platformHeight,
	//backgroundColor:'#FFF',
	url:'screens/HomeScreen.js',
	exitOnClose:true
});

//Ti.UI.orientation = [Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
rootWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.UPSIDE_PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
];

//Global varibles for app.
Ti.App.glbTabVars = { _isSearchFromTab:1, _isMapFromTab:1 };

//Global Constants..
Ti.App.glbConstants = { 
	_myFavouriteStops:'MY_FAVOURITES', 
	_myAlarms:'MY_ALARMS',
	_searchScreen:'SEARCH_SCREEN',
	_busStopScreen:'BUS_STOP_SCREEN',
	_addAlarm:'ADD_ALARM'
};

rootWin.open();