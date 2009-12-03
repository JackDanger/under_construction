var MouseTrails = function(){
  var spriteCount = 5
  var offsetX   = 10,
      offsetY   = 8,
      delay     = 15,
      interval  = 150
      shouldAdjust = false

  // periodically trigger the need for an update
  setInterval(function(){ shouldAdjust = true}, interval)

  // build elements
  var createSprites = function(parent, numLeft){

    var child = $("<div></div>")
                  .addClass('under_construction_mouse_sprite')
                  .css({
                    position: 'absolute',
                    backgroundColor: '#F0'+(numLeft*2)-1
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
    if(!sprite)
      sprite = firstSprite

    sprite
      .css({
        top:  y+'px',
        left: x+'px'
      })
      .find("span")
        .html("x: "+x+", y: "+y)
    setTimeout(function(){
      if(sprite[0].firstChild){
        adjustSprites(
          x + offsetX+20,
          y + offsetY+30,
          $(sprite[0].firstChild)
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