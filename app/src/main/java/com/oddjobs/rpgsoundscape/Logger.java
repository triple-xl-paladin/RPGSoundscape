
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
import android.util.Log;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Logger is designed to record any debug messages to a file instead of Android's defaul Logcat. The
 * log is saved under the application files directory.
 * <p>
 * The logger will attempt to create the log file if none exists. The logger will also rotate the
 * logs on a basis defined by the user to reduce space usage on the device.
 * <p>
 * Created by Alexander Chen on 04/03/16.
 * <p>
 * <b>Change Log</b>
 * <uL>
 *   <LI>2016-03-05: Updated documentation</LI>
 * </uL>
 * <p>
 * <b>To do</b>
 * <ul>
 *   <li>rotate logs</li>
 *   <li>limit log size</li>
 * </ul>
 *
 * @author  Alexander Chen
 * @version %I%, %G%
 * @since   0.1
 *
 */
public class Logger
{
  private String log_file_path = "";
  private String log_file = "/draginet.log"; // Maybe this should be user definable?
  private File log;
  private BufferedWriter p;
  private BufferedReader r;
  private boolean logging = true; // Default should be false, not true.
  private final static String LOG_TAG = "Draginet";

  /**
   * Constructor of Logger. The constructor performs the following duties:
   * <ul>
   *   <li>Builds the path location to file</li>
   *   <li>creates the log file if none exists</li>
   *   <li>rotates the log files based on days or size</li>
   * </ul>,
   *
   * @param c The context the logger was called from
   */
  public Logger(Context c)
  {
    boolean createf = false; // DEBUG: Test to see if the file was created

    log_file_path = c.getFilesDir().getAbsolutePath(); // build the path from the system

    g(log_file_path+log_file); // DEBUG to Logcat

    log = new File(log_file_path+log_file);

    boolean exist = log.exists(); // DEBUG to Logcat
    g(String.valueOf(exist));

    if(log.exists() != true)
    {
      createf = createFile();
      l("Logger(): Created new file=" + String.valueOf(createf));
    }
    l("Logger(): Did not create new file");
  }

  /**
   * Turn on logging messages to file and not to logcat. This does not prevent the log file from
   * being created and rotated.
   *
   * @return Whether logging enabled
   */
  public boolean enableLogging()
  {
    logging = true;
    return logging;
  }

  /**
   * Disable logging messages to file and instead send messages to logcat.
   *
   * @return Whether logging disabled
   */
  public boolean disableLogging()
  {
    logging = false;
    return logging;
  }

  /**
   * Logs a message to the log file in format of <code>yyyy-mm-dd hh:mm:ss :debug message</code>.
   * Messages are appended to the log file by default.
   *
   * @param mesg The message to be logged
   */
  public <T> void logMessage(T mesg)
  {
    if(logging)
    {
      boolean APPEND_MODE = true;

      try
      {
        p = new BufferedWriter(new FileWriter(log_file_path + log_file, APPEND_MODE));
        String msg = getDTTM() + " : " + (String) mesg;
        p.write(msg);
        p.newLine();
        p.flush();
      }
      catch (IOException e)
      {
        e.printStackTrace();
      }
      finally
      {
        if (p != null)
        {
          try
          {
            p.close();
          }
          catch (IOException e)
          {
            e.printStackTrace();
          }
        }
      }
    }
    else
      Log.d(LOG_TAG,(String) mesg);
  }

  public String getLogMessages()
  {
    String line = "";
    String output = "";

    g("Hello"); // DEBUG

    try
    {
      BufferedReader r = new BufferedReader(new FileReader(log_file_path+log_file));

      g("Reader opened"); // DEBUG

      while((line = r.readLine() )!= null)
      {
        output += line + "<br>";
      }

      g(output);
      g("Reader closed"); // DEBUG
      r.close();
    }
    catch (IOException e)
    {
      e.printStackTrace(); // Can not log to file if exception thrown
    }

    return output;
  }


  /**
   * Log message to file. Lazy version.
   *
   * @param mesg The message to log.
   */
  public <T> void l(T mesg)
  {
    logMessage(mesg);
  }

  /**
   * DEBUG Log messages to logcat
   *
   * @param msg Message to log
   */
  private void g(String msg)
  {
    Log.d("Draginet", msg);
  }

  /**
   * Create the log file
   *
   * @return Created or not
   */
  private boolean createFile()
  {
    boolean cf = false;

    try
    {
      cf=log.createNewFile();
    } catch (IOException e)
    {
      e.printStackTrace();
    }

    return cf;
  }

  /**
   * Gets the date and time for the log message to be written
   *
   * @return Date time in the format YYYY-MM-DD HH:MM:SS
   */
  private String getDTTM()
  {
    DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date date = new Date();

    return df.format(date);
  }

  /**
   * Delete the log file.
   */
  public void deleteLog()
  {
    log.delete();
  }
}
