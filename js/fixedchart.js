((w, SVG, $) => {
	class Net {
		constructor() {
			this.viewBox = [0, 0, document.getElementById('paint').clientWidth,document.getElementById('paint').clientHeight];
			
			this.ele={
				scale:{},
				dot:{},
				shape:{}
			},
			this.itv=20,
			
			
			
			this.init();
		}
		init(){
			let that=this;
				w.svg = SVG().addTo('#paint').size(...that.viewBox.slice(-2)).viewbox(...that.viewBox).attr({
				id: 'fiexedchart'
			});
			for(var a=0;a<that.viewBox[2];a=a+that.itv){
				that.ele.scale[`a${a}`]=w.svg.text(""+a).move(a,that.viewBox[3]-that.itv).
				font({ fill: 'steelblue', family: 'Inconsolata',size:8, anchor: 'middle' })
				
				for(var b=0;b<that.viewBox[3];b=b+that.itv){
				that.ele.dot[`_${a}-${b}`]=	w.svg.circle(4).fill('#ddd').move(a-2,b-2).attr({"class":"ele-dot",
				"x":a,
				"y":b
				}).stroke({'color':'transparent','width':'14'});
				
				if(a>that.viewBox[2]-that.itv){
					that.ele.scale[`b${b}`]=w.svg.text(""+b).move(a+4,b-8).font({ fill: 'steelblue', family: 'Inconsolata',size:8 })
				}
				}
				
			}
			
			
			that.bind();
		}
		bind(){
			var that=this;
			$('.ele-dot').mouseover(function(){
				var $that=$(this);
				app.current_dot=[$that.attr('x'),$that.attr('y')]
				
			})
			$('.ele-dot').mouseout(function(){
				var $that=$(this);
				app.current_dot=["",""]
				
			})
			$('.ele-dot').click(function(){
				let shape=app.current_shape;
				if(!shape){return}
				let	sid="_"+Math.random().toString(36).substr(2); 
				switch (shape){
					case "rect":
					that.ele.shape[sid]=w.svg.rect(60,60).move(...app.current_dot).attr('class','ele-shape').fill('steelblue')
						break;
                    case "hexagon":
                        let r = 3;
                        that.ele.shape[sid] = w.svg.polygon(
                            `${300.0000 / r},${200.0000 / r} 
						${250.0000 / r},${113.3975 / r} 
						${150.0000 / r},${113.3975 / r} 
						${100.0000 / r},${200.0000 / r} 
						${150.0000 / r},${286.6025 / r} 
						${250.0000 / r},${286.6025 / r}`
                        ).fill('steelblue').move(...app.current_dot);
                        break;
                    case "circle":
                        that.ele.shape[sid] = w.svg.circle(60).move(...app.current_dot).attr('class', 'ele-shape').fill('steelblue')
                        break;
					default:
						break;
				}
				
			})
		}
		
		
		}
		w.net = new Net();
		
		}
		
		
		)(window, SVG, (() => {
	return Z;
})());