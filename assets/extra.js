(function(){
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var sel='main h2,main .lead,.card,.tl article,.stats div,.slot,.person,.cardimg,.wide-photo,.duo .ph,.diagram,.note';
  var els=[].slice.call(document.querySelectorAll(sel)).filter(function(e){return !e.closest('.hero')});
  if(!('IntersectionObserver' in window)||!els.length) return;
  els.forEach(function(e){
    var sibs=e.parentElement?[].slice.call(e.parentElement.children):[e];
    var i=Math.max(0,sibs.indexOf(e));
    e.style.setProperty('--d',(Math.min(i,5)*0.09).toFixed(2)+'s');
    e.classList.add('reveal');
  });
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}
    });
  },{threshold:0.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(e){io.observe(e)});
})();
