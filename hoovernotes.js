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
var BASE_URL = "http://github.com/prossman/HooverNotes/raw/master/";

// IDs.
var _ID_STRING="_sh_sheetguid_p_pageguid_n_noteguid";
/** Used for varructing IDs. */
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

/** Container ID. A container corresponds to a level in the hierarchy.*/
var HNCONTAINER_ = "hncontainer"
var HNCONTENT_ = "hncontent";
var HNCONTROLS_ = "hncontrols";

/** Button for maximizing and minimizing.*/
var MINMAXIMIZE_BUTTON_ = "minMaximizeHnButton_";

//GUI IDS
/* Container for current sheet. */
//var SHEET_CONTAINER_ = "sheet_container_";
var SHEET_CONTAINER_ ="hncontainer_sh_";
/* Container for the overall slide bar. */
var SLIDE_CONTAINER = "hooverNotesSlide_container";
/* Overall container for the slide bar. */
var HOOVERNOTESSLIDE_CONTAINER="hooverNotesSlide_container";
/* Container for user information and controls that don't change. */
var MENU_CONTAINER="menu_container";
/* Container for user information. */
var USER_CONTAINER="user_container";
/* Image of the user on top of GUI. */
var USER_IMAGE="user_image";

var MAXIMIZENOTE_BUTTON_="maximizeNote_button_sh_sheetguid_p_pageguid_n_noteguid";
var MENUCONTAINER_BUTTONS="menuContainer_buttons";
var MINIMIZENOTE_BUTTON_="minimizeNote_button_sh_sheetguid_p_pageguid_n_noteguid";

var NOTECONTENT_CONTAINER_="content_sh_sheetguid_p_pageguid_n_noteguid";
var NOTE_BUTTONS="note_buttons";
//var NOTE_CONTAINER_="note_container_sh_sheetguid_p_pageguid_n_noteguid";
var NOTE_CONTAINER_="content_sh_sheetguid_p_pageguid_n_noteguid";
//var PAGENOTE_CONTAINER_="pageNote_container_sh_sheetguid_p_pageguid";
var PAGENOTE_CONTAINER_="hncontainer_sh_sheetguid_p_pageguid";
var PAGETITLE="pageTitle";
//var PAGE_CONTAINER_GUID="page_container_guid";
var PAGE_CONTAINER_GUID="hncontainer_sh_sheetguid_p_pageguid";
var SHEETCONTAINER_BUTTONS="sheetContainer_buttons";
//var GUI_CONTENT="sheets_container";
var GUI_CONTENT ="hncontent";
var SHEETCONTENT_CONTAINER_SHEETGUID="sheetContent_container_sheetguid";
//var SHEETTITLE="sheetTitle";
var SHEETTITLE = "hntitle";

/**
 * Button ID for synchronizing data. 
 */
var SYNCHRONIZE_BUTTON_="synchronizeHnButton";
/**
 * Button ID for turning on/off HooverNotes visibility in main tab.
 */
var EYE_BUTTON_="toggleviewHnButton";
/**
 * Button ID for creating a new HooverNote.
 */
var NEWHOOVERNOTE_BUTTON_="newhoovernoteHnButton";
/**
 * Button ID for choosing sheet color.
 */
var COLORSHEET_BUTTON = "colorsheetHnButton";
/**
 * Button ID for getting help.
 */
var HELP_BUTTON = "helpHnButton";
/**
 *  Button ID for new new HooverSheet. 
 */
var NEWHOOVERSHEET_BUTTON="newhooversheetHnButton";

var TOGGLEHIGHLIGHTNOTE_BUTTON_="toggleHighlightNote_button_sh_sheetguid_p_pageguid_n_noteguid";
var TURNTOANNOTATENOTE_BUTTON="turnToAnnotateNote_button_sh_sheetguid_p_pageguid_n_noteguid";
var NEWSHEETDEF_BUTTON="newSheetDef_button";
var NEWSHEETDEFTITLE_INPUT="newSheetDefTitle_input";
var NEWSHEETDEF_CONTAINER="newSheetDef_container";
var MINIMIZE_BUTTON_="minimizePage_button_sh_sheetguid_p_pageguid";
var MAXIMIZE_BUTTON_="maximizePage_button_sh_sheetguid_p_pageguid";
var REMOVE_BUTTON_="removePage_button_sh_sheetguid_p_pageguid";
var GUID_LENGTH = 36;

// HTML
// Used for injecting HTML by substituting its placeholders.
/** HTML for the overall GUI. */
var SLIDE_HTML="<html><head><title>HooverNotes SlideBar</title><link href='http://hoovernotes.org/CSS/hoover.css' rel='stylesheet' type='text/css' /></head><body><div id='hooverNotesSlide_container' class='hooverNotesSlide_container'><div id='menu_container' class='menu_container'><div id='user_container' class='user_container'><div id='user_image' class='user_image'><img src='http://a1.twimg.com/profile_images/53241754/Marc_bigger.JPG' width='34px' alt='Your picture!' title='Your picture!' /></div><div id='user_name' class='user_name'>YOUR NAME</div></div><div id='menuContainer_buttons' class='button menuContainer_buttons'><div><img src='http://hoovernotes.org/IMG/new_sheet.png' id='newHooverSheet_button' alt='Create a new Sheet' title='Create a new Sheet' /></div></div></div><div id='hncontent' class='container sheets_container'></div></div></body></html>";
var FIREBUG_HTML = "<script><![CDATA[var firebug=document.createElement('script');firebug.setAttribute('src','http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js');document.body.appendChild(firebug);(function(){if(window.firebug.version){firebug.init();}else{setTimeout(arguments.callee);}})();void(firebug);]]></script>";

