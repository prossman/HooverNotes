/*
 * HooverNotes Jetpack  
 *
 * Developed by Marc Pous and Philipp Rossmanith 
 * for the Mozilla Jetpack for Learning Design Challenge 
 * http://design-challenge.mozillalabs.com/jetpack-for-learning/
 * 
 * For more information about our concept and future development, please visit:
 * http://blog.hoovernotes.org
 *
 * License: Mozilla Public License 1.1 (MPL 1.1) 
 * See http://www.opensource.org/licenses/mozilla1.1.php
 */

//IMPORTS
with (jetpack.future) {
  import("slideBar");
  import("selection");
  import("storage.simple");
  import("menu");
}


//CONSTANTS
/* Note types. */
var HIGHLIGHTED_NOTE = "HIGHLIGHTED_NOTE";
var MOVED_NOTE = "MOVED_NOTE";
var ANNOTATED_NOTE = "ANNOTATED_NOTE";

// PROGRAM CONTROL
var SLIDEBAR_WIDTH = 800;
var IMGBASE_URL = "http://hoovernotes.org/HN/img/";
var PAGEANNOTATION_ORIGINALHTML = "<!--Write your page annotation here-->";

// IDs.
var _ID_STRING="_sh_sheetguid_p_pageguid_n_noteguid";
/** Used for constructing IDs. */
var SHEETGUID_PRE = "_sh_";
var PAGEGUID_PRE = "_p_"; 
var NOTEGUID_PRE = "_n_";

/** Pattern used for matching a sheet's GUID. */
var SHEETGUID_SUB = /sheetguid/g;
/** Pattern used for matching a page's GUID. */
var PAGEGUID_SUB = /pageguid/g;
/** Pattern used for matching a note's GUID. */
var NOTEGUID_SUB = /noteguid/g;
/** Pattern used for matching a title. */
var TITLE_SUB = "subtitle";
/** Pattern used for matching a page's URL.*/
var PAGEURL_SUB = "pageurl";
/** Pattern used for matching a note's initial value. */
var NOTEINITIALVALUE_SUB = /initialvalue/g;

/** Container ID. A container corresponds to a level in the hierarchy, such as
 * a HooverSheet, HooverPage or HooverNote.*/
var HNCONTAINER_ = "hncontainer";
/** Content ID. Content is embedded within a container and encapsulates the 
 * actual content.*/
var HNCONTENT_ = "hncontent";
/** The menus and buttons for a container should be contained within the 
 * corresponding controls .*/
var HNCONTROLS_ = "hncontrols";

/** ID prefix for button for minimizing.*/
var MINIMIZE_BUTTON_ = "minimizeHnButton";
/** ID prefix for button for maximizing.*/
var MAXIMIZE_BUTTON_ = "maximizeHnButton";
/** ID prefix for button for removing.*/
var REMOVE_BUTTON_ = "removeHnButton";
/** ID prefix for button for maximizing.*/
var EDIT_BUTTON_ = "editHnButton";
/** ID prefix for text area for editing notes. */
var EDITOR_ = "editor";

/** Maximum number of characters to appear in the page title. */
var CHARPAGETITLE_MAX = 42;
/** Length of the GUIDs in use. */
var GUID_LENGTH = 36;
/** Relative URL for logo for annotation notes. */
var ANNOTATE_LOGO = "img/write_mini.png";
/** Relative URL for logo for move notes. */
var MOVE_LOGO = "img/drag_mini.png";
/** Relative URL for logo for annotation notes. */
var HIGHLIGHT_LOGO = "img/marker_mini.png";
var NOTELOGO_SUB = "note_logo";

var NOTE_BUTTONS="note_buttons";
//var NOTE_CONTAINER_="note_container_sh_sheetguid_p_pageguid_n_noteguid";
//var PAGENOTE_CONTAINER_="pageNote_container_sh_sheetguid_p_pageguid";
var PAGETITLE="pageTitle";
//var PAGE_CONTAINER_GUID="page_container_guid";
var SHEETCONTAINER_BUTTONS="sheetContainer_buttons";
//var GUI_CONTENT="sheets_container";
var GUI_CONTENT ="hncontent";
//var SHEETTITLE="sheetTitle";
var SHEETTITLE = "hntitle";

/** Button ID for synchronizing data. */
var SYNCHRONIZE_BUTTON_="synchronizeHnButton";
/** Button ID for creating a new annotated HooverNote. */
var ANNOTATE_BUTTON="newhoovernoteHnButton";
/** Button ID for creating a new moved HooverNote. */
var MOVE_BUTTON = "dragHnButton";
/** Button ID for creating a new moved HooverNote. */
var HIGHLIGHT_BUTTON = "markerHnButton";
/** Button ID for creating a new moved HooverNote. */
var TAG_BUTTON = "tagHnButton";
/** Button ID for new new HooverSheet. */
var NEWHOOVERSHEET_BUTTON="newhooversheetHnButton";
/** Button ID for confirming the title of a new HooverSheet. */
var NEWSHEETDEF_BUTTON="newSheetDef_button";

/** Button ID for turning on/off HooverNotes visibility in main tab. */
var EYE_BUTTON_="toggleviewHnButton";
/** Button ID for choosing sheet color. Currently unsupported. */
var COLORSHEET_BUTTON = "colorsheetHnButton";
/** Button ID for getting help. Currently unsupported. */
var HELP_BUTTON = "helpHnButton";

/** Input for defining sheet titles. */
var NEWSHEETDEFTITLE_INPUT = "newSheetDefTitle_input";
/** Name of the container for  new sheet definition. */
var NEWSHEETDEF_CONTAINER = "newSheetDef_container";



