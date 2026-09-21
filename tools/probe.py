import sys
from playwright.sync_api import sync_playwright
url=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto(url,wait_until='networkidle'); pg.wait_for_timeout(1000)
    print(pg.evaluate("""[...document.querySelectorAll('.video-card-carousel-container button, .video-card-carousel-container [class*=next], .video-card-carousel-container [class*=prev], .video-card-carousel-container [class*=arrow]')].map(e=>e.tagName+'.'+e.className+' '+JSON.stringify(e.getBoundingClientRect().toJSON()).slice(0,60)+' '+getComputedStyle(e).display)"""))
    # photo slider: pause autoplay effect by measuring index via active thumb
    print(pg.evaluate("[...document.querySelectorAll('.home-photo-slider-widget-slider-navigation-img')].map(e=>e.className.replace('home-photo-slider-widget-slider-navigation-img','').trim()||'-').join(',')"))
    pg.locator('.home-photo-slider-widget-slider-next').first.scroll_into_view_if_needed()
    st=lambda: pg.evaluate("[...document.querySelectorAll('.home-photo-slider-widget-slider-navigation-img')].findIndex(e=>/active|selected|current/.test(e.className)||e.style.opacity==1||getComputedStyle(e).opacity=='1')")
    seq=[st()]
    for sel in ['next','next','previous']:
        pg.locator('.home-photo-slider-widget-slider-'+sel).first.click(); pg.wait_for_timeout(700); seq.append(st())
    print('active thumb idx seq (next,next,prev):',seq)
    b.close()
