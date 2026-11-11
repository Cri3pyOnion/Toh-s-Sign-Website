# Toh's Sign — website

Version-controlled work on the [tohssign.com](https://tohssign.com) website.
Nothing in this repo is connected to WordPress yet — the live site is untouched.

| Folder | What it is |
|---|---|
| `current-site/` | Static snapshot of the **current live design**, runs on localhost |
| `tools/mirror_live_site.py` | Re-takes that snapshot from the live site (read-only) |
| `theme/` | Starting point for the **new design** (custom WordPress block theme) |

## Run the current design locally

Requires Python 3 (no WordPress, PHP or database needed).

```bash
python -m http.server 8080 -d current-site
```

Open <http://localhost:8080>.

The snapshot is a frozen copy of the public homepage with all its CSS, JS, images and fonts
stored locally. It looks and scrolls like the live site, but anything that needs the WordPress
server (contact/newsletter forms, search, translation API, analytics) won't work. Analytics
scripts are stripped so local visits are not counted as real traffic.

### Refresh the snapshot

```bash
python tools/mirror_live_site.py
```

This overwrites `current-site/` with whatever is live right now. Commit the result to keep history.

## New design (later)

`theme/` is a WordPress block theme (`theme.json`, `templates/`, `parts/`, `patterns/`, `assets/`).
When we're ready to put it on WordPress, the plan is: GitHub Deployments → a staging copy of
tohssign.com → sync to production once approved. Until then it only lives here.
