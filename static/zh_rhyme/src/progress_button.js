var backgroud_colors = {
    "finished": "btn-success",
    "to-be-started": "btn-info",
    "on-work": "btn-primary",
    "future": "btn-danger",
}

var backgroud_colors_simple = {
    "finished": "btn-success",
    "to-be-started": "btn-info",
    "future": "btn-danger",    
}


function ProgressButton(statusValueIn, backgroudDescriptionIn) {
    var statusValue = statusValueIn;
    var backgroudDescription = backgroudDescriptionIn;
    this.getStatusValue = function(){
        return statusValue;
    };
    
    this.setStatusValue = function(val){
        statusValue = val;
    };

    this.getBackgroudDescription = function(){
        return backgroudDescription;
    };
   
    this.setBackgroudDescription = function(val){
        for (var s in backgroud_colors) {
            if (s == val) {
                backgroudDescription = val;
                return;        
            }
        }
        console.log("请检查进度");
        return;
    };
}

// ProgressButton.prototype.setValue = function(statusValue) {
//     console.log(this);
// }


var CoworkButton = {
    createNew: function() {
        var coworkButton = {};
        coworkButton.progress = 1;
    }
}

var ComplexButton = {

}

function extend(Child, Parent) {　　　　
    var p = Parent.prototype;　　　　
    var c = Child.prototype;　　　　
    for (var i in p) {　　　　　　
        c[i] = p[i];　　　　　　
    }　　　　
    c.uber = p;　　
}

function extend2(a,b) {
    for ( var i in b ) {
        var g = b.__lookupGetter__(i), s = b.__lookupSetter__(i);
       
        if ( g || s ) {
            if ( g )
                a.__defineGetter__(i, g);
            if ( s )
                a.__defineSetter__(i, s);
         } else
             a[i] = b[i];
    }
    return a;
}

var ProgressButtonList = {
    createNew: function() {
        var progress_button_list = {};
        progress_button_list.first = "danger";
        progress_button_list.second = "danger";
        progress_button_list.third = "danger";
        progress_button_list.fourth = "danger";
        progress_button_list.fifth = "danger";
        progress_button_list.sixth = "danger";
        progress_button_list.seventh = "danger";
        progress_button_list.changeClickability = function(status) {
            var buttons = $("#new_buttons [data-step]");
            for (var i = 0; i < buttons.length; i++) {
                var button = buttons.eq(i);
                var button_progress_status = parseInt(button.attr('data-progress-status'));
                switch (true) {
                    case (status < button_progress_status):
                        button.attr('disabled', 'disabled');
                        this[button.attr("data-step")] = "danger";
                        change_color(button, "future");
                        break;
                    case (status == button_progress_status):
                        button.removeAttr('disabled');
                        this[button.attr("data-step")] = "info";
                        change_color(button, "to-be-started");
                        break;
                    case (button_progress_status < status) && (status < (button_progress_status + 10)):
                        button.removeAttr('disabled');
                        this[button.attr("data-step")] = "primary";
                        change_color(button, "on-work");
                        break;
                    case (status >= (button_progress_status + 10)):
                        button.removeAttr('disabled');
                        this[button.attr("data-step")] = "success";
                        change_color(button, "finished");
                        break;
                    default:
                        console.log("sorry, please ask Wangxu whose E-mail address is xuwang203732@sohu-inc.com for help");
                        break;
                }
            };
        };
        progress_button_list.changeClickability(0);
        return progress_button_list;
    },
}

var ShutDownProgressButtonList = {
        createNew: function() {
            var shutdown_progress_button_list = {};
            shutdown_progress_button_list.first = "danger";
            shutdown_progress_button_list.second = "danger";
            shutdown_progress_button_list.third = "danger";
            shutdown_progress_button_list.fourth = "danger";
            shutdown_progress_button_list.fifth = "danger";
            shutdown_progress_button_list.changeClickability = function(status) {
                var buttons = $("#shutdown_buttons [data-step]");
                for (var i = 0; i < buttons.length; i++) {
                    var button = buttons.eq(i);
                    var button_progress_status = parseInt(button.attr('data-progress-status'));
                    switch (true) {
                        case (status < button_progress_status):
                            button.attr('disabled', 'disabled');
                            this[button.attr("data-step")] = "danger";
                            change_color(button, "future");
                            break;
                        case (status == button_progress_status):
                            button.removeAttr('disabled');
                            this[button.attr("data-step")] = "info";
                            change_color(button, "to-be-started");
                            break;
                        case (button_progress_status < status) && (status < (button_progress_status + 10)):
                            button.removeAttr('disabled');
                            this[button.attr("data-step")] = "primary";
                            change_color(button, "on-work");
                            break;
                        case (status >= (button_progress_status + 10)):
                            button.removeAttr('disabled');
                            this[button.attr("data-step")] = "success";
                            change_color(button, "finished");
                            break;
                        default:
                            console.log("sorry, please ask Wangxu whose E-mail address is xuwang203732@sohu-inc.com for help");
                            break;
                    }
                };
            };
            shutdown_progress_button_list.changeClickability(100);
            return shutdown_progress_button_list;
        },
    }
    // // status - button_progress_status
    // var delta_status_description = {
    //     ""
    // }



function change_color(button, button_status_description) {
    $.each(backgroud_colors, function(status_description, color_description) {
        if (button_status_description == status_description) {
            button.addClass(color_description);
        } else {
            button.removeClass(color_description);
        }
    });
}