/** HTML for tags container */
var TAG_HTML="<div id='newTag_container' class='newTag_container'><input type='text' id='newTag_input' value='tag3' /><button id='newTag_button'>C</button><br /><span id='tag'>tag1</span>, <span id='tag'>tag2</span></div>";
/** HTML showing an input and controls for creating a new Sheet. */
var NEWSHEETDEF_HTML="<div id='newSheetDef_container'><input type='text' id='newSheetDefTitle_input' class='newSheetDefTitle_input_yellow' value='Untitled' /><button id='newSheetDef_button'>OK</button></div>";
/** HTML for creating a new sheet container. */
var SHEETCONTAINER_HTML="<div id='hncontainer_sh_sheetguid'class='hncontainer sheet_container'><div id='hncontrols_sh_sheetguid'class='hncontrols sheet_hncontrols sheetContent_container'><div id='hntitle_sh_sheetguid'class='hntitle sheet_hntitle sheetTitle'><div id='newSheetDef_container'><div id id='newSheetDefTitle_input' class='newSheetDefTitle_input_yellow'>subtitle</div><div id='sheetTitleButtons_sheetguid'class='button min_max_rem_buttons'><img src='http://hoovernotes.org/IMG/minim_yelow.png'id='minMaximizeHnButton_sh_sheetguid_p_pageguid'class='minimizeHnButton hnbutton button'alt='Minimize Sheet'title='Minimize Sheet' /><img src='http://hoovernotes.org/IMG/close_yelow.png'id='removeHnButton_sh_sheetguid_p_pageguid'class='removeHnButton hnbutton button'alt='Remove Sheet'title='Remove Sheet' /></div></div></div></div></div>";
/** HTML for creating a new page container. */
var PAGE_HTML="<div id='hncontainer_sh_sheetguid_p_pageguid' class='hncontainer page_hncontainer page_container'><div id='hncontrols_sh_sheetguid_p_pageguid' class='page_hncontrols hncontrols'><div id='hntitle_sh_sheetguid_p_pageguid' class='page_hntitle pageTitle'><a href='pageurl' target='_blank' class='pageTitle_link' alt='Open page in new tab'>pagetitlefocusedtab</a></div><div id='hnbuttons_sh_sheetguid_p_pageguid' class='page_hnbuttons buttons pageButtons'><img src='http://hoovernotes.org/IMG/link_black.png' id='linkHnButton_sh_sheetguid_p_pageguid' class='button openURLatTab_button' alt='Open the URL in a new tab' title='Open the URL in a new tab' /><img src='http://hoovernotes.org/IMG/minim_black.png' id='minimizeHnButton_sh_sheetguid_p_pageguid' class='button minimizePage_button' alt='Minimize the page s annotations' title='Minimize the page s annotations' /><img src='http://hoovernotes.org/IMG/close_black.png' id='removeHnButton_sh_sheetguid_p_pageguid' class='button removePage_button' alt='Remove the page s annotations' title='Remove the page s annotations' /></div></div><div id='hncontent_sh_sheetguid_p_pageguid' class='page_hncontent hncontent'></div></div>";
/** Common HTML for all notes. The notes content receives the actual 
 * type-dependent content. */
