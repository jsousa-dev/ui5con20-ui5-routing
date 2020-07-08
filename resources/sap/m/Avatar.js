/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/IconPool","./AvatarRenderer","sap/ui/events/KeyCodes","sap/base/Log","sap/ui/core/Icon","./library"],function(e,t,a,i,o,r,s){"use strict";var n=s.AvatarType;var p=s.AvatarImageFitType;var l=s.AvatarColor;var u=s.AvatarSize;var c=s.AvatarShape;var h=Object.keys(l).filter(function(e){return e.indexOf("Accent")!==-1});var g=e.extend("sap.m.Avatar",{metadata:{library:"sap.m",properties:{src:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},initials:{type:"string",group:"Data",defaultValue:null},displayShape:{type:"sap.m.AvatarShape",group:"Appearance",defaultValue:c.Circle},displaySize:{type:"sap.m.AvatarSize",group:"Appearance",defaultValue:u.S},customDisplaySize:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"3rem"},customFontSize:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"1.125rem"},imageFitType:{type:"sap.m.AvatarImageFitType",group:"Appearance",defaultValue:p.Cover},fallbackIcon:{type:"string",group:"Data",defaultValue:null},backgroundColor:{type:"sap.m.AvatarColor",group:"Appearance",defaultValue:l.Accent6},showBorder:{type:"boolean",group:"Appearance",defaultValue:false},badgeIcon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},badgeTooltip:{type:"string",group:"Data",defaultValue:null}},aggregations:{detailBox:{type:"sap.m.LightBox",multiple:false,bindable:"bindable"},_badge:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{}},dnd:{draggable:true,droppable:false},designtime:"sap/m/designtime/Avatar.designtime"}});g.DEFAULT_CIRCLE_PLACEHOLDER="sap-icon://person-placeholder";g.DEFAULT_SQUARE_PLACEHOLDER="sap-icon://product";g.AVATAR_BADGE_TOOLTIP={"sap-icon://zoom-in":sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("AVATAR_TOOLTIP_ZOOMIN"),"sap-icon://camera":sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("AVATAR_TOOLTIP_CAMERA"),"sap-icon://edit":sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("AVATAR_TOOLTIP_EDIT")};g.prototype.init=function(){this._sActualType=null;this._bIsDefaultIcon=true;this._sImageFallbackType=null;this._sPickedRandomColor=null;this._badgeRef=null};g.prototype.exit=function(){if(this._icon){this._icon.destroy()}if(this._fnLightBoxOpen){this._fnLightBoxOpen=null}if(this._badgeRef){this._badgeRef.destroy()}this._sPickedRandomColor=null};g.prototype.setDetailBox=function(e){var t=this.getDetailBox();if(e){if(e===t){return this}if(t){this.detachPress(this._fnLightBoxOpen,t)}this._fnLightBoxOpen=e.open;this.attachPress(this._fnLightBoxOpen,e)}else if(this._fnLightBoxOpen){this.detachPress(this._fnLightBoxOpen,t);this._fnLightBoxOpen=null}return this.setAggregation("detailBox",e)};g.prototype.clone=function(){var t=e.prototype.clone.apply(this,arguments),a=t.getDetailBox();if(a){t.detachPress(this._fnLightBoxOpen,this.getDetailBox());t._fnLightBoxOpen=a.open;t.attachPress(t._fnLightBoxOpen,a)}return t};g.prototype.attachPress=function(){Array.prototype.unshift.apply(arguments,["press"]);e.prototype.attachEvent.apply(this,arguments);if(this.hasListeners("press")){this.$().attr("tabindex","0");this.$().attr("role","button")}return this};g.prototype.detachPress=function(){Array.prototype.unshift.apply(arguments,["press"]);e.prototype.detachEvent.apply(this,arguments);if(!this.hasListeners("press")){this.$().removeAttr("tabindex");this.$().attr("role","img")}return this};g.prototype.ontap=function(){this.firePress({})};g.prototype.onkeydown=function(e){if(e.which===i.SHIFT||e.which===i.ESCAPE){this._bShouldInterupt=this._bSpacePressed}if(e.which===i.SPACE){this._bSpacePressed=true;e.preventDefault()}if(e.which===i.ENTER){this.firePress({})}};g.prototype.onkeyup=function(e){if(e.which===i.SPACE){if(!this._bShouldInterupt){this.firePress({})}this._bShouldInterupt=false;this._bSpacePressed=false;e.stopPropagation()}};g.prototype._areInitialsValid=function(e){var t=/^[a-zA-Z]{1,2}$/;if(!t.test(e)){o.warning("Initials should consist of only 1 or 2 latin letters",this);this._sActualType=n.Icon;this._bIsDefaultIcon=true;return false}return true};g.prototype._validateSrc=function(e){if(t.isIconURI(e)){this._sActualType=n.Icon;this._bIsDefaultIcon=t.getIconInfo(e)?false:true}else{this._bIsDefaultIcon=true;this._sActualType=n.Image;this.preloadedImage=new window.Image;this.preloadedImage.src=e;this.preloadedImage.onload=this._onImageLoad.bind(this);this.preloadedImage.onerror=this._onImageError.bind(this)}return this};g.prototype._getDisplayIcon=function(e){return t.isIconURI(e)&&t.getIconInfo(e)?t.createControlByURI({src:e}):null};g.prototype._getActualDisplayType=function(){var e=this.getSrc(),t=this.getInitials();if(e){this._validateSrc(e)}else if(t&&this._areInitialsValid(t)){this._sActualType=n.Initials}else{o.warning("No src and initials were provided",this);this._sActualType=n.Icon;this._bIsDefaultIcon=true}return this._sActualType};g.prototype._getImageFallbackType=function(){var e=this.getInitials();this._sImageFallbackType=e&&this._areInitialsValid(e)?n.Initials:n.Icon;return this._sImageFallbackType};g.prototype._getDefaultIconPath=function(e){var a=null,i=this.getFallbackIcon();if(i&&t.isIconURI(i)){a=i}else if(e===c.Circle){a=g.DEFAULT_CIRCLE_PLACEHOLDER}else if(e===c.Square){a=g.DEFAULT_SQUARE_PLACEHOLDER}return a};g.prototype._getIcon=function(){var e=this.getSrc(),a=this.getDisplayShape();if(this._bIsDefaultIcon){e=this._getDefaultIconPath(a)}if(!this._icon){this._icon=t.createControlByURI({alt:"Image placeholder",src:e})}else if(this._icon.getSrc()!==e){this._icon.setSrc(e)}return this._icon};g.prototype._getDefaultTooltip=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("AVATAR_TOOLTIP")};g.prototype._getBadgeIconSource=function(){var e;if(this.getDetailBox()){e="sap-icon://zoom-in"}else if(this.getBadgeIcon()!==""){if(this._getDisplayIcon(this.getBadgeIcon())){e=this.getBadgeIcon()}else{o.warning("No valid Icon URI source for badge affordance was provided")}}return e};g.prototype._getBadgeTooltip=function(){var e=this._getDefaultTooltip(),t=this.getBadgeIcon();if(this.getBadgeTooltip()){e=this.getBadgeTooltip()}else if(t&&g.AVATAR_BADGE_TOOLTIP[this.getBadgeIcon()]){e=g.AVATAR_BADGE_TOOLTIP[t]}return e};g.prototype._getBadge=function(){var e=this._getBadgeIconSource(),t=this._getBadgeTooltip();if(!e){return}if(!this._badgeRef){this.setAggregation("_badge",new r({src:e,tooltip:t}))}this._badgeRef=this.getAggregation("_badge");return this._badgeRef};g.prototype._onImageLoad=function(){delete this.preloadedImage};g.prototype._onImageError=function(){var e=this._getImageFallbackType();this.$().removeClass("sapFAvatarImage").addClass("sapFAvatar"+e);delete this.preloadedImage};g.prototype._getActualBackgroundColor=function(){var e=this.getBackgroundColor();if(e===l.Random){if(this._sPickedRandomColor){return this._sPickedRandomColor}e=this._sPickedRandomColor=l[h[h.length*Math.random()<<0]]}else{this._sPickedRandomColor=null}return e};return g});