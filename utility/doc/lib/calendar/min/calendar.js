(function(e, t) {
	"function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.Calendar =
		t()
})(this, function() {
	"use strict";

	function e(e, t) {
		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}

	function t(e, t) {
		for (var a, s = 0; s < t.length; s++) a = t[s], a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a &&
			(a.writable = !0), Object.defineProperty(e, a.key, a)
	}

	function a(e, a, s) {
		return a && t(e.prototype, a), s && t(e, s), e
	}
	var s = function() {
		function s(t) {
			return e(this, s), this.definition = [], this.attributes = {
				parent: "",
				time: "",
				viewMode: 0,
				pickMode: "single",
				hasSwitcher: !1,
				hasFooter: !0,
				hasClock: !0,
				onDatePick: null,
				onMonthPick: null,
				onYearPick: null,
				onTodayPick: null,
				mounted: null,
				task: {},
				MONTHS: [],
				DAYS: ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"],
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
			}, this.initialize(t).render().addEventListeners(), this
		}
		return a(s, [{
			key: "initialize",
			value: function(e) {
				var t, a, n, l, d, r, i, o = s.getYear().value;
				return this.set(s.defaults).set(e), a = this.get("time"), t = this.get("pickMode"), n = s.getMonth(a), l = n.text,
					this.setYear(a).setMonth(a).setDate(a)._setYears(a), "multiple" === t ? this.data.picked.push(this.getDate()
						.text) : "range" === t ? (r = l + "-" + 1, i = l + "-" + this.get("DATES")[n.value - 1], this.data.picked = [
						r, i
					]) : "week" === t ? (d = s.getWeekRanges(a), r = d[0], i = d[d.length - 1], this.data.picked = [r, i]) :
					void 0, (this.data.minYear = o - 100, this.data.maxYear = o + 100, this._createElements(), this)
			}
		}, {
			key: "render",
			value: function() {
				var e = this.getEls(),
					t = e.wrap,
					a = e.header,
					s = e.switcher,
					n = e.body,
					l = e.footer,
					d = document.createDocumentFragment();
				return this._renderTitle(), a.appendChild(e.title), this.get("hasSwitcher") && (s.appendChild(e.prev), s.appendChild(
						e.next), a.appendChild(s)), this._renderDays(), n.appendChild(e.week), this._renderDates(), n.appendChild(e
						.dates), this._renderMonths(), n.appendChild(e.months), this._renderYears(), n.appendChild(e.years), this.get(
						"hasFooter") && (this._renderFooter(), l.appendChild(e.today), this.get("hasClock") && l.appendChild(e.time)),
					t.appendChild(a), t.appendChild(n), this.get("hasFooter") && t.appendChild(l), d.appendChild(t), e.parent.appendChild(
						d), this
			}
		}, {
			key: "addEventListeners",
			value: function() {
				var e = this.get("STYLES"),
					t = "click",
					a = "." + e.TITLE,
					n = "." + e.PREV,
					l = "." + e.NEXT,
					d = "." + e.DATE,
					r = "." + e.MONTH,
					i = "." + e.YEAR,
					o = "." + e.TODAY,
					g = s.Delegate,
					u = this.getEls().wrap;
				return g.on(u, a, t, this._titleClick, this), this.get("hasSwitcher") && (g.on(u, n, t, this._prevClick, this),
					g.on(u, l, t, this._nextClick, this)), g.on(u, d, t, this._dateClick, this), g.on(u, r, t, this._monthClick,
					this), g.on(u, i, t, this._yearClick, this), g.on(u, ".task", "mouseover", this._datemouseover, this), g.on(
					u, ".task", "mouseout", this._datemouseout, this), this.get("hasClock") && g.on(u, o, t, this._todayClick,
					this), this
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
				var e = s.Delegate,
					t = this.getEls().wrap;
				return e.off(t, "click", this._titleClick), this.get("hasSwitcher") && (e.off(t, "click", this._prevClick), e
						.off(t, "click", this._nextClick)), e.off(t, "click", this._dateClick), e.off(t, "click", this._monthClick),
					e.off(t, "click", this._yearClick), this.get("hasClock") && e.off(t, "click", this._todayClick), this
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
				return this.data.year = s.getYear(e).value, this
			}
		}, {
			key: "getMonth",
			value: function() {
				return this.data.month
			}
		}, {
			key: "setMonth",
			value: function(e) {
				return this.data.month = s.getMonth(e).value, this
			}
		}, {
			key: "getDate",
			value: function() {
				return this.data.date
			}
		}, {
			key: "setDate",
			value: function(e) {
				return this.data.date = s.getDate(e), this
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
				let a = event,
					e = a.target || a.srcElement;
				if (!!e.getAttribute("color")) {
					let t = this.definition,
						s = e.getAttribute("color");
					$(".definition-gray").removeClass("definition-gray"), t.includes(s) ? t.remove(s) : t.push(s), t.map(e => {
						$(`.${e}`).addClass("definition-gray"), $(`div[color="${e}"]`).addClass("definition-gray")
					}), a.stopPropagation()
				}
				return this;
				var t = this.get("STYLES"),
					n = t.HIDDEN,
					l = s.DOM,
					d = l.addClass,
					r = l.removeClass,
					i = this.getEls(),
					o = i.week,
					g = i.dates,
					u = i.months,
					c = i.years
			}
		}, {
			key: "prev",
			value: function() {
				var e, t = this.getYears(),
					a = t.start,
					s = this.getYear(),
					n = this.getMonth(),
					l = this.data.minYear;
				switch (this.get("viewMode")) {
					case 0:
						n -= 1, 1 > n && (n = 12, s -= 1, s < l && (s = l)), e = s + "-" + n + "-1", this.setYear(e).setMonth(e);
						break;
					case 1:
						s -= 1, s < l && (s = l), this.setYear(s + "-1-1");
						break;
					case 2:
						a -= 10, a < l && (a = l + 9), this._setYears(a.toString());
				}
				return this.updateView(), this
			}
		}, {
			key: "next",
			value: function() {
				var e, t = this.getYears(),
					a = t.start,
					s = this.getYear(),
					n = this.getMonth(),
					l = this.data.maxYear;
				switch (this.get("viewMode")) {
					case 0:
						n += 1, 12 < n && (n = 1, s += 1, s > l && (s = l)), e = s + "-" + n + "-1", this.setYear(e).setMonth(e);
						break;
					case 1:
						s += 1, s > l && (s = l), this.setYear(s + "-1-1");
						break;
					case 2:
						a += 10, a > l && (a = l - 9), this._setYears(a.toString());
				}
				return this.updateView(), this
			}
		}, {
			key: "pickDate",
			value: function(e) {
				var t, a = this.get("STYLES"),
					n = a.PICKED,
					l = s.DOM,
					d = l.hasClass,
					r = l.addClass,
					i = l.removeClass,
					o = s.Utils.isFunction,
					g = this.get("pickMode"),
					u = this.getEls(),
					c = e.getAttribute("data-date"),
					p = this.get("onDatePick"),
					E = null;
				if (d(e, n)) switch (g) {
					case "single":
					case "week":
						return !1;
					case "multiple":
						i(e, n), this._removePicked(c), t = this.getPicked(), this.setDate(t[t.length - 1]), o(p) && p(t, e, this);
						break;
					case "range":
						this.data.picked = [], this.data.picked.push(c), this.setDate(c), u.date = e, this._updateDateRanges(), o(
							p) && p(this.getPicked(), e, this);
				} else switch (this.setYear(c).setMonth(c), g) {
					case "single":
						E = u.date, E && i(E, n), r(e, n), u.date = e, this.setDate(c), o(p) && p(c, e, this);
						break;
					case "multiple":
						this.data.picked.push(c), this.data.picked.sort(), t = this.getPicked(), this.setDate(t[t.length - 1]), r(
							e, n), o(p) && p(this.getPicked(), e, this);
						break;
					case "range":
						switch (this.data.picked.length) {
							case 0:
							case 1:
								this.data.picked.push(c), 2 === this.data.picked.length && this.data.picked.sort(), t = this.getPicked(),
									this.setDate(t[t.length - 1]), u.date = e, this._updateDateRanges(), o(p) && p(t, e, this);
								break;
							case 2:
								this.data.picked = [], this.data.picked.push(c), u.date = e, this._updateDateRanges();
						}
						break;
					case "week":
						var m = s.getWeekRanges(c);
						this.data.picked = [m[0], m[m.length - 1]], this.setDate(m[m.length - 1]), u.date = e, this._updateWeekRanges(),
							o(p) && p(this.getPicked(), e, this);
				}
				return this
			}
		}, {
			key: "pickMonth",
			value: function(e) {
				var t = this.get("STYLES").PICKED,
					a = s.DOM,
					n = this.getEls(),
					l = n.month,
					d = e.getAttribute("data-month"),
					r = this.get("onMonthPick");
				return a.hasClass(e, t) ? this.update() : (l && a.removeClass(l, t), a.addClass(e, t), n.month = e, this.setYear(
					d).setMonth(d)._setYears(d).update()), s.Utils.isFunction(r) && r(d, e, this), this
			}
		}, {
			key: "pickYear",
			value: function(e) {
				var t = this.get("STYLES").PICKED,
					a = s.DOM,
					n = this.getEls(),
					l = n.year,
					d = e.getAttribute("data-year"),
					r = this.get("onYearPick");
				return a.hasClass(e, t) ? this.setYear(d).update(1) : (l && a.removeClass(l, t), a.addClass(e, t), n.year = e,
					this.setYear(d)._setYears(d).update(1)), s.Utils.isFunction(r) && r(d, e, this), this
			}
		}, {
			key: "pickToday",
			value: function() {
				var e = s.getToday().value,
					t = this.get("onTodayPick");
				return this.setYear(e).setMonth(e).setDate(e)._setYears(e).update(), s.Utils.isFunction(t) && t(e, this.getEls()
					.dates.querySelector("[data-date=" + e + "]"), this), this
			}
		}, {
			key: "hide",
			value: function() {
				var e = this.get("STYLES").HIDDEN,
					t = this.getEls().wrap;
				return s.DOM.addClass(t, e), this
			}
		}, {
			key: "show",
			value: function() {
				var e = this.get("STYLES").HIDDEN,
					t = this.getEls().wrap;
				return s.DOM.removeClass(t, e), this
			}
		}, {
			key: "toggle",
			value: function() {
				var e = this.get("STYLES").HIDDEN,
					t = this.getEls().wrap;
				return s.DOM.hasClass(t, e) ? this.show() : this.hide(), this
			}
		}, {
			key: "_setYears",
			value: function(e) {
				return this.data.years = s.getYears(e), this
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
					t = e.WRAP,
					a = e.WRAP_WITHOUT_FOOTER,
					n = e.HEADER,
					l = e.TITLE,
					d = e.SWITCHER,
					r = e.PREV,
					i = e.ICON_PREV,
					o = e.NEXT,
					g = e.ICON_NEXT,
					u = e.BODY,
					c = e.WEEK,
					p = e.DATES,
					E = e.MONTHS,
					m = e.YEARS,
					h = e.FOOTER,
					k = e.FOOTER_DATE,
					y = e.TODAY,
					v = e.FOOTER_TIME,
					T = e.TIME,
					D = e.TEXT,
					f = e.HIDDEN,
					C = " ",
					Y = this.get("hasFooter"),
					S = this.getEls(),
					N = s.DOM.createElement,
					_ = t,
					M = c,
					A = p,
					P = E,
					O = m;
				switch (this.get("viewMode")) {
					case 0:
						P += C + f, O += C + f;
						break;
					case 1:
						M += C + f, A += C + f, O += C + f;
						break;
					case 2:
						M += C + f, A += C + f, P += C + f;
				}
				return Y || (_ += C + a), S.parent = document.getElementById(this.get("parent")), S.wrap = N("div", {
					id: s.Utils.guid("calendar"),
					className: _
				}), S.header = N("div", {
					className: n
				}), S.title = N("h4", {
					className: l
				}, [N("span", {
					className: D
				})]), this.get("hasSwitcher") && (S.switcher = N("div", {
					className: d
				}), S.prev = N("div", {
					className: r
				}, [N("span", {
					className: D
				}, [N("i", {
					className: i
				})])]), S.next = N("div", {
					className: o
				}, [N("span", {
					className: D
				}, [N("i", {
					className: g
				})])])), S.body = N("div", {
					className: u
				}), S.week = N("div", {
					className: M
				}), S.dates = N("div", {
					className: A
				}), S.months = N("div", {
					className: P
				}), S.years = N("div", {
					className: O
				}), Y && (S.footer = N("div", {
					className: h
				}), S.today = N("div", {
					className: k
				}, [N("p", {
					className: y
				}, [N("span", {
					className: D
				})])]), this.get("hasClock") && (S.time = N("div", {
					className: v
				}, [N("p", {
					className: T
				}, [N("span", {
					className: D
				})])]))), !this.attributes.mounted || this.attributes.mounted(this), this
			}
		}, {
			key: "_renderTitle",
			value: function() {
				var e = this.getEls().title.querySelector("." + this.get("STYLES").TEXT),
					t = this.getYears(),
					a = this.getYear(),
					n = "";
				switch (this.get("viewMode")) {
					case 0:
						n = s.getMonth(a + "-" + this.getMonth() + "-1").text;
						break;
					case 1:
						n = s.getYear(a + "-1-1").fullText;
						break;
					case 2:
						n = t.start + " - " + t.end;
				}
				e.innerHTML = n + " color code definition";
				let l = this.attributes.task(),
					d = {},
					r = "";
				return Object.keys(l).map(e => {
					l[e].map(e => {
						d[e.bgcolor] ? d[e.bgcolor].number += 1 : d[e.bgcolor] = {
							text: e.text,
							number: 1
						}
					})
				}), Object.keys(d).map(e => {
					r +=
						`<div class='definition' color='${e}'><span>${d[e].text}</span><i class='${e}' color='${e}'>${d[e].number}</i></div>`
				}), e.innerHTML = n + r, this
			}
		}, {
			key: "_renderDays",
			value: function() {
				var e = this.get("STYLES"),
					t = e.DAY,
					a = e.WEEKEND,
					n = e.TEXT,
					l = this.get("DAYS"),
					d = s.DOM.createElement,
					r = document.createDocumentFragment();
				return l.forEach(function(e, s) {
					var i = 0 === s || s === l.length - 1 ? t + " " + a : t;
					r.appendChild(d("div", {
						className: i
					}, [d("span", {
						className: n
					}, [e])]))
				}), this.getEls().week.appendChild(r), this
			}
		}, {
			key: "_renderDates",
			value: function() {
				var e, t = this.get("DATES"),
					a = s.isLeapYear,
					n = document.createDocumentFragment(),
					l = this.getYear(),
					d = this.getMonth(),
					r = t[d - 1],
					i = s.getDay(l + "-" + d + "-" + 1).value,
					o = 0 > d - 2 ? l - 1 : l,
					g = 0 > d - 2 ? 12 : d - 1,
					u = t[g - 1],
					c = 12 === d ? l + 1 : l,
					p = 12 === d ? 1 : d + 1;
				return a(l) && 2 === g ? u += 1 : a(l) && 2 === d && (r += 1), e = 42 - (i + r), 0 !== i && n.appendChild(
					this._getDatesFragment({
						year: o,
						month: g,
						start: u - (i - 1),
						end: u,
						isPrev: !0,
						isNext: !1
					})), n.appendChild(this._getDatesFragment({
					year: l,
					month: d,
					start: 1,
					end: r,
					isPrev: !1,
					isNext: !1
				})), 0 < e && n.appendChild(this._getDatesFragment({
					year: c,
					month: p,
					start: 1,
					end: e,
					isPrev: !1,
					isNext: !0
				})), this.getEls().dates.appendChild(n), this
			}
		}, {
			key: "_repaintDates",
			value: function() {
				var e = this.get("STYLES").HIDDEN,
					t = s.DOM,
					a = this.getEls().dates;
				return t.addClass(a, e), a.innerHTML = "", t.removeClass(a, e), this._renderDates(), this
			}
		}, {
			key: "_getDatesFragment",
			value: function(e) {
				for (var t = this, a = e.year, n = e.month, l = e.start, d = e.end, r = e.isPrev, i = e.isNext, o = " ", g =
						this.get("STYLES"), u = g.DATE, c = g.DATE_PREV, p = g.DATE_NEXT, E = g.CURRENT, m = g.PICKED, h = g.PICKED_RANGE,
						k = g.WEEKEND, y = g.TEXT, v = s.DOM.createElement, T = s.isDatesEqual, D = document.createDocumentFragment(),
						f = this.getEls(), C = l, Y = this.get("pickMode"), S = this.getPicked(), N = function() {
							var e = a + "-" + n + "-" + C,
								l = s.isToday(e),
								d = s.getDay(e),
								g = [v("span", {
									className: y
								}, [C])];
							!t.attributes.task()[e] || t.attributes.task()[e].map(e => {
								g.push(v("div", {
									className: e.bgcolor + " task",
									tooltip:e.tooltip
								}, [e.text]))
							});
							var N = "",
								_ = void 0;
							switch (_ = v("div", {
									"data-date": e
								}, g), N += u, r ? N += o + c : i && (N += o + p), l && (N += o + E), (0 === d.value || 6 === d.value) &&
								(N += o + k), Y) {
								case "single":
									var M = t.getDate().text,
										A = T(e, M);
									A && (N += o + m, f.date = _);
									break;
								case "multiple":
									S.forEach(function(t) {
										var a = T(e, t);
										a && (N += o + m)
									});
									break;
								case "range":
								case "week":
									var P = [];
									2 === S.length ? (P = s.getRanges(S[0], S[1]), P.forEach(function(t, a) {
										var s = T(e, t);
										return !!s && void(0 !== a && a !== P.length - 1 ? (N += o + m, N += o + h) : (0 === a || a === P.length -
											1) && (N += o + m))
									})) : 1 === S.length && (N += o + m);
							}
							_.className = N, D.appendChild(_)
						}; C <= d; C += 1) N();
				return D
			}
		}, {
			key: "_updateDateRanges",
			value: function() {
				var e = this.get("STYLES"),
					t = e.PICKED,
					a = e.PICKED_RANGE,
					n = s.DOM,
					l = n.hasClass,
					d = n.removeClass,
					r = n.addClass,
					i = this.getEls(),
					o = this.elements.date,
					g = i.dates,
					u = g.querySelectorAll("." + t);
				switch (this.data.picked.length) {
					case 1:
						u.forEach(function(e) {
							d(e, t), l(e, a) && d(e, a)
						}), r(o, t);
						break;
					case 2:
						var c = s.getRanges(this.data.picked[0], this.data.picked[1]);
						c.forEach(function(e, s) {
							var n = g.querySelector("[data-date=\"" + e + "\"]");
							0 < s && s < c.length - 1 && (r(n, t), r(n, a))
						}), r(o, t);
				}
				return this
			}
		}, {
			key: "_updateWeekRanges",
			value: function() {
				var e = this.get("STYLES"),
					t = e.PICKED,
					a = e.PICKED_RANGE,
					n = s.DOM,
					l = n.removeClass,
					d = n.addClass,
					r = this.getEls(),
					o = r.dates,
					i = o.querySelectorAll("." + t),
					g = this.getPicked(),
					u = s.getWeekRanges(g[0]);
				return i.forEach(function(e) {
					l(e, a), l(e, t)
				}), u.forEach(function(e, s) {
					var n = o.querySelector("[data-date=\"" + e + "\"]");
					0 < s && s < u.length - 1 ? (d(n, t), d(n, a)) : (0 == s || s == u.length - 1) && d(n, t)
				}), this
			}
		}, {
			key: "_renderMonths",
			value: function() {
				var e = this,
					t = " ",
					a = this.get("STYLES"),
					n = a.CURRENT,
					l = a.PICKED,
					d = a.MONTH,
					r = a.MONTH_PREV,
					o = a.MONTH_NEXT,
					g = a.TEXT,
					i = this.get("MONTHS"),
					u = s.DOM,
					c = u.createElement,
					p = document.createDocumentFragment(),
					E = this.getEls(),
					m = this.getYear(),
					h = s.getToday();
				return i.forEach(function(a, s) {
					var i, u = e.getDate(),
						E = d;
					2 > s ? (E += t + r, m - 1 === u.year && a === u.month && (E += t + l), i = c("div", {
						className: E,
						"data-month": m - 1 + "-" + a + "-1"
					}, [c("span", {
						className: g
					}, [a])])) : 2 <= s && 13 >= s ? (m === h.year && a === h.month && (E += " " + n), m === u.year && a ===
						u.month && (E += t + l), i = c("div", {
							className: E,
							"data-month": m + "-" + a + "-1"
						}, [c("span", {
							className: g
						}, [m + "-" + a])])) : 13 < s && 15 >= s && (E += t + o, m + 1 === u.year && a === u.month && (E += t +
						l), i = c("div", {
						className: E,
						"data-month": m + 1 + "-" + a + "-1"
					}, [c("span", {
						className: g
					}, [a])])), p.appendChild(i)
				}), E.months.appendChild(p), this
			}
		}, {
			key: "_repaintMonths",
			value: function() {
				var e = this.get("STYLES").HIDDEN,
					t = s.DOM,
					a = this.getEls().months;
				return t.addClass(a, e), a.innerHTML = "", t.removeClass(a, e), this._renderMonths(), this
			}
		}, {
			key: "_renderYears",
			value: function() {
				var e = this.getYears(),
					t = e.start,
					a = e.end,
					s = document.createDocumentFragment();
				return s.appendChild(this._getYearsFragment({
					start: t - 3,
					end: t - 1,
					isPrev: !0,
					isNext: !1
				})), s.appendChild(this._getYearsFragment({
					start: t,
					end: a,
					isPrev: !1,
					isNext: !1
				})), s.appendChild(this._getYearsFragment({
					start: a + 1,
					end: a + 3,
					isPrev: !1,
					isNext: !0
				})), this.getEls().years.appendChild(s), this
			}
		}, {
			key: "_repaintYears",
			value: function() {
				var e = this.get("STYLES").HIDDEN,
					t = s.DOM,
					a = this.getEls().years;
				return t.addClass(a, e), a.innerHTML = "", t.removeClass(a, e), this._renderYears(), this
			}
		}, {
			key: "_getYearsFragment",
			value: function(e) {
				for (var t = e.start, a = e.end, n = e.isPrev, l = e.isNext, d = this.get("STYLES"), r = d.YEAR, i = d.YEAR_PREV,
						o = d.YEAR_NEXT, g = d.CURRENT, u = d.PICKED, c = d.DISABLED, p = d.TEXT, E = s.DOM, m = E.createElement, h =
						document.createDocumentFragment(), k = this.getEls(), y = this.data.minYear, v = this.data.maxYear, T = t; T <=
					a; T += 1) {
					var D = this.getDate(),
						f = T === s.getToday().year,
						C = T === D.year,
						Y = r,
						S = m("div", {
							"data-year": T + "-1-1"
						}, [m("span", {
							className: p
						}, [T])]);
					n ? Y += " " + i : l && (Y += " " + o), f && (Y += " " + g), C && (Y += " " + u, k.year = S), (T < y || T >
						v) && (Y += " " + c), S.className = Y, h.appendChild(S)
				}
				return h
			}
		}, {
			key: "_renderFooter",
			value: function() {
				var e = this.get("STYLES"),
					t = e.TEXT,
					a = this.getEls(),
					n = a.today.querySelector("." + t),
					l = s.getToday(),
					d = null,
					r = function e() {
						var s = a.time.querySelector("." + t),
							n = new Date,
							l = n.getHours(),
							r = n.getMinutes(),
							i = n.getSeconds();
						d && clearTimeout(d), 10 > l && (l = "0" + l), 10 > r && (r = "0" + r), 10 > i && (i = "0" + i), s.innerHTML =
							l + ":" + r + ":" + i, d = setTimeout(e, 1e3)
					};
				return n.innerHTML = "Today:" + l.text, s.DOM.setAttribute(n, "data-date", l.value), this.get("hasClock") &&
					r(), this
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
			key: "_datemouseover",
			value: function(e) {
				var t = e.delegateTarget;
				let a = $(t).offset().top,
					s = $(t).offset().left,
					//tooltip =that.attributes.task()a.getAttribute("data-date")
					
				$("#" + this.attributes.parent).append("<div class='tag'>Tooltip</div>"), $(".tag").css({
					top: a - 40 - $("#" + this.attributes.parent).offset().top,
					left: t.offsetWidth / 2 + s - 25 - $("#" + this.attributes.parent).offset().left
				})
			}
		}, {
			key: "_datemouseout",
			value: function(e) {
				e.delegateTarget
			}
		}, {
			key: "_dateClick",
			value: function(e) {
				var t, a = e.delegateTarget,
					s = a.getAttribute("data-date");
				return this.pickDate(a), t = this.getPicked(), console.log("------------- _dateClick -------------"),
					"single" === this.get("pickMode") ? console.log(s) : console.log(t), this
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
					t = s.getToday().text;
				return this.pickToday(), this.pickDate(e.dates.querySelector("[data-date=\"" + t + "\"]")), console.log(
					"------------- _todayClick -------------"), console.log(t), this
			}
		}], [{
			key: "getYear",
			value: function(e) {
				var t = e ? new Date(s.toAllSupported(e)) : new Date,
					a = t.getFullYear();
				return {
					value: a,
					text: a.toString(),
					fullText: a + "\u5E74"
				}
			}
		}, {
			key: "getMonth",
			value: function(e) {
				var t = e ? new Date(s.toAllSupported(e)) : new Date,
					a = s.getYear(e),
					n = t.getMonth();
				return n += 1, {
					value: n,
					text: a.text + "-" + n,
					fullText: a.fullText + n + "\u6708"
				}
			}
		}, {
			key: "getDate",
			value: function(e) {
				var t = e ? new Date(s.toAllSupported(e)) : new Date,
					a = s.getYear(e),
					n = s.getMonth(e),
					l = t.getDate(),
					d = s.getDay(e),
					r = a.value + "-" + n.value + "-" + l,
					i = n.fullText + l + "\u65E5";
				return {
					year: a.value,
					month: n.value,
					date: l,
					day: d.value,
					text: r,
					fullText: i + " " + d.fullText
				}
			}
		}, {
			key: "getDay",
			value: function(e) {
				var t = e ? new Date(s.toAllSupported(e)) : new Date,
					a = t.getDay(),
					n = s.defaults.DAYS[a];
				return {
					value: a,
					text: n,
					fullText: "\u661F\u671F" + n
				}
			}
		}, {
			key: "getToday",
			value: function() {
				return s.getDate()
			}
		}, {
			key: "getYears",
			value: function(e) {
				var t = s.getYear(e).value,
					a = t.toString().split(""),
					n = parseInt(a[a.length - 1], 10),
					l = 0,
					d = 0;
				return 0 === n ? (l = t, d = t + 9) : 9 === n ? (l = t - 9, d = t) : (l = t - n, d = t + (9 - n)), {
					start: l,
					end: d
				}
			}
		}, {
			key: "getWeekRanges",
			value: function(e) {
				var t = s.defaults.DATES,
					a = s.isLeapYear,
					n = s.getDay(e).value,
					l = e.split("-"),
					d = parseInt(l[0], 10),
					r = parseInt(l[1], 10),
					i = parseInt(l[2], 10),
					o = t[r - 1],
					g = d,
					u = r,
					c = i - n,
					p = d,
					E = r,
					m = i + (6 - n),
					h = 0;
				return a(d) && 2 === r && (o += 1), 1 > c && (h = r - 2, u -= 1, 0 > h ? (g -= 1, u = 12, c = t[11] + c) : c =
					t[h] + c), m > o && (E += 1, m -= o, 11 < h && (p += 1, E = 1)), s.getRanges(g + "-" + u + "-" + c, p + "-" +
					E + "-" + m)
			}
		}, {
			key: "getRanges",
			value: function(e, t) {
				var a, n, l, d = [],
					r = e.split("-"),
					i = t.split("-"),
					o = new Date,
					g = new Date;
				for (o.setUTCFullYear(parseInt(r[0], 10), parseInt(r[1], 10) - 1, parseInt(r[2], 10)), g.setUTCFullYear(
						parseInt(i[0], 10), parseInt(i[1], 10) - 1, parseInt(i[2], 10)), a = o.getTime(), n = g.getTime(), l = a; l <=
					n; l += 86400000) d.push(s.getDate(l).text);
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
				return s.isDatesEqual(e)
			}
		}, {
			key: "isDatesEqual",
			value: function(e, t) {
				var a = s.getDate;
				return s.isEqual(a(e).text, a(t).text)
			}
		}, {
			key: "isEqual",
			value: function(e, t) {
				var a = s.toAllSupported;
				return new Date(a(e)).getTime() === new Date(a(t)).getTime()
			}
		}, {
			key: "toAllSupported",
			value: function(e) {
				var t = s.Utils,
					a = [];
				return t.isNumber(e) ? e : t.isString(e) ? (e.indexOf("-") ? a = e.split("-") : e.indexOf("/") && (a = e.split(
					"/")), 1 === a.length ? (a.push("1"), a.push("1")) : 2 === a.length && (4 === a[0].length ? a.push("1") :
					4 === data[1].length && a.unshift("1")), a.join("/")) : void 0
			}
		}]), s
	}();
	return s.defaults = {
		parent: "calendar",
		time: "",
		viewMode: 0,
		pickMode: "single",
		hasSwitcher: !1,
		hasFooter: !1,
		hasClock: !0,
		onDatePick: null,
		onMonthPick: null,
		onYearPick: null,
		onTodayPick: null,
		MONTHS: [11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2],
		DAYS: ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"],
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
	}, s.Utils = {
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
			var t = s.Utils;
			return t.uuid += 1, e ? e + "-" + t.uuid : "guid-" + t.uuid
		},
		trim: function(e) {
			return e.replace(/^\s+/g, "").replace(/\s+$/g, "")
		},
		stripTags: function(e) {
			return e.replace(/<\/?[^>]+(>|$)/g, "")
		}
	}, s.DOM = {
		createElement: function(e, t, a) {
			var n = s.Utils,
				l = document.createElement(e);
			for (var d in t) t.hasOwnProperty(d) && s.DOM.setAttribute(l, d, t[d]);
			return n.isArray(a) && a.forEach(function(e) {
				var t;
				if (n.isElement(e)) t = e;
				else if (n.isString(e) || n.isNumber(e)) {
					var a = n.isString(e) ? n.trim(n.stripTags(e)) : e.toString();
					t = document.createTextNode(a)
				}
				l.appendChild(t)
			}), l
		},
		setAttribute: function(e, t, a) {
			var s = e.tagName.toLowerCase();
			"style" === t ? e.style.cssText = a : "value" === t ? "input" === s || "textarea" === s ? e.value = a : e.setAttribute(
				t, a) : "className" === t ? e.className = a : e.setAttribute(t, a)
		},
		hasClass: function(e, t) {
			var a = e.className;
			return !!a && a.match(new RegExp("(\\s|^)" + t + "(\\s|$)"))
		},
		addClass: function(e, t) {
			var a = e.className;
			return !s.DOM.hasClass(e, t) && void(a += 0 < a.length ? " " + t : t, e.className = a)
		},
		removeClass: function(e, t) {
			var a = e.className;
			return !!(a && s.DOM.hasClass(e, t)) && void(a = s.Utils.trim(a.replace(t, "")), e.className = a)
		}
	}, s.Delegate = {
		on: function(t, a, n, l, d, e, r) {
			var i = s.Delegate;
			return ("mouseenter" === n || "mouseleave" === n) && (e = !0), l._delegateWrapper = l, t.addEventListener(n,
				function s(o) {
					var e = i.getDelegateTarget(t, o.target, a);
					o.delegateTarget = e, e && (!0 === r && i.off(t, n, s), l.call(d || t, o))
				}, e || !1), l
		},
		once: function(e, t, a, n, l, d) {
			s.Delegate.on(e, t, a, n, l, d, !0)
		},
		off: function(e, t, a, s) {
			a._delegateWrapper && (a = a._delegateWrapper, delete a._delegateWrapper), ("mouseenter" === t || "mouseleave" ===
				t) && (s = !0), e.removeEventListener(t, a, s || !1)
		},
		stop: function(e) {
			var t = s.Delegate;
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
				if (s.DOM.hasClass(t, a.replace(".", ""))) return t;
				t = t.parentElement
			}
			return null
		}
	}, s.Utils.isFunction(Object.assign) || Object.defineProperty(Object, "assign", {
		value: function(e) {
			if (null == e) throw new TypeError("Cannot convert undefined or null to object");
			for (var t, a = Object(e), s = 1; s < arguments.length; s++)
				if (t = arguments[s], null != t)
					for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (a[n] = t[n]);
			return a
		},
		writable: !0,
		configurable: !0
	}), s
}), Array.prototype.remove = function(e) {
	var t = this.indexOf(e);
	return -1 < t && this.splice(t, 1), this
};
