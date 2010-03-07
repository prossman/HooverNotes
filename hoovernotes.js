/*
 * HooverNotes Jetpack  
 * http://hoovernotes.org
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
var SLIDEBAR_WIDTH = 320;
var IMGBASE_URL = "http://hoovernotes.org/img/";
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
var TITLE_SUB = /subtitle/g;
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
var ANNOTATE_LOGO = "img/write_sm.png";
/** Relative URL for logo for move notes. */
var MOVE_LOGO = "img/drag_sm.png";
/** Relative URL for logo for annotation notes. */
var HIGHLIGHT_LOGO = "img/marker_sm.png";
var NOTELOGO_SUB = "note_logo";

var NOTE_BUTTONS="note_buttons";
//var NOTE_CONTAINER_="note_container_sh_sheetguid_p_pageguid_n_noteguid";
//var PAGENOTE_CONTAINER_="pageNote_container_sh_sheetguid_p_pageguid";
var PAGETITLE="pageTitle";
//var PAGE_CONTAINER_GUID="page_container_guid";
var SHEETCONTAINER_BUTTONS="sheetContainer_buttons";
//var GUI_CONTENT="sheets_container";
var GUI_CONTENT ="hncontent";
var GUI_CONTENT_SHEETS ="hncontent_sh_sheetguid";
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
/** HTML for tags container */
var TAG_HTML="<div id='tag_container' class='tag_container'><ul id='newTag_controls' class='newTag_controls'><li class='newSheetDefInput'><input type='text' id='newTag_input' class='newSheetDefTitle_input' value='Insert a new tag or multiple tags separated by commas' /></li><li class='newSheetDefButtons'><img src='img/ok.jpg' id='newTag_button' class='button' title='Add a new Tag' alt='Add a new Tag' /></li><li class='newSheetDefButtons'><img src='img/close.png' id='closeTag_button' class='removeSheetButton button' alt='Close the Tag form' title='Close the Tag form' /></li></ul><ul id='tag_list' class='tag_list'><li class='tag_list_element'><a class='tag_list_element' href='#' title='TagX annotations' alt='TagX annotations'>tagX</a>,</li></ul></div>";
/** HTML showing an input and controls for creating a new Sheet. */
var NEWSHEETDEF_HTML="<div id='newSheetDef_container' class='newSheetDef_container'><ul id='newSheetDef_controls' class='newSheetDef_controls'><li class='newSheetDefInput'><input type='text' id='newSheetDefTitle_input' class='newSheetDefTitle_input' value='Insert a new Topic title' /></li><li class='newSheetDefButtons'><img src='img/ok.jpg' id='newSheetDef_button' class='button' title='Create the Sheet' alt='Create the Sheet' /></li><li class='newSheetDefButtons'><img src='img/close.png' id='removeHnButton_sh_sheetguid' class='removeSheetButton button' alt='Cancel the Sheet' title='Cancel the Sheet' /></li></ul></div>";
/** HTML for creating a new sheet container. */
var SHEETCONTAINER_HTML="<li id='hncontainer_sh_sheetguid' class='sheet_container_annotation'><ul id='hncontrols_sh_sheetguid' class='sheet_header'><li class='sheet_header_minimize'><img src='img/arrow01.png' id='minimizeHnButton_sh_sheetguid'class='minimizeHnButton hnbutton button' alt='Minimize Sheet' title='Minimize Sheet' /><img src='img/arrow02.png' id='maximizeHnButton_sh_sheetguid'class='minimizeHnButton hnbutton button' alt='Maximize Sheet' title='Maximize Sheet' /></li><li class='sheet_header_title'><h1 id='hntitle_sh_sheetguid' class='sheetTitle lucida_bold hntitle'>subtitle</h1><input type='hidden' name='container_id' id='sh_sheetguid'/></li><li class='sheet_header_close'><img src='img/close.png' id='removeHnButton_sh_sheetguid' class='removeHnButton hnbutton button'alt='Remove Sheet' title='Remove Sheet' /></li><li class='sheet_separator_line2'></li></ul><ul id='hncontent_sh_sheetguid' class='sheet_hncontent'></ul></li>";
// With text area:
// <div id='hncontainer_sh_sheetguid' class='hncontainer sheet_container'><div id='sheetHeader' class='sheetHeader'><div id='hntitle_sh_sheetguid' class='sheetTitle lucida_bold'><textarea id='editor_sh_sheetguid' class='editor_sheet' name='editor' readonly='readonly'>subtitle</textarea></div><div id='sheetTitleButtons_sheetguid' class='button min_max_rem_buttons'><imgsrc='img/minimize.png' id='minimizeHnButton_sh_sheetguid'class='minimizeHnButton hnbutton button' alt='Minimize Sheet'title='Minimize Sheet' /><img style='display: none'src='img/expand.png' id='maximizeHnButton_sh_sheetguid'class='expandHnButton hnbutton button' alt='Expand Sheet'title='Expand Sheet' /><img src='img/borrar.png'id='removeHnButton_sh_sheetguid' class='removeHnButton hnbutton button'alt='Remove Sheet' title='Remove Sheet' /></div><div id='separador'><img src='img/separador.png'></div></div><div id='hncontent_sh_sheetguid' class='hncontent sheet_hncontent'></div></div>
/** HTML for creating a new page container. */
var PAGE_HTML="<li id='hncontainer_sh_sheetguid_p_pageguid' class='page_hncontainer'><img src='img/arrow01.png' id='minimizeHnButton_sh_sheetguid_p_pageguid'class='minimaze_page_button button' alt='Minimize page' title='Minimize page' /><img src='img/arrow02.png' id='maximizeHnButton_sh_sheetguid_p_pageguid'class='minimaze_page_button button' alt='Maximize page' title='Maximize page' /><a id='hntitle_sh_sheetguid_p_pageguid' href='pageurl' target='_blank'class='page_title hntitle' title='Open in a new tab the subtitle' alt='Open in a new tab the subtitle'>subtitle</a><input type='hidden' name='container_id' id='sh_sheetguid_p_pageguid'/><img src='img/close.png' class='close_page_button button'id='removeHnButton_sh_sheetguid_p_pageguid' title='Remove the URL and annotations'alt='Remove the URL and annotations' /><ul id='hncontent_sh_sheetguid_p_pageguid' class='page_hncontent'></ul></li>";
/** Common HTML for all notes. The notes content receives the actual 
 * type-dependent content. */
