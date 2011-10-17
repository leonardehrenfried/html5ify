sites.push({

  shouldRun : function(){
    return window.location.host.indexOf("youtube.com") !== - 1;
  },

  isHtml5 : function(){
    return !!document.cookie.match(/PREF=.*f1=\w*.*f2=4000000/);
  },

  /**
   * Simulates what the user would do when going to youtube.com/html5
   */
  joinHtml5Beta : function(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/html5", true);
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        var match = xhr.responseText.match(/'XSRF_TOKEN'\s*:\s*'([^ ]*)'/);
        var token = match[1];
        
        var params = "enable_html5=true&session_token=" + token;
        xhr = new XMLHttpRequest();
        xhr.open("POST", "/html5", true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            h5log("...joined");
          }
        };
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(params);
      }
    };
    xhr.send();
  },

  run : function(){
    if(!this.isHtml5()){
      h5log("You are not part of the Youtube HTML5 beta. joining...");
      this.joinHtml5Beta();  
    }

  }
});

