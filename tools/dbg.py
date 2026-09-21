from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(1000)
    print(pg.evaluate("""()=>{const i=document.querySelector('.notice-title i');const cs=getComputedStyle(i),bs=getComputedStyle(i,'::before'),t=getComputedStyle(document.querySelector('.notice-title'));
     const mq=document.querySelectorAll('.block-widget')[1];const r=e=>{const b=e.getBoundingClientRect();return Math.round(b.height)};
     return JSON.stringify({icon:{font:cs.fontFamily,fs:cs.fontSize,color:cs.color,disp:cs.display,before:bs.content,bfont:bs.fontFamily,w:cs.width},
       titleBorder:t.borderBottom, listPad:getComputedStyle(document.querySelector('.notice-content-list')).padding,
       mq:{widget:r(mq),content:r(mq.querySelector('.block-widget-content')),rt:r(mq.querySelector('rt-renderer')),mqEl:r(mq.querySelector('rt-renderer').shadowRoot.querySelector('marquee')),mqP:mq.querySelector('rt-renderer').shadowRoot.querySelector('marquee p')&&r(mq.querySelector('rt-renderer').shadowRoot.querySelector('marquee p'))}})}"""))
    b.close()