var NOTE_HTML="<li id='hncontainer_sh_sheetguid_p_pageguid_n_noteguid' class='note_hncontent'><ul id='hninnercontainer_sh_sheetguid_p_pageguid_n_noteguid'><li id='hncontrols_sh_sheetguid_p_pageguid_n_noteguid' class='hncontent_toolbar'><img src='note_logo' class='hncontent_toolbar_notetype' /><input type='hidden' name='container_id' id='sh_sheetguid_p_pageguid_n_noteguid'/><ul id='hnbuttons_sh_sheetguid_p_pageguid_n_noteguid' class='hncontent_toolbar_list'><li class='hncontent_toolbar_button'><img id='removeHnButton_sh_sheetguid_p_pageguid_n_noteguid' src='img/close.png' class='button' /></li><li class='hncontent_toolbar_button'><img id='minimizeHnButton_sh_sheetguid_p_pageguid_n_noteguid' src='img/minimize.jpg' class='button' /><img id='maximizeHnButton_sh_sheetguid_p_pageguid_n_noteguid' src='img/expand.png' class='button' /></li><li class='hncontent_toolbar_button'><img id='editHnButton_sh_sheetguid_p_pageguid_n_noteguid' src='img/edit.gif' class='button' /></li></ul></li><li id='hncontent_sh_sheetguid_p_pageguid_n_noteguid' class='hncontent_textarea'></li></ul></li>";
/** HTML for the actual content of a moved note. */
var MOVENOTE_HTML="<span id='note_hncontent_sh_sheetguid_p_pageguid_n_noteguid' class='span_note font_annotations'>initialvalue</span>";
var HIGHLIGHTNOTE_HTML="<span id='note_hncontent_sh_sheetguid_p_pageguid_n_noteguid' class='font_annotations span_note'><mark>initialvalue</mark></span>";
var ANNOTATENOTE_HTML="<textarea id='note_hncontent_sh_sheetguid_p_pageguid_n_noteguid'class='font_annotations textarea_note'>initialvalue</textarea>";

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
//    var regexp = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
//    
//    return htmlString.replace(regexp,'<a href="#">$1</a>');
//        this.each(function() {
//            $(this).html(
//                $(this).html().replace(regexp,'<a href="$1">$1</a>‘)
//            );
//        });
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
  
  //loads a script by src
  this.loadScript = function(src, document, callback) {
    var script = document.createElementNS("http://www.w3.org/1999/xhtml", "script");
    script.src = src;
    if (callback) $(script).bind("load", callback);
    document.getElementsByTagName("head")[0].appendChild(script);
  };
    
  //AJAX get + eval a script, unsafe
  //should we use ADSafe for sanboxing?
  this.importScript = function(src, callback) {
    $.get(src, function(data, status) {
      eval(data);
      if (callback) callback();
    });
  };
  
  //inject <script>code</script>
  this.injectScript = function(code, document) {
    var script = document.createElementNS("http://www.w3.org/1999/xhtml", "script");
    $(script).text(code);
    document.getElementsByTagName("head")[0].appendChild(script);
  };
  
  //inject jQuery + some utility plugins
  this.injectLibs= function(document, callback) {
    with (Utils) {
      loadScript(base + "script/lib/jquery-1.3.2.min.js", document, function() {
        loadScript(base + "script/lib/jquery.scrollTo.js", document, callback);
      });
    }
  };
  
  // amazingly (ugly) unique IDs
  this.uuid = function() {
    var uuidGenerator = Components.classes["@mozilla.org/uuid-generator;1"]
                .getService(Components.interfaces.nsIUUIDGenerator);
    var uuid = uuidGenerator.generateUUID();
    return uuid.toString().substring(1, 37);
  }
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
      Utils.log(1, "HooverSheet.getHooverPageForUrl() with " + url 
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
  me.visibleSheetID = null;

  this.minimize = function (idString){
    Utils.log(1, "View.minimize() " + idString);
    
    // for the moment: pageNote_container
    var idSubStr = Utils.extractId(idString, null);
    var minButtonId = MINIMIZE_BUTTON_ + idSubStr;
    var contentId = HNCONTENT_ + idSubStr;
    Utils.log(1, "Minimizing container ID: " + contentId);
    // Hide both content and corresponding button.
    hide(contentId);
    hide(minButtonId);
    
    // make sure maximize button is shown
    var maxButtonId = MAXIMIZE_BUTTON_ + idSubStr;
    var isVisible = $("#" + maxButtonId, me.slideBar.contentDocument).is(":visible");
    if (!isVisible){
      show(maxButtonId);
    }
  };

  this.maximize = function (idString){
    if (!idString){
      Utils.log(4, "view.maximize: ERROR idString = null");
    }
    Utils.log(1, "View.maximize() " + idString);

    // for the moment: pageNote_container
    
    var idSubStr = Utils.extractId(idString, null);
    if (!idSubStr){
      idSubStr = SHEETGUID_PRE + idString;
    }
    var maxButtonId = MAXIMIZE_BUTTON_ + idSubStr;
    var contentId = HNCONTENT_ + idSubStr;
    Utils.log(0, "Maximizing container ID: " + contentId);
    // Hide both content and corresponding button.
    show(contentId);
    hide(maxButtonId);
    
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
    $("#" + containerId, me.slideBar.contentDocument).remove();
    
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
  
  function prependElemToId (contentStr, idStr){
    var newElem = $(contentStr, me.slideBar.contentDocument);
    $("#" + idStr, me.slideBar.contentDocument).prepend(newElem);
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
  
  this.makeSheetActive = function(sheetId){
    if (!me.visibleSheetID || me.visibleSheetID != sheetId){
      var sheetContainerId = Utils.assembleID(sheetId, null, null, HNCONTAINER_);
      if (me.visibleSheetID){
        var minId = Utils.assembleID(me.visibleSheetID, null, null, MINIMIZE_BUTTON_);
        me.minimize(minId);
        var visibleContainerId = Utils.assembleID(me.visibleSheetID, null, null, HNCONTAINER_);
        // Remove active sheet class
        $("#" + visibleContainerId, me.slideBar.contentDocument).removeClass("border_active");
        
        Utils.log(1, "view.makeSheetActive: moving " + sheetContainerId + " before " + visibleContainerId);
//        $("#" + sheetContainerId, me.slideBar.contentDocument).before("#" + visibleContainerId);
//        $("#" + visibleContainerId, me.slideBar.contentDocument).before("#" + sheetContainerId, me.slideBar.contentDocument);
        var clonedElem = $("#" + sheetContainerId, me.slideBar.contentDocument).clone(true);
        $("#" + sheetContainerId, me.slideBar.contentDocument).remove();
        $("#" + GUI_CONTENT, me.slideBar.contentDocument).prepend(clonedElem);
     }
      
      Utils.log(1, "view.makeSheetActive: assigning new ID " + sheetId + 
        ", was " + me.visibleSheetID);
      me.visibleSheetID = sheetId;
      $("#" + sheetContainerId, me.slideBar.contentDocument).addClass("border_active");
      me.control.setActiveSheet(me.visibleSheetID);
      Utils.log(1, "view.makeSheetActive: minimizing active sheet");
    } else {
      Utils.log(1, "view.makeSheetActive: not minimizing active sheet");
    }
    me.maximize(me.visibleSheetID);
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
      // Minimize the active sheet
      
      // TODO: check for existing sheet with the same name
      if (!isExisting(sheet.sheetGuid)){
        var htmlString = SHEETCONTAINER_HTML.replace(SHEETGUID_SUB, sheet.guid);
        htmlString = htmlString.replace(TITLE_SUB, sheet.title);
        appendElemToId(htmlString, GUI_CONTENT);
        // Register events for the sheet-related buttons.
        //TODO move to init and out of container
        registerMinMaxRemEvents(sheet.guid, null, null);
        var sheetContainerId = Utils.assembleID(sheet.guid, null, null, HNCONTAINER_);
        registerEvent("dblclick", sheetContainerId, function(e){
          Utils.log(1, "view.doubleclick on sheet: entered " + this.id);
          var sheetId = Utils.extractId(this.id, SHEETGUID_PRE);
          Utils.log(1, "view.doubleclick on sheet: making active " + sheetId);
          hnView.makeSheetActive(sheetId);
        });
      }
      
      Utils.log(0, "view.showSheet: getting all notes from sheet");
      var notesArray = sheet.getAllNotes();
      
      if (notesArray){
        Utils.log(1, "view.showSheet: showing " + notesArray.length + " notes.");
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
        Utils.log(1, "view.showSheet: not showing any notes.");
      }
      Utils.log(1, "view.showSheet: " + sheet.title);
      me.makeSheetActive(sheet.guid);
    }
  };
  
  /**
   * Injects a new note into the active sheet. Please note: a new note is <i>always</i>
   * added for the page currently in display. 
   */
  this.showNote = function (sheetId, pageId, pageUrl, pageTitle, note, getPageHtml, isNewPage){
    Utils.log(1, "view:showNote " + sheetId + "|" + pageId + "|" + note.noteGuid);
    
    // Look for the page container's content div. Create a blip for the note
    // and attach it as last child.
    if (isNewPage){
      ensurePageForFocusedTab(sheetId, pageId, pageUrl, pageTitle, isNewPage);
    }

    // If there is no blip yet, add it. Please note: 
    ensureNoteBlip(sheetId, pageId, note);

    // Find note blip and add the note's content.
    injectAndRegisterNote(sheetId, pageId, note);
    
    me.maximize (Utils.assembleID(sheetId, pageId, note.noteGuid, null));

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
//      Utils.log(1, "Page is new");
//    } else {
//      Utils.log(1, "Page is old");;
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
      me.maximize(Utils.assembleID(sheetId, pageId, null, null));
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
    
    var successful = me.control.addNewSheet(title, "en", true, true);
    if (!successful){
      Utils.log(5, title + " already in use!");
    } else {
      hide(NEWSHEETDEF_CONTAINER);
    }
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
        Utils.log(1, "TODO: HELP");
      });
      
      registerEvent("click", NEWHOOVERSHEET_BUTTON, function() {
        me.showSheet(null);
      });
      
      // Create elem for defining new sheets and hide it.
//      prependElemToId (NEWSHEETDEF_HTML, GUI_CONTENT);
      
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
//    	sheetsArray = null;
      // Pass the sheets plus the ID of the active sheet.
      if (sheetsArray && sheetsArray.length > 0){
        Utils.log(1, "ctrl.initAuthenticatedUser: " + sheetsArray.length + " sheets");
        me.activeSheet = me.getActiveSheet();
        for (var i = 1; i < sheetsArray.length; i++){
          me.view.showSheet(sheetsArray[i]); // 4a) initializes
        }
        me.view.showSheet(me.getActiveSheet());
      } else {
        Utils.log(1, "ctrl.initAuthenticatedUser: not showing any sheets");
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
        if (sheetsArray[sh].title == title){
          return false;
        }
      }
    }
    var sheet = new HooverSheet(title, me.user, language, shared, editable);
