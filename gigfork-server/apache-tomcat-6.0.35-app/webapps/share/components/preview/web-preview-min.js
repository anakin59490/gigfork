(function(){var e=YAHOO.util.Dom,h=YAHOO.util.Event,b=YAHOO.util.Element,a=YAHOO.util.KeyListener;var c=Alfresco.util.encodeHTML;Alfresco.WebPreview=function(l){Alfresco.WebPreview.superclass.constructor.call(this,"Alfresco.WebPreview",l,["button","container","uploader"]);this.plugin=null;return this};YAHOO.extend(Alfresco.WebPreview,Alfresco.component.Base,{options:{thumbnailModification:[],nodeRef:"",size:"0",name:"",mimeType:"",thumbnails:[],pluginConditions:[]},Plugins:{},plugin:null,onComponentsLoaded:function k(){YAHOO.deconcept.SWFObject.prototype.getVariablePairs=function(){var l=[],m,n=this.getVariables();for(m in n){if(n.hasOwnProperty(m)){l[l.length]=m+"="+encodeURIComponent(n[m])}}return l};h.onContentReady(this.id,this.onReady,this,true)},onReady:function j(){this.setupPreview(false)},setupPreview:function g(){this.widgets.previewerElement=e.get(this.id+"-previewer-div");if(this.options.nodeRef===undefined){throw new Error("A nodeRef must be provided")}if(this.options.size=="0"){this.widgets.previewerElement.innerHTML='<div class="message">'+this.msg("label.noContent")+"</div>"}else{var m,n,s,p=[];for(var q=0,u=this.options.pluginConditions.length;q<u;q++){m=this.options.pluginConditions[q];if(!this.conditionsMatch(m)){continue}for(var r=0,l=m.plugins.length;r<l;r++){n=m.plugins[r];s=new Alfresco.WebPreview.prototype.Plugins[n.name](this,n.attributes);var o=s.report();if(o){p.push(o)}else{this.plugin=s;var v;try{e.addClass(this.widgets.previewerElement,n.name);v=s.display();if(v){this.widgets.previewerElement.innerHTML=v}return}catch(t){Alfresco.logger.error("Error, Alfresco.WebPreview.Plugins."+n.name+" failed to display: "+t);p.push(this.msg("label.error",n.name,t.message))}}}}var w=this.msg("label.noPreview",this.getContentUrl(true));for(q=0,u=p.length;q<u;q++){w+="<br/>"+p[q]}this.widgets.previewerElement.innerHTML='<div class="message">'+w+"</div>"}},conditionsMatch:function i(l){if(l.attributes.mimeType&&l.attributes.mimeType!=this.options.mimeType){return false}if(l.attributes.thumbnail&&!Alfresco.util.arrayContains(this.options.thumbnails,l.attributes.thumbnail)){return false}return true},getContentUrl:function f(m){var n=this.options.nodeRef.replace(":/",""),l="noCache="+new Date().getTime();m=m?"a=true":"a=false";return Alfresco.constants.PROXY_URI+"api/node/content/"+n+"/"+this.options.name+"?c=force&"+l+"&"+m},getThumbnailUrl:function d(q,p){var n=this.options.nodeRef.replace(":/",""),l="noCache="+new Date().getTime(),o="c=force";for(var m=0;m<this.options.thumbnailModification.length;m++){if(this.options.thumbnailModification[m].indexOf(q)!=-1){l="lastModified="+this.options.thumbnailModification[m];break}}return Alfresco.constants.PROXY_URI+"api/node/"+n+"/content/thumbnails/"+q+(p?"/suffix"+p:"")+"?"+o+"&"+l},getPreviewerElement:function(){return this.widgets.previewerElement}})})();