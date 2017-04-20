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
                      $('#board').append('<div class="square-container" data-x="'+j+'" data-y="'+i+'" ></div');
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
                  $("div[data-x="+x+"][data-y="+y+"]").addClass("tile").html("<p class='nbFont'>"+number+"</p>");
                  //.append("<div class='tile'></div>");
                  //$(".tile").height(size-4).width(size-4);
                }
            }

            createBoard();
            createTile(2);
        },

        moveRight : function()
        {
          $(".tile").each(function()
          {
            var x = $(this).attr("data-x"); // column
            var y = $(this).attr("data-y"); //row
            //alert("x: "+x+" y: "+y);

            if(y < 3)
            {
                y=y+1;
                $(this).removeClass("tile");
                $("div[data-x="+x+"][data-y="+y+"]").addClass("tile");
                $(this).moveRight();
            }
          })
        },

        moveLeft : function()
        {
          $(".tile").each(function()
          {
            var x = $(this).attr("data-x"); // column
            var y = $(this).attr("data-y"); //row
            //alert("x: "+x+" y: "+y);
            if(y > 0)
            {
              y--;
              $(this).removeClass("tile");
              $("div[data-x="+x+"][data-y="+y+"]").addClass("tile");
              $(this).moveLeft();
            }
          })
        },

        moveUp : function()
        {
          $(".tile").each(function()
          {
            var x = $(this).attr("data-x"); // column
            var y = $(this).attr("data-y"); //row
            //alert("x: "+x+" y: "+y);
            if(x > 0)
            {
              x--;
              $(this).removeClass("tile");
              $("div[data-x="+x+"][data-y="+y+"]").addClass("tile");
              $(this).moveUp();
            }
          })
        },

        moveDown : function()
        {
          $(".tile").each(function()
          {
            var x = $(this).attr("data-x"); // column
            var y = $(this).attr("data-y"); //row
            //alert("x: "+x+" y: "+y);
            if(x < 3)
            {
              x++;
              $(this).removeClass("tile");
              $("div[data-x="+x+"][data-y="+y+"]").addClass("tile");
              $(this).moveDown();
            }
          })
        }
    });
})(jQuery);
