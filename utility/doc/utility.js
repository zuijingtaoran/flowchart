class UTILITY {
	constructor(callback,arg) {
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
			url: "./doc/lib/calendar/calendar.js",
			name: "calendar",
			enabled: !0,
			type: "js"
		}, {
			url: "http://cvpmdsip03/tools/utility-prd/doc/lib/layer-v3.1.1-0809/layer-v3.1.1/layer/layer.js",
			name: "layer",
			enabled: !0,
			type: "js"
		}, {
			url: "./doc/utility.css",
			name: "utility-css",
			enabled: !0,
			type: "css"
		}

		];
		this.viewBox = null;
		this.parent = null;
		this.data = null;
		this.callback=callback||function(){};
		this.arg=arg;
		this.template = {
				box(head, body, foot) {
					return `<div class="fl-card" id="demo">
		<div class='fl-card-head'>${head}</div>
		<div class='fl-card-body'>${body}</div>
		<div class='fl-card-foot'>${foot}</div>
		</div>
		`
		
				},
				head(url,cls) {
					return `
			
			<div class=${!!cls?'fl-'+cls:''}>	<img src="${url}" alt=""></div>
			
		`
				},
				desc_text(a, b) {
					return `<div class="fl-row">
				<div class="fl-desc">
					${a}
				</div>
				<div class="fl-star-box">
					<span class="fl-user">${b}</span>
				</div>
			</div>`
				},
				desc_star(a, b) {
					let q = Math.floor(b),
						w = b - q,
						e = 5 - Math.ceil(b),
						stars = '';
					Array(q).fill(q).map(n => {
						stars += '<span class="fl-star material-icons" fl-hl>star</span>'
					});
					w > 0.01 && (stars += '<span class="fl-star material-icons" fl-hl>star_half</span>');
					Array(e).fill(e).map(n => {
						stars += '<span class="fl-star material-icons" fl-nhl>star_border</span>'
					});
		
					return `<div class="fl-row"><div class="fl-desc">
					${a}
				</div>
				<div class="fl-star-box">
		
					${stars}
				</div></div>`
				},
				star() {
					return '<span class="fl-star material-icons" fl-hl>star</span>'
				},
				star_half() {
					return '<span class="fl-star material-icons" fl-hl>star_half</span>'
				},
				star_border() {
					return '<span class="fl-star material-icons" fl-nhl>star_border</span>'
				},
				foot(a) {
					return `<i style="font-size: 10px; color: #777; margin: 0px 6px;">
				${a}</i>`
				}
		
			};
		this.init()

	}
	init() {
		let paths = JSON.parse(JSON.stringify(this.plugin));
		this.load(paths,this.callback);

	}
	load(a, b) {
		var that = this,
			arg = arguments;
		if (that.is(a) === 'Array' && a.length > 0) {
			let cur = a.shift();
			console.log(cur)
			if (!cur.enabled) {
				that.load(a, b);
				return;
			}
			switch (cur.type) {
				case 'css':

					$("<link>").attr({
						rel: "stylesheet",
						type: "text/css",
						name: cur.name,
						href: cur.url
					}).appendTo("head").load(function() {

						return that.load(a, b);

					});
					break;
				case 'js':
					$.getScript(cur.url,
						function() {

							return that.load(a, b);
						});
					break;

			}

		} else {
			b(that.arg)
		}

	}
	is(obj) {
		return Object.prototype.toString.call(obj).slice(8, -1);
	}

	table(a, b) {
		var that=this;
		 document.getElementById(a).innerHTML="";
// let xls=document.createElement('span');
// //  <div id="btn_Menu" class="material-icons" style="color:steelblue; cursor:pointer"
//  //title="Menu" onclick="ShowChartMenuItems('btn_Menu');">menu</div>
// xls.setAttribute('href','javascript:;')
// xls.setAttribute('class','material-icons')
// xls.style.float='right';
// xls.innerText="menu";
// xls.onclick=function(){
// 	//that.JSONToExcelConvertor(b,a);
// 	menu.style.display=='inline-block'?(menu.style.display='none'):(
// 	menu.style.display='inline-block'
// 	)
// }
// //
// let menu=document.createElement('span');
// menu.setAttribute("class","fl-menu");
// menu.onclick=function(){
// 	//that.JSONToExcelConvertor(b,a);
// 	menu.style.display='none';
// }
// //
// let [excel,csv,format]=[document.createElement('span'),document.createElement('span'),['xls','csv']];
// [excel.innerText,csv.innerText]=["Export Excel","Export CSV"];
// [excel,csv].map((n,i)=>{
// 	n.onclick=function(){
// 		i==0&&that.JSONToExcelConvertor(b,a);
// 		i==1&&that.JSONToCSVConvertor(b,a);
		
// 	}
// 	menu.append(n);
// })
// document.getElementById(a).append(menu);
// document.getElementById(a).append(xls);
		let c = document.createElement("table"),
			d = document.createElement("tr"),
			e = null,
			f = null,
			g = null;
		c.setAttribute("class", "fl-table"), Object.keys(b[0]).map(a => {
			e = document.createElement("th"), e.innerHTML = a, d.append(e)
		}), c.append(d), b.map(b => {
			f = document.createElement("tr"), Object.keys(b).map(c => {
				g = document.createElement("td"), g.innerHTML = b[c], f.append(g)
			}), c.append(f)
		}), document.getElementById(a).append(c);
		let exp=document.createElement('span');
	}
	kpi(container,data) {
		let that = this;
		 document.getElementById(container).innerHTML="";
		that.viewBox = [document.getElementById(container).clientWidth, document.getElementById(container).clientHeight];
		that.parent=document.getElementById(container);
		that.data = data;
		let len=data.length;
		// let
		// 	cw = that.viewBox[1] / (len + 0.2);
		// cw < 200 && (cw = 200);

		// let ch = cw * 0.618,
		// 	tt = ch * 0.618,
		// 	ts = 20; //tt + 20;
		let cw,ch,tt,ts;
		data.map((n, i) => {
			cw=+n.width;
			ch = cw * 0.618,
				tt = ch * 0.618,
			 	ts = 20;
			let dom = document.createElement('div');
			dom.setAttribute('class', 'fl-KPI-container');
			dom.setAttribute('id', btoa(n.name));
			dom.style.width = cw+'px';
			dom.style.height = ch+'px';
			//add event
			dom.addEventListener('click', function(e) {
				let t = e.target || e.srcElement;
				alert('x')
			}, true)
			dom.addEventListener('mouseover', function(e) {
				let t = e.target || e.srcElement;
				t = $(t).parents('.fl-KPI-container');
				let aa = $(t).offset().top //推荐

				let bb = $(t).offset().left
				$('body').append('<div class=\'fl-tag\'>Tooltip</div>')
				$('.fl-tag').css({
					// top: aa + t.height() * 0.482-42, //- 60,
					// left: t.width() /2 + bb -25
					 top: aa , //- 60,
					left: bb+t.width()-35 
				})
			}, true)
			dom.addEventListener('mouseout', function(e) {
				let t = e.target || e.srcElement;
				$('.fl-tag').remove();
			}, true)
			this.parent.appendChild(dom);
			if (n.shape === 'pie') {
				n.instance = Highcharts.chart(btoa(n.name), {
					chart: {
						type: 'pie',
						spacing: [0, -10, 0, -10]
					},
					colors: [n.color, '#ededed'],
					credits: {
						enabled: false
					},
					exporting: {
						enabled: false
					},
					tooltip: {
						enabled: false
					},
					title: {
						text: n.value,
						floating: true,
						align: 'center',
						y: tt-6,
						style: {
							color: that.ColorReverse(n.color),
							'font-weight': 'bold',
							'font-size': '24px'
						}
					},
					subtitle: {
						text: n.name,
						floating: true,
						align: 'center',
						y:20, //tt + 20,
						style: {
							color: that.ColorReverse(n.color), // '#dddf0d',
							'text-shadow': '1px 1px #fff',
							'font-size': '16px'
						}
					},
					plotOptions: {
						pie: {
							innerSize: '75%',
							size:'75%',
							dataLabels: {
								enabled: false
							}
						}
					},
					series: [{
						data: [
							['', +n.value.replace('%', '')],
							['', 100 - +n.value.replace('%', '')],
						]
					}]
				});

			} else {
				n.instance = Highcharts.chart(btoa(n.name), {
					chart: {
						type: 'line',
						backgroundColor: n.color,
						spacing: [0, -10, 0, -10]
					},
					colors: [n.color, '#ededed'],
					credits: {
						enabled: false
					},
					exporting: {
						enabled: false
					},
					tooltip: {
						enabled: false
					},
					title: {
						text: n.value,
						floating: true,
						align: 'center',
						y: tt,
						style: {
							color: that.ColorReverse(n.color),
							'font-weight': 'bold',
							'font-size': '28px'
						}
					},
					subtitle: {
						text: n.name,
						floating: true,
						align: 'center',
						y: 20,
						style: {
							color:that.ColorReverse(n.color), //'#4a4b2e', // '#dddf0d',
							'text-shadow': '1px 1px #fff',
							'font-size': '16px'
						}
					},
					yAxis: {
						visible: false,
						
						max:20
					},
					xAxis: {
						visible: false
					},
					legend: {
						enabled: false
					},
					plotOptions: {
						area: {

							lineWidth: 0,
							marker: {
								enabled: false,
								states: {
									hover: {
										enabled: false
									}
								}
							}
						}
					},
					series: [{
						
						data: n.range || Array(12).fill(30)
					}]
				});


			}

			return n;
		})

	}

	info(container,data){
		let that = this,
				body = "";
		document.getElementById(container).innerHTML="";
		let a=[];
		data.dataset.map(n=>{
			let o={}
			o[n['key']]=n['value'];
			a.push(o)
		})
			a.map(n => {
				let prop = Object.keys(n)[0],
					value = n[prop];
				if (value.indexOf('star')>-1) {
					value=value.replace('star','')
					body += that.template.desc_star(prop, +value)
				} else {
					body += that.template.desc_text(prop, value)
				}
		
		
			})
			document.getElementById(container).innerHTML = that.template.box(that.template.head(data.imageurl,data.imageshape),
				body, that.template.foot(data.description)
			)
			$('#'+container).find('img').load(function(){
				let flc=$('#'+container).find('.fl-circle').eq(0);
				flc.width(flc.height())
			})
			
			
		}
		
	
	calendar(container,initDay,task={
					'2019-12-28': [{
							text: 'PM',
							bgcolor: 'steelblue'
						},
						{
							text: 'RUN',
							bgcolor: 'green'
						}
					],
					'2019-12-2': [{
							text: 'IDLE',
							bgcolor: 'gray'
						},
						{
							text: 'RUN',
							bgcolor: 'green'
						}
		
					],
				}){
		
		return new Calendar({
			parent: container,
			
			time: initDay,
			onDatePick(time, $el, calendar) {
				Math.floor( Math.random()*2)?
					
				layer.open({
				  type: 2,
				  title: 'Pop-out',
				  shadeClose: true,
				  shade: 0.8,
				  area: ['70%', '80%'],
				  content: './summary.html' //iframe鐨剈rl
				}):window.open('./summary.html','_blank')
				
			},
			mounted(calendar) {
			},
			task() {
				let o={};
				task.map(n=>{
					if(o[n.date]){
						o[n.date].push({
							'text':n.text||"",
							'bgcolor':n.bgcolor||"",
							'tooltip':n.tooltip||""
							
						})
					}else{
						o[n.date]=[{
							'text':n.text||"",
							'bgcolor':n.bgcolor||"",
							'tooltip':n.tooltip||""
							
						}]
						
					}
				})
				return o
			}
		})
	}
	ColorReverse(OldColorValue) {
		var OldColorValue = '0x' + OldColorValue.replace(/#/g, "");
		var str = '000000' + (0xFFFFFF - OldColorValue).toString(16);
		return '#' + str.substring(str.length - 6, str.length);
	}
	JSONToExcelConvertor(JSONData, FileName) {
	            //先转化json
	            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
	
	            var addcount = 0;
	            var excel = "<table id='tbexport'>";
	            var rowheard = "<tr>";
	            //设置表头
	            var keys = Object.keys(arrData[0]);
	            keys.forEach(function (item) {
	                rowheard += "<th style='background-color: #333;color: white;font-weight: bolder;'>" + item + '</th>';
	            });
	            excel += rowheard + "</tr>";
	
	            //设置数据
	            for (var i = 0; i < arrData.length; i++) {
	                var row = "<tr>";
	                for (var index in arrData[i]) {
	                    row += '<td>' + arrData[i][index] + '</td>';
	                }
	                row += "</tr>";
	                excel += row;
	            }
	            excel += "</table>";
	
	            //console.log(excel);
				
	            var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
	            excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
	            // excelFile += '<meta http-equiv="content-type" content="'+meta[format];
	            // excelFile += '; charset=UTF-8">';
	            excelFile += "<head>";
	            excelFile += "<!--[if gte mso 9]>";
	            excelFile += "<xml>";
	            excelFile += "<x:ExcelWorkbook>";
	            excelFile += "<x:ExcelWorksheets>";
	
	            excelFile += "<x:ExcelWorksheet>";
	            excelFile += "<x:Name>";
	            excelFile += "Sheet1";
	            excelFile += "</x:Name>";
	            excelFile += "<x:WorksheetOptions>";
	            excelFile += "<x:DisplayGridlines/>";
	            excelFile += "</x:WorksheetOptions>";
	            excelFile += "</x:ExcelWorksheet>";
	
	            excelFile += "</x:ExcelWorksheets>";
	            excelFile += "</x:ExcelWorkbook>";
	            excelFile += "</xml>";
	            excelFile += "<![endif]-->";
	            excelFile += "</head>";
	
	            excelFile += "<body>";
	            excelFile += excel;
	            excelFile += "</body>";
	
	            excelFile += "</html>";
	
	            var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
	
	            var link = document.createElement("a");
	            link.href = uri;
	
	            link.style = "visibility:hidden";
	            link.download = FileName + ".xlsx";
	
	            document.body.appendChild(link);
	            link.click();
	            document.body.removeChild(link);
	        }
JSONToCSVConvertor(data, name) {
	            // “\ufeff” BOM头
				let str="";
				Object.keys(data[0]).map(n=>{
					str+=n+",";
				})
				str+="\r\n";
				data.map(n=>{
					Object.keys(n).map(a=>{
						str+=n[a]+",";
					})
					str+="\r\n";
				})
	            var uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
	            var downloadLink = document.createElement("a");
	            downloadLink.href = uri;
	            downloadLink.download = (name+".csv")||"temp.csv";
	            document.body.appendChild(downloadLink);
	            downloadLink.click();
	            document.body.removeChild(downloadLink);
	        }


}
