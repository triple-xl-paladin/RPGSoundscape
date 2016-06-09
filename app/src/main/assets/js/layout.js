/**
 * Cpoyright (C) 2016 by Alexander Chen
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



// This is temporary
var soundscape_json = '{"soundscape":"fantasy"}';
var soundscape = JSON.parse(soundscape_json);

/**
 * Converts the effects list of files into a JSON object.
 */
var soundset = JSON.parse(soundscheme_json);

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
 
  //alert(length(effects_list));
  for (y=0; y<length(effects_list); y++) {
    html_out += '<div class="player mdl-card mdl-shadow--4dp">'+
		'  <div class="mdl-card__supporting-text mdl-card__border">'+
		'    <div class="player-button">'+
                '      Effect: <span>'+effects_list[y].title+'</span><br>'+
                '      <button><img src="icons/media-playback-start.svg" height="45px" width="45px"></img></button>'+
		'    </div>'+
		'    <div class="player-volume">'+
                '      <input type="range" min="0" max="100" value="0"><br/>'+
                '      <audio id="player'+y+'" loop src="'+effects_location+effects_list[y].mp3+'" type="audio/mpeg">'+
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
function add_music_player(playlist) {

  var song = shuffle(playlist)[0];
  var music_location = "soundset/fantasy/music/";
  var html_out = 
    '      <div class="player mdl-card mdl-shadow--4dp">'+
    '        <div class="mdl-card__supporting-text mdl-card__border">'+
    '          <div class="player-button">'+
    '            Music: <span id="song_title">'+song.title+'</span><br/>'+
    '            <button><img src="icons/media-playback-start.svg" height="45px" width="45px"></img></button>'+
    '          </div>'+
    '          <div class="player-volume">'+
    '            <input type="range" min="0" max="100" value="0"><br/>'+
    '            <audio id="music-player" src="'+music_location+song.mp3+'" type="audio/mpeg"></audio>'+
    '          </div>'+
    '        </div>'+
    '      </div>';

    return html_out;
}

/**
 * Build the page
 */
function build() {
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
    var soundscene_name = soundset.soundscheme[x].soundscene;
    //alert(soundset.soundscheme[x].music);
    var soundscene_playlist = soundset.soundscheme[x].music;
    var soundscene_effects_list = soundset.soundscheme[x].effects;

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
           add_music_player(soundscene_playlist) + add_effects_player(soundscene_effects_list)+
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




