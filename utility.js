var sleep = function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  var updateDisplayedResult = function (result) {
    $("#result").text(result.toString());
  };
  var pannedCorrectly = function (beforeOffset, afterOffset) {
    return (
      afterOffset.left - beforeOffset.left > 20 ||
      afterOffset.top - beforeOffset.top > 20 ||
      afterOffset.left - beforeOffset.left < -20 ||
      afterOffset.top - beforeOffset.top < -20
    );
  };
  
  var computeGuessedNationality = function (beforeDragOffset, afterDragOffset) {
    var isTop = afterDragOffset.top - beforeDragOffset.top < 0;
    var isRight = afterDragOffset.left - beforeDragOffset.left > 0;
    if (isTop && isRight) {
      return "Thai";
    } else if (isTop && !isRight) {
      return "Chinese";
    } else if (!isTop && isRight) {
      return "Japanese";
    } else if (!isTop && !isRight) {
      return "Korean";
    }
  };

  var getPageHeight = function(){
    var $image = $("#drop-image");
    var bodyHeight = $("main").height();
    var footerOffsetTop = $image.offset().top;
    return bodyHeight - footerOffsetTop;
  }