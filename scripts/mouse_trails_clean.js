console.log("HELL")
var MouseTrails = function(){
  var spriteCount = 5
  var offsetX = 10,
      offsetY = 8

  // build elements
  var createSprites = function(parent, numLeft){

    var child = $("<div></div>")
                  .addClass('under_construction_mouse_sprite')
                  .css({
                    position: 'absolute',
                    backgroundColor: '#F0'+(numLeft*2)
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
    debug(sprite.css('top'))
    
    if(sprite[0].firstChild){
      adjustSprites(
        x + offsetX+20,
        y + offsetY+30,
        $(sprite[0].firstChild)
      )
    }
  }

  $('body').mousemove(function(e){
    adjustSprites(e.pageX,e.pageY)
  })
}

MouseTrails()