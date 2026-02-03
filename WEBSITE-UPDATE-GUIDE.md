# How to Update zacharyking.com.au

This guide explains how to update and deploy changes to zacharyking.com.au.

---

## 🚀 Deployment Workflow

The site uses **automatic deployment** from GitHub to Netlify:

```
Local files → GitHub (main branch) → Netlify auto-build → Live site
```

**Timeline:** Changes go live 2-3 minutes after pushing to GitHub.

---

## 📝 Making Updates

### Step 1: Edit Files Locally

All source files are in:
```
/Users/zacharyking/Documents/Business/Fractional GTM/GTM Swarm/website rebuild zacharyking.com.au/zacharyking-site/
```

### Step 2: Test Locally (Optional)

```bash
cd "/Users/zacharyking/Documents/Business/Fractional GTM/GTM Swarm/website rebuild zacharyking.com.au/zacharyking-site"
npm run dev
```

Site runs at: `http://localhost:4321`

Press `Ctrl+C` to stop the dev server.

### Step 3: Deploy to Production

```bash
cd "/Users/zacharyking/Documents/Business/Fractional GTM/GTM Swarm/website rebuild zacharyking.com.au/zacharyking-site"
git add -A
git commit -m "Description of changes"
git push origin main
```

Netlify will automatically:
1. Detect the push to main branch
2. Run `npm run build`
3. Deploy the `dist/` folder
4. Site goes live at https://zacharyking.com.au

---

## 📄 Common Updates

### Adding a Blog Post

**Location:** `src/content/blog/`

1. **Create new markdown file:**
   - Filename: `your-post-slug.md`
   - Location: `src/content/blog/your-post-slug.md`

2. **Add frontmatter:**
   ```markdown
   ---
   title: "Your Post Title"
   date: "2026-02-03"
   excerpt: "Brief description for previews"
   author: "Zachary King"
   slug: "your-post-slug"
   image: "https://images.unsplash.com/photo-xxxxx"
   ---

   ## Your Content Here
   ```

3. **Update sitemap:**
   - Edit `public/sitemap.xml`
   - Add new entry:
   ```xml
   <url>
     <loc>https://zacharyking.com.au/insights/your-post-slug</loc>
     <lastmod>2026-02-03</lastmod>
     <changefreq>monthly</changefreq>
     <priority>0.9</priority>
   </url>
   ```

4. **Deploy:** Commit and push to GitHub

5. **Request indexing:** Go to Google Search Console → URL Inspection → Paste URL → Request indexing

---

### Updating Page Content

**Homepage sections:** `src/components/home/`
- Hero: `Hero.astro`
- Problem: `Problem.astro`
- Solution: `Solution.astro`
- Services: `Services.astro`
- CTA: `CTA.astro`

**Other pages:** `src/pages/`
- About: `about.astro`
- Services: `services.astro`
- Contact: `contact.astro`
- FAQ: `faq.astro`

**To update:**
1. Edit the .astro file
2. Commit and push to GitHub
3. Changes live in 2-3 minutes

---

### Updating Navigation

**File:** `src/components/layout/Header.astro`

**To add/remove nav links:**
```javascript
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  // Add or remove items here
];
```

---

### Changing Calendly Link

**Files that contain Calendly URLs:**
- `src/components/home/CTA.astro` (CTA section button)
- `src/components/layout/Header.astro` (Get Started button)
- `src/pages/contact.astro` (Contact page embed)

**Current URL:** `https://savvycal.com/Zachary-King/b18fb593`

**To update:**
1. Search and replace the old URL with new URL
2. Commit and push

---

### Adding Images

**Location:** `public/images/`

**To add:**
1. Place image file in `public/images/`
2. Reference in code as: `/images/filename.jpg`
3. Commit and push (include the image file in git)

**Note:** Images in `public/` are served directly at root level.

---

### Updating Styles/Colors

**Global styles:** `src/styles/global.css`
**Component-specific styles:** Inside each `.astro` file's `<style>` tag

**Color variables are defined in:** `src/styles/global.css`
```css
:root {
  --color-dark-bg: #0a0e1a;
  --color-accent-blue: #0ea5e9;
  /* etc */
}
```

---

## 📊 Analytics & Tracking

### Google Analytics 4

