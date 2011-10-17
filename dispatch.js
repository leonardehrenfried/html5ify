sites.forEach(function(site){
  if (site.shouldRun()){
    site.run();
  }
});
