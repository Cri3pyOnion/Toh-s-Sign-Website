<?php
/**
 * Toh's Sign theme setup.
 *
 * @package tohs-sign
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'after_setup_theme',
	function () {
		add_theme_support( 'wp-block-styles' );
		add_editor_style( 'assets/css/editor.css' );
	}
);

add_action(
	'wp_enqueue_scripts',
	function () {
		$ver = wp_get_theme()->get( 'Version' );
		wp_enqueue_style( 'tohs-sign', get_theme_file_uri( 'assets/css/theme.css' ), array(), $ver );
	}
);
