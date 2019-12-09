((w, SVG, $) => {
	class Net {
		constructor() {
			this.viewBox = [0, 0, document.getElementById('paint').clientWidth,document.getElementById('paint').clientHeight];
			
            this.ele = {
                scale: {},
                dot: {},
                shape: {}

            },
                this.itv = 20,
                this.linecache = [[], []],
                this.c = {
                shape:"",
                sid:"",
                prop:""
                };
			
			this.init();
		}
		init(){
			let that=this;
				w.svg = SVG().addTo('#paint').size(...that.viewBox.slice(-2)).viewbox(...that.viewBox).attr({
				id: 'fiexedchart'
			});
			for(var a=0;a<that.viewBox[2];a=a+that.itv){
                that.ele.scale[`a${a}`] = w.svg.text("" + a).move(a, that.viewBox[3] - that.itv).
                    font({ fill: 'steelblue', family: 'Inconsolata', size: 8, anchor: 'middle' });
				
				for(var b=0;b<that.viewBox[3];b=b+that.itv){
				that.ele.dot[`_${a}-${b}`]=	w.svg.circle(4).fill('#ddd').move(a-2,b-2).attr({"class":"ele-dot",
				"x":a,
				"y":b
				}).stroke({'color':'transparent','width':'14'});
				
				if(a>that.viewBox[2]-that.itv){
                    that.ele.scale[`b${b}`] = w.svg.text("" + b).move(a+4 , b - 8).font({ fill: 'steelblue', family: 'Inconsolata', size: 8 });
				}
				}
				
			}
			
			
			that.bind();
        }
        drawline(opacity) {
            var that = this,lc="";
            let [shape, prop, sid] = ["", "", ""];
            that.c.shape = shape = app.current_shape,
                that.c.prop = prop = app.current_prop, that.c.sid = sid = app.current_sid;
            app.current_prop[0].value = sid;
            switch (shape) {
                case "line":
                    that.ele.shape[sid] = w.svg.line(...that.linecache[0], ...that.linecache[1])
                        .attr({
                        'stroke': _.find(prop, function (o) { return o.label === "BorderColor"; }).value,
                        'stroke-width': _.find(prop, function (o) { return o.label === "BorderWidth"; }).value,
                        'stroke-dasharray': _.find(prop, function (o) { return o.label === "BorderStyle"; }).value=== 'dash' ? '5' : '0',                        
                        'class': 'ele-line ele-shape'
                       
                    });
                    break;
                case "line-arrow":
                     lc = _.find(prop, function (o) { return o.label === "BorderColor"; }).value;
                    that.ele.shape[sid] = w.svg.line(...that.linecache[0], ...that.linecache[1])
                        .attr({
                            'stroke': lc,
                            'stroke-width': _.find(prop, function (o) { return o.label === "BorderWidth"; }).value,
                            'stroke-dasharray': _.find(prop, function (o) { return o.label === "BorderStyle"; }).value === 'dash' ? '5' : '0',
                            'class': 'ele-line  ele-shape'

                        });
                    that.ele.shape[sid].marker('end', 6, 6, function (add) {
                        add.path('M 0 0 L 6 3 L 0 6 z').fill(lc);
                    });
                    break;
                case "curved":
                    lc = _.find(prop, function (o) { return o.label === "BorderColor"; }).value;
                    that.ele.shape[sid] = w.svg.path(that.Berzier( ...that.linecache[0], ...that.linecache[1]))
                        .attr({
                            'stroke': lc,
                            'stroke-width': _.find(prop, function (o) { return o.label === "BorderWidth"; }).value,
                            'stroke-dasharray': _.find(prop, function (o) { return o.label === "BorderStyle"; }).value === 'dash' ? '5' : '0',
                            'class': 'ele-line  ele-shape', 'fill': 'none'

                        });
                    break;
                case "curved-arrow":
                    lc = _.find(prop, function (o) { return o.label === "BorderColor"; }).value;
                    that.ele.shape[sid] = w.svg.path(that.Berzier(...that.linecache[0], ...that.linecache[1]))
                        .attr({
                            'stroke': lc,
                            'stroke-width': _.find(prop, function (o) { return o.label === "BorderWidth"; }).value,
                            'stroke-dasharray': _.find(prop, function (o) { return o.label === "BorderStyle"; }).value === 'dash' ? '5' : '0',
                            'class': 'ele-line  ele-shape','fill':'none'

                        });
                    that.ele.shape[sid].marker('end', 6, 6, function (add) {
                        add.path('M 0 0 L 6 3 L 0 6 z').fill(lc);
                    });
                    break;
                default:
                    break;

            }
			 that.ele.shape[sid].attr({'shape':shape,'sid':sid});
            !!opacity && that.ele.shape[sid].attr('opacity', 0.6);
        }
        drawshape(opacity) {
            //draw other
            let [r, that] = [0, this];
            let prop, sid, shape;
            that.c.shape = shape = app.current_shape,
                that.c.prop = prop = app.current_prop, that.c.sid =sid = app.current_sid;
            app.current_prop[0].value = sid;
          
           
         
            let ww = _.find(prop, function (o) { return o.label === "Width"; }).value,
                hh = _.find(prop, function (o) { return o.label === "Height"; }).value;

if(opacity!=='slt'){
            _.find(prop, function (o) { return o.label === "X"; }).value = app.current_dot[0];
            _.find(prop, function (o) { return o.label === "Y"; }).value = app.current_dot[1];}else{
				
				app.current_dot=[ _.find(prop, function (o) { return o.label === "X"; }).value,_.find(prop, function (o) { return o.label === "Y"; }).value ]
				
			}
            switch (shape) {
                case "rect":
                    that.ele.shape[sid] = w.svg.rect(ww, hh).move(app.current_dot[0]+10 /*- ww / 2*/, app.current_dot[1]+10 /*- hh / 2*/).attr({
                        'class': 'ele-shape selected',
                        'sid': sid
                    }).fill('steelblue');
                    break;
                case "hexagon":

                    r = 150 / ww;
                    that.ele.shape[sid] = w.svg.polygon(
                        `${300.0000 / r},${200.0000 / r} 
						${250.0000 / r},${113.3975 / r} 
						${150.0000 / r},${113.3975 / r} 
						${100.0000 / r},${200.0000 / r} 
						${150.0000 / r},${286.6025 / r} 
						${250.0000 / r},${286.6025 / r}`
                    ).fill('steelblue').move(app.current_dot[0] /*- ww / 4*/, app.current_dot[1]/* - ww / 4*/).attr({
                        'class': 'ele-shape selected',
                        'sid': sid
                    });
                    break;
                case "circle":
                    that.ele.shape[sid] = w.svg.circle(ww).move(app.current_dot[0]/* - ww / 2*/, app.current_dot[1] /*- ww / 2*/).attr({
                        'class': 'ele-shape selected',
                        'sid': sid
                    }).fill('steelblue');
                    break;
                case "rhombus":
                    r = 100 / ww;
                    that.ele.shape[sid] = w.svg.polygon(
                        `${100 / r},${100 / r} ${
                        175 / r}, ${50 / r} ${
                        250 / r}, ${100 / r} ${
                        175 / r}, ${150 / r}`
                    ).fill('steelblue').move(app.current_dot[0]/* - ww / 2*/, app.current_dot[1]/* - ww / 2*/).attr({
                        'class': 'ele-shape selected',
                        'sid': sid
                    });
                    break;
                //M 151.742 204.628 L 176.542 134.628 L 275.742 134.628 L 250.942 204.628 L 151.742 204.628 Z
                case "parallelogram":
                    r = ww / 50;
                    that.ele.shape[sid] = w.svg.polygon(
                        `${30 * r}, ${0 * r} ${
                        100 * r}, ${0 * r} ${
                        70 * r}, ${50 * r} ${
                        0 * r}, ${50 * r}`
                    ).fill('steelblue').move(app.current_dot[0]/* - ww / 2*/, app.current_dot[1] /*- ww / 2*/).attr({
                        'class': 'ele-shape selected',
                        'sid': sid
                    });
                    break;
                case "pentagon":
                    r = 100 / ww;
                    that.ele.shape[sid] = w.svg.polygon(`73 378 134.818674 422.913896 111.20604200000002 495.586104 34.793957999999975 495.586104 11.181326000000013 422.913896`.split(' ').map(n => { return n / r; }).join(' ')
                    ).fill('steelblue').move(app.current_dot[0] /*- ww / 2*/, app.current_dot[1] /*- ww / 2*/).attr({
                        'class': 'ele-shape selected',
                        'sid': sid
                    });
                    break;
                default:
                    break;

            }
            that.ele.shape[sid].attr('shape',shape).fill( _.find(prop, function (o) { return o.label === "Background"; }).value);//
            opacity===true && that.ele.shape[sid].attr('opacity', 0.6);
        }
        Berzier(x1, y1, x2, y2) {
            return `M${x1} ${y1} C${(x1 + x2) / 1.9} ${y1} ${x2} ${y2} ${x2} ${y2}`;
        }
		bind(){
			var that=this;
			$('.ele-dot').mouseover(function(){
                var $that = $(this),
                    category = "";
					if(app.current_shape.indexOf('|slt')>-1){return;}
                !!app.shape[app.current_shape] && (category = app.shape[app.current_shape]['category']);
                if (!category) { return; }
                app.current_dot = [+$that.attr('x'), +$that.attr('y')];
               // !!that.ele.shape[that.c.sid] && that.ele.shape[that.c.sid].attr('opacity') == "0.6"  && that.ele.shape[that.c.sid].remove();
             //   !!that.ele.shape[that.c.sid] && that.linecache[0].length > 1 && that.ele.shape[that.c.sid].remove();
                $('[opacity="0.6"]').remove();
                if (that.linecache[0].length > 1 && that.linecache[1].length === 0) {
                 
                    that.linecache[1] = [...app.current_dot];
                    that.drawline(true);
                } else if (app.shape[app.current_shape]['category'] !== "line" && app.current_shape.length > 0) {

                    that.drawshape(true);
                }
				
			})
			$('.ele-dot').mouseout(function(){
				var $that=$(this);
                app.current_dot = [0, 0]; that.linecache[1] = [];
                
              
			})
            $('.ele-dot').click(function () {
                let prop, sid, shape;
                that.c.shape = shape = app.current_shape,
                    that.c.prop = prop = app.current_prop, that.c.sid = sid = app.current_sid;
                app.current_prop[0].value = sid;
				if(shape==""||shape.indexOf('|slt')>-1){return;}
                let category = app.shape[shape]['category'] || "";
                if (that.linecache[1].length > 1) {
                    //draw 2
                    _.find(that.c.prop, function (o) { return o.label === "X1"; }).value = that.linecache[1][0];
                    _.find(that.c.prop, function (o) { return o.label === "Y1"; }).value = that.linecache[1][1];
                    app.SHAPE[that.c.sid] = JSON.parse(JSON.stringify(that.c.prop)) ;
                    that.drawline();

                    that.linecache = [[], []];

                    return;
                }
                $('.selected').removeClass('selected');
              
                //draw line start
                if (category == "line") {

                    let x = _.find(that.c.prop, function (o) { return o.label === "X"; }).value, y0 = _.find(that.c.prop, function (o) { return o.label === "Y"; }).value;
                   
                    _.find(that.c.prop, function (o) { return o.label === "X"; }).value = app.current_dot[0];
                    _.find(that.c.prop, function (o) { return o.label === "Y"; }).value = app.current_dot[1];
                        that.linecache = [[...app.current_dot], []];

                    
                    return;
                }
                if (!that.c.shape) { return; }
               
             
                app.SHAPE[that.c.sid] =JSON.parse(JSON.stringify(app.current_prop)) ;

                that.drawshape();
              app.current_sid=shape + "_" + Math.random().toString(36).substr(2);
              
            });
            $('#paint').delegate('.ele-shape', 'click', function (e) {

                console.log($('.selected').length);
                //$('.selected').removeClass('selected');
                $('.ele-shape').each(function () {
                    $(this).attr('class', $(this).attr('class').replace('selected', ''));
                });
                var $that = $(this);

                app.current_prop =JSON.parse(JSON.stringify(app.SHAPE[$that.attr('sid')])) ;
				
                app.current_shape = $that.attr('shape')+"|slt";
                app.current_sid = $that.attr('sid');
                $that.addClass('selected');
                e.preventDefault();
            });
           
		}
		
		
		}
		w.net = new Net();
		
		}
		
		
		)(window, SVG, (() => {
	return Z;
})());