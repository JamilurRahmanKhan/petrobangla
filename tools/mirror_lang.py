import re, os, sys, urllib.request, urllib.parse, hashlib
BASE="https://petrobangla.org.bd/"
OUT="site"
import os as _o
COOKIE=_o.environ.get("COOKIE","");OUTNAME=_o.environ.get("OUTNAME","index.html")
UA={"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36"}
seen={}
import subprocess
def fetch(u):
    r=subprocess.run(["curl","-sSL"]+(["-H","Cookie: "+COOKIE] if COOKIE and u.startswith(BASE) else [])+["--max-time","60","-A",UA["User-Agent"],"-w","\n%{content_type}","-f",u],capture_output=True)
    if r.returncode!=0: raise Exception(r.stderr.decode()[:120])
    body,_,ct=r.stdout.rpartition(b"\n")
    return body, ct.decode()
EXT={"text/css":".css","javascript":".js","image/png":".png","image/jpeg":".jpg","image/svg":".svg","image/gif":".gif","image/webp":".webp","font/woff2":".woff2","font/woff":".woff","font/ttf":".ttf","video/mp4":".mp4","audio/mpeg":".mp3","image/x-icon":".ico","image/vnd.microsoft.icon":".ico"}
def local_for(u, ctype):
    p=urllib.parse.urlparse(u)
    path=p.path.lstrip("/") or "index"
    if p.netloc and p.netloc!="petrobangla.org.bd": path=p.netloc+"/"+path
    if p.query: path+="_"+hashlib.md5(p.query.encode()).hexdigest()[:6]
    if not os.path.splitext(path)[1]:
        for k,v in EXT.items():
            if k in ctype: path+=v;break
    return "assets/"+path.replace("..","_")
def get(u, ref):
    u=urllib.parse.urljoin(ref,u.strip())
    u=u.split("#")[0]
    if not u.startswith("http"): return None
    if u in seen: return seen[u]
    seen[u]=None
    _ct=""
    import glob
    _p=os.path.join(OUT,local_for(u,"")) 
    if os.path.exists(_p) and os.path.splitext(_p)[1]: seen[u]=local_for(u,""); return seen[u]
    try: data,ct=fetch(u)
    except Exception as e:
        print("FAIL",u,e,file=sys.stderr); return None
    loc=local_for(u,ct)
    if "text/css" in ct or loc.endswith(".css"):
        css=data.decode("utf8","ignore")
        css=rewrite_css(css,u,loc)
        data=css.encode()
    fp=os.path.join(OUT,loc); os.makedirs(os.path.dirname(fp),exist_ok=True)
    open(fp,"wb").write(data); seen[u]=loc; return loc
def rel(loc,fromloc): return os.path.relpath(loc,os.path.dirname(fromloc))
def rewrite_css(css,base,selfloc):
    def sub(m):
        u=m.group(2)
        if u.startswith("data:"): return m.group(0)
        l=get(u,base)
        return "url("+m.group(1)+(rel(l,selfloc) if l else u)+m.group(1)+")" if l else m.group(0)
    css=re.sub(r"url\((['\"]?)([^)'\"]+)\1\)",sub,css)
    def imp(m):
        l=get(m.group(2),base); return "@import "+m.group(1)+(rel(l,selfloc) if l else m.group(2))+m.group(1) if l else m.group(0)
    return re.sub(r"@import\s+(['\"])([^'\"]+)\1",imp,css)
html,_=fetch(BASE); html=html.decode("utf8")
html=re.sub(r"<script[^>]*plausible[^>]*></script>","",html)
def attr(m):
    a,q,u=m.group(1),m.group(2),m.group(3)
    if u.startswith(("#","mailto:","tel:","javascript:","data:")): return m.group(0)
    # keep navigation links pointing home; only mirror resources
    tagtxt=m.group(0)
    return m.group(0)
# resources: link href (stylesheet/icon), script src, img/video/audio/source src, poster
def res(m):
    pre,q,u=m.group(1),m.group(2),m.group(3)
    l=get(u,BASE)
    return f"{pre}{q}{l}{q}" if l else m.group(0)
html=re.sub(r'(<link[^>]*?\shref=)(["\'])([^"\']+)\2',lambda m: res(m) if re.search(r'rel=["\'](stylesheet|icon|shortcut icon|apple-touch-icon)',m.group(0)) or True else m.group(0),html)
html=re.sub(r'(<(?:script|img|source|video|audio|iframe)[^>]*?\s(?:src|data-src)=)(["\'])([^"\']+)\2',res,html)
html=re.sub(r'(\sposter=)(["\'])([^"\']+)\2',res,html)
html=re.sub(r'(\ssrcset=)(["\'])([^"\']+)\2',lambda m: m.group(0),html)
def inline_css(m):
    return "url("+m.group(1)+(get(m.group(2),BASE) or m.group(2))+m.group(1)+")" if not m.group(2).startswith("data:") else m.group(0)
html=re.sub(r"url\((['\"]?)([^)'\"]+)\1\)",inline_css,html)
open(os.path.join(OUT,OUTNAME),"w").write(html)
print(len(seen),"assets")
