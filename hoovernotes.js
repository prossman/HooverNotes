// IMPORTS
jetpack.future.import("slideBar");
jetpack.future.import("selection");
jetpack.future.import("storage.simple");
jetpack.future.import("menu");

// CONSTANTS
/* Note types. */
const HIGHLIGHTED_NOTE = "HIGHLIGHTED_NOTE";
const MOVED_NOTE = "MOVED_NOTE";
const ANNOTATED_NOTE = "ANNOTATED_NOTE";
const SLIDEBAR_WIDTH = 800;
const BASE_URL = "http://github.com/prossman/HooverNotes/raw/master/";

var _ID_STRING="_sh_sheetguid_p_pageguid_n_noteguid";
var HNCONTAINER_ = "hncontainer";
var HNCONTENT_ = "hncontent";
var HNCONTROLS_ = "hncontrols";

// GUI IDS
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
/* Button for new new HooverSheet. */
var NEWHOOVERSHEET_BUTTON="newHooverSheet_button";
var EYE_BUTTON_="eye_button_";
var MAXIMIZENOTE_BUTTON_="maximizeNote_button_sh_sheetguid_p_pageguid_n_noteguid";
var MENUCONTAINER_BUTTONS="menuContainer_buttons";
var MINIMIZENOTE_BUTTON_="minimizeNote_button_sh_sheetguid_p_pageguid_n_noteguid";
var NEWHOOVERNOTE_BUTTON_="newHooverNote_button_";
var NEWHOOVERSHEET_BUTTON="newHooverSheet_button";
//var NOTECONTENT_CONTAINER_="noteContent_container_sh_sheetguid_p_pageguid_n_noteguid";
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
var SYNCHRONIZE_BUTTON_="synchronize_button_";
var TOGGLEHIGHLIGHTNOTE_BUTTON_="toggleHighlightNote_button_sh_sheetguid_p_pageguid_n_noteguid";
var TURNTOANNOTATENOTE_BUTTON="turnToAnnotateNote_button_sh_sheetguid_p_pageguid_n_noteguid";
var NEWSHEETDEF_BUTTON="newSheetDef_button";
var NEWSHEETDEFTITLE_INPUT="newSheetDefTitle_input";
var NEWSHEETDEF_CONTAINER="newSheetDef_container";
var MINIMIZE_BUTTON_="minimizePage_button_sh_sheetguid_p_pageguid";
var MAXIMIZE_BUTTON_="maximizePage_button_sh_sheetguid_p_pageguid";
var REMOVE_BUTTON_="removePage_button_sh_sheetguid_p_pageguid";
var GUID_LENGTH = 36;
/**
 * HTML for the overall GUI.
 */
var SLIDE_HTML="<html><head><title>HooverNotes SlideBar</title><link href='http://hoovernotes.org/CSS/hoover.css' rel='stylesheet' type='text/css' /></head><body><div id='hooverNotesSlide_container' class='hooverNotesSlide_container'><div id='menu_container' class='menu_container'><div id='user_container' class='user_container'><div id='user_image' class='user_image'><img src='http://a1.twimg.com/profile_images/53241754/Marc_bigger.JPG' width='34px' alt='Your picture!' title='Your picture!' /></div><div id='user_name' class='user_name'>YOUR NAME</div></div><div id='menuContainer_buttons' class='button menuContainer_buttons'><div><img src='http://hoovernotes.org/IMG/new_sheet.png' id='newHooverSheet_button' alt='Create a new Sheet' title='Create a new Sheet' /></div></div></div><div id='hncontent' class='container sheets_container'></div></div></body></html>";

var FIREBUG_HTML = "<script><![CDATA[var firebug=document.createElement('script');firebug.setAttribute('src','http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js');document.body.appendChild(firebug);(function(){if(window.firebug.version){firebug.init();}else{setTimeout(arguments.callee);}})();void(firebug);]]></script>";
/**
 * 
 */
var TAG_HTML="<div id='newTag_container' class='newTag_container'><input type='text' id='newTag_input' value='tag3' /><button id='newTag_button'>C</button><br /><span id='tag'>tag1</span>, <span id='tag'>tag2</span></div>";

