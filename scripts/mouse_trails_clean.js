var MouseTrails = function(){
  var spriteCount = 5
  var offsetX   = 30,
      offsetY   = 15,
      delay     = 100,
      interval  = 900
      shouldAdjust = false

  // periodically trigger the need for an update
  setInterval(function(){ shouldAdjust = true}, interval)

  // build elements
  var createSprites = function(parent, numLeft){

    var child = $("<div></div>")
                  .addClass('under_construction_mouse_sprite')
                  .css({
                    position: 'absolute',
                    backgroundColor: '#F0'+((numLeft*2)-1)
                  })
                  .html(
                    $("<span>&nbsp;</span>")
                  )

    parent.append(child)

    if(numLeft > 0)
      createSprites(child, numLeft-1)
  }
  createSprites($("body"), spriteCount)

  var firstSprite = $("body > .under_construction_mouse_sprite")

  var adjustSprites = function(x, y, sprite){
    var top, left

    if(typeof sprite == 'undefined'){
      sprite = firstSprite
      top  = y
      left = x
    }else{
      top  = offsetY
      left = offsetX
    }

    sprite
      .css({
        top:  top+'px',
        left: left+'px'
      })
      // .find("span")
      //   .html("x: "+left+", y: "+top)

    // delay setting the next sprite location
    setTimeout(function(){
      var child = sprite.find(".under_construction_mouse_sprite:first")
      if(child.length){
        adjustSprites(
          x + offsetX,
          y + offsetY,
          child
        )
      }
    }, delay)
  }

  $('body').mousemove(function(e){
    if(shouldAdjust){
      shouldAdjust = false
      adjustSprites(e.pageX,e.pageY)
    }
  })
}

MouseTrails()