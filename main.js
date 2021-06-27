(function ($) {
  $(document).ready(function () {
    var modal = document.getElementById("myModal");
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
      modal.style.display = "none";
    };

    var $image = $("#" + movingImage.elementId);
    $image.hide('slow');
    setTimeout(function () {
      movingImage.next();
      $image.show('slow');
    }, 2000);

    $image.on("mouseup", function () {
      if (drag.state) {
        drag.state = false;
      }
      movingImage.afterDragOffset = $image.offset();

      if (
        pannedCorrectly(
          movingImage.beforeDragOffset,
          movingImage.afterDragOffset
        )
      ) {
        var guessedNationality = computeGuessedNationality(
          movingImage.beforeDragOffset,
          movingImage.afterDragOffset
        );
        guessedNationality.toLowerCase() ==
        movingImage.nationality().toLowerCase()
          ? player.correct()
          : player.wrong();
        movingImage.moveTo(guessedNationality.toLowerCase());
        setTimeout(function () {
          movingImage.reset();
          if (player.guessed >= 10) {
            $('#modal-result').text(player.score);
            modal.style.display = "block";
          } else {
            movingImage.next();
          }
        }, 1000);
      } else {
        movingImage.moveDownwards(getPageHeight());
      }
    });

    $image.mousedown(function (e) {
      if (!drag.state && e.which == 1) {
        drag.elem = $image;
        drag.x = e.pageX;
        drag.y = e.pageY;
        drag.state = true;
        movingImage.continueMoving = false;
        movingImage.beforeDragOffset = $image.offset();
      }
      return false;
    });

    $image.mousemove(function (e) {
      if (drag.state) {
        delta.x = e.pageX - drag.x;
        delta.y = e.pageY - drag.y;

        var cur_offset = $(drag.elem).offset();

        $(drag.elem).offset({
          left: cur_offset.left + delta.x,
          top: cur_offset.top + delta.y,
        });

        drag.x = e.pageX;
        drag.y = e.pageY;
      }
    });

    $image.on("contextmenu", function () {
      return false;
    });
    $('#play-again').click(function(){
        modal.style.display = 'none';
        player.reset();
        movingImage.next();
    })
  });
})(jQuery);