// HTML
// Used for injecting HTML by substituting its placeholders.
/** HTML for the overall GUI. */
var SLIDE_HTML="<html><head><title>HooverNotes SlideBar</title><link href='http://hoovernotes.org/CSS/hoover.css' rel='stylesheet' type='text/css' /></head><body><div id='hooverNotesSlide_container' class='hooverNotesSlide_container'><div id='menu_container' class='menu_container'><div id='user_container' class='user_container'><div id='user_image' class='user_image'><img src='http://a1.twimg.com/profile_images/53241754/Marc_bigger.JPG' width='34px' alt='Your picture!' title='Your picture!' /></div><div id='user_name' class='user_name'>YOUR NAME</div></div><div id='menuContainer_buttons' class='button menuContainer_buttons'><div><img src='http://hoovernotes.org/IMG/new_sheet.png' id='newHooverSheet_button' alt='Create a new Sheet' title='Create a new Sheet' /></div></div></div><div id='hncontent' class='container sheets_container'></div></div></body></html>";
var FIREBUG_HTML = "<script><![CDATA[var firebug=document.createElement('script');firebug.setAttribute('src','http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js');document.body.appendChild(firebug);(function(){if(window.firebug.version){firebug.init();}else{setTimeout(arguments.callee);}})();void(firebug);]]></script>";
/** HTML for tags container */
var TAG_HTML="<div id='newTag_container' class='newTag_container'><input type='text' id='newTag_input' value='tag3' /><button id='newTag_button'>C</button><br /><span id='tag'>tag1</span>, <span id='tag'>tag2</span></div>";
/** HTML showing an input and controls for creating a new Sheet. */
var NEWSHEETDEF_HTML="<div id='newSheetDef_container' class='newSheetDef_container'><input type='text' id='newSheetDefTitle_input' value='Untitled' /><div id='newSheetDef_controls' class='newSheetDef_controls'><img src='img/confirmar_but.png' id='newSheetDef_button' title='Create the Sheet' alt='Create the Sheet' /><img src='img/borrar.png' id='removeHnButton_sh_sheetguid' class='removeSheetButton' alt='Remove the Sheet' title='Remove the Sheet' /></div><div id='newSheet_down'><img src='img/sombra_new_sheet.png' /></div></div>";
/** HTML for creating a new sheet container. */
var SHEETCONTAINER_HTML="<div id='hncontainer_sh_sheetguid'class='hncontainer sheet_container'><div id='sheetHeader' class='sheetHeader'><div id='hntitle_sh_sheetguid' class='sheetTitle lucida_bold'>subtitle</div><div id='sheetTitleButtons_sheetguid' class='button min_max_rem_buttons'><img src='img/minimize.png' id='minimizeHnButton_sh_sheetguid' class='minimizeHnButton hnbutton button' alt='Minimize Sheet' title='Minimize Sheet' /><img style='display:none' src='img/expand.png' id='maximizeHnButton_sh_sheetguid' class='expandHnButton hnbutton button' alt='Expand Sheet' title='Expand Sheet' /><img src='img/borrar.png' id='removeHnButton_sh_sheetguid' class='removeHnButton hnbutton button' alt='Remove Sheet' title='Remove Sheet' /></div><div id='separador'><img src='img/separador.png'></div></div><div id='hncontent_sh_sheetguid' class='hncontent sheet_hncontent' ></div></div>";
// With text area:
// <div id='hncontainer_sh_sheetguid' class='hncontainer sheet_container'><div id='sheetHeader' class='sheetHeader'><div id='hntitle_sh_sheetguid' class='sheetTitle lucida_bold'><textarea id='editor_sh_sheetguid' class='editor_sheet' name='editor' readonly='readonly'>subtitle</textarea></div><div id='sheetTitleButtons_sheetguid' class='button min_max_rem_buttons'><imgsrc='img/minimize.png' id='minimizeHnButton_sh_sheetguid'class='minimizeHnButton hnbutton button' alt='Minimize Sheet'title='Minimize Sheet' /><img style='display: none'src='img/expand.png' id='maximizeHnButton_sh_sheetguid'class='expandHnButton hnbutton button' alt='Expand Sheet'title='Expand Sheet' /><img src='img/borrar.png'id='removeHnButton_sh_sheetguid' class='removeHnButton hnbutton button'alt='Remove Sheet' title='Remove Sheet' /></div><div id='separador'><img src='img/separador.png'></div></div><div id='hncontent_sh_sheetguid' class='hncontent sheet_hncontent'></div></div>
/** HTML for creating a new page container. */
var PAGE_HTML="<div id='hncontainer_sh_sheetguid_p_pageguid' class='hncontainer page_hncontainer page_container'><div id='hncontrols_sh_sheetguid_p_pageguid' class='page_hncontrols hncontrols'><div id='hntitle_sh_sheetguid_p_pageguid' class='page_hntitle pageTitle'><a href='pageurl' target='_blank' class='pageTitle_link' alt='Open page in new tab'>subtitle</a></div><div id='hnbuttons_sh_sheetguid_p_pageguid' class='page_hnbuttons buttons min_max_rem_buttons'><img src='img/minimize.png' id='minimizeHnButton_sh_sheetguid_p_pageguid' class='button minimizePage_button' alt='Minimize the page s annotations' title='Minimize the page s annotations' /><img style='display:none' src='img/expand.png' id='maximizeHnButton_sh_sheetguid_p_pageguid' class='button openURLatTab_button' alt='Maximize the page s annotation' title='Maximize the page s annotations' /><img src='img/borrar.png' id='removeHnButton_sh_sheetguid_p_pageguid' class='button removePage_button' alt='Remove the page s annotations' title='Remove the page s annotations' /></div></div><div id='hncontent_sh_sheetguid_p_pageguid' class='page_hncontent hncontent'></div></div>";
/** Common HTML for all notes. The notes content receives the actual 
 * type-dependent content. */
var NOTE_HTML="<div id='hncontainer_sh_sheetguid_p_pageguid_n_noteguid'><div id='note_controls' class='note_controls'><table class='note_buttons'><tr class='note_controls_column'><td class='note_controls_type'><img src='note_logo' id='note_controls_type'></td></tr><tr class='note_controls_column'><td class='note_controls_void'></td></tr><tr class='note_controls_column'><td class='note_controls_void'></td></tr><tr class='note_controls_column'><td id='note_controls_edit'><img src='img/edit.png' id='editHnButton_sh_sheetguid_p_pageguid_n_noteguid' class='button editNote_button' alt='Edit the annotation' title='Edit the annotation' /></td></tr><tr class='note_controls_column'><td id='note_controls_link'><img src='img/link.png' id='linkHnButton_sh_sheetguid_p_pageguid_n_noteguid' class='button linkNotePage_button' alt='Visualize the annotations into the URL context' title='Visualize the annotations into the URL context' /></td></tr><tr class='note_controls_column'><td id='note_controls_remove'><img src='img/eliminar.png' id='removeHnButton_sh_sheetguid_p_pageguid_n_noteguid' class='button removeNote_button' alt='Remove the annotation' title='Remove the annotation' /></td></tr></table></div><div id='hncontent_sh_sheetguid_p_pageguid_n_noteguid' class='annotateNoteContent'></div><div id='page_down'><img src='img/sombra_new_sheet.png'/></div></div>";
/** HTML for the actual content of a moved note. */
var MOVENOTE_HTML="<div class='note_hncontent' id='note_hncontent_sh_sheetguid_p_pageguid_n_noteguid'>initialvalue</div>";
var HIGHLIGHTNOTE_HTML="<div class='note_hncontent' id='note_hncontent_sh_sheetguid_p_pageguid_n_noteguid'>initialvalue</div>";
var ANNOTATENOTE_HTML="<div class='note_hncontent' id='note_hncontent_sh_sheetguid_p_pageguid_n_noteguid'><textarea id='editor_sh_sheetguid_p_pageguid_n_noteguid' class='textarea_note' name='editor'>initialvalue</textarea><br /></div>";

/**
 * Encapsulates different utility functions.
 */
