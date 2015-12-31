var empty_objects = {};

var stooge = {
    "first_name": "James",
    "second_name": "Allen",
}

var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:02",
        city: "Los Angeles"
    }
}

var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
var a = {},
    b = {},
    c = {};
a = b = c = {};

if (typeof Object.beget !== 'function') {
    Object.create = function(o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    }
}

var another_stooge = Object.create(stooge);

var name;
for (name in another_stooge) {
    if (typeof another_stooge[name] !== 'functionn') {
        console.log(name + ':' + another_stooge[name]);
    }
};

var Mammal = function(name) {
    this.name = name;
};

Mammal.prototype.get_name = function() {
    return this.name;
};

Mammal.prototype.says = function() {
    return this.saying || '';
};

var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name();

var Cat = function(name) {
    this.name = name;
    this.saying = 'meow';
};

Cat.prototype = new Mammal();

Cat.prototype.purr = function(n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};

Cat.prototype.get_name = function() {
    return this.says() + ' ' + this.name + ' ' + this.says();
}

var myCat = new Cat('Henrietta');
var says = myCat.says();
var purr = myCat.purr(5);
var name = myCat.get_name();


// 伪类
// Function.method('inherits', function (Parent) {
//     this.prototype = new Parent();
//     return this;
// });

// var Cat = function (name) {
//     this.name = name;
//     this.saying = 'meow';
// }
// .inherits(Mammal)
// .method('purr', function (n) {
//     var i, s = '';
//     for (i = 0;i < n;i += 1) {
//         if (s) {
//             s += '-';
//         }
//         s += 'r';
//     }
//     return s;
// })
// .method('get_name', function () {
//     return this.says() + ' ' + this.name + ' ' + this.says();
// });

var myMammal = {
    name: 'Herb the Mammal',
    get_name: function() {
        return this.name;
    },
    says: function() {
        return this.saying || '';
    }
};

var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function(n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};
myCat.get_name = function() {
    return this.says + ' ' + this.name + ' ' + this.says;
}

var mammal = function(spec) {
    var that = {};

    that.get_name = function() {
        return spec.name;
    };

    that.says = function() {
        return spec.saying || '';
    };

    return that;
};

var myMammal = mammal({
    name: 'Herb'
});

var cat = function(spec) {
    spec.saying = spec.saying || 'meow';
    var that = mammal(spec);
    that.purr = function(n) {
        var i, s = '';
        for (i = 0; i < n; i += 1) {
            if (s) {
                s += '-';
            }
            s += 'r';
        }
        return s;
    };
    that.get_name = function () {
        return that.says() + ' ' + spec.name + ' ' + this.says();
    };
    return that;
};

var myCat = cat({name: 'Henrietta'});

// Object.method('superior', function (name) {
//     var that = this,
//         method = that[name];
//     return function () {
//         return method.apply(that, arguments);
//     };
// });

// var coolcat = function (spec) {
//     var that = cat(spec),
//         super_get_name = that.superior('get_name');
//     that.get_name = function (n) {
//         return 'like ' + super_get_name() + ' baby';
//     };
//     return that;
// };
// var myCoolCat = coolcat({name: 'Bix'});
// var name = myCoolCat.get_name();
