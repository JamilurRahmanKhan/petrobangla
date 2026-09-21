from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(1000)
    print(pg.evaluate("""()=>{const t=document.querySelectorAll('.service-box-title')[3];const cs=getComputedStyle(t);
     return JSON.stringify({pos:cs.position,left:cs.left,top:cs.top,ml:cs.marginLeft,pl:cs.paddingLeft,transform:cs.transform,disp:cs.display,w:cs.width,h:cs.height,gc:cs.gridColumn,gr:cs.gridRow,parent:getComputedStyle(t.parentElement).display,pcls:t.parentElement.className})}"""))
    b.close()
