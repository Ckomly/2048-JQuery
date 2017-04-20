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
                    $("div[data-x="+x+"][data-y="+y+"]").animate({borderRadius: 60}, "fast");
                    $("div[data-x="+x+"][data-y="+y+"]").animate({borderRadius: 10}, "fast");
                    //{complete : function(){}}
                  }

                  //.append("<div class='tile'></div>");
                  //$(".tile").height(size-4).width(size-4);
                }
            }

            var end = function()
            {
              return true;
            }

            // GAME OVER
            var isGameOver = function()
            {
              for (var i = 3; i >= 0; i--)
              {
                for (var j = 3 ; j >= 0; j--)
                {
                  // si on trouve un square qui ne contient pas de tuile la partie continue.
                  if($("div[data-x="+i+"][data-y="+j+"]").hasClass("tile") == false)
                  {
                      return true;
                  }
                }
              }
              return false;
            }

            // MOVE RIGHT
            // une boucle qui parcour notre quadrillage.
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

            // MOVE LEFT
            var moveAllLeft = function()
            {
              for (var i = 0; i < 4; i++)
              {
                for (var j = 0 ; j < 4; j++)
                {
                  if($("div[data-x="+i+"][data-y="+j+"]").hasClass("tile") && j != 0)
                  {
                    moveLeft(i, j);
                  }
                }
              }
            }

            // MOVE UP
            var moveAllUp = function()
            {
              for (var i = 0; i < 4; i++)
              {
                for (var j = 0 ; j < 4; j++)
                {
                  if($("div[data-x="+i+"][data-y="+j+"]").hasClass("tile") && i != 0)
                  {
                    moveUp(i, j);
                  }
                }
              }
            }

            // MOVE DOWN
            var moveAllDown = function()
            {
              for (var i = 3; i >= 0; i--)
              {
                for (var j = 3; j >= 0; j--)
                {
                  if($("div[data-x="+i+"][data-y="+j+"]").hasClass("tile") && i != 3)
                  {
                    moveDown(i, j);
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
                  $("div[data-x="+x+"][data-y="+y+"]").removeClass().addClass("square-container").text("");y++;
                  //si la case suivante est de même valeur alors on va les fusionner et ajouter leur valeures.
                  if($("div[data-x="+x+"][data-y="+yY+"]").hasClass("tile") && $("div[data-x="+x+"][data-y="+yY+"]").text() == value)
                  {
                    $("div[data-x="+x+"][data-y="+y+"]").addClass("tile").addClass("c"+value*2).html("<p class='nbFont'>"+value*2+"</p>");
                    defaults.flagTile = true;
                    return;
                  }
                  // sinon on se deplace simplement d'une case
                  else
                  {
                    //$("div[data-x="+x+"][data-y="+y+"]").animate({marginLeft: '100px'});
                    $("div[data-x="+x+"][data-y="+y+"]").addClass("tile").addClass("c"+value).html("<p class='nbFont'>"+value+"</p>");
                    defaults.flagTile = true;
                  }
                  moveRight(x,y);
                }
              }
            }

            // LEFT
            var moveLeft = function(x,y)
            {
              var yY = y-1;
              var value = $("div[data-x="+x+"][data-y="+y+"]").text();
              if(y > 0)
              {
                if($("div[data-x="+x+"][data-y="+yY+"]").hasClass("tile") && $("div[data-x="+x+"][data-y="+yY+"]").text() != value)
                {

                }
                else
                {
                  $("div[data-x="+x+"][data-y="+y+"]").removeClass().addClass("square-container").text("");y--;
                  if($("div[data-x="+x+"][data-y="+yY+"]").hasClass("tile") && $("div[data-x="+x+"][data-y="+yY+"]").text() == value)
                  {
                    $("div[data-x="+x+"][data-y="+y+"]").addClass("tile").addClass("c"+value*2).html("<p class='nbFont'>"+value*2+"</p>");
                    defaults.flagTile = true;
                    return;
                  }
                  else
                  {
                    $("div[data-x="+x+"][data-y="+y+"]").addClass("tile").addClass("c"+value).html("<p class='nbFont'>"+value+"</p>");
                    defaults.flagTile = true;
                  }

                  moveLeft(x,y);
                }
              }
            }

            // UP
            var moveUp = function(x,y)
            {
              var xX = x-1;
              var value = $("div[data-x="+x+"][data-y="+y+"]").text();
              if(x > 0)
              {
                if($("div[data-x="+xX+"][data-y="+y+"]").hasClass("tile") && $("div[data-x="+xX+"][data-y="+y+"]").text() != value)
                {

                }
                else
                {
                  $("div[data-x="+x+"][data-y="+y+"]").removeClass().addClass("square-container").text("");x--;
                  if($("div[data-x="+xX+"][data-y="+y+"]").hasClass("tile") && $("div[data-x="+xX+"][data-y="+y+"]").text() == value)
                  {
                    $("div[data-x="+x+"][data-y="+y+"]").addClass("tile").addClass("c"+value*2).html("<p class='nbFont'>"+value*2+"</p>");
                    defaults.flagTile = true;
                    return;
                  }
                  else
                  {
                    $("div[data-x="+x+"][data-y="+y+"]").addClass("tile").addClass("c"+value).html("<p class='nbFont'>"+value+"</p>");
                    defaults.flagTile = true;
                  }

                  moveUp(x,y);
                }
              }
            }

            //DOWN
            var moveDown = function(x,y)
            {
              var xX = x+1;
              var value = $("div[data-x="+x+"][data-y="+y+"]").text();
              if(x < 3)
              {
                if($("div[data-x="+xX+"][data-y="+y+"]").hasClass("tile") && $("div[data-x="+xX+"][data-y="+y+"]").text() != value)
                {

                }
                else
                {
                  $("div[data-x="+x+"][data-y="+y+"]").removeClass().addClass("square-container").text("");x++;
                  if($("div[data-x="+xX+"][data-y="+y+"]").hasClass("tile") && $("div[data-x="+xX+"][data-y="+y+"]").text() == value)
                  {
                    $("div[data-x="+x+"][data-y="+y+"]").addClass("tile").addClass("c"+value*2).html("<p class='nbFont'>"+value*2+"</p>");
                    defaults.flagTile = true;
                    return;
                  }
                  else
                  {
                    $("div[data-x="+x+"][data-y="+y+"]").addClass("tile").addClass("c"+value).html("<p class='nbFont'>"+value+"</p>");
                    defaults.flagTile = true;
                  }
                  moveDown(x,y);
                }
              }
            }

            $("#restart").keydown(function()
            {
                alert("restart");
                $("#board").remove();
                $(".tile").remove();
                $(".square-container").remove();
                createBoard();
                createTile(2);
            });

              $(document).keydown(function(e)
              {
                // ALLOWING KEYDOWN EVENT
                if(isGameOver() == false)
                {
                  if(defaults.status == true)
                  {
                    defaults.status = false;
                    $(".tile").hide();
                    $("#board").append('<div class="gameOver"></div>');
                    $(".gameOver").height(defaults.boardSize).width(defaults.boardSize);
                    $(".gameOver").html("<p>GAME OVER<br>LOOSER!!<br><button type='button' id='restart' class='btn btn-primary'>Restart</button></p>")
                    return false;
                  }
                }
                // TRIGGERING DIFFERENT EVENT DEPENDING OF WICH KEY YOU USE
                switch(e.which)
                {
                    case 37: moveAllLeft() //left
                    break;

                    case 38: moveAllUp() // up
                    break;

                    case 39: moveAllRight(); // right
                    break;

                    case 40: moveAllDown() // down
                    break;
                }
                if(defaults.flagTile == true)
                {
                  createTile(1);
                  defaults.flagTile = false;
                }
              });


            createBoard();
            createTile(2);
            }
    });
})(jQuery);
