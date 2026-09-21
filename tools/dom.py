from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(1200)
    print(pg.evaluate("""()=>{
      const q=s=>[...document.querySelectorAll(s)].slice(0,3).map(e=>e.tagName+'.'+e.className.toString().split(' ').join('.')+' bg='+getComputedStyle(e).backgroundColor+' col='+getComputedStyle(e).color+' font='+getComputedStyle(e).fontFamily.slice(0,30)).join('\\n');
      return ['.header','.header .widget','.home-carousel','.slider-overlay','.slider-left','.slider-controls','[class*=menus-widget]','[class*=menus-widget] > ul','[class*=menus-widget] li > a','.container','body','.notice','[class*=notice-news] ','[class*=service-box] ','[class*=person-card]','[class*=footer]','footer','h1','h2','h3'].map(s=>s+':\\n'+q(s)).join('\\n')}"""))
    pg.screenshot(path='evidence/before_top.png')
    b.close()
