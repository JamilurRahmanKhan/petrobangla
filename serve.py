#!/usr/bin/env python3
"""Static server for the mirror; resolves ?query files (office finder data) and JSON types."""
import http.server, os, sys, urllib.parse
ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),"site")
class H(http.server.SimpleHTTPRequestHandler):
    def __init__(s,*a,**k): super().__init__(*a,directory=ROOT,**k)
    def translate_path(s,path):
        if path.split("?")[0] in ("/","/index.html"):
            en="lang=en" in (s.headers.get("Cookie") or "").replace(" ","").split(";")
            return os.path.join(ROOT,"index.en.html" if en else "index.html")
        if "?" in path and path.startswith("/ajax/"):
            return os.path.join(ROOT,urllib.parse.unquote(path.lstrip("/")))
        return super().translate_path(path)
    def end_headers(s):
        s.send_header("Vary","Cookie"); s.send_header("Cache-Control","no-store"); super().end_headers()
    def guess_type(s,path):
        return "application/json" if "/ajax/" in path else super().guess_type(path)
if __name__=="__main__":
    port=int(sys.argv[1]) if len(sys.argv)>1 else 4173
    http.server.ThreadingHTTPServer(("",port),H).serve_forever()
