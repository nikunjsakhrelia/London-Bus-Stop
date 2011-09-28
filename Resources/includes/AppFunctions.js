//////////
////////// This file contains data manipulation functions..
//////////

// This function is used to install database and create tables if not created.
initDatabase = function()
{
	try 
	{
		//opens the database.
		var db = Ti.Database.open('BusStopDB');
	
		/* creates table to store bus related data. */
		db.execute('CREATE TABLE IF NOT EXISTS tblBus (Sms_Code INTEGER PRIMARY KEY, Stop_Code_LBSL VARCHAR(255), Stop_Name TEXT, Location_Easting VARCHAR(255), Location_Northing VARCHAR(255))');

		/* creates table for bus-routes. */
		db.execute('CREATE TABLE IF NOT EXISTS tblBusRoute (Route VARCHAR(255), Stop_Code_LBSL VARCHAR(255))');
	
		//clsoe the databse.
		db.close();
	}
	catch(err) {
		debugInfo("initDB in AppFunctions - ",err);
	}
};

//This is to check whether data exists or not for the first time..
isDataExists = function()
{
	var is_exist = false;
	
	try
	{
		//opens the database.
		var db = Ti.Database.open('BusStopDB');
		//execute query..
		var dataRS = db.execute('SELECT Sms_Code FROM tblBus');
		debugInfo("isDataExists Row count - ",dataRS.rowCount);
		if(dataRS.rowCount > 0) {
			is_exist = true;
		}
		else {
			is_exist = false;
		}
	}
	catch(err) {
		debugInfo("Exception in isDataExists in AppFunctions - ",err);
	}
	//close database..
	db.close();
};