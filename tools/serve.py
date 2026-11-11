"""Local preview server that tells the browser never to cache, so every refresh
shows the latest files.

    python tools/serve.py redesign 8081
    python tools/serve.py current-site 8080
"""

import functools
import http.server
import sys


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Expires", "0")
        super().end_headers()


def main() -> None:
    folder = sys.argv[1] if len(sys.argv) > 1 else "redesign"
    port = int(sys.argv[2]) if len(sys.argv) > 2 else 8081
    handler = functools.partial(NoCacheHandler, directory=folder)
    with http.server.ThreadingHTTPServer(("127.0.0.1", port), handler) as httpd:
        print(f"Serving {folder} at http://localhost:{port}")
        httpd.serve_forever()


if __name__ == "__main__":
    main()
