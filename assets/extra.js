(function(){
  var nav=document.getElementById('nav'),ul=nav&&nav.querySelector('ul');
  if(!ul) return;
  var cur=ul.querySelector('a[aria-current="page"]');
  if(!cur) return;
  function pos(a){var r=a.getBoundingClientRect(),u=ul.getBoundingClientRect();return {l:r.left-u.left,w:r.width}}
  var target=pos(cur);
  if(target.w<=0) return; // menu is collapsed (phone): no indicator
  var ind=document.createElement('span');ind.className='nav-ind';ul.appendChild(ind);nav.classList.add('has-ind');
  function set(p){ind.style.left=p.l+'px';ind.style.width=p.w+'px'}
  function instant(p){ind.style.transition='none';set(p);void ind.offsetWidth;ind.style.transition=''}
  function save(p){try{sessionStorage.setItem('navInd',JSON.stringify(p))}catch(e){}}
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var prev=null;try{prev=JSON.parse(sessionStorage.getItem('navInd'))}catch(e){}
  if(prev&&prev.w>0&&(Math.abs(prev.l-target.l)>1)){
    instant(prev);
    requestAnimationFrame(function(){requestAnimationFrame(function(){set(target)})});
  }else{instant(target)}
  save(target);
  ul.addEventListener('click',function(ev){
    var a=ev.target.closest&&ev.target.closest('a');if(!a||a===cur) return;
    var p=pos(a);set(p);save(p);
    if(reduce&&!ev.defaultPrevented&&ev.button===0&&!(ev.metaKey||ev.ctrlKey||ev.shiftKey||ev.altKey)&&(!a.target||a.target==='_self')){ev.preventDefault();setTimeout(function(){location.href=a.href},650)}
  });
  window.addEventListener('resize',function(){var p=pos(ul.querySelector('a[aria-current="page"]'));if(p.w>0){instant(p);save(p)}});
  window.addEventListener('load',function(){var p=pos(ul.querySelector('a[aria-current="page"]'));if(p.w>0&&!reduce&&Math.abs(p.l-target.l)>1){instant(p);save(p)}});
})();
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
    setTimeout(function(){location.href=u.href},document.querySelector(".nav-ind")&&a.closest("nav")?650:290);
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
