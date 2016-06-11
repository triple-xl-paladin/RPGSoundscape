
/*
 * Copyright (C) 2016 by Alexander Chen
 *
 * This file is part of RPGSoundscape source code
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * RPG Soundscape is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package com.oddjobs.rpgsoundscape;

import android.content.Context;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

class DBHelper extends SQLiteOpenHelper
{
  final static int DB_VERSION = 1;
  final static String DB_NAME = "draginet.db";
  String db_path = "/data/data/com.oddjob.draginet/databases/";
  Context context;
  SQLiteDatabase database;
   
  public DBHelper(Context context)
  {
    super(context, DB_NAME, null, DB_VERSION);
    
    // Store the context for later use
    this.context = context;

    db_path = context.getApplicationInfo().dataDir + "/databases/";
    l("DB_PATH: " + db_path);
  }

  /**
   * Called when the database needs to be upgraded. 
   *
   * The implementation should use this method to drop tables, add tables, 
   * or do anything else it needs to upgrade to the new schema version.
   *
   * The SQLite ALTER TABLE documentation can be found here. If you add 
   * new columns you can use ALTER TABLE to insert them into a live table. 
   * If you rename or remove columns you can use ALTER TABLE to rename the 
   * old table, then create the new table and then populate the new table 
   * with the contents of the old table.
   * 
   * This method executes within a transaction. If an exception is thrown, 
   * all changes will automatically be rolled back.
   *
   * @param database The database
   * @param oldVersion The old database version
   * @param newVersion The new database version
   */ 
  @Override
  public void onUpgrade(SQLiteDatabase database, int oldVersion, int newVersion)
  {
    //TODO: Something upon upgrade
  }

  /**
   * Called when the database is created for the first time. This is where 
   * the creation of tables and the initial population of the tables 
   * should happen.
   *
   * @param database The Database
   */
  @Override
  public void onCreate(SQLiteDatabase database) 
  {
    /*
    boolean check = checkDB();
    l("check result: "+ String.valueOf(check));
    //delDB();

    if(!checkDB())
    {
      l("Yeah! DB file does not exist!");
      try
      {
	      copyDatabase();
      }
      catch(Exception e)
      {
	      e.printStackTrace();
      }
    }
    else
    {
      l("File already exists or error!");
      //delDB();
    }
    */

    l("I'm creating!");

    initDB(database);
  }

  private void initDB(SQLiteDatabase database)
  {
    try {
      String filename = "sql/create.sql";

      DroidFileHandler dfh = new DroidFileHandler(context, filename);

      String sql = dfh.readFile();

      l("about to sql.." + sql);

      database.execSQL(sql+";");

      l("all sqld");
    }
    catch (SQLException e)
    {
      e.printStackTrace();
    }
  }

  /**
   * Check to see if the database already exists.
   *
   * @return True if the database exists and false if it does not
   */
  private boolean checkDB()
  {
    //try
    //{
      File file = new File(db_path + DB_NAME);

      if(file.exists())
	      return true;
      else
	      return false;
    //}
    //catch(IOException e)
    //{
      //e.printStackTrace();
      //return false;
    //}
  }

  /**
   * Copies the database from the assets folder onto the internal drive.
   */
  private void copyDatabase() throws IOException,SQLException
  {
    l("copyDataBase start");

    String fromdb = "db/"+DB_NAME; // location of the db in assets
    String todb = db_path + DB_NAME; // get the destination location. Path includes the filename.

    l("Asset location: " + fromdb);
    l("Destination: "+ todb);

    //Open your local db as the input stream
    InputStream myInput = context.getAssets().open(fromdb);

    l("AssetDB opened");

    //Open the empty db as the output stream
    OutputStream myOutput = new FileOutputStream(todb);

    l("Dest open");

    //transfer bytes from the inputfile to the outputfile
    byte[] buffer = new byte[1024];
    int length;

    while ((length = myInput.read(buffer))>0)
    {
      //Log.d("Draginet",new Integer(length).toString());
      myOutput.write(buffer, 0, length);
    }

    //Close the streams
    myOutput.flush();
    myOutput.close();
    myInput.close();

    l("finich copy");
  }

  /**
   * DO NOT USE EXCEPT FOR TESTING
   */
  public boolean delDB()
  {
    File file = new File(db_path+DB_NAME);
    boolean deleted = file.delete();

    //file.canWrite();
    l("File deleted? : " + String.valueOf(deleted));
    return deleted;
  }

  /**
   * Debug messages to Android log
   */
  private void l(String mesg)
  {
    Log.d("Draginet",mesg);
  }
}

