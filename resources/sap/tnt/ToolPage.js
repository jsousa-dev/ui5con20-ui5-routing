/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/Device","sap/ui/core/ResizeHandler","./ToolPageRenderer"],function(e,t,i,r,s){"use strict";var n=t.extend("sap.tnt.ToolPage",{metadata:{library:"sap.tnt",properties:{sideExpanded:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{header:{type:"sap.tnt.IToolHeader",multiple:false},sideContent:{type:"sap.tnt.SideNavigation",multiple:false},mainContents:{type:"sap.ui.core.Control",multiple:true,singularName:"mainContent"}},events:{}}});n.prototype.exit=function(){this._deregisterControl()};n.prototype.onBeforeRendering=function(){this._deregisterControl()};n.prototype.onAfterRendering=function(){this._ResizeHandler=r.register(this.getDomRef(),this._mediaQueryHandler.bind(this));this._updateLastMediaQuery()};n.prototype.toggleSideContentMode=function(){return this.setSideExpanded(!this.getSideExpanded())};n.prototype.setSideExpanded=function(e){this.setProperty("sideExpanded",e,true);var t=this.getSideContent();if(t){var r=i.system.phone?true:e;t.setExpanded(r)}else{return this}var s=this.getDomRef();if(!s){return this}if(e){s.querySelector(".sapTntToolPageContentWrapper").classList.remove("sapTntToolPageAsideCollapsed")}else{s.querySelector(".sapTntToolPageContentWrapper").classList.add("sapTntToolPageAsideCollapsed")}return this};n.prototype._deregisterControl=function(){if(this._ResizeHandler){r.deregister(this._ResizeHandler);this._ResizeHandler=null}};n.prototype._mediaQueryHandler=function(){var e=this.getSideContent();if(e===null){return}this._currentMediaQuery=this._getDeviceAsString();if(this._getLastMediaQuery()===this._currentMediaQuery){return}switch(this._currentMediaQuery){case"Combi":this.setSideExpanded(true);break;case"Tablet":this.setSideExpanded(false);break;case"Phone":this.setSideExpanded(false);e.setExpanded(true);break;default:this.setSideExpanded(true)}this._updateLastMediaQuery()};n.prototype._getLastMediaQuery=function(){return this._lastMediaQuery};n.prototype._updateLastMediaQuery=function(){this._lastMediaQuery=this._getDeviceAsString();return this};n.prototype._getDeviceAsString=function(){if(i.system.combi){return"Combi"}if(i.system.phone){return"Phone"}if(i.system.tablet){return"Tablet"}return"Desktop"};return n},true);