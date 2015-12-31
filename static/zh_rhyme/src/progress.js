define(function(require, exports, module) {
    var $ = require('jquery');

    stObject = {
        "future": "future",
        "coming": "coming",
        "working": "working",
        "finished": "finished",
    }

    function Progress(container, cutoffValues, ifOnly, statusValues) {
        this.container = $(container);
        this.buttons = this.container.children();
        this.cutoffValues = cutoffValues;
        this.statusValues = statusValues;
        this.ifOnly = ifOnly || true;
    }

    module.exports = Progress;
    Progress.prototype.render = function() {
        this._init();
        // this.container.css('display');
        this.container.css('display');
    }

    Progress.prototype._init = function() {
        var cutoffValues = this.cutoffValues;
        var statusValues = this.statusValues || (new Array(cutoffValues.length));
        $(this.buttons).each(function(n) {
            var node = $(this);
            node.attr('p-cutoff', cutoffValues[n]);
            node.attr('p-status', statusValues[n] || stObject.future);
        })
    }

    Progress.prototype.getButton = function(index) {
        return this.buttons.eq(index);
    }

    Progress.prototype.destroy = function() {
        this.container.remove();
    }

    Progress.prototype.hidden = function() {
        this.container.css('display', 'none');
    }

    Progress.prototype.show = function() {
        this.container.css('display');
    }

    Progress.prototype.forward = function(index) {
        if (this.ifOnly) {
            $(this.buttons).each(function(n) {
                var node = $(this);
                node.attr('disabled', 'disabled');
            })                        
        }
        this.buttons.eq(index - 1).attr('p-status', stObject.finished);
        this.buttons.eq(index - 1).addClass('btn-finished');
        this.buttons.eq(index).removeAttr('disabled');
        this.buttons.eq(index).attr('p-status', stObject.working);
        this.buttons.eq(index).addClass('btn-working');
    }

    Progress.prototype.setStart = function(index) {
        this.buttons.eq(index).removeAttr('disabled');
        this.buttons.eq(index).attr('p-status', stObject.working);
        this.buttons.eq(index).addClass('btn-working');
    }

    Progress.prototype.setFinish = function(index) {
        if (ifOnly) {
            this.buttons.eq(index).attr('disabled', 'disabled');
        }
        this.buttons.eq(index).attr('p-status', stObject.finished);
        this.buttons.eq(index).addClass('btn-finished');
    }

    Progress.prototype.setDisabled = function(index) {
        this.buttons.eq(index).attr('disabled', 'disabled');
    }

    Progress.prototype.setFuture = function(index) {
        this.buttons.eq(index).attr('p-status', stObject.future);
        this.buttons.eq(index).addClass('btn-future');
    }

    Progress.prototype.autoSetByValue = function(status) {
        if (ifOnly) {
            $(this.buttons).each(function(n) {
                var node = $(this);
                node.attr('disabled', 'disabled');

            })                   
        } else {
            console.log(13);
        }
    }

    Progress.prototype.autoSetByObject = function(status) {
        if (ifOnly) {
            console.log("todo");
        }
    }
})
