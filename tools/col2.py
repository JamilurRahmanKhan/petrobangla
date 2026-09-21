import re
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(1000)
    def h(label,js,n=1100):
        v=pg.evaluate(js); print('\n##',label); print(re.sub(r'\s+',' ',v or 'NONE')[:n])
    h('block0',"document.querySelectorAll('.block-widget')[0]?.outerHTML")
    h('block1',"document.querySelectorAll('.block-widget')[1]?.outerHTML")
    h('news-card',"document.querySelector('.news-card-widget')?.outerHTML",1200)
    h('service-expandable tail',"(()=>{const e=document.querySelector('.service-box-expandable-stack-widget');return e.outerHTML.slice(-900)})()",900)
    h('photo slider',"document.querySelector('.home-photo-slider-widget')?.outerHTML.replace(/<img[^>]*>/g,'<img>')",1600)
    h('video',"document.querySelector('.video-card-carousel-widget')?.outerHTML.replace(/<img[^>]*>/g,'<img>')",1400)
    b.close()