/**
 * HTML showing an input and controls for creating a new Sheet.
 */
var NEWSHEETDEF_HTML="<div id='newSheetDef_container'><input type='text' id='newSheetDefTitle_input' class='newSheetDefTitle_input_yellow' value='Untitled' /><button id='newSheetDef_button'>Create</button><div id='sheetTitleButtons_sheetguid' class='button min_max_rem_buttons'><img src='http://hoovernotes.org/IMG/minim_yelow.png' id='minimizePage_button_sh_sheetguid_p_pageguid' class='minimizePage_button' alt='Minimize Sheet' title='Minimize Sheet' /><img src='http://hoovernotes.org/IMG/close_yelow.png' id='removePage_button_sh_sheetguid_p_pageguid' class='removePage_button' alt='Remove Sheet' title='Remove Sheet' /></div></div>";
/**
 * HTML to be injected when creating a new sheet, corresponding to its container.
 */
var SHEETCONTAINER_HTML_OLD="<div id='hncontainer_sh_sheetguid' class='hncontainer sheet_container'><div id='hncontrols_sh_sheetguid' class='hncontrols sheet_hncontrols sheetContent_container'><div id='hntitle_sh_sheetguid' class='hntitle sheet_hntitle sheetTitle'></div><div id='hnbuttons_sh_sheetguid' class='hnbuttons sheet_hnbuttons buttons sheetContainer_buttons'><img src='http://hoovernotes.org/IMG/new_note.png' alt='New Note' id='newHooverNote_button_sheetguid' class='button newHooverNote_button' /><img src='http://hoovernotes.org/IMG/separador_bot.png' /><img src='http://hoovernotes.org/IMG/eye.png' alt='Toggle' id='eye_button_sheetguid' class='button eye_button' /><img src='http://hoovernotes.org/IMG/separador_bot.png' /><img src='http://hoovernotes.org/IMG/syncro.png' alt='Synchronize' id='synchronize_button_sheetguid' class='button synchronize_button' /><img src='http://hoovernotes.org/IMG/separador_bot.png' /><img src='http://hoovernotes.org/IMG/color2.png' alt='Color' id='colorsheet_button_sheetguid' class='button colorsheet_button' /><img src='http://hoovernotes.org/IMG/separador_bot.png' /><img src='http://hoovernotes.org/IMG/help.png' alt='Color' id='colorsheet_button_sheetguid' class='button colorsheet_button' /></div></div></div>";
var SHEETCONTAINER_HTML="<div id='hncontainer_sh_sheetguid' class='hncontainer sheet_container'><div id='hncontrols_sh_sheetguid' class='hncontrols sheet_hncontrols sheetContent_container'><div id='hntitle_sh_sheetguid' class='hntitle sheet_hntitle sheetTitle'><div id='newSheetDef_container'><input type='text' id='newSheetDefTitle_input' class='newSheetDefTitle_input_yellow' value='Untitled' /><button id='newSheetDef_button'>Create</button><div id='sheetTitleButtons_sheetguid' class='button min_max_rem_buttons'><img src='http://hoovernotes.org/IMG/minim_yelow.png' id='minimizePage_button_sh_sheetguid_p_pageguid' class='minimizePage_button' alt='Minimize Sheet' title='Minimize Sheet' /><img src='http://hoovernotes.org/IMG/close_yelow.png' id='removePage_button_sh_sheetguid_p_pageguid' class='removePage_button' alt='Remove Sheet' title='Remove Sheet' /></div></div></div><div id='hnbuttons_sh_sheetguid' class='hnbuttons sheet_hnbuttons buttons sheetContainer_buttons'><img src='http://hoovernotes.org/IMG/new_note.png' alt='New Note' id='newHooverNote_button_sheetguid' class='button newHooverNote_button' /><img src='http://hoovernotes.org/IMG/separador_bot.png' /><img src='http://hoovernotes.org/IMG/eye.png' alt='Toggle' id='eye_button_sheetguid' class='button eye_button' /><img src='http://hoovernotes.org/IMG/separador_bot.png' /><img src='http://hoovernotes.org/IMG/syncro.png' alt='Synchronize' id='synchronize_button_sheetguid' class='button synchronize_button' /><img src='http://hoovernotes.org/IMG/separador_bot.png' /><img src='http://hoovernotes.org/IMG/color2.png' alt='Color' id='colorsheet_button_sheetguid' class='button colorsheet_button' /><img src='http://hoovernotes.org/IMG/separador_bot.png' /><img src='http://hoovernotes.org/IMG/help.png' alt='Color' id='colorsheet_button_sheetguid' class='button colorsheet_button' /></div></div></div>";
/**
 * HTML to be injected when creating a new page, correspondig to its container.
 */
