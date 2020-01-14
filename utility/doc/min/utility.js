class UTILITY {
	constructor(a) {
		this.plugin = [{
			url: "https://unpkg.com/vue/dist/vue.js",
			name: "vue",
			enabled: !1,
			type: "js"
		}, {
			url: "https://code.highcharts.com.cn/highcharts/highcharts.js",
			name: "vue",
			enabled: !0,
			type: "js"
		}, {
			url: "http://img.hcharts.cn/highcharts/themes/sand-signika.js",
			name: "vue",
			enabled: !0,
			type: "js"
		}, {
			url: "https://unpkg.com/element-ui@2.13.0/lib/index.js",
			name: "element",
			enabled: !1,
			type: "js"
		}, {
			url: "//unpkg.com/element-ui@2.13.0/lib/umd/locale/en.js",
			name: "element-en",
			enabled: !1,
			type: "js"
		}, {
			url: "https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css",
			name: "element-css",
			enabled: !1,
			type: "css"
		}, {
			url: "https://fonts.googleapis.com/icon?family=Material+Icons",
			name: "icons",
			enabled: !0,
			type: "css"
		}, {
			url: "./utility.css",
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
			head(a) {
				return `
			
				<img src="${a}" alt="">
			
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
		let i = document.createElement("a");
		i.setAttribute("href", "javascript:;"), i.style.float = "right", i.innerText = "Export", i.onclick = function() {
			b.JSONToExcelConvertor(a, h)
		}, document.getElementById(h).append(i);
		let j = document.createElement("table"),
			c = document.createElement("tr"),
			d = null,
			k = null,
			l = null;
		j.setAttribute("class", "fl-table"), Object.keys(a[0]).map(b => {
			d = document.createElement("th"), d.innerHTML = b, c.append(d)
		}), j.append(c), a.map(a => {
			k = document.createElement("tr"), Object.keys(a).map(b => {
				l = document.createElement("td"), l.innerHTML = a[b], k.append(l)
			}), j.append(k)
		}), document.getElementById(h).append(j);
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
						top: c + .482 * b.height() - 60,
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
						y: g + 20,
						style: {
							color: "#4a4b2e",
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
						type: "area",
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
							color: "#4a4b2e",
							"text-shadow": "1px 1px #fff",
							"font-size": "16px"
						}
					},
					yAxis: {
						visible: !1
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
						name: "",
						data: a.range || Array(12).fill(25e4)
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
		}), document.getElementById(a).innerHTML = c.template.box(c.template.head(b.ImageURL), d, c.template.foot(b.Description))
	}
	ColorReverse(a) {
		var a = "0x" + a.replace(/#/g, ""),
			b = "000000" + (16777215 - a).toString(16);
		return "#" + b.substring(b.length - 6, b.length)
	}
	JSONToExcelConvertor(a, b) {
		var c = "object" == typeof a ? a : JSON.parse(a),
			d = "<table id='tbexport'>",
			e = "<tr>",
			f = Object.keys(c[0]);
		f.forEach(function(a) {
			e += "<th style='background-color: #00a0dd;color: white;font-weight: bolder;'>" + a + "</th>"
		}), d += e + "</tr>";
		for (var g, h = 0; h < c.length; h++) {
			for (var j in g = "<tr>", c[h]) g += "<td>" + c[h][j] + "</td>";
			g += "</tr>", d += g
		}
		d += "</table>";
		var k =
			"<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
		k += "<meta http-equiv=\"content-type\" content=\"application/vnd.ms-excel; charset=UTF-8\">", k +=
			"<meta http-equiv=\"content-type\" content=\"application/vnd.ms-excel", k += "; charset=UTF-8\">", k += "<head>", k +=
			"<!--[if gte mso 9]>", k += "<xml>", k += "<x:ExcelWorkbook>", k += "<x:ExcelWorksheets>", k +=
			"<x:ExcelWorksheet>", k += "<x:Name>", k += "Sheet1", k += "</x:Name>", k += "<x:WorksheetOptions>", k +=
			"<x:DisplayGridlines/>", k += "</x:WorksheetOptions>", k += "</x:ExcelWorksheet>", k += "</x:ExcelWorksheets>", k +=
			"</x:ExcelWorkbook>", k += "</xml>", k += "<![endif]-->", k += "</head>", k += "<body>", k += d, k += "</body>", k +=
			"</html>";
		var l = "data:application/vnd.ms-excel;charset=utf-8," + encodeURIComponent(k),
			m = document.createElement("a");
		m.href = l, m.style = "visibility:hidden", m.download = b + ".xls", document.body.appendChild(m), m.click(),
			document.body.removeChild(m)
	}
}
