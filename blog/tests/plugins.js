!
function() {
    "use strict";
    var r = function(t) {
        var e = t,
        n = function() {
            return e
        };
        return {
            get: n,
            set: function(t) {
                e = t
            },
            clone: function() {
                return r(n())
            }
        }
    },
    t = tinymce.util.Tools.resolve("tinymce.PluginManager"),
    $ = tinymce.util.Tools.resolve("tinymce.util.Tools");
    function n(t, e) {
        return i(document.createElement("canvas"), t, e)
    }
    function o(t) {
        return t.getContext("2d")
    }
    function i(t, e, n) {
        return t.width = e,
        t.height = n,
        t
    }
    var a, u, c, l, h = {
        create: n,
        clone: function(t) {
            var e;
            return o(e = n(t.width, t.height)).drawImage(t, 0, 0),
            e
        },
        resize: i,
        get2dContext: o,
        get3dContext: function(t) {
            var e = null;
            try {
                e = t.getContext("webgl") || t.getContext("experimental-webgl")
            } catch(n) {}
            return e || (e = null),
            e
        }
    },
    p = {
        getWidth: function(t) {
            return t.naturalWidth || t.width
        },
        getHeight: function(t) {
            return t.naturalHeight || t.height
        }
    },
    g = window.Promise ? window.Promise: function() {
        var t = function(t) {
            if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
            if ("function" != typeof t) throw new TypeError("not a function");
            this._state = null,
            this._value = null,
            this._deferreds = [],
            l(t, r(o, this), r(a, this))
        },
        e = t.immediateFn || "function" == typeof setImmediate && setImmediate ||
        function(t) {
            setTimeout(t, 1)
        };
        function r(t, e) {
            return function() {
                t.apply(e, arguments)
            }
        }
        var n = Array.isArray ||
        function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        };
        function i(r) {
            var o = this;
            null !== this._state ? e(function() {
                var t = o._state ? r.onFulfilled: r.onRejected;
                if (null !== t) {
                    var e;
                    try {
                        e = t(o._value)
                    } catch(n) {
                        return void r.reject(n)
                    }
                    r.resolve(e)
                } else(o._state ? r.resolve: r.reject)(o._value)
            }) : this._deferreds.push(r)
        }
        function o(t) {
            try {
                if (t === this) throw new TypeError("A promise cannot be resolved with itself.");
                if (t && ("object" == typeof t || "function" == typeof t)) {
                    var e = t.then;
                    if ("function" == typeof e) return void l(r(e, t), r(o, this), r(a, this))
                }
                this._state = !0,
                this._value = t,
                u.call(this)
            } catch(n) {
                a.call(this, n)
            }
        }
        function a(t) {
            this._state = !1,
            this._value = t,
            u.call(this)
        }
        function u() {
            for (var t = 0,
            e = this._deferreds.length; t < e; t++) i.call(this, this._deferreds[t]);
            this._deferreds = null
        }
        function c(t, e, n, r) {
            this.onFulfilled = "function" == typeof t ? t: null,
            this.onRejected = "function" == typeof e ? e: null,
            this.resolve = n,
            this.reject = r
        }
        function l(t, e, n) {
            var r = !1;
            try {
                t(function(t) {
                    r || (r = !0, e(t))
                },
                function(t) {
                    r || (r = !0, n(t))
                })
            } catch(o) {
                if (r) return;
                r = !0,
                n(o)
            }
        }
        return t.prototype["catch"] = function(t) {
            return this.then(null, t)
        },
        t.prototype.then = function(n, r) {
            var o = this;
            return new t(function(t, e) {
                i.call(o, new c(n, r, t, e))
            })
        },
        t.all = function() {
            var c = Array.prototype.slice.call(1 === arguments.length && n(arguments[0]) ? arguments[0] : arguments);
            return new t(function(o, i) {
                if (0 === c.length) return o([]);
                var a = c.length;
                function u(e, t) {
                    try {
                        if (t && ("object" == typeof t || "function" == typeof t)) {
                            var n = t.then;
                            if ("function" == typeof n) return void n.call(t,
                            function(t) {
                                u(e, t)
                            },
                            i)
                        }
                        c[e] = t,
                        0 == --a && o(c)
                    } catch(r) {
                        i(r)
                    }
                }
                for (var t = 0; t < c.length; t++) u(t, c[t])
            })
        },
        t.resolve = function(e) {
            return e && "object" == typeof e && e.constructor === t ? e: new t(function(t) {
                t(e)
            })
        },
        t.reject = function(n) {
            return new t(function(t, e) {
                e(n)
            })
        },
        t.race = function(o) {
            return new t(function(t, e) {
                for (var n = 0,
                r = o.length; n < r; n++) o[n].then(t, e)
            })
        },
        t
    } (),
    s = function(t) {
        return function() {
            return t
        }
    },
    f = function(i) {
        for (var t = [], e = 1; e < arguments.length; e++) t[e - 1] = arguments[e];
        for (var a = new Array(arguments.length - 1), n = 1; n < arguments.length; n++) a[n - 1] = arguments[n];
        return function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
            var o = a.concat(n);
            return i.apply(null, o)
        }
    },
    d = s(!1),
    m = s(!0),
    y = d,
    v = m,
    b = function() {
        return w
    },
    w = (l = {
        fold: function(t, e) {
            return t()
        },
        is: y,
        isSome: y,
        isNone: v,
        getOr: c = function(t) {
            return t
        },
        getOrThunk: u = function(t) {
            return t()
        },
        getOrDie: function(t) {
            throw new Error(t || "error: getOrDie called on none.")
        },
        getOrNull: function() {
            return null
        },
        getOrUndefined: function() {
            return undefined
        },
        or: c,
        orThunk: u,
        map: b,
        ap: b,
        each: function() {},
        bind: b,
        flatten: b,
        exists: y,
        forall: v,
        filter: b,
        equals: a = function(t) {
            return t.isNone()
        },
        equals_: a,
        toArray: function() {
            return []
        },
        toString: s("none()")
    },
    Object.freeze && Object.freeze(l), l),
    x = function(n) {
        var t = function() {
            return n
        },
        e = function() {
            return o
        },
        r = function(t) {
            return t(n)
        },
        o = {
            fold: function(t, e) {
                return e(n)
            },
            is: function(t) {
                return n === t
            },
            isSome: v,
            isNone: y,
            getOr: t,
            getOrThunk: t,
            getOrDie: t,
            getOrNull: t,
            getOrUndefined: t,
            or: e,
            orThunk: e,
            map: function(t) {
                return x(t(n))
            },
            ap: function(t) {
                return t.fold(b,
                function(t) {
                    return x(t(n))
                })
            },
            each: function(t) {
                t(n)
            },
            bind: r,
            flatten: t,
            exists: r,
            forall: r,
            filter: function(t) {
                return t(n) ? o: w
            },
            equals: function(t) {
                return t.is(n)
            },
            equals_: function(t, e) {
                return t.fold(y,
                function(t) {
                    return e(n, t)
                })
            },
            toArray: function() {
                return [n]
            },
            toString: function() {
                return "some(" + n + ")"
            }
        };
        return o
    },
    I = {
        some: x,
        none: b,
        from: function(t) {
            return null === t || t === undefined ? w: x(t)
        }
    },
    T = "undefined" != typeof window ? window: Function("return this;")(),
    R = function(t, e) {
        return function(t, e) {
            for (var n = e !== undefined && null !== e ? e: T, r = 0; r < t.length && n !== undefined && null !== n; ++r) n = n[t[r]];
            return n
        } (t.split("."), e)
    },
    S = {
        getOrDie: function(t, e) {
            var n = R(t, e);
            if (n === undefined || null === n) throw t + " not available on this browser";
            return n
        }
    };
    function O() {
        return new(S.getOrDie("FileReader"))
    }
    var F = {
        atob: function(t) {
            return S.getOrDie("atob")(t)
        },
        requestAnimationFrame: function(t) {
            S.getOrDie("requestAnimationFrame")(t)
        }
    };
    function C(u) {
        return new g(function(t, e) {
            var n = URL.createObjectURL(u),
            r = new Image,
            o = function() {
                r.removeEventListener("load", i),
                r.removeEventListener("error", a)
            };
            function i() {
                o(),
                t(r)
            }
            function a() {
                o(),
                e("Unable to load data of type " + u.type + ": " + n)
            }
            r.addEventListener("load", i),
            r.addEventListener("error", a),
            r.src = n,
            r.complete && i()
        })
    }
    function E(r) {
        return new g(function(t, n) {
            var e = new XMLHttpRequest;
            e.open("GET", r, !0),
            e.responseType = "blob",
            e.onload = function() {
                200 == this.status && t(this.response)
            },
            e.onerror = function() {
                var t, e = this;
                n(0 === this.status ? ((t = new Error("No access to download image")).code = 18, t.name = "SecurityError", t) : new Error("Error " + e.status + " downloading image"))
            },
            e.send()
        })
    }
    function D(t) {
        var e = t.split(","),
        n = /data:([^;]+)/.exec(e[0]);
        if (!n) return I.none();
        for (var r, o, i, a = n[1], u = e[1], c = F.atob(u), l = c.length, s = Math.ceil(l / 1024), f = new Array(s), d = 0; d < s; ++d) {
            for (var h = 1024 * d,
            p = Math.min(h + 1024, l), g = new Array(p - h), m = h, y = 0; m < p; ++y, ++m) g[y] = c[m].charCodeAt(0);
            f[d] = (r = g, new(S.getOrDie("Uint8Array"))(r))
        }
        return I.some((o = f, i = {
            type: a
        },
        new(S.getOrDie("Blob"))(o, i)))
    }
    function A(n) {
        return new g(function(t, e) {
            D(n).fold(function() {
                e("uri is not base64: " + n)
            },
            t)
        })
    }
    function _(n) {
        return new g(function(t) {
            var e = new O;
            e.onloadend = function() {
                t(e.result)
            },
            e.readAsDataURL(n)
        })
    }
    var k = {
        blobToImage: C,
        imageToBlob: function(t) {
            var e = t.src;
            return 0 === e.indexOf("data:") ? A(e) : E(e)
        },
        blobToArrayBuffer: function(n) {
            return new g(function(t) {
                var e = new O;
                e.onloadend = function() {
                    t(e.result)
                },
                e.readAsArrayBuffer(n)
            })
        },
        blobToDataUri: _,
        blobToBase64: function(t) {
            return _(t).then(function(t) {
                return t.split(",")[1]
            })
        },
        dataUriToBlobSync: D,
        canvasToBlob: function(t, n, r) {
            return n = n || "image/png",
            HTMLCanvasElement.prototype.toBlob ? new g(function(e) {
                t.toBlob(function(t) {
                    e(t)
                },
                n, r)
            }) : A(t.toDataURL(n, r))
        },
        canvasToDataURL: function(t, e, n) {
            return e = e || "image/png",
            t.then(function(t) {
                return t.toDataURL(e, n)
            })
        },
        blobToCanvas: function(t) {
            return C(t).then(function(t) {
                var e, n;
                return e = t,
                URL.revokeObjectURL(e.src),
                n = h.create(p.getWidth(t), p.getHeight(t)),
                h.get2dContext(n).drawImage(t, 0, 0),
                n
            })
        },
        uriToBlob: function(t) {
            return 0 === t.indexOf("blob:") ? E(t) : 0 === t.indexOf("data:") ? A(t) : null
        }
    },
    L = function(t) {
        return k.blobToImage(t)
    },
    P = function(t) {
        return k.imageToBlob(t)
    };
    function B(t, e, n) {
        var r = e.type;
        function o(e, n) {
            return t.then(function(t) {
                return k.canvasToDataURL(t, e, n)
            })
        }
        return {
            getType: s(r),
            toBlob: function() {
                return g.resolve(e)
            },
            toDataURL: function() {
                return n
            },
            toBase64: function() {
                return n.split(",")[1]
            },
            toAdjustedBlob: function(e, n) {
                return t.then(function(t) {
                    return k.canvasToBlob(t, e, n)
                })
            },
            toAdjustedDataURL: o,
            toAdjustedBase64: function(t, e) {
                return o(t, e).then(function(t) {
                    return t.split(",")[1]
                })
            },
            toCanvas: function() {
                return t.then(h.clone)
            }
        }
    }
    function H(e) {
        return k.blobToDataUri(e).then(function(t) {
            return B(k.blobToCanvas(e), e, t)
        })
    }
    var M = {
        fromBlob: H,
        fromCanvas: function(e, t) {
            return k.canvasToBlob(e, t).then(function(t) {
                return B(g.resolve(e), t, e.toDataURL())
            })
        },
        fromImage: function(t) {
            return k.imageToBlob(t).then(function(t) {
                return H(t)
            })
        },
        fromBlobAndUrlSync: function(t, e) {
            return B(k.blobToCanvas(t), t, e)
        }
    };
    function N(t, e, n) {
        return n < (t = parseFloat(t)) ? t = n: t < e && (t = e),
        t
    }
    var U = [0, .01, .02, .04, .05, .06, .07, .08, .1, .11, .12, .14, .15, .16, .17, .18, .2, .21, .22, .24, .25, .27, .28, .3, .32, .34, .36, .38, .4, .42, .44, .46, .48, .5, .53, .56, .59, .62, .65, .68, .71, .74, .77, .8, .83, .86, .89, .92, .95, .98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10];
    function j(t, e) {
        var n, r, o, i, a = [],
        u = new Array(10);
        for (n = 0; n < 5; n++) {
            for (r = 0; r < 5; r++) a[r] = e[r + 5 * n];
            for (r = 0; r < 5; r++) {
                for (o = i = 0; o < 5; o++) i += t[r + 5 * o] * a[o];
                u[r + 5 * n] = i
            }
        }
        return u
    }
    function G(t, n) {
        return n = N(n, 0, 1),
        t.map(function(t, e) {
            return e % 6 == 0 ? t = 1 - (1 - t) * n: t *= n,
            N(t, 0, 1)
        })
    }
    var z = {
        identity: function() {
            return [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]
        },
        adjust: G,
        multiply: j,
        adjustContrast: function(t, e) {
            var n;
            return e = N(e, -1, 1),
            j(t, [(n = (e *= 100) < 0 ? 127 + e / 100 * 127 : 127 * (n = 0 == (n = e % 1) ? U[e] : U[Math.floor(e)] * (1 - n) + U[Math.floor(e) + 1] * n) + 127) / 127, 0, 0, 0, .5 * (127 - n), 0, n / 127, 0, 0, .5 * (127 - n), 0, 0, n / 127, 0, .5 * (127 - n), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
        },
        adjustBrightness: function(t, e) {
            return j(t, [1, 0, 0, 0, e = N(255 * e, -255, 255), 0, 1, 0, 0, e, 0, 0, 1, 0, e, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
        },
        adjustSaturation: function(t, e) {
            var n;
            return j(t, [.3086 * (1 - (n = 1 + (0 < (e = N(e, -1, 1)) ? 3 * e: e))) + n, .6094 * (1 - n), .082 * (1 - n), 0, 0, .3086 * (1 - n), .6094 * (1 - n) + n, .082 * (1 - n), 0, 0, .3086 * (1 - n), .6094 * (1 - n), .082 * (1 - n) + n, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
        },
        adjustHue: function(t, e) {
            var n, r, o, i, a;
            return e = N(e, -180, 180) / 180 * Math.PI,
            j(t, [(o = .213) + .787 * (n = Math.cos(e)) + (r = Math.sin(e)) * -o, (i = .715) + n * -i + r * -i, (a = .072) + n * -a + .928 * r, 0, 0, o + n * -o + .143 * r, i + n * (1 - i) + .14 * r, a + n * -a + -.283 * r, 0, 0, o + n * -o + -.787 * r, i + n * -i + r * i, a + .928 * n + r * a, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
        },
        adjustColors: function(t, e, n, r) {
            return j(t, [e = N(e, 0, 2), 0, 0, 0, 0, 0, n = N(n, 0, 2), 0, 0, 0, 0, 0, r = N(r, 0, 2), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
        },
        adjustSepia: function(t, e) {
            return j(t, G([.393, .769, .189, 0, 0, .349, .686, .168, 0, 0, .272, .534, .131, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], e = N(e, 0, 1)))
        },
        adjustGrayscale: function(t, e) {
            return j(t, G([.33, .34, .33, 0, 0, .33, .34, .33, 0, 0, .33, .34, .33, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], e = N(e, 0, 1)))
        }
    };
    function V(a, u) {
        return a.toCanvas().then(function(t) {
            return e = t,
            n = a.getType(),
            r = u,
            i = h.get2dContext(e),
            o = function(t, e) {
                var n, r, o, i, a, u = t.data,
                c = e[0],
                l = e[1],
                s = e[2],
                f = e[3],
                d = e[4],
                h = e[5],
                p = e[6],
                g = e[7],
                m = e[8],
                y = e[9],
                v = e[10],
                b = e[11],
                w = e[12],
                x = e[13],
                I = e[14],
                T = e[15],
                R = e[16],
                S = e[17],
                O = e[18],
                F = e[19];
                for (a = 0; a < u.length; a += 4) n = u[a],
                r = u[a + 1],
                o = u[a + 2],
                i = u[a + 3],
                u[a] = n * c + r * l + o * s + i * f + d,
                u[a + 1] = n * h + r * p + o * g + i * m + y,
                u[a + 2] = n * v + r * b + o * w + i * x + I,
                u[a + 3] = n * T + r * R + o * S + i * O + F;
                return t
            } (i.getImageData(0, 0, e.width, e.height), r),
            i.putImageData(o, 0, 0),
            M.fromCanvas(e, n);
            var e, n, r, o, i
        })
    }
    function W(u, c) {
        return u.toCanvas().then(function(t) {
            return e = t,
            n = u.getType(),
            r = c,
            a = h.get2dContext(e),
            o = a.getImageData(0, 0, e.width, e.height),
            i = a.getImageData(0, 0, e.width, e.height),
            i = function(t, e, n) {
                var r, o, i, a, u, c, l, s, f, d, h, p, g, m, y, v, b;
                function w(t, e, n) {
                    return n < t ? t = n: t < e && (t = e),
                    t
                }
                for (i = Math.round(Math.sqrt(n.length)), a = Math.floor(i / 2), r = t.data, o = e.data, v = t.width, b = t.height, c = 0; c < b; c++) for (u = 0; u < v; u++) {
                    for (l = s = f = 0, h = 0; h < i; h++) for (d = 0; d < i; d++) p = w(u + d - a, 0, v - 1),
                    g = w(c + h - a, 0, b - 1),
                    m = 4 * (g * v + p),
                    y = n[h * i + d],
                    l += r[m] * y,
                    s += r[m + 1] * y,
                    f += r[m + 2] * y;
                    o[m = 4 * (c * v + u)] = w(l, 0, 255),
                    o[m + 1] = w(s, 0, 255),
                    o[m + 2] = w(f, 0, 255)
                }
                return e
            } (o, i, r),
            a.putImageData(i, 0, 0),
            M.fromCanvas(e, n);
            var e, n, r, o, i, a
        })
    }
    function q(u) {
        return function(e, n) {
            return e.toCanvas().then(function(t) {
                return function(t, e, n) {
                    var r, o, i = h.get2dContext(t),
                    a = new Array(256);
                    for (o = 0; o < a.length; o++) a[o] = u(o, n);
                    return r = function(t, e) {
                        var n, r = t.data;
                        for (n = 0; n < r.length; n += 4) r[n] = e[r[n]],
                        r[n + 1] = e[r[n + 1]],
                        r[n + 2] = e[r[n + 2]];
                        return t
                    } (i.getImageData(0, 0, t.width, t.height), a),
                    i.putImageData(r, 0, 0),
                    M.fromCanvas(t, e)
                } (t, e.getType(), n)
            })
        }
    }
    function Y(n) {
        return function(t, e) {
            return V(t, n(z.identity(), e))
        }
    }
    function X(e) {
        return function(t) {
            return W(t, e)
        }
    }
    var J, K = {
        invert: (J = [ - 1, 0, 0, 0, 255, 0, -1, 0, 0, 255, 0, 0, -1, 0, 255, 0, 0, 0, 1, 0],
        function(t) {
            return V(t, J)
        }),
        brightness: Y(z.adjustBrightness),
        hue: Y(z.adjustHue),
        saturate: Y(z.adjustSaturation),
        contrast: Y(z.adjustContrast),
        grayscale: Y(z.adjustGrayscale),
        sepia: Y(z.adjustSepia),
        colorize: function(t, e, n, r) {
            return V(t, z.adjustColors(z.identity(), e, n, r))
        },
        sharpen: X([0, -1, 0, -1, 5, -1, 0, -1, 0]),
        emboss: X([ - 2, -1, 0, -1, 1, 1, 0, 1, 2]),
        gamma: q(function(t, e) {
            return 255 * Math.pow(t / 255, 1 - e)
        }),
        exposure: q(function(t, e) {
            return 255 * (1 - Math.exp( - t / 255 * e))
        }),
        colorFilter: V,
        convoluteFilter: W
    },
    Z = {
        scale: function e(t, n, r) {
            var o = p.getWidth(t),
            i = p.getHeight(t),
            a = n / o,
            u = r / i,
            c = !1; (a < .5 || 2 < a) && (a = a < .5 ? .5 : 2, c = !0),
            (u < .5 || 2 < u) && (u = u < .5 ? .5 : 2, c = !0);
            var l, s, f, d = (l = t, s = a, f = u, new g(function(t) {
                var e = p.getWidth(l),
                n = p.getHeight(l),
                r = Math.floor(e * s),
                o = Math.floor(n * f),
                i = h.create(r, o),
                a = h.get2dContext(i);
                a.drawImage(l, 0, 0, e, n, 0, 0, r, o),
                t(i)
            }));
            return c ? d.then(function(t) {
                return e(t, n, r)
            }) : d
        }
    },
    Q = {
        rotate: function(c, l) {
            return c.toCanvas().then(function(t) {
                return e = t,
                n = c.getType(),
                r = l,
                o = h.create(e.width, e.height),
                i = h.get2dContext(o),
                90 != (r = r < (u = a = 0) ? 360 + r: r) && 270 != r || h.resize(o, o.height, o.width),
                90 != r && 180 != r || (a = o.width),
                270 != r && 180 != r || (u = o.height),
                i.translate(a, u),
                i.rotate(r * Math.PI / 180),
                i.drawImage(e, 0, 0),
                M.fromCanvas(o, n);
                var e, n, r, o, i, a, u
            })
        }, flip: function(a, u) {
            return a.toCanvas().then(function(t) {
                return e = t,
                n = a.getType(),
                r = u,
                o = h.create(e.width, e.height),
                i = h.get2dContext(o),
                "v" == r ? (i.scale(1, -1), i.drawImage(e, 0, -o.height)) : (i.scale( - 1, 1), i.drawImage(e, -o.width, 0)),
                M.fromCanvas(o, n);
                var e, n, r, o, i
            })
        }, crop: function(c, l, s, f, d) {
            return c.toCanvas().then(function(t) {
                return e = t,
                n = c.getType(),
                r = l,
                o = s,
                i = f,
                a = d,
                u = h.create(i, a),
                h.get2dContext(u).drawImage(e, -r, -o),
                M.fromCanvas(u, n);
                var e, n, r, o, i, a, u
            })
        }, resize: function(e, n, r) {
            return e.toCanvas().then(function(t) {
                return Z.scale(t, n, r).then(function(t) {
                    return M.fromCanvas(t, e.getType())
                })
            })
        }
    },
    tt = function() {
        function t(t) {
            this.littleEndian = !1,
            this._dv = new DataView(t)
        }
        return t.prototype.readByteAt = function(t) {
            return this._dv.getUint8(t)
        },
        t.prototype.read = function(t, e) {
            if (t + e > this.length()) return null;
            for (var n = this.littleEndian ? 0 : -8 * (e - 1), r = 0, o = 0; r < e; r++) o |= this.readByteAt(t + r) << Math.abs(n + 8 * r);
            return o
        },
        t.prototype.BYTE = function(t) {
            return this.read(t, 1)
        },
        t.prototype.SHORT = function(t) {
            return this.read(t, 2)
        },
        t.prototype.LONG = function(t) {
            return this.read(t, 4)
        },
        t.prototype.SLONG = function(t) {
            var e = this.read(t, 4);
            return 2147483647 < e ? e - 4294967296 : e
        },
        t.prototype.CHAR = function(t) {
            return String.fromCharCode(this.read(t, 1))
        },
        t.prototype.STRING = function(t, e) {
            return this.asArray("CHAR", t, e).join("")
        },
        t.prototype.SEGMENT = function(t, e) {
            var n = this._dv.buffer;
            switch (arguments.length) {
            case 2:
                return n.slice(t, t + e);
            case 1:
                return n.slice(t);
            default:
                return n
            }
        },
        t.prototype.asArray = function(t, e, n) {
            for (var r = [], o = 0; o < n; o++) r[o] = this[t](e + o);
            return r
        },
        t.prototype.length = function() {
            return this._dv ? this._dv.byteLength: 0
        },
        t
    } (),
    et = {
        274 : "Orientation",
        270 : "ImageDescription",
        271 : "Make",
        272 : "Model",
        305 : "Software",
        34665 : "ExifIFDPointer",
        34853 : "GPSInfoIFDPointer"
    },
    nt = {
        36864 : "ExifVersion",
        40961 : "ColorSpace",
        40962 : "PixelXDimension",
        40963 : "PixelYDimension",
        36867 : "DateTimeOriginal",
        33434 : "ExposureTime",
        33437 : "FNumber",
        34855 : "ISOSpeedRatings",
        37377 : "ShutterSpeedValue",
        37378 : "ApertureValue",
        37383 : "MeteringMode",
        37384 : "LightSource",
        37385 : "Flash",
        37386 : "FocalLength",
        41986 : "ExposureMode",
        41987 : "WhiteBalance",
        41990 : "SceneCaptureType",
        41988 : "DigitalZoomRatio",
        41992 : "Contrast",
        41993 : "Saturation",
        41994 : "Sharpness"
    },
    rt = {
        0 : "GPSVersionID",
        1 : "GPSLatitudeRef",
        2 : "GPSLatitude",
        3 : "GPSLongitudeRef",
        4 : "GPSLongitude"
    },
    ot = {
        513 : "JPEGInterchangeFormat",
        514 : "JPEGInterchangeFormatLength"
    },
    it = {
        ColorSpace: {
            1 : "sRGB",
            0 : "Uncalibrated"
        },
        MeteringMode: {
            0 : "Unknown",
            1 : "Average",
            2 : "CenterWeightedAverage",
            3 : "Spot",
            4 : "MultiSpot",
            5 : "Pattern",
            6 : "Partial",
            255 : "Other"
        },
        LightSource: {
            1 : "Daylight",
            2 : "Fliorescent",
            3 : "Tungsten",
            4 : "Flash",
            9 : "Fine weather",
            10 : "Cloudy weather",
            11 : "Shade",
            12 : "Daylight fluorescent (D 5700 - 7100K)",
            13 : "Day white fluorescent (N 4600 -5400K)",
            14 : "Cool white fluorescent (W 3900 - 4500K)",
            15 : "White fluorescent (WW 3200 - 3700K)",
            17 : "Standard light A",
            18 : "Standard light B",
            19 : "Standard light C",
            20 : "D55",
            21 : "D65",
            22 : "D75",
            23 : "D50",
            24 : "ISO studio tungsten",
            255 : "Other"
        },
        Flash: {
            0 : "Flash did not fire",
            1 : "Flash fired",
            5 : "Strobe return light not detected",
            7 : "Strobe return light detected",
            9 : "Flash fired, compulsory flash mode",
            13 : "Flash fired, compulsory flash mode, return light not detected",
            15 : "Flash fired, compulsory flash mode, return light detected",
            16 : "Flash did not fire, compulsory flash mode",
            24 : "Flash did not fire, auto mode",
            25 : "Flash fired, auto mode",
            29 : "Flash fired, auto mode, return light not detected",
            31 : "Flash fired, auto mode, return light detected",
            32 : "No flash function",
            65 : "Flash fired, red-eye reduction mode",
            69 : "Flash fired, red-eye reduction mode, return light not detected",
            71 : "Flash fired, red-eye reduction mode, return light detected",
            73 : "Flash fired, compulsory flash mode, red-eye reduction mode",
            77 : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            79 : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            89 : "Flash fired, auto mode, red-eye reduction mode",
            93 : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            95 : "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        ExposureMode: {
            0 : "Auto exposure",
            1 : "Manual exposure",
            2 : "Auto bracket"
        },
        WhiteBalance: {
            0 : "Auto white balance",
            1 : "Manual white balance"
        },
        SceneCaptureType: {
            0 : "Standard",
            1 : "Landscape",
            2 : "Portrait",
            3 : "Night scene"
        },
        Contrast: {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        Saturation: {
            0 : "Normal",
            1 : "Low saturation",
            2 : "High saturation"
        },
        Sharpness: {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        GPSLatitudeRef: {
            N: "North latitude",
            S: "South latitude"
        },
        GPSLongitudeRef: {
            E: "East longitude",
            W: "West longitude"
        }
    },
    at = function() {
        function t(t) {
            this._offsets = {
                tiffHeader: 10,
                IFD0: null,
                IFD1: null,
                exifIFD: null,
                gpsIFD: null
            },
            this._tiffTags = {};
            var e = this;
            if (e._reader = new tt(t), e._idx = e._offsets.tiffHeader, 65505 !== e.SHORT(0) || "EXIF\0" !== e.STRING(4, 5).toUpperCase()) throw new Error("Exif data cannot be read or not available.");
            if (e._reader.littleEndian = 18761 == e.SHORT(e._idx), 42 !== e.SHORT(e._idx += 2)) throw new Error("Invalid Exif data.");
            e._offsets.IFD0 = e._offsets.tiffHeader + e.LONG(e._idx += 2),
            e._tiffTags = e.extractTags(e._offsets.IFD0, et),
            "ExifIFDPointer" in e._tiffTags && (e._offsets.exifIFD = e._offsets.tiffHeader + e._tiffTags.ExifIFDPointer, delete e._tiffTags.ExifIFDPointer),
            "GPSInfoIFDPointer" in e._tiffTags && (e._offsets.gpsIFD = e._offsets.tiffHeader + e._tiffTags.GPSInfoIFDPointer, delete e._tiffTags.GPSInfoIFDPointer);
            var n = e.LONG(e._offsets.IFD0 + 12 * e.SHORT(e._offsets.IFD0) + 2);
            n && (e._offsets.IFD1 = e._offsets.tiffHeader + n)
        }
        return t.prototype.BYTE = function(t) {
            return this._reader.BYTE(t)
        },
        t.prototype.SHORT = function(t) {
            return this._reader.SHORT(t)
        },
        t.prototype.LONG = function(t) {
            return this._reader.LONG(t)
        },
        t.prototype.SLONG = function(t) {
            return this._reader.SLONG(t)
        },
        t.prototype.CHAR = function(t) {
            return this._reader.CHAR(t)
        },
        t.prototype.STRING = function(t, e) {
            return this._reader.STRING(t, e)
        },
        t.prototype.SEGMENT = function(t, e) {
            return this._reader.SEGMENT(t, e)
        },
        t.prototype.asArray = function(t, e, n) {
            for (var r = [], o = 0; o < n; o++) r[o] = this[t](e + o);
            return r
        },
        t.prototype.length = function() {
            return this._reader.length()
        },
        t.prototype.UNDEFINED = function() {
            return this.BYTE.apply(this, arguments)
        },
        t.prototype.RATIONAL = function(t) {
            return this.LONG(t) / this.LONG(t + 4)
        },
        t.prototype.SRATIONAL = function(t) {
            return this.SLONG(t) / this.SLONG(t + 4)
        },
        t.prototype.ASCII = function(t) {
            return this.CHAR(t)
        },
        t.prototype.TIFF = function() {
            return this._tiffTags
        },
        t.prototype.EXIF = function() {
            var t = null;
            if (this._offsets.exifIFD) {
                try {
                    t = this.extractTags(this._offsets.exifIFD, nt)
                } catch(r) {
                    return null
                }
                if (t.ExifVersion && Array.isArray(t.ExifVersion)) {
                    for (var e = 0,
                    n = ""; e < t.ExifVersion.length; e++) n += String.fromCharCode(t.ExifVersion[e]);
                    t.ExifVersion = n
                }
            }
            return t
        },
        t.prototype.GPS = function() {
            var t = null;
            if (this._offsets.gpsIFD) {
                try {
                    t = this.extractTags(this._offsets.gpsIFD, rt)
                } catch(e) {
                    return null
                }
                t.GPSVersionID && Array.isArray(t.GPSVersionID) && (t.GPSVersionID = t.GPSVersionID.join("."))
            }
            return t
        },
        t.prototype.thumb = function() {
            var t = this;
            if (t._offsets.IFD1) try {
                var e = t.extractTags(t._offsets.IFD1, ot);
                if ("JPEGInterchangeFormat" in e) return t.SEGMENT(t._offsets.tiffHeader + e.JPEGInterchangeFormat, e.JPEGInterchangeFormatLength)
            } catch(n) {}
            return null
        },
        t.prototype.extractTags = function(t, e) {
            var n, r, o, i, a, u, c, l, s = this,
            f = [],
            d = {},
            h = {
                1 : "BYTE",
                7 : "UNDEFINED",
                2 : "ASCII",
                3 : "SHORT",
                4 : "LONG",
                5 : "RATIONAL",
                9 : "SLONG",
                10 : "SRATIONAL"
            },
            p = {
                BYTE: 1,
                UNDEFINED: 1,
                ASCII: 1,
                SHORT: 2,
                LONG: 4,
                RATIONAL: 8,
                SLONG: 4,
                SRATIONAL: 8
            };
            for (n = s.SHORT(t), r = 0; r < n; r++) if (f = [], c = t + 2 + 12 * r, (o = e[s.SHORT(c)]) !== undefined) {
                if (i = h[s.SHORT(c += 2)], a = s.LONG(c += 2), !(u = p[i])) throw new Error("Invalid Exif data.");
                if (c += 4, 4 < u * a && (c = s.LONG(c) + s._offsets.tiffHeader), c + u * a >= s.length()) throw new Error("Invalid Exif data.");
                "ASCII" !== i ? (f = s.asArray(i, c, a), l = 1 == a ? f[0] : f, it.hasOwnProperty(o) && "object" != typeof l ? d[o] = it[o][l] : d[o] = l) : d[o] = s.STRING(c, a).replace(/\0$/, "").trim()
            }
            return d
        },
        t
    } (),
    ut = function(t) {
        var e, n, r = [],
        o = 0;
        for (e = 2; e <= t.length();) if (65488 <= (n = t.SHORT(e)) && n <= 65495) e += 2;
        else {
            if (65498 === n || 65497 === n) break;
            o = t.SHORT(e + 2) + 2,
            65505 <= n && n <= 65519 && r.push({
                hex: n,
                name: "APP" + (15 & n),
                start: e,
                length: o,
                segment: t.SEGMENT(e, o)
            }),
            e += o
        }
        return r
    },
    ct = function(u) {
        return k.blobToArrayBuffer(u).then(function(t) {
            try {
                var e = new tt(t);
                if (65496 === e.SHORT(0)) {
                    var n = ut(e),
                    r = n.filter(function(t) {
                        return "APP1" === t.name
                    }),
                    o = {};
                    if (!r.length) return g.reject("Headers did not include required information");
                    var i = new at(r[0].segment);
                    return (o = {
                        tiff: i.TIFF(),
                        exif: i.EXIF(),
                        gps: i.GPS(),
                        thumb: i.thumb()
                    }).rawHeaders = n,
                    o
                }
                return g.reject("Image was not a jpeg")
            } catch(a) {
                return g.reject("Unsupported format or not an image: " + u.type + " (Exception: " + a.message + ")")
            }
        })
    },
    lt = function(t, e) {
        return Q.rotate(t, e)
    },
    st = {
        invert: function(t) {
            return K.invert(t)
        },
        sharpen: function(t) {
            return K.sharpen(t)
        },
        emboss: function(t) {
            return K.emboss(t)
        },
        brightness: function(t, e) {
            return K.brightness(t, e)
        },
        hue: function(t, e) {
            return K.hue(t, e)
        },
        saturate: function(t, e) {
            return K.saturate(t, e)
        },
        contrast: function(t, e) {
            return K.contrast(t, e)
        },
        grayscale: function(t, e) {
            return K.grayscale(t, e)
        },
        sepia: function(t, e) {
            return K.sepia(t, e)
        },
        colorize: function(t, e, n, r) {
            return K.colorize(t, e, n, r)
        },
        gamma: function(t, e) {
            return K.gamma(t, e)
        },
        exposure: function(t, e) {
            return K.exposure(t, e)
        },
        flip: function(t, e) {
            return Q.flip(t, e)
        },
        crop: function(t, e, n, r, o) {
            return Q.crop(t, e, n, r, o)
        },
        resize: function(t, e, n) {
            return Q.resize(t, e, n)
        },
        rotate: lt,
        exifRotate: function(e) {
            return e.toBlob().then(ct).then(function(t) {
                switch (t.tiff.Orientation) {
                case 6:
                    return lt(e, 90);
                case 3:
                    return lt(e, 180);
                case 8:
                    return lt(e, 270);
                default:
                    return e
                }
            },
            function() {
                return e
            })
        }
    },
    ft = function(t) {
        return t.toBlob()
    },
    dt = {
        blobToImageResult: function(t) {
            return M.fromBlob(t)
        },
        fromBlobAndUrlSync: function(t, e) {
            return M.fromBlobAndUrlSync(t, e)
        },
        imageToImageResult: function(t) {
            return M.fromImage(t)
        },
        imageResultToBlob: function(t, e, n) {
            return e === undefined && n === undefined ? ft(t) : t.toAdjustedBlob(e, n)
        },
        imageResultToOriginalBlob: ft,
        imageResultToDataURL: function(t) {
            return t.toDataURL()
        }
    },
    ht = function() {
        return S.getOrDie("URL")
    },
    pt = {
        createObjectURL: function(t) {
            return ht().createObjectURL(t)
        },
        revokeObjectURL: function(t) {
            ht().revokeObjectURL(t)
        }
    },
    gt = tinymce.util.Tools.resolve("tinymce.util.Delay"),
    mt = tinymce.util.Tools.resolve("tinymce.util.Promise"),
    yt = tinymce.util.Tools.resolve("tinymce.util.URI"),
    vt = tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),
    bt = tinymce.util.Tools.resolve("tinymce.ui.Factory"),
    wt = tinymce.util.Tools.resolve("tinymce.geom.Rect"),
    xt = function(n) {
        return new mt(function(t) {
            var e = function() {
                n.removeEventListener("load", e),
                t(n)
            };
            n.complete ? t(n) : n.addEventListener("load", e)
        })
    },
    It = tinymce.util.Tools.resolve("tinymce.dom.DomQuery"),
    Tt = tinymce.util.Tools.resolve("tinymce.util.Observable"),
    Rt = tinymce.util.Tools.resolve("tinymce.util.VK"),
    St = 0,
    Ot = {
        create: function(t) {
            return new(bt.get("Control").extend({
                Defaults: {
                    classes: "imagepanel"
                },
                selection: function(t) {
                    return arguments.length ? (this.state.set("rect", t), this) : this.state.get("rect")
                },
                imageSize: function() {
                    var t = this.state.get("viewRect");
                    return {
                        w: t.w,
                        h: t.h
                    }
                },
                toggleCropRect: function(t) {
                    this.state.set("cropEnabled", t)
                },
                imageSrc: function(t) {
                    var o = this,
                    i = new Image;
                    i.src = t,
                    xt(i).then(function() {
                        var t, e, n = o.state.get("viewRect");
                        if ((e = o.$el.find("img"))[0]) e.replaceWith(i);
                        else {
                            var r = document.createElement("div");
                            r.className = "mce-imagepanel-bg",
                            o.getEl().appendChild(r),
                            o.getEl().appendChild(i)
                        }
                        t = {
                            x: 0,
                            y: 0,
                            w: i.naturalWidth,
                            h: i.naturalHeight
                        },
                        o.state.set("viewRect", t),
                        o.state.set("rect", wt.inflate(t, -20, -20)),
                        n && n.w === t.w && n.h === t.h || o.zoomFit(),
                        o.repaintImage(),
                        o.fire("load")
                    })
                },
                zoom: function(t) {
                    return arguments.length ? (this.state.set("zoom", t), this) : this.state.get("zoom")
                },
                postRender: function() {
                    return this.imageSrc(this.settings.imageSrc),
                    this._super()
                },
                zoomFit: function() {
                    var t, e, n, r, o, i;
                    t = this.$el.find("img"),
                    e = this.getEl().clientWidth,
                    n = this.getEl().clientHeight,
                    r = t[0].naturalWidth,
                    o = t[0].naturalHeight,
                    1 <= (i = Math.min((e - 10) / r, (n - 10) / o)) && (i = 1),
                    this.zoom(i)
                },
                repaintImage: function() {
                    var t, e, n, r, o, i, a, u, c, l, s;
                    s = this.getEl(),
                    c = this.zoom(),
                    l = this.state.get("rect"),
                    a = this.$el.find("img"),
                    u = this.$el.find(".mce-imagepanel-bg"),
                    o = s.offsetWidth,
                    i = s.offsetHeight,
                    n = a[0].naturalWidth * c,
                    r = a[0].naturalHeight * c,
                    t = Math.max(0, o / 2 - n / 2),
                    e = Math.max(0, i / 2 - r / 2),
                    a.css({
                        left: t,
                        top: e,
                        width: n,
                        height: r
                    }),
                    u.css({
                        left: t,
                        top: e,
                        width: n,
                        height: r
                    }),
                    this.cropRect && (this.cropRect.setRect({
                        x: l.x * c + t,
                        y: l.y * c + e,
                        w: l.w * c,
                        h: l.h * c
                    }), this.cropRect.setClampRect({
                        x: t,
                        y: e,
                        w: n,
                        h: r
                    }), this.cropRect.setViewPortRect({
                        x: 0,
                        y: 0,
                        w: o,
                        h: i
                    }))
                },
                bindStates: function() {
                    var r = this;
                    function n(t) {
                        r.cropRect = function(l, n, s, r, o) {
                            var f, a, t, i, e = "mce-",
                            u = e + "crid-" + St++;
                            function d(t, e) {
                                return {
                                    x: e.x - t.x,
                                    y: e.y - t.y,
                                    w: e.w,
                                    h: e.h
                                }
                            }
                            function c(t, e, n, r) {
                                var o, i, a, u, c;
                                o = e.x,
                                i = e.y,
                                a = e.w,
                                u = e.h,
                                o += n * t.deltaX,
                                i += r * t.deltaY,
                                (a += n * t.deltaW) < 20 && (a = 20),
                                (u += r * t.deltaH) < 20 && (u = 20),
                                c = l = wt.clamp({
                                    x: o,
                                    y: i,
                                    w: a,
                                    h: u
                                },
                                s, "move" === t.name),
                                c = d(s, c),
                                f.fire("updateRect", {
                                    rect: c
                                }),
                                g(c)
                            }
                            function h(e) {
                                function t(t, e) {
                                    e.h < 0 && (e.h = 0),
                                    e.w < 0 && (e.w = 0),
                                    It("#" + u + "-" + t, r).css({
                                        left: e.x,
                                        top: e.y,
                                        width: e.w,
                                        height: e.h
                                    })
                                }
                                $.each(a,
                                function(t) {
                                    It("#" + u + "-" + t.name, r).css({
                                        left: e.w * t.xMul + e.x,
                                        top: e.h * t.yMul + e.y
                                    })
                                }),
                                t("top", {
                                    x: n.x,
                                    y: n.y,
                                    w: n.w,
                                    h: e.y - n.y
                                }),
                                t("right", {
                                    x: e.x + e.w,
                                    y: e.y,
                                    w: n.w - e.x - e.w + n.x,
                                    h: e.h
                                }),
                                t("bottom", {
                                    x: n.x,
                                    y: e.y + e.h,
                                    w: n.w,
                                    h: n.h - e.y - e.h + n.y
                                }),
                                t("left", {
                                    x: n.x,
                                    y: e.y,
                                    w: e.x - n.x,
                                    h: e.h
                                }),
                                t("move", e)
                            }
                            function p(t) {
                                h(l = t)
                            }
                            function g(t) {
                                var e, n;
                                p((e = s, {
                                    x: (n = t).x + e.x,
                                    y: n.y + e.y,
                                    w: n.w,
                                    h: n.h
                                }))
                            }
                            return a = [{
                                name: "move",
                                xMul: 0,
                                yMul: 0,
                                deltaX: 1,
                                deltaY: 1,
                                deltaW: 0,
                                deltaH: 0,
                                label: "Crop Mask"
                            },
                            {
                                name: "nw",
                                xMul: 0,
                                yMul: 0,
                                deltaX: 1,
                                deltaY: 1,
                                deltaW: -1,
                                deltaH: -1,
                                label: "Top Left Crop Handle"
                            },
                            {
                                name: "ne",
                                xMul: 1,
                                yMul: 0,
                                deltaX: 0,
                                deltaY: 1,
                                deltaW: 1,
                                deltaH: -1,
                                label: "Top Right Crop Handle"
                            },
                            {
                                name: "sw",
                                xMul: 0,
                                yMul: 1,
                                deltaX: 1,
                                deltaY: 0,
                                deltaW: -1,
                                deltaH: 1,
                                label: "Bottom Left Crop Handle"
                            },
                            {
                                name: "se",
                                xMul: 1,
                                yMul: 1,
                                deltaX: 0,
                                deltaY: 0,
                                deltaW: 1,
                                deltaH: 1,
                                label: "Bottom Right Crop Handle"
                            }],
                            i = ["top", "right", "bottom", "left"],
                            It('<div id="' + u + '" class="' + e + 'croprect-container" role="grid" aria-dropeffect="execute">').appendTo(r),
                            $.each(i,
                            function(t) {
                                It("#" + u, r).append('<div id="' + u + "-" + t + '"class="' + e + 'croprect-block" style="display: none" data-mce-bogus="all">')
                            }),
                            $.each(a,
                            function(t) {
                                It("#" + u, r).append('<div id="' + u + "-" + t.name + '" class="' + e + "croprect-handle " + e + "croprect-handle-" + t.name + '"style="display: none" data-mce-bogus="all" role="gridcell" tabindex="-1" aria-label="' + t.label + '" aria-grabbed="false">')
                            }),
                            t = $.map(a,
                            function(e) {
                                var n;
                                return new(bt.get("DragHelper"))(u, {
                                    document: r.ownerDocument,
                                    handle: u + "-" + e.name,
                                    start: function() {
                                        n = l
                                    },
                                    drag: function(t) {
                                        c(e, n, t.deltaX, t.deltaY)
                                    }
                                })
                            }),
                            h(l),
                            It(r).on("focusin focusout",
                            function(t) {
                                It(t.target).attr("aria-grabbed", "focus" === t.type)
                            }),
                            It(r).on("keydown",
                            function(e) {
                                var i;
                                function t(t, e, n, r, o) {
                                    t.stopPropagation(),
                                    t.preventDefault(),
                                    c(i, n, r, o)
                                }
                                switch ($.each(a,
                                function(t) {
                                    if (e.target.id === u + "-" + t.name) return i = t,
                                    !1
                                }), e.keyCode) {
                                case Rt.LEFT:
                                    t(e, 0, l, -10, 0);
                                    break;
                                case Rt.RIGHT:
                                    t(e, 0, l, 10, 0);
                                    break;
                                case Rt.UP:
                                    t(e, 0, l, 0, -10);
                                    break;
                                case Rt.DOWN:
                                    t(e, 0, l, 0, 10);
                                    break;
                                case Rt.ENTER:
                                case Rt.SPACEBAR:
                                    e.preventDefault(),
                                    o()
                                }
                            }),
                            f = $.extend({
                                toggleVisibility: function(t) {
                                    var e;
                                    e = $.map(a,
                                    function(t) {
                                        return "#" + u + "-" + t.name
                                    }).concat($.map(i,
                                    function(t) {
                                        return "#" + u + "-" + t
                                    })).join(","),
                                    t ? It(e, r).show() : It(e, r).hide()
                                },
                                setClampRect: function(t) {
                                    s = t,
                                    h(l)
                                },
                                setRect: p,
                                getInnerRect: function() {
                                    return d(s, l)
                                },
                                setInnerRect: g,
                                setViewPortRect: function(t) {
                                    n = t,
                                    h(l)
                                },
                                destroy: function() {
                                    $.each(t,
                                    function(t) {
                                        t.destroy()
                                    }),
                                    t = []
                                }
                            },
                            Tt)
                        } (t, r.state.get("viewRect"), r.state.get("viewRect"), r.getEl(),
                        function() {
                            r.fire("crop")
                        }),
                        r.cropRect.on("updateRect",
                        function(t) {
                            var e = t.rect,
                            n = r.zoom();
                            e = {
                                x: Math.round(e.x / n),
                                y: Math.round(e.y / n),
                                w: Math.round(e.w / n),
                                h: Math.round(e.h / n)
                            },
                            r.state.set("rect", e)
                        }),
                        r.on("remove", r.cropRect.destroy)
                    }
                    r.state.on("change:cropEnabled",
                    function(t) {
                        r.cropRect.toggleVisibility(t.value),
                        r.repaintImage()
                    }),
                    r.state.on("change:zoom",
                    function() {
                        r.repaintImage()
                    }),
                    r.state.on("change:rect",
                    function(t) {
                        var e = t.value;
                        r.cropRect || n(e),
                        r.cropRect.setRect(e)
                    })
                }
            }))(t)
        }
    };
    function Ft(t) {
        return {
            blob: t,
            url: pt.createObjectURL(t)
        }
    }
    function Ct(t) {
        t && pt.revokeObjectURL(t.url)
    }
    function Et(t) {
        $.each(t, Ct)
    }
    function Dt(i, a, t, e) {
        var u, n, r, c, o, l, s, f, d, h, p, g, m, y, v, b, w, x, I, T, R, S, O, F, C, E, D, A = function() {
            var n = [],
            r = -1;
            function t() {
                return 0 < r
            }
            function e() {
                return - 1 !== r && r < n.length - 1
            }
            return {
                data: n,
                add: function(t) {
                    var e;
                    return e = n.splice(++r),
                    n.push(t),
                    {
                        state: t,
                        removed: e
                    }
                },
                undo: function() {
                    if (t()) return n[--r]
                },
                redo: function() {
                    if (e()) return n[++r]
                },
                canUndo: t,
                canRedo: e
            }
        } (),
        _ = function(t) {
            return i.rtl ? t.reverse() : t
        };
        function k(t) {
            var e, n, r, o;
            e = u.find("#w")[0],
            n = u.find("#h")[0],
            r = parseInt(e.value(), 10),
            o = parseInt(n.value(), 10),
            u.find("#constrain")[0].checked() && F && C && r && o && ("w" === t.control.settings.name ? (o = Math.round(r * E), n.value(o)) : (r = Math.round(o * D), e.value(r))),
            F = r,
            C = o
        }
        function L(t) {
            return Math.round(100 * t) + "%"
        }
        function P() {
            u.find("#undo").disabled(!A.canUndo()),
            u.find("#redo").disabled(!A.canRedo()),
            u.statusbar.find("#save").disabled(!A.canUndo())
        }
        function B() {
            u.find("#undo").disabled(!0),
            u.find("#redo").disabled(!0)
        }
        function H(t) {
            t && f.imageSrc(t.url)
        }
        function M(e) {
            return function() {
                var t = $.grep(O,
                function(t) {
                    return t.settings.name !== e
                });
                $.each(t,
                function(t) {
                    t.hide()
                }),
                e.show(),
                e.focus()
            }
        }
        function N(t) {
            H(c = Ft(t))
        }
        function U(t) {
            H(a = Ft(t)),
            Et(A.add(a).removed),
            P()
        }
        function j() {
            var e = f.selection();
            dt.blobToImageResult(a.blob).then(function(t) {
                st.crop(t, e.x, e.y, e.w, e.h).then(q).then(function(t) {
                    U(t),
                    z()
                })
            })
        }
        var G = function(e) {
            var n = [].slice.call(arguments, 1);
            return function() {
                var t = c || a;
                dt.blobToImageResult(t.blob).then(function(t) {
                    e.apply(this, [t].concat(n)).then(q).then(N)
                })
            }
        };
        function z() {
            H(a),
            Ct(c),
            M(n)(),
            P()
        }
        function V() {
            c ? (U(c.blob), z()) : function t(e, n) {
                c ? n() : setTimeout(function() {
                    0 < e--?t(e, n) : i.windowManager.alert("Error: failed to apply image operation.")
                },
                10)
            } (100, V)
        }
        function W(t) {
            return bt.create("Form", {
                layout: "flex",
                direction: "row",
                labelGap: 5,
                border: "0 0 1 0",
                align: "center",
                pack: "center",
                padding: "0 10 0 10",
                spacing: 5,
                flex: 0,
                minHeight: 60,
                defaults: {
                    classes: "imagetool",
                    type: "button"
                },
                items: t
            })
        }
        var q = function(t) {
            return t.toBlob()
        };
        function Y(t, e) {
            return W(_([{
                text: "Back",
                onclick: z
            },
            {
                type: "spacer",
                flex: 1
            },
            {
                text: "Apply",
                subtype: "primary",
                onclick: V
            }])).hide().on("show",
            function() {
                B(),
                dt.blobToImageResult(a.blob).then(function(t) {
                    return e(t)
                }).then(q).then(function(t) {
                    var e = Ft(t);
                    H(e),
                    Ct(c),
                    c = e
                })
            })
        }
        function X(t, n, e, r, o) {
            return W(_([{
                text: "Back",
                onclick: z
            },
            {
                type: "spacer",
                flex: 1
            },
            {
                type: "slider",
                flex: 1,
                ondragend: function(t) {
                    var e;
                    e = t.value,
                    dt.blobToImageResult(a.blob).then(function(t) {
                        return n(t, e)
                    }).then(q).then(function(t) {
                        var e = Ft(t);
                        H(e),
                        Ct(c),
                        c = e
                    })
                },
                minValue: i.rtl ? o: r,
                maxValue: i.rtl ? r: o,
                value: e,
                previewFilter: L
            },
            {
                type: "spacer",
                flex: 1
            },
            {
                text: "Apply",
                subtype: "primary",
                onclick: V
            }])).hide().on("show",
            function() {
                this.find("slider").value(e),
                B()
            })
        }
        o = W(_([{
            text: "Back",
            onclick: z
        },
        {
            type: "spacer",
            flex: 1
        },
        {
            text: "Apply",
            subtype: "primary",
            onclick: j
        }])).hide().on("show hide",
        function(t) {
            f.toggleCropRect("show" === t.type)
        }).on("show", B),
        l = W(_([{
            text: "Back",
            onclick: z
        },
        {
            type: "spacer",
            flex: 1
        },
        {
            type: "textbox",
            name: "w",
            label: "Width",
            size: 4,
            onkeyup: k
        },
        {
            type: "textbox",
            name: "h",
            label: "Height",
            size: 4,
            onkeyup: k
        },
        {
            type: "checkbox",
            name: "constrain",
            text: "Constrain proportions",
            checked: !0,
            onchange: function(t) { ! 0 === t.control.value() && (E = C / F, D = F / C)
            }
        },
        {
            type: "spacer",
            flex: 1
        },
        {
            text: "Apply",
            subtype: "primary",
            onclick: "submit"
        }])).hide().on("submit",
        function(t) {
            var e = parseInt(u.find("#w").value(), 10),
            n = parseInt(u.find("#h").value(), 10);
            t.preventDefault(),
            function(e) {
                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                var r = [].slice.call(arguments, 1);
                return function() {
                    dt.blobToImageResult(a.blob).then(function(t) {
                        e.apply(this, [t].concat(r)).then(q).then(U)
                    })
                }
            } (st.resize, e, n)(),
            z()
        }).on("show", B),
        s = W(_([{
            text: "Back",
            onclick: z
        },
        {
            type: "spacer",
            flex: 1
        },
        {
            icon: "fliph",
            tooltip: "Flip horizontally",
            onclick: G(st.flip, "h")
        },
        {
            icon: "flipv",
            tooltip: "Flip vertically",
            onclick: G(st.flip, "v")
        },
        {
            icon: "rotateleft",
            tooltip: "Rotate counterclockwise",
            onclick: G(st.rotate, -90)
        },
        {
            icon: "rotateright",
            tooltip: "Rotate clockwise",
            onclick: G(st.rotate, 90)
        },
        {
            type: "spacer",
            flex: 1
        },
        {
            text: "Apply",
            subtype: "primary",
            onclick: V
        }])).hide().on("show", B),
        p = Y(0, st.invert),
        I = Y(0, st.sharpen),
        T = Y(0, st.emboss),
        g = X(0, st.brightness, 0, -1, 1),
        m = X(0, st.hue, 180, 0, 360),
        y = X(0, st.saturate, 0, -1, 1),
        v = X(0, st.contrast, 0, -1, 1),
        b = X(0, st.grayscale, 0, 0, 1),
        w = X(0, st.sepia, 0, 0, 1),
        x = function(t, o) {
            function e() {
                var e, n, r;
                e = u.find("#r")[0].value(),
                n = u.find("#g")[0].value(),
                r = u.find("#b")[0].value(),
                dt.blobToImageResult(a.blob).then(function(t) {
                    return o(t, e, n, r)
                }).then(q).then(function(t) {
                    var e = Ft(t);
                    H(e),
                    Ct(c),
                    c = e
                })
            }
            var n = i.rtl ? 2 : 0,
            r = i.rtl ? 0 : 2;
            return W(_([{
                text: "Back",
                onclick: z
            },
            {
                type: "spacer",
                flex: 1
            },
            {
                type: "slider",
                label: "R",
                name: "r",
                minValue: n,
                value: 1,
                maxValue: r,
                ondragend: e,
                previewFilter: L
            },
            {
                type: "slider",
                label: "G",
                name: "g",
                minValue: n,
                value: 1,
                maxValue: r,
                ondragend: e,
                previewFilter: L
            },
            {
                type: "slider",
                label: "B",
                name: "b",
                minValue: n,
                value: 1,
                maxValue: r,
                ondragend: e,
                previewFilter: L
            },
            {
                type: "spacer",
                flex: 1
            },
            {
                text: "Apply",
                subtype: "primary",
                onclick: V
            }])).hide().on("show",
            function() {
                u.find("#r,#g,#b").value(1),
                B()
            })
        } (0, st.colorize),
        R = X(0, st.gamma, 0, -1, 1),
        S = X(0, st.exposure, 1, 0, 2),
        r = W(_([{
            text: "Back",
            onclick: z
        },
        {
            type: "spacer",
            flex: 1
        },
        {
            text: "hue",
            icon: "hue",
            onclick: M(m)
        },
        {
            text: "saturate",
            icon: "saturate",
            onclick: M(y)
        },
        {
            text: "sepia",
            icon: "sepia",
            onclick: M(w)
        },
        {
            text: "emboss",
            icon: "emboss",
            onclick: M(T)
        },
        {
            text: "exposure",
            icon: "exposure",
            onclick: M(S)
        },
        {
            type: "spacer",
            flex: 1
        }])).hide(),
        n = W(_([{
            tooltip: "Crop",
            icon: "crop",
            onclick: M(o)
        },
        {
            tooltip: "Resize",
            icon: "resize2",
            onclick: M(l)
        },
        {
            tooltip: "Orientation",
            icon: "orientation",
            onclick: M(s)
        },
        {
            tooltip: "Brightness",
            icon: "sun",
            onclick: M(g)
        },
        {
            tooltip: "Sharpen",
            icon: "sharpen",
            onclick: M(I)
        },
        {
            tooltip: "Contrast",
            icon: "contrast",
            onclick: M(v)
        },
        {
            tooltip: "Color levels",
            icon: "drop",
            onclick: M(x)
        },
        {
            tooltip: "Gamma",
            icon: "gamma",
            onclick: M(R)
        },
        {
            tooltip: "Invert",
            icon: "invert",
            onclick: M(p)
        }])),
        f = Ot.create({
            flex: 1,
            imageSrc: a.url
        }),
        d = bt.create("Container", {
            layout: "flex",
            direction: "column",
            pack: "start",
            border: "0 1 0 0",
            padding: 5,
            spacing: 5,
            items: [{
                type: "button",
                icon: "undo",
                tooltip: "Undo",
                name: "undo",
                onclick: function() {
                    H(a = A.undo()),
                    P()
                }
            },
            {
                type: "button",
                icon: "redo",
                tooltip: "Redo",
                name: "redo",
                onclick: function() {
                    H(a = A.redo()),
                    P()
                }
            },
            {
                type: "button",
                icon: "zoomin",
                tooltip: "Zoom in",
                onclick: function() {
                    var t = f.zoom();
                    t < 2 && (t += .1),
                    f.zoom(t)
                }
            },
            {
                type: "button",
                icon: "zoomout",
                tooltip: "Zoom out",
                onclick: function() {
                    var t = f.zoom();.1 < t && (t -= .1),
                    f.zoom(t)
                }
            }]
        }),
        h = bt.create("Container", {
            type: "container",
            layout: "flex",
            direction: "row",
            align: "stretch",
            flex: 1,
            items: _([d, f])
        }),
        O = [n, o, l, s, r, p, g, m, y, v, b, w, x, I, T, R, S],
        (u = i.windowManager.open({
            layout: "flex",
            direction: "column",
            align: "stretch",
            minWidth: Math.min(vt.DOM.getViewPort().w, 800),
            minHeight: Math.min(vt.DOM.getViewPort().h, 650),
            title: "Edit image",
            items: O.concat([h]),
            buttons: _([{
                text: "Save",
                name: "save",
                subtype: "primary",
                onclick: function() {
                    t(a.blob),
                    u.close()
                }
            },
            {
                text: "Cancel",
                onclick: "close"
            }])
        })).on("close",
        function() {
            e(),
            Et(A.data),
            c = A = null
        }),
        A.add(a),
        P(),
        f.on("load",
        function() {
            F = f.imageSize().w,
            C = f.imageSize().h,
            E = C / F,
            D = F / C,
            u.find("#w").value(F),
            u.find("#h").value(C)
        }),
        f.on("crop", j)
    }
    var At, _t = {
        edit: function(r, t) {
            return new mt(function(e, n) {
                return t.toBlob().then(function(t) {
                    Dt(r, Ft(t), e, n)
                })
            })
        }
    },
    kt = {
        getImageSize: function(t) {
            var e, n;
            function r(t) {
                return /^[0-9\.]+px$/.test(t)
            }
            return e = t.style.width,
            n = t.style.height,
            e || n ? r(e) && r(n) ? {
                w: parseInt(e, 10),
                h: parseInt(n, 10)
            }: null: (e = t.width, n = t.height, e && n ? {
                w: parseInt(e, 10),
                h: parseInt(n, 10)
            }: null)
        },
        setImageSize: function(t, e) {
            var n, r;
            e && (n = t.style.width, r = t.style.height, (n || r) && (t.style.width = e.w + "px", t.style.height = e.h + "px", t.removeAttribute("data-mce-style")), n = t.width, r = t.height, (n || r) && (t.setAttribute("width", e.w), t.setAttribute("height", e.h)))
        },
        getNaturalImageSize: function(t) {
            return {
                w: t.naturalWidth,
                h: t.naturalHeight
            }
        }
    },
    Lt = (At = "function",
    function(t) {
        return function(t) {
            if (null === t) return "null";
            var e = typeof t;
            return "object" === e && Array.prototype.isPrototypeOf(t) ? "array": "object" === e && String.prototype.isPrototypeOf(t) ? "string": e
        } (t) === At
    }),
    Pt = function(t, e) {
        for (var n = 0,
        r = t.length; n < r; n++) {
            var o = t[n];
            if (e(o, n, t)) return I.some(o)
        }
        return I.none()
    };
    Array.prototype.slice;
    function Bt() {
        return new(S.getOrDie("XMLHttpRequest"))
    }
    Lt(Array.from) && Array.from;
    var Ht = function(t) {
        return null !== t && t !== undefined
    },
    Mt = function(t, e) {
        var n;
        return n = e.reduce(function(t, e) {
            return Ht(t) ? t[e] : undefined
        },
        t),
        Ht(n) ? n: null
    },
    Nt = function(e) {
        return new mt(function(n) {
            var t = new O;
            t.onload = function(t) {
                var e = t.target;
                n(e.result)
            },
            t.readAsText(e)
        })
    },
    Ut = function(e, r, o) {
        return new mt(function(t) {
            var n; (n = new Bt).onreadystatechange = function() {
                4 === n.readyState && t({
                    status: n.status,
                    blob: this.response
                })
            },
            n.open("GET", e, !0),
            n.withCredentials = o,
            $.each(r,
            function(t, e) {
                n.setRequestHeader(e, t)
            }),
            n.responseType = "blob",
            n.send()
        })
    },
    jt = function(t) {
        var e;
        try {
            e = JSON.parse(t)
        } catch(n) {}
        return e
    },
    Gt = [{
        code: 404,
        message: "Could not find Image Proxy"
    },
    {
        code: 403,
        message: "Rejected request"
    },
    {
        code: 0,
        message: "Incorrect Image Proxy URL"
    }],
    zt = [{
        type: "key_missing",
        message: "The request did not include an api key."
    },
    {
        type: "key_not_found",
        message: "The provided api key could not be found."
    },
    {
        type: "domain_not_trusted",
        message: "The api key is not valid for the request origins."
    }],
    Vt = function(e) {
        return "ImageProxy HTTP error: " + Pt(Gt,
        function(t) {
            return e === t.code
        }).fold(s("Unknown ImageProxy error"),
        function(t) {
            return t.message
        })
    },
    Wt = function(t) {
        var e = Vt(t);
        return mt.reject(e)
    },
    qt = function(e) {
        return Pt(zt,
        function(t) {
            return t.type === e
        }).fold(s("Unknown service error"),
        function(t) {
            return t.message
        })
    },
    Yt = function(t, e) {
        return Nt(e).then(function(t) {
            var e, n, r = (e = jt(t), "ImageProxy Service error: " + ((n = Mt(e, ["error", "type"])) ? qt(n) : "Invalid JSON in service error message"));
            return mt.reject(r)
        })
    },
    Xt = function(t, e) {
        return 400 === (n = t) || 403 === n || 500 === n ? Yt(0, e) : Wt(t);
        var n
    }, $t = Wt,
    Jt = function(t, e) {
        var n, r, o, i = {
            "Content-Type": "application/json;charset=UTF-8",
            "tiny-api-key": e
        };
        return Ut((n = t, r = e, o = -1 === n.indexOf("?") ? "?": "&", /[?&]apiKey=/.test(n) || !r ? n: n + o + "apiKey=" + encodeURIComponent(r)), i, !1).then(function(t) {
            return t.status < 200 || 300 <= t.status ? Xt(t.status, t.blob) : mt.resolve(t.blob)
        })
    },
    Kt = function(t, e, n) {
        return e ? Jt(t, e) : Ut(t, {},
        n).then(function(t) {
            return t.status < 200 || 300 <= t.status ? $t(t.status) : mt.resolve(t.blob)
        })
    },
    Zt = 0,
    Qt = function(t, e) {
        t.notificationManager.open({
            text: e,
            type: "error"
        })
    },
    te = function(t) {
        return t.selection.getNode()
    },
    ee = function(t, e) {
        var n = e.src;
        return 0 === n.indexOf("data:") || 0 === n.indexOf("blob:") || new yt(n).host === t.documentBaseURI.host
    },
    ne = function(t, e) {
        return - 1 !== $.inArray(t.getParam("imagetools_cors_hosts", [], "string[]"), new yt(e.src).host)
    },
    re = function(t, e) {
        var n, r, o, i, a = e.src;
        return ne(t, e) ? Kt(e.src, null, (r = t, o = e, -1 !== $.inArray(r.getParam("imagetools_credentials_hosts", [], "string[]"), new yt(o.src).host))) : ee(t, e) ? P(e) : (a = t.getParam("imagetools_proxy"), a += ( - 1 === a.indexOf("?") ? "?": "&") + "url=" + encodeURIComponent(e.src), n = (i = t).getParam("api_key", i.getParam("imagetools_api_key", "", "string"), "string"), Kt(a, n, !1))
    },
    oe = function(t) {
        var e;
        return (e = t.editorUpload.blobCache.getByUri(te(t).src)) ? mt.resolve(e.blob()) : re(t, te(t))
    },
    ie = function(t) {
        clearTimeout(t.get())
    },
    ae = function(c, l, s, f, d) {
        return l.toBlob().then(function(t) {
            var e, n, r, o, i, a, u;
            return r = c.editorUpload.blobCache,
            e = (i = te(c)).src,
            c.getParam("images_reuse_filename", !1, "boolean") && ((o = r.getByUri(e)) ? (e = o.uri(), n = o.name()) : (a = c, n = (u = e.match(/\/([^\/\?]+)?\.(?:jpeg|jpg|png|gif)(?:\?|$)/i)) ? a.dom.encode(u[1]) : null)),
            o = r.create({
                id: "imagetools" + Zt++,
                blob: t,
                base64: l.toBase64(),
                uri: e,
                name: n
            }),
            r.add(o),
            c.undoManager.transact(function() {
                c.$(i).on("load",
                function t() {
                    var e, n, r;
                    c.$(i).off("load", t),
                    c.nodeChanged(),
                    s ? c.editorUpload.uploadImagesAuto() : (ie(f), e = c, n = f, r = gt.setEditorTimeout(e,
                    function() {
                        e.editorUpload.uploadImagesAuto()
                    },
                    e.getParam("images_upload_timeout", 3e4, "number")), n.set(r))
                }),
                d && c.$(i).attr({
                    width: d.w,
                    height: d.h
                }),
                c.$(i).attr({
                    src: o.blobUri()
                }).removeAttr("data-mce-src")
            }),
            o
        })
    },
    ue = function(e, n, t, r) {
        return function() {
            return e._scanForImages().then(f(oe, e)).then(dt.blobToImageResult).then(t).then(function(t) {
                return ae(e, t, !1, n, r)
            },
            function(t) {
                Qt(e, t)
            })
        }
    },
    ce = function(n, r, o) {
        return function() {
            var t = kt.getImageSize(te(n)),
            e = t ? {
                w: t.h,
                h: t.w
            }: null;
            return ue(n, r,
            function(t) {
                return st.rotate(t, o)
            },
            e)()
        }
    },
    le = function(t, e, n) {
        return function() {
            return ue(t, e,
            function(t) {
                return st.flip(t, n)
            })()
        }
    },
    se = function(e, r) {
        return function() {
            var o = te(e),
            i = kt.getNaturalImageSize(o),
            n = function(r) {
                return new mt(function(n) {
                    L(r).then(function(t) {
                        var e = kt.getNaturalImageSize(t);
                        i.w === e.w && i.h === e.h || kt.getImageSize(o) && kt.setImageSize(o, e),
                        pt.revokeObjectURL(t.src),
                        n(r)
                    })
                })
            };
            oe(e).then(dt.blobToImageResult).then(f(function(e, t) {
                return _t.edit(e, t).then(n).then(dt.blobToImageResult).then(function(t) {
                    return ae(e, t, !0, r)
                },
                function() {})
            },
            e),
            function(t) {
                Qt(e, t)
            })
        }
    },
    fe = function(t, e) {
        return t.dom.is(e, "img:not([data-mce-object],[data-mce-placeholder])") && (ee(t, e) || ne(t, e) || t.settings.imagetools_proxy)
    },
    de = ie,
    he = function(n, t) {
        $.each({
            mceImageRotateLeft: ce(n, t, -90),
            mceImageRotateRight: ce(n, t, 90),
            mceImageFlipVertical: le(n, t, "v"),
            mceImageFlipHorizontal: le(n, t, "h"),
            mceEditImage: se(n, t)
        },
        function(t, e) {
            n.addCommand(e, t)
        })
    },
    pe = function(n, r, o) {
        n.on("NodeChange",
        function(t) {
            var e = o.get();
            e && e.src !== t.element.src && (de(r), n.editorUpload.uploadImagesAuto(), o.set(null)),
            fe(n, t.element) && o.set(t.element)
        })
    },
    ge = function(t) {
        t.addButton("rotateleft", {
            title: "Rotate counterclockwise",
            cmd: "mceImageRotateLeft"
        }),
        t.addButton("rotateright", {
            title: "Rotate clockwise",
            cmd: "mceImageRotateRight"
        }),
        t.addButton("flipv", {
            title: "Flip vertically",
            cmd: "mceImageFlipVertical"
        }),
        t.addButton("fliph", {
            title: "Flip horizontally",
            cmd: "mceImageFlipHorizontal"
        }),
        t.addButton("editimage", {
            title: "Edit image",
            cmd: "mceEditImage"
        }),
        t.addButton("imageoptions", {
            title: "Image options",
            icon: "options",
            cmd: "mceImage"
        })
    },
    me = function(t) {
        t.addContextToolbar(f(fe, t), t.getParam("imagetools_toolbar", "rotateleft rotateright | flipv fliph | crop editimage imageoptions"))
    };
    t.add("imagetools",
    function(t) {
        var e = r(0),
        n = r(null);
        he(t, e),
        ge(t),
        me(t),
        pe(t, e, n)
    })
} ();