var PAGE_HTML="<div id='hncontainer_sh_sheetguid_p_pageguid' class='hncontainer page_hncontainer page_container'><div id='hncontrols_sh_sheetguid_p_pageguid' class='page_hncontrols hncontrols'><div id='hntitle_sh_sheetguid_p_pageguid' class='page_hntitle pageTitle'><a href='pageurl' target='_blank' class='pageTitle_link' alt='Open page in new tab'>pagetitlefocusedtab</a></div><div id='hnbuttons_sh_sheetguid_p_pageguid' class='page_hnbuttons buttons pageButtons'><img src='http://hoovernotes.org/IMG/link_black.png' id='linkHnButton_sh_sheetguid_p_pageguid' class='button openURLatTab_button' alt='Open the URL in a new tab' title='Open the URL in a new tab' /><img src='http://hoovernotes.org/IMG/minim_black.png' id='minimizeHnButton_sh_sheetguid_p_pageguid' class='button minimizePage_button' alt='Minimize the page s annotations' title='Minimize the page s annotations' /><img src='http://hoovernotes.org/IMG/close_black.png' id='removeHnButton_sh_sheetguid_p_pageguid' class='button removePage_button' alt='Remove the page s annotations' title='Remove the page s annotations' /></div></div><div id='hncontent_sh_sheetguid_p_pageguid' class='page_hncontent hncontent'></div></div>";
/**
 * Common HTML for all notes. The notes content receives the actual type-dependent content.
 */
var NOTE_HTML="<div id='hncontainer_sh_sheetguid_p_pageguid_n_noteguid' class='hncontainer note_hncontainer'><div id='hncontrols_sh_sheetguid_p_pageguid_n_noteguid'><div id='hntitle_sh_sheetguid_p_pageguid_n_noteguid' class='note_hntitle'></div><div id='hnbuttons_sh_sheetguid_p_pageguid_n_noteguid' class='hnbuttons note_hnbuttons buttons note_buttons'><img src='http://hoovernotes.org/IMG/lapiz.png' id='toggleHighlightNote_button_sh_sheetguid_p_pageguid_n_noteguid' class='button toggleNote_button' alt='Toggle annotations' title='Toogle annotation' /><img src='http://hoovernotes.org/IMG/marcador.png' id='turnToAnnotateNote_button_sh_sheetguid_p_pageguid_n_noteguid' class='button annotateNote_button' alt='Edit annotation' title='Edit annotation' /><img src='http://hoovernotes.org/IMG/minim_black.png' id='minimizeHnButton_sh_sheetguid_p_pageguid_n_noteguid' class='button minimizeNote_button' alt='Minimize the page s annotations' title='Minimize the page s annotations' /><img src='http://hoovernotes.org/IMG/expand_black.png' id='maximizeHnButton_button_sh_sheetguid_p_pageguid_n_noteguid' class='button maximizeNote_button' alt='Expand the page s annotations' title='Expand the page s annotations' /><img src='http://hoovernotes.org/IMG/close_black.png' id='removeHnButton_sh_sheetguid_p_pageguid_n_noteguid' class='button removeNote_button' alt='Remove the page s annotations' title='Remove the page s annotations' /></div></div><div id='content_sh_sheetguid_p_pageguid_n_noteguid' class='hncontainer note_hncontainer noteContent_container'></div></div>";