var Utils = new function (){
  var me = this;
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  this.guid = function (){
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  };
  
  this.log = function(level, message){
    if (level == 1){
      console.log(message);
    }
    
    if (level == 2){
      console.log(message);
      jetpack.notifications.show(message);
    }
    
    if (level == 3){
      console.error(message);
    }
    
    if (level == 4){
      console.error(message);
      jetpack.notifications.show(message);
    }
    
    if (level == 5){
      jetpack.notifications.show(message);
    }
  };

  this.replaceIds = function (setSheetId, setPageId, setNoteId, rawId){
    var str;
    if (rawId){
      if (setSheetId && hnCtrl.getActiveSheet()){
        str = rawId.replace(/sheetguid/g, hnCtrl.getActiveSheet().guid);
      }
      if (setPageId && hnCtrl.activePage){
        str = str.replace(/pageguid/g, hnCtrl.activePage.pageGuid);
      }
      if (setNoteId && hnCtrl.activeNote){
        str = str.replace(/noteguid/g, hnCtrl.activeNote.noteGuid);
      }
    } else {
      return null;
    }
    return str;
  };
  
  this.getCurrentPageURL = function(){
    return jetpack.tabs.focused.contentWindow.location.href;
  };
  this.getCurrentPageTitle = function(){
    return jetpack.tabs.focused.contentWindow.document.title;
  };
  this.getCurrentPageHTML = function (){
    return jetpack.tabs.focused.contentDocument.html;
  };
  
  /**
   * Use this function for strings which contains several ID strings.
   */
  this.replaceIDsInHTMLStr = function (sheetId, pageId, noteId, htmlStr){
    var str;
    if (htmlStr){
      if (sheetId){
        str = htmlStr.replace(SHEETGUID_SUB, sheetId);
      }
      if (noteId){
        str = str.replace(NOTEGUID_SUB, noteId);
      }
      if (pageId){
        str = str.replace(PAGEGUID_SUB, pageId);
        
      }
      
    } else {
      return null;
    }
    Utils.log(0, "replaceIDs: returns " + str);
    return str;
  };
  
  /**
   * Constructs an ID from a prefix and corresponding values.
   */
  this.assembleID = function (sheetId, pageId, noteId, idPrefix){
    var completeId = idPrefix;
    if (sheetId){
      completeId += SHEETGUID_PRE + sheetId;
      if (pageId){
        completeId += PAGEGUID_PRE + pageId;
        if (noteId){
          completeId += NOTEGUID_PRE + noteId;
        }   
      }
    }
    return completeId;
  };

  /**
   * 
   */
  this.extractId = function (idString, idName){
    var retVal = null;
    var startPos = -1;
    if (idName) {
      startPos = idString.indexOf(idName);
      if (startPos > -1){
        retVal = idString.substr(startPos + idName.length, GUID_LENGTH);
        Utils.log(1, "extractId: " + idName + " > " + retVal);
//        return retVal;
      }
    } else {
      startPos = idString.indexOf(SHEETGUID_PRE);
      if (startPos > -1){
        retVal = idString.substr(startPos);
        Utils.log(1, "extractId: > " + retVal);
      }
    }
    return retVal;
  };

  this.stripHtmlString = function (htmlString){
    // Should remove: style, input, button, forms, script (?)
    // TODO
  };
  
  this.loadLib = function (document, libUrl){
    Utils.log(1, "Loading " + libUrl);
    jetpack.notifications.show("Loading " + libUrl);
    var script = document.createElementNS("http://www.w3.org/1999/xhtml", "script");
    script.src = libUrl;
    $(script).bind("load", function() {
      Utils.log(1, libUrl + " injected");
    });
    document.getElementsByTagName("head")[0].appendChild(script);
    Utils.log(0, "Loaded " + libUrl);
  };
}();

//DATATYPES
/**
 * HooverSheet. Top-most container.
 */
function HooverSheet(title, user, language, shared, editable) {
  var me = this;
  this.title = title;
  this.owner = user;
  this.creationTime = new Date();
  this.lastModifiedTime = new Date();
  if (!language) {
    this.language = "en";
  } else {
    this.language = language;
  }
  this.guid = Utils.guid();
  this.shared = shared;
  this.editable = editable;
  this.pages = new Array();

  /**
   * Returns a <code>HooverPage</code> for the given URL.
   * 
   * If such a <code>HooverPage</code> doesn't exist yet, it is created.
   */
  this.getHooverPageForUrl = function (url, urlTitle){
    if (me.pages && (me.pages.length > 0)){
      Utils.log(2, "HooverSheet.getHooverPageForUrl() with " + url 
        + ", currently " + me.pages.length + " me.pages.");
//      for (var p in me.pages){
      for (var i = 0; i < me.pages.length; ++i){
        if (me.pages[i]){
          if (me.pages[i].pageUrl == url){
            // TODO remove; should not be used anymore
            hnCtrl.activePage = me.pages[i];
            Utils.log(1, "HooverSheet.getHooverPageForUrl: URL " + url + " found");
            return me.pages[i];
          }
        } 
      }
    } else {
      Utils.log(1, "HooverSheet.getHooverPageForUrl() with " + url
        + ", currently no pages.");
    } 
    Utils.log(1, "HooverSheet.getHooverPageForUrl(): no match found for " + url);
    return null;
  };
  
  this.addHooverPage = function (page, position){
    Utils.log(1, "ctrl.addHoverPage: adding " + page.pageUrl + " at " + position);
    if (!me.pages){
      me.pages = new Array();
      Utils.log(1, "sheet.addHooverPage: creating page array, length " + me.pages.length);
    }
    if (position){
      me.pages.splice(position, 0, page);
    } else {
      Utils.log(1, "sheet.addHooverPage: Pushing " + page.pageUrl);
      me.pages.push(page);
    }
    return page;
  };
  
  function findPageById(pageId){
    if (me.pages && (me.pages.length > 0)){
      for (var i = 0; i < me.pages.length; ++i){
        if (me.pages[i]){
          if (me.pages[i].pageGuid == pageId){
            Utils.log(1, "HooverSheet.getHooverPageForUrl: " + pageId + " found");
            return i;
          }
        }
      }
    } else {
      Utils.log(1, "HooverSheet.getHooverPageForUrl() with " + pageId
        + ", currently no me.pages.");
    } 
    Utils.log(1, "HooverSheet.getHooverPageForUrl(): no match found for " + pageId);
    return -1;
  };
  
  this.removePageById = function(pageId){
    var index = findPageById(pageId);
    if (index > -1){
      me.pages.splice(index, 1);
      return true;
    }
    Utils.log(1, "Page " + pageId + " couldn't be removed.");
    return false;
  };
  
  this.removeNoteById = function (pageId, noteId){
    var ind = findPageById(pageId);
    if (ind > 0){
      return me.pages[ind].removeNoteById(noteId);
    } else {
      return false;
    }
  };
  
  /**
   * Returns all notes within this sheet.
   */
  this.getAllNotes = function(){
    if (me.pages && (me.pages.length > 0)){
      var notesArray = new Array();
      Utils.log(0, "sheet.getAllNotes: concatenating notes");
      for (var i = 0; i < me.pages.length; ++i){
        // Each page should at least contain one note and hence an array.
        notesArray = notesArray.concat(me.pages[i].noteArray);
      }
      return notesArray;
    } else {
      Utils.log(0, "sheet.getAllNotes: No pages");
      return null;
    }
  };
  
  this.getPages = function (){
    return me.pages;
  };
}

/* HooverNote */
function HooverNote(user, originalHtml, isHighlighted, color, annotation) {
  var me = this;
  this.noteAuthor = user;
  this.noteCreationTime = new Date();
  this.noteLastModifiedTime = new Date();
  this.noteOriginalHtml = originalHtml;
  this.noteIsHighlighted = isHighlighted;
  this.noteColor = color;
  this.noteAnnotation = annotation;
  this.noteGuid = Utils.guid();

  this.getType = function(){
    if (this.noteAnnotation){
      return ANNOTATED_NOTE;
    } else {
      if (this.noteIsHighlighted && this.noteColor){
        return HIGHLIGHTED_NOTE;
      } else {
        return MOVED_NOTE;
      }
    }
  };
}

