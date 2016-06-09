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

/**
 * When the current playing music has ended, the function randomly picks a piece of music from the playlist
 * and plays it.
 *
 * This solution feels dirty, but nothing else seems to work.
 */
function music_player_events()
{
  var music_location = "soundset/fantasy/music/";

  var p = $("#music-player");

  var soundtab = p.closest("section").attr("id");
  var music_name = $('#song_title');

  var playlist = "";

  var soundscheme_num = length(soundset.soundscheme);

  // Get the playlist for the tab the music is currently playing
  for(a=0;a<soundscheme_num;a++)
  {
    if(soundset.soundscheme[a].soundscene == soundtab) 
    {
      playlist = soundset.soundscheme[a].music;
    }
  }

  // I should be able to find out which parent this is and get the playlist that way instead of the loop from above.
  p.on('ended', function() {
    var song = shuffle(playlist)[0];
    p.attr("src",music_location+song.mp3);
    music_name.html(song.title);
    p.trigger("play");
  });
}

/**
 * Determines what will happen when the play/pause button gets pressed.
 * A couple of things this function will do:
 * - Fade in and out the music
 * - animate the change in volume on the volume bar
 * - change the play/pause icon
 */
function play_pause_event(item)
{
  //alert(item.prop("nodeName"));
  //alert(item.prop("class"));
  var fade_speed = 1500;
  var u = item.find('input');
  var v = item.find('audio');
  var w = item.find('img');

  if(v.prop("paused"))  {
    v.prop("volume",0); // set volume to zero
    v.trigger("play"); // start playing the audio file
    v.animate({volume: 1}, fade_speed); // fade in the audio over fade speed
    u.animate({value: 100}, fade_speed); // animate the volume range bar to do the same
    w.attr("src","icons/media-playback-pause.svg"); // change the button icon to a pause button
  } else {
    w.attr("src","icons/media-playback-start.svg"); // change the button icon to a play buttone
    v.animate({volume: 0}, fade_speed); // fade out the audio over fade speed
    u.animate({value: 0}, fade_speed); // animate the volume range bar to do the same

    // Set the time before the audio file gets paused. This is based on the time it takes to fade the audio
    setTimeout(function(){
      v.trigger("pause");
    },fade_speed);
  }
}


/**
 * Events for the player buttons and volume bar
 */
function player_events() {
  var e = $("#page-content");

  // Detect the button press on the play/pause buttons
  e.on('click','button',function(){
    var el = $(this).parent().parent();
    //alert(el.prop("nodeName"));
    play_pause_event(el);
  });

  // Detect the change in the input range bar and set the volume appropriately
  e.on('change','input',function(){
    var aud = $(this).siblings('audio');
    var curr_vol = $(this).prop("value")/100; // Must divide by 100 as volume is between 0 and 1
    aud.prop("volume",curr_vol);
  });

  // This doesn't work properly...
  // As soon as I click on a different tab, I can not seem to reference the previous tab tags.
  // Stopping the audio is the only thing that works. That is because it triggers stop on all audio tags
  // not just the one that was playing.
  $("#tab-bar").on("click","a",function(){
    var fade_speed = 1500;
    var ape = $("audio");
    var img = $("input");

    //var tmp = $(this);
    
    // Temporary override
    ape.trigger("pause");

    //alert(tmp.prop("href"));

    // This never happens because ape is detecting the audio tags on the clicked tab instead of the previous tab. bugger!
    if(!ape.prop("paused")) {
      ape.animate({volume: 0}, fade_speed); // fade out the audio over fade speed
      img.attr("src","icons/media-playback-start.svg"); // change the button icon to a play buttone
      setTimeout(function(){
	ape.trigger("pause");
      },fade_speed);
    }
  });
}

function init() {
  build();
  music_player_events();
  player_events();
}

$(document).ready(init);




