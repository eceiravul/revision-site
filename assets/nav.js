/* Sliding highlight box behind the active menu item.
   Loaded right after the header so the box exists before the first paint.
   The box starts where it was on the previous page and glides to the new item. */
(function(){
  var nav=document.getElementById('nav'),ul=nav&&nav.querySelector('ul');
  if(!ul) return;
  var cur=ul.querySelector('a[aria-current="page"]');
  if(!cur) return;
  var ind=null;
  function pos(a){var r=a.getBoundingClientRect(),u=ul.getBoundingClientRect();return {l:r.left-u.left,w:r.width}}
  function set(p){ind.style.left=p.l+'px';ind.style.width=p.w+'px'}
  function instant(p){ind.style.transition='none';set(p);void ind.offsetWidth;ind.style.transition=''}
  function save(p){try{sessionStorage.setItem('navInd',JSON.stringify(p))}catch(e){}}
  // The menu is collapsed on phones (width 0): create the box once it becomes visible.
  function init(){
    if(ind) return true;
    var target=pos(cur);
    if(target.w<=0) return false;
    ind=document.createElement('span');ind.className='nav-ind';ul.appendChild(ind);nav.classList.add('has-ind');
    var prev=null;try{prev=JSON.parse(sessionStorage.getItem('navInd'))}catch(e){}
    if(prev&&prev.w>0&&Math.abs(prev.l-target.l)>1){
      instant(prev);
      requestAnimationFrame(function(){set(target)});
    }else{instant(target)}
    save(target);
    return true;
  }
  function refresh(){
    if(!init()) return;
    var p=pos(cur);
    if(p.w>0){instant(p);save(p)}
  }
  init();
  window.addEventListener('resize',refresh);
  window.addEventListener('load',function(){if(ind){var p=pos(cur);if(p.w>0&&Math.abs(p.l-(parseFloat(ind.style.left)||0))>1){instant(p);save(p)}}else{init()}});
})();
