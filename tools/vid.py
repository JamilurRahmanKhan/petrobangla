from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(1500)
    y=pg.evaluate("document.querySelector('.video-card-carousel-container').getBoundingClientRect().top+scrollY-200")
    pg.evaluate(f'scrollTo(0,{y})'); pg.wait_for_timeout(2500)
    pg.screenshot(path='evidence/video_viewport.png')
    print(pg.evaluate("[...document.querySelectorAll('.video-gallery-widget-slider')].map(e=>{const r=e.getBoundingClientRect();const im=e.querySelector('img').getBoundingClientRect();return [Math.round(r.x),Math.round(im.width),getComputedStyle(e.querySelector('.video-thumbnail')).opacity]})"))
    b.close()
