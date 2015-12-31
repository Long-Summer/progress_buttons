define(function(require) {
    var $ = require("jquery");

    var WordSpace = require('./wordSpace');
    var Progress = require('./progress');
    // $("#word_space");
    var wordSpace = new WordSpace("#word_space");
    var v = [1, 2, 3, 4, 5, 6, 7];
    var progress = new Progress("#progress", v);
    wordSpace.render();
    progress.render();
    // progress.destroy();
    console.log(progress.getButton(1));
});
