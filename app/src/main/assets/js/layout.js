/**
 * Copyright (C) 2016 by Alexander Chen
 *
 * This file is part of RPG Soundscape source code
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
 *
 */

/**
 * Shuffles array.
 *
 * Takes an array of objects, randomly orders them and return an array
 *
 */
function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}


/**
 * Returns the length of a JSON object.
 *
 * For example, length(effects_list.files) where 
 * effects_list = { "files" : [{"title":"Title1","file":"File1"}];
 *
 */
function length(obj) {
  return Object.keys(obj).length;
}


/**
 * Adds a player for each single effects files
 */
function add_effects_player(effects_list){
  var effects_location = "soundset/fantasy/effects/";
  var html_out = "";

  //db.sl(effects_list);

  //alert(length(effects_list));
  for (y=0; y<length(effects_list.effect); y++) {
    html_out += '<div class="player mdl-card mdl-shadow--4dp">'+
		'  <div class="mdl-card__supporting-text mdl-card__border">'+
		'    <div class="player-button">'+
                '      Effect: <span>'+effects_list.effect[y].title+'</span><br>'+
                '      <button><img src="icons/media-playback-start.svg" height="45px" width="45px"></img></button>'+
		'    </div>'+
		'    <div class="player-volume">'+
                '      <input type="range" min="0" max="100" value="0"><br/>'+
                '      <audio id="player'+y+'" loop src="'+effects_location+effects_list.effect[y].file+'" type="'+effects_list.effect[y].file_type+'">'+
                '      </audio>'+
		'    </div>'+
		'  </div>'+
		'</div>';
  }
  return html_out;
}


/**
 * Adds a music player
 */
function add_music_player(song, soundscene_name) {

  //var song = shuffle(playlist)[0];
  var music_location = "soundset/fantasy/music/";
  //db.sl('add music '+song.song[0].title+' '+song.song[0].file+' '+song.song[0].file_type)
  var html_out = 
    '      <div class="player mdl-card mdl-shadow--4dp">'+
    '        <div class="mdl-card__supporting-text mdl-card__border">'+
    '          <div class="player-button">'+
    '            Music: <span id="song_title">'+song.song[0].title+'</span><br/>'+
    '            <audio class="music-player" id="'+soundscene_name+'" src="'+music_location+song.song[0].file+'" type="'+song.song[0].file_type+'"></audio>'+
    '            <button><img src="icons/media-playback-start.svg" height="45px" width="45px"></img></button>'+
    '          </div>'+
    '          <div class="player-volume">'+
    '            <input type="range" min="0" max="100" value="0"><br/>'+
    '          </div>'+
    '        </div>'+
    '      </div>';

    return html_out;
}

/**
 * Build the page
 */
function build() {

  var soundscape_json = db.getSoundscapes();
  //db.sl("soundscape_json: "+soundscape_json);
  var soundscape_list = JSON.parse(soundscape_json);

  var soundscape = soundscape_list.soundscapes[0].soundscape;

  /**
   * Converts the effects list of files into a JSON object.
   */
  var soundscheme_json = db.getSoundschemes(soundscape);
  //db.sl(soundscheme_json);
  var soundset = JSON.parse(soundscheme_json);

  // Reference to the tab bar element in the html
  var tab_bar = $("#tab-bar");
  var tab_bar_output = "";

  // Reference to the part where the players gets display on the page in the tab
  var page_content = $("#page-content");
  var page_content_output = "";
  var is_active = "is-active";
  var active = "";

  var soundscheme_num = length(soundset.soundscheme);

  for(x=0; x<soundscheme_num; x++) 
  {
    var soundscene_name = soundset.soundscheme[x].soundscheme;
    //alert(soundset.soundscheme[x].music);
    //db.sl("scname: "+soundscene_name);
    var song_json = db.getSong(soundscene_name);

    //db.sl("Parse JSON song: "+song_json);
    var song = JSON.parse(song_json);
    //db.sl("song "+song);

    //db.sl("getEffects "+soundscene_name);
    var effects_json = db.getEffects(soundscene_name);
    //db.sl("getEffects "+effects_json);
    var soundscene_effects_list = JSON.parse(effects_json);

    //db.sl("getEffects "+soundscene_effects_list);
    if(x==0) {
      tab_bar_output = '<a href="#'+soundscene_name+'" class="mdl-layout__tab is-active">'+soundscene_name+'</a>';
      active = is_active;
    } else {
      tab_bar_output = tab_bar_output + '<a href="#'+soundscene_name+'" class="mdl-layout__tab">'+soundscene_name+'</a>';
      active = "";
    }

    page_content_output +=
    '  <section class="mdl-layout__tab-panel '+active+'" id="'+soundscene_name+'">'+
    '    <div class="page-content"><!-- Your content goes here -->'+
           add_music_player(song, soundscene_name) + add_effects_player(soundscene_effects_list)+
    '    </div>'+
    '  </section>';
  }
  tab_bar.html(tab_bar_output);
  page_content.html(page_content_output);
}

function init() {
  build();
}

$(document).ready(init);