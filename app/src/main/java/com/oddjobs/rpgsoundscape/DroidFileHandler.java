
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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class DroidFileHandler
{
  BufferedReader r = null;
  String filename = null;
  Context context;

  /**
   * Constructor for file handler
   *
   * @param filename The file to be read or written. The file must exist within the assets directory of the Android app.
   */
  public DroidFileHandler(Context context, String filename)
  {
    this.filename = filename;
    this.context = context;
  }

  /**
   * The method returns the file as defined by the contructor.
   *
   * @return 	The contents of the file as a single text string.
   */
  public String readFile()
  {
    String out = new String();

    try
    {
      r = new BufferedReader(new InputStreamReader(context.getAssets().open(filename)));

      String mLine;

      while((mLine = r.readLine()) != null)
      {
        out += mLine;
      }
    }
    catch(IOException e)
    {
      //TODO: Log exception
      e.printStackTrace();
    }
    finally
    {
      if(r != null)
      {
        try
	{
	  r.close();
	}
	catch(IOException e)
	{
	  //TODO: Log exception
	  e.printStackTrace();
	}
      }
    }

    return out;
  }

  public void writeFile(String content)
  {
    // TODO: method to write contents to file
  }
}
