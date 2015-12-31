define(function(require, exports, module) {

    var $ = require('jquery');
    var pinyin = require('../packages/pinyin.js');
    function WordSpace(container) {
        this.container = $(container);
        this.word_input = this.container.find('[name="word_input"]')
        this.word_pinyin = this.container.find('[name="word_pinyin"]')
        this.word_output = this.container.find('[name="word_output"]')
    }

    module.exports = WordSpace;

    WordSpace.prototype.render = function() {
        var wordSpace = this;
        this.word_input.keydown(function() {
            var word_input_value = $(this).val();
                wordSpace.word_pinyin.val(pinyin.getFullChars(word_input_value));
        });
    }

    WordSpace.prototype._init = function() {
        var spinnings = this.spinnings;

        $(this.icons).each(function(n) {
            var startDeg = random(360);
            var node = $(this);
            var timer;

            node.css({
                top: random(40),
                left: n * 50 + random(10),
                zIndex: 1000
            }).hover(
                function() {
                    node.fadeTo(250, 1)
                        .css('zIndex', 1001)
                        .css('transform', 'rotate(0deg)');

                },
                function() {
                    node.fadeTo(250, .6).css('zIndex', 1000);
                    timer && clearTimeout(timer);
                    timer = setTimeout(spin, Math.ceil(random(10000)));
                }
            );

            function spin() {
                node.css('transform', 'rotate(' + startDeg + 'deg)');
            }

            spinnings[n] = spin;
        })

        return this;
    }

    // Spinning.prototype._spin = function() {

    //     $(this.spinnings).each(function(i, fn) {
    //         setTimeout(fn, Math.ceil(random(3000)));
    //     });

    //     return this;
    // }
});
