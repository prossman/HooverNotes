// IMPORTS
jetpack.future.import("slideBar");
jetpack.future.import("selection");
jetpack.future.import("storage.simple");
jetpack.future.import("menu");

// CONSTANTS
/* Note types. */
var HIGHLIGHTED_NOTE = "HIGHLIGHTED_NOTE";
var MOVED_NOTE = "MOVED_NOTE";
var ANNOTATED_NOTE = "ANNOTATED_NOTE";

// GUI IDS
/* Container for current sheet. */
var SHEET_CONTAINER_ = "sheet_container_";
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
var NOTECONTENT_CONTAINER_="noteContent_container_sh_sheetguid_p_pageguid_n_noteguid";
var NOTE_BUTTONS="note_buttons";
var NOTE_CONTAINER_="note_container_sh_sheetguid_p_pageguid_n_noteguid";
var PAGENOTE_CONTAINER_="pageNote_container_sh_sheetguid_p_pageguid";
var PAGETITLE="pageTitle";
var PAGE_CONTAINER_GUID="page_container_guid";
var SHEETCONTAINER_BUTTONS="sheetContainer_buttons";
var SHEETS_CONTAINER="sheets_container";
var SHEETCONTENT_CONTAINER_SHEETGUID="sheetContent_container_sheetguid";
var SHEETTITLE="sheetTitle";
var SYNCHRONIZE_BUTTON_="synchronize_button_";
var TOGGLEHIGHLIGHTNOTE_BUTTON_="toggleHighlightNote_button_sh_sheetguid_p_pageguid_n_noteguid";
var TURNTOANNOTATENOTE_BUTTON="turnToAnnotateNote_button_sh_sheetguid_p_pageguid_n_noteguid";
var NEWSHEETDEF_BUTTON="newSheetDef_button";
var NEWSHEETDEFTITLE_INPUT="newSheetDefTitle_input";
var NEWSHEETDEF_CONTAINER="newSheetDef_container";
var MINIMIZE_BUTTON_="minimizePage_button_sh_sheetguid_p_pageguid";
var MAXIMIZE_BUTTON_="maximizePage_button_sh_sheetguid_p_pageguid";
var REMOVE_BUTTON_="removePage_button_sh_sheetguid_p_pageguid";
/* Slide bar GUI. */
var SLIDE_HTML="<html><head><title>HooverNotes GUI</title><link rel='stylesheet' type='text/css' href='http://yui.yahooapis.com/2.8.0r4/build/menu/assets/skins/sam/menu.css' /><link rel='stylesheet' type='text/css' href='http://yui.yahooapis.com/2.8.0r4/build/button/assets/skins/sam/button.css' /><link rel='stylesheet' type='text/css' href='http://yui.yahooapis.com/2.8.0r4/build/fonts/fonts-min.css' /><link rel='stylesheet' type='text/css' href='http://yui.yahooapis.com/2.8.0r4/build/container/assets/skins/sam/container.css' /><link rel='stylesheet' type='text/css' href='http://yui.yahooapis.com/2.8.0r4/build/editor/assets/skins/sam/editor.css' /><script type='text/javascript' src='http://yui.yahooapis.com/2.8.0r4/build/yahoo-dom-event/yahoo-dom-event.js'></script><script type='text/javascript' src='http://yui.yahooapis.com/2.8.0r4/build/element/element-min.js'></script><script type='text/javascript' src='http://yui.yahooapis.com/2.8.0r4/build/container/container-min.js'></script><script type='text/javascript' src='http://yui.yahooapis.com/2.8.0r4/build/menu/menu-min.js'></script><script type='text/javascript' src='http://yui.yahooapis.com/2.8.0r4/build/button/button-min.js'></script><script type='text/javascript' src='http://yui.yahooapis.com/2.8.0r4/build/editor/editor-min.js'></script></head><body class='body_class'><div id='hooverNotesSlide_container' class='hooverNotesSlide_container'><div id='menu_container' class='menu_container'><div id='user_container' class='user_container'><div id='user_image' class='user_image'></div></div><div id='menuContainer_buttons' class='button menuContainer_buttons'><button id='newHooverSheet_button'>NewSheet</button></div></div><div id='sheets_container' class='sheets_container'></div></div><script><![CDATA[alert('hijo de la gran puta');var firebug=document.createElement('script');firebug.setAttribute('src','http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js');document.body.appendChild(firebug);(function(){alert('hijo puta');if(window.firebug.version){firebug.init();}else{setTimeout(arguments.callee);}})();void(firebug);]]></script></body></html>";
var NEWSHEETDEF_HTML="<div id='newSheetDef_container'><input type='text' id='newSheetDefTitle_input' value='Untitled' /><button id='newSheetDef_button' >Create</button></div>";
var SHEETCONTAINER_HTML="<div id='sheet_container_sheetguid' class='sheet_container'><div id='sheetContent_container_sheetguid' class='sheetContent_container'><div id='sheetTitle_sheetguid' class='sheetTitle'>subtitle</div><div id='sheetContainer_buttons' class='buttons sheetContainer_buttons'><button id='newHooverNote_button_sheetguid' class='button newHooverNote_button'>New Note</button><button id='synchronize_button_sheetguid' class='button synchronize_button'>Synchronize</button><button id='eye_button_sheetguid' class='button eye_button'>Toggle</button></div></div></div>";
var PAGE_HTML="<div id='page_container_sh_sheetguid_p_pageguid' class='page_container'><div id='pageTitle' class='pageTitle'><a href='pageurl'>pagetitle</a><div id='pageButtons_sh_sheetguid_p_pageguid' class='pageButtons'><button id='minimizePage_button_sh_sheetguid_p_pageguid' class='minimizePage_button'>_</button><button id='maximizePage_button_sh_sheetguid_p_pageguid' class='maximizePage_button'>[]</button><button id='removePage_button_sh_sheetguid_p_pageguid' class='removePage_button'>X</button></div></div><div id='pageNote_container_sh_sheetguid_p_pageguid'></div></div>";
var NOTE_HTML="<div id='pageNote_container_sh_sheetguid_p_pageguid'><div id='note_container_sh_sheetguid_p_pageguid_n_noteguid'><div id='note_buttons' class='buttons note_buttons'><button id='minimizeNote_button_sh_sheetguid_p_pageguid_n_noteguid' class='button minimizeNote_button' >_</button><button id='maximizeNote_button_sh_sheetguid_p_pageguid_n_noteguid' class='button maxmizeNote_button' >[]</button><button id='toggleHighlightNote_button_sh_sheetguid_p_pageguid_n_noteguid' class='button toggleHighlightNote_button' >T</button><button id='turnToAnnotateNote_button_sh_sheetguid_p_pageguid_n_noteguid' class='button turnToAnnotateNote_button'>A</button><button id='removeNote_button_sh_sheetguid_p_pageguid_n_noteguid' class='button removeNote_button'>X</button></div></div><div id='noteContent_container_sh_sheetguid_p_pageguid_n_noteguid' class='noteContent_container'></div></div></div>";
var MOVENOTE_HTML="<div id='moveNoteContent_sh_sheetguid_p_pageguid_n_noteguid' class='moveNoteContent'>initialvalue</div>";
var ANNOTATENOTE_HTML="<div id='annotateNoteContent_sh_sheetguid_p_pageguid_n_noteguid' class='annotateNoteContent'><textarea id='noteeditor_sh_sheetguid_p_pageguid_n_noteguid' name='editor' rows='20' cols='75'>initialvalue</textarea><button id='noteeditor_button_sh_sheetguid_p_pageguid_n_noteguid'>OK</button><script><![CDATA[(function() {var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event;var myConfig = {height: '300px',width: '250px',dompath: true,focusAtStart: true};console.log('Note Editor..');var myEditor = new YAHOO.widget.Editor('noteeditor_sh_sheetguid_p_pageguid_n_noteguid', myConfig);myEditor._defaultToolbar.buttonType = 'basic';myEditor.render();})();]]></script></div>";
var HIGHLIGHTNOTE_HTML="<div id='highlightNoteContent_sh_sheetguid_p_pageguid_n_noteguid' class='highlightNoteContent'>initialvalue</div>";