/* HooverPage */
function HooverPage(pageUrl, pageTitle, pageHtml){
  var me = this;
  this.pageTitle = pageTitle;
  this.pageHtml = pageHtml;
  this.pageUrl = pageUrl;
  this.pageGuid = Utils.guid();
  this.noteArray;
  
  this.pageUrls = new Array();

  /**
   * Adds a note for this page at given position.
   * If position is not supplied, the note is added to the end.
   */
  this.addHooverNote = function(note, position){
    if (!me.noteArray){
      me.noteArray = new Array();
    }
    if (position){
      me.noteArray.splice(position, 0, note);
    } else {
      me.noteArray.push(note);
    } 
    return note;
  };
  /**
   * Returns the HooverNote for this ID or null if not yet available.
   */
  this.getHooverNoteForID = function (noteID){
    if (!me.noteArray || (me.noteArray.length == 0)){
      return null;
    } else {
      var ind;
      for (ind in me.noteArray){
        if (me.noteArray[ind].noteGuid == noteID){
          return me.noteArray[ind];
        }
      } 
      return null;
    }
  }
  
  function findNoteById (noteId){
    if (me.noteArray && (me.noteArray.length > 0)){
      for (var i = 0; i < me.noteArray.length; ++i){
        if (me.noteArray[i]){
          if (me.noteArray[i].pageGuid == noteId){
            Utils.log(1, "HooverPage.findNoteById: " + noteId + " found");
            return i;
          }
        }
      }
    } else {
      Utils.log(1, "HooverPage.findNoteById: " + noteId
        + ", currently no me.noteArray.");
    } 
    Utils.log(1, "HooverPage.findNoteById: no match found for " + noteId);
    return -1;
  };
  
  this.removeNoteById = function(noteId){
    var index = findNoteById(noteId);
    if (index > -1){
      me.noteArray.splice(index, 1);
      return true;
    }
    Utils.log(1, "Note " + noteId + " couldn't be removed.");
    return false;
  };
}

/* User */
function User (userName, credential, imgURL){
  var me = this;
  this.userName = userName;
  this.credential = credential;
  this.imgURL = imgURL;
  this.logged = false;
}

