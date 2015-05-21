var Backbone = require('backbone'),
  $ = require('jquery')
  Backbone.$ = $;
var Marionette = require('backbone.marionette'),
  _ = require('underscore');

module.exports = Marionette.ItemView.extend({

  tagName : 'div',

  className : 'old',

  template : _.template('<div><span class="title"><%= name %></span><span class="subtitle"><%= project %>, <%= module %></span></div><div><span class="play">Iniciar</span></div>'),

  events : {
    'click .play' : 'play'
  },

  play : function(){
    this.send(2);
  },

  send : function(idType){
    var self = this;
    var urlSend = Backbone.app.url+'track/tarea/'+this.model.get('pkid')+'/board/'+idType;
    var req = new XMLHttpRequest();
    req.open('GET',urlSend,true);
    req.onload = function(){
      if ( req.readyState === 4 && req.status === 200 ){
        self.addTimer();
        self.destroy();
        Backbone.app.resource();
      }
    }
    req.send(null);
  },

  addTimer : function(){
    localStorage.khaleesiTime.length > 0 ? tasklist = JSON.parse(localStorage.khaleesiTime) : tasklist = [];
    var task = {
      cid : this.model.get('pkid'),
      elapsed : 3600,
    }
    tasklist.push(task);
    localStorage.khaleesiTime = JSON.stringify(tasklist);
    pageBack = chrome.extension.getBackgroundPage();
    pageBack.backboneApp.app.timer();
  },

});