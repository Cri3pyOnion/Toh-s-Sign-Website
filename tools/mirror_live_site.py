"""Snapshot the live tohssign.com design into a static folder that runs on localhost.

Read-only: it only downloads public pages and their CSS/JS/images/fonts. Nothing on
WordPress is changed.

    python tools/mirror_live_site.py            # writes ./current-site
    python -m http.server 8080 -d current-site  # then open http://localhost:8080
"""

from __future__ import annotations

import hashlib
import html
import mimetypes
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urljoin, urlsplit

SITE = "https://tohssign.com/"
SITE_HOST = "tohssign.com"
OUT = Path(__file__).resolve().parent.parent / "current-site"
MAX_PAGES = 50
UA = "Mozilla/5.0 (site snapshot)"

# Third-party hosts whose files are copied locally (images, CSS, JS, fonts).
ASSET_HOSTS = {SITE_HOST, "i0.wp.com", "i1.wp.com", "i2.wp.com", "s0.wp.com", "s1.wp.com",
               "s2.wp.com", "fonts.googleapis.com", "fonts.gstatic.com", "fonts.wp.com"}
# Scripts that would send analytics/tracking from localhost: removed from the snapshot.
DROP_SCRIPT_HOSTS = {"stats.wp.com", "pixel.wp.com", "www.googletagmanager.com"}
EXTRA_FILES = [
    "/wp-content/plugins/gptranslate/assets/js/dom.min.js",
    "/wp-content/plugins/gptranslate/assets/js/jsonrepair/index.js",
    "/wp-content/plugins/gptranslate/assets/js/jsonrepair/regular/jsonrepair.js",
    "/wp-content/plugins/gptranslate/assets/js/jsonrepair/utils/JSONRepairError.js",
]
SKIP_PAGE_PATHS =("/wp-json", "/feed", "/comments/feed", "/xmlrpc.php", "/wp-admin", "/wp-login")
ASSET_EXT = {".css", ".js", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif", ".svg", ".ico",
             ".woff", ".woff2", ".ttf", ".otf", ".eot", ".mp4", ".webm", ".json", ".map"}

EXT_BY_TYPE = {"text/css": ".css", "application/javascript": ".js", "text/javascript": ".js",
               "image/svg+xml": ".svg", "image/webp": ".webp", "image/png": ".png",
               "image/jpeg": ".jpg", "image/gif": ".gif", "font/woff2": ".woff2",
               "font/woff": ".woff", "application/json": ".json", "image/x-icon": ".ico"}

ATTR_RE = re.compile(r'''(?:src|href|data-src|data-lazy-src|poster)\s*=\s*(["'])(.*?)\1''', re.I | re.S)
SRCSET_RE = re.compile(r'''(?:srcset|data-srcset|imagesrcset)\s*=\s*(["'])(.*?)\1''', re.I | re.S)
CSS_URL_RE = re.compile(r'''url\(\s*(['"]?)([^'")]+)\1\s*\)''', re.I)
CSS_IMPORT_RE = re.compile(r'''@import\s+(['"])([^'"]+)\1''', re.I)

fetched: dict[str, tuple[bytes, str]] = {}   # absolute url -> (body, content-type)
local_of: dict[str, str] = {}                # absolute url -> local web path ("/x/y.css")


