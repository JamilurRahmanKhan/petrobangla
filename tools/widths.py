from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,h in [(375,812),(768,1024),(1280,800),(1440,900),(1920,1080)]:
        pg=b.new_page(viewport={'width':w,'height':h}); pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(1200)
        for y in range(0,6000,700): pg.evaluate(f'scrollTo(0,{y})'); pg.wait_for_timeout(120)
        pg.evaluate('scrollTo(0,0)'); pg.wait_for_timeout(400)
        pg.screenshot(path=f'evidence/clone_{w}.png',full_page=True)
        print(w,'scrollW',pg.evaluate('document.documentElement.scrollWidth'),'h',pg.evaluate('document.documentElement.scrollHeight')); pg.close()
    b.close()
