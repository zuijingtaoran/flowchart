w=window;
	class Net {
		constructor(w) {
			this.viewBox = [0, 0, document.getElementById('box').clientWidth,document.getElementById('box').clientHeight];
			this.RawData = rawdata;
			this.init();
		}
		init() {
			let that = this,
				changelist = [],
				nodeInterval = that.viewBox[2] / (that.RawData.NodeDataset.length + 2),
				middleLine = that.viewBox[3] / 2.414,
				heaving = middleLine / 2,
				RawData = that.RawData;
				//get data from localstorage
				 let layout=JSON.parse(localStorage.getItem('layout')||'[{"data":[]}]'),layobj={}
				 layout[0]['data'].map(n=>{
					 layobj[n.Id]=n.location;return n;
					 
				 })
				 
				 //
			RawData.NodeDataset.map((node, index) => {
		node.location =	(!!layobj[node.Id]?layobj[node.Id]:	 [Math.floor(nodeInterval * (index + 1)), Math.floor(middleLine + ((index % 2) * 2 - 1) *
					heaving)]);
				

			})


 


			that.render();
			RawData.NodeDataset.map((node, index) => {
				changelist.push(that.centerpoint(node));
			})
			changelist = _.uniq(_.flattenDeep(changelist).map(n => {
				return JSON.stringify(n)
			})).map(n => {
				return JSON.parse(n)
			});
			that.arrow(changelist);

		}
		render() {
			let that = this,
				zoom = 1;
			// w.svg = new SVG('box').size(...that.viewBox.slice(-2)).viewbox(...that.viewBox).attr({
			// 	id: 'flowchart_box'
			// });
			Z('#box').html("");
			w.svg = SVG().addTo('#box').size(...that.viewBox.slice(-2)).viewbox(...that.viewBox).attr({
				id: 'flowchart_box'
			});
			w.svg.text(that.RawData.Description.title).move(that.viewBox[2] / 2, 20).
			font({ fill: '#333', size: 25, family: 'Inconsolata', anchor: 'middle' }).attr('class', 'title');
			                    //subtitle
			 w.svg.text(that.RawData.Description.subTitle)
			 .move(that.viewBox[2] / 2, 60).font({ fill: '#666', size: 14, family: 'Inconsolata', anchor: 'middle' });
			
			                  
			
			that.RawData.NodeDataset.map((node, index) => {

				switch (node.Shape) {
					case "Circle":
						node.len = node.Size / 2;
						node.element = w.svg.circle(node.Size * zoom).fill(node.BackGroundColor).move(...node.location);
						break;
					case "Hexagon":
						let r = 100 / node.Size / zoom;
						node.len = node.Size / 1;
						node.element = w.svg.polygon(
							`${300.0000/r},${200.0000/r} 
		${250.0000/r},${113.3975/r} 
		${150.0000/r},${113.3975/r} 
		${100.0000/r},${200.0000/r} 
		${150.0000/r},${286.6025/r} 
		${250.0000/r},${286.6025/r}`
						).fill(node.BackGroundColor).move(...node.location)
						break;
					case "Rect":
						node.len = node.Size / 2;
						node.element = w.svg.rect(node.Size * zoom, node.Size).fill(node.BackGroundColor).move(...node.location)
						break;
					case "Image":
						node.len = node.Size / 2;
						node.element = w.svg.image(node.URL).size(node.Size * zoom, node.Size).move(...node.location)
						break;
					case "Iframe":
						node.len = node.Size / 2;
						//node.element = w.svg.image(node.URL).size(node.Size * zoom, node.Size).move(...node.location)

						//node.element = w.svg.element('iframe').size(node.Size * zoom, node.Size).move(...node.location)
						//.attr({'src':node.URL})
						let iid = "_" + Math.random().toString(36).substr(2);
						node.element = w.svg.foreignObject(node.Size * zoom, node.Size).move(...node.location);

						//<div class=iframedrag>'+node.Text+'</div>
						node.element.add('<div class=iframedrag>' + node.Text + '</div>');


						setTimeout(function() {
							node.element.node.innerHTML = '<body xmlns="http://www.w3.org/1999/xhtml"><div class=iframedrag>' + node.Text +
								'</div><iframe  frameborder="0" src="' + node.URL + '"></iframe></body>';
						}, 200);
						break;
					default:
						node.len = node.Size / 2;
						node.element = w.svg.rect(node.Size, node.Size * zoom).fill(node.BackGroundColor).move(...node.location)

						break;
				}
				node.element.attr({
					"id": node.Id,
					"type":node.Shape,
					"ShiningColor":node.ShiningColor||"",
					"class": "element "
				}).draggable();
				
				let [elm, x1, x2, y1, y2, s] = [node.element, 0, 0, 0, 0, null];
				elm.on("dragstart", function() {
					s = elm.clone().opacity(0.34);
					w.svg.add(s);
					[x1, y1] = [elm.x(), elm.y()];
				})
				elm.on("dragmove", function(e) {
					//s.animate(200, '>').move(elm.x(), elm.y());
				})
				elm.on("dragend", function() {
					let changelist = [];
					[x2, y2] = [elm.x(), elm.y()];
					let dd = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
					s.remove();
					node.location = [x2, y2];
					changelist.push(that.centerpoint(node));
					// changelist=_.uniq( _.flattenDeep(changelist).map(n => {
					// 					return JSON.stringify(n)
					// 				})).map(n=>{return JSON.parse(n)});
					that.arrow(_.flattenDeep(changelist));

				})
				elm.on('mouseover', function(e) {
					[x1, y1] = [elm.x(), elm.y()];
					e.preventDefault();
					Z('#tooltip').html(node.ToolTip).css({
						top: y1,
						left: x1 + node.Size / 2
					}).show();

					// this.animate(300, '<>').attr({
					// 	'stroke': '#f06'})
				})
				elm.on('mouseout', function(e) {
					Z('#tooltip').hide();
					e.preventDefault();

				})

			})



		}
		centerpoint(node) {
			let that = this,
				RawData = that.RawData,

				changenode = [];


			_.flatMap(RawData.DataDataset, function(o) {
				return o.From == node.Id;
			}).map((data, i1) => {
				if (data) {
					!RawData.DataDataset[i1].sid && (RawData.DataDataset[i1].sid = RawData.DataDataset[i1]['From'] + "_" + RawData
						.DataDataset[i1]['To'])
					RawData.DataDataset[i1].f = node.location.map(n => {
						return n + node.len;
					});
					changenode.push(RawData.DataDataset[i1])
				}

			});
			_.flatMap(RawData.DataDataset, function(o) {
				return o.To == node.Id;
			}).map((data, i1) => {
				if (data) {
					!RawData.DataDataset[i1].sid && (RawData.DataDataset[i1].sid = RawData.DataDataset[i1]['From'] + "_" + RawData
						.DataDataset[i1]['To'])
					RawData.DataDataset[i1].t = node.location.map(n => {
						return n + node.len;
					});
					changenode.push(RawData.DataDataset[i1])
				}

			});
			return changenode;
		}
		arrow(list) {
			var that = this,
				nodes = that.RawData.NodeDataset;
			list.map(n => {
				let a = n;
				let [fx, fy, tx, ty, fl, tl, ratio, k] = [0, 0, 0, 0,
					+_.filter(nodes, function(o) {
						return o.Id == n.From;
					})[0]["len"],
					+_.filter(nodes, function(o) {
						return o.Id == n.To;
					})[0]["len"] + 10,
					(n.t[0] - n.f[0]) / Math.sqrt((Math.pow(n.t[0] - n.f[0], 2)) + (Math.pow(n.t[1] - n.f[1], 2))),
					(n.t[1] - n.f[1]) / (n.t[0] - n.f[0])
				];
				tx = n.t[0] - tl * ratio;
				ty = n.t[1] - k * (n.t[0] - tx);
				//ty=
				n.ct = [tx, ty];
				fx = n.f[0] + fl * ratio;
				fy = n.f[1] + k * (fx - n.f[0]);
				n.cf = [fx, fy];
				try {
					n.element.remove();
					n.text.remove();
				} catch (e) {
					//TODO handle the exception
				}



				if (n.CurveStyle == 'Curve') {
					let pathstr = that.Berzier(...n.cf, ...n.ct);
					n.element = w.svg.path(pathstr).attr({
						'stroke': n.Color,
						'stroke-width': n.Size,
						'stroke-dasharray': n.DashStyle === 'Dash' ? '5' : '0',
						'fill': 'none',type:"R"+n.Size,
						'class':'element'
					});

				} else {
					n.element = w.svg.line(...n.cf, ...n.ct).attr({
						'stroke': n.Color,
						'stroke-width': n.Size,
						'stroke-dasharray': n.DashStyle === 'Dash' ? '5' : '0',
						'fill': 'none',type:"R"+n.Size,
						'class':'element'
					});

				}
				//
				n.text = w.svg.text(function(add) {

					add.tspan(n.Label).dy(20)

				})
				n.text.path(that.textpath(...n.cf, ...n.ct, n.CurveStyle)).font({
					size: 20.5,
					family: 'Verdana',type:"R"+n.Size,
						'class':'element'
					
				})
				n.text.textPath().attr('startOffset', '30%')
				//
				n.element.marker('end', 6, 6, function(add) {
					add.path('M 0 0 L 6 3 L 0 6 z').fill(n.Color)
				})
				n.element.on('mouseover', function(e) {

					// this.animate(300, '<>').attr({
					// 	'stroke': '#f06'})
				})

				_.assign(_.filter(that.RawData.DataDataset, function(o) {
					return o.sid == n.sid
				})[0], n);

			})
!!app.render&&app.render(app.dflist);

		}
		BerzierLine(x1, y1, x2, y2) {
			return `M ${x1},${y1} Q ${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${(y1 + y2) / 2} T ${x2},${y2}`;

			// return `M ${x1},${y1} Q ${y2 < y1 ? x2 - (x2 - x1) / 3 : x2 + (x2 - x1) / 3},${y2 - Math.abs((y2 - y1) / 3)} ${x2},${y2}`;
		}
		Berzier(x1, y1, x2, y2) {
			return `M${x1} ${y1} C${(x1 + x2) / 1.9} ${y1} ${x2} ${y2} ${x2} ${y2}`;
		}
		textpath(x1, y1, x2, y2, a) {

			+x1 > +x2 && (
				[x1, x2] = [x2, x1],
				[y1, y2] = [y2, y1]);
			return `M ${x1} ${y1} L ${x2} ${y2}`


			// if(a=='Curve'){
			// 	return this.Berzier(x1, y1, x2, y2);
			// }else{return `M ${x1} ${y1} L ${x2} ${y2}`;}
		}
	}

	
	((w, SVG, $) => {
		w.net = new Net(w);
		
})(window, SVG, (() => {
	return Z;
})());
