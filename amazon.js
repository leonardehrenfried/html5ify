/* 
 * HTML5ify for Amazon Music
 * Makes Amazon Music preview play in ab <audio> tag instead of Flash
 * Author: Leonard Ehrenfried <leonard.ehrenfried@web.de>
 */

sites.push({
   
  /*
   * Fetches all links that are play buttons
   */
  getAnchors : function(){
    var anchors = document.querySelectorAll(".trackList td.playcol>a");
    if(anchors.length === 0){
      anchors = document.querySelectorAll(".mp3Tracks td.playCol>a");
    }
    return anchors;
  },
  
  /**
   * Attach events to the anchors so that the mu3 file is downloaded
   */
  attachEvents : function(anchors){
    var that = this;

    for (var i = 0; i < anchors.length; ++i) {
      var anchor = anchors[i];
      anchor.addEventListener('click', function(e){
        e.stopPropagation();
        e.preventDefault();
        that.handleClick(e.target);
      }, true);
    }

  },

  handleClick : function(anchor){
    var that = this;
    
    //could be the image that the user clicked on
    if(anchor.tagName.toLowerCase() !== 'a'){
      anchor = anchor.parentNode;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", anchor.href, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        that.playPreview(anchor, xhr.responseText);
      }
    };
    xhr.send();
  },
  
  /*
   * Creates a fully configured <audio> tag
   */
  createAudio : function(url){
    var audio = document.createElement("audio");
    audio.controls = true;
    audio.src = url;
    return audio;
  },

  createPauseButton : function(){
    var button = document.createElement("img");
    button.src = chrome.extension.getURL('/pause.png');
    button.style.cursor = 'pointer';
    return button;
  },

  playPreview : function(anchor, url){
    var that = this;

    var audio = this.createAudio(url);
    var pause = this.createPauseButton();

    pause.addEventListener("click", function(){
      audio.pause();
      that.revertPlayButton(anchor, pause);
    }, true);

    audio.addEventListener("stop", function(){
      that.revertPlayButton(anchor, pause);
    });

    audio.play();
    anchor.parentNode.appendChild(pause);
    anchor.style.display = 'none';
  },

  revertPlayButton : function(play, pause){
    play.style.display = 'inline';
    pause.parentNode.removeChild(pause);  
  },

  insertAffiliateCode : function(){
    var affiliateSuffix = "tag=shizzle0a-20&linkCode=ur2&camp=1789&creative=9325";
    if(!window.sessionStorage.getItem("h5-amazon")){
      window.sessionStorage.setItem("h5-amazon", true);
      
      var url = window.location.href;
      
      if(url.indexOf("&") > -1){
        url += "&";
      }
      else{
        url += "?";
      }
      url += affiliateSuffix;

      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.send();
    };

  },

  run : function(){
    var anchors = this.getAnchors();
    this.attachEvents(anchors);
    this.insertAffiliateCode();
  },

  shouldRun : function(){
    return (window.location.host.indexOf("amazon.") > -1);
  }
});
