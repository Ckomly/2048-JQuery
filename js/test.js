
(function($)
{
    $.fn.extend(
      {
        mygame: function(size)
        {
            //Parameters by default
            var defaults = $.extend(
            {
                gameObject: this.attr('id'),
                blockSize: size,
                boardSize: 4 * size,
                flagTile: false,
                status: true
            });

            //Initialisation Game
            var createBoard = function()
            {
                //Board
                $("<div id='board'></div>").prependTo($("#" + defaults.gameObject + ""));
                $("#board").height(defaults.boardSize).width(defaults.boardSize).css({"background-color": "gray"});
                //Square-container
                for (var i = 0; i < 4; i++)
                {
                    for (var j = 0; j < 4; j++)
                    {
                      $('#board').append('<div class="square-container" data-x="'+i+'" data-y="'+j+'" ></div>');
                    }
                }
                $(".square-container").height(size-4).width(size-4);
            }

            var createTile = function(nb)
            {
                for (var i = 0; i < nb; i++)
                {
                  var x = Math.floor(Math.random()*4);
                  var y = Math.floor(Math.random()*4);
                  var number = Math.random() < 0.8 ? 2 : 4;
                  if($("div[data-x="+x+"][data-y="+y+"]").hasClass("tile"))
                  {
                    i--;
                  }
                  else
                  {
                    $("div[data-x="+x+"][data-y="+y+"]").addClass("tile").html("<p class='nbFont'>"+number+"</p>");
                  }
                }
            }

            var moveAllRight = function()
            {
              for (var i = 3; i >= 0; i--)
              {
                for (var j = 3 ; j >= 0; j--)
                {
                  // si une tuile est detecté alors on va essayer de declancher un mouvement.
                  // sauf si la tuile est déjà positionné sur le bord visé.
                  if($("div[data-x="+i+"][data-y="+j+"]").hasClass("tile") && j != 3)
                  {
                    moveRight(i, j);
                  }
                }
              }
            }

            // RIGHT
            var moveRight = function(x,y)
            {
              var yY = y+1;
              var value = $("div[data-x="+x+"][data-y="+y+"]").text();
              if(y < 3)
              {
                // on verifie : si la case suivant la direction est occupé et si elle a une valeur différente de la case qui bouge.
                if($("div[data-x="+x+"][data-y="+yY+"]").hasClass("tile") && $("div[data-x="+x+"][data-y="+yY+"]").text() != value)
                {

                }
                else
                {
                  $("div[data-x="+x+"][data-y="+y+"]").removeClass("tile").text("");y++;
                  //si la case suivante est de même valeur alors on va les fusionner et ajouter leur valeures.
                  if($("div[data-x="+x+"][data-y="+yY+"]").hasClass("tile") && $("div[data-x="+x+"][data-y="+yY+"]").text() == value)
                  {
                    $("div[data-x="+x+"][data-y="+y+"]").addClass("tile").text(value*2);
                    $("div[data-x="+x+"][data-y="+y+"]").css({position: ''}).animate({right: '100px'});
                    defaults.flagTile = true;
                    return;
                  }
                  // sinon on se deplace simplement d'une case
                  else
                  {
                    $("div[data-x="+x+"][data-y="+y+"]").addClass("tile").text(value);
                    $("div[data-x="+x+"][data-y="+y+"]").css({position: ''}).animate({right: '100px'});
                    defaults.flagTile = true;
                  }
                  moveRight(x,y);
                }
              }
            }

              $(document).keydown(function(e)
              {
                // TRIGGERING DIFFERENT EVENT DEPENDING OF WICH KEY YOU USE
                switch(e.which)
                {
                    case 37: //moveAllLeft() //left
                    break;

                    case 38: //moveAllUp() // up
                    break;

                    case 39: moveAllRight(); // right
                    break;

                    case 40: //moveAllDown() // down
                    break;
                }
              });
            }

            createBoard();
            createTile(1);
            }
    });
})(jQuery);