var NOTE_HTML="<div id='hncontainer_sh_sheetguid_p_pageguid_n_noteguid' class='hncontainer note_hncontainer'><div id='hncontrols_sh_sheetguid_p_pageguid_n_noteguid'><div id='hntitle_sh_sheetguid_p_pageguid_n_noteguid' class='note_hntitle'></div><div id='hnbuttons_sh_sheetguid_p_pageguid_n_noteguid' class='hnbuttons note_hnbuttons buttons note_buttons'><img src='http://hoovernotes.org/IMG/lapiz.png' id='toggleHighlightNote_button_sh_sheetguid_p_pageguid_n_noteguid' class='button toggleNote_button' alt='Toggle annotations' title='Toogle annotation' /><img src='http://hoovernotes.org/IMG/marcador.png' id='turnToAnnotateNote_button_sh_sheetguid_p_pageguid_n_noteguid' class='button annotateNote_button' alt='Edit annotation' title='Edit annotation' /><img src='http://hoovernotes.org/IMG/minim_black.png' id='minimizeHnButton_sh_sheetguid_p_pageguid_n_noteguid' class='button minimizeNote_button' alt='Minimize the page s annotations' title='Minimize the page s annotations' /><img src='http://hoovernotes.org/IMG/expand_black.png' id='maximizeHnButton_button_sh_sheetguid_p_pageguid_n_noteguid' class='button maximizeNote_button' alt='Expand the page s annotations' title='Expand the page s annotations' /><img src='http://hoovernotes.org/IMG/close_black.png' id='removeHnButton_sh_sheetguid_p_pageguid_n_noteguid' class='button removeNote_button' alt='Remove the page s annotations' title='Remove the page s annotations' /></div></div><div id='content_sh_sheetguid_p_pageguid_n_noteguid' class='hncontainer note_hncontainer noteContent_container'></div></div>";
/**  */
var MOVENOTE_HTML="<div id='content_sh_sheetguid_p_pageguid_n_noteguid'class='moveNoteContent'>initialvalue</div>";
var ANNOTATENOTE_HTML="<div id='annotateNoteContent_sh_sheetguid_p_pageguid_n_noteguid' class='annotateNoteContent'><textarea id='noteeditor_sh_sheetguid_p_pageguid_n_noteguid' class='textarea_note' name='editor'>initialvalue</textarea><br /><button id='noteeditor_button_sh_sheetguid_p_pageguid_n_noteguid'>OK</button></div>";
var HIGHLIGHTNOTE_HTML="<div id='highlightNoteContent_sh_sheetguid_p_pageguid_n_noteguid'class='highlightNoteContent'>initialvalue</div>";

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
    
    console.log("replaceIds: returns " + str);
    return str;
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
    console.log("replaceIDs: returns " + str);
    return str;
  }
  
  /**
   * Constructs an ID from a prefix and corresponding values.
   */
  this.assembleID = function (sheetId, pageId, noteId, idPrefix){
    var completeId = idPrefix;
    if (sheetId){
      completeId = completeId.concat(SHEETGUID_PRE);
      completeId = completeId.concat(sheetId);
      if (pageId){
        completeId = completeId.concat(PAGEGUID_PRE);
        completeId = completeId.concat(pageId);
        if (noteId){
          completeId = completeId.concat(NOTEGUID_PRE);
          completeId = completeId.concat(noteId);
        }   
      }
    }
    return completeId;
  }

  /**
   * 
   */
  this.extractId = function (idString, idName){
    var startPos = idString.indexOf(idName);
    var retVal = idString.substr(startPos + idName.length, GUID_LENGTH);
    console.log("extractId: " + idName + " > " + retVal);
    jetpack.notifications.show("extractId: " + idName + " > " + retVal);
    return retVal;
  };

  this.stripHtmlString = function (htmlString){
    // Should remove: style, input, button, forms, script (?)
    // TODO
  };
  
  this.loadLib = function (document, libUrl){
    console.log("Loading " + libUrl);
    jetpack.notifications.show("Loading " + libUrl);
    var script = document.createElementNS("http://www.w3.org/1999/xhtml", "script");
    script.src = libUrl;
    $(script).bind("load", function() {
      console.log(libUrl + " injected");
    });
    document.getElementsByTagName("head")[0].appendChild(script);
    console.log("Loaded " + libUrl);
    jetpack.notifications.show("Loaded " + libUrl);
  };
}();

//DATATYPES
/**
 * HooverSheet. Top-most container.
 */
function HooverSheet(title, user, language, shared, editable) {
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
  var pages;

  /**
   * Returns a <code>HooverPage</code> for the given URL.
   * 
   * If such a <code>HooverPage</code> doesn't exist yet, it is created.
   */
  this.getHooverPageForUrl = function (url, urlTitle){
    console.log("HooverSheet.getHooverPageForUrl");

    if (hnCtrl.activePage && (hnCtrl.activePage.pageUrl == url)){
      return hnCtrl.activePage;
    } else {
      var tmpPage;
      if (url == "http://en.wikipedia.org/wiki/"){
        console.log("Wikipedia, cabrón!");
        // TODO search the page and make it activePage
        return hnCtrl.activePage = new HooverPage (url, "Marica", null);
      } else {
        return null;
      }
    }

    console.log("HooverSheet.getHooverPageForUrl");
    if (pages){
      for (var p in pages){
        if (p.pageUrl == url){
          // TODO remove; should not be used anymore
          hnCtrl.activePage = p;
          console.log("HooverSheet.getHooverPageForUrl: URL found");
          return p;
        }
      }
    } else {
      // Create array for pages.
      console.log("HooverSheet.getHooverPageForUrl: creating new page array");
      pages = new Array();
    }
    var page = new HooverPage (url, urlTitle, null);
    // TODO remove; should not be used anymore
    hnCtrl.activePage = page;   
    console.log("HooverSheet.getHooverPageForUrl: adding new page");
    pages.push(page);
    return page;
  };
  
  this.addHooverPageForUrl = function (url, urlTitle){
    console.log("A joder el puto addHoverPageForUrl");
    return hnCtrl.activePage = new HooverPage (url, urlTitle, null);
  };
}

/* HooverNote */
function HooverNote(user, originalHtml, isHighlighted, color, annotation) {
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
  this.pageTitle = pageTitle;
  this.pageHtml = pageHtml;
  this.pageUrl = pageUrl;
  this.pageGuid = Utils.guid();

  /**
   * Creates a new note for this page and returns it.
   */
  this.addHooverNoteForPage = function(user, originalHtml, isHighlighted, color, annotation){
    console.log("addHooverNoteForPage: " + user + " - " + originalHtml);
    return hnCtrl.activeNote = new HooverNote (user, originalHtml, isHighlighted, color, annotation);
  };
}

