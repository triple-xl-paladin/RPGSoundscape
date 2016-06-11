
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

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.IOException;

/**
 * The interface between JavaScript and Java. The class contains all the methods callable from
 * within JavaScript.
 * <p></p>
 * Created by Alexander Chen on 28/02/16.
 * <p></p>
 * <b>Change Log</b>
 * <ul>
 *   <li></li>
 * </ul>
 * <p></p>
 * @author  Alexander Chen
 * @version %I%, %G$
 * @since   0.1
 */
public class WebAppJavaScriptInterface
{
  Context context;

  //DBHandler db;
  //Logger log;

  /** Instantiate the interface and set the context */
  public WebAppJavaScriptInterface(Context c)
  {
    this.context = c;
    //log = new Logger(this.context);
    //db = new DBHandler(this.context, this.log);
  }

  /**
   * Opens the database. Use this method to manually open a connection to the database.
   *
   * @return Success or failure to open database

  @JavascriptInterface
  public boolean openDB()
  {
    l("openDB(): Hello!");
    return db.openDatabase();
  }
  */

  /**
   * Closes the active database. Does not check whether a database is open or not.
   *
   * @return Success or failure at closing the database

  @JavascriptInterface
  public boolean closeDB()
  {
    l("closeDB(): Hello!");
    return db.closeDatabase();
  }
  */

  /**
   * <b>DEPRECATED</b> Populate the database with test data.
   *
   * @return Whether populated or not

  @JavascriptInterface
  @Deprecated
  public boolean popDB()
  {
    l("popDB(): Hello!");
    return db.populateDatabase();
  }
  */

  /**
   * <b>DEPRECATED</b> Create the database from SQL script.
   *
   * @return

  @JavascriptInterface
  @Deprecated
  public boolean createDB()
  {
    l("createDB(): Hello!");
    return db.createDatabase();
  }
  */

  /*
  @JavascriptInterface
  @Deprecated
  public boolean inData()
  {
    return db.inputDataIntoTables();
  }
  */

  /**
   * Returns a complete list of spells within the database
   *
   * @return A list of spells in JSON format

  @JavascriptInterface
  public String getSpellList()
  {
    l("getSpellList(): Hello!");

    String filename = "spells_list.sql";
    Cursor recordSet = null;
    JSONObject json = new JSONObject();
    JSONArray jsonArray = new JSONArray();


    l("getSpellList(): Start");

    try {

      l("getSpellList(): About to execute query");
      recordSet = db.executeQueryFile(filename);

      if (recordSet != null) {
        l("getSpellList(): recordset is not null!");
        l("getSpellList(): recordset col count = " + String.valueOf(recordSet.getColumnCount()));
        l("getSpellList(): recordset row count = " + String.valueOf(recordSet.getCount()));

        // move cursor to first row
        recordSet.moveToFirst();
        do {

          String[] cols = recordSet.getColumnNames();
          JSONObject jsonSpell = new JSONObject();

          for(String col : cols) {
            String field = recordSet.getString(recordSet.getColumnIndex(col));
            jsonSpell.put(col, field);
          }

          jsonArray.put(jsonSpell);
        }
        while (recordSet.moveToNext());

        json.put("spells", jsonArray);

        // Apparently you need to close the Cursor to free RAM.
        recordSet.close();
      }
    }
    catch (JSONException e)
    {
      e.printStackTrace();
      l(e.getMessage());
    }

    l("getSpellList(): Finished!");

    return json.toString();
  }
  */

  /**
   * Delete the database file. Used for debugging only.
   *
   * @return

  @JavascriptInterface
  public boolean delDB()
  {
    return db.deleteDB();
  }
  */

  /**
   * Debug messages to log
   *
   * @param mesg Message to be logged

  @JavascriptInterface
  public void l(String mesg)
  {
    //Log.d("Draginet", mesg);
    log.l(mesg);
  }
  */

  /**
   * Copy the database from the assets folder

  @JavascriptInterface
  public void copyDB()
  {
    db.copyDatabase();
  }

  */

  /**
   * Get the current log file
   *
   * @return The log file as String

  @JavascriptInterface
  public String getLogs()
  {
    return log.getLogMessages();
  }
  */

  /**
   * Delete the log file.

  @JavascriptInterface
  public void delLogs()
  {
    log.deleteLog();
  }
  */

  /**
   * Create a new player character spellbook.
   *
   * @param //spellbook_name The name of the spell book
   * @return An integer representing the spellbook_bk

  @JavascriptInterface
  public int createSpellbook(String spellbook_name)
  {
    ContentValues cv = new ContentValues();
    // Get the last spellbook_bk
    // insert new spellbook with bk
    int spellbook_bk = db.findMaxValue("tbSpellbook","spellbook_bk")+1;

    cv.put("_id",spellbook_bk);
    cv.put("spellbook_bk",spellbook_bk);
    cv.put("spellbook_name",spellbook_name);

    boolean check = db.insertQuery("tbSpellbook",cv);

    return spellbook_bk;
  }
  */

  /*
  public void addSpellsToSpellbook(String json)
  {

  }
  */

  @JavascriptInterface
  public <T> void l(T mesg)
  {
    if(mesg == null)
    {
      Log.d("RPG:", "No message");
    }else{
      Log.d("RPG:", (String) mesg);
    }
  }
}
