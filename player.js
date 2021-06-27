
  var player = {
    score: 0,
    guessed: 0,
    reset: function () {
      this.score = 0;
      this.guessed =0;
      updateDisplayedResult(this.score);
    },
    correct: function () {
      this.score += 20;
      updateDisplayedResult(this.score);
    },
    wrong: function () {
      this.score -= 5;
      updateDisplayedResult(this.score);
    },
  };