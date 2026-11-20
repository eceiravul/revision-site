(function(){
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.addEventListener('pageshow',function(){document.body.classList.remove('leaving')});
  document.addEventListener('click',function(ev){
    var a=ev.target.closest&&ev.target.closest('a[href]');
    if(!a||ev.defaultPrevented||ev.button!==0||ev.metaKey||ev.ctrlKey||ev.shiftKey||ev.altKey) return;
    if(a.target&&a.target!=='_self') return;
    var u=new URL(a.href,location.href);
    if(u.origin!==location.origin||u.pathname===location.pathname) return;
    ev.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(function(){location.href=u.href},230);
  });
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
