class UTILITY {
	constructor(a) {
		this.plugin = [{
			url: "http://cvpmdsip03/tools/utility-prd/doc/lib/highchart/highcharts.js",
			name: "highchart",
			enabled: !0,
			type: "js"
		}, {
			url: "http://img.hcharts.cn/highcharts/themes/sand-signika.js",
			name: "highchart-sand",
			enabled: !0,
			type: "js"
		}, {
			url: "https://fonts.googleapis.com/icon?family=Material+Icons",
			name: "icons",
			enabled: !0,
			type: "css"
		}, {
			url: "http://cvpmdsip03/tools/utility-prd/doc/lib/calendar/calendar.css",
			name: "calendar-css",
			enabled: !0,
			type: "css"
		}, {
			url: "http://cvpmdsip03/tools/utility-prd/doc/lib/calendar/calendar.js",
			name: "calendar",
			enabled: !0,
			type: "js"
		}, {
			url: "http://cvpmdsip03/tools/utility-prd/doc/lib/layer-v3.1.1-0809/layer-v3.1.1/layer/layer.js",
			name: "layer",
			enabled: !0,
			type: "js"
		}, {
			url: "http://cvpmdsip03/tools/utility-prd/doc/utility.css",
			name: "utility-css",
			enabled: !0,
			type: "css"
		}], this.viewBox = null, this.parent = null, this.data = null, this.callback = a || function() {}, this.template = {
			box(a, b, c) {
				return `<div class="fl-card" id="demo">
		<div class='fl-card-head'>${a}</div>
		<div class='fl-card-body'>${b}</div>
		<div class='fl-card-foot'>${c}</div>
		</div>
		`
			},
			head(a, b) {
				return `
			
			<div class=${!b?"":"fl-"+b}>	<img src="${a}" alt=""></div>
			
		`
			},
			desc_text(c, a) {
				return `<div class="fl-row">
				<div class="fl-desc">
					${c}
				</div>
				<div class="fl-star-box">
					<span class="fl-user">${a}</span>
				</div>
			</div>`
			},
			desc_star(c, a) {
				let b = Math.floor(a),
					d = 5 - Math.ceil(a),
					e = "";
				return Array(b).fill(b).map(() => {
						e += "<span class=\"fl-star material-icons\" fl-hl>star</span>"
					}), .01 < a - b && (e += "<span class=\"fl-star material-icons\" fl-hl>star_half</span>"), Array(d).fill(d).map(
						() => {
							e += "<span class=\"fl-star material-icons\" fl-nhl>star_border</span>"
						}),
					`<div class="fl-row"><div class="fl-desc">
					${c}
				</div>
				<div class="fl-star-box">
		
					${e}
				</div></div>`
			},
			star() {
				return "<span class=\"fl-star material-icons\" fl-hl>star</span>"
			},
			star_half() {
				return "<span class=\"fl-star material-icons\" fl-hl>star_half</span>"
			},
			star_border() {
				return "<span class=\"fl-star material-icons\" fl-nhl>star_border</span>"
			},
			foot(b) {
				return `<i style="font-size: 10px; color: #777; margin: 0px 6px;">
				${b}</i>`
			}
		}, this.init()
	}
	init() {
		let a = JSON.parse(JSON.stringify(this.plugin));
		this.load(a, this.callback)
	}
	load(c, a) {
		var b = this,
			d = arguments;
		if ("Array" === b.is(c) && 0 < c.length) {
			let d = c.shift();
			if (console.log(d), !d.enabled) return void b.load(c, a);
			switch (d.type) {
				case "css":
					$("<link>").attr({
						rel: "stylesheet",
						type: "text/css",
						name: d.name,
						href: d.url
					}).appendTo("head").load(function() {
						return b.load(c, a)
					});
					break;
				case "js":
					$.getScript(d.url, function() {
						return b.load(c, a)
					});
			}
		} else a()
	}
	is(a) {
		return Object.prototype.toString.call(a).slice(8, -1)
	}
	table(h, a) {
		var b = this;
		let i = document.createElement("span");
		i.setAttribute("href", "javascript:;"), i.setAttribute("class", "material-icons"), i.style.float = "right", i.innerText =
			"menu", i.onclick = function() {
				j.style.display = "inline-block" == j.style.display ? "none" : "inline-block"
			};
		let j = document.createElement("span");
		j.setAttribute("class", "fl-menu"), j.onclick = function() {
			j.style.display = "none"
		};
		let [k, l, m] = [document.createElement("span"), document.createElement("span"), ["xls", "csv"]];
		[k.innerText, l.innerText] = ["Export Excel", "Export CSV"], [k, l].map((c, d) => {
			c.onclick = function() {
				0 == d && b.JSONToExcelConvertor(a, h), 1 == d && b.JSONToCSVConvertor(a, h)
			}, j.append(c)
		}), document.getElementById(h).append(j), document.getElementById(h).append(i);
		let n = document.createElement("table"),
			c = document.createElement("tr"),
			d = null,
			o = null,
			p = null;
		n.setAttribute("class", "fl-table"), Object.keys(a[0]).map(b => {
			d = document.createElement("th"), d.innerHTML = b, c.append(d)
		}), n.append(c), a.map(a => {
			o = document.createElement("tr"), Object.keys(a).map(b => {
				p = document.createElement("td"), p.innerHTML = a[b], o.append(p)
			}), n.append(o)
		}), document.getElementById(h).append(n);
		document.createElement("span")
	}
	kpi(a, b) {
		let c = this;
		c.viewBox = [document.getElementById(a).clientWidth, document.getElementById(a).clientHeight], c.parent = document.getElementById(
			a), c.data = b;
		let d = b.length,
			e = c.viewBox[1] / (d + .2);
		200 > e && (e = 200);
		let f = .618 * e,
			g = .618 * f;
		b.map(a => {
			let b = document.createElement("div");
			return b.setAttribute("class", "fl-KPI-container"), b.setAttribute("id", btoa(a.Name)), b.style.width = e, b.style
				.height = f, b.addEventListener("click", function(a) {
					a.target || a.srcElement;
					alert("x")
				}, !0), b.addEventListener("mouseover", function(a) {
					let b = a.target || a.srcElement;
					b = $(b).parents(".fl-KPI-container");
					let c = $(b).offset().top,
						d = $(b).offset().left;
					$("body").append("<div class='fl-tag'>Tooltip</div>"), $(".fl-tag").css({
						top: c + .482 * b.height() - 42,
						left: b.width() / 2 + d - 25
					})
				}, !0), b.addEventListener("mouseout", function(a) {
					a.target || a.srcElement;
					$(".fl-tag").remove()
				}, !0), this.parent.appendChild(b), a.instance = "pie" === a.Shape ? Highcharts.chart(btoa(a.Name), {
					chart: {
						type: "pie",
						spacing: [0, -10, 0, -10]
					},
					colors: [a.Color, "#ededed"],
					credits: {
						enabled: !1
					},
					exporting: {
						enabled: !1
					},
					tooltip: {
						enabled: !1
					},
					title: {
						text: a.value,
						floating: !0,
						align: "center",
						y: g,
						style: {
							color: c.ColorReverse(a.Color),
							"font-weight": "bold",
							"font-size": "24px"
						}
					},
					subtitle: {
						text: a.Name,
						floating: !0,
						align: "center",
						y: 20,
						style: {
							color: c.ColorReverse(a.Color),
							"text-shadow": "1px 1px #fff",
							"font-size": "16px"
						}
					},
					plotOptions: {
						pie: {
							innerSize: g,
							dataLabels: {
								enabled: !1
							}
						}
					},
					series: [{
						data: [
							["", +a.value.replace("%", "")],
							["", 100 - +a.value.replace("%", "")]
						]
					}]
				}) : Highcharts.chart(btoa(a.Name), {
					chart: {
						type: "line",
						backgroundColor: a.Color,
						spacing: [0, -10, 0, -10]
					},
					colors: [a.Color, "#ededed"],
					credits: {
						enabled: !1
					},
					exporting: {
						enabled: !1
					},
					tooltip: {
						enabled: !1
					},
					title: {
						text: a.value,
						floating: !0,
						align: "center",
						y: g,
						style: {
							color: c.ColorReverse(a.Color),
							"font-weight": "bold",
							"font-size": "28px"
						}
					},
					subtitle: {
						text: a.Name,
						floating: !0,
						align: "center",
						y: 20,
						style: {
							color: c.ColorReverse(a.Color),
							"text-shadow": "1px 1px #fff",
							"font-size": "16px"
						}
					},
					yAxis: {
						visible: !1,
						max: 20
					},
					xAxis: {
						visible: !1
					},
					legend: {
						enabled: !1
					},
					plotOptions: {
						area: {
							lineWidth: 0,
							marker: {
								enabled: !1,
								states: {
									hover: {
										enabled: !1
									}
								}
							}
						}
					},
					series: [{
						data: a.range || Array(12).fill(30)
					}]
				}), a
		})
	}
	info(a, b) {
		let c = this,
			d = "";
		b.DataSet.map(a => {
			let b = Object.keys(a)[0],
				e = a[b];
			d += 5 >= e ? c.template.desc_star(b, +e) : c.template.desc_text(b, e)
		}), document.getElementById(a).innerHTML = c.template.box(c.template.head(b.ImageURL, b.ImageShape), d, c.template.foot(
			b.Description)), $("#" + a).find("img").load(function() {
			let b = $("#" + a).find(".fl-circle").eq(0);
			b.width(b.height())
		})
	}
	calendar(a, b, c ) {
		return new Calendar({
			parent: a,
			time: b,
			onDatePick(a, b, c) {
				Math.floor(2 * Math.random()) ? layer.open({
					type: 2,
					title: "Pop-out",
					shadeClose: !0,
					shade: .8,
					area: ["70%", "80%"],
					content: "./summary.html"
				}) : window.open("./summary.html", "_blank")
			},
			mounted(a) {},
			task() {
				
				return c
			}
		})
	}
	ColorReverse(a) {
		var a = "0x" + a.replace(/#/g, ""),
			b = "000000" + (16777215 - a).toString(16);
		return "#" + b.substring(b.length - 6, b.length)
	}
	JSONToExcelConvertor(a, b, c) {
		var d = "object" == typeof a ? a : JSON.parse(a),
			e = "<table id='tbexport'>",
			f = "<tr>",
			g = Object.keys(d[0]);
		g.forEach(function(a) {
			f += "<th style='background-color: #333;color: white;font-weight: bolder;'>" + a + "</th>"
		}), e += f + "</tr>";
		for (var h, j = 0; j < d.length; j++) {
			for (var k in h = "<tr>", d[j]) h += "<td>" + d[j][k] + "</td>";
			h += "</tr>", e += h
		}
		e += "</table>";
		var l = {
				xls: "application/vnd.ms-excel",
				csv: "text/csv"
			},
			m =
			"<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
		m += "<meta http-equiv=\"content-type\" content=\"" + l[c] + "; charset=UTF-8\">", m += "<head>", m +=
			"<!--[if gte mso 9]>", m += "<xml>", m += "<x:ExcelWorkbook>", m += "<x:ExcelWorksheets>", m +=
			"<x:ExcelWorksheet>", m += "<x:Name>", m += "Sheet1", m += "</x:Name>", m += "<x:WorksheetOptions>", m +=
			"<x:DisplayGridlines/>", m += "</x:WorksheetOptions>", m += "</x:ExcelWorksheet>", m += "</x:ExcelWorksheets>", m +=
			"</x:ExcelWorkbook>", m += "</xml>", m += "<![endif]-->", m += "</head>", m += "<body>", m += e, m += "</body>", m +=
			"</html>";
		var n = "data:" + l[c] + ";charset=utf-8," + encodeURIComponent(m),
			o = document.createElement("a");
		o.href = n, o.style = "visibility:hidden", o.download = b + "." + c, document.body.appendChild(o), o.click(),
			document.body.removeChild(o)
	}
	JSONToCSVConvertor(a, b) {
		let c = "";
		Object.keys(a[0]).map(a => {
			c += a + ","
		}), c += "\r\n", a.map(b => {
			Object.keys(b).map(d => {
				c += b[d] + ","
			}), c += "\r\n"
		});
		var d = "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(c),
			e = document.createElement("a");
		e.href = d, e.download = b + ".csv" || "temp.csv", document.body.appendChild(e), e.click(), document.body.removeChild(
			e)
	}
}
