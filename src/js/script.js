particlesJS.load('particles-js', 'js/particles.json');

function removeLocationHash(){
  var noHashURL = window.location.href.replace(/#.*$/, '');
  window.history.replaceState('', document.title, noHashURL) 
}
window.addEventListener("popstate", function(event){
  removeLocationHash();
});
window.addEventListener("hashchange", function(event){
  event.preventDefault();
  removeLocationHash();
});
window.addEventListener("load", function(){
  removeLocationHash();
});

// ScrollEvent

function checkScrollPosition(){
  var button = document.querySelector('.scrollTop')
  if ((window.pageYOffset) >= 100) {
    button.classList.add('scrolled')
  } else {
    button.classList.remove('scrolled')
  }
}

window.addEventListener('scroll', checkScrollPosition)