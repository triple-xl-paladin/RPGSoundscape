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

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity
{
    WebView webView = null;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = (WebView) findViewById(R.id.webview);
        WebSettings settings = webView.getSettings();

        // Stops android trying to opens urls outside the webview.
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return false;
            }
        });

        // Enable JavaScript
        settings.setJavaScriptEnabled(true);

        webView.addJavascriptInterface(new WebAppJavaScriptInterface(this), "db");

        // One of these solved the problem where when I tried to grab the next song from the
        // playlist, it wouldn't play it. Can't determine what exactly is the source of the
        // problem. Logcat was no help.
        settings.setAllowFileAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setAllowContentAccess(true);
        settings.setLoadsImagesAutomatically(true);

        // Supposed to stop it from refreshing the page when the app returns from pause.
        // Does nothing, but no harm being in there
        if (savedInstanceState == null)
        {
            webView.loadUrl("file:///android_asset/index.html");
            //webView.loadUrl("file:///android_asset/test.html");
        }
    }

    /**
     * Save the state when sleeping (I think!)
     *
     * @param outState
     */
    @Override
    protected void onSaveInstanceState(Bundle outState )
    {
        super.onSaveInstanceState(outState);
        webView.saveState(outState);
    }

    /**
     * Restores the app (I think!)
     *
     * @param savedInstanceState
     */
    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState)
    {
        super.onRestoreInstanceState(savedInstanceState);
        webView.restoreState(savedInstanceState);
    }
}
