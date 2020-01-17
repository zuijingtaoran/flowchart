class UTILITY {
	constructor(a, b) {
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
			}], this.viewBox = null, this.parent = null, this.data = null, this.callback = a || function() {}, this.arg = b,
			this.template = {
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
		} else a(b.arg)
	}
	is(a) {
		return Object.prototype.toString.call(a).slice(8, -1)
	}
	table(h, a) {
		this;
		document.getElementById(h).innerHTML = "";
		let i = document.createElement("table"),
			b = document.createElement("tr"),
			c = null,
			d = null,
			j = null;
		i.setAttribute("class", "fl-table"), Object.keys(a[0]).map(d => {
			c = document.createElement("th"), c.innerHTML = d, b.append(c)
		}), i.append(b), a.map(a => {
			d = document.createElement("tr"), Object.keys(a).map(b => {
				j = document.createElement("td"), j.innerHTML = a[b], d.append(j)
			}), i.append(d)
		}), document.getElementById(h).append(i);
		document.createElement("span")
	}
	kpi(a, b) {
		let c = this;
		document.getElementById(a).innerHTML = "", c.viewBox = [document.getElementById(a).clientWidth, document.getElementById(
			a).clientHeight], c.parent = document.getElementById(a), c.data = b;
		let d, e, f, g, h = b.length;
		b.map(a => {
			d = +a.width, e = .618 * d, f = .618 * e, g = 20;
			let b = document.createElement("div");
			return b.setAttribute("class", "fl-KPI-container"), b.setAttribute("id", btoa(a.name)), b.style.width = d + "px",
				b.style.height = e + "px", b.addEventListener("click", function(a) {
					a.target || a.srcElement;
					alert("x")
				}, !0), b.addEventListener("mouseover", function(a) {
					let b = a.target || a.srcElement;
					b = $(b).parents(".fl-KPI-container");
					let c = $(b).offset().top,
						d = $(b).offset().left;
					$("body").append("<div class='fl-tag'>Tooltip</div>"), $(".fl-tag").css({
						top: c,
						left: d + b.width() - 35
					})
				}, !0), b.addEventListener("mouseout", function(a) {
					a.target || a.srcElement;
					$(".fl-tag").remove()
				}, !0), this.parent.appendChild(b), a.instance = "pie" === a.shape ? Highcharts.chart(btoa(a.name), {
					chart: {
						type: "pie",
						spacing: [0, -10, 0, -10]
					},
					colors: [a.color, "#ededed"],
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
						y: f - 6,
						style: {
							color: c.ColorReverse(a.color),
							"font-weight": "bold",
							"font-size": "24px"
						}
					},
					subtitle: {
						text: a.name,
						floating: !0,
						align: "center",
						y: 20,
						style: {
							color: c.ColorReverse(a.color),
							"text-shadow": "1px 1px #fff",
							"font-size": "16px"
						}
					},
					plotOptions: {
						pie: {
							innerSize: "75%",
							size: "75%",
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
				}) : Highcharts.chart(btoa(a.name), {
					chart: {
						type: "line",
						backgroundColor: a.color,
						spacing: [0, -10, 0, -10]
					},
					colors: [a.color, "#ededed"],
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
						y: f,
						style: {
							color: c.ColorReverse(a.color),
							"font-weight": "bold",
							"font-size": "28px"
						}
					},
					subtitle: {
						text: a.name,
						floating: !0,
						align: "center",
						y: 20,
						style: {
							color: c.ColorReverse(a.color),
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
	info(b, c) {
		let d = this,
			e = "";
		document.getElementById(b).innerHTML = "";
		let f = [];
		c.dataset.map(a => {
			let b = {};
			b[a.key] = a.value, f.push(b)
		}), f.map(a => {
			let b = Object.keys(a)[0],
				c = a[b]; - 1 < c.indexOf("star") ? (c = c.replace("star", ""), e += d.template.desc_star(b, +c)) : e += d.template
				.desc_text(b, c)
		}), document.getElementById(b).innerHTML = d.template.box(d.template.head(c.imageurl, c.imageshape), e, d.template.foot(
			c.description)), $("#" + b).find("img").load(function() {
			let a = $("#" + b).find(".fl-circle").eq(0);
			a.width(a.height())
		})
	}
	calendar(a, b, c = {
		"2019-12-28": [{
			text: "PM",
			bgcolor: "steelblue"
		}, {
			text: "RUN",
			bgcolor: "green"
		}],
		"2019-12-2": [{
			text: "IDLE",
			bgcolor: "gray"
		}, {
			text: "RUN",
			bgcolor: "green"
		}]
	}) {
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
				let a = {};
				return c.map(b => {
					a[b.date] ? a[b.date].push({
						text: b.text || "",
						bgcolor: b.bgcolor || "",
						tooltip: b.tooltip || ""
					}) : a[b.date] = [{
						text: b.text || "",
						bgcolor: b.bgcolor || "",
						tooltip: b.tooltip || ""
					}]
				}), a
			}
		})
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
			e += "<th style='background-color: #333;color: white;font-weight: bolder;'>" + a + "</th>"
		}), d += e + "</tr>";
		for (var g, h = 0; h < c.length; h++) {
			for (var j in g = "<tr>", c[h]) g += "<td>" + c[h][j] + "</td>";
			g += "</tr>", d += g
		}
		d += "</table>";
		var k =
			"<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
		k += "<meta http-equiv=\"content-type\" content=\"application/vnd.ms-excel; charset=UTF-8\">", k += "<head>", k +=
			"<!--[if gte mso 9]>", k += "<xml>", k += "<x:ExcelWorkbook>", k += "<x:ExcelWorksheets>", k +=
			"<x:ExcelWorksheet>", k += "<x:Name>", k += "Sheet1", k += "</x:Name>", k += "<x:WorksheetOptions>", k +=
			"<x:DisplayGridlines/>", k += "</x:WorksheetOptions>", k += "</x:ExcelWorksheet>", k += "</x:ExcelWorksheets>", k +=
			"</x:ExcelWorkbook>", k += "</xml>", k += "<![endif]-->", k += "</head>", k += "<body>", k += d, k += "</body>", k +=
			"</html>";
		var l = "data:application/vnd.ms-excel;charset=utf-8," + encodeURIComponent(k),
			m = document.createElement("a");
		m.href = l, m.style = "visibility:hidden", m.download = b + ".xlsx", document.body.appendChild(m), m.click(),
			document.body.removeChild(m)
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
