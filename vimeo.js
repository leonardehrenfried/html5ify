sites.push({
  shouldRun : function(){
    return window.location.href.indexOf("vimeo.com") > -1;
  },

  isHtml5 : function(){
    return !!document.cookie.match("html_player=1");
  },  

  run : function(){
    if(!this.isHtml5()){
      document.cookie = "html_player=1; expires=Monday, 04-Apr-2021 05:00:00 GMT";
      window.location.reload(true);
    }
  }
}
);