var MOVENOTE_HTML="<div id='content_sh_sheetguid_p_pageguid_n_noteguid'class='moveNoteContent'>initialvalue</div>";
var ANNOTATENOTE_HTML="<div id='annotateNoteContent_sh_sheetguid_p_pageguid_n_noteguid' class='annotateNoteContent'><textarea id='noteeditor_sh_sheetguid_p_pageguid_n_noteguid' class='textarea_note' name='editor'>initialvalue</textarea><br /><button id='noteeditor_button_sh_sheetguid_p_pageguid_n_noteguid'>OK</button></div>";

var HIGHLIGHTNOTE_HTML="<div id='highlightNoteContent_sh_sheetguid_p_pageguid_n_noteguid'class='highlightNoteContent'>initialvalue</div>";

/**
 * Encapsulates different utilities.
 * @returns {Utils}
 */
function Utils(){
	function S4() {
	    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	this.guid = function (){
	    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	};
	this.replaceIds = function (setSheetId, setPageId, setNoteId, rawId){
	    if (rawId){
	        if (setSheetId && hooverNotesGui.activeSheet){
	          rawId = rawId.replace(/sheetguid/g, hooverNotesGui.activeSheet.guid);
	        }
	        if (setPageId && hooverNotesGui.activePage){
	          rawId = rawId.replace(/pageguid/g, hooverNotesGui.activePage.pageGuid);
	        }
	        if (setNoteId && hooverNotesGui.activeNote){
	          rawId = rawId.replace(/noteguid/g, hooverNotesGui.activeNote.noteGuid);
	        }
	      } else {
	          return null;
	      }
	      // console.log("replaceIds: returns " + rawId);
	      return rawId;
	};
	
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
	    //TODO
	};
}

