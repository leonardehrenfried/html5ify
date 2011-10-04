/* 
 * HTML5ify for Amazon Music
 * Makes Amazon Music preview play in a <audio> tag instead of Flash
 * Author: Leonard Ehrenfried <leonard.ehrenfried@web.de>
 */

var Amazon = {
   
  /*
   * Fetches all links that are play buttons
   */
  getAnchors : function(){
    var anchors = document.querySelectorAll(".trackList td.playcol>a");
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
    //could be the image that the user clicked on
    if(anchor.tagName.toLower !== 'a'){
      anchor = anchor.parentNode;
    }
    console.log(anchor.href); 
  },

  run : function(){
    var anchors = this.getAnchors();
    this.attachEvents(anchors);
  }

};

Amazon.run();

