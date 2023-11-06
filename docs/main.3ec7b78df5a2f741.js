'use strict';
(self.webpackChunkmate_fe = self.webpackChunkmate_fe || []).push([
  [179],
  {
    220: () => {
      function ue(e) {
        return 'function' == typeof e;
      }
      function As(e) {
        const t = e(i => {
          Error.call(i), (i.stack = new Error().stack);
        });
        return (
          (t.prototype = Object.create(Error.prototype)),
          (t.prototype.constructor = t),
          t
        );
      }
      const Pl = As(
        e =>
          function (t) {
            e(this),
              (this.message = t
                ? `${t.length} errors occurred during unsubscription:\n${t
                    .map((i, r) => `${r + 1}) ${i.toString()}`)
                    .join('\n  ')}`
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = t);
          }
      );
      function io(e, n) {
        if (e) {
          const t = e.indexOf(n);
          0 <= t && e.splice(t, 1);
        }
      }
      class Pt {
        constructor(n) {
          (this.initialTeardown = n),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let n;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: t } = this;
            if (t)
              if (((this._parentage = null), Array.isArray(t)))
                for (const o of t) o.remove(this);
              else t.remove(this);
            const { initialTeardown: i } = this;
            if (ue(i))
              try {
                i();
              } catch (o) {
                n = o instanceof Pl ? o.errors : [o];
              }
            const { _finalizers: r } = this;
            if (r) {
              this._finalizers = null;
              for (const o of r)
                try {
                  Y_(o);
                } catch (s) {
                  (n = n ?? []),
                    s instanceof Pl ? (n = [...n, ...s.errors]) : n.push(s);
                }
            }
            if (n) throw new Pl(n);
          }
        }
        add(n) {
          var t;
          if (n && n !== this)
            if (this.closed) Y_(n);
            else {
              if (n instanceof Pt) {
                if (n.closed || n._hasParent(this)) return;
                n._addParent(this);
              }
              (this._finalizers =
                null !== (t = this._finalizers) && void 0 !== t ? t : []).push(
                n
              );
            }
        }
        _hasParent(n) {
          const { _parentage: t } = this;
          return t === n || (Array.isArray(t) && t.includes(n));
        }
        _addParent(n) {
          const { _parentage: t } = this;
          this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n;
        }
        _removeParent(n) {
          const { _parentage: t } = this;
          t === n ? (this._parentage = null) : Array.isArray(t) && io(t, n);
        }
        remove(n) {
          const { _finalizers: t } = this;
          t && io(t, n), n instanceof Pt && n._removeParent(this);
        }
      }
      Pt.EMPTY = (() => {
        const e = new Pt();
        return (e.closed = !0), e;
      })();
      const q_ = Pt.EMPTY;
      function Z_(e) {
        return (
          e instanceof Pt ||
          (e && 'closed' in e && ue(e.remove) && ue(e.add) && ue(e.unsubscribe))
        );
      }
      function Y_(e) {
        ue(e) ? e() : e.unsubscribe();
      }
      const hr = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Ll = {
          setTimeout(e, n, ...t) {
            const { delegate: i } = Ll;
            return i?.setTimeout
              ? i.setTimeout(e, n, ...t)
              : setTimeout(e, n, ...t);
          },
          clearTimeout(e) {
            const { delegate: n } = Ll;
            return (n?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function K_(e) {
        Ll.setTimeout(() => {
          const { onUnhandledError: n } = hr;
          if (!n) throw e;
          n(e);
        });
      }
      function Ns() {}
      const BI = ef('C', void 0, void 0);
      function ef(e, n, t) {
        return { kind: e, value: n, error: t };
      }
      let pr = null;
      function Vl(e) {
        if (hr.useDeprecatedSynchronousErrorHandling) {
          const n = !pr;
          if ((n && (pr = { errorThrown: !1, error: null }), e(), n)) {
            const { errorThrown: t, error: i } = pr;
            if (((pr = null), t)) throw i;
          }
        } else e();
      }
      class tf extends Pt {
        constructor(n) {
          super(),
            (this.isStopped = !1),
            n
              ? ((this.destination = n), Z_(n) && n.add(this))
              : (this.destination = WI);
        }
        static create(n, t, i) {
          return new Os(n, t, i);
        }
        next(n) {
          this.isStopped
            ? rf(
                (function HI(e) {
                  return ef('N', e, void 0);
                })(n),
                this
              )
            : this._next(n);
        }
        error(n) {
          this.isStopped
            ? rf(
                (function jI(e) {
                  return ef('E', void 0, e);
                })(n),
                this
              )
            : ((this.isStopped = !0), this._error(n));
        }
        complete() {
          this.isStopped
            ? rf(BI, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(n) {
          this.destination.next(n);
        }
        _error(n) {
          try {
            this.destination.error(n);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const $I = Function.prototype.bind;
      function nf(e, n) {
        return $I.call(e, n);
      }
      class zI {
        constructor(n) {
          this.partialObserver = n;
        }
        next(n) {
          const { partialObserver: t } = this;
          if (t.next)
            try {
              t.next(n);
            } catch (i) {
              Bl(i);
            }
        }
        error(n) {
          const { partialObserver: t } = this;
          if (t.error)
            try {
              t.error(n);
            } catch (i) {
              Bl(i);
            }
          else Bl(n);
        }
        complete() {
          const { partialObserver: n } = this;
          if (n.complete)
            try {
              n.complete();
            } catch (t) {
              Bl(t);
            }
        }
      }
      class Os extends tf {
        constructor(n, t, i) {
          let r;
          if ((super(), ue(n) || !n))
            r = {
              next: n ?? void 0,
              error: t ?? void 0,
              complete: i ?? void 0,
            };
          else {
            let o;
            this && hr.useDeprecatedNextContext
              ? ((o = Object.create(n)),
                (o.unsubscribe = () => this.unsubscribe()),
                (r = {
                  next: n.next && nf(n.next, o),
                  error: n.error && nf(n.error, o),
                  complete: n.complete && nf(n.complete, o),
                }))
              : (r = n);
          }
          this.destination = new zI(r);
        }
      }
      function Bl(e) {
        hr.useDeprecatedSynchronousErrorHandling
          ? (function UI(e) {
              hr.useDeprecatedSynchronousErrorHandling &&
                pr &&
                ((pr.errorThrown = !0), (pr.error = e));
            })(e)
          : K_(e);
      }
      function rf(e, n) {
        const { onStoppedNotification: t } = hr;
        t && Ll.setTimeout(() => t(e, n));
      }
      const WI = {
          closed: !0,
          next: Ns,
          error: function GI(e) {
            throw e;
          },
          complete: Ns,
        },
        sf =
          ('function' == typeof Symbol && Symbol.observable) || '@@observable';
      function bi(e) {
        return e;
      }
      function Q_(e) {
        return 0 === e.length
          ? bi
          : 1 === e.length
          ? e[0]
          : function (t) {
              return e.reduce((i, r) => r(i), t);
            };
      }
      let Ae = (() => {
        class e {
          constructor(t) {
            t && (this._subscribe = t);
          }
          lift(t) {
            const i = new e();
            return (i.source = this), (i.operator = t), i;
          }
          subscribe(t, i, r) {
            const o = (function YI(e) {
              return (
                (e && e instanceof tf) ||
                ((function ZI(e) {
                  return e && ue(e.next) && ue(e.error) && ue(e.complete);
                })(e) &&
                  Z_(e))
              );
            })(t)
              ? t
              : new Os(t, i, r);
            return (
              Vl(() => {
                const { operator: s, source: a } = this;
                o.add(
                  s
                    ? s.call(o, a)
                    : a
                    ? this._subscribe(o)
                    : this._trySubscribe(o)
                );
              }),
              o
            );
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (i) {
              t.error(i);
            }
          }
          forEach(t, i) {
            return new (i = J_(i))((r, o) => {
              const s = new Os({
                next: a => {
                  try {
                    t(a);
                  } catch (l) {
                    o(l), s.unsubscribe();
                  }
                },
                error: o,
                complete: r,
              });
              this.subscribe(s);
            });
          }
          _subscribe(t) {
            var i;
            return null === (i = this.source) || void 0 === i
              ? void 0
              : i.subscribe(t);
          }
          [sf]() {
            return this;
          }
          pipe(...t) {
            return Q_(t)(this);
          }
          toPromise(t) {
            return new (t = J_(t))((i, r) => {
              let o;
              this.subscribe(
                s => (o = s),
                s => r(s),
                () => i(o)
              );
            });
          }
        }
        return (e.create = n => new e(n)), e;
      })();
      function J_(e) {
        var n;
        return null !== (n = e ?? hr.Promise) && void 0 !== n ? n : Promise;
      }
      const KI = As(
        e =>
          function () {
            e(this),
              (this.name = 'ObjectUnsubscribedError'),
              (this.message = 'object unsubscribed');
          }
      );
      let Ne = (() => {
        class e extends Ae {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(t) {
            const i = new X_(this, this);
            return (i.operator = t), i;
          }
          _throwIfClosed() {
            if (this.closed) throw new KI();
          }
          next(t) {
            Vl(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const i of this.currentObservers) i.next(t);
              }
            });
          }
          error(t) {
            Vl(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = t);
                const { observers: i } = this;
                for (; i.length; ) i.shift().error(t);
              }
            });
          }
          complete() {
            Vl(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: t } = this;
                for (; t.length; ) t.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var t;
            return (
              (null === (t = this.observers) || void 0 === t
                ? void 0
                : t.length) > 0
            );
          }
          _trySubscribe(t) {
            return this._throwIfClosed(), super._trySubscribe(t);
          }
          _subscribe(t) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(t),
              this._innerSubscribe(t)
            );
          }
          _innerSubscribe(t) {
            const { hasError: i, isStopped: r, observers: o } = this;
            return i || r
              ? q_
              : ((this.currentObservers = null),
                o.push(t),
                new Pt(() => {
                  (this.currentObservers = null), io(o, t);
                }));
          }
          _checkFinalizedStatuses(t) {
            const { hasError: i, thrownError: r, isStopped: o } = this;
            i ? t.error(r) : o && t.complete();
          }
          asObservable() {
            const t = new Ae();
            return (t.source = this), t;
          }
        }
        return (e.create = (n, t) => new X_(n, t)), e;
      })();
      class X_ extends Ne {
        constructor(n, t) {
          super(), (this.destination = n), (this.source = t);
        }
        next(n) {
          var t, i;
          null ===
            (i =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.next) ||
            void 0 === i ||
            i.call(t, n);
        }
        error(n) {
          var t, i;
          null ===
            (i =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.error) ||
            void 0 === i ||
            i.call(t, n);
        }
        complete() {
          var n, t;
          null ===
            (t =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.complete) ||
            void 0 === t ||
            t.call(n);
        }
        _subscribe(n) {
          var t, i;
          return null !==
            (i =
              null === (t = this.source) || void 0 === t
                ? void 0
                : t.subscribe(n)) && void 0 !== i
            ? i
            : q_;
        }
      }
      function ev(e) {
        return ue(e?.lift);
      }
      function Ye(e) {
        return n => {
          if (ev(n))
            return n.lift(function (t) {
              try {
                return e(t, this);
              } catch (i) {
                this.error(i);
              }
            });
          throw new TypeError('Unable to lift unknown Observable type');
        };
      }
      function Fe(e, n, t, i, r) {
        return new QI(e, n, t, i, r);
      }
      class QI extends tf {
        constructor(n, t, i, r, o, s) {
          super(n),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = t
              ? function (a) {
                  try {
                    t(a);
                  } catch (l) {
                    n.error(l);
                  }
                }
              : super._next),
            (this._error = r
              ? function (a) {
                  try {
                    r(a);
                  } catch (l) {
                    n.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = i
              ? function () {
                  try {
                    i();
                  } catch (a) {
                    n.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var n;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: t } = this;
            super.unsubscribe(),
              !t &&
                (null === (n = this.onFinalize) ||
                  void 0 === n ||
                  n.call(this));
          }
        }
      }
      function ie(e, n) {
        return Ye((t, i) => {
          let r = 0;
          t.subscribe(
            Fe(i, o => {
              i.next(e.call(n, o, r++));
            })
          );
        });
      }
      function Hi(e) {
        return this instanceof Hi ? ((this.v = e), this) : new Hi(e);
      }
      function rv(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.');
        var t,
          n = e[Symbol.asyncIterator];
        return n
          ? n.call(e)
          : ((e = (function df(e) {
              var n = 'function' == typeof Symbol && Symbol.iterator,
                t = n && e[n],
                i = 0;
              if (t) return t.call(e);
              if (e && 'number' == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && i >= e.length && (e = void 0),
                      { value: e && e[i++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                n
                  ? 'Object is not iterable.'
                  : 'Symbol.iterator is not defined.'
              );
            })(e)),
            (t = {}),
            i('next'),
            i('throw'),
            i('return'),
            (t[Symbol.asyncIterator] = function () {
              return this;
            }),
            t);
        function i(o) {
          t[o] =
            e[o] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function r(o, s, a, l) {
                  Promise.resolve(l).then(function (c) {
                    o({ value: c, done: a });
                  }, s);
                })(a, l, (s = e[o](s)).done, s.value);
              });
            };
        }
      }
      'function' == typeof SuppressedError && SuppressedError;
      const uf = e =>
        e && 'number' == typeof e.length && 'function' != typeof e;
      function ov(e) {
        return ue(e?.then);
      }
      function sv(e) {
        return ue(e[sf]);
      }
      function av(e) {
        return Symbol.asyncIterator && ue(e?.[Symbol.asyncIterator]);
      }
      function lv(e) {
        return new TypeError(
          `You provided ${
            null !== e && 'object' == typeof e ? 'an invalid object' : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const cv = (function yA() {
        return 'function' == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : '@@iterator';
      })();
      function dv(e) {
        return ue(e?.[cv]);
      }
      function uv(e) {
        return (function iv(e, n, t) {
          if (!Symbol.asyncIterator)
            throw new TypeError('Symbol.asyncIterator is not defined.');
          var r,
            i = t.apply(e, n || []),
            o = [];
          return (
            (r = {}),
            s('next'),
            s('throw'),
            s('return'),
            (r[Symbol.asyncIterator] = function () {
              return this;
            }),
            r
          );
          function s(f) {
            i[f] &&
              (r[f] = function (h) {
                return new Promise(function (p, m) {
                  o.push([f, h, p, m]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function l(f) {
                f.value instanceof Hi
                  ? Promise.resolve(f.value.v).then(c, d)
                  : u(o[0][2], f);
              })(i[f](h));
            } catch (p) {
              u(o[0][3], p);
            }
          }
          function c(f) {
            a('next', f);
          }
          function d(f) {
            a('throw', f);
          }
          function u(f, h) {
            f(h), o.shift(), o.length && a(o[0][0], o[0][1]);
          }
        })(this, arguments, function* () {
          const t = e.getReader();
          try {
            for (;;) {
              const { value: i, done: r } = yield Hi(t.read());
              if (r) return yield Hi(void 0);
              yield yield Hi(i);
            }
          } finally {
            t.releaseLock();
          }
        });
      }
      function fv(e) {
        return ue(e?.getReader);
      }
      function at(e) {
        if (e instanceof Ae) return e;
        if (null != e) {
          if (sv(e))
            return (function bA(e) {
              return new Ae(n => {
                const t = e[sf]();
                if (ue(t.subscribe)) return t.subscribe(n);
                throw new TypeError(
                  'Provided object does not correctly implement Symbol.observable'
                );
              });
            })(e);
          if (uf(e))
            return (function DA(e) {
              return new Ae(n => {
                for (let t = 0; t < e.length && !n.closed; t++) n.next(e[t]);
                n.complete();
              });
            })(e);
          if (ov(e))
            return (function wA(e) {
              return new Ae(n => {
                e.then(
                  t => {
                    n.closed || (n.next(t), n.complete());
                  },
                  t => n.error(t)
                ).then(null, K_);
              });
            })(e);
          if (av(e)) return hv(e);
          if (dv(e))
            return (function CA(e) {
              return new Ae(n => {
                for (const t of e) if ((n.next(t), n.closed)) return;
                n.complete();
              });
            })(e);
          if (fv(e))
            return (function EA(e) {
              return hv(uv(e));
            })(e);
        }
        throw lv(e);
      }
      function hv(e) {
        return new Ae(n => {
          (function SA(e, n) {
            var t, i, r, o;
            return (function tv(e, n, t, i) {
              return new (t || (t = Promise))(function (o, s) {
                function a(d) {
                  try {
                    c(i.next(d));
                  } catch (u) {
                    s(u);
                  }
                }
                function l(d) {
                  try {
                    c(i.throw(d));
                  } catch (u) {
                    s(u);
                  }
                }
                function c(d) {
                  d.done
                    ? o(d.value)
                    : (function r(o) {
                        return o instanceof t
                          ? o
                          : new t(function (s) {
                              s(o);
                            });
                      })(d.value).then(a, l);
                }
                c((i = i.apply(e, n || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (t = rv(e); !(i = yield t.next()).done; )
                  if ((n.next(i.value), n.closed)) return;
              } catch (s) {
                r = { error: s };
              } finally {
                try {
                  i && !i.done && (o = t.return) && (yield o.call(t));
                } finally {
                  if (r) throw r.error;
                }
              }
              n.complete();
            });
          })(e, n).catch(t => n.error(t));
        });
      }
      function Di(e, n, t, i = 0, r = !1) {
        const o = n.schedule(function () {
          t(), r ? e.add(this.schedule(null, i)) : this.unsubscribe();
        }, i);
        if ((e.add(o), !r)) return o;
      }
      function lt(e, n, t = 1 / 0) {
        return ue(n)
          ? lt((i, r) => ie((o, s) => n(i, o, r, s))(at(e(i, r))), t)
          : ('number' == typeof n && (t = n),
            Ye((i, r) =>
              (function xA(e, n, t, i, r, o, s, a) {
                const l = [];
                let c = 0,
                  d = 0,
                  u = !1;
                const f = () => {
                    u && !l.length && !c && n.complete();
                  },
                  h = m => (c < i ? p(m) : l.push(m)),
                  p = m => {
                    o && n.next(m), c++;
                    let g = !1;
                    at(t(m, d++)).subscribe(
                      Fe(
                        n,
                        y => {
                          r?.(y), o ? h(y) : n.next(y);
                        },
                        () => {
                          g = !0;
                        },
                        void 0,
                        () => {
                          if (g)
                            try {
                              for (c--; l.length && c < i; ) {
                                const y = l.shift();
                                s ? Di(n, s, () => p(y)) : p(y);
                              }
                              f();
                            } catch (y) {
                              n.error(y);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Fe(n, h, () => {
                      (u = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(i, r, e, t)
            ));
      }
      function ro(e = 1 / 0) {
        return lt(bi, e);
      }
      const wn = new Ae(e => e.complete());
      function pv(e) {
        return e && ue(e.schedule);
      }
      function ff(e) {
        return e[e.length - 1];
      }
      function jl(e) {
        return ue(ff(e)) ? e.pop() : void 0;
      }
      function Rs(e) {
        return pv(ff(e)) ? e.pop() : void 0;
      }
      function mv(e, n = 0) {
        return Ye((t, i) => {
          t.subscribe(
            Fe(
              i,
              r => Di(i, e, () => i.next(r), n),
              () => Di(i, e, () => i.complete(), n),
              r => Di(i, e, () => i.error(r), n)
            )
          );
        });
      }
      function gv(e, n = 0) {
        return Ye((t, i) => {
          i.add(e.schedule(() => t.subscribe(i), n));
        });
      }
      function _v(e, n) {
        if (!e) throw new Error('Iterable cannot be null');
        return new Ae(t => {
          Di(t, n, () => {
            const i = e[Symbol.asyncIterator]();
            Di(
              t,
              n,
              () => {
                i.next().then(r => {
                  r.done ? t.complete() : t.next(r.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function ct(e, n) {
        return n
          ? (function FA(e, n) {
              if (null != e) {
                if (sv(e))
                  return (function IA(e, n) {
                    return at(e).pipe(gv(n), mv(n));
                  })(e, n);
                if (uf(e))
                  return (function NA(e, n) {
                    return new Ae(t => {
                      let i = 0;
                      return n.schedule(function () {
                        i === e.length
                          ? t.complete()
                          : (t.next(e[i++]), t.closed || this.schedule());
                      });
                    });
                  })(e, n);
                if (ov(e))
                  return (function AA(e, n) {
                    return at(e).pipe(gv(n), mv(n));
                  })(e, n);
                if (av(e)) return _v(e, n);
                if (dv(e))
                  return (function OA(e, n) {
                    return new Ae(t => {
                      let i;
                      return (
                        Di(t, n, () => {
                          (i = e[cv]()),
                            Di(
                              t,
                              n,
                              () => {
                                let r, o;
                                try {
                                  ({ value: r, done: o } = i.next());
                                } catch (s) {
                                  return void t.error(s);
                                }
                                o ? t.complete() : t.next(r);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ue(i?.return) && i.return()
                      );
                    });
                  })(e, n);
                if (fv(e))
                  return (function RA(e, n) {
                    return _v(uv(e), n);
                  })(e, n);
              }
              throw lv(e);
            })(e, n)
          : at(e);
      }
      class Nt extends Ne {
        constructor(n) {
          super(), (this._value = n);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(n) {
          const t = super._subscribe(n);
          return !t.closed && n.next(this._value), t;
        }
        getValue() {
          const { hasError: n, thrownError: t, _value: i } = this;
          if (n) throw t;
          return this._throwIfClosed(), i;
        }
        next(n) {
          super.next((this._value = n));
        }
      }
      function G(...e) {
        return ct(e, Rs(e));
      }
      function yv(e = {}) {
        const {
          connector: n = () => new Ne(),
          resetOnError: t = !0,
          resetOnComplete: i = !0,
          resetOnRefCountZero: r = !0,
        } = e;
        return o => {
          let s,
            a,
            l,
            c = 0,
            d = !1,
            u = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (s = l = void 0), (d = u = !1);
            },
            p = () => {
              const m = s;
              h(), m?.unsubscribe();
            };
          return Ye((m, g) => {
            c++, !u && !d && f();
            const y = (l = l ?? n());
            g.add(() => {
              c--, 0 === c && !u && !d && (a = hf(p, r));
            }),
              y.subscribe(g),
              !s &&
                c > 0 &&
                ((s = new Os({
                  next: _ => y.next(_),
                  error: _ => {
                    (u = !0), f(), (a = hf(h, t, _)), y.error(_);
                  },
                  complete: () => {
                    (d = !0), f(), (a = hf(h, i)), y.complete();
                  },
                })),
                at(m).subscribe(s));
          })(o);
        };
      }
      function hf(e, n, ...t) {
        if (!0 === n) return void e();
        if (!1 === n) return;
        const i = new Os({
          next: () => {
            i.unsubscribe(), e();
          },
        });
        return at(n(...t)).subscribe(i);
      }
      function Cn(e, n) {
        return Ye((t, i) => {
          let r = null,
            o = 0,
            s = !1;
          const a = () => s && !r && i.complete();
          t.subscribe(
            Fe(
              i,
              l => {
                r?.unsubscribe();
                let c = 0;
                const d = o++;
                at(e(l, d)).subscribe(
                  (r = Fe(
                    i,
                    u => i.next(n ? n(l, u, d, c++) : u),
                    () => {
                      (r = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function kA(e, n) {
        return e === n;
      }
      function xe(e) {
        for (let n in e) if (e[n] === xe) return n;
        throw Error('Could not find renamed property on target object.');
      }
      function Hl(e, n) {
        for (const t in n)
          n.hasOwnProperty(t) && !e.hasOwnProperty(t) && (e[t] = n[t]);
      }
      function dt(e) {
        if ('string' == typeof e) return e;
        if (Array.isArray(e)) return '[' + e.map(dt).join(', ') + ']';
        if (null == e) return '' + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const n = e.toString();
        if (null == n) return '' + n;
        const t = n.indexOf('\n');
        return -1 === t ? n : n.substring(0, t);
      }
      function pf(e, n) {
        return null == e || '' === e
          ? null === n
            ? ''
            : n
          : null == n || '' === n
          ? e
          : e + ' ' + n;
      }
      const PA = xe({ __forward_ref__: xe });
      function le(e) {
        return (
          (e.__forward_ref__ = le),
          (e.toString = function () {
            return dt(this());
          }),
          e
        );
      }
      function Y(e) {
        return mf(e) ? e() : e;
      }
      function mf(e) {
        return (
          'function' == typeof e &&
          e.hasOwnProperty(PA) &&
          e.__forward_ref__ === le
        );
      }
      function gf(e) {
        return e && !!e.ɵproviders;
      }
      const Dv = 'https://g.co/ng/security#xss';
      class b extends Error {
        constructor(n, t) {
          super(
            (function Ul(e, n) {
              return `NG0${Math.abs(e)}${n ? ': ' + n : ''}`;
            })(n, t)
          ),
            (this.code = n);
        }
      }
      function K(e) {
        return 'string' == typeof e ? e : null == e ? '' : String(e);
      }
      function _f(e, n) {
        throw new b(-201, !1);
      }
      function En(e, n) {
        null == e &&
          (function W(e, n, t, i) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == i ? '' : ` [Expected=> ${t} ${i} ${n} <=Actual]`)
            );
          })(n, e, null, '!=');
      }
      function N(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function oe(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function $l(e) {
        return wv(e, Gl) || wv(e, Cv);
      }
      function wv(e, n) {
        return e.hasOwnProperty(n) ? e[n] : null;
      }
      function zl(e) {
        return e && (e.hasOwnProperty(vf) || e.hasOwnProperty(zA))
          ? e[vf]
          : null;
      }
      const Gl = xe({ ɵprov: xe }),
        vf = xe({ ɵinj: xe }),
        Cv = xe({ ngInjectableDef: xe }),
        zA = xe({ ngInjectorDef: xe });
      var ce = (function (e) {
        return (
          (e[(e.Default = 0)] = 'Default'),
          (e[(e.Host = 1)] = 'Host'),
          (e[(e.Self = 2)] = 'Self'),
          (e[(e.SkipSelf = 4)] = 'SkipSelf'),
          (e[(e.Optional = 8)] = 'Optional'),
          e
        );
      })(ce || {});
      let yf;
      function Zt(e) {
        const n = yf;
        return (yf = e), n;
      }
      function Sv(e, n, t) {
        const i = $l(e);
        return i && 'root' == i.providedIn
          ? void 0 === i.value
            ? (i.value = i.factory())
            : i.value
          : t & ce.Optional
          ? null
          : void 0 !== n
          ? n
          : void _f(dt(e));
      }
      const ke = globalThis;
      class T {
        constructor(n, t) {
          (this._desc = n),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ɵprov = N({
                  token: this,
                  providedIn: t.providedIn || 'root',
                  factory: t.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const Fs = {},
        Ef = '__NG_DI_FLAG__',
        Wl = 'ngTempTokenPath',
        qA = /\n/gm,
        Tv = '__source';
      let oo;
      function Ui(e) {
        const n = oo;
        return (oo = e), n;
      }
      function KA(e, n = ce.Default) {
        if (void 0 === oo) throw new b(-203, !1);
        return null === oo
          ? Sv(e, void 0, n)
          : oo.get(e, n & ce.Optional ? null : void 0, n);
      }
      function x(e, n = ce.Default) {
        return (
          (function Ev() {
            return yf;
          })() || KA
        )(Y(e), n);
      }
      function I(e, n = ce.Default) {
        return x(e, ql(n));
      }
      function ql(e) {
        return typeof e > 'u' || 'number' == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function Sf(e) {
        const n = [];
        for (let t = 0; t < e.length; t++) {
          const i = Y(e[t]);
          if (Array.isArray(i)) {
            if (0 === i.length) throw new b(900, !1);
            let r,
              o = ce.Default;
            for (let s = 0; s < i.length; s++) {
              const a = i[s],
                l = QA(a);
              'number' == typeof l
                ? -1 === l
                  ? (r = a.token)
                  : (o |= l)
                : (r = a);
            }
            n.push(x(r, o));
          } else n.push(x(i));
        }
        return n;
      }
      function ks(e, n) {
        return (e[Ef] = n), (e.prototype[Ef] = n), e;
      }
      function QA(e) {
        return e[Ef];
      }
      function wi(e) {
        return { toString: e }.toString();
      }
      var Zl = (function (e) {
          return (
            (e[(e.OnPush = 0)] = 'OnPush'), (e[(e.Default = 1)] = 'Default'), e
          );
        })(Zl || {}),
        Sn = (function (e) {
          return (
            (e[(e.Emulated = 0)] = 'Emulated'),
            (e[(e.None = 2)] = 'None'),
            (e[(e.ShadowDom = 3)] = 'ShadowDom'),
            e
          );
        })(Sn || {});
      const ni = {},
        ge = [],
        Yl = xe({ ɵcmp: xe }),
        xf = xe({ ɵdir: xe }),
        Tf = xe({ ɵpipe: xe }),
        Iv = xe({ ɵmod: xe }),
        Ci = xe({ ɵfac: xe }),
        Ps = xe({ __NG_ELEMENT_ID__: xe }),
        Av = xe({ __NG_ENV_ID__: xe });
      function Nv(e, n, t) {
        let i = e.length;
        for (;;) {
          const r = e.indexOf(n, t);
          if (-1 === r) return r;
          if (0 === r || e.charCodeAt(r - 1) <= 32) {
            const o = n.length;
            if (r + o === i || e.charCodeAt(r + o) <= 32) return r;
          }
          t = r + 1;
        }
      }
      function Mf(e, n, t) {
        let i = 0;
        for (; i < t.length; ) {
          const r = t[i];
          if ('number' == typeof r) {
            if (0 !== r) break;
            i++;
            const o = t[i++],
              s = t[i++],
              a = t[i++];
            e.setAttribute(n, s, a, o);
          } else {
            const o = r,
              s = t[++i];
            Rv(o) ? e.setProperty(n, o, s) : e.setAttribute(n, o, s), i++;
          }
        }
        return i;
      }
      function Ov(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Rv(e) {
        return 64 === e.charCodeAt(0);
      }
      function Ls(e, n) {
        if (null !== n && 0 !== n.length)
          if (null === e || 0 === e.length) e = n.slice();
          else {
            let t = -1;
            for (let i = 0; i < n.length; i++) {
              const r = n[i];
              'number' == typeof r
                ? (t = r)
                : 0 === t ||
                  Fv(e, t, r, null, -1 === t || 2 === t ? n[++i] : null);
            }
          }
        return e;
      }
      function Fv(e, n, t, i, r) {
        let o = 0,
          s = e.length;
        if (-1 === n) s = -1;
        else
          for (; o < e.length; ) {
            const a = e[o++];
            if ('number' == typeof a) {
              if (a === n) {
                s = -1;
                break;
              }
              if (a > n) {
                s = o - 1;
                break;
              }
            }
          }
        for (; o < e.length; ) {
          const a = e[o];
          if ('number' == typeof a) break;
          if (a === t) {
            if (null === i) return void (null !== r && (e[o + 1] = r));
            if (i === e[o + 1]) return void (e[o + 2] = r);
          }
          o++, null !== i && o++, null !== r && o++;
        }
        -1 !== s && (e.splice(s, 0, n), (o = s + 1)),
          e.splice(o++, 0, t),
          null !== i && e.splice(o++, 0, i),
          null !== r && e.splice(o++, 0, r);
      }
      const kv = 'ng-template';
      function eN(e, n, t) {
        let i = 0,
          r = !0;
        for (; i < e.length; ) {
          let o = e[i++];
          if ('string' == typeof o && r) {
            const s = e[i++];
            if (t && 'class' === o && -1 !== Nv(s.toLowerCase(), n, 0))
              return !0;
          } else {
            if (1 === o) {
              for (; i < e.length && 'string' == typeof (o = e[i++]); )
                if (o.toLowerCase() === n) return !0;
              return !1;
            }
            'number' == typeof o && (r = !1);
          }
        }
        return !1;
      }
      function Pv(e) {
        return 4 === e.type && e.value !== kv;
      }
      function tN(e, n, t) {
        return n === (4 !== e.type || t ? e.value : kv);
      }
      function nN(e, n, t) {
        let i = 4;
        const r = e.attrs || [],
          o = (function oN(e) {
            for (let n = 0; n < e.length; n++) if (Ov(e[n])) return n;
            return e.length;
          })(r);
        let s = !1;
        for (let a = 0; a < n.length; a++) {
          const l = n[a];
          if ('number' != typeof l) {
            if (!s)
              if (4 & i) {
                if (
                  ((i = 2 | (1 & i)),
                  ('' !== l && !tN(e, l, t)) || ('' === l && 1 === n.length))
                ) {
                  if (jn(i)) return !1;
                  s = !0;
                }
              } else {
                const c = 8 & i ? l : n[++a];
                if (8 & i && null !== e.attrs) {
                  if (!eN(e.attrs, c, t)) {
                    if (jn(i)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const u = iN(8 & i ? 'class' : l, r, Pv(e), t);
                if (-1 === u) {
                  if (jn(i)) return !1;
                  s = !0;
                  continue;
                }
                if ('' !== c) {
                  let f;
                  f = u > o ? '' : r[u + 1].toLowerCase();
                  const h = 8 & i ? f : null;
                  if ((h && -1 !== Nv(h, c, 0)) || (2 & i && c !== f)) {
                    if (jn(i)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !jn(i) && !jn(l)) return !1;
            if (s && jn(l)) continue;
            (s = !1), (i = l | (1 & i));
          }
        }
        return jn(i) || s;
      }
      function jn(e) {
        return 0 == (1 & e);
      }
      function iN(e, n, t, i) {
        if (null === n) return -1;
        let r = 0;
        if (i || !t) {
          let o = !1;
          for (; r < n.length; ) {
            const s = n[r];
            if (s === e) return r;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let a = n[++r];
                for (; 'string' == typeof a; ) a = n[++r];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                r += 4;
                continue;
              }
            }
            r += o ? 1 : 2;
          }
          return -1;
        }
        return (function sN(e, n) {
          let t = e.indexOf(4);
          if (t > -1)
            for (t++; t < e.length; ) {
              const i = e[t];
              if ('number' == typeof i) return -1;
              if (i === n) return t;
              t++;
            }
          return -1;
        })(n, e);
      }
      function Lv(e, n, t = !1) {
        for (let i = 0; i < n.length; i++) if (nN(e, n[i], t)) return !0;
        return !1;
      }
      function aN(e, n) {
        e: for (let t = 0; t < n.length; t++) {
          const i = n[t];
          if (e.length === i.length) {
            for (let r = 0; r < e.length; r++) if (e[r] !== i[r]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function Vv(e, n) {
        return e ? ':not(' + n.trim() + ')' : n;
      }
      function lN(e) {
        let n = e[0],
          t = 1,
          i = 2,
          r = '',
          o = !1;
        for (; t < e.length; ) {
          let s = e[t];
          if ('string' == typeof s)
            if (2 & i) {
              const a = e[++t];
              r += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']';
            } else 8 & i ? (r += '.' + s) : 4 & i && (r += ' ' + s);
          else
            '' !== r && !jn(s) && ((n += Vv(o, r)), (r = '')),
              (i = s),
              (o = o || !jn(i));
          t++;
        }
        return '' !== r && (n += Vv(o, r)), n;
      }
      function Je(e) {
        return wi(() => {
          const n = jv(e),
            t = {
              ...n,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Zl.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (n.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || Sn.Emulated,
              styles: e.styles || ge,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: '',
            };
          Hv(t);
          const i = e.dependencies;
          return (
            (t.directiveDefs = Kl(i, !1)),
            (t.pipeDefs = Kl(i, !0)),
            (t.id = (function gN(e) {
              let n = 0;
              const t = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join('|');
              for (const r of t) n = (Math.imul(31, n) + r.charCodeAt(0)) << 0;
              return (n += 2147483648), 'c' + n;
            })(t)),
            t
          );
        });
      }
      function fN(e) {
        return fe(e) || bt(e);
      }
      function hN(e) {
        return null !== e;
      }
      function se(e) {
        return wi(() => ({
          type: e.type,
          bootstrap: e.bootstrap || ge,
          declarations: e.declarations || ge,
          imports: e.imports || ge,
          exports: e.exports || ge,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Bv(e, n) {
        if (null == e) return ni;
        const t = {};
        for (const i in e)
          if (e.hasOwnProperty(i)) {
            let r = e[i],
              o = r;
            Array.isArray(r) && ((o = r[1]), (r = r[0])),
              (t[r] = i),
              n && (n[r] = o);
          }
        return t;
      }
      function O(e) {
        return wi(() => {
          const n = jv(e);
          return Hv(n), n;
        });
      }
      function Yt(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          standalone: !0 === e.standalone,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function fe(e) {
        return e[Yl] || null;
      }
      function bt(e) {
        return e[xf] || null;
      }
      function Lt(e) {
        return e[Tf] || null;
      }
      function dn(e, n) {
        const t = e[Iv] || null;
        if (!t && !0 === n)
          throw new Error(`Type ${dt(e)} does not have '\u0275mod' property.`);
        return t;
      }
      function jv(e) {
        const n = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: n,
          inputTransforms: null,
          inputConfig: e.inputs || ni,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || ge,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Bv(e.inputs, n),
          outputs: Bv(e.outputs),
        };
      }
      function Hv(e) {
        e.features?.forEach(n => n(e));
      }
      function Kl(e, n) {
        if (!e) return null;
        const t = n ? Lt : fN;
        return () =>
          ('function' == typeof e ? e() : e).map(i => t(i)).filter(hN);
      }
      const Ke = 0,
        P = 1,
        te = 2,
        He = 3,
        Hn = 4,
        Vs = 5,
        Ot = 6,
        ao = 7,
        Xe = 8,
        $i = 9,
        lo = 10,
        Q = 11,
        Bs = 12,
        Uv = 13,
        co = 14,
        et = 15,
        js = 16,
        uo = 17,
        ii = 18,
        Hs = 19,
        $v = 20,
        zi = 21,
        Ei = 22,
        Us = 23,
        $s = 24,
        de = 25,
        If = 1,
        zv = 2,
        ri = 7,
        fo = 9,
        Dt = 11;
      function Kt(e) {
        return Array.isArray(e) && 'object' == typeof e[If];
      }
      function Vt(e) {
        return Array.isArray(e) && !0 === e[If];
      }
      function Af(e) {
        return 0 != (4 & e.flags);
      }
      function gr(e) {
        return e.componentOffset > -1;
      }
      function Jl(e) {
        return 1 == (1 & e.flags);
      }
      function Un(e) {
        return !!e.template;
      }
      function Nf(e) {
        return 0 != (512 & e[te]);
      }
      function _r(e, n) {
        return e.hasOwnProperty(Ci) ? e[Ci] : null;
      }
      let wt = null,
        Xl = !1;
      function xn(e) {
        const n = wt;
        return (wt = e), n;
      }
      const qv = {
        version: 0,
        dirty: !1,
        producerNode: void 0,
        producerLastReadVersion: void 0,
        producerIndexOfThis: void 0,
        nextProducerIndex: 0,
        liveConsumerNode: void 0,
        liveConsumerIndexOfThis: void 0,
        consumerAllowSignalWrites: !1,
        consumerIsAlwaysLive: !1,
        producerMustRecompute: () => !1,
        producerRecomputeValue: () => {},
        consumerMarkedDirty: () => {},
      };
      function Yv(e) {
        if (!Gs(e) || e.dirty) {
          if (!e.producerMustRecompute(e) && !Jv(e)) return void (e.dirty = !1);
          e.producerRecomputeValue(e), (e.dirty = !1);
        }
      }
      function Qv(e) {
        (e.dirty = !0),
          (function Kv(e) {
            if (void 0 === e.liveConsumerNode) return;
            const n = Xl;
            Xl = !0;
            try {
              for (const t of e.liveConsumerNode) t.dirty || Qv(t);
            } finally {
              Xl = n;
            }
          })(e),
          e.consumerMarkedDirty?.(e);
      }
      function Rf(e) {
        return e && (e.nextProducerIndex = 0), xn(e);
      }
      function Ff(e, n) {
        if (
          (xn(n),
          e &&
            void 0 !== e.producerNode &&
            void 0 !== e.producerIndexOfThis &&
            void 0 !== e.producerLastReadVersion)
        ) {
          if (Gs(e))
            for (let t = e.nextProducerIndex; t < e.producerNode.length; t++)
              ec(e.producerNode[t], e.producerIndexOfThis[t]);
          for (; e.producerNode.length > e.nextProducerIndex; )
            e.producerNode.pop(),
              e.producerLastReadVersion.pop(),
              e.producerIndexOfThis.pop();
        }
      }
      function Jv(e) {
        ho(e);
        for (let n = 0; n < e.producerNode.length; n++) {
          const t = e.producerNode[n],
            i = e.producerLastReadVersion[n];
          if (i !== t.version || (Yv(t), i !== t.version)) return !0;
        }
        return !1;
      }
      function Xv(e) {
        if ((ho(e), Gs(e)))
          for (let n = 0; n < e.producerNode.length; n++)
            ec(e.producerNode[n], e.producerIndexOfThis[n]);
        (e.producerNode.length =
          e.producerLastReadVersion.length =
          e.producerIndexOfThis.length =
            0),
          e.liveConsumerNode &&
            (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
      }
      function ec(e, n) {
        if (
          ((function ty(e) {
            (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
          })(e),
          ho(e),
          1 === e.liveConsumerNode.length)
        )
          for (let i = 0; i < e.producerNode.length; i++)
            ec(e.producerNode[i], e.producerIndexOfThis[i]);
        const t = e.liveConsumerNode.length - 1;
        if (
          ((e.liveConsumerNode[n] = e.liveConsumerNode[t]),
          (e.liveConsumerIndexOfThis[n] = e.liveConsumerIndexOfThis[t]),
          e.liveConsumerNode.length--,
          e.liveConsumerIndexOfThis.length--,
          n < e.liveConsumerNode.length)
        ) {
          const i = e.liveConsumerIndexOfThis[n],
            r = e.liveConsumerNode[n];
          ho(r), (r.producerIndexOfThis[i] = n);
        }
      }
      function Gs(e) {
        return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
      }
      function ho(e) {
        (e.producerNode ??= []),
          (e.producerIndexOfThis ??= []),
          (e.producerLastReadVersion ??= []);
      }
      let ny = null;
      function oy(e) {
        const n = xn(null);
        try {
          return e();
        } finally {
          xn(n);
        }
      }
      const sy = () => {},
        IN = (() => ({
          ...qv,
          consumerIsAlwaysLive: !0,
          consumerAllowSignalWrites: !1,
          consumerMarkedDirty: e => {
            e.schedule(e.ref);
          },
          hasRun: !1,
          cleanupFn: sy,
        }))();
      class AN {
        constructor(n, t, i) {
          (this.previousValue = n),
            (this.currentValue = t),
            (this.firstChange = i);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Ct() {
        return ay;
      }
      function ay(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = ON), NN;
      }
      function NN() {
        const e = cy(this),
          n = e?.current;
        if (n) {
          const t = e.previous;
          if (t === ni) e.previous = n;
          else for (let i in n) t[i] = n[i];
          (e.current = null), this.ngOnChanges(n);
        }
      }
      function ON(e, n, t, i) {
        const r = this.declaredInputs[t],
          o =
            cy(e) ||
            (function RN(e, n) {
              return (e[ly] = n);
            })(e, { previous: ni, current: null }),
          s = o.current || (o.current = {}),
          a = o.previous,
          l = a[r];
        (s[r] = new AN(l && l.currentValue, n, a === ni)), (e[i] = n);
      }
      Ct.ngInherit = !0;
      const ly = '__ngSimpleChanges__';
      function cy(e) {
        return e[ly] || null;
      }
      const oi = function (e, n, t) {};
      function Pe(e) {
        for (; Array.isArray(e); ) e = e[Ke];
        return e;
      }
      function tc(e, n) {
        return Pe(n[e]);
      }
      function Qt(e, n) {
        return Pe(n[e.index]);
      }
      function fy(e, n) {
        return e.data[n];
      }
      function po(e, n) {
        return e[n];
      }
      function un(e, n) {
        const t = n[e];
        return Kt(t) ? t : t[Ke];
      }
      function Wi(e, n) {
        return null == n ? null : e[n];
      }
      function hy(e) {
        e[uo] = 0;
      }
      function BN(e) {
        1024 & e[te] || ((e[te] |= 1024), my(e, 1));
      }
      function py(e) {
        1024 & e[te] && ((e[te] &= -1025), my(e, -1));
      }
      function my(e, n) {
        let t = e[He];
        if (null === t) return;
        t[Vs] += n;
        let i = t;
        for (
          t = t[He];
          null !== t && ((1 === n && 1 === i[Vs]) || (-1 === n && 0 === i[Vs]));

        )
          (t[Vs] += n), (i = t), (t = t[He]);
      }
      const q = {
        lFrame: xy(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function vy() {
        return q.bindingsEnabled;
      }
      function mo() {
        return null !== q.skipHydrationRootTNode;
      }
      function C() {
        return q.lFrame.lView;
      }
      function he() {
        return q.lFrame.tView;
      }
      function mt(e) {
        return (q.lFrame.contextLView = e), e[Xe];
      }
      function gt(e) {
        return (q.lFrame.contextLView = null), e;
      }
      function Et() {
        let e = yy();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function yy() {
        return q.lFrame.currentTNode;
      }
      function si(e, n) {
        const t = q.lFrame;
        (t.currentTNode = e), (t.isParent = n);
      }
      function Bf() {
        return q.lFrame.isParent;
      }
      function jf() {
        q.lFrame.isParent = !1;
      }
      function Bt() {
        const e = q.lFrame;
        let n = e.bindingRootIndex;
        return (
          -1 === n && (n = e.bindingRootIndex = e.tView.bindingStartIndex), n
        );
      }
      function go() {
        return q.lFrame.bindingIndex++;
      }
      function xi(e) {
        const n = q.lFrame,
          t = n.bindingIndex;
        return (n.bindingIndex = n.bindingIndex + e), t;
      }
      function QN(e, n) {
        const t = q.lFrame;
        (t.bindingIndex = t.bindingRootIndex = e), Hf(n);
      }
      function Hf(e) {
        q.lFrame.currentDirectiveIndex = e;
      }
      function Cy() {
        return q.lFrame.currentQueryIndex;
      }
      function $f(e) {
        q.lFrame.currentQueryIndex = e;
      }
      function XN(e) {
        const n = e[P];
        return 2 === n.type ? n.declTNode : 1 === n.type ? e[Ot] : null;
      }
      function Ey(e, n, t) {
        if (t & ce.SkipSelf) {
          let r = n,
            o = e;
          for (
            ;
            !((r = r.parent),
            null !== r ||
              t & ce.Host ||
              ((r = XN(o)), null === r || ((o = o[co]), 10 & r.type)));

          );
          if (null === r) return !1;
          (n = r), (e = o);
        }
        const i = (q.lFrame = Sy());
        return (i.currentTNode = n), (i.lView = e), !0;
      }
      function zf(e) {
        const n = Sy(),
          t = e[P];
        (q.lFrame = n),
          (n.currentTNode = t.firstChild),
          (n.lView = e),
          (n.tView = t),
          (n.contextLView = e),
          (n.bindingIndex = t.bindingStartIndex),
          (n.inI18n = !1);
      }
      function Sy() {
        const e = q.lFrame,
          n = null === e ? null : e.child;
        return null === n ? xy(e) : n;
      }
      function xy(e) {
        const n = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = n), n;
      }
      function Ty() {
        const e = q.lFrame;
        return (
          (q.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const My = Ty;
      function Gf() {
        const e = Ty();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function jt() {
        return q.lFrame.selectedIndex;
      }
      function vr(e) {
        q.lFrame.selectedIndex = e;
      }
      function $e() {
        const e = q.lFrame;
        return fy(e.tView, e.selectedIndex);
      }
      let Ay = !0;
      function nc() {
        return Ay;
      }
      function qi(e) {
        Ay = e;
      }
      function ic(e, n) {
        for (let t = n.directiveStart, i = n.directiveEnd; t < i; t++) {
          const o = e.data[t].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: d,
            } = o;
          s && (e.contentHooks ??= []).push(-t, s),
            a &&
              ((e.contentHooks ??= []).push(t, a),
              (e.contentCheckHooks ??= []).push(t, a)),
            l && (e.viewHooks ??= []).push(-t, l),
            c &&
              ((e.viewHooks ??= []).push(t, c),
              (e.viewCheckHooks ??= []).push(t, c)),
            null != d && (e.destroyHooks ??= []).push(t, d);
        }
      }
      function rc(e, n, t) {
        Ny(e, n, 3, t);
      }
      function oc(e, n, t, i) {
        (3 & e[te]) === t && Ny(e, n, t, i);
      }
      function Wf(e, n) {
        let t = e[te];
        (3 & t) === n && ((t &= 8191), (t += 1), (e[te] = t));
      }
      function Ny(e, n, t, i) {
        const o = i ?? -1,
          s = n.length - 1;
        let a = 0;
        for (let l = void 0 !== i ? 65535 & e[uo] : 0; l < s; l++)
          if ('number' == typeof n[l + 1]) {
            if (((a = n[l]), null != i && a >= i)) break;
          } else
            n[l] < 0 && (e[uo] += 65536),
              (a < o || -1 == o) &&
                (aO(e, t, n, l), (e[uo] = (4294901760 & e[uo]) + l + 2)),
              l++;
      }
      function Oy(e, n) {
        oi(4, e, n);
        const t = xn(null);
        try {
          n.call(e);
        } finally {
          xn(t), oi(5, e, n);
        }
      }
      function aO(e, n, t, i) {
        const r = t[i] < 0,
          o = t[i + 1],
          a = e[r ? -t[i] : t[i]];
        r
          ? e[te] >> 13 < e[uo] >> 16 &&
            (3 & e[te]) === n &&
            ((e[te] += 8192), Oy(a, o))
          : Oy(a, o);
      }
      const _o = -1;
      class qs {
        constructor(n, t, i) {
          (this.factory = n),
            (this.resolving = !1),
            (this.canSeeViewProviders = t),
            (this.injectImpl = i);
        }
      }
      function Zf(e) {
        return e !== _o;
      }
      function Zs(e) {
        return 32767 & e;
      }
      function Ys(e, n) {
        let t = (function uO(e) {
            return e >> 16;
          })(e),
          i = n;
        for (; t > 0; ) (i = i[co]), t--;
        return i;
      }
      let Yf = !0;
      function sc(e) {
        const n = Yf;
        return (Yf = e), n;
      }
      const Ry = 255,
        Fy = 5;
      let fO = 0;
      const ai = {};
      function ac(e, n) {
        const t = ky(e, n);
        if (-1 !== t) return t;
        const i = n[P];
        i.firstCreatePass &&
          ((e.injectorIndex = n.length),
          Kf(i.data, e),
          Kf(n, null),
          Kf(i.blueprint, null));
        const r = lc(e, n),
          o = e.injectorIndex;
        if (Zf(r)) {
          const s = Zs(r),
            a = Ys(r, n),
            l = a[P].data;
          for (let c = 0; c < 8; c++) n[o + c] = a[s + c] | l[s + c];
        }
        return (n[o + 8] = r), o;
      }
      function Kf(e, n) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, n);
      }
      function ky(e, n) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === n[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function lc(e, n) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let t = 0,
          i = null,
          r = n;
        for (; null !== r; ) {
          if (((i = Uy(r)), null === i)) return _o;
          if ((t++, (r = r[co]), -1 !== i.injectorIndex))
            return i.injectorIndex | (t << 16);
        }
        return _o;
      }
      function Qf(e, n, t) {
        !(function hO(e, n, t) {
          let i;
          'string' == typeof t
            ? (i = t.charCodeAt(0) || 0)
            : t.hasOwnProperty(Ps) && (i = t[Ps]),
            null == i && (i = t[Ps] = fO++);
          const r = i & Ry;
          n.data[e + (r >> Fy)] |= 1 << r;
        })(e, n, t);
      }
      function Py(e, n, t) {
        if (t & ce.Optional || void 0 !== e) return e;
        _f();
      }
      function Ly(e, n, t, i) {
        if (
          (t & ce.Optional && void 0 === i && (i = null),
          !(t & (ce.Self | ce.Host)))
        ) {
          const r = e[$i],
            o = Zt(void 0);
          try {
            return r ? r.get(n, i, t & ce.Optional) : Sv(n, i, t & ce.Optional);
          } finally {
            Zt(o);
          }
        }
        return Py(i, 0, t);
      }
      function Vy(e, n, t, i = ce.Default, r) {
        if (null !== e) {
          if (2048 & n[te] && !(i & ce.Self)) {
            const s = (function yO(e, n, t, i, r) {
              let o = e,
                s = n;
              for (
                ;
                null !== o && null !== s && 2048 & s[te] && !(512 & s[te]);

              ) {
                const a = By(o, s, t, i | ce.Self, ai);
                if (a !== ai) return a;
                let l = o.parent;
                if (!l) {
                  const c = s[$v];
                  if (c) {
                    const d = c.get(t, ai, i);
                    if (d !== ai) return d;
                  }
                  (l = Uy(s)), (s = s[co]);
                }
                o = l;
              }
              return r;
            })(e, n, t, i, ai);
            if (s !== ai) return s;
          }
          const o = By(e, n, t, i, ai);
          if (o !== ai) return o;
        }
        return Ly(n, t, i, r);
      }
      function By(e, n, t, i, r) {
        const o = (function gO(e) {
          if ('string' == typeof e) return e.charCodeAt(0) || 0;
          const n = e.hasOwnProperty(Ps) ? e[Ps] : void 0;
          return 'number' == typeof n ? (n >= 0 ? n & Ry : vO) : n;
        })(t);
        if ('function' == typeof o) {
          if (!Ey(n, e, i)) return i & ce.Host ? Py(r, 0, i) : Ly(n, t, i, r);
          try {
            let s;
            if (((s = o(i)), null != s || i & ce.Optional)) return s;
            _f();
          } finally {
            My();
          }
        } else if ('number' == typeof o) {
          let s = null,
            a = ky(e, n),
            l = _o,
            c = i & ce.Host ? n[et][Ot] : null;
          for (
            (-1 === a || i & ce.SkipSelf) &&
            ((l = -1 === a ? lc(e, n) : n[a + 8]),
            l !== _o && Hy(i, !1)
              ? ((s = n[P]), (a = Zs(l)), (n = Ys(l, n)))
              : (a = -1));
            -1 !== a;

          ) {
            const d = n[P];
            if (jy(o, a, d.data)) {
              const u = mO(a, n, t, s, i, c);
              if (u !== ai) return u;
            }
            (l = n[a + 8]),
              l !== _o && Hy(i, n[P].data[a + 8] === c) && jy(o, a, n)
                ? ((s = d), (a = Zs(l)), (n = Ys(l, n)))
                : (a = -1);
          }
        }
        return r;
      }
      function mO(e, n, t, i, r, o) {
        const s = n[P],
          a = s.data[e + 8],
          d = cc(
            a,
            s,
            t,
            null == i ? gr(a) && Yf : i != s && 0 != (3 & a.type),
            r & ce.Host && o === a
          );
        return null !== d ? yr(n, s, d, a) : ai;
      }
      function cc(e, n, t, i, r) {
        const o = e.providerIndexes,
          s = n.data,
          a = 1048575 & o,
          l = e.directiveStart,
          d = o >> 20,
          f = r ? a + d : e.directiveEnd;
        for (let h = i ? a : a + d; h < f; h++) {
          const p = s[h];
          if ((h < l && t === p) || (h >= l && p.type === t)) return h;
        }
        if (r) {
          const h = s[l];
          if (h && Un(h) && h.type === t) return l;
        }
        return null;
      }
      function yr(e, n, t, i) {
        let r = e[t];
        const o = n.data;
        if (
          (function lO(e) {
            return e instanceof qs;
          })(r)
        ) {
          const s = r;
          s.resolving &&
            (function LA(e, n) {
              const t = n ? `. Dependency path: ${n.join(' > ')} > ${e}` : '';
              throw new b(
                -200,
                `Circular dependency in DI detected for ${e}${t}`
              );
            })(
              (function Ce(e) {
                return 'function' == typeof e
                  ? e.name || e.toString()
                  : 'object' == typeof e &&
                    null != e &&
                    'function' == typeof e.type
                  ? e.type.name || e.type.toString()
                  : K(e);
              })(o[t])
            );
          const a = sc(s.canSeeViewProviders);
          s.resolving = !0;
          const c = s.injectImpl ? Zt(s.injectImpl) : null;
          Ey(e, i, ce.Default);
          try {
            (r = e[t] = s.factory(void 0, o, e, i)),
              n.firstCreatePass &&
                t >= i.directiveStart &&
                (function sO(e, n, t) {
                  const {
                    ngOnChanges: i,
                    ngOnInit: r,
                    ngDoCheck: o,
                  } = n.type.prototype;
                  if (i) {
                    const s = ay(n);
                    (t.preOrderHooks ??= []).push(e, s),
                      (t.preOrderCheckHooks ??= []).push(e, s);
                  }
                  r && (t.preOrderHooks ??= []).push(0 - e, r),
                    o &&
                      ((t.preOrderHooks ??= []).push(e, o),
                      (t.preOrderCheckHooks ??= []).push(e, o));
                })(t, o[t], n);
          } finally {
            null !== c && Zt(c), sc(a), (s.resolving = !1), My();
          }
        }
        return r;
      }
      function jy(e, n, t) {
        return !!(t[n + (e >> Fy)] & (1 << e));
      }
      function Hy(e, n) {
        return !(e & ce.Self || (e & ce.Host && n));
      }
      class Ht {
        constructor(n, t) {
          (this._tNode = n), (this._lView = t);
        }
        get(n, t, i) {
          return Vy(this._tNode, this._lView, n, ql(i), t);
        }
      }
      function vO() {
        return new Ht(Et(), C());
      }
      function tt(e) {
        return wi(() => {
          const n = e.prototype.constructor,
            t = n[Ci] || Jf(n),
            i = Object.prototype;
          let r = Object.getPrototypeOf(e.prototype).constructor;
          for (; r && r !== i; ) {
            const o = r[Ci] || Jf(r);
            if (o && o !== t) return o;
            r = Object.getPrototypeOf(r);
          }
          return o => new o();
        });
      }
      function Jf(e) {
        return mf(e)
          ? () => {
              const n = Jf(Y(e));
              return n && n();
            }
          : _r(e);
      }
      function Uy(e) {
        const n = e[P],
          t = n.type;
        return 2 === t ? n.declTNode : 1 === t ? e[Ot] : null;
      }
      const yo = '__parameters__';
      function Do(e, n, t) {
        return wi(() => {
          const i = (function Xf(e) {
            return function (...t) {
              if (e) {
                const i = e(...t);
                for (const r in i) this[r] = i[r];
              }
            };
          })(n);
          function r(...o) {
            if (this instanceof r) return i.apply(this, o), this;
            const s = new r(...o);
            return (a.annotation = s), a;
            function a(l, c, d) {
              const u = l.hasOwnProperty(yo)
                ? l[yo]
                : Object.defineProperty(l, yo, { value: [] })[yo];
              for (; u.length <= d; ) u.push(null);
              return (u[d] = u[d] || []).push(s), l;
            }
          }
          return (
            t && (r.prototype = Object.create(t.prototype)),
            (r.prototype.ngMetadataName = e),
            (r.annotationCls = r),
            r
          );
        });
      }
      function Co(e, n) {
        e.forEach(t => (Array.isArray(t) ? Co(t, n) : n(t)));
      }
      function zy(e, n, t) {
        n >= e.length ? e.push(t) : e.splice(n, 0, t);
      }
      function dc(e, n) {
        return n >= e.length - 1 ? e.pop() : e.splice(n, 1)[0];
      }
      function Js(e, n) {
        const t = [];
        for (let i = 0; i < e; i++) t.push(n);
        return t;
      }
      function fn(e, n, t) {
        let i = Eo(e, n);
        return (
          i >= 0
            ? (e[1 | i] = t)
            : ((i = ~i),
              (function xO(e, n, t, i) {
                let r = e.length;
                if (r == n) e.push(t, i);
                else if (1 === r) e.push(i, e[0]), (e[0] = t);
                else {
                  for (r--, e.push(e[r - 1], e[r]); r > n; )
                    (e[r] = e[r - 2]), r--;
                  (e[n] = t), (e[n + 1] = i);
                }
              })(e, i, n, t)),
          i
        );
      }
      function eh(e, n) {
        const t = Eo(e, n);
        if (t >= 0) return e[1 | t];
      }
      function Eo(e, n) {
        return (function Gy(e, n, t) {
          let i = 0,
            r = e.length >> t;
          for (; r !== i; ) {
            const o = i + ((r - i) >> 1),
              s = e[o << t];
            if (n === s) return o << t;
            s > n ? (r = o) : (i = o + 1);
          }
          return ~(r << t);
        })(e, n, 1);
      }
      const fc = ks(Do('Optional'), 8),
        hc = ks(Do('SkipSelf'), 4);
      function vc(e) {
        return 128 == (128 & e.flags);
      }
      var Zi = (function (e) {
        return (
          (e[(e.Important = 1)] = 'Important'),
          (e[(e.DashCase = 2)] = 'DashCase'),
          e
        );
      })(Zi || {});
      const oh = new Map();
      let KO = 0;
      const ah = '__ngContext__';
      function Rt(e, n) {
        Kt(n)
          ? ((e[ah] = n[Hs]),
            (function JO(e) {
              oh.set(e[Hs], e);
            })(n))
          : (e[ah] = n);
      }
      let lh;
      function ch(e, n) {
        return lh(e, n);
      }
      function ta(e) {
        const n = e[He];
        return Vt(n) ? n[He] : n;
      }
      function ub(e) {
        return hb(e[Bs]);
      }
      function fb(e) {
        return hb(e[Hn]);
      }
      function hb(e) {
        for (; null !== e && !Vt(e); ) e = e[Hn];
        return e;
      }
      function To(e, n, t, i, r) {
        if (null != i) {
          let o,
            s = !1;
          Vt(i) ? (o = i) : Kt(i) && ((s = !0), (i = i[Ke]));
          const a = Pe(i);
          0 === e && null !== t
            ? null == r
              ? _b(n, t, a)
              : Dr(n, t, a, r || null, !0)
            : 1 === e && null !== t
            ? Dr(n, t, a, r || null, !0)
            : 2 === e
            ? (function Sc(e, n, t) {
                const i = Cc(e, n);
                i &&
                  (function _R(e, n, t, i) {
                    e.removeChild(n, t, i);
                  })(e, i, n, t);
              })(n, a, s)
            : 3 === e && n.destroyNode(a),
            null != o &&
              (function bR(e, n, t, i, r) {
                const o = t[ri];
                o !== Pe(t) && To(n, e, i, o, r);
                for (let a = Dt; a < t.length; a++) {
                  const l = t[a];
                  ia(l[P], l, e, n, i, o);
                }
              })(n, e, o, t, r);
        }
      }
      function Dc(e, n, t) {
        return e.createElement(n, t);
      }
      function mb(e, n) {
        const t = e[fo],
          i = t.indexOf(n);
        py(n), t.splice(i, 1);
      }
      function wc(e, n) {
        if (e.length <= Dt) return;
        const t = Dt + n,
          i = e[t];
        if (i) {
          const r = i[js];
          null !== r && r !== e && mb(r, i), n > 0 && (e[t - 1][Hn] = i[Hn]);
          const o = dc(e, Dt + n);
          !(function cR(e, n) {
            ia(e, n, n[Q], 2, null, null), (n[Ke] = null), (n[Ot] = null);
          })(i[P], i);
          const s = o[ii];
          null !== s && s.detachView(o[P]),
            (i[He] = null),
            (i[Hn] = null),
            (i[te] &= -129);
        }
        return i;
      }
      function uh(e, n) {
        if (!(256 & n[te])) {
          const t = n[Q];
          n[Us] && Xv(n[Us]),
            n[$s] && Xv(n[$s]),
            t.destroyNode && ia(e, n, t, 3, null, null),
            (function fR(e) {
              let n = e[Bs];
              if (!n) return fh(e[P], e);
              for (; n; ) {
                let t = null;
                if (Kt(n)) t = n[Bs];
                else {
                  const i = n[Dt];
                  i && (t = i);
                }
                if (!t) {
                  for (; n && !n[Hn] && n !== e; )
                    Kt(n) && fh(n[P], n), (n = n[He]);
                  null === n && (n = e), Kt(n) && fh(n[P], n), (t = n && n[Hn]);
                }
                n = t;
              }
            })(n);
        }
      }
      function fh(e, n) {
        if (!(256 & n[te])) {
          (n[te] &= -129),
            (n[te] |= 256),
            (function gR(e, n) {
              let t;
              if (null != e && null != (t = e.destroyHooks))
                for (let i = 0; i < t.length; i += 2) {
                  const r = n[t[i]];
                  if (!(r instanceof qs)) {
                    const o = t[i + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = r[o[s]],
                          l = o[s + 1];
                        oi(4, a, l);
                        try {
                          l.call(a);
                        } finally {
                          oi(5, a, l);
                        }
                      }
                    else {
                      oi(4, r, o);
                      try {
                        o.call(r);
                      } finally {
                        oi(5, r, o);
                      }
                    }
                  }
                }
            })(e, n),
            (function mR(e, n) {
              const t = e.cleanup,
                i = n[ao];
              if (null !== t)
                for (let o = 0; o < t.length - 1; o += 2)
                  if ('string' == typeof t[o]) {
                    const s = t[o + 3];
                    s >= 0 ? i[s]() : i[-s].unsubscribe(), (o += 2);
                  } else t[o].call(i[t[o + 1]]);
              null !== i && (n[ao] = null);
              const r = n[zi];
              if (null !== r) {
                n[zi] = null;
                for (let o = 0; o < r.length; o++) (0, r[o])();
              }
            })(e, n),
            1 === n[P].type && n[Q].destroy();
          const t = n[js];
          if (null !== t && Vt(n[He])) {
            t !== n[He] && mb(t, n);
            const i = n[ii];
            null !== i && i.detachView(e);
          }
          !(function XO(e) {
            oh.delete(e[Hs]);
          })(n);
        }
      }
      function hh(e, n, t) {
        return (function gb(e, n, t) {
          let i = n;
          for (; null !== i && 40 & i.type; ) i = (n = i).parent;
          if (null === i) return t[Ke];
          {
            const { componentOffset: r } = i;
            if (r > -1) {
              const { encapsulation: o } = e.data[i.directiveStart + r];
              if (o === Sn.None || o === Sn.Emulated) return null;
            }
            return Qt(i, t);
          }
        })(e, n.parent, t);
      }
      function Dr(e, n, t, i, r) {
        e.insertBefore(n, t, i, r);
      }
      function _b(e, n, t) {
        e.appendChild(n, t);
      }
      function vb(e, n, t, i, r) {
        null !== i ? Dr(e, n, t, i, r) : _b(e, n, t);
      }
      function Cc(e, n) {
        return e.parentNode(n);
      }
      function yb(e, n, t) {
        return Db(e, n, t);
      }
      let ph,
        vh,
        Tc,
        Db = function bb(e, n, t) {
          return 40 & e.type ? Qt(e, t) : null;
        };
      function Ec(e, n, t, i) {
        const r = hh(e, i, n),
          o = n[Q],
          a = yb(i.parent || n[Ot], i, n);
        if (null != r)
          if (Array.isArray(t))
            for (let l = 0; l < t.length; l++) vb(o, r, t[l], a, !1);
          else vb(o, r, t, a, !1);
        void 0 !== ph && ph(o, i, n, t, r);
      }
      function na(e, n) {
        if (null !== n) {
          const t = n.type;
          if (3 & t) return Qt(n, e);
          if (4 & t) return mh(-1, e[n.index]);
          if (8 & t) {
            const i = n.child;
            if (null !== i) return na(e, i);
            {
              const r = e[n.index];
              return Vt(r) ? mh(-1, r) : Pe(r);
            }
          }
          if (32 & t) return ch(n, e)() || Pe(e[n.index]);
          {
            const i = Cb(e, n);
            return null !== i
              ? Array.isArray(i)
                ? i[0]
                : na(ta(e[et]), i)
              : na(e, n.next);
          }
        }
        return null;
      }
      function Cb(e, n) {
        return null !== n ? e[et][Ot].projection[n.projection] : null;
      }
      function mh(e, n) {
        const t = Dt + e + 1;
        if (t < n.length) {
          const i = n[t],
            r = i[P].firstChild;
          if (null !== r) return na(i, r);
        }
        return n[ri];
      }
      function gh(e, n, t, i, r, o, s) {
        for (; null != t; ) {
          const a = i[t.index],
            l = t.type;
          if (
            (s && 0 === n && (a && Rt(Pe(a), i), (t.flags |= 2)),
            32 != (32 & t.flags))
          )
            if (8 & l) gh(e, n, t.child, i, r, o, !1), To(n, e, r, a, o);
            else if (32 & l) {
              const c = ch(t, i);
              let d;
              for (; (d = c()); ) To(n, e, r, d, o);
              To(n, e, r, a, o);
            } else 16 & l ? Sb(e, n, i, t, r, o) : To(n, e, r, a, o);
          t = s ? t.projectionNext : t.next;
        }
      }
      function ia(e, n, t, i, r, o) {
        gh(t, i, e.firstChild, n, r, o, !1);
      }
      function Sb(e, n, t, i, r, o) {
        const s = t[et],
          l = s[Ot].projection[i.projection];
        if (Array.isArray(l))
          for (let c = 0; c < l.length; c++) To(n, e, r, l[c], o);
        else {
          let c = l;
          const d = s[He];
          vc(i) && (c.flags |= 128), gh(e, n, c, d, r, o, !0);
        }
      }
      function xb(e, n, t) {
        '' === t
          ? e.removeAttribute(n, 'class')
          : e.setAttribute(n, 'class', t);
      }
      function Tb(e, n, t) {
        const { mergedAttrs: i, classes: r, styles: o } = t;
        null !== i && Mf(e, n, i),
          null !== r && xb(e, n, r),
          null !== o &&
            (function wR(e, n, t) {
              e.setAttribute(n, 'style', t);
            })(e, n, o);
      }
      function Ab(e) {
        return (
          (function yh() {
            if (void 0 === Tc && ((Tc = null), ke.trustedTypes))
              try {
                Tc = ke.trustedTypes.createPolicy('angular#unsafe-bypass', {
                  createHTML: e => e,
                  createScript: e => e,
                  createScriptURL: e => e,
                });
              } catch {}
            return Tc;
          })()?.createScriptURL(e) || e
        );
      }
      class Nb {
        constructor(n) {
          this.changingThisBreaksApplicationSecurity = n;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Dv})`;
        }
      }
      function Yi(e) {
        return e instanceof Nb ? e.changingThisBreaksApplicationSecurity : e;
      }
      function ra(e, n) {
        const t = (function OR(e) {
          return (e instanceof Nb && e.getTypeName()) || null;
        })(e);
        if (null != t && t !== n) {
          if ('ResourceURL' === t && 'URL' === n) return !0;
          throw new Error(`Required a safe ${n}, got a ${t} (see ${Dv})`);
        }
        return t === n;
      }
      const PR = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      var Ao = (function (e) {
        return (
          (e[(e.NONE = 0)] = 'NONE'),
          (e[(e.HTML = 1)] = 'HTML'),
          (e[(e.STYLE = 2)] = 'STYLE'),
          (e[(e.SCRIPT = 3)] = 'SCRIPT'),
          (e[(e.URL = 4)] = 'URL'),
          (e[(e.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
          e
        );
      })(Ao || {});
      function sa(e) {
        const n = aa();
        return n
          ? n.sanitize(Ao.URL, e) || ''
          : ra(e, 'URL')
          ? Yi(e)
          : (function bh(e) {
              return (e = String(e)).match(PR) ? e : 'unsafe:' + e;
            })(K(e));
      }
      function Vb(e) {
        const n = aa();
        if (n) return Ab(n.sanitize(Ao.RESOURCE_URL, e) || '');
        if (ra(e, 'ResourceURL')) return Ab(Yi(e));
        throw new b(904, !1);
      }
      function aa() {
        const e = C();
        return e && e[lo].sanitizer;
      }
      const la = new T('ENVIRONMENT_INITIALIZER'),
        jb = new T('INJECTOR', -1),
        Hb = new T('INJECTOR_DEF_TYPES');
      class Eh {
        get(n, t = Fs) {
          if (t === Fs) {
            const i = new Error(`NullInjectorError: No provider for ${dt(n)}!`);
            throw ((i.name = 'NullInjectorError'), i);
          }
          return t;
        }
      }
      function YR(...e) {
        return { ɵproviders: Ub(0, e), ɵfromNgModule: !0 };
      }
      function Ub(e, ...n) {
        const t = [],
          i = new Set();
        let r;
        const o = s => {
          t.push(s);
        };
        return (
          Co(n, s => {
            const a = s;
            Ic(a, o, [], i) && ((r ||= []), r.push(a));
          }),
          void 0 !== r && $b(r, o),
          t
        );
      }
      function $b(e, n) {
        for (let t = 0; t < e.length; t++) {
          const { ngModule: i, providers: r } = e[t];
          xh(r, o => {
            n(o, i);
          });
        }
      }
      function Ic(e, n, t, i) {
        if (!(e = Y(e))) return !1;
        let r = null,
          o = zl(e);
        const s = !o && fe(e);
        if (o || s) {
          if (s && !s.standalone) return !1;
          r = e;
        } else {
          const l = e.ngModule;
          if (((o = zl(l)), !o)) return !1;
          r = l;
        }
        const a = i.has(r);
        if (s) {
          if (a) return !1;
          if ((i.add(r), s.dependencies)) {
            const l =
              'function' == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const c of l) Ic(c, n, t, i);
          }
        } else {
          if (!o) return !1;
          {
            if (null != o.imports && !a) {
              let c;
              i.add(r);
              try {
                Co(o.imports, d => {
                  Ic(d, n, t, i) && ((c ||= []), c.push(d));
                });
              } finally {
              }
              void 0 !== c && $b(c, n);
            }
            if (!a) {
              const c = _r(r) || (() => new r());
              n({ provide: r, useFactory: c, deps: ge }, r),
                n({ provide: Hb, useValue: r, multi: !0 }, r),
                n({ provide: la, useValue: () => x(r), multi: !0 }, r);
            }
            const l = o.providers;
            if (null != l && !a) {
              const c = e;
              xh(l, d => {
                n(d, c);
              });
            }
          }
        }
        return r !== e && void 0 !== e.providers;
      }
      function xh(e, n) {
        for (let t of e)
          gf(t) && (t = t.ɵproviders), Array.isArray(t) ? xh(t, n) : n(t);
      }
      const KR = xe({ provide: String, useValue: xe });
      function Th(e) {
        return null !== e && 'object' == typeof e && KR in e;
      }
      function wr(e) {
        return 'function' == typeof e;
      }
      const Mh = new T('Set Injector scope.'),
        Ac = {},
        JR = {};
      let Ih;
      function Nc() {
        return void 0 === Ih && (Ih = new Eh()), Ih;
      }
      class Ut {}
      class No extends Ut {
        get destroyed() {
          return this._destroyed;
        }
        constructor(n, t, i, r) {
          super(),
            (this.parent = t),
            (this.source = i),
            (this.scopes = r),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Nh(n, s => this.processProvider(s)),
            this.records.set(jb, Oo(void 0, this)),
            r.has('environment') && this.records.set(Ut, Oo(void 0, this));
          const o = this.records.get(Mh);
          null != o && 'string' == typeof o.value && this.scopes.add(o.value),
            (this.injectorDefTypes = new Set(this.get(Hb.multi, ge, ce.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            const n = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const t of n) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(n) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(n),
            () => this.removeOnDestroy(n)
          );
        }
        runInContext(n) {
          this.assertNotDestroyed();
          const t = Ui(this),
            i = Zt(void 0);
          try {
            return n();
          } finally {
            Ui(t), Zt(i);
          }
        }
        get(n, t = Fs, i = ce.Default) {
          if ((this.assertNotDestroyed(), n.hasOwnProperty(Av)))
            return n[Av](this);
          i = ql(i);
          const o = Ui(this),
            s = Zt(void 0);
          try {
            if (!(i & ce.SkipSelf)) {
              let l = this.records.get(n);
              if (void 0 === l) {
                const c =
                  (function iF(e) {
                    return (
                      'function' == typeof e ||
                      ('object' == typeof e && e instanceof T)
                    );
                  })(n) && $l(n);
                (l = c && this.injectableDefInScope(c) ? Oo(Ah(n), Ac) : null),
                  this.records.set(n, l);
              }
              if (null != l) return this.hydrate(n, l);
            }
            return (i & ce.Self ? Nc() : this.parent).get(
              n,
              (t = i & ce.Optional && t === Fs ? null : t)
            );
          } catch (a) {
            if ('NullInjectorError' === a.name) {
              if (((a[Wl] = a[Wl] || []).unshift(dt(n)), o)) throw a;
              return (function JA(e, n, t, i) {
                const r = e[Wl];
                throw (
                  (n[Tv] && r.unshift(n[Tv]),
                  (e.message = (function XA(e, n, t, i = null) {
                    e =
                      e && '\n' === e.charAt(0) && '\u0275' == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let r = dt(n);
                    if (Array.isArray(n)) r = n.map(dt).join(' -> ');
                    else if ('object' == typeof n) {
                      let o = [];
                      for (let s in n)
                        if (n.hasOwnProperty(s)) {
                          let a = n[s];
                          o.push(
                            s +
                              ':' +
                              ('string' == typeof a ? JSON.stringify(a) : dt(a))
                          );
                        }
                      r = `{${o.join(', ')}}`;
                    }
                    return `${t}${i ? '(' + i + ')' : ''}[${r}]: ${e.replace(
                      qA,
                      '\n  '
                    )}`;
                  })('\n' + e.message, r, t, i)),
                  (e.ngTokenPath = r),
                  (e[Wl] = null),
                  e)
                );
              })(a, n, 'R3InjectorError', this.source);
            }
            throw a;
          } finally {
            Zt(s), Ui(o);
          }
        }
        resolveInjectorInitializers() {
          const n = Ui(this),
            t = Zt(void 0);
          try {
            const r = this.get(la.multi, ge, ce.Self);
            for (const o of r) o();
          } finally {
            Ui(n), Zt(t);
          }
        }
        toString() {
          const n = [],
            t = this.records;
          for (const i of t.keys()) n.push(dt(i));
          return `R3Injector[${n.join(', ')}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new b(205, !1);
        }
        processProvider(n) {
          let t = wr((n = Y(n))) ? n : Y(n && n.provide);
          const i = (function eF(e) {
            return Th(e) ? Oo(void 0, e.useValue) : Oo(Wb(e), Ac);
          })(n);
          if (wr(n) || !0 !== n.multi) this.records.get(t);
          else {
            let r = this.records.get(t);
            r ||
              ((r = Oo(void 0, Ac, !0)),
              (r.factory = () => Sf(r.multi)),
              this.records.set(t, r)),
              (t = n),
              r.multi.push(n);
          }
          this.records.set(t, i);
        }
        hydrate(n, t) {
          return (
            t.value === Ac && ((t.value = JR), (t.value = t.factory())),
            'object' == typeof t.value &&
              t.value &&
              (function nF(e) {
                return (
                  null !== e &&
                  'object' == typeof e &&
                  'function' == typeof e.ngOnDestroy
                );
              })(t.value) &&
              this._ngOnDestroyHooks.add(t.value),
            t.value
          );
        }
        injectableDefInScope(n) {
          if (!n.providedIn) return !1;
          const t = Y(n.providedIn);
          return 'string' == typeof t
            ? 'any' === t || this.scopes.has(t)
            : this.injectorDefTypes.has(t);
        }
        removeOnDestroy(n) {
          const t = this._onDestroyHooks.indexOf(n);
          -1 !== t && this._onDestroyHooks.splice(t, 1);
        }
      }
      function Ah(e) {
        const n = $l(e),
          t = null !== n ? n.factory : _r(e);
        if (null !== t) return t;
        if (e instanceof T) throw new b(204, !1);
        if (e instanceof Function)
          return (function XR(e) {
            const n = e.length;
            if (n > 0) throw (Js(n, '?'), new b(204, !1));
            const t = (function $A(e) {
              return (e && (e[Gl] || e[Cv])) || null;
            })(e);
            return null !== t ? () => t.factory(e) : () => new e();
          })(e);
        throw new b(204, !1);
      }
      function Wb(e, n, t) {
        let i;
        if (wr(e)) {
          const r = Y(e);
          return _r(r) || Ah(r);
        }
        if (Th(e)) i = () => Y(e.useValue);
        else if (
          (function Gb(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          i = () => e.useFactory(...Sf(e.deps || []));
        else if (
          (function zb(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          i = () => x(Y(e.useExisting));
        else {
          const r = Y(e && (e.useClass || e.provide));
          if (
            !(function tF(e) {
              return !!e.deps;
            })(e)
          )
            return _r(r) || Ah(r);
          i = () => new r(...Sf(e.deps));
        }
        return i;
      }
      function Oo(e, n, t = !1) {
        return { factory: e, value: n, multi: t ? [] : void 0 };
      }
      function Nh(e, n) {
        for (const t of e)
          Array.isArray(t) ? Nh(t, n) : t && gf(t) ? Nh(t.ɵproviders, n) : n(t);
      }
      const Oc = new T('AppId', { providedIn: 'root', factory: () => rF }),
        rF = 'ng',
        qb = new T('Platform Initializer'),
        Ki = new T('Platform ID', {
          providedIn: 'platform',
          factory: () => 'unknown',
        }),
        Zb = new T('AnimationModuleType'),
        Oh = new T('CSP nonce', {
          providedIn: 'root',
          factory: () =>
            (function Io() {
              if (void 0 !== vh) return vh;
              if (typeof document < 'u') return document;
              throw new b(210, !1);
            })()
              .body?.querySelector('[ngCspNonce]')
              ?.getAttribute('ngCspNonce') || null,
        });
      let Yb = (e, n, t) => null;
      function jh(e, n, t = !1) {
        return Yb(e, n, t);
      }
      class pF {}
      class Jb {}
      class gF {
        resolveComponentFactory(n) {
          throw (function mF(e) {
            const n = Error(`No component factory found for ${dt(e)}.`);
            return (n.ngComponent = e), n;
          })(n);
        }
      }
      let Vc = (() => {
        class e {
          static #e = (this.NULL = new gF());
        }
        return e;
      })();
      function _F() {
        return ko(Et(), C());
      }
      function ko(e, n) {
        return new _e(Qt(e, n));
      }
      let _e = (() => {
        class e {
          constructor(t) {
            this.nativeElement = t;
          }
          static #e = (this.__NG_ELEMENT_ID__ = _F);
        }
        return e;
      })();
      function vF(e) {
        return e instanceof _e ? e.nativeElement : e;
      }
      class Po {}
      let hn = (() => {
          class e {
            constructor() {
              this.destroyNode = null;
            }
            static #e = (this.__NG_ELEMENT_ID__ = () =>
              (function yF() {
                const e = C(),
                  t = un(Et().index, e);
                return (Kt(t) ? t : e)[Q];
              })());
          }
          return e;
        })(),
        bF = (() => {
          class e {
            static #e = (this.ɵprov = N({
              token: e,
              providedIn: 'root',
              factory: () => null,
            }));
          }
          return e;
        })();
      class Cr {
        constructor(n) {
          (this.full = n),
            (this.major = n.split('.')[0]),
            (this.minor = n.split('.')[1]),
            (this.patch = n.split('.').slice(2).join('.'));
        }
      }
      const DF = new Cr('16.2.12'),
        $h = {};
      function r0(e, n = null, t = null, i) {
        const r = o0(e, n, t, i);
        return r.resolveInjectorInitializers(), r;
      }
      function o0(e, n = null, t = null, i, r = new Set()) {
        const o = [t || ge, YR(e)];
        return (
          (i = i || ('object' == typeof e ? void 0 : dt(e))),
          new No(o, n || Nc(), i || null, r)
        );
      }
      let St = (() => {
        class e {
          static #e = (this.THROW_IF_NOT_FOUND = Fs);
          static #t = (this.NULL = new Eh());
          static create(t, i) {
            if (Array.isArray(t)) return r0({ name: '' }, i, t, '');
            {
              const r = t.name ?? '';
              return r0({ name: r }, t.parent, t.providers, r);
            }
          }
          static #n = (this.ɵprov = N({
            token: e,
            providedIn: 'any',
            factory: () => x(jb),
          }));
          static #i = (this.__NG_ELEMENT_ID__ = -1);
        }
        return e;
      })();
      function zh(e) {
        return e.ngOriginalError;
      }
      class Mi {
        constructor() {
          this._console = console;
        }
        handleError(n) {
          const t = this._findOriginalError(n);
          this._console.error('ERROR', n),
            t && this._console.error('ORIGINAL ERROR', t);
        }
        _findOriginalError(n) {
          let t = n && zh(n);
          for (; t && zh(t); ) t = zh(t);
          return t || null;
        }
      }
      function Gh(e) {
        return n => {
          setTimeout(e, void 0, n);
        };
      }
      const H = class IF extends Ne {
        constructor(n = !1) {
          super(), (this.__isAsync = n);
        }
        emit(n) {
          super.next(n);
        }
        subscribe(n, t, i) {
          let r = n,
            o = t || (() => null),
            s = i;
          if (n && 'object' == typeof n) {
            const l = n;
            (r = l.next?.bind(l)),
              (o = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((o = Gh(o)), r && (r = Gh(r)), s && (s = Gh(s)));
          const a = super.subscribe({ next: r, error: o, complete: s });
          return n instanceof Pt && n.add(a), a;
        }
      };
      function a0(...e) {}
      class ae {
        constructor({
          enableLongStackTrace: n = !1,
          shouldCoalesceEventChangeDetection: t = !1,
          shouldCoalesceRunChangeDetection: i = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new H(!1)),
            (this.onMicrotaskEmpty = new H(!1)),
            (this.onStable = new H(!1)),
            (this.onError = new H(!1)),
            typeof Zone > 'u')
          )
            throw new b(908, !1);
          Zone.assertZonePatched();
          const r = this;
          (r._nesting = 0),
            (r._outer = r._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
            n &&
              Zone.longStackTraceZoneSpec &&
              (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
            (r.shouldCoalesceEventChangeDetection = !i && t),
            (r.shouldCoalesceRunChangeDetection = i),
            (r.lastRequestAnimationFrameId = -1),
            (r.nativeRequestAnimationFrame = (function AF() {
              const e = 'function' == typeof ke.requestAnimationFrame;
              let n = ke[e ? 'requestAnimationFrame' : 'setTimeout'],
                t = ke[e ? 'cancelAnimationFrame' : 'clearTimeout'];
              if (typeof Zone < 'u' && n && t) {
                const i = n[Zone.__symbol__('OriginalDelegate')];
                i && (n = i);
                const r = t[Zone.__symbol__('OriginalDelegate')];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: n,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function RF(e) {
              const n = () => {
                !(function OF(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(ke, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            'fakeTopEventTask',
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                qh(e),
                                (e.isCheckStableRunning = !0),
                                Wh(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    qh(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (t, i, r, o, s, a) => {
                  if (
                    (function kF(e) {
                      return (
                        !(!Array.isArray(e) || 1 !== e.length) &&
                        !0 === e[0].data?.__ignore_ng_zone__
                      );
                    })(a)
                  )
                    return t.invokeTask(r, o, s, a);
                  try {
                    return l0(e), t.invokeTask(r, o, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      'eventTask' === o.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      n(),
                      c0(e);
                  }
                },
                onInvoke: (t, i, r, o, s, a, l) => {
                  try {
                    return l0(e), t.invoke(r, o, s, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && n(), c0(e);
                  }
                },
                onHasTask: (t, i, r, o) => {
                  t.hasTask(r, o),
                    i === r &&
                      ('microTask' == o.change
                        ? ((e._hasPendingMicrotasks = o.microTask),
                          qh(e),
                          Wh(e))
                        : 'macroTask' == o.change &&
                          (e.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (t, i, r, o) => (
                  t.handleError(r, o),
                  e.runOutsideAngular(() => e.onError.emit(o)),
                  !1
                ),
              });
            })(r);
        }
        static isInAngularZone() {
          return typeof Zone < 'u' && !0 === Zone.current.get('isAngularZone');
        }
        static assertInAngularZone() {
          if (!ae.isInAngularZone()) throw new b(909, !1);
        }
        static assertNotInAngularZone() {
          if (ae.isInAngularZone()) throw new b(909, !1);
        }
        run(n, t, i) {
          return this._inner.run(n, t, i);
        }
        runTask(n, t, i, r) {
          const o = this._inner,
            s = o.scheduleEventTask('NgZoneEvent: ' + r, n, NF, a0, a0);
          try {
            return o.runTask(s, t, i);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(n, t, i) {
          return this._inner.runGuarded(n, t, i);
        }
        runOutsideAngular(n) {
          return this._outer.run(n);
        }
      }
      const NF = {};
      function Wh(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function qh(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function l0(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function c0(e) {
        e._nesting--, Wh(e);
      }
      class FF {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new H()),
            (this.onMicrotaskEmpty = new H()),
            (this.onStable = new H()),
            (this.onError = new H());
        }
        run(n, t, i) {
          return n.apply(t, i);
        }
        runGuarded(n, t, i) {
          return n.apply(t, i);
        }
        runOutsideAngular(n) {
          return n();
        }
        runTask(n, t, i, r) {
          return n.apply(t, i);
        }
      }
      const d0 = new T('', { providedIn: 'root', factory: u0 });
      function u0() {
        const e = I(ae);
        let n = !0;
        return (function vv(...e) {
          const n = Rs(e),
            t = (function MA(e, n) {
              return 'number' == typeof ff(e) ? e.pop() : n;
            })(e, 1 / 0),
            i = e;
          return i.length ? (1 === i.length ? at(i[0]) : ro(t)(ct(i, n))) : wn;
        })(
          new Ae(r => {
            (n =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                r.next(n), r.complete();
              });
          }),
          new Ae(r => {
            let o;
            e.runOutsideAngular(() => {
              o = e.onStable.subscribe(() => {
                ae.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !n &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((n = !0), r.next(!0));
                  });
              });
            });
            const s = e.onUnstable.subscribe(() => {
              ae.assertInAngularZone(),
                n &&
                  ((n = !1),
                  e.runOutsideAngular(() => {
                    r.next(!1);
                  }));
            });
            return () => {
              o.unsubscribe(), s.unsubscribe();
            };
          }).pipe(yv())
        );
      }
      function f0(e) {
        return e.ownerDocument.defaultView;
      }
      function Ii(e) {
        return e instanceof Function ? e() : e;
      }
      let Zh = (() => {
        class e {
          constructor() {
            (this.renderDepth = 0), (this.handler = null);
          }
          begin() {
            this.handler?.validateBegin(), this.renderDepth++;
          }
          end() {
            this.renderDepth--,
              0 === this.renderDepth && this.handler?.execute();
          }
          ngOnDestroy() {
            this.handler?.destroy(), (this.handler = null);
          }
          static #e = (this.ɵprov = N({
            token: e,
            providedIn: 'root',
            factory: () => new e(),
          }));
        }
        return e;
      })();
      function ua(e) {
        for (; e; ) {
          e[te] |= 64;
          const n = ta(e);
          if (Nf(e) && !n) return e;
          e = n;
        }
        return null;
      }
      const _0 = new T('', { providedIn: 'root', factory: () => !1 });
      let Hc = null;
      function D0(e, n) {
        return e[n] ?? E0();
      }
      function w0(e, n) {
        const t = E0();
        t.producerNode?.length && ((e[n] = Hc), (t.lView = e), (Hc = C0()));
      }
      const zF = {
        ...qv,
        consumerIsAlwaysLive: !0,
        consumerMarkedDirty: e => {
          ua(e.lView);
        },
        lView: null,
      };
      function C0() {
        return Object.create(zF);
      }
      function E0() {
        return (Hc ??= C0()), Hc;
      }
      const J = {};
      function M(e) {
        S0(he(), C(), jt() + e, !1);
      }
      function S0(e, n, t, i) {
        if (!i)
          if (3 == (3 & n[te])) {
            const o = e.preOrderCheckHooks;
            null !== o && rc(n, o, t);
          } else {
            const o = e.preOrderHooks;
            null !== o && oc(n, o, 0, t);
          }
        vr(t);
      }
      function v(e, n = ce.Default) {
        const t = C();
        return null === t ? x(e, n) : Vy(Et(), t, Y(e), n);
      }
      function Uc(e, n, t, i, r, o, s, a, l, c, d) {
        const u = n.blueprint.slice();
        return (
          (u[Ke] = r),
          (u[te] = 140 | i),
          (null !== c || (e && 2048 & e[te])) && (u[te] |= 2048),
          hy(u),
          (u[He] = u[co] = e),
          (u[Xe] = t),
          (u[lo] = s || (e && e[lo])),
          (u[Q] = a || (e && e[Q])),
          (u[$i] = l || (e && e[$i]) || null),
          (u[Ot] = o),
          (u[Hs] = (function QO() {
            return KO++;
          })()),
          (u[Ei] = d),
          (u[$v] = c),
          (u[et] = 2 == n.type ? e[et] : u),
          u
        );
      }
      function jo(e, n, t, i, r) {
        let o = e.data[n];
        if (null === o)
          (o = (function Yh(e, n, t, i, r) {
            const o = yy(),
              s = Bf(),
              l = (e.data[n] = (function JF(e, n, t, i, r, o) {
                let s = n ? n.injectorIndex : -1,
                  a = 0;
                return (
                  mo() && (a |= 128),
                  {
                    type: t,
                    index: i,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: r,
                    attrs: o,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: n,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? o : o && o.parent, t, n, i, r));
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== o &&
                (s
                  ? null == o.child && null !== l.parent && (o.child = l)
                  : null === o.next && ((o.next = l), (l.prev = o))),
              l
            );
          })(e, n, t, i, r)),
            (function KN() {
              return q.lFrame.inI18n;
            })() && (o.flags |= 32);
        else if (64 & o.type) {
          (o.type = t), (o.value = i), (o.attrs = r);
          const s = (function Ws() {
            const e = q.lFrame,
              n = e.currentTNode;
            return e.isParent ? n : n.parent;
          })();
          o.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return si(o, !0), o;
      }
      function fa(e, n, t, i) {
        if (0 === t) return -1;
        const r = n.length;
        for (let o = 0; o < t; o++)
          n.push(i), e.blueprint.push(i), e.data.push(null);
        return r;
      }
      function T0(e, n, t, i, r) {
        const o = D0(n, Us),
          s = jt(),
          a = 2 & i;
        try {
          vr(-1), a && n.length > de && S0(e, n, de, !1), oi(a ? 2 : 0, r);
          const c = a ? o : null,
            d = Rf(c);
          try {
            null !== c && (c.dirty = !1), t(i, r);
          } finally {
            Ff(c, d);
          }
        } finally {
          a && null === n[Us] && w0(n, Us), vr(s), oi(a ? 3 : 1, r);
        }
      }
      function Kh(e, n, t) {
        if (Af(n)) {
          const i = xn(null);
          try {
            const o = n.directiveEnd;
            for (let s = n.directiveStart; s < o; s++) {
              const a = e.data[s];
              a.contentQueries && a.contentQueries(1, t[s], s);
            }
          } finally {
            xn(i);
          }
        }
      }
      function Qh(e, n, t) {
        vy() &&
          ((function ok(e, n, t, i) {
            const r = t.directiveStart,
              o = t.directiveEnd;
            gr(t) &&
              (function fk(e, n, t) {
                const i = Qt(n, e),
                  r = M0(t);
                let s = 16;
                t.signals ? (s = 4096) : t.onPush && (s = 64);
                const a = $c(
                  e,
                  Uc(
                    e,
                    r,
                    null,
                    s,
                    i,
                    n,
                    null,
                    e[lo].rendererFactory.createRenderer(i, t),
                    null,
                    null,
                    null
                  )
                );
                e[n.index] = a;
              })(n, t, e.data[r + t.componentOffset]),
              e.firstCreatePass || ac(t, n),
              Rt(i, n);
            const s = t.initialInputs;
            for (let a = r; a < o; a++) {
              const l = e.data[a],
                c = yr(n, e, a, t);
              Rt(c, n),
                null !== s && hk(0, a - r, c, l, 0, s),
                Un(l) && (un(t.index, n)[Xe] = yr(n, e, a, t));
            }
          })(e, n, t, Qt(t, n)),
          64 == (64 & t.flags) && R0(e, n, t));
      }
      function Jh(e, n, t = Qt) {
        const i = n.localNames;
        if (null !== i) {
          let r = n.index + 1;
          for (let o = 0; o < i.length; o += 2) {
            const s = i[o + 1],
              a = -1 === s ? t(n, e) : e[s];
            e[r++] = a;
          }
        }
      }
      function M0(e) {
        const n = e.tView;
        return null === n || n.incompleteFirstPass
          ? (e.tView = Xh(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : n;
      }
      function Xh(e, n, t, i, r, o, s, a, l, c, d) {
        const u = de + i,
          f = u + r,
          h = (function WF(e, n) {
            const t = [];
            for (let i = 0; i < n; i++) t.push(i < e ? null : J);
            return t;
          })(u, f),
          p = 'function' == typeof c ? c() : c;
        return (h[P] = {
          type: e,
          blueprint: h,
          template: t,
          queries: null,
          viewQuery: a,
          declTNode: n,
          data: h.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof o ? o() : o,
          pipeRegistry: 'function' == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: d,
        });
      }
      let I0 = e => null;
      function A0(e, n, t, i) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            t = null === t ? {} : t;
            const o = e[r];
            null === i
              ? N0(t, n, r, o)
              : i.hasOwnProperty(r) && N0(t, n, i[r], o);
          }
        return t;
      }
      function N0(e, n, t, i) {
        e.hasOwnProperty(t) ? e[t].push(n, i) : (e[t] = [n, i]);
      }
      function pn(e, n, t, i, r, o, s, a) {
        const l = Qt(n, t);
        let d,
          c = n.inputs;
        !a && null != c && (d = c[i])
          ? (rp(e, t, d, i, r),
            gr(n) &&
              (function tk(e, n) {
                const t = un(n, e);
                16 & t[te] || (t[te] |= 64);
              })(t, n.index))
          : 3 & n.type &&
            ((i = (function ek(e) {
              return 'class' === e
                ? 'className'
                : 'for' === e
                ? 'htmlFor'
                : 'formaction' === e
                ? 'formAction'
                : 'innerHtml' === e
                ? 'innerHTML'
                : 'readonly' === e
                ? 'readOnly'
                : 'tabindex' === e
                ? 'tabIndex'
                : e;
            })(i)),
            (r = null != s ? s(r, n.value || '', i) : r),
            o.setProperty(l, i, r));
      }
      function ep(e, n, t, i) {
        if (vy()) {
          const r = null === i ? null : { '': -1 },
            o = (function ak(e, n) {
              const t = e.directiveRegistry;
              let i = null,
                r = null;
              if (t)
                for (let o = 0; o < t.length; o++) {
                  const s = t[o];
                  if (Lv(n, s.selectors, !1))
                    if ((i || (i = []), Un(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (r = r || new Map()),
                          s.findHostDirectiveDefs(s, a, r),
                          i.unshift(...a, s),
                          tp(e, n, a.length);
                      } else i.unshift(s), tp(e, n, 0);
                    else
                      (r = r || new Map()),
                        s.findHostDirectiveDefs?.(s, i, r),
                        i.push(s);
                }
              return null === i ? null : [i, r];
            })(e, t);
          let s, a;
          null === o ? (s = a = null) : ([s, a] = o),
            null !== s && O0(e, n, t, s, r, a),
            r &&
              (function lk(e, n, t) {
                if (n) {
                  const i = (e.localNames = []);
                  for (let r = 0; r < n.length; r += 2) {
                    const o = t[n[r + 1]];
                    if (null == o) throw new b(-301, !1);
                    i.push(n[r], o);
                  }
                }
              })(t, i, r);
        }
        t.mergedAttrs = Ls(t.mergedAttrs, t.attrs);
      }
      function O0(e, n, t, i, r, o) {
        for (let c = 0; c < i.length; c++) Qf(ac(t, n), e, i[c].type);
        !(function dk(e, n, t) {
          (e.flags |= 1),
            (e.directiveStart = n),
            (e.directiveEnd = n + t),
            (e.providerIndexes = n);
        })(t, e.data.length, i.length);
        for (let c = 0; c < i.length; c++) {
          const d = i[c];
          d.providersResolver && d.providersResolver(d);
        }
        let s = !1,
          a = !1,
          l = fa(e, n, i.length, null);
        for (let c = 0; c < i.length; c++) {
          const d = i[c];
          (t.mergedAttrs = Ls(t.mergedAttrs, d.hostAttrs)),
            uk(e, t, n, l, d),
            ck(l, d, r),
            null !== d.contentQueries && (t.flags |= 4),
            (null !== d.hostBindings ||
              null !== d.hostAttrs ||
              0 !== d.hostVars) &&
              (t.flags |= 64);
          const u = d.type.prototype;
          !s &&
            (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(t.index), (s = !0)),
            !a &&
              (u.ngOnChanges || u.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(t.index), (a = !0)),
            l++;
        }
        !(function XF(e, n, t) {
          const r = n.directiveEnd,
            o = e.data,
            s = n.attrs,
            a = [];
          let l = null,
            c = null;
          for (let d = n.directiveStart; d < r; d++) {
            const u = o[d],
              f = t ? t.get(u) : null,
              p = f ? f.outputs : null;
            (l = A0(u.inputs, d, l, f ? f.inputs : null)),
              (c = A0(u.outputs, d, c, p));
            const m = null === l || null === s || Pv(n) ? null : pk(l, d, s);
            a.push(m);
          }
          null !== l &&
            (l.hasOwnProperty('class') && (n.flags |= 8),
            l.hasOwnProperty('style') && (n.flags |= 16)),
            (n.initialInputs = a),
            (n.inputs = l),
            (n.outputs = c);
        })(e, t, o);
      }
      function R0(e, n, t) {
        const i = t.directiveStart,
          r = t.directiveEnd,
          o = t.index,
          s = (function JN() {
            return q.lFrame.currentDirectiveIndex;
          })();
        try {
          vr(o);
          for (let a = i; a < r; a++) {
            const l = e.data[a],
              c = n[a];
            Hf(a),
              (null !== l.hostBindings ||
                0 !== l.hostVars ||
                null !== l.hostAttrs) &&
                sk(l, c);
          }
        } finally {
          vr(-1), Hf(s);
        }
      }
      function sk(e, n) {
        null !== e.hostBindings && e.hostBindings(1, n);
      }
      function tp(e, n, t) {
        (n.componentOffset = t), (e.components ??= []).push(n.index);
      }
      function ck(e, n, t) {
        if (t) {
          if (n.exportAs)
            for (let i = 0; i < n.exportAs.length; i++) t[n.exportAs[i]] = e;
          Un(n) && (t[''] = e);
        }
      }
      function uk(e, n, t, i, r) {
        e.data[i] = r;
        const o = r.factory || (r.factory = _r(r.type)),
          s = new qs(o, Un(r), v);
        (e.blueprint[i] = s),
          (t[i] = s),
          (function ik(e, n, t, i, r) {
            const o = r.hostBindings;
            if (o) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~n.index;
              (function rk(e) {
                let n = e.length;
                for (; n > 0; ) {
                  const t = e[--n];
                  if ('number' == typeof t && t < 0) return t;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(t, i, o);
            }
          })(e, n, i, fa(e, t, r.hostVars, J), r);
      }
      function li(e, n, t, i, r, o) {
        const s = Qt(e, n);
        !(function np(e, n, t, i, r, o, s) {
          if (null == o) e.removeAttribute(n, r, t);
          else {
            const a = null == s ? K(o) : s(o, i || '', r);
            e.setAttribute(n, r, a, t);
          }
        })(n[Q], s, o, e.value, t, i, r);
      }
      function hk(e, n, t, i, r, o) {
        const s = o[n];
        if (null !== s)
          for (let a = 0; a < s.length; ) F0(i, t, s[a++], s[a++], s[a++]);
      }
      function F0(e, n, t, i, r) {
        const o = xn(null);
        try {
          const s = e.inputTransforms;
          null !== s && s.hasOwnProperty(i) && (r = s[i].call(n, r)),
            null !== e.setInput ? e.setInput(n, r, t, i) : (n[i] = r);
        } finally {
          xn(o);
        }
      }
      function pk(e, n, t) {
        let i = null,
          r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if (0 !== o)
            if (5 !== o) {
              if ('number' == typeof o) break;
              if (e.hasOwnProperty(o)) {
                null === i && (i = []);
                const s = e[o];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === n) {
                    i.push(o, s[a + 1], t[r + 1]);
                    break;
                  }
              }
              r += 2;
            } else r += 2;
          else r += 4;
        }
        return i;
      }
      function k0(e, n, t, i) {
        return [e, !0, !1, n, null, 0, i, t, null, null, null];
      }
      function P0(e, n) {
        const t = e.contentQueries;
        if (null !== t)
          for (let i = 0; i < t.length; i += 2) {
            const o = t[i + 1];
            if (-1 !== o) {
              const s = e.data[o];
              $f(t[i]), s.contentQueries(2, n[o], o);
            }
          }
      }
      function $c(e, n) {
        return e[Bs] ? (e[Uv][Hn] = n) : (e[Bs] = n), (e[Uv] = n), n;
      }
      function ip(e, n, t) {
        $f(0);
        const i = xn(null);
        try {
          n(e, t);
        } finally {
          xn(i);
        }
      }
      function L0(e) {
        return e[ao] || (e[ao] = []);
      }
      function V0(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function j0(e, n) {
        const t = e[$i],
          i = t ? t.get(Mi, null) : null;
        i && i.handleError(n);
      }
      function rp(e, n, t, i, r) {
        for (let o = 0; o < t.length; ) {
          const s = t[o++],
            a = t[o++];
          F0(e.data[s], n[s], i, a, r);
        }
      }
      function mk(e, n) {
        const t = un(n, e),
          i = t[P];
        !(function gk(e, n) {
          for (let t = n.length; t < e.blueprint.length; t++)
            n.push(e.blueprint[t]);
        })(i, t);
        const r = t[Ke];
        null !== r && null === t[Ei] && (t[Ei] = jh(r, t[$i])), op(i, t, t[Xe]);
      }
      function op(e, n, t) {
        zf(n);
        try {
          const i = e.viewQuery;
          null !== i && ip(1, i, t);
          const r = e.template;
          null !== r && T0(e, n, r, 1, t),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && P0(e, n),
            e.staticViewQueries && ip(2, e.viewQuery, t);
          const o = e.components;
          null !== o &&
            (function _k(e, n) {
              for (let t = 0; t < n.length; t++) mk(e, n[t]);
            })(n, o);
        } catch (i) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            i)
          );
        } finally {
          (n[te] &= -5), Gf();
        }
      }
      let H0 = (() => {
        class e {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(t, i, r) {
            const o = typeof Zone > 'u' ? null : Zone.current,
              s = (function MN(e, n, t) {
                const i = Object.create(IN);
                t && (i.consumerAllowSignalWrites = !0),
                  (i.fn = e),
                  (i.schedule = n);
                const r = s => {
                  i.cleanupFn = s;
                };
                return (
                  (i.ref = {
                    notify: () => Qv(i),
                    run: () => {
                      if (((i.dirty = !1), i.hasRun && !Jv(i))) return;
                      i.hasRun = !0;
                      const s = Rf(i);
                      try {
                        i.cleanupFn(), (i.cleanupFn = sy), i.fn(r);
                      } finally {
                        Ff(i, s);
                      }
                    },
                    cleanup: () => i.cleanupFn(),
                  }),
                  i.ref
                );
              })(
                t,
                c => {
                  this.all.has(c) && this.queue.set(c, o);
                },
                r
              );
            let a;
            this.all.add(s), s.notify();
            const l = () => {
              s.cleanup(), a?.(), this.all.delete(s), this.queue.delete(s);
            };
            return (a = i?.onDestroy(l)), { destroy: l };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [t, i] of this.queue)
                this.queue.delete(t), i ? i.run(() => t.run()) : t.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
          static #e = (this.ɵprov = N({
            token: e,
            providedIn: 'root',
            factory: () => new e(),
          }));
        }
        return e;
      })();
      function zc(e, n, t) {
        let i = t ? e.styles : null,
          r = t ? e.classes : null,
          o = 0;
        if (null !== n)
          for (let s = 0; s < n.length; s++) {
            const a = n[s];
            'number' == typeof a
              ? (o = a)
              : 1 == o
              ? (r = pf(r, a))
              : 2 == o && (i = pf(i, a + ': ' + n[++s] + ';'));
          }
        t ? (e.styles = i) : (e.stylesWithoutHost = i),
          t ? (e.classes = r) : (e.classesWithoutHost = r);
      }
      function ha(e, n, t, i, r = !1) {
        for (; null !== t; ) {
          const o = n[t.index];
          null !== o && i.push(Pe(o)), Vt(o) && U0(o, i);
          const s = t.type;
          if (8 & s) ha(e, n, t.child, i);
          else if (32 & s) {
            const a = ch(t, n);
            let l;
            for (; (l = a()); ) i.push(l);
          } else if (16 & s) {
            const a = Cb(n, t);
            if (Array.isArray(a)) i.push(...a);
            else {
              const l = ta(n[et]);
              ha(l[P], l, a, i, !0);
            }
          }
          t = r ? t.projectionNext : t.next;
        }
        return i;
      }
      function U0(e, n) {
        for (let t = Dt; t < e.length; t++) {
          const i = e[t],
            r = i[P].firstChild;
          null !== r && ha(i[P], i, r, n);
        }
        e[ri] !== e[Ke] && n.push(e[ri]);
      }
      function Gc(e, n, t, i = !0) {
        const r = n[lo],
          o = r.rendererFactory,
          s = r.afterRenderEventManager;
        o.begin?.(), s?.begin();
        try {
          $0(e, n, e.template, t);
        } catch (l) {
          throw (i && j0(n, l), l);
        } finally {
          o.end?.(), r.effectManager?.flush(), s?.end();
        }
      }
      function $0(e, n, t, i) {
        const r = n[te];
        if (256 != (256 & r)) {
          n[lo].effectManager?.flush(), zf(n);
          try {
            hy(n),
              (function Dy(e) {
                return (q.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== t && T0(e, n, t, 2, i);
            const s = 3 == (3 & r);
            if (s) {
              const c = e.preOrderCheckHooks;
              null !== c && rc(n, c, null);
            } else {
              const c = e.preOrderHooks;
              null !== c && oc(n, c, 0, null), Wf(n, 0);
            }
            if (
              ((function bk(e) {
                for (let n = ub(e); null !== n; n = fb(n)) {
                  if (!n[zv]) continue;
                  const t = n[fo];
                  for (let i = 0; i < t.length; i++) {
                    BN(t[i]);
                  }
                }
              })(n),
              z0(n, 2),
              null !== e.contentQueries && P0(e, n),
              s)
            ) {
              const c = e.contentCheckHooks;
              null !== c && rc(n, c);
            } else {
              const c = e.contentHooks;
              null !== c && oc(n, c, 1), Wf(n, 1);
            }
            !(function GF(e, n) {
              const t = e.hostBindingOpCodes;
              if (null === t) return;
              const i = D0(n, $s);
              try {
                for (let r = 0; r < t.length; r++) {
                  const o = t[r];
                  if (o < 0) vr(~o);
                  else {
                    const s = o,
                      a = t[++r],
                      l = t[++r];
                    QN(a, s), (i.dirty = !1);
                    const c = Rf(i);
                    try {
                      l(2, n[s]);
                    } finally {
                      Ff(i, c);
                    }
                  }
                }
              } finally {
                null === n[$s] && w0(n, $s), vr(-1);
              }
            })(e, n);
            const a = e.components;
            null !== a && W0(n, a, 0);
            const l = e.viewQuery;
            if ((null !== l && ip(2, l, i), s)) {
              const c = e.viewCheckHooks;
              null !== c && rc(n, c);
            } else {
              const c = e.viewHooks;
              null !== c && oc(n, c, 2), Wf(n, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (n[te] &= -73),
              py(n);
          } finally {
            Gf();
          }
        }
      }
      function z0(e, n) {
        for (let t = ub(e); null !== t; t = fb(t))
          for (let i = Dt; i < t.length; i++) G0(t[i], n);
      }
      function Dk(e, n, t) {
        G0(un(n, e), t);
      }
      function G0(e, n) {
        if (
          !(function LN(e) {
            return 128 == (128 & e[te]);
          })(e)
        )
          return;
        const t = e[P],
          i = e[te];
        if ((80 & i && 0 === n) || 1024 & i || 2 === n)
          $0(t, e, t.template, e[Xe]);
        else if (e[Vs] > 0) {
          z0(e, 1);
          const r = t.components;
          null !== r && W0(e, r, 1);
        }
      }
      function W0(e, n, t) {
        for (let i = 0; i < n.length; i++) Dk(e, n[i], t);
      }
      class pa {
        get rootNodes() {
          const n = this._lView,
            t = n[P];
          return ha(t, n, t.firstChild, []);
        }
        constructor(n, t) {
          (this._lView = n),
            (this._cdRefInjectingView = t),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[Xe];
        }
        set context(n) {
          this._lView[Xe] = n;
        }
        get destroyed() {
          return 256 == (256 & this._lView[te]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const n = this._lView[He];
            if (Vt(n)) {
              const t = n[8],
                i = t ? t.indexOf(this) : -1;
              i > -1 && (wc(n, i), dc(t, i));
            }
            this._attachedToViewContainer = !1;
          }
          uh(this._lView[P], this._lView);
        }
        onDestroy(n) {
          !(function gy(e, n) {
            if (256 == (256 & e[te])) throw new b(911, !1);
            null === e[zi] && (e[zi] = []), e[zi].push(n);
          })(this._lView, n);
        }
        markForCheck() {
          ua(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[te] &= -129;
        }
        reattach() {
          this._lView[te] |= 128;
        }
        detectChanges() {
          Gc(this._lView[P], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new b(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function uR(e, n) {
              ia(e, n, n[Q], 2, null, null);
            })(this._lView[P], this._lView);
        }
        attachToAppRef(n) {
          if (this._attachedToViewContainer) throw new b(902, !1);
          this._appRef = n;
        }
      }
      class wk extends pa {
        constructor(n) {
          super(n), (this._view = n);
        }
        detectChanges() {
          const n = this._view;
          Gc(n[P], n, n[Xe], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class q0 extends Vc {
        constructor(n) {
          super(), (this.ngModule = n);
        }
        resolveComponentFactory(n) {
          const t = fe(n);
          return new ma(t, this.ngModule);
        }
      }
      function Z0(e) {
        const n = [];
        for (let t in e)
          e.hasOwnProperty(t) && n.push({ propName: e[t], templateName: t });
        return n;
      }
      class Ek {
        constructor(n, t) {
          (this.injector = n), (this.parentInjector = t);
        }
        get(n, t, i) {
          i = ql(i);
          const r = this.injector.get(n, $h, i);
          return r !== $h || t === $h ? r : this.parentInjector.get(n, t, i);
        }
      }
      class ma extends Jb {
        get inputs() {
          const n = this.componentDef,
            t = n.inputTransforms,
            i = Z0(n.inputs);
          if (null !== t)
            for (const r of i)
              t.hasOwnProperty(r.propName) && (r.transform = t[r.propName]);
          return i;
        }
        get outputs() {
          return Z0(this.componentDef.outputs);
        }
        constructor(n, t) {
          super(),
            (this.componentDef = n),
            (this.ngModule = t),
            (this.componentType = n.type),
            (this.selector = (function cN(e) {
              return e.map(lN).join(',');
            })(n.selectors)),
            (this.ngContentSelectors = n.ngContentSelectors
              ? n.ngContentSelectors
              : []),
            (this.isBoundToModule = !!t);
        }
        create(n, t, i, r) {
          let o = (r = r || this.ngModule) instanceof Ut ? r : r?.injector;
          o &&
            null !== this.componentDef.getStandaloneInjector &&
            (o = this.componentDef.getStandaloneInjector(o) || o);
          const s = o ? new Ek(n, o) : n,
            a = s.get(Po, null);
          if (null === a) throw new b(407, !1);
          const u = {
              rendererFactory: a,
              sanitizer: s.get(bF, null),
              effectManager: s.get(H0, null),
              afterRenderEventManager: s.get(Zh, null),
            },
            f = a.createRenderer(null, this.componentDef),
            h = this.componentDef.selectors[0][0] || 'div',
            p = i
              ? (function qF(e, n, t, i) {
                  const o = i.get(_0, !1) || t === Sn.ShadowDom,
                    s = e.selectRootElement(n, o);
                  return (
                    (function ZF(e) {
                      I0(e);
                    })(s),
                    s
                  );
                })(f, i, this.componentDef.encapsulation, s)
              : Dc(
                  f,
                  h,
                  (function Ck(e) {
                    const n = e.toLowerCase();
                    return 'svg' === n ? 'svg' : 'math' === n ? 'math' : null;
                  })(h)
                ),
            y = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
              ? 576
              : 528;
          let _ = null;
          null !== p && (_ = jh(p, s, !0));
          const D = Xh(0, null, null, 1, 0, null, null, null, null, null, null),
            w = Uc(null, D, null, y, null, null, u, f, s, null, _);
          let F, j;
          zf(w);
          try {
            const z = this.componentDef;
            let ee,
              ve = null;
            z.findHostDirectiveDefs
              ? ((ee = []),
                (ve = new Map()),
                z.findHostDirectiveDefs(z, ee, ve),
                ee.push(z))
              : (ee = [z]);
            const we = (function xk(e, n) {
                const t = e[P],
                  i = de;
                return (e[i] = n), jo(t, i, 2, '#host', null);
              })(w, p),
              rt = (function Tk(e, n, t, i, r, o, s) {
                const a = r[P];
                !(function Mk(e, n, t, i) {
                  for (const r of e)
                    n.mergedAttrs = Ls(n.mergedAttrs, r.hostAttrs);
                  null !== n.mergedAttrs &&
                    (zc(n, n.mergedAttrs, !0), null !== t && Tb(i, t, n));
                })(i, e, n, s);
                let l = null;
                null !== n && (l = jh(n, r[$i]));
                const c = o.rendererFactory.createRenderer(n, t);
                let d = 16;
                t.signals ? (d = 4096) : t.onPush && (d = 64);
                const u = Uc(
                  r,
                  M0(t),
                  null,
                  d,
                  r[e.index],
                  e,
                  o,
                  c,
                  null,
                  null,
                  l
                );
                return (
                  a.firstCreatePass && tp(a, e, i.length - 1),
                  $c(r, u),
                  (r[e.index] = u)
                );
              })(we, p, z, ee, w, u, f);
            (j = fy(D, de)),
              p &&
                (function Ak(e, n, t, i) {
                  if (i) Mf(e, t, ['ng-version', DF.full]);
                  else {
                    const { attrs: r, classes: o } = (function dN(e) {
                      const n = [],
                        t = [];
                      let i = 1,
                        r = 2;
                      for (; i < e.length; ) {
                        let o = e[i];
                        if ('string' == typeof o)
                          2 === r
                            ? '' !== o && n.push(o, e[++i])
                            : 8 === r && t.push(o);
                        else {
                          if (!jn(r)) break;
                          r = o;
                        }
                        i++;
                      }
                      return { attrs: n, classes: t };
                    })(n.selectors[0]);
                    r && Mf(e, t, r),
                      o && o.length > 0 && xb(e, t, o.join(' '));
                  }
                })(f, z, p, i),
              void 0 !== t &&
                (function Nk(e, n, t) {
                  const i = (e.projection = []);
                  for (let r = 0; r < n.length; r++) {
                    const o = t[r];
                    i.push(null != o ? Array.from(o) : null);
                  }
                })(j, this.ngContentSelectors, t),
              (F = (function Ik(e, n, t, i, r, o) {
                const s = Et(),
                  a = r[P],
                  l = Qt(s, r);
                O0(a, r, s, t, null, i);
                for (let d = 0; d < t.length; d++)
                  Rt(yr(r, a, s.directiveStart + d, s), r);
                R0(a, r, s), l && Rt(l, r);
                const c = yr(r, a, s.directiveStart + s.componentOffset, s);
                if (((e[Xe] = r[Xe] = c), null !== o))
                  for (const d of o) d(c, n);
                return Kh(a, s, e), c;
              })(rt, z, ee, ve, w, [Ok])),
              op(D, w, null);
          } finally {
            Gf();
          }
          return new Sk(this.componentType, F, ko(j, w), w, j);
        }
      }
      class Sk extends pF {
        constructor(n, t, i, r, o) {
          super(),
            (this.location = i),
            (this._rootLView = r),
            (this._tNode = o),
            (this.previousInputValues = null),
            (this.instance = t),
            (this.hostView = this.changeDetectorRef = new wk(r)),
            (this.componentType = n);
        }
        setInput(n, t) {
          const i = this._tNode.inputs;
          let r;
          if (null !== i && (r = i[n])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(n) &&
                Object.is(this.previousInputValues.get(n), t))
            )
              return;
            const o = this._rootLView;
            rp(o[P], o, r, n, t),
              this.previousInputValues.set(n, t),
              ua(un(this._tNode.index, o));
          }
        }
        get injector() {
          return new Ht(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(n) {
          this.hostView.onDestroy(n);
        }
      }
      function Ok() {
        const e = Et();
        ic(C()[P], e);
      }
      function Ee(e) {
        let n = (function Y0(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          t = !0;
        const i = [e];
        for (; n; ) {
          let r;
          if (Un(e)) r = n.ɵcmp || n.ɵdir;
          else {
            if (n.ɵcmp) throw new b(903, !1);
            r = n.ɵdir;
          }
          if (r) {
            if (t) {
              i.push(r);
              const s = e;
              (s.inputs = Wc(e.inputs)),
                (s.inputTransforms = Wc(e.inputTransforms)),
                (s.declaredInputs = Wc(e.declaredInputs)),
                (s.outputs = Wc(e.outputs));
              const a = r.hostBindings;
              a && Pk(e, a);
              const l = r.viewQuery,
                c = r.contentQueries;
              if (
                (l && Fk(e, l),
                c && kk(e, c),
                Hl(e.inputs, r.inputs),
                Hl(e.declaredInputs, r.declaredInputs),
                Hl(e.outputs, r.outputs),
                null !== r.inputTransforms &&
                  (null === s.inputTransforms && (s.inputTransforms = {}),
                  Hl(s.inputTransforms, r.inputTransforms)),
                Un(r) && r.data.animation)
              ) {
                const d = e.data;
                d.animation = (d.animation || []).concat(r.data.animation);
              }
            }
            const o = r.features;
            if (o)
              for (let s = 0; s < o.length; s++) {
                const a = o[s];
                a && a.ngInherit && a(e), a === Ee && (t = !1);
              }
          }
          n = Object.getPrototypeOf(n);
        }
        !(function Rk(e) {
          let n = 0,
            t = null;
          for (let i = e.length - 1; i >= 0; i--) {
            const r = e[i];
            (r.hostVars = n += r.hostVars),
              (r.hostAttrs = Ls(r.hostAttrs, (t = Ls(t, r.hostAttrs))));
          }
        })(i);
      }
      function Wc(e) {
        return e === ni ? {} : e === ge ? [] : e;
      }
      function Fk(e, n) {
        const t = e.viewQuery;
        e.viewQuery = t
          ? (i, r) => {
              n(i, r), t(i, r);
            }
          : n;
      }
      function kk(e, n) {
        const t = e.contentQueries;
        e.contentQueries = t
          ? (i, r, o) => {
              n(i, r, o), t(i, r, o);
            }
          : n;
      }
      function Pk(e, n) {
        const t = e.hostBindings;
        e.hostBindings = t
          ? (i, r) => {
              n(i, r), t(i, r);
            }
          : n;
      }
      function X0(e) {
        const n = e.inputConfig,
          t = {};
        for (const i in n)
          if (n.hasOwnProperty(i)) {
            const r = n[i];
            Array.isArray(r) && r[2] && (t[i] = r[2]);
          }
        e.inputTransforms = t;
      }
      function qc(e) {
        return (
          !!(function sp(e) {
            return (
              null !== e && ('function' == typeof e || 'object' == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function ci(e, n, t) {
        return (e[n] = t);
      }
      function Ft(e, n, t) {
        return !Object.is(e[n], t) && ((e[n] = t), !0);
      }
      function ye(e, n, t, i) {
        const r = C();
        return Ft(r, go(), n) && (he(), li($e(), r, e, n, t, i)), ye;
      }
      function Uo(e, n, t, i) {
        return Ft(e, go(), t) ? n + K(t) + i : J;
      }
      function L(e, n, t, i, r, o, s, a) {
        const l = C(),
          c = he(),
          d = e + de,
          u = c.firstCreatePass
            ? (function sP(e, n, t, i, r, o, s, a, l) {
                const c = n.consts,
                  d = jo(n, e, 4, s || null, Wi(c, a));
                ep(n, t, d, Wi(c, l)), ic(n, d);
                const u = (d.tView = Xh(
                  2,
                  d,
                  i,
                  r,
                  o,
                  n.directiveRegistry,
                  n.pipeRegistry,
                  null,
                  n.schemas,
                  c,
                  null
                ));
                return (
                  null !== n.queries &&
                    (n.queries.template(n, d),
                    (u.queries = n.queries.embeddedTView(d))),
                  d
                );
              })(d, c, l, n, t, i, r, o, s)
            : c.data[d];
        si(u, !1);
        const f = fD(c, l, u, e);
        nc() && Ec(c, l, f, u),
          Rt(f, l),
          $c(l, (l[d] = k0(f, l, f, u))),
          Jl(u) && Qh(c, l, u),
          null != s && Jh(l, u, a);
      }
      let fD = function hD(e, n, t, i) {
        return qi(!0), n[Q].createComment('');
      };
      function R(e, n, t) {
        const i = C();
        return Ft(i, go(), n) && pn(he(), $e(), i, e, n, i[Q], t, !1), R;
      }
      function fp(e, n, t, i, r) {
        const s = r ? 'class' : 'style';
        rp(e, t, n.inputs[s], s, i);
      }
      function E(e, n, t, i) {
        const r = C(),
          o = he(),
          s = de + e,
          a = r[Q],
          l = o.firstCreatePass
            ? (function dP(e, n, t, i, r, o) {
                const s = n.consts,
                  l = jo(n, e, 2, i, Wi(s, r));
                return (
                  ep(n, t, l, Wi(s, o)),
                  null !== l.attrs && zc(l, l.attrs, !1),
                  null !== l.mergedAttrs && zc(l, l.mergedAttrs, !0),
                  null !== n.queries && n.queries.elementStart(n, l),
                  l
                );
              })(s, o, r, n, t, i)
            : o.data[s],
          c = pD(o, r, l, a, n, e);
        r[s] = c;
        const d = Jl(l);
        return (
          si(l, !0),
          Tb(a, c, l),
          32 != (32 & l.flags) && nc() && Ec(o, r, c, l),
          0 ===
            (function HN() {
              return q.lFrame.elementDepthCount;
            })() && Rt(c, r),
          (function UN() {
            q.lFrame.elementDepthCount++;
          })(),
          d && (Qh(o, r, l), Kh(o, l, r)),
          null !== i && Jh(r, l),
          E
        );
      }
      function S() {
        let e = Et();
        Bf() ? jf() : ((e = e.parent), si(e, !1));
        const n = e;
        (function zN(e) {
          return q.skipHydrationRootTNode === e;
        })(n) &&
          (function ZN() {
            q.skipHydrationRootTNode = null;
          })(),
          (function $N() {
            q.lFrame.elementDepthCount--;
          })();
        const t = he();
        return (
          t.firstCreatePass && (ic(t, e), Af(e) && t.queries.elementEnd(e)),
          null != n.classesWithoutHost &&
            (function cO(e) {
              return 0 != (8 & e.flags);
            })(n) &&
            fp(t, n, C(), n.classesWithoutHost, !0),
          null != n.stylesWithoutHost &&
            (function dO(e) {
              return 0 != (16 & e.flags);
            })(n) &&
            fp(t, n, C(), n.stylesWithoutHost, !1),
          S
        );
      }
      function Be(e, n, t, i) {
        return E(e, n, t, i), S(), Be;
      }
      let pD = (e, n, t, i, r, o) => (
        qi(!0),
        Dc(
          i,
          r,
          (function Iy() {
            return q.lFrame.currentNamespace;
          })()
        )
      );
      function $t() {
        return C();
      }
      function Da(e) {
        return !!e && 'function' == typeof e.then;
      }
      function _D(e) {
        return !!e && 'function' == typeof e.subscribe;
      }
      function X(e, n, t, i) {
        const r = C(),
          o = he(),
          s = Et();
        return (
          (function yD(e, n, t, i, r, o, s) {
            const a = Jl(i),
              c = e.firstCreatePass && V0(e),
              d = n[Xe],
              u = L0(n);
            let f = !0;
            if (3 & i.type || s) {
              const m = Qt(i, n),
                g = s ? s(m) : m,
                y = u.length,
                _ = s ? w => s(Pe(w[i.index])) : i.index;
              let D = null;
              if (
                (!s &&
                  a &&
                  (D = (function gP(e, n, t, i) {
                    const r = e.cleanup;
                    if (null != r)
                      for (let o = 0; o < r.length - 1; o += 2) {
                        const s = r[o];
                        if (s === t && r[o + 1] === i) {
                          const a = n[ao],
                            l = r[o + 2];
                          return a.length > l ? a[l] : null;
                        }
                        'string' == typeof s && (o += 2);
                      }
                    return null;
                  })(e, n, r, i.index)),
                null !== D)
              )
                ((D.__ngLastListenerFn__ || D).__ngNextListenerFn__ = o),
                  (D.__ngLastListenerFn__ = o),
                  (f = !1);
              else {
                o = DD(i, n, d, o, !1);
                const w = t.listen(g, r, o);
                u.push(o, w), c && c.push(r, _, y, y + 1);
              }
            } else o = DD(i, n, d, o, !1);
            const h = i.outputs;
            let p;
            if (f && null !== h && (p = h[r])) {
              const m = p.length;
              if (m)
                for (let g = 0; g < m; g += 2) {
                  const F = n[p[g]][p[g + 1]].subscribe(o),
                    j = u.length;
                  u.push(o, F), c && c.push(r, i.index, j, -(j + 1));
                }
            }
          })(o, r, r[Q], s, e, n, i),
          X
        );
      }
      function bD(e, n, t, i) {
        try {
          return oi(6, n, t), !1 !== t(i);
        } catch (r) {
          return j0(e, r), !1;
        } finally {
          oi(7, n, t);
        }
      }
      function DD(e, n, t, i, r) {
        return function o(s) {
          if (s === Function) return i;
          ua(e.componentOffset > -1 ? un(e.index, n) : n);
          let l = bD(n, t, i, s),
            c = o.__ngNextListenerFn__;
          for (; c; ) (l = bD(n, t, c, s) && l), (c = c.__ngNextListenerFn__);
          return r && !1 === l && s.preventDefault(), l;
        };
      }
      function B(e = 1) {
        return (function eO(e) {
          return (q.lFrame.contextLView = (function tO(e, n) {
            for (; e > 0; ) (n = n[co]), e--;
            return n;
          })(e, q.lFrame.contextLView))[Xe];
        })(e);
      }
      function _P(e, n) {
        let t = null;
        const i = (function rN(e) {
          const n = e.attrs;
          if (null != n) {
            const t = n.indexOf(5);
            if (!(1 & t)) return n[t + 1];
          }
          return null;
        })(e);
        for (let r = 0; r < n.length; r++) {
          const o = n[r];
          if ('*' !== o) {
            if (null === i ? Lv(e, o, !0) : aN(i, o)) return r;
          } else t = r;
        }
        return t;
      }
      function wa(e, n, t) {
        return Jc(e, '', n, '', t), wa;
      }
      function Jc(e, n, t, i, r) {
        const o = C(),
          s = Uo(o, n, t, i);
        return s !== J && pn(he(), $e(), o, e, s, o[Q], r, !1), Jc;
      }
      function Xc(e, n) {
        return (e << 17) | (n << 2);
      }
      function Qi(e) {
        return (e >> 17) & 32767;
      }
      function mp(e) {
        return 2 | e;
      }
      function Sr(e) {
        return (131068 & e) >> 2;
      }
      function gp(e, n) {
        return (-131069 & e) | (n << 2);
      }
      function _p(e) {
        return 1 | e;
      }
      function OD(e, n, t, i, r) {
        const o = e[t + 1],
          s = null === n;
        let a = i ? Qi(o) : Sr(o),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const d = e[a + 1];
          CP(e[a], n) && ((l = !0), (e[a + 1] = i ? _p(d) : mp(d))),
            (a = i ? Qi(d) : Sr(d));
        }
        l && (e[t + 1] = i ? mp(o) : _p(o));
      }
      function CP(e, n) {
        return (
          null === e ||
          null == n ||
          (Array.isArray(e) ? e[1] : e) === n ||
          (!(!Array.isArray(e) || 'string' != typeof n) && Eo(e, n) >= 0)
        );
      }
      const ft = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function RD(e) {
        return e.substring(ft.key, ft.keyEnd);
      }
      function FD(e, n) {
        const t = ft.textEnd;
        return t === n
          ? -1
          : ((n = ft.keyEnd =
              (function TP(e, n, t) {
                for (; n < t && e.charCodeAt(n) > 32; ) n++;
                return n;
              })(e, (ft.key = n), t)),
            Ko(e, n, t));
      }
      function Ko(e, n, t) {
        for (; n < t && e.charCodeAt(n) <= 32; ) n++;
        return n;
      }
      function vp(e, n, t) {
        return zn(e, n, t, !1), vp;
      }
      function pe(e, n) {
        return zn(e, n, null, !0), pe;
      }
      function xr(e) {
        !(function Gn(e, n, t, i) {
          const r = he(),
            o = xi(2);
          r.firstUpdatePass && jD(r, null, o, i);
          const s = C();
          if (t !== J && Ft(s, o, t)) {
            const a = r.data[jt()];
            if (zD(a, i) && !BD(r, o)) {
              let l = i ? a.classesWithoutHost : a.stylesWithoutHost;
              null !== l && (t = pf(l, t || '')), fp(r, a, s, t, i);
            } else
              !(function LP(e, n, t, i, r, o, s, a) {
                r === J && (r = ge);
                let l = 0,
                  c = 0,
                  d = 0 < r.length ? r[0] : null,
                  u = 0 < o.length ? o[0] : null;
                for (; null !== d || null !== u; ) {
                  const f = l < r.length ? r[l + 1] : void 0,
                    h = c < o.length ? o[c + 1] : void 0;
                  let m,
                    p = null;
                  d === u
                    ? ((l += 2), (c += 2), f !== h && ((p = u), (m = h)))
                    : null === u || (null !== d && d < u)
                    ? ((l += 2), (p = d))
                    : ((c += 2), (p = u), (m = h)),
                    null !== p && UD(e, n, t, i, p, m, s, a),
                    (d = l < r.length ? r[l] : null),
                    (u = c < o.length ? o[c] : null);
                }
              })(
                r,
                a,
                s,
                s[Q],
                s[o + 1],
                (s[o + 1] = (function kP(e, n, t) {
                  if (null == t || '' === t) return ge;
                  const i = [],
                    r = Yi(t);
                  if (Array.isArray(r))
                    for (let o = 0; o < r.length; o++) e(i, r[o], !0);
                  else if ('object' == typeof r)
                    for (const o in r) r.hasOwnProperty(o) && e(i, o, r[o]);
                  else 'string' == typeof r && n(i, r);
                  return i;
                })(e, n, t)),
                i,
                o
              );
          }
        })(PP, ui, e, !0);
      }
      function ui(e, n) {
        for (
          let t = (function SP(e) {
            return (
              (function PD(e) {
                (ft.key = 0),
                  (ft.keyEnd = 0),
                  (ft.value = 0),
                  (ft.valueEnd = 0),
                  (ft.textEnd = e.length);
              })(e),
              FD(e, Ko(e, 0, ft.textEnd))
            );
          })(n);
          t >= 0;
          t = FD(n, t)
        )
          fn(e, RD(n), !0);
      }
      function zn(e, n, t, i) {
        const r = C(),
          o = he(),
          s = xi(2);
        o.firstUpdatePass && jD(o, e, s, i),
          n !== J &&
            Ft(r, s, n) &&
            UD(
              o,
              o.data[jt()],
              r,
              r[Q],
              e,
              (r[s + 1] = (function VP(e, n) {
                return (
                  null == e ||
                    '' === e ||
                    ('string' == typeof n
                      ? (e += n)
                      : 'object' == typeof e && (e = dt(Yi(e)))),
                  e
                );
              })(n, t)),
              i,
              s
            );
      }
      function BD(e, n) {
        return n >= e.expandoStartIndex;
      }
      function jD(e, n, t, i) {
        const r = e.data;
        if (null === r[t + 1]) {
          const o = r[jt()],
            s = BD(e, t);
          zD(o, i) && null === n && !s && (n = !1),
            (n = (function NP(e, n, t, i) {
              const r = (function Uf(e) {
                const n = q.lFrame.currentDirectiveIndex;
                return -1 === n ? null : e[n];
              })(e);
              let o = i ? n.residualClasses : n.residualStyles;
              if (null === r)
                0 === (i ? n.classBindings : n.styleBindings) &&
                  ((t = Ca((t = yp(null, e, n, t, i)), n.attrs, i)),
                  (o = null));
              else {
                const s = n.directiveStylingLast;
                if (-1 === s || e[s] !== r)
                  if (((t = yp(r, e, n, t, i)), null === o)) {
                    let l = (function OP(e, n, t) {
                      const i = t ? n.classBindings : n.styleBindings;
                      if (0 !== Sr(i)) return e[Qi(i)];
                    })(e, n, i);
                    void 0 !== l &&
                      Array.isArray(l) &&
                      ((l = yp(null, e, n, l[1], i)),
                      (l = Ca(l, n.attrs, i)),
                      (function RP(e, n, t, i) {
                        e[Qi(t ? n.classBindings : n.styleBindings)] = i;
                      })(e, n, i, l));
                  } else
                    o = (function FP(e, n, t) {
                      let i;
                      const r = n.directiveEnd;
                      for (let o = 1 + n.directiveStylingLast; o < r; o++)
                        i = Ca(i, e[o].hostAttrs, t);
                      return Ca(i, n.attrs, t);
                    })(e, n, i);
              }
              return (
                void 0 !== o &&
                  (i ? (n.residualClasses = o) : (n.residualStyles = o)),
                t
              );
            })(r, o, n, i)),
            (function DP(e, n, t, i, r, o) {
              let s = o ? n.classBindings : n.styleBindings,
                a = Qi(s),
                l = Sr(s);
              e[i] = t;
              let d,
                c = !1;
              if (
                (Array.isArray(t)
                  ? ((d = t[1]), (null === d || Eo(t, d) > 0) && (c = !0))
                  : (d = t),
                r)
              )
                if (0 !== l) {
                  const f = Qi(e[a + 1]);
                  (e[i + 1] = Xc(f, a)),
                    0 !== f && (e[f + 1] = gp(e[f + 1], i)),
                    (e[a + 1] = (function yP(e, n) {
                      return (131071 & e) | (n << 17);
                    })(e[a + 1], i));
                } else
                  (e[i + 1] = Xc(a, 0)),
                    0 !== a && (e[a + 1] = gp(e[a + 1], i)),
                    (a = i);
              else
                (e[i + 1] = Xc(l, 0)),
                  0 === a ? (a = i) : (e[l + 1] = gp(e[l + 1], i)),
                  (l = i);
              c && (e[i + 1] = mp(e[i + 1])),
                OD(e, d, i, !0),
                OD(e, d, i, !1),
                (function wP(e, n, t, i, r) {
                  const o = r ? e.residualClasses : e.residualStyles;
                  null != o &&
                    'string' == typeof n &&
                    Eo(o, n) >= 0 &&
                    (t[i + 1] = _p(t[i + 1]));
                })(n, d, e, i, o),
                (s = Xc(a, l)),
                o ? (n.classBindings = s) : (n.styleBindings = s);
            })(r, o, n, t, s, i);
        }
      }
      function yp(e, n, t, i, r) {
        let o = null;
        const s = t.directiveEnd;
        let a = t.directiveStylingLast;
        for (
          -1 === a ? (a = t.directiveStart) : a++;
          a < s && ((o = n[a]), (i = Ca(i, o.hostAttrs, r)), o !== e);

        )
          a++;
        return null !== e && (t.directiveStylingLast = a), i;
      }
      function Ca(e, n, t) {
        const i = t ? 1 : 2;
        let r = -1;
        if (null !== n)
          for (let o = 0; o < n.length; o++) {
            const s = n[o];
            'number' == typeof s
              ? (r = s)
              : r === i &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ['', e]),
                fn(e, s, !!t || n[++o]));
          }
        return void 0 === e ? null : e;
      }
      function PP(e, n, t) {
        const i = String(n);
        '' !== i && !i.includes(' ') && fn(e, i, t);
      }
      function UD(e, n, t, i, r, o, s, a) {
        if (!(3 & n.type)) return;
        const l = e.data,
          c = l[a + 1],
          d = (function bP(e) {
            return 1 == (1 & e);
          })(c)
            ? $D(l, n, t, r, Sr(c), s)
            : void 0;
        ed(d) ||
          (ed(o) ||
            ((function vP(e) {
              return 2 == (2 & e);
            })(c) &&
              (o = $D(l, null, t, r, a, s))),
          (function DR(e, n, t, i, r) {
            if (n) r ? e.addClass(t, i) : e.removeClass(t, i);
            else {
              let o = -1 === i.indexOf('-') ? void 0 : Zi.DashCase;
              null == r
                ? e.removeStyle(t, i, o)
                : ('string' == typeof r &&
                    r.endsWith('!important') &&
                    ((r = r.slice(0, -10)), (o |= Zi.Important)),
                  e.setStyle(t, i, r, o));
            }
          })(i, s, tc(jt(), t), r, o));
      }
      function $D(e, n, t, i, r, o) {
        const s = null === n;
        let a;
        for (; r > 0; ) {
          const l = e[r],
            c = Array.isArray(l),
            d = c ? l[1] : l,
            u = null === d;
          let f = t[r + 1];
          f === J && (f = u ? ge : void 0);
          let h = u ? eh(f, i) : d === i ? f : void 0;
          if ((c && !ed(h) && (h = eh(l, i)), ed(h) && ((a = h), s))) return a;
          const p = e[r + 1];
          r = s ? Qi(p) : Sr(p);
        }
        if (null !== n) {
          let l = o ? n.residualClasses : n.residualStyles;
          null != l && (a = eh(l, i));
        }
        return a;
      }
      function ed(e) {
        return void 0 !== e;
      }
      function zD(e, n) {
        return 0 != (e.flags & (n ? 8 : 16));
      }
      function $(e, n = '') {
        const t = C(),
          i = he(),
          r = e + de,
          o = i.firstCreatePass ? jo(i, r, 1, n, null) : i.data[r],
          s = GD(i, t, o, n, e);
        (t[r] = s), nc() && Ec(i, t, s, o), si(o, !1);
      }
      let GD = (e, n, t, i, r) => (
        qi(!0),
        (function bc(e, n) {
          return e.createText(n);
        })(n[Q], i)
      );
      function Xt(e) {
        return en('', e, ''), Xt;
      }
      function en(e, n, t) {
        const i = C(),
          r = Uo(i, e, n, t);
        return (
          r !== J &&
            (function Ai(e, n, t) {
              const i = tc(n, e);
              !(function pb(e, n, t) {
                e.setValue(n, t);
              })(e[Q], i, t);
            })(i, jt(), r),
          en
        );
      }
      const Tr = void 0;
      var a2 = [
        'en',
        [['a', 'p'], ['AM', 'PM'], Tr],
        [['AM', 'PM'], Tr, Tr],
        [
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        ],
        Tr,
        [
          ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
        ],
        Tr,
        [
          ['B', 'A'],
          ['BC', 'AD'],
          ['Before Christ', 'Anno Domini'],
        ],
        0,
        [6, 0],
        ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
        ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
        ['{1}, {0}', Tr, "{1} 'at' {0}", Tr],
        [
          '.',
          ',',
          ';',
          '%',
          '+',
          '-',
          'E',
          '\xd7',
          '\u2030',
          '\u221e',
          'NaN',
          ':',
        ],
        ['#,##0.###', '#,##0%', '\xa4#,##0.00', '#E0'],
        'USD',
        '$',
        'US Dollar',
        {},
        'ltr',
        function s2(e) {
          const t = Math.floor(Math.abs(e)),
            i = e.toString().replace(/^[^.]*\.?/, '').length;
          return 1 === t && 0 === i ? 1 : 5;
        },
      ];
      let Qo = {};
      function zt(e) {
        const n = (function l2(e) {
          return e.toLowerCase().replace(/_/g, '-');
        })(e);
        let t = uw(n);
        if (t) return t;
        const i = n.split('-')[0];
        if (((t = uw(i)), t)) return t;
        if ('en' === i) return a2;
        throw new b(701, !1);
      }
      function uw(e) {
        return (
          e in Qo ||
            (Qo[e] =
              ke.ng &&
              ke.ng.common &&
              ke.ng.common.locales &&
              ke.ng.common.locales[e]),
          Qo[e]
        );
      }
      var Le = (function (e) {
        return (
          (e[(e.LocaleId = 0)] = 'LocaleId'),
          (e[(e.DayPeriodsFormat = 1)] = 'DayPeriodsFormat'),
          (e[(e.DayPeriodsStandalone = 2)] = 'DayPeriodsStandalone'),
          (e[(e.DaysFormat = 3)] = 'DaysFormat'),
          (e[(e.DaysStandalone = 4)] = 'DaysStandalone'),
          (e[(e.MonthsFormat = 5)] = 'MonthsFormat'),
          (e[(e.MonthsStandalone = 6)] = 'MonthsStandalone'),
          (e[(e.Eras = 7)] = 'Eras'),
          (e[(e.FirstDayOfWeek = 8)] = 'FirstDayOfWeek'),
          (e[(e.WeekendRange = 9)] = 'WeekendRange'),
          (e[(e.DateFormat = 10)] = 'DateFormat'),
          (e[(e.TimeFormat = 11)] = 'TimeFormat'),
          (e[(e.DateTimeFormat = 12)] = 'DateTimeFormat'),
          (e[(e.NumberSymbols = 13)] = 'NumberSymbols'),
          (e[(e.NumberFormats = 14)] = 'NumberFormats'),
          (e[(e.CurrencyCode = 15)] = 'CurrencyCode'),
          (e[(e.CurrencySymbol = 16)] = 'CurrencySymbol'),
          (e[(e.CurrencyName = 17)] = 'CurrencyName'),
          (e[(e.Currencies = 18)] = 'Currencies'),
          (e[(e.Directionality = 19)] = 'Directionality'),
          (e[(e.PluralCase = 20)] = 'PluralCase'),
          (e[(e.ExtraData = 21)] = 'ExtraData'),
          e
        );
      })(Le || {});
      const Jo = 'en-US';
      let fw = Jo;
      function wp(e, n, t, i, r) {
        if (((e = Y(e)), Array.isArray(e)))
          for (let o = 0; o < e.length; o++) wp(e[o], n, t, i, r);
        else {
          const o = he(),
            s = C(),
            a = Et();
          let l = wr(e) ? e : Y(e.provide);
          const c = Wb(e),
            d = 1048575 & a.providerIndexes,
            u = a.directiveStart,
            f = a.providerIndexes >> 20;
          if (wr(e) || !e.multi) {
            const h = new qs(c, r, v),
              p = Ep(l, n, r ? d : d + f, u);
            -1 === p
              ? (Qf(ac(a, s), o, l),
                Cp(o, e, n.length),
                n.push(l),
                a.directiveStart++,
                a.directiveEnd++,
                r && (a.providerIndexes += 1048576),
                t.push(h),
                s.push(h))
              : ((t[p] = h), (s[p] = h));
          } else {
            const h = Ep(l, n, d + f, u),
              p = Ep(l, n, d, d + f),
              g = p >= 0 && t[p];
            if ((r && !g) || (!r && !(h >= 0 && t[h]))) {
              Qf(ac(a, s), o, l);
              const y = (function oL(e, n, t, i, r) {
                const o = new qs(e, t, v);
                return (
                  (o.multi = []),
                  (o.index = n),
                  (o.componentProviders = 0),
                  Lw(o, r, i && !t),
                  o
                );
              })(r ? rL : iL, t.length, r, i, c);
              !r && g && (t[p].providerFactory = y),
                Cp(o, e, n.length, 0),
                n.push(l),
                a.directiveStart++,
                a.directiveEnd++,
                r && (a.providerIndexes += 1048576),
                t.push(y),
                s.push(y);
            } else Cp(o, e, h > -1 ? h : p, Lw(t[r ? p : h], c, !r && i));
            !r && i && g && t[p].componentProviders++;
          }
        }
      }
      function Cp(e, n, t, i) {
        const r = wr(n),
          o = (function QR(e) {
            return !!e.useClass;
          })(n);
        if (r || o) {
          const l = (o ? Y(n.useClass) : n).prototype.ngOnDestroy;
          if (l) {
            const c = e.destroyHooks || (e.destroyHooks = []);
            if (!r && n.multi) {
              const d = c.indexOf(t);
              -1 === d ? c.push(t, [i, l]) : c[d + 1].push(i, l);
            } else c.push(t, l);
          }
        }
      }
      function Lw(e, n, t) {
        return t && e.componentProviders++, e.multi.push(n) - 1;
      }
      function Ep(e, n, t, i) {
        for (let r = t; r < i; r++) if (n[r] === e) return r;
        return -1;
      }
      function iL(e, n, t, i) {
        return Sp(this.multi, []);
      }
      function rL(e, n, t, i) {
        const r = this.multi;
        let o;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = yr(t, t[P], this.providerFactory.index, i);
          (o = a.slice(0, s)), Sp(r, o);
          for (let l = s; l < a.length; l++) o.push(a[l]);
        } else (o = []), Sp(r, o);
        return o;
      }
      function Sp(e, n) {
        for (let t = 0; t < e.length; t++) n.push((0, e[t])());
        return n;
      }
      function Oe(e, n = []) {
        return t => {
          t.providersResolver = (i, r) =>
            (function nL(e, n, t) {
              const i = he();
              if (i.firstCreatePass) {
                const r = Un(e);
                wp(t, i.data, i.blueprint, r, !0),
                  wp(n, i.data, i.blueprint, r, !1);
              }
            })(i, r ? r(e) : e, n);
        };
      }
      class Mr {}
      class Vw {}
      class xp extends Mr {
        constructor(n, t, i) {
          super(),
            (this._parent = t),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new q0(this));
          const r = dn(n);
          (this._bootstrapComponents = Ii(r.bootstrap)),
            (this._r3Injector = o0(
              n,
              t,
              [
                { provide: Mr, useValue: this },
                { provide: Vc, useValue: this.componentFactoryResolver },
                ...i,
              ],
              dt(n),
              new Set(['environment'])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(n));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const n = this._r3Injector;
          !n.destroyed && n.destroy(),
            this.destroyCbs.forEach(t => t()),
            (this.destroyCbs = null);
        }
        onDestroy(n) {
          this.destroyCbs.push(n);
        }
      }
      class Tp extends Vw {
        constructor(n) {
          super(), (this.moduleType = n);
        }
        create(n) {
          return new xp(this.moduleType, n, []);
        }
      }
      class Bw extends Mr {
        constructor(n) {
          super(),
            (this.componentFactoryResolver = new q0(this)),
            (this.instance = null);
          const t = new No(
            [
              ...n.providers,
              { provide: Mr, useValue: this },
              { provide: Vc, useValue: this.componentFactoryResolver },
            ],
            n.parent || Nc(),
            n.debugName,
            new Set(['environment'])
          );
          (this.injector = t),
            n.runEnvironmentInitializers && t.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(n) {
          this.injector.onDestroy(n);
        }
      }
      function Mp(e, n, t = null) {
        return new Bw({
          providers: e,
          parent: n,
          debugName: t,
          runEnvironmentInitializers: !0,
        }).injector;
      }
      let lL = (() => {
        class e {
          constructor(t) {
            (this._injector = t), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(t) {
            if (!t.standalone) return null;
            if (!this.cachedInjectors.has(t)) {
              const i = Ub(0, t.type),
                r =
                  i.length > 0
                    ? Mp([i], this._injector, `Standalone[${t.type.name}]`)
                    : null;
              this.cachedInjectors.set(t, r);
            }
            return this.cachedInjectors.get(t);
          }
          ngOnDestroy() {
            try {
              for (const t of this.cachedInjectors.values())
                null !== t && t.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
          static #e = (this.ɵprov = N({
            token: e,
            providedIn: 'environment',
            factory: () => new e(x(Ut)),
          }));
        }
        return e;
      })();
      function An(e) {
        e.getStandaloneInjector = n =>
          n.get(lL).getOrCreateStandaloneInjector(e);
      }
      function od(e, n, t) {
        const i = Bt() + e,
          r = C();
        return r[i] === J
          ? ci(r, i, t ? n.call(t) : n())
          : (function _a(e, n) {
              return e[n];
            })(r, i);
      }
      function Oa(e, n) {
        const t = e[n];
        return t === J ? void 0 : t;
      }
      function qw(e, n, t, i, r, o, s) {
        const a = n + t;
        return (function Er(e, n, t, i) {
          const r = Ft(e, n, t);
          return Ft(e, n + 1, i) || r;
        })(e, a, r, o)
          ? ci(e, a + 2, s ? i.call(s, r, o) : i(r, o))
          : Oa(e, a + 2);
      }
      function Ji(e, n) {
        const t = he();
        let i;
        const r = e + de;
        t.firstCreatePass
          ? ((i = (function CL(e, n) {
              if (n)
                for (let t = n.length - 1; t >= 0; t--) {
                  const i = n[t];
                  if (e === i.name) return i;
                }
            })(n, t.pipeRegistry)),
            (t.data[r] = i),
            i.onDestroy && (t.destroyHooks ??= []).push(r, i.onDestroy))
          : (i = t.data[r]);
        const o = i.factory || (i.factory = _r(i.type)),
          a = Zt(v);
        try {
          const l = sc(!1),
            c = o();
          return (
            sc(l),
            (function cP(e, n, t, i) {
              t >= e.data.length &&
                ((e.data[t] = null), (e.blueprint[t] = null)),
                (n[t] = i);
            })(t, C(), r, c),
            c
          );
        } finally {
          Zt(a);
        }
      }
      function Ra(e, n, t) {
        const i = e + de,
          r = C(),
          o = po(r, i);
        return Fa(r, i)
          ? (function Ww(e, n, t, i, r, o) {
              const s = n + t;
              return Ft(e, s, r)
                ? ci(e, s + 1, o ? i.call(o, r) : i(r))
                : Oa(e, s + 1);
            })(r, Bt(), n, o.transform, t, o)
          : o.transform(t);
      }
      function sd(e, n, t, i) {
        const r = e + de,
          o = C(),
          s = po(o, r);
        return Fa(o, r)
          ? qw(o, Bt(), n, s.transform, t, i, s)
          : s.transform(t, i);
      }
      function Fa(e, n) {
        return e[P].data[n].pure;
      }
      function TL() {
        return this._results[Symbol.iterator]();
      }
      class Np {
        static #e = Symbol.iterator;
        get changes() {
          return this._changes || (this._changes = new H());
        }
        constructor(n = !1) {
          (this._emitDistinctChangesOnly = n),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const t = Np.prototype;
          t[Symbol.iterator] || (t[Symbol.iterator] = TL);
        }
        get(n) {
          return this._results[n];
        }
        map(n) {
          return this._results.map(n);
        }
        filter(n) {
          return this._results.filter(n);
        }
        find(n) {
          return this._results.find(n);
        }
        reduce(n, t) {
          return this._results.reduce(n, t);
        }
        forEach(n) {
          this._results.forEach(n);
        }
        some(n) {
          return this._results.some(n);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(n, t) {
          const i = this;
          i.dirty = !1;
          const r = (function Tn(e) {
            return e.flat(Number.POSITIVE_INFINITY);
          })(n);
          (this._changesDetected = !(function EO(e, n, t) {
            if (e.length !== n.length) return !1;
            for (let i = 0; i < e.length; i++) {
              let r = e[i],
                o = n[i];
              if ((t && ((r = t(r)), (o = t(o))), o !== r)) return !1;
            }
            return !0;
          })(i._results, r, t)) &&
            ((i._results = r),
            (i.length = r.length),
            (i.last = r[this.length - 1]),
            (i.first = r[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      function IL(e, n, t, i = !0) {
        const r = n[P];
        if (
          ((function hR(e, n, t, i) {
            const r = Dt + i,
              o = t.length;
            i > 0 && (t[r - 1][Hn] = n),
              i < o - Dt
                ? ((n[Hn] = t[r]), zy(t, Dt + i, n))
                : (t.push(n), (n[Hn] = null)),
              (n[He] = t);
            const s = n[js];
            null !== s &&
              t !== s &&
              (function pR(e, n) {
                const t = e[fo];
                n[et] !== n[He][He][et] && (e[zv] = !0),
                  null === t ? (e[fo] = [n]) : t.push(n);
              })(s, n);
            const a = n[ii];
            null !== a && a.insertView(e), (n[te] |= 128);
          })(r, n, e, t),
          i)
        ) {
          const o = mh(t, e),
            s = n[Q],
            a = Cc(s, e[ri]);
          null !== a &&
            (function dR(e, n, t, i, r, o) {
              (i[Ke] = r), (i[Ot] = n), ia(e, i, t, 1, r, o);
            })(r, e[Ot], s, n, a, o);
        }
      }
      let ze = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = OL);
        }
        return e;
      })();
      const AL = ze,
        NL = class extends AL {
          constructor(n, t, i) {
            super(),
              (this._declarationLView = n),
              (this._declarationTContainer = t),
              (this.elementRef = i);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(n, t) {
            return this.createEmbeddedViewImpl(n, t);
          }
          createEmbeddedViewImpl(n, t, i) {
            const r = (function ML(e, n, t, i) {
              const r = n.tView,
                a = Uc(
                  e,
                  r,
                  t,
                  4096 & e[te] ? 4096 : 16,
                  null,
                  n,
                  null,
                  null,
                  null,
                  i?.injector ?? null,
                  i?.hydrationInfo ?? null
                );
              a[js] = e[n.index];
              const c = e[ii];
              return (
                null !== c && (a[ii] = c.createEmbeddedView(r)), op(r, a, t), a
              );
            })(this._declarationLView, this._declarationTContainer, n, {
              injector: t,
              hydrationInfo: i,
            });
            return new pa(r);
          }
        };
      function OL() {
        return ad(Et(), C());
      }
      function ad(e, n) {
        return 4 & e.type ? new NL(n, e, ko(e, n)) : null;
      }
      let Nn = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = VL);
        }
        return e;
      })();
      function VL() {
        return r1(Et(), C());
      }
      const BL = Nn,
        t1 = class extends BL {
          constructor(n, t, i) {
            super(),
              (this._lContainer = n),
              (this._hostTNode = t),
              (this._hostLView = i);
          }
          get element() {
            return ko(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Ht(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const n = lc(this._hostTNode, this._hostLView);
            if (Zf(n)) {
              const t = Ys(n, this._hostLView),
                i = Zs(n);
              return new Ht(t[P].data[i + 8], t);
            }
            return new Ht(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(n) {
            const t = n1(this._lContainer);
            return (null !== t && t[n]) || null;
          }
          get length() {
            return this._lContainer.length - Dt;
          }
          createEmbeddedView(n, t, i) {
            let r, o;
            'number' == typeof i
              ? (r = i)
              : null != i && ((r = i.index), (o = i.injector));
            const a = n.createEmbeddedViewImpl(t || {}, o, null);
            return this.insertImpl(a, r, false), a;
          }
          createComponent(n, t, i, r, o) {
            const s =
              n &&
              !(function Qs(e) {
                return 'function' == typeof e;
              })(n);
            let a;
            if (s) a = t;
            else {
              const m = t || {};
              (a = m.index),
                (i = m.injector),
                (r = m.projectableNodes),
                (o = m.environmentInjector || m.ngModuleRef);
            }
            const l = s ? n : new ma(fe(n)),
              c = i || this.parentInjector;
            if (!o && null == l.ngModule) {
              const g = (s ? c : this.parentInjector).get(Ut, null);
              g && (o = g);
            }
            fe(l.componentType ?? {});
            const h = l.create(c, r, null, o);
            return this.insertImpl(h.hostView, a, false), h;
          }
          insert(n, t) {
            return this.insertImpl(n, t, !1);
          }
          insertImpl(n, t, i) {
            const r = n._lView;
            if (
              (function VN(e) {
                return Vt(e[He]);
              })(r)
            ) {
              const l = this.indexOf(n);
              if (-1 !== l) this.detach(l);
              else {
                const c = r[He],
                  d = new t1(c, c[Ot], c[He]);
                d.detach(d.indexOf(n));
              }
            }
            const s = this._adjustIndex(t),
              a = this._lContainer;
            return (
              IL(a, r, s, !i), n.attachToViewContainerRef(), zy(Op(a), s, n), n
            );
          }
          move(n, t) {
            return this.insert(n, t);
          }
          indexOf(n) {
            const t = n1(this._lContainer);
            return null !== t ? t.indexOf(n) : -1;
          }
          remove(n) {
            const t = this._adjustIndex(n, -1),
              i = wc(this._lContainer, t);
            i && (dc(Op(this._lContainer), t), uh(i[P], i));
          }
          detach(n) {
            const t = this._adjustIndex(n, -1),
              i = wc(this._lContainer, t);
            return i && null != dc(Op(this._lContainer), t) ? new pa(i) : null;
          }
          _adjustIndex(n, t = 0) {
            return n ?? this.length + t;
          }
        };
      function n1(e) {
        return e[8];
      }
      function Op(e) {
        return e[8] || (e[8] = []);
      }
      function r1(e, n) {
        let t;
        const i = n[e.index];
        return (
          Vt(i)
            ? (t = i)
            : ((t = k0(i, n, null, e)), (n[e.index] = t), $c(n, t)),
          o1(t, n, e, i),
          new t1(t, e, n)
        );
      }
      let o1 = function s1(e, n, t, i) {
        if (e[ri]) return;
        let r;
        (r =
          8 & t.type
            ? Pe(i)
            : (function jL(e, n) {
                const t = e[Q],
                  i = t.createComment(''),
                  r = Qt(n, e);
                return (
                  Dr(
                    t,
                    Cc(t, r),
                    i,
                    (function vR(e, n) {
                      return e.nextSibling(n);
                    })(t, r),
                    !1
                  ),
                  i
                );
              })(n, t)),
          (e[ri] = r);
      };
      class Rp {
        constructor(n) {
          (this.queryList = n), (this.matches = null);
        }
        clone() {
          return new Rp(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Fp {
        constructor(n = []) {
          this.queries = n;
        }
        createEmbeddedView(n) {
          const t = n.queries;
          if (null !== t) {
            const i =
                null !== n.contentQueries ? n.contentQueries[0] : t.length,
              r = [];
            for (let o = 0; o < i; o++) {
              const s = t.getByIndex(o);
              r.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new Fp(r);
          }
          return null;
        }
        insertView(n) {
          this.dirtyQueriesWithMatches(n);
        }
        detachView(n) {
          this.dirtyQueriesWithMatches(n);
        }
        dirtyQueriesWithMatches(n) {
          for (let t = 0; t < this.queries.length; t++)
            null !== u1(n, t).matches && this.queries[t].setDirty();
        }
      }
      class a1 {
        constructor(n, t, i = null) {
          (this.predicate = n), (this.flags = t), (this.read = i);
        }
      }
      class kp {
        constructor(n = []) {
          this.queries = n;
        }
        elementStart(n, t) {
          for (let i = 0; i < this.queries.length; i++)
            this.queries[i].elementStart(n, t);
        }
        elementEnd(n) {
          for (let t = 0; t < this.queries.length; t++)
            this.queries[t].elementEnd(n);
        }
        embeddedTView(n) {
          let t = null;
          for (let i = 0; i < this.length; i++) {
            const r = null !== t ? t.length : 0,
              o = this.getByIndex(i).embeddedTView(n, r);
            o &&
              ((o.indexInDeclarationView = i),
              null !== t ? t.push(o) : (t = [o]));
          }
          return null !== t ? new kp(t) : null;
        }
        template(n, t) {
          for (let i = 0; i < this.queries.length; i++)
            this.queries[i].template(n, t);
        }
        getByIndex(n) {
          return this.queries[n];
        }
        get length() {
          return this.queries.length;
        }
        track(n) {
          this.queries.push(n);
        }
      }
      class Pp {
        constructor(n, t = -1) {
          (this.metadata = n),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = t);
        }
        elementStart(n, t) {
          this.isApplyingToNode(t) && this.matchTNode(n, t);
        }
        elementEnd(n) {
          this._declarationNodeIndex === n.index &&
            (this._appliesToNextNode = !1);
        }
        template(n, t) {
          this.elementStart(n, t);
        }
        embeddedTView(n, t) {
          return this.isApplyingToNode(n)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-n.index, t),
              new Pp(this.metadata))
            : null;
        }
        isApplyingToNode(n) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const t = this._declarationNodeIndex;
            let i = n.parent;
            for (; null !== i && 8 & i.type && i.index !== t; ) i = i.parent;
            return t === (null !== i ? i.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(n, t) {
          const i = this.metadata.predicate;
          if (Array.isArray(i))
            for (let r = 0; r < i.length; r++) {
              const o = i[r];
              this.matchTNodeWithReadOption(n, t, $L(t, o)),
                this.matchTNodeWithReadOption(n, t, cc(t, n, o, !1, !1));
            }
          else
            i === ze
              ? 4 & t.type && this.matchTNodeWithReadOption(n, t, -1)
              : this.matchTNodeWithReadOption(n, t, cc(t, n, i, !1, !1));
        }
        matchTNodeWithReadOption(n, t, i) {
          if (null !== i) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === _e || r === Nn || (r === ze && 4 & t.type))
                this.addMatch(t.index, -2);
              else {
                const o = cc(t, n, r, !1, !1);
                null !== o && this.addMatch(t.index, o);
              }
            else this.addMatch(t.index, i);
          }
        }
        addMatch(n, t) {
          null === this.matches
            ? (this.matches = [n, t])
            : this.matches.push(n, t);
        }
      }
      function $L(e, n) {
        const t = e.localNames;
        if (null !== t)
          for (let i = 0; i < t.length; i += 2) if (t[i] === n) return t[i + 1];
        return null;
      }
      function GL(e, n, t, i) {
        return -1 === t
          ? (function zL(e, n) {
              return 11 & e.type ? ko(e, n) : 4 & e.type ? ad(e, n) : null;
            })(n, e)
          : -2 === t
          ? (function WL(e, n, t) {
              return t === _e
                ? ko(n, e)
                : t === ze
                ? ad(n, e)
                : t === Nn
                ? r1(n, e)
                : void 0;
            })(e, n, i)
          : yr(e, e[P], t, n);
      }
      function l1(e, n, t, i) {
        const r = n[ii].queries[i];
        if (null === r.matches) {
          const o = e.data,
            s = t.matches,
            a = [];
          for (let l = 0; l < s.length; l += 2) {
            const c = s[l];
            a.push(c < 0 ? null : GL(n, o[c], s[l + 1], t.metadata.read));
          }
          r.matches = a;
        }
        return r.matches;
      }
      function Lp(e, n, t, i) {
        const r = e.queries.getByIndex(t),
          o = r.matches;
        if (null !== o) {
          const s = l1(e, n, r, t);
          for (let a = 0; a < o.length; a += 2) {
            const l = o[a];
            if (l > 0) i.push(s[a / 2]);
            else {
              const c = o[a + 1],
                d = n[-l];
              for (let u = Dt; u < d.length; u++) {
                const f = d[u];
                f[js] === f[He] && Lp(f[P], f, c, i);
              }
              if (null !== d[fo]) {
                const u = d[fo];
                for (let f = 0; f < u.length; f++) {
                  const h = u[f];
                  Lp(h[P], h, c, i);
                }
              }
            }
          }
        }
        return i;
      }
      function Te(e) {
        const n = C(),
          t = he(),
          i = Cy();
        $f(i + 1);
        const r = u1(t, i);
        if (
          e.dirty &&
          (function PN(e) {
            return 4 == (4 & e[te]);
          })(n) ===
            (2 == (2 & r.metadata.flags))
        ) {
          if (null === r.matches) e.reset([]);
          else {
            const o = r.crossesNgTemplate ? Lp(t, n, i, []) : l1(t, n, r, i);
            e.reset(o, vF), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Me() {
        return (function qL(e, n) {
          return e[ii].queries[n].queryList;
        })(C(), Cy());
      }
      function c1(e, n, t) {
        const i = new Np(4 == (4 & t));
        (function QF(e, n, t, i) {
          const r = L0(n);
          r.push(t), e.firstCreatePass && V0(e).push(i, r.length - 1);
        })(e, n, i, i.destroy),
          null === n[ii] && (n[ii] = new Fp()),
          n[ii].queries.push(new Rp(i));
      }
      function d1(e, n, t) {
        null === e.queries && (e.queries = new kp()),
          e.queries.track(new Pp(n, t));
      }
      function u1(e, n) {
        return e.queries.getByIndex(n);
      }
      function On(e, n) {
        return ad(e, n);
      }
      const $p = new T('Application Initializer');
      let zp = (() => {
          class e {
            constructor() {
              (this.initialized = !1),
                (this.done = !1),
                (this.donePromise = new Promise((t, i) => {
                  (this.resolve = t), (this.reject = i);
                })),
                (this.appInits = I($p, { optional: !0 }) ?? []);
            }
            runInitializers() {
              if (this.initialized) return;
              const t = [];
              for (const r of this.appInits) {
                const o = r();
                if (Da(o)) t.push(o);
                else if (_D(o)) {
                  const s = new Promise((a, l) => {
                    o.subscribe({ complete: a, error: l });
                  });
                  t.push(s);
                }
              }
              const i = () => {
                (this.done = !0), this.resolve();
              };
              Promise.all(t)
                .then(() => {
                  i();
                })
                .catch(r => {
                  this.reject(r);
                }),
                0 === t.length && i(),
                (this.initialized = !0);
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        M1 = (() => {
          class e {
            log(t) {
              console.log(t);
            }
            warn(t) {
              console.warn(t);
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'platform',
            }));
          }
          return e;
        })();
      const Rn = new T('LocaleId', {
        providedIn: 'root',
        factory: () =>
          I(Rn, ce.Optional | ce.SkipSelf) ||
          (function mV() {
            return (typeof $localize < 'u' && $localize.locale) || Jo;
          })(),
      });
      let dd = (() => {
        class e {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new Nt(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const t = this.taskId++;
            return this.pendingTasks.add(t), t;
          }
          remove(t) {
            this.pendingTasks.delete(t),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      class vV {
        constructor(n, t) {
          (this.ngModuleFactory = n), (this.componentFactories = t);
        }
      }
      let I1 = (() => {
        class e {
          compileModuleSync(t) {
            return new Tp(t);
          }
          compileModuleAsync(t) {
            return Promise.resolve(this.compileModuleSync(t));
          }
          compileModuleAndAllComponentsSync(t) {
            const i = this.compileModuleSync(t),
              o = Ii(dn(t).declarations).reduce((s, a) => {
                const l = fe(a);
                return l && s.push(new ma(l)), s;
              }, []);
            return new vV(i, o);
          }
          compileModuleAndAllComponentsAsync(t) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(t));
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      const R1 = new T(''),
        fd = new T('');
      let Yp,
        qp = (() => {
          class e {
            constructor(t, i, r) {
              (this._ngZone = t),
                (this.registry = i),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Yp ||
                  ((function jV(e) {
                    Yp = e;
                  })(r),
                  r.addToWindow(i)),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > 'u'
                      ? null
                      : Zone.current.get('TaskTrackingZone');
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ae.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero');
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  i =>
                    !i.updateCb ||
                    !i.updateCb(t) ||
                    (clearTimeout(i.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map(t => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, i, r) {
              let o = -1;
              i &&
                i > 0 &&
                (o = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    s => s.timeoutId !== o
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, i)),
                this._callbacks.push({ doneCb: t, timeoutId: o, updateCb: r });
            }
            whenStable(t, i, r) {
              if (r && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(t, i, r), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(t) {
              this.registry.registerApplication(t, this);
            }
            unregisterApplication(t) {
              this.registry.unregisterApplication(t);
            }
            findProviders(t, i, r) {
              return [];
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(x(ae), x(Zp), x(fd));
            });
            static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        Zp = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(t, i) {
              this._applications.set(t, i);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, i = !0) {
              return Yp?.findTestabilityInTree(this, t, i) ?? null;
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'platform',
            }));
          }
          return e;
        })(),
        Xi = null;
      const F1 = new T('AllowMultipleToken'),
        Kp = new T('PlatformDestroyListeners'),
        Qp = new T('appBootstrapListener');
      class P1 {
        constructor(n, t) {
          (this.name = n), (this.token = t);
        }
      }
      function V1(e, n, t = []) {
        const i = `Platform: ${n}`,
          r = new T(i);
        return (o = []) => {
          let s = Jp();
          if (!s || s.injector.get(F1, !1)) {
            const a = [...t, ...o, { provide: r, useValue: !0 }];
            e
              ? e(a)
              : (function $V(e) {
                  if (Xi && !Xi.get(F1, !1)) throw new b(400, !1);
                  (function k1() {
                    !(function CN(e) {
                      ny = e;
                    })(() => {
                      throw new b(600, !1);
                    });
                  })(),
                    (Xi = e);
                  const n = e.get(j1);
                  (function L1(e) {
                    e.get(qb, null)?.forEach(t => t());
                  })(e);
                })(
                  (function B1(e = [], n) {
                    return St.create({
                      name: n,
                      providers: [
                        { provide: Mh, useValue: 'platform' },
                        { provide: Kp, useValue: new Set([() => (Xi = null)]) },
                        ...e,
                      ],
                    });
                  })(a, i)
                );
          }
          return (function GV(e) {
            const n = Jp();
            if (!n) throw new b(401, !1);
            return n;
          })();
        };
      }
      function Jp() {
        return Xi?.get(j1) ?? null;
      }
      let j1 = (() => {
        class e {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, i) {
            const r = (function WV(e = 'zone.js', n) {
              return 'noop' === e ? new FF() : 'zone.js' === e ? new ae(n) : e;
            })(
              i?.ngZone,
              (function H1(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: i?.ngZoneEventCoalescing,
                runCoalescing: i?.ngZoneRunCoalescing,
              })
            );
            return r.run(() => {
              const o = (function aL(e, n, t) {
                  return new xp(e, n, t);
                })(
                  t.moduleType,
                  this.injector,
                  (function W1(e) {
                    return [
                      { provide: ae, useFactory: e },
                      {
                        provide: la,
                        multi: !0,
                        useFactory: () => {
                          const n = I(ZV, { optional: !0 });
                          return () => n.initialize();
                        },
                      },
                      { provide: G1, useFactory: qV },
                      { provide: d0, useFactory: u0 },
                    ];
                  })(() => r)
                ),
                s = o.injector.get(Mi, null);
              return (
                r.runOutsideAngular(() => {
                  const a = r.onError.subscribe({
                    next: l => {
                      s.handleError(l);
                    },
                  });
                  o.onDestroy(() => {
                    hd(this._modules, o), a.unsubscribe();
                  });
                }),
                (function U1(e, n, t) {
                  try {
                    const i = t();
                    return Da(i)
                      ? i.catch(r => {
                          throw (
                            (n.runOutsideAngular(() => e.handleError(r)), r)
                          );
                        })
                      : i;
                  } catch (i) {
                    throw (n.runOutsideAngular(() => e.handleError(i)), i);
                  }
                })(s, r, () => {
                  const a = o.injector.get(zp);
                  return (
                    a.runInitializers(),
                    a.donePromise.then(
                      () => (
                        (function hw(e) {
                          En(e, 'Expected localeId to be defined'),
                            'string' == typeof e &&
                              (fw = e.toLowerCase().replace(/_/g, '-'));
                        })(o.injector.get(Rn, Jo) || Jo),
                        this._moduleDoBootstrap(o),
                        o
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, i = []) {
            const r = $1({}, i);
            return (function HV(e, n, t) {
              const i = new Tp(t);
              return Promise.resolve(i);
            })(0, 0, t).then(o => this.bootstrapModuleFactory(o, r));
          }
          _moduleDoBootstrap(t) {
            const i = t.injector.get(Ni);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach(r => i.bootstrap(r));
            else {
              if (!t.instance.ngDoBootstrap) throw new b(-403, !1);
              t.instance.ngDoBootstrap(i);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new b(404, !1);
            this._modules.slice().forEach(i => i.destroy()),
              this._destroyListeners.forEach(i => i());
            const t = this._injector.get(Kp, null);
            t && (t.forEach(i => i()), t.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(St));
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'platform',
          }));
        }
        return e;
      })();
      function $1(e, n) {
        return Array.isArray(n) ? n.reduce($1, e) : { ...e, ...n };
      }
      let Ni = (() => {
        class e {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = I(G1)),
              (this.zoneIsStable = I(d0)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = I(dd).hasPendingTasks.pipe(
                Cn(t => (t ? G(!1) : this.zoneIsStable)),
                (function bv(e, n = bi) {
                  return (
                    (e = e ?? kA),
                    Ye((t, i) => {
                      let r,
                        o = !0;
                      t.subscribe(
                        Fe(i, s => {
                          const a = n(s);
                          (o || !e(r, a)) && ((o = !1), (r = a), i.next(s));
                        })
                      );
                    })
                  );
                })(),
                yv()
              )),
              (this._injector = I(Ut));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(t, i) {
            const r = t instanceof Jb;
            if (!this._injector.get(zp).done)
              throw (
                (!r &&
                  (function so(e) {
                    const n = fe(e) || bt(e) || Lt(e);
                    return null !== n && n.standalone;
                  })(t),
                new b(405, !1))
              );
            let s;
            (s = r ? t : this._injector.get(Vc).resolveComponentFactory(t)),
              this.componentTypes.push(s.componentType);
            const a = (function UV(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Mr),
              c = s.create(St.NULL, [], i || s.selector, a),
              d = c.location.nativeElement,
              u = c.injector.get(R1, null);
            return (
              u?.registerApplication(d),
              c.onDestroy(() => {
                this.detachView(c.hostView),
                  hd(this.components, c),
                  u?.unregisterApplication(d);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new b(101, !1);
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this.internalErrorHandler(t);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const i = t;
            this._views.push(i), i.attachToAppRef(this);
          }
          detachView(t) {
            const i = t;
            hd(this._views, i), i.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView), this.tick(), this.components.push(t);
            const i = this._injector.get(Qp, []);
            i.push(...this._bootstrapListeners), i.forEach(r => r(t));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach(t => t()),
                  this._views.slice().forEach(t => t.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(t) {
            return (
              this._destroyListeners.push(t),
              () => hd(this._destroyListeners, t)
            );
          }
          destroy() {
            if (this._destroyed) throw new b(406, !1);
            const t = this._injector;
            t.destroy && !t.destroyed && t.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      function hd(e, n) {
        const t = e.indexOf(n);
        t > -1 && e.splice(t, 1);
      }
      const G1 = new T('', {
        providedIn: 'root',
        factory: () => I(Mi).handleError.bind(void 0),
      });
      function qV() {
        const e = I(ae),
          n = I(Mi);
        return t => e.runOutsideAngular(() => n.handleError(t));
      }
      let ZV = (() => {
        class e {
          constructor() {
            (this.zone = I(ae)), (this.applicationRef = I(Ni));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      let Wn = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = KV);
        }
        return e;
      })();
      function KV(e) {
        return (function QV(e, n, t) {
          if (gr(e) && !t) {
            const i = un(e.index, n);
            return new pa(i, i);
          }
          return 47 & e.type ? new pa(n[et], n) : null;
        })(Et(), C(), 16 == (16 & e));
      }
      class K1 {
        constructor() {}
        supports(n) {
          return qc(n);
        }
        create(n) {
          return new iB(n);
        }
      }
      const nB = (e, n) => n;
      class iB {
        constructor(n) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = n || nB);
        }
        forEachItem(n) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) n(t);
        }
        forEachOperation(n) {
          let t = this._itHead,
            i = this._removalsHead,
            r = 0,
            o = null;
          for (; t || i; ) {
            const s = !i || (t && t.currentIndex < J1(i, r, o)) ? t : i,
              a = J1(s, r, o),
              l = s.currentIndex;
            if (s === i) r--, (i = i._nextRemoved);
            else if (((t = t._next), null == s.previousIndex)) r++;
            else {
              o || (o = []);
              const c = a - r,
                d = l - r;
              if (c != d) {
                for (let f = 0; f < c; f++) {
                  const h = f < o.length ? o[f] : (o[f] = 0),
                    p = h + f;
                  d <= p && p < c && (o[f] = h + 1);
                }
                o[s.previousIndex] = d - c;
              }
            }
            a !== l && n(s, a, l);
          }
        }
        forEachPreviousItem(n) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) n(t);
        }
        forEachAddedItem(n) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t);
        }
        forEachMovedItem(n) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) n(t);
        }
        forEachRemovedItem(n) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t);
        }
        forEachIdentityChange(n) {
          let t;
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            n(t);
        }
        diff(n) {
          if ((null == n && (n = []), !qc(n))) throw new b(900, !1);
          return this.check(n) ? this : null;
        }
        onDestroy() {}
        check(n) {
          this._reset();
          let r,
            o,
            s,
            t = this._itHead,
            i = !1;
          if (Array.isArray(n)) {
            this.length = n.length;
            for (let a = 0; a < this.length; a++)
              (o = n[a]),
                (s = this._trackByFn(a, o)),
                null !== t && Object.is(t.trackById, s)
                  ? (i && (t = this._verifyReinsertion(t, o, s, a)),
                    Object.is(t.item, o) || this._addIdentityChange(t, o))
                  : ((t = this._mismatch(t, o, s, a)), (i = !0)),
                (t = t._next);
          } else
            (r = 0),
              (function Uk(e, n) {
                if (Array.isArray(e))
                  for (let t = 0; t < e.length; t++) n(e[t]);
                else {
                  const t = e[Symbol.iterator]();
                  let i;
                  for (; !(i = t.next()).done; ) n(i.value);
                }
              })(n, a => {
                (s = this._trackByFn(r, a)),
                  null !== t && Object.is(t.trackById, s)
                    ? (i && (t = this._verifyReinsertion(t, a, s, r)),
                      Object.is(t.item, a) || this._addIdentityChange(t, a))
                    : ((t = this._mismatch(t, a, s, r)), (i = !0)),
                  (t = t._next),
                  r++;
              }),
              (this.length = r);
          return this._truncate(t), (this.collection = n), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let n;
            for (
              n = this._previousItHead = this._itHead;
              null !== n;
              n = n._next
            )
              n._nextPrevious = n._next;
            for (n = this._additionsHead; null !== n; n = n._nextAdded)
              n.previousIndex = n.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                n = this._movesHead;
              null !== n;
              n = n._nextMoved
            )
              n.previousIndex = n.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(n, t, i, r) {
          let o;
          return (
            null === n ? (o = this._itTail) : ((o = n._prev), this._remove(n)),
            null !==
            (n =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(i, null))
              ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                this._reinsertAfter(n, o, r))
              : null !==
                (n =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(i, r))
              ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                this._moveAfter(n, o, r))
              : (n = this._addAfter(new rB(t, i), o, r)),
            n
          );
        }
        _verifyReinsertion(n, t, i, r) {
          let o =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(i, null);
          return (
            null !== o
              ? (n = this._reinsertAfter(o, n._prev, r))
              : n.currentIndex != r &&
                ((n.currentIndex = r), this._addToMoves(n, r)),
            n
          );
        }
        _truncate(n) {
          for (; null !== n; ) {
            const t = n._next;
            this._addToRemovals(this._unlink(n)), (n = t);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(n, t, i) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(n);
          const r = n._prevRemoved,
            o = n._nextRemoved;
          return (
            null === r ? (this._removalsHead = o) : (r._nextRemoved = o),
            null === o ? (this._removalsTail = r) : (o._prevRemoved = r),
            this._insertAfter(n, t, i),
            this._addToMoves(n, i),
            n
          );
        }
        _moveAfter(n, t, i) {
          return (
            this._unlink(n),
            this._insertAfter(n, t, i),
            this._addToMoves(n, i),
            n
          );
        }
        _addAfter(n, t, i) {
          return (
            this._insertAfter(n, t, i),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = n)
                : (this._additionsTail._nextAdded = n)),
            n
          );
        }
        _insertAfter(n, t, i) {
          const r = null === t ? this._itHead : t._next;
          return (
            (n._next = r),
            (n._prev = t),
            null === r ? (this._itTail = n) : (r._prev = n),
            null === t ? (this._itHead = n) : (t._next = n),
            null === this._linkedRecords && (this._linkedRecords = new Q1()),
            this._linkedRecords.put(n),
            (n.currentIndex = i),
            n
          );
        }
        _remove(n) {
          return this._addToRemovals(this._unlink(n));
        }
        _unlink(n) {
          null !== this._linkedRecords && this._linkedRecords.remove(n);
          const t = n._prev,
            i = n._next;
          return (
            null === t ? (this._itHead = i) : (t._next = i),
            null === i ? (this._itTail = t) : (i._prev = t),
            n
          );
        }
        _addToMoves(n, t) {
          return (
            n.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = n)
                  : (this._movesTail._nextMoved = n)),
            n
          );
        }
        _addToRemovals(n) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Q1()),
            this._unlinkedRecords.put(n),
            (n.currentIndex = null),
            (n._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = n),
                (n._prevRemoved = null))
              : ((n._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = n)),
            n
          );
        }
        _addIdentityChange(n, t) {
          return (
            (n.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = n)
                : (this._identityChangesTail._nextIdentityChange = n)),
            n
          );
        }
      }
      class rB {
        constructor(n, t) {
          (this.item = n),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class oB {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(n) {
          null === this._head
            ? ((this._head = this._tail = n),
              (n._nextDup = null),
              (n._prevDup = null))
            : ((this._tail._nextDup = n),
              (n._prevDup = this._tail),
              (n._nextDup = null),
              (this._tail = n));
        }
        get(n, t) {
          let i;
          for (i = this._head; null !== i; i = i._nextDup)
            if (
              (null === t || t <= i.currentIndex) &&
              Object.is(i.trackById, n)
            )
              return i;
          return null;
        }
        remove(n) {
          const t = n._prevDup,
            i = n._nextDup;
          return (
            null === t ? (this._head = i) : (t._nextDup = i),
            null === i ? (this._tail = t) : (i._prevDup = t),
            null === this._head
          );
        }
      }
      class Q1 {
        constructor() {
          this.map = new Map();
        }
        put(n) {
          const t = n.trackById;
          let i = this.map.get(t);
          i || ((i = new oB()), this.map.set(t, i)), i.add(n);
        }
        get(n, t) {
          const r = this.map.get(n);
          return r ? r.get(n, t) : null;
        }
        remove(n) {
          const t = n.trackById;
          return this.map.get(t).remove(n) && this.map.delete(t), n;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function J1(e, n, t) {
        const i = e.previousIndex;
        if (null === i) return i;
        let r = 0;
        return t && i < t.length && (r = t[i]), i + n + r;
      }
      function eC() {
        return new gd([new K1()]);
      }
      let gd = (() => {
        class e {
          static #e = (this.ɵprov = N({
            token: e,
            providedIn: 'root',
            factory: eC,
          }));
          constructor(t) {
            this.factories = t;
          }
          static create(t, i) {
            if (null != i) {
              const r = i.factories.slice();
              t = t.concat(r);
            }
            return new e(t);
          }
          static extend(t) {
            return {
              provide: e,
              useFactory: i => e.create(t, i || eC()),
              deps: [[e, new hc(), new fc()]],
            };
          }
          find(t) {
            const i = this.factories.find(r => r.supports(t));
            if (null != i) return i;
            throw new b(901, !1);
          }
        }
        return e;
      })();
      const dB = V1(null, 'core', []);
      let uB = (() => {
        class e {
          constructor(t) {}
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(Ni));
          });
          static #t = (this.ɵmod = se({ type: e }));
          static #n = (this.ɵinj = oe({}));
        }
        return e;
      })();
      function ts(e) {
        return 'boolean' == typeof e ? e : null != e && 'false' !== e;
      }
      function rm(e, n) {
        const t = fe(e),
          i = n.elementInjector || Nc();
        return new ma(t).create(
          i,
          n.projectableNodes,
          n.hostElement,
          n.environmentInjector
        );
      }
      let om = null;
      function er() {
        return om;
      }
      class SB {}
      const je = new T('DocumentToken');
      let sm = (() => {
        class e {
          historyGo(t) {
            throw new Error('Not implemented');
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: function () {
              return I(TB);
            },
            providedIn: 'platform',
          }));
        }
        return e;
      })();
      const xB = new T('Location Initialized');
      let TB = (() => {
        class e extends sm {
          constructor() {
            super(),
              (this._doc = I(je)),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return er().getBaseHref(this._doc);
          }
          onPopState(t) {
            const i = er().getGlobalEventTarget(this._doc, 'window');
            return (
              i.addEventListener('popstate', t, !1),
              () => i.removeEventListener('popstate', t)
            );
          }
          onHashChange(t) {
            const i = er().getGlobalEventTarget(this._doc, 'window');
            return (
              i.addEventListener('hashchange', t, !1),
              () => i.removeEventListener('hashchange', t)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(t) {
            this._location.pathname = t;
          }
          pushState(t, i, r) {
            this._history.pushState(t, i, r);
          }
          replaceState(t, i, r) {
            this._history.replaceState(t, i, r);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(t = 0) {
            this._history.go(t);
          }
          getState() {
            return this._history.state;
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: function () {
              return new e();
            },
            providedIn: 'platform',
          }));
        }
        return e;
      })();
      function am(e, n) {
        if (0 == e.length) return n;
        if (0 == n.length) return e;
        let t = 0;
        return (
          e.endsWith('/') && t++,
          n.startsWith('/') && t++,
          2 == t ? e + n.substring(1) : 1 == t ? e + n : e + '/' + n
        );
      }
      function dC(e) {
        const n = e.match(/#|\?|$/),
          t = (n && n.index) || e.length;
        return e.slice(0, t - ('/' === e[t - 1] ? 1 : 0)) + e.slice(t);
      }
      function Oi(e) {
        return e && '?' !== e[0] ? '?' + e : e;
      }
      let Nr = (() => {
        class e {
          historyGo(t) {
            throw new Error('Not implemented');
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: function () {
              return I(fC);
            },
            providedIn: 'root',
          }));
        }
        return e;
      })();
      const uC = new T('appBaseHref');
      let fC = (() => {
          class e extends Nr {
            constructor(t, i) {
              super(),
                (this._platformLocation = t),
                (this._removeListenerFns = []),
                (this._baseHref =
                  i ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  I(je).location?.origin ??
                  '');
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return am(this._baseHref, t);
            }
            path(t = !1) {
              const i =
                  this._platformLocation.pathname +
                  Oi(this._platformLocation.search),
                r = this._platformLocation.hash;
              return r && t ? `${i}${r}` : i;
            }
            pushState(t, i, r, o) {
              const s = this.prepareExternalUrl(r + Oi(o));
              this._platformLocation.pushState(t, i, s);
            }
            replaceState(t, i, r, o) {
              const s = this.prepareExternalUrl(r + Oi(o));
              this._platformLocation.replaceState(t, i, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(t = 0) {
              this._platformLocation.historyGo?.(t);
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(x(sm), x(uC, 8));
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        MB = (() => {
          class e extends Nr {
            constructor(t, i) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ''),
                (this._removeListenerFns = []),
                null != i && (this._baseHref = i);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let i = this._platformLocation.hash;
              return null == i && (i = '#'), i.length > 0 ? i.substring(1) : i;
            }
            prepareExternalUrl(t) {
              const i = am(this._baseHref, t);
              return i.length > 0 ? '#' + i : i;
            }
            pushState(t, i, r, o) {
              let s = this.prepareExternalUrl(r + Oi(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(t, i, s);
            }
            replaceState(t, i, r, o) {
              let s = this.prepareExternalUrl(r + Oi(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, i, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(t = 0) {
              this._platformLocation.historyGo?.(t);
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(x(sm), x(uC, 8));
            });
            static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        lm = (() => {
          class e {
            constructor(t) {
              (this._subject = new H()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = t);
              const i = this._locationStrategy.getBaseHref();
              (this._basePath = (function NB(e) {
                if (new RegExp('^(https?:)?//').test(e)) {
                  const [, t] = e.split(/\/\/[^\/]+/);
                  return t;
                }
                return e;
              })(dC(hC(i)))),
                this._locationStrategy.onPopState(r => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: r.state,
                    type: r.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(t = !1) {
              return this.normalize(this._locationStrategy.path(t));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(t, i = '') {
              return this.path() == this.normalize(t + Oi(i));
            }
            normalize(t) {
              return e.stripTrailingSlash(
                (function AB(e, n) {
                  if (!e || !n.startsWith(e)) return n;
                  const t = n.substring(e.length);
                  return '' === t || ['/', ';', '?', '#'].includes(t[0])
                    ? t
                    : n;
                })(this._basePath, hC(t))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && '/' !== t[0] && (t = '/' + t),
                this._locationStrategy.prepareExternalUrl(t)
              );
            }
            go(t, i = '', r = null) {
              this._locationStrategy.pushState(r, '', t, i),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + Oi(i)),
                  r
                );
            }
            replaceState(t, i = '', r = null) {
              this._locationStrategy.replaceState(r, '', t, i),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + Oi(i)),
                  r
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(t = 0) {
              this._locationStrategy.historyGo?.(t);
            }
            onUrlChange(t) {
              return (
                this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe(i => {
                    this._notifyUrlChangeListeners(i.url, i.state);
                  })),
                () => {
                  const i = this._urlChangeListeners.indexOf(t);
                  this._urlChangeListeners.splice(i, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(t = '', i) {
              this._urlChangeListeners.forEach(r => r(t, i));
            }
            subscribe(t, i, r) {
              return this._subject.subscribe({
                next: t,
                error: i,
                complete: r,
              });
            }
            static #e = (this.normalizeQueryParams = Oi);
            static #t = (this.joinWithSlash = am);
            static #n = (this.stripTrailingSlash = dC);
            static #i = (this.ɵfac = function (i) {
              return new (i || e)(x(Nr));
            });
            static #r = (this.ɵprov = N({
              token: e,
              factory: function () {
                return (function IB() {
                  return new lm(x(Nr));
                })();
              },
              providedIn: 'root',
            }));
          }
          return e;
        })();
      function hC(e) {
        return e.replace(/\/index.html$/, '');
      }
      var vd = (function (e) {
          return (
            (e[(e.Decimal = 0)] = 'Decimal'),
            (e[(e.Percent = 1)] = 'Percent'),
            (e[(e.Currency = 2)] = 'Currency'),
            (e[(e.Scientific = 3)] = 'Scientific'),
            e
          );
        })(vd || {}),
        nt = (function (e) {
          return (
            (e[(e.Decimal = 0)] = 'Decimal'),
            (e[(e.Group = 1)] = 'Group'),
            (e[(e.List = 2)] = 'List'),
            (e[(e.PercentSign = 3)] = 'PercentSign'),
            (e[(e.PlusSign = 4)] = 'PlusSign'),
            (e[(e.MinusSign = 5)] = 'MinusSign'),
            (e[(e.Exponential = 6)] = 'Exponential'),
            (e[(e.SuperscriptingExponent = 7)] = 'SuperscriptingExponent'),
            (e[(e.PerMille = 8)] = 'PerMille'),
            (e[(e.Infinity = 9)] = 'Infinity'),
            (e[(e.NaN = 10)] = 'NaN'),
            (e[(e.TimeSeparator = 11)] = 'TimeSeparator'),
            (e[(e.CurrencyDecimal = 12)] = 'CurrencyDecimal'),
            (e[(e.CurrencyGroup = 13)] = 'CurrencyGroup'),
            e
          );
        })(nt || {});
      function Fn(e, n) {
        const t = zt(e),
          i = t[Le.NumberSymbols][n];
        if (typeof i > 'u') {
          if (n === nt.CurrencyDecimal) return t[Le.NumberSymbols][nt.Decimal];
          if (n === nt.CurrencyGroup) return t[Le.NumberSymbols][nt.Group];
        }
        return i;
      }
      const tj = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
      function _m(e) {
        const n = parseInt(e);
        if (isNaN(n))
          throw new Error('Invalid integer literal when parsing ' + e);
        return n;
      }
      function EC(e, n) {
        n = encodeURIComponent(n);
        for (const t of e.split(';')) {
          const i = t.indexOf('='),
            [r, o] = -1 == i ? [t, ''] : [t.slice(0, i), t.slice(i + 1)];
          if (r.trim() === n) return decodeURIComponent(o);
        }
        return null;
      }
      class pj {
        constructor(n, t, i, r) {
          (this.$implicit = n),
            (this.ngForOf = t),
            (this.index = i),
            (this.count = r);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Pn = (() => {
        class e {
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(t, i, r) {
            (this._viewContainer = t),
              (this._template = i),
              (this._differs = r),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const t = this._ngForOf;
              !this._differ &&
                t &&
                (this._differ = this._differs
                  .find(t)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const i = this._viewContainer;
            t.forEachOperation((r, o, s) => {
              if (null == r.previousIndex)
                i.createEmbeddedView(
                  this._template,
                  new pj(r.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) i.remove(null === o ? void 0 : o);
              else if (null !== o) {
                const a = i.get(o);
                i.move(a, s), TC(a, r);
              }
            });
            for (let r = 0, o = i.length; r < o; r++) {
              const a = i.get(r).context;
              (a.index = r), (a.count = o), (a.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange(r => {
              TC(i.get(r.currentIndex), r);
            });
          }
          static ngTemplateContextGuard(t, i) {
            return !0;
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(v(Nn), v(ze), v(gd));
          });
          static #t = (this.ɵdir = O({
            type: e,
            selectors: [['', 'ngFor', '', 'ngForOf', '']],
            inputs: {
              ngForOf: 'ngForOf',
              ngForTrackBy: 'ngForTrackBy',
              ngForTemplate: 'ngForTemplate',
            },
            standalone: !0,
          }));
        }
        return e;
      })();
      function TC(e, n) {
        e.context.$implicit = n.item;
      }
      let Zn = (() => {
        class e {
          constructor(t, i) {
            (this._viewContainer = t),
              (this._context = new mj()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = i);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            MC('ngIfThen', t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            MC('ngIfElse', t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, i) {
            return !0;
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(v(Nn), v(ze));
          });
          static #t = (this.ɵdir = O({
            type: e,
            selectors: [['', 'ngIf', '']],
            inputs: {
              ngIf: 'ngIf',
              ngIfThen: 'ngIfThen',
              ngIfElse: 'ngIfElse',
            },
            standalone: !0,
          }));
        }
        return e;
      })();
      class mj {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function MC(e, n) {
        if (n && !n.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${dt(n)}'.`
          );
      }
      function Yn(e, n) {
        return new b(2100, !1);
      }
      class bj {
        createSubscription(n, t) {
          return oy(() =>
            n.subscribe({
              next: t,
              error: i => {
                throw i;
              },
            })
          );
        }
        dispose(n) {
          oy(() => n.unsubscribe());
        }
      }
      class Dj {
        createSubscription(n, t) {
          return n.then(t, i => {
            throw i;
          });
        }
        dispose(n) {}
      }
      const wj = new Dj(),
        Cj = new bj();
      let AC = (() => {
          class e {
            constructor(t) {
              (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null),
                (this._strategy = null),
                (this._ref = t);
            }
            ngOnDestroy() {
              this._subscription && this._dispose(), (this._ref = null);
            }
            transform(t) {
              return this._obj
                ? t !== this._obj
                  ? (this._dispose(), this.transform(t))
                  : this._latestValue
                : (t && this._subscribe(t), this._latestValue);
            }
            _subscribe(t) {
              (this._obj = t),
                (this._strategy = this._selectStrategy(t)),
                (this._subscription = this._strategy.createSubscription(t, i =>
                  this._updateLatestValue(t, i)
                ));
            }
            _selectStrategy(t) {
              if (Da(t)) return wj;
              if (_D(t)) return Cj;
              throw Yn();
            }
            _dispose() {
              this._strategy.dispose(this._subscription),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null);
            }
            _updateLatestValue(t, i) {
              t === this._obj &&
                ((this._latestValue = i), this._ref.markForCheck());
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(v(Wn, 16));
            });
            static #t = (this.ɵpipe = Yt({
              name: 'async',
              type: e,
              pure: !1,
              standalone: !0,
            }));
          }
          return e;
        })(),
        OC = (() => {
          class e {
            constructor(t) {
              this._locale = t;
            }
            transform(t, i, r) {
              if (
                !(function wm(e) {
                  return !(null == e || '' === e || e != e);
                })(t)
              )
                return null;
              r = r || this._locale;
              try {
                return (function aj(e, n, t) {
                  return (function mm(e, n, t, i, r, o, s = !1) {
                    let a = '',
                      l = !1;
                    if (isFinite(e)) {
                      let c = (function cj(e) {
                        let i,
                          r,
                          o,
                          s,
                          a,
                          n = Math.abs(e) + '',
                          t = 0;
                        for (
                          (r = n.indexOf('.')) > -1 && (n = n.replace('.', '')),
                            (o = n.search(/e/i)) > 0
                              ? (r < 0 && (r = o),
                                (r += +n.slice(o + 1)),
                                (n = n.substring(0, o)))
                              : r < 0 && (r = n.length),
                            o = 0;
                          '0' === n.charAt(o);
                          o++
                        );
                        if (o === (a = n.length)) (i = [0]), (r = 1);
                        else {
                          for (a--; '0' === n.charAt(a); ) a--;
                          for (r -= o, i = [], s = 0; o <= a; o++, s++)
                            i[s] = Number(n.charAt(o));
                        }
                        return (
                          r > 22 &&
                            ((i = i.splice(0, 21)), (t = r - 1), (r = 1)),
                          { digits: i, exponent: t, integerLen: r }
                        );
                      })(e);
                      s &&
                        (c = (function lj(e) {
                          if (0 === e.digits[0]) return e;
                          const n = e.digits.length - e.integerLen;
                          return (
                            e.exponent
                              ? (e.exponent += 2)
                              : (0 === n
                                  ? e.digits.push(0, 0)
                                  : 1 === n && e.digits.push(0),
                                (e.integerLen += 2)),
                            e
                          );
                        })(c));
                      let d = n.minInt,
                        u = n.minFrac,
                        f = n.maxFrac;
                      if (o) {
                        const _ = o.match(tj);
                        if (null === _)
                          throw new Error(`${o} is not a valid digit info`);
                        const D = _[1],
                          w = _[3],
                          F = _[5];
                        null != D && (d = _m(D)),
                          null != w && (u = _m(w)),
                          null != F
                            ? (f = _m(F))
                            : null != w && u > f && (f = u);
                      }
                      !(function dj(e, n, t) {
                        if (n > t)
                          throw new Error(
                            `The minimum number of digits after fraction (${n}) is higher than the maximum (${t}).`
                          );
                        let i = e.digits,
                          r = i.length - e.integerLen;
                        const o = Math.min(Math.max(n, r), t);
                        let s = o + e.integerLen,
                          a = i[s];
                        if (s > 0) {
                          i.splice(Math.max(e.integerLen, s));
                          for (let u = s; u < i.length; u++) i[u] = 0;
                        } else {
                          (r = Math.max(0, r)),
                            (e.integerLen = 1),
                            (i.length = Math.max(1, (s = o + 1))),
                            (i[0] = 0);
                          for (let u = 1; u < s; u++) i[u] = 0;
                        }
                        if (a >= 5)
                          if (s - 1 < 0) {
                            for (let u = 0; u > s; u--)
                              i.unshift(0), e.integerLen++;
                            i.unshift(1), e.integerLen++;
                          } else i[s - 1]++;
                        for (; r < Math.max(0, o); r++) i.push(0);
                        let l = 0 !== o;
                        const c = n + e.integerLen,
                          d = i.reduceRight(function (u, f, h, p) {
                            return (
                              (p[h] = (f += u) < 10 ? f : f - 10),
                              l && (0 === p[h] && h >= c ? p.pop() : (l = !1)),
                              f >= 10 ? 1 : 0
                            );
                          }, 0);
                        d && (i.unshift(d), e.integerLen++);
                      })(c, u, f);
                      let h = c.digits,
                        p = c.integerLen;
                      const m = c.exponent;
                      let g = [];
                      for (l = h.every(_ => !_); p < d; p++) h.unshift(0);
                      for (; p < 0; p++) h.unshift(0);
                      p > 0
                        ? (g = h.splice(p, h.length))
                        : ((g = h), (h = [0]));
                      const y = [];
                      for (
                        h.length >= n.lgSize &&
                        y.unshift(h.splice(-n.lgSize, h.length).join(''));
                        h.length > n.gSize;

                      )
                        y.unshift(h.splice(-n.gSize, h.length).join(''));
                      h.length && y.unshift(h.join('')),
                        (a = y.join(Fn(t, i))),
                        g.length && (a += Fn(t, r) + g.join('')),
                        m && (a += Fn(t, nt.Exponential) + '+' + m);
                    } else a = Fn(t, nt.Infinity);
                    return (
                      (a =
                        e < 0 && !l
                          ? n.negPre + a + n.negSuf
                          : n.posPre + a + n.posSuf),
                      a
                    );
                  })(
                    e,
                    (function gm(e, n = '-') {
                      const t = {
                          minInt: 1,
                          minFrac: 0,
                          maxFrac: 0,
                          posPre: '',
                          posSuf: '',
                          negPre: '',
                          negSuf: '',
                          gSize: 0,
                          lgSize: 0,
                        },
                        i = e.split(';'),
                        r = i[0],
                        o = i[1],
                        s =
                          -1 !== r.indexOf('.')
                            ? r.split('.')
                            : [
                                r.substring(0, r.lastIndexOf('0') + 1),
                                r.substring(r.lastIndexOf('0') + 1),
                              ],
                        a = s[0],
                        l = s[1] || '';
                      t.posPre = a.substring(0, a.indexOf('#'));
                      for (let d = 0; d < l.length; d++) {
                        const u = l.charAt(d);
                        '0' === u
                          ? (t.minFrac = t.maxFrac = d + 1)
                          : '#' === u
                          ? (t.maxFrac = d + 1)
                          : (t.posSuf += u);
                      }
                      const c = a.split(',');
                      if (
                        ((t.gSize = c[1] ? c[1].length : 0),
                        (t.lgSize = c[2] || c[1] ? (c[2] || c[1]).length : 0),
                        o)
                      ) {
                        const d = r.length - t.posPre.length - t.posSuf.length,
                          u = o.indexOf('#');
                        (t.negPre = o.substring(0, u).replace(/'/g, '')),
                          (t.negSuf = o.slice(u + d).replace(/'/g, ''));
                      } else (t.negPre = n + t.posPre), (t.negSuf = t.posSuf);
                      return t;
                    })(
                      (function dm(e, n) {
                        return zt(e)[Le.NumberFormats][n];
                      })(n, vd.Decimal),
                      Fn(n, nt.MinusSign)
                    ),
                    n,
                    nt.Group,
                    nt.Decimal,
                    t
                  );
                })(
                  (function Cm(e) {
                    if (
                      'string' == typeof e &&
                      !isNaN(Number(e) - parseFloat(e))
                    )
                      return Number(e);
                    if ('number' != typeof e)
                      throw new Error(`${e} is not a number`);
                    return e;
                  })(t),
                  r,
                  i
                );
              } catch (o) {
                throw Yn();
              }
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(v(Rn, 16));
            });
            static #t = (this.ɵpipe = Yt({
              name: 'number',
              type: e,
              pure: !0,
              standalone: !0,
            }));
          }
          return e;
        })();
      let RC = (() => {
        class e {
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵmod = se({ type: e }));
          static #n = (this.ɵinj = oe({}));
        }
        return e;
      })();
      const FC = 'browser';
      function kC(e) {
        return 'server' === e;
      }
      let PC = (() => {
        class e {
          static #e = (this.ɵprov = N({
            token: e,
            providedIn: 'root',
            factory: () => new zj(x(je), window),
          }));
        }
        return e;
      })();
      class zj {
        constructor(n, t) {
          (this.document = n), (this.window = t), (this.offset = () => [0, 0]);
        }
        setOffset(n) {
          this.offset = Array.isArray(n) ? () => n : n;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(n) {
          this.supportsScrolling() && this.window.scrollTo(n[0], n[1]);
        }
        scrollToAnchor(n) {
          if (!this.supportsScrolling()) return;
          const t = (function Gj(e, n) {
            const t = e.getElementById(n) || e.getElementsByName(n)[0];
            if (t) return t;
            if (
              'function' == typeof e.createTreeWalker &&
              e.body &&
              'function' == typeof e.body.attachShadow
            ) {
              const i = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let r = i.currentNode;
              for (; r; ) {
                const o = r.shadowRoot;
                if (o) {
                  const s =
                    o.getElementById(n) || o.querySelector(`[name="${n}"]`);
                  if (s) return s;
                }
                r = i.nextNode();
              }
            }
            return null;
          })(this.document, n);
          t && (this.scrollToElement(t), t.focus());
        }
        setHistoryScrollRestoration(n) {
          this.supportsScrolling() &&
            (this.window.history.scrollRestoration = n);
        }
        scrollToElement(n) {
          const t = n.getBoundingClientRect(),
            i = t.left + this.window.pageXOffset,
            r = t.top + this.window.pageYOffset,
            o = this.offset();
          this.window.scrollTo(i - o[0], r - o[1]);
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              'pageXOffset' in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      class LC {}
      class pH extends SB {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class xm extends pH {
        static makeCurrent() {
          !(function EB(e) {
            om || (om = e);
          })(new xm());
        }
        onAndCancel(n, t, i) {
          return (
            n.addEventListener(t, i),
            () => {
              n.removeEventListener(t, i);
            }
          );
        }
        dispatchEvent(n, t) {
          n.dispatchEvent(t);
        }
        remove(n) {
          n.parentNode && n.parentNode.removeChild(n);
        }
        createElement(n, t) {
          return (t = t || this.getDefaultDocument()).createElement(n);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle');
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(n) {
          return n.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(n) {
          return n instanceof DocumentFragment;
        }
        getGlobalEventTarget(n, t) {
          return 'window' === t
            ? window
            : 'document' === t
            ? n
            : 'body' === t
            ? n.body
            : null;
        }
        getBaseHref(n) {
          const t = (function mH() {
            return (
              (Ha = Ha || document.querySelector('base')),
              Ha ? Ha.getAttribute('href') : null
            );
          })();
          return null == t
            ? null
            : (function gH(e) {
                (Ad = Ad || document.createElement('a')),
                  Ad.setAttribute('href', e);
                const n = Ad.pathname;
                return '/' === n.charAt(0) ? n : `/${n}`;
              })(t);
        }
        resetBaseElement() {
          Ha = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(n) {
          return EC(document.cookie, n);
        }
      }
      let Ad,
        Ha = null,
        vH = (() => {
          class e {
            build() {
              return new XMLHttpRequest();
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
          }
          return e;
        })();
      const Tm = new T('EventManagerPlugins');
      let UC = (() => {
        class e {
          constructor(t, i) {
            (this._zone = i),
              (this._eventNameToPlugin = new Map()),
              t.forEach(r => {
                r.manager = this;
              }),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, i, r) {
            return this._findPluginFor(i).addEventListener(t, i, r);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            let i = this._eventNameToPlugin.get(t);
            if (i) return i;
            if (((i = this._plugins.find(o => o.supports(t))), !i))
              throw new b(5101, !1);
            return this._eventNameToPlugin.set(t, i), i;
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(Tm), x(ae));
          });
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class $C {
        constructor(n) {
          this._doc = n;
        }
      }
      const Mm = 'ng-app-id';
      let zC = (() => {
        class e {
          constructor(t, i, r, o = {}) {
            (this.doc = t),
              (this.appId = i),
              (this.nonce = r),
              (this.platformId = o),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = kC(o)),
              this.resetHostNodes();
          }
          addStyles(t) {
            for (const i of t)
              1 === this.changeUsageCount(i, 1) && this.onStyleAdded(i);
          }
          removeStyles(t) {
            for (const i of t)
              this.changeUsageCount(i, -1) <= 0 && this.onStyleRemoved(i);
          }
          ngOnDestroy() {
            const t = this.styleNodesInDOM;
            t && (t.forEach(i => i.remove()), t.clear());
            for (const i of this.getAllStyles()) this.onStyleRemoved(i);
            this.resetHostNodes();
          }
          addHost(t) {
            this.hostNodes.add(t);
            for (const i of this.getAllStyles()) this.addStyleToHost(t, i);
          }
          removeHost(t) {
            this.hostNodes.delete(t);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(t) {
            for (const i of this.hostNodes) this.addStyleToHost(i, t);
          }
          onStyleRemoved(t) {
            const i = this.styleRef;
            i.get(t)?.elements?.forEach(r => r.remove()), i.delete(t);
          }
          collectServerRenderedStyles() {
            const t = this.doc.head?.querySelectorAll(
              `style[${Mm}="${this.appId}"]`
            );
            if (t?.length) {
              const i = new Map();
              return (
                t.forEach(r => {
                  null != r.textContent && i.set(r.textContent, r);
                }),
                i
              );
            }
            return null;
          }
          changeUsageCount(t, i) {
            const r = this.styleRef;
            if (r.has(t)) {
              const o = r.get(t);
              return (o.usage += i), o.usage;
            }
            return r.set(t, { usage: i, elements: [] }), i;
          }
          getStyleElement(t, i) {
            const r = this.styleNodesInDOM,
              o = r?.get(i);
            if (o?.parentNode === t)
              return r.delete(i), o.removeAttribute(Mm), o;
            {
              const s = this.doc.createElement('style');
              return (
                this.nonce && s.setAttribute('nonce', this.nonce),
                (s.textContent = i),
                this.platformIsServer && s.setAttribute(Mm, this.appId),
                s
              );
            }
          }
          addStyleToHost(t, i) {
            const r = this.getStyleElement(t, i);
            t.appendChild(r);
            const o = this.styleRef,
              s = o.get(i)?.elements;
            s ? s.push(r) : o.set(i, { elements: [r], usage: 1 });
          }
          resetHostNodes() {
            const t = this.hostNodes;
            t.clear(), t.add(this.doc.head);
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(je), x(Oc), x(Oh, 8), x(Ki));
          });
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const Im = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          math: 'http://www.w3.org/1998/MathML/',
        },
        Am = /%COMP%/g,
        wH = new T('RemoveStylesOnCompDestroy', {
          providedIn: 'root',
          factory: () => !1,
        });
      function WC(e, n) {
        return n.map(t => t.replace(Am, e));
      }
      let Nm = (() => {
        class e {
          constructor(t, i, r, o, s, a, l, c = null) {
            (this.eventManager = t),
              (this.sharedStylesHost = i),
              (this.appId = r),
              (this.removeStylesOnCompDestroy = o),
              (this.doc = s),
              (this.platformId = a),
              (this.ngZone = l),
              (this.nonce = c),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = kC(a)),
              (this.defaultRenderer = new Om(t, s, l, this.platformIsServer));
          }
          createRenderer(t, i) {
            if (!t || !i) return this.defaultRenderer;
            this.platformIsServer &&
              i.encapsulation === Sn.ShadowDom &&
              (i = { ...i, encapsulation: Sn.Emulated });
            const r = this.getOrCreateRenderer(t, i);
            return (
              r instanceof ZC
                ? r.applyToHost(t)
                : r instanceof Rm && r.applyStyles(),
              r
            );
          }
          getOrCreateRenderer(t, i) {
            const r = this.rendererByCompId;
            let o = r.get(i.id);
            if (!o) {
              const s = this.doc,
                a = this.ngZone,
                l = this.eventManager,
                c = this.sharedStylesHost,
                d = this.removeStylesOnCompDestroy,
                u = this.platformIsServer;
              switch (i.encapsulation) {
                case Sn.Emulated:
                  o = new ZC(l, c, i, this.appId, d, s, a, u);
                  break;
                case Sn.ShadowDom:
                  return new xH(l, c, t, i, s, a, this.nonce, u);
                default:
                  o = new Rm(l, c, i, d, s, a, u);
              }
              r.set(i.id, o);
            }
            return o;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(
              x(UC),
              x(zC),
              x(Oc),
              x(wH),
              x(je),
              x(Ki),
              x(ae),
              x(Oh)
            );
          });
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class Om {
        constructor(n, t, i, r) {
          (this.eventManager = n),
            (this.doc = t),
            (this.ngZone = i),
            (this.platformIsServer = r),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(n, t) {
          return t
            ? this.doc.createElementNS(Im[t] || t, n)
            : this.doc.createElement(n);
        }
        createComment(n) {
          return this.doc.createComment(n);
        }
        createText(n) {
          return this.doc.createTextNode(n);
        }
        appendChild(n, t) {
          (qC(n) ? n.content : n).appendChild(t);
        }
        insertBefore(n, t, i) {
          n && (qC(n) ? n.content : n).insertBefore(t, i);
        }
        removeChild(n, t) {
          n && n.removeChild(t);
        }
        selectRootElement(n, t) {
          let i = 'string' == typeof n ? this.doc.querySelector(n) : n;
          if (!i) throw new b(-5104, !1);
          return t || (i.textContent = ''), i;
        }
        parentNode(n) {
          return n.parentNode;
        }
        nextSibling(n) {
          return n.nextSibling;
        }
        setAttribute(n, t, i, r) {
          if (r) {
            t = r + ':' + t;
            const o = Im[r];
            o ? n.setAttributeNS(o, t, i) : n.setAttribute(t, i);
          } else n.setAttribute(t, i);
        }
        removeAttribute(n, t, i) {
          if (i) {
            const r = Im[i];
            r ? n.removeAttributeNS(r, t) : n.removeAttribute(`${i}:${t}`);
          } else n.removeAttribute(t);
        }
        addClass(n, t) {
          n.classList.add(t);
        }
        removeClass(n, t) {
          n.classList.remove(t);
        }
        setStyle(n, t, i, r) {
          r & (Zi.DashCase | Zi.Important)
            ? n.style.setProperty(t, i, r & Zi.Important ? 'important' : '')
            : (n.style[t] = i);
        }
        removeStyle(n, t, i) {
          i & Zi.DashCase ? n.style.removeProperty(t) : (n.style[t] = '');
        }
        setProperty(n, t, i) {
          n[t] = i;
        }
        setValue(n, t) {
          n.nodeValue = t;
        }
        listen(n, t, i) {
          if (
            'string' == typeof n &&
            !(n = er().getGlobalEventTarget(this.doc, n))
          )
            throw new Error(`Unsupported event target ${n} for event ${t}`);
          return this.eventManager.addEventListener(
            n,
            t,
            this.decoratePreventDefault(i)
          );
        }
        decoratePreventDefault(n) {
          return t => {
            if ('__ngUnwrap__' === t) return n;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => n(t))
                : n(t)) && t.preventDefault();
          };
        }
      }
      function qC(e) {
        return 'TEMPLATE' === e.tagName && void 0 !== e.content;
      }
      class xH extends Om {
        constructor(n, t, i, r, o, s, a, l) {
          super(n, o, s, l),
            (this.sharedStylesHost = t),
            (this.hostEl = i),
            (this.shadowRoot = i.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const c = WC(r.id, r.styles);
          for (const d of c) {
            const u = document.createElement('style');
            a && u.setAttribute('nonce', a),
              (u.textContent = d),
              this.shadowRoot.appendChild(u);
          }
        }
        nodeOrShadowRoot(n) {
          return n === this.hostEl ? this.shadowRoot : n;
        }
        appendChild(n, t) {
          return super.appendChild(this.nodeOrShadowRoot(n), t);
        }
        insertBefore(n, t, i) {
          return super.insertBefore(this.nodeOrShadowRoot(n), t, i);
        }
        removeChild(n, t) {
          return super.removeChild(this.nodeOrShadowRoot(n), t);
        }
        parentNode(n) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(n))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class Rm extends Om {
        constructor(n, t, i, r, o, s, a, l) {
          super(n, o, s, a),
            (this.sharedStylesHost = t),
            (this.removeStylesOnCompDestroy = r),
            (this.styles = l ? WC(l, i.styles) : i.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class ZC extends Rm {
        constructor(n, t, i, r, o, s, a, l) {
          const c = r + '-' + i.id;
          super(n, t, i, o, s, a, l, c),
            (this.contentAttr = (function CH(e) {
              return '_ngcontent-%COMP%'.replace(Am, e);
            })(c)),
            (this.hostAttr = (function EH(e) {
              return '_nghost-%COMP%'.replace(Am, e);
            })(c));
        }
        applyToHost(n) {
          this.applyStyles(), this.setAttribute(n, this.hostAttr, '');
        }
        createElement(n, t) {
          const i = super.createElement(n, t);
          return super.setAttribute(i, this.contentAttr, ''), i;
        }
      }
      let TH = (() => {
        class e extends $C {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, i, r) {
            return (
              t.addEventListener(i, r, !1),
              () => this.removeEventListener(t, i, r)
            );
          }
          removeEventListener(t, i, r) {
            return t.removeEventListener(i, r);
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(je));
          });
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const YC = ['alt', 'control', 'meta', 'shift'],
        MH = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        IH = {
          alt: e => e.altKey,
          control: e => e.ctrlKey,
          meta: e => e.metaKey,
          shift: e => e.shiftKey,
        };
      let AH = (() => {
        class e extends $C {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return null != e.parseEventName(t);
          }
          addEventListener(t, i, r) {
            const o = e.parseEventName(i),
              s = e.eventCallback(o.fullKey, r, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => er().onAndCancel(t, o.domEventName, s));
          }
          static parseEventName(t) {
            const i = t.toLowerCase().split('.'),
              r = i.shift();
            if (0 === i.length || ('keydown' !== r && 'keyup' !== r))
              return null;
            const o = e._normalizeKey(i.pop());
            let s = '',
              a = i.indexOf('code');
            if (
              (a > -1 && (i.splice(a, 1), (s = 'code.')),
              YC.forEach(c => {
                const d = i.indexOf(c);
                d > -1 && (i.splice(d, 1), (s += c + '.'));
              }),
              (s += o),
              0 != i.length || 0 === o.length)
            )
              return null;
            const l = {};
            return (l.domEventName = r), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(t, i) {
            let r = MH[t.key] || t.key,
              o = '';
            return (
              i.indexOf('code.') > -1 && ((r = t.code), (o = 'code.')),
              !(null == r || !r) &&
                ((r = r.toLowerCase()),
                ' ' === r ? (r = 'space') : '.' === r && (r = 'dot'),
                YC.forEach(s => {
                  s !== r && (0, IH[s])(t) && (o += s + '.');
                }),
                (o += r),
                o === i)
            );
          }
          static eventCallback(t, i, r) {
            return o => {
              e.matchEventFullKeyCode(o, t) && r.runGuarded(() => i(o));
            };
          }
          static _normalizeKey(t) {
            return 'esc' === t ? 'escape' : t;
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(je));
          });
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const FH = V1(dB, 'browser', [
          { provide: Ki, useValue: FC },
          {
            provide: qb,
            useValue: function NH() {
              xm.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: je,
            useFactory: function RH() {
              return (
                (function xR(e) {
                  vh = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        kH = new T(''),
        JC = [
          {
            provide: fd,
            useClass: class _H {
              addToWindow(n) {
                (ke.getAngularTestability = (i, r = !0) => {
                  const o = n.findTestabilityInTree(i, r);
                  if (null == o) throw new b(5103, !1);
                  return o;
                }),
                  (ke.getAllAngularTestabilities = () =>
                    n.getAllTestabilities()),
                  (ke.getAllAngularRootElements = () => n.getAllRootElements()),
                  ke.frameworkStabilizers || (ke.frameworkStabilizers = []),
                  ke.frameworkStabilizers.push(i => {
                    const r = ke.getAllAngularTestabilities();
                    let o = r.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), o--, 0 == o && i(s);
                    };
                    r.forEach(l => {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(n, t, i) {
                return null == t
                  ? null
                  : n.getTestability(t) ??
                      (i
                        ? er().isShadowRoot(t)
                          ? this.findTestabilityInTree(n, t.host, !0)
                          : this.findTestabilityInTree(n, t.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: R1, useClass: qp, deps: [ae, Zp, fd] },
          { provide: qp, useClass: qp, deps: [ae, Zp, fd] },
        ],
        XC = [
          { provide: Mh, useValue: 'root' },
          {
            provide: Mi,
            useFactory: function OH() {
              return new Mi();
            },
            deps: [],
          },
          { provide: Tm, useClass: TH, multi: !0, deps: [je, ae, Ki] },
          { provide: Tm, useClass: AH, multi: !0, deps: [je] },
          Nm,
          zC,
          UC,
          { provide: Po, useExisting: Nm },
          { provide: LC, useClass: vH, deps: [] },
          [],
        ];
      let eE = (() => {
          class e {
            constructor(t) {}
            static withServerTransition(t) {
              return {
                ngModule: e,
                providers: [{ provide: Oc, useValue: t.appId }],
              };
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(x(kH, 12));
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({
              providers: [...XC, ...JC],
              imports: [RC, uB],
            }));
          }
          return e;
        })(),
        tE = (() => {
          class e {
            constructor(t) {
              this._doc = t;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(t) {
              this._doc.title = t || '';
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(x(je));
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: function (i) {
                let r = null;
                return (
                  (r = i
                    ? new i()
                    : (function LH() {
                        return new tE(x(je));
                      })()),
                  r
                );
              },
              providedIn: 'root',
            }));
          }
          return e;
        })();
      typeof window < 'u' && window;
      const { isArray: $H } = Array,
        { getPrototypeOf: zH, prototype: GH, keys: WH } = Object;
      function oE(e) {
        if (1 === e.length) {
          const n = e[0];
          if ($H(n)) return { args: n, keys: null };
          if (
            (function qH(e) {
              return e && 'object' == typeof e && zH(e) === GH;
            })(n)
          ) {
            const t = WH(n);
            return { args: t.map(i => n[i]), keys: t };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: ZH } = Array;
      function km(e) {
        return ie(n =>
          (function YH(e, n) {
            return ZH(n) ? e(...n) : e(n);
          })(e, n)
        );
      }
      function sE(e, n) {
        return e.reduce((t, i, r) => ((t[i] = n[r]), t), {});
      }
      function Nd(...e) {
        const n = Rs(e),
          t = jl(e),
          { args: i, keys: r } = oE(e);
        if (0 === i.length) return ct([], n);
        const o = new Ae(
          (function KH(e, n, t = bi) {
            return i => {
              aE(
                n,
                () => {
                  const { length: r } = e,
                    o = new Array(r);
                  let s = r,
                    a = r;
                  for (let l = 0; l < r; l++)
                    aE(
                      n,
                      () => {
                        const c = ct(e[l], n);
                        let d = !1;
                        c.subscribe(
                          Fe(
                            i,
                            u => {
                              (o[l] = u),
                                d || ((d = !0), a--),
                                a || i.next(t(o.slice()));
                            },
                            () => {
                              --s || i.complete();
                            }
                          )
                        );
                      },
                      i
                    );
                },
                i
              );
            };
          })(i, n, r ? s => sE(r, s) : bi)
        );
        return t ? o.pipe(km(t)) : o;
      }
      function aE(e, n, t) {
        e ? Di(t, e, n) : n();
      }
      const Od = As(
        e =>
          function () {
            e(this),
              (this.name = 'EmptyError'),
              (this.message = 'no elements in sequence');
          }
      );
      function rs(...e) {
        return (function QH() {
          return ro(1);
        })()(ct(e, Rs(e)));
      }
      function lE(e) {
        return new Ae(n => {
          at(e()).subscribe(n);
        });
      }
      function Ua(e, n) {
        const t = ue(e) ? e : () => e,
          i = r => r.error(t());
        return new Ae(n ? r => n.schedule(i, 0, r) : i);
      }
      function Pm() {
        return Ye((e, n) => {
          let t = null;
          e._refCount++;
          const i = Fe(n, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (t = null);
            const r = e._connection,
              o = t;
            (t = null),
              r && (!o || r === o) && r.unsubscribe(),
              n.unsubscribe();
          });
          e.subscribe(i), i.closed || (t = e.connect());
        });
      }
      class cE extends Ae {
        constructor(n, t) {
          super(),
            (this.source = n),
            (this.subjectFactory = t),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            ev(n) && (this.lift = n.lift);
        }
        _subscribe(n) {
          return this.getSubject().subscribe(n);
        }
        getSubject() {
          const n = this._subject;
          return (
            (!n || n.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: n } = this;
          (this._subject = this._connection = null), n?.unsubscribe();
        }
        connect() {
          let n = this._connection;
          if (!n) {
            n = this._connection = new Pt();
            const t = this.getSubject();
            n.add(
              this.source.subscribe(
                Fe(
                  t,
                  void 0,
                  () => {
                    this._teardown(), t.complete();
                  },
                  i => {
                    this._teardown(), t.error(i);
                  },
                  () => this._teardown()
                )
              )
            ),
              n.closed && ((this._connection = null), (n = Pt.EMPTY));
          }
          return n;
        }
        refCount() {
          return Pm()(this);
        }
      }
      function vt(e) {
        return e <= 0
          ? () => wn
          : Ye((n, t) => {
              let i = 0;
              n.subscribe(
                Fe(t, r => {
                  ++i <= e && (t.next(r), e <= i && t.complete());
                })
              );
            });
      }
      function Lm(...e) {
        const n = Rs(e);
        return Ye((t, i) => {
          (n ? rs(e, t, n) : rs(e, t)).subscribe(i);
        });
      }
      function it(e, n) {
        return Ye((t, i) => {
          let r = 0;
          t.subscribe(Fe(i, o => e.call(n, o, r++) && i.next(o)));
        });
      }
      function Rd(e) {
        return Ye((n, t) => {
          let i = !1;
          n.subscribe(
            Fe(
              t,
              r => {
                (i = !0), t.next(r);
              },
              () => {
                i || t.next(e), t.complete();
              }
            )
          );
        });
      }
      function dE(e = JH) {
        return Ye((n, t) => {
          let i = !1;
          n.subscribe(
            Fe(
              t,
              r => {
                (i = !0), t.next(r);
              },
              () => (i ? t.complete() : t.error(e()))
            )
          );
        });
      }
      function JH() {
        return new Od();
      }
      function Or(e, n) {
        const t = arguments.length >= 2;
        return i =>
          i.pipe(
            e ? it((r, o) => e(r, o, i)) : bi,
            vt(1),
            t ? Rd(n) : dE(() => new Od())
          );
      }
      function os(e, n) {
        return ue(n) ? lt(e, n, 1) : lt(e, 1);
      }
      function yt(e, n, t) {
        const i = ue(e) || n || t ? { next: e, error: n, complete: t } : e;
        return i
          ? Ye((r, o) => {
              var s;
              null === (s = i.subscribe) || void 0 === s || s.call(i);
              let a = !0;
              r.subscribe(
                Fe(
                  o,
                  l => {
                    var c;
                    null === (c = i.next) || void 0 === c || c.call(i, l),
                      o.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = i.complete) || void 0 === l || l.call(i),
                      o.complete();
                  },
                  l => {
                    var c;
                    (a = !1),
                      null === (c = i.error) || void 0 === c || c.call(i, l),
                      o.error(l);
                  },
                  () => {
                    var l, c;
                    a &&
                      (null === (l = i.unsubscribe) ||
                        void 0 === l ||
                        l.call(i)),
                      null === (c = i.finalize) || void 0 === c || c.call(i);
                  }
                )
              );
            })
          : bi;
      }
      function Rr(e) {
        return Ye((n, t) => {
          let o,
            i = null,
            r = !1;
          (i = n.subscribe(
            Fe(t, void 0, void 0, s => {
              (o = at(e(s, Rr(e)(n)))),
                i ? (i.unsubscribe(), (i = null), o.subscribe(t)) : (r = !0);
            })
          )),
            r && (i.unsubscribe(), (i = null), o.subscribe(t));
        });
      }
      function Vm(e) {
        return e <= 0
          ? () => wn
          : Ye((n, t) => {
              let i = [];
              n.subscribe(
                Fe(
                  t,
                  r => {
                    i.push(r), e < i.length && i.shift();
                  },
                  () => {
                    for (const r of i) t.next(r);
                    t.complete();
                  },
                  void 0,
                  () => {
                    i = null;
                  }
                )
              );
            });
      }
      function $a(e) {
        return Ye((n, t) => {
          try {
            n.subscribe(t);
          } finally {
            t.add(e);
          }
        });
      }
      function We(e) {
        return Ye((n, t) => {
          at(e).subscribe(Fe(t, () => t.complete(), Ns)),
            !t.closed && n.subscribe(t);
        });
      }
      const ne = 'primary',
        za = Symbol('RouteTitle');
      class nU {
        constructor(n) {
          this.params = n || {};
        }
        has(n) {
          return Object.prototype.hasOwnProperty.call(this.params, n);
        }
        get(n) {
          if (this.has(n)) {
            const t = this.params[n];
            return Array.isArray(t) ? t[0] : t;
          }
          return null;
        }
        getAll(n) {
          if (this.has(n)) {
            const t = this.params[n];
            return Array.isArray(t) ? t : [t];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function ss(e) {
        return new nU(e);
      }
      function iU(e, n, t) {
        const i = t.path.split('/');
        if (
          i.length > e.length ||
          ('full' === t.pathMatch && (n.hasChildren() || i.length < e.length))
        )
          return null;
        const r = {};
        for (let o = 0; o < i.length; o++) {
          const s = i[o],
            a = e[o];
          if (s.startsWith(':')) r[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, i.length), posParams: r };
      }
      function fi(e, n) {
        const t = e ? Object.keys(e) : void 0,
          i = n ? Object.keys(n) : void 0;
        if (!t || !i || t.length != i.length) return !1;
        let r;
        for (let o = 0; o < t.length; o++)
          if (((r = t[o]), !fE(e[r], n[r]))) return !1;
        return !0;
      }
      function fE(e, n) {
        if (Array.isArray(e) && Array.isArray(n)) {
          if (e.length !== n.length) return !1;
          const t = [...e].sort(),
            i = [...n].sort();
          return t.every((r, o) => i[o] === r);
        }
        return e === n;
      }
      function hE(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function nr(e) {
        return (function UH(e) {
          return !!e && (e instanceof Ae || (ue(e.lift) && ue(e.subscribe)));
        })(e)
          ? e
          : Da(e)
          ? ct(Promise.resolve(e))
          : G(e);
      }
      const oU = {
          exact: function gE(e, n, t) {
            if (
              !Fr(e.segments, n.segments) ||
              !Fd(e.segments, n.segments, t) ||
              e.numberOfChildren !== n.numberOfChildren
            )
              return !1;
            for (const i in n.children)
              if (!e.children[i] || !gE(e.children[i], n.children[i], t))
                return !1;
            return !0;
          },
          subset: _E,
        },
        pE = {
          exact: function sU(e, n) {
            return fi(e, n);
          },
          subset: function aU(e, n) {
            return (
              Object.keys(n).length <= Object.keys(e).length &&
              Object.keys(n).every(t => fE(e[t], n[t]))
            );
          },
          ignored: () => !0,
        };
      function mE(e, n, t) {
        return (
          oU[t.paths](e.root, n.root, t.matrixParams) &&
          pE[t.queryParams](e.queryParams, n.queryParams) &&
          !('exact' === t.fragment && e.fragment !== n.fragment)
        );
      }
      function _E(e, n, t) {
        return vE(e, n, n.segments, t);
      }
      function vE(e, n, t, i) {
        if (e.segments.length > t.length) {
          const r = e.segments.slice(0, t.length);
          return !(!Fr(r, t) || n.hasChildren() || !Fd(r, t, i));
        }
        if (e.segments.length === t.length) {
          if (!Fr(e.segments, t) || !Fd(e.segments, t, i)) return !1;
          for (const r in n.children)
            if (!e.children[r] || !_E(e.children[r], n.children[r], i))
              return !1;
          return !0;
        }
        {
          const r = t.slice(0, e.segments.length),
            o = t.slice(e.segments.length);
          return (
            !!(Fr(e.segments, r) && Fd(e.segments, r, i) && e.children[ne]) &&
            vE(e.children[ne], n, o, i)
          );
        }
      }
      function Fd(e, n, t) {
        return n.every((i, r) => pE[t](e[r].parameters, i.parameters));
      }
      class as {
        constructor(n = new Ie([], {}), t = {}, i = null) {
          (this.root = n), (this.queryParams = t), (this.fragment = i);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = ss(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return dU.serialize(this);
        }
      }
      class Ie {
        constructor(n, t) {
          (this.segments = n),
            (this.children = t),
            (this.parent = null),
            Object.values(t).forEach(i => (i.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return kd(this);
        }
      }
      class Ga {
        constructor(n, t) {
          (this.path = n), (this.parameters = t);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = ss(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return DE(this);
        }
      }
      function Fr(e, n) {
        return e.length === n.length && e.every((t, i) => t.path === n[i].path);
      }
      let Wa = (() => {
        class e {
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: function () {
              return new Bm();
            },
            providedIn: 'root',
          }));
        }
        return e;
      })();
      class Bm {
        parse(n) {
          const t = new DU(n);
          return new as(
            t.parseRootSegment(),
            t.parseQueryParams(),
            t.parseFragment()
          );
        }
        serialize(n) {
          const t = `/${qa(n.root, !0)}`,
            i = (function hU(e) {
              const n = Object.keys(e)
                .map(t => {
                  const i = e[t];
                  return Array.isArray(i)
                    ? i.map(r => `${Pd(t)}=${Pd(r)}`).join('&')
                    : `${Pd(t)}=${Pd(i)}`;
                })
                .filter(t => !!t);
              return n.length ? `?${n.join('&')}` : '';
            })(n.queryParams);
          return `${t}${i}${
            'string' == typeof n.fragment
              ? `#${(function uU(e) {
                  return encodeURI(e);
                })(n.fragment)}`
              : ''
          }`;
        }
      }
      const dU = new Bm();
      function kd(e) {
        return e.segments.map(n => DE(n)).join('/');
      }
      function qa(e, n) {
        if (!e.hasChildren()) return kd(e);
        if (n) {
          const t = e.children[ne] ? qa(e.children[ne], !1) : '',
            i = [];
          return (
            Object.entries(e.children).forEach(([r, o]) => {
              r !== ne && i.push(`${r}:${qa(o, !1)}`);
            }),
            i.length > 0 ? `${t}(${i.join('//')})` : t
          );
        }
        {
          const t = (function cU(e, n) {
            let t = [];
            return (
              Object.entries(e.children).forEach(([i, r]) => {
                i === ne && (t = t.concat(n(r, i)));
              }),
              Object.entries(e.children).forEach(([i, r]) => {
                i !== ne && (t = t.concat(n(r, i)));
              }),
              t
            );
          })(e, (i, r) =>
            r === ne ? [qa(e.children[ne], !1)] : [`${r}:${qa(i, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[ne]
            ? `${kd(e)}/${t[0]}`
            : `${kd(e)}/(${t.join('//')})`;
        }
      }
      function yE(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',');
      }
      function Pd(e) {
        return yE(e).replace(/%3B/gi, ';');
      }
      function jm(e) {
        return yE(e)
          .replace(/\(/g, '%28')
          .replace(/\)/g, '%29')
          .replace(/%26/gi, '&');
      }
      function Ld(e) {
        return decodeURIComponent(e);
      }
      function bE(e) {
        return Ld(e.replace(/\+/g, '%20'));
      }
      function DE(e) {
        return `${jm(e.path)}${(function fU(e) {
          return Object.keys(e)
            .map(n => `;${jm(n)}=${jm(e[n])}`)
            .join('');
        })(e.parameters)}`;
      }
      const pU = /^[^\/()?;#]+/;
      function Hm(e) {
        const n = e.match(pU);
        return n ? n[0] : '';
      }
      const mU = /^[^\/()?;=#]+/,
        _U = /^[^=?&#]+/,
        yU = /^[^&#]+/;
      class DU {
        constructor(n) {
          (this.url = n), (this.remaining = n);
        }
        parseRootSegment() {
          return (
            this.consumeOptional('/'),
            '' === this.remaining ||
            this.peekStartsWith('?') ||
            this.peekStartsWith('#')
              ? new Ie([], {})
              : new Ie([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const n = {};
          if (this.consumeOptional('?'))
            do {
              this.parseQueryParam(n);
            } while (this.consumeOptional('&'));
          return n;
        }
        parseFragment() {
          return this.consumeOptional('#')
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ('' === this.remaining) return {};
          this.consumeOptional('/');
          const n = [];
          for (
            this.peekStartsWith('(') || n.push(this.parseSegment());
            this.peekStartsWith('/') &&
            !this.peekStartsWith('//') &&
            !this.peekStartsWith('/(');

          )
            this.capture('/'), n.push(this.parseSegment());
          let t = {};
          this.peekStartsWith('/(') &&
            (this.capture('/'), (t = this.parseParens(!0)));
          let i = {};
          return (
            this.peekStartsWith('(') && (i = this.parseParens(!1)),
            (n.length > 0 || Object.keys(t).length > 0) &&
              (i[ne] = new Ie(n, t)),
            i
          );
        }
        parseSegment() {
          const n = Hm(this.remaining);
          if ('' === n && this.peekStartsWith(';')) throw new b(4009, !1);
          return this.capture(n), new Ga(Ld(n), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const n = {};
          for (; this.consumeOptional(';'); ) this.parseParam(n);
          return n;
        }
        parseParam(n) {
          const t = (function gU(e) {
            const n = e.match(mU);
            return n ? n[0] : '';
          })(this.remaining);
          if (!t) return;
          this.capture(t);
          let i = '';
          if (this.consumeOptional('=')) {
            const r = Hm(this.remaining);
            r && ((i = r), this.capture(i));
          }
          n[Ld(t)] = Ld(i);
        }
        parseQueryParam(n) {
          const t = (function vU(e) {
            const n = e.match(_U);
            return n ? n[0] : '';
          })(this.remaining);
          if (!t) return;
          this.capture(t);
          let i = '';
          if (this.consumeOptional('=')) {
            const s = (function bU(e) {
              const n = e.match(yU);
              return n ? n[0] : '';
            })(this.remaining);
            s && ((i = s), this.capture(i));
          }
          const r = bE(t),
            o = bE(i);
          if (n.hasOwnProperty(r)) {
            let s = n[r];
            Array.isArray(s) || ((s = [s]), (n[r] = s)), s.push(o);
          } else n[r] = o;
        }
        parseParens(n) {
          const t = {};
          for (
            this.capture('(');
            !this.consumeOptional(')') && this.remaining.length > 0;

          ) {
            const i = Hm(this.remaining),
              r = this.remaining[i.length];
            if ('/' !== r && ')' !== r && ';' !== r) throw new b(4010, !1);
            let o;
            i.indexOf(':') > -1
              ? ((o = i.slice(0, i.indexOf(':'))),
                this.capture(o),
                this.capture(':'))
              : n && (o = ne);
            const s = this.parseChildren();
            (t[o] = 1 === Object.keys(s).length ? s[ne] : new Ie([], s)),
              this.consumeOptional('//');
          }
          return t;
        }
        peekStartsWith(n) {
          return this.remaining.startsWith(n);
        }
        consumeOptional(n) {
          return (
            !!this.peekStartsWith(n) &&
            ((this.remaining = this.remaining.substring(n.length)), !0)
          );
        }
        capture(n) {
          if (!this.consumeOptional(n)) throw new b(4011, !1);
        }
      }
      function wE(e) {
        return e.segments.length > 0 ? new Ie([], { [ne]: e }) : e;
      }
      function CE(e) {
        const n = {};
        for (const i of Object.keys(e.children)) {
          const o = CE(e.children[i]);
          if (i === ne && 0 === o.segments.length && o.hasChildren())
            for (const [s, a] of Object.entries(o.children)) n[s] = a;
          else (o.segments.length > 0 || o.hasChildren()) && (n[i] = o);
        }
        return (function wU(e) {
          if (1 === e.numberOfChildren && e.children[ne]) {
            const n = e.children[ne];
            return new Ie(e.segments.concat(n.segments), n.children);
          }
          return e;
        })(new Ie(e.segments, n));
      }
      function kr(e) {
        return e instanceof as;
      }
      function EE(e) {
        let n;
        const r = wE(
          (function t(o) {
            const s = {};
            for (const l of o.children) {
              const c = t(l);
              s[l.outlet] = c;
            }
            const a = new Ie(o.url, s);
            return o === e && (n = a), a;
          })(e.root)
        );
        return n ?? r;
      }
      function SE(e, n, t, i) {
        let r = e;
        for (; r.parent; ) r = r.parent;
        if (0 === n.length) return Um(r, r, r, t, i);
        const o = (function EU(e) {
          if ('string' == typeof e[0] && 1 === e.length && '/' === e[0])
            return new TE(!0, 0, e);
          let n = 0,
            t = !1;
          const i = e.reduce((r, o, s) => {
            if ('object' == typeof o && null != o) {
              if (o.outlets) {
                const a = {};
                return (
                  Object.entries(o.outlets).forEach(([l, c]) => {
                    a[l] = 'string' == typeof c ? c.split('/') : c;
                  }),
                  [...r, { outlets: a }]
                );
              }
              if (o.segmentPath) return [...r, o.segmentPath];
            }
            return 'string' != typeof o
              ? [...r, o]
              : 0 === s
              ? (o.split('/').forEach((a, l) => {
                  (0 == l && '.' === a) ||
                    (0 == l && '' === a
                      ? (t = !0)
                      : '..' === a
                      ? n++
                      : '' != a && r.push(a));
                }),
                r)
              : [...r, o];
          }, []);
          return new TE(t, n, i);
        })(n);
        if (o.toRoot()) return Um(r, r, new Ie([], {}), t, i);
        const s = (function SU(e, n, t) {
            if (e.isAbsolute) return new Bd(n, !0, 0);
            if (!t) return new Bd(n, !1, NaN);
            if (null === t.parent) return new Bd(t, !0, 0);
            const i = Vd(e.commands[0]) ? 0 : 1;
            return (function xU(e, n, t) {
              let i = e,
                r = n,
                o = t;
              for (; o > r; ) {
                if (((o -= r), (i = i.parent), !i)) throw new b(4005, !1);
                r = i.segments.length;
              }
              return new Bd(i, !1, r - o);
            })(t, t.segments.length - 1 + i, e.numberOfDoubleDots);
          })(o, r, e),
          a = s.processChildren
            ? Ya(s.segmentGroup, s.index, o.commands)
            : ME(s.segmentGroup, s.index, o.commands);
        return Um(r, s.segmentGroup, a, t, i);
      }
      function Vd(e) {
        return (
          'object' == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Za(e) {
        return 'object' == typeof e && null != e && e.outlets;
      }
      function Um(e, n, t, i, r) {
        let s,
          o = {};
        i &&
          Object.entries(i).forEach(([l, c]) => {
            o[l] = Array.isArray(c) ? c.map(d => `${d}`) : `${c}`;
          }),
          (s = e === n ? t : xE(e, n, t));
        const a = wE(CE(s));
        return new as(a, o, r);
      }
      function xE(e, n, t) {
        const i = {};
        return (
          Object.entries(e.children).forEach(([r, o]) => {
            i[r] = o === n ? t : xE(o, n, t);
          }),
          new Ie(e.segments, i)
        );
      }
      class TE {
        constructor(n, t, i) {
          if (
            ((this.isAbsolute = n),
            (this.numberOfDoubleDots = t),
            (this.commands = i),
            n && i.length > 0 && Vd(i[0]))
          )
            throw new b(4003, !1);
          const r = i.find(Za);
          if (r && r !== hE(i)) throw new b(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            '/' == this.commands[0]
          );
        }
      }
      class Bd {
        constructor(n, t, i) {
          (this.segmentGroup = n), (this.processChildren = t), (this.index = i);
        }
      }
      function ME(e, n, t) {
        if (
          (e || (e = new Ie([], {})),
          0 === e.segments.length && e.hasChildren())
        )
          return Ya(e, n, t);
        const i = (function MU(e, n, t) {
            let i = 0,
              r = n;
            const o = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; r < e.segments.length; ) {
              if (i >= t.length) return o;
              const s = e.segments[r],
                a = t[i];
              if (Za(a)) break;
              const l = `${a}`,
                c = i < t.length - 1 ? t[i + 1] : null;
              if (r > 0 && void 0 === l) break;
              if (l && c && 'object' == typeof c && void 0 === c.outlets) {
                if (!AE(l, c, s)) return o;
                i += 2;
              } else {
                if (!AE(l, {}, s)) return o;
                i++;
              }
              r++;
            }
            return { match: !0, pathIndex: r, commandIndex: i };
          })(e, n, t),
          r = t.slice(i.commandIndex);
        if (i.match && i.pathIndex < e.segments.length) {
          const o = new Ie(e.segments.slice(0, i.pathIndex), {});
          return (
            (o.children[ne] = new Ie(
              e.segments.slice(i.pathIndex),
              e.children
            )),
            Ya(o, 0, r)
          );
        }
        return i.match && 0 === r.length
          ? new Ie(e.segments, {})
          : i.match && !e.hasChildren()
          ? $m(e, n, t)
          : i.match
          ? Ya(e, 0, r)
          : $m(e, n, t);
      }
      function Ya(e, n, t) {
        if (0 === t.length) return new Ie(e.segments, {});
        {
          const i = (function TU(e) {
              return Za(e[0]) ? e[0].outlets : { [ne]: e };
            })(t),
            r = {};
          if (
            Object.keys(i).some(o => o !== ne) &&
            e.children[ne] &&
            1 === e.numberOfChildren &&
            0 === e.children[ne].segments.length
          ) {
            const o = Ya(e.children[ne], n, t);
            return new Ie(e.segments, o.children);
          }
          return (
            Object.entries(i).forEach(([o, s]) => {
              'string' == typeof s && (s = [s]),
                null !== s && (r[o] = ME(e.children[o], n, s));
            }),
            Object.entries(e.children).forEach(([o, s]) => {
              void 0 === i[o] && (r[o] = s);
            }),
            new Ie(e.segments, r)
          );
        }
      }
      function $m(e, n, t) {
        const i = e.segments.slice(0, n);
        let r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if (Za(o)) {
            const l = IU(o.outlets);
            return new Ie(i, l);
          }
          if (0 === r && Vd(t[0])) {
            i.push(new Ga(e.segments[n].path, IE(t[0]))), r++;
            continue;
          }
          const s = Za(o) ? o.outlets[ne] : `${o}`,
            a = r < t.length - 1 ? t[r + 1] : null;
          s && a && Vd(a)
            ? (i.push(new Ga(s, IE(a))), (r += 2))
            : (i.push(new Ga(s, {})), r++);
        }
        return new Ie(i, {});
      }
      function IU(e) {
        const n = {};
        return (
          Object.entries(e).forEach(([t, i]) => {
            'string' == typeof i && (i = [i]),
              null !== i && (n[t] = $m(new Ie([], {}), 0, i));
          }),
          n
        );
      }
      function IE(e) {
        const n = {};
        return Object.entries(e).forEach(([t, i]) => (n[t] = `${i}`)), n;
      }
      function AE(e, n, t) {
        return e == t.path && fi(n, t.parameters);
      }
      const Ka = 'imperative';
      class hi {
        constructor(n, t) {
          (this.id = n), (this.url = t);
        }
      }
      class jd extends hi {
        constructor(n, t, i = 'imperative', r = null) {
          super(n, t),
            (this.type = 0),
            (this.navigationTrigger = i),
            (this.restoredState = r);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class ki extends hi {
        constructor(n, t, i) {
          super(n, t), (this.urlAfterRedirects = i), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Qa extends hi {
        constructor(n, t, i, r) {
          super(n, t), (this.reason = i), (this.code = r), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class ls extends hi {
        constructor(n, t, i, r) {
          super(n, t), (this.reason = i), (this.code = r), (this.type = 16);
        }
      }
      class Hd extends hi {
        constructor(n, t, i, r) {
          super(n, t), (this.error = i), (this.target = r), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class NE extends hi {
        constructor(n, t, i, r) {
          super(n, t),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class AU extends hi {
        constructor(n, t, i, r) {
          super(n, t),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class NU extends hi {
        constructor(n, t, i, r, o) {
          super(n, t),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.shouldActivate = o),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class OU extends hi {
        constructor(n, t, i, r) {
          super(n, t),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class RU extends hi {
        constructor(n, t, i, r) {
          super(n, t),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class FU {
        constructor(n) {
          (this.route = n), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class kU {
        constructor(n) {
          (this.route = n), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class PU {
        constructor(n) {
          (this.snapshot = n), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`;
        }
      }
      class LU {
        constructor(n) {
          (this.snapshot = n), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`;
        }
      }
      class VU {
        constructor(n) {
          (this.snapshot = n), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`;
        }
      }
      class BU {
        constructor(n) {
          (this.snapshot = n), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`;
        }
      }
      class OE {
        constructor(n, t, i) {
          (this.routerEvent = n),
            (this.position = t),
            (this.anchor = i),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class zm {}
      class Gm {
        constructor(n) {
          this.url = n;
        }
      }
      class jU {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.injector = null),
            (this.children = new Ja()),
            (this.attachRef = null);
        }
      }
      let Ja = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(t, i) {
            const r = this.getOrCreateContext(t);
            (r.outlet = i), this.contexts.set(t, r);
          }
          onChildOutletDestroyed(t) {
            const i = this.getContext(t);
            i && ((i.outlet = null), (i.attachRef = null));
          }
          onOutletDeactivated() {
            const t = this.contexts;
            return (this.contexts = new Map()), t;
          }
          onOutletReAttached(t) {
            this.contexts = t;
          }
          getOrCreateContext(t) {
            let i = this.getContext(t);
            return i || ((i = new jU()), this.contexts.set(t, i)), i;
          }
          getContext(t) {
            return this.contexts.get(t) || null;
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      class RE {
        constructor(n) {
          this._root = n;
        }
        get root() {
          return this._root.value;
        }
        parent(n) {
          const t = this.pathFromRoot(n);
          return t.length > 1 ? t[t.length - 2] : null;
        }
        children(n) {
          const t = Wm(n, this._root);
          return t ? t.children.map(i => i.value) : [];
        }
        firstChild(n) {
          const t = Wm(n, this._root);
          return t && t.children.length > 0 ? t.children[0].value : null;
        }
        siblings(n) {
          const t = qm(n, this._root);
          return t.length < 2
            ? []
            : t[t.length - 2].children.map(r => r.value).filter(r => r !== n);
        }
        pathFromRoot(n) {
          return qm(n, this._root).map(t => t.value);
        }
      }
      function Wm(e, n) {
        if (e === n.value) return n;
        for (const t of n.children) {
          const i = Wm(e, t);
          if (i) return i;
        }
        return null;
      }
      function qm(e, n) {
        if (e === n.value) return [n];
        for (const t of n.children) {
          const i = qm(e, t);
          if (i.length) return i.unshift(n), i;
        }
        return [];
      }
      class Pi {
        constructor(n, t) {
          (this.value = n), (this.children = t);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function cs(e) {
        const n = {};
        return e && e.children.forEach(t => (n[t.value.outlet] = t)), n;
      }
      class FE extends RE {
        constructor(n, t) {
          super(n), (this.snapshot = t), Zm(this, n);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function kE(e, n) {
        const t = (function HU(e, n) {
            const s = new Ud([], {}, {}, '', {}, ne, n, null, {});
            return new LE('', new Pi(s, []));
          })(0, n),
          i = new Nt([new Ga('', {})]),
          r = new Nt({}),
          o = new Nt({}),
          s = new Nt({}),
          a = new Nt(''),
          l = new Pr(i, r, s, a, o, ne, n, t.root);
        return (l.snapshot = t.root), new FE(new Pi(l, []), t);
      }
      class Pr {
        constructor(n, t, i, r, o, s, a, l) {
          (this.urlSubject = n),
            (this.paramsSubject = t),
            (this.queryParamsSubject = i),
            (this.fragmentSubject = r),
            (this.dataSubject = o),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = l),
            (this.title = this.dataSubject?.pipe(ie(c => c[za])) ?? G(void 0)),
            (this.url = n),
            (this.params = t),
            (this.queryParams = i),
            (this.fragment = r),
            (this.data = o);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(ie(n => ss(n)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(ie(n => ss(n)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function PE(e, n = 'emptyOnly') {
        const t = e.pathFromRoot;
        let i = 0;
        if ('always' !== n)
          for (i = t.length - 1; i >= 1; ) {
            const r = t[i],
              o = t[i - 1];
            if (r.routeConfig && '' === r.routeConfig.path) i--;
            else {
              if (o.component) break;
              i--;
            }
          }
        return (function UU(e) {
          return e.reduce(
            (n, t) => ({
              params: { ...n.params, ...t.params },
              data: { ...n.data, ...t.data },
              resolve: {
                ...t.data,
                ...n.resolve,
                ...t.routeConfig?.data,
                ...t._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(t.slice(i));
      }
      class Ud {
        get title() {
          return this.data?.[za];
        }
        constructor(n, t, i, r, o, s, a, l, c) {
          (this.url = n),
            (this.params = t),
            (this.queryParams = i),
            (this.fragment = r),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = l),
            (this._resolve = c);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = ss(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = ss(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map(i => i.toString())
            .join('/')}', path:'${
            this.routeConfig ? this.routeConfig.path : ''
          }')`;
        }
      }
      class LE extends RE {
        constructor(n, t) {
          super(t), (this.url = n), Zm(this, t);
        }
        toString() {
          return VE(this._root);
        }
      }
      function Zm(e, n) {
        (n.value._routerState = e), n.children.forEach(t => Zm(e, t));
      }
      function VE(e) {
        const n =
          e.children.length > 0 ? ` { ${e.children.map(VE).join(', ')} } ` : '';
        return `${e.value}${n}`;
      }
      function Ym(e) {
        if (e.snapshot) {
          const n = e.snapshot,
            t = e._futureSnapshot;
          (e.snapshot = t),
            fi(n.queryParams, t.queryParams) ||
              e.queryParamsSubject.next(t.queryParams),
            n.fragment !== t.fragment && e.fragmentSubject.next(t.fragment),
            fi(n.params, t.params) || e.paramsSubject.next(t.params),
            (function rU(e, n) {
              if (e.length !== n.length) return !1;
              for (let t = 0; t < e.length; ++t) if (!fi(e[t], n[t])) return !1;
              return !0;
            })(n.url, t.url) || e.urlSubject.next(t.url),
            fi(n.data, t.data) || e.dataSubject.next(t.data);
        } else
          (e.snapshot = e._futureSnapshot),
            e.dataSubject.next(e._futureSnapshot.data);
      }
      function Km(e, n) {
        const t =
          fi(e.params, n.params) &&
          (function lU(e, n) {
            return (
              Fr(e, n) && e.every((t, i) => fi(t.parameters, n[i].parameters))
            );
          })(e.url, n.url);
        return (
          t &&
          !(!e.parent != !n.parent) &&
          (!e.parent || Km(e.parent, n.parent))
        );
      }
      let Qm = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = ne),
              (this.activateEvents = new H()),
              (this.deactivateEvents = new H()),
              (this.attachEvents = new H()),
              (this.detachEvents = new H()),
              (this.parentContexts = I(Ja)),
              (this.location = I(Nn)),
              (this.changeDetector = I(Wn)),
              (this.environmentInjector = I(Ut)),
              (this.inputBinder = I($d, { optional: !0 })),
              (this.supportsBindingToComponentInputs = !0);
          }
          get activatedComponentRef() {
            return this.activated;
          }
          ngOnChanges(t) {
            if (t.name) {
              const { firstChange: i, previousValue: r } = t.name;
              if (i) return;
              this.isTrackedInParentContexts(r) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(r)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name),
              this.inputBinder?.unsubscribeFromRouteData(this);
          }
          isTrackedInParentContexts(t) {
            return this.parentContexts.getContext(t)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const t = this.parentContexts.getContext(this.name);
            t?.route &&
              (t.attachRef
                ? this.attach(t.attachRef, t.route)
                : this.activateWith(t.route, t.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new b(4012, !1);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new b(4012, !1);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new b(4012, !1);
            this.location.detach();
            const t = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(t.instance),
              t
            );
          }
          attach(t, i) {
            (this.activated = t),
              (this._activatedRoute = i),
              this.location.insert(t.hostView),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.attachEvents.emit(t.instance);
          }
          deactivate() {
            if (this.activated) {
              const t = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(t);
            }
          }
          activateWith(t, i) {
            if (this.isActivated) throw new b(4013, !1);
            this._activatedRoute = t;
            const r = this.location,
              s = t.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new $U(t, a, r.injector);
            (this.activated = r.createComponent(s, {
              index: r.length,
              injector: l,
              environmentInjector: i ?? this.environmentInjector,
            })),
              this.changeDetector.markForCheck(),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.activateEvents.emit(this.activated.instance);
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵdir = O({
            type: e,
            selectors: [['router-outlet']],
            inputs: { name: 'name' },
            outputs: {
              activateEvents: 'activate',
              deactivateEvents: 'deactivate',
              attachEvents: 'attach',
              detachEvents: 'detach',
            },
            exportAs: ['outlet'],
            standalone: !0,
            features: [Ct],
          }));
        }
        return e;
      })();
      class $U {
        constructor(n, t, i) {
          (this.route = n), (this.childContexts = t), (this.parent = i);
        }
        get(n, t) {
          return n === Pr
            ? this.route
            : n === Ja
            ? this.childContexts
            : this.parent.get(n, t);
        }
      }
      const $d = new T('');
      let BE = (() => {
        class e {
          constructor() {
            this.outletDataSubscriptions = new Map();
          }
          bindActivatedRouteToOutletComponent(t) {
            this.unsubscribeFromRouteData(t), this.subscribeToRouteData(t);
          }
          unsubscribeFromRouteData(t) {
            this.outletDataSubscriptions.get(t)?.unsubscribe(),
              this.outletDataSubscriptions.delete(t);
          }
          subscribeToRouteData(t) {
            const { activatedRoute: i } = t,
              r = Nd([i.queryParams, i.params, i.data])
                .pipe(
                  Cn(
                    ([o, s, a], l) => (
                      (a = { ...o, ...s, ...a }),
                      0 === l ? G(a) : Promise.resolve(a)
                    )
                  )
                )
                .subscribe(o => {
                  if (
                    !t.isActivated ||
                    !t.activatedComponentRef ||
                    t.activatedRoute !== i ||
                    null === i.component
                  )
                    return void this.unsubscribeFromRouteData(t);
                  const s = (function CB(e) {
                    const n = fe(e);
                    if (!n) return null;
                    const t = new ma(n);
                    return {
                      get selector() {
                        return t.selector;
                      },
                      get type() {
                        return t.componentType;
                      },
                      get inputs() {
                        return t.inputs;
                      },
                      get outputs() {
                        return t.outputs;
                      },
                      get ngContentSelectors() {
                        return t.ngContentSelectors;
                      },
                      get isStandalone() {
                        return n.standalone;
                      },
                      get isSignal() {
                        return n.signals;
                      },
                    };
                  })(i.component);
                  if (s)
                    for (const { templateName: a } of s.inputs)
                      t.activatedComponentRef.setInput(a, o[a]);
                  else this.unsubscribeFromRouteData(t);
                });
            this.outletDataSubscriptions.set(t, r);
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function Xa(e, n, t) {
        if (t && e.shouldReuseRoute(n.value, t.value.snapshot)) {
          const i = t.value;
          i._futureSnapshot = n.value;
          const r = (function GU(e, n, t) {
            return n.children.map(i => {
              for (const r of t.children)
                if (e.shouldReuseRoute(i.value, r.value.snapshot))
                  return Xa(e, i, r);
              return Xa(e, i);
            });
          })(e, n, t);
          return new Pi(i, r);
        }
        {
          if (e.shouldAttach(n.value)) {
            const o = e.retrieve(n.value);
            if (null !== o) {
              const s = o.route;
              return (
                (s.value._futureSnapshot = n.value),
                (s.children = n.children.map(a => Xa(e, a))),
                s
              );
            }
          }
          const i = (function WU(e) {
              return new Pr(
                new Nt(e.url),
                new Nt(e.params),
                new Nt(e.queryParams),
                new Nt(e.fragment),
                new Nt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(n.value),
            r = n.children.map(o => Xa(e, o));
          return new Pi(i, r);
        }
      }
      const Jm = 'ngNavigationCancelingError';
      function jE(e, n) {
        const { redirectTo: t, navigationBehaviorOptions: i } = kr(n)
            ? { redirectTo: n, navigationBehaviorOptions: void 0 }
            : n,
          r = HE(!1, 0, n);
        return (r.url = t), (r.navigationBehaviorOptions = i), r;
      }
      function HE(e, n, t) {
        const i = new Error('NavigationCancelingError: ' + (e || ''));
        return (i[Jm] = !0), (i.cancellationCode = n), t && (i.url = t), i;
      }
      function UE(e) {
        return e && e[Jm];
      }
      let $E = (() => {
        class e {
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵcmp = Je({
            type: e,
            selectors: [['ng-component']],
            standalone: !0,
            features: [An],
            decls: 1,
            vars: 0,
            template: function (i, r) {
              1 & i && Be(0, 'router-outlet');
            },
            dependencies: [Qm],
            encapsulation: 2,
          }));
        }
        return e;
      })();
      function Xm(e) {
        const n = e.children && e.children.map(Xm),
          t = n ? { ...e, children: n } : { ...e };
        return (
          !t.component &&
            !t.loadComponent &&
            (n || t.loadChildren) &&
            t.outlet &&
            t.outlet !== ne &&
            (t.component = $E),
          t
        );
      }
      function Kn(e) {
        return e.outlet || ne;
      }
      function el(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let n = e.parent; n; n = n.parent) {
          const t = n.routeConfig;
          if (t?._loadedInjector) return t._loadedInjector;
          if (t?._injector) return t._injector;
        }
        return null;
      }
      class e$ {
        constructor(n, t, i, r, o) {
          (this.routeReuseStrategy = n),
            (this.futureState = t),
            (this.currState = i),
            (this.forwardEvent = r),
            (this.inputBindingEnabled = o);
        }
        activate(n) {
          const t = this.futureState._root,
            i = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(t, i, n),
            Ym(this.futureState.root),
            this.activateChildRoutes(t, i, n);
        }
        deactivateChildRoutes(n, t, i) {
          const r = cs(t);
          n.children.forEach(o => {
            const s = o.value.outlet;
            this.deactivateRoutes(o, r[s], i), delete r[s];
          }),
            Object.values(r).forEach(o => {
              this.deactivateRouteAndItsChildren(o, i);
            });
        }
        deactivateRoutes(n, t, i) {
          const r = n.value,
            o = t ? t.value : null;
          if (r === o)
            if (r.component) {
              const s = i.getContext(r.outlet);
              s && this.deactivateChildRoutes(n, t, s.children);
            } else this.deactivateChildRoutes(n, t, i);
          else o && this.deactivateRouteAndItsChildren(t, i);
        }
        deactivateRouteAndItsChildren(n, t) {
          n.value.component &&
          this.routeReuseStrategy.shouldDetach(n.value.snapshot)
            ? this.detachAndStoreRouteSubtree(n, t)
            : this.deactivateRouteAndOutlet(n, t);
        }
        detachAndStoreRouteSubtree(n, t) {
          const i = t.getContext(n.value.outlet),
            r = i && n.value.component ? i.children : t,
            o = cs(n);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], r);
          if (i && i.outlet) {
            const s = i.outlet.detach(),
              a = i.children.onOutletDeactivated();
            this.routeReuseStrategy.store(n.value.snapshot, {
              componentRef: s,
              route: n,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(n, t) {
          const i = t.getContext(n.value.outlet),
            r = i && n.value.component ? i.children : t,
            o = cs(n);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], r);
          i &&
            (i.outlet &&
              (i.outlet.deactivate(), i.children.onOutletDeactivated()),
            (i.attachRef = null),
            (i.route = null));
        }
        activateChildRoutes(n, t, i) {
          const r = cs(t);
          n.children.forEach(o => {
            this.activateRoutes(o, r[o.value.outlet], i),
              this.forwardEvent(new BU(o.value.snapshot));
          }),
            n.children.length && this.forwardEvent(new LU(n.value.snapshot));
        }
        activateRoutes(n, t, i) {
          const r = n.value,
            o = t ? t.value : null;
          if ((Ym(r), r === o))
            if (r.component) {
              const s = i.getOrCreateContext(r.outlet);
              this.activateChildRoutes(n, t, s.children);
            } else this.activateChildRoutes(n, t, i);
          else if (r.component) {
            const s = i.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Ym(a.route.value),
                this.activateChildRoutes(n, null, s.children);
            } else {
              const a = el(r.snapshot);
              (s.attachRef = null),
                (s.route = r),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(r, s.injector),
                this.activateChildRoutes(n, null, s.children);
            }
          } else this.activateChildRoutes(n, null, i);
        }
      }
      class zE {
        constructor(n) {
          (this.path = n), (this.route = this.path[this.path.length - 1]);
        }
      }
      class zd {
        constructor(n, t) {
          (this.component = n), (this.route = t);
        }
      }
      function t$(e, n, t) {
        const i = e._root;
        return tl(i, n ? n._root : null, t, [i.value]);
      }
      function ds(e, n) {
        const t = Symbol(),
          i = n.get(e, t);
        return i === t
          ? 'function' != typeof e ||
            (function UA(e) {
              return null !== $l(e);
            })(e)
            ? n.get(e)
            : e
          : i;
      }
      function tl(
        e,
        n,
        t,
        i,
        r = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const o = cs(n);
        return (
          e.children.forEach(s => {
            (function i$(
              e,
              n,
              t,
              i,
              r = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const o = e.value,
                s = n ? n.value : null,
                a = t ? t.getContext(e.value.outlet) : null;
              if (s && o.routeConfig === s.routeConfig) {
                const l = (function r$(e, n, t) {
                  if ('function' == typeof t) return t(e, n);
                  switch (t) {
                    case 'pathParamsChange':
                      return !Fr(e.url, n.url);
                    case 'pathParamsOrQueryParamsChange':
                      return (
                        !Fr(e.url, n.url) || !fi(e.queryParams, n.queryParams)
                      );
                    case 'always':
                      return !0;
                    case 'paramsOrQueryParamsChange':
                      return !Km(e, n) || !fi(e.queryParams, n.queryParams);
                    default:
                      return !Km(e, n);
                  }
                })(s, o, o.routeConfig.runGuardsAndResolvers);
                l
                  ? r.canActivateChecks.push(new zE(i))
                  : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
                  tl(e, n, o.component ? (a ? a.children : null) : t, i, r),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    r.canDeactivateChecks.push(new zd(a.outlet.component, s));
              } else
                s && nl(n, a, r),
                  r.canActivateChecks.push(new zE(i)),
                  tl(e, null, o.component ? (a ? a.children : null) : t, i, r);
            })(s, o[s.value.outlet], t, i.concat([s.value]), r),
              delete o[s.value.outlet];
          }),
          Object.entries(o).forEach(([s, a]) => nl(a, t.getContext(s), r)),
          r
        );
      }
      function nl(e, n, t) {
        const i = cs(e),
          r = e.value;
        Object.entries(i).forEach(([o, s]) => {
          nl(s, r.component ? (n ? n.children.getContext(o) : null) : n, t);
        }),
          t.canDeactivateChecks.push(
            new zd(
              r.component && n && n.outlet && n.outlet.isActivated
                ? n.outlet.component
                : null,
              r
            )
          );
      }
      function il(e) {
        return 'function' == typeof e;
      }
      function GE(e) {
        return e instanceof Od || 'EmptyError' === e?.name;
      }
      const Gd = Symbol('INITIAL_VALUE');
      function us() {
        return Cn(e =>
          Nd(e.map(n => n.pipe(vt(1), Lm(Gd)))).pipe(
            ie(n => {
              for (const t of n)
                if (!0 !== t) {
                  if (t === Gd) return Gd;
                  if (!1 === t || t instanceof as) return t;
                }
              return !0;
            }),
            it(n => n !== Gd),
            vt(1)
          )
        );
      }
      function WE(e) {
        return (function qI(...e) {
          return Q_(e);
        })(
          yt(n => {
            if (kr(n)) throw jE(0, n);
          }),
          ie(n => !0 === n)
        );
      }
      class Wd {
        constructor(n) {
          this.segmentGroup = n || null;
        }
      }
      class qE {
        constructor(n) {
          this.urlTree = n;
        }
      }
      function fs(e) {
        return Ua(new Wd(e));
      }
      function ZE(e) {
        return Ua(new qE(e));
      }
      class E$ {
        constructor(n, t) {
          (this.urlSerializer = n), (this.urlTree = t);
        }
        noMatchError(n) {
          return new b(4002, !1);
        }
        lineralizeSegments(n, t) {
          let i = [],
            r = t.root;
          for (;;) {
            if (((i = i.concat(r.segments)), 0 === r.numberOfChildren))
              return G(i);
            if (r.numberOfChildren > 1 || !r.children[ne])
              return Ua(new b(4e3, !1));
            r = r.children[ne];
          }
        }
        applyRedirectCommands(n, t, i) {
          return this.applyRedirectCreateUrlTree(
            t,
            this.urlSerializer.parse(t),
            n,
            i
          );
        }
        applyRedirectCreateUrlTree(n, t, i, r) {
          const o = this.createSegmentGroup(n, t.root, i, r);
          return new as(
            o,
            this.createQueryParams(t.queryParams, this.urlTree.queryParams),
            t.fragment
          );
        }
        createQueryParams(n, t) {
          const i = {};
          return (
            Object.entries(n).forEach(([r, o]) => {
              if ('string' == typeof o && o.startsWith(':')) {
                const a = o.substring(1);
                i[r] = t[a];
              } else i[r] = o;
            }),
            i
          );
        }
        createSegmentGroup(n, t, i, r) {
          const o = this.createSegments(n, t.segments, i, r);
          let s = {};
          return (
            Object.entries(t.children).forEach(([a, l]) => {
              s[a] = this.createSegmentGroup(n, l, i, r);
            }),
            new Ie(o, s)
          );
        }
        createSegments(n, t, i, r) {
          return t.map(o =>
            o.path.startsWith(':')
              ? this.findPosParam(n, o, r)
              : this.findOrReturn(o, i)
          );
        }
        findPosParam(n, t, i) {
          const r = i[t.path.substring(1)];
          if (!r) throw new b(4001, !1);
          return r;
        }
        findOrReturn(n, t) {
          let i = 0;
          for (const r of t) {
            if (r.path === n.path) return t.splice(i), r;
            i++;
          }
          return n;
        }
      }
      const eg = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function S$(e, n, t, i, r) {
        const o = tg(e, n, t);
        return o.matched
          ? ((i = (function ZU(e, n) {
              return (
                e.providers &&
                  !e._injector &&
                  (e._injector = Mp(e.providers, n, `Route: ${e.path}`)),
                e._injector ?? n
              );
            })(n, i)),
            (function D$(e, n, t, i) {
              const r = n.canMatch;
              return r && 0 !== r.length
                ? G(
                    r.map(s => {
                      const a = ds(s, e);
                      return nr(
                        (function d$(e) {
                          return e && il(e.canMatch);
                        })(a)
                          ? a.canMatch(n, t)
                          : e.runInContext(() => a(n, t))
                      );
                    })
                  ).pipe(us(), WE())
                : G(!0);
            })(i, n, t).pipe(ie(s => (!0 === s ? o : { ...eg }))))
          : G(o);
      }
      function tg(e, n, t) {
        if ('' === n.path)
          return 'full' === n.pathMatch && (e.hasChildren() || t.length > 0)
            ? { ...eg }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: t,
                parameters: {},
                positionalParamSegments: {},
              };
        const r = (n.matcher || iU)(t, e, n);
        if (!r) return { ...eg };
        const o = {};
        Object.entries(r.posParams ?? {}).forEach(([a, l]) => {
          o[a] = l.path;
        });
        const s =
          r.consumed.length > 0
            ? { ...o, ...r.consumed[r.consumed.length - 1].parameters }
            : o;
        return {
          matched: !0,
          consumedSegments: r.consumed,
          remainingSegments: t.slice(r.consumed.length),
          parameters: s,
          positionalParamSegments: r.posParams ?? {},
        };
      }
      function YE(e, n, t, i) {
        return t.length > 0 &&
          (function M$(e, n, t) {
            return t.some(i => qd(e, n, i) && Kn(i) !== ne);
          })(e, t, i)
          ? {
              segmentGroup: new Ie(n, T$(i, new Ie(t, e.children))),
              slicedSegments: [],
            }
          : 0 === t.length &&
            (function I$(e, n, t) {
              return t.some(i => qd(e, n, i));
            })(e, t, i)
          ? {
              segmentGroup: new Ie(e.segments, x$(e, 0, t, i, e.children)),
              slicedSegments: t,
            }
          : { segmentGroup: new Ie(e.segments, e.children), slicedSegments: t };
      }
      function x$(e, n, t, i, r) {
        const o = {};
        for (const s of i)
          if (qd(e, t, s) && !r[Kn(s)]) {
            const a = new Ie([], {});
            o[Kn(s)] = a;
          }
        return { ...r, ...o };
      }
      function T$(e, n) {
        const t = {};
        t[ne] = n;
        for (const i of e)
          if ('' === i.path && Kn(i) !== ne) {
            const r = new Ie([], {});
            t[Kn(i)] = r;
          }
        return t;
      }
      function qd(e, n, t) {
        return (
          (!(e.hasChildren() || n.length > 0) || 'full' !== t.pathMatch) &&
          '' === t.path
        );
      }
      class R$ {
        constructor(n, t, i, r, o, s, a) {
          (this.injector = n),
            (this.configLoader = t),
            (this.rootComponentType = i),
            (this.config = r),
            (this.urlTree = o),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a),
            (this.allowRedirects = !0),
            (this.applyRedirects = new E$(this.urlSerializer, this.urlTree));
        }
        noMatchError(n) {
          return new b(4002, !1);
        }
        recognize() {
          const n = YE(this.urlTree.root, [], [], this.config).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            n,
            ne
          ).pipe(
            Rr(t => {
              if (t instanceof qE)
                return (
                  (this.allowRedirects = !1),
                  (this.urlTree = t.urlTree),
                  this.match(t.urlTree)
                );
              throw t instanceof Wd ? this.noMatchError(t) : t;
            }),
            ie(t => {
              const i = new Ud(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  ne,
                  this.rootComponentType,
                  null,
                  {}
                ),
                r = new Pi(i, t),
                o = new LE('', r),
                s = (function CU(e, n, t = null, i = null) {
                  return SE(EE(e), n, t, i);
                })(i, [], this.urlTree.queryParams, this.urlTree.fragment);
              return (
                (s.queryParams = this.urlTree.queryParams),
                (o.url = this.urlSerializer.serialize(s)),
                this.inheritParamsAndData(o._root),
                { state: o, tree: s }
              );
            })
          );
        }
        match(n) {
          return this.processSegmentGroup(
            this.injector,
            this.config,
            n.root,
            ne
          ).pipe(
            Rr(i => {
              throw i instanceof Wd ? this.noMatchError(i) : i;
            })
          );
        }
        inheritParamsAndData(n) {
          const t = n.value,
            i = PE(t, this.paramsInheritanceStrategy);
          (t.params = Object.freeze(i.params)),
            (t.data = Object.freeze(i.data)),
            n.children.forEach(r => this.inheritParamsAndData(r));
        }
        processSegmentGroup(n, t, i, r) {
          return 0 === i.segments.length && i.hasChildren()
            ? this.processChildren(n, t, i)
            : this.processSegment(n, t, i, i.segments, r, !0);
        }
        processChildren(n, t, i) {
          const r = [];
          for (const o of Object.keys(i.children))
            'primary' === o ? r.unshift(o) : r.push(o);
          return ct(r).pipe(
            os(o => {
              const s = i.children[o],
                a = (function JU(e, n) {
                  const t = e.filter(i => Kn(i) === n);
                  return t.push(...e.filter(i => Kn(i) !== n)), t;
                })(t, o);
              return this.processSegmentGroup(n, a, s, o);
            }),
            (function eU(e, n) {
              return Ye(
                (function XH(e, n, t, i, r) {
                  return (o, s) => {
                    let a = t,
                      l = n,
                      c = 0;
                    o.subscribe(
                      Fe(
                        s,
                        d => {
                          const u = c++;
                          (l = a ? e(l, d, u) : ((a = !0), d)), i && s.next(l);
                        },
                        r &&
                          (() => {
                            a && s.next(l), s.complete();
                          })
                      )
                    );
                  };
                })(e, n, arguments.length >= 2, !0)
              );
            })((o, s) => (o.push(...s), o)),
            Rd(null),
            (function tU(e, n) {
              const t = arguments.length >= 2;
              return i =>
                i.pipe(
                  e ? it((r, o) => e(r, o, i)) : bi,
                  Vm(1),
                  t ? Rd(n) : dE(() => new Od())
                );
            })(),
            lt(o => {
              if (null === o) return fs(i);
              const s = KE(o);
              return (
                (function F$(e) {
                  e.sort((n, t) =>
                    n.value.outlet === ne
                      ? -1
                      : t.value.outlet === ne
                      ? 1
                      : n.value.outlet.localeCompare(t.value.outlet)
                  );
                })(s),
                G(s)
              );
            })
          );
        }
        processSegment(n, t, i, r, o, s) {
          return ct(t).pipe(
            os(a =>
              this.processSegmentAgainstRoute(
                a._injector ?? n,
                t,
                a,
                i,
                r,
                o,
                s
              ).pipe(
                Rr(l => {
                  if (l instanceof Wd) return G(null);
                  throw l;
                })
              )
            ),
            Or(a => !!a),
            Rr(a => {
              if (GE(a))
                return (function N$(e, n, t) {
                  return 0 === n.length && !e.children[t];
                })(i, r, o)
                  ? G([])
                  : fs(i);
              throw a;
            })
          );
        }
        processSegmentAgainstRoute(n, t, i, r, o, s, a) {
          return (function A$(e, n, t, i) {
            return (
              !!(Kn(e) === i || (i !== ne && qd(n, t, e))) &&
              ('**' === e.path || tg(n, e, t).matched)
            );
          })(i, r, o, s)
            ? void 0 === i.redirectTo
              ? this.matchSegmentAgainstRoute(n, r, i, o, s, a)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(n, r, t, i, o, s)
              : fs(r)
            : fs(r);
        }
        expandSegmentAgainstRouteUsingRedirect(n, t, i, r, o, s) {
          return '**' === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(n, i, r, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                n,
                t,
                i,
                r,
                o,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(n, t, i, r) {
          const o = this.applyRedirects.applyRedirectCommands(
            [],
            i.redirectTo,
            {}
          );
          return i.redirectTo.startsWith('/')
            ? ZE(o)
            : this.applyRedirects.lineralizeSegments(i, o).pipe(
                lt(s => {
                  const a = new Ie(s, {});
                  return this.processSegment(n, t, a, s, r, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(n, t, i, r, o, s) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: c,
            positionalParamSegments: d,
          } = tg(t, r, o);
          if (!a) return fs(t);
          const u = this.applyRedirects.applyRedirectCommands(
            l,
            r.redirectTo,
            d
          );
          return r.redirectTo.startsWith('/')
            ? ZE(u)
            : this.applyRedirects
                .lineralizeSegments(r, u)
                .pipe(
                  lt(f => this.processSegment(n, i, t, f.concat(c), s, !1))
                );
        }
        matchSegmentAgainstRoute(n, t, i, r, o, s) {
          let a;
          if ('**' === i.path) {
            const l = r.length > 0 ? hE(r).parameters : {};
            (a = G({
              snapshot: new Ud(
                r,
                l,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                QE(i),
                Kn(i),
                i.component ?? i._loadedComponent ?? null,
                i,
                JE(i)
              ),
              consumedSegments: [],
              remainingSegments: [],
            })),
              (t.children = {});
          } else
            a = S$(t, i, r, n).pipe(
              ie(
                ({
                  matched: l,
                  consumedSegments: c,
                  remainingSegments: d,
                  parameters: u,
                }) =>
                  l
                    ? {
                        snapshot: new Ud(
                          c,
                          u,
                          Object.freeze({ ...this.urlTree.queryParams }),
                          this.urlTree.fragment,
                          QE(i),
                          Kn(i),
                          i.component ?? i._loadedComponent ?? null,
                          i,
                          JE(i)
                        ),
                        consumedSegments: c,
                        remainingSegments: d,
                      }
                    : null
              )
            );
          return a.pipe(
            Cn(l =>
              null === l
                ? fs(t)
                : this.getChildConfig((n = i._injector ?? n), i, r).pipe(
                    Cn(({ routes: c }) => {
                      const d = i._loadedInjector ?? n,
                        {
                          snapshot: u,
                          consumedSegments: f,
                          remainingSegments: h,
                        } = l,
                        { segmentGroup: p, slicedSegments: m } = YE(t, f, h, c);
                      if (0 === m.length && p.hasChildren())
                        return this.processChildren(d, c, p).pipe(
                          ie(y => (null === y ? null : [new Pi(u, y)]))
                        );
                      if (0 === c.length && 0 === m.length)
                        return G([new Pi(u, [])]);
                      const g = Kn(i) === o;
                      return this.processSegment(
                        d,
                        c,
                        p,
                        m,
                        g ? ne : o,
                        !0
                      ).pipe(ie(y => [new Pi(u, y)]));
                    })
                  )
            )
          );
        }
        getChildConfig(n, t, i) {
          return t.children
            ? G({ routes: t.children, injector: n })
            : t.loadChildren
            ? void 0 !== t._loadedRoutes
              ? G({ routes: t._loadedRoutes, injector: t._loadedInjector })
              : (function b$(e, n, t, i) {
                  const r = n.canLoad;
                  return void 0 === r || 0 === r.length
                    ? G(!0)
                    : G(
                        r.map(s => {
                          const a = ds(s, e);
                          return nr(
                            (function s$(e) {
                              return e && il(e.canLoad);
                            })(a)
                              ? a.canLoad(n, t)
                              : e.runInContext(() => a(n, t))
                          );
                        })
                      ).pipe(us(), WE());
                })(n, t, i).pipe(
                  lt(r =>
                    r
                      ? this.configLoader.loadChildren(n, t).pipe(
                          yt(o => {
                            (t._loadedRoutes = o.routes),
                              (t._loadedInjector = o.injector);
                          })
                        )
                      : (function C$(e) {
                          return Ua(HE(!1, 3));
                        })()
                  )
                )
            : G({ routes: [], injector: n });
        }
      }
      function k$(e) {
        const n = e.value.routeConfig;
        return n && '' === n.path;
      }
      function KE(e) {
        const n = [],
          t = new Set();
        for (const i of e) {
          if (!k$(i)) {
            n.push(i);
            continue;
          }
          const r = n.find(o => i.value.routeConfig === o.value.routeConfig);
          void 0 !== r ? (r.children.push(...i.children), t.add(r)) : n.push(i);
        }
        for (const i of t) {
          const r = KE(i.children);
          n.push(new Pi(i.value, r));
        }
        return n.filter(i => !t.has(i));
      }
      function QE(e) {
        return e.data || {};
      }
      function JE(e) {
        return e.resolve || {};
      }
      function L$(e, n) {
        return lt(t => {
          const {
            targetSnapshot: i,
            guards: { canActivateChecks: r },
          } = t;
          if (!r.length) return G(t);
          let o = 0;
          return ct(r).pipe(
            os(s =>
              (function V$(e, n, t, i) {
                const r = e.routeConfig,
                  o = e._resolve;
                return (
                  void 0 !== r?.title && !XE(r) && (o[za] = r.title),
                  (function B$(e, n, t, i) {
                    const r = (function j$(e) {
                      return [
                        ...Object.keys(e),
                        ...Object.getOwnPropertySymbols(e),
                      ];
                    })(e);
                    if (0 === r.length) return G({});
                    const o = {};
                    return ct(r).pipe(
                      lt(s =>
                        (function H$(e, n, t, i) {
                          const r = el(n) ?? i,
                            o = ds(e, r);
                          return nr(
                            o.resolve
                              ? o.resolve(n, t)
                              : r.runInContext(() => o(n, t))
                          );
                        })(e[s], n, t, i).pipe(
                          Or(),
                          yt(a => {
                            o[s] = a;
                          })
                        )
                      ),
                      Vm(1),
                      (function uE(e) {
                        return ie(() => e);
                      })(o),
                      Rr(s => (GE(s) ? wn : Ua(s)))
                    );
                  })(o, e, n, i).pipe(
                    ie(
                      s => (
                        (e._resolvedData = s),
                        (e.data = PE(e, t).resolve),
                        r && XE(r) && (e.data[za] = r.title),
                        null
                      )
                    )
                  )
                );
              })(s.route, i, e, n)
            ),
            yt(() => o++),
            Vm(1),
            lt(s => (o === r.length ? G(t) : wn))
          );
        });
      }
      function XE(e) {
        return 'string' == typeof e.title || null === e.title;
      }
      function ng(e) {
        return Cn(n => {
          const t = e(n);
          return t ? ct(t).pipe(ie(() => n)) : G(n);
        });
      }
      const hs = new T('ROUTES');
      let ig = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = I(I1));
          }
          loadComponent(t) {
            if (this.componentLoaders.get(t))
              return this.componentLoaders.get(t);
            if (t._loadedComponent) return G(t._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(t);
            const i = nr(t.loadComponent()).pipe(
                ie(eS),
                yt(o => {
                  this.onLoadEndListener && this.onLoadEndListener(t),
                    (t._loadedComponent = o);
                }),
                $a(() => {
                  this.componentLoaders.delete(t);
                })
              ),
              r = new cE(i, () => new Ne()).pipe(Pm());
            return this.componentLoaders.set(t, r), r;
          }
          loadChildren(t, i) {
            if (this.childrenLoaders.get(i)) return this.childrenLoaders.get(i);
            if (i._loadedRoutes)
              return G({
                routes: i._loadedRoutes,
                injector: i._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(i);
            const o = (function U$(e, n, t, i) {
                return nr(e.loadChildren()).pipe(
                  ie(eS),
                  lt(r =>
                    r instanceof Vw || Array.isArray(r)
                      ? G(r)
                      : ct(n.compileModuleAsync(r))
                  ),
                  ie(r => {
                    i && i(e);
                    let o,
                      s,
                      a = !1;
                    return (
                      Array.isArray(r)
                        ? ((s = r), !0)
                        : ((o = r.create(t).injector),
                          (s = o
                            .get(hs, [], { optional: !0, self: !0 })
                            .flat())),
                      { routes: s.map(Xm), injector: o }
                    );
                  })
                );
              })(i, this.compiler, t, this.onLoadEndListener).pipe(
                $a(() => {
                  this.childrenLoaders.delete(i);
                })
              ),
              s = new cE(o, () => new Ne()).pipe(Pm());
            return this.childrenLoaders.set(i, s), s;
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      function eS(e) {
        return (function $$(e) {
          return e && 'object' == typeof e && 'default' in e;
        })(e)
          ? e.default
          : e;
      }
      let Zd = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.currentTransition = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new Ne()),
              (this.transitionAbortSubject = new Ne()),
              (this.configLoader = I(ig)),
              (this.environmentInjector = I(Ut)),
              (this.urlSerializer = I(Wa)),
              (this.rootContexts = I(Ja)),
              (this.inputBindingEnabled = null !== I($d, { optional: !0 })),
              (this.navigationId = 0),
              (this.afterPreactivation = () => G(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = r =>
                this.events.next(new kU(r))),
              (this.configLoader.onLoadStartListener = r =>
                this.events.next(new FU(r)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(t) {
            const i = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...t, id: i });
          }
          setupNavigations(t, i, r) {
            return (
              (this.transitions = new Nt({
                id: 0,
                currentUrlTree: i,
                currentRawUrl: i,
                currentBrowserUrl: i,
                extractedUrl: t.urlHandlingStrategy.extract(i),
                urlAfterRedirects: t.urlHandlingStrategy.extract(i),
                rawUrl: i,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Ka,
                restoredState: null,
                currentSnapshot: r.snapshot,
                targetSnapshot: null,
                currentRouterState: r,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                it(o => 0 !== o.id),
                ie(o => ({
                  ...o,
                  extractedUrl: t.urlHandlingStrategy.extract(o.rawUrl),
                })),
                Cn(o => {
                  this.currentTransition = o;
                  let s = !1,
                    a = !1;
                  return G(o).pipe(
                    yt(l => {
                      this.currentNavigation = {
                        id: l.id,
                        initialUrl: l.rawUrl,
                        extractedUrl: l.extractedUrl,
                        trigger: l.source,
                        extras: l.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Cn(l => {
                      const c = l.currentBrowserUrl.toString(),
                        d =
                          !t.navigated ||
                          l.extractedUrl.toString() !== c ||
                          c !== l.currentUrlTree.toString();
                      if (
                        !d &&
                        'reload' !==
                          (l.extras.onSameUrlNavigation ??
                            t.onSameUrlNavigation)
                      ) {
                        const f = '';
                        return (
                          this.events.next(
                            new ls(
                              l.id,
                              this.urlSerializer.serialize(l.rawUrl),
                              f,
                              0
                            )
                          ),
                          l.resolve(null),
                          wn
                        );
                      }
                      if (t.urlHandlingStrategy.shouldProcessUrl(l.rawUrl))
                        return G(l).pipe(
                          Cn(f => {
                            const h = this.transitions?.getValue();
                            return (
                              this.events.next(
                                new jd(
                                  f.id,
                                  this.urlSerializer.serialize(f.extractedUrl),
                                  f.source,
                                  f.restoredState
                                )
                              ),
                              h !== this.transitions?.getValue()
                                ? wn
                                : Promise.resolve(f)
                            );
                          }),
                          (function P$(e, n, t, i, r, o) {
                            return lt(s =>
                              (function O$(e, n, t, i, r, o, s = 'emptyOnly') {
                                return new R$(e, n, t, i, r, s, o).recognize();
                              })(e, n, t, i, s.extractedUrl, r, o).pipe(
                                ie(({ state: a, tree: l }) => ({
                                  ...s,
                                  targetSnapshot: a,
                                  urlAfterRedirects: l,
                                }))
                              )
                            );
                          })(
                            this.environmentInjector,
                            this.configLoader,
                            this.rootComponentType,
                            t.config,
                            this.urlSerializer,
                            t.paramsInheritanceStrategy
                          ),
                          yt(f => {
                            (o.targetSnapshot = f.targetSnapshot),
                              (o.urlAfterRedirects = f.urlAfterRedirects),
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: f.urlAfterRedirects,
                              });
                            const h = new NE(
                              f.id,
                              this.urlSerializer.serialize(f.extractedUrl),
                              this.urlSerializer.serialize(f.urlAfterRedirects),
                              f.targetSnapshot
                            );
                            this.events.next(h);
                          })
                        );
                      if (
                        d &&
                        t.urlHandlingStrategy.shouldProcessUrl(l.currentRawUrl)
                      ) {
                        const {
                            id: f,
                            extractedUrl: h,
                            source: p,
                            restoredState: m,
                            extras: g,
                          } = l,
                          y = new jd(f, this.urlSerializer.serialize(h), p, m);
                        this.events.next(y);
                        const _ = kE(0, this.rootComponentType).snapshot;
                        return (
                          (this.currentTransition = o =
                            {
                              ...l,
                              targetSnapshot: _,
                              urlAfterRedirects: h,
                              extras: {
                                ...g,
                                skipLocationChange: !1,
                                replaceUrl: !1,
                              },
                            }),
                          G(o)
                        );
                      }
                      {
                        const f = '';
                        return (
                          this.events.next(
                            new ls(
                              l.id,
                              this.urlSerializer.serialize(l.extractedUrl),
                              f,
                              1
                            )
                          ),
                          l.resolve(null),
                          wn
                        );
                      }
                    }),
                    yt(l => {
                      const c = new AU(
                        l.id,
                        this.urlSerializer.serialize(l.extractedUrl),
                        this.urlSerializer.serialize(l.urlAfterRedirects),
                        l.targetSnapshot
                      );
                      this.events.next(c);
                    }),
                    ie(
                      l => (
                        (this.currentTransition = o =
                          {
                            ...l,
                            guards: t$(
                              l.targetSnapshot,
                              l.currentSnapshot,
                              this.rootContexts
                            ),
                          }),
                        o
                      )
                    ),
                    (function f$(e, n) {
                      return lt(t => {
                        const {
                          targetSnapshot: i,
                          currentSnapshot: r,
                          guards: {
                            canActivateChecks: o,
                            canDeactivateChecks: s,
                          },
                        } = t;
                        return 0 === s.length && 0 === o.length
                          ? G({ ...t, guardsResult: !0 })
                          : (function h$(e, n, t, i) {
                              return ct(e).pipe(
                                lt(r =>
                                  (function y$(e, n, t, i, r) {
                                    const o =
                                      n && n.routeConfig
                                        ? n.routeConfig.canDeactivate
                                        : null;
                                    return o && 0 !== o.length
                                      ? G(
                                          o.map(a => {
                                            const l = el(n) ?? r,
                                              c = ds(a, l);
                                            return nr(
                                              (function c$(e) {
                                                return e && il(e.canDeactivate);
                                              })(c)
                                                ? c.canDeactivate(e, n, t, i)
                                                : l.runInContext(() =>
                                                    c(e, n, t, i)
                                                  )
                                            ).pipe(Or());
                                          })
                                        ).pipe(us())
                                      : G(!0);
                                  })(r.component, r.route, t, n, i)
                                ),
                                Or(r => !0 !== r, !0)
                              );
                            })(s, i, r, e).pipe(
                              lt(a =>
                                a &&
                                (function o$(e) {
                                  return 'boolean' == typeof e;
                                })(a)
                                  ? (function p$(e, n, t, i) {
                                      return ct(n).pipe(
                                        os(r =>
                                          rs(
                                            (function g$(e, n) {
                                              return (
                                                null !== e && n && n(new PU(e)),
                                                G(!0)
                                              );
                                            })(r.route.parent, i),
                                            (function m$(e, n) {
                                              return (
                                                null !== e && n && n(new VU(e)),
                                                G(!0)
                                              );
                                            })(r.route, i),
                                            (function v$(e, n, t) {
                                              const i = n[n.length - 1],
                                                o = n
                                                  .slice(0, n.length - 1)
                                                  .reverse()
                                                  .map(s =>
                                                    (function n$(e) {
                                                      const n = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return n && 0 !== n.length
                                                        ? { node: e, guards: n }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter(s => null !== s)
                                                  .map(s =>
                                                    lE(() =>
                                                      G(
                                                        s.guards.map(l => {
                                                          const c =
                                                              el(s.node) ?? t,
                                                            d = ds(l, c);
                                                          return nr(
                                                            (function l$(e) {
                                                              return (
                                                                e &&
                                                                il(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(d)
                                                              ? d.canActivateChild(
                                                                  i,
                                                                  e
                                                                )
                                                              : c.runInContext(
                                                                  () => d(i, e)
                                                                )
                                                          ).pipe(Or());
                                                        })
                                                      ).pipe(us())
                                                    )
                                                  );
                                              return G(o).pipe(us());
                                            })(e, r.path, t),
                                            (function _$(e, n, t) {
                                              const i = n.routeConfig
                                                ? n.routeConfig.canActivate
                                                : null;
                                              if (!i || 0 === i.length)
                                                return G(!0);
                                              const r = i.map(o =>
                                                lE(() => {
                                                  const s = el(n) ?? t,
                                                    a = ds(o, s);
                                                  return nr(
                                                    (function a$(e) {
                                                      return (
                                                        e && il(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(n, e)
                                                      : s.runInContext(() =>
                                                          a(n, e)
                                                        )
                                                  ).pipe(Or());
                                                })
                                              );
                                              return G(r).pipe(us());
                                            })(e, r.route, t)
                                          )
                                        ),
                                        Or(r => !0 !== r, !0)
                                      );
                                    })(i, o, e, n)
                                  : G(a)
                              ),
                              ie(a => ({ ...t, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, l => this.events.next(l)),
                    yt(l => {
                      if (
                        ((o.guardsResult = l.guardsResult), kr(l.guardsResult))
                      )
                        throw jE(0, l.guardsResult);
                      const c = new NU(
                        l.id,
                        this.urlSerializer.serialize(l.extractedUrl),
                        this.urlSerializer.serialize(l.urlAfterRedirects),
                        l.targetSnapshot,
                        !!l.guardsResult
                      );
                      this.events.next(c);
                    }),
                    it(
                      l =>
                        !!l.guardsResult ||
                        (this.cancelNavigationTransition(l, '', 3), !1)
                    ),
                    ng(l => {
                      if (l.guards.canActivateChecks.length)
                        return G(l).pipe(
                          yt(c => {
                            const d = new OU(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              this.urlSerializer.serialize(c.urlAfterRedirects),
                              c.targetSnapshot
                            );
                            this.events.next(d);
                          }),
                          Cn(c => {
                            let d = !1;
                            return G(c).pipe(
                              L$(
                                t.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              yt({
                                next: () => (d = !0),
                                complete: () => {
                                  d ||
                                    this.cancelNavigationTransition(c, '', 2);
                                },
                              })
                            );
                          }),
                          yt(c => {
                            const d = new RU(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              this.urlSerializer.serialize(c.urlAfterRedirects),
                              c.targetSnapshot
                            );
                            this.events.next(d);
                          })
                        );
                    }),
                    ng(l => {
                      const c = d => {
                        const u = [];
                        d.routeConfig?.loadComponent &&
                          !d.routeConfig._loadedComponent &&
                          u.push(
                            this.configLoader.loadComponent(d.routeConfig).pipe(
                              yt(f => {
                                d.component = f;
                              }),
                              ie(() => {})
                            )
                          );
                        for (const f of d.children) u.push(...c(f));
                        return u;
                      };
                      return Nd(c(l.targetSnapshot.root)).pipe(Rd(), vt(1));
                    }),
                    ng(() => this.afterPreactivation()),
                    ie(l => {
                      const c = (function zU(e, n, t) {
                        const i = Xa(e, n._root, t ? t._root : void 0);
                        return new FE(i, n);
                      })(
                        t.routeReuseStrategy,
                        l.targetSnapshot,
                        l.currentRouterState
                      );
                      return (
                        (this.currentTransition = o =
                          { ...l, targetRouterState: c }),
                        o
                      );
                    }),
                    yt(() => {
                      this.events.next(new zm());
                    }),
                    ((e, n, t, i) =>
                      ie(
                        r => (
                          new e$(
                            n,
                            r.targetRouterState,
                            r.currentRouterState,
                            t,
                            i
                          ).activate(e),
                          r
                        )
                      ))(
                      this.rootContexts,
                      t.routeReuseStrategy,
                      l => this.events.next(l),
                      this.inputBindingEnabled
                    ),
                    vt(1),
                    yt({
                      next: l => {
                        (s = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          this.events.next(
                            new ki(
                              l.id,
                              this.urlSerializer.serialize(l.extractedUrl),
                              this.urlSerializer.serialize(l.urlAfterRedirects)
                            )
                          ),
                          t.titleStrategy?.updateTitle(
                            l.targetRouterState.snapshot
                          ),
                          l.resolve(!0);
                      },
                      complete: () => {
                        s = !0;
                      },
                    }),
                    We(
                      this.transitionAbortSubject.pipe(
                        yt(l => {
                          throw l;
                        })
                      )
                    ),
                    $a(() => {
                      s || a || this.cancelNavigationTransition(o, '', 1),
                        this.currentNavigation?.id === o.id &&
                          (this.currentNavigation = null);
                    }),
                    Rr(l => {
                      if (((a = !0), UE(l)))
                        this.events.next(
                          new Qa(
                            o.id,
                            this.urlSerializer.serialize(o.extractedUrl),
                            l.message,
                            l.cancellationCode
                          )
                        ),
                          (function qU(e) {
                            return UE(e) && kr(e.url);
                          })(l)
                            ? this.events.next(new Gm(l.url))
                            : o.resolve(!1);
                      else {
                        this.events.next(
                          new Hd(
                            o.id,
                            this.urlSerializer.serialize(o.extractedUrl),
                            l,
                            o.targetSnapshot ?? void 0
                          )
                        );
                        try {
                          o.resolve(t.errorHandler(l));
                        } catch (c) {
                          o.reject(c);
                        }
                      }
                      return wn;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(t, i, r) {
            const o = new Qa(
              t.id,
              this.urlSerializer.serialize(t.extractedUrl),
              i,
              r
            );
            this.events.next(o), t.resolve(!1);
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      function tS(e) {
        return e !== Ka;
      }
      let nS = (() => {
          class e {
            buildTitle(t) {
              let i,
                r = t.root;
              for (; void 0 !== r; )
                (i = this.getResolvedTitleForRoute(r) ?? i),
                  (r = r.children.find(o => o.outlet === ne));
              return i;
            }
            getResolvedTitleForRoute(t) {
              return t.data[za];
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: function () {
                return I(z$);
              },
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        z$ = (() => {
          class e extends nS {
            constructor(t) {
              super(), (this.title = t);
            }
            updateTitle(t) {
              const i = this.buildTitle(t);
              void 0 !== i && this.title.setTitle(i);
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(x(tE));
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        G$ = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: function () {
                return I(q$);
              },
              providedIn: 'root',
            }));
          }
          return e;
        })();
      class W$ {
        shouldDetach(n) {
          return !1;
        }
        store(n, t) {}
        shouldAttach(n) {
          return !1;
        }
        retrieve(n) {
          return null;
        }
        shouldReuseRoute(n, t) {
          return n.routeConfig === t.routeConfig;
        }
      }
      let q$ = (() => {
        class e extends W$ {
          static #e = (this.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = tt(e)))(r || e);
            };
          })());
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      const Yd = new T('', { providedIn: 'root', factory: () => ({}) });
      let Z$ = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: function () {
                return I(Y$);
              },
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        Y$ = (() => {
          class e {
            shouldProcessUrl(t) {
              return !0;
            }
            extract(t) {
              return t;
            }
            merge(t, i) {
              return t;
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })();
      var rl = (function (e) {
        return (
          (e[(e.COMPLETE = 0)] = 'COMPLETE'),
          (e[(e.FAILED = 1)] = 'FAILED'),
          (e[(e.REDIRECTING = 2)] = 'REDIRECTING'),
          e
        );
      })(rl || {});
      function iS(e, n) {
        e.events
          .pipe(
            it(
              t =>
                t instanceof ki ||
                t instanceof Qa ||
                t instanceof Hd ||
                t instanceof ls
            ),
            ie(t =>
              t instanceof ki || t instanceof ls
                ? rl.COMPLETE
                : t instanceof Qa && (0 === t.code || 1 === t.code)
                ? rl.REDIRECTING
                : rl.FAILED
            ),
            it(t => t !== rl.REDIRECTING),
            vt(1)
          )
          .subscribe(() => {
            n();
          });
      }
      function K$(e) {
        throw e;
      }
      function Q$(e, n, t) {
        return n.parse('/');
      }
      const J$ = {
          paths: 'exact',
          fragment: 'ignored',
          matrixParams: 'ignored',
          queryParams: 'exact',
        },
        X$ = {
          paths: 'subset',
          fragment: 'ignored',
          matrixParams: 'ignored',
          queryParams: 'subset',
        };
      let rn = (() => {
        class e {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            return 'computed' !== this.canceledNavigationResolution
              ? this.currentPageId
              : this.location.getState()?.ɵrouterPageId ?? this.currentPageId;
          }
          get events() {
            return this._events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = I(M1)),
              (this.isNgZoneEnabled = !1),
              (this._events = new Ne()),
              (this.options = I(Yd, { optional: !0 }) || {}),
              (this.pendingTasks = I(dd)),
              (this.errorHandler = this.options.errorHandler || K$),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || Q$),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = I(Z$)),
              (this.routeReuseStrategy = I(G$)),
              (this.titleStrategy = I(nS)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || 'ignore'),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || 'emptyOnly'),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || 'deferred'),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || 'replace'),
              (this.config = I(hs, { optional: !0 })?.flat() ?? []),
              (this.navigationTransitions = I(Zd)),
              (this.urlSerializer = I(Wa)),
              (this.location = I(lm)),
              (this.componentInputBindingEnabled = !!I($d, { optional: !0 })),
              (this.eventsSubscription = new Pt()),
              (this.isNgZoneEnabled =
                I(ae) instanceof ae && ae.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new as()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = kE(0, null)),
              this.navigationTransitions
                .setupNavigations(this, this.currentUrlTree, this.routerState)
                .subscribe(
                  t => {
                    (this.lastSuccessfulId = t.id),
                      (this.currentPageId = this.browserPageId);
                  },
                  t => {
                    this.console.warn(`Unhandled Navigation Error: ${t}`);
                  }
                ),
              this.subscribeToNavigationEvents();
          }
          subscribeToNavigationEvents() {
            const t = this.navigationTransitions.events.subscribe(i => {
              try {
                const { currentTransition: r } = this.navigationTransitions;
                if (null === r) return void (rS(i) && this._events.next(i));
                if (i instanceof jd)
                  tS(r.source) && (this.browserUrlTree = r.extractedUrl);
                else if (i instanceof ls) this.rawUrlTree = r.rawUrl;
                else if (i instanceof NE) {
                  if ('eager' === this.urlUpdateStrategy) {
                    if (!r.extras.skipLocationChange) {
                      const o = this.urlHandlingStrategy.merge(
                        r.urlAfterRedirects,
                        r.rawUrl
                      );
                      this.setBrowserUrl(o, r);
                    }
                    this.browserUrlTree = r.urlAfterRedirects;
                  }
                } else if (i instanceof zm)
                  (this.currentUrlTree = r.urlAfterRedirects),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                      r.urlAfterRedirects,
                      r.rawUrl
                    )),
                    (this.routerState = r.targetRouterState),
                    'deferred' === this.urlUpdateStrategy &&
                      (r.extras.skipLocationChange ||
                        this.setBrowserUrl(this.rawUrlTree, r),
                      (this.browserUrlTree = r.urlAfterRedirects));
                else if (i instanceof Qa)
                  0 !== i.code && 1 !== i.code && (this.navigated = !0),
                    (3 === i.code || 2 === i.code) && this.restoreHistory(r);
                else if (i instanceof Gm) {
                  const o = this.urlHandlingStrategy.merge(
                      i.url,
                      r.currentRawUrl
                    ),
                    s = {
                      skipLocationChange: r.extras.skipLocationChange,
                      replaceUrl:
                        'eager' === this.urlUpdateStrategy || tS(r.source),
                    };
                  this.scheduleNavigation(o, Ka, null, s, {
                    resolve: r.resolve,
                    reject: r.reject,
                    promise: r.promise,
                  });
                }
                i instanceof Hd && this.restoreHistory(r, !0),
                  i instanceof ki && (this.navigated = !0),
                  rS(i) && this._events.next(i);
              } catch (r) {
                this.navigationTransitions.transitionAbortSubject.next(r);
              }
            });
            this.eventsSubscription.add(t);
          }
          resetRootComponentType(t) {
            (this.routerState.root.component = t),
              (this.navigationTransitions.rootComponentType = t);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const t = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), Ka, t);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe(t => {
                const i = 'popstate' === t.type ? 'popstate' : 'hashchange';
                'popstate' === i &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(t.url, i, t.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(t, i, r) {
            const o = { replaceUrl: !0 },
              s = r?.navigationId ? r : null;
            if (r) {
              const l = { ...r };
              delete l.navigationId,
                delete l.ɵrouterPageId,
                0 !== Object.keys(l).length && (o.state = l);
            }
            const a = this.parseUrl(t);
            this.scheduleNavigation(a, i, s, o);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          get lastSuccessfulNavigation() {
            return this.navigationTransitions.lastSuccessfulNavigation;
          }
          resetConfig(t) {
            (this.config = t.map(Xm)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0),
              this.eventsSubscription.unsubscribe();
          }
          createUrlTree(t, i = {}) {
            const {
                relativeTo: r,
                queryParams: o,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: l,
              } = i,
              c = l ? this.currentUrlTree.fragment : s;
            let u,
              d = null;
            switch (a) {
              case 'merge':
                d = { ...this.currentUrlTree.queryParams, ...o };
                break;
              case 'preserve':
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = o || null;
            }
            null !== d && (d = this.removeEmptyProps(d));
            try {
              u = EE(r ? r.snapshot : this.routerState.snapshot.root);
            } catch {
              ('string' != typeof t[0] || !t[0].startsWith('/')) && (t = []),
                (u = this.currentUrlTree.root);
            }
            return SE(u, t, d, c ?? null);
          }
          navigateByUrl(t, i = { skipLocationChange: !1 }) {
            const r = kr(t) ? t : this.parseUrl(t),
              o = this.urlHandlingStrategy.merge(r, this.rawUrlTree);
            return this.scheduleNavigation(o, Ka, null, i);
          }
          navigate(t, i = { skipLocationChange: !1 }) {
            return (
              (function e3(e) {
                for (let n = 0; n < e.length; n++)
                  if (null == e[n]) throw new b(4008, !1);
              })(t),
              this.navigateByUrl(this.createUrlTree(t, i), i)
            );
          }
          serializeUrl(t) {
            return this.urlSerializer.serialize(t);
          }
          parseUrl(t) {
            let i;
            try {
              i = this.urlSerializer.parse(t);
            } catch (r) {
              i = this.malformedUriErrorHandler(r, this.urlSerializer, t);
            }
            return i;
          }
          isActive(t, i) {
            let r;
            if (((r = !0 === i ? { ...J$ } : !1 === i ? { ...X$ } : i), kr(t)))
              return mE(this.currentUrlTree, t, r);
            const o = this.parseUrl(t);
            return mE(this.currentUrlTree, o, r);
          }
          removeEmptyProps(t) {
            return Object.keys(t).reduce((i, r) => {
              const o = t[r];
              return null != o && (i[r] = o), i;
            }, {});
          }
          scheduleNavigation(t, i, r, o, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, l, c;
            s
              ? ((a = s.resolve), (l = s.reject), (c = s.promise))
              : (c = new Promise((u, f) => {
                  (a = u), (l = f);
                }));
            const d = this.pendingTasks.add();
            return (
              iS(this, () => {
                queueMicrotask(() => this.pendingTasks.remove(d));
              }),
              this.navigationTransitions.handleNavigationRequest({
                source: i,
                restoredState: r,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                currentBrowserUrl: this.browserUrlTree,
                rawUrl: t,
                extras: o,
                resolve: a,
                reject: l,
                promise: c,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              c.catch(u => Promise.reject(u))
            );
          }
          setBrowserUrl(t, i) {
            const r = this.urlSerializer.serialize(t);
            if (this.location.isCurrentPathEqualTo(r) || i.extras.replaceUrl) {
              const s = {
                ...i.extras.state,
                ...this.generateNgRouterState(i.id, this.browserPageId),
              };
              this.location.replaceState(r, '', s);
            } else {
              const o = {
                ...i.extras.state,
                ...this.generateNgRouterState(i.id, this.browserPageId + 1),
              };
              this.location.go(r, '', o);
            }
          }
          restoreHistory(t, i = !1) {
            if ('computed' === this.canceledNavigationResolution) {
              const o = this.currentPageId - this.browserPageId;
              0 !== o
                ? this.location.historyGo(o)
                : this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === o &&
                  (this.resetState(t),
                  (this.browserUrlTree = t.currentUrlTree),
                  this.resetUrlToCurrentUrlTree());
            } else
              'replace' === this.canceledNavigationResolution &&
                (i && this.resetState(t), this.resetUrlToCurrentUrlTree());
          }
          resetState(t) {
            (this.routerState = t.currentRouterState),
              (this.currentUrlTree = t.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                t.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              '',
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          generateNgRouterState(t, i) {
            return 'computed' === this.canceledNavigationResolution
              ? { navigationId: t, ɵrouterPageId: i }
              : { navigationId: t };
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      function rS(e) {
        return !(e instanceof zm || e instanceof Gm);
      }
      let ol = (() => {
          class e {
            constructor(t, i, r, o, s, a) {
              (this.router = t),
                (this.route = i),
                (this.tabIndexAttribute = r),
                (this.renderer = o),
                (this.el = s),
                (this.locationStrategy = a),
                (this.href = null),
                (this.commands = null),
                (this.onChanges = new Ne()),
                (this.preserveFragment = !1),
                (this.skipLocationChange = !1),
                (this.replaceUrl = !1);
              const l = s.nativeElement.tagName?.toLowerCase();
              (this.isAnchorElement = 'a' === l || 'area' === l),
                this.isAnchorElement
                  ? (this.subscription = t.events.subscribe(c => {
                      c instanceof ki && this.updateHref();
                    }))
                  : this.setTabIndexIfNotOnNativeEl('0');
            }
            setTabIndexIfNotOnNativeEl(t) {
              null != this.tabIndexAttribute ||
                this.isAnchorElement ||
                this.applyAttributeValue('tabindex', t);
            }
            ngOnChanges(t) {
              this.isAnchorElement && this.updateHref(),
                this.onChanges.next(this);
            }
            set routerLink(t) {
              null != t
                ? ((this.commands = Array.isArray(t) ? t : [t]),
                  this.setTabIndexIfNotOnNativeEl('0'))
                : ((this.commands = null),
                  this.setTabIndexIfNotOnNativeEl(null));
            }
            onClick(t, i, r, o, s) {
              return (
                !!(
                  null === this.urlTree ||
                  (this.isAnchorElement &&
                    (0 !== t ||
                      i ||
                      r ||
                      o ||
                      s ||
                      ('string' == typeof this.target &&
                        '_self' != this.target)))
                ) ||
                (this.router.navigateByUrl(this.urlTree, {
                  skipLocationChange: this.skipLocationChange,
                  replaceUrl: this.replaceUrl,
                  state: this.state,
                }),
                !this.isAnchorElement)
              );
            }
            ngOnDestroy() {
              this.subscription?.unsubscribe();
            }
            updateHref() {
              this.href =
                null !== this.urlTree && this.locationStrategy
                  ? this.locationStrategy?.prepareExternalUrl(
                      this.router.serializeUrl(this.urlTree)
                    )
                  : null;
              const t =
                null === this.href
                  ? null
                  : (function Bb(e, n, t) {
                      return (function ZR(e, n) {
                        return ('src' === n &&
                          ('embed' === e ||
                            'frame' === e ||
                            'iframe' === e ||
                            'media' === e ||
                            'script' === e)) ||
                          ('href' === n && ('base' === e || 'link' === e))
                          ? Vb
                          : sa;
                      })(
                        n,
                        t
                      )(e);
                    })(
                      this.href,
                      this.el.nativeElement.tagName.toLowerCase(),
                      'href'
                    );
              this.applyAttributeValue('href', t);
            }
            applyAttributeValue(t, i) {
              const r = this.renderer,
                o = this.el.nativeElement;
              null !== i ? r.setAttribute(o, t, i) : r.removeAttribute(o, t);
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(
                v(rn),
                v(Pr),
                (function br(e) {
                  return (function pO(e, n) {
                    if ('class' === n) return e.classes;
                    if ('style' === n) return e.styles;
                    const t = e.attrs;
                    if (t) {
                      const i = t.length;
                      let r = 0;
                      for (; r < i; ) {
                        const o = t[r];
                        if (Ov(o)) break;
                        if (0 === o) r += 2;
                        else if ('number' == typeof o)
                          for (r++; r < i && 'string' == typeof t[r]; ) r++;
                        else {
                          if (o === n) return t[r + 1];
                          r += 2;
                        }
                      }
                    }
                    return null;
                  })(Et(), e);
                })('tabindex'),
                v(hn),
                v(_e),
                v(Nr)
              );
            });
            static #t = (this.ɵdir = O({
              type: e,
              selectors: [['', 'routerLink', '']],
              hostVars: 1,
              hostBindings: function (i, r) {
                1 & i &&
                  X('click', function (s) {
                    return r.onClick(
                      s.button,
                      s.ctrlKey,
                      s.shiftKey,
                      s.altKey,
                      s.metaKey
                    );
                  }),
                  2 & i && ye('target', r.target);
              },
              inputs: {
                target: 'target',
                queryParams: 'queryParams',
                fragment: 'fragment',
                queryParamsHandling: 'queryParamsHandling',
                state: 'state',
                relativeTo: 'relativeTo',
                preserveFragment: ['preserveFragment', 'preserveFragment', ts],
                skipLocationChange: [
                  'skipLocationChange',
                  'skipLocationChange',
                  ts,
                ],
                replaceUrl: ['replaceUrl', 'replaceUrl', ts],
                routerLink: 'routerLink',
              },
              standalone: !0,
              features: [X0, Ct],
            }));
          }
          return e;
        })(),
        oS = (() => {
          class e {
            get isActive() {
              return this._isActive;
            }
            constructor(t, i, r, o, s) {
              (this.router = t),
                (this.element = i),
                (this.renderer = r),
                (this.cdr = o),
                (this.link = s),
                (this.classes = []),
                (this._isActive = !1),
                (this.routerLinkActiveOptions = { exact: !1 }),
                (this.isActiveChange = new H()),
                (this.routerEventsSubscription = t.events.subscribe(a => {
                  a instanceof ki && this.update();
                }));
            }
            ngAfterContentInit() {
              G(this.links.changes, G(null))
                .pipe(ro())
                .subscribe(t => {
                  this.update(), this.subscribeToEachLinkOnChanges();
                });
            }
            subscribeToEachLinkOnChanges() {
              this.linkInputChangesSubscription?.unsubscribe();
              const t = [...this.links.toArray(), this.link]
                .filter(i => !!i)
                .map(i => i.onChanges);
              this.linkInputChangesSubscription = ct(t)
                .pipe(ro())
                .subscribe(i => {
                  this._isActive !== this.isLinkActive(this.router)(i) &&
                    this.update();
                });
            }
            set routerLinkActive(t) {
              const i = Array.isArray(t) ? t : t.split(' ');
              this.classes = i.filter(r => !!r);
            }
            ngOnChanges(t) {
              this.update();
            }
            ngOnDestroy() {
              this.routerEventsSubscription.unsubscribe(),
                this.linkInputChangesSubscription?.unsubscribe();
            }
            update() {
              !this.links ||
                !this.router.navigated ||
                queueMicrotask(() => {
                  const t = this.hasActiveLinks();
                  this._isActive !== t &&
                    ((this._isActive = t),
                    this.cdr.markForCheck(),
                    this.classes.forEach(i => {
                      t
                        ? this.renderer.addClass(this.element.nativeElement, i)
                        : this.renderer.removeClass(
                            this.element.nativeElement,
                            i
                          );
                    }),
                    t && void 0 !== this.ariaCurrentWhenActive
                      ? this.renderer.setAttribute(
                          this.element.nativeElement,
                          'aria-current',
                          this.ariaCurrentWhenActive.toString()
                        )
                      : this.renderer.removeAttribute(
                          this.element.nativeElement,
                          'aria-current'
                        ),
                    this.isActiveChange.emit(t));
                });
            }
            isLinkActive(t) {
              const i = (function t3(e) {
                return !!e.paths;
              })(this.routerLinkActiveOptions)
                ? this.routerLinkActiveOptions
                : this.routerLinkActiveOptions.exact || !1;
              return r => !!r.urlTree && t.isActive(r.urlTree, i);
            }
            hasActiveLinks() {
              const t = this.isLinkActive(this.router);
              return (this.link && t(this.link)) || this.links.some(t);
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(v(rn), v(_e), v(hn), v(Wn), v(ol, 8));
            });
            static #t = (this.ɵdir = O({
              type: e,
              selectors: [['', 'routerLinkActive', '']],
              contentQueries: function (i, r, o) {
                if (
                  (1 & i &&
                    (function Ge(e, n, t, i) {
                      const r = he();
                      if (r.firstCreatePass) {
                        const o = Et();
                        d1(r, new a1(n, t, i), o.index),
                          (function ZL(e, n) {
                            const t =
                              e.contentQueries || (e.contentQueries = []);
                            n !== (t.length ? t[t.length - 1] : -1) &&
                              t.push(e.queries.length - 1, n);
                          })(r, e),
                          2 == (2 & t) && (r.staticContentQueries = !0);
                      }
                      c1(r, C(), t);
                    })(o, ol, 5),
                  2 & i)
                ) {
                  let s;
                  Te((s = Me())) && (r.links = s);
                }
              },
              inputs: {
                routerLinkActiveOptions: 'routerLinkActiveOptions',
                ariaCurrentWhenActive: 'ariaCurrentWhenActive',
                routerLinkActive: 'routerLinkActive',
              },
              outputs: { isActiveChange: 'isActiveChange' },
              exportAs: ['routerLinkActive'],
              standalone: !0,
              features: [Ct],
            }));
          }
          return e;
        })();
      class sS {}
      let n3 = (() => {
        class e {
          constructor(t, i, r, o, s) {
            (this.router = t),
              (this.injector = r),
              (this.preloadingStrategy = o),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                it(t => t instanceof ki),
                os(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(t, i) {
            const r = [];
            for (const o of i) {
              o.providers &&
                !o._injector &&
                (o._injector = Mp(o.providers, t, `Route: ${o.path}`));
              const s = o._injector ?? t,
                a = o._loadedInjector ?? s;
              ((o.loadChildren && !o._loadedRoutes && void 0 === o.canLoad) ||
                (o.loadComponent && !o._loadedComponent)) &&
                r.push(this.preloadConfig(s, o)),
                (o.children || o._loadedRoutes) &&
                  r.push(this.processRoutes(a, o.children ?? o._loadedRoutes));
            }
            return ct(r).pipe(ro());
          }
          preloadConfig(t, i) {
            return this.preloadingStrategy.preload(i, () => {
              let r;
              r =
                i.loadChildren && void 0 === i.canLoad
                  ? this.loader.loadChildren(t, i)
                  : G(null);
              const o = r.pipe(
                lt(s =>
                  null === s
                    ? G(void 0)
                    : ((i._loadedRoutes = s.routes),
                      (i._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? t, s.routes))
                )
              );
              return i.loadComponent && !i._loadedComponent
                ? ct([o, this.loader.loadComponent(i)]).pipe(ro())
                : o;
            });
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(rn), x(I1), x(Ut), x(sS), x(ig));
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      const rg = new T('');
      let aS = (() => {
        class e {
          constructor(t, i, r, o, s = {}) {
            (this.urlSerializer = t),
              (this.transitions = i),
              (this.viewportScroller = r),
              (this.zone = o),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = 'imperative'),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || 'disabled'),
              (s.anchorScrolling = s.anchorScrolling || 'disabled');
          }
          init() {
            'disabled' !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration('manual'),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe(t => {
              t instanceof jd
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = t.navigationTrigger),
                  (this.restoredId = t.restoredState
                    ? t.restoredState.navigationId
                    : 0))
                : t instanceof ki
                ? ((this.lastId = t.id),
                  this.scheduleScrollEvent(
                    t,
                    this.urlSerializer.parse(t.urlAfterRedirects).fragment
                  ))
                : t instanceof ls &&
                  0 === t.code &&
                  ((this.lastSource = void 0),
                  (this.restoredId = 0),
                  this.scheduleScrollEvent(
                    t,
                    this.urlSerializer.parse(t.url).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe(t => {
              t instanceof OE &&
                (t.position
                  ? 'top' === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : 'enabled' === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(t.position)
                  : t.anchor && 'enabled' === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(t.anchor)
                  : 'disabled' !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(t, i) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new OE(
                      t,
                      'popstate' === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      i
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
          static #e = (this.ɵfac = function (i) {
            !(function x0() {
              throw new Error('invalid');
            })();
          });
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function Li(e, n) {
        return { ɵkind: e, ɵproviders: n };
      }
      function cS() {
        const e = I(St);
        return n => {
          const t = e.get(Ni);
          if (n !== t.components[0]) return;
          const i = e.get(rn),
            r = e.get(dS);
          1 === e.get(og) && i.initialNavigation(),
            e.get(uS, null, ce.Optional)?.setUpPreloading(),
            e.get(rg, null, ce.Optional)?.init(),
            i.resetRootComponentType(t.componentTypes[0]),
            r.closed || (r.next(), r.complete(), r.unsubscribe());
        };
      }
      const dS = new T('', { factory: () => new Ne() }),
        og = new T('', { providedIn: 'root', factory: () => 1 }),
        uS = new T('');
      function a3(e) {
        return Li(0, [
          { provide: uS, useExisting: n3 },
          { provide: sS, useExisting: e },
        ]);
      }
      const fS = new T('ROUTER_FORROOT_GUARD'),
        c3 = [
          lm,
          { provide: Wa, useClass: Bm },
          rn,
          Ja,
          {
            provide: Pr,
            useFactory: function lS(e) {
              return e.routerState.root;
            },
            deps: [rn],
          },
          ig,
          [],
        ];
      function d3() {
        return new P1('Router', rn);
      }
      let hS = (() => {
        class e {
          constructor(t) {}
          static forRoot(t, i) {
            return {
              ngModule: e,
              providers: [
                c3,
                [],
                { provide: hs, multi: !0, useValue: t },
                {
                  provide: fS,
                  useFactory: p3,
                  deps: [[rn, new fc(), new hc()]],
                },
                { provide: Yd, useValue: i || {} },
                i?.useHash
                  ? { provide: Nr, useClass: MB }
                  : { provide: Nr, useClass: fC },
                {
                  provide: rg,
                  useFactory: () => {
                    const e = I(PC),
                      n = I(ae),
                      t = I(Yd),
                      i = I(Zd),
                      r = I(Wa);
                    return (
                      t.scrollOffset && e.setOffset(t.scrollOffset),
                      new aS(r, i, e, n, t)
                    );
                  },
                },
                i?.preloadingStrategy
                  ? a3(i.preloadingStrategy).ɵproviders
                  : [],
                { provide: P1, multi: !0, useFactory: d3 },
                i?.initialNavigation ? m3(i) : [],
                i?.bindToComponentInputs
                  ? Li(8, [BE, { provide: $d, useExisting: BE }]).ɵproviders
                  : [],
                [
                  { provide: pS, useFactory: cS },
                  { provide: Qp, multi: !0, useExisting: pS },
                ],
              ],
            };
          }
          static forChild(t) {
            return {
              ngModule: e,
              providers: [{ provide: hs, multi: !0, useValue: t }],
            };
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(fS, 8));
          });
          static #t = (this.ɵmod = se({ type: e }));
          static #n = (this.ɵinj = oe({}));
        }
        return e;
      })();
      function p3(e) {
        return 'guarded';
      }
      function m3(e) {
        return [
          'disabled' === e.initialNavigation
            ? Li(3, [
                {
                  provide: $p,
                  multi: !0,
                  useFactory: () => {
                    const n = I(rn);
                    return () => {
                      n.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: og, useValue: 2 },
              ]).ɵproviders
            : [],
          'enabledBlocking' === e.initialNavigation
            ? Li(2, [
                { provide: og, useValue: 0 },
                {
                  provide: $p,
                  multi: !0,
                  deps: [St],
                  useFactory: n => {
                    const t = n.get(xB, Promise.resolve());
                    return () =>
                      t.then(
                        () =>
                          new Promise(i => {
                            const r = n.get(rn),
                              o = n.get(dS);
                            iS(r, () => {
                              i(!0);
                            }),
                              (n.get(Zd).afterPreactivation = () => (
                                i(!0), o.closed ? G(void 0) : o
                              )),
                              r.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const pS = new T('');
      let _3 = (() => {
        class e {
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵcmp = Je({
            type: e,
            selectors: [['app-contact']],
            decls: 26,
            vars: 0,
            consts: [
              [1, 'container'],
              [1, 'row'],
              [1, 'col-12'],
              [1, 'col-12', 'col-md-6'],
              [1, 'map-container'],
              [
                'allowfullscreen',
                '',
                'loading',
                'lazy',
                'referrerpolicy',
                'no-referrer-when-downgrade',
                'src',
                'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.7347272807838!2d49.83631237758552!3d40.37040597144722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307db1247f14b3%3A0xb0d615034ca66c7e!2s10%20Haji%20Zeynalabdin%20Taghiyev%20St%2C%20Baku%201005%2C%20Azerbaijan!5e0!3m2!1sen!2sgr!4v1698851314503!5m2!1sen!2sgr',
                1,
                'responsive-iframe',
                2,
                'border',
                '0',
              ],
              ['href', 'tel:1234567890'],
              ['href', 'mailto:info@example.com'],
              ['href', 'https://www.instagram.com/mate.baku/'],
              [
                'alt',
                'Instagram',
                'height',
                '24',
                'src',
                'assets/images/icons/Instagram_Glyph_Gradient.svg',
                'width',
                '24',
              ],
            ],
            template: function (i, r) {
              1 & i &&
                (E(0, 'div', 0)(1, 'div', 1)(2, 'div', 2)(3, 'h1'),
                $(4, 'Contact Us'),
                S()()(),
                E(5, 'div', 1)(6, 'div', 3)(7, 'h2'),
                $(8, 'Our Location'),
                S(),
                E(9, 'div', 4),
                Be(10, 'iframe', 5),
                S()(),
                E(11, 'div', 3)(12, 'h2'),
                $(13, 'Get in Touch'),
                S(),
                E(14, 'p'),
                $(15, 'Phone: '),
                E(16, 'a', 6),
                $(17, '123-456-7890'),
                S()(),
                E(18, 'p'),
                $(19, 'Email: '),
                E(20, 'a', 7),
                $(21, 'info@example.com'),
                S()(),
                E(22, 'h3'),
                $(23, 'Follow Us'),
                S(),
                E(24, 'a', 8),
                Be(25, 'img', 9),
                S()()()());
            },
            styles: [
              '.map-container[_ngcontent-%COMP%]{position:relative;overflow:hidden;padding-top:56.25%}.responsive-iframe[_ngcontent-%COMP%]{position:absolute;inset:0;width:100%;height:100%;border:none}body[_ngcontent-%COMP%], html[_ngcontent-%COMP%], .container[_ngcontent-%COMP%], .row[_ngcontent-%COMP%]{padding:0;margin:0}',
            ],
          }));
        }
        return e;
      })();
      const v3 = [
          {
            name: 'Miso soup',
            price: 7.4,
            ingredients: [
              { name: 'Miso Baza' },
              { name: 'wakame' },
              { name: 'tofu' },
              { name: 'sesame(\u043a\u0443\u043d\u0436\u0443\u0442)' },
              { name: 'Green Onion' },
            ],
            imageUrl: 'assets/images/dishes/DALL\xb7E Miso Soup.png',
            category: 'Soup',
          },
          {
            name: 'Tom Yum',
            price: 15,
            ingredients: [
              { name: 'Tom Yum baza' },
              { name: 'Mushrooms' },
              { name: 'Shitaki' },
              { name: 'Shrimps' },
              { name: 'Seafood' },
              { name: 'Green Onion' },
            ],
            imageUrl: 'assets/images/dishes/DALL\xb7E Tom Yum Soup.png',
            category: 'Soup',
          },
          {
            name: 'Udon Soup',
            price: 11,
            ingredients: [
              { name: 'Udon baza' },
              { name: 'Shrimps' },
              { name: 'Bell Pepper' },
              { name: 'Mushroom' },
              { name: 'Green Onion' },
              { name: 'Udon Baza' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Soup',
          },
          {
            name: 'Miso salmon',
            price: 14,
            ingredients: [
              { name: 'Salmon' },
              { name: 'Miso Baza' },
              { name: 'wakame' },
              { name: 'Tofu' },
              { name: 'Sesame' },
              { name: 'Green Onion' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Soup',
          },
          {
            name: 'Spice soup',
            price: 9.2,
            ingredients: [
              { name: 'Spice soup baza' },
              { name: 'Mushrooms' },
              { name: 'Shitaki' },
              { name: 'Chicken' },
              { name: 'Starch' },
              { name: 'Egg' },
              { name: 'Green Onion' },
              { name: 'Baby Corn' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Soup',
          },
        ],
        y3 = [
          {
            name: 'Japan Sarada',
            price: 15,
            ingredients: [
              { name: 'red cabbage' },
              { name: 'Avocado' },
              { name: 'Orange' },
              { name: 'Chicken' },
              { name: 'Sweet Chilly' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Sarada',
          },
          {
            name: 'Kappa Sarada',
            price: 9,
            ingredients: [
              { name: 'Cucumber' },
              { name: 'Keshyu' },
              { name: 'Sesame' },
              { name: 'Cucumber sarada' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Sarada',
          },
          {
            name: 'Crab Sarada',
            price: 11,
            ingredients: [
              { name: 'Surimi' },
              { name: 'american garden' },
              { name: 'Cucumber' },
              { name: 'Cabbage' },
              { name: 'Red Cabbage' },
              { name: 'Carrot' },
              { name: 'lettuce' },
              { name: 'Red lettuce' },
              { name: 'Tobiko' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Sarada',
          },
          {
            name: 'Green Harmony sarada',
            price: 7,
            ingredients: [
              { name: 'Cucumber' },
              { name: 'Cabbage' },
              { name: 'Red Cabbage' },
              { name: 'Carrot' },
              { name: 'Lettuce' },
              { name: 'Lettuce red' },
              { name: 'Sarada Sauce' },
              { name: 'tomato' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Sarada',
          },
          {
            name: 'Smoked Salmon sarada',
            price: 17,
            ingredients: [
              { name: 'Smoked Salmon' },
              { name: 'Iceberg' },
              { name: 'Cherry' },
              { name: 'Honey mustard sauce' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Sarada',
          },
          {
            name: 'Chuka sarada',
            price: 8,
            ingredients: [
              { name: 'Chuka' },
              { name: 'Kaiso Sauce' },
              { name: 'Sesame' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Sarada',
          },
          {
            name: 'CHICKEN CRISPY SARADA',
            price: 13,
            ingredients: [
              { name: 'Chicken' },
              { name: 'Cucumber' },
              { name: 'Cabbage' },
              { name: 'Red Cabbage' },
              { name: 'Carrot' },
              { name: 'lettuce' },
              { name: 'lettuce red' },
              { name: 'Sarada Sauce' },
              { name: 'tomat' },
              { name: 'Shitaki' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Sarada',
          },
          {
            name: 'Sea oasis salad',
            price: 16,
            ingredients: [
              { name: 'Seafood' },
              { name: 'Shrimps' },
              { name: 'Cucumber' },
              { name: 'Cabbage' },
              { name: 'Red Cabbage' },
              { name: 'Carrot' },
              { name: 'lettuce' },
              { name: 'lettuce red' },
              { name: 'Sarada Sauce' },
              { name: 'Cherry' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Sarada',
          },
        ],
        b3 = [
          {
            name: 'Crispy Eggplant',
            price: 7,
            ingredients: [
              { name: 'Starch' },
              { name: 'eggplant' },
              { name: 'Sauce' },
              { name: 'tomatoes' },
              { name: 'Green Onion' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Starter',
          },
          {
            name: 'Edamame classic',
            price: 7,
            ingredients: [{ name: 'Edamame' }, { name: 'Salt' }],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Starter',
          },
          {
            name: 'Edamame spicy',
            price: 8,
            ingredients: [
              { name: 'Edamame' },
              { name: 'Salt' },
              { name: 'Kimchi sauce' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Starter',
          },
          {
            name: 'Calamari tempura',
            price: 11,
            ingredients: [
              { name: 'Calamari' },
              { name: 'Tempura' },
              { name: 'Panko' },
              { name: 'Sweet chilly' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Starter',
          },
          {
            name: 'Ebi Tempura',
            price: 13,
            ingredients: [
              { name: 'Shrimps' },
              { name: 'Tempura' },
              { name: 'Panko' },
              { name: 'Sweet chilly' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Starter',
          },
          {
            name: 'Shrimps popcorn',
            price: 13.5,
            ingredients: [
              { name: 'Dynamic Sauce' },
              { name: 'Shrimps' },
              { name: 'Tempura' },
              { name: 'Starch' },
              { name: 'Green Onion' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Starter',
          },
          {
            name: 'Avocado Tempura',
            price: 9,
            ingredients: [
              { name: 'Avocado' },
              { name: 'Tempura' },
              { name: 'Panko' },
              { name: 'Sweet Chilly' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Starter',
          },
          {
            name: 'Gyoza chicken (6 pc)',
            price: 11,
            ingredients: [
              { name: 'gyoza testo' },
              { name: 'chicken' },
              { name: 'tataki sauce' },
              { name: 'Green Onion' },
              { name: 'Sesame' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Starter',
          },
          {
            name: 'Gyoza seafood (6 pc)',
            price: 12,
            ingredients: [],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Starter',
          },
        ],
        D3 = [
          {
            name: 'Chicken Noodle',
            price: 15,
            ingredients: [
              { name: 'Chicken' },
              { name: 'Cabbage' },
              { name: 'Red Cabbage' },
              { name: 'Carrot' },
              { name: 'Noodle' },
              { name: 'Sauce' },
              { name: 'Green Onion' },
              { name: 'Sesame' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Noodles',
          },
          {
            name: 'Seafood noodle',
            price: 16,
            ingredients: [
              { name: 'Shrimps' },
              { name: 'Seafood' },
              { name: 'Cabbage' },
              { name: 'Red Cabbage' },
              { name: 'Carrot' },
              { name: 'Noodle' },
              { name: 'Sauce' },
              { name: 'Green Onion' },
              { name: 'Sesame' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Noodles',
          },
          {
            name: 'Chicken Don Noodle',
            price: 14,
            ingredients: [
              { name: 'Chicken' },
              { name: 'Tai tai' },
              { name: 'Egg' },
              { name: 'Bell Pepper' },
              { name: 'Keshyu' },
              { name: 'Don Sauce' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Noodles',
          },
          {
            name: 'Shrimps Don Noodle',
            price: 15,
            ingredients: [
              { name: 'Shrimps' },
              { name: 'Tai tai' },
              { name: 'Egg' },
              { name: 'Bell Pepper' },
              { name: 'Keshyu' },
              { name: 'Don Sauce' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Noodles',
          },
          {
            name: 'Vegetable Noodle',
            price: 12,
            ingredients: [
              { name: 'Cabbage' },
              { name: 'Red Cabbage' },
              { name: 'Carrot' },
              { name: 'Noodle' },
              { name: 'Sauce' },
              { name: 'Green Onion' },
              { name: 'Sesame' },
            ],
            imageUrl: 'assets/images/icons/mate_logo.png',
            category: 'Noodles',
          },
        ];
      class mS {}
      class C3 {}
      const Vi = '*';
      function sg(e, n) {
        return { type: 7, name: e, definitions: n, options: {} };
      }
      function ag(e, n = null) {
        return { type: 4, styles: n, timings: e };
      }
      function gS(e, n = null) {
        return { type: 2, steps: e, options: n };
      }
      function ir(e) {
        return { type: 6, styles: e, offset: null };
      }
      function lg(e, n, t) {
        return { type: 0, name: e, styles: n, options: t };
      }
      function cg(e, n, t = null) {
        return { type: 1, expr: e, animation: n, options: t };
      }
      class sl {
        constructor(n = 0, t = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = n + t);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach(n => n()),
            (this._onDoneFns = []));
        }
        onStart(n) {
          this._originalOnStartFns.push(n), this._onStartFns.push(n);
        }
        onDone(n) {
          this._originalOnDoneFns.push(n), this._onDoneFns.push(n);
        }
        onDestroy(n) {
          this._onDestroyFns.push(n);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          queueMicrotask(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach(n => n()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach(n => n()),
            (this._onDestroyFns = []));
        }
        reset() {
          (this._started = !1),
            (this._finished = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        setPosition(n) {
          this._position = this.totalTime ? n * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(n) {
          const t = 'start' == n ? this._onStartFns : this._onDoneFns;
          t.forEach(i => i()), (t.length = 0);
        }
      }
      class _S {
        constructor(n) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = n);
          let t = 0,
            i = 0,
            r = 0;
          const o = this.players.length;
          0 == o
            ? queueMicrotask(() => this._onFinish())
            : this.players.forEach(s => {
                s.onDone(() => {
                  ++t == o && this._onFinish();
                }),
                  s.onDestroy(() => {
                    ++i == o && this._onDestroy();
                  }),
                  s.onStart(() => {
                    ++r == o && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (s, a) => Math.max(s, a.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach(n => n()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach(n => n.init());
        }
        onStart(n) {
          this._onStartFns.push(n);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach(n => n()),
            (this._onStartFns = []));
        }
        onDone(n) {
          this._onDoneFns.push(n);
        }
        onDestroy(n) {
          this._onDestroyFns.push(n);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach(n => n.play());
        }
        pause() {
          this.players.forEach(n => n.pause());
        }
        restart() {
          this.players.forEach(n => n.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach(n => n.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach(n => n.destroy()),
            this._onDestroyFns.forEach(n => n()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach(n => n.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(n) {
          const t = n * this.totalTime;
          this.players.forEach(i => {
            const r = i.totalTime ? Math.min(1, t / i.totalTime) : 1;
            i.setPosition(r);
          });
        }
        getPosition() {
          const n = this.players.reduce(
            (t, i) => (null === t || i.totalTime > t.totalTime ? i : t),
            null
          );
          return null != n ? n.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach(n => {
            n.beforeDestroy && n.beforeDestroy();
          });
        }
        triggerCallback(n) {
          const t = 'start' == n ? this._onStartFns : this._onDoneFns;
          t.forEach(i => i()), (t.length = 0);
        }
      }
      let ug = (() => {
        class e {
          constructor() {
            this.itemsSubject = new Nt([]);
          }
          get items$() {
            return this.itemsSubject.asObservable();
          }
          get order$() {
            return this.items$.pipe(
              ie(t => {
                const i = t.reduce((r, o) => r + o.dish.price * o.quantity, 0);
                return { items: t, total: i };
              })
            );
          }
          addItem(t) {
            const i = this.itemsSubject.getValue(),
              r = i.find(o => o.dish.name === t.name);
            r ? r.quantity++ : i.push({ dish: t, quantity: 1 }),
              this.itemsSubject.next(i);
          }
          removeItem(t) {
            const i = this.itemsSubject.getValue(),
              r = i.find(o => o.dish.name === t.name);
            if (r && r.quantity > 0 && (r.quantity--, 0 === r.quantity)) {
              const o = i.indexOf(r);
              i.splice(o, 1);
            }
            this.itemsSubject.next(i);
          }
          hasItems() {
            return this.itemsSubject.getValue().length > 0;
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      function E3(e, n) {
        if ((1 & e && (E(0, 'li'), $(1), S()), 2 & e)) {
          const t = n.$implicit;
          M(1), Xt(t.name);
        }
      }
      function S3(e, n) {
        if (1 & e) {
          const t = $t();
          E(0, 'button', 9),
            X('click', function () {
              return mt(t), gt(B().increaseOrder());
            }),
            $(1, 'Add to Order '),
            S();
        }
      }
      function x3(e, n) {
        if (1 & e) {
          const t = $t();
          E(0, 'div', 10)(1, 'button', 11),
            X('click', function () {
              return mt(t), gt(B().decreaseOrder());
            }),
            $(2, '-'),
            S(),
            E(3, 'span', 12),
            $(4),
            S(),
            E(5, 'button', 9),
            X('click', function () {
              return mt(t), gt(B().increaseOrder());
            }),
            $(6, '+'),
            S()();
        }
        if (2 & e) {
          const t = B();
          M(4), Xt(t.itemCount);
        }
      }
      let T3 = (() => {
        class e {
          constructor(t) {
            (this.basketService = t), (this.itemCount = 0);
          }
          ngOnInit() {
            this.subscription = this.basketService.items$.subscribe(t => {
              const i = t.find(r => r.dish.name === this.item.name);
              this.itemCount = i ? i.quantity : 0;
            });
          }
          ngOnDestroy() {
            this.subscription.unsubscribe();
          }
          increaseOrder() {
            this.basketService.addItem(this.item);
          }
          decreaseOrder() {
            this.basketService.removeItem(this.item);
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(v(ug));
          });
          static #t = (this.ɵcmp = Je({
            type: e,
            selectors: [['app-menu-item']],
            inputs: { item: 'item' },
            decls: 12,
            vars: 7,
            consts: [
              [1, 'card', 'custom-card'],
              [1, 'card-body'],
              [1, 'card-img-top', 'custom-card-img', 3, 'src', 'alt'],
              [1, 'card-title'],
              [1, 'card-subtitle', 'mb-2', 'text-muted'],
              [1, 'card-text'],
              [4, 'ngFor', 'ngForOf'],
              ['class', 'btn btn-primary btn-small', 3, 'click', 4, 'ngIf'],
              ['class', 'order-count', 4, 'ngIf'],
              [1, 'btn', 'btn-primary', 'btn-small', 3, 'click'],
              [1, 'order-count'],
              [
                1,
                'btn',
                'btn-primary',
                'btn-small',
                'margin-right',
                3,
                'click',
              ],
              [1, 'margin-right', 'number-display'],
            ],
            template: function (i, r) {
              1 & i &&
                (E(0, 'div', 0)(1, 'div', 1),
                Be(2, 'img', 2),
                E(3, 'h5', 3),
                $(4),
                S(),
                E(5, 'h6', 4),
                $(6),
                S(),
                Be(7, 'p', 5),
                E(8, 'ul'),
                L(9, E3, 2, 1, 'li', 6),
                S(),
                L(10, S3, 2, 0, 'button', 7),
                L(11, x3, 7, 1, 'div', 8),
                S()()),
                2 & i &&
                  (M(2),
                  wa('alt', r.item.name),
                  R('src', r.item.imageUrl, sa),
                  M(2),
                  Xt(r.item.name),
                  M(2),
                  en('\u20bc', r.item.price, ''),
                  M(3),
                  R('ngForOf', r.item.ingredients),
                  M(1),
                  R('ngIf', 0 === r.itemCount),
                  M(1),
                  R('ngIf', r.itemCount > 0));
            },
            dependencies: [Pn, Zn],
            styles: [
              '.btn-small[_ngcontent-%COMP%]{font-size:.8em;background-color:#5d681c;color:#fff}.margin-right[_ngcontent-%COMP%]{margin-right:10px}.order-count[_ngcontent-%COMP%]{display:flex;align-items:center}.number-display[_ngcontent-%COMP%]{width:20px;text-align:center}.custom-card-img[_ngcontent-%COMP%]{border-radius:20px;margin-bottom:20px}.custom-card[_ngcontent-%COMP%]{width:100%;border-radius:20px}',
            ],
          }));
        }
        return e;
      })();
      function M3(e, n) {
        if (
          (1 & e && (E(0, 'div', 8), Be(1, 'app-menu-item', 9), S()), 2 & e)
        ) {
          const t = n.$implicit;
          M(1), R('item', t);
        }
      }
      function I3(e, n) {
        if (
          (1 & e &&
            (E(0, 'div')(1, 'div', 0)(2, 'div', 6),
            L(3, M3, 2, 1, 'div', 7),
            S()()()),
          2 & e)
        ) {
          const t = B().$implicit,
            i = B();
          R('@slideUpDown', void 0),
            M(3),
            R('ngForOf', i.getItemsByCategory(t));
        }
      }
      function A3(e, n) {
        if (1 & e) {
          const t = $t();
          E(0, 'div', 3)(1, 'h2', 4),
            X('click', function () {
              const o = mt(t).$implicit;
              return gt(B().toggleCategory(o));
            }),
            $(2),
            S(),
            L(3, I3, 4, 2, 'div', 5),
            S();
        }
        if (2 & e) {
          const t = n.$implicit,
            i = B();
          M(2), en(' ', t, ' '), M(1), R('ngIf', i.isCategoryOpen(t));
        }
      }
      function N3(e, n) {
        1 & e &&
          (E(0, 'button', 10),
          $(1, ' \u041a\u043e\u0440\u0437\u0438\u043d\u0430\n'),
          S());
      }
      let O3 = (() => {
        class e {
          constructor(t) {
            (this.basketService = t),
              (this.openCategories = new Set()),
              (this.menuItems = (function w3() {
                return [...v3, ...y3, ...b3, ...D3];
              })()),
              (this.categories = [
                ...new Set(this.menuItems.map(i => i.category)),
              ]);
          }
          getItemsByCategory(t) {
            return this.menuItems.filter(i => i.category === t);
          }
          toggleCategory(t) {
            this.openCategories.has(t)
              ? this.openCategories.delete(t)
              : this.openCategories.add(t);
          }
          isCategoryOpen(t) {
            return this.openCategories.has(t);
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(v(ug));
          });
          static #t = (this.ɵcmp = Je({
            type: e,
            selectors: [['app-menu-list']],
            decls: 3,
            vars: 2,
            consts: [
              [1, 'container'],
              ['class', 'custom-padding', 4, 'ngFor', 'ngForOf'],
              [
                'class',
                'btn btn-primary checkout-button',
                'routerLink',
                '/checkout',
                4,
                'ngIf',
              ],
              [1, 'custom-padding'],
              [1, 'btn', 'btn-primary', 3, 'click'],
              [4, 'ngIf'],
              [1, 'row'],
              ['class', 'col-md-4 custom-padding', 4, 'ngFor', 'ngForOf'],
              [1, 'col-md-4', 'custom-padding'],
              [3, 'item'],
              [
                'routerLink',
                '/checkout',
                1,
                'btn',
                'btn-primary',
                'checkout-button',
              ],
            ],
            template: function (i, r) {
              1 & i &&
                (E(0, 'div', 0),
                L(1, A3, 4, 2, 'div', 1),
                S(),
                L(2, N3, 2, 0, 'button', 2)),
                2 & i &&
                  (M(1),
                  R('ngForOf', r.categories),
                  M(1),
                  R('ngIf', r.basketService.hasItems()));
            },
            dependencies: [Pn, Zn, ol, T3],
            styles: [
              '.custom-padding[_ngcontent-%COMP%]{padding:10px 5px}.btn-primary[_ngcontent-%COMP%]{background-color:#5d681c;border-color:#5d681c}.checkout-button[_ngcontent-%COMP%]{position:fixed;bottom:20px;right:20px;z-index:1000;width:auto;background-color:#5d681c;padding:10px 20px}.checkout-button[_ngcontent-%COMP%]:focus{outline:none}@media (max-width: 768px){.checkout-button[_ngcontent-%COMP%]{width:100%;bottom:0;right:0;padding:10px 20px}}@media (min-width: 769px){.checkout-button[_ngcontent-%COMP%]{padding:15px 30px}}',
            ],
            data: {
              animation: [
                sg('slideUpDown', [
                  lg(
                    'void',
                    ir({ height: '0', opacity: '0', overflow: 'hidden' })
                  ),
                  lg('*', ir({ height: '*', opacity: '1', overflow: 'auto' })),
                  cg('void <=> *', ag('600ms ease-in-out')),
                ]),
              ],
            },
          }));
        }
        return e;
      })();
      function R3(e, n) {
        if (
          (1 & e &&
            (E(0, 'div', 2)(1, 'div', 3),
            Be(2, 'img', 4),
            S(),
            E(3, 'div', 5)(4, 'p'),
            $(
              5,
              '\u0422\u0435\u043a\u0441\u0442 \u043c\u0435\u0436\u0434\u0443 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f\u043c\u0438'
            ),
            S()()()),
          2 & e)
        ) {
          const t = n.$implicit,
            i = n.index,
            r = B();
          M(2),
            vp('transform', 'translateX(' + r.offsets[i] + '%)'),
            R('src', t, sa);
        }
      }
      let F3 = (() => {
        class e {
          constructor(t) {
            (this.el = t),
              (this.offsets = []),
              (this.images = [
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
                'assets/images/icons/mate_logo.png',
              ]);
          }
          ngOnInit() {
            this.initializeOffsets();
          }
          onWindowScroll() {
            this.offsets = this.images.map((t, i) => this.calculateOffset(i));
          }
          initializeOffsets() {
            this.offsets = this.images.map(() => 0);
          }
          calculateOffset(t) {
            const r = this.el.nativeElement
                .querySelectorAll('.img-container')
                [t].getBoundingClientRect(),
              o = t % 2 == 0 ? 1 : -1;
            return r.top < window.innerHeight && r.bottom > 0
              ? o *
                  ((Math.min(r.bottom, window.innerHeight) -
                    Math.max(r.top, 0)) /
                    (r.bottom - r.top)) *
                  50
              : r.top < 0
              ? 50 * o
              : 0;
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(v(_e));
          });
          static #t = (this.ɵcmp = Je({
            type: e,
            selectors: [['app-about-us']],
            hostBindings: function (i, r) {
              1 & i &&
                X(
                  'scroll',
                  function () {
                    return r.onWindowScroll();
                  },
                  0,
                  f0
                );
            },
            decls: 2,
            vars: 1,
            consts: [
              [1, 'container'],
              ['class', 'row text-center', 4, 'ngFor', 'ngForOf'],
              [1, 'row', 'text-center'],
              [1, 'col-md-8', 'img-container'],
              ['alt', 'Image', 1, 'img-responsive', 'center-block', 3, 'src'],
              [1, 'col-md-8'],
            ],
            template: function (i, r) {
              1 & i && (E(0, 'div', 0), L(1, R3, 6, 3, 'div', 1), S()),
                2 & i && (M(1), R('ngForOf', r.images));
            },
            dependencies: [Pn],
            styles: [
              'img[_ngcontent-%COMP%]{transition:transform .6s ease-out;max-width:200px;max-height:200px;width:100%}.img-container[_ngcontent-%COMP%]{overflow:hidden}',
            ],
          }));
        }
        return e;
      })();
      function k3(e, n) {
        if (1 & e) {
          const t = $t();
          E(0, 'div', 15)(1, 'button', 16),
            X('click', function () {
              mt(t);
              const r = B().$implicit;
              return gt(B().decreaseOrder(r.dish));
            }),
            $(2, ' - '),
            S(),
            E(3, 'span', 17),
            $(4),
            S(),
            E(5, 'button', 16),
            X('click', function () {
              mt(t);
              const r = B().$implicit;
              return gt(B().increaseOrder(r.dish));
            }),
            $(6, ' + '),
            S()();
        }
        if (2 & e) {
          const t = B().$implicit;
          M(4), en(' ', t.quantity, ' ');
        }
      }
      function P3(e, n) {
        if (1 & e) {
          const t = $t();
          E(0, 'button', 18),
            X('click', function () {
              mt(t);
              const r = B().$implicit;
              return gt((r.showControls = !r.showControls));
            }),
            $(1),
            S();
        }
        if (2 & e) {
          const t = B().$implicit;
          M(1), Xt(t.quantity);
        }
      }
      function L3(e, n) {
        1 & e && (E(0, 'span'), $(1, ', '), S());
      }
      function V3(e, n) {
        if (
          (1 & e && (E(0, 'span'), $(1), L(2, L3, 2, 0, 'span', 19), S()),
          2 & e)
        ) {
          const t = n.$implicit,
            i = n.last;
          M(1), en(' ', t.name, ''), M(1), R('ngIf', !i);
        }
      }
      function B3(e, n) {
        if (
          (1 & e &&
            (E(0, 'div', 6)(1, 'div', 7),
            L(2, k3, 7, 1, 'div', 8),
            L(3, P3, 2, 1, 'ng-template', null, 9, On),
            S(),
            E(5, 'div', 10)(6, 'div', 2)(7, 'div', 11)(8, 'h5')(9, 'strong'),
            $(10),
            S()(),
            E(11, 'p'),
            L(12, V3, 3, 2, 'span', 12),
            S(),
            E(13, 'p'),
            $(14),
            S()(),
            E(15, 'div', 13),
            Be(16, 'img', 14),
            S()()()()),
          2 & e)
        ) {
          const t = n.$implicit,
            i = (function $n(e) {
              return po(
                (function YN() {
                  return q.lFrame.contextLView;
                })(),
                de + e
              );
            })(4);
          R('@fade', void 0),
            M(2),
            R('ngIf', t.showControls)('ngIfElse', i),
            M(3),
            pe('shift-right', t.showControls),
            M(5),
            Xt(t.dish.name),
            M(2),
            R('ngForOf', t.dish.ingredients),
            M(2),
            en('\u20bc', (t.dish.price * t.quantity).toFixed(2), ''),
            M(2),
            wa('alt', t.dish.name),
            R('src', t.dish.imageUrl, sa);
        }
      }
      let j3 = (() => {
          class e {
            constructor(t, i, r) {
              (this.basketService = t),
                (this.router = i),
                (this.viewportScroller = r),
                (this.total$ = new Nt(0)),
                (this.serviceFee$ = new Nt(0)),
                (this.finalTotal$ = new Nt(0)),
                (this.serviceFeeRate = 0.1);
            }
            ngOnInit() {
              this.subscription = this.basketService.order$.subscribe(t => {
                if (0 === t.total) this.router.navigate(['/menu']);
                else {
                  const i =
                    Math.round(t.total * this.serviceFeeRate * 100) / 100;
                  this.serviceFee$.next(i);
                  const r = Math.round(100 * (t.total + i)) / 100;
                  this.finalTotal$.next(r), this.total$.next(t.total);
                }
              });
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            increaseOrder(t) {
              this.basketService.addItem(t);
            }
            decreaseOrder(t) {
              this.basketService.removeItem(t);
            }
            toggleControls(t) {
              this.viewportScroller.getScrollPosition()[0] < 768 &&
                (t.showControls = !t.showControls);
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(v(ug), v(rn), v(PC));
            });
            static #t = (this.ɵcmp = Je({
              type: e,
              selectors: [['app-checkout']],
              decls: 33,
              vars: 21,
              consts: [
                [1, 'container'],
                ['class', 'row mb-3 custom-padding', 4, 'ngFor', 'ngForOf'],
                [1, 'row'],
                [1, 'col-12'],
                [1, 'col-6'],
                [1, 'mt-3'],
                [1, 'row', 'mb-3', 'custom-padding'],
                [1, 'col-2'],
                [
                  'class',
                  'order-count d-flex align-items-center',
                  4,
                  'ngIf',
                  'ngIfElse',
                ],
                ['quantityDisplay', ''],
                [1, 'col-10'],
                [1, 'col-7'],
                [4, 'ngFor', 'ngForOf'],
                [1, 'col-3'],
                [1, 'item-image', 3, 'src', 'alt'],
                [1, 'order-count', 'd-flex', 'align-items-center'],
                [1, 'btn', 'btn-primary', 'btn-small', 3, 'click'],
                [1, 'number-display', 'text-center'],
                [1, 'number-display', 'btn', 'btn-small', 3, 'click'],
                [4, 'ngIf'],
              ],
              template: function (i, r) {
                1 & i &&
                  (E(0, 'div', 0),
                  L(1, B3, 17, 10, 'div', 1),
                  Ji(2, 'async'),
                  Be(3, 'hr'),
                  E(4, 'div', 2)(5, 'div', 3)(6, 'div', 2)(7, 'div', 4)(
                    8,
                    'h5'
                  ),
                  $(9, 'Total:'),
                  S()(),
                  E(10, 'div', 4)(11, 'h5'),
                  $(12),
                  Ji(13, 'number'),
                  Ji(14, 'async'),
                  S()()(),
                  E(15, 'div', 2)(16, 'div', 4)(17, 'h5'),
                  $(18, 'Service Fee:'),
                  S()(),
                  E(19, 'div', 4)(20, 'h5'),
                  $(21),
                  Ji(22, 'number'),
                  Ji(23, 'async'),
                  S()()(),
                  E(24, 'div', 2)(25, 'div', 4)(26, 'h4', 5),
                  $(27, 'Final Total:'),
                  S()(),
                  E(28, 'div', 4)(29, 'h4', 5),
                  $(30),
                  Ji(31, 'number'),
                  Ji(32, 'async'),
                  S()()()()()()),
                  2 & i &&
                    (M(1),
                    R('ngForOf', Ra(2, 4, r.basketService.items$)),
                    M(11),
                    en('\u20bc', sd(13, 6, Ra(14, 9, r.total$), '1.2-2'), ''),
                    M(9),
                    en(
                      '\u20bc',
                      sd(22, 11, Ra(23, 14, r.serviceFee$), '1.2-2'),
                      ''
                    ),
                    M(9),
                    en(
                      '\u20bc',
                      sd(31, 16, Ra(32, 19, r.finalTotal$), '1.2-2'),
                      ''
                    ));
              },
              dependencies: [Pn, Zn, AC, OC],
              styles: [
                '.btn-small[_ngcontent-%COMP%], .number-display[_ngcontent-%COMP%]{width:30px;height:30px;display:flex;justify-content:center;align-items:center;background-color:#5d681c;color:#fff}.order-count[_ngcontent-%COMP%]   .btn-small[_ngcontent-%COMP%]{background-color:#5d681c;color:#fff}.order-count[_ngcontent-%COMP%]   .number-display[_ngcontent-%COMP%]{background-color:#fff;color:#5d681c}.shift-right[_ngcontent-%COMP%]{transform:translate(30px);transition:transform .3s ease-out}.order-count[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;width:90px}.number-display[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.custom-card[_ngcontent-%COMP%]{width:18rem;border-radius:20px}.custom-padding[_ngcontent-%COMP%]{padding:10px 5px}.checkout-button[_ngcontent-%COMP%]{position:fixed;bottom:20px;right:20px;z-index:1000;width:auto;background-color:#5d681c;padding:10px 20px}.item-image[_ngcontent-%COMP%]{width:64px;height:64px;border-radius:20px;object-fit:cover}@media (max-width: 768px){.checkout-button[_ngcontent-%COMP%]{width:100%;bottom:0;right:0;padding:10px 20px}.shift-right[_ngcontent-%COMP%]{transform:translate(40px);transition:transform .3s ease-out}}@media (min-width: 769px){.col[_ngcontent-%COMP%]{padding:0 10px}.checkout-button[_ngcontent-%COMP%]{padding:15px 30px}.shift-right[_ngcontent-%COMP%]{transform:translate(0)}.item-image[_ngcontent-%COMP%]{width:256px;height:256px}}',
              ],
              data: {
                animation: [
                  sg('fade', [
                    cg(':leave', [
                      ir({ opacity: 1 }),
                      ag('0.5s ease-out', ir({ opacity: 0 })),
                    ]),
                  ]),
                ],
              },
            }));
          }
          return e;
        })(),
        vS = (() => {
          class e {
            constructor(t, i) {
              (this._renderer = t),
                (this._elementRef = i),
                (this.onChange = r => {}),
                (this.onTouched = () => {});
            }
            setProperty(t, i) {
              this._renderer.setProperty(this._elementRef.nativeElement, t, i);
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            registerOnChange(t) {
              this.onChange = t;
            }
            setDisabledState(t) {
              this.setProperty('disabled', t);
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(v(hn), v(_e));
            });
            static #t = (this.ɵdir = O({ type: e }));
          }
          return e;
        })(),
        Lr = (() => {
          class e extends vS {
            static #e = (this.ɵfac = (function () {
              let t;
              return function (r) {
                return (t || (t = tt(e)))(r || e);
              };
            })());
            static #t = (this.ɵdir = O({ type: e, features: [Ee] }));
          }
          return e;
        })();
      const Ln = new T('NgValueAccessor'),
        $3 = { provide: Ln, useExisting: le(() => Kd), multi: !0 },
        G3 = new T('CompositionEventMode');
      let Kd = (() => {
        class e extends vS {
          constructor(t, i, r) {
            super(t, i),
              (this._compositionMode = r),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function z3() {
                  const e = er() ? er().getUserAgent() : '';
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(t) {
            this.setProperty('value', t ?? '');
          }
          _handleInput(t) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(t);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(t) {
            (this._composing = !1), this._compositionMode && this.onChange(t);
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(v(hn), v(_e), v(G3, 8));
          });
          static #t = (this.ɵdir = O({
            type: e,
            selectors: [
              ['input', 'formControlName', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControlName', ''],
              ['input', 'formControl', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControl', ''],
              ['input', 'ngModel', '', 3, 'type', 'checkbox'],
              ['textarea', 'ngModel', ''],
              ['', 'ngDefaultControl', ''],
            ],
            hostBindings: function (i, r) {
              1 & i &&
                X('input', function (s) {
                  return r._handleInput(s.target.value);
                })('blur', function () {
                  return r.onTouched();
                })('compositionstart', function () {
                  return r._compositionStart();
                })('compositionend', function (s) {
                  return r._compositionEnd(s.target.value);
                });
            },
            features: [Oe([$3]), Ee],
          }));
        }
        return e;
      })();
      function rr(e) {
        return (
          null == e ||
          (('string' == typeof e || Array.isArray(e)) && 0 === e.length)
        );
      }
      function bS(e) {
        return null != e && 'number' == typeof e.length;
      }
      const xt = new T('NgValidators'),
        or = new T('NgAsyncValidators'),
        W3 =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class fg {
        static min(n) {
          return (function DS(e) {
            return n => {
              if (rr(n.value) || rr(e)) return null;
              const t = parseFloat(n.value);
              return !isNaN(t) && t < e
                ? { min: { min: e, actual: n.value } }
                : null;
            };
          })(n);
        }
        static max(n) {
          return (function wS(e) {
            return n => {
              if (rr(n.value) || rr(e)) return null;
              const t = parseFloat(n.value);
              return !isNaN(t) && t > e
                ? { max: { max: e, actual: n.value } }
                : null;
            };
          })(n);
        }
        static required(n) {
          return (function CS(e) {
            return rr(e.value) ? { required: !0 } : null;
          })(n);
        }
        static requiredTrue(n) {
          return (function ES(e) {
            return !0 === e.value ? null : { required: !0 };
          })(n);
        }
        static email(n) {
          return (function SS(e) {
            return rr(e.value) || W3.test(e.value) ? null : { email: !0 };
          })(n);
        }
        static minLength(n) {
          return (function xS(e) {
            return n =>
              rr(n.value) || !bS(n.value)
                ? null
                : n.value.length < e
                ? {
                    minlength: {
                      requiredLength: e,
                      actualLength: n.value.length,
                    },
                  }
                : null;
          })(n);
        }
        static maxLength(n) {
          return (function TS(e) {
            return n =>
              bS(n.value) && n.value.length > e
                ? {
                    maxlength: {
                      requiredLength: e,
                      actualLength: n.value.length,
                    },
                  }
                : null;
          })(n);
        }
        static pattern(n) {
          return (function MS(e) {
            if (!e) return Qd;
            let n, t;
            return (
              'string' == typeof e
                ? ((t = ''),
                  '^' !== e.charAt(0) && (t += '^'),
                  (t += e),
                  '$' !== e.charAt(e.length - 1) && (t += '$'),
                  (n = new RegExp(t)))
                : ((t = e.toString()), (n = e)),
              i => {
                if (rr(i.value)) return null;
                const r = i.value;
                return n.test(r)
                  ? null
                  : { pattern: { requiredPattern: t, actualValue: r } };
              }
            );
          })(n);
        }
        static nullValidator(n) {
          return null;
        }
        static compose(n) {
          return FS(n);
        }
        static composeAsync(n) {
          return kS(n);
        }
      }
      function Qd(e) {
        return null;
      }
      function IS(e) {
        return null != e;
      }
      function AS(e) {
        return Da(e) ? ct(e) : e;
      }
      function NS(e) {
        let n = {};
        return (
          e.forEach(t => {
            n = null != t ? { ...n, ...t } : n;
          }),
          0 === Object.keys(n).length ? null : n
        );
      }
      function OS(e, n) {
        return n.map(t => t(e));
      }
      function RS(e) {
        return e.map(n =>
          (function q3(e) {
            return !e.validate;
          })(n)
            ? n
            : t => n.validate(t)
        );
      }
      function FS(e) {
        if (!e) return null;
        const n = e.filter(IS);
        return 0 == n.length
          ? null
          : function (t) {
              return NS(OS(t, n));
            };
      }
      function hg(e) {
        return null != e ? FS(RS(e)) : null;
      }
      function kS(e) {
        if (!e) return null;
        const n = e.filter(IS);
        return 0 == n.length
          ? null
          : function (t) {
              return (function H3(...e) {
                const n = jl(e),
                  { args: t, keys: i } = oE(e),
                  r = new Ae(o => {
                    const { length: s } = t;
                    if (!s) return void o.complete();
                    const a = new Array(s);
                    let l = s,
                      c = s;
                    for (let d = 0; d < s; d++) {
                      let u = !1;
                      at(t[d]).subscribe(
                        Fe(
                          o,
                          f => {
                            u || ((u = !0), c--), (a[d] = f);
                          },
                          () => l--,
                          void 0,
                          () => {
                            (!l || !u) &&
                              (c || o.next(i ? sE(i, a) : a), o.complete());
                          }
                        )
                      );
                    }
                  });
                return n ? r.pipe(km(n)) : r;
              })(OS(t, n).map(AS)).pipe(ie(NS));
            };
      }
      function pg(e) {
        return null != e ? kS(RS(e)) : null;
      }
      function PS(e, n) {
        return null === e ? [n] : Array.isArray(e) ? [...e, n] : [e, n];
      }
      function LS(e) {
        return e._rawValidators;
      }
      function VS(e) {
        return e._rawAsyncValidators;
      }
      function mg(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function Jd(e, n) {
        return Array.isArray(e) ? e.includes(n) : e === n;
      }
      function BS(e, n) {
        const t = mg(n);
        return (
          mg(e).forEach(r => {
            Jd(t, r) || t.push(r);
          }),
          t
        );
      }
      function jS(e, n) {
        return mg(n).filter(t => !Jd(e, t));
      }
      class HS {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(n) {
          (this._rawValidators = n || []),
            (this._composedValidatorFn = hg(this._rawValidators));
        }
        _setAsyncValidators(n) {
          (this._rawAsyncValidators = n || []),
            (this._composedAsyncValidatorFn = pg(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(n) {
          this._onDestroyCallbacks.push(n);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach(n => n()),
            (this._onDestroyCallbacks = []);
        }
        reset(n = void 0) {
          this.control && this.control.reset(n);
        }
        hasError(n, t) {
          return !!this.control && this.control.hasError(n, t);
        }
        getError(n, t) {
          return this.control ? this.control.getError(n, t) : null;
        }
      }
      class Wt extends HS {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class sr extends HS {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class US {
        constructor(n) {
          this._cd = n;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let $S = (() => {
          class e extends US {
            constructor(t) {
              super(t);
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(v(sr, 2));
            });
            static #t = (this.ɵdir = O({
              type: e,
              selectors: [
                ['', 'formControlName', ''],
                ['', 'ngModel', ''],
                ['', 'formControl', ''],
              ],
              hostVars: 14,
              hostBindings: function (i, r) {
                2 & i &&
                  pe('ng-untouched', r.isUntouched)('ng-touched', r.isTouched)(
                    'ng-pristine',
                    r.isPristine
                  )('ng-dirty', r.isDirty)('ng-valid', r.isValid)(
                    'ng-invalid',
                    r.isInvalid
                  )('ng-pending', r.isPending);
              },
              features: [Ee],
            }));
          }
          return e;
        })(),
        zS = (() => {
          class e extends US {
            constructor(t) {
              super(t);
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(v(Wt, 10));
            });
            static #t = (this.ɵdir = O({
              type: e,
              selectors: [
                ['', 'formGroupName', ''],
                ['', 'formArrayName', ''],
                ['', 'ngModelGroup', ''],
                ['', 'formGroup', ''],
                ['form', 3, 'ngNoForm', ''],
                ['', 'ngForm', ''],
              ],
              hostVars: 16,
              hostBindings: function (i, r) {
                2 & i &&
                  pe('ng-untouched', r.isUntouched)('ng-touched', r.isTouched)(
                    'ng-pristine',
                    r.isPristine
                  )('ng-dirty', r.isDirty)('ng-valid', r.isValid)(
                    'ng-invalid',
                    r.isInvalid
                  )('ng-pending', r.isPending)('ng-submitted', r.isSubmitted);
              },
              features: [Ee],
            }));
          }
          return e;
        })();
      const al = 'VALID',
        eu = 'INVALID',
        ps = 'PENDING',
        ll = 'DISABLED';
      function vg(e) {
        return (tu(e) ? e.validators : e) || null;
      }
      function yg(e, n) {
        return (tu(n) ? n.asyncValidators : e) || null;
      }
      function tu(e) {
        return null != e && !Array.isArray(e) && 'object' == typeof e;
      }
      function WS(e, n, t) {
        const i = e.controls;
        if (!(n ? Object.keys(i) : i).length) throw new b(1e3, '');
        if (!i[t]) throw new b(1001, '');
      }
      function qS(e, n, t) {
        e._forEachChild((i, r) => {
          if (void 0 === t[r]) throw new b(1002, '');
        });
      }
      class nu {
        constructor(n, t) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(n),
            this._assignAsyncValidators(t);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(n) {
          this._rawValidators = this._composedValidatorFn = n;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(n) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = n;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === al;
        }
        get invalid() {
          return this.status === eu;
        }
        get pending() {
          return this.status == ps;
        }
        get disabled() {
          return this.status === ll;
        }
        get enabled() {
          return this.status !== ll;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : 'change';
        }
        setValidators(n) {
          this._assignValidators(n);
        }
        setAsyncValidators(n) {
          this._assignAsyncValidators(n);
        }
        addValidators(n) {
          this.setValidators(BS(n, this._rawValidators));
        }
        addAsyncValidators(n) {
          this.setAsyncValidators(BS(n, this._rawAsyncValidators));
        }
        removeValidators(n) {
          this.setValidators(jS(n, this._rawValidators));
        }
        removeAsyncValidators(n) {
          this.setAsyncValidators(jS(n, this._rawAsyncValidators));
        }
        hasValidator(n) {
          return Jd(this._rawValidators, n);
        }
        hasAsyncValidator(n) {
          return Jd(this._rawAsyncValidators, n);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(n = {}) {
          (this.touched = !0),
            this._parent && !n.onlySelf && this._parent.markAsTouched(n);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild(n => n.markAllAsTouched());
        }
        markAsUntouched(n = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild(t => {
              t.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !n.onlySelf && this._parent._updateTouched(n);
        }
        markAsDirty(n = {}) {
          (this.pristine = !1),
            this._parent && !n.onlySelf && this._parent.markAsDirty(n);
        }
        markAsPristine(n = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild(t => {
              t.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !n.onlySelf && this._parent._updatePristine(n);
        }
        markAsPending(n = {}) {
          (this.status = ps),
            !1 !== n.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !n.onlySelf && this._parent.markAsPending(n);
        }
        disable(n = {}) {
          const t = this._parentMarkedDirty(n.onlySelf);
          (this.status = ll),
            (this.errors = null),
            this._forEachChild(i => {
              i.disable({ ...n, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== n.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...n, skipPristineCheck: t }),
            this._onDisabledChange.forEach(i => i(!0));
        }
        enable(n = {}) {
          const t = this._parentMarkedDirty(n.onlySelf);
          (this.status = al),
            this._forEachChild(i => {
              i.enable({ ...n, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: n.emitEvent,
            }),
            this._updateAncestors({ ...n, skipPristineCheck: t }),
            this._onDisabledChange.forEach(i => i(!1));
        }
        _updateAncestors(n) {
          this._parent &&
            !n.onlySelf &&
            (this._parent.updateValueAndValidity(n),
            n.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(n) {
          this._parent = n;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(n = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === al || this.status === ps) &&
                this._runAsyncValidator(n.emitEvent)),
            !1 !== n.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !n.onlySelf &&
              this._parent.updateValueAndValidity(n);
        }
        _updateTreeValidity(n = { emitEvent: !0 }) {
          this._forEachChild(t => t._updateTreeValidity(n)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: n.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? ll : al;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(n) {
          if (this.asyncValidator) {
            (this.status = ps), (this._hasOwnPendingAsyncValidator = !0);
            const t = AS(this.asyncValidator(this));
            this._asyncValidationSubscription = t.subscribe(i => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(i, { emitEvent: n });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(n, t = {}) {
          (this.errors = n), this._updateControlsErrors(!1 !== t.emitEvent);
        }
        get(n) {
          let t = n;
          return null == t ||
            (Array.isArray(t) || (t = t.split('.')), 0 === t.length)
            ? null
            : t.reduce((i, r) => i && i._find(r), this);
        }
        getError(n, t) {
          const i = t ? this.get(t) : this;
          return i && i.errors ? i.errors[n] : null;
        }
        hasError(n, t) {
          return !!this.getError(n, t);
        }
        get root() {
          let n = this;
          for (; n._parent; ) n = n._parent;
          return n;
        }
        _updateControlsErrors(n) {
          (this.status = this._calculateStatus()),
            n && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(n);
        }
        _initObservables() {
          (this.valueChanges = new H()), (this.statusChanges = new H());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? ll
            : this.errors
            ? eu
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(ps)
            ? ps
            : this._anyControlsHaveStatus(eu)
            ? eu
            : al;
        }
        _anyControlsHaveStatus(n) {
          return this._anyControls(t => t.status === n);
        }
        _anyControlsDirty() {
          return this._anyControls(n => n.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls(n => n.touched);
        }
        _updatePristine(n = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !n.onlySelf && this._parent._updatePristine(n);
        }
        _updateTouched(n = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !n.onlySelf && this._parent._updateTouched(n);
        }
        _registerOnCollectionChange(n) {
          this._onCollectionChange = n;
        }
        _setUpdateStrategy(n) {
          tu(n) && null != n.updateOn && (this._updateOn = n.updateOn);
        }
        _parentMarkedDirty(n) {
          return (
            !n &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(n) {
          return null;
        }
        _assignValidators(n) {
          (this._rawValidators = Array.isArray(n) ? n.slice() : n),
            (this._composedValidatorFn = (function Q3(e) {
              return Array.isArray(e) ? hg(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(n) {
          (this._rawAsyncValidators = Array.isArray(n) ? n.slice() : n),
            (this._composedAsyncValidatorFn = (function J3(e) {
              return Array.isArray(e) ? pg(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      class cl extends nu {
        constructor(n, t, i) {
          super(vg(t), yg(i, t)),
            (this.controls = n),
            this._initObservables(),
            this._setUpdateStrategy(t),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(n, t) {
          return this.controls[n]
            ? this.controls[n]
            : ((this.controls[n] = t),
              t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange),
              t);
        }
        addControl(n, t, i = {}) {
          this.registerControl(n, t),
            this.updateValueAndValidity({ emitEvent: i.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(n, t = {}) {
          this.controls[n] &&
            this.controls[n]._registerOnCollectionChange(() => {}),
            delete this.controls[n],
            this.updateValueAndValidity({ emitEvent: t.emitEvent }),
            this._onCollectionChange();
        }
        setControl(n, t, i = {}) {
          this.controls[n] &&
            this.controls[n]._registerOnCollectionChange(() => {}),
            delete this.controls[n],
            t && this.registerControl(n, t),
            this.updateValueAndValidity({ emitEvent: i.emitEvent }),
            this._onCollectionChange();
        }
        contains(n) {
          return this.controls.hasOwnProperty(n) && this.controls[n].enabled;
        }
        setValue(n, t = {}) {
          qS(this, 0, n),
            Object.keys(n).forEach(i => {
              WS(this, !0, i),
                this.controls[i].setValue(n[i], {
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                });
            }),
            this.updateValueAndValidity(t);
        }
        patchValue(n, t = {}) {
          null != n &&
            (Object.keys(n).forEach(i => {
              const r = this.controls[i];
              r && r.patchValue(n[i], { onlySelf: !0, emitEvent: t.emitEvent });
            }),
            this.updateValueAndValidity(t));
        }
        reset(n = {}, t = {}) {
          this._forEachChild((i, r) => {
            i.reset(n ? n[r] : null, { onlySelf: !0, emitEvent: t.emitEvent });
          }),
            this._updatePristine(t),
            this._updateTouched(t),
            this.updateValueAndValidity(t);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (n, t, i) => ((n[i] = t.getRawValue()), n)
          );
        }
        _syncPendingControls() {
          let n = this._reduceChildren(
            !1,
            (t, i) => !!i._syncPendingControls() || t
          );
          return n && this.updateValueAndValidity({ onlySelf: !0 }), n;
        }
        _forEachChild(n) {
          Object.keys(this.controls).forEach(t => {
            const i = this.controls[t];
            i && n(i, t);
          });
        }
        _setUpControls() {
          this._forEachChild(n => {
            n.setParent(this),
              n._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(n) {
          for (const [t, i] of Object.entries(this.controls))
            if (this.contains(t) && n(i)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (t, i, r) => ((i.enabled || this.disabled) && (t[r] = i.value), t)
          );
        }
        _reduceChildren(n, t) {
          let i = n;
          return (
            this._forEachChild((r, o) => {
              i = t(i, r, o);
            }),
            i
          );
        }
        _allControlsDisabled() {
          for (const n of Object.keys(this.controls))
            if (this.controls[n].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(n) {
          return this.controls.hasOwnProperty(n) ? this.controls[n] : null;
        }
      }
      class ZS extends cl {}
      const ms = new T('CallSetDisabledState', {
          providedIn: 'root',
          factory: () => iu,
        }),
        iu = 'always';
      function dl(e, n, t = iu) {
        bg(e, n),
          n.valueAccessor.writeValue(e.value),
          (e.disabled || 'always' === t) &&
            n.valueAccessor.setDisabledState?.(e.disabled),
          (function e5(e, n) {
            n.valueAccessor.registerOnChange(t => {
              (e._pendingValue = t),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                'change' === e.updateOn && YS(e, n);
            });
          })(e, n),
          (function n5(e, n) {
            const t = (i, r) => {
              n.valueAccessor.writeValue(i), r && n.viewToModelUpdate(i);
            };
            e.registerOnChange(t),
              n._registerOnDestroy(() => {
                e._unregisterOnChange(t);
              });
          })(e, n),
          (function t5(e, n) {
            n.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                'blur' === e.updateOn && e._pendingChange && YS(e, n),
                'submit' !== e.updateOn && e.markAsTouched();
            });
          })(e, n),
          (function X3(e, n) {
            if (n.valueAccessor.setDisabledState) {
              const t = i => {
                n.valueAccessor.setDisabledState(i);
              };
              e.registerOnDisabledChange(t),
                n._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(t);
                });
            }
          })(e, n);
      }
      function ou(e, n, t = !0) {
        const i = () => {};
        n.valueAccessor &&
          (n.valueAccessor.registerOnChange(i),
          n.valueAccessor.registerOnTouched(i)),
          au(e, n),
          e &&
            (n._invokeOnDestroyCallbacks(),
            e._registerOnCollectionChange(() => {}));
      }
      function su(e, n) {
        e.forEach(t => {
          t.registerOnValidatorChange && t.registerOnValidatorChange(n);
        });
      }
      function bg(e, n) {
        const t = LS(e);
        null !== n.validator
          ? e.setValidators(PS(t, n.validator))
          : 'function' == typeof t && e.setValidators([t]);
        const i = VS(e);
        null !== n.asyncValidator
          ? e.setAsyncValidators(PS(i, n.asyncValidator))
          : 'function' == typeof i && e.setAsyncValidators([i]);
        const r = () => e.updateValueAndValidity();
        su(n._rawValidators, r), su(n._rawAsyncValidators, r);
      }
      function au(e, n) {
        let t = !1;
        if (null !== e) {
          if (null !== n.validator) {
            const r = LS(e);
            if (Array.isArray(r) && r.length > 0) {
              const o = r.filter(s => s !== n.validator);
              o.length !== r.length && ((t = !0), e.setValidators(o));
            }
          }
          if (null !== n.asyncValidator) {
            const r = VS(e);
            if (Array.isArray(r) && r.length > 0) {
              const o = r.filter(s => s !== n.asyncValidator);
              o.length !== r.length && ((t = !0), e.setAsyncValidators(o));
            }
          }
        }
        const i = () => {};
        return su(n._rawValidators, i), su(n._rawAsyncValidators, i), t;
      }
      function YS(e, n) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          n.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function JS(e, n) {
        const t = e.indexOf(n);
        t > -1 && e.splice(t, 1);
      }
      function XS(e) {
        return (
          'object' == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          'value' in e &&
          'disabled' in e
        );
      }
      const fl = class extends nu {
        constructor(n = null, t, i) {
          super(vg(t), yg(i, t)),
            (this.defaultValue = null),
            (this._onChange = []),
            (this._pendingChange = !1),
            this._applyFormState(n),
            this._setUpdateStrategy(t),
            this._initObservables(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            }),
            tu(t) &&
              (t.nonNullable || t.initialValueIsDefault) &&
              (this.defaultValue = XS(n) ? n.value : n);
        }
        setValue(n, t = {}) {
          (this.value = this._pendingValue = n),
            this._onChange.length &&
              !1 !== t.emitModelToViewChange &&
              this._onChange.forEach(i =>
                i(this.value, !1 !== t.emitViewToModelChange)
              ),
            this.updateValueAndValidity(t);
        }
        patchValue(n, t = {}) {
          this.setValue(n, t);
        }
        reset(n = this.defaultValue, t = {}) {
          this._applyFormState(n),
            this.markAsPristine(t),
            this.markAsUntouched(t),
            this.setValue(this.value, t),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(n) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(n) {
          this._onChange.push(n);
        }
        _unregisterOnChange(n) {
          JS(this._onChange, n);
        }
        registerOnDisabledChange(n) {
          this._onDisabledChange.push(n);
        }
        _unregisterOnDisabledChange(n) {
          JS(this._onDisabledChange, n);
        }
        _forEachChild(n) {}
        _syncPendingControls() {
          return !(
            'submit' !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(n) {
          XS(n)
            ? ((this.value = this._pendingValue = n.value),
              n.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = n);
        }
      };
      let rx = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵdir = O({
              type: e,
              selectors: [
                ['form', 3, 'ngNoForm', '', 3, 'ngNativeValidate', ''],
              ],
              hostAttrs: ['novalidate', ''],
            }));
          }
          return e;
        })(),
        sx = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })();
      const Sg = new T('NgModelWithFormControlWarning'),
        g5 = { provide: Wt, useExisting: le(() => lu) };
      let lu = (() => {
        class e extends Wt {
          constructor(t, i, r) {
            super(),
              (this.callSetDisabledState = r),
              (this.submitted = !1),
              (this._onCollectionChange = () => this._updateDomValue()),
              (this.directives = []),
              (this.form = null),
              (this.ngSubmit = new H()),
              this._setValidators(t),
              this._setAsyncValidators(i);
          }
          ngOnChanges(t) {
            this._checkFormPresent(),
              t.hasOwnProperty('form') &&
                (this._updateValidators(),
                this._updateDomValue(),
                this._updateRegistrations(),
                (this._oldForm = this.form));
          }
          ngOnDestroy() {
            this.form &&
              (au(this.form, this),
              this.form._onCollectionChange === this._onCollectionChange &&
                this.form._registerOnCollectionChange(() => {}));
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          addControl(t) {
            const i = this.form.get(t.path);
            return (
              dl(i, t, this.callSetDisabledState),
              i.updateValueAndValidity({ emitEvent: !1 }),
              this.directives.push(t),
              i
            );
          }
          getControl(t) {
            return this.form.get(t.path);
          }
          removeControl(t) {
            ou(t.control || null, t, !1),
              (function s5(e, n) {
                const t = e.indexOf(n);
                t > -1 && e.splice(t, 1);
              })(this.directives, t);
          }
          addFormGroup(t) {
            this._setUpFormContainer(t);
          }
          removeFormGroup(t) {
            this._cleanUpFormContainer(t);
          }
          getFormGroup(t) {
            return this.form.get(t.path);
          }
          addFormArray(t) {
            this._setUpFormContainer(t);
          }
          removeFormArray(t) {
            this._cleanUpFormContainer(t);
          }
          getFormArray(t) {
            return this.form.get(t.path);
          }
          updateModel(t, i) {
            this.form.get(t.path).setValue(i);
          }
          onSubmit(t) {
            return (
              (this.submitted = !0),
              (function QS(e, n) {
                e._syncPendingControls(),
                  n.forEach(t => {
                    const i = t.control;
                    'submit' === i.updateOn &&
                      i._pendingChange &&
                      (t.viewToModelUpdate(i._pendingValue),
                      (i._pendingChange = !1));
                  });
              })(this.form, this.directives),
              this.ngSubmit.emit(t),
              'dialog' === t?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(t = void 0) {
            this.form.reset(t), (this.submitted = !1);
          }
          _updateDomValue() {
            this.directives.forEach(t => {
              const i = t.control,
                r = this.form.get(t.path);
              i !== r &&
                (ou(i || null, t),
                (e => e instanceof fl)(r) &&
                  (dl(r, t, this.callSetDisabledState), (t.control = r)));
            }),
              this.form._updateTreeValidity({ emitEvent: !1 });
          }
          _setUpFormContainer(t) {
            const i = this.form.get(t.path);
            (function KS(e, n) {
              bg(e, n);
            })(i, t),
              i.updateValueAndValidity({ emitEvent: !1 });
          }
          _cleanUpFormContainer(t) {
            if (this.form) {
              const i = this.form.get(t.path);
              i &&
                (function i5(e, n) {
                  return au(e, n);
                })(i, t) &&
                i.updateValueAndValidity({ emitEvent: !1 });
            }
          }
          _updateRegistrations() {
            this.form._registerOnCollectionChange(this._onCollectionChange),
              this._oldForm &&
                this._oldForm._registerOnCollectionChange(() => {});
          }
          _updateValidators() {
            bg(this.form, this), this._oldForm && au(this._oldForm, this);
          }
          _checkFormPresent() {}
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(v(xt, 10), v(or, 10), v(ms, 8));
          });
          static #t = (this.ɵdir = O({
            type: e,
            selectors: [['', 'formGroup', '']],
            hostBindings: function (i, r) {
              1 & i &&
                X('submit', function (s) {
                  return r.onSubmit(s);
                })('reset', function () {
                  return r.onReset();
                });
            },
            inputs: { form: ['formGroup', 'form'] },
            outputs: { ngSubmit: 'ngSubmit' },
            exportAs: ['ngForm'],
            features: [Oe([g5]), Ee, Ct],
          }));
        }
        return e;
      })();
      const y5 = { provide: sr, useExisting: le(() => Mg) };
      let Mg = (() => {
          class e extends sr {
            set isDisabled(t) {}
            static #e = (this._ngModelWarningSentOnce = !1);
            constructor(t, i, r, o, s) {
              super(),
                (this._ngModelWarningConfig = s),
                (this._added = !1),
                (this.name = null),
                (this.update = new H()),
                (this._ngModelWarningSent = !1),
                (this._parent = t),
                this._setValidators(i),
                this._setAsyncValidators(r),
                (this.valueAccessor = (function Cg(e, n) {
                  if (!n) return null;
                  let t, i, r;
                  return (
                    Array.isArray(n),
                    n.forEach(o => {
                      o.constructor === Kd
                        ? (t = o)
                        : (function o5(e) {
                            return Object.getPrototypeOf(e.constructor) === Lr;
                          })(o)
                        ? (i = o)
                        : (r = o);
                    }),
                    r || i || t || null
                  );
                })(0, o));
            }
            ngOnChanges(t) {
              this._added || this._setUpControl(),
                (function wg(e, n) {
                  if (!e.hasOwnProperty('model')) return !1;
                  const t = e.model;
                  return !!t.isFirstChange() || !Object.is(n, t.currentValue);
                })(t, this.viewModel) &&
                  ((this.viewModel = this.model),
                  this.formDirective.updateModel(this, this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            viewToModelUpdate(t) {
              (this.viewModel = t), this.update.emit(t);
            }
            get path() {
              return (function ru(e, n) {
                return [...n.path, e];
              })(
                null == this.name ? this.name : this.name.toString(),
                this._parent
              );
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            _checkParentType() {}
            _setUpControl() {
              this._checkParentType(),
                (this.control = this.formDirective.addControl(this)),
                (this._added = !0);
            }
            static #t = (this.ɵfac = function (i) {
              return new (i || e)(
                v(Wt, 13),
                v(xt, 10),
                v(or, 10),
                v(Ln, 10),
                v(Sg, 8)
              );
            });
            static #n = (this.ɵdir = O({
              type: e,
              selectors: [['', 'formControlName', '']],
              inputs: {
                name: ['formControlName', 'name'],
                isDisabled: ['disabled', 'isDisabled'],
                model: ['ngModel', 'model'],
              },
              outputs: { update: 'ngModelChange' },
              features: [Oe([y5]), Ee, Ct],
            }));
          }
          return e;
        })(),
        F5 = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({ imports: [sx] }));
          }
          return e;
        })();
      class wx extends nu {
        constructor(n, t, i) {
          super(vg(t), yg(i, t)),
            (this.controls = n),
            this._initObservables(),
            this._setUpdateStrategy(t),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        at(n) {
          return this.controls[this._adjustIndex(n)];
        }
        push(n, t = {}) {
          this.controls.push(n),
            this._registerControl(n),
            this.updateValueAndValidity({ emitEvent: t.emitEvent }),
            this._onCollectionChange();
        }
        insert(n, t, i = {}) {
          this.controls.splice(n, 0, t),
            this._registerControl(t),
            this.updateValueAndValidity({ emitEvent: i.emitEvent });
        }
        removeAt(n, t = {}) {
          let i = this._adjustIndex(n);
          i < 0 && (i = 0),
            this.controls[i] &&
              this.controls[i]._registerOnCollectionChange(() => {}),
            this.controls.splice(i, 1),
            this.updateValueAndValidity({ emitEvent: t.emitEvent });
        }
        setControl(n, t, i = {}) {
          let r = this._adjustIndex(n);
          r < 0 && (r = 0),
            this.controls[r] &&
              this.controls[r]._registerOnCollectionChange(() => {}),
            this.controls.splice(r, 1),
            t && (this.controls.splice(r, 0, t), this._registerControl(t)),
            this.updateValueAndValidity({ emitEvent: i.emitEvent }),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(n, t = {}) {
          qS(this, 0, n),
            n.forEach((i, r) => {
              WS(this, !1, r),
                this.at(r).setValue(i, {
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                });
            }),
            this.updateValueAndValidity(t);
        }
        patchValue(n, t = {}) {
          null != n &&
            (n.forEach((i, r) => {
              this.at(r) &&
                this.at(r).patchValue(i, {
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                });
            }),
            this.updateValueAndValidity(t));
        }
        reset(n = [], t = {}) {
          this._forEachChild((i, r) => {
            i.reset(n[r], { onlySelf: !0, emitEvent: t.emitEvent });
          }),
            this._updatePristine(t),
            this._updateTouched(t),
            this.updateValueAndValidity(t);
        }
        getRawValue() {
          return this.controls.map(n => n.getRawValue());
        }
        clear(n = {}) {
          this.controls.length < 1 ||
            (this._forEachChild(t => t._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }));
        }
        _adjustIndex(n) {
          return n < 0 ? n + this.length : n;
        }
        _syncPendingControls() {
          let n = this.controls.reduce(
            (t, i) => !!i._syncPendingControls() || t,
            !1
          );
          return n && this.updateValueAndValidity({ onlySelf: !0 }), n;
        }
        _forEachChild(n) {
          this.controls.forEach((t, i) => {
            n(t, i);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter(n => n.enabled || this.disabled)
            .map(n => n.value);
        }
        _anyControls(n) {
          return this.controls.some(t => t.enabled && n(t));
        }
        _setUpControls() {
          this._forEachChild(n => this._registerControl(n));
        }
        _allControlsDisabled() {
          for (const n of this.controls) if (n.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(n) {
          n.setParent(this),
            n._registerOnCollectionChange(this._onCollectionChange);
        }
        _find(n) {
          return this.at(n) ?? null;
        }
      }
      function Cx(e) {
        return (
          !!e &&
          (void 0 !== e.asyncValidators ||
            void 0 !== e.validators ||
            void 0 !== e.updateOn)
        );
      }
      let k5 = (() => {
          class e {
            constructor() {
              this.useNonNullable = !1;
            }
            get nonNullable() {
              const t = new e();
              return (t.useNonNullable = !0), t;
            }
            group(t, i = null) {
              const r = this._reduceControls(t);
              let o = {};
              return (
                Cx(i)
                  ? (o = i)
                  : null !== i &&
                    ((o.validators = i.validator),
                    (o.asyncValidators = i.asyncValidator)),
                new cl(r, o)
              );
            }
            record(t, i = null) {
              const r = this._reduceControls(t);
              return new ZS(r, i);
            }
            control(t, i, r) {
              let o = {};
              return this.useNonNullable
                ? (Cx(i)
                    ? (o = i)
                    : ((o.validators = i), (o.asyncValidators = r)),
                  new fl(t, { ...o, nonNullable: !0 }))
                : new fl(t, i, r);
            }
            array(t, i, r) {
              const o = t.map(s => this._createControl(s));
              return new wx(o, i, r);
            }
            _reduceControls(t) {
              const i = {};
              return (
                Object.keys(t).forEach(r => {
                  i[r] = this._createControl(t[r]);
                }),
                i
              );
            }
            _createControl(t) {
              return t instanceof fl || t instanceof nu
                ? t
                : Array.isArray(t)
                ? this.control(
                    t[0],
                    t.length > 1 ? t[1] : null,
                    t.length > 2 ? t[2] : null
                  )
                : this.control(t);
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        P5 = (() => {
          class e {
            static withConfig(t) {
              return {
                ngModule: e,
                providers: [
                  {
                    provide: Sg,
                    useValue: t.warnOnNgModelWithFormControl ?? 'always',
                  },
                  { provide: ms, useValue: t.callSetDisabledState ?? iu },
                ],
              };
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({ imports: [F5] }));
          }
          return e;
        })();
      class cu {}
      class du {}
      class pi {
        constructor(n) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            n
              ? 'string' == typeof n
                ? (this.lazyInit = () => {
                    (this.headers = new Map()),
                      n.split('\n').forEach(t => {
                        const i = t.indexOf(':');
                        if (i > 0) {
                          const r = t.slice(0, i),
                            o = r.toLowerCase(),
                            s = t.slice(i + 1).trim();
                          this.maybeSetNormalizedName(r, o),
                            this.headers.has(o)
                              ? this.headers.get(o).push(s)
                              : this.headers.set(o, [s]);
                        }
                      });
                  })
                : typeof Headers < 'u' && n instanceof Headers
                ? ((this.headers = new Map()),
                  n.forEach((t, i) => {
                    this.setHeaderEntries(i, t);
                  }))
                : (this.lazyInit = () => {
                    (this.headers = new Map()),
                      Object.entries(n).forEach(([t, i]) => {
                        this.setHeaderEntries(t, i);
                      });
                  })
              : (this.headers = new Map());
        }
        has(n) {
          return this.init(), this.headers.has(n.toLowerCase());
        }
        get(n) {
          this.init();
          const t = this.headers.get(n.toLowerCase());
          return t && t.length > 0 ? t[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(n) {
          return this.init(), this.headers.get(n.toLowerCase()) || null;
        }
        append(n, t) {
          return this.clone({ name: n, value: t, op: 'a' });
        }
        set(n, t) {
          return this.clone({ name: n, value: t, op: 's' });
        }
        delete(n, t) {
          return this.clone({ name: n, value: t, op: 'd' });
        }
        maybeSetNormalizedName(n, t) {
          this.normalizedNames.has(t) || this.normalizedNames.set(t, n);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof pi
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach(n => this.applyUpdate(n)),
              (this.lazyUpdate = null)));
        }
        copyFrom(n) {
          n.init(),
            Array.from(n.headers.keys()).forEach(t => {
              this.headers.set(t, n.headers.get(t)),
                this.normalizedNames.set(t, n.normalizedNames.get(t));
            });
        }
        clone(n) {
          const t = new pi();
          return (
            (t.lazyInit =
              this.lazyInit && this.lazyInit instanceof pi
                ? this.lazyInit
                : this),
            (t.lazyUpdate = (this.lazyUpdate || []).concat([n])),
            t
          );
        }
        applyUpdate(n) {
          const t = n.name.toLowerCase();
          switch (n.op) {
            case 'a':
            case 's':
              let i = n.value;
              if (('string' == typeof i && (i = [i]), 0 === i.length)) return;
              this.maybeSetNormalizedName(n.name, t);
              const r = ('a' === n.op ? this.headers.get(t) : void 0) || [];
              r.push(...i), this.headers.set(t, r);
              break;
            case 'd':
              const o = n.value;
              if (o) {
                let s = this.headers.get(t);
                if (!s) return;
                (s = s.filter(a => -1 === o.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(t), this.normalizedNames.delete(t))
                    : this.headers.set(t, s);
              } else this.headers.delete(t), this.normalizedNames.delete(t);
          }
        }
        setHeaderEntries(n, t) {
          const i = (Array.isArray(t) ? t : [t]).map(o => o.toString()),
            r = n.toLowerCase();
          this.headers.set(r, i), this.maybeSetNormalizedName(n, r);
        }
        forEach(n) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach(t =>
              n(this.normalizedNames.get(t), this.headers.get(t))
            );
        }
      }
      class L5 {
        encodeKey(n) {
          return Ex(n);
        }
        encodeValue(n) {
          return Ex(n);
        }
        decodeKey(n) {
          return decodeURIComponent(n);
        }
        decodeValue(n) {
          return decodeURIComponent(n);
        }
      }
      const B5 = /%(\d[a-f0-9])/gi,
        j5 = {
          40: '@',
          '3A': ':',
          24: '$',
          '2C': ',',
          '3B': ';',
          '3D': '=',
          '3F': '?',
          '2F': '/',
        };
      function Ex(e) {
        return encodeURIComponent(e).replace(B5, (n, t) => j5[t] ?? n);
      }
      function uu(e) {
        return `${e}`;
      }
      class ar {
        constructor(n = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = n.encoder || new L5()),
            n.fromString)
          ) {
            if (n.fromObject)
              throw new Error('Cannot specify both fromString and fromObject.');
            this.map = (function V5(e, n) {
              const t = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, '')
                    .split('&')
                    .forEach(r => {
                      const o = r.indexOf('='),
                        [s, a] =
                          -1 == o
                            ? [n.decodeKey(r), '']
                            : [
                                n.decodeKey(r.slice(0, o)),
                                n.decodeValue(r.slice(o + 1)),
                              ],
                        l = t.get(s) || [];
                      l.push(a), t.set(s, l);
                    }),
                t
              );
            })(n.fromString, this.encoder);
          } else
            n.fromObject
              ? ((this.map = new Map()),
                Object.keys(n.fromObject).forEach(t => {
                  const i = n.fromObject[t],
                    r = Array.isArray(i) ? i.map(uu) : [uu(i)];
                  this.map.set(t, r);
                }))
              : (this.map = null);
        }
        has(n) {
          return this.init(), this.map.has(n);
        }
        get(n) {
          this.init();
          const t = this.map.get(n);
          return t ? t[0] : null;
        }
        getAll(n) {
          return this.init(), this.map.get(n) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(n, t) {
          return this.clone({ param: n, value: t, op: 'a' });
        }
        appendAll(n) {
          const t = [];
          return (
            Object.keys(n).forEach(i => {
              const r = n[i];
              Array.isArray(r)
                ? r.forEach(o => {
                    t.push({ param: i, value: o, op: 'a' });
                  })
                : t.push({ param: i, value: r, op: 'a' });
            }),
            this.clone(t)
          );
        }
        set(n, t) {
          return this.clone({ param: n, value: t, op: 's' });
        }
        delete(n, t) {
          return this.clone({ param: n, value: t, op: 'd' });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map(n => {
                const t = this.encoder.encodeKey(n);
                return this.map
                  .get(n)
                  .map(i => t + '=' + this.encoder.encodeValue(i))
                  .join('&');
              })
              .filter(n => '' !== n)
              .join('&')
          );
        }
        clone(n) {
          const t = new ar({ encoder: this.encoder });
          return (
            (t.cloneFrom = this.cloneFrom || this),
            (t.updates = (this.updates || []).concat(n)),
            t
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach(n => this.map.set(n, this.cloneFrom.map.get(n))),
              this.updates.forEach(n => {
                switch (n.op) {
                  case 'a':
                  case 's':
                    const t =
                      ('a' === n.op ? this.map.get(n.param) : void 0) || [];
                    t.push(uu(n.value)), this.map.set(n.param, t);
                    break;
                  case 'd':
                    if (void 0 === n.value) {
                      this.map.delete(n.param);
                      break;
                    }
                    {
                      let i = this.map.get(n.param) || [];
                      const r = i.indexOf(uu(n.value));
                      -1 !== r && i.splice(r, 1),
                        i.length > 0
                          ? this.map.set(n.param, i)
                          : this.map.delete(n.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class H5 {
        constructor() {
          this.map = new Map();
        }
        set(n, t) {
          return this.map.set(n, t), this;
        }
        get(n) {
          return (
            this.map.has(n) || this.map.set(n, n.defaultValue()),
            this.map.get(n)
          );
        }
        delete(n) {
          return this.map.delete(n), this;
        }
        has(n) {
          return this.map.has(n);
        }
        keys() {
          return this.map.keys();
        }
      }
      function Sx(e) {
        return typeof ArrayBuffer < 'u' && e instanceof ArrayBuffer;
      }
      function xx(e) {
        return typeof Blob < 'u' && e instanceof Blob;
      }
      function Tx(e) {
        return typeof FormData < 'u' && e instanceof FormData;
      }
      class hl {
        constructor(n, t, i, r) {
          let o;
          if (
            ((this.url = t),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = 'json'),
            (this.method = n.toUpperCase()),
            (function U5(e) {
              switch (e) {
                case 'DELETE':
                case 'GET':
                case 'HEAD':
                case 'OPTIONS':
                case 'JSONP':
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || r
              ? ((this.body = void 0 !== i ? i : null), (o = r))
              : (o = i),
            o &&
              ((this.reportProgress = !!o.reportProgress),
              (this.withCredentials = !!o.withCredentials),
              o.responseType && (this.responseType = o.responseType),
              o.headers && (this.headers = o.headers),
              o.context && (this.context = o.context),
              o.params && (this.params = o.params)),
            this.headers || (this.headers = new pi()),
            this.context || (this.context = new H5()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = t;
            else {
              const a = t.indexOf('?');
              this.urlWithParams =
                t + (-1 === a ? '?' : a < t.length - 1 ? '&' : '') + s;
            }
          } else (this.params = new ar()), (this.urlWithParams = t);
        }
        serializeBody() {
          return null === this.body
            ? null
            : Sx(this.body) ||
              xx(this.body) ||
              Tx(this.body) ||
              (function $5(e) {
                return (
                  typeof URLSearchParams < 'u' && e instanceof URLSearchParams
                );
              })(this.body) ||
              'string' == typeof this.body
            ? this.body
            : this.body instanceof ar
            ? this.body.toString()
            : 'object' == typeof this.body ||
              'boolean' == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Tx(this.body)
            ? null
            : xx(this.body)
            ? this.body.type || null
            : Sx(this.body)
            ? null
            : 'string' == typeof this.body
            ? 'text/plain'
            : this.body instanceof ar
            ? 'application/x-www-form-urlencoded;charset=UTF-8'
            : 'object' == typeof this.body ||
              'number' == typeof this.body ||
              'boolean' == typeof this.body
            ? 'application/json'
            : null;
        }
        clone(n = {}) {
          const t = n.method || this.method,
            i = n.url || this.url,
            r = n.responseType || this.responseType,
            o = void 0 !== n.body ? n.body : this.body,
            s =
              void 0 !== n.withCredentials
                ? n.withCredentials
                : this.withCredentials,
            a =
              void 0 !== n.reportProgress
                ? n.reportProgress
                : this.reportProgress;
          let l = n.headers || this.headers,
            c = n.params || this.params;
          const d = n.context ?? this.context;
          return (
            void 0 !== n.setHeaders &&
              (l = Object.keys(n.setHeaders).reduce(
                (u, f) => u.set(f, n.setHeaders[f]),
                l
              )),
            n.setParams &&
              (c = Object.keys(n.setParams).reduce(
                (u, f) => u.set(f, n.setParams[f]),
                c
              )),
            new hl(t, i, o, {
              params: c,
              headers: l,
              context: d,
              reportProgress: a,
              responseType: r,
              withCredentials: s,
            })
          );
        }
      }
      var gs = (function (e) {
        return (
          (e[(e.Sent = 0)] = 'Sent'),
          (e[(e.UploadProgress = 1)] = 'UploadProgress'),
          (e[(e.ResponseHeader = 2)] = 'ResponseHeader'),
          (e[(e.DownloadProgress = 3)] = 'DownloadProgress'),
          (e[(e.Response = 4)] = 'Response'),
          (e[(e.User = 5)] = 'User'),
          e
        );
      })(gs || {});
      class Og {
        constructor(n, t = 200, i = 'OK') {
          (this.headers = n.headers || new pi()),
            (this.status = void 0 !== n.status ? n.status : t),
            (this.statusText = n.statusText || i),
            (this.url = n.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Rg extends Og {
        constructor(n = {}) {
          super(n), (this.type = gs.ResponseHeader);
        }
        clone(n = {}) {
          return new Rg({
            headers: n.headers || this.headers,
            status: void 0 !== n.status ? n.status : this.status,
            statusText: n.statusText || this.statusText,
            url: n.url || this.url || void 0,
          });
        }
      }
      class _s extends Og {
        constructor(n = {}) {
          super(n),
            (this.type = gs.Response),
            (this.body = void 0 !== n.body ? n.body : null);
        }
        clone(n = {}) {
          return new _s({
            body: void 0 !== n.body ? n.body : this.body,
            headers: n.headers || this.headers,
            status: void 0 !== n.status ? n.status : this.status,
            statusText: n.statusText || this.statusText,
            url: n.url || this.url || void 0,
          });
        }
      }
      class Mx extends Og {
        constructor(n) {
          super(n, 0, 'Unknown Error'),
            (this.name = 'HttpErrorResponse'),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${n.url || '(unknown url)'}`
                : `Http failure response for ${n.url || '(unknown url)'}: ${
                    n.status
                  } ${n.statusText}`),
            (this.error = n.error || null);
        }
      }
      function Fg(e, n) {
        return {
          body: n,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let Ix = (() => {
        class e {
          constructor(t) {
            this.handler = t;
          }
          request(t, i, r = {}) {
            let o;
            if (t instanceof hl) o = t;
            else {
              let l, c;
              (l = r.headers instanceof pi ? r.headers : new pi(r.headers)),
                r.params &&
                  (c =
                    r.params instanceof ar
                      ? r.params
                      : new ar({ fromObject: r.params })),
                (o = new hl(t, i, void 0 !== r.body ? r.body : null, {
                  headers: l,
                  context: r.context,
                  params: c,
                  reportProgress: r.reportProgress,
                  responseType: r.responseType || 'json',
                  withCredentials: r.withCredentials,
                }));
            }
            const s = G(o).pipe(os(l => this.handler.handle(l)));
            if (t instanceof hl || 'events' === r.observe) return s;
            const a = s.pipe(it(l => l instanceof _s));
            switch (r.observe || 'body') {
              case 'body':
                switch (o.responseType) {
                  case 'arraybuffer':
                    return a.pipe(
                      ie(l => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error('Response is not an ArrayBuffer.');
                        return l.body;
                      })
                    );
                  case 'blob':
                    return a.pipe(
                      ie(l => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error('Response is not a Blob.');
                        return l.body;
                      })
                    );
                  case 'text':
                    return a.pipe(
                      ie(l => {
                        if (null !== l.body && 'string' != typeof l.body)
                          throw new Error('Response is not a string.');
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(ie(l => l.body));
                }
              case 'response':
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${r.observe}}`
                );
            }
          }
          delete(t, i = {}) {
            return this.request('DELETE', t, i);
          }
          get(t, i = {}) {
            return this.request('GET', t, i);
          }
          head(t, i = {}) {
            return this.request('HEAD', t, i);
          }
          jsonp(t, i) {
            return this.request('JSONP', t, {
              params: new ar().append(i, 'JSONP_CALLBACK'),
              observe: 'body',
              responseType: 'json',
            });
          }
          options(t, i = {}) {
            return this.request('OPTIONS', t, i);
          }
          patch(t, i, r = {}) {
            return this.request('PATCH', t, Fg(r, i));
          }
          post(t, i, r = {}) {
            return this.request('POST', t, Fg(r, i));
          }
          put(t, i, r = {}) {
            return this.request('PUT', t, Fg(r, i));
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(cu));
          });
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function Ox(e, n) {
        return n(e);
      }
      function G5(e, n) {
        return (t, i) => n.intercept(t, { handle: r => e(r, i) });
      }
      const q5 = new T(''),
        pl = new T(''),
        Rx = new T('');
      function Z5() {
        let e = null;
        return (n, t) => {
          null === e &&
            (e = (I(q5, { optional: !0 }) ?? []).reduceRight(G5, Ox));
          const i = I(dd),
            r = i.add();
          return e(n, t).pipe($a(() => i.remove(r)));
        };
      }
      let Fx = (() => {
        class e extends cu {
          constructor(t, i) {
            super(),
              (this.backend = t),
              (this.injector = i),
              (this.chain = null),
              (this.pendingTasks = I(dd));
          }
          handle(t) {
            if (null === this.chain) {
              const r = Array.from(
                new Set([
                  ...this.injector.get(pl),
                  ...this.injector.get(Rx, []),
                ])
              );
              this.chain = r.reduceRight(
                (o, s) =>
                  (function W5(e, n, t) {
                    return (i, r) => t.runInContext(() => n(i, o => e(o, r)));
                  })(o, s, this.injector),
                Ox
              );
            }
            const i = this.pendingTasks.add();
            return this.chain(t, r => this.backend.handle(r)).pipe(
              $a(() => this.pendingTasks.remove(i))
            );
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(du), x(Ut));
          });
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const J5 = /^\)\]\}',?\n/;
      let Px = (() => {
        class e {
          constructor(t) {
            this.xhrFactory = t;
          }
          handle(t) {
            if ('JSONP' === t.method) throw new b(-2800, !1);
            const i = this.xhrFactory;
            return (i.ɵloadImpl ? ct(i.ɵloadImpl()) : G(null)).pipe(
              Cn(
                () =>
                  new Ae(o => {
                    const s = i.build();
                    if (
                      (s.open(t.method, t.urlWithParams),
                      t.withCredentials && (s.withCredentials = !0),
                      t.headers.forEach((m, g) =>
                        s.setRequestHeader(m, g.join(','))
                      ),
                      t.headers.has('Accept') ||
                        s.setRequestHeader(
                          'Accept',
                          'application/json, text/plain, */*'
                        ),
                      !t.headers.has('Content-Type'))
                    ) {
                      const m = t.detectContentTypeHeader();
                      null !== m && s.setRequestHeader('Content-Type', m);
                    }
                    if (t.responseType) {
                      const m = t.responseType.toLowerCase();
                      s.responseType = 'json' !== m ? m : 'text';
                    }
                    const a = t.serializeBody();
                    let l = null;
                    const c = () => {
                        if (null !== l) return l;
                        const m = s.statusText || 'OK',
                          g = new pi(s.getAllResponseHeaders()),
                          y =
                            (function X5(e) {
                              return 'responseURL' in e && e.responseURL
                                ? e.responseURL
                                : /^X-Request-URL:/m.test(
                                    e.getAllResponseHeaders()
                                  )
                                ? e.getResponseHeader('X-Request-URL')
                                : null;
                            })(s) || t.url;
                        return (
                          (l = new Rg({
                            headers: g,
                            status: s.status,
                            statusText: m,
                            url: y,
                          })),
                          l
                        );
                      },
                      d = () => {
                        let {
                            headers: m,
                            status: g,
                            statusText: y,
                            url: _,
                          } = c(),
                          D = null;
                        204 !== g &&
                          (D =
                            typeof s.response > 'u'
                              ? s.responseText
                              : s.response),
                          0 === g && (g = D ? 200 : 0);
                        let w = g >= 200 && g < 300;
                        if ('json' === t.responseType && 'string' == typeof D) {
                          const F = D;
                          D = D.replace(J5, '');
                          try {
                            D = '' !== D ? JSON.parse(D) : null;
                          } catch (j) {
                            (D = F),
                              w && ((w = !1), (D = { error: j, text: D }));
                          }
                        }
                        w
                          ? (o.next(
                              new _s({
                                body: D,
                                headers: m,
                                status: g,
                                statusText: y,
                                url: _ || void 0,
                              })
                            ),
                            o.complete())
                          : o.error(
                              new Mx({
                                error: D,
                                headers: m,
                                status: g,
                                statusText: y,
                                url: _ || void 0,
                              })
                            );
                      },
                      u = m => {
                        const { url: g } = c(),
                          y = new Mx({
                            error: m,
                            status: s.status || 0,
                            statusText: s.statusText || 'Unknown Error',
                            url: g || void 0,
                          });
                        o.error(y);
                      };
                    let f = !1;
                    const h = m => {
                        f || (o.next(c()), (f = !0));
                        let g = { type: gs.DownloadProgress, loaded: m.loaded };
                        m.lengthComputable && (g.total = m.total),
                          'text' === t.responseType &&
                            s.responseText &&
                            (g.partialText = s.responseText),
                          o.next(g);
                      },
                      p = m => {
                        let g = { type: gs.UploadProgress, loaded: m.loaded };
                        m.lengthComputable && (g.total = m.total), o.next(g);
                      };
                    return (
                      s.addEventListener('load', d),
                      s.addEventListener('error', u),
                      s.addEventListener('timeout', u),
                      s.addEventListener('abort', u),
                      t.reportProgress &&
                        (s.addEventListener('progress', h),
                        null !== a &&
                          s.upload &&
                          s.upload.addEventListener('progress', p)),
                      s.send(a),
                      o.next({ type: gs.Sent }),
                      () => {
                        s.removeEventListener('error', u),
                          s.removeEventListener('abort', u),
                          s.removeEventListener('load', d),
                          s.removeEventListener('timeout', u),
                          t.reportProgress &&
                            (s.removeEventListener('progress', h),
                            null !== a &&
                              s.upload &&
                              s.upload.removeEventListener('progress', p)),
                          s.readyState !== s.DONE && s.abort();
                      }
                    );
                  })
              )
            );
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(LC));
          });
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const kg = new T('XSRF_ENABLED'),
        Lx = new T('XSRF_COOKIE_NAME', {
          providedIn: 'root',
          factory: () => 'XSRF-TOKEN',
        }),
        Vx = new T('XSRF_HEADER_NAME', {
          providedIn: 'root',
          factory: () => 'X-XSRF-TOKEN',
        });
      class Bx {}
      let n4 = (() => {
        class e {
          constructor(t, i, r) {
            (this.doc = t),
              (this.platform = i),
              (this.cookieName = r),
              (this.lastCookieString = ''),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ('server' === this.platform) return null;
            const t = this.doc.cookie || '';
            return (
              t !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = EC(t, this.cookieName)),
                (this.lastCookieString = t)),
              this.lastToken
            );
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(je), x(Ki), x(Lx));
          });
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function r4(e, n) {
        const t = e.url.toLowerCase();
        if (
          !I(kg) ||
          'GET' === e.method ||
          'HEAD' === e.method ||
          t.startsWith('http://') ||
          t.startsWith('https://')
        )
          return n(e);
        const i = I(Bx).getToken(),
          r = I(Vx);
        return (
          null != i &&
            !e.headers.has(r) &&
            (e = e.clone({ headers: e.headers.set(r, i) })),
          n(e)
        );
      }
      var lr = (function (e) {
        return (
          (e[(e.Interceptors = 0)] = 'Interceptors'),
          (e[(e.LegacyInterceptors = 1)] = 'LegacyInterceptors'),
          (e[(e.CustomXsrfConfiguration = 2)] = 'CustomXsrfConfiguration'),
          (e[(e.NoXsrfProtection = 3)] = 'NoXsrfProtection'),
          (e[(e.JsonpSupport = 4)] = 'JsonpSupport'),
          (e[(e.RequestsMadeViaParent = 5)] = 'RequestsMadeViaParent'),
          (e[(e.Fetch = 6)] = 'Fetch'),
          e
        );
      })(lr || {});
      function o4(...e) {
        const n = [
          Ix,
          Px,
          Fx,
          { provide: cu, useExisting: Fx },
          { provide: du, useExisting: Px },
          { provide: pl, useValue: r4, multi: !0 },
          { provide: kg, useValue: !0 },
          { provide: Bx, useClass: n4 },
        ];
        for (const t of e) n.push(...t.ɵproviders);
        return (function Sh(e) {
          return { ɵproviders: e };
        })(n);
      }
      const jx = new T('LEGACY_INTERCEPTOR_FN');
      function s4() {
        return (function Br(e, n) {
          return { ɵkind: e, ɵproviders: n };
        })(lr.LegacyInterceptors, [
          { provide: jx, useFactory: Z5 },
          { provide: pl, useExisting: jx, multi: !0 },
        ]);
      }
      let a4 = (() => {
        class e {
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵmod = se({ type: e }));
          static #n = (this.ɵinj = oe({ providers: [o4(s4())] }));
        }
        return e;
      })();
      const h4 = [
        { path: 'contact', component: _3 },
        { path: 'menu', component: O3 },
        { path: 'about', component: F3 },
        { path: 'checkout', component: j3 },
        {
          path: 'login',
          component: (() => {
            class e {
              constructor(t, i) {
                (this.formBuilder = t),
                  (this.http = i),
                  (this.loginForm = this.formBuilder.group({
                    email: ['', [fg.required, fg.email]],
                    password: ['', fg.required],
                  }));
              }
              login() {
                this.http
                  .get('http://localhost:3000', { withCredentials: !0 })
                  .subscribe({
                    next: t => {
                      console.log(t);
                    },
                  });
              }
              static #e = (this.ɵfac = function (i) {
                return new (i || e)(v(k5), v(Ix));
              });
              static #t = (this.ɵcmp = Je({
                type: e,
                selectors: [['app-login-dialog']],
                decls: 19,
                vars: 2,
                consts: [
                  [1, 'container'],
                  [1, 'row', 'justify-content-left'],
                  [1, 'col-12', 'col-md-6'],
                  [1, 'card', 'mt-3'],
                  [1, 'card-header'],
                  [1, 'modal-title'],
                  [1, 'card-body'],
                  [3, 'formGroup', 'ngSubmit'],
                  [1, 'form-group', 'mb-3'],
                  ['for', 'email'],
                  [
                    'formControlName',
                    'email',
                    'id',
                    'email',
                    'type',
                    'email',
                    1,
                    'form-control',
                  ],
                  ['for', 'password'],
                  [
                    'formControlName',
                    'password',
                    'id',
                    'password',
                    'type',
                    'password',
                    1,
                    'form-control',
                  ],
                  ['type', 'submit', 1, 'btn', 'custom-button', 3, 'disabled'],
                ],
                template: function (i, r) {
                  1 & i &&
                    (E(0, 'div', 0)(1, 'div', 1)(2, 'div', 2)(3, 'div', 3)(
                      4,
                      'div',
                      4
                    )(5, 'h5', 5),
                    $(6, 'Login'),
                    S()(),
                    E(7, 'div', 6)(8, 'form', 7),
                    X('ngSubmit', function () {
                      return r.login();
                    }),
                    E(9, 'div', 8)(10, 'label', 9),
                    $(11, 'Email'),
                    S(),
                    Be(12, 'input', 10),
                    S(),
                    E(13, 'div', 8)(14, 'label', 11),
                    $(15, 'Password'),
                    S(),
                    Be(16, 'input', 12),
                    S(),
                    E(17, 'button', 13),
                    $(18, 'Login'),
                    S()()()()()()()),
                    2 & i &&
                      (M(8),
                      R('formGroup', r.loginForm),
                      M(9),
                      R('disabled', r.loginForm.invalid));
                },
                dependencies: [rx, Kd, $S, zS, lu, Mg],
                styles: [
                  '.custom-button[_ngcontent-%COMP%]{background-color:#5d681c;border-color:#5d681c}.custom-button[_ngcontent-%COMP%]:hover{background-color:#4b5616;border-color:#4b5616}',
                ],
              }));
            }
            return e;
          })(),
        },
      ];
      let p4 = (() => {
        class e {
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵmod = se({ type: e }));
          static #n = (this.ɵinj = oe({
            imports: [
              hS.forRoot(h4, {
                useHash: !0,
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
              }),
              hS,
            ],
          }));
        }
        return e;
      })();
      const m4 = ['addListener', 'removeListener'],
        g4 = ['addEventListener', 'removeEventListener'],
        _4 = ['on', 'off'];
      function Tt(e, n, t, i) {
        if ((ue(t) && ((i = t), (t = void 0)), i))
          return Tt(e, n, t).pipe(km(i));
        const [r, o] = (function b4(e) {
          return ue(e.addEventListener) && ue(e.removeEventListener);
        })(e)
          ? g4.map(s => a => e[s](n, a, t))
          : (function v4(e) {
              return ue(e.addListener) && ue(e.removeListener);
            })(e)
          ? m4.map(Hx(e, n))
          : (function y4(e) {
              return ue(e.on) && ue(e.off);
            })(e)
          ? _4.map(Hx(e, n))
          : [];
        if (!r && uf(e)) return lt(s => Tt(s, n, t))(at(e));
        if (!r) throw new TypeError('Invalid event target');
        return new Ae(s => {
          const a = (...l) => s.next(1 < l.length ? l : l[0]);
          return r(a), () => o(a);
        });
      }
      function Hx(e, n) {
        return t => i => e[t](n, i);
      }
      class D4 extends Pt {
        constructor(n, t) {
          super();
        }
        schedule(n, t = 0) {
          return this;
        }
      }
      const hu = {
        setInterval(e, n, ...t) {
          const { delegate: i } = hu;
          return i?.setInterval
            ? i.setInterval(e, n, ...t)
            : setInterval(e, n, ...t);
        },
        clearInterval(e) {
          const { delegate: n } = hu;
          return (n?.clearInterval || clearInterval)(e);
        },
        delegate: void 0,
      };
      class Pg extends D4 {
        constructor(n, t) {
          super(n, t),
            (this.scheduler = n),
            (this.work = t),
            (this.pending = !1);
        }
        schedule(n, t = 0) {
          var i;
          if (this.closed) return this;
          this.state = n;
          const r = this.id,
            o = this.scheduler;
          return (
            null != r && (this.id = this.recycleAsyncId(o, r, t)),
            (this.pending = !0),
            (this.delay = t),
            (this.id =
              null !== (i = this.id) && void 0 !== i
                ? i
                : this.requestAsyncId(o, this.id, t)),
            this
          );
        }
        requestAsyncId(n, t, i = 0) {
          return hu.setInterval(n.flush.bind(n, this), i);
        }
        recycleAsyncId(n, t, i = 0) {
          if (null != i && this.delay === i && !1 === this.pending) return t;
          null != t && hu.clearInterval(t);
        }
        execute(n, t) {
          if (this.closed) return new Error('executing a cancelled action');
          this.pending = !1;
          const i = this._execute(n, t);
          if (i) return i;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(n, t) {
          let r,
            i = !1;
          try {
            this.work(n);
          } catch (o) {
            (i = !0),
              (r = o || new Error('Scheduled action threw falsy error'));
          }
          if (i) return this.unsubscribe(), r;
        }
        unsubscribe() {
          if (!this.closed) {
            const { id: n, scheduler: t } = this,
              { actions: i } = t;
            (this.work = this.state = this.scheduler = null),
              (this.pending = !1),
              io(i, this),
              null != n && (this.id = this.recycleAsyncId(t, n, null)),
              (this.delay = null),
              super.unsubscribe();
          }
        }
      }
      const Ux = { now: () => (Ux.delegate || Date).now(), delegate: void 0 };
      class ml {
        constructor(n, t = ml.now) {
          (this.schedulerActionCtor = n), (this.now = t);
        }
        schedule(n, t = 0, i) {
          return new this.schedulerActionCtor(this, n).schedule(i, t);
        }
      }
      ml.now = Ux.now;
      class Lg extends ml {
        constructor(n, t = ml.now) {
          super(n, t), (this.actions = []), (this._active = !1);
        }
        flush(n) {
          const { actions: t } = this;
          if (this._active) return void t.push(n);
          let i;
          this._active = !0;
          do {
            if ((i = n.execute(n.state, n.delay))) break;
          } while ((n = t.shift()));
          if (((this._active = !1), i)) {
            for (; (n = t.shift()); ) n.unsubscribe();
            throw i;
          }
        }
      }
      const Vg = new Lg(Pg),
        w4 = Vg;
      const { isArray: E4 } = Array;
      function zx(e) {
        return 1 === e.length && E4(e[0]) ? e[0] : e;
      }
      function Bg(...e) {
        const n = jl(e),
          t = zx(e);
        return t.length
          ? new Ae(i => {
              let r = t.map(() => []),
                o = t.map(() => !1);
              i.add(() => {
                r = o = null;
              });
              for (let s = 0; !i.closed && s < t.length; s++)
                at(t[s]).subscribe(
                  Fe(
                    i,
                    a => {
                      if ((r[s].push(a), r.every(l => l.length))) {
                        const l = r.map(c => c.shift());
                        i.next(n ? n(...l) : l),
                          r.some((c, d) => !c.length && o[d]) && i.complete();
                      }
                    },
                    () => {
                      (o[s] = !0), !r[s].length && i.complete();
                    }
                  )
                );
              return () => {
                r = o = null;
              };
            })
          : wn;
      }
      function jg(...e) {
        const n = jl(e);
        return Ye((t, i) => {
          const r = e.length,
            o = new Array(r);
          let s = e.map(() => !1),
            a = !1;
          for (let l = 0; l < r; l++)
            at(e[l]).subscribe(
              Fe(
                i,
                c => {
                  (o[l] = c),
                    !a &&
                      !s[l] &&
                      ((s[l] = !0), (a = s.every(bi)) && (s = null));
                },
                Ns
              )
            );
          t.subscribe(
            Fe(i, l => {
              if (a) {
                const c = [l, ...o];
                i.next(n ? n(...c) : c);
              }
            })
          );
        });
      }
      Math, Math, Math;
      const t8 = ['*'],
        N8 = ['dialog'];
      function Ur(e) {
        return 'string' == typeof e;
      }
      function $r(e) {
        return null != e;
      }
      function Cs(e) {
        return (e || document.body).getBoundingClientRect();
      }
      const ET = { animation: !0, transitionTimerDelayMs: 5 },
        CG = () => {},
        { transitionTimerDelayMs: EG } = ET,
        Cl = new Map(),
        an = (e, n, t, i) => {
          let r = i.context || {};
          const o = Cl.get(n);
          if (o)
            switch (i.runningTransition) {
              case 'continue':
                return wn;
              case 'stop':
                e.run(() => o.transition$.complete()),
                  (r = Object.assign(o.context, r)),
                  Cl.delete(n);
            }
          const s = t(n, i.animation, r) || CG;
          if (
            !i.animation ||
            'none' === window.getComputedStyle(n).transitionProperty
          )
            return (
              e.run(() => s()),
              G(void 0).pipe(
                (function DG(e) {
                  return n =>
                    new Ae(t =>
                      n.subscribe({
                        next: s => e.run(() => t.next(s)),
                        error: s => e.run(() => t.error(s)),
                        complete: () => e.run(() => t.complete()),
                      })
                    );
                })(e)
              )
            );
          const a = new Ne(),
            l = new Ne(),
            c = a.pipe(
              (function x4(...e) {
                return n => rs(n, G(...e));
              })(!0)
            );
          Cl.set(n, {
            transition$: a,
            complete: () => {
              l.next(), l.complete();
            },
            context: r,
          });
          const d = (function wG(e) {
            const { transitionDelay: n, transitionDuration: t } =
              window.getComputedStyle(e);
            return 1e3 * (parseFloat(n) + parseFloat(t));
          })(n);
          return (
            e.runOutsideAngular(() => {
              const u = Tt(n, 'transitionend').pipe(
                We(c),
                it(({ target: h }) => h === n)
              );
              (function Gx(...e) {
                return 1 === (e = zx(e)).length
                  ? at(e[0])
                  : new Ae(
                      (function S4(e) {
                        return n => {
                          let t = [];
                          for (let i = 0; t && !n.closed && i < e.length; i++)
                            t.push(
                              at(e[i]).subscribe(
                                Fe(n, r => {
                                  if (t) {
                                    for (let o = 0; o < t.length; o++)
                                      o !== i && t[o].unsubscribe();
                                    t = null;
                                  }
                                  n.next(r);
                                })
                              )
                            );
                        };
                      })(e)
                    );
              })(
                (function $x(e = 0, n, t = w4) {
                  let i = -1;
                  return (
                    null != n && (pv(n) ? (t = n) : (i = n)),
                    new Ae(r => {
                      let o = (function C4(e) {
                        return e instanceof Date && !isNaN(e);
                      })(e)
                        ? +e - t.now()
                        : e;
                      o < 0 && (o = 0);
                      let s = 0;
                      return t.schedule(function () {
                        r.closed ||
                          (r.next(s++),
                          0 <= i ? this.schedule(void 0, i) : r.complete());
                      }, o);
                    })
                  );
                })(d + EG).pipe(We(c)),
                u,
                l
              )
                .pipe(We(c))
                .subscribe(() => {
                  Cl.delete(n),
                    e.run(() => {
                      s(), a.next(), a.complete();
                    });
                });
            }),
            a.asObservable()
          );
        },
        n_ = (e, n, t) => {
          let { direction: i, maxSize: r, dimension: o } = t;
          const { classList: s } = e;
          function a() {
            s.add('collapse'), 'show' === i ? s.add('show') : s.remove('show');
          }
          if (n)
            return (
              r ||
                ((r = (function SG(e, n) {
                  if (typeof navigator > 'u') return '0px';
                  const { classList: t } = e,
                    i = t.contains('show');
                  i || t.add('show'), (e.style[n] = '');
                  const r = e.getBoundingClientRect()[n] + 'px';
                  return i || t.remove('show'), r;
                })(e, o)),
                (t.maxSize = r),
                (e.style[o] = 'show' !== i ? r : '0px'),
                s.remove('collapse'),
                s.remove('collapsing'),
                s.remove('show'),
                Cs(e),
                s.add('collapsing')),
              (e.style[o] = 'show' === i ? r : '0px'),
              () => {
                a(), s.remove('collapsing'), (e.style[o] = '');
              }
            );
          a();
        };
      let Du = (() => {
          class e {
            constructor() {
              this.animation = ET.animation;
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        MG = (() => {
          class e {
            constructor(t) {
              (this._ngbConfig = t), (this.horizontal = !1);
            }
            get animation() {
              return void 0 === this._animation
                ? this._ngbConfig.animation
                : this._animation;
            }
            set animation(t) {
              this._animation = t;
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(x(Du));
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        o_ = (() => {
          class e {
            set collapsed(t) {
              this._isCollapsed !== t &&
                ((this._isCollapsed = t),
                this._afterInit &&
                  this._runTransitionWithEvents(t, this.animation));
            }
            constructor(t, i, r) {
              (this._element = t),
                (this._zone = r),
                (this._afterInit = !1),
                (this._isCollapsed = !1),
                (this.ngbCollapseChange = new H()),
                (this.shown = new H()),
                (this.hidden = new H()),
                (this.animation = i.animation),
                (this.horizontal = i.horizontal);
            }
            ngOnInit() {
              this._runTransition(this._isCollapsed, !1),
                (this._afterInit = !0);
            }
            toggle(t = this._isCollapsed) {
              (this.collapsed = !t),
                this.ngbCollapseChange.next(this._isCollapsed);
            }
            _runTransition(t, i) {
              return an(this._zone, this._element.nativeElement, n_, {
                animation: i,
                runningTransition: 'stop',
                context: {
                  direction: t ? 'hide' : 'show',
                  dimension: this.horizontal ? 'width' : 'height',
                },
              });
            }
            _runTransitionWithEvents(t, i) {
              this._runTransition(t, i).subscribe(() => {
                t ? this.hidden.emit() : this.shown.emit();
              });
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(v(_e), v(MG), v(ae));
            });
            static #t = (this.ɵdir = O({
              type: e,
              selectors: [['', 'ngbCollapse', '']],
              hostVars: 2,
              hostBindings: function (i, r) {
                2 & i && pe('collapse-horizontal', r.horizontal);
              },
              inputs: {
                animation: 'animation',
                collapsed: ['ngbCollapse', 'collapsed'],
                horizontal: 'horizontal',
              },
              outputs: {
                ngbCollapseChange: 'ngbCollapseChange',
                shown: 'shown',
                hidden: 'hidden',
              },
              exportAs: ['ngbCollapse'],
              standalone: !0,
            }));
          }
          return e;
        })(),
        OT = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })(),
        RT = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })(),
        PT = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })(),
        LT = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })();
      var Re = (function (e) {
        return (
          (e[(e.Tab = 9)] = 'Tab'),
          (e[(e.Enter = 13)] = 'Enter'),
          (e[(e.Escape = 27)] = 'Escape'),
          (e[(e.Space = 32)] = 'Space'),
          (e[(e.PageUp = 33)] = 'PageUp'),
          (e[(e.PageDown = 34)] = 'PageDown'),
          (e[(e.End = 35)] = 'End'),
          (e[(e.Home = 36)] = 'Home'),
          (e[(e.ArrowLeft = 37)] = 'ArrowLeft'),
          (e[(e.ArrowUp = 38)] = 'ArrowUp'),
          (e[(e.ArrowRight = 39)] = 'ArrowRight'),
          (e[(e.ArrowDown = 40)] = 'ArrowDown'),
          e
        );
      })(Re || {});
      typeof navigator < 'u' &&
        navigator.userAgent &&
        (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
          (/Macintosh/.test(navigator.userAgent) &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2) ||
          /Android/.test(navigator.userAgent));
      const zT = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[contenteditable]',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ');
      function GT(e) {
        const n = Array.from(e.querySelectorAll(zT)).filter(
          t => -1 !== t.tabIndex
        );
        return [n[0], n[n.length - 1]];
      }
      new Date(1882, 10, 12), new Date(2174, 10, 25);
      let rM = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })(),
        aM = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })();
      class Zr {
        constructor(n, t, i) {
          (this.nodes = n), (this.viewRef = t), (this.componentRef = i);
        }
      }
      let C6 = (() => {
        class e {
          constructor(t, i) {
            (this._el = t), (this._zone = i);
          }
          ngOnInit() {
            this._zone.onStable
              .asObservable()
              .pipe(vt(1))
              .subscribe(() => {
                an(
                  this._zone,
                  this._el.nativeElement,
                  (t, i) => {
                    i && Cs(t), t.classList.add('show');
                  },
                  { animation: this.animation, runningTransition: 'continue' }
                );
              });
          }
          hide() {
            return an(
              this._zone,
              this._el.nativeElement,
              ({ classList: t }) => t.remove('show'),
              { animation: this.animation, runningTransition: 'stop' }
            );
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(v(_e), v(ae));
          });
          static #t = (this.ɵcmp = Je({
            type: e,
            selectors: [['ngb-modal-backdrop']],
            hostAttrs: [2, 'z-index', '1055'],
            hostVars: 6,
            hostBindings: function (i, r) {
              2 & i &&
                (xr(
                  'modal-backdrop' +
                    (r.backdropClass ? ' ' + r.backdropClass : '')
                ),
                pe('show', !r.animation)('fade', r.animation));
            },
            inputs: { animation: 'animation', backdropClass: 'backdropClass' },
            standalone: !0,
            features: [An],
            decls: 0,
            vars: 0,
            template: function (i, r) {},
            encapsulation: 2,
          }));
        }
        return e;
      })();
      class lM {
        update(n) {}
        close(n) {}
        dismiss(n) {}
      }
      const E6 = [
          'animation',
          'ariaLabelledBy',
          'ariaDescribedBy',
          'backdrop',
          'centered',
          'fullscreen',
          'keyboard',
          'scrollable',
          'size',
          'windowClass',
          'modalDialogClass',
        ],
        S6 = ['animation', 'backdropClass'];
      class x6 {
        _applyWindowOptions(n, t) {
          E6.forEach(i => {
            $r(t[i]) && (n[i] = t[i]);
          });
        }
        _applyBackdropOptions(n, t) {
          S6.forEach(i => {
            $r(t[i]) && (n[i] = t[i]);
          });
        }
        update(n) {
          this._applyWindowOptions(this._windowCmptRef.instance, n),
            this._backdropCmptRef &&
              this._backdropCmptRef.instance &&
              this._applyBackdropOptions(this._backdropCmptRef.instance, n);
        }
        get componentInstance() {
          if (this._contentRef && this._contentRef.componentRef)
            return this._contentRef.componentRef.instance;
        }
        get closed() {
          return this._closed.asObservable().pipe(We(this._hidden));
        }
        get dismissed() {
          return this._dismissed.asObservable().pipe(We(this._hidden));
        }
        get hidden() {
          return this._hidden.asObservable();
        }
        get shown() {
          return this._windowCmptRef.instance.shown.asObservable();
        }
        constructor(n, t, i, r) {
          (this._windowCmptRef = n),
            (this._contentRef = t),
            (this._backdropCmptRef = i),
            (this._beforeDismiss = r),
            (this._closed = new Ne()),
            (this._dismissed = new Ne()),
            (this._hidden = new Ne()),
            n.instance.dismissEvent.subscribe(o => {
              this.dismiss(o);
            }),
            (this.result = new Promise((o, s) => {
              (this._resolve = o), (this._reject = s);
            })),
            this.result.then(null, () => {});
        }
        close(n) {
          this._windowCmptRef &&
            (this._closed.next(n),
            this._resolve(n),
            this._removeModalElements());
        }
        _dismiss(n) {
          this._dismissed.next(n), this._reject(n), this._removeModalElements();
        }
        dismiss(n) {
          if (this._windowCmptRef)
            if (this._beforeDismiss) {
              const t = this._beforeDismiss();
              !(function DT(e) {
                return e && e.then;
              })(t)
                ? !1 !== t && this._dismiss(n)
                : t.then(
                    i => {
                      !1 !== i && this._dismiss(n);
                    },
                    () => {}
                  );
            } else this._dismiss(n);
        }
        _removeModalElements() {
          const n = this._windowCmptRef.instance.hide(),
            t = this._backdropCmptRef
              ? this._backdropCmptRef.instance.hide()
              : G(void 0);
          n.subscribe(() => {
            const { nativeElement: i } = this._windowCmptRef.location;
            i.parentNode.removeChild(i),
              this._windowCmptRef.destroy(),
              this._contentRef &&
                this._contentRef.viewRef &&
                this._contentRef.viewRef.destroy(),
              (this._windowCmptRef = null),
              (this._contentRef = null);
          }),
            t.subscribe(() => {
              if (this._backdropCmptRef) {
                const { nativeElement: i } = this._backdropCmptRef.location;
                i.parentNode.removeChild(i),
                  this._backdropCmptRef.destroy(),
                  (this._backdropCmptRef = null);
              }
            }),
            Bg(n, t).subscribe(() => {
              this._hidden.next(), this._hidden.complete();
            });
        }
      }
      var m_ = (function (e) {
        return (
          (e[(e.BACKDROP_CLICK = 0)] = 'BACKDROP_CLICK'),
          (e[(e.ESC = 1)] = 'ESC'),
          e
        );
      })(m_ || {});
      let T6 = (() => {
          class e {
            constructor(t, i, r) {
              (this._document = t),
                (this._elRef = i),
                (this._zone = r),
                (this._closed$ = new Ne()),
                (this._elWithFocus = null),
                (this.backdrop = !0),
                (this.keyboard = !0),
                (this.dismissEvent = new H()),
                (this.shown = new Ne()),
                (this.hidden = new Ne());
            }
            get fullscreenClass() {
              return !0 === this.fullscreen
                ? ' modal-fullscreen'
                : Ur(this.fullscreen)
                ? ` modal-fullscreen-${this.fullscreen}-down`
                : '';
            }
            dismiss(t) {
              this.dismissEvent.emit(t);
            }
            ngOnInit() {
              (this._elWithFocus = this._document.activeElement),
                this._zone.onStable
                  .asObservable()
                  .pipe(vt(1))
                  .subscribe(() => {
                    this._show();
                  });
            }
            ngOnDestroy() {
              this._disableEventHandling();
            }
            hide() {
              const { nativeElement: t } = this._elRef,
                i = { animation: this.animation, runningTransition: 'stop' },
                s = Bg(
                  an(this._zone, t, () => t.classList.remove('show'), i),
                  an(this._zone, this._dialogEl.nativeElement, () => {}, i)
                );
              return (
                s.subscribe(() => {
                  this.hidden.next(), this.hidden.complete();
                }),
                this._disableEventHandling(),
                this._restoreFocus(),
                s
              );
            }
            _show() {
              const t = {
                animation: this.animation,
                runningTransition: 'continue',
              };
              Bg(
                an(
                  this._zone,
                  this._elRef.nativeElement,
                  (o, s) => {
                    s && Cs(o), o.classList.add('show');
                  },
                  t
                ),
                an(this._zone, this._dialogEl.nativeElement, () => {}, t)
              ).subscribe(() => {
                this.shown.next(), this.shown.complete();
              }),
                this._enableEventHandling(),
                this._setFocus();
            }
            _enableEventHandling() {
              const { nativeElement: t } = this._elRef;
              this._zone.runOutsideAngular(() => {
                Tt(t, 'keydown')
                  .pipe(
                    We(this._closed$),
                    it(r => r.which === Re.Escape)
                  )
                  .subscribe(r => {
                    this.keyboard
                      ? requestAnimationFrame(() => {
                          r.defaultPrevented ||
                            this._zone.run(() => this.dismiss(m_.ESC));
                        })
                      : 'static' === this.backdrop && this._bumpBackdrop();
                  });
                let i = !1;
                Tt(this._dialogEl.nativeElement, 'mousedown')
                  .pipe(
                    We(this._closed$),
                    yt(() => (i = !1)),
                    Cn(() => Tt(t, 'mouseup').pipe(We(this._closed$), vt(1))),
                    it(({ target: r }) => t === r)
                  )
                  .subscribe(() => {
                    i = !0;
                  }),
                  Tt(t, 'click')
                    .pipe(We(this._closed$))
                    .subscribe(({ target: r }) => {
                      t === r &&
                        ('static' === this.backdrop
                          ? this._bumpBackdrop()
                          : !0 === this.backdrop &&
                            !i &&
                            this._zone.run(() =>
                              this.dismiss(m_.BACKDROP_CLICK)
                            )),
                        (i = !1);
                    });
              });
            }
            _disableEventHandling() {
              this._closed$.next();
            }
            _setFocus() {
              const { nativeElement: t } = this._elRef;
              if (!t.contains(document.activeElement)) {
                const i = t.querySelector('[ngbAutofocus]'),
                  r = GT(t)[0];
                (i || r || t).focus();
              }
            }
            _restoreFocus() {
              const t = this._document.body,
                i = this._elWithFocus;
              let r;
              (r = i && i.focus && t.contains(i) ? i : t),
                this._zone.runOutsideAngular(() => {
                  setTimeout(() => r.focus()), (this._elWithFocus = null);
                });
            }
            _bumpBackdrop() {
              'static' === this.backdrop &&
                an(
                  this._zone,
                  this._elRef.nativeElement,
                  ({ classList: t }) => (
                    t.add('modal-static'), () => t.remove('modal-static')
                  ),
                  { animation: this.animation, runningTransition: 'continue' }
                );
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(v(je), v(_e), v(ae));
            });
            static #t = (this.ɵcmp = Je({
              type: e,
              selectors: [['ngb-modal-window']],
              viewQuery: function (i, r) {
                if (
                  (1 & i &&
                    (function Ir(e, n, t) {
                      const i = he();
                      i.firstCreatePass &&
                        (d1(i, new a1(e, n, t), -1),
                        2 == (2 & n) && (i.staticViewQueries = !0)),
                        c1(i, C(), n);
                    })(N8, 7),
                  2 & i)
                ) {
                  let o;
                  Te((o = Me())) && (r._dialogEl = o.first);
                }
              },
              hostAttrs: ['role', 'dialog', 'tabindex', '-1'],
              hostVars: 7,
              hostBindings: function (i, r) {
                2 & i &&
                  (ye('aria-modal', !0)('aria-labelledby', r.ariaLabelledBy)(
                    'aria-describedby',
                    r.ariaDescribedBy
                  ),
                  xr(
                    'modal d-block' + (r.windowClass ? ' ' + r.windowClass : '')
                  ),
                  pe('fade', r.animation));
              },
              inputs: {
                animation: 'animation',
                ariaLabelledBy: 'ariaLabelledBy',
                ariaDescribedBy: 'ariaDescribedBy',
                backdrop: 'backdrop',
                centered: 'centered',
                fullscreen: 'fullscreen',
                keyboard: 'keyboard',
                scrollable: 'scrollable',
                size: 'size',
                windowClass: 'windowClass',
                modalDialogClass: 'modalDialogClass',
              },
              outputs: { dismissEvent: 'dismiss' },
              standalone: !0,
              features: [An],
              ngContentSelectors: t8,
              decls: 4,
              vars: 2,
              consts: [
                ['role', 'document'],
                ['dialog', ''],
                [1, 'modal-content'],
              ],
              template: function (i, r) {
                1 & i &&
                  ((function wD(e) {
                    const n = C()[et][Ot];
                    if (!n.projection) {
                      const i = (n.projection = Js(e ? e.length : 1, null)),
                        r = i.slice();
                      let o = n.child;
                      for (; null !== o; ) {
                        const s = e ? _P(o, e) : 0;
                        null !== s &&
                          (r[s] ? (r[s].projectionNext = o) : (i[s] = o),
                          (r[s] = o)),
                          (o = o.next);
                      }
                    }
                  })(),
                  E(0, 'div', 0, 1)(2, 'div', 2),
                  (function CD(e, n = 0, t) {
                    const i = C(),
                      r = he(),
                      o = jo(r, de + e, 16, null, t || null);
                    null === o.projection && (o.projection = n),
                      jf(),
                      (!i[Ei] || mo()) &&
                        32 != (32 & o.flags) &&
                        (function yR(e, n, t) {
                          Sb(
                            n[Q],
                            0,
                            n,
                            t,
                            hh(e, t, n),
                            yb(t.parent || n[Ot], t, n)
                          );
                        })(r, i, o);
                  })(3),
                  S()()),
                  2 & i &&
                    xr(
                      'modal-dialog' +
                        (r.size ? ' modal-' + r.size : '') +
                        (r.centered ? ' modal-dialog-centered' : '') +
                        r.fullscreenClass +
                        (r.scrollable ? ' modal-dialog-scrollable' : '') +
                        (r.modalDialogClass ? ' ' + r.modalDialogClass : '')
                    );
              },
              styles: [
                'ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}\n',
              ],
              encapsulation: 2,
            }));
          }
          return e;
        })(),
        M6 = (() => {
          class e {
            constructor(t) {
              this._document = t;
            }
            hide() {
              const t = Math.abs(
                  window.innerWidth - this._document.documentElement.clientWidth
                ),
                i = this._document.body,
                r = i.style,
                { overflow: o, paddingRight: s } = r;
              if (t > 0) {
                const a = parseFloat(window.getComputedStyle(i).paddingRight);
                r.paddingRight = `${a + t}px`;
              }
              return (
                (r.overflow = 'hidden'),
                () => {
                  t > 0 && (r.paddingRight = s), (r.overflow = o);
                }
              );
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(x(je));
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        I6 = (() => {
          class e {
            constructor(t, i, r, o, s, a, l) {
              (this._applicationRef = t),
                (this._injector = i),
                (this._environmentInjector = r),
                (this._document = o),
                (this._scrollBar = s),
                (this._rendererFactory = a),
                (this._ngZone = l),
                (this._activeWindowCmptHasChanged = new Ne()),
                (this._ariaHiddenValues = new Map()),
                (this._scrollBarRestoreFn = null),
                (this._modalRefs = []),
                (this._windowCmpts = []),
                (this._activeInstances = new H()),
                this._activeWindowCmptHasChanged.subscribe(() => {
                  if (this._windowCmpts.length) {
                    const c = this._windowCmpts[this._windowCmpts.length - 1];
                    ((e, n, t, i = !1) => {
                      e.runOutsideAngular(() => {
                        const r = Tt(n, 'focusin').pipe(
                          We(t),
                          ie(o => o.target)
                        );
                        Tt(n, 'keydown')
                          .pipe(
                            We(t),
                            it(o => o.which === Re.Tab),
                            jg(r)
                          )
                          .subscribe(([o, s]) => {
                            const [a, l] = GT(n);
                            (s === a || s === n) &&
                              o.shiftKey &&
                              (l.focus(), o.preventDefault()),
                              s === l &&
                                !o.shiftKey &&
                                (a.focus(), o.preventDefault());
                          }),
                          i &&
                            Tt(n, 'click')
                              .pipe(
                                We(t),
                                jg(r),
                                ie(o => o[1])
                              )
                              .subscribe(o => o.focus());
                      });
                    })(
                      this._ngZone,
                      c.location.nativeElement,
                      this._activeWindowCmptHasChanged
                    ),
                      this._revertAriaHidden(),
                      this._setAriaHidden(c.location.nativeElement);
                  }
                });
            }
            _restoreScrollBar() {
              const t = this._scrollBarRestoreFn;
              t && ((this._scrollBarRestoreFn = null), t());
            }
            _hideScrollBar() {
              this._scrollBarRestoreFn ||
                (this._scrollBarRestoreFn = this._scrollBar.hide());
            }
            open(t, i, r) {
              const o =
                  r.container instanceof HTMLElement
                    ? r.container
                    : $r(r.container)
                    ? this._document.querySelector(r.container)
                    : this._document.body,
                s = this._rendererFactory.createRenderer(null, null);
              if (!o)
                throw new Error(
                  `The specified modal container "${
                    r.container || 'body'
                  }" was not found in the DOM.`
                );
              this._hideScrollBar();
              const a = new lM(),
                l =
                  (t = r.injector || t).get(Ut, null) ||
                  this._environmentInjector,
                c = this._getContentRef(t, l, i, a, r);
              let d = !1 !== r.backdrop ? this._attachBackdrop(o) : void 0,
                u = this._attachWindowComponent(o, c.nodes),
                f = new x6(u, c, d, r.beforeDismiss);
              return (
                this._registerModalRef(f),
                this._registerWindowCmpt(u),
                f.hidden.pipe(vt(1)).subscribe(() =>
                  Promise.resolve(!0).then(() => {
                    this._modalRefs.length ||
                      (s.removeClass(this._document.body, 'modal-open'),
                      this._restoreScrollBar(),
                      this._revertAriaHidden());
                  })
                ),
                (a.close = h => {
                  f.close(h);
                }),
                (a.dismiss = h => {
                  f.dismiss(h);
                }),
                (a.update = h => {
                  f.update(h);
                }),
                f.update(r),
                1 === this._modalRefs.length &&
                  s.addClass(this._document.body, 'modal-open'),
                d && d.instance && d.changeDetectorRef.detectChanges(),
                u.changeDetectorRef.detectChanges(),
                f
              );
            }
            get activeInstances() {
              return this._activeInstances;
            }
            dismissAll(t) {
              this._modalRefs.forEach(i => i.dismiss(t));
            }
            hasOpenModals() {
              return this._modalRefs.length > 0;
            }
            _attachBackdrop(t) {
              let i = rm(C6, {
                environmentInjector: this._applicationRef.injector,
                elementInjector: this._injector,
              });
              return (
                this._applicationRef.attachView(i.hostView),
                t.appendChild(i.location.nativeElement),
                i
              );
            }
            _attachWindowComponent(t, i) {
              let r = rm(T6, {
                environmentInjector: this._applicationRef.injector,
                elementInjector: this._injector,
                projectableNodes: i,
              });
              return (
                this._applicationRef.attachView(r.hostView),
                t.appendChild(r.location.nativeElement),
                r
              );
            }
            _getContentRef(t, i, r, o, s) {
              return r
                ? r instanceof ze
                  ? this._createFromTemplateRef(r, o)
                  : Ur(r)
                  ? this._createFromString(r)
                  : this._createFromComponent(t, i, r, o, s)
                : new Zr([]);
            }
            _createFromTemplateRef(t, i) {
              const o = t.createEmbeddedView({
                $implicit: i,
                close(s) {
                  i.close(s);
                },
                dismiss(s) {
                  i.dismiss(s);
                },
              });
              return (
                this._applicationRef.attachView(o), new Zr([o.rootNodes], o)
              );
            }
            _createFromString(t) {
              const i = this._document.createTextNode(`${t}`);
              return new Zr([[i]]);
            }
            _createFromComponent(t, i, r, o, s) {
              const l = rm(r, {
                  environmentInjector: i,
                  elementInjector: St.create({
                    providers: [{ provide: lM, useValue: o }],
                    parent: t,
                  }),
                }),
                c = l.location.nativeElement;
              return (
                s.scrollable && c.classList.add('component-host-scrollable'),
                this._applicationRef.attachView(l.hostView),
                new Zr([[c]], l.hostView, l)
              );
            }
            _setAriaHidden(t) {
              const i = t.parentElement;
              i &&
                t !== this._document.body &&
                (Array.from(i.children).forEach(r => {
                  r !== t &&
                    'SCRIPT' !== r.nodeName &&
                    (this._ariaHiddenValues.set(
                      r,
                      r.getAttribute('aria-hidden')
                    ),
                    r.setAttribute('aria-hidden', 'true'));
                }),
                this._setAriaHidden(i));
            }
            _revertAriaHidden() {
              this._ariaHiddenValues.forEach((t, i) => {
                t
                  ? i.setAttribute('aria-hidden', t)
                  : i.removeAttribute('aria-hidden');
              }),
                this._ariaHiddenValues.clear();
            }
            _registerModalRef(t) {
              const i = () => {
                const r = this._modalRefs.indexOf(t);
                r > -1 &&
                  (this._modalRefs.splice(r, 1),
                  this._activeInstances.emit(this._modalRefs));
              };
              this._modalRefs.push(t),
                this._activeInstances.emit(this._modalRefs),
                t.result.then(i, i);
            }
            _registerWindowCmpt(t) {
              this._windowCmpts.push(t),
                this._activeWindowCmptHasChanged.next(),
                t.onDestroy(() => {
                  const i = this._windowCmpts.indexOf(t);
                  i > -1 &&
                    (this._windowCmpts.splice(i, 1),
                    this._activeWindowCmptHasChanged.next());
                });
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(
                x(Ni),
                x(St),
                x(Ut),
                x(je),
                x(M6),
                x(Po),
                x(ae)
              );
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        A6 = (() => {
          class e {
            constructor(t) {
              (this._ngbConfig = t),
                (this.backdrop = !0),
                (this.fullscreen = !1),
                (this.keyboard = !0);
            }
            get animation() {
              return void 0 === this._animation
                ? this._ngbConfig.animation
                : this._animation;
            }
            set animation(t) {
              this._animation = t;
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(x(Du));
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        N6 = (() => {
          class e {
            constructor(t, i, r) {
              (this._injector = t), (this._modalStack = i), (this._config = r);
            }
            open(t, i = {}) {
              const r = {
                ...this._config,
                animation: this._config.animation,
                ...i,
              };
              return this._modalStack.open(this._injector, t, r);
            }
            get activeInstances() {
              return this._modalStack.activeInstances;
            }
            dismissAll(t) {
              this._modalStack.dismissAll(t);
            }
            hasOpenModals() {
              return this._modalStack.hasOpenModals();
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(x(St), x(I6), x(A6));
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        cM = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({ providers: [N6] }));
          }
          return e;
        })(),
        fM = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })(),
        bM = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })(),
        DM = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })(),
        wM = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })(),
        CM = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })(),
        EM = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })(),
        SM = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })(),
        xM = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })(),
        TM = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })();
      new T('live announcer delay', {
        providedIn: 'root',
        factory: function W6() {
          return 100;
        },
      });
      let MM = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })(),
        IM = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })();
      const Z6 = [
        OT,
        RT,
        PT,
        LT,
        rM,
        aM,
        cM,
        fM,
        IM,
        bM,
        DM,
        wM,
        CM,
        EM,
        SM,
        xM,
        TM,
        MM,
      ];
      let Y6 = (() => {
        class e {
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵmod = se({ type: e }));
          static #n = (this.ɵinj = oe({
            imports: [
              Z6,
              OT,
              RT,
              PT,
              LT,
              rM,
              aM,
              cM,
              fM,
              IM,
              bM,
              DM,
              wM,
              CM,
              EM,
              SM,
              xM,
              TM,
              MM,
            ],
          }));
        }
        return e;
      })();
      function K6(e, n) {
        1 & e && (E(0, 'a', 12), $(1, '\u0412\u041e\u0419\u0422\u0418'), S());
      }
      const __ = function () {
        return ['active'];
      };
      let Q6 = (() => {
          class e {
            constructor(t, i) {
              (this.router = t),
                (this.activatedRoute = i),
                (this.isCollapsed = !0),
                (this.isLoginDialogOpen = !1),
                this.router.events
                  .pipe(
                    it(r => r instanceof ki),
                    ie(() => this.activatedRoute),
                    ie(r => {
                      for (; r.firstChild; ) r = r.firstChild;
                      return r;
                    }),
                    it(r => 'primary' === r.outlet)
                  )
                  .subscribe(r => {
                    this.isLoginDialogOpen = r.snapshot.url
                      .join('/')
                      .includes('login');
                  });
            }
            openLoginDialog() {
              this.isLoginDialogOpen = !0;
            }
            closeLoginDialog() {
              this.isLoginDialogOpen = !1;
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(v(rn), v(Pr));
            });
            static #t = (this.ɵcmp = Je({
              type: e,
              selectors: [['app-navbar']],
              decls: 16,
              vars: 9,
              consts: [
                [1, 'container'],
                [1, 'navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light'],
                ['routerLink', '/', 1, 'navbar-brand'],
                [
                  'alt',
                  'Brand Logo',
                  'height',
                  '30',
                  'src',
                  'assets/images/icons/mate_logo.png',
                  'width',
                  '30',
                ],
                [
                  'aria-controls',
                  'navbarNav',
                  'type',
                  'button',
                  1,
                  'navbar-toggler',
                  3,
                  'click',
                ],
                [1, 'navbar-toggler-icon'],
                [
                  'id',
                  'navbarNav',
                  1,
                  'collapse',
                  'navbar-collapse',
                  3,
                  'ngbCollapse',
                ],
                [1, 'navbar-nav'],
                [1, 'nav-item', 3, 'routerLinkActive'],
                ['routerLink', '/menu', 1, 'nav-link'],
                ['routerLink', '/contact', 1, 'nav-link'],
                ['class', 'nav-link', 'routerLink', '/login', 4, 'ngIf'],
                ['routerLink', '/login', 1, 'nav-link'],
              ],
              template: function (i, r) {
                1 & i &&
                  (E(0, 'div', 0)(1, 'nav', 1)(2, 'a', 2),
                  Be(3, 'img', 3),
                  S(),
                  E(4, 'button', 4),
                  X('click', function () {
                    return (r.isCollapsed = !r.isCollapsed);
                  }),
                  Be(5, 'span', 5),
                  S(),
                  E(6, 'div', 6)(7, 'ul', 7)(8, 'li', 8)(9, 'a', 9),
                  $(10, '\u041c\u0415\u041d\u042e'),
                  S()(),
                  E(11, 'li', 8)(12, 'a', 10),
                  $(13, '\u041a\u041e\u041d\u0422\u0410\u041a\u0422\u042b'),
                  S()(),
                  E(14, 'li', 8),
                  L(15, K6, 2, 0, 'a', 11),
                  S()()()()()),
                  2 & i &&
                    (M(4),
                    ye('aria-expanded', !r.isCollapsed),
                    M(2),
                    R('ngbCollapse', r.isCollapsed),
                    M(2),
                    R('routerLinkActive', od(6, __)),
                    M(3),
                    R('routerLinkActive', od(7, __)),
                    M(3),
                    R('routerLinkActive', od(8, __)),
                    M(1),
                    R('ngIf', !r.isLoginDialogOpen));
              },
              dependencies: [Zn, ol, oS, o_],
              styles: [
                '.active[_ngcontent-%COMP%]{background-color:#5d681c;color:#df1212;border-radius:5px;text-align:left}.active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff}.nav-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding-left:10px}',
              ],
            }));
          }
          return e;
        })(),
        J6 = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵcmp = Je({
              type: e,
              selectors: [['app-footer']],
              decls: 10,
              vars: 0,
              consts: [
                [1, 'bg-white', 'text-white', 'py-3'],
                [1, 'container'],
                [1, 'row'],
                [1, 'col-md-4'],
                [1, 'mb-0'],
                ['href', 'tel:88001000750'],
                [1, 'text-muted'],
                [1, 'col-md-8', 'text-right'],
              ],
              template: function (i, r) {
                1 & i &&
                  (E(0, 'footer', 0)(1, 'div', 1)(2, 'div', 2)(3, 'div', 3)(
                    4,
                    'p',
                    4
                  )(5, 'a', 5),
                  $(6, '8 800 1000 750'),
                  S()(),
                  E(7, 'small', 6),
                  $(8, '\xa9 2023 MATE'),
                  S()(),
                  Be(9, 'div', 7),
                  S()()());
              },
            }));
          }
          return e;
        })(),
        X6 = (() => {
          class e {
            constructor() {
              this.title = 'mate';
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵcmp = Je({
              type: e,
              selectors: [['app-root']],
              decls: 10,
              vars: 0,
              consts: [
                [1, 'container'],
                [1, 'row'],
                [1, 'col-12'],
              ],
              template: function (i, r) {
                1 & i &&
                  (E(0, 'div', 0)(1, 'div', 1)(2, 'div', 2),
                  Be(3, 'app-navbar'),
                  S()(),
                  E(4, 'div', 1)(5, 'div', 2),
                  Be(6, 'router-outlet'),
                  S()(),
                  E(7, 'div', 1)(8, 'div', 2),
                  Be(9, 'app-footer'),
                  S()()());
              },
              dependencies: [Qm, Q6, J6],
            }));
          }
          return e;
        })();
      function AM(e) {
        return new b(3e3, !1);
      }
      function ur(e) {
        switch (e.length) {
          case 0:
            return new sl();
          case 1:
            return e[0];
          default:
            return new _S(e);
        }
      }
      function NM(e, n, t = new Map(), i = new Map()) {
        const r = [],
          o = [];
        let s = -1,
          a = null;
        if (
          (n.forEach(l => {
            const c = l.get('offset'),
              d = c == s,
              u = (d && a) || new Map();
            l.forEach((f, h) => {
              let p = h,
                m = f;
              if ('offset' !== h)
                switch (((p = e.normalizePropertyName(p, r)), m)) {
                  case '!':
                    m = t.get(h);
                    break;
                  case Vi:
                    m = i.get(h);
                    break;
                  default:
                    m = e.normalizeStyleValue(h, p, m, r);
                }
              u.set(p, m);
            }),
              d || o.push(u),
              (a = u),
              (s = c);
          }),
          r.length)
        )
          throw (function wW(e) {
            return new b(3502, !1);
          })();
        return o;
      }
      function v_(e, n, t, i) {
        switch (n) {
          case 'start':
            e.onStart(() => i(t && y_(t, 'start', e)));
            break;
          case 'done':
            e.onDone(() => i(t && y_(t, 'done', e)));
            break;
          case 'destroy':
            e.onDestroy(() => i(t && y_(t, 'destroy', e)));
        }
      }
      function y_(e, n, t) {
        const o = b_(
            e.element,
            e.triggerName,
            e.fromState,
            e.toState,
            n || e.phaseName,
            t.totalTime ?? e.totalTime,
            !!t.disabled
          ),
          s = e._data;
        return null != s && (o._data = s), o;
      }
      function b_(e, n, t, i, r = '', o = 0, s) {
        return {
          element: e,
          triggerName: n,
          fromState: t,
          toState: i,
          phaseName: r,
          totalTime: o,
          disabled: !!s,
        };
      }
      function yn(e, n, t) {
        let i = e.get(n);
        return i || e.set(n, (i = t)), i;
      }
      function OM(e) {
        const n = e.indexOf(':');
        return [e.substring(1, n), e.slice(n + 1)];
      }
      const FW = (() =>
        typeof document > 'u' ? null : document.documentElement)();
      function D_(e) {
        const n = e.parentNode || e.host || null;
        return n === FW ? null : n;
      }
      let Yr = null,
        RM = !1;
      function FM(e, n) {
        for (; n; ) {
          if (n === e) return !0;
          n = D_(n);
        }
        return !1;
      }
      function kM(e, n, t) {
        if (t) return Array.from(e.querySelectorAll(n));
        const i = e.querySelector(n);
        return i ? [i] : [];
      }
      let PM = (() => {
          class e {
            validateStyleProperty(t) {
              return (function PW(e) {
                Yr ||
                  ((Yr =
                    (function LW() {
                      return typeof document < 'u' ? document.body : null;
                    })() || {}),
                  (RM = !!Yr.style && 'WebkitAppearance' in Yr.style));
                let n = !0;
                return (
                  Yr.style &&
                    !(function kW(e) {
                      return 'ebkit' == e.substring(1, 6);
                    })(e) &&
                    ((n = e in Yr.style),
                    !n &&
                      RM &&
                      (n =
                        'Webkit' + e.charAt(0).toUpperCase() + e.slice(1) in
                        Yr.style)),
                  n
                );
              })(t);
            }
            matchesElement(t, i) {
              return !1;
            }
            containsElement(t, i) {
              return FM(t, i);
            }
            getParentElement(t) {
              return D_(t);
            }
            query(t, i, r) {
              return kM(t, i, r);
            }
            computeStyle(t, i, r) {
              return r || '';
            }
            animate(t, i, r, o, s, a = [], l) {
              return new sl(r, o);
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        w_ = (() => {
          class e {
            static #e = (this.NOOP = new PM());
          }
          return e;
        })();
      const VW = 1e3,
        C_ = 'ng-enter',
        Fu = 'ng-leave',
        ku = 'ng-trigger',
        Pu = '.ng-trigger',
        VM = 'ng-animating',
        E_ = '.ng-animating';
      function ji(e) {
        if ('number' == typeof e) return e;
        const n = e.match(/^(-?[\.\d]+)(m?s)/);
        return !n || n.length < 2 ? 0 : S_(parseFloat(n[1]), n[2]);
      }
      function S_(e, n) {
        return 's' === n ? e * VW : e;
      }
      function Lu(e, n, t) {
        return e.hasOwnProperty('duration')
          ? e
          : (function jW(e, n, t) {
              let r,
                o = 0,
                s = '';
              if ('string' == typeof e) {
                const a = e.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return n.push(AM()), { duration: 0, delay: 0, easing: '' };
                r = S_(parseFloat(a[1]), a[2]);
                const l = a[3];
                null != l && (o = S_(parseFloat(l), a[4]));
                const c = a[5];
                c && (s = c);
              } else r = e;
              if (!t) {
                let a = !1,
                  l = n.length;
                r < 0 &&
                  (n.push(
                    (function eW() {
                      return new b(3100, !1);
                    })()
                  ),
                  (a = !0)),
                  o < 0 &&
                    (n.push(
                      (function tW() {
                        return new b(3101, !1);
                      })()
                    ),
                    (a = !0)),
                  a && n.splice(l, 0, AM());
              }
              return { duration: r, delay: o, easing: s };
            })(e, n, t);
      }
      function Ml(e, n = {}) {
        return (
          Object.keys(e).forEach(t => {
            n[t] = e[t];
          }),
          n
        );
      }
      function BM(e) {
        const n = new Map();
        return (
          Object.keys(e).forEach(t => {
            n.set(t, e[t]);
          }),
          n
        );
      }
      function fr(e, n = new Map(), t) {
        if (t) for (let [i, r] of t) n.set(i, r);
        for (let [i, r] of e) n.set(i, r);
        return n;
      }
      function _i(e, n, t) {
        n.forEach((i, r) => {
          const o = T_(r);
          t && !t.has(r) && t.set(r, e.style[o]), (e.style[o] = i);
        });
      }
      function Kr(e, n) {
        n.forEach((t, i) => {
          const r = T_(i);
          e.style[r] = '';
        });
      }
      function Il(e) {
        return Array.isArray(e) ? (1 == e.length ? e[0] : gS(e)) : e;
      }
      const x_ = new RegExp('{{\\s*(.+?)\\s*}}', 'g');
      function HM(e) {
        let n = [];
        if ('string' == typeof e) {
          let t;
          for (; (t = x_.exec(e)); ) n.push(t[1]);
          x_.lastIndex = 0;
        }
        return n;
      }
      function Al(e, n, t) {
        const i = e.toString(),
          r = i.replace(x_, (o, s) => {
            let a = n[s];
            return (
              null == a &&
                (t.push(
                  (function iW(e) {
                    return new b(3003, !1);
                  })()
                ),
                (a = '')),
              a.toString()
            );
          });
        return r == i ? e : r;
      }
      function Vu(e) {
        const n = [];
        let t = e.next();
        for (; !t.done; ) n.push(t.value), (t = e.next());
        return n;
      }
      const $W = /-+([a-z0-9])/g;
      function T_(e) {
        return e.replace($W, (...n) => n[1].toUpperCase());
      }
      function bn(e, n, t) {
        switch (n.type) {
          case 7:
            return e.visitTrigger(n, t);
          case 0:
            return e.visitState(n, t);
          case 1:
            return e.visitTransition(n, t);
          case 2:
            return e.visitSequence(n, t);
          case 3:
            return e.visitGroup(n, t);
          case 4:
            return e.visitAnimate(n, t);
          case 5:
            return e.visitKeyframes(n, t);
          case 6:
            return e.visitStyle(n, t);
          case 8:
            return e.visitReference(n, t);
          case 9:
            return e.visitAnimateChild(n, t);
          case 10:
            return e.visitAnimateRef(n, t);
          case 11:
            return e.visitQuery(n, t);
          case 12:
            return e.visitStagger(n, t);
          default:
            throw (function rW(e) {
              return new b(3004, !1);
            })();
        }
      }
      function UM(e, n) {
        return window.getComputedStyle(e)[n];
      }
      const Bu = '*';
      function WW(e, n) {
        const t = [];
        return (
          'string' == typeof e
            ? e.split(/\s*,\s*/).forEach(i =>
                (function qW(e, n, t) {
                  if (':' == e[0]) {
                    const l = (function ZW(e, n) {
                      switch (e) {
                        case ':enter':
                          return 'void => *';
                        case ':leave':
                          return '* => void';
                        case ':increment':
                          return (t, i) => parseFloat(i) > parseFloat(t);
                        case ':decrement':
                          return (t, i) => parseFloat(i) < parseFloat(t);
                        default:
                          return (
                            n.push(
                              (function vW(e) {
                                return new b(3016, !1);
                              })()
                            ),
                            '* => *'
                          );
                      }
                    })(e, t);
                    if ('function' == typeof l) return void n.push(l);
                    e = l;
                  }
                  const i = e.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == i || i.length < 4)
                    return (
                      t.push(
                        (function _W(e) {
                          return new b(3015, !1);
                        })()
                      ),
                      n
                    );
                  const r = i[1],
                    o = i[2],
                    s = i[3];
                  n.push($M(r, s));
                  '<' == o[0] && !(r == Bu && s == Bu) && n.push($M(s, r));
                })(i, t, n)
              )
            : t.push(e),
          t
        );
      }
      const ju = new Set(['true', '1']),
        Hu = new Set(['false', '0']);
      function $M(e, n) {
        const t = ju.has(e) || Hu.has(e),
          i = ju.has(n) || Hu.has(n);
        return (r, o) => {
          let s = e == Bu || e == r,
            a = n == Bu || n == o;
          return (
            !s && t && 'boolean' == typeof r && (s = r ? ju.has(e) : Hu.has(e)),
            !a && i && 'boolean' == typeof o && (a = o ? ju.has(n) : Hu.has(n)),
            s && a
          );
        };
      }
      const YW = new RegExp('s*:selfs*,?', 'g');
      function M_(e, n, t, i) {
        return new KW(e).build(n, t, i);
      }
      class KW {
        constructor(n) {
          this._driver = n;
        }
        build(n, t, i) {
          const r = new XW(t);
          return this._resetContextStyleTimingState(r), bn(this, Il(n), r);
        }
        _resetContextStyleTimingState(n) {
          (n.currentQuerySelector = ''),
            (n.collectedStyles = new Map()),
            n.collectedStyles.set('', new Map()),
            (n.currentTime = 0);
        }
        visitTrigger(n, t) {
          let i = (t.queryCount = 0),
            r = (t.depCount = 0);
          const o = [],
            s = [];
          return (
            '@' == n.name.charAt(0) &&
              t.errors.push(
                (function sW() {
                  return new b(3006, !1);
                })()
              ),
            n.definitions.forEach(a => {
              if ((this._resetContextStyleTimingState(t), 0 == a.type)) {
                const l = a,
                  c = l.name;
                c
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach(d => {
                    (l.name = d), o.push(this.visitState(l, t));
                  }),
                  (l.name = c);
              } else if (1 == a.type) {
                const l = this.visitTransition(a, t);
                (i += l.queryCount), (r += l.depCount), s.push(l);
              } else
                t.errors.push(
                  (function aW() {
                    return new b(3007, !1);
                  })()
                );
            }),
            {
              type: 7,
              name: n.name,
              states: o,
              transitions: s,
              queryCount: i,
              depCount: r,
              options: null,
            }
          );
        }
        visitState(n, t) {
          const i = this.visitStyle(n.styles, t),
            r = (n.options && n.options.params) || null;
          if (i.containsDynamicStyles) {
            const o = new Set(),
              s = r || {};
            i.styles.forEach(a => {
              a instanceof Map &&
                a.forEach(l => {
                  HM(l).forEach(c => {
                    s.hasOwnProperty(c) || o.add(c);
                  });
                });
            }),
              o.size &&
                (Vu(o.values()),
                t.errors.push(
                  (function lW(e, n) {
                    return new b(3008, !1);
                  })()
                ));
          }
          return {
            type: 0,
            name: n.name,
            style: i,
            options: r ? { params: r } : null,
          };
        }
        visitTransition(n, t) {
          (t.queryCount = 0), (t.depCount = 0);
          const i = bn(this, Il(n.animation), t);
          return {
            type: 1,
            matchers: WW(n.expr, t.errors),
            animation: i,
            queryCount: t.queryCount,
            depCount: t.depCount,
            options: Qr(n.options),
          };
        }
        visitSequence(n, t) {
          return {
            type: 2,
            steps: n.steps.map(i => bn(this, i, t)),
            options: Qr(n.options),
          };
        }
        visitGroup(n, t) {
          const i = t.currentTime;
          let r = 0;
          const o = n.steps.map(s => {
            t.currentTime = i;
            const a = bn(this, s, t);
            return (r = Math.max(r, t.currentTime)), a;
          });
          return (
            (t.currentTime = r), { type: 3, steps: o, options: Qr(n.options) }
          );
        }
        visitAnimate(n, t) {
          const i = (function tq(e, n) {
            if (e.hasOwnProperty('duration')) return e;
            if ('number' == typeof e) return I_(Lu(e, n).duration, 0, '');
            const t = e;
            if (
              t.split(/\s+/).some(o => '{' == o.charAt(0) && '{' == o.charAt(1))
            ) {
              const o = I_(0, 0, '');
              return (o.dynamic = !0), (o.strValue = t), o;
            }
            const r = Lu(t, n);
            return I_(r.duration, r.delay, r.easing);
          })(n.timings, t.errors);
          t.currentAnimateTimings = i;
          let r,
            o = n.styles ? n.styles : ir({});
          if (5 == o.type) r = this.visitKeyframes(o, t);
          else {
            let s = n.styles,
              a = !1;
            if (!s) {
              a = !0;
              const c = {};
              i.easing && (c.easing = i.easing), (s = ir(c));
            }
            t.currentTime += i.duration + i.delay;
            const l = this.visitStyle(s, t);
            (l.isEmptyStep = a), (r = l);
          }
          return (
            (t.currentAnimateTimings = null),
            { type: 4, timings: i, style: r, options: null }
          );
        }
        visitStyle(n, t) {
          const i = this._makeStyleAst(n, t);
          return this._validateStyleAst(i, t), i;
        }
        _makeStyleAst(n, t) {
          const i = [],
            r = Array.isArray(n.styles) ? n.styles : [n.styles];
          for (let a of r)
            'string' == typeof a
              ? a === Vi
                ? i.push(a)
                : t.errors.push(new b(3002, !1))
              : i.push(BM(a));
          let o = !1,
            s = null;
          return (
            i.forEach(a => {
              if (
                a instanceof Map &&
                (a.has('easing') && ((s = a.get('easing')), a.delete('easing')),
                !o)
              )
                for (let l of a.values())
                  if (l.toString().indexOf('{{') >= 0) {
                    o = !0;
                    break;
                  }
            }),
            {
              type: 6,
              styles: i,
              easing: s,
              offset: n.offset,
              containsDynamicStyles: o,
              options: null,
            }
          );
        }
        _validateStyleAst(n, t) {
          const i = t.currentAnimateTimings;
          let r = t.currentTime,
            o = t.currentTime;
          i && o > 0 && (o -= i.duration + i.delay),
            n.styles.forEach(s => {
              'string' != typeof s &&
                s.forEach((a, l) => {
                  const c = t.collectedStyles.get(t.currentQuerySelector),
                    d = c.get(l);
                  let u = !0;
                  d &&
                    (o != r &&
                      o >= d.startTime &&
                      r <= d.endTime &&
                      (t.errors.push(
                        (function dW(e, n, t, i, r) {
                          return new b(3010, !1);
                        })()
                      ),
                      (u = !1)),
                    (o = d.startTime)),
                    u && c.set(l, { startTime: o, endTime: r }),
                    t.options &&
                      (function UW(e, n, t) {
                        const i = n.params || {},
                          r = HM(e);
                        r.length &&
                          r.forEach(o => {
                            i.hasOwnProperty(o) ||
                              t.push(
                                (function nW(e) {
                                  return new b(3001, !1);
                                })()
                              );
                          });
                      })(a, t.options, t.errors);
                });
            });
        }
        visitKeyframes(n, t) {
          const i = { type: 5, styles: [], options: null };
          if (!t.currentAnimateTimings)
            return (
              t.errors.push(
                (function uW() {
                  return new b(3011, !1);
                })()
              ),
              i
            );
          let o = 0;
          const s = [];
          let a = !1,
            l = !1,
            c = 0;
          const d = n.steps.map(y => {
            const _ = this._makeStyleAst(y, t);
            let D =
                null != _.offset
                  ? _.offset
                  : (function eq(e) {
                      if ('string' == typeof e) return null;
                      let n = null;
                      if (Array.isArray(e))
                        e.forEach(t => {
                          if (t instanceof Map && t.has('offset')) {
                            const i = t;
                            (n = parseFloat(i.get('offset'))),
                              i.delete('offset');
                          }
                        });
                      else if (e instanceof Map && e.has('offset')) {
                        const t = e;
                        (n = parseFloat(t.get('offset'))), t.delete('offset');
                      }
                      return n;
                    })(_.styles),
              w = 0;
            return (
              null != D && (o++, (w = _.offset = D)),
              (l = l || w < 0 || w > 1),
              (a = a || w < c),
              (c = w),
              s.push(w),
              _
            );
          });
          l &&
            t.errors.push(
              (function fW() {
                return new b(3012, !1);
              })()
            ),
            a &&
              t.errors.push(
                (function hW() {
                  return new b(3200, !1);
                })()
              );
          const u = n.steps.length;
          let f = 0;
          o > 0 && o < u
            ? t.errors.push(
                (function pW() {
                  return new b(3202, !1);
                })()
              )
            : 0 == o && (f = 1 / (u - 1));
          const h = u - 1,
            p = t.currentTime,
            m = t.currentAnimateTimings,
            g = m.duration;
          return (
            d.forEach((y, _) => {
              const D = f > 0 ? (_ == h ? 1 : f * _) : s[_],
                w = D * g;
              (t.currentTime = p + m.delay + w),
                (m.duration = w),
                this._validateStyleAst(y, t),
                (y.offset = D),
                i.styles.push(y);
            }),
            i
          );
        }
        visitReference(n, t) {
          return {
            type: 8,
            animation: bn(this, Il(n.animation), t),
            options: Qr(n.options),
          };
        }
        visitAnimateChild(n, t) {
          return t.depCount++, { type: 9, options: Qr(n.options) };
        }
        visitAnimateRef(n, t) {
          return {
            type: 10,
            animation: this.visitReference(n.animation, t),
            options: Qr(n.options),
          };
        }
        visitQuery(n, t) {
          const i = t.currentQuerySelector,
            r = n.options || {};
          t.queryCount++, (t.currentQuery = n);
          const [o, s] = (function QW(e) {
            const n = !!e.split(/\s*,\s*/).find(t => ':self' == t);
            return (
              n && (e = e.replace(YW, '')),
              (e = e
                .replace(/@\*/g, Pu)
                .replace(/@\w+/g, t => Pu + '-' + t.slice(1))
                .replace(/:animating/g, E_)),
              [e, n]
            );
          })(n.selector);
          (t.currentQuerySelector = i.length ? i + ' ' + o : o),
            yn(t.collectedStyles, t.currentQuerySelector, new Map());
          const a = bn(this, Il(n.animation), t);
          return (
            (t.currentQuery = null),
            (t.currentQuerySelector = i),
            {
              type: 11,
              selector: o,
              limit: r.limit || 0,
              optional: !!r.optional,
              includeSelf: s,
              animation: a,
              originalSelector: n.selector,
              options: Qr(n.options),
            }
          );
        }
        visitStagger(n, t) {
          t.currentQuery ||
            t.errors.push(
              (function mW() {
                return new b(3013, !1);
              })()
            );
          const i =
            'full' === n.timings
              ? { duration: 0, delay: 0, easing: 'full' }
              : Lu(n.timings, t.errors, !0);
          return {
            type: 12,
            animation: bn(this, Il(n.animation), t),
            timings: i,
            options: null,
          };
        }
      }
      class XW {
        constructor(n) {
          (this.errors = n),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = new Map()),
            (this.options = null),
            (this.unsupportedCSSPropertiesFound = new Set());
        }
      }
      function Qr(e) {
        return (
          e
            ? (e = Ml(e)).params &&
              (e.params = (function JW(e) {
                return e ? Ml(e) : null;
              })(e.params))
            : (e = {}),
          e
        );
      }
      function I_(e, n, t) {
        return { duration: e, delay: n, easing: t };
      }
      function A_(e, n, t, i, r, o, s = null, a = !1) {
        return {
          type: 1,
          element: e,
          keyframes: n,
          preStyleProps: t,
          postStyleProps: i,
          duration: r,
          delay: o,
          totalTime: r + o,
          easing: s,
          subTimeline: a,
        };
      }
      class Uu {
        constructor() {
          this._map = new Map();
        }
        get(n) {
          return this._map.get(n) || [];
        }
        append(n, t) {
          let i = this._map.get(n);
          i || this._map.set(n, (i = [])), i.push(...t);
        }
        has(n) {
          return this._map.has(n);
        }
        clear() {
          this._map.clear();
        }
      }
      const rq = new RegExp(':enter', 'g'),
        sq = new RegExp(':leave', 'g');
      function N_(e, n, t, i, r, o = new Map(), s = new Map(), a, l, c = []) {
        return new aq().buildKeyframes(e, n, t, i, r, o, s, a, l, c);
      }
      class aq {
        buildKeyframes(n, t, i, r, o, s, a, l, c, d = []) {
          c = c || new Uu();
          const u = new O_(n, t, c, r, o, d, []);
          u.options = l;
          const f = l.delay ? ji(l.delay) : 0;
          u.currentTimeline.delayNextStep(f),
            u.currentTimeline.setStyles([s], null, u.errors, l),
            bn(this, i, u);
          const h = u.timelines.filter(p => p.containsAnimation());
          if (h.length && a.size) {
            let p;
            for (let m = h.length - 1; m >= 0; m--) {
              const g = h[m];
              if (g.element === t) {
                p = g;
                break;
              }
            }
            p &&
              !p.allowOnlyTimelineStyles() &&
              p.setStyles([a], null, u.errors, l);
          }
          return h.length
            ? h.map(p => p.buildKeyframes())
            : [A_(t, [], [], [], 0, f, '', !1)];
        }
        visitTrigger(n, t) {}
        visitState(n, t) {}
        visitTransition(n, t) {}
        visitAnimateChild(n, t) {
          const i = t.subInstructions.get(t.element);
          if (i) {
            const r = t.createSubContext(n.options),
              o = t.currentTimeline.currentTime,
              s = this._visitSubInstructions(i, r, r.options);
            o != s && t.transformIntoNewTimeline(s);
          }
          t.previousNode = n;
        }
        visitAnimateRef(n, t) {
          const i = t.createSubContext(n.options);
          i.transformIntoNewTimeline(),
            this._applyAnimationRefDelays(
              [n.options, n.animation.options],
              t,
              i
            ),
            this.visitReference(n.animation, i),
            t.transformIntoNewTimeline(i.currentTimeline.currentTime),
            (t.previousNode = n);
        }
        _applyAnimationRefDelays(n, t, i) {
          for (const r of n) {
            const o = r?.delay;
            if (o) {
              const s =
                'number' == typeof o ? o : ji(Al(o, r?.params ?? {}, t.errors));
              i.delayNextStep(s);
            }
          }
        }
        _visitSubInstructions(n, t, i) {
          let o = t.currentTimeline.currentTime;
          const s = null != i.duration ? ji(i.duration) : null,
            a = null != i.delay ? ji(i.delay) : null;
          return (
            0 !== s &&
              n.forEach(l => {
                const c = t.appendInstructionToTimeline(l, s, a);
                o = Math.max(o, c.duration + c.delay);
              }),
            o
          );
        }
        visitReference(n, t) {
          t.updateOptions(n.options, !0),
            bn(this, n.animation, t),
            (t.previousNode = n);
        }
        visitSequence(n, t) {
          const i = t.subContextCount;
          let r = t;
          const o = n.options;
          if (
            o &&
            (o.params || o.delay) &&
            ((r = t.createSubContext(o)),
            r.transformIntoNewTimeline(),
            null != o.delay)
          ) {
            6 == r.previousNode.type &&
              (r.currentTimeline.snapshotCurrentStyles(),
              (r.previousNode = $u));
            const s = ji(o.delay);
            r.delayNextStep(s);
          }
          n.steps.length &&
            (n.steps.forEach(s => bn(this, s, r)),
            r.currentTimeline.applyStylesToKeyframe(),
            r.subContextCount > i && r.transformIntoNewTimeline()),
            (t.previousNode = n);
        }
        visitGroup(n, t) {
          const i = [];
          let r = t.currentTimeline.currentTime;
          const o = n.options && n.options.delay ? ji(n.options.delay) : 0;
          n.steps.forEach(s => {
            const a = t.createSubContext(n.options);
            o && a.delayNextStep(o),
              bn(this, s, a),
              (r = Math.max(r, a.currentTimeline.currentTime)),
              i.push(a.currentTimeline);
          }),
            i.forEach(s => t.currentTimeline.mergeTimelineCollectedStyles(s)),
            t.transformIntoNewTimeline(r),
            (t.previousNode = n);
        }
        _visitTiming(n, t) {
          if (n.dynamic) {
            const i = n.strValue;
            return Lu(t.params ? Al(i, t.params, t.errors) : i, t.errors);
          }
          return { duration: n.duration, delay: n.delay, easing: n.easing };
        }
        visitAnimate(n, t) {
          const i = (t.currentAnimateTimings = this._visitTiming(n.timings, t)),
            r = t.currentTimeline;
          i.delay && (t.incrementTime(i.delay), r.snapshotCurrentStyles());
          const o = n.style;
          5 == o.type
            ? this.visitKeyframes(o, t)
            : (t.incrementTime(i.duration),
              this.visitStyle(o, t),
              r.applyStylesToKeyframe()),
            (t.currentAnimateTimings = null),
            (t.previousNode = n);
        }
        visitStyle(n, t) {
          const i = t.currentTimeline,
            r = t.currentAnimateTimings;
          !r && i.hasCurrentStyleProperties() && i.forwardFrame();
          const o = (r && r.easing) || n.easing;
          n.isEmptyStep
            ? i.applyEmptyStep(o)
            : i.setStyles(n.styles, o, t.errors, t.options),
            (t.previousNode = n);
        }
        visitKeyframes(n, t) {
          const i = t.currentAnimateTimings,
            r = t.currentTimeline.duration,
            o = i.duration,
            a = t.createSubContext().currentTimeline;
          (a.easing = i.easing),
            n.styles.forEach(l => {
              a.forwardTime((l.offset || 0) * o),
                a.setStyles(l.styles, l.easing, t.errors, t.options),
                a.applyStylesToKeyframe();
            }),
            t.currentTimeline.mergeTimelineCollectedStyles(a),
            t.transformIntoNewTimeline(r + o),
            (t.previousNode = n);
        }
        visitQuery(n, t) {
          const i = t.currentTimeline.currentTime,
            r = n.options || {},
            o = r.delay ? ji(r.delay) : 0;
          o &&
            (6 === t.previousNode.type ||
              (0 == i && t.currentTimeline.hasCurrentStyleProperties())) &&
            (t.currentTimeline.snapshotCurrentStyles(), (t.previousNode = $u));
          let s = i;
          const a = t.invokeQuery(
            n.selector,
            n.originalSelector,
            n.limit,
            n.includeSelf,
            !!r.optional,
            t.errors
          );
          t.currentQueryTotal = a.length;
          let l = null;
          a.forEach((c, d) => {
            t.currentQueryIndex = d;
            const u = t.createSubContext(n.options, c);
            o && u.delayNextStep(o),
              c === t.element && (l = u.currentTimeline),
              bn(this, n.animation, u),
              u.currentTimeline.applyStylesToKeyframe(),
              (s = Math.max(s, u.currentTimeline.currentTime));
          }),
            (t.currentQueryIndex = 0),
            (t.currentQueryTotal = 0),
            t.transformIntoNewTimeline(s),
            l &&
              (t.currentTimeline.mergeTimelineCollectedStyles(l),
              t.currentTimeline.snapshotCurrentStyles()),
            (t.previousNode = n);
        }
        visitStagger(n, t) {
          const i = t.parentContext,
            r = t.currentTimeline,
            o = n.timings,
            s = Math.abs(o.duration),
            a = s * (t.currentQueryTotal - 1);
          let l = s * t.currentQueryIndex;
          switch (o.duration < 0 ? 'reverse' : o.easing) {
            case 'reverse':
              l = a - l;
              break;
            case 'full':
              l = i.currentStaggerTime;
          }
          const d = t.currentTimeline;
          l && d.delayNextStep(l);
          const u = d.currentTime;
          bn(this, n.animation, t),
            (t.previousNode = n),
            (i.currentStaggerTime =
              r.currentTime - u + (r.startTime - i.currentTimeline.startTime));
        }
      }
      const $u = {};
      class O_ {
        constructor(n, t, i, r, o, s, a, l) {
          (this._driver = n),
            (this.element = t),
            (this.subInstructions = i),
            (this._enterClassName = r),
            (this._leaveClassName = o),
            (this.errors = s),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = $u),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new zu(this._driver, t, 0)),
            a.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(n, t) {
          if (!n) return;
          const i = n;
          let r = this.options;
          null != i.duration && (r.duration = ji(i.duration)),
            null != i.delay && (r.delay = ji(i.delay));
          const o = i.params;
          if (o) {
            let s = r.params;
            s || (s = this.options.params = {}),
              Object.keys(o).forEach(a => {
                (!t || !s.hasOwnProperty(a)) &&
                  (s[a] = Al(o[a], s, this.errors));
              });
          }
        }
        _copyOptions() {
          const n = {};
          if (this.options) {
            const t = this.options.params;
            if (t) {
              const i = (n.params = {});
              Object.keys(t).forEach(r => {
                i[r] = t[r];
              });
            }
          }
          return n;
        }
        createSubContext(n = null, t, i) {
          const r = t || this.element,
            o = new O_(
              this._driver,
              r,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(r, i || 0)
            );
          return (
            (o.previousNode = this.previousNode),
            (o.currentAnimateTimings = this.currentAnimateTimings),
            (o.options = this._copyOptions()),
            o.updateOptions(n),
            (o.currentQueryIndex = this.currentQueryIndex),
            (o.currentQueryTotal = this.currentQueryTotal),
            (o.parentContext = this),
            this.subContextCount++,
            o
          );
        }
        transformIntoNewTimeline(n) {
          return (
            (this.previousNode = $u),
            (this.currentTimeline = this.currentTimeline.fork(this.element, n)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(n, t, i) {
          const r = {
              duration: t ?? n.duration,
              delay: this.currentTimeline.currentTime + (i ?? 0) + n.delay,
              easing: '',
            },
            o = new lq(
              this._driver,
              n.element,
              n.keyframes,
              n.preStyleProps,
              n.postStyleProps,
              r,
              n.stretchStartingKeyframe
            );
          return this.timelines.push(o), r;
        }
        incrementTime(n) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + n);
        }
        delayNextStep(n) {
          n > 0 && this.currentTimeline.delayNextStep(n);
        }
        invokeQuery(n, t, i, r, o, s) {
          let a = [];
          if ((r && a.push(this.element), n.length > 0)) {
            n = (n = n.replace(rq, '.' + this._enterClassName)).replace(
              sq,
              '.' + this._leaveClassName
            );
            let c = this._driver.query(this.element, n, 1 != i);
            0 !== i &&
              (c = i < 0 ? c.slice(c.length + i, c.length) : c.slice(0, i)),
              a.push(...c);
          }
          return (
            !o &&
              0 == a.length &&
              s.push(
                (function gW(e) {
                  return new b(3014, !1);
                })()
              ),
            a
          );
        }
      }
      class zu {
        constructor(n, t, i, r) {
          (this._driver = n),
            (this.element = t),
            (this.startTime = i),
            (this._elementTimelineStylesLookup = r),
            (this.duration = 0),
            (this.easing = null),
            (this._previousKeyframe = new Map()),
            (this._currentKeyframe = new Map()),
            (this._keyframes = new Map()),
            (this._styleSummary = new Map()),
            (this._localTimelineStyles = new Map()),
            (this._pendingStyles = new Map()),
            (this._backFill = new Map()),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(t)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                t,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.hasCurrentStyleProperties();
            default:
              return !0;
          }
        }
        hasCurrentStyleProperties() {
          return this._currentKeyframe.size > 0;
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(n) {
          const t = 1 === this._keyframes.size && this._pendingStyles.size;
          this.duration || t
            ? (this.forwardTime(this.currentTime + n),
              t && this.snapshotCurrentStyles())
            : (this.startTime += n);
        }
        fork(n, t) {
          return (
            this.applyStylesToKeyframe(),
            new zu(
              this._driver,
              n,
              t || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = new Map()),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(n) {
          this.applyStylesToKeyframe(),
            (this.duration = n),
            this._loadKeyframe();
        }
        _updateStyle(n, t) {
          this._localTimelineStyles.set(n, t),
            this._globalTimelineStyles.set(n, t),
            this._styleSummary.set(n, { time: this.currentTime, value: t });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(n) {
          n && this._previousKeyframe.set('easing', n);
          for (let [t, i] of this._globalTimelineStyles)
            this._backFill.set(t, i || Vi), this._currentKeyframe.set(t, Vi);
          this._currentEmptyStepKeyframe = this._currentKeyframe;
        }
        setStyles(n, t, i, r) {
          t && this._previousKeyframe.set('easing', t);
          const o = (r && r.params) || {},
            s = (function cq(e, n) {
              const t = new Map();
              let i;
              return (
                e.forEach(r => {
                  if ('*' === r) {
                    i = i || n.keys();
                    for (let o of i) t.set(o, Vi);
                  } else fr(r, t);
                }),
                t
              );
            })(n, this._globalTimelineStyles);
          for (let [a, l] of s) {
            const c = Al(l, o, i);
            this._pendingStyles.set(a, c),
              this._localTimelineStyles.has(a) ||
                this._backFill.set(a, this._globalTimelineStyles.get(a) ?? Vi),
              this._updateStyle(a, c);
          }
        }
        applyStylesToKeyframe() {
          0 != this._pendingStyles.size &&
            (this._pendingStyles.forEach((n, t) => {
              this._currentKeyframe.set(t, n);
            }),
            this._pendingStyles.clear(),
            this._localTimelineStyles.forEach((n, t) => {
              this._currentKeyframe.has(t) || this._currentKeyframe.set(t, n);
            }));
        }
        snapshotCurrentStyles() {
          for (let [n, t] of this._localTimelineStyles)
            this._pendingStyles.set(n, t), this._updateStyle(n, t);
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const n = [];
          for (let t in this._currentKeyframe) n.push(t);
          return n;
        }
        mergeTimelineCollectedStyles(n) {
          n._styleSummary.forEach((t, i) => {
            const r = this._styleSummary.get(i);
            (!r || t.time > r.time) && this._updateStyle(i, t.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const n = new Set(),
            t = new Set(),
            i = 1 === this._keyframes.size && 0 === this.duration;
          let r = [];
          this._keyframes.forEach((a, l) => {
            const c = fr(a, new Map(), this._backFill);
            c.forEach((d, u) => {
              '!' === d ? n.add(u) : d === Vi && t.add(u);
            }),
              i || c.set('offset', l / this.duration),
              r.push(c);
          });
          const o = n.size ? Vu(n.values()) : [],
            s = t.size ? Vu(t.values()) : [];
          if (i) {
            const a = r[0],
              l = new Map(a);
            a.set('offset', 0), l.set('offset', 1), (r = [a, l]);
          }
          return A_(
            this.element,
            r,
            o,
            s,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class lq extends zu {
        constructor(n, t, i, r, o, s, a = !1) {
          super(n, t, s.delay),
            (this.keyframes = i),
            (this.preStyleProps = r),
            (this.postStyleProps = o),
            (this._stretchStartingKeyframe = a),
            (this.timings = {
              duration: s.duration,
              delay: s.delay,
              easing: s.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let n = this.keyframes,
            { delay: t, duration: i, easing: r } = this.timings;
          if (this._stretchStartingKeyframe && t) {
            const o = [],
              s = i + t,
              a = t / s,
              l = fr(n[0]);
            l.set('offset', 0), o.push(l);
            const c = fr(n[0]);
            c.set('offset', WM(a)), o.push(c);
            const d = n.length - 1;
            for (let u = 1; u <= d; u++) {
              let f = fr(n[u]);
              const h = f.get('offset');
              f.set('offset', WM((t + h * i) / s)), o.push(f);
            }
            (i = s), (t = 0), (r = ''), (n = o);
          }
          return A_(
            this.element,
            n,
            this.preStyleProps,
            this.postStyleProps,
            i,
            t,
            r,
            !0
          );
        }
      }
      function WM(e, n = 3) {
        const t = Math.pow(10, n - 1);
        return Math.round(e * t) / t;
      }
      class R_ {}
      const dq = new Set([
        'width',
        'height',
        'minWidth',
        'minHeight',
        'maxWidth',
        'maxHeight',
        'left',
        'top',
        'bottom',
        'right',
        'fontSize',
        'outlineWidth',
        'outlineOffset',
        'paddingTop',
        'paddingLeft',
        'paddingBottom',
        'paddingRight',
        'marginTop',
        'marginLeft',
        'marginBottom',
        'marginRight',
        'borderRadius',
        'borderWidth',
        'borderTopWidth',
        'borderLeftWidth',
        'borderRightWidth',
        'borderBottomWidth',
        'textIndent',
        'perspective',
      ]);
      class uq extends R_ {
        normalizePropertyName(n, t) {
          return T_(n);
        }
        normalizeStyleValue(n, t, i, r) {
          let o = '';
          const s = i.toString().trim();
          if (dq.has(t) && 0 !== i && '0' !== i)
            if ('number' == typeof i) o = 'px';
            else {
              const a = i.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                r.push(
                  (function oW(e, n) {
                    return new b(3005, !1);
                  })()
                );
            }
          return s + o;
        }
      }
      function qM(e, n, t, i, r, o, s, a, l, c, d, u, f) {
        return {
          type: 0,
          element: e,
          triggerName: n,
          isRemovalTransition: r,
          fromState: t,
          fromStyles: o,
          toState: i,
          toStyles: s,
          timelines: a,
          queriedElements: l,
          preStyleProps: c,
          postStyleProps: d,
          totalTime: u,
          errors: f,
        };
      }
      const F_ = {};
      class ZM {
        constructor(n, t, i) {
          (this._triggerName = n), (this.ast = t), (this._stateStyles = i);
        }
        match(n, t, i, r) {
          return (function fq(e, n, t, i, r) {
            return e.some(o => o(n, t, i, r));
          })(this.ast.matchers, n, t, i, r);
        }
        buildStyles(n, t, i) {
          let r = this._stateStyles.get('*');
          return (
            void 0 !== n && (r = this._stateStyles.get(n?.toString()) || r),
            r ? r.buildStyles(t, i) : new Map()
          );
        }
        build(n, t, i, r, o, s, a, l, c, d) {
          const u = [],
            f = (this.ast.options && this.ast.options.params) || F_,
            p = this.buildStyles(i, (a && a.params) || F_, u),
            m = (l && l.params) || F_,
            g = this.buildStyles(r, m, u),
            y = new Set(),
            _ = new Map(),
            D = new Map(),
            w = 'void' === r,
            F = { params: hq(m, f), delay: this.ast.options?.delay },
            j = d ? [] : N_(n, t, this.ast.animation, o, s, p, g, F, c, u);
          let z = 0;
          if (
            (j.forEach(ve => {
              z = Math.max(ve.duration + ve.delay, z);
            }),
            u.length)
          )
            return qM(t, this._triggerName, i, r, w, p, g, [], [], _, D, z, u);
          j.forEach(ve => {
            const we = ve.element,
              rt = yn(_, we, new Set());
            ve.preStyleProps.forEach(qe => rt.add(qe));
            const At = yn(D, we, new Set());
            ve.postStyleProps.forEach(qe => At.add(qe)), we !== t && y.add(we);
          });
          const ee = Vu(y.values());
          return qM(t, this._triggerName, i, r, w, p, g, j, ee, _, D, z);
        }
      }
      function hq(e, n) {
        const t = Ml(n);
        for (const i in e) e.hasOwnProperty(i) && null != e[i] && (t[i] = e[i]);
        return t;
      }
      class pq {
        constructor(n, t, i) {
          (this.styles = n), (this.defaultParams = t), (this.normalizer = i);
        }
        buildStyles(n, t) {
          const i = new Map(),
            r = Ml(this.defaultParams);
          return (
            Object.keys(n).forEach(o => {
              const s = n[o];
              null !== s && (r[o] = s);
            }),
            this.styles.styles.forEach(o => {
              'string' != typeof o &&
                o.forEach((s, a) => {
                  s && (s = Al(s, r, t));
                  const l = this.normalizer.normalizePropertyName(a, t);
                  (s = this.normalizer.normalizeStyleValue(a, l, s, t)),
                    i.set(a, s);
                });
            }),
            i
          );
        }
      }
      class gq {
        constructor(n, t, i) {
          (this.name = n),
            (this.ast = t),
            (this._normalizer = i),
            (this.transitionFactories = []),
            (this.states = new Map()),
            t.states.forEach(r => {
              this.states.set(
                r.name,
                new pq(r.style, (r.options && r.options.params) || {}, i)
              );
            }),
            YM(this.states, 'true', '1'),
            YM(this.states, 'false', '0'),
            t.transitions.forEach(r => {
              this.transitionFactories.push(new ZM(n, r, this.states));
            }),
            (this.fallbackTransition = (function _q(e, n, t) {
              return new ZM(
                e,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(s, a) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                n
              );
            })(n, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(n, t, i, r) {
          return (
            this.transitionFactories.find(s => s.match(n, t, i, r)) || null
          );
        }
        matchStyles(n, t, i) {
          return this.fallbackTransition.buildStyles(n, t, i);
        }
      }
      function YM(e, n, t) {
        e.has(n)
          ? e.has(t) || e.set(t, e.get(n))
          : e.has(t) && e.set(n, e.get(t));
      }
      const vq = new Uu();
      class yq {
        constructor(n, t, i) {
          (this.bodyNode = n),
            (this._driver = t),
            (this._normalizer = i),
            (this._animations = new Map()),
            (this._playersById = new Map()),
            (this.players = []);
        }
        register(n, t) {
          const i = [],
            o = M_(this._driver, t, i, []);
          if (i.length)
            throw (function CW(e) {
              return new b(3503, !1);
            })();
          this._animations.set(n, o);
        }
        _buildPlayer(n, t, i) {
          const r = n.element,
            o = NM(this._normalizer, n.keyframes, t, i);
          return this._driver.animate(
            r,
            o,
            n.duration,
            n.delay,
            n.easing,
            [],
            !0
          );
        }
        create(n, t, i = {}) {
          const r = [],
            o = this._animations.get(n);
          let s;
          const a = new Map();
          if (
            (o
              ? ((s = N_(
                  this._driver,
                  t,
                  o,
                  C_,
                  Fu,
                  new Map(),
                  new Map(),
                  i,
                  vq,
                  r
                )),
                s.forEach(d => {
                  const u = yn(a, d.element, new Map());
                  d.postStyleProps.forEach(f => u.set(f, null));
                }))
              : (r.push(
                  (function EW() {
                    return new b(3300, !1);
                  })()
                ),
                (s = [])),
            r.length)
          )
            throw (function SW(e) {
              return new b(3504, !1);
            })();
          a.forEach((d, u) => {
            d.forEach((f, h) => {
              d.set(h, this._driver.computeStyle(u, h, Vi));
            });
          });
          const c = ur(
            s.map(d => {
              const u = a.get(d.element);
              return this._buildPlayer(d, new Map(), u);
            })
          );
          return (
            this._playersById.set(n, c),
            c.onDestroy(() => this.destroy(n)),
            this.players.push(c),
            c
          );
        }
        destroy(n) {
          const t = this._getPlayer(n);
          t.destroy(), this._playersById.delete(n);
          const i = this.players.indexOf(t);
          i >= 0 && this.players.splice(i, 1);
        }
        _getPlayer(n) {
          const t = this._playersById.get(n);
          if (!t)
            throw (function xW(e) {
              return new b(3301, !1);
            })();
          return t;
        }
        listen(n, t, i, r) {
          const o = b_(t, '', '', '');
          return v_(this._getPlayer(n), i, o, r), () => {};
        }
        command(n, t, i, r) {
          if ('register' == i) return void this.register(n, r[0]);
          if ('create' == i) return void this.create(n, t, r[0] || {});
          const o = this._getPlayer(n);
          switch (i) {
            case 'play':
              o.play();
              break;
            case 'pause':
              o.pause();
              break;
            case 'reset':
              o.reset();
              break;
            case 'restart':
              o.restart();
              break;
            case 'finish':
              o.finish();
              break;
            case 'init':
              o.init();
              break;
            case 'setPosition':
              o.setPosition(parseFloat(r[0]));
              break;
            case 'destroy':
              this.destroy(n);
          }
        }
      }
      const KM = 'ng-animate-queued',
        k_ = 'ng-animate-disabled',
        Eq = [],
        QM = {
          namespaceId: '',
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        Sq = {
          namespaceId: '',
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        ei = '__ng_removed';
      class P_ {
        get params() {
          return this.options.params;
        }
        constructor(n, t = '') {
          this.namespaceId = t;
          const i = n && n.hasOwnProperty('value');
          if (
            ((this.value = (function Iq(e) {
              return e ?? null;
            })(i ? n.value : n)),
            i)
          ) {
            const o = Ml(n);
            delete o.value, (this.options = o);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        absorbOptions(n) {
          const t = n.params;
          if (t) {
            const i = this.options.params;
            Object.keys(t).forEach(r => {
              null == i[r] && (i[r] = t[r]);
            });
          }
        }
      }
      const Nl = 'void',
        L_ = new P_(Nl);
      class xq {
        constructor(n, t, i) {
          (this.id = n),
            (this.hostElement = t),
            (this._engine = i),
            (this.players = []),
            (this._triggers = new Map()),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = 'ng-tns-' + n),
            Bn(t, this._hostClassName);
        }
        listen(n, t, i, r) {
          if (!this._triggers.has(t))
            throw (function TW(e, n) {
              return new b(3302, !1);
            })();
          if (null == i || 0 == i.length)
            throw (function MW(e) {
              return new b(3303, !1);
            })();
          if (
            !(function Aq(e) {
              return 'start' == e || 'done' == e;
            })(i)
          )
            throw (function IW(e, n) {
              return new b(3400, !1);
            })();
          const o = yn(this._elementListeners, n, []),
            s = { name: t, phase: i, callback: r };
          o.push(s);
          const a = yn(this._engine.statesByElement, n, new Map());
          return (
            a.has(t) || (Bn(n, ku), Bn(n, ku + '-' + t), a.set(t, L_)),
            () => {
              this._engine.afterFlush(() => {
                const l = o.indexOf(s);
                l >= 0 && o.splice(l, 1), this._triggers.has(t) || a.delete(t);
              });
            }
          );
        }
        register(n, t) {
          return !this._triggers.has(n) && (this._triggers.set(n, t), !0);
        }
        _getTrigger(n) {
          const t = this._triggers.get(n);
          if (!t)
            throw (function AW(e) {
              return new b(3401, !1);
            })();
          return t;
        }
        trigger(n, t, i, r = !0) {
          const o = this._getTrigger(t),
            s = new V_(this.id, t, n);
          let a = this._engine.statesByElement.get(n);
          a ||
            (Bn(n, ku),
            Bn(n, ku + '-' + t),
            this._engine.statesByElement.set(n, (a = new Map())));
          let l = a.get(t);
          const c = new P_(i, this.id);
          if (
            (!(i && i.hasOwnProperty('value')) &&
              l &&
              c.absorbOptions(l.options),
            a.set(t, c),
            l || (l = L_),
            c.value !== Nl && l.value === c.value)
          ) {
            if (
              !(function Rq(e, n) {
                const t = Object.keys(e),
                  i = Object.keys(n);
                if (t.length != i.length) return !1;
                for (let r = 0; r < t.length; r++) {
                  const o = t[r];
                  if (!n.hasOwnProperty(o) || e[o] !== n[o]) return !1;
                }
                return !0;
              })(l.params, c.params)
            ) {
              const m = [],
                g = o.matchStyles(l.value, l.params, m),
                y = o.matchStyles(c.value, c.params, m);
              m.length
                ? this._engine.reportError(m)
                : this._engine.afterFlush(() => {
                    Kr(n, g), _i(n, y);
                  });
            }
            return;
          }
          const f = yn(this._engine.playersByElement, n, []);
          f.forEach(m => {
            m.namespaceId == this.id &&
              m.triggerName == t &&
              m.queued &&
              m.destroy();
          });
          let h = o.matchTransition(l.value, c.value, n, c.params),
            p = !1;
          if (!h) {
            if (!r) return;
            (h = o.fallbackTransition), (p = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: n,
              triggerName: t,
              transition: h,
              fromState: l,
              toState: c,
              player: s,
              isFallbackTransition: p,
            }),
            p ||
              (Bn(n, KM),
              s.onStart(() => {
                Ts(n, KM);
              })),
            s.onDone(() => {
              let m = this.players.indexOf(s);
              m >= 0 && this.players.splice(m, 1);
              const g = this._engine.playersByElement.get(n);
              if (g) {
                let y = g.indexOf(s);
                y >= 0 && g.splice(y, 1);
              }
            }),
            this.players.push(s),
            f.push(s),
            s
          );
        }
        deregister(n) {
          this._triggers.delete(n),
            this._engine.statesByElement.forEach(t => t.delete(n)),
            this._elementListeners.forEach((t, i) => {
              this._elementListeners.set(
                i,
                t.filter(r => r.name != n)
              );
            });
        }
        clearElementCache(n) {
          this._engine.statesByElement.delete(n),
            this._elementListeners.delete(n);
          const t = this._engine.playersByElement.get(n);
          t &&
            (t.forEach(i => i.destroy()),
            this._engine.playersByElement.delete(n));
        }
        _signalRemovalForInnerTriggers(n, t) {
          const i = this._engine.driver.query(n, Pu, !0);
          i.forEach(r => {
            if (r[ei]) return;
            const o = this._engine.fetchNamespacesByElement(r);
            o.size
              ? o.forEach(s => s.triggerLeaveAnimation(r, t, !1, !0))
              : this.clearElementCache(r);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              i.forEach(r => this.clearElementCache(r))
            );
        }
        triggerLeaveAnimation(n, t, i, r) {
          const o = this._engine.statesByElement.get(n),
            s = new Map();
          if (o) {
            const a = [];
            if (
              (o.forEach((l, c) => {
                if ((s.set(c, l.value), this._triggers.has(c))) {
                  const d = this.trigger(n, c, Nl, r);
                  d && a.push(d);
                }
              }),
              a.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, n, !0, t, s),
                i && ur(a).onDone(() => this._engine.processLeaveNode(n)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(n) {
          const t = this._elementListeners.get(n),
            i = this._engine.statesByElement.get(n);
          if (t && i) {
            const r = new Set();
            t.forEach(o => {
              const s = o.name;
              if (r.has(s)) return;
              r.add(s);
              const l = this._triggers.get(s).fallbackTransition,
                c = i.get(s) || L_,
                d = new P_(Nl),
                u = new V_(this.id, s, n);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: n,
                  triggerName: s,
                  transition: l,
                  fromState: c,
                  toState: d,
                  player: u,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(n, t) {
          const i = this._engine;
          if (
            (n.childElementCount && this._signalRemovalForInnerTriggers(n, t),
            this.triggerLeaveAnimation(n, t, !0))
          )
            return;
          let r = !1;
          if (i.totalAnimations) {
            const o = i.players.length ? i.playersByQueriedElement.get(n) : [];
            if (o && o.length) r = !0;
            else {
              let s = n;
              for (; (s = s.parentNode); )
                if (i.statesByElement.get(s)) {
                  r = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(n), r))
            i.markElementAsRemoved(this.id, n, !1, t);
          else {
            const o = n[ei];
            (!o || o === QM) &&
              (i.afterFlush(() => this.clearElementCache(n)),
              i.destroyInnerAnimations(n),
              i._onRemovalComplete(n, t));
          }
        }
        insertNode(n, t) {
          Bn(n, this._hostClassName);
        }
        drainQueuedTransitions(n) {
          const t = [];
          return (
            this._queue.forEach(i => {
              const r = i.player;
              if (r.destroyed) return;
              const o = i.element,
                s = this._elementListeners.get(o);
              s &&
                s.forEach(a => {
                  if (a.name == i.triggerName) {
                    const l = b_(
                      o,
                      i.triggerName,
                      i.fromState.value,
                      i.toState.value
                    );
                    (l._data = n), v_(i.player, a.phase, l, a.callback);
                  }
                }),
                r.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      r.destroy();
                    })
                  : t.push(i);
            }),
            (this._queue = []),
            t.sort((i, r) => {
              const o = i.transition.ast.depCount,
                s = r.transition.ast.depCount;
              return 0 == o || 0 == s
                ? o - s
                : this._engine.driver.containsElement(i.element, r.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(n) {
          this.players.forEach(t => t.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, n);
        }
      }
      class Tq {
        _onRemovalComplete(n, t) {
          this.onRemovalComplete(n, t);
        }
        constructor(n, t, i) {
          (this.bodyNode = n),
            (this.driver = t),
            (this._normalizer = i),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (r, o) => {});
        }
        get queuedPlayers() {
          const n = [];
          return (
            this._namespaceList.forEach(t => {
              t.players.forEach(i => {
                i.queued && n.push(i);
              });
            }),
            n
          );
        }
        createNamespace(n, t) {
          const i = new xq(n, t, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, t)
              ? this._balanceNamespaceList(i, t)
              : (this.newHostElements.set(t, i), this.collectEnterElement(t)),
            (this._namespaceLookup[n] = i)
          );
        }
        _balanceNamespaceList(n, t) {
          const i = this._namespaceList,
            r = this.namespacesByHostElement;
          if (i.length - 1 >= 0) {
            let s = !1,
              a = this.driver.getParentElement(t);
            for (; a; ) {
              const l = r.get(a);
              if (l) {
                const c = i.indexOf(l);
                i.splice(c + 1, 0, n), (s = !0);
                break;
              }
              a = this.driver.getParentElement(a);
            }
            s || i.unshift(n);
          } else i.push(n);
          return r.set(t, n), n;
        }
        register(n, t) {
          let i = this._namespaceLookup[n];
          return i || (i = this.createNamespace(n, t)), i;
        }
        registerTrigger(n, t, i) {
          let r = this._namespaceLookup[n];
          r && r.register(t, i) && this.totalAnimations++;
        }
        destroy(n, t) {
          n &&
            (this.afterFlush(() => {}),
            this.afterFlushAnimationsDone(() => {
              const i = this._fetchNamespace(n);
              this.namespacesByHostElement.delete(i.hostElement);
              const r = this._namespaceList.indexOf(i);
              r >= 0 && this._namespaceList.splice(r, 1),
                i.destroy(t),
                delete this._namespaceLookup[n];
            }));
        }
        _fetchNamespace(n) {
          return this._namespaceLookup[n];
        }
        fetchNamespacesByElement(n) {
          const t = new Set(),
            i = this.statesByElement.get(n);
          if (i)
            for (let r of i.values())
              if (r.namespaceId) {
                const o = this._fetchNamespace(r.namespaceId);
                o && t.add(o);
              }
          return t;
        }
        trigger(n, t, i, r) {
          if (Gu(t)) {
            const o = this._fetchNamespace(n);
            if (o) return o.trigger(t, i, r), !0;
          }
          return !1;
        }
        insertNode(n, t, i, r) {
          if (!Gu(t)) return;
          const o = t[ei];
          if (o && o.setForRemoval) {
            (o.setForRemoval = !1), (o.setForMove = !0);
            const s = this.collectedLeaveElements.indexOf(t);
            s >= 0 && this.collectedLeaveElements.splice(s, 1);
          }
          if (n) {
            const s = this._fetchNamespace(n);
            s && s.insertNode(t, i);
          }
          r && this.collectEnterElement(t);
        }
        collectEnterElement(n) {
          this.collectedEnterElements.push(n);
        }
        markElementAsDisabled(n, t) {
          t
            ? this.disabledNodes.has(n) ||
              (this.disabledNodes.add(n), Bn(n, k_))
            : this.disabledNodes.has(n) &&
              (this.disabledNodes.delete(n), Ts(n, k_));
        }
        removeNode(n, t, i) {
          if (Gu(t)) {
            const r = n ? this._fetchNamespace(n) : null;
            r ? r.removeNode(t, i) : this.markElementAsRemoved(n, t, !1, i);
            const o = this.namespacesByHostElement.get(t);
            o && o.id !== n && o.removeNode(t, i);
          } else this._onRemovalComplete(t, i);
        }
        markElementAsRemoved(n, t, i, r, o) {
          this.collectedLeaveElements.push(t),
            (t[ei] = {
              namespaceId: n,
              setForRemoval: r,
              hasAnimation: i,
              removedBeforeQueried: !1,
              previousTriggersValues: o,
            });
        }
        listen(n, t, i, r, o) {
          return Gu(t) ? this._fetchNamespace(n).listen(t, i, r, o) : () => {};
        }
        _buildInstruction(n, t, i, r, o) {
          return n.transition.build(
            this.driver,
            n.element,
            n.fromState.value,
            n.toState.value,
            i,
            r,
            n.fromState.options,
            n.toState.options,
            t,
            o
          );
        }
        destroyInnerAnimations(n) {
          let t = this.driver.query(n, Pu, !0);
          t.forEach(i => this.destroyActiveAnimationsForElement(i)),
            0 != this.playersByQueriedElement.size &&
              ((t = this.driver.query(n, E_, !0)),
              t.forEach(i => this.finishActiveQueriedAnimationOnElement(i)));
        }
        destroyActiveAnimationsForElement(n) {
          const t = this.playersByElement.get(n);
          t &&
            t.forEach(i => {
              i.queued ? (i.markedForDestroy = !0) : i.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(n) {
          const t = this.playersByQueriedElement.get(n);
          t && t.forEach(i => i.finish());
        }
        whenRenderingDone() {
          return new Promise(n => {
            if (this.players.length) return ur(this.players).onDone(() => n());
            n();
          });
        }
        processLeaveNode(n) {
          const t = n[ei];
          if (t && t.setForRemoval) {
            if (((n[ei] = QM), t.namespaceId)) {
              this.destroyInnerAnimations(n);
              const i = this._fetchNamespace(t.namespaceId);
              i && i.clearElementCache(n);
            }
            this._onRemovalComplete(n, t.setForRemoval);
          }
          n.classList?.contains(k_) && this.markElementAsDisabled(n, !1),
            this.driver.query(n, '.ng-animate-disabled', !0).forEach(i => {
              this.markElementAsDisabled(i, !1);
            });
        }
        flush(n = -1) {
          let t = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((i, r) =>
                this._balanceNamespaceList(i, r)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let i = 0; i < this.collectedEnterElements.length; i++)
              Bn(this.collectedEnterElements[i], 'ng-star-inserted');
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const i = [];
            try {
              t = this._flushAnimations(i, n);
            } finally {
              for (let r = 0; r < i.length; r++) i[r]();
            }
          } else
            for (let i = 0; i < this.collectedLeaveElements.length; i++)
              this.processLeaveNode(this.collectedLeaveElements[i]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach(i => i()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const i = this._whenQuietFns;
            (this._whenQuietFns = []),
              t.length
                ? ur(t).onDone(() => {
                    i.forEach(r => r());
                  })
                : i.forEach(r => r());
          }
        }
        reportError(n) {
          throw (function NW(e) {
            return new b(3402, !1);
          })();
        }
        _flushAnimations(n, t) {
          const i = new Uu(),
            r = [],
            o = new Map(),
            s = [],
            a = new Map(),
            l = new Map(),
            c = new Map(),
            d = new Set();
          this.disabledNodes.forEach(k => {
            d.add(k);
            const V = this.driver.query(k, '.ng-animate-queued', !0);
            for (let U = 0; U < V.length; U++) d.add(V[U]);
          });
          const u = this.bodyNode,
            f = Array.from(this.statesByElement.keys()),
            h = eI(f, this.collectedEnterElements),
            p = new Map();
          let m = 0;
          h.forEach((k, V) => {
            const U = C_ + m++;
            p.set(V, U), k.forEach(re => Bn(re, U));
          });
          const g = [],
            y = new Set(),
            _ = new Set();
          for (let k = 0; k < this.collectedLeaveElements.length; k++) {
            const V = this.collectedLeaveElements[k],
              U = V[ei];
            U &&
              U.setForRemoval &&
              (g.push(V),
              y.add(V),
              U.hasAnimation
                ? this.driver
                    .query(V, '.ng-star-inserted', !0)
                    .forEach(re => y.add(re))
                : _.add(V));
          }
          const D = new Map(),
            w = eI(f, Array.from(y));
          w.forEach((k, V) => {
            const U = Fu + m++;
            D.set(V, U), k.forEach(re => Bn(re, U));
          }),
            n.push(() => {
              h.forEach((k, V) => {
                const U = p.get(V);
                k.forEach(re => Ts(re, U));
              }),
                w.forEach((k, V) => {
                  const U = D.get(V);
                  k.forEach(re => Ts(re, U));
                }),
                g.forEach(k => {
                  this.processLeaveNode(k);
                });
            });
          const F = [],
            j = [];
          for (let k = this._namespaceList.length - 1; k >= 0; k--)
            this._namespaceList[k].drainQueuedTransitions(t).forEach(U => {
              const re = U.player,
                Ze = U.element;
              if ((F.push(re), this.collectedEnterElements.length)) {
                const ot = Ze[ei];
                if (ot && ot.setForMove) {
                  if (
                    ot.previousTriggersValues &&
                    ot.previousTriggersValues.has(U.triggerName)
                  ) {
                    const qt = ot.previousTriggersValues.get(U.triggerName),
                      kt = this.statesByElement.get(U.element);
                    if (kt && kt.has(U.triggerName)) {
                      const Is = kt.get(U.triggerName);
                      (Is.value = qt), kt.set(U.triggerName, Is);
                    }
                  }
                  return void re.destroy();
                }
              }
              const ln = !u || !this.driver.containsElement(u, Ze),
                pt = D.get(Ze),
                Dn = p.get(Ze),
                Se = this._buildInstruction(U, i, Dn, pt, ln);
              if (Se.errors && Se.errors.length) return void j.push(Se);
              if (ln)
                return (
                  re.onStart(() => Kr(Ze, Se.fromStyles)),
                  re.onDestroy(() => _i(Ze, Se.toStyles)),
                  void r.push(re)
                );
              if (U.isFallbackTransition)
                return (
                  re.onStart(() => Kr(Ze, Se.fromStyles)),
                  re.onDestroy(() => _i(Ze, Se.toStyles)),
                  void r.push(re)
                );
              const ti = [];
              Se.timelines.forEach(ot => {
                (ot.stretchStartingKeyframe = !0),
                  this.disabledNodes.has(ot.element) || ti.push(ot);
              }),
                (Se.timelines = ti),
                i.append(Ze, Se.timelines),
                s.push({ instruction: Se, player: re, element: Ze }),
                Se.queriedElements.forEach(ot => yn(a, ot, []).push(re)),
                Se.preStyleProps.forEach((ot, qt) => {
                  if (ot.size) {
                    let kt = l.get(qt);
                    kt || l.set(qt, (kt = new Set())),
                      ot.forEach((Is, to) => kt.add(to));
                  }
                }),
                Se.postStyleProps.forEach((ot, qt) => {
                  let kt = c.get(qt);
                  kt || c.set(qt, (kt = new Set())),
                    ot.forEach((Is, to) => kt.add(to));
                });
            });
          if (j.length) {
            const k = [];
            j.forEach(V => {
              k.push(
                (function OW(e, n) {
                  return new b(3505, !1);
                })()
              );
            }),
              F.forEach(V => V.destroy()),
              this.reportError(k);
          }
          const z = new Map(),
            ee = new Map();
          s.forEach(k => {
            const V = k.element;
            i.has(V) &&
              (ee.set(V, V),
              this._beforeAnimationBuild(
                k.player.namespaceId,
                k.instruction,
                z
              ));
          }),
            r.forEach(k => {
              const V = k.element;
              this._getPreviousPlayers(
                V,
                !1,
                k.namespaceId,
                k.triggerName,
                null
              ).forEach(re => {
                yn(z, V, []).push(re), re.destroy();
              });
            });
          const ve = g.filter(k => nI(k, l, c)),
            we = new Map();
          XM(we, this.driver, _, c, Vi).forEach(k => {
            nI(k, l, c) && ve.push(k);
          });
          const At = new Map();
          h.forEach((k, V) => {
            XM(At, this.driver, new Set(k), l, '!');
          }),
            ve.forEach(k => {
              const V = we.get(k),
                U = At.get(k);
              we.set(
                k,
                new Map([...(V?.entries() ?? []), ...(U?.entries() ?? [])])
              );
            });
          const qe = [],
            vi = [],
            yi = {};
          s.forEach(k => {
            const { element: V, player: U, instruction: re } = k;
            if (i.has(V)) {
              if (d.has(V))
                return (
                  U.onDestroy(() => _i(V, re.toStyles)),
                  (U.disabled = !0),
                  U.overrideTotalTime(re.totalTime),
                  void r.push(U)
                );
              let Ze = yi;
              if (ee.size > 1) {
                let pt = V;
                const Dn = [];
                for (; (pt = pt.parentNode); ) {
                  const Se = ee.get(pt);
                  if (Se) {
                    Ze = Se;
                    break;
                  }
                  Dn.push(pt);
                }
                Dn.forEach(Se => ee.set(Se, Ze));
              }
              const ln = this._buildAnimation(U.namespaceId, re, z, o, At, we);
              if ((U.setRealPlayer(ln), Ze === yi)) qe.push(U);
              else {
                const pt = this.playersByElement.get(Ze);
                pt && pt.length && (U.parentPlayer = ur(pt)), r.push(U);
              }
            } else
              Kr(V, re.fromStyles),
                U.onDestroy(() => _i(V, re.toStyles)),
                vi.push(U),
                d.has(V) && r.push(U);
          }),
            vi.forEach(k => {
              const V = o.get(k.element);
              if (V && V.length) {
                const U = ur(V);
                k.setRealPlayer(U);
              }
            }),
            r.forEach(k => {
              k.parentPlayer ? k.syncPlayerEvents(k.parentPlayer) : k.destroy();
            });
          for (let k = 0; k < g.length; k++) {
            const V = g[k],
              U = V[ei];
            if ((Ts(V, Fu), U && U.hasAnimation)) continue;
            let re = [];
            if (a.size) {
              let ln = a.get(V);
              ln && ln.length && re.push(...ln);
              let pt = this.driver.query(V, E_, !0);
              for (let Dn = 0; Dn < pt.length; Dn++) {
                let Se = a.get(pt[Dn]);
                Se && Se.length && re.push(...Se);
              }
            }
            const Ze = re.filter(ln => !ln.destroyed);
            Ze.length ? Nq(this, V, Ze) : this.processLeaveNode(V);
          }
          return (
            (g.length = 0),
            qe.forEach(k => {
              this.players.push(k),
                k.onDone(() => {
                  k.destroy();
                  const V = this.players.indexOf(k);
                  this.players.splice(V, 1);
                }),
                k.play();
            }),
            qe
          );
        }
        afterFlush(n) {
          this._flushFns.push(n);
        }
        afterFlushAnimationsDone(n) {
          this._whenQuietFns.push(n);
        }
        _getPreviousPlayers(n, t, i, r, o) {
          let s = [];
          if (t) {
            const a = this.playersByQueriedElement.get(n);
            a && (s = a);
          } else {
            const a = this.playersByElement.get(n);
            if (a) {
              const l = !o || o == Nl;
              a.forEach(c => {
                c.queued || (!l && c.triggerName != r) || s.push(c);
              });
            }
          }
          return (
            (i || r) &&
              (s = s.filter(
                a => !((i && i != a.namespaceId) || (r && r != a.triggerName))
              )),
            s
          );
        }
        _beforeAnimationBuild(n, t, i) {
          const o = t.element,
            s = t.isRemovalTransition ? void 0 : n,
            a = t.isRemovalTransition ? void 0 : t.triggerName;
          for (const l of t.timelines) {
            const c = l.element,
              d = c !== o,
              u = yn(i, c, []);
            this._getPreviousPlayers(c, d, s, a, t.toState).forEach(h => {
              const p = h.getRealPlayer();
              p.beforeDestroy && p.beforeDestroy(), h.destroy(), u.push(h);
            });
          }
          Kr(o, t.fromStyles);
        }
        _buildAnimation(n, t, i, r, o, s) {
          const a = t.triggerName,
            l = t.element,
            c = [],
            d = new Set(),
            u = new Set(),
            f = t.timelines.map(p => {
              const m = p.element;
              d.add(m);
              const g = m[ei];
              if (g && g.removedBeforeQueried)
                return new sl(p.duration, p.delay);
              const y = m !== l,
                _ = (function Oq(e) {
                  const n = [];
                  return tI(e, n), n;
                })((i.get(m) || Eq).map(z => z.getRealPlayer())).filter(
                  z => !!z.element && z.element === m
                ),
                D = o.get(m),
                w = s.get(m),
                F = NM(this._normalizer, p.keyframes, D, w),
                j = this._buildPlayer(p, F, _);
              if ((p.subTimeline && r && u.add(m), y)) {
                const z = new V_(n, a, m);
                z.setRealPlayer(j), c.push(z);
              }
              return j;
            });
          c.forEach(p => {
            yn(this.playersByQueriedElement, p.element, []).push(p),
              p.onDone(() =>
                (function Mq(e, n, t) {
                  let i = e.get(n);
                  if (i) {
                    if (i.length) {
                      const r = i.indexOf(t);
                      i.splice(r, 1);
                    }
                    0 == i.length && e.delete(n);
                  }
                  return i;
                })(this.playersByQueriedElement, p.element, p)
              );
          }),
            d.forEach(p => Bn(p, VM));
          const h = ur(f);
          return (
            h.onDestroy(() => {
              d.forEach(p => Ts(p, VM)), _i(l, t.toStyles);
            }),
            u.forEach(p => {
              yn(r, p, []).push(h);
            }),
            h
          );
        }
        _buildPlayer(n, t, i) {
          return t.length > 0
            ? this.driver.animate(
                n.element,
                t,
                n.duration,
                n.delay,
                n.easing,
                i
              )
            : new sl(n.duration, n.delay);
        }
      }
      class V_ {
        constructor(n, t, i) {
          (this.namespaceId = n),
            (this.triggerName = t),
            (this.element = i),
            (this._player = new sl()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = new Map()),
            (this.destroyed = !1),
            (this.parentPlayer = null),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(n) {
          this._containsRealPlayer ||
            ((this._player = n),
            this._queuedCallbacks.forEach((t, i) => {
              t.forEach(r => v_(n, i, void 0, r));
            }),
            this._queuedCallbacks.clear(),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(n.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(n) {
          this.totalTime = n;
        }
        syncPlayerEvents(n) {
          const t = this._player;
          t.triggerCallback && n.onStart(() => t.triggerCallback('start')),
            n.onDone(() => this.finish()),
            n.onDestroy(() => this.destroy());
        }
        _queueEvent(n, t) {
          yn(this._queuedCallbacks, n, []).push(t);
        }
        onDone(n) {
          this.queued && this._queueEvent('done', n), this._player.onDone(n);
        }
        onStart(n) {
          this.queued && this._queueEvent('start', n), this._player.onStart(n);
        }
        onDestroy(n) {
          this.queued && this._queueEvent('destroy', n),
            this._player.onDestroy(n);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(n) {
          this.queued || this._player.setPosition(n);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(n) {
          const t = this._player;
          t.triggerCallback && t.triggerCallback(n);
        }
      }
      function Gu(e) {
        return e && 1 === e.nodeType;
      }
      function JM(e, n) {
        const t = e.style.display;
        return (e.style.display = n ?? 'none'), t;
      }
      function XM(e, n, t, i, r) {
        const o = [];
        t.forEach(l => o.push(JM(l)));
        const s = [];
        i.forEach((l, c) => {
          const d = new Map();
          l.forEach(u => {
            const f = n.computeStyle(c, u, r);
            d.set(u, f), (!f || 0 == f.length) && ((c[ei] = Sq), s.push(c));
          }),
            e.set(c, d);
        });
        let a = 0;
        return t.forEach(l => JM(l, o[a++])), s;
      }
      function eI(e, n) {
        const t = new Map();
        if ((e.forEach(a => t.set(a, [])), 0 == n.length)) return t;
        const r = new Set(n),
          o = new Map();
        function s(a) {
          if (!a) return 1;
          let l = o.get(a);
          if (l) return l;
          const c = a.parentNode;
          return (l = t.has(c) ? c : r.has(c) ? 1 : s(c)), o.set(a, l), l;
        }
        return (
          n.forEach(a => {
            const l = s(a);
            1 !== l && t.get(l).push(a);
          }),
          t
        );
      }
      function Bn(e, n) {
        e.classList?.add(n);
      }
      function Ts(e, n) {
        e.classList?.remove(n);
      }
      function Nq(e, n, t) {
        ur(t).onDone(() => e.processLeaveNode(n));
      }
      function tI(e, n) {
        for (let t = 0; t < e.length; t++) {
          const i = e[t];
          i instanceof _S ? tI(i.players, n) : n.push(i);
        }
      }
      function nI(e, n, t) {
        const i = t.get(e);
        if (!i) return !1;
        let r = n.get(e);
        return r ? i.forEach(o => r.add(o)) : n.set(e, i), t.delete(e), !0;
      }
      class Wu {
        constructor(n, t, i) {
          (this.bodyNode = n),
            (this._driver = t),
            (this._normalizer = i),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (r, o) => {}),
            (this._transitionEngine = new Tq(n, t, i)),
            (this._timelineEngine = new yq(n, t, i)),
            (this._transitionEngine.onRemovalComplete = (r, o) =>
              this.onRemovalComplete(r, o));
        }
        registerTrigger(n, t, i, r, o) {
          const s = n + '-' + r;
          let a = this._triggerCache[s];
          if (!a) {
            const l = [],
              d = M_(this._driver, o, l, []);
            if (l.length)
              throw (function DW(e, n) {
                return new b(3404, !1);
              })();
            (a = (function mq(e, n, t) {
              return new gq(e, n, t);
            })(r, d, this._normalizer)),
              (this._triggerCache[s] = a);
          }
          this._transitionEngine.registerTrigger(t, r, a);
        }
        register(n, t) {
          this._transitionEngine.register(n, t);
        }
        destroy(n, t) {
          this._transitionEngine.destroy(n, t);
        }
        onInsert(n, t, i, r) {
          this._transitionEngine.insertNode(n, t, i, r);
        }
        onRemove(n, t, i) {
          this._transitionEngine.removeNode(n, t, i);
        }
        disableAnimations(n, t) {
          this._transitionEngine.markElementAsDisabled(n, t);
        }
        process(n, t, i, r) {
          if ('@' == i.charAt(0)) {
            const [o, s] = OM(i);
            this._timelineEngine.command(o, t, s, r);
          } else this._transitionEngine.trigger(n, t, i, r);
        }
        listen(n, t, i, r, o) {
          if ('@' == i.charAt(0)) {
            const [s, a] = OM(i);
            return this._timelineEngine.listen(s, t, a, o);
          }
          return this._transitionEngine.listen(n, t, i, r, o);
        }
        flush(n = -1) {
          this._transitionEngine.flush(n);
        }
        get players() {
          return [
            ...this._transitionEngine.players,
            ...this._timelineEngine.players,
          ];
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
        afterFlushAnimationsDone(n) {
          this._transitionEngine.afterFlushAnimationsDone(n);
        }
      }
      let kq = (() => {
        class e {
          static #e = (this.initialStylesByElement = new WeakMap());
          constructor(t, i, r) {
            (this._element = t),
              (this._startStyles = i),
              (this._endStyles = r),
              (this._state = 0);
            let o = e.initialStylesByElement.get(t);
            o || e.initialStylesByElement.set(t, (o = new Map())),
              (this._initialStyles = o);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                _i(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (_i(this._element, this._initialStyles),
                this._endStyles &&
                  (_i(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (e.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (Kr(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (Kr(this._element, this._endStyles),
                  (this._endStyles = null)),
                _i(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return e;
      })();
      function B_(e) {
        let n = null;
        return (
          e.forEach((t, i) => {
            (function Pq(e) {
              return 'display' === e || 'position' === e;
            })(i) && ((n = n || new Map()), n.set(i, t));
          }),
          n
        );
      }
      class iI {
        constructor(n, t, i, r) {
          (this.element = n),
            (this.keyframes = t),
            (this.options = i),
            (this._specialStyles = r),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = new Map()),
            (this._duration = i.duration),
            (this._delay = i.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach(n => n()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const n = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            n,
            this.options
          )),
            (this._finalKeyframe = n.length ? n[n.length - 1] : new Map());
          const t = () => this._onFinish();
          this.domPlayer.addEventListener('finish', t),
            this.onDestroy(() => {
              this.domPlayer.removeEventListener('finish', t);
            });
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _convertKeyframesToObject(n) {
          const t = [];
          return (
            n.forEach(i => {
              t.push(Object.fromEntries(i));
            }),
            t
          );
        }
        _triggerWebAnimation(n, t, i) {
          return n.animate(this._convertKeyframesToObject(t), i);
        }
        onStart(n) {
          this._originalOnStartFns.push(n), this._onStartFns.push(n);
        }
        onDone(n) {
          this._originalOnDoneFns.push(n), this._onDoneFns.push(n);
        }
        onDestroy(n) {
          this._onDestroyFns.push(n);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach(n => n()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach(n => n()),
            (this._onDestroyFns = []));
        }
        setPosition(n) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = n * this.time);
        }
        getPosition() {
          return +(this.domPlayer.currentTime ?? 0) / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const n = new Map();
          this.hasStarted() &&
            this._finalKeyframe.forEach((i, r) => {
              'offset' !== r &&
                n.set(r, this._finished ? i : UM(this.element, r));
            }),
            (this.currentSnapshot = n);
        }
        triggerCallback(n) {
          const t = 'start' === n ? this._onStartFns : this._onDoneFns;
          t.forEach(i => i()), (t.length = 0);
        }
      }
      class Lq {
        validateStyleProperty(n) {
          return !0;
        }
        validateAnimatableStyleProperty(n) {
          return !0;
        }
        matchesElement(n, t) {
          return !1;
        }
        containsElement(n, t) {
          return FM(n, t);
        }
        getParentElement(n) {
          return D_(n);
        }
        query(n, t, i) {
          return kM(n, t, i);
        }
        computeStyle(n, t, i) {
          return window.getComputedStyle(n)[t];
        }
        animate(n, t, i, r, o, s = []) {
          const l = {
            duration: i,
            delay: r,
            fill: 0 == r ? 'both' : 'forwards',
          };
          o && (l.easing = o);
          const c = new Map(),
            d = s.filter(h => h instanceof iI);
          (function zW(e, n) {
            return 0 === e || 0 === n;
          })(i, r) &&
            d.forEach(h => {
              h.currentSnapshot.forEach((p, m) => c.set(m, p));
            });
          let u = (function HW(e) {
            return e.length
              ? e[0] instanceof Map
                ? e
                : e.map(n => BM(n))
              : [];
          })(t).map(h => fr(h));
          u = (function GW(e, n, t) {
            if (t.size && n.length) {
              let i = n[0],
                r = [];
              if (
                (t.forEach((o, s) => {
                  i.has(s) || r.push(s), i.set(s, o);
                }),
                r.length)
              )
                for (let o = 1; o < n.length; o++) {
                  let s = n[o];
                  r.forEach(a => s.set(a, UM(e, a)));
                }
            }
            return n;
          })(n, u, c);
          const f = (function Fq(e, n) {
            let t = null,
              i = null;
            return (
              Array.isArray(n) && n.length
                ? ((t = B_(n[0])), n.length > 1 && (i = B_(n[n.length - 1])))
                : n instanceof Map && (t = B_(n)),
              t || i ? new kq(e, t, i) : null
            );
          })(n, u);
          return new iI(n, u, l, f);
        }
      }
      let Vq = (() => {
        class e extends mS {
          constructor(t, i) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = t.createRenderer(i.body, {
                id: '0',
                encapsulation: Sn.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(t) {
            const i = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const r = Array.isArray(t) ? gS(t) : t;
            return (
              rI(this._renderer, null, i, 'register', [r]),
              new Bq(i, this._renderer)
            );
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(Po), x(je));
          });
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class Bq extends C3 {
        constructor(n, t) {
          super(), (this._id = n), (this._renderer = t);
        }
        create(n, t) {
          return new jq(this._id, n, t || {}, this._renderer);
        }
      }
      class jq {
        constructor(n, t, i, r) {
          (this.id = n),
            (this.element = t),
            (this._renderer = r),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command('create', i);
        }
        _listen(n, t) {
          return this._renderer.listen(this.element, `@@${this.id}:${n}`, t);
        }
        _command(n, ...t) {
          return rI(this._renderer, this.element, this.id, n, t);
        }
        onDone(n) {
          this._listen('done', n);
        }
        onStart(n) {
          this._listen('start', n);
        }
        onDestroy(n) {
          this._listen('destroy', n);
        }
        init() {
          this._command('init');
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command('play'), (this._started = !0);
        }
        pause() {
          this._command('pause');
        }
        restart() {
          this._command('restart');
        }
        finish() {
          this._command('finish');
        }
        destroy() {
          this._command('destroy');
        }
        reset() {
          this._command('reset'), (this._started = !1);
        }
        setPosition(n) {
          this._command('setPosition', n);
        }
        getPosition() {
          return this._renderer.engine.players[+this.id]?.getPosition() ?? 0;
        }
      }
      function rI(e, n, t, i, r) {
        return e.setProperty(n, `@@${t}:${i}`, r);
      }
      const oI = '@.disabled';
      let Hq = (() => {
        class e {
          constructor(t, i, r) {
            (this.delegate = t),
              (this.engine = i),
              (this._zone = r),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (i.onRemovalComplete = (o, s) => {
                const a = s?.parentNode(o);
                a && s.removeChild(a, o);
              });
          }
          createRenderer(t, i) {
            const o = this.delegate.createRenderer(t, i);
            if (!(t && i && i.data && i.data.animation)) {
              let d = this._rendererCache.get(o);
              return (
                d ||
                  ((d = new sI('', o, this.engine, () =>
                    this._rendererCache.delete(o)
                  )),
                  this._rendererCache.set(o, d)),
                d
              );
            }
            const s = i.id,
              a = i.id + '-' + this._currentId;
            this._currentId++, this.engine.register(a, t);
            const l = d => {
              Array.isArray(d)
                ? d.forEach(l)
                : this.engine.registerTrigger(s, a, t, d.name, d);
            };
            return i.data.animation.forEach(l), new Uq(this, a, o, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            queueMicrotask(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(t, i, r) {
            t >= 0 && t < this._microtaskId
              ? this._zone.run(() => i(r))
              : (0 == this._animationCallbacksBuffer.length &&
                  queueMicrotask(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach(o => {
                        const [s, a] = o;
                        s(a);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([i, r]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(Po), x(Wu), x(ae));
          });
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class sI {
        constructor(n, t, i, r) {
          (this.namespaceId = n),
            (this.delegate = t),
            (this.engine = i),
            (this._onDestroy = r);
        }
        get data() {
          return this.delegate.data;
        }
        destroyNode(n) {
          this.delegate.destroyNode?.(n);
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.engine.afterFlushAnimationsDone(() => {
              queueMicrotask(() => {
                this.delegate.destroy();
              });
            }),
            this._onDestroy?.();
        }
        createElement(n, t) {
          return this.delegate.createElement(n, t);
        }
        createComment(n) {
          return this.delegate.createComment(n);
        }
        createText(n) {
          return this.delegate.createText(n);
        }
        appendChild(n, t) {
          this.delegate.appendChild(n, t),
            this.engine.onInsert(this.namespaceId, t, n, !1);
        }
        insertBefore(n, t, i, r = !0) {
          this.delegate.insertBefore(n, t, i),
            this.engine.onInsert(this.namespaceId, t, n, r);
        }
        removeChild(n, t, i) {
          this.engine.onRemove(this.namespaceId, t, this.delegate);
        }
        selectRootElement(n, t) {
          return this.delegate.selectRootElement(n, t);
        }
        parentNode(n) {
          return this.delegate.parentNode(n);
        }
        nextSibling(n) {
          return this.delegate.nextSibling(n);
        }
        setAttribute(n, t, i, r) {
          this.delegate.setAttribute(n, t, i, r);
        }
        removeAttribute(n, t, i) {
          this.delegate.removeAttribute(n, t, i);
        }
        addClass(n, t) {
          this.delegate.addClass(n, t);
        }
        removeClass(n, t) {
          this.delegate.removeClass(n, t);
        }
        setStyle(n, t, i, r) {
          this.delegate.setStyle(n, t, i, r);
        }
        removeStyle(n, t, i) {
          this.delegate.removeStyle(n, t, i);
        }
        setProperty(n, t, i) {
          '@' == t.charAt(0) && t == oI
            ? this.disableAnimations(n, !!i)
            : this.delegate.setProperty(n, t, i);
        }
        setValue(n, t) {
          this.delegate.setValue(n, t);
        }
        listen(n, t, i) {
          return this.delegate.listen(n, t, i);
        }
        disableAnimations(n, t) {
          this.engine.disableAnimations(n, t);
        }
      }
      class Uq extends sI {
        constructor(n, t, i, r, o) {
          super(t, i, r, o), (this.factory = n), (this.namespaceId = t);
        }
        setProperty(n, t, i) {
          '@' == t.charAt(0)
            ? '.' == t.charAt(1) && t == oI
              ? this.disableAnimations(n, (i = void 0 === i || !!i))
              : this.engine.process(this.namespaceId, n, t.slice(1), i)
            : this.delegate.setProperty(n, t, i);
        }
        listen(n, t, i) {
          if ('@' == t.charAt(0)) {
            const r = (function $q(e) {
              switch (e) {
                case 'body':
                  return document.body;
                case 'document':
                  return document;
                case 'window':
                  return window;
                default:
                  return e;
              }
            })(n);
            let o = t.slice(1),
              s = '';
            return (
              '@' != o.charAt(0) &&
                ([o, s] = (function zq(e) {
                  const n = e.indexOf('.');
                  return [e.substring(0, n), e.slice(n + 1)];
                })(o)),
              this.engine.listen(this.namespaceId, r, o, s, a => {
                this.factory.scheduleListenerCallback(a._data || -1, i, a);
              })
            );
          }
          return this.delegate.listen(n, t, i);
        }
      }
      const aI = [
          { provide: mS, useClass: Vq },
          {
            provide: R_,
            useFactory: function Wq() {
              return new uq();
            },
          },
          {
            provide: Wu,
            useClass: (() => {
              class e extends Wu {
                constructor(t, i, r, o) {
                  super(t.body, i, r);
                }
                ngOnDestroy() {
                  this.flush();
                }
                static #e = (this.ɵfac = function (i) {
                  return new (i || e)(x(je), x(w_), x(R_), x(Ni));
                });
                static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }));
              }
              return e;
            })(),
          },
          {
            provide: Po,
            useFactory: function qq(e, n, t) {
              return new Hq(e, n, t);
            },
            deps: [Nm, Wu, ae],
          },
        ],
        j_ = [
          { provide: w_, useFactory: () => new Lq() },
          { provide: Zb, useValue: 'BrowserAnimations' },
          ...aI,
        ],
        lI = [
          { provide: w_, useClass: PM },
          { provide: Zb, useValue: 'NoopAnimations' },
          ...aI,
        ];
      let Zq = (() => {
        class e {
          static withConfig(t) {
            return { ngModule: e, providers: t.disableAnimations ? lI : j_ };
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵmod = se({ type: e }));
          static #n = (this.ɵinj = oe({ providers: j_, imports: [eE] }));
        }
        return e;
      })();
      const Ol = {
        schedule(e) {
          let n = requestAnimationFrame,
            t = cancelAnimationFrame;
          const { delegate: i } = Ol;
          i && ((n = i.requestAnimationFrame), (t = i.cancelAnimationFrame));
          const r = n(o => {
            (t = void 0), e(o);
          });
          return new Pt(() => t?.(r));
        },
        requestAnimationFrame(...e) {
          const { delegate: n } = Ol;
          return (n?.requestAnimationFrame || requestAnimationFrame)(...e);
        },
        cancelAnimationFrame(...e) {
          const { delegate: n } = Ol;
          return (n?.cancelAnimationFrame || cancelAnimationFrame)(...e);
        },
        delegate: void 0,
      };
      new (class Kq extends Lg {
        flush(n) {
          this._active = !0;
          const t = this._scheduled;
          this._scheduled = void 0;
          const { actions: i } = this;
          let r;
          n = n || i.shift();
          do {
            if ((r = n.execute(n.state, n.delay))) break;
          } while ((n = i[0]) && n.id === t && i.shift());
          if (((this._active = !1), r)) {
            for (; (n = i[0]) && n.id === t && i.shift(); ) n.unsubscribe();
            throw r;
          }
        }
      })(
        class Yq extends Pg {
          constructor(n, t) {
            super(n, t), (this.scheduler = n), (this.work = t);
          }
          requestAsyncId(n, t, i = 0) {
            return null !== i && i > 0
              ? super.requestAsyncId(n, t, i)
              : (n.actions.push(this),
                n._scheduled ||
                  (n._scheduled = Ol.requestAnimationFrame(() =>
                    n.flush(void 0)
                  )));
          }
          recycleAsyncId(n, t, i = 0) {
            var r;
            if (null != i ? i > 0 : this.delay > 0)
              return super.recycleAsyncId(n, t, i);
            const { actions: o } = n;
            null != t &&
              (null === (r = o[o.length - 1]) || void 0 === r
                ? void 0
                : r.id) !== t &&
              (Ol.cancelAnimationFrame(t), (n._scheduled = void 0));
          }
        }
      );
      let H_,
        Jq = 1;
      const Zu = {};
      function cI(e) {
        return e in Zu && (delete Zu[e], !0);
      }
      const Xq = {
          setImmediate(e) {
            const n = Jq++;
            return (
              (Zu[n] = !0),
              H_ || (H_ = Promise.resolve()),
              H_.then(() => cI(n) && e()),
              n
            );
          },
          clearImmediate(e) {
            cI(e);
          },
        },
        { setImmediate: e7, clearImmediate: t7 } = Xq,
        Yu = {
          setImmediate(...e) {
            const { delegate: n } = Yu;
            return (n?.setImmediate || e7)(...e);
          },
          clearImmediate(e) {
            const { delegate: n } = Yu;
            return (n?.clearImmediate || t7)(e);
          },
          delegate: void 0,
        };
      new (class i7 extends Lg {
        flush(n) {
          this._active = !0;
          const t = this._scheduled;
          this._scheduled = void 0;
          const { actions: i } = this;
          let r;
          n = n || i.shift();
          do {
            if ((r = n.execute(n.state, n.delay))) break;
          } while ((n = i[0]) && n.id === t && i.shift());
          if (((this._active = !1), r)) {
            for (; (n = i[0]) && n.id === t && i.shift(); ) n.unsubscribe();
            throw r;
          }
        }
      })(
        class n7 extends Pg {
          constructor(n, t) {
            super(n, t), (this.scheduler = n), (this.work = t);
          }
          requestAsyncId(n, t, i = 0) {
            return null !== i && i > 0
              ? super.requestAsyncId(n, t, i)
              : (n.actions.push(this),
                n._scheduled ||
                  (n._scheduled = Yu.setImmediate(n.flush.bind(n, void 0))));
          }
          recycleAsyncId(n, t, i = 0) {
            var r;
            if (null != i ? i > 0 : this.delay > 0)
              return super.recycleAsyncId(n, t, i);
            const { actions: o } = n;
            null != t &&
              (null === (r = o[o.length - 1]) || void 0 === r
                ? void 0
                : r.id) !== t &&
              (Yu.clearImmediate(t),
              n._scheduled === t && (n._scheduled = void 0));
          }
        }
      );
      let U_,
        Ku = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })(),
        dI = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({}));
          }
          return e;
        })(),
        a7 = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({ imports: [Ku, dI, Ku, dI] }));
          }
          return e;
        })();
      try {
        U_ = typeof Intl < 'u' && Intl.v8BreakIterator;
      } catch {
        U_ = !1;
      }
      let Rl,
        uI = (() => {
          class e {
            constructor(t) {
              (this._platformId = t),
                (this.isBrowser = this._platformId
                  ? (function $j(e) {
                      return e === FC;
                    })(this._platformId)
                  : 'object' == typeof document && !!document),
                (this.EDGE =
                  this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                  this.isBrowser &&
                  /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !U_) &&
                  typeof CSS < 'u' &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS =
                  this.isBrowser &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !('MSStream' in window)),
                (this.FIREFOX =
                  this.isBrowser &&
                  /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                  this.isBrowser &&
                  /android/i.test(navigator.userAgent) &&
                  !this.TRIDENT),
                (this.SAFARI =
                  this.isBrowser &&
                  /safari/i.test(navigator.userAgent) &&
                  this.WEBKIT);
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(x(Ki));
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })();
      function Fl(e) {
        return (function l7() {
          if (null == Rl && typeof window < 'u')
            try {
              window.addEventListener(
                'test',
                null,
                Object.defineProperty({}, 'passive', { get: () => (Rl = !0) })
              );
            } finally {
              Rl = Rl || !1;
            }
          return Rl;
        })()
          ? e
          : !!e.capture;
      }
      let f7 = (() => {
        class e {
          static #e = (this.ɵfac = function (i) {
            return new (i || e)();
          });
          static #t = (this.ɵmod = se({ type: e }));
          static #n = (this.ɵinj = oe({}));
        }
        return e;
      })();
      function hI(e) {
        return Array.isArray(e) ? e : [e];
      }
      const mI = new Set();
      let Xr,
        b7 = (() => {
          class e {
            constructor(t, i) {
              (this._platform = t),
                (this._nonce = i),
                (this._matchMedia =
                  this._platform.isBrowser && window.matchMedia
                    ? window.matchMedia.bind(window)
                    : w7);
            }
            matchMedia(t) {
              return (
                (this._platform.WEBKIT || this._platform.BLINK) &&
                  (function D7(e, n) {
                    if (!mI.has(e))
                      try {
                        Xr ||
                          ((Xr = document.createElement('style')),
                          n && (Xr.nonce = n),
                          Xr.setAttribute('type', 'text/css'),
                          document.head.appendChild(Xr)),
                          Xr.sheet &&
                            (Xr.sheet.insertRule(`@media ${e} {body{ }}`, 0),
                            mI.add(e));
                      } catch (t) {
                        console.error(t);
                      }
                  })(t, this._nonce),
                this._matchMedia(t)
              );
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)(x(uI), x(Oh, 8));
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })();
      function w7(e) {
        return {
          matches: 'all' === e || '' === e,
          media: e,
          addListener: () => {},
          removeListener: () => {},
        };
      }
      let C7 = (() => {
        class e {
          constructor(t, i) {
            (this._mediaMatcher = t),
              (this._zone = i),
              (this._queries = new Map()),
              (this._destroySubject = new Ne());
          }
          ngOnDestroy() {
            this._destroySubject.next(), this._destroySubject.complete();
          }
          isMatched(t) {
            return gI(hI(t)).some(r => this._registerQuery(r).mql.matches);
          }
          observe(t) {
            let o = Nd(gI(hI(t)).map(s => this._registerQuery(s).observable));
            return (
              (o = rs(
                o.pipe(vt(1)),
                o.pipe(
                  (function qx(e) {
                    return it((n, t) => e <= t);
                  })(1),
                  (function y7(e, n = Vg) {
                    return Ye((t, i) => {
                      let r = null,
                        o = null,
                        s = null;
                      const a = () => {
                        if (r) {
                          r.unsubscribe(), (r = null);
                          const c = o;
                          (o = null), i.next(c);
                        }
                      };
                      function l() {
                        const c = s + e,
                          d = n.now();
                        if (d < c)
                          return (
                            (r = this.schedule(void 0, c - d)), void i.add(r)
                          );
                        a();
                      }
                      t.subscribe(
                        Fe(
                          i,
                          c => {
                            (o = c),
                              (s = n.now()),
                              r || ((r = n.schedule(l, e)), i.add(r));
                          },
                          () => {
                            a(), i.complete();
                          },
                          void 0,
                          () => {
                            o = r = null;
                          }
                        )
                      );
                    });
                  })(0)
                )
              )),
              o.pipe(
                ie(s => {
                  const a = { matches: !1, breakpoints: {} };
                  return (
                    s.forEach(({ matches: l, query: c }) => {
                      (a.matches = a.matches || l), (a.breakpoints[c] = l);
                    }),
                    a
                  );
                })
              )
            );
          }
          _registerQuery(t) {
            if (this._queries.has(t)) return this._queries.get(t);
            const i = this._mediaMatcher.matchMedia(t),
              o = {
                observable: new Ae(s => {
                  const a = l => this._zone.run(() => s.next(l));
                  return (
                    i.addListener(a),
                    () => {
                      i.removeListener(a);
                    }
                  );
                }).pipe(
                  Lm(i),
                  ie(({ matches: s }) => ({ query: t, matches: s })),
                  We(this._destroySubject)
                ),
                mql: i,
              };
            return this._queries.set(t, o), o;
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(b7), x(ae));
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      function gI(e) {
        return e
          .map(n => n.split(','))
          .reduce((n, t) => n.concat(t))
          .map(n => n.trim());
      }
      const bI = 'cdk-high-contrast-black-on-white',
        DI = 'cdk-high-contrast-white-on-black',
        z_ = 'cdk-high-contrast-active';
      let F7 = (() => {
        class e {
          constructor(t, i) {
            (this._platform = t),
              (this._document = i),
              (this._breakpointSubscription = I(C7)
                .observe('(forced-colors: active)')
                .subscribe(() => {
                  this._hasCheckedHighContrastMode &&
                    ((this._hasCheckedHighContrastMode = !1),
                    this._applyBodyHighContrastModeCssClasses());
                }));
          }
          getHighContrastMode() {
            if (!this._platform.isBrowser) return 0;
            const t = this._document.createElement('div');
            (t.style.backgroundColor = 'rgb(1,2,3)'),
              (t.style.position = 'absolute'),
              this._document.body.appendChild(t);
            const i = this._document.defaultView || window,
              r = i && i.getComputedStyle ? i.getComputedStyle(t) : null,
              o = ((r && r.backgroundColor) || '').replace(/ /g, '');
            switch ((t.remove(), o)) {
              case 'rgb(0,0,0)':
              case 'rgb(45,50,54)':
              case 'rgb(32,32,32)':
                return 2;
              case 'rgb(255,255,255)':
              case 'rgb(255,250,239)':
                return 1;
            }
            return 0;
          }
          ngOnDestroy() {
            this._breakpointSubscription.unsubscribe();
          }
          _applyBodyHighContrastModeCssClasses() {
            if (
              !this._hasCheckedHighContrastMode &&
              this._platform.isBrowser &&
              this._document.body
            ) {
              const t = this._document.body.classList;
              t.remove(z_, bI, DI), (this._hasCheckedHighContrastMode = !0);
              const i = this.getHighContrastMode();
              1 === i ? t.add(z_, bI) : 2 === i && t.add(z_, DI);
            }
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(uI), x(je));
          });
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      const P7 = new T('mat-sanity-checks', {
        providedIn: 'root',
        factory: function k7() {
          return !0;
        },
      });
      let Ju = (() => {
        class e {
          constructor(t, i, r) {
            (this._sanityChecks = i),
              (this._document = r),
              (this._hasDoneGlobalChecks = !1),
              t._applyBodyHighContrastModeCssClasses(),
              this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0);
          }
          _checkIsEnabled(t) {
            return (
              !(function u7() {
                return (
                  (typeof __karma__ < 'u' && !!__karma__) ||
                  (typeof jasmine < 'u' && !!jasmine) ||
                  (typeof jest < 'u' && !!jest) ||
                  (typeof Mocha < 'u' && !!Mocha)
                );
              })() &&
              ('boolean' == typeof this._sanityChecks
                ? this._sanityChecks
                : !!this._sanityChecks[t])
            );
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || e)(x(F7), x(P7, 8), x(je));
          });
          static #t = (this.ɵmod = se({ type: e }));
          static #n = (this.ɵinj = oe({ imports: [Ku, Ku] }));
        }
        return e;
      })();
      const EI = Fl({ passive: !0, capture: !0 });
      class B7 {
        constructor() {
          (this._events = new Map()),
            (this._delegateEventHandler = n => {
              const t = (function d7(e) {
                return e.composedPath ? e.composedPath()[0] : e.target;
              })(n);
              t &&
                this._events.get(n.type)?.forEach((i, r) => {
                  (r === t || r.contains(t)) &&
                    i.forEach(o => o.handleEvent(n));
                });
            });
        }
        addHandler(n, t, i, r) {
          const o = this._events.get(t);
          if (o) {
            const s = o.get(i);
            s ? s.add(r) : o.set(i, new Set([r]));
          } else
            this._events.set(t, new Map([[i, new Set([r])]])),
              n.runOutsideAngular(() => {
                document.addEventListener(t, this._delegateEventHandler, EI);
              });
        }
        removeHandler(n, t, i) {
          const r = this._events.get(n);
          if (!r) return;
          const o = r.get(t);
          o &&
            (o.delete(i),
            0 === o.size && r.delete(t),
            0 === r.size &&
              (this._events.delete(n),
              document.removeEventListener(n, this._delegateEventHandler, EI)));
        }
      }
      class G_ {
        static #e = (this._eventManager = new B7());
        constructor(n, t, i, r) {
          (this._target = n),
            (this._ngZone = t),
            (this._platform = r),
            (this._isPointerDown = !1),
            (this._activeRipples = new Map()),
            (this._pointerUpEventsRegistered = !1),
            r.isBrowser && (this._containerElement = pI(i));
        }
        fadeInRipple(n, t, i = {}) {
          const r = (this._containerRect =
              this._containerRect ||
              this._containerElement.getBoundingClientRect()),
            o = { ...SI, ...i.animation },
            s =
              i.radius ||
              (function H7(e, n, t) {
                const i = Math.max(Math.abs(e - t.left), Math.abs(e - t.right)),
                  r = Math.max(Math.abs(n - t.top), Math.abs(n - t.bottom));
                return Math.sqrt(i * i + r * r);
              })(n, t, r),
            a = n - r.left,
            l = t - r.top,
            c = o.enterDuration,
            d = document.createElement('div');
          d.classList.add('mat-ripple-element'),
            (d.style.left = a - s + 'px'),
            (d.style.top = l - s + 'px'),
            (d.style.height = 2 * s + 'px'),
            (d.style.width = 2 * s + 'px'),
            null != i.color && (d.style.backgroundColor = i.color),
            (d.style.transitionDuration = `${c}ms`),
            this._containerElement.appendChild(d);
          const u = window.getComputedStyle(d),
            h = u.transitionDuration,
            p =
              'none' === u.transitionProperty ||
              '0s' === h ||
              '0s, 0s' === h ||
              (0 === r.width && 0 === r.height),
            m = new V7(this, d, i, p);
          (d.style.transform = 'scale3d(1, 1, 1)'),
            (m.state = 0),
            i.persistent || (this._mostRecentTransientRipple = m);
          return (
            !p &&
              (c || o.exitDuration) &&
              this._ngZone.runOutsideAngular(() => {
                const y = () => this._finishRippleTransition(m),
                  _ = () => this._destroyRipple(m);
                d.addEventListener('transitionend', y),
                  d.addEventListener('transitioncancel', _);
              }),
            this._activeRipples.set(m, null),
            (p || !c) && this._finishRippleTransition(m),
            m
          );
        }
        fadeOutRipple(n) {
          if (2 === n.state || 3 === n.state) return;
          const t = n.element,
            i = { ...SI, ...n.config.animation };
          (t.style.transitionDuration = `${i.exitDuration}ms`),
            (t.style.opacity = '0'),
            (n.state = 2),
            (n._animationForciblyDisabledThroughCss || !i.exitDuration) &&
              this._finishRippleTransition(n);
        }
        fadeOutAll() {
          this._getActiveRipples().forEach(n => n.fadeOut());
        }
        fadeOutAllNonPersistent() {
          this._getActiveRipples().forEach(n => {
            n.config.persistent || n.fadeOut();
          });
        }
        setupTriggerEvents(n) {
          const t = pI(n);
          !this._platform.isBrowser ||
            !t ||
            t === this._triggerElement ||
            (this._removeTriggerEvents(),
            (this._triggerElement = t),
            TI.forEach(i => {
              G_._eventManager.addHandler(this._ngZone, i, t, this);
            }));
        }
        handleEvent(n) {
          'mousedown' === n.type
            ? this._onMousedown(n)
            : 'touchstart' === n.type
            ? this._onTouchStart(n)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered ||
              (this._ngZone.runOutsideAngular(() => {
                MI.forEach(t => {
                  this._triggerElement.addEventListener(t, this, xI);
                });
              }),
              (this._pointerUpEventsRegistered = !0));
        }
        _finishRippleTransition(n) {
          0 === n.state
            ? this._startFadeOutTransition(n)
            : 2 === n.state && this._destroyRipple(n);
        }
        _startFadeOutTransition(n) {
          const t = n === this._mostRecentTransientRipple,
            { persistent: i } = n.config;
          (n.state = 1), !i && (!t || !this._isPointerDown) && n.fadeOut();
        }
        _destroyRipple(n) {
          const t = this._activeRipples.get(n) ?? null;
          this._activeRipples.delete(n),
            this._activeRipples.size || (this._containerRect = null),
            n === this._mostRecentTransientRipple &&
              (this._mostRecentTransientRipple = null),
            (n.state = 3),
            null !== t &&
              (n.element.removeEventListener(
                'transitionend',
                t.onTransitionEnd
              ),
              n.element.removeEventListener(
                'transitioncancel',
                t.onTransitionCancel
              )),
            n.element.remove();
        }
        _onMousedown(n) {
          const t = (function N7(e) {
              return 0 === e.buttons || (0 === e.offsetX && 0 === e.offsetY);
            })(n),
            i =
              this._lastTouchStartEvent &&
              Date.now() < this._lastTouchStartEvent + 800;
          !this._target.rippleDisabled &&
            !t &&
            !i &&
            ((this._isPointerDown = !0),
            this.fadeInRipple(n.clientX, n.clientY, this._target.rippleConfig));
        }
        _onTouchStart(n) {
          if (
            !this._target.rippleDisabled &&
            !(function O7(e) {
              const n =
                (e.touches && e.touches[0]) ||
                (e.changedTouches && e.changedTouches[0]);
              return !(
                !n ||
                -1 !== n.identifier ||
                (null != n.radiusX && 1 !== n.radiusX) ||
                (null != n.radiusY && 1 !== n.radiusY)
              );
            })(n)
          ) {
            (this._lastTouchStartEvent = Date.now()),
              (this._isPointerDown = !0);
            const t = n.changedTouches;
            if (t)
              for (let i = 0; i < t.length; i++)
                this.fadeInRipple(
                  t[i].clientX,
                  t[i].clientY,
                  this._target.rippleConfig
                );
          }
        }
        _onPointerUp() {
          this._isPointerDown &&
            ((this._isPointerDown = !1),
            this._getActiveRipples().forEach(n => {
              !n.config.persistent &&
                (1 === n.state ||
                  (n.config.terminateOnPointerUp && 0 === n.state)) &&
                n.fadeOut();
            }));
        }
        _getActiveRipples() {
          return Array.from(this._activeRipples.keys());
        }
        _removeTriggerEvents() {
          const n = this._triggerElement;
          n &&
            (TI.forEach(t => G_._eventManager.removeHandler(t, n, this)),
            this._pointerUpEventsRegistered &&
              MI.forEach(t => n.removeEventListener(t, this, xI)));
        }
      }
      let U7 = (() => {
          class e {
            create(t) {
              return typeof MutationObserver > 'u'
                ? null
                : new MutationObserver(t);
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        $7 = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({ providers: [U7] }));
          }
          return e;
        })(),
        II = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({ imports: [Ju, RC, $7, Ju] }));
          }
          return e;
        })(),
        K7 = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e }));
            static #n = (this.ɵinj = oe({ imports: [Ju, II, II, f7, Ju] }));
          }
          return e;
        })(),
        Q7 = (() => {
          class e {
            static #e = (this.ɵfac = function (i) {
              return new (i || e)();
            });
            static #t = (this.ɵmod = se({ type: e, bootstrap: [X6] }));
            static #n = (this.ɵinj = oe({
              imports: [eE, p4, Y6, Zq, a7, P5, K7, a4],
            }));
          }
          return e;
        })();
      FH()
        .bootstrapModule(Q7)
        .catch(e => console.error(e));
    },
  },
  ue => {
    ue((ue.s = 220));
  },
]);