function HooverNotesView(slideBar){
  var me = this;
  me.slideBar = slideBar;
  me.control = null;
  var definingSheet = false;
  var selectedText = null;
  var selectedHtml = null;

  this.minimize = function (idString){
    Utils.log(1, "View.minimize() " + idString);

    // for the moment: pageNote_container
    var idSubStr = Utils.extractId(idString, null);
    var contentId = HNCONTENT_ + idSubStr;
    Utils.log(0, "Minimizing container ID: " + contentId);
    // Hide both content and corresponding button.
    hide(contentId);
    hide(idString);
    
    // make sure maximize button is shown
    var maxButtonId = MAXIMIZE_BUTTON_ + idSubStr;
    var isVisible = $("#" + maxButtonId, me.slideBar.contentDocument).is(":visible");
    if (!isVisible){
      show(maxButtonId);
    }
  };

  this.maximize = function (idString){
    Utils.log(1, "View.maximize() " + idString);

    // for the moment: pageNote_container
    var idSubStr = Utils.extractId(idString, null);
    var contentId = HNCONTENT_ + idSubStr;
    Utils.log(0, "Maximizing container ID: " + contentId);
    // Hide both content and corresponding button.
    show(contentId);
    hide(idString);
    
    // make sure minimize button is shown
    var minButtonId = MINIMIZE_BUTTON_ + idSubStr;
    var isVisible = $("#" + minButtonId, me.slideBar.contentDocument).is(":visible");
    if (!isVisible){
      show(minButtonId);
    }
  };

  this.remove = function (idString, askConfirmation){
    Utils.log(0, "View.remove() " + idString);
    if (askConfirmation){
      // Ask for confirmation.
    }
    var idSubStr = Utils.extractId(idString, null);
    var containerId = HNCONTAINER_ + idSubStr;
    
    var sheetId = Utils.extractId(idString, SHEETGUID_PRE);
    var pageId = Utils.extractId(idString, PAGEGUID_PRE);
    var noteId = Utils.extractId(idString, NOTEGUID_PRE);
    
    me.control.remove(sheetId, pageId, noteId);
    Utils.log(1, "View.remove() " + containerId);
    $("#" + containerId, me.slideBar.contentDocument).empty();
    
  };

  function registerEvent (typeOfEvent, idStr, callback){
    if (me.slideBar){
      $("#" + idStr, me.slideBar.contentDocument).bind(typeOfEvent, callback);
    }
  };
  
  /**
   * Registers events for minimizing, maximizing and removing a blip.
   * 
   * @param sheetId
   *            Sheet GUID.
   * @param pageId
   *            Page GUID.
   * @param noteId
   *            Note GUID.
   * @returns
   */
  function registerMinMaxRemEvents(sheetId, pageId, noteId){
    // Register events for page buttons
    Utils.log(0, "view.registerMinMaxRemEvents: " + sheetId + "|" + pageId + "|" + noteId);
    var debugOut = "view.registerMinMaxRemEvents: min > ";
    var idStr = Utils.assembleID(sheetId, pageId, noteId, MINIMIZE_BUTTON_);
    debugOut += idStr + "\n";
    registerEvent("click", idStr, function(){
      Utils.log(0, "Minimizing " + this.id);
      me.minimize(this.id);
    });
    
    idStr = Utils.assembleID(sheetId, pageId, noteId, MAXIMIZE_BUTTON_);
    debugOut += ", max > " + idStr + "\n";
    registerEvent("click", idStr, function(){
      Utils.log(0, "Maximizing " + this.id);
      me.maximize(this.id);
    });
    idStr = Utils.assembleID(sheetId, pageId, noteId, REMOVE_BUTTON_);
    debugOut += ", rem > " + idStr;
    registerEvent("click", idStr, function(){
      Utils.log(1, "Removing " + this.id);
      me.remove(this.id);
    });
    Utils.log(0, debugOut);
  }
  
  function hide (idStr){
    Utils.log(0, "hiding " + idStr);
    $("#" + idStr, me.slideBar.contentDocument).hide();
  };
  
  function show (idStr){
    Utils.log(0, "showing " + idStr);
    $("#" + idStr, me.slideBar.contentDocument).show();
  };

  function appendElemToId (contentStr, idStr){
    var newElem = $(contentStr, me.slideBar.contentDocument);
    $("#" + idStr, me.slideBar.contentDocument).append(newElem);
  };
  
  function makeAnnotationEditable(idStr){
    var editorId;
    if (idStr.indexOf(EDITOR_) < 0){
      // idStr may also come from a button. Extract the ID and create a new string.
      editorId = EDITOR_ + Utils.extractId(idStr, null);
    } else {
      editorId = idStr;
    }
    Utils.log(1, "view.makeAnnotationEditable: " + editorId);
    $("#" + editorId, me.slideBar.contentDocument).removeAttr("readonly");
  };
  
  function saveAndDisableAnnotation (idStr){
    Utils.log(1, "view.saveAndDisableAnnotation: " + idStr);
    $("#" + idStr, me.slideBar.contentDocument).attr("readonly", "readonly");
  };
  
  this.setSelection = function(text, html){
    selectedText = text;
    selectedHtml = html;
  };
  
  function consumeSelectedText (){
    var text = selectedText;
    selectedText = null;
    return text;
  }
  function consumeSelectedHtml (){
    var html = selectedHtml;
    selectedHtml = null;
    return html;
  }

  /**
   * 
   */
  function isExisting (sheetId, pageId, noteId){
    var containerId = Utils.assembleID(sheetId, pageId, noteId, HNCONTAINER_);
    var pLength = $("#" + containerId, me.slideBar.contentDocument).length; 
    if (pLength == 0){
      return false;
    } else {
      return true;
    }
  }
  
  // SHOW functions
  // Show functions receive a basic data type (HooverSheet, HooverNote) and 
  // display it in the GUI.

  
  /**
   * Accepts a HooverSheet and updates the slide bar from it.
   * 
   * The topmost sheet is supposed to be the opened one.
   */
  this.showSheet = function(sheet){
    if (!sheet){
      updateGUIForNewSheet(null);
    } else {
      Utils.log(1, "view.showSheet: " + sheet.title);
      // TODO: check for existing sheet with the same name
//      if (!isExisting(sheet.sheetGuid)){
        var htmlString = SHEETCONTAINER_HTML.replace(SHEETGUID_SUB, sheet.guid);
        htmlString = htmlString.replace(TITLE_SUB, sheet.title);
        appendElemToId(htmlString, GUI_CONTENT);
        // Register events for the sheet-related buttons.
        //TODO move to init and out of container
        registerMinMaxRemEvents(sheet.guid, null, null);
//      }
      
      Utils.log(0, "view.showSheet: getting all notes from sheet");
      var notesArray = sheet.getAllNotes();
      
      if (notesArray){
        Utils.log(0, "view.showSheet: showing " + notesArray.length + " notes.");
        for (var i = 0; i < sheet.pages.length; ++i){
          var page = sheet.pages[i];
          if (page.noteArray){
            for (var j = 0; j < page.noteArray.length; ++j){ 
              me.showNote(sheet.guid, page.pageGuid, page.pageUrl, page.pageTitle, 
                page.noteArray[j], false, true);
            }
          }
        }
      } else {
        Utils.log(2, "view.showSheet: not showing any notes.");
      }
    }
  };
  
  /**
   * Injects a new note into the active sheet. Please note: a new note is <i>always</i>
   * added for the page currently in display. 
   */
  this.showNote = function (sheetId, pageId, pageUrl, pageTitle, note, getPageHtml, isNewPage){
    Utils.log(2, "view:showNote " + sheetId + "|" + pageId + "|" + note.noteGuid);
    
    // Look for the page container's content div. Create a blip for the note
    // and attach it as last child.
    if (isNewPage){
      ensurePageForFocusedTab(sheetId, pageId, pageUrl, pageTitle, isNewPage);
    }

    // If there is no blip yet, add it. Please note: 
    ensureNoteBlip(sheetId, pageId, note);

    // Find note blip and add the note's content.
    injectAndRegisterNote(sheetId, pageId, note);

    // Set the page's content, if not set yet.
    if (getPageHtml){
      var pageHtml = Utils.getCurrentPageHTML();
      Utils.log(0, pageHtml);
      return pageHtml;
    }
  };
  
  function injectAndRegisterNote(sheetId, pageId, note){
    Utils.log(0, "view.injectAndRegisterNote: " + note.getType());
    // 3) Inject type-specific content into note blip.
  
    // Look for noteContent_container.
    var idStr = Utils.assembleID(sheetId, pageId, note.noteGuid, HNCONTENT_);
    
    // Type-dependent injection
    var htmlStr;
    if (note.getType() == ANNOTATED_NOTE){
      Utils.log(1, "ANNOTATE");
      htmlStr = Utils.replaceIDsInHTMLStr(sheetId, pageId, note.noteGuid, ANNOTATENOTE_HTML);
    } else {
      if (note.getType() == MOVED_NOTE){
        Utils.log(1, "MOVE");
        htmlStr = Utils.replaceIDsInHTMLStr(sheetId, pageId, note.noteGuid, MOVENOTE_HTML);
      } else {
        Utils.log(1, "HIGHLIGHT");
        htmlStr = Utils.replaceIDsInHTMLStr(sheetId, pageId, note.noteGuid, HIGHLIGHTNOTE_HTML);
        // Change the tab content so that it is highlighted.
        if (jetpack.selection.html){
          jetpack.selection.html = "<mark style='background:" + note.noteColor + "'>" + jetpack.selection.html + "</mark>";
          note.noteOriginalHtml = "<mark style='background:" + note.noteColor + "'>" + jetpack.selection.html + "</mark>";
        }
      }
    }
    htmlStr = htmlStr.replace(NOTEINITIALVALUE_SUB, note.noteOriginalHtml);
    Utils.log(0, "view.injectAndRegisterNote: injecting " + htmlStr + " to " + idStr);
    appendElemToId(htmlStr, idStr);
    // TODO: REGISTER ANNOTATE HANDLER FOR CLOSING EDITOR
    if (note.getType() == ANNOTATED_NOTE){
      idStr = Utils.assembleID(sheetId, pageId, note.noteGuid, EDITOR_);
      Utils.log(1, "view.ijectAndRegisterNote: registering annotation events for " + idStr);
      registerEvent("dblclick", idStr, function(){
        makeAnnotationEditable(this.id);
      });
      registerEvent("blur", idStr, function(){
        saveAndDisableAnnotation (this.id);
      });
      idStr = Utils.assembleID(sheetId, pageId, note.noteGuid, EDIT_BUTTON_);
      registerEvent("click", idStr, function(){
	    makeAnnotationEditable(this.id);
	  });
    }
  }
  
  
  
  // ENSURE functions
  // Ensure functions make sure that a certain GUI element that is needed for
  // further processing is present.
  
  /**
   * Paints a page container for the tab in focus, if not there yet.
   */
  function ensurePageForFocusedTab (sheetId, pageId, pageUrl, pageTitle, isCheckNewPage){
//    var url = Utils.getCurrentPageURL();
//    var urlTitle = Utils.getCurrentPageTitle();
    Utils.log(1, "view.ensurePageForFocusedTab: Ensuring page for " + pageUrl);
    // Get the HooverPage object for this URL.
    var pageIsExisting = isExisting(sheetId, pageId, null);
//    var pageContainerId = Utils.assembleID(sheetId, pageId, null, HNCONTAINER_);
//    var pLength = $("#" + pageContainerId, me.slideBar.contentDocument).length; 
//    if (pLength == 0){
//      pageIsNew = true;
//      Utils.log(2, "Page is new");
//    } else {
//      Utils.log(2, "Page is old");;
//    }
    
    var isNewPage = true;
    if (!isCheckNewPage){
      if (hnCtrl.hasPage(pageUrl, pageTitle)){
        // TODO Focus on container for page.
        Utils.log(1, "view.ensurePageForFocusedTab: page exists already");
        isNewPage = false;
      }  
    } 
    if (!pageIsExisting) {
      // Paint container for page.
      Utils.log(1, "view.ensurePageForFocusedTab: Creating page HTML for " + pageUrl);
      var htmlString = Utils.replaceIDsInHTMLStr(sheetId, pageId, null, PAGE_HTML);
      var shortPageTitle= pageTitle.substr(0, CHARPAGETITLE_MAX);
      if (shortPageTitle.length < pageTitle.length){
        shortPageTitle += "...";
      }

      htmlString = htmlString.replace(TITLE_SUB, shortPageTitle);
      htmlString = htmlString.replace(PAGEURL_SUB, pageUrl);
      var idStr = Utils.assembleID(sheetId, null, null, HNCONTENT_);
      appendElemToId (htmlString, idStr);
      registerMinMaxRemEvents(sheetId, pageId, null);
    }
  }
  
  /**
   * Creates a div corresponding to the new note and appends it to the slide bar.
   * 
   * @returns
   */
  function ensureNoteBlip (sheetId, pageId, note){
    Utils.log(0, "ensureNoteBlip: " + note.noteGuid + ", type " + note.getType());
    var htmlString = Utils.replaceIDsInHTMLStr(sheetId, pageId, note.noteGuid, NOTE_HTML);
    var imgStr = MOVE_LOGO;
    if (note.getType() == ANNOTATED_NOTE){
      imgStr = ANNOTATE_LOGO;
    } else {
      if (note.getType() == HIGHLIGHTED_NOTE){
        imgStr = HIGHLIGHT_LOGO;
      }
    }
    htmlString = htmlString.replace(NOTELOGO_SUB, imgStr);
    var idStr = Utils.assembleID(sheetId, pageId, null, HNCONTENT_);
    appendElemToId(htmlString, idStr);
    // Register common events.
    registerMinMaxRemEvents(sheetId, pageId, note.noteGuid);
  }
  
  // UPDATE functions
  // Update functions update existing GUI elements with new data.
  /**
   * Updates user information.
   */
  this.updateUser = function(user){
    Utils.log(1, "view:updateUser");
  };
  
  /**
   * Updates the slide bar for a new note without original text.
   * @param alertMessage
   *      Can be used to deliver a message to the user.
   * @return
   */
  var updateGUIForNewNote = function (alertMessage, originalHtml, isHighlighted, color, annotation) {
    // Get URL and URL title from tab.
    Utils.log(1, "view:updateGUIForNewNote: " + alertMessage);
    if (alertMessage){
      jetpack.notifications.show(alertMessage);
    }

    // Look for the page container's content div. Create a blip for the note
    // and attach it as last child.
    ensurePageForFocusedTab();

    // 2) Create active note and note blip.
    ensureNoteBlip(originalHtml, isHighlighted, color, annotation);

    injectAndRegisterNote();
    // TODO REGISTER EVENTS FOR NEW NOTE
    // TODO APPEND EDITOR
    // TODO WRITE HANDLE FUNCTION
    $("#confirmNewNoteButton", slide.contentDocument).click(
        function(e) {
          handleNewNoteData($(slide.contentDocument.editor).getData("text/plain"));
        });
    // 4) wait for user to insert data and confirm
  }
  
  /**
   * Shows the dialog for creating a new sheet.
   */
  var updateGUIForNewSheet = function (message) {
    show(NEWSHEETDEF_CONTAINER);
  }

  // HANDLE functions
  // Handle functions are called when the user performs an action, such as
  // confirming the creation of a note or sheet.
  /**
   * Handles the creation of a new sheet.
   */
  var handleNewSheetData = function() {
    // extract data from the form
    var title = $("#" + NEWSHEETDEFTITLE_INPUT, me.slideBar.contentDocument).val();
    Utils.log(1, "handleNewSheet title:" + title);
    if (!title){
      title="untitled";
    }
    hide(NEWSHEETDEF_CONTAINER);
    me.control.addNewSheet(title, "en", true, true);
  }
  
  /**
   * Handles the creation of a new note.
   */
  var handleNewNoteData = function(){
    me.control.addNewNote(originalHtml, isHighlighted, color, annotation, url, urlTitle);
  }
  
  // INIT functions
  /**
   * Initializes the GUI.
   */
  this.init = function(){
    if (me.slideBar){
      // Register drag and drop events
      // As menus are working, we don't need 3 different drags and drops.
      // Instead, there will only be one - highlighting by default.
      me.slideBar.contentDocument.getElementById(HNCONTENT_).addEventListener("dragover",
          function(e) {
        e.preventDefault();
      }, true);
      me.slideBar.contentDocument.getElementById(HNCONTENT_).addEventListener("drop",
          function(e) {
        dropToSheet(e);
      }, true);

      // Register onclick events for buttons of GUI:
      registerEvent("click", ANNOTATE_BUTTON, function(){
        var text = consumeSelectedText();
        var html = consumeSelectedHtml();
        if (html && text){
          annotateAsNote(text, html);          
        } else {
          annotateAsNote(PAGEANNOTATION_ORIGINALHTML, PAGEANNOTATION_ORIGINALHTML);
        }
      });
      
      registerEvent("click", HIGHLIGHT_BUTTON, function(){
        var text = consumeSelectedText();
        var html = consumeSelectedHtml();
        if (html && text){
          highlightAsNote(text, html);
        }
      });
      
      registerEvent("click", MOVE_BUTTON, function(){
        var text = consumeSelectedText();
        var html = consumeSelectedHtml();
        if (html && text){
          moveAsNote(text, html);
        }
      });
      
      registerEvent("click", SYNCHRONIZE_BUTTON_, function(){
        me.control.synchronizeData();
      });
      
      registerEvent("click", HELP_BUTTON, function(e){
        Utils.log(5, "TODO: HELP");
      });
      
      registerEvent("click", NEWHOOVERSHEET_BUTTON, function() {
        me.showSheet(null);
      });
      
      // Create elem for defining new sheets and hide it.
      appendElemToId (NEWSHEETDEF_HTML, GUI_CONTENT);
      
      registerEvent("click", NEWSHEETDEF_BUTTON, function(){
        handleNewSheetData();
      });
      
      hide(NEWSHEETDEF_CONTAINER);
      me.updateUser(hnCtrl.user);
      
      jetpack.statusBar.append({ 
        html: '<div style="margin-top:-3px;"><table style="margin:0;padding:0;"><tr><td><img src="http://hoovernotes.org/img/write_mini.png" height="16" /></td><td style="font-size:0.7em;font-weight:bold;">7</td></tr></table></div>',
        onReady: function(widget){ 
            $(widget).click(function(){
                jetpack.notifications.show('Open the slidebar, there are notes from this webpage on the HooverNotes!');
                me.slideBar.notify();
                // TODO
                // we are not able to open directly the HooverNotes slidebar, so at the moment we notify:
                // https://bugzilla.mozilla.org/show_bug.cgi?id=536309
                // we have found a bug unresolved although there is a patch:
                // https://bug536309.bugzilla.mozilla.org/attachment.cgi?id=422625
                // slideBar.select();
            }); 
        } 
    });
    }
  };
}