def fetch(url: str) -> tuple[bytes, str, str] | None:
    """Return (body, content_type, final_url) or None on failure."""
    if url in fetched:
        body, ctype = fetched[url]
        return body, ctype, url
    src = url
    # Photon CDN (i0.wp.com/<host>/<path>?resize=…) rejects urllib; fetch the original image instead.
    m = re.match(r"https?://i\d\.wp\.com/([^?]+)", url)
    if m:
        src = "https://" + m.group(1)
    req = urllib.request.Request(src, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            body = r.read()
            ctype = r.headers.get_content_type()
            final = r.geturl()
    except Exception as e:  # network errors, bad URLs found in markup, etc.
        print(f"  ! {url}: {e}", file=sys.stderr)
        return None
    fetched[url] = (body, ctype)
    return body, ctype, final


def local_path_for(url: str, ctype: str) -> str:
    parts = urlsplit(url)
    path = parts.path or "/"
    if path.endswith("/"):
        path += "index"
    stem, ext = Path(path).stem, Path(path).suffix.lower()
    parent = str(Path(path).parent).replace("\\", "/")
    if ext not in ASSET_EXT:
        ext = EXT_BY_TYPE.get(ctype) or mimetypes.guess_extension(ctype) or ".bin"
        stem = Path(path).name or "index"
    if parts.query:
        stem += "__" + hashlib.md5(parts.query.encode()).hexdigest()[:8]
    stem = re.sub(r"[^A-Za-z0-9._-]", "_", stem)[:120]
    prefix = "" if parts.hostname == SITE_HOST else f"/_ext/{parts.hostname}"
    parent = re.sub(r"[^A-Za-z0-9._/-]", "_", parent)
    return f"{prefix}{parent.rstrip('/')}/{stem}{ext}"


def write(local: str, body: bytes) -> None:
    dest = OUT / local.lstrip("/")
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(body)


def is_asset_url(url: str) -> bool:
    p = urlsplit(url)
    return p.scheme in ("http", "https") and p.hostname in ASSET_HOSTS and (
        p.hostname != SITE_HOST or Path(p.path).suffix.lower() in ASSET_EXT
        or p.path.startswith(("/_static/", "/_jb_static/", "/wp-content/", "/wp-includes/")))


def save_asset(url: str, depth: int = 0) -> str | None:
    """Download an asset (recursing into CSS) and return its local web path."""
    if url in local_of:
        return local_of[url]
    got = fetch(url)
    if not got:
        return None
    body, ctype, _ = got
    local = local_path_for(url, ctype)
    local_of[url] = local
    if (ctype == "text/css" or local.endswith(".css")) and depth < 4:
        body = rewrite_css(body.decode("utf-8", "replace"), url, depth).encode("utf-8")
    write(local, body)
    print(f"  + {local}")
    return local


def rewrite_css(css: str, base: str, depth: int) -> str:
    def repl(m: re.Match) -> str:
        raw = m.group(2).strip()
        if raw.startswith(("data:", "#")):
            return m.group(0)
        absu = urljoin(base, html.unescape(raw))
        local = save_asset(absu, depth + 1) if is_asset_url(absu) else None
        return m.group(0).replace(raw, local) if local else m.group(0)
    css = CSS_IMPORT_RE.sub(repl, css)
    return CSS_URL_RE.sub(repl, css)


def rewrite_page(page_html: str, page_url: str, queue: list[str]) -> str:
    # Remove tracking scripts so local previews don't send analytics.
    for host in DROP_SCRIPT_HOSTS:
        page_html = re.sub(r'<script[^>]+src=["\']https?://' + re.escape(host) + r'[^>]*>\s*</script>', "", page_html, flags=re.I)

    replacements: dict[str, str] = {}

    def consider(raw: str) -> None:
        raw = raw.strip()
        if not raw or raw.startswith(("data:", "#", "mailto:", "tel:", "javascript:")) or raw in replacements:
            return
        absu = urljoin(page_url, html.unescape(raw))
        p = urlsplit(absu)
        if is_asset_url(absu):
            local = save_asset(absu)
            if local:
                replacements[raw] = local
        elif p.hostname == SITE_HOST and not p.path.startswith(SKIP_PAGE_PATHS):
            clean = f"{p.scheme}://{p.hostname}{p.path or '/'}"
            if clean not in queue:
                queue.append(clean)
            replacements[raw] = (p.path or "/") + (f"#{p.fragment}" if p.fragment else "")

    for m in ATTR_RE.finditer(page_html):
        consider(m.group(2))
    for m in SRCSET_RE.finditer(page_html):
        for item in m.group(2).split(","):
            if item.strip():
                consider(item.strip().split()[0])
    for m in CSS_URL_RE.finditer(page_html):   # inline <style> and style="" attributes
        consider(m.group(2))

    for raw in sorted(replacements, key=len, reverse=True):
        page_html = re.sub(r'(?<=["\'\s(,])' + re.escape(raw) + r'(?=["\'\s),])', replacements[raw], page_html)
    return page_html


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    queue = [SITE]
    done: set[str] = set()
    while queue and len(done) < MAX_PAGES:
        url = queue.pop(0)
        got = fetch(url)
        if not got:
            continue
        body, ctype, final = got
        if ctype != "text/html":
            continue
        fp = urlsplit(final)
        key = fp.path or "/"
        if key in done:
            continue
        done.add(key)
        done.add(urlsplit(url).path or "/")
        print(f"page {final}")
        page = rewrite_page(body.decode("utf-8", "replace"), final, queue)
        for p in {urlsplit(url).path or "/", key}:
            write((p.rstrip("/") + "/index.html") if not p.endswith(".html") else p, page.encode("utf-8"))
    # Files that scripts load at runtime (not referenced in the HTML), saved at their plain path.
    for path in EXTRA_FILES:
        got = fetch(urljoin(SITE, path))
        if got:
            write(path, got[0])
            print(f"  + {path} (runtime)")
    print(f"\nDone: {len(done)} page paths, {len(local_of)} assets -> {OUT}")


if __name__ == "__main__":
    main()
