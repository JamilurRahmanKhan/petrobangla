import re
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    bad=[]; pg.on('response',lambda r: bad.append((r.status,r.url[-70:])) if r.status>=400 else None)
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(2000)
    print(pg.evaluate("""()=>{const k=document.querySelectorAll('.video-gallery-widget-slider');return [...k].map(e=>{const im=e.querySelector('img');return JSON.stringify({imgsrc:im&&im.getAttribute('src'),nat:im&&[im.naturalWidth,im.naturalHeight],op:getComputedStyle(e).opacity,vis:getComputedStyle(e).visibility,html:e.outerHTML.replace(/onclick="[^"]*"/,'').replace(/\\s+/g,' ').slice(0,500)})}).join('\\n')}"""))
    print(bad[:6]); b.close()
