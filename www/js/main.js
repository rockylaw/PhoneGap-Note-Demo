var NoteApp = Backbone.Router.extend({
  routes: {
    "": "list",
    "list": "list",
    "notes/new": "newNote",
    "notes/add": "addNote",
    "notes/:id": "showNote"
  },
  
  initialize: function(){
    $('.back').on('click', function(event){
      window.history.back();
      return false;
    });
    this.firstPage = true;
    this.noteList = new NoteList();
    this.noteList.add(new Note({id: 1, content:"ありがとうございました！"}));
    this.noteList.add(new Note({id: 2, content:"おはようございます！！"}));
    this.noteList.add(new Note({id: 3, content:"こんばんは！"}));
  },
  
  list: function(){
    this.changePage(new NoteListPage({model: this.noteList}));
  },
  
  newNote: function(){
    this.changePage(new NewNoteView({model: new Note()}));
  },
  
  addNote: function(){
    var newNote = new Note({id: this.noteList.length + 1, content: $("#newNoteContent").val()});
    this.noteList.add(newNote);
    this.navigate("", {trigger: true});
    $("#noteListView").listview("refresh");
  },
  
  showNote: function(id){
    var note = this.noteList.get(id);
    this.changePage(new NoteView({model: note}));
  },
  
  changePage: function(page){
    $(page.el).attr('data-role', 'page');
    page.render();
    $('body').append($(page.el));
    var transition = $.mobile.defaultPageTransition;
    if(this.firstPage){
      transition = 'none';
      this.firstPage = false;
    }
    $.mobile.changePage($(page.el), {changeHash: false, transition:transition});
  },
  
  start: function(){
    Backbone.history.start();
  }
});

$(document).ready(function(){
  tpl.loadTemplates(["note-details", "note-list-item", "notes-page", "new-note"], function(){
    app = new NoteApp();
    app.start();
  });
});


// document.addEventListener("deviceready", function(){
//   tpl.loadTemplates(["note-details", "note-list-item", "notes-page", "new-note"], function(){
//     app = new NoteApp();
//     app.start();
//   });
// });