YUI.add("graphics-vml",function(b){var d=b.Lang,j=d.isNumber,f=d.isArray,k=d.isString,h=b.DOM,c=b.Selector,n=b.config.doc,e=b.AttributeLite,q,m,p,l,o,i,a;function g(){}g.prototype={_coordSpaceMultiplier:100,_round:function(r){return Math.round(r*this._coordSpaceMultiplier);},_addToPath:function(r){this._path=this._path||"";this._path+=r;},_currentX:0,_currentY:0,curveTo:function(u,t,B,A,z,w){var v,r,s,C;this._addToPath(" c "+this._round(u)+", "+this._round(t)+", "+this._round(B)+", "+this._round(A)+", "+this._round(z)+", "+this._round(w));this._currentX=z;this._currentY=w;v=Math.max(z,Math.max(u,B));s=Math.max(w,Math.max(t,A));r=Math.min(z,Math.min(u,B));C=Math.min(w,Math.min(t,A));this._trackSize(v,s);this._trackSize(r,C);},quadraticCurveTo:function(w,v,A,z){var s=this._currentX,r=this._currentY,u=s+0.67*(w-s),t=r+0.67*(v-r),C=u+(A-s)*0.34,B=t+(z-r)*0.34;this.curveTo(u,t,C,B,A,z);},drawRect:function(r,u,s,t){this.moveTo(r,u);this.lineTo(r+s,u);this.lineTo(r+s,u+t);this.lineTo(r,u+t);this.lineTo(r,u);this._currentX=r;this._currentY=u;return this;},drawRoundRect:function(r,z,s,u,t,v){this.moveTo(r,z+v);this.lineTo(r,z+u-v);this.quadraticCurveTo(r,z+u,r+t,z+u);this.lineTo(r+s-t,z+u);this.quadraticCurveTo(r+s,z+u,r+s,z+u-v);this.lineTo(r+s,z+v);this.quadraticCurveTo(r+s,z,r+s-t,z);this.lineTo(r+t,z);this.quadraticCurveTo(r,z,r,z+v);return this;},drawCircle:function(s,w,r){var u=0,t=360,v=r*2;t*=65535;this._drawingComplete=false;this._trackSize(s+v,w+v);this.moveTo((s+v),(w+r));this._addToPath(" ae "+this._round(s+r)+", "+this._round(w+r)+", "+this._round(r)+", "+this._round(r)+", "+u+", "+t);return this;},drawEllipse:function(t,B,u,A){var z=0,v=360,s=u*0.5,r=A*0.5;v*=65535;this._drawingComplete=false;this._trackSize(t+u,B+A);this.moveTo((t+u),(B+r));this._addToPath(" ae "+this._round(t+s)+", "+this._round(t+s)+", "+this._round(B+r)+", "+this._round(s)+", "+this._round(r)+", "+z+", "+v);return this;},drawDiamond:function(s,w,v,r){var u=v*0.5,t=r*0.5;this.moveTo(s+u,w);this.lineTo(s+v,w+t);this.lineTo(s+u,w+r);this.lineTo(s,w+t);this.lineTo(s+u,w);return this;},drawWedge:function(s,w,u,t,r){var v=r*2;if(Math.abs(t)>360){t=360;}this._currentX=s;this._currentY=w;u*=-65535;t*=65536;u=Math.round(u);t=Math.round(t);this.moveTo(s,w);this._addToPath(" ae "+this._round(s)+", "+this._round(w)+", "+this._round(r)+" "+this._round(r)+", "+u+", "+t);this._trackSize(v,v);return this;},lineTo:function(w,v,t){var s=arguments,u,r,x=" l ";if(typeof w==="string"||typeof w==="number"){s=[[w,v]];}r=s.length;for(u=0;u<r;++u){x+=" "+this._round(s[u][0])+", "+this._round(s[u][1]);this._trackSize.apply(this,s[u]);this._currentX=s[u][0];this._currentY=s[u][1];}this._addToPath(x);return this;},moveTo:function(r,s){this._addToPath(" m "+this._round(r)+", "+this._round(s));this._trackSize(r,s);this._currentX=r;this._currentY=s;},_closePath:function(){var y=this.get("fill"),x=this.get("stroke"),t=this.node,r=this.get("width"),s=this.get("height"),v=this._path,u="",z=this._coordSpaceMultiplier;this._fillChangeHandler();this._strokeChangeHandler();if(v){if(y&&y.color){u+=" x";}if(x){u+=" e";}}if(v){t.path=v+u;}if(!isNaN(r)&&!isNaN(s)){t.coordOrigin=this._left+", "+this._top;t.coordSize=(r*z)+", "+(s*z);t.style.position="absolute";t.style.width=r+"px";t.style.height=s+"px";}this._path=v;this._updateTransform();},end:function(){this._closePath();},closePath:function(){this._addToPath(" x e");},clear:function(){this._right=0;this._bottom=0;this._width=0;this._height=0;this._left=0;this._top=0;this._path="";},_trackSize:function(r,s){if(r>this._right){this._right=r;}if(r<this._left){this._left=r;}if(s<this._top){this._top=s;}if(s>this._bottom){this._bottom=s;}this._width=this._right-this._left;this._height=this._bottom-this._top;},_left:0,_right:0,_top:0,_bottom:0,_width:0,_height:0};b.VMLDrawing=g;q=function(){this._transforms=[];this.matrix=new b.Matrix();this._normalizedMatrix=new b.Matrix();q.superclass.constructor.apply(this,arguments);};q.NAME="vmlShape";b.extend(q,b.GraphicBase,b.mix({_type:"shape",init:function(){this.initializer.apply(this,arguments);},initializer:function(r){var s=this,t=r.graphic;s.createNode();if(t){this._setGraphic(t);}this._updateHandler();},_setGraphic:function(r){var s;if(r instanceof b.VMLGraphic){this._graphic=r;}else{r=b.one(r);s=new b.VMLGraphic({render:r});s._appendShape(this);this._graphic=s;}},createNode:function(){var G,C=this.get("x"),A=this.get("y"),D=this.get("width"),I=this.get("height"),F,u,M,J=this.get("visible")?"visible":"hidden",L,z,v,E,s,B,K,r,H,t;F=this.get("id");u=this._type=="path"?"shape":this._type;z="vml"+u+" yui3-vmlShape yui3-"+this.constructor.NAME;v=this._getStrokeProps();H=this._getFillProps();M="<"+u+'  xmlns="urn:schemas-microsft.com:vml" id="'+F+'" class="'+z+'" style="behavior:url(#default#VML);display:inline-block;position:absolute;left:'+C+"px;top:"+A+"px;width:"+D+"px;height:"+I+"px;visibility:"+J+'"';if(v&&v.weight&&v.weight>0){E=v.endcap;s=parseFloat(v.opacity);B=v.joinstyle;K=v.miterlimit;r=v.dashstyle;M+=' stroked="t" strokecolor="'+v.color+'" strokeWeight="'+v.weight+'px"';L='<stroke class="vmlstroke" xmlns="urn:schemas-microsft.com:vml" on="t" style="behavior:url(#default#VML);display:inline-block;"';L+=' opacity="'+s+'"';if(E){L+=' endcap="'+E+'"';}if(B){L+=' joinstyle="'+B+'"';}if(K){L+=' miterlimit="'+K+'"';}if(r){L+=' dashstyle="'+r+'"';}L+="></stroke>";this._strokeNode=n.createElement(L);M+=' stroked="t"';}else{M+=' stroked="f"';}if(H){if(H.node){t=H.node;this._fillNode=n.createElement(t);}if(H.color){M+=' fillcolor="'+H.color+'"';}M+=' filled="'+H.filled+'"';}M+=">";M+="</"+u+">";G=n.createElement(M);if(this._strokeNode){G.appendChild(this._strokeNode);}if(this._fillNode){G.appendChild(this._fillNode);}this.node=G;this._strokeFlag=false;this._fillFlag=false;},addClass:function(r){var s=this.node;h.addClass(s,r);},removeClass:function(r){var s=this.node;h.removeClass(s,r);},getXY:function(){var u=this._graphic,s=u.getXY(),r=this.get("x"),t=this.get("y");
return[s[0]+r,s[1]+t];},setXY:function(s){var t=this._graphic,r=t.getXY();this.set("x",s[0]-r[0]);this.set("y",s[1]-r[1]);},contains:function(r){return r===b.one(this.node);},compareTo:function(r){var s=this.node;return s===r;},test:function(r){return c.test(this.node,r);},_getStrokeProps:function(){var y,A=this.get("stroke"),w,s,u="",r,t=0,v,z,x;if(A&&A.weight&&A.weight>0){y={};z=A.linecap||"flat";x=A.linejoin||"round";if(z!="round"&&z!="square"){z="flat";}w=parseFloat(A.opacity);s=A.dashstyle||"none";A.color=A.color||"#000000";A.weight=A.weight||1;A.opacity=j(w)?w:1;y.stroked=true;y.color=A.color;y.weight=A.weight;y.endcap=z;y.opacity=A.opacity;if(f(s)){u=[];v=s.length;for(t=0;t<v;++t){r=s[t];u[t]=r/A.weight;}}if(x=="round"||x=="bevel"){y.joinstyle=x;}else{x=parseInt(x,10);if(j(x)){y.miterlimit=Math.max(x,1);y.joinstyle="miter";}}y.dashstyle=u;}return y;},_strokeChangeHandler:function(x){if(!this._strokeFlag){return;}var t=this.node,B=this.get("stroke"),y,s,v="",r,u=0,w,A,z;if(B&&B.weight&&B.weight>0){A=B.linecap||"flat";z=B.linejoin||"round";if(A!="round"&&A!="square"){A="flat";}y=parseFloat(B.opacity);s=B.dashstyle||"none";B.color=B.color||"#000000";B.weight=B.weight||1;B.opacity=j(y)?y:1;t.stroked=true;t.strokeColor=B.color;t.strokeWeight=B.weight+"px";if(!this._strokeNode){this._strokeNode=this._createGraphicNode("stroke");t.appendChild(this._strokeNode);}this._strokeNode.endcap=A;this._strokeNode.opacity=B.opacity;if(f(s)){v=[];w=s.length;for(u=0;u<w;++u){r=s[u];v[u]=r/B.weight;}}if(z=="round"||z=="bevel"){this._strokeNode.joinstyle=z;}else{z=parseInt(z,10);if(j(z)){this._strokeNode.miterlimit=Math.max(z,1);this._strokeNode.joinstyle="miter";}}this._strokeNode.dashstyle=v;this._strokeNode.on=true;}else{if(this._strokeNode){this._strokeNode.on=false;}t.stroked=false;}this._strokeFlag=false;},_getFillProps:function(){var x=this.get("fill"),r,u,w,s,t,v=false;if(x){u={};if(x.type=="radial"||x.type=="linear"){r=parseFloat(x.opacity);r=j(r)?r:1;v=true;w=this._getGradientFill(x);t='<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" opacity="'+r+'"';for(s in w){if(w.hasOwnProperty(s)){t+=" "+s+'="'+w[s]+'"';}}t+=" />";u.node=t;}else{if(x.color){r=parseFloat(x.opacity);v=true;u.color=x.color;if(j(r)){r=Math.max(Math.min(r,1),0);u.opacity=r;if(r<1){u.node='<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" type="solid" opacity="'+r+'"/>';}}}}u.filled=v;}return u;},_fillChangeHandler:function(y){if(!this._fillFlag){return;}var u=this.node,x=this.get("fill"),r,t,v=false,s,w;if(x){if(x.type=="radial"||x.type=="linear"){v=true;w=this._getGradientFill(x);if(this._fillNode){for(s in w){if(w.hasOwnProperty(s)){if(s=="colors"){this._fillNode.colors.value=w[s];}else{this._fillNode[s]=w[s];}}}}else{t='<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;"';for(s in w){if(w.hasOwnProperty(s)){t+=" "+s+'="'+w[s]+'"';}}t+=" />";this._fillNode=n.createElement(t);u.appendChild(this._fillNode);}}else{if(x.color){u.fillcolor=x.color;r=parseFloat(x.opacity);v=true;if(j(r)&&r<1){x.opacity=r;if(this._fillNode){if(this._fillNode.getAttribute("type")!="solid"){this._fillNode.type="solid";}this._fillNode.opacity=r;}else{t='<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" type="solid" opacity="'+r+'"/>';this._fillNode=n.createElement(t);u.appendChild(this._fillNode);}}else{if(this._fillNode){this._fillNode.opacity=1;this._fillNode.type="solid";}}}}}u.filled=v;this._fillFlag=false;},_updateFillNode:function(r){if(!this._fillNode){this._fillNode=this._createGraphicNode("fill");r.appendChild(this._fillNode);}},_getGradientFill:function(L){var Q={},D,B,A=L.type,E=this.get("width"),O=this.get("height"),F=j,J,C=L.stops,N=C.length,y,K,M=0,G,s="",v=L.cx,t=L.cy,x=L.fx,u=L.fy,H=L.r,P,z,I=L.rotation||0;if(A==="linear"){if(I<=270){I=Math.abs(I-270);}else{if(I<360){I=270+(360-I);}else{I=270;}}Q.type="gradient";Q.angle=I;}else{if(A==="radial"){D=E*(H*2);B=O*(H*2);x=H*2*(x-0.5);u=H*2*(u-0.5);x+=v;u+=t;Q.focussize=(D/E)/10+"% "+(B/O)/10+"%";Q.alignshape=false;Q.type="gradientradial";Q.focus="100%";Q.focusposition=Math.round(x*100)+"% "+Math.round(u*100)+"%";}}for(;M<N;++M){J=C[M];K=J.color;y=J.opacity;y=F(y)?y:1;z=J.offset||M/(N-1);z*=(H*2);z=Math.round(100*z)+"%";G=M>0?M+1:"";Q["opacity"+G]=y+"";s+=", "+z+" "+K;}if(parseFloat(z)<100){s+=", 100% "+K;}Q.colors=s.substr(2);return Q;},_addTransform:function(s,r){r=b.Array(r);this._transform=d.trim(this._transform+" "+s+"("+r.join(", ")+")");r.unshift(s);this._transforms.push(r);if(this.initialized){this._updateTransform();}},_updateTransform:function(){var u=this.node,F,t,v,E=this.get("x"),C=this.get("y"),A,w,D=this.matrix,r=this._normalizedMatrix,s=this instanceof b.VMLPath,z=0,B=this._transforms.length;if(this._transforms&&this._transforms.length>0){v=this.get("transformOrigin");if(s){r.translate(this._left,this._top);}A=v[0]-0.5;w=v[1]-0.5;A=Math.max(-0.5,Math.min(0.5,A));w=Math.max(-0.5,Math.min(0.5,w));for(;z<B;++z){F=this._transforms[z].shift();if(F){r[F].apply(r,this._transforms[z]);D[F].apply(D,this._transforms[z]);}}if(s){r.translate(-this._left,-this._top);}t=r.a+","+r.c+","+r.b+","+r.d+","+0+","+0;}this._graphic.addToRedrawQueue(this);if(t){if(!this._skew){this._skew=n.createElement('<skew class="vmlskew" xmlns="urn:schemas-microsft.com:vml" on="false" style="behavior:url(#default#VML);display:inline-block;" />');this.node.appendChild(this._skew);}this._skew.matrix=t;this._skew.on=true;this._skew.offset=this._getSkewOffsetValue(r.dx)+"px, "+this._getSkewOffsetValue(r.dy)+"px";this._skew.origin=A+", "+w;}if(this._type!="path"){this._transforms=[];}u.style.left=E+"px";u.style.top=C+"px";},_getSkewOffsetValue:function(s){var r=b.MatrixUtil.sign(s),t=Math.abs(s);s=Math.min(t,32767)*r;return s;},_translateX:0,_translateY:0,_transform:"",translate:function(r,s){this._translateX+=r;
this._translateY+=s;this._addTransform("translate",arguments);},translateX:function(r){this._translateX+=r;this._addTransform("translateX",arguments);},translateY:function(r){this._translateY+=r;this._addTransform("translateY",arguments);},skew:function(r,s){this._addTransform("skew",arguments);},skewX:function(r){this._addTransform("skewX",arguments);},skewY:function(r){this._addTransform("skewY",arguments);},rotate:function(r){this._addTransform("rotate",arguments);},scale:function(r,s){this._addTransform("scale",arguments);},on:function(s,r){if(b.Node.DOM_EVENTS[s]){return b.one("#"+this.get("id")).on(s,r);}return b.on.apply(this,arguments);},_draw:function(){},_updateHandler:function(t){var s=this,r=s.node;s._fillChangeHandler();s._strokeChangeHandler();r.style.width=this.get("width")+"px";r.style.height=this.get("height")+"px";this._draw();s._updateTransform();},_createGraphicNode:function(r){r=r||this._type;return n.createElement("<"+r+' xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:inline-block;" class="vml'+r+'"/>');},_getDefaultFill:function(){return{type:"solid",cx:0.5,cy:0.5,fx:0.5,fy:0.5,r:0.5};},_getDefaultStroke:function(){return{weight:1,dashstyle:"none",color:"#000",opacity:1};},set:function(){var r=this;e.prototype.set.apply(r,arguments);if(r.initialized){r._updateHandler();}},getBounds:function(u){var z=this.get("stroke"),t=this.get("width"),v=this.get("height"),s=this.get("x"),A=this.get("y"),r=0;if(z&&z.weight){r=z.weight;}t=(s+t+r)-(s-r);v=(A+v+r)-(A-r);s-=r;A-=r;return this._normalizedMatrix.getContentRect(t,v,s,A);},destroy:function(){var r=this.get("graphic");if(r){r.removeShape(this);}else{this._destroy();}},_destroy:function(){if(this.node){if(this._fillNode){this.node.removeChild(this._fillNode);this._fillNode=null;}if(this._strokeNode){this.node.removeChild(this._strokeNode);this._strokeNode=null;}b.one(this.node).remove(true);}}},b.VMLDrawing.prototype));q.ATTRS={transformOrigin:{valueFn:function(){return[0.5,0.5];}},transform:{setter:function(u){var t=0,r,s;this.matrix.init();this._normalizedMatrix.init();this._transforms=this.matrix.getTransformArray(u);r=this._transforms.length;for(;t<r;++t){s=this._transforms[t];}this._transform=u;return u;},getter:function(){return this._transform;}},x:{value:0},y:{value:0},id:{valueFn:function(){return b.guid();},setter:function(s){var r=this.node;if(r){r.setAttribute("id",s);}return s;}},width:{value:0},height:{value:0},visible:{value:true,setter:function(t){var s=this.node,r=t?"visible":"hidden";if(s){s.style.visibility=r;}return t;}},fill:{valueFn:"_getDefaultFill",setter:function(u){var s,t,r=this.get("fill")||this._getDefaultFill();if(u){if(u.hasOwnProperty("color")){u.type="solid";}for(s in u){if(u.hasOwnProperty(s)){r[s]=u[s];}}}t=r;if(t&&t.color){if(t.color===undefined||t.color=="none"){t.color=null;}}this._fillFlag=true;return t;}},stroke:{valueFn:"_getDefaultStroke",setter:function(v){var t,u,r,s=this.get("stroke")||this._getDefaultStroke();if(v){if(v.hasOwnProperty("weight")){r=parseInt(v.weight,10);if(!isNaN(r)){v.weight=r;}}for(t in v){if(v.hasOwnProperty(t)){s[t]=v[t];}}}u=s;this._strokeFlag=true;return u;}},autoSize:{value:false},pointerEvents:{value:"visiblePainted"},node:{readOnly:true,getter:function(){return this.node;}},graphic:{readOnly:true,getter:function(){return this._graphic;}}};b.VMLShape=q;p=function(){p.superclass.constructor.apply(this,arguments);};p.NAME="vmlPath";b.extend(p,b.VMLShape);p.ATTRS=b.merge(b.VMLShape.ATTRS,{width:{getter:function(){var r=Math.max(this._right-this._left,0);return r;}},height:{getter:function(){return Math.max(this._bottom-this._top,0);}},path:{readOnly:true,getter:function(){return this._path;}}});b.VMLPath=p;l=function(){l.superclass.constructor.apply(this,arguments);};l.NAME="vmlRect";b.extend(l,b.VMLShape,{_type:"rect"});l.ATTRS=b.VMLShape.ATTRS;b.VMLRect=l;o=function(){o.superclass.constructor.apply(this,arguments);};o.NAME="vmlEllipse";b.extend(o,b.VMLShape,{_type:"oval"});o.ATTRS=b.merge(b.VMLShape.ATTRS,{xRadius:{lazyAdd:false,getter:function(){var r=this.get("width");r=Math.round((r/2)*100)/100;return r;},setter:function(s){var r=s*2;this.set("width",r);return s;}},yRadius:{lazyAdd:false,getter:function(){var r=this.get("height");r=Math.round((r/2)*100)/100;return r;},setter:function(s){var r=s*2;this.set("height",r);return s;}}});b.VMLEllipse=o;m=function(r){m.superclass.constructor.apply(this,arguments);};m.NAME="vmlCircle";b.extend(m,q,{_type:"oval"});m.ATTRS=b.merge(q.ATTRS,{radius:{lazyAdd:false,value:0},width:{setter:function(r){this.set("radius",r/2);return r;},getter:function(){var r=this.get("radius"),s=r&&r>0?r*2:0;return s;}},height:{setter:function(r){this.set("radius",r/2);return r;},getter:function(){var r=this.get("radius"),s=r&&r>0?r*2:0;return s;}}});b.VMLCircle=m;a=function(){a.superclass.constructor.apply(this,arguments);};a.NAME="vmlPieSlice";b.extend(a,b.VMLShape,b.mix({_type:"shape",_draw:function(v){var s=this.get("cx"),w=this.get("cy"),u=this.get("startAngle"),t=this.get("arc"),r=this.get("radius");this.clear();this.drawWedge(s,w,u,t,r);this.end();}},b.VMLDrawing.prototype));a.ATTRS=b.mix({cx:{value:0},cy:{value:0},startAngle:{value:0},arc:{value:0},radius:{value:0}},b.VMLShape.ATTRS);b.VMLPieSlice=a;i=function(){i.superclass.constructor.apply(this,arguments);};i.NAME="vmlGraphic";i.ATTRS={render:{},id:{valueFn:function(){return b.guid();},setter:function(s){var r=this._node;if(r){r.setAttribute("id",s);}return s;}},shapes:{readOnly:true,getter:function(){return this._shapes;}},contentBounds:{readOnly:true,getter:function(){return this._contentBounds;}},node:{readOnly:true,getter:function(){return this._node;}},width:{setter:function(r){if(this._node){this._node.style.width=r+"px";}return r;}},height:{setter:function(r){if(this._node){this._node.style.height=r+"px";}return r;}},autoSize:{value:false},resizeDown:{getter:function(){return this._resizeDown;},setter:function(r){this._resizeDown=r;if(this._node){this._redraw();
}return r;}},x:{getter:function(){return this._x;},setter:function(r){this._x=r;if(this._node){this._node.style.left=r+"px";}return r;}},y:{getter:function(){return this._y;},setter:function(r){this._y=r;if(this._node){this._node.style.top=r+"px";}return r;}},autoDraw:{value:true},visible:{value:true,setter:function(r){this._toggleVisible(r);return r;}}};b.extend(i,b.GraphicBase,{_x:0,_y:0,getXY:function(){var s=this.parentNode,r=this.get("x"),u=this.get("y"),t;if(s){t=b.one(s).getXY();t[0]+=r;t[1]+=u;}else{t=b.DOM._getOffset(this._node);}return t;},_resizeDown:false,initializer:function(s){var t=this.get("render"),r=this.get("visible")?"visible":"hidden";this._shapes={};this._contentBounds={left:0,top:0,right:0,bottom:0};this._node=this._createGraphic();this._node.style.visibility=r;this._node.setAttribute("id",this.get("id"));if(t){this.render(t);}},render:function(u){var r=b.one(u),s=this.get("width")||parseInt(r.getComputedStyle("width"),10),t=this.get("height")||parseInt(r.getComputedStyle("height"),10);r=r||n.body;r.appendChild(this._node);this.setSize(s,t);this.parentNode=r;this.set("width",s);this.set("height",t);return this;},destroy:function(){this.clear();b.one(this._node).remove(true);},addShape:function(r){r.graphic=this;if(!this.get("visible")){r.visible=false;}var t=this._getShapeClass(r.type),s=new t(r);this._appendShape(s);return s;},_appendShape:function(s){var t=s.node,r=this._frag||this._node;if(this.get("autoDraw")){r.appendChild(t);}else{this._getDocFrag().appendChild(t);}},removeShape:function(r){if(!(r instanceof q)){if(d.isString(r)){r=this._shapes[r];}}if(r&&(r instanceof q)){r._destroy();this._shapes[r.get("id")]=null;delete this._shapes[r.get("id")];}if(this.get("autoDraw")){this._redraw();}},removeAllShapes:function(){var r=this._shapes,s;for(s in r){if(r.hasOwnProperty(s)){r[s].destroy();}}this._shapes={};},_removeChildren:function(r){if(r.hasChildNodes()){var s;while(r.firstChild){s=r.firstChild;this._removeChildren(s);r.removeChild(s);}}},clear:function(){this.removeAllShapes();this._removeChildren(this._node);},_toggleVisible:function(u){var t,s=this._shapes,r=u?"visible":"hidden";if(s){for(t in s){if(s.hasOwnProperty(t)){s[t].set("visible",u);}}}if(this._node){this._node.style.visibility=r;}},setSize:function(r,s){r=Math.round(r);s=Math.round(s);this._node.style.width=r+"px";this._node.style.height=s+"px";this._node.coordSize=r+" "+s;},setPosition:function(r,s){r=Math.round(r);s=Math.round(s);this._node.style.left=r+"px";this._node.style.top=s+"px";},_createGraphic:function(){var r=n.createElement('<group xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:block;position:absolute;top:0px;left:0px;zoom:1;" />');return r;},_createGraphicNode:function(r){return n.createElement("<"+r+' xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:inline-block;zoom:1;" />');},getShapeById:function(r){return this._shapes[r];},_getShapeClass:function(s){var r=this._shapeClass[s];if(r){return r;}return s;},_shapeClass:{circle:b.VMLCircle,rect:b.VMLRect,path:b.VMLPath,ellipse:b.VMLEllipse,pieslice:b.VMLPieSlice},batch:function(s){var r=this.get("autoDraw");this.set("autoDraw",false);s.apply();this._redraw();this.set("autoDraw",r);},_getDocFrag:function(){if(!this._frag){this._frag=n.createDocumentFragment();}return this._frag;},addToRedrawQueue:function(r){var t,s;this._shapes[r.get("id")]=r;if(!this._resizeDown){t=r.getBounds();s=this._contentBounds;s.left=s.left<t.left?s.left:t.left;s.top=s.top<t.top?s.top:t.top;s.right=s.right>t.right?s.right:t.right;s.bottom=s.bottom>t.bottom?s.bottom:t.bottom;s.width=s.right-s.left;s.height=s.bottom-s.top;this._contentBounds=s;}if(this.get("autoDraw")){this._redraw();}},_redraw:function(){var r=this._resizeDown?this._getUpdatedContentBounds():this._contentBounds;if(this.get("autoSize")){this.setSize(r.right,r.bottom);}if(this._frag){this._node.appendChild(this._frag);this._frag=null;}},_getUpdatedContentBounds:function(){var v,t,s,r=this._shapes,u={left:0,top:0,right:0,bottom:0};for(t in r){if(r.hasOwnProperty(t)){s=r[t];v=s.getBounds();u.left=Math.min(u.left,v.left);u.top=Math.min(u.top,v.top);u.right=Math.max(u.right,v.right);u.bottom=Math.max(u.bottom,v.bottom);}}u.width=u.right-u.left;u.height=u.bottom-u.top;this._contentBounds=u;return u;}});b.VMLGraphic=i;},"@VERSION@",{skinnable:false,requires:["graphics"]});