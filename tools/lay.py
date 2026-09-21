from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(1500)
    print(pg.evaluate("""()=>{const r=e=>{const b=e.getBoundingClientRect();return [Math.round(b.x),Math.round(b.y+scrollY),Math.round(b.width),Math.round(b.height)]};
     const L=document.querySelector('[data-section_type="body"]'),R=document.querySelector('[data-section_type="right"]');
     const d=e=>e.tagName+'.'+e.className.toString().split(' ').filter(c=>!c.startsWith('pb-')).join('.')+' '+r(e);
     const out=['L: '+d(L),'R: '+d(R),'parent: '+d(L.parentElement)+' disp='+getComputedStyle(L.parentElement).display+' cols='+getComputedStyle(L.parentElement).gridTemplateColumns,'grandparent: '+d(L.parentElement.parentElement)];
     out.push('--Left children');[...L.querySelectorAll(':scope > *')].forEach(e=>out.push(d(e)));
     out.push('--Right children');[...R.querySelectorAll(':scope > *')].forEach(e=>out.push(d(e)+' | '+(e.querySelector('h1,h3,.person-card-header,.block-widget-title')?.textContent||'').trim().slice(0,30)));
     return out.join('\\n')}"""))
    b.close()