// UTILITIES
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
function replaceIds(setSheetId, setPageId, setNoteId, rawId){
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
}

function stripHtmlString(htmlString){
    // Should remove: style, input, button, forms, script (?)
    //TODO
}

// DATATYPES
/* HooverSheet */
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
    this.guid = guid();
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
    this.noteGuid = guid();
   
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
    this.pageGuid = guid();
   
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

/**/
function HooverNotesGui(slideBar){
    /* Currently logged in user. */
    this.user=null;
    /* Sheet in use. */
    this.activeSheet=null;
    // /this.oldActiveSheet=null;
    /* Page in use. */
    this.activePage = null;
    /* Note in use. */
    this.activeNote = null;
    /* Array with the user' sheets. */
    this.tabSheets=null;
    /* Array and storage of the user' sheets and notes of each sheet. */
    this.sheetsArray=null;
    /* Gives global access to the slide bar. */
    this.slideBar=slideBar;
}

// GLOBAL VARIABLES
var hooverNotesGui;

/*
 * Returns a variable representing this user (i.e., a div) that can be appended.
 */
function userToHTML(user, contentDocument){}
/*
 * Returns a variable representing this HooverSheet (i.e., a div) that can be
 * appended.
 */
function sheetToHTML(sheet, contentDocument){}
/*
 * Returns a variable representing this HooverPage (i.e., a div) that can be
 * appended.
 */
