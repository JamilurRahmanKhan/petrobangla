(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  var sel='.notice-news-card-widget,.service-box-widget,.internal-eservice-card-widget,.important-link-card-widget,.home-photo-slider-widget-block,.video-card-carousel-container,.footer-widget';
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('pb-in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -6% 0px',threshold:.06});
  function init(){document.querySelectorAll(sel).forEach(function(el,i){
    if(el.getBoundingClientRect().top<innerHeight*.9)return; // above the fold: never hide
    el.classList.add('pb-reveal');el.style.transitionDelay=(i%3)*70+'ms';io.observe(el)})}
  if(document.readyState==='complete')init();else addEventListener('load',init);
})();

/* rich-text blocks (shadow DOM): production figure + single-colour ticker */
(function(){
  var CSS_PROD='p{margin:0!important;text-align:center!important}p:first-child span,p:first-child strong{color:#4a5a51!important;font-size:14px!important;font-weight:500!important}'
    +'p:nth-child(2) span,p:nth-child(2) strong{color:#00602a!important;font-size:28px!important;font-weight:800!important;letter-spacing:.3px}';
  var CSS_TICK='p{margin:0!important}span,strong{color:#14532d!important;font-size:15px!important;font-weight:600!important}strong:empty{display:none}marquee{display:block;height:auto!important;line-height:1.6}p:nth-child(2){display:none!important}p:nth-child(3){margin-top:6px!important}p:nth-child(3) a{text-decoration:none}p:nth-child(3) a:hover{text-decoration:underline}p{line-height:1.6!important;margin:0!important}p:has(> br:only-child){display:none!important}';
  function apply(){document.querySelectorAll('rt-renderer').forEach(function(el){
    var w=el.closest('.block-widget'); if(!w||!el.shadowRoot||el.__pb)return;
    var root=el.shadowRoot, isProd=!!w.querySelector('.block-widget-title'), hasMq=!!root.querySelector('marquee');
    if(!isProd&&!hasMq)return;
    try{var sh=new CSSStyleSheet();sh.replaceSync(isProd?CSS_PROD:CSS_TICK);root.adoptedStyleSheets=(root.adoptedStyleSheets||[]).concat(sh);el.__pb=1}catch(e){}
  })}
  function tags(){document.querySelectorAll('strong.notice-tag').forEach(function(t){var x=t.textContent.trim();if(x==='নতুন'||x.toLowerCase()==='new')t.classList.add('pb-tag-new')})}
  function run(){tags();apply();setTimeout(apply,600);setTimeout(apply,1800)}
  if(document.readyState==='complete')run();else addEventListener('load',run);
})();

/* banner crossfade: mirror the widget's inline display toggling onto a class */
(function(){
  function init(){
    var slides=[].slice.call(document.querySelectorAll('.home-carousel .slider.images'));
    if(!slides.length)return;
    function sync(){var on=slides.filter(function(s){return s.style.display!=='none'});
      slides.forEach(function(s){s.classList.toggle('pb-active',on[0]===s)})}
    var mo=new MutationObserver(sync);
    slides.forEach(function(s){mo.observe(s,{attributes:true,attributeFilter:['style']})});
    sync();
  }
  if(document.readyState!=='loading')init();else addEventListener('DOMContentLoaded',init);
})();
