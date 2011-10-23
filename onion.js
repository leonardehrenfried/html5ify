sites.push({

  shouldRun : function(){
    return window.location.host === "www.theonion.com";
  },

  run : function(){
    /*chrome.experimental.webRequest.onBeforeSendHeaders.addListener(function(details){
      console.log(details);
    }, {}, {});*/
  }

});
