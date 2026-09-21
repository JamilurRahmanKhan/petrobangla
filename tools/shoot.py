import os,sys
from playwright.sync_api import sync_playwright
T=os.environ['TMPDIR']
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    errs=[]; bad=[]
    pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
    pg.on('response',lambda r: bad.append(r.url) if r.status>=400 else None)
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(1500)
    for y in range(0,5000,600): pg.evaluate(f'scrollTo(0,{y})'); pg.wait_for_timeout(200)
    pg.evaluate('scrollTo(0,0)'); pg.wait_for_timeout(500)
    pg.screenshot(path=T+'/clone_full.png',full_page=True)
    print('bad',bad,'errs',errs[:5])
    print('external runtime:',pg.evaluate("performance.getEntriesByType('resource').map(r=>r.name).filter(n=>!n.startsWith(location.origin))"))
    b.close()
