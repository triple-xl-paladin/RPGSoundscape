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
 * Variables containing soundsets, playlists etc which eventually will be going into a database
 */
var soundscheme_json ='{"soundscheme":['+
                      '  {"soundscene":"Tavern",'+
		      '    "music":['+
		      '      {"title": "Achaidh Cheide","mp3":"Achaidh_Cheide.mp3"},'+
		      '      {"title": "Angevin B" ,"mp3": "Angevin_B.mp3"},'+
		      '      {"title": "Angevin", "mp3":"Angevin.mp3"},'+
		      '      {"title": "Celtic Impulse","mp3": "Celtic_Impulse.mp3"},'+
		      '      {"title": "Errigal" ,"mp3": "Errigal.mp3"},'+
		      '      {"title": "Fiddles McGinty","mp3": "Fiddles_McGinty.mp3"},'+
		      '      {"title": "Folk Round" ,"mp3": "Folk_Round.mp3"},'+
		      '      {"title": "Minstrel Guild" ,"mp3": "Minstrel_Guild.mp3"},'+
		      '      {"title": "Pippin the Hunchback" ,"mp3": "Pippin_the_Hunchback.mp3"},'+
		      '      {"title": "Skye Cuillin","mp3": "Skye_Cuillin.mp3"},'+
		      '      {"title": "Thatched Villagers","mp3": "Thatched_Villagers.mp3"}'+
		      '            ],'+
		      '    "effects":['+
		      '      {"title":"Crowd in a bar","mp3":"163995__leandros-ntounis__crowd-in-a-bar-lcr.mp3"},'+
                      '      {"title":"Tavern ambience","mp3":"209354__robinhood76__04622-tavern-ambience-looping.mp3"}'+
		      '              ]'+
		      '  },'+
		      '  {"soundscene":"Combat",'+
		      '    "music":['+
		      '      {"title":"Clash Defiant","mp3":"Clash_Defiant.mp3"},'+
		      '      {"title":"Corruption","mp3":"Corruption.mp3"},'+
		      '      {"title":"Curse of the Scarab","mp3":"Curse_of_the_Scarab.mp3"},'+
		      '      {"title":"Exciting Trailer","mp3":"Exciting_Trailer.mp3"},'+
		      '      {"title":"Five Armies","mp3":"Five_Armies.mp3"},'+
		      '      {"title":"Future Gladiator","mp3":"Future_Gladiator.mp3"},'+
		      '      {"title":"Ghostpocalypse 7 Master","mp3":"Ghostpocalypse_7_Master.mp3"},'+
		      '      {"title":"Hero Down","mp3":"Hero_Down.mp3"},'+
		      '      {"title":"Stormfront","mp3":"Stormfront.mp3"},'+
		      '      {"title":"Volatile Reaction","mp3":"Volatile_Reaction.mp3"}'+
		      '            ],'+
		      '    "effects":['+
		      '      {"title":"Applause huge thunderous","mp3":"196094__peridactyloptrix__applause-huge-thunderous.mp3"},'+
                      '      {"title":"Crowd in a bar","mp3":"242604__edhutschek__theater-chatter.mp3"}'+
		      '              ]'+
		      '  },'+
		      '  {"soundscene":"Temple-Hall",'+
		      '    "music":['+
		      '      {"title":"Music for Funeral Home - Part 11","mp3":"Music_for_Funeral_Home_-_Part_11.mp3"},'+
		      '      {"title":"Rites","mp3":"Rites.mp3"},'+
		      '      {"title":"Tiny Fugue","mp3":"Tiny_Fugue.mp3"}'+
		      '            ],'+
		      '    "effects":['+
		      '      {"title":"People walking away after show","mp3":"193061__soundslikewillem__people-walking-away-after-show.mp3"},'+
                      '      {"title":"Fish market hall","mp3":"213572__arnaud-coutancier__fish-market-hall.mp3"}'+
		      '              ]'+
		      '  },'+
		      '  {"soundscene":"Town",'+
		      '    "music":['+
		      '      {"title":"Americana","mp3":"Americana.mp3"},'+
		      '      {"title":"Death of Kings","mp3":"Death_of_Kings.mp3"},'+
		      '      {"title":"Pennsylvania Rose","mp3":"Pennsylvania_Rose.mp3"},'+
		      '      {"title":"Perspectives","mp3":"Perspectives.mp3"}'+
		      '            ],'+
		      '    "effects":['+
		      '      {"title":"Fish market hall","mp3":"213572__arnaud-coutancier__fish-market-hall.mp3"},'+
                      '      {"title":"Market","mp3":"129677__le-abbaye-noirlac__market-2.mp3"},'+
                      '      {"title":"Heavy rain","mp3":"243627__lebcraftlp__heavy-rain.mp3"},'+
                      '      {"title":"Wind chimes","mp3":"96643__cgeffex__wind-chimes.mp3"}'+
		      '              ]'+
		      '  },'+
		      '  {"soundscene":"Travelling",'+
		      '    "music":['+
		      '      {"title":"Air Prelude","mp3":"Air_Prelude.mp3"},'+
		      '      {"title":"Intrepid","mp3":"Intrepid.mp3"},'+
		      '      {"title":"Lost Time","mp3":"Lost_Time.mp3"},'+
		      '      {"title":"Martian Cowboy","mp3":"Martian_Cowboy.mp3"},'+
		      '      {"title":"Myst on the Moor","mp3":"Myst_on_the_Moor.mp3"},'+
		      '      {"title":"Ossuary 5 - Rest","mp3":"Ossuary_5_-_Rest.mp3"},'+
		      '      {"title":"Serpentine Trek","mp3":"Serpentine_Trek.mp3"},'+
		      '      {"title":"Supernatural","mp3":"Supernatural.mp3"},'+
		      '      {"title":"Willow and the Light","mp3":"Willow_and_the_Light.mp3"}'+
		      '            ],'+
		      '    "effects":['+
		      '      {"title":"Crickets","mp3":"129338__le-abbaye-noirlac__cricket-5.mp3"},'+
                      '      {"title":"Houling wind","mp3":"144083__bosk1__wind-houling-1.mp3"},'+
                      '      {"title":"Wind in leaves","mp3":"17546__patchen__wind-in-the-leaves.mp3"},'+
                      '      {"title":"Swamp gas bubbling","mp3":"185071__oneirophile__swamp-gas-bubbling.mp3"},'+
                      '      {"title":"Heavy rain","mp3":"243627__lebcraftlp__heavy-rain.mp3"},'+
                      '      {"title":"Wind indoors","mp3":"320693__klankbeeld__wind-indoors-001-150823-0735.mp3"},'+
                      '      {"title":"Waterfall","mp3":"335992__inspectorj__waterfall-large-a.mp3"}'+
		      '              ]'+
		      '  },'+
		      '  {"soundscene":"Dungeon",'+
		      '    "music":['+
		      '      {"title":"Dark Fog","mp3":"Dark_Fog.mp3"},'+
		      '      {"title":"Inexorable","mp3":"Inexorable.mp3"},'+
		      '      {"title":"Long Note Four","mp3":"Long_Note_Four.mp3"},'+
		      '      {"title":"Not As It Seems","mp3":"Not_As_It_Seems.mp3"},'+
		      '      {"title":"Political Ad","mp3":"Political_Ad.mp3"},'+
		      '      {"title":"Private Reflection","mp3":"Private_Reflection.mp3"},'+
		      '      {"title":"Supernatural","mp3":"Supernatural.mp3"},'+
		      '      {"title":"This House","mp3":"This_House.mp3"},'+
		      '      {"title":"Unseen Horrors","mp3":"Unseen_Horrors.mp3"}'+
		      '            ],'+
		      '    "effects":['+
		      '      {"title":"Dripping water","mp3":"234554__electroviolence__dripping-water.mp3"},'+
                      '      {"title":"Waterfall","mp3":"335992__inspectorj__waterfall-large-a.mp3"},'+
                      '      {"title":"Houling wind","mp3":"144083__bosk1__wind-houling-1.mp3"},'+
                      '      {"title":"Wind indoors","mp3":"320693__klankbeeld__wind-indoors-001-150823-0735.mp3"},'+
                      '      {"title":"Swamp gas bubbling","mp3":"185071__oneirophile__swamp-gas-bubbling.mp3"},'+
                      '      {"title":"Bubbling","mp3":"66787__mattj99__bubbling02.mp3"}'+
		      '              ]'+
		      '  }'+
                      ']}';

 
