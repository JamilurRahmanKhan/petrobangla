import sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    errs=[]; pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(1500)
    pg.screenshot(path='evidence/after_top.png')
    pg.locator('.menu-parent-list').nth(0).hover(); pg.wait_for_timeout(500)
    pg.screenshot(path='evidence/after_menu.png',clip={'x':200,'y':250,'width':1040,'height':420})
    pg.evaluate('scrollTo(0,1000)'); pg.wait_for_timeout(1200); pg.screenshot(path='evidence/after_mid.png')
    print('errs',[e for e in errs if '404' not in e][:3])
    b.close()