/* User */
function User (userName, credential, imgURL){
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

  function minimize (idString){
    console.log("View.minimize() " + idString);

    // for the moment: pageNote_container
    var containerId = "pageNote_container";
    // get sheet id
    var sheetId = Utils.extractId(idString, "_sh_");
    var pageId = Utils.extractId(idString, "_p_");
    containerId = containerId + "_sh_" + sheetId + "_p_" + pageId;
    console.log("Container ID: " + containerId);
    jetpack.notifications.show("View.minimize() " + containerId);
    $("#" + containerId, this.slideBar.contentDocument).hide();
  };

  function maximize (idString){
    console.log("View.maximize() " + idString);
//    jetpack.notifications.show("View.maximize() " + idString);
//    // for the moment: pageNote_container
    var containerId = "pageNote_container";
    // get sheet id
    var sheetId = Utils.extractId(idString, "_sh_");
    var pageId = Utils.extractId(idString, "_p_");
    containerId = containerId + "_sh_" + sheetId + "_p_" + pageId;
    console.log("Container ID: " + containerId);
    jetpack.notifications.show("View.maximize() " + containerId);
    $("#" + containerId, this.slideBar.contentDocument).show();
  };

  this.remove = function (idString, askConfirmation){
    console.log("View.remove() " + idString);
    if (askConfirmation){
      // Ask for confirmation.
    }
    $("#" + idString, me.slideBar.contentDocument).remove();
  };

  function registerEvent (typeOfEvent, idStr, callback){
    if (me.slideBar){
      $("#" + idStr, me.slideBar.contentDocument).bind(typeOfEvent, callback);
    }
  };  
  
  function hide (idStr){
    jetpack.notifications.show("hiding " + idStr);
    $("#" + idStr, me.slideBar.contentDocument).hide();
  };
  
  function show (idStr){
    jetpack.notifications.show("showing " + idStr);
    $("#" + idStr, me.slideBar.contentDocument).show();
  };

  function appendElemToId (contentStr, idStr){
    var newElem = $(contentStr, me.slideBar.contentDocument);
    $("#" + idStr, me.slideBar.contentDocument).append(newElem);
  };

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
      jetpack.notifications.show("view.showSheet: " + sheet.title);
      
      console.log("view.showSheet: " + sheet.title);
      
      // TODO: check for existing sheet with the same name
      
      var htmlString = SHEETCONTAINER_HTML.replace(SHEETGUID_SUB, sheet.guid);
      htmlString = htmlString.replace(TITLE_SUB, sheet.title);
      
      appendElemToId(htmlString, GUI_CONTENT);
//      var sheetContainer = $(htmlString, hnView.slideBar.contentDocument);
//      $("#" + GUI_CONTENT, hnView.slideBar.contentDocument).append(sheetContainer);
      // Register events for the sheet-related buttons.
      //TODO move to init and out of container
      
    }
  };
  
  /**
   * Injects a new note into the active sheet. Please note: a new note is <i>always</i>
   * added for the page currently in display. 
   */
  this.showNote = function (sheetId, pageId, pageUrl, pageTitle, note, getPageHtml){
    console.log("view:showNote " + sheetId + "|" + pageId + "|" + note.noteGuid);
    
    // Look for the page container's content div. Create a blip for the note
    // and attach it as last child.
    ensurePageForFocusedTab();

    // If there is no blip yet, add it. Please note: 
    ensureNoteBlip(note);

    // Find note blip and add the note's content.
    injectAndRegisterNote(note);

    // Set the page's content, if not set yet.
    if (getPageHtml){
      var pageHtml = jetpack.tabs.focused.contentDocument.html();
      console.log(pageHtml);
      return pageHtml;
    }
  };
  
  
  var toggleHooverNotesVisibility = function (){
    jetpack.notifications.show("TODO: TOGGLE HOOVERNOTES VISIBILITY IN MAIN TAB");
  };
  
  // ENSURE functions
  // Ensure functions make sure that a certain GUI element that is needed for
  // further processing is present.
  
  /**
   * Paints a page container for the tab in focus, if not there yet.
   */
  function ensurePageForFocusedTab (){
    var url = jetpack.tabs.focused.contentWindow.location.href;
    var urlTitle = jetpack.tabs.focused.contentWindow.document.title;
    // Get the HooverPage object for this URL.
    if (hnCtrl.hasPage(url, urlTitle)){
      // TODO Focus on container for page.
    } else {
      // Paint container for page.
      var htmlString = PAGE_HTML.replace(SHEETGUID_SUB, hnCtrl.getActiveSheet().guid);
      htmlString = htmlString.replace(PAGEGUID_SUB, hnCtrl.activePage.pageGuid);
      // htmlString = htmlString.replace(/pagetitle/g,
      // hnCtrl.activePage.pageTitle);
      var pagetitlefocusedtab = hnCtrl.activePage.pageTitle.substr(0, 50);
      // if (hnCtrl.activepage.PageTitle.length > 50)
      // pagetitlefocusedtab = pagetitlefocusedtab+"...";
      htmlString = htmlString.replace(/pagetitlefocusedtab/g, pagetitlefocusedtab);
      htmlString = htmlString.replace(/pageurl/g, hnCtrl.activePage.pageUrl);
      var pageContainer = $(htmlString, hnView.slideBar.contentDocument);
      $("#" + SHEET_CONTAINER_ + hnCtrl.getActiveSheet().guid, hnView.slideBar.contentDocument).append(pageContainer);
      registerMinMaxRemEvents(true, true, false);
    } 
  }

  // UPDATE functions
  // Update functions update existing GUI elements with new data.
  /**
   * Updates user information.
   */
  me.updateUser = function(user){
    console.log("view:updateUser");
  };
  
  /**
   * Updates the slide bar for a new note without original text.
   * @param alertMessage
   *      Can be used to deliver a message to the user.
   * @return
   */
  var updateGUIForNewNote = function (alertMessage, originalHtml, isHighlighted, color, annotation) {
    // Get URL and URL title from tab.
    console.log("view:updateGUIForNewNote: " + alertMessage);
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
    // console.log("handleNewSheet getting title");
    // extract data from the form
    var title = $("#" + NEWSHEETDEFTITLE_INPUT, me.slideBar.contentDocument).val();
    console.log("handleNewSheet title:" + title);
    if (!title){
      title="untitled";
    }
    //hnCtrl.getActiveSheet() = new HooverSheet(title, hnCtrl.user, "en", true, true);
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
  me.init = function(){
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
      
      registerEvent("click", NEWHOOVERNOTE_BUTTON_, function(){
        updateGUIForNewNote(null);
        me.control.addNewNote();
      });
      
      registerEvent("click", SYNCHRONIZE_BUTTON_, function(){
        me.control.synchronizeData();
      });
      
      registerEvent("click", EYE_BUTTON_, function(){
        jetpack.notifications.show("TODO:eye");
      });
      
      registerEvent("click", HELP_BUTTON, function(e){
        jetpack.notifications.show("TODO: HELP");
      });
      
      registerEvent("click", COLORSHEET_BUTTON, function(){
        jetpack.notifications.show("TODO: COLORSHEET");
      });
      
         // Register onclick events for buttons:
      // - new sheet
      registerEvent("click", NEWHOOVERSHEET_BUTTON, function() {
        me.showSheet(null);
      });
      
      // Create elem for defining new sheets and hide it.
      appendElemToId (NEWSHEETDEF_HTML, GUI_CONTENT);
      registerEvent("click", NEWSHEETDEF_BUTTON, function(){
        handleNewSheetData();
      });
      
      // As menus are working, we don't need 3 different drags and drops.
    // Instead, there will only be one - highlighting by default.
    // $(slide.contentDocument, "#" + HNCONTENT_)
    me.slideBar.contentDocument.getElementById(HNCONTENT_).addEventListener("dragover",
        function(e) {
      e.preventDefault();
    }, true);

//    $(slide.contentDocument, "#" + HNCONTENT_).addEventListener("drop",
    me.slideBar.contentDocument.getElementById(HNCONTENT_).addEventListener("drop",
        function(e) {
      dropToSheet(e);
    }, true);
      
      hide(NEWSHEETDEF_CONTAINER);
      me.updateUser(hnCtrl.user);
    }
  };
}

