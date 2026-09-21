from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(2500)
    print(pg.evaluate("""()=>{const r=e=>{const b=e.getBoundingClientRect();return [Math.round(b.x),Math.round(b.y+scrollY),Math.round(b.width),Math.round(b.height)]};
     const c=document.querySelector('.video-gallery-widget-carousel');const cs=getComputedStyle(c);
     const cap=[...document.querySelectorAll('.photo-slider-caption')].find(e=>e.offsetParent);const ccs=cap&&getComputedStyle(cap);
     return JSON.stringify({carousel:{rect:r(c),disp:cs.display,jc:cs.justifyContent,tr:cs.transform,gap:cs.gap,pl:cs.paddingLeft,ml:cs.marginLeft},
      kids:[...c.children].map(k=>({cls:k.className,rect:r(k),tr:getComputedStyle(k).transform,ml:getComputedStyle(k).marginLeft,flex:getComputedStyle(k).flex})),
      cap:cap&&{color:ccs.color,bg:ccs.backgroundColor,op:ccs.opacity,fs:ccs.fontSize,txt:cap.textContent.trim()}})}"""))
    b.close()
