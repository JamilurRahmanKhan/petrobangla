from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(1000)
    print(pg.evaluate("""()=>{const w=document.querySelector('.office-findthree-widget');
      const r=e=>{const b=e.getBoundingClientRect();return [Math.round(b.x),Math.round(b.y),Math.round(b.width),Math.round(b.height)]};
      const out=[w.outerHTML.replace(/\\s+/g,' ').slice(0,1400)];
      w.querySelectorAll('select,button,.select-wrapper,div').forEach(e=>{const cs=getComputedStyle(e);out.push(e.tagName+'.'+e.className+' '+r(e)+' fs='+cs.fontSize+' pad='+cs.padding+' disp='+cs.display+' w='+cs.width)});
      return out.join('\\n')}"""))
    b.close()
