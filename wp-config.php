<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'psl' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         ';Y*p3k#_7Y{8HVl@O=u2dYrfr1:dDLi(J+uD{APA!x^cEHJw>:S&W#>31N[9!UeP' );
define( 'SECURE_AUTH_KEY',  '7Wl!xdT)0?d$7ckb4A1V?yG<,^/w_=tZ0~%arl_=H0KW]^eqV)5{pVz._F@Kgm5<' );
define( 'LOGGED_IN_KEY',    '.tJ+xj0O-=&XhP/zrvZ1$l;U~01KRMGl1X2O5oD4F<s1vJ%WK[Q|nn@7d@5S^QR~' );
define( 'NONCE_KEY',        'zhHe=A<J~LC`HU2Xkh$vF^3JtDs^4mkka~US(qUF:4zP9d3=`mu-?+2vou|1{a2V' );
define( 'AUTH_SALT',        'u+fdGn3tXTM(Q+z!niTXpM TYY%}Wh_B44;x$%maE@u=h/DBB!b&,do~;bBYzQHn' );
define( 'SECURE_AUTH_SALT', 're64yOH]IcP)jW&wj}dg<+H_juT:@gv?qJ`HW!E^]NTfg;)f&)p*EJ;-eKiGz[6B' );
define( 'LOGGED_IN_SALT',   '>+7]EVPk]@$@t_=X5fP[qk`NSi}RQCoR)~*%,&i#gsnxERrToL)F1MFpA)z4u1CU' );
define( 'NONCE_SALT',       '40x$1!1E]T-]hILyK~MfZRZD(P1Fxg2|2hbPqhlm++P]LcV~DN`cWsf(HQZhaNDc' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