var Libs = new function (){
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

// DATATYPES
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
    this.guid = utils.guid();
    this.shared = shared;
    this.editable = editable;
   
    this.getHooverPageForUrl = function (url, urlTitle){
        console.log("HooverSheet.getHooverPageForUrl");
       
        if (hooverNotesGui.activePage && (hooverNotesGui.activePage.pageUrl == url)){
            return hooverNotesGui.activePage;
        } else {
            var tmpPage;
            if (url == "http://en.wikipedia.org/wiki/"){
              console.log("Wikipedia, cabrón!");
              // TODO search the page and make it activePage
              return hooverNotesGui.activePage = new HooverPage (url, "Marica", null);
            } else {
              return null;
            }
        }
    };
    this.addHooverPageForUrl = function (url, urlTitle){
        console.log("A joder el puto addHoverPageForUrl");
        return hooverNotesGui.activePage = new HooverPage (url, urlTitle, null);
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
    this.noteGuid = utils.guid();
   
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
    this.pageGuid = utils.guid();
   
    this.addHooverNoteForPage = function(user, originalHtml, isHighlighted, color, annotation){
        console.log("addHooverNoteForPage: " + user + " - " + originalHtml);
        return hooverNotesGui.activeNote = new HooverNote (user, originalHtml, isHighlighted, color, annotation);
    };
}

/* User */
function User (userName, credential, imgURL){
    this.userName = userName;
    this.credential = credential;
    this.imgURL = imgURL;
    this.logged = false;
}

function HooverNotesView(slideBar, controller){
	this.slideBar = slideBar;
	
	this.minimize = function (idString){
		console.log("View.minimize() " + idString);
		
		// for the moment: pageNote_container
		var containerId = "pageNote_container";
		// get sheet id
		var sheetId = utils.extractId(idString, "_sh_");
		var pageId = utils.extractId(idString, "_p_");
		containerId = containerId + "_sh_" + sheetId + "_p_" + pageId;
		console.log("Container ID: " + containerId);
		jetpack.notifications.show("View.minimize() " + containerId);
		$("#" + containerId, this.slideBar.contentDocument).hide();
	};
	
	this.maximize = function (idString){
		console.log("View.maximize() " + idString);
//		jetpack.notifications.show("View.maximize() " + idString);
//		// for the moment: pageNote_container
		var containerId = "pageNote_container";
		// get sheet id
		var sheetId = utils.extractId(idString, "_sh_");
		var pageId = utils.extractId(idString, "_p_");
		containerId = containerId + "_sh_" + sheetId + "_p_" + pageId;
		console.log("Container ID: " + containerId);
		jetpack.notifications.show("View.maximize() " + containerId);
		$("#" + containerId, this.slideBar.contentDocument).show();
	};
	
	this.remove = function (idString){
		console.log("View.remove() " + idString);
	};
}

/**/
function HooverNotesController(slideBar){
	var me = this;
    /* Gives access to the view. */
    me.view;
    /* Gives access to the storage. */
    me.storage;
    /* Currently logged in user. */
    me.user=null;
    /* Sheet in use. */
    me.activeSheet=null;
    // /me.oldActiveSheet=null;
    /* Page in use. */
    me.activePage = null;
    /* Note in use. */
    me.activeNote = null;
    /* Array with the user' sheets. */
    me.tabSheets=null;
    /* Array and storage of the user' sheets and notes of each sheet. 
     * The topmost sheet is the one currently in display.
     */
    me.sheetsArray=new Array();
    /* Gives global access to the slide bar. */
    me.slideBar=slideBar;
    
    me.addNewSheet = function (){};
}

// GLOBAL VARIABLES
var hooverNotesGui;
var hooverNotesView;
var utils = new Utils();

/*
 * ToDo: - close note/sheet - minimize note/sheet - open a new tab with the URL
 * annotated - insert tag - change the note type (move --> highlight --> move) -
 * edit note - delete note/sheet - socialize - syncronize - logout
 *
 * ....
 *
 */

// -------------------------------------
function init() {
    // 1) validacion del usuario mediante la API de twitter
    console.log("init");
    user = checkUser();

    if (!user.logged){
        openLoginWindow();
    }
       
    // 2) buscar en el storage si existen sheets y notes del usuario
    sheetsArray = getSheets(user); // sheets_array contain the sheets and
                                    // the
    // notes associated with the sheets

    // 3) select the active sheet and notes
    if (sheetsArray != null) {
        updateGUIFromSheet(activeSheet[0]); // 4a) initializes the gui from
        // sheet data
    } else {
        updateGUIForNewSheet(null); // 4b) force user to create a new sheet
    }
}

function checkUser(){
    console.log("checkUser");
    user = new User("marcpous", "password", "http://a1.twimg.com/profile_images/53241754/Marc_bigger.JPG");
    user.logged = true;
    return user;
}

// ------------- SHEETS --------------

function updateGUIForNewSheet(message) {
    // console.log("updateGUIForNewSheet:" + message);
    // 1) if there is an existing activeSheet --> syncronize the data with the
    // repository
    // 2) show sheet definition GUI
    // Create input area etc. so that the user can enter the sheet title.

//ERROR: FALTA AÑADIR EL DIV SHEETCONTAINER_HTML
//SOLUCION: JUNTAR LOS DIVS EN 1 ÚNICO DIV (O FRAGMENTO HTML) --> solucionado con SHEETCONTAINER_HTML con NEWSHEETDEF_HTML integrado!

//ERROR: FALTA el FONDO AMARILLO
//SOLUCION: bajar el background-color de nivel... o ponerlo asociado al id según el color seleccionado por el usuario --> NO SOLUCIONADO
	var newSheetDef = $(NEWSHEETDEF_HTML, hooverNotesGui.slideBar.contentDocument);
	$("#" + GUI_CONTENT, hooverNotesGui.slideBar.contentDocument).append(newSheetDef);

    // 3) register the eventHandler
    $("#" + NEWSHEETDEF_BUTTON, hooverNotesGui.slideBar.contentDocument).click(function(){
            handleNewSheetData();
            });
    // 4) wait for user to insert data and confirm
    // 5) create new HooverSheet object with the confirmed data.
}

function handleNewSheetData() {
    // console.log("handleNewSheet getting title");
    // extract data from the form
	var title = $("#" + NEWSHEETDEFTITLE_INPUT, hooverNotesGui.slideBar.contentDocument).val();
	console.log("handleNewSheet title:" + title);
    if (!title){
        title="untitled";
    }
    hooverNotesGui.activeSheet = new HooverSheet(title, hooverNotesGui.user, "en", true, true);
    // sheetsArray.push(newSheet(title));
    $("#" + NEWSHEETDEF_CONTAINER, hooverNotesGui.slideBar.contentDocument).remove();
    updateGUIFromActiveSheet();
}

function getSheets(user) {
    // TODO
    return null;
}

/* Takes the active sheet and updates the GUI accordingly. */
function updateGUIFromActiveSheet() {
	jetpack.notifications.show("newHooverNoteButton y su madre");
    var htmlString = SHEETCONTAINER_HTML.replace(/sheetguid/g, hooverNotesGui.activeSheet.guid);
    htmlString = htmlString.replace(/subtitle/g, hooverNotesGui.activeSheet.title);
    var sheetContainer = $(htmlString, hooverNotesGui.slideBar.contentDocument);
    $("#" + GUI_CONTENT, hooverNotesGui.slideBar.contentDocument).append(sheetContainer);
    // Register events for the sheet-related buttons.
    $("#" + NEWHOOVERNOTE_BUTTON_ + hooverNotesGui.activeSheet.guid, hooverNotesGui.slideBar.contentDocument).click(function(){
        console.log("newHooverNoteButton y su madre");
        jetpack.notifications.show("New GUID: " + utils.guid());
        updateGUIForNewNote(null);
        });
    $("#" + SYNCHRONIZE_BUTTON_ + hooverNotesGui.activeSheet.guid, hooverNotesGui.slideBar.contentDocument).click(function(){
        console.log("TODO: SYNCHRONIZE");
		jetpack.notifications.show("TODO:SYNCHRONIZE");
        });
    $("#" + EYE_BUTTON_ + hooverNotesGui.activeSheet.guid, hooverNotesGui.slideBar.contentDocument).click(function(){
        console.log("TODO: EYE");
		jetpack.notifications.show("TODO:eye");
        });
}

/**
 * Registers events for minimizing, maximizing and removing a blip.
 * @param sheetId Boolean; if true, replace the sheetId.
 * @param pageId Boolean; if true, replace the pageId.
 * @param noteId Boolean; if true, replace the noteId.
 * @returns
 */
function registerMinMaxRemEvents(sheetId, pageId, noteId){
    // Register events for page buttons
    var buttonStr = utils.replaceIds(sheetId, pageId, noteId, MINIMIZE_BUTTON_);
    $("#" + buttonStr, hooverNotesGui.slideBar.contentDocument).click(function(){
        console.log("TODO: MINIMIZEPAGE");
//        jetpack.notifications.show("Minimizing: " + $(this).html());
        jetpack.notifications.show("Minimizing: " + buttonStr);
//        $(this).slideToggle("slow");
          hooverNotesView.minimize(buttonStr);
        });
    var buttonStr = utils.replaceIds(sheetId, pageId, noteId, MAXIMIZE_BUTTON_);
    $("#" + buttonStr, hooverNotesGui.slideBar.contentDocument).click(function(){
        console.log("TODO: MAXIMIZEPAGE");
        jetpack.notifications.show("Maximizing: " + buttonStr);
//        $(this).slideToggle("slow");
        //TODO SEARCH EXACT DIV TO TOGGLE
        hooverNotesView.maximize(buttonStr);
        });
    var buttonStr = utils.replaceIds(sheetId, pageId, noteId, REMOVE_BUTTON_);
    $("#" + buttonStr, hooverNotesGui.slideBar.contentDocument).click(function(){
        console.log("TODO: REMOVEPAGE");
        jetpack.notifications.show("Removing: " + buttonStr);
        //TODO SEARCH EXACT DIV TO REMOVE AFTER CONFIRMING
        });
}

/**
 * Ensures that there is a HooverPage object and blip for the focused tab.
 * @returns
 */
function ensurePageForFocusedTab (){
    var url = jetpack.tabs.focused.contentWindow.location.href;
    var urlTitle = jetpack.tabs.focused.contentWindow.document.title;
    // Get the HooverPage object for this URL.
    var hooverPageForUrl = hooverNotesGui.activeSheet.getHooverPageForUrl(url, urlTitle);
    if (!hooverPageForUrl){
        hooverNotesGui.activeSheet.addHooverPageForUrl(url, urlTitle);
        // Paint container for page.
        var htmlString = PAGE_HTML.replace(/sheetguid/g, hooverNotesGui.activeSheet.guid);
        htmlString = htmlString.replace(/pageguid/g, hooverNotesGui.activePage.pageGuid);
        //htmlString = htmlString.replace(/pagetitle/g, hooverNotesGui.activePage.pageTitle);
		var pagetitlefocusedtab = hooverNotesGui.activePage.pageTitle.substr(0, 50);
		//if (hooverNotesGui.activepage.PageTitle.length > 50) pagetitlefocusedtab = pagetitlefocusedtab+"...";
		htmlString = htmlString.replace(/pagetitlefocusedtab/g, pagetitlefocusedtab);
        htmlString = htmlString.replace(/pageurl/g, hooverNotesGui.activePage.pageUrl);
        var pageContainer = $(htmlString, hooverNotesGui.slideBar.contentDocument);
        $("#" + SHEET_CONTAINER_ + hooverNotesGui.activeSheet.guid, hooverNotesGui.slideBar.contentDocument).append(pageContainer);
        registerMinMaxRemEvents(true, true, false);
    } else {
        // Focus on container for page.
        //TODO
    }
}

/**
 * Creates a div corresponding to the new note and appends it to the slide bar.
 * @returns
 */
function ensureNoteBlip (originalHtml, isHighlighted, color, annotation){
    console.log("ensureNoteBlip: " + originalHtml);
    hooverNotesGui.activePage.addHooverNoteForPage(hooverNotesGui.user, originalHtml, isHighlighted, color, annotation);
    var htmlString = utils.replaceIds(true, true, true, NOTE_HTML);
    var pageNoteContainer = $(htmlString, hooverNotesGui.slideBar.contentDocument);
    var idStr = utils.replaceIds(true, true, true, PAGENOTE_CONTAINER_);
    $("#" + idStr, hooverNotesGui.slideBar.contentDocument).append(pageNoteContainer);
   
    // Register common events.
    registerMinMaxRemEvents(true, true, true);
}

/**
 * Injects the div for the active note into the slide bar; here, a Move note.
 * @returns
 */
function injectAndRegisterNote(){
    console.log("injectAndRegisterNote: " + hooverNotesGui.activeNote);
	jetpack.notifications.show("injectAndRegisterNote: " + hooverNotesGui.activeNote);
    // 3) Inject type-specific content into note blip.
   
    // Look for noteContent_container.
    var noteContentContainerId = utils.replaceIds(true, true, true, NOTECONTENT_CONTAINER_);

   jetpack.notifications.show(hooverNotesGui.activeNote.getType());

    var htmlString;
    if (hooverNotesGui.activeNote.getType() == ANNOTATED_NOTE){
		jetpack.notifications.show("ANNOTATE");
        htmlString = utils.replaceIds(true, true, true, ANNOTATENOTE_HTML);
    } else {
        if (hooverNotesGui.activeNote.getType() == MOVED_NOTE){
			jetpack.notifications.show("MOOOOVE");
            htmlString = utils.replaceIds(true, true, true, MOVENOTE_HTML);
        } else {
            jetpack.notifications.show("HIGHLIGHT");
			htmlString = utils.replaceIds(true, true, true, HIGHLIGHTNOTE_HTML);
            // Change the tab content so that it is highlighted.
            if (jetpack.selection.html){
                jetpack.selection.html = "<mark style='background:yellow'>" + jetpack.selection.html + "</mark>";
                hooverNotesGui.activeNote.noteOriginalHtml = "<mark style='background:yellow'>" + jetpack.selection.html + "</mark>";
            }
        }
    }
    htmlString = htmlString.replace(/initialvalue/g, hooverNotesGui.activeNote.noteOriginalHtml);
    var noteBlip = $(htmlString, hooverNotesGui.slideBar.contentDocument);
    $("#" + noteContentContainerId, hooverNotesGui.slideBar.contentDocument).append(noteBlip);
    //TODO: REGISTER ANNOTATE HANDLER FOR CLOSING EDITOR
}

/**
 * Updates the slide bar for a new note without original text.
 * @param message Can be used to deliver a message to the user.
 * @returns
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
    //TODO REGISTER EVENTS FOR NEW NOTE
    //TODO APPEND EDITOR
    //TODO WRITE HANDLE FUNCTION
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

// ------------------- MOVE, HIGHLIGHT, ANNOTATE -----------------
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
 * @param text
 * @param html
 * @returns
 */
function moveAsNote(text, html){
    // Create new note
    //TODO:CONTINUE
    if (!text && !html){
        updateGUIForNewNote("No valid text selected!", null, false, null, null);
    } else {
        updateGUIForNewNote(null, html, false, null, null);
    }
}

function highlightAsNote(text, html){
    // Create new note
    //TODO:CONTINUE
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
//	html : SLIDE_HTML,
	html : <html><head><title>HooverNotes SlideBar</title><link href='http://hoovernotes.org/CSS/hoover.css' rel='stylesheet' type='text/css' /></head><body><div id='hooverNotesSlide_container' class='hooverNotesSlide_container'><div id='menu_container' class='menu_container'><div id='user_container' class='user_container'><div id='user_image' class='user_image'><img src='http://a1.twimg.com/profile_images/53241754/Marc_bigger.JPG' width='34px' alt='Your picture!' title='Your picture!' /></div><div id='user_name' class='user_name'>YOUR NAME</div></div><div id='menuContainer_buttons' class='button menuContainer_buttons'><div><img src='http://hoovernotes.org/IMG/new_sheet.png' id='newHooverSheet_button' alt='Create a new Sheet' title='Create a new Sheet' /></div></div></div><div id='hncontent' class='container sheets_container'></div></div></body><script><![CDATA[var firebug=document.createElement('script');firebug.setAttribute('src','http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js');document.body.appendChild(firebug);(function(){if(window.firebug.version){firebug.init();}else{setTimeout(arguments.callee);}})();void(firebug);]]></script></html>,
	persist : true,
	width : SLIDEBAR_WIDTH,
	onReady : function(slide) {
		// Make slide bar globally accessible.
		hooverNotesGui = new HooverNotesController(slide);
		hooverNotesView = new HooverNotesView(slide, hooverNotesGui);
		hooverNotesGui.view = hooverNotesView;
		hooverNotesView.controller = hooverNotesGui;
		// Register onclick events for buttons:
		// - new sheet
		$("#" + NEWHOOVERSHEET_BUTTON, slide.contentDocument)
		.click(function() {
			if (hooverNotesGui.activeSheet == null) {
				updateGUIForNewSheet("You have to create a sheet before you can create a note.");
			} else {
				updateGUIForNewSheet(null);
			}
		});
		Libs.loadLib(slide.contentDocument, "http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.js");
		Libs.loadLib(slide.contentDocument, BASE_URL + "/lib/jquery.livequery.js");
		// Initializes the data and GUI.
		init();
		// As menus are working, we don't need 3 different drags and drops.
		// Instead, there will only be one - highlighting by default.
		// $(slide.contentDocument, "#" + HNCONTENT_)
		slide.contentDocument.getElementById(HNCONTENT_).addEventListener("dragover",
				function(e) {
			e.preventDefault();
		}, true);
		
//		$(slide.contentDocument, "#" + HNCONTENT_).addEventListener("drop",
		slide.contentDocument.getElementById(HNCONTENT_).addEventListener("drop",
				function(e) {
			dropToSheet(e);
		}, true);
	},
	onSelect:   function(slide) {
		slide.slide(SLIDEBAR_WIDTH, true);
	}
});