/**
 * 
 */
function HooverNotesController(){ 
  var me = this;
  
  /* Gives access to the view. */
  me.view;
  
  /**
   * Gives access to the storage. Should be set according to user settings. 
   */
  me.storage = new HooverNotesStorage();
  /* Currently logged in user. */
  me.user;
  /* Sheet in use. */
  me.activeSheet=null;
  // /me.oldActiveSheet=null;
  /* Page in use. */
  me.activePage = null;
  /* Note in use. */
  me.activeNote = null;

  /**
   * Array and storage of the user' sheets and notes of each sheet. The
   * topmost sheet is the one currently in display.
   */
  me.sheetsArray=null;

  /**
   * Receives a username and credentials and checks these against an
   * authentication service. Returns true or false depending on the result of
   * the authentication, and sets me.user accordingly.
   * 
   * Note: doesn't return the user.
   */
  me.authenticateUser = function(username, credentials){
    console.log("authenticateUser");
    me.user = new User("marcpous", "password", 
    "http://a1.twimg.com/profile_images/53241754/Marc_bigger.JPG");
    me.user.logged = true;
//    if (callback){callback();}
    return true;
  }

  /**
   * Initializes the app. Shall be called at startup.
   */
  me.init = function(){
    console.log("init");
    me.authenticateUser(null, null);

    if (!me.user || !me.user.logged){
      // For the moment, we assume that the user has been authenticated
      // view.openLoginWindow(me.authenticateUser);
      jetpack.notifications.show("User not authenticated");
      return;
    } else {
      me.initAuthenticatedUser();
    }
  };

  me.initAuthenticatedUser = function(){
    console.log("initAuthenticatedUser");
    me.view.init();
    if (me.user && me.user.logged){
      // Get the sheets from storage.
      me.sheetsArray = me.storage.getHooverSheets(me.user);
      // Pass the sheets plus the ID of the active sheet.
      if (me.sheetsArray && me.sheetsArray.length > 0){
        me.activeSheet = me.sheetsArray[0];
        for (var i = 1; i < me.sheetsArray.length; i++){
          me.view.showSheet(sheet); // 4a) initializes
        }
        me.view.showSheet(me.sheetsArray[0]);
      } else {
        me.view.showSheet(null); 
      }
    } else {
      jetpack.notifications.show("user: " + user + ", user is logged " + me.user.logged);
      return;
    }
  }

  /**
   * To be called when adding a new sheet.
   */
  me.addNewSheet = function(title, language, shared, editable){
    console.log("ctrl.addNewSheet: " + title);
    // view.updateGUIForNewSheet(null);
    if (!me.sheetsArray) {
      me.sheetsArray = new Array();
    } else {
      for (var sh in me.sheetsArray){
        // If there is a sheet with the same title, return false for error.
        if (sh.title == title){
          return false;
        }
      }
    }
    var sheet = new HooverSheet(title, me.user, language, shared, editable);
    me.activeSheet = sheet;
    
    // Update active sheet.
    me.sheetsArray.splice(0, 0, sheet);
    
    // Sync.
    me.storage.syncSheet(sheet);
    me.view.showSheet(sheet);
  };
  
  /**
   * Returns true if a page for this URL exists in the currently active sheet.
   */
  me.hasPage = function (url, urlTitle){
    // Can only go into active sheet.
    var sheet = me.getActiveSheet();
    var page = sheet.getHooverPageForUrl(url, urlTitle);
    if (page){
      return true;
    } else {
      return false;
    }
  } 
  
  me.addNewNote = function(originalHtml, isHighlighted, color, annotation, url, urlTitle){
    if (me.sheetsArray && me.sheetsArray > 0){
      console.log("ctrl.addNewNote: " + title);

      var note = HooverNote(me.user, originalHtml, isHighlighted, color, annotation);
      
      // Can only go to active sheet. However, within the active sheet, it can go to any page.
      // The URL uniquely identifies a page.
      var sheet = me.sheetsArray[0];
      
      // Get the page to which the note should go.
      var page = sheet.getHooverPageForUrl(url, urlTitle);
      var note = page.addHooverNoteForPage(me.user, originalHtml, isHighlighted, color, annotation);
      
      if (page.pageHtml){
        me.view.showNote(sheet.guid, page.pageGuid, page.pageUrl, page.pageTitle, note, false);
      } else {
        page.pageHtml = me.view.showNote(sheet.guid, page.pageGuid, page.pageUrl, page.pageTitle, note, true);
      }
      // Sync.
      me.storage.syncPage(sheet.guid, page);
      me.storage.syncNote(sheet.guid, page.pageGuid, note);
    } else {
      alert("ERROR: Trying to add a note without sheets/active sheet!");
    }
  };

  me.dropToSheet = function(containerid, event){
    // Extract data.
  };

  me.getActiveSheet = function (){
    if (me.sheetsArray && me.sheetsArray.length > 0){
      console.log("active sheet: " + me.sheetsArray[0].title);
      return me.sheetsArray[0];
    }
    console.log("ctrl.sheetsArray = null or length = 0");
    return null;
  };
  
  me.synchronizeData = function(){
    me.storage.syncAll(me.sheetsArray);
  };
}

