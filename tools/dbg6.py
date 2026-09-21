from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(2000)
    pg.locator('.video-card-carousel-container').scroll_into_view_if_needed(); pg.wait_for_timeout(1200)
    print(pg.evaluate("""()=>{const out=[];let e=document.querySelector('.video-gallery-widget-slider');while(e&&e!==document.body){const cs=getComputedStyle(e);const r=e.getBoundingClientRect();out.push(e.className.toString().slice(0,45)+' ['+Math.round(r.x)+','+Math.round(r.width)+'] ov='+cs.overflowX+' sl='+e.scrollLeft+' op='+cs.opacity+' tr='+cs.transform.slice(0,30));e=e.parentElement}return out.slice(0,7).join('\\n')}"""))
    pg.locator('.video-card-carousel-container').screenshot(path='evidence/video.png')
    b.close()
