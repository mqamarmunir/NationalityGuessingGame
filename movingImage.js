var movingImage = {
  elementId: "drop-image",
  top: 0,
  continueMoving: true,
  image: "",
  beforeDragOffset: null,
  afterDragOffset: null,
  moveTo: function (nationality) {
    switch (nationality) {
      case "chinese":
        this.moveToChinese();
        break;
      case "thai":
        this.moveToThai();
        break;
      case "korean":
        this.moveToKorean();
        break;
      case "japanese":
        this.moveToJapanese();
        break;
    }
  },
  nationality: function () {
    return this.image.split("-")[1];
  },
  moveDownwards: async function (maxHeight) {
    if (!this.continueMoving) this.continueMoving = true;
    while (this.continueMoving) {
      this.top++;
      if (this.top >= maxHeight - 200) {
        $("#" + this.elementId).hide("slow");
        this.continueMoving = false;
        setTimeout(
          function (movingImage) {
            movingImage.reset();
            movingImage.next();
          },
          1000,
          this
        );
        break;
      }

      $("#" + this.elementId).css("top", this.top);
      await sleep(3000 / (maxHeight - 200));
    }
  },
  reset: function () {
    this.top = 0;
    this.continueMoving = false;
    $("#" + this.elementId).offset({
      left: $("#picture-start").offset().left,
      top: 0,
    });
  },
  moveToChinese: function () {
    var left = $("#top-right").offset().left - $("#top-left").offset().left;
    $("#" + this.elementId).animate(
      {
        left: -left / 2,
        top: 0,
      },
      500
    );
    $("#" + this.elementId).hide("slow");
    // // setTimeout(function(){
    // //     $("#" + this.elementId).hide();
    // // }, 500);
  },
  moveToThai: function () {
    var left = $("#top-right").offset().left - $("#top-left").offset().left;
    $("#" + this.elementId).animate(
      {
        left: left / 2,
        top: 0,
      },
      500
    );
    $("#" + this.elementId).hide("slow");
  },
  moveToJapanese: function () {
    var top = $("#bottom-right").offset().top;
    var left = $("#top-right").offset().left - $("#top-left").offset().left;
    $("#" + this.elementId).animate(
      {
        left: left / 2,
        top: top,
      },
      500
    );
    $("#" + this.elementId).hide("slow");
  },
  moveToKorean: function () {
    var top = $("#bottom-right").offset().top;
    var left = $("#top-right").offset().left - $("#top-left").offset().left;

    $("#" + this.elementId).animate(
      {
        left: -left / 2,
        top: top,
      },
      500
    );
    $("#" + this.elementId).hide("slow");
  },
  next: function () {
    const randomElement =
      imageNames[Math.floor(Math.random() * imageNames.length)];
      
    $("#" + this.elementId).show("slow");
    $("#" + this.elementId).attr("src", "images\\" + randomElement + ".jpg");
    movingImage.image = randomElement;
    player.guessed++;
    this.moveDownwards(getPageHeight());
  },
};