function HooverNotesStorage(){
  var me = this;
  /**
   * Obtains the sheets for this user from storage.
   */
  me.getHooverSheets = function(user){
    console.log("getHooverSheets");
  };
  /**
   * Synchronizes a sheet with the permanent storage.
   */
  me.syncSheet = function(sheet){
    console.log("syncSheet: " + sheet);
  };
  /**
   * Synchronizes a page with the permanent storage.
   */
  me.syncPage = function(sheetId, page){
    console.log("syncPage: " + sheetId + "|" + page);
  };
  /**
   * Synchronizes a note with the permanent storage.
   */
  me.syncNote = function(sheetId, pageId, note){
    console.log("syncNote: " + sheetId + "|" + pageId + "|" + note);
  };
  
  me.syncAll = function(sheetsArray){
    jetpack.notifications.show("TODO: SYNCHRONIZING ALL DATA");
  };
}


//GLOBAL VARIABLES
var hnCtrl;
var hnView;

/*
 * ToDo: - close note/sheet - minimize note/sheet - open a new tab with the URL
 * annotated - insert tag - change the note type (move --> highlight --> move) -
 * edit note - delete note/sheet - socialize - syncronize - logout
 * 
 * ....
 * 
 */

/**
 * Registers events for minimizing, maximizing and removing a blip.
 * 
 * @param sheetId
 *            Boolean; if true, replace the sheetId.
 * @param pageId
 *            Boolean; if true, replace the pageId.
 * @param noteId
 *            Boolean; if true, replace the noteId.
 * @returns
 */
function registerMinMaxRemEvents(sheetId, pageId, noteId){
  // Register events for page buttons
  var buttonStr = Utils.replaceIds(sheetId, pageId, noteId, MINIMIZE_BUTTON_);
  $("#" + buttonStr, hnView.slideBar.contentDocument).click(function(){
    console.log("TODO: MINIMIZEPAGE");
//    jetpack.notifications.show("Minimizing: " + $(this).html());
    jetpack.notifications.show("Minimizing: " + buttonStr);
//    $(this).slideToggle("slow");
    hnView.minimize(buttonStr);
  });
  var buttonStr = Utils.replaceIds(sheetId, pageId, noteId, MAXIMIZE_BUTTON_);
  $("#" + buttonStr, hnView.slideBar.contentDocument).click(function(){
    console.log("TODO: MAXIMIZEPAGE");
    jetpack.notifications.show("Maximizing: " + buttonStr);
//    $(this).slideToggle("slow");
    // TODO SEARCH EXACT DIV TO TOGGLE
    hnView.maximize(buttonStr);
  });
  var buttonStr = Utils.replaceIds(sheetId, pageId, noteId, REMOVE_BUTTON_);
  $("#" + buttonStr, hnView.slideBar.contentDocument).click(function(){
    console.log("TODO: REMOVEPAGE");
    jetpack.notifications.show("Removing: " + buttonStr);
    // TODO SEARCH EXACT DIV TO REMOVE AFTER CONFIRMING
  });
}

/**
 * Ensures that there is a HooverPage object and blip for the focused tab.
 * 
 * @returns
 */