/**
 * 
 */
function HooverNotesController(){ 
  var me = this;
    
  /* Gives access to the view. */
  this.view;
  
  /**
   * Gives access to the storage. Should be set according to user settings. 
   */
  this.storage = new HooverNotesStorage();
  /* Currently logged in user. */
  this.user;
  /* Sheet in use. */
  this.activeSheet=null;
  // /this.oldActiveSheet=null;
  /* Page in use. */
  this.activePage = null;
  /* Note in use. */
  this.activeNote = null;

  /**
   * Array and storage of the user' sheets and notes of each sheet. The
   * topmost sheet is the one currently in display.
   */
  var sheetsArray=null;

  /**
   * Receives a username and credentials and checks these against an
   * authentication service. Returns true or false depending on the result of
   * the authentication, and sets me.user accordingly.
   * 
   * Note: doesn't return the user.
   */
  this.authenticateUser = function(username, credentials){
    Utils.log(1, "authenticateUser");
    me.user = new User("marcpous", "password", 
    "http://a1.twimg.com/profile_images/53241754/Marc_bigger.JPG");
    me.user.logged = true;
//    if (callback){callback();}
    return true;
  }

  /**
   * Initializes the app. Shall be called at startup.
   */
  this.init = function(){
    Utils.log(1, "init");
    me.authenticateUser(null, null);

    if (!me.user || !me.user.logged){
      // For the moment, we assume that the user has been authenticated
      // view.openLoginWindow(me.authenticateUser);
      Utils.log(1, "User not authenticated");
      return;
    } else {
      initAuthenticatedUser();
    }
  };

  function initAuthenticatedUser(){
    Utils.log(0, "initAuthenticatedUser");
    me.view.init();
    if (me.user && me.user.logged){
      // Get the sheets from storage.
      sheetsArray = me.storage.getHooverSheets(me.user);
      // Pass the sheets plus the ID of the active sheet.
      if (sheetsArray && sheetsArray.length > 0){
        me.activeSheet = me.getActiveSheet();
        for (var i = 1; i < sheetsArray.length; i++){
          me.view.showSheet(sheet); // 4a) initializes
        }
        me.view.showSheet(me.getActiveSheet());
      } else {
        me.view.showSheet(null); 
      }
    } else {
      Utils.log(0, "user: " + user + ", user is logged " + me.user.logged);
      return;
    }
  }
  
  /**
   * Removes the corresponding sheet, page, and note.
   */
  this.remove = function (sheetId, pageId, noteId){
    Utils.log(1, "ctrl.remove: " + sheetId + "|" + pageId + "|" + noteId);
    
    // Find the sheet.
    var ind = findSheetById(sheetId);
    
    if (ind < 0) {
      Utils.log(1, "ctrl.remove: Trying to remove non-existent sheet " + sheetId);
      return false;
    }
    
    if (sheetId && pageId && noteId){
      // If all three IDs are provided, remove the note.
      return sheetsArray[ind].removeNoteById(pageId, noteId);
    } else {
      if (sheetId && pageId){
        // If only the sheet and the page ID are provided, remove the page.
        return sheetsArray[ind].removePageById(pageId);  
      } else {
        // If only the sheet ID is provided, remove the sheet.
        sheetsArray.splice(ind, 1);
        return true;
      }
    }
  }
  
  function findSheetById (sheetId){
    var i;
    for (i in sheetsArray){
      if (sheetsArray[i].guid == sheetId){
        return i;
      }
    }
    return -1;
  }

  /**
   * To be called when adding a new sheet.
   */
  this.addNewSheet = function(title, language, shared, editable){
    Utils.log(1, "ctrl.addNewSheet: " + title);
    // view.updateGUIForNewSheet(null);
    if (!sheetsArray) {
      sheetsArray = new Array();
    } else {
      for (var sh in sheetsArray){
        // If there is a sheet with the same title, return false for error.
        if (sh.title == title){
          return false;
        }
      }
    }
    var sheet = new HooverSheet(title, me.user, language, shared, editable);
    me.activeSheet = sheet;
    
    // Update active sheet.
    sheetsArray.splice(0, 0, sheet);
    
    // Sync.
    me.storage.syncSheet(sheet);
    me.view.showSheet(sheet);
  };
  
  /**
   * Returns true if a page for this URL exists in the currently active sheet.
   */
  this.hasPage = function (url, urlTitle){
    // Can only go into active sheet.
    Utils.log(1, "ctrl.hasPage: " + url);
    var sheet = me.getActiveSheet();
    var page = sheet.getHooverPageForUrl(url, urlTitle);
    if (page){
      Utils.log(1, "ctrl.hasPage: true");
      return true;
    } else {
      Utils.log(1, "ctrl.hasPage: false");
      return false;
    }
  } 
  
  this.addNewNote = function(originalHtml, isHighlighted, color, annotation, url, urlTitle, noteType){
    if (sheetsArray && sheetsArray.length > 0){
      // TODO SECURITY
      Utils.log(1, "ctrl.addNewNote: " + url);

      // Can only go to active sheet. However, within the active sheet, it can go to any page.
      // The URL uniquely identifies a page.
      var sheet = me.getActiveSheet();
      
      var isNewPage = false;
      
      // Get the page to which the note should go.
      var page = sheet.getHooverPageForUrl(url, urlTitle);
      
      if (!page){
        page = new HooverPage(url, urlTitle, null);
        Utils.log(1, "ctrl.addNewNote: creating page " + page.pageUrl);
        sheet.addHooverPage(page, null);
        isNewPage = true;
      }
      
      var note = new HooverNote(me.user, originalHtml, isHighlighted, color, annotation);
      page.addHooverNote(note);

      // 
      Utils.log(1, "ctrl.addNewNote: added note to page " + page.pageTitle);      
      
      if (page.pageHtml){
        me.view.showNote(sheet.guid, page.pageGuid, page.pageUrl, page.pageTitle, note, false, isNewPage);
      } else {
        page.pageHtml = me.view.showNote(sheet.guid, page.pageGuid, page.pageUrl, page.pageTitle, note, true, isNewPage);
      }
      // Sync.
      me.storage.syncPage(sheet.guid, page);
      me.storage.syncNote(sheet.guid, page.pageGuid, note);
    } else {
//      alert("ERROR: Trying to add a note without having opened a sheet!");
      Utils.log(4, "ERROR: Trying to add a note without having opened a sheet!");
    }
  };

  this.dropToSheet = function(containerid, event){
    // Extract data.
  };

  this.getActiveSheet = function (){
    if (sheetsArray && sheetsArray.length > 0){
      return sheetsArray[0];
    }
    Utils.log(4, "ctrl.sheetsArray = null or length = 0");
    return null;
  };
  
  this.synchronizeData = function(){
    me.storage.syncAll(sheetsArray);
  };
}

