from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(1500)
    print(pg.evaluate("""()=>{const rt=document.querySelectorAll('.block-widget')[1].querySelector('rt-renderer');const sr=rt.shadowRoot;
      return [...sr.children].filter(e=>e.tagName!='STYLE').map(e=>e.tagName+' h='+Math.round(e.getBoundingClientRect().height)+' mt='+getComputedStyle(e).marginTop+' pad='+getComputedStyle(e).padding+' lh='+getComputedStyle(e).lineHeight+' ::'+e.innerHTML.replace(/<[^>]+>/g,'').slice(0,30)).join('\\n')+'\\nadopted='+sr.adoptedStyleSheets.length}"""))
    b.close()
