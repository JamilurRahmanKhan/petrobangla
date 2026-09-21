from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    for w in (1440,1024,768,375):
        pg=b.new_page(viewport={'width':w,'height':900},device_scale_factor=2); pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(900)
        r=pg.evaluate("""()=>[...document.querySelectorAll('.office-findthree-widget select,.office-findthree-widget button')].map(e=>{const b=e.getBoundingClientRect();return [Math.round(b.x),Math.round(b.y*10)/10,Math.round(b.width),Math.round(b.height)]})""")
        ov=pg.evaluate("document.documentElement.scrollWidth")
        print(w,r,'scrollW',ov)
        pg.screenshot(path=f'evidence/finder_{w}.png',clip={'x':0,'y':0,'width':min(w,1240),'height':70 if w>=768 else 220})
        pg.close()
    b.close()
