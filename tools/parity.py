import sys
from playwright.sync_api import sync_playwright
url=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto(url,wait_until='networkidle'); pg.wait_for_timeout(800)
    act=lambda: pg.evaluate("[...document.querySelectorAll('.home-photo-slider-widget-slider-navigation-img')].findIndex(e=>e.classList.contains('active'))")
    pg.locator('.home-photo-slider-widget-slider-next').first.scroll_into_view_if_needed()
    seq=[act()]
    for s in ['next','next','previous']:
        pg.locator('.home-photo-slider-widget-slider-'+s).first.click(); pg.wait_for_timeout(600); seq.append(act())
    print('photo slider active idx (start,next,next,prev):',seq)
    pg.evaluate('scrollTo(0,0)')
    pg.locator('select').nth(0).select_option(index=2); pg.wait_for_timeout(1500)
    print('selects options after type choose:',pg.evaluate("[...document.querySelectorAll('select')].map(s=>s.options.length)"))
    pg.locator('select').nth(1).select_option(index=1); pg.wait_for_timeout(1500)
    print('after level choose:',pg.evaluate("[...document.querySelectorAll('select')].map(s=>s.options.length)"))
    lis=pg.locator('ul.menu > li, .menus-widget ul > li, [class*=menus] > ul > li')
    print('top menu li',lis.count())
    pg.locator('.widget.menus-widget li, [class*=menus-widget] li').nth(1).hover(); pg.wait_for_timeout(500)
    print('visible dropdown panels:',pg.evaluate("[...document.querySelectorAll('[class*=menus] ul ul, [class*=menus] .dropdown, [class*=menus] .submenu')].filter(e=>e.getBoundingClientRect().height>0).length"))
    b.close()
