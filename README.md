# Toh's Sign — website theme

Custom WordPress block theme for [tohssign.com](https://tohssign.com): the new site design.
The repository root **is** the theme folder.

## How changes reach the site

```
edit here → git push (main) → WordPress.com GitHub Deployments → STAGING site
                                                   ↓ (when approved)
                                   Staging → "Sync to production" → tohssign.com
```

- The live site keeps running its current design (Bizorise + Elementor) until the new theme is
  ready and synced to production.
- Deployment destination: `/wp-content/themes/tohs-sign/`

## Structure

| Path | Purpose |
|---|---|
| `theme.json` | Design tokens: colours, type, spacing, layout widths |
| `templates/` | Page templates (front page, page, index, 404) |
| `parts/` | Header and footer |
| `patterns/` | Reusable section designs (hero, services, contact, …) |
| `assets/` | CSS, fonts, images shipped with the theme |

Page **content** (text you type into pages) lives in the WordPress database, not here.
Design, layout and reusable sections live here and are version-controlled.
