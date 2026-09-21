import re,sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(1200)
    for y in range(0,3000,500): pg.evaluate(f'scrollTo(0,{y})'); pg.wait_for_timeout(150)
    pg.evaluate('scrollTo(0,0)'); pg.wait_for_timeout(400)
    print(pg.evaluate("""()=>{const m=[...document.querySelectorAll('.widget[data-widget_name], section.widget')].filter(e=>{const r=e.getBoundingClientRect();return r.x>230&&r.x<300&&r.width>500});
      return m.map(e=>{const r=e.getBoundingClientRect();return e.tagName+'.'+e.className.split(' ').join('.')+' '+[Math.round(r.y+scrollY),Math.round(r.height)]}).join('\\n')}"""))
    h=lambda s: print(re.sub(r'\s+',' ',pg.evaluate(f"document.querySelector('{s}')?.outerHTML.slice(0,1500)")))
    for s in ['.notice-news-card-widget','.marquee, [class*=marquee], [class*=ticker]','.service-box-widget','[class*=top-news]']: print('\n##',s); h(s)
    pg.screenshot(path='evidence/col_before.png',clip={'x':230,'y':340,'width':720,'height':1000},full_page=True)
    b.close()
