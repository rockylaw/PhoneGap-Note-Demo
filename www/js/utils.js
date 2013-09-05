tpl = {
  //存放预加载的模板
  templates: {},
  
  //加载应用指定的模板
  loadTemplates: function(names, callback){
    var that = this;
    var loadTemplate = function(index){
      var name = names[index];
      console.log('Loading template:' + name);
      $.get('tpl/' + name + '.html', function(data){
        that.templates[name] = data;
        index++;
        if(index < names.length){
          loadTemplate(index)
        }else{
          callback();
        }
      }, 'text');
    }
    loadTemplate(0);
  },
  
  get: function(name){
    return this.templates[name];
  }
  
};