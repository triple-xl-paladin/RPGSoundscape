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
 * <li></li>
 * </ul>
 * <p></p>
 *
 * @author Alexander Chen
 * @version %I%, %G$
 * @since 0.1
 */
public class WebAppJavaScriptInterface
{
    Context context;
    DBHandler db;
    Logger log;
    String logTag = "RPG: ";

    /**
     * Instantiate the interface and set the context
     */
    public WebAppJavaScriptInterface(Context c)
    {
        this.context = c;
        log = new Logger(this.context);
        db = new DBHandler(this.context, this.log);
    }

    /**
     * Opens the database. Use this method to manually open a connection to the database.
     *
     * @return Success or failure to open database
     */
    @JavascriptInterface
    public boolean openDB()
    {
        l("openDB(): Open database!");
        return db.openDatabase();
    }

    /**
     * Closes the active database. Does not check whether a database is open or not.
     *
     * @return Success or failure at closing the database
     */
    @JavascriptInterface
    public boolean closeDB()
    {
        l("closeDB(): Close database!");
        return db.closeDatabase();
    }

    /**
     * Returns a randomly chosen song
     *
     * select title,file,file_type,volume_default
     * from music_list m
     *   inner join audio_files a on a._id = m.audio_file_id
     *   inner join file_types t on t._id = a.file_type_id
     * where
     *   soundscheme_id = 'soundscheme'
     *
     * @param soundscheme The music files for the soundscheme
     * @return The song in JSON format
     */
    @JavascriptInterface
    public String getSong(String soundscheme)
    {
        sl("getSong(): BEGIN!");

        String sql = "    select " +
                     "        title " +
                     "        ,file " +
                     "        ,file_type " +
                     "        ,volume_default " +
                     "     from music_list m " +
                     "        inner join audio_files a on a._id = m.audio_file_id " +
                     "        inner join file_types t on t._id = a.file_type_id " +
                     "        inner join soundscheme s on s._id = m.soundscheme_id "+
                     "     where " +
                     "        soundscheme = '"+soundscheme+"'"+
                     "      order by random()"+
                     ";";

        Cursor recordSet = null;
        JSONObject json = new JSONObject();
        JSONArray jsonArray = new JSONArray();

        sl("getSong(): Start");

        try {

            sl("getSong(): About to execute query");
            recordSet = db.executeQuerySQL(sql);

            if (recordSet != null) {
                sl("getSong(): recordset is not null!");
                sl("getSong(): recordset col count = " + String.valueOf(recordSet.getColumnCount()));
                sl("getSong(): recordset row count = " + String.valueOf(recordSet.getCount()));

                // move cursor to first row
                recordSet.moveToFirst();

                // don't need the rest as the randomisation is in the sql file

                String[] cols = recordSet.getColumnNames();

                JSONObject jsonSong = new JSONObject();

                for(String col : cols) {
                    String field = recordSet.getString(recordSet.getColumnIndex(col));
                    sl(col);
                    sl(field);
                    jsonSong.put(col, field);
                }
                jsonArray.put(jsonSong);

                json.put(soundscheme, jsonArray);

                // Apparently you need to close the Cursor to free RAM.
                recordSet.close();
            }
        }
        catch (JSONException e)
        {
            e.printStackTrace();
            l(e.getMessage());
        }

        sl("getSong(): Finished!");

        return json.toString();
    }

    /**
     * Returns available soundscapes
     *
     * @return A list of soundscapes in JSON
     */
    @JavascriptInterface
    public String getSoundscapes()
    {
        sl("getSoundscapes(): BEGIN!");

        String sql = "    select "+
                     "      _id" +
                     "      ,soundscape " +
                     "    from soundscapes " +
                     "    order by _id"+
                     ";";

        Cursor recordSet = null;
        JSONObject json = new JSONObject();
        JSONArray jsonArray = new JSONArray();

        sl("getSoundscapes(): Start");

        try {

            sl("getSoundscapes(): About to execute query");
            recordSet = db.executeQuerySQL(sql);

            if (recordSet != null) {
                sl("getSoundscapes(): recordset is not null!");
                sl("getSoundscapes(): recordset col count = " + String.valueOf(recordSet.getColumnCount()));
                sl("getSoundscapes(): recordset row count = " + String.valueOf(recordSet.getCount()));

                // move cursor to first row
                recordSet.moveToFirst();

                do
                {

                    String[] cols = recordSet.getColumnNames();

                    JSONObject jsonSoundscapes = new JSONObject();

                    for (String col : cols)
                    {
                        String field = recordSet.getString(recordSet.getColumnIndex(col));
                        sl(col);
                        sl(field);
                        jsonSoundscapes.put(col, field);
                    }
                    jsonArray.put(jsonSoundscapes);
                }
                while(recordSet.moveToNext());

                json.put("soundscapes", jsonArray);

                // Apparently you need to close the Cursor to free RAM.
                recordSet.close();
            }
        }
        catch (JSONException e)
        {
            e.printStackTrace();
            l(e.getMessage());
        }

        sl("getSoundscapes(): Finished!");

        return json.toString();
    }

    /**
     * Delete the database file. Used for debugging only.
     *
     * @return Whether the database was deleted successfully or not
     */
    @JavascriptInterface
    public boolean delDB()
    {
        return db.deleteDB();
    }

    /**
     * Debug messages to log
     *
     * @param mesg Message to be logged
     */
    @JavascriptInterface
    public void l(String mesg)
    {
        //Log.d("Draginet", mesg);
        log.l(mesg);
    }

    /**
     * Copy the database from the assets folder
     */
    @JavascriptInterface
    public void copyDB()
    {
        db.copyDatabase();
    }

    /**
     * Get the current log file
     *
     * @return The log file as String
     */
    @JavascriptInterface
    public String getLogs()
    {
        return log.getLogMessages();
    }

    /**
     * Delete the log file.
     */
    @JavascriptInterface
    public void delLogs()
    {
        log.deleteLog();
    }

    /**
     * Log message directly to Logcat instead of log file.
     *
     * @param mesg The message to log
     * @param <T>  Template
     */
    @JavascriptInterface
    public <T> void sl(T mesg)
    {
        if (mesg == null)
        {
            // When there is no message!
            Log.d(logTag, "No message");
        }
        else
        {
            Log.d(logTag, (String) mesg);
        }
    }
}
