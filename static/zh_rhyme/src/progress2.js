stObject = {
    "future": "future",
    "coming": "coming",
    "working": "working",
    "finished": "finished",
}

// to do
/*
 *  two operations: start finish
 *  four status(editable): finished, coming, working, future
 *
 */

function Progress(container, cutoffValues, statusValues) {
    this.container = $(container);
    this.buttons = this.container.find('button');
    if (this.buttons.length <= 2) {
        console.log("ERROR");
        return false;
    }
    this.cutoffValues = cutoffValues;
    this.statusValues = statusValues;
    var textStrictMode = this.container.attr('data-strictMode');
    if (textStrictMode && (textStrictMode == "true")) {
        this.strictMode = true;
    } else {
        this.strictMode = false;
    }
}

Progress.prototype.render = function() {
    this._init();
    this.show();
}

Progress.prototype._init = function() {
    var p = this;
    var cutoffValues = this.cutoffValues;
    var statusValues = this.statusValues || (new Array(cutoffValues.length));
    $(this.buttons).each(function(n) {
        var node = $(this);
        p.setCutoff(n, cutoffValues[n]);
        p.setCutoff(n, statusValues[n] || stObject.future);
    })
    if (this.strictMode) {
        $(this.buttons).each(function(n) {
            var node = $(this);
            node.attr('disabled', 'disabled');
            p.setFuture(n);
        })
    }
    this.getButton(0).removeAttr('disabled');
    this.setComing(0);
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

Progress.prototype.startIndex = function(index) {
    var node = this.getButton(index);
    if (this.ifEditable(index)) {
        this.disabledAll(index);
        node.attr('disabled', 'disabled');
        this.setWorking(index);
        return true;
    } else {
        console.log("请检查前一步是否已经完工");
        return false;
    }
}

Progress.prototype.finishIndex = function(index) {
    var node = this.getButton(index);
    var nextNode = node.next('button');
    if (this.ifEditable(index)) {
        this.setStatus(index, stObject.finished);
        this.updateButtonClass(index, "finished");
        if (this.strictMode) {
            this.setComing(index + 1);
            this.getButton(index).attr('disabled', 'disabled');
        }
        return true;
    } else {
        console.log("请检查前一步是否已经完工");
        return false;
    }
}

Progress.prototype.ifEditable = function(index) {
    var node = this.getButton(index);
    var prevNode = node.prev('button');
    var nextNode = node.next('button');
    switch (true) {
        case (!this.strictMode):
            return true;
        case (this.getStatus(i) == "finished" || this.getStatus(i) == "future"):
            return false;
        case (1 == 1):
            for (var i = 0; i < index; i++) {
                if (this.getStatus(i) != 'finished') {
                    return false;
                }
            }
            for (var i = index + 1; i < this.buttons.length; i++) {
                if (this.getStatus(i) != 'future') {
                    return false;
                }
            }
            return true;
    }
}

Progress.prototype.enable = function(index) {
    this.getButton(index).removeAttr('disabled');
}

Progress.prototype.disable = function(index) {
    this.getButton(index).attr('disabled', 'disabled');
}

Progress.prototype.enabledAll = function() {
    $(this.buttons).each(function(n) {
        var node = $(this);
        node.removeAttr('disabled');
    })
}

Progress.prototype.disabledAll = function(strictMode) {
    if (strictMode == false) {
        return false;
    } else {
        $(this.buttons).each(function(n) {
            var node = $(this);
            node.attr('disabled', 'disabled');
        })
        return true;
    }
}

Progress.prototype.getCutoff = function(index) {
    if (index < 0 || index >= this.buttons.length) {
        console.log("ERROR");
        return undefined;
    } else {
        return this.getButton(index).attr('p-cutoff');
    }
}

Progress.prototype.setCutoff = function(index, p_cutoff) {
    if (index < 0 || index >= this.buttons.length) {
        console.log("ERROR");
        return undefined;
    } else {
        this.getButton(index).attr('p-cutoff', p_cutoff);
    }
}

Progress.prototype.getStatus = function(index) {
    if (index < 0 || index >= this.buttons.length) {
        console.log("ERROR");
        return undefined;
    } else {
        return this.getButton(index).attr('p-status');
    }
}

Progress.prototype.setStatus = function(index, p_status) {
    if (index < 0 || index >= this.buttons.length) {
        console.log("ERROR");
        return undefined;
    } else {
        this.getButton(index).attr('p-status', p_status);
    }
}

Progress.prototype.setWorking = function(index) {
    var node = this.getButton(index);
    node.attr('p-status', stObject.working);
    this.updateButtonClass(index, stObject.working);
}

Progress.prototype.setFuture = function(index) {
    var node = this.getButton(index);
    node.attr('p-status', stObject.future);
    this.updateButtonClass(index, stObject.future);
}

Progress.prototype.setFinished = function(index) {
    var node = this.getButton(index);
    node.attr('p-status', stObject.finished);
    this.updateButtonClass(index, stObject.finished);
}

Progress.prototype.setComing = function(index) {
    var node = this.getButton(index);
    node.attr('p-status', stObject.coming);
    this.updateButtonClass(index, stObject.coming);
}

Progress.prototype.autoSetByValue = function(status) {
    var p = this;
    // 下面将所有按钮不可用
    // 在接下来的循环中将应该可用的按钮可用
    // 这样保证严格模式和非严格模式不冲突
    if (this.strictMode) {
        this.disabledAll();
    }
    $(this.buttons).each(function(n) {
        var node = $(this);
        var prevNodeCutoff = p.getCutoff(n - 1);
        var nodeCutoff = p.getCutoff(n);
        var nextNodeCutoff = p.getCutoff(n + 1);
        switch (true) {
            case (nodeCutoff < status):
                p.setFinished(n);
                break;
            case (nodeCutoff == status):
                p.setComing(n);
                p.enable(n);
                break;
            case (((prevNodeCutoff != undefined && prevNodeCutoff == status) || prevNodeCutoff == undefined) && (status < nodeCutoff)):
                p.setWorking(n);
                p.enable(n);
                break;
            case (nodeCutoff > status):
                p.setFuture(n);
                break;
            default:
                console.log("Please E-mail me at quantus@live.cn and thank you!")
                break;
        }
    })
}

Progress.prototype.getButtons = function() {
    return this.buttons;
}

Progress.prototype.updateButtonClass = function(index, statusName) {
    for (var val in stObject) {
        this.getButton(index).removeClass('btn-' + stObject[val]);
    }
    if (statusName) {
        this.getButton(index).addClass('btn-' + stObject[statusName]);
    }
}

// //
// Progress.prototype.autoSetByObject = function(status) {
//     if (this.strictMode) {
//         console.log("todo");
//     }
// }


var v = [10, 20, 30, 40, 50, 60, 70];
var progress = new Progress("#progress", v);

progress.render();
