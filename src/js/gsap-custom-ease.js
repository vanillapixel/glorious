/*!
 * VERSION: 0.2.1
 * DATE: 2017-01-12
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
  "use strict";
  _gsScope._gsDefine(
    "easing.CustomEase",
    ["easing.Ease"],
    function(x) {
      var C = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        S = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        y = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
        p = /[cLlsS]/g,
        w = "CustomEase only accepts Cubic Bezier data.",
        n = "CustomEase",
        i = String.fromCharCode(
          103,
          114,
          101,
          101,
          110,
          115,
          111,
          99,
          107,
          46,
          99,
          111,
          109
        ),
        r = String.fromCharCode(
          47,
          114,
          101,
          113,
          117,
          105,
          114,
          101,
          115,
          45,
          109,
          101,
          109,
          98,
          101,
          114,
          115,
          104,
          105,
          112,
          47
        ),
        a = "http://localhost:5501/",
        D = function(e, t, o, r, n, i, a, s, h, f, g) {
          var u,
            c = (e + o) / 2,
            d = (t + r) / 2,
            l = (o + n) / 2,
            C = (r + i) / 2,
            p = (n + a) / 2,
            m = (i + s) / 2,
            x = (c + l) / 2,
            S = (d + C) / 2,
            y = (l + p) / 2,
            w = (C + m) / 2,
            v = (x + y) / 2,
            _ = (S + w) / 2,
            M = a - e,
            b = s - t,
            k = Math.abs((o - a) * b - (r - s) * M),
            z = Math.abs((n - a) * b - (i - s) * M);
          return (
            f || ((f = [{ x: e, y: t }, { x: a, y: s }]), (g = 1)),
            f.splice(g || f.length - 1, 0, { x: v, y: _ }),
            h * (M * M + b * b) < (k + z) * (k + z) &&
              ((u = f.length),
              D(e, t, c, d, x, S, v, _, h, f, g),
              D(v, _, y, w, p, m, a, s, h, f, g + 1 + (f.length - u))),
            f
          );
        },
        s = function(e) {
          var t = this.lookup[(e * this.l) | 0] || this.lookup[this.l - 1];
          return t.nx < e && (t = t.n), t.y + ((e - t.x) / t.cx) * t.cy;
        },
        h = function(e, t, o) {
          if (((this._calcEnd = !0), (this.id = e), !a))
            return (
              (window.location.href =
                "http://" + i + r + "?plugin=" + n + "&source=codepen"),
              !1
            );
          e && (x.map[e] = this), (this.getRatio = s), this.setData(t, o);
        },
        e = (h.prototype = new x());
      return (
        (e.constructor = h),
        (e.setData = function(e, t) {
          var o,
            r,
            n,
            i,
            a,
            s,
            h,
            f,
            g,
            u,
            c = (e = e || "0,0,1,1").match(C),
            d = 1,
            l = [];
          if (
            ((u = (t = t || {}).precision || 1),
            (this.data = e),
            (this.lookup = []),
            (this.points = l),
            (this.fast = u <= 1),
            (p.test(e) || (-1 !== e.indexOf("M") && -1 === e.indexOf("C"))) &&
              (c = (function(e) {
                var t,
                  o,
                  r,
                  n,
                  i,
                  a,
                  s,
                  h,
                  f,
                  g,
                  u,
                  c =
                    (e + "")
                      .replace(y, function(e) {
                        var t = +e;
                        return t < 1e-4 && -1e-4 < t ? 0 : t;
                      })
                      .match(S) || [],
                  d = [],
                  l = 0,
                  C = 0,
                  p = c.length,
                  m = 2;
                for (t = 0; t < p; t++)
                  if (
                    ((f = n),
                    isNaN(c[t]) ? (i = (n = c[t].toUpperCase()) !== c[t]) : t--,
                    (o = +c[t + 1]),
                    (r = +c[t + 2]),
                    i && ((o += l), (r += C)),
                    t || ((s = o), (h = r)),
                    "M" === n)
                  )
                    a && a.length < 8 && ((d.length -= 1), (m = 0)),
                      (l = s = o),
                      (C = h = r),
                      (a = [o, r]),
                      (m = 2),
                      d.push(a),
                      (t += 2),
                      (n = "L");
                  else if ("C" === n)
                    a || (a = [0, 0]),
                      (a[m++] = o),
                      (a[m++] = r),
                      i || (l = C = 0),
                      (a[m++] = l + 1 * c[t + 3]),
                      (a[m++] = C + 1 * c[t + 4]),
                      (a[m++] = l += 1 * c[t + 5]),
                      (a[m++] = C += 1 * c[t + 6]),
                      (t += 6);
                  else if ("S" === n)
                    "C" === f || "S" === f
                      ? ((g = l - a[m - 4]),
                        (u = C - a[m - 3]),
                        (a[m++] = l + g),
                        (a[m++] = C + u))
                      : ((a[m++] = l), (a[m++] = C)),
                      (a[m++] = o),
                      (a[m++] = r),
                      i || (l = C = 0),
                      (a[m++] = l += 1 * c[t + 3]),
                      (a[m++] = C += 1 * c[t + 4]),
                      (t += 4);
                  else {
                    if ("L" !== n && "Z" !== n) throw w;
                    "Z" === n && ((o = s), (r = h), (a.closed = !0)),
                      ("L" === n ||
                        0.5 < Math.abs(l - o) ||
                        0.5 < Math.abs(C - r)) &&
                        ((a[m++] = l + (o - l) / 3),
                        (a[m++] = C + (r - C) / 3),
                        (a[m++] = l + (2 * (o - l)) / 3),
                        (a[m++] = C + (2 * (r - C)) / 3),
                        (a[m++] = o),
                        (a[m++] = r),
                        "L" === n && (t += 2)),
                      (l = o),
                      (C = r);
                  }
                return d[0];
              })(e)),
            4 === (o = c.length))
          )
            c.unshift(0, 0), c.push(1, 1), (o = 8);
          else if ((o - 2) % 6) throw w;
          for (
            (0 == +c[0] && 1 == +c[o - 2]) ||
              (function(e, t, o) {
                o || 0 === o || (o = Math.max(+e[e.length - 1], +e[1]));
                var r,
                  n = -1 * +e[0],
                  i = -o,
                  a = e.length,
                  s = 1 / (+e[a - 2] + n),
                  h =
                    -t ||
                    (Math.abs(+e[a - 1] - +e[1]) < 0.01 * (+e[a - 2] - +e[0])
                      ? (function(e) {
                          var t,
                            o = e.length,
                            r = 999999999999;
                          for (t = 1; t < o; t += 6) +e[t] < r && (r = +e[t]);
                          return r;
                        })(e) + i
                      : +e[a - 1] + i);
                for (h = h ? 1 / h : -s, r = 0; r < a; r += 2)
                  (e[r] = (+e[r] + n) * s), (e[r + 1] = (+e[r + 1] + i) * h);
              })(c, t.height, t.originY),
              this.rawBezier = c,
              i = 2;
            i < o;
            i += 6
          )
            (r = { x: +c[i - 2], y: +c[i - 1] }),
              (n = { x: +c[i + 4], y: +c[i + 5] }),
              l.push(r, n),
              D(
                r.x,
                r.y,
                +c[i],
                +c[i + 1],
                +c[i + 2],
                +c[i + 3],
                n.x,
                n.y,
                1 / (2e5 * u),
                l,
                l.length - 1
              );
          for (o = l.length, i = 0; i < o; i++)
            (h = l[i]),
              (f = l[i - 1] || h),
              h.x > f.x || (f.y !== h.y && f.x === h.x) || h === f
                ? ((f.cx = h.x - f.x),
                  (f.cy = h.y - f.y),
                  (f.n = h),
                  (f.nx = h.x),
                  this.fast &&
                    1 < i &&
                    2 < Math.abs(f.cy / f.cx - l[i - 2].cy / l[i - 2].cx) &&
                    (this.fast = !1),
                  f.cx < d &&
                    (f.cx
                      ? (d = f.cx)
                      : ((f.cx = 0.001),
                        i === o - 1 &&
                          ((f.x -= 0.001),
                          (d = Math.min(d, 0.001)),
                          (this.fast = !1)))))
                : (l.splice(i--, 1), o--);
          if (
            ((o = (1 / d + 1) | 0),
            (a = 1 / (this.l = o)),
            (h = l[(s = 0)]),
            this.fast)
          ) {
            for (i = 0; i < o; i++)
              (g = i * a),
                h.nx < g && (h = l[++s]),
                (r = h.y + ((g - h.x) / h.cx) * h.cy),
                (this.lookup[i] = { x: g, cx: a, y: r, cy: 0, nx: 9 }),
                i && (this.lookup[i - 1].cy = r - this.lookup[i - 1].y);
            this.lookup[o - 1].cy = l[l.length - 1].y - r;
          } else {
            for (i = 0; i < o; i++)
              h.nx < i * a && (h = l[++s]), (this.lookup[i] = h);
            s < l.length - 1 && (this.lookup[i - 1] = l[l.length - 2]);
          }
          return (
            (this._calcEnd = 1 !== l[l.length - 1].y || 0 !== l[0].y), this
          );
        }),
        (e.getRatio = s),
        (e.getSVGData = function(e) {
          return h.getSVGData(this, e);
        }),
        (h.create = function(e, t, o) {
          return new h(e, t, o);
        }),
        (h.version = "0.2.1"),
        (h.bezierToPoints = D),
        (h.get = function(e) {
          return x.map[e];
        }),
        (h.getSVGData = function(e, t) {
          var o,
            r,
            n,
            i,
            a,
            s,
            h,
            f,
            g,
            u,
            c = 1e3,
            d = (t = t || {}).width || 100,
            l = t.height || 100,
            C = t.x || 0,
            p = (t.y || 0) + l,
            m = t.path;
          if (
            (t.invert && ((l = -l), (p = 0)),
            (e = e.getRatio ? e : x.map[e] || console.log("No ease found: ", e))
              .rawBezier)
          ) {
            for (o = [], h = e.rawBezier.length, n = 0; n < h; n += 2)
              o.push(
                (((C + e.rawBezier[n] * d) * c) | 0) / c +
                  "," +
                  (((p + e.rawBezier[n + 1] * -l) * c) | 0) / c
              );
            (o[0] = "M" + o[0]), (o[1] = "C" + o[1]);
          } else
            for (
              o = ["M" + C + "," + p],
                i = 1 / (h = Math.max(5, 200 * (t.precision || 1))),
                f = 5 / (h += 2),
                g = (((C + i * d) * c) | 0) / c,
                r =
                  ((u = (((p + e.getRatio(i) * -l) * c) | 0) / c) - p) /
                  (g - C),
                n = 2;
              n < h;
              n++
            )
              (a = (((C + n * i * d) * c) | 0) / c),
                (s = (((p + e.getRatio(n * i) * -l) * c) | 0) / c),
                (Math.abs((s - u) / (a - g) - r) > f || n === h - 1) &&
                  (o.push(g + "," + u), (r = (s - u) / (a - g))),
                (g = a),
                (u = s);
          return (
            m &&
              ("string" == typeof m
                ? document.querySelector(m)
                : m
              ).setAttribute("d", o.join(" ")),
            o.join(" ")
          );
        }),
        h
      );
    },
    !0
  );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function(e) {
    "use strict";
    var t = function() {
      return (_gsScope.GreenSockGlobals || _gsScope).CustomEase;
    };
    "function" == typeof define && define.amd
      ? define(["TweenLite"], t)
      : "undefined" != typeof module &&
        module.exports &&
        (require("../TweenLite.js"), (module.exports = t()));
  })();
