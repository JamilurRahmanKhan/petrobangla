from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.context.add_cookies([{'name':'lang','value':'en','url':'http://localhost:4173'}])
    pg.goto('http://localhost:4173/',wait_until='networkidle'); pg.wait_for_timeout(2500)
    print(pg.evaluate("""()=>{const bn=/[\\u0980-\\u09FF]/;const out=[];
      const walk=(root,path)=>{const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const t=n.textContent.trim();if(t&&bn.test(t)&&!/^(SCRIPT|STYLE)$/.test(n.parentElement.tagName)&&!n.parentElement.closest('select,option'))out.push((path||'')+n.parentElement.tagName+'.'+(n.parentElement.className||'')+' :: '+t.slice(0,90))}
        (root.querySelectorAll?root.querySelectorAll('*'):[]).forEach(e=>{if(e.shadowRoot)walk(e.shadowRoot,'[shadow] ')})};
      walk(document.body,'');
      const attrs=[...document.querySelectorAll('[title],[alt],[placeholder],[aria-label]')].filter(e=>['title','alt','placeholder','aria-label'].some(a=>bn.test(e.getAttribute(a)||''))).map(e=>'ATTR '+e.tagName+' '+['title','alt','placeholder','aria-label'].map(a=>e.getAttribute(a)).filter(Boolean).join('|').slice(0,60));
      return out.join('\\n')+'\\n--attrs--\\n'+attrs.slice(0,30).join('\\n')}"""))
    b.close()
