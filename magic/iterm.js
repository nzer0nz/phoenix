
/* HYPER */

setEventHandler ( 'windowDidOpen', magiciTermOpen ); //FIXME: Doesn't seem to be working

/* HANDLER */

function magiciTermOpen ( window ) {

  if ( !window.isNormal () || !window.isMain () ) return;

  const name = window.app ().name ();

  if ( !/iTerm/.test ( name ) || false ) return;

  // setFrame ( 'top-left', window );
  const frame = window.frame ();

  window.setFrame ({
    x: frame.x,
    y: frame.y,
    width: CENTER_WIDTH,
    height: CENTER_HEIGHT
  });

  center_window ( window );
}
