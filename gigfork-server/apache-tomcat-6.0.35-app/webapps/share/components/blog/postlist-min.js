(function(){var b=YAHOO.util.Dom,G=YAHOO.util.Event,t=YAHOO.util.Element;var u=Alfresco.util.encodeHTML;Alfresco.BlogPostList=function(H){this.name="Alfresco.BlogPostList";this.id=H;this.widgets={};this.currentFilter={};this.tagId={id:0,tags:{}};Alfresco.util.ComponentManager.register(this);Alfresco.util.YUILoaderHelper.require(["button","dom","datasource","datatable","paginator","event","element"],this.onComponentsLoaded,this);YAHOO.Bubbling.on("tagSelected",this.onTagSelected,this);YAHOO.Bubbling.on("blogConfigChanged",this.onBlogConfigChanged,this);YAHOO.Bubbling.on("changeFilter",this.onChangeFilter,this);YAHOO.Bubbling.on("blogpostlistRefresh",this.onBlogPostListRefresh,this);YAHOO.Bubbling.on("deactivateAllControls",this.onDeactivateAllControls,this);return this};Alfresco.BlogPostList.prototype={options:{siteId:"",containerId:"blog",initialFilter:{},pageSize:10,simpleView:false,maxContentLength:512},currentFilter:null,widgets:null,modules:null,tagId:null,busy:false,showPublishingActions:false,recordOffset:0,totalRecords:0,setOptions:function E(H){this.options=YAHOO.lang.merge(this.options,H);return this},setMessages:function A(H){Alfresco.util.addMessages(H,this.name);return this},onComponentsLoaded:function v(){G.onContentReady(this.id,this.onReady,this,true)},onReady:function f(){var Q=this;this.widgets.simpleView=Alfresco.util.createYUIButton(this,"simpleView-button",this.onSimpleView);var K=function H(X,W){Q._updateBlogPostList({page:X.page})};this.widgets.paginator=new YAHOO.widget.Paginator({containers:[this.id+"-paginator"],rowsPerPage:this.options.pageSize,initialPage:1,template:this._msg("pagination.template"),pageReportTemplate:this._msg("pagination.template.page-report"),previousPageLinkLabel:this._msg("pagination.previousPageLinkLabel"),nextPageLinkLabel:this._msg("pagination.nextPageLinkLabel")});this.widgets.paginator.subscribe("changeRequest",K);var S=function N(Y,X){var W=YAHOO.Bubbling.getOwnerByTagName(X[1].anchor,"div");if(W!==null){if(typeof Q[W.className]=="function"){X[1].stop=true;Q[W.className].call(Q,X[1].target.offsetParent,W)}}return true};YAHOO.Bubbling.addDefaultAction("blogpost-action-link-div",S);var P=function J(Y,X){var W=YAHOO.Bubbling.getOwnerByTagName(X[1].anchor,"span");if(W!==null){var Z=W.className;var aa=X[1].target;if(typeof Q[Z]=="function"){Q[Z].call(Q,aa.offsetParent,W);X[1].stop=true}}return true};YAHOO.Bubbling.addDefaultAction("blogpost-action-link-span",P);var V=YAHOO.lang.substitute(Alfresco.constants.URL_SERVICECONTEXT+"components/blog/site/{site}/{container}/posts",{site:this.options.siteId,container:this.options.containerId});this.widgets.dataSource=new YAHOO.util.DataSource(V,{responseType:YAHOO.util.DataSource.TYPE_JSON,connXhrMode:"queueRequests",responseSchema:{resultsList:"items",metaFields:{recordOffset:"startIndex",totalRecords:"total",metadata:"metadata"}}});var U=function I(ae,af,ac,W){b.addClass(ae,"hidden");var aa=af.getData();var Y=Alfresco.util.blog.generateBlogPostViewUrl(Q.options.siteId,Q.options.containerId,aa.name);var ag=Alfresco.util.blog.generatePostStatusLabel(Q,aa);var X=Alfresco.util.people.generateUserLink(aa.author);var ab="";if(!Q.options.simpleView){ab+='<div class="node post">';ab+=Alfresco.util.blog.generateBlogPostActions(Q,aa,"div",Q.showPublishingActions);ab+='<div class="nodeContent">';ab+='<span class="nodeTitle"><a href="'+Y+'">'+u(aa.title)+"</a> ";ab+='<span class="theme-color-2 nodeStatus">'+ag+"</span></span>";ab+='<div class="published">';if(!aa.isDraft){ab+='<span class="nodeAttrLabel">'+Q._msg("post.publishedOn")+": </span>";ab+='<span class="nodeAttrValue">'+Alfresco.util.formatDate(aa.releasedOn)+"</span>";ab+='<span class="separator">&nbsp;</span>'}ab+='<span class="nodeAttrLabel">'+Q._msg("post.author")+": </span>";ab+='<span class="nodeAttrValue">'+X+"</span>";if(aa.isPublished&&aa.postLink&&aa.postLink.length>0){ab+='<span class="separator">&nbsp;</span>';ab+='<span class="nodeAttrLabel">'+Q._msg("post.externalLink")+": </span>";ab+='<span class="nodeAttrValue"><a target="_blank" href="'+aa.postLink+'">'+Q._msg("post.clickHere")+"</a></span>"}ab+="</div>";ab+='<div class="content yuieditor"></div>';ab+="</div>";ab+="</div>";ab+='<div class="nodeFooter">';ab+='<span class="nodeAttrLabel replyTo">'+Q._msg("post.replies")+": </span>";ab+='<span class="nodeAttrValue">('+aa.commentCount+")</span>";ab+='<span class="separator">&nbsp;</span>';ab+='<span class="nodeAttrValue"><a href="'+Y+'">'+Q._msg("post.read")+"</a></span>";ab+='<span class="separator">&nbsp;</span>';ab+='<span class="nodeAttrLabel tagLabel">'+Q._msg("label.tags")+": </span>";if(aa.tags.length>0){for(var ad=0;ad<aa.tags.length;ad++){if(ad>0){ab+=", "}ab+=Alfresco.util.tags.generateTagLink(Q,aa.tags[ad])}}else{ab+='<span class="nodeAttrValue">'+Q._msg("post.noTags")+"</span>"}ab+="</div></div>"}else{b.addClass(ae,"row-separator");ab+='<div class="node post simple">';ab+=Alfresco.util.blog.generateBlogPostActions(Q,aa,"span",Q.showPublishingActions);ab+='<div class="nodeContent">';ab+='<span class="nodeTitle"><a href="'+Y+'">'+u(aa.title)+"</a> ";ab+='<span class="theme-color-2 nodeStatus">'+ag+"</span></span>";ab+='<div class="published">';if(!aa.isDraft){ab+='<span class="nodeAttrLabel">'+Q._msg("post.publishedOn")+": </span>";ab+='<span class="nodeAttrValue">'+Alfresco.util.formatDate(aa.releasedOn)+"</span>";ab+='<span class="separator">&nbsp;</span>'}ab+='<span class="nodeAttrLabel">'+Q._msg("post.author")+": </span>";ab+='<span class="nodeAttrValue">'+X+"</span>";if(aa.isPublished&&aa.postLink&&aa.postLink.length>0){ab+='<span class="separator">&nbsp;</span>';ab+='<span class="nodeAttrLabel">'+Q._msg("post.externalLink")+": </span>";ab+='<span class="nodeAttrValue"><a target="_blank" href="'+aa.postLink+'">'+Q._msg("post.clickHere")+"</a></span>"}ab+="</div>";ab+="</div>";ab+="</div>"}ae.innerHTML=ab;if(!Q.options.simpleView){var Z=b.getElementsByClassName("content","div",ae);if(Z.length==1){Z[0].innerHTML=aa.content}}b.removeClass(ae,"hidden")};var M=[{key:"blogposts",label:"BlogPosts",sortable:false,formatter:U}];this.widgets.dataTable=new YAHOO.widget.DataTable(this.id+"-postlist",M,this.widgets.dataSource,{initialLoad:false,dynamicData:true,MSG_EMPTY:this._msg("message.loading")});this.widgets.dataTable.handleDataReturnPayload=function O(X,W,Y){Q.recordOffset=W.meta.recordOffset;Q.totalRecords=W.meta.totalRecords;Y=Y||{};Y.recordOffset=W.meta.recordOffset;Y.totalRecords=W.meta.totalRecords;return Y};this.widgets.dataTable.doBeforePaginatorChange=function T(W){return false};this.widgets.dataTable.subscribe("renderEvent",function(){this.widgets.paginator.setState({recordOffset:this.recordOffset,totalRecords:this.totalRecords});this.widgets.paginator.render()},this,true);this._setDefaultDataTableErrors(this.widgets.dataTable);this.widgets.dataTable.subscribe("tableMsgShowEvent",function(W){this._elMsgTbody.parentNode.style.width=""});this.widgets.dataTable.doBeforeLoadData=function R(X,Y,aa){if(Y.error){try{var W=YAHOO.lang.JSON.parse(Y.responseText);this.set("MSG_ERROR",W.message)}catch(Z){Q._setDefaultDataTableErrors(Q.widgets.dataTable)}}else{if(Y.results&&!Q.options.usePagination){this.renderLoopSize=Alfresco.util.RENDERLOOPSIZE}}Q.showPublishingActions=Y.meta.metadata.externalBlogConfig;return true};this.widgets.dataTable.subscribe("rowMouseoverEvent",this.onEventHighlightRow,this,true);this.widgets.dataTable.subscribe("rowMouseoutEvent",this.onEventUnhighlightRow,this,true);var L=YAHOO.lang.merge({filterId:"new",filterOwner:"Alfresco.BlogPostListFilter",filterData:null},this.options.initialFilter);YAHOO.Bubbling.fire("changeFilter",L)},onSimpleView:function B(H,I){this.options.simpleView=!this.options.simpleView;I.set("label",this._msg(this.options.simpleView?"header.detailList":"header.simpleList"));YAHOO.Bubbling.fire("blogpostlistRefresh");G.preventDefault(H)},onViewBlogPost:function h(I){var H=this.widgets.dataTable.getRecord(I);window.location=this._generatePostViewUrl(H.getData("name"))},onEditBlogPost:function c(J){var H=this.widgets.dataTable.getRecord(J);var I=YAHOO.lang.substitute(Alfresco.constants.URL_PAGECONTEXT+"site/{site}/blog-postedit?postId={postId}",{site:this.options.siteId,postId:H.getData("name")});window.location=I},onDeleteBlogPost:function k(L){var I=this.widgets.dataTable.getRecord(L);var J=this;Alfresco.util.PopupManager.displayPrompt({title:this._msg("message.confirm.delete.title"),text:this._msg("message.confirm.delete",u(I.getData("title"))),buttons:[{text:this._msg("button.delete"),handler:function H(){this.destroy();J._deleteBlogPostConfirm.call(J,I.getData("name"))}},{text:this._msg("button.cancel"),handler:function K(){this.destroy()},isDefault:true}]})},onPublishExternal:function e(I){var H=this.widgets.dataTable.getRecord(I);this._publishExternal(H.getData("name"))},onUpdateExternal:function m(I){var H=this.widgets.dataTable.getRecord(I);this._updateExternal(H.getData("name"))},onUnpublishExternal:function l(I){var H=this.widgets.dataTable.getRecord(I);this._unpublishExternal(H.getData("name"))},onTagSelected:function o(I,H){var J=H[1];if(J&&(J.tagName!==null)){var K={filterId:J.tagName,filterOwner:"Alfresco.BlogPostListTags",filterData:null};YAHOO.Bubbling.fire("changeFilter",K)}},onBlogConfigChanged:function i(I,H){this._updateBlogPostList()},_deleteBlogPostConfirm:function C(H){if(!this._setBusy(this._msg("message.wait"))){return}var J=function K(L){this._releaseBusy();this._updateBlogPostList()};var I=YAHOO.lang.substitute(Alfresco.constants.PROXY_URI+"api/blog/post/site/{site}/{container}/{postId}?page=blog-postlist",{site:this.options.siteId,container:this.options.containerId,postId:encodeURIComponent(H)});Alfresco.util.Ajax.request({url:I,method:"DELETE",responseContentType:"application/json",successMessage:this._msg("message.delete.success"),successCallback:{fn:J,scope:this},failureMessage:this._msg("message.delete.failure"),failureCallback:{fn:function(L){this._releaseBusy()},scope:this}})},_publishExternal:function a(H){if(!this._setBusy(this._msg("message.wait"))){return}var K=function J(L){this._releaseBusy();this._updateBlogPostList()};var I=Alfresco.util.blog.generatePublishingRestURL(this.options.siteId,this.options.containerId,H);Alfresco.util.Ajax.request({url:I,method:"POST",requestContentType:"application/json",responseContentType:"application/json",dataObj:{action:"publish"},successMessage:this._msg("message.publishExternal.success"),successCallback:{fn:K,scope:this},failureMessage:this._msg("message.publishExternal.failure"),failureCallback:{fn:function(L){this._releaseBusy()},scope:this}})},_updateExternal:function g(H){if(!this._setBusy(this._msg("message.wait"))){return}var I=function K(L){this._releaseBusy();this._updateBlogPostList()};var J=Alfresco.util.blog.generatePublishingRestURL(this.options.siteId,this.options.containerId,H);Alfresco.util.Ajax.request({url:J,method:"POST",requestContentType:"application/json",responseContentType:"application/json",dataObj:{action:"update"},successMessage:this._msg("message.updateExternal.success"),successCallback:{fn:I,scope:this},failureMessage:this._msg("message.updateExternal.failure"),failureCallback:{fn:function(L){this._releaseBusy()},scope:this}})},_unpublishExternal:function y(I){if(!this._setBusy(this._msg("message.wait"))){return}var H=function K(L){this._releaseBusy();this._updateBlogPostList()};var J=Alfresco.util.blog.generatePublishingRestURL(this.options.siteId,this.options.containerId,I);Alfresco.util.Ajax.request({url:J,method:"POST",requestContentType:"application/json",responseContentType:"application/json",dataObj:{action:"unpublish"},successMessage:this._msg("message.unpublishExternal.success"),successCallback:{fn:H,scope:this},failureMessage:this._msg("message.unpublishExternal.failure"),failureCallback:{fn:function(L){this._releaseBusy()},scope:this}})},onEventHighlightRow:function n(K){var H=this.widgets.dataTable.getRecord(K.target.id);if(H){var I=H.getData("permissions");if(!(I.edit||I["delete"])){return}var J=b.getElementsByClassName("post",null,K.target,null);b.addClass(J,"over")}},onEventUnhighlightRow:function x(I){var H=b.getElementsByClassName("post",null,I.target,null);b.removeClass(H,"over")},onChangeFilter:function q(I,H){var J=H[1];if((J!==null)&&(J.filterId!==null)){this.currentFilter={filterId:J.filterId,filterOwner:J.filterOwner,filterData:J.filterData};this._updateBlogPostList({page:1});YAHOO.Bubbling.fire("filterChanged",this.currentFilter)}},onDeactivateAllControls:function z(J,I){var H,K,L=Alfresco.util.disableYUIButton;for(H in this.widgets){if(this.widgets.hasOwnProperty(H)){L(this.widgets[H])}}},updateListTitle:function F(){var K=b.get(this.id+"-listtitle");var M=this._msg("title.postlist");var J=this.currentFilter.filterOwner;var H=this.currentFilter.filterId;var L=this.currentFilter.filterData;if(J=="Alfresco.BlogPostListFilter"){if(H=="all"){M=this._msg("title.allposts")}if(H=="new"){M=this._msg("title.newposts")}else{if(H=="mydrafts"){M=this._msg("title.mydrafts")}else{if(H=="mypublished"){M=this._msg("title.mypublished")}else{if(H=="publishedext"){M=this._msg("title.publishedext")}}}}}else{if(J=="Alfresco.BlogPostListTags"){M=this._msg("title.bytag",u(L))}else{if(J=="Alfresco.BlogPostListArchive"&&H=="bymonth"){var I=new Date(L.year,L.month,1);var N=Alfresco.util.formatDate(I,this._msg("date-format.monthYear"));M=this._msg("title.bymonth",N)}}}K.innerHTML=M},onBlogPostListRefresh:function j(I,H){this._updateBlogPostList()},_setBusy:function d(H){if(this.busy){return false}this.busy=true;this.widgets.busyMessage=Alfresco.util.PopupManager.displayMessage({text:H,spanClass:"wait",displayTime:0});return true},_releaseBusy:function D(){if(this.busy){if(this.widgets.busyMessage.destroyWithAnimationsStop!=undefined){this.widgets.busyMessage.destroyWithAnimationsStop()}else{this.widgets.busyMessage.destroy()}this.busy=false;return true}else{return false}},_msg:function p(H){return Alfresco.util.message.call(this,H,"Alfresco.BlogPostList",Array.prototype.slice.call(arguments).slice(1))},_setDefaultDataTableErrors:function w(H){var I=Alfresco.util.message;H.set("MSG_EMPTY",I("message.empty","Alfresco.BlogPostList"));H.set("MSG_ERROR",I("message.error","Alfresco.BlogPostList"))},_updateBlogPostList:function s(L){this._setDefaultDataTableErrors(this.widgets.dataTable);var H=function J(M,N,O){this.widgets.dataTable.onDataReturnInitializeTable.call(this.widgets.dataTable,M,N,O);this.updateListTitle()};var I=function K(N,O){if(O.status==401){window.location.reload(true)}else{try{var M=YAHOO.lang.JSON.parse(O.responseText);this.widgets.dataTable.set("MSG_ERROR",M.message);this.widgets.dataTable.showTableMessage(M.message,YAHOO.widget.DataTable.CLASS_ERROR);if(O.status==404){YAHOO.Bubbling.fire("deactivateAllControls")}}catch(P){this._setDefaultDataTableErrors(this.widgets.dataTable)}}};this.widgets.dataSource.sendRequest(this._buildBlogPostListParams(L||{}),{success:H,failure:I,scope:this})},_buildBlogPostListParams:function r(O){var I={contentLength:this.options.maxContentLength,fromDate:null,toDate:null,tag:null,page:this.widgets.paginator.getCurrentPage()||"1",pageSize:this.widgets.paginator.getRowsPerPage()};if(typeof O=="object"){I=YAHOO.lang.merge(I,O)}I.startIndex=(I.page-1)*I.pageSize;var Q=this.currentFilter.filterOwner;var J=this.currentFilter.filterId;var N=this.currentFilter.filterData;var H="";if(Q=="Alfresco.BlogPostListFilter"){if(J=="all"){H=""}if(J=="new"){H="/new"}else{if(J=="mydrafts"){H="/mydrafts"}else{if(J=="mypublished"){H="/mypublished"}else{if(J=="publishedext"){H="/publishedext"}}}}}else{if(Q=="Alfresco.TagFilter"){I.tag=encodeURIComponent(N)}else{if(Q=="Alfresco.BlogPostListArchive"&&J=="bymonth"){var M=new Date(N.year,N.month,1);var L=new Date(N.year,N.month+1,1);L=new Date(L.getTime()-1);I.fromDate=M.getTime();I.toDate=L.getTime()}}}var P="",K;for(K in I){if(I[K]!==null){P+="&"+K+"="+encodeURIComponent(I[K])}}if(P.length>0){P=P.substring(1)}return H+"?"+P}}})();