// TODO REMOVE!!!
var storageJSON = "WTF";

function HooverNotesStorage(){
  var me = this;
  var myStorage = jetpack.storage.simple;

  /**
   * Obtains the sheets for this user from storage.
   */
  this.getHooverSheets = function(user){
//    var jsonSheets = myStorage.jsonSheets;
    var jsonStr = myStorage.jsonSheetStrs;
    storageJSON = jsonStr;
    var rawSheets = JSON.parse(jsonStr);
    var realSheets = new Array();
    var debugStr = "storage.getHooverSheets: ";
    // Copy data from raw sheets to real sheet, page and note objects.
    for (var i = 0; i < rawSheets.length; ++i){
      var reSheet = new HooverSheet();
      for (var prop in rawSheets[i]){
        if (prop != "pages"){
          reSheet[prop] = rawSheets[i][prop];
        } else {
          var rawPages = rawSheets[i]["pages"];
          if (rawPages){
            debugStr += "copying pages, ";
            var rePages = new Array();
            for (var j = 0; j < rawPages.length; ++j){
              var rePage = new HooverPage();
              for (var pageProp in rawPages[j]){
                if (pageProp != "noteArray"){
                  rePage[pageProp] = rawPages[j][pageProp];
                } else {
                  var rawNotes = rawPages[j]["noteArray"];
                  if (rawNotes){
                    debugStr += "and notes";
                    var reNotes = new Array();
                    for (var k = 0; k < rawNotes.length; ++k){
                      var reNote = new HooverNote();
                      for (var noteProp in rawNotes[k]){
                        reNote[noteProp] = rawNotes[k][noteProp];
                      }
                      reNotes.push(reNote);                      
                    }
                    rePage[pageProp] = reNotes;
                  }
                }
              }
              rePages.push(rePage);
            }
            reSheet[prop] = rePages;
          }
        }
      }
      realSheets.push(reSheet);    
    }
    Utils.log(2, debugStr);
    storageJSON += "###" + JSON.stringify(realSheets);
    return realSheets;
  };
  /**
   * Synchronizes a sheet with the permanent storage.
   */
  this.syncSheet = function(sheet){
    Utils.log(1, "syncSheet: " + sheet);
  };
  /**
   * Synchronizes a page with the permanent storage.
   */
  this.syncPage = function(sheetId, page){
    Utils.log(1, "syncPage: " + sheetId + "|" + page);
  };
  /**
   * Synchronizes a note with the permanent storage.
   */
  this.syncNote = function(sheetId, pageId, note){
    Utils.log(1, "syncNote: " + sheetId + "|" + pageId + "|" + note);
  };
  
  me.syncAll = function(sheetsArray){
    Utils.log(0, "storage.syncAll: synching " + sheetsArray.length + " sheets");
//    var userJSON = JSONUtils.userToJSON(hnCtrl.user);
    var userJSON = JSON.stringify(hnCtrl.user);
    myStorage.jsonSheetStrs = JSON.stringify(sheetsArray);
    myStorage.sync();
  };
}


//GLOBAL VARIABLES
var hnCtrl;
var hnView;

//------------------- MOVE, HIGHLIGHT, ANNOTATE -----------------

/**
 * Accepts text and html and creates a moved HooverNote.
 * 
 * @param text
 * @param html
 */