function ensurePageForFocusedTab (){
  var url = jetpack.tabs.focused.contentWindow.location.href;
  var urlTitle = jetpack.tabs.focused.contentWindow.document.title;
  // Get the HooverPage object for this URL.
  var hooverPageForUrl = hnCtrl.getActiveSheet().getHooverPageForUrl(url, urlTitle);
  if (!hooverPageForUrl){
    hnCtrl.getActiveSheet().addHooverPageForUrl(url, urlTitle);
    // Paint container for page.
    var htmlString = PAGE_HTML.replace(/sheetguid/g, hnCtrl.getActiveSheet().guid);
    htmlString = htmlString.replace(/pageguid/g, hnCtrl.activePage.pageGuid);
    // htmlString = htmlString.replace(/pagetitle/g,
    // hnCtrl.activePage.pageTitle);
    var pagetitlefocusedtab = hnCtrl.activePage.pageTitle.substr(0, 50);
    // if (hnCtrl.activepage.PageTitle.length > 50)
    // pagetitlefocusedtab = pagetitlefocusedtab+"...";
    htmlString = htmlString.replace(/pagetitlefocusedtab/g, pagetitlefocusedtab);
    htmlString = htmlString.replace(/pageurl/g, hnCtrl.activePage.pageUrl);
    var pageContainer = $(htmlString, hnView.slideBar.contentDocument);
    $("#" + SHEET_CONTAINER_ + hnCtrl.getActiveSheet().guid, hnView.slideBar.contentDocument).append(pageContainer);
    registerMinMaxRemEvents(true, true, false);
  } else {
    // Focus on container for page.
    // TODO
  }
}

/**
 * Creates a div corresponding to the new note and appends it to the slide bar.
 * 
 * @returns
 */
function ensureNoteBlip (originalHtml, isHighlighted, color, annotation){
  console.log("ensureNoteBlip: " + originalHtml);
  hnCtrl.activePage.addHooverNoteForPage(hnCtrl.user, originalHtml, isHighlighted, color, annotation);
  var htmlString = Utils.replaceIds(true, true, true, NOTE_HTML);
  var pageNoteContainer = $(htmlString, hnView.slideBar.contentDocument);
  var idStr = Utils.replaceIds(true, true, true, PAGENOTE_CONTAINER_);
  $("#" + idStr, hnView.slideBar.contentDocument).append(pageNoteContainer);

  // Register common events.
  registerMinMaxRemEvents(true, true, true);
}

/**
 * Injects the div for the active note into the slide bar; here, a Move note.
 * 
 * @returns
 */
function injectAndRegisterNote(){
  console.log("injectAndRegisterNote: " + hnCtrl.activeNote);
  jetpack.notifications.show("injectAndRegisterNote: " + hnCtrl.activeNote);
  // 3) Inject type-specific content into note blip.

  // Look for noteContent_container.
  var noteContentContainerId = Utils.replaceIds(true, true, true, NOTECONTENT_CONTAINER_);

  jetpack.notifications.show(hnCtrl.activeNote.getType());

  var htmlString;
  if (hnCtrl.activeNote.getType() == ANNOTATED_NOTE){
    jetpack.notifications.show("ANNOTATE");
    htmlString = Utils.replaceIds(true, true, true, ANNOTATENOTE_HTML);
  } else {
    if (hnCtrl.activeNote.getType() == MOVED_NOTE){
      jetpack.notifications.show("MOOOOVE");
      htmlString = Utils.replaceIds(true, true, true, MOVENOTE_HTML);
    } else {
      jetpack.notifications.show("HIGHLIGHT");
      htmlString = Utils.replaceIds(true, true, true, HIGHLIGHTNOTE_HTML);
      // Change the tab content so that it is highlighted.
      if (jetpack.selection.html){
        jetpack.selection.html = "<mark style='background:yellow'>" + jetpack.selection.html + "</mark>";
        hnCtrl.activeNote.noteOriginalHtml = "<mark style='background:yellow'>" + jetpack.selection.html + "</mark>";
      }
    }
  }
  htmlString = htmlString.replace(/initialvalue/g, hnCtrl.activeNote.noteOriginalHtml);
  var noteBlip = $(htmlString, hnView.slideBar.contentDocument);
  $("#" + noteContentContainerId, hnView.slideBar.contentDocument).append(noteBlip);
  // TODO: REGISTER ANNOTATE HANDLER FOR CLOSING EDITOR
}

/**
 * Updates the slide bar for a new note without original text.
 * @param alertMessage
 *      Can be used to deliver a message to the user.
 * @param originalHtml
 *          The HTML code for which a HooverNote is to be made.
 * @param isHighlighted
 *          <code>true</code> if highlighting is desired.
 * @param color
 *          Color of highlighting, if any.
 * @param annotation
 *          Annotation.
 * @return
 */
