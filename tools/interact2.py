import hashlib
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    bad=[]; pg.on('response',lambda r: bad.append(r.url) if r.status>=400 else None)
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(800)
    blk=pg.locator('.home-photo-slider-widget-block').first
    blk.scroll_into_view_if_needed(); pg.wait_for_timeout(500)
    h=lambda: hashlib.md5(blk.screenshot()).hexdigest()[:8]
    a=h(); pg.locator('.home-photo-slider-widget-slider-next').first.click(); pg.wait_for_timeout(1200); n=h()
    pg.locator('.home-photo-slider-widget-slider-next').first.click(); pg.wait_for_timeout(1200); n2=h()
    pg.locator('.home-photo-slider-widget-slider-previous').first.click(); pg.wait_for_timeout(1200); pv=h()
    print('photo slider frames start/next/next/prev:',a,n,n2,pv,'| changes on next:',a!=n,n!=n2,'prev returns to prior:',pv==n)
    # thumbnail click
    th=pg.locator('.home-photo-slider-widget-slider-navigation-img'); th.nth(3).click(); pg.wait_for_timeout(1000); print('thumb click changes:',h()!=pv)
    # video carousel
    vc=pg.locator('.video-card-carousel-container').first; vc.scroll_into_view_if_needed(); pg.wait_for_timeout(300)
    hv=lambda: hashlib.md5(vc.screenshot()).hexdigest()[:8]; v0=hv()
    nx=pg.locator('.video-card-carousel-container [class*=next], .video-card-carousel-container button').last; nx.click(); pg.wait_for_timeout(1000); print('video carousel changes:',v0!=hv())
    # office finder
    pg.evaluate('scrollTo(0,0)')
    sels=pg.locator('select'); print('selects before',pg.evaluate("[...document.querySelectorAll('select')].map(s=>s.options.length)"))
    sels.nth(0).select_option(index=2); pg.wait_for_timeout(1200)
    print('selects after',pg.evaluate("[...document.querySelectorAll('select')].map(s=>s.options.length)"))
    # nav dropdown hover
    m=pg.locator('[class*=menus] > ul > li, [class*=menu] > li').nth(1); m.hover(); pg.wait_for_timeout(500)
    print('visible submenus after hover:',pg.evaluate("[...document.querySelectorAll('[class*=menus] ul ul, [class*=menu] ul ul')].filter(e=>e.getBoundingClientRect().height>0&&getComputedStyle(e).visibility!='hidden').length"))
    print('bad',bad); b.close()