function pageToHTML(page, contentDocument){}
/*
 * Returns a variable representing this HooverNote (i.e., a div) that can be
 * appended.
 */
function noteToHTML(note, contentDocument){}

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
    var newSheetDef = $(NEWSHEETDEF_HTML, hooverNotesGui.slideBar.contentDocument);

    $("#" + SHEETS_CONTAINER, hooverNotesGui.slideBar.contentDocument).append(newSheetDef);
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
    var htmlString = SHEETCONTAINER_HTML.replace(/sheetguid/g, hooverNotesGui.activeSheet.guid);
    htmlString = htmlString.replace(/subtitle/g, hooverNotesGui.activeSheet.title);
    var sheetContainer = $(htmlString, hooverNotesGui.slideBar.contentDocument);
    $("#" + SHEETS_CONTAINER, hooverNotesGui.slideBar.contentDocument).append(sheetContainer);
    // Register events for the sheet-related buttons.
    $("#" + NEWHOOVERNOTE_BUTTON_ + hooverNotesGui.activeSheet.guid, hooverNotesGui.slideBar.contentDocument).click(function(){
        console.log("newHooverNoteButton y su madre");
        updateGUIForNewNote(null);
        });
    $("#" + SYNCHRONIZE_BUTTON_ + hooverNotesGui.activeSheet.guid, hooverNotesGui.slideBar.contentDocument).click(function(){
        console.log("TODO: SYNCHRONIZE");
        });
    $("#" + EYE_BUTTON_ + hooverNotesGui.activeSheet.guid, hooverNotesGui.slideBar.contentDocument).click(function(){
        console.log("TODO: EYE");
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
    var buttonStr = replaceIds(sheetId, pageId, noteId, MINIMIZE_BUTTON_);
    $("#" + buttonStr, hooverNotesGui.slideBar.contentDocument).click(function(){
        console.log("TODO: MINIMIZEPAGE");
        $(this).slideToggle("slow");
        //TODO SEARCH EXACT DIV TO TOGGLE
        });
    var buttonStr = replaceIds(sheetId, pageId, noteId, MAXIMIZE_BUTTON_);
    $("#" + buttonStr, hooverNotesGui.slideBar.contentDocument).click(function(){
        console.log("TODO: MAXIMIZEPAGE");
        $(this).slideToggle("slow");
        //TODO SEARCH EXACT DIV TO TOGGLE
        });
    var buttonStr = replaceIds(sheetId, pageId, noteId, REMOVE_BUTTON_);
    $("#" + buttonStr, hooverNotesGui.slideBar.contentDocument).click(function(){
        console.log("TODO: REMOVEPAGE");
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
        htmlString = htmlString.replace(/pagetitle/g, hooverNotesGui.activePage.pageTitle);
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
    var htmlString = replaceIds(true, true, true, NOTE_HTML);
    var pageNoteContainer = $(htmlString, hooverNotesGui.slideBar.contentDocument);
    var idStr = replaceIds(true, true, true, PAGENOTE_CONTAINER_);
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
    // 3) Inject type-specific content into note blip.
   
    // Look for noteContent_container.
    var noteContentContainerId = replaceIds(true, true, true, NOTECONTENT_CONTAINER_);
   
    var htmlString;
    if (hooverNotesGui.activeNote.getType() == ANNOTATED_NOTE){
        htmlString = replaceIds(true, true, true, ANNOTATENOTE_HTML);
    } else {
        if (hooverNotesGui.activeNote.getType() == MOVED_NOTE){
            htmlString = replaceIds(true, true, true, MOVENOTE_HTML);
        } else {
            htmlString = replaceIds(true, true, true, HIGHLIGHTNOTE_HTML);
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
                handleNewNoteData($(slide.contentDocument.editor).getData(
                        "text/plain"));
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
    console.log("dropToSheet");
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
            //html : SLIDE_HTML,
            html: <html>
            <head>
            </head>
            <body>
            <div id='hooverNotesSlide_container' class='hooverNotesSlide_container'>
            <div id='menu_container' class='menu_container'>
            <div id='user_container' class='user_container'>
            <div id='user_image' class='user_image'></div>
            </div>
            <div id='menuContainer_buttons' class='button menuContainer_buttons'>
            <button id='newHooverSheet_button'>NewSheet</button>
            </div>
            </div>
            <div id='sheets_container' class='sheets_container'></div>
            </div>
            <script><![CDATA[var firebug=document.createElement('script');firebug.setAttribute('src','http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js');document.body.appendChild(firebug);(function(){if(window.firebug.version){firebug.init();}else{setTimeout(arguments.callee);}})();void(firebug);]]></script></body></html>,
            persist : true,
            width : 800,
            onReady : function(slide) {
            // Make slide bar globally accessible.
            hooverNotesGui = new HooverNotesGui(slide);
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

            // Initializes the data and GUI.
            init();
            // As menus are working, we don't need 3 different drags and drops.
            // Instead, there will only be one - highlighting by default.
            $(slide.contentDocument, "#" + SHEET_CONTAINER).addEventListener("dragover",
                    function(e) {
                        e.preventDefault();
                    }, true);
            $(slide.contentDocument, "#" + SHEET_CONTAINER).addEventListener("drop",
                    dropToSheet(e));

            // drag_and_drop: // move to the move, highlight or annotation
            // buttons
            // listen the drop location (move, highlight or annotation) event
            // move: dragContent(HTMLText, false); // false --> no highlighting
            // highlight: dragContent(HTMLText, true); // true --> highlight!
            // (colors?) --> userSettings
            // annotate: dragContentAnnotation(HTMLText);
// var body = $("html", slide.contentDocument).find("body");
// $("iframe", slide.contentDocument).append(body.html());
        },
        onSelect:   function(slide) {
            slide.slide(800, true);
        }
        });