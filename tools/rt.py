from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(1000)
    print(pg.evaluate("""[...document.querySelectorAll('rt-renderer')].slice(0,3).map(e=>({shadow:!!e.shadowRoot,mode:e.shadowRoot&&e.shadowRoot.mode,kids:e.children.length,html:(e.shadowRoot||e).innerHTML.replace(/\\s+/g,' ').slice(0,420)}))"""))
    b.close()
