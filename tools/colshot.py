import sys
from playwright.sync_api import sync_playwright
w=int(sys.argv[1]) if len(sys.argv)>1 else 1440
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':w,'height':900})
    errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(1500)
    for y in range(0,3600,500): pg.evaluate(f'scrollTo(0,{y})'); pg.wait_for_timeout(250)
    pg.evaluate('scrollTo(0,0)'); pg.wait_for_timeout(800)
    x=240 if w>=1100 else 0; cw=720 if w>=1100 else w
    pg.screenshot(path=f'evidence/col_{w}_a.png',clip={'x':x,'y':340,'width':cw,'height':1100},full_page=True)
    pg.screenshot(path=f'evidence/col_{w}_b.png',clip={'x':x,'y':1440,'width':cw,'height':1100},full_page=True)
    pg.screenshot(path=f'evidence/col_{w}_c.png',clip={'x':x,'y':2540,'width':cw,'height':900},full_page=True)
    print('pageerrors',errs,'scrollW',pg.evaluate('document.documentElement.scrollWidth'))
    b.close()
