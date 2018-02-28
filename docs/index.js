
  // jQuery like functions
function $(str){ return document.querySelector(str); }
function $A(str){ return document.querySelectorAll(str); }

  // to add events to the prototype
function _bindOn( proto ){ 
  proto.on = function(name, callback, bubble){
    return this.addEventListener( name, callback, bubble );
  };
  proto.off = function(name, callback, bubble){
    return this.removeEventListener( name, callback, bubble );
  };
}

// On IE and iPad (Chrome e Safari) the Object/Interface "EventTarget" doesn't exists!
// In theses cases we need to use the Node interface (but the "document" and "window" objects don't are Nodes,
// so we need to bind to then too):
if( window.EventTarget ){
  _bindOn( window.EventTarget.prototype );
}else{
  _bindOn( window.Node.prototype );
  _bindOn( document );
  _bindOn( window );
}

// to read the Query String to check configs for the page
function readQueryString(){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  var params = {};
  for (var i in vars){
    var pair = vars[i].split("=");
    params[ pair[0] ] = pair[1] ;
  }
  return params;
}

// ---------------------------------------------------------

(function(){
  
  var queryMap = readQueryString();
  
  function getValues(){
    
      // information related to Viewport metatag
    var metaViewport = $('meta[name=viewport]');
    $('.semMetaViewport').style.display =   'block';
    $('.comMetaViewport').style.display =   'block';
    if( metaViewport ){
      $('.semMetaViewport').style.display = 'none';
      $('.comMetaViewport .contentViewport').textContent = metaViewport.outerHTML;
    } else {
      $('.comMetaViewport').style.display = 'none';
    }
    
      // information related to device screen
    var cmPx = parseFloat( getComputedStyle( $('.medidaCmRef'), null ).width );
    
        // pixels measurements:
    $('#windowInnerWidth').textContent =      window.innerWidth ;
    $('#windowInnerHeight').textContent =     window.innerHeight ;
    $('#windowOuterWidth').textContent =      window.outerWidth ;
    $('#windowOuterHeight').textContent =     window.outerHeight ;
    $('#screenWidth').textContent =           screen.width ;
    $('#screenHeight').textContent =          screen.height ;
    $('#screenAvailWidth').textContent =      screen.availWidth ;
    $('#screenAvailHeight').textContent =     screen.availHeight ;
    
        // centimeters measurements:
    $('#windowInnerWidthCm').textContent =    (window.innerWidth / cmPx).toFixed(2) ;
    $('#windowInnerHeightCm').textContent =   (window.innerHeight / cmPx).toFixed(2) ;
    $('#windowOuterWidthCm').textContent =    (window.outerWidth / cmPx).toFixed(2) ;
    $('#windowOuterHeightCm').textContent =   (window.outerHeight / cmPx).toFixed(2) ;
    $('#screenWidthCm').textContent =         (screen.width / cmPx).toFixed(2) ;
    $('#screenHeightCm').textContent =        (screen.height / cmPx).toFixed(2) ;
    $('#screenAvailWidthCm').textContent =    (screen.availWidth / cmPx).toFixed(2) ;
    $('#screenAvailHeightCm').textContent =   (screen.availHeight / cmPx).toFixed(2) ;


    $('#devicePixelRatio').textContent =      window.devicePixelRatio ;
    $('#colorDepth').textContent =            screen.colorDepth ;
    $('#pixelDepth').textContent =            screen.pixelDepth ;
    if( screen.orientation ){
      $('#orientationAngle').textContent =    screen.orientation.angle ;
      $('#orientationType').textContent =     screen.orientation.type ;
    }
    
    
      // tests showing units relation size
    var sizeTestes = $A('.sizeTest .testing');
    for( var i = 0; i < sizeTestes.length; i++ ){
      var block = sizeTestes[ i ];
      var styles = getComputedStyle( block.querySelector('.sizeTestBlock') , null);
      block.querySelector('.valorPixel').textContent = styles.width;
    }
    
      // tests that use "matchMedia" to check navegator properties
    if( matchMedia ){
      var lista = $A('.matchMedia [data-media]'), i = lista.length, el, mediaStr;
      while( i-- ){
        el = lista[i];
        mediaStr = el.attributes.item('data-media').value ;
        if( matchMedia(mediaStr).matches ){
          el.textContent = 'Yes';
          el.className = 'verde';
        } else {
          el.textContent = 'No';
          el.className = 'verm';
        }
      }
    }
  }
  
  function reloadWithViewportTag(){
    
  }
  function reloadWithoutViewportTag(){
    
  }
  
  document.on('DOMContentLoaded', function(){
    getValues();
    window.on('resize', getValues);
    $('#recalc').on('click', getValues);
    
    if( !matchMedia ) $('.matchMedia').style.display = 'none';
    else $('.matchMediaMissing').style.display = 'none';
    
    // To add Viewport metatag (for mobile)
    // !! Warning: after added this tag, removing the tag will not remove the changes 
    //             it cause (on most of navegators, including mobile).
    function toggleViewportTag(){
      var metaTag = $('meta[name=viewport]');
      
      if( metaTag ){
        metaTag.remove();
      } else {
        metaTag = document.createElement('meta');
        metaTag.name = 'viewport';
        metaTag.content = 'width=device-width';
        $('html head').appendChild( metaTag );
      }
      
      getValues(); // reload values after add meta[viewport]
    }
    $('#toggleViewportTag').on('click', toggleViewportTag);
    
    
    $('#reloadWithViewportTag').on('click', function(){
      window.location.search = 'hardware';
      window.location.realod();
    });
    $('#reloadWithoutViewportTag').on('click', function(){
      window.location.search = '';
      window.location.realod();
    });
    
    // toggle viewport metatag if no config on the QueryString
    if( 'hardware' in queryMap ){ 
      $('#reloadWithViewportTag').style.display = 'none';
    }else{
      $('#reloadWithoutViewportTag').style.display = 'none';
      toggleViewportTag();
    }
  });
  
})();