//    me.activeSheet = sheet;
    
    // Update active sheet.
    sheetsArray.splice(0, 0, sheet);
    
    var output = "Sheets: ";
    for (var sh in sheetsArray){
      // If there is a sheet with the same title, return false for error.
      output = output + sh + ") " + sheetsArray[sh].title + "; ";
    }
    Utils.log(1, output);
    Utils.log(1, me.getActiveSheet());
    
    // Sync.
    me.storage.syncSheet(sheet);
    me.view.showSheet(sheet);
    return true;
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
    var output = "ctrl.getActiveSheet: Sheets - ";
    for (var sh in sheetsArray){
      // If there is a sheet with the same title, return false for error.
      output = output + sh + ") " + sheetsArray[sh].title + "; ";
    }
    Utils.log(1, output);
    
    if (sheetsArray && sheetsArray.length > 0){
      Utils.log(1, "ctrl.getActiveSheet: returning " + sheetsArray[0].title);
      return sheetsArray[0];
    }
    Utils.log(1, "ctrl.getActiveSheet: sheetsArray = null or length = 0");
    return null;
  };
  
  this.setActiveSheet= function (sheetId){
    var output = "ctrl.setActiveSheet: Sheets - ";
    for (var sh in sheetsArray){
      // If there is a sheet with the same title, return false for error.
      output = output + sh + ") " + sheetsArray[sh].guid + "; ";
    }
    
    var sheetInd = findSheetById(sheetId);
    Utils.log(2, output + " and found " + sheetInd + " for " + sheetId);
    if (sheetInd < 0){
      return false;
    } 
    var sheet = sheetsArray[sheetInd];
    sheetsArray.splice(sheetInd, 1);
    // Update active sheet.
    sheetsArray.splice(0, 0, sheet);
  }
  
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
    Utils.log(1, debugStr);
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
    myStorage.jsonSheetStrs = JSON.stringify(sheetsArray);
    myStorage.sync();
  };
}


