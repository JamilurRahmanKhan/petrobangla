import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    bad=[]; pg.on('response',lambda r: bad.append(r.url) if r.status>=400 else None)
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(1000)
    cap=lambda: pg.evaluate("document.querySelector('.photo-slider-caption')?.innerText")
    img=lambda: pg.evaluate("(()=>{const i=[...document.querySelectorAll('.home-photo-slider-widget-slider-image')].find(e=>{const r=e.getBoundingClientRect();return r.width>0&&getComputedStyle(e).display!='none'&&getComputedStyle(e).opacity!='0'});return i&&(i.currentSrc||i.src||i.style.backgroundImage)})()")
    pg.locator('.home-photo-slider-widget-slider-next').first.scroll_into_view_if_needed()
    c0=cap(); pg.locator('.home-photo-slider-widget-slider-next').first.click(); pg.wait_for_timeout(800); c1=cap()
    pg.locator('.home-photo-slider-widget-slider-previous').first.click(); pg.wait_for_timeout(800); c2=cap()
    print('photo slider caption:',c0,'->next->',c1,'->prev->',c2)
    pg.locator('.home-photo-slider-widget-scroll-right-btn').first.click(); pg.wait_for_timeout(500); print('thumb scroll ok')
    # banner (top) slider autoplay
    pg.evaluate('scrollTo(0,0)')
    s=lambda: pg.evaluate("[...document.querySelectorAll('.home-carousel .slider')].map(e=>getComputedStyle(e).display+getComputedStyle(e).opacity).join(',')")
    a=s(); pg.wait_for_timeout(6500); print('banner state changes over 6.5s:', a!=s(), a[:40], '|', s()[:40])
    # video carousel
    vb=pg.locator('.video-card-carousel-container [class*=next], .video-card-carousel-container button, .slider-carousel [class*=next]')
    print('video carousel controls',vb.count())
    # nav menu dropdown
    lis=pg.locator('.widget[class*=menus] li, [class*=menus-widget] li, [class*=menu] > li')
    print('menu li',lis.count())
    # go to top
    pg.evaluate('scrollTo(0,3000)'); pg.wait_for_timeout(600)
    g=pg.locator('.go-to-top-widget :visible')
    print('gototop',g.count())
    if g.count(): g.first.click(); pg.wait_for_timeout(1500); print('scrollY after click',pg.evaluate('scrollY'))
    # office finder
    print('selects',pg.evaluate("[...document.querySelectorAll('select')].map(s=>s.options.length)"))
    pg.locator('select').first.select_option(index=1); pg.wait_for_timeout(1000)
    print('after type select',pg.evaluate("[...document.querySelectorAll('select')].map(s=>s.options.length)"))
    print('bad',bad)
    b.close()
