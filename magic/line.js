
/* HYPER */

setEventHandler ( 'windowDidOpen', magicLineOpen );

/* HANDLER */

function magicLineOpen ( window ) {

  if ( !window.isNormal () || !window.isMain () ) return;

  const name = window.app ().name ();

  if ( !/Line/.test ( name ) || false ) return;

  // setFrame ( 'top-left', window );
  center_window ( window );
}
