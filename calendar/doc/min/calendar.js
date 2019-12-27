(function(e, t) {
	"function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.Calendar =
		t()
})(this, function() {
	"use strict";

	function e(e, t) {
		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}

	function t(e, t) {
		for (var a, l = 0; l < t.length; l++) a = t[l], a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a &&
			(a.writable = !0), Object.defineProperty(e, a.key, a)
	}

	function a(e, a, l) {
		return a && t(e.prototype, a), l && t(e, l), e
	}
	var l = function() {
		function t(a) {
			return e(this, t), this.attributes = {
				parent: "",
				time: "",
				viewMode: 0,
				pickMode: "single",
				hasSwitcher: !0,
				hasFooter: !0,
				hasClock: !0,
				onDatePick: null,
				onMonthPick: null,
				onYearPick: null,
				onTodayPick: null,
				MONTHS: [],
				DAYS: [],
				DATES: [],
				STYLES: {}
			}, this.elements = {
				parent: null,
				wrap: null,
				header: null,
				title: null,
				switcher: null,
				prev: null,
				next: null,
				body: null,
				week: null,
				dates: null,
				months: null,
				years: null,
				footer: null,
				today: null,
				time: null
			}, this.data = {
				minYear: 0,
				maxYear: 0,
				year: 0,
				month: 0,
				date: {
					year: 0,
					month: 0,
					date: 0,
					day: 0,
					text: "",
					fullText: ""
				},
				picked: []
			}, this.initialize(a).render().addEventListeners(), this
		}
		return a(t, [{
			key: "initialize",
			value: function(e) {
				var a, l, s, n, d, r, i, o = t.getYear().value;
				return this.set(t.defaults).set(e), l = this.get("time"), a = this.get("pickMode"), s = t.getMonth(l), n = s.text,
					this.setYear(l).setMonth(l).setDate(l)._setYears(l), "multiple" === a ? this.data.picked.push(this.getDate()
						.text) : "range" === a ? (r = n + "-" + 1, i = n + "-" + this.get("DATES")[s.value - 1], this.data.picked = [
						r, i
					]) : "week" === a ? (d = t.getWeekRanges(l), r = d[0], i = d[d.length - 1], this.data.picked = [r, i]) :
					void 0, (this.data.minYear = o - 100, this.data.maxYear = o + 100, this._createElements(), this)
			}
		}, {
			key: "render",
			value: function() {
				var e = this.getEls(),
					t = e.wrap,
					a = e.header,
					l = e.switcher,
					s = e.body,
					n = e.footer,
					d = document.createDocumentFragment();
				return this._renderTitle(), a.appendChild(e.title), this.get("hasSwitcher") && (l.appendChild(e.prev), l.appendChild(
						e.next), a.appendChild(l)), this._renderDays(), s.appendChild(e.week), this._renderDates(), s.appendChild(e
						.dates), this._renderMonths(), s.appendChild(e.months), this._renderYears(), s.appendChild(e.years), this.get(
						"hasFooter") && (this._renderFooter(), n.appendChild(e.today), this.get("hasClock") && n.appendChild(e.time)),
					t.appendChild(a), t.appendChild(s), this.get("hasFooter") && t.appendChild(n), d.appendChild(t), e.parent.appendChild(
						d), this
			}
		}, {
			key: "addEventListeners",
			value: function() {
				var e = this.get("STYLES"),
					a = "click",
					l = "." + e.TITLE,
					s = "." + e.PREV,
					n = "." + e.NEXT,
					d = "." + e.DATE,
					r = "." + e.MONTH,
					i = "." + e.YEAR,
					o = "." + e.TODAY,
					g = t.Delegate,
					c = this.getEls().wrap;
				return g.on(c, l, a, this._titleClick, this), this.get("hasSwitcher") && (g.on(c, s, a, this._prevClick, this),
						g.on(c, n, a, this._nextClick, this)), g.on(c, d, a, this._dateClick, this), g.on(c, r, a, this._monthClick,
						this), g.on(c, i, a, this._yearClick, this), this.get("hasClock") && g.on(c, o, a, this._todayClick, this),
					this
			}
		}, {
			key: "reload",
			value: function(e) {
				return this.destroy().initialize(e).render().addEventListeners(), this
			}
		}, {
			key: "destroy",
			value: function() {
				return this.removeEventListeners().hide().remove().reset(), this
			}
		}, {
			key: "removeEventListeners",
			value: function() {
				var e = t.Delegate,
					a = this.getEls().wrap;
				return e.off(a, "click", this._titleClick), this.get("hasSwitcher") && (e.off(a, "click", this._prevClick), e
						.off(a, "click", this._nextClick)), e.off(a, "click", this._dateClick), e.off(a, "click", this._monthClick),
					e.off(a, "click", this._yearClick), this.get("hasClock") && e.off(a, "click", this._todayClick), this
			}
		}, {
			key: "remove",
			value: function() {
				var e = this.getEls();
				return e.parent.removeChild(e.wrap), this
			}
		}, {
			key: "reset",
			value: function() {
				return this.attributes = {
					parent: "",
					time: "",
					viewMode: 0,
					pickMode: "single",
					hasSwitcher: !0,
					hasFooter: !0,
					hasClock: !0,
					MONTHS: [],
					DAYS: [],
					DATES: [],
					STYLES: {}
				}, this.elements = {
					parent: null,
					wrap: null,
					header: null,
					title: null,
					switcher: null,
					prev: null,
					next: null,
					body: null,
					week: null,
					dates: null,
					months: null,
					years: null,
					footer: null,
					today: null,
					time: null,
					year: null,
					month: null,
					date: null
				}, this.data = {
					minYear: 0,
					maxYear: 0,
					years: {
						start: 0,
						end: 0
					},
					year: 0,
					month: 0,
					date: {
						year: 0,
						month: 0,
						date: 0,
						day: 0,
						text: "",
						fullText: ""
					},
					picked: []
				}, this
			}
		}, {
			key: "get",
			value: function(e) {
				return this.attributes[e]
			}
		}, {
			key: "set",
			value: function() {
				var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
				return Object.assign(this.attributes, e), this
			}
		}, {
			key: "getEls",
			value: function() {
				return this.elements
			}
		}, {
			key: "getYear",
			value: function() {
				return this.data.year
			}
		}, {
			key: "setYear",
			value: function(e) {
				return this.data.year = t.getYear(e).value, this
			}
		}, {
			key: "getMonth",
			value: function() {
				return this.data.month
			}
		}, {
			key: "setMonth",
			value: function(e) {
				return this.data.month = t.getMonth(e).value, this
			}
		}, {
			key: "getDate",
			value: function() {
				return this.data.date
			}
		}, {
			key: "setDate",
			value: function(e) {
				return this.data.date = t.getDate(e), this
			}
		}, {
			key: "getYears",
			value: function() {
				return this.data.years
			}
		}, {
			key: "getPicked",
			value: function() {
				return this.data.picked
			}
		}, {
			key: "update",
			value: function() {
				var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
				return this.updateViewMode(e).updateView(), this
			}
		}, {
			key: "updateViewMode",
			value: function() {
				var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
					t = e;
				return 2 < t ? t = 2 : 0 > t && (t = 0), this.set({
					viewMode: t
				}), this
			}
		}, {
			key: "updateView",
			value: function() {
				var e = this.get("STYLES"),
					a = e.HIDDEN,
					l = t.DOM,
					s = l.addClass,
					n = l.removeClass,
					d = this.getEls(),
					r = d.week,
					i = d.dates,
					o = d.months,
					g = d.years;
				switch (this._renderTitle(), this.get("viewMode")) {
					case 0:
						s(o, a), s(g, a), n(r, a), n(i, a), this._repaintDates();
						break;
					case 1:
						s(r, a), s(i, a), s(g, a), n(o, a), this._repaintMonths();
						break;
					case 2:
						s(r, a), s(i, a), s(o, a), n(g, a), this._repaintYears();
				}
				return this
			}
		}, {
			key: "prev",
			value: function() {
				var e, t = this.getYears(),
					a = t.start,
					l = this.getYear(),
					s = this.getMonth(),
					n = this.data.minYear;
				switch (this.get("viewMode")) {
					case 0:
						s -= 1, 1 > s && (s = 12, l -= 1, l < n && (l = n)), e = l + "-" + s + "-1", this.setYear(e).setMonth(e);
						break;
					case 1:
						l -= 1, l < n && (l = n), this.setYear(l + "-1-1");
						break;
					case 2:
						a -= 10, a < n && (a = n + 9), this._setYears(a.toString());
				}
				return this.updateView(), this
			}
		}, {
			key: "next",
			value: function() {
				var e, t = this.getYears(),
					a = t.start,
					l = this.getYear(),
					s = this.getMonth(),
					n = this.data.maxYear;
				switch (this.get("viewMode")) {
					case 0:
						s += 1, 12 < s && (s = 1, l += 1, l > n && (l = n)), e = l + "-" + s + "-1", this.setYear(e).setMonth(e);
						break;
					case 1:
						l += 1, l > n && (l = n), this.setYear(l + "-1-1");
						break;
					case 2:
						a += 10, a > n && (a = n - 9), this._setYears(a.toString());
				}
				return this.updateView(), this
			}
		}, {
			key: "pickDate",
			value: function(e) {
				var a, l = this.get("STYLES"),
					s = l.PICKED,
					n = t.DOM,
					d = n.hasClass,
					r = n.addClass,
					i = n.removeClass,
					o = t.Utils.isFunction,
					g = this.get("pickMode"),
					c = this.getEls(),
					u = e.getAttribute("data-date"),
					p = this.get("onDatePick"),
					E = null;
				if (d(e, s)) switch (g) {
					case "single":
					case "week":
						return !1;
					case "multiple":
						i(e, s), this._removePicked(u), a = this.getPicked(), this.setDate(a[a.length - 1]), o(p) && p(a, e, this);
						break;
					case "range":
						this.data.picked = [], this.data.picked.push(u), this.setDate(u), c.date = e, this._updateDateRanges(), o(
							p) && p(this.getPicked(), e, this);
				} else switch (this.setYear(u).setMonth(u), g) {
					case "single":
						E = c.date, E && i(E, s), r(e, s), c.date = e, this.setDate(u), o(p) && p(u, e, this);
						break;
					case "multiple":
						this.data.picked.push(u), this.data.picked.sort(), a = this.getPicked(), this.setDate(a[a.length - 1]), r(
							e, s), o(p) && p(this.getPicked(), e, this);
						break;
					case "range":
						switch (this.data.picked.length) {
							case 0:
							case 1:
								this.data.picked.push(u), 2 === this.data.picked.length && this.data.picked.sort(), a = this.getPicked(),
									this.setDate(a[a.length - 1]), c.date = e, this._updateDateRanges(), o(p) && p(a, e, this);
								break;
							case 2:
								this.data.picked = [], this.data.picked.push(u), c.date = e, this._updateDateRanges();
						}
						break;
					case "week":
						var h = t.getWeekRanges(u);
						this.data.picked = [h[0], h[h.length - 1]], this.setDate(h[h.length - 1]), c.date = e, this._updateWeekRanges(),
							o(p) && p(this.getPicked(), e, this);
				}
				return this
			}
		}, {
			key: "pickMonth",
			value: function(e) {
				var a = this.get("STYLES").PICKED,
					l = t.DOM,
					s = this.getEls(),
					n = s.month,
					d = e.getAttribute("data-month"),
					r = this.get("onMonthPick");
				return l.hasClass(e, a) ? this.update() : (n && l.removeClass(n, a), l.addClass(e, a), s.month = e, this.setYear(
					d).setMonth(d)._setYears(d).update()), t.Utils.isFunction(r) && r(d, e, this), this
			}
		}, {
			key: "pickYear",
			value: function(e) {
				var a = this.get("STYLES").PICKED,
					l = t.DOM,
					s = this.getEls(),
					n = s.year,
					d = e.getAttribute("data-year"),
					r = this.get("onYearPick");
				return l.hasClass(e, a) ? this.setYear(d).update(1) : (n && l.removeClass(n, a), l.addClass(e, a), s.year = e,
					this.setYear(d)._setYears(d).update(1)), t.Utils.isFunction(r) && r(d, e, this), this
			}
		}, {
			key: "pickToday",
			value: function() {
				var e = t.getToday().value,
					a = this.get("onTodayPick");
				return this.setYear(e).setMonth(e).setDate(e)._setYears(e).update(), t.Utils.isFunction(a) && a(e, this.getEls()
					.dates.querySelector("[data-date=" + e + "]"), this), this
			}
		}, {
			key: "hide",
			value: function() {
				var e = this.get("STYLES").HIDDEN,
					a = this.getEls().wrap;
				return t.DOM.addClass(a, e), this
			}
		}, {
			key: "show",
			value: function() {
				var e = this.get("STYLES").HIDDEN,
					a = this.getEls().wrap;
				return t.DOM.removeClass(a, e), this
			}
		}, {
			key: "toggle",
			value: function() {
				var e = this.get("STYLES").HIDDEN,
					a = this.getEls().wrap;
				return t.DOM.hasClass(a, e) ? this.show() : this.hide(), this
			}
		}, {
			key: "_setYears",
			value: function(e) {
				return this.data.years = t.getYears(e), this
			}
		}, {
			key: "_removePicked",
			value: function(e) {
				var t = this.getPicked(),
					a = t.indexOf(e);
				return -1 < a && t.splice(a, 1), this
			}
		}, {
			key: "_createElements",
			value: function() {
				var e = this.get("STYLES"),
					a = e.WRAP,
					l = e.WRAP_WITHOUT_FOOTER,
					s = e.HEADER,
					n = e.TITLE,
					d = e.SWITCHER,
					r = e.PREV,
					i = e.ICON_PREV,
					o = e.NEXT,
					g = e.ICON_NEXT,
					c = e.BODY,
					u = e.WEEK,
					p = e.DATES,
					E = e.MONTHS,
					h = e.YEARS,
					k = e.FOOTER,
					m = e.FOOTER_DATE,
					y = e.TODAY,
					v = e.FOOTER_TIME,
					D = e.TIME,
					T = e.TEXT,
					C = e.HIDDEN,
					f = " ",
					Y = this.get("hasFooter"),
					N = this.getEls(),
					S = t.DOM.createElement,
					_ = a,
					M = u,
					A = p,
					P = E,
					O = h;
				switch (this.get("viewMode")) {
					case 0:
						P += f + C, O += f + C;
						break;
					case 1:
						M += f + C, A += f + C, O += f + C;
						break;
					case 2:
						M += f + C, A += f + C, P += f + C;
				}
				return Y || (_ += f + l), N.parent = document.getElementById(this.get("parent")), N.wrap = S("div", {
					id: t.Utils.guid("calendar"),
					className: _
				}), N.header = S("div", {
					className: s
				}), N.title = S("h4", {
					className: n
				}, [S("span", {
					className: T
				})]), this.get("hasSwitcher") && (N.switcher = S("div", {
					className: d
				}), N.prev = S("div", {
					className: r
				}, [S("span", {
					className: T
				}, [S("i", {
					className: i
				})])]), N.next = S("div", {
					className: o
				}, [S("span", {
					className: T
				}, [S("i", {
					className: g
				})])])), N.body = S("div", {
					className: c
				}), N.week = S("div", {
					className: M
				}), N.dates = S("div", {
					className: A
				}), N.months = S("div", {
					className: P
				}), N.years = S("div", {
					className: O
				}), Y && (N.footer = S("div", {
					className: k
				}), N.today = S("div", {
					className: m
				}, [S("p", {
					className: y
				}, [S("span", {
					className: T
				})])]), this.get("hasClock") && (N.time = S("div", {
					className: v
				}, [S("p", {
					className: D
				}, [S("span", {
					className: T
				})])]))), this
			}
		}, {
			key: "_renderTitle",
			value: function() {
				var e = this.getEls().title.querySelector("." + this.get("STYLES").TEXT),
					a = this.getYears(),
					l = this.getYear(),
					s = "";
				switch (this.get("viewMode")) {
					case 0:
						s = t.getMonth(l + "-" + this.getMonth() + "-1").fullText;
						break;
					case 1:
						s = t.getYear(l + "-1-1").fullText;
						break;
					case 2:
						s = a.start + " - " + a.end;
				}
				return e.innerHTML = s, this
			}
		}, {
			key: "_renderDays",
			value: function() {
				var e = this.get("STYLES"),
					a = e.DAY,
					l = e.WEEKEND,
					s = e.TEXT,
					n = this.get("DAYS"),
					d = t.DOM.createElement,
					r = document.createDocumentFragment();
				return n.forEach(function(e, t) {
					var i = 0 === t || t === n.length - 1 ? a + " " + l : a;
					r.appendChild(d("div", {
						className: i
					}, [d("span", {
						className: s
					}, [e])]))
				}), this.getEls().week.appendChild(r), this
			}
		}, {
			key: "_renderDates",
			value: function() {
				var e, a = this.get("DATES"),
					l = t.isLeapYear,
					s = document.createDocumentFragment(),
					n = this.getYear(),
					d = this.getMonth(),
					r = a[d - 1],
					i = t.getDay(n + "-" + d + "-" + 1).value,
					o = 0 > d - 2 ? n - 1 : n,
					g = 0 > d - 2 ? 12 : d - 1,
					c = a[g - 1],
					u = 12 === d ? n + 1 : n,
					p = 12 === d ? 1 : d + 1;
				return l(n) && 2 === g ? c += 1 : l(n) && 2 === d && (r += 1), e = 42 - (i + r), 0 !== i && s.appendChild(
					this._getDatesFragment({
						year: o,
						month: g,
						start: c - (i - 1),
						end: c,
						isPrev: !0,
						isNext: !1
					})), s.appendChild(this._getDatesFragment({
					year: n,
					month: d,
					start: 1,
					end: r,
					isPrev: !1,
					isNext: !1
				})), 0 < e && s.appendChild(this._getDatesFragment({
					year: u,
					month: p,
					start: 1,
					end: e,
					isPrev: !1,
					isNext: !0
				})), this.getEls().dates.appendChild(s), this
			}
		}, {
			key: "_repaintDates",
			value: function() {
				var e = this.get("STYLES").HIDDEN,
					a = t.DOM,
					l = this.getEls().dates;
				return a.addClass(l, e), l.innerHTML = "", a.removeClass(l, e), this._renderDates(), this
			}
		}, {
			key: "_getDatesFragment",
			value: function(e) {
				for (var a = this, l = e.year, s = e.month, n = e.start, d = e.end, r = e.isPrev, i = e.isNext, o = " ", g =
						this.get("STYLES"), c = g.DATE, u = g.DATE_PREV, p = g.DATE_NEXT, E = g.CURRENT, h = g.PICKED, k = g.PICKED_RANGE,
						m = g.WEEKEND, y = g.TEXT, v = t.DOM.createElement, D = t.isDatesEqual, T = document.createDocumentFragment(),
						C = this.getEls(), f = n, Y = this.get("pickMode"), N = this.getPicked(), S = function() {
							var e = l + "-" + s + "-" + f,
								n = t.isToday(e),
								d = t.getDay(e),
								g = [v("span", {
									className: y
								}, [f])],
								S = "",
								_ = void 0;
							switch (_ = v("div", {
									"data-date": e
								}, g), S += c, r ? S += o + u : i && (S += o + p), n && (S += o + E), (0 === d.value || 6 === d.value) &&
								(S += o + m), Y) {
								case "single":
									var M = a.getDate().text,
										A = D(e, M);
									A && (S += o + h, C.date = _);
									break;
								case "multiple":
									N.forEach(function(t) {
										var a = D(e, t);
										a && (S += o + h)
									});
									break;
								case "range":
								case "week":
									var P = [];
									2 === N.length ? (P = t.getRanges(N[0], N[1]), P.forEach(function(t, a) {
										var l = D(e, t);
										return !!l && void(0 !== a && a !== P.length - 1 ? (S += o + h, S += o + k) : (0 === a || a === P.length -
											1) && (S += o + h))
									})) : 1 === N.length && (S += o + h);
							}
							_.className = S, T.appendChild(_)
						}; f <= d; f += 1) S();
				return T
			}
		}, {
			key: "_updateDateRanges",
			value: function() {
				var e = this.get("STYLES"),
					a = e.PICKED,
					l = e.PICKED_RANGE,
					s = t.DOM,
					n = s.hasClass,
					d = s.removeClass,
					r = s.addClass,
					i = this.getEls(),
					o = this.elements.date,
					g = i.dates,
					c = g.querySelectorAll("." + a);
				switch (this.data.picked.length) {
					case 1:
						c.forEach(function(e) {
							d(e, a), n(e, l) && d(e, l)
						}), r(o, a);
						break;
					case 2:
						var u = t.getRanges(this.data.picked[0], this.data.picked[1]);
						u.forEach(function(e, t) {
							var s = g.querySelector("[data-date=\"" + e + "\"]");
							0 < t && t < u.length - 1 && (r(s, a), r(s, l))
						}), r(o, a);
				}
				return this
			}
		}, {
			key: "_updateWeekRanges",
			value: function() {
				var e = this.get("STYLES"),
					a = e.PICKED,
					l = e.PICKED_RANGE,
					s = t.DOM,
					n = s.removeClass,
					d = s.addClass,
					r = this.getEls(),
					o = r.dates,
					i = o.querySelectorAll("." + a),
					g = this.getPicked(),
					c = t.getWeekRanges(g[0]);
				return i.forEach(function(e) {
					n(e, l), n(e, a)
				}), c.forEach(function(e, t) {
					var s = o.querySelector("[data-date=\"" + e + "\"]");
					0 < t && t < c.length - 1 ? (d(s, a), d(s, l)) : (0 == t || t == c.length - 1) && d(s, a)
				}), this
			}
		}, {
			key: "_renderMonths",
			value: function() {
				var e = this,
					a = " ",
					l = this.get("STYLES"),
					s = l.CURRENT,
					n = l.PICKED,
					d = l.MONTH,
					r = l.MONTH_PREV,
					o = l.MONTH_NEXT,
					g = l.TEXT,
					i = this.get("MONTHS"),
					c = t.DOM,
					u = c.createElement,
					p = document.createDocumentFragment(),
					E = this.getEls(),
					h = this.getYear(),
					k = t.getToday();
				return i.forEach(function(t, l) {
					var i, c = e.getDate(),
						E = d;
					2 > l ? (E += a + r, h - 1 === c.year && t === c.month && (E += a + n), i = u("div", {
						className: E,
						"data-month": h - 1 + "-" + t + "-1"
					}, [u("span", {
						className: g
					}, [t])])) : 2 <= l && 13 >= l ? (h === k.year && t === k.month && (E += " " + s), h === c.year && t ===
						c.month && (E += a + n), i = u("div", {
							className: E,
							"data-month": h + "-" + t + "-1"
						}, [u("span", {
							className: g
						}, [h + "-" + t])])) : 13 < l && 15 >= l && (E += a + o, h + 1 === c.year && t === c.month && (E += a +
						n), i = u("div", {
						className: E,
						"data-month": h + 1 + "-" + t + "-1"
					}, [u("span", {
						className: g
					}, [t])])), p.appendChild(i)
				}), E.months.appendChild(p), this
			}
		}, {
			key: "_repaintMonths",
			value: function() {
				var e = this.get("STYLES").HIDDEN,
					a = t.DOM,
					l = this.getEls().months;
				return a.addClass(l, e), l.innerHTML = "", a.removeClass(l, e), this._renderMonths(), this
			}
		}, {
			key: "_renderYears",
			value: function() {
				var e = this.getYears(),
					t = e.start,
					a = e.end,
					l = document.createDocumentFragment();
				return l.appendChild(this._getYearsFragment({
					start: t - 3,
					end: t - 1,
					isPrev: !0,
					isNext: !1
				})), l.appendChild(this._getYearsFragment({
					start: t,
					end: a,
					isPrev: !1,
					isNext: !1
				})), l.appendChild(this._getYearsFragment({
					start: a + 1,
					end: a + 3,
					isPrev: !1,
					isNext: !0
				})), this.getEls().years.appendChild(l), this
			}
		}, {
			key: "_repaintYears",
			value: function() {
				var e = this.get("STYLES").HIDDEN,
					a = t.DOM,
					l = this.getEls().years;
				return a.addClass(l, e), l.innerHTML = "", a.removeClass(l, e), this._renderYears(), this
			}
		}, {
			key: "_getYearsFragment",
			value: function(e) {
				for (var a = e.start, l = e.end, s = e.isPrev, n = e.isNext, d = this.get("STYLES"), r = d.YEAR, i = d.YEAR_PREV,
						o = d.YEAR_NEXT, g = d.CURRENT, c = d.PICKED, u = d.DISABLED, p = d.TEXT, E = t.DOM, h = E.createElement, k =
						document.createDocumentFragment(), m = this.getEls(), y = this.data.minYear, v = this.data.maxYear, D = a; D <=
					l; D += 1) {
					var T = this.getDate(),
						C = D === t.getToday().year,
						f = D === T.year,
						Y = r,
						N = h("div", {
							"data-year": D + "-1-1"
						}, [h("span", {
							className: p
						}, [D])]);
					s ? Y += " " + i : n && (Y += " " + o), C && (Y += " " + g), f && (Y += " " + c, m.year = N), (D < y || D >
						v) && (Y += " " + u), N.className = Y, k.appendChild(N)
				}
				return k
			}
		}, {
			key: "_renderFooter",
			value: function() {
				var e = this.get("STYLES"),
					a = e.TEXT,
					l = this.getEls(),
					s = l.today.querySelector("." + a),
					n = t.getToday(),
					d = null,
					r = function e() {
						var t = l.time.querySelector("." + a),
							s = new Date,
							n = s.getHours(),
							r = s.getMinutes(),
							i = s.getSeconds();
						d && clearTimeout(d), 10 > n && (n = "0" + n), 10 > r && (r = "0" + r), 10 > i && (i = "0" + i), t.innerHTML =
							n + ":" + r + ":" + i, d = setTimeout(e, 1e3)
					};
				return s.innerHTML = "\u4ECA\u5929\uFF1A" + n.text, t.DOM.setAttribute(s, "data-date", n.value), this.get(
					"hasClock") && r(), this
			}
		}, {
			key: "_titleClick",
			value: function() {
				var e = this.get("viewMode");
				return e += 1, 2 < e && (e = 2), this.update(e), this
			}
		}, {
			key: "_prevClick",
			value: function() {
				return this.prev(), this
			}
		}, {
			key: "_nextClick",
			value: function() {
				return this.next(), this
			}
		}, {
			key: "_dateClick",
			value: function(e) {
				var t, a = e.delegateTarget,
					l = a.getAttribute("data-date");
				return this.pickDate(a), t = this.getPicked(), console.log("------------- _dateClick -------------"),
					"single" === this.get("pickMode") ? console.log(l) : console.log(t), this
			}
		}, {
			key: "_monthClick",
			value: function(e) {
				var t = e.delegateTarget,
					a = t.getAttribute("data-month");
				return this.pickMonth(t), console.log("------------- _monthClick -------------"), console.log(a), this
			}
		}, {
			key: "_yearClick",
			value: function(e) {
				var t = e.delegateTarget,
					a = t.getAttribute("data-year");
				return this.pickYear(t), console.log("------------- _yearClick -------------"), console.log(a), this
			}
		}, {
			key: "_todayClick",
			value: function() {
				var e = this.getEls(),
					a = t.getToday().text;
				return this.pickToday(), this.pickDate(e.dates.querySelector("[data-date=\"" + a + "\"]")), console.log(
					"------------- _todayClick -------------"), console.log(a), this
			}
		}], [{
			key: "getYear",
			value: function(e) {
				var a = e ? new Date(t.toAllSupported(e)) : new Date,
					l = a.getFullYear();
				return {
					value: l,
					text: l.toString(),
					fullText: l+" " //1227+ "\u5E74"
				}
			}
		}, {
			key: "getMonth",
			value: function(e) {
				var a = e ? new Date(t.toAllSupported(e)) : new Date,
					l = t.getYear(e),
					s = a.getMonth();
				return s += 1, {
					value: s,
					text: l.text + "-" + s,
					fullText: l.fullText + s+" "//1227 + "\u6708"
				}
			}
		}, {
			key: "getDate",
			value: function(e) {
				var a = e ? new Date(t.toAllSupported(e)) : new Date,
					l = t.getYear(e),
					s = t.getMonth(e),
					n = a.getDate(),
					d = t.getDay(e),
					r = l.value + "-" + s.value + "-" + n,
					i = s.fullText + n ;//1227+ "\u65E5"
				return {
					year: l.value,
					month: s.value,
					date: n,
					day: d.value,
					text: r,
					fullText: i + " " + d.fullText
				}
			}
		}, {
			key: "getDay",
			value: function(e) {
				var a = e ? new Date(t.toAllSupported(e)) : new Date,
					l = a.getDay(),
					s = t.defaults.DAYS[l];
				return {
					value: l,
					text: s,
					fullText: s//1227"\u661F\u671F" + 
				}
			}
		}, {
			key: "getToday",
			value: function() {
				return t.getDate()
			}
		}, {
			key: "getYears",
			value: function(e) {
				var a = t.getYear(e).value,
					l = a.toString().split(""),
					s = parseInt(l[l.length - 1], 10),
					n = 0,
					d = 0;
				return 0 === s ? (n = a, d = a + 9) : 9 === s ? (n = a - 9, d = a) : (n = a - s, d = a + (9 - s)), {
					start: n,
					end: d
				}
			}
		}, {
			key: "getWeekRanges",
			value: function(e) {
				var a = t.defaults.DATES,
					l = t.isLeapYear,
					s = t.getDay(e).value,
					n = e.split("-"),
					d = parseInt(n[0], 10),
					r = parseInt(n[1], 10),
					i = parseInt(n[2], 10),
					o = a[r - 1],
					g = d,
					c = r,
					u = i - s,
					p = d,
					E = r,
					h = i + (6 - s),
					k = 0;
				return l(d) && 2 === r && (o += 1), 1 > u && (k = r - 2, c -= 1, 0 > k ? (g -= 1, c = 12, u = a[11] + u) : u =
					a[k] + u), h > o && (E += 1, h -= o, 11 < k && (p += 1, E = 1)), t.getRanges(g + "-" + c + "-" + u, p + "-" +
					E + "-" + h)
			}
		}, {
			key: "getRanges",
			value: function(e, a) {
				var l, s, n, d = [],
					r = e.split("-"),
					i = a.split("-"),
					o = new Date,
					g = new Date;
				for (o.setUTCFullYear(parseInt(r[0], 10), parseInt(r[1], 10) - 1, parseInt(r[2], 10)), g.setUTCFullYear(
						parseInt(i[0], 10), parseInt(i[1], 10) - 1, parseInt(i[2], 10)), l = o.getTime(), s = g.getTime(), n = l; n <=
					s; n += 86400000) d.push(t.getDate(n).text);
				return d
			}
		}, {
			key: "isLeapYear",
			value: function(e) {
				return (0 == e % 4 || 0 == e % 400) && 0 != e % 100
			}
		}, {
			key: "isToday",
			value: function(e) {
				return t.isDatesEqual(e)
			}
		}, {
			key: "isDatesEqual",
			value: function(e, a) {
				var l = t.getDate;
				return t.isEqual(l(e).text, l(a).text)
			}
		}, {
			key: "isEqual",
			value: function(e, a) {
				var l = t.toAllSupported;
				return new Date(l(e)).getTime() === new Date(l(a)).getTime()
			}
		}, {
			key: "toAllSupported",
			value: function(e) {
				var a = t.Utils,
					l = [];
				return a.isNumber(e) ? e : a.isString(e) ? (e.indexOf("-") ? l = e.split("-") : e.indexOf("/") && (l = e.split(
					"/")), 1 === l.length ? (l.push("1"), l.push("1")) : 2 === l.length && (4 === l[0].length ? l.push("1") :
					4 === data[1].length && l.unshift("1")), l.join("/")) : void 0
			}
		}]), t
	}();
	return l.defaults = {
		parent: "calendar",
		time: "",
		viewMode: 0,
		pickMode: "single",
		hasSwitcher: !0,
		hasFooter: !0,
		hasClock: !0,
		onDatePick: null,
		onMonthPick: null,
		onYearPick: null,
		onTodayPick: null,
		MONTHS: [11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2],
		DAYS: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
		DATES: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		STYLES: {
			WRAP: "cal-md",
			WRAP_WITHOUT_FOOTER: "cal-md-without-footer",
			HEADER: "cal-hd",
			TITLE: "cal-title",
			SWITCHER: "cal-switcher",
			PREV: "cal-prev",
			ICON_PREV: "icon-angle-up",
			NEXT: "cal-next",
			ICON_NEXT: "icon-angle-down",
			BODY: "cal-bd",
			WEEK: "cal-week",
			WEEKEND: "cal-weekend",
			DAY: "cal-day",
			DATES: "cal-dates",
			DATE: "cal-date",
			DATE_PREV: "cal-date-prev",
			DATE_NEXT: "cal-date-next",
			MONTHS: "cal-months",
			MONTH: "cal-month",
			MONTH_PREV: "cal-month-prev",
			MONTH_NEXT: "cal-month-next",
			YEARS: "cal-years",
			YEAR: "cal-year",
			YEAR_PREV: "cal-year-prev",
			YEAR_NEXT: "cal-year-next",
			FOOTER: "cal-ft",
			FOOTER_DATE: "cal-ft-date",
			TODAY: "cal-today",
			FOOTER_TIME: "cal-ft-time",
			TIME: "cal-time",
			TEXT: "cal-text",
			CURRENT: "cal-current",
			PICKED: "cal-picked",
			PICKED_RANGE: "cal-picked-range",
			PICKED_POINT: "cal-picked-point",
			DISABLED: "cal-disabled",
			HIDDEN: "cal-hidden"
		}
	}, l.Utils = {
		uuid: 0,
		isString: function(e) {
			return "string" == typeof e
		},
		isNumber: function(e) {
			return "number" == typeof e
		},
		isArray: function(e) {
			return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.apply(e)
		},
		isFunction: function(e) {
			return "function" == typeof e || "[object Function]" === Object.prototype.toString.apply(e)
		},
		isElement: function(e) {
			return e && e.nodeName && e.tagName && 1 === e.nodeType
		},
		guid: function(e) {
			var t = l.Utils;
			return t.uuid += 1, e ? e + "-" + t.uuid : "guid-" + t.uuid
		},
		trim: function(e) {
			return e.replace(/^\s+/g, "").replace(/\s+$/g, "")
		},
		stripTags: function(e) {
			return e.replace(/<\/?[^>]+(>|$)/g, "")
		}
	}, l.DOM = {
		createElement: function(e, t, a) {
			var s = l.Utils,
				n = document.createElement(e);
			for (var d in t) t.hasOwnProperty(d) && l.DOM.setAttribute(n, d, t[d]);
			return s.isArray(a) && a.forEach(function(e) {
				var t;
				if (s.isElement(e)) t = e;
				else if (s.isString(e) || s.isNumber(e)) {
					var a = s.isString(e) ? s.trim(s.stripTags(e)) : e.toString();
					t = document.createTextNode(a)
				}
				n.appendChild(t)
			}), n
		},
		setAttribute: function(e, t, a) {
			var l = e.tagName.toLowerCase();
			"style" === t ? e.style.cssText = a : "value" === t ? "input" === l || "textarea" === l ? e.value = a : e.setAttribute(
				t, a) : "className" === t ? e.className = a : e.setAttribute(t, a)
		},
		hasClass: function(e, t) {
			var a = e.className;
			return !!a && a.match(new RegExp("(\\s|^)" + t + "(\\s|$)"))
		},
		addClass: function(e, t) {
			var a = e.className;
			return !l.DOM.hasClass(e, t) && void(a += 0 < a.length ? " " + t : t, e.className = a)
		},
		removeClass: function(e, t) {
			var a = e.className;
			return !!(a && l.DOM.hasClass(e, t)) && void(a = l.Utils.trim(a.replace(t, "")), e.className = a)
		}
	}, l.Delegate = {
		on: function(t, a, s, n, d, e, r) {
			var i = l.Delegate;
			return ("mouseenter" === s || "mouseleave" === s) && (e = !0), n._delegateWrapper = n, t.addEventListener(s,
				function l(o) {
					var e = i.getDelegateTarget(t, o.target, a);
					o.delegateTarget = e, e && (!0 === r && i.off(t, s, l), n.call(d || t, o))
				}, e || !1), n
		},
		once: function(e, t, a, s, n, d) {
			l.Delegate.on(e, t, a, s, n, d, !0)
		},
		off: function(e, t, a, l) {
			a._delegateWrapper && (a = a._delegateWrapper, delete a._delegateWrapper), ("mouseenter" === t || "mouseleave" ===
				t) && (l = !0), e.removeEventListener(t, a, l || !1)
		},
		stop: function(e) {
			var t = l.Delegate;
			t.stopPropagation(e), t.preventDefault(e)
		},
		stopPropagation: function(e) {
			var t = window.event;
			e.stopPropagation ? e.stopPropagation() : t.cancelBubble = !0
		},
		preventDefault: function(e) {
			var t = window.event;
			e.preventDefault ? e.preventDefault() : t.returnValue = !1
		},
		getDelegateTarget: function(e, t, a) {
			for (; t && t !== e;) {
				if (l.DOM.hasClass(t, a.replace(".", ""))) return t;
				t = t.parentElement
			}
			return null
		}
	}, l.Utils.isFunction(Object.assign) || Object.defineProperty(Object, "assign", {
		value: function(e) {
			if (null == e) throw new TypeError("Cannot convert undefined or null to object");
			for (var t, a = Object(e), l = 1; l < arguments.length; l++)
				if (t = arguments[l], null != t)
					for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (a[s] = t[s]);
			return a
		},
		writable: !0,
		configurable: !0
	}), l
});