//GLOBAL VARIABLES
var hnCtrl;
var hnView;
var slideDoc = null;

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

var SlideBar = function(callback) {
  var me = this;
  this.slideDocument = null;
  
  /* Initializing the slide bar and registering for events */
  jetpack.slideBar.append( {
  //  html : SLIDE_HTML,
    html : <html>
  <head>
    <title>HooverNotes plugin</title>
    <base href='http://hoovernotes.org/' />
    <link href='http://hoovernotes.org/CSS/hoover.css'
          rel='stylesheet'
          type='text/css' />
  </head>
  <body>
    <div id='hooverNotesSlide_container'
         class='hooverNotesSlide_container'>
      <div id='header'
           class='menu_container'>
        <!--<div class='menu_help button'
             id='helpHnButton'></div> -->
        <div class='user_container'>
          <img src='http://a1.twimg.com/profile_images/53241754/Marc_bigger.JPG'
               class='user_pic'
               width='47px'
               alt='Your picture!'
               title='Your picture!' />
          <h2 class='username'>Your name</h2>
          <a href='#'
             class='signout'
             id='signout'>Sign out</a>
        </div>
        <div class='notes_pad'>
          <img src='img/new_note.png'
               id='newhooversheetHnButton'
               class='newSheetButton button'
               title='Create a new Sheet'
               alt='Create a new Sheet' />
          <img src='img/search.png'
               id='searchHooversheetHnButton'
               class='searchSheetButton button'
               title='Search a topic'
               alt='Search a topic' />
        </div>
        <div id='menuContainer_buttons'
             class='toolsContainer'>
          <ul class='menu_buttons'
              id='iconbar'>
            <li>
              <img src='img/write_up.jpg'
                   class='button_write font_sheet_buttons button'
                   id='newhoovernoteHnButton'
                   alt='Annotate'
                   title='Annotate' />
            </li>
            <li>
              <img src='img/sep_but.jpg' />
            </li>
            <li>
              <img src='img/marker_up.jpg'
                   alt='Highlight content'
                   class='button_highlight font_sheet_buttons button'
                   id='markerHnButton'
                   title='Highlight' />
            </li>
            <li>
              <img src='img/sep_but.jpg' />
            </li>
            <li>
              <img src='img/drag_up.jpg'
                   alt='Move content'
                   class='button_drag font_sheet_buttons button'
                   id='dragHnButton'
                   title='Move text' />
            </li>
            <li>
              <img src='img/sep_but.jpg' />
            </li>
            <li>
              <img src='img/syncro_up.jpg'
                   alt='Synchronize annotations'
                   class='button_syncro font_sheet_buttons button'
                   id='synchronizeHnButton'
                   title='Synchronize' />
            </li>
            <li>
              <img src='img/sep_but.jpg' />
            </li>
            <li>
              <img src='img/tags_up.jpg'
                   alt='Tag topics and annotations'
                   class='button_tags font_sheet_buttons button'
                   id='tagHnButton'
                   title='Tag it!' />
            </li>
            <li>
              <img src='img/sep_but.jpg' />
            </li>
          </ul>
        </div>
        <!-- toolsContainer-->
      </div>
      <!-- menu_container-->
      <!-- NEWSHEETDEF -->
      <div id='newSheetDef_container' class='newSheetDef_container'><ul id='newSheetDef_controls' class='newSheetDef_controls'><li class='newSheetDefInput'><input type='text' id='newSheetDefTitle_input' class='newSheetDefTitle_input' value='Insert a new Topic title' /></li><li class='newSheetDefButtons'><img src='img/ok.jpg' id='newSheetDef_button' class='button' title='Create the Sheet' alt='Create the Sheet' /></li><li class='newSheetDefButtons'><img src='img/close.png' id='removeHnButton_sh_sheetguid' class='removeSheetButton button' alt='Cancel the Sheet' title='Cancel the Sheet' /></li></ul></div>
      <!-- SEARCHER HTML -->
      <div id='hncontent_whatever'
           class='container sheets_container'>
        <ul id='hncontent'
            class='sheet_container_list'></ul>
      </div>
    </div>
    <!-- hooverNotesSlide_contianer -->
  </body>
  <script>
    <![CDATA[var firebug=document.createElement('script');firebug.setAttribute('src','http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js');document.body.appendChild(firebug);(function(){if(window.firebug.version){firebug.init();}else{setTimeout(arguments.callee);}})();void(firebug);]]>
</script>
</html>,
    icon: "http://hoovernotes.org/img/logo.jpg",
    persist : true,
    width : SLIDEBAR_WIDTH,
    onReady : function(slide) {
      // Make slide bar globally accessible.
      hnCtrl = new HooverNotesController();
      hnView = new HooverNotesView(slide);
      hnCtrl.view = hnView;
      hnView.control = hnCtrl;
  
      // Initializes the data and GUI.
      hnCtrl.init();
      
      me.slideDocument = slide.contentDocument;
      slideDoc = me.slideDocument;
      
      try{
        //TODO: simplify
        loadLibs(me.slideDocument, function() {
          Utils.loadScript("http://github.com/prossman/HooverNotes/raw/master/lib/hooverlive.js", me.slideDocument, function() {
            callback();
          });
        });
      } catch(e) {}
      
//      callback();
    },
    onSelect:   function(slide) {
      slide.slide(SLIDEBAR_WIDTH, true);
    }
  });
  
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
        icon : IMGBASE_URL + "write_sm.png",
        command : function(menuitem) {
          annotateAsNote(jetpack.selection.text, jetpack.selection.html);
        }
      });
  //    menu.add( {
  //      label : "Sheet to JSON",
  //      icon : IMGBASE_URL + "write_no.png",
  //      command : function(menuitem) {
  //        annotateAsNote(JSON.stringify(hnCtrl.getActiveSheet()), JSON.stringify(hnCtrl.getActiveSheet()));
  //      }
  //    });
  //    menu.add( {
  //      label : "Storage JSON",
  //      icon : IMGBASE_URL + "write_no.png",
  //      command : function(menuitem) {
  //        annotateAsNote(storageJSON, storageJSON);
  //      }
  //    });
      menu.add( {
        label : "Move",
        icon : IMGBASE_URL + "drag_sm.png",
        command : function(menuitem) {
          moveAsNote(jetpack.selection.text, jetpack.selection.html);
        }
      });
      menu.add( {
        label : "Highlight",
        icon : IMGBASE_URL + "marker_sm.png",
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
  
  function loadLibs(slideDocument, callback) {
    with (Utils) {
      //TODO: simplify, use an array
      loadScript("http://github.com/prossman/HooverNotes/raw/master/lib/jquery.js", slideDocument, function() {
        loadScript("http://github.com/prossman/HooverNotes/raw/master/lib/jquery.livequery.js", slideDocument, callback);
      });
      
    }
  };
  
  function loadUILibs(document, callback) {
    with (Utils) {
      loadScript(base + "script/lib/jquery-ui-1.7.2.custom.min.js", document, function() {
        loadScript(base + "script/lib/jquery.text-overflow.js", document, function() {
          loadScript(base + "script/lib/jquery.jeditable.js", document, function() {
            loadScript(base + "script/lib/jquery.livequery.js", document, callback);
          });
        });
      });
    }
  };
};

var slidebarvar = new SlideBar(function(){
  jetpack.notifications.show("BASUUUUUUUUUURAAAAAAAAA");
});