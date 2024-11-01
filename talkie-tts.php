<?php
/*
Plugin Name: Talkie Text To Speech
Plugin URI: https://www.talkie-app.com
Description: A simple text to speech plugin for your web page. 
Version: 2.0
Author: Tribble Media
Author URI: https://www.tribble.nl
*/

/*
Copyright (C) 2019-2023 Tribble Media
Contact me at https://www.talkie-app.com

This app is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

// TALKIE

require_once('settings.php');

add_filter( 'plugin_action_links', 'add_plugin_links', 10, 2 );

function add_plugin_links( $links, $file ) {
	if ( plugin_basename( __DIR__ . '/talkie-tts.php' ) === $file ) {
		$links[] = '<a href="admin.php?page=talkie-tts">Settings</a>';
	}
	return $links;
}

function talkie_load_scripts() {
    wp_enqueue_style('talkie-voice', plugin_dir_url(__FILE__) . 'css/styles.css');
    wp_enqueue_script('talkie-voice', plugin_dir_url(__FILE__) . '/js/scripts.js');
	wp_localize_script('talkie-voice', 'talkieScript', array(
		'pluginUrl' => plugins_url().'/talkie-text-to-speech',
	));
}

add_action('wp_enqueue_scripts', 'talkie_load_scripts');


add_shortcode("talkie", "talkie_shortcode");

function talkie_shortcode( $atts, $content = null ) {
	
	extract( shortcode_atts( array(
		'lang' => '',
		'class' => '',
		'id' => '',
		'btn' => ''
	), $atts ) );
	
    $options = get_option( 'talkie_tts_option_name' );
    $outlined = ($options['outlined_btn']) ? true : false;
    
    $btnText = array(
		'nl-NL' => 'Lees voor',
		'en-US' => 'Listen',
		'en-GB' => 'Listen',
		'de-DE' => 'Vorlesen',
		'es-ES' => 'Escuhar',
		'it-IT' => 'Ascolta',
		'fr-FR' => 'Ecouter',
		'pt-BR' => 'Ouvir'
	);
	
	$language = ($options['voices'] == null) ? 'en-US' :  $options['voices'];
    
    $data = array('lang' => $language, 'id' => $atts['id'], 'class' => $atts['class'], 'content' => $content, 'btnText' => $btnText[$options['voices']], 'outlined' => $outlined);
    $data = json_encode($data);
    	

	$content = '<div id="talkieTts">';
	$content .= '<button id="readTalkie"';
	($options['color'] && $options['outlined_btn'] != "true") ? $content .= 'style="background-color:'.$options['color'].'"' : '';
	($options['color'] && $options['outlined_btn'] == "true") ? $content .= 'style="border-color:'.$options['color'].'; color:'.$options['color'].' !important;"' : '';
	($options['outlined_btn'] == "true") ? $content .= 'class="btn btn-outlined btn-talkie"' : $content .= 'class="btn btn-talkie"';
	$content .= '>';
	$content .= $btnText[$options['voices']];
	$content .= '</button>';   	
	$content .= '<script>var data = ' . $data . ';</script>
	</div>
	';
   
	return $content;
}
?>