**Measurement ID:** `G-KQNNCFL685`
**Configuration:** `src/components/layout/BaseHead.astro`

**Custom events tracked:**
- `book_call_click` - When someone clicks "Get Started" or "Book a Call"
- `calendly_opened` - When Calendly widget loads on /contact
- `insights_article_click` - When someone clicks a blog post
- `newsletter_signup_click` - When someone clicks newsletter subscribe
- `scroll_depth` - Tracks 25%, 50%, 75%, 100% scroll on pages

**View data:** https://analytics.google.com

### Google Search Console

**Property:** `zacharyking.com.au`
**Sitemap submitted:** `https://zacharyking.com.au/sitemap.xml`

**After publishing new content:**
1. Go to Search Console → URL Inspection
2. Paste the new URL
3. Click "Request Indexing"

**View data:** https://search.google.com/search-console

---

## 🗂️ Key File Locations

```
zacharyking-site/
├── src/
│   ├── components/
│   │   ├── home/              # Homepage sections
│   │   ├── layout/            # Header, Footer, BaseHead
│   │   ├── ui/                # Reusable components (Button, etc)
│   │   └── forms/             # Contact form, Calendly
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   ├── about.astro        # About page
│   │   ├── services.astro     # Services page
│   │   ├── contact.astro      # Contact page
│   │   ├── insights.astro     # Blog listing page
│   │   └── insights/[slug].astro  # Blog post template
│   ├── content/
│   │   └── blog/              # Blog posts (markdown files)
│   └── styles/
│       └── global.css         # Global styles and variables
├── public/
│   ├── images/                # Static images
│   ├── sitemap.xml           # SEO sitemap
│   └── robots.txt            # Search engine instructions
├── netlify.toml              # Netlify deployment config
└── package.json              # Dependencies
```

---

## 🔧 Troubleshooting

### Changes Not Showing Up?

1. **Check git status:**
   ```bash
   cd "/Users/zacharyking/Documents/Business/Fractional GTM/GTM Swarm/website rebuild zacharyking.com.au/zacharyking-site"
   git status
   ```

2. **Make sure you pushed:**
   ```bash
   git log --oneline -5  # See recent commits
   git push origin main  # Push if needed
   ```

3. **Check Netlify deploy status:**
   - Go to: https://app.netlify.com
   - Look for your site
   - Check recent deploys

4. **Clear browser cache:**
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

### Build Errors?

View Netlify build logs at: https://app.netlify.com (click on failed deploy)

Common issues:
- Missing dependencies: Run `npm install` locally
- Syntax errors in `.astro` files: Check the error message
- Missing images: Ensure images are in `public/images/`

### Local Dev Server Issues?

**Port already in use:**
```bash
# Kill the process on port 4321
lsof -ti:4321 | xargs kill -9
npm run dev
```

**Dependencies out of sync:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📋 Quick Reference

### Standard Deploy
```bash
git add -A
git commit -m "Update: description of changes"
git push origin main
```

### Add Blog Post + Deploy
```bash
# 1. Create src/content/blog/your-post.md
# 2. Update public/sitemap.xml
git add -A
git commit -m "Add blog post: Your Post Title"
git push origin main
# 3. Request indexing in Search Console
```

### Check If Deployed
```bash
git status  # Should say "working tree clean"
```

### Rollback (if needed)
```bash
git log --oneline -10  # Find commit to revert to
git reset --hard COMMIT_HASH
git push origin main --force  # Use with caution!
```

---

## 🔗 Useful Links

- **Live site:** https://zacharyking.com.au
- **GitHub repo:** https://github.com/zachary-ai/zacharyking-site
- **Netlify dashboard:** https://app.netlify.com
- **Google Analytics:** https://analytics.google.com
- **Search Console:** https://search.google.com/search-console
- **Astro docs:** https://docs.astro.build

---

## 💡 Tips

1. **Always test locally first** with `npm run dev` before pushing to production
2. **Write clear commit messages** - you'll thank yourself later
3. **Update sitemap.xml** whenever you add new pages or blog posts
4. **Request indexing** in Search Console for new content (don't wait for Google to crawl)
5. **Check Analytics regularly** to see what content resonates
6. **Keep blog post slugs simple** - use lowercase and hyphens only

---

**Last updated:** 2026-02-03