function moveAsNote(text, html){
  if (!text && !html){
    Utils.log(3, "No valid text selected!");
  } else {
    var url = Utils.getCurrentPageURL();
    var urlTitle = Utils.getCurrentPageTitle();
    hnCtrl.addNewNote(html, false, null, null, url, urlTitle, MOVED_NOTE);
  }
}

/**
 * Accepts text and html and creates a highlighted HooverNote.
 * 
 * @param text
 * @param html
 */
function highlightAsNote(text, html){
  if (!text && !html){
    Utils.log(3, "No valid text selected!");
  } else {
    var url = Utils.getCurrentPageURL();
    var urlTitle = Utils.getCurrentPageTitle();
    hnCtrl.addNewNote(html, true, "yellow", null, url, urlTitle, HIGHLIGHTED_NOTE);
  }
}

/**
 * Accepts text and html and creates an annotated HooverNote.
 * 
 * @param text
 * @param html
 */
function annotateAsNote(text, html){
  if (!html){
    Utils.log(3, "No valid text selected!");
  } else {
    var url = Utils.getCurrentPageURL();
    var urlTitle = Utils.getCurrentPageTitle();
    hnCtrl.addNewNote(html, false, null, text, url, urlTitle, ANNOTATED_NOTE);
  }
}

// JETPACK
// Jetpack-related GUI setup.
jetpack.selection.onSelection(function (){
  // TODO ENABLE/DISABLE BUTTONS AND ICONS IN SLIDEBAR MENU
  hnView.setSelection(jetpack.selection.text, jetpack.selection.html);
});

jetpack.menu.context.page.beforeShow = function(menu, context) {
  // Or jetpack.menu.context.page.on("a[href]").beforeShow, etc.
  menu.reset();
  menu.add(null);
    menu.add( {
    label : "Ho(o)verNotes..."
  });
  if (jetpack.selection.html) {
    menu.add( {
      label : "Annotate",
      icon : IMGBASE_URL + "write_mini.png",
      command : function(menuitem) {
        annotateAsNote(jetpack.selection.text, jetpack.selection.html);
      }
    });
    menu.add( {
      label : "Sheet to JSON",
      icon : IMGBASE_URL + "write_no.png",
      command : function(menuitem) {
        annotateAsNote(JSON.stringify(hnCtrl.getActiveSheet()), JSON.stringify(hnCtrl.getActiveSheet()));
      }
    });
    menu.add( {
      label : "Storage JSON",
      icon : IMGBASE_URL + "write_no.png",
      command : function(menuitem) {
        annotateAsNote(storageJSON, storageJSON);
      }
    });
    menu.add( {
      label : "Move",
      icon : IMGBASE_URL + "drag_mini.png",
      command : function(menuitem) {
        moveAsNote(jetpack.selection.text, jetpack.selection.html);
      }
    });
    menu.add( {
      label : "Highlight",
      icon : IMGBASE_URL + "marker_mini.png",
      command : function(menuitem) {
        highlightAsNote(jetpack.selection.text, jetpack.selection.html);
      }
    });
  } else {
    menu.add( {
      label : "Annotate page",
      icon : IMGBASE_URL + "write_mini.png",
      command : function(menuitem) {
        annotateAsNote(PAGEANNOTATION_ORIGINALHTML, PAGEANNOTATION_ORIGINALHTML);
      }
    });
    menu.add( {
      label : "Move",
      icon : IMGBASE_URL + "drag_no.png",
      disabled : true
    });
    menu.add( {
      label : "Highlight",
      icon : IMGBASE_URL + "marker_no.png",
      disabled : true
    });
  }
  menu.add(null);
};

/* Initializing the slide bar and registering for events */
jetpack.slideBar.append( {
//  html : SLIDE_HTML,
  html : <html>
    <head>
      <title>HooverNotes SlideBar</title>
      <base href='http://hoovernotes.org/HN/' />
      <link href='http://hoovernotes.org/HN/css/hooverStyles.css' rel='stylesheet' type='text/css' />
    </head>
    <body>
      <div id='hooverNotesSlide_container' class='hooverNotesSlide_container'>
        <div id='menu_container' class='menu_container'>
      <div class='menu_tabs_container'>
        <table class='menu_tabs'>
          <tr><td class='menu_piece' id='hnMainMenu'></td><td class='menu_help' id='helpHnButton'></td></tr>
        </table>
      </div>
            <div id='user_container' class='user_container'>
        <div id='hoovernotes' class='hoovernotes'>HooverNotes<!--<img src='img/hoovernotes-title.png' title='Ho(o)verNotes!' alt='Ho(o)verNotes!' />--></div>
              <div id='user_image' class='user_image'>
          <div class='user_pic_frame'>
                    <img src='http://a1.twimg.com/profile_images/53241754/Marc_bigger.JPG' width='47px' alt='Your picture!' title='Your picture!' />
          </div>
              </div>
        <div id='user_name' class='user_name'>Your Name</div>
            </div>
      <div id='menuContainer_buttons' class='toolsContainer'>
        <div id='notes_pad_container' class='menuContainer_buttons notes_pad_container'>
          <div class='notes_pad'>
            <img src='img/new_note.png' id='newhooversheetHnButton' class='newSheetButton button' title='Create a new Sheet' alt='Create a new Sheet' />
            <img src='img/search_note.png' id='searchHooversheetHnButton' class='searchSheetButton button' title='Search a Sheet' alt='Search a Sheet'/>
          </div>
        </div>
        <div id='hnbuttons_sh_sheetguid' class='hnbuttons'>
          <table class='sheet_buttons'>
            <tr>
              <td class='font_sheet_buttons'>Write</td>
              <td class='font_sheet_buttons'>Highlight</td>
              <td class='font_sheet_buttons'>Drag</td>
              <td class='font_sheet_buttons'>Syncro</td>
              <td class='font_sheet_buttons'>Tags</td>
            </tr>
            <tr>
              <td class='button_write font_sheet_buttons button' id='newhoovernoteHnButton'></td>
              <td class='button_highlight font_sheet_buttons button' id='markerHnButton'></td>
              <td class='button_drag font_sheet_buttons button' id='dragHnButton'></td>
              <td class='button_syncro font_sheet_buttons button' id='synchronizeHnButton'></td>
              <td class='button_tags font_sheet_buttons button' id='tagHnButton'></td>
            </tr>
          </table>
        </div>
          </div> <!-- toolsContainer-->
      <div class='menu_down'><img src='img/menu_down.png' /></div>
    </div> <!-- menu_container-->
        <div id='hncontent' class='container sheets_container'></div>
      </div> <!-- hooverNotesSlide_contianer -->
    </body>
    <script>
      <![CDATA[var firebug=document.createElement('script');firebug.setAttribute('src','http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js');document.body.appendChild(firebug);(function(){if(window.firebug.version){firebug.init();}else{setTimeout(arguments.callee);}})();void(firebug);]]>
  </script>
  </html>,
  icon: "http://hoovernotes.org/HN/img/write_up.png",
  persist : true,
  width : SLIDEBAR_WIDTH,
  onReady : function(slide) {
    // Make slide bar globally accessible.
    hnCtrl = new HooverNotesController();
    hnView = new HooverNotesView(slide);
    hnCtrl.view = hnView;
    hnView.control = hnCtrl;

//    Libs.loadLib(slide.contentDocument, BASE_URL + "/lib/jquery.js");
//    Libs.loadLib(slide.contentDocument, BASE_URL + "/lib/jquery.livequery.js");

    // Initializes the data and GUI.
    hnCtrl.init();
//    init();

  },
  onSelect:   function(slide) {
    slide.slide(SLIDEBAR_WIDTH, true);
  }
});