function updateGUIForNewNote(alertMessage, originalHtml, isHighlighted, color, annotation) {
  // Get URL and URL title from tab.
  console.log("updateGUIForNewNote: " + alertMessage);
  jetpack.notifications.show("updateGUIForNewNote: " + alertMessage);
  if (alertMessage){
    jetpack.notifications.show(alertMessage);
  }

  // 1) Ensure active page for focused tab.
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



function handleNewNoteData(content, originalHtml) {

  // extract data from the form
  // var content = $(slide.contentDocument.editor).getData("text/plain");
  activeSheet.note.push(newNote(content));
  editor.close();

  updateGUIFromSheet(activeSheet);
}

//------------------- MOVE, HIGHLIGHT, ANNOTATE -----------------
function dropToSheet(event) {
  // Analyze content and create a new highlighted note.
  jetpack.notifications.show("dropToSheet");
}

function dragContent(content, highlight) {

  if (highlight) {
    handleNewNoteData(content.highlighted, content);
  } else {
    // move
    /*
     * if (mime == 'video') else if (mime == 'image') else if (mime ==
     * 'map') else if (mime == 'text')
     */
    handleNewNoteData(content, content);
  }

}

function dragContentAnnotation(content) {

  // 1) abrir editor
  // 2) wait user' content
  // 3) register the eventHandler
  $("#confirmNewNoteButton", slide.contentDocument).click(
      function(e) {
        handleNewNoteData($(slide.contentDocument.editor).getData(
        "text/plain"), content);
      });
}

/**
 * Accepts text and html and creates a corresponding blip.
 * 
 * @param text
 * @param html
 * @returns
 */
function moveAsNote(text, html){
  // Create new note
  // TODO:CONTINUE
  if (!text && !html){
    updateGUIForNewNote("No valid text selected!", null, false, null, null);
  } else {
    updateGUIForNewNote(null, html, false, null, null);
  }
}

function highlightAsNote(text, html){
  // Create new note
  // TODO:CONTINUE
  if (!text && !html){
    updateGUIForNewNote("No valid text selected!", null, false, null, null);
  } else {
    updateGUIForNewNote(null, html, true, "yellow", null);
  }
}

function annotateAsNote(html){
  if (!html){
    updateGUIForNewNote("No valid text selected!", null, false, null, null);
  } else {
    updateGUIForNewNote(null, html, false, null, true);
  }
}

/* */
jetpack.menu.context.page.beforeShow = function(menu, context) {
  // Or jetpack.menu.context.page.on("a[href]").beforeShow, etc.
  menu.reset();
  var subMenu = jetpack.Menu();
  subMenu.add( {
    label : "New note",
    command : function(menuitem) {
    updateGUIForNewNote(null);
  }
  });
  if (jetpack.selection.html) {
    subMenu.add(null);
    subMenu.add( {
      label : "Move",
      command : function(menuitem) {
      moveAsNote(jetpack.selection.text, jetpack.selection.html);
    }
    });
    subMenu.add( {
      label : "Highlight",
      command : function(menuitem) {
      highlightAsNote(jetpack.selection.text, jetpack.selection.html);
    }
    });
    subMenu.add( {
      label : "Annotate",
      command : function(menuitem) {
      annotateAsNote(jetpack.selection.html);
    }
    });
  }
  menu
  .add( {
    label : "Ho(o)verNotes",
    icon : "http://hoovernote.marcpous.com/wp-content/uploads/2009/12/hoovernotes_logo_small.jpg",
    menu : subMenu
  });
};

/* Initializing the slide bar and registering for events */
jetpack.slideBar
.append( {
//  html : SLIDE_HTML,
  html : <html>
    <head>
      <title>HooverNotes SlideBar</title>
      <link href='http://hoovernotes.org/CSS/hoover.css'
            rel='stylesheet'
            type='text/css' />
    </head>
    <body>
      <div id='hooverNotesSlide_container'
           class='hooverNotesSlide_container'>
        <div id='menu_container'
             class='menu_container'>
          <div id='user_container'
               class='user_container'>
            <div id='user_image'
                 class='user_image'>
              <img src='http://a1.twimg.com/profile_images/53241754/Marc_bigger.JPG'
                   width='34px'
                   alt='Your picture!'
                   title='Your picture!' />
            </div>
            <div id='user_name'
                 class='user_name'>YOUR NAME</div>
          </div>
          <div id='menuContainer_buttons'
               class='button menuContainer_buttons'>
            <div>
              <img src='http://hoovernotes.org/IMG/new_sheet.png'
                   id='newhooversheetHnButton'
                   alt='Create a new Sheet'
                   title='Create a new Sheet' />
            </div>
          </div>
        </div>
  <div id='hnbuttons_sh_sheetguid'
       class='hnbuttons sheet_hnbuttons buttons sheetContainer_buttons'>
    <img src='http://hoovernotes.org/IMG/new_note.png'
         alt='New Note'
         id='newhoovernoteHnButton'
         class='button newHooverNote_button' />
    <img src='http://hoovernotes.org/IMG/separador_bot.png' />
    <img src='http://hoovernotes.org/IMG/eye.png'
         alt='Toggle'
         id='toggleviewHnButton'
         class='button eye_button' />
    <img src='http://hoovernotes.org/IMG/separador_bot.png' />
    <img src='http://hoovernotes.org/IMG/syncro.png'
         alt='Synchronize'
         id='synchronizeHnButton'
         class='button synchronize_button' />
    <img src='http://hoovernotes.org/IMG/separador_bot.png' />
    <img src='http://hoovernotes.org/IMG/color2.png'
         alt='Color'
         id='colorsheetHnButton'
         class='button colorsheet_button' />
    <img src='http://hoovernotes.org/IMG/separador_bot.png' />
    <img src='http://hoovernotes.org/IMG/help.png'
           alt='Color'
           id='helpHnButton'
           class='button colorsheet_button' />
  </div>
        <div id='hncontent'
             class='container sheets_container'></div>
      </div>
    </body>
    <script>
      <![CDATA[var firebug=document.createElement('script');firebug.setAttribute('src','http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js');document.body.appendChild(firebug);(function(){if(window.firebug.version){firebug.init();}else{setTimeout(arguments.callee);}})();void(firebug);]]>
  </script>
  </html>,
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