# Tejaswini Arava — QA Engineer Portfolio

A responsive, single-page portfolio website built with plain HTML, CSS and vanilla JavaScript.
No frameworks, no build step and no package installation are required, so it can be deployed directly as a static site on Netlify.

## Files

| File         | Purpose                                                        |
| ------------ | -------------------------------------------------------------- |
| `index.html` | Website content and structure (all sections)                   |
| `style.css`  | Colors, layout, animations and responsive styling              |
| `script.js`  | Mobile menu, active-link highlighting, scroll reveal, copy-email button, footer year |
| `README.md`  | These instructions                                             |

All four files must stay together in the same folder (`tejaswini-qa-portfolio`). `index.html` loads `style.css` and `script.js` using relative paths.

## Sections

1. Hero — introduction and links to Projects and Contact
2. About Me — professional summary and testing approach
3. Skills — testing, automation, QA activities, tools and strengths
4. Experience — current QA Engineer role (October 2024 – Present)
5. Projects — SustainStep, I3E, BFAS and ACC-RIM
6. Education & Professional Development
7. Recognition
8. Contact — email link and copy-email button

## Before you publish — checklist

Please review these items before making the site public:

- [ ] **Remove confidential information.** Check with your employer that you may publicly name the projects (SustainStep, I3E, BFAS, ACC-RIM), describe their features, and name the organization in the recognition statement. Remove or generalize anything your employer or clients consider confidential — for example, replace a project name with a description such as "Budget management tool for an enterprise client".
- [ ] **Verify course titles.** Confirm the exact titles of:
  - *Software Design: Developing Effective Requirements*
  - *AI-Powered Software Development: Coding, Testing & System Design*

  They are labelled "Course" on the site. Only change the label to "Certificate" if you hold a verifiable certificate.
- [ ] **Verify the recognition wording.** The site shows the recognition statement exactly as supplied, with no award name, issuer or date. Add those only if they are accurate and you can confirm them.
- [ ] **Check the email address:** `tejaswiniarava1@gmail.com`.
- [ ] **Proofread** all text once more in the browser.

Places that need verification are also marked in `index.html` with `<!-- VERIFY BEFORE PUBLISHING -->` comments.

## Preview locally

**Option 1 — Double-click**

Open the folder and double-click `index.html`. It opens in your default browser.

**Option 2 — Local web server (recommended for testing the copy-email button)**

Browsers allow the modern clipboard API only on secure origins (`https://` or `localhost`). The button falls back to an older copy method when the page is opened from a file, but a local server matches the live site more closely.

If Python is installed, run this inside the `tejaswini-qa-portfolio` folder:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

Alternatively, in Visual Studio Code install the **Live Server** extension, right-click `index.html` and choose **Open with Live Server**.

**Check on mobile sizes:** in Chrome or Edge press `F12`, then `Ctrl+Shift+M` to toggle the device toolbar and try phone and tablet widths.

## Deploy to Netlify

### Option A — Netlify Drop (no Git required)

1. Go to <https://app.netlify.com/drop> and sign in (or create a free account).
2. Drag and drop the **`tejaswini-qa-portfolio` folder** (or the ZIP file) onto the page.
   `index.html` must be at the top level of what you upload — not inside an extra sub-folder.
3. Netlify publishes the site and gives you a URL ending in `.netlify.app`.
4. Optional: in **Site configuration → Change site name**, choose a cleaner address such as `tejaswini-arava-qa.netlify.app` (if available).

### Updating the site later

1. Edit the files locally and preview them.
2. In Netlify, open your site → **Deploys** tab.
3. Drag and drop the updated folder onto the deploy area. The site address stays the same.

### Option B — Deploy from GitHub

1. Create a GitHub repository and upload the four files to its root.
2. In Netlify choose **Add new site → Import an existing project → GitHub** and select the repository.
3. Leave **Build command** empty and set **Publish directory** to `.` (the repository root).
4. Click **Deploy**. Every push to the repository will redeploy the site automatically.

## Customizing

- **Colors** — edit the CSS variables at the top of `style.css` (`--bg`, `--blue`, `--mint`, etc.).
- **Text** — edit the content directly in `index.html`; each section is marked with a comment such as `<!-- ============ PROJECTS ============ -->`.
- **Adding LinkedIn, GitHub or a resume** — once you have real links, add them to the Contact section, for example:

  ```html
  <a class="btn btn-ghost" href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener">LinkedIn</a>
  ```

  For a resume, place a PDF (e.g. `Tejaswini-Arava-Resume.pdf`) in the same folder and link to it with `href="Tejaswini-Arava-Resume.pdf"`.

## Accessibility & quality notes

- Semantic HTML landmarks (`header`, `nav`, `main`, `section`, `footer`) with labelled sections
- "Skip to main content" link and visible keyboard focus styles
- Mobile menu uses `aria-expanded` / `aria-controls` and closes with `Escape`
- Copy-email feedback is announced to screen readers through a `role="status"` region
- Animations are disabled for visitors who prefer reduced motion
- Content stays visible even if JavaScript is disabled
- No external fonts, libraries or images — the site works fully offline and loads fast
