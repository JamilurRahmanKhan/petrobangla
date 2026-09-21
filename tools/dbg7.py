from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(2500)
    print(pg.evaluate("""()=>{const r=e=>{const b=e.getBoundingClientRect();return [Math.round(b.x),Math.round(b.y+scrollY),Math.round(b.width),Math.round(b.height)]};
    const L=document.querySelector('[data-section_type=body]'),R=document.querySelector('[data-section_type=right]'),X=document.querySelector('.pb-extra');
    const cs=e=>{const s=getComputedStyle(e);return s.display+' '+s.position+' '+s.float+' '+s.overflow};
    return ['L '+r(L)+' '+cs(L),'R '+r(R)+' '+cs(R),'body '+r(L.parentElement)+' '+cs(L.parentElement)+' '+L.parentElement.className,'wrapper '+r(L.parentElement.parentElement)+' '+cs(L.parentElement.parentElement),
      'X '+(X?r(X)+' parent='+X.parentElement.className:'none'),'Xprev='+(X&&X.previousElementSibling&&X.previousElementSibling.className),'Lchildren='+L.children.length,'Rchildren='+R.children.length].join('\\n')}"""))
    b.close()
