# Performance Tracking & Analytics Strategy
## zacharyking.com.au

**Launch Date:** February 2, 2026
**Last Updated:** February 2, 2026

---

## Executive Summary

This document outlines the complete analytics and performance tracking strategy for zacharyking.com.au. The focus is on measuring what matters: conversion (booked calls), content performance, SEO growth, and audience segmentation.

**Primary Goal:** Track and optimize the path from visitor → qualified lead → booked call
**Secondary Goals:** Build SEO authority, grow newsletter audience, demonstrate expertise

---

## 1. Google Analytics 4 Setup

### Why GA4 Matters
GA4 is event-based (not session-based), making it perfect for tracking modern user journeys across devices and platforms. It's free, powerful, and integrates with everything.

### Initial Setup Steps

#### 1.1 Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create new property: "Zachary King Website"
3. Set timezone: Australia/Sydney
4. Set currency: AUD
5. Create **Data Stream**:
   - Platform: Web
   - Website URL: https://zacharyking.com.au
   - Stream name: "Main Website"
   - **Enable Enhanced Measurement** (auto-tracks scrolls, outbound clicks, site search, video engagement, file downloads)

#### 1.2 Install GA4 Tracking Code

Add to Astro site in `src/layouts/BaseLayout.astro` (or equivalent):

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'send_page_view': true,
    'anonymize_ip': true
  });
</script>
```

**Alternative (Recommended):** Use Google Tag Manager for easier event management:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

Place in `<head>` and add noscript version in `<body>`.

### 1.3 Custom Events to Configure

These events capture the user journey specific to your positioning and conversion goals.

#### Critical Conversion Events

| Event Name | Trigger | Purpose |
|------------|---------|---------|
| `book_call_click` | Click on any SavvyCal link/button | Primary conversion tracking |
| `book_call_complete` | SavvyCal booking confirmed (URL parameter or callback) | Actual conversion |
| `newsletter_signup` | Email form submission | Secondary conversion |
| `contact_form_submit` | Contact form submission | Lead generation |

#### Engagement Events

| Event Name | Trigger | Purpose |
|------------|---------|---------|
| `cta_click` | Any CTA button clicked | Understand what drives action |
| `section_view` | Scroll to key sections (Services, Work, About) | Content engagement |
| `case_study_view` | Click into case study | Content depth |
| `resource_download` | Download playbook/template | Value delivery tracking |
| `social_share` | Share button clicked | Virality measurement |

#### Audience Segmentation Events

| Event Name | Trigger | Purpose |
|------------|---------|---------|
| `audience_founder` | Visit /founders page or click founder-specific CTA | Segment founders |
| `audience_fractional` | Visit /fractional-operators or FEC content | Segment operators |
| `topic_interest` | Click on specific topic (e.g., AI GTM, Signal Detection) | Content interest mapping |

### 1.4 GA4 Custom Dimensions

Configure these to enable deeper analysis:

**User-Scoped Dimensions:**
- `user_type` - Values: `founder`, `fractional`, `unknown`
- `traffic_source_first` - First UTM source (tracks original discovery)
- `content_topic_interest` - Which of the 20 topics they engage with most

**Event-Scoped Dimensions:**
- `cta_location` - Where on page the CTA was clicked (hero, mid-page, footer)
- `cta_text` - The actual button text clicked
- `page_section` - Which section triggered the event

**How to Create Custom Dimensions:**
1. GA4 Admin → Data display → Custom definitions
2. Create custom dimension
3. Set dimension name, scope, and parameter name
4. Map to event parameters you're sending

### 1.5 Conversions Configuration

Mark these events as conversions in GA4:

1. Go to Admin → Events
2. Toggle "Mark as conversion" for:
   - `book_call_complete` (PRIMARY)
   - `book_call_click`
   - `newsletter_signup`
   - `contact_form_submit`
   - `resource_download`

### 1.6 Audience Segmentation Setup

Create these audiences for remarketing and analysis:

**Audience: High-Intent Founders**
- Conditions:
  - Visited `/founders` OR clicked founder CTA
  - Session duration > 2 minutes
  - Viewed 3+ pages
- Use: Facebook/LinkedIn retargeting, content personalization

**Audience: Engaged Fractional Operators**
- Conditions:
  - Visited `/fractional-operators` OR FEC content
  - Engaged with community-related content
- Use: FEC marketing, workshop promotion

**Audience: GTM Topic Enthusiasts**
- Conditions:
  - Clicked on 2+ GTM topics (AI, Signal Detection, etc.)
  - Time on page > 90 seconds
- Use: Newsletter nurture, content remarketing

**Audience: Abandoned Booking**
- Conditions:
  - Triggered `book_call_click`
  - Did NOT trigger `book_call_complete`
  - Within last 7 days
- Use: Retargeting campaigns, follow-up sequences

**How to Create Audiences:**
1. GA4 Admin → Audiences → New Audience
2. Choose "Create custom audience"
3. Define conditions
4. Name and save
5. Link to Google Ads / LinkedIn for retargeting

### 1.7 Recommended GA4 Reports to Pin

**Realtime:**
- Active users by page
- Conversions in last 30 minutes

**Engagement:**
- Pages and screens (sort by engagement time)
- Events (sort by count)

**Acquisition:**
- User acquisition (first source)
- Traffic acquisition (session source)

**Monetization (repurpose for conversions):**
- Create custom report showing `book_call_complete` as "revenue events"

### 1.8 GA4 Implementation Code Examples

#### Tracking Book a Call Clicks

Add to all SavvyCal CTAs:

```html
<a href="https://savvycal.com/zac/..."
   onclick="gtag('event', 'book_call_click', {
     'cta_location': 'hero',
     'cta_text': 'Book a Call',
     'user_type': 'founder'
   });">
  Book a Call
</a>
```

Or using GTM, create a trigger on all links containing "savvycal.com" and fire a GA4 event tag.

#### Tracking Section Views (Scroll Depth)

Add Intersection Observer to track when key sections enter viewport:

```javascript
// In your main JS file
const sections = document.querySelectorAll('[data-track-section]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gtag('event', 'section_view', {
        'section_name': entry.target.dataset.trackSection,
        'page_path': window.location.pathname
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));
```

Then in your HTML:

```html
<section data-track-section="services">
  <!-- Services content -->
</section>
```

#### Tracking Newsletter Signups

Add to Beehiiv embed form or custom form:

```javascript
// On successful submission
gtag('event', 'newsletter_signup', {
  'method': 'inline_form',
  'page_location': window.location.pathname
});
```

### 1.9 Google Tag Manager Setup (Recommended)

GTM makes event tracking much easier without code deployments.

**Setup Steps:**
1. Create GTM account: [tagmanager.google.com](https://tagmanager.google.com)
2. Create container for zacharyking.com.au
3. Install GTM code (head + body snippets)
4. Add GA4 Configuration tag
5. Create triggers for all events above
6. Create corresponding GA4 Event tags
7. Test in Preview mode
8. Publish container

**Benefits:**
- Change tracking without code deployments
- Easy A/B testing of events
- Built-in debugging tools
- Version control for tracking changes

---

## 2. Google Search Console Setup

### Why Search Console Matters
Search Console is your direct line to Google's view of your site. It shows what's working (and what's broken) in organic search.

### 2.1 Domain Verification Steps

**Option 1: DNS Verification (Recommended)**

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Add property: `zacharyking.com.au` (domain property)
3. Choose DNS verification
4. Add TXT record to your DNS provider (Netlify or domain registrar):
   - Record type: TXT
   - Host: @ (or root)
   - Value: `google-site-verification=XXXXXXXXXXXXXXXXXXXX`
5. Wait 5-60 minutes for propagation
6. Click "Verify"

**Option 2: HTML Tag (Faster but less comprehensive)**

1. Add property: `https://zacharyking.com.au` (URL prefix)
2. Copy meta tag
3. Add to `<head>` of Astro site:
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXXXX" />
   ```
4. Deploy to Netlify
5. Click "Verify"

**Recommended:** Do BOTH - domain property for full coverage + URL prefix for immediate verification.

### 2.2 Sitemap Submission

You mentioned you already have `sitemap.xml` - excellent!

1. In Search Console, go to Sitemaps (left sidebar)
2. Submit: `https://zacharyking.com.au/sitemap.xml`
3. Google will crawl within 24-48 hours

**Verify your sitemap:**
- Check it loads: https://zacharyking.com.au/sitemap.xml
- Ensure all priority pages are included:
  - Homepage (/)
  - /founders
  - /fractional-operators
  - All 20 topic pages
  - /work (case studies)
  - /newsletter
  - Blog posts (if any)

### 2.3 Key Metrics to Monitor

**Weekly Monitoring:**

| Metric | What It Tells You | Action Threshold |
|--------|-------------------|------------------|
| **Total Impressions** | How often you appear in search | Track trend week-over-week |
| **Average CTR** | How compelling your titles/descriptions are | <2% = optimize meta descriptions |
| **Average Position** | How well you rank for target keywords | >10 = need better content/backlinks |
| **Total Clicks** | Actual traffic from organic search | Track growth, set monthly targets |

**Monthly Deep Dive:**

| Report | What to Look For | Action Items |
|--------|------------------|--------------|
| **Performance by Page** | Which pages drive most traffic | Double down on winners, fix losers |
| **Performance by Query** | What people search to find you | Content gap analysis, keyword opportunities |
| **Coverage Issues** | Pages excluded or erroring | Fix technical SEO issues immediately |
| **Core Web Vitals** | Site speed and UX metrics | Optimize slow pages (see Section 6) |

### 2.4 Query Analysis for Content Gaps

This is gold for content strategy.

**Monthly Process:**

1. Go to Performance → Search Results
2. Click "Queries" tab
3. Export to Google Sheets
4. Segment queries into:
   - **High impression, low CTR:** You rank but title/description needs work
   - **Position 11-20:** One push away from page 1 (create better content)
   - **Unexpected queries:** Topics you didn't plan for (new content ideas)
   - **Branded queries:** Track brand awareness growth

**Example Analysis:**

If you see:
- "AI-powered GTM" - 500 impressions, position 15, CTR 1.2%
  - **Action:** Create dedicated pillar content on this exact phrase
- "fractional sales" - 200 impressions, position 8, CTR 3.5%
  - **Action:** Optimize existing content, build backlinks
- "how to hire fractional VP sales" - 50 impressions, position 25, CTR 0.5%
  - **Action:** This is intent-rich - create How-To guide

### 2.5 Page Performance Tracking

**Pages to Monitor Weekly:**

1. **Homepage (/)** - Your front door
   - Target: Position <5 for "Zachary King"
   - Track impressions growth as brand awareness builds

2. **/founders** - Primary audience page
   - Target: Position <10 for "GTM infrastructure for startups"
   - Monitor query variations

3. **/fractional-operators** - Secondary audience
   - Target: Position <10 for "fractional exec community"

4. **Top 5 Topic Pages** (from your 20 topics)
   - Track which topics gain traction fastest
   - Prioritize content expansion on winners

**Set Up Performance Alerts:**

Search Console doesn't have native alerts, but you can:
- Export weekly to Google Sheets
- Use [Search Console API](https://developers.google.com/webmaster-tools/search-console-api-original) + Apps Script for automated alerts
- Use third-party tools like [SEO Monitor](https://www.seomonitor.com/) (paid)

### 2.6 Coverage & Indexing

**Check Weekly:**

1. Coverage Report
   - **Valid:** Should be increasing as you publish
   - **Errors:** Fix immediately (4xx, 5xx, redirect chains)
   - **Excluded:** Check if intentional (noindex tags, etc.)

2. Sitemaps Report
   - Ensure submitted sitemap is successfully processed
   - All URLs should be "Discovered" → "Crawled" → "Indexed"

3. URL Inspection Tool
   - Test individual pages
   - Check mobile usability
   - See last crawl date
   - Request (re)indexing for new/updated pages

**Pro Tip:** After publishing new content, manually request indexing via URL Inspection Tool for faster discovery.

---

## 3. SEO Tools Stack

### 3.1 Tool Comparison & Recommendation

| Tool | Best For | Price | Recommendation |
|------|----------|-------|----------------|
| **Ahrefs** | Backlink analysis, competitor research, content gaps | $129/mo | **Best overall** - Most accurate backlink data |
| **SEMrush** | Keyword research, position tracking, site audits | $139.95/mo | Great alternative, better keyword database |
| **Moz Pro** | Beginner-friendly, domain authority tracking | $99/mo | Good for starting out, less comprehensive |
| **Ubersuggest** | Budget option, Neil Patel tool | $29/mo | Decent for early stage but limited data |
| **Screaming Frog** | Technical SEO audits | Free (500 URLs) / $259/yr | Essential for technical audits |

**Recommended Stack for Zachary King (Year 1):**

**Tier 1: Essential (Start Here)**
- ✅ **Google Search Console** (Free) - Foundation
- ✅ **Google Analytics 4** (Free) - User behavior
- ✅ **Screaming Frog** (Free tier) - Technical audits
- ✅ **Ubersuggest** ($29/mo) - Keyword research on a budget

**Total: $29/mo**

**Tier 2: Growth Phase (After 3 months, once you see traction)**
- ✅ Upgrade to **Ahrefs Lite** ($129/mo) - Serious competitor analysis
- ✅ Keep Ubersuggest for now (or drop if Ahrefs covers needs)

**Total: $129-158/mo**

**Tier 3: Scale (6-12 months, if SEO becomes primary channel)**
- ✅ **Ahrefs Standard** ($249/mo) - Full suite
- ✅ **Screaming Frog Paid** ($259/yr) - Unlimited crawls
- ✅ Add **Surfer SEO** ($89/mo) - Content optimization

**Total: $360/mo**

### 3.2 What to Track in Each Tool

#### Google Search Console (Primary)

**Daily Quick Check:**
- Coverage errors (red alerts)
- Manual actions (if any)

**Weekly Review:**
- Performance trends (clicks, impressions, CTR, position)
- Top performing pages
- Top performing queries
- New queries discovered

**Monthly Deep Dive:**
- Query analysis for content gaps (see 2.4)
- Page performance vs. targets
- Core Web Vitals trends
- Sitemaps and indexing status

#### Ubersuggest (Budget Option - Year 1)

**Use For:**
- **Keyword Research:**
  - Search your 20 topics to find related long-tail keywords
  - Check search volume and difficulty
  - Find question-based keywords (What, How, Why)

- **Content Ideas:**
  - Enter competitor domains (other GTM consultants, fractional execs)
  - See what content ranks for them
  - Identify gaps you can fill

- **Basic Rank Tracking:**
  - Track 10-20 priority keywords
  - Weekly position updates
  - Track: Brand terms, primary topics, high-intent queries

- **Site Audit:**
  - Monthly crawl for SEO issues
  - Check: Broken links, missing meta descriptions, duplicate content
  - Export report and fix issues

**Workflow:**
1. Monday: Check keyword rankings, note changes
2. Mid-month: Site audit, create fix list
3. End of month: Competitor analysis, content ideas for next month

#### Ahrefs (When You Upgrade)

**Use For:**
- **Backlink Analysis:**
  - Monitor your backlink profile weekly
  - Track referring domains (goal: 10 → 50 → 100 over first year)
  - Check Domain Rating (DR) monthly
  - Find and disavow toxic backlinks (if any)

- **Competitor Analysis:**
  - Identify 5-10 competitors (similar positioning)
  - Track their:
    - Backlink strategies (who links to them?)
    - Top performing content
    - Keyword rankings
  - Steal ideas that work

- **Content Gap Analysis:**
  - Enter your domain + 3 competitors
  - See keywords they rank for that you don't
  - Prioritize based on:
    - Search volume (>100/mo)
    - Keyword difficulty (<30 = achievable)
    - Relevance to your ICP

- **Keyword Research (Deep Dive):**
  - Use "Keywords Explorer" for your 20 topics
  - Find:
    - Long-tail variations (lower competition)
    - Question keywords (How, What, Why)
    - "People also search for" ideas
  - Export to spreadsheet for content calendar

- **Position Tracking:**
  - Track 50-100 keywords across:
    - Brand terms (your name, company)
    - Primary topics (your 20)
    - Competitor terms
    - High-intent commercial keywords
  - Set up weekly email reports

- **Site Audit:**
  - Monthly full crawl (more comprehensive than Ubersuggest)
  - Prioritize fixes by:
    - Critical (4xx errors, broken internal links)
    - Important (missing meta descriptions, thin content)
    - Nice to have (image alt tags, H1 optimization)

**Ahrefs Workflow (Weekly):**
1. Monday: Check position tracking report (emailed)
2. Wednesday: Review new backlinks, check quality
3. Friday: Competitor content scan, note ideas for next week

**Ahrefs Workflow (Monthly):**
1. Week 1: Full site audit, create fix roadmap
2. Week 2: Content gap analysis, update content calendar
3. Week 3: Backlink profile review, outreach planning
4. Week 4: Competitor deep dive, strategic adjustments

### 3.3 Keyword Tracking Strategy

#### Priority Keywords (Track These First)

**Tier 1: Brand & Money Terms (10 keywords)**
- "Zachary King"
- "Zachary King GTM"
- "AI-powered GTM"
- "fractional GTM consultant"
- "GTM infrastructure for startups"
- "fractional sales VP Sydney/Australia"
- "hire fractional GTM"
- "B2B SaaS GTM consultant"
- "startup GTM consultant"
- "GTM systems and automation"

**Tier 2: Your 20 Topics (Focus on Top 10 Initially)**

Select 10 of your 20 topics with highest search potential:
1. "signal detection for sales"
2. "AI sales automation for startups"
3. "CRM automation B2B SaaS"
4. "outbound sequence optimization"
5. "ICP definition framework"
6. "lead scoring AI"
7. "sales playbook template"
8. "GTM strategy for startups"
9. "founder-led sales transition"
10. "sales tech stack for startups"

**Tier 3: Long-Tail & Question Keywords (20 keywords)**

Examples:
- "how to build GTM infrastructure"
- "when to hire fractional sales"
- "AI tools for B2B sales"
- "best CRM for early stage startups"
- "how to automate outbound sales"
- "signal detection tools for sales"
- [Add more based on Ubersuggest/Ahrefs research]

**Tier 4: Competitor Keywords (10 keywords)**

Track where you rank for competitor brand terms:
- [Competitor name 1] + "alternative"
- [Competitor name 2] + "vs"
- "fractional sales consultant comparison"

**Total: 50 keywords to start**

Expand to 100+ as you get data on what's working.

### 3.4 Backlink Strategy & Monitoring

**Goal:** Build high-quality, relevant backlinks from:
- SaaS publications (TechCrunch, ProductHunt blogs)
- Startup communities (Indie Hackers, HackerNews)
- Business publications (AFR, SmartCompany)
- Podcasts (guest appearances)
- Partner sites (complementary services)

**Tracking in Ahrefs:**
1. Set up "New Backlinks" email alert (weekly)
2. Monitor metrics:
   - Total referring domains (RDs)
   - Domain Rating (DR) - aim for 30+ in Year 1
   - Dofollow vs. nofollow ratio
   - Anchor text distribution (avoid over-optimization)

**Red Flags to Watch:**
- Sudden spike in spammy backlinks (disavow if needed)
- Links from unrelated niches (gambling, pharma, etc.)
- Paid link networks (Google penalty risk)

**Backlink Outreach:**
- Guest posting on SaaS blogs (2-3 per quarter)
- Digital PR (newsjacking funding announcements)
- Resource page link building (list of fractional consultants)
- Podcast guest appearances (show notes link back)

---

## 4. Content Performance Metrics

### 4.1 Metrics That Matter by Content Type

#### Blog Posts / Topic Pages (Your 20 Topics)

| Metric | Target | Tool | What It Means |
|--------|--------|------|---------------|
| **Organic Traffic** | 100+ visitors/mo per post by Month 6 | GA4 | SEO traction |
| **Average Engagement Time** | >2 minutes | GA4 | Content quality and relevance |
| **Scroll Depth** | >60% scroll to bottom | GA4 (custom event) | Readability and value |
| **Bounce Rate** | <60% | GA4 | Content relevance to search intent |
| **Conversions from Page** | 2-5% conversion to CTA | GA4 | Bottom-line impact |
| **Social Shares** | 10+ per post | Manual tracking or AddThis | Virality potential |
| **Backlinks Earned** | 1-3 per post over 6 months | Ahrefs | SEO authority signal |
| **Keyword Rankings** | Position <10 for target keyword | Ahrefs / GSC | Search visibility |

**How to Review:**

1. Weekly: Check GA4 → Engagement → Pages and screens
   - Sort by "Views" to see top performers
   - Check engagement time for quality signal

2. Monthly: Full content audit
   - Export to spreadsheet
   - Tag by topic category
   - Identify:
     - **Winners:** High traffic + high engagement → promote more
     - **Underperformers:** Low traffic → improve SEO, update content
     - **High bounce:** Good traffic but poor engagement → rewrite intro, improve structure

#### Case Studies (/work page)

| Metric | Target | Tool | What It Means |
|--------|--------|------|---------------|
| **Views per Month** | 50+ per case study | GA4 | Interest in your work |
| **Time on Page** | >3 minutes | GA4 | Deep reading = interest |
| **CTR to Book Call** | >5% | GA4 (conversion rate) | Sales effectiveness |
| **Scroll to Results** | >80% reach "Results" section | GA4 (scroll depth) | Outcome focus |
| **LinkedIn Shares** | 5+ per case study | Manual | Social proof building |

**How to Review:**

- Weekly: Check which case studies drive most booking clicks
- Monthly: Analyze user flow: Homepage → Case Study → Book Call
- Quarterly: Update case studies with new results/data

#### Newsletter Content (Beehiiv)

| Metric | Target | Tool | What It Means |
|--------|--------|------|---------------|
| **Subscribers** | +100/month | Beehiiv | Audience growth rate |
| **Open Rate** | >40% | Beehiiv | Subject line + sender reputation |
| **Click Rate** | >5% | Beehiiv | Content relevance and CTAs |
| **Unsubscribe Rate** | <0.5% | Beehiiv | Content quality check |
| **Subscribers → Website** | Track via UTM | GA4 | Newsletter traffic value |
| **Subscribers → Bookings** | Track via UTM + conversion | GA4 | Newsletter → revenue |

**How to Review:**

- Post-send (within 48h): Open rate, click rate, top clicked links
- Weekly: New subscriber sources (website form, LinkedIn, etc.)
- Monthly: Engagement trends, content themes that perform best

#### Landing Pages (/founders, /fractional-operators)

| Metric | Target | Tool | What It Means |
|--------|--------|------|---------------|
| **Conversion Rate** | 3-7% to book call | GA4 | Page effectiveness |
| **Traffic Sources** | Track organic, social, direct | GA4 | Channel performance |
| **Bounce Rate** | <50% | GA4 | Relevance to traffic source |
| **Average Session Duration** | >90 seconds | GA4 | Engagement level |
| **CTA Click Rate** | >10% click primary CTA | GA4 | Call-to-action effectiveness |

**How to Review:**

- Weekly: Conversion rate trend (are changes helping or hurting?)
- A/B Test: Different headlines, CTAs, social proof
- Monthly: Compare /founders vs /fractional-operators performance

### 4.2 How to Measure Content ROI

**Formula:**

```
Content ROI = (Revenue from Content - Cost to Create) / Cost to Create × 100
```

**Example:**

- Blog post costs $500 to create (your time @ $200/hr = 2.5 hours)
- Over 6 months, drives 50 organic visitors/month = 300 total
- Conversion rate 3% = 9 booked calls
- Close rate 30% = 2.7 clients
- Client value = $7k/mo × 3 months avg = $21k per client
- Total revenue = 2.7 × $21k = $56,700

**ROI = ($56,700 - $500) / $500 × 100 = 11,240%**

Even at conservative estimates, content ROI is massive for high-value services.

**Tracking in Practice:**

1. **Tag Content by Type in GA4:**
   - Set custom dimension `content_type`: blog, case_study, landing_page, topic_page

2. **Use UTM Parameters for Newsletter:**
   - Example: `?utm_source=newsletter&utm_medium=email&utm_campaign=jan_2026`
   - Track in GA4 → Acquisition → Traffic Acquisition

3. **Create Conversion Path Report:**
   - GA4 → Advertising → Attribution → Conversion Paths
   - See: Blog Post → Homepage → /founders → Book Call

4. **Calculate Quarterly:**
   - Export conversions by landing page
   - Match to estimated effort
   - Prioritize content types with best ROI

### 4.3 Tools for Tracking Social Shares/Engagement

**Native Platform Analytics:**

- **LinkedIn:** Use LinkedIn analytics for posts
  - Impressions
  - Engagement rate
  - Click-through to website
  - Follower growth

- **Twitter/X:** Built-in analytics
  - Impressions
  - Engagement
  - Link clicks

**Third-Party Tools:**

| Tool | Price | Best For |
|------|-------|----------|
| **AddThis / ShareThis** | Free | Simple share button tracking |
| **Social Warfare** | Free (WordPress) | Share counts on posts |
| **Buffer** | Free / $6/mo | Schedule + basic analytics |
| **Hootsuite** | $99/mo | Enterprise social management |
| **Sprout Social** | $249/mo | Deep analytics + engagement |

**Recommended for You:**

Start with **native platform analytics** + **UTM parameters**:

```
Share link: https://zacharyking.com.au/blog/signal-detection?utm_source=linkedin&utm_medium=social&utm_campaign=organic_share
```

Track in GA4 to see:
- Which social platforms drive traffic
- What content gets shared most
- Social → booking conversion rate

### 4.4 Newsletter Analytics (Beehiiv Integration)

Beehiiv has excellent built-in analytics, but integrate with GA4 for full funnel view.

**Beehiiv Metrics to Monitor:**

1. **Growth Metrics:**
   - Net new subscribers (target: +100/mo)
   - Subscriber sources (website, LinkedIn, referrals)
   - Subscriber quality (engagement in first 30 days)

2. **Engagement Metrics:**
   - Open rate (target: >40%)
   - Click rate (target: >5%)
   - Top clicked links
   - Reading time (if available)

3. **Content Performance:**
   - Which editions get highest opens
   - Which topics drive most clicks
   - Unsubscribe patterns (what content loses people)

**Integration with GA4:**

1. **Add UTM Parameters to All Newsletter Links:**

```
https://zacharyking.com.au/founders?utm_source=newsletter&utm_medium=email&utm_campaign=edition_001&utm_content=hero_cta
```

2. **Track Newsletter Signups as Event in GA4:**

```javascript
// When newsletter form submits
gtag('event', 'newsletter_signup', {
  'method': 'website_inline',
  'source_page': window.location.pathname
});
```

3. **Create GA4 Audience: Newsletter Subscribers Who Visit Site**
   - Use for retargeting
   - Track newsletter → website → booking path

4. **Monthly Report:**
   - Beehiiv: Sends, opens, clicks
   - GA4: Newsletter traffic, conversions, revenue
   - Combined: Full funnel ROI

---

## 5. Conversion Tracking

### 5.1 SavvyCal Booking Events

**Goal:** Track every step from "clicked book call" to "call booked" to measure conversion funnel.

#### Event 1: Book Call Click (Intent)

**When:** User clicks any "Book a Call" CTA
**Where:** Homepage, /founders, /fractional-operators, case studies, topic pages

**Implementation:**

```html
<a href="https://savvycal.com/zac/..."
   class="book-call-cta"
   data-cta-location="hero"
   data-cta-text="Book a Call"
   onclick="gtag('event', 'book_call_click', {
     'cta_location': this.dataset.ctaLocation,
     'cta_text': this.dataset.ctaText,
     'source_page': window.location.pathname,
     'user_type': 'unknown' // or dynamically set based on page
   });">
  Book a Call
</a>
```

**Or via GTM:**

- Trigger: Click on all links containing "savvycal.com"
- Tag: GA4 Event - `book_call_click`
- Variables: Click Text, Click URL, Page Path

#### Event 2: SavvyCal Page View (Engagement)

**When:** User lands on SavvyCal scheduling page
**Where:** External (SavvyCal domain)

**Tracking:** Use UTM parameters in SavvyCal link:

```
https://savvycal.com/zac/intro-call?utm_source=website&utm_medium=cta&utm_campaign=founders_page&utm_content=hero_cta
```

SavvyCal will pass these to confirmation page, allowing GA4 to track the full journey.

#### Event 3: Booking Confirmed (Conversion)

**When:** User completes booking on SavvyCal

**Implementation Options:**

**Option A: SavvyCal Redirect URL (Recommended)**

1. In SavvyCal settings, set "After booking, redirect to:"
   ```
   https://zacharyking.com.au/booking-confirmed?booking=success
   ```

2. Create `/booking-confirmed` page with:
   ```html
   <script>
     // Check for booking=success parameter
     const urlParams = new URLSearchParams(window.location.search);
     if (urlParams.get('booking') === 'success') {
       gtag('event', 'book_call_complete', {
         'method': 'savvycal',
         'value': 1, // For conversion counting
       });
     }
   </script>

   <h1>You're All Set!</h1>
   <p>Looking forward to chatting with you.</p>
   ```

**Option B: SavvyCal Webhook → Zapier → GA4**

1. Set up SavvyCal webhook for "Booking Created"
2. Use Zapier to catch webhook
3. Send to GA4 via Measurement Protocol
   - More complex but doesn't require redirect page

**Option C: Manual Tag via GTM on Thank You Page**

If SavvyCal has a thank you page after booking, inject GTM on that page (may not be possible with external tool).

**Recommended:** Option A (redirect to your own confirmation page)

### 5.2 Form Submissions

#### Newsletter Signup Form

**Implementation:**

```html
<form id="newsletter-form" action="https://beehiiv.com/..." method="POST">
  <input type="email" name="email" placeholder="Your email" required>
  <button type="submit">Subscribe</button>
</form>

<script>
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  gtag('event', 'newsletter_signup', {
    'method': 'inline_form',
    'form_location': window.location.pathname
  });
});
</script>
```

**Via GTM:**
- Trigger: Form submission (Form ID = "newsletter-form")
- Tag: GA4 Event - `newsletter_signup`

#### Contact Form (If You Add One)

```javascript
document.getElementById('contact-form').addEventListener('submit', function(e) {
  gtag('event', 'contact_form_submit', {
    'form_type': 'general_inquiry',
    'source_page': window.location.pathname
  });
});
```

### 5.3 Button Click Tracking

**Track All CTAs, Not Just Primary Conversion:**

This helps understand user journey and what messaging resonates.

**Implementation:**

```javascript
// Add to all CTA buttons
document.querySelectorAll('[data-track-cta]').forEach(button => {
  button.addEventListener('click', function() {
    gtag('event', 'cta_click', {
      'cta_type': this.dataset.trackCta, // e.g., "book_call", "learn_more", "view_case_study"
      'cta_text': this.textContent,
      'cta_location': this.dataset.ctaLocation,
      'destination_url': this.href
    });
  });
});
```

**Example HTML:**

```html
<a href="/founders"
   data-track-cta="learn_more"
   data-cta-location="homepage_services">
  Learn More About Fractional GTM
</a>
```

**Via GTM (Simpler):**

- Trigger: Click on all links with class `.cta-button`
- Tag: GA4 Event - `cta_click`
- Variables:
  - Click Text
  - Click URL
  - Page Path

### 5.4 Scroll Depth on Key Pages

**Purpose:** Understand if people read your content or bounce.

**Implementation:**

**Option 1: GA4 Enhanced Measurement (Automatic)**

GA4 automatically tracks 90% scroll depth if Enhanced Measurement is enabled.

**Option 2: Custom Scroll Depth Events (More Granular)**

Track 25%, 50%, 75%, 90% scroll:

```javascript
let scrollDepths = [25, 50, 75, 90];
let triggeredDepths = [];

window.addEventListener('scroll', function() {
  let scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

  scrollDepths.forEach(depth => {
    if (scrollPercent >= depth && !triggeredDepths.includes(depth)) {
      gtag('event', 'scroll', {
        'percent_scrolled': depth,
        'page_path': window.location.pathname
      });
      triggeredDepths.push(depth);
    }
  });
});
```

**Via GTM:**

- Trigger: Scroll Depth (built-in variable)
- Set thresholds: 25, 50, 75, 90
- Tag: GA4 Event - `scroll`

**Analysis:**

In GA4, go to Events → `scroll` → See breakdown by page.

If a page has:
- High 25% scroll but low 90% scroll = Intro is good, content loses them
- Low 25% scroll = Headline/intro needs work
- High 90% scroll = Engaging content, keep doing this

---

## 6. Dashboard & Reporting

### 6.1 Weekly Metrics to Review (Every Monday, 15 Minutes)

**Dashboard 1: Traffic Overview (GA4)**

| Metric | What to Check | Red Flag |
|--------|---------------|----------|
| **Users (last 7 days)** | Week-over-week trend | >20% drop without explanation |
| **Sessions** | Engagement level | Decreasing over time |
| **New vs Returning** | Audience growth vs retention | <70% new (early stage) |
| **Top 5 Pages by Views** | What's getting attention | Homepage dominates (need more content traction) |
| **Conversions** | Book calls, newsletter signups | Zero in a week (something broken?) |

**Dashboard 2: Conversion Funnel (GA4)**

Build this as a custom report:

```
Step 1: Page View (any page)
Step 2: CTA Click (book_call_click)
Step 3: SavvyCal Page View (UTM tracking)
Step 4: Booking Complete (book_call_complete)
```

**Track:**
- Conversion rate at each step
- Where drop-off is highest
- Which pages feed the funnel best

**Dashboard 3: Search Console Quick View**

| Metric | Check | Action |
|--------|-------|--------|
| **Total Clicks (7 days)** | Trend vs. prior week | Celebrate growth or investigate drop |
| **Average Position** | Are you climbing? | If stuck, need more content or backlinks |
| **CTR** | >3% is good | If low, optimize titles/descriptions |
| **Coverage Errors** | Any new errors? | Fix immediately |

**Time: 10 minutes total**

### 6.2 Monthly Reporting Template

**Create in Google Sheets (auto-update via GA4 + GSC connectors):**

#### Section 1: Traffic & Audience

| Metric | This Month | Last Month | Change | Target |
|--------|------------|------------|--------|--------|
| **Total Users** | [Auto-fill from GA4] | | | +20% MoM |
| **Organic Traffic** | | | | +30% MoM |
| **Direct Traffic** | | | | +10% MoM (brand) |
| **Social Traffic** | | | | +15% MoM |
| **Newsletter Subscribers** | [From Beehiiv] | | | +100/mo |
| **New vs Returning %** | | | | 70/30 split |

#### Section 2: Engagement

| Metric | This Month | Last Month | Change | Target |
|--------|------------|------------|--------|--------|
| **Avg Engagement Time** | [GA4] | | | >2 min |
| **Pages per Session** | | | | >2.5 |
| **Bounce Rate** | | | | <60% |
| **Scroll Depth (90%)** | | | | >40% of sessions |

#### Section 3: Conversions

| Metric | This Month | Last Month | Change | Target |
|--------|------------|------------|--------|--------|
| **Book Call Clicks** | [GA4] | | | +25% MoM |
| **Bookings Completed** | [SavvyCal or GA4] | | | 4-8/mo |
| **Newsletter Signups** | [Beehiiv] | | | +100/mo |
| **Conversion Rate** | [Bookings/Users] | | | 2-5% |

#### Section 4: SEO Performance

| Metric | This Month | Last Month | Change | Target |
|--------|------------|------------|--------|--------|
| **Total Impressions** | [GSC] | | | +50% MoM |
| **Total Clicks** | | | | +40% MoM |
| **Average Position** | | | | <10 (page 1) |
| **Indexed Pages** | | | | +20/mo (as you publish) |
| **Referring Domains** | [Ahrefs] | | | +5/mo |
| **Domain Rating** | | | | +2/quarter |

#### Section 5: Content Performance

**Top 5 Pages by Traffic:**
1. [Page] - [Users] - [Conversion Rate] - [Action]
2. [Page] - [Users] - [Conversion Rate] - [Action]
3. ...

**Top 5 Pages by Conversions:**
1. [Page] - [Conversions] - [CVR] - [Why it works]
2. ...

**Underperforming Pages (High Traffic, Low CVR):**
- [Page] - [Issue] - [Fix planned]

**Top 5 Search Queries:**
1. [Query] - [Impressions] - [Position] - [Action]
2. ...

**New Backlinks This Month:**
- [Count] - [Top 3 referring domains]

#### Section 6: Action Items for Next Month

**SEO:**
- [ ] Publish [X] new topic pages
- [ ] Update [X] underperforming pages
- [ ] Build [X] backlinks via [strategy]

**Content:**
- [ ] Write case study for [client]
- [ ] Launch newsletter edition on [topic]
- [ ] Optimize [X] pages for conversion

**Technical:**
- [ ] Fix [X] GSC errors
- [ ] Improve Core Web Vitals for [page]
- [ ] Add [tracking event]

**Experiments:**
- [ ] A/B test [element] on [page]
- [ ] Try [new content format]

### 6.3 Key Performance Indicators (KPIs)

**North Star Metric: Qualified Booked Calls per Month**

**Target Progression (Year 1):**
- **Month 1-2 (Launch):** 2-4 calls/mo
- **Month 3-4 (Traction):** 4-6 calls/mo
- **Month 5-6 (Growth):** 6-10 calls/mo
- **Month 7-12 (Scale):** 10-15 calls/mo

#### KPI Dashboard Structure

**Traffic KPIs:**
- **Total Users/Month:** Target +20% MoM
- **Organic Traffic Growth:** Target +30% MoM (primary channel)
- **Direct Traffic Growth:** Target +10% MoM (brand awareness)

**Content KPIs:**
- **Pages Published:** Target 4-8/month (from your 20 topics + case studies)
- **Avg Engagement Time:** Target >2 minutes (indicates quality)
- **Top 10 Content CTR:** Target >3% (content drives action)

**SEO KPIs:**
- **Indexed Pages:** Target +20/month (consistent publishing)
- **Avg Position for Priority Keywords:** Target <10 (page 1)
- **Organic CTR from GSC:** Target >3%
- **Referring Domains:** Target +5/month
- **Domain Rating (Ahrefs):** Target +2/quarter

**Conversion KPIs:**
- **Site Conversion Rate:** Target 2-5% (visitors → booked call)
- **Landing Page CVR (/founders, /fractional-operators):** Target 5-10%
- **Email Signup Rate:** Target 3-7% of visitors
- **Booking Completion Rate:** Target 70%+ (click → complete)

**Audience KPIs:**
- **Newsletter Subscribers:** Target +100/month
- **Newsletter Open Rate:** Target >40%
- **Newsletter Click Rate:** Target >5%

**Lead Quality KPIs (Manual Tracking):**
- **Show-up Rate:** Target >80% (booked calls that attend)
- **Qualification Rate:** Target >60% (attended → qualified)
- **Close Rate:** Target >30% (qualified → client)

### 6.4 Tools for Dashboarding

#### Google Looker Studio (Free, Recommended)

**Why:**
- Free and powerful
- Native GA4 + GSC integration
- Shareable reports
- Auto-refresh data

**How to Set Up:**

1. Go to [Looker Studio](https://lookerstudio.google.com/)
2. Create new report
3. Add data sources:
   - GA4 (connect your property)
   - Google Search Console
   - Google Sheets (for manual data like newsletter stats)
4. Build dashboards (see templates below)

**Dashboard 1: Weekly Traffic Overview**

Components:
- Scorecard: Users (last 7 days vs prior 7 days)
- Scorecard: Sessions
- Scorecard: Conversions (book_call_complete)
- Line chart: Users by day (last 30 days)
- Table: Top 10 pages by users
- Bar chart: Traffic by source

**Dashboard 2: Monthly Performance Report**

Components:
- Scorecards: All KPIs from Section 6.3
- Line chart: Organic traffic trend (6 months)
- Table: Top content by conversions
- Table: Top search queries (from GSC)
- Funnel visualization: Homepage → CTA Click → Booking

**Dashboard 3: SEO Dashboard**

Components:
- Scorecard: Total indexed pages
- Scorecard: Avg position
- Scorecard: Total clicks
- Line chart: Impressions vs clicks over time (GSC)
- Table: Top 20 keywords with position trends
- Table: Pages with position improvements

**Templates Available:**
- [GA4 Dashboard Template](https://lookerstudio.google.com/reporting/c76ea1e6-2e45-4ed7-b9e9-d87a8d2c2f7e/page/p_0) (Community template)
- [SEO Dashboard Template](https://www.annielytics.com/blog/free-google-data-studio-templates/)

#### Alternative Tools

| Tool | Price | Best For |
|------|-------|----------|
| **Looker Studio** | Free | Full-featured, GA4/GSC native |
| **Databox** | $47/mo | Pre-built integrations (Ahrefs, Beehiiv, etc.) |
| **Klipfolio** | $149/mo | Advanced customization |
| **Tableau** | $70/mo | Enterprise visualization |
| **Google Sheets** | Free | Simple, manual tracking |

**Recommendation:** Start with Looker Studio (free) + Google Sheets for manual data.

### 6.5 Weekly & Monthly Review Checklist

#### Weekly Review (Every Monday, 20 Minutes)

**Traffic (GA4):**
- [ ] Check users (7 days vs prior 7 days) - any major changes?
- [ ] Review top 5 pages - what's getting traction?
- [ ] Check conversions - any bookings or signups?

**SEO (Search Console):**
- [ ] Check clicks & impressions trend - growing?
- [ ] Review coverage errors - any new issues?
- [ ] Check average position - improving or declining?

**Content:**
- [ ] Review last week's published content performance (first 7 days)
- [ ] Note top performing piece for amplification (social, newsletter)

**Conversions:**
- [ ] How many book call clicks?
- [ ] How many completed bookings?
- [ ] Any drop-offs to investigate?

**Actions:**
- [ ] 1-2 quick fixes based on data (e.g., optimize title, fix error)

---

#### Monthly Review (First Monday of Month, 60 Minutes)

**Data Collection:**
- [ ] Export GA4 data to monthly report template
- [ ] Export GSC data to monthly report template
- [ ] Pull Beehiiv stats (subscribers, open rate, clicks)
- [ ] Pull Ahrefs data (backlinks, DR, keyword rankings)

**Analysis:**
- [ ] Complete monthly reporting template (Section 6.2)
- [ ] Calculate KPI progress vs targets (Section 6.3)
- [ ] Identify:
  - Top 3 wins (celebrate!)
  - Top 3 areas for improvement
  - Top 3 action items for next month

**Content Review:**
- [ ] Analyze all published content from last month
  - Which pieces drove most traffic?
  - Which drove most conversions?
  - Which flopped? (archive or improve)
- [ ] Competitor content scan (Ahrefs)
  - What are they publishing?
  - What's working for them?
- [ ] Content gap analysis (Ahrefs)
  - Keywords they rank for that you don't
  - Questions people are searching for

**SEO Review:**
- [ ] Full site audit (Ahrefs or Screaming Frog)
- [ ] Review backlink profile - any toxic links?
- [ ] Check keyword rankings - any big position changes?
- [ ] GSC query analysis - new content opportunities

**Technical:**
- [ ] Core Web Vitals check (GSC)
- [ ] Mobile usability issues (GSC)
- [ ] Broken links or crawl errors

**Planning:**
- [ ] Set next month's content calendar
- [ ] Prioritize technical fixes
- [ ] Plan SEO initiatives (backlink outreach, content updates)
- [ ] Set experiments (A/B tests, new content formats)

**Document:**
- [ ] Update monthly report
- [ ] Share with stakeholders (if any)
- [ ] Log key learnings in "lessons learned" doc

---

## 7. Implementation Roadmap

### Week 1: Essential Setup (Must-Have Foundation)

**Day 1: GA4 Setup**
- [ ] Create GA4 property
- [ ] Install GA4 tracking code (or GTM)
- [ ] Enable Enhanced Measurement
- [ ] Test tracking (real-time report)

**Day 2: Search Console Setup**
- [ ] Add property (domain + URL prefix)
- [ ] Verify via DNS (recommended) or meta tag
- [ ] Submit sitemap (sitemap.xml)
- [ ] Verify sitemap appears in report

**Day 3: Core Event Tracking**
- [ ] Implement `book_call_click` event
- [ ] Implement `book_call_complete` event (redirect page or webhook)
- [ ] Implement `newsletter_signup` event
- [ ] Test all events in GA4 DebugView

**Day 4: Conversion Setup**
- [ ] Mark events as conversions in GA4
- [ ] Set up basic audience (all users)
- [ ] Configure SavvyCal redirect to confirmation page

**Day 5: Basic Dashboard**
- [ ] Create Looker Studio report
- [ ] Connect GA4 + GSC
- [ ] Build "Weekly Overview" dashboard
- [ ] Share link for easy access

**Week 1 Outcome:** You can now track traffic, conversions, and search performance.

---

### Week 2: Advanced Tracking

**Day 1: Custom Events**
- [ ] Implement `cta_click` tracking (all CTAs)
- [ ] Implement `section_view` tracking (scroll-based)
- [ ] Implement `topic_interest` tracking (topic page views)

**Day 2: Custom Dimensions**
- [ ] Create custom dimension: `user_type`
- [ ] Create custom dimension: `cta_location`
- [ ] Create custom dimension: `content_topic_interest`
- [ ] Test dimensions in GA4 reports

**Day 3: Audience Segmentation**
- [ ] Create audience: "High-Intent Founders"
- [ ] Create audience: "Engaged Fractional Operators"
- [ ] Create audience: "Abandoned Booking"
- [ ] Link audiences to Google Ads (if using)

**Day 4: UTM Strategy**
- [ ] Define UTM naming conventions
- [ ] Add UTMs to all newsletter links
- [ ] Add UTMs to social media posts
- [ ] Create UTM builder spreadsheet

**Day 5: Enhanced Dashboard**
- [ ] Add conversion funnel to dashboard
- [ ] Add top content by conversions
- [ ] Add weekly trend charts
- [ ] Set up email delivery (weekly auto-send)

**Week 2 Outcome:** Full visibility into user behavior and conversion paths.

---

### Week 3: SEO Tools & Monitoring

**Day 1: Search Console Deep Dive**
- [ ] Set up weekly email reports (queries, pages, errors)
- [ ] Export baseline data (impressions, clicks, position)
- [ ] Create keyword tracking spreadsheet
- [ ] Identify initial content gaps from GSC queries

**Day 2: SEO Tool Setup (Ubersuggest to Start)**
- [ ] Create Ubersuggest account
- [ ] Add zacharyking.com.au domain
- [ ] Run initial site audit
- [ ] Export SEO issues to fix

**Day 3: Keyword Research**
- [ ] Research 20 topics in Ubersuggest
- [ ] Identify long-tail variations
- [ ] Build priority keyword list (50 keywords)
- [ ] Add to tracking spreadsheet

**Day 4: Competitor Analysis**
- [ ] Identify 5 direct competitors
- [ ] Add to Ubersuggest competitor tracking
- [ ] Analyze their top content
- [ ] Note content gaps and opportunities

**Day 5: Backlink Baseline**
- [ ] Check initial backlink profile (Ubersuggest or free Ahrefs trial)
- [ ] Document referring domains
- [ ] Set backlink growth targets (+5 RDs/month)

**Week 3 Outcome:** SEO monitoring in place, clear content priorities identified.

---

### Week 4: Dashboard & Reporting Automation

**Day 1: Monthly Report Template**
- [ ] Create Google Sheets monthly report (use template from Section 6.2)
- [ ] Connect GA4 data via Looker Studio connector
- [ ] Connect GSC data
- [ ] Add Beehiiv data manually

**Day 2: KPI Tracking**
- [ ] Define all KPIs (Section 6.3)
- [ ] Set targets for each KPI
- [ ] Create KPI scorecard in Looker Studio
- [ ] Set up conditional formatting (red/yellow/green)

**Day 3: Content Performance Dashboard**
- [ ] Build "Content Performance" report in Looker Studio
- [ ] Table: Top 20 pages by traffic
- [ ] Table: Top 20 pages by conversions
- [ ] Chart: Content engagement over time

**Day 4: SEO Dashboard**
- [ ] Build "SEO Dashboard" in Looker Studio
- [ ] Connect GSC data
- [ ] Add keyword tracking (manual or via API)
- [ ] Add backlink count (manual entry for now)

**Day 5: Automation & Alerts**
- [ ] Set up weekly Looker Studio email delivery
- [ ] Set up GSC email alerts (errors)
- [ ] Create calendar reminders for monthly reviews
- [ ] Document review process (checklist from Section 6.5)

**Week 4 Outcome:** Automated reporting, clear KPIs, weekly/monthly review process in place.

---

### Ongoing (After Week 4)

**Daily (5 minutes):**
- [ ] Check GA4 real-time for any issues
- [ ] Glance at yesterday's traffic in GA4

**Weekly (20 minutes):**
- [ ] Review weekly dashboard (Monday morning ritual)
- [ ] Check GSC for new errors
- [ ] Note 1-2 quick action items

**Monthly (60 minutes):**
- [ ] Complete monthly report
- [ ] Full content performance review
- [ ] SEO analysis and keyword ranking check
- [ ] Set next month's priorities

**Quarterly (3 hours):**
- [ ] Full site audit (Ahrefs or Screaming Frog)
- [ ] Backlink profile deep dive
- [ ] Competitor analysis refresh
- [ ] Content strategy review and update
- [ ] A/B test results review

---

## 8. Budget Recommendations

### Free Tools (Start Here - $0/mo)

| Tool | Purpose | Cost |
|------|---------|------|
| **Google Analytics 4** | Traffic, behavior, conversion tracking | Free |
| **Google Search Console** | Organic search performance, indexing | Free |
| **Google Tag Manager** | Event tracking management | Free |
| **Looker Studio** | Dashboards and reporting | Free |
| **Screaming Frog (Free)** | Technical SEO audits (up to 500 URLs) | Free |
| **Google Sheets** | Manual tracking, reporting | Free |
| **Beehiiv Analytics** | Newsletter performance | Included |

**Total: $0/mo**

**What You Can Track:**
- All traffic and conversions
- Basic SEO performance
- Content engagement
- User behavior
- Technical SEO issues (if site <500 pages)

**Limitations:**
- No competitive analysis
- No backlink tracking
- No advanced keyword research
- Limited to Google ecosystem

---

### Budget Starter Stack ($29-79/mo)

**Essential Addition: Ubersuggest**

| Tool | Purpose | Cost |
|------|---------|------|
| **All Free Tools Above** | Foundation | $0 |
| **Ubersuggest Individual** | Keyword research, basic rank tracking, competitor analysis | $29/mo |

**Total: $29/mo ($348/year)**

**What You Gain:**
- Keyword research for your 20 topics
- Basic competitor tracking (5 domains)
- 10-20 keyword rank tracking
- Site audit (150 pages)
- Backlink overview (limited)

**Recommended For:** First 3-6 months while validating SEO as a channel.

---

### Growth Stack ($129-199/mo)

**When to Upgrade:** After 3-6 months, if SEO is driving qualified leads.

| Tool | Purpose | Cost |
|------|---------|------|
| **All Free Tools** | Foundation | $0 |
| **Ahrefs Lite** | Comprehensive SEO, backlinks, content gaps | $129/mo |

**Total: $129/mo ($1,548/year)**

**What You Gain:**
- Full backlink analysis (vs. Ubersuggest's limited view)
- 100 keyword rank tracking
- Unlimited competitor analysis
- Content gap analysis
- More accurate keyword data
- Site audit (10K pages)

**Recommended For:** 3-12 months in, SEO proving ROI, need deeper insights.

---

### Professional Stack ($300-450/mo)

**When to Upgrade:** After 12 months, if SEO is a primary lead source.

| Tool | Purpose | Cost |
|------|---------|------|
| **All Free Tools** | Foundation | $0 |
| **Ahrefs Standard** | Advanced SEO suite | $249/mo |
| **Screaming Frog Paid** | Unlimited technical audits | $259/year ($21.58/mo) |
| **Surfer SEO** | Content optimization | $89/mo |

**Total: $359.58/mo ($4,315/year)**

**What You Gain:**
- 500 keyword tracking
- Unlimited site crawls
- Content editor for SEO optimization
- Historical data (track trends over time)
- API access (for custom reporting)

**Recommended For:** SEO-led strategy, 10+ qualified leads/month from organic, scaling content production.

---

### Budget Summary & Recommendation

**Recommended Spending Path:**

| Phase | Timeline | Monthly Cost | Annual Cost |
|-------|----------|--------------|-------------|
| **Launch Phase** | Months 1-3 | $0 (Free tools) | $0 |
| **Validation Phase** | Months 4-6 | $29 (+ Ubersuggest) | $174 |
| **Growth Phase** | Months 7-12 | $129 (+ Ahrefs Lite) | $774 |
| **Scale Phase** | Year 2+ | $360 (Full stack) | $4,315 |

**Year 1 Total Investment in Analytics & SEO Tools: ~$1,100**

This is extremely lean for a high-value service business. For comparison:
- One client at $7k/mo = $84k/year
- Analytics spend = 1.3% of one client's annual value
- **ROI is massive if SEO brings even 2-3 qualified leads/year**

---

### What NOT to Spend On (At Least Not Yet)

❌ **Paid Advertising Platforms** ($500-5000/mo)
- LinkedIn Ads, Google Ads, etc.
- Why not: Organic + referrals will be more efficient for high-value, niche positioning
- Revisit after 12 months if organic plateaus

❌ **Enterprise SEO Suites** ($500+/mo)
- BrightEdge, Conductor, seoClarity
- Why not: Overkill for a personal brand site
- Ahrefs Standard is more than enough

❌ **Social Media Management Tools** ($99-299/mo)
- Hootsuite, Sprout Social, Buffer Pro
- Why not: Native LinkedIn + manual posting is fine at your scale
- Revisit if social becomes primary channel

❌ **Heatmapping Tools** ($39-199/mo)
- Hotjar, Crazy Egg, etc.
- Why not: GA4 scroll tracking + user recordings (Hotjar free tier) are enough
- Only add if conversion optimization becomes bottleneck

❌ **Call Tracking Software** ($50-300/mo)
- CallRail, etc.
- Why not: You're using SavvyCal (already tracked)
- No phone call volume to justify

---

## 9. Maintenance & Optimization

### Monthly Optimization Cycle

**Week 1: Analyze**
- [ ] Complete monthly report
- [ ] Identify top performers and underperformers
- [ ] Note trends and anomalies

**Week 2: Content Optimization**
- [ ] Update 2-3 underperforming pages (meta descriptions, content, CTAs)
- [ ] Expand top performing pages (more depth)
- [ ] Internal linking pass (link new content to old)

**Week 3: Technical & SEO**
- [ ] Fix any GSC errors
- [ ] Improve Core Web Vitals if flagged
- [ ] Build 2-3 backlinks (guest post, PR, outreach)

**Week 4: Experimentation**
- [ ] A/B test one element (CTA text, headline, page layout)
- [ ] Try new content format
- [ ] Document results for next month

---

## 10. Quick Reference: Setup Checklist

Copy this to a task manager and check off as you complete:

### Week 1: Foundation
- [ ] GA4 property created and tracking code installed
- [ ] Enhanced Measurement enabled in GA4
- [ ] GSC property added and verified
- [ ] Sitemap submitted to GSC
- [ ] `book_call_click` event implemented
- [ ] `book_call_complete` event implemented (via redirect page)
- [ ] `newsletter_signup` event implemented
- [ ] Events marked as conversions in GA4
- [ ] Basic Looker Studio dashboard created

### Week 2: Advanced Tracking
- [ ] Custom dimensions created (user_type, cta_location)
- [ ] Audience segments created (High-Intent Founders, etc.)
- [ ] `cta_click` tracking implemented
- [ ] `section_view` tracking implemented (scroll)
- [ ] UTM naming conventions documented
- [ ] Newsletter links have UTM parameters
- [ ] Enhanced dashboard with funnel view

### Week 3: SEO Setup
- [ ] Ubersuggest account created (if using)
- [ ] Site audit completed, issues exported
- [ ] 50 priority keywords identified
- [ ] Keyword tracking spreadsheet created
- [ ] 5 competitors identified and tracked
- [ ] Backlink baseline documented

### Week 4: Reporting Automation
- [ ] Monthly report template created (Google Sheets)
- [ ] KPIs defined and targets set
- [ ] Content performance dashboard built
- [ ] SEO dashboard built
- [ ] Weekly email delivery configured
- [ ] Calendar reminders for reviews set

---

## 11. Resources & Documentation Links

### Google Analytics 4
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [GA4 Event Tracking](https://support.google.com/analytics/answer/9267735)
- [GA4 Conversions](https://support.google.com/analytics/answer/9267568)
- [GA4 Audiences](https://support.google.com/analytics/answer/9267572)
- [GA4 DebugView](https://support.google.com/analytics/answer/7201382) (test events)

### Google Search Console
- [GSC Setup Guide](https://support.google.com/webmasters/answer/9008080)
- [Verify Domain Ownership](https://support.google.com/webmasters/answer/9008080#domain_name_verification)
- [Submit Sitemap](https://support.google.com/webmasters/answer/183668)
- [Performance Report](https://support.google.com/webmasters/answer/7576553)

### Google Tag Manager
- [GTM Setup Guide](https://support.google.com/tagmanager/answer/6103696)
- [GTM for GA4](https://developers.google.com/tag-platform/gtagjs/install)
- [GTM Triggers](https://support.google.com/tagmanager/answer/7679316)
- [GTM Preview Mode](https://support.google.com/tagmanager/answer/6107056)

### Looker Studio (Data Studio)
- [Getting Started](https://support.google.com/looker-studio/answer/6283323)
- [Connect GA4](https://support.google.com/looker-studio/answer/9171315)
- [Dashboard Templates](https://datastudio.google.com/gallery)

### SEO Tools
- [Ahrefs Academy](https://ahrefs.com/academy) (free courses)
- [Ubersuggest Tutorials](https://neilpatel.com/ubersuggest/)
- [Screaming Frog Guides](https://www.screamingfrog.co.uk/seo-spider/user-guide/)

### Best Practices
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Core Web Vitals](https://web.dev/vitals/)
- [Google Analytics Best Practices](https://support.google.com/analytics/answer/10269537)

---

## 12. Common Issues & Troubleshooting

### GA4 Not Tracking

**Symptoms:** Real-time report shows 0 users
**Solutions:**
1. Check tracking code is in `<head>` of all pages
2. Verify property ID is correct (G-XXXXXXXXXX)
3. Clear browser cache, test in incognito
4. Check browser console for errors
5. Verify ad blockers aren't interfering
6. Use GA4 DebugView to see events in real-time

### Events Not Firing

**Symptoms:** Custom events don't appear in GA4
**Solutions:**
1. Open browser console, check for JavaScript errors
2. Use GA4 DebugView (enable debug mode)
3. Verify `gtag('event', ...)` syntax is correct
4. Check event parameters match expected format
5. Wait 24-48h (events can take time to appear in reports)
6. If using GTM, check trigger conditions in Preview mode

### Search Console Not Indexing

**Symptoms:** Pages not appearing in Google search
**Solutions:**
1. Check Coverage report for errors (4xx, 5xx, noindex)
2. Verify robots.txt isn't blocking Googlebot
3. Ensure no `noindex` meta tags on pages
4. Submit URL for indexing via URL Inspection Tool
5. Check sitemap is properly formatted (validate at xml-sitemaps.com)
6. Wait 2-4 weeks for new site (indexing takes time)

### Low Search Rankings

**Symptoms:** Not appearing on page 1 for target keywords
**Solutions:**
1. This is normal for new sites (3-6 months to gain traction)
2. Focus on long-tail keywords first (lower competition)
3. Build backlinks from relevant, quality sites
4. Ensure content is comprehensive and valuable
5. Optimize on-page SEO (titles, headings, internal links)
6. Check for technical issues (slow speed, mobile issues)

### Conversion Tracking Not Working

**Symptoms:** `book_call_complete` event not firing
**Solutions:**
1. Verify SavvyCal redirects to your confirmation page
2. Check confirmation page has GA4 tracking code
3. Test booking flow end-to-end in incognito
4. Check URL parameters are passing correctly
5. Use GA4 DebugView to see if event fires
6. Alternative: Set up SavvyCal webhook → Zapier → GA4

---

## Final Notes

This strategy is designed to **start lean and scale with your business**. Don't try to implement everything at once.

**Priority Order:**
1. **Week 1:** GA4 + GSC + basic conversion tracking (MUST HAVE)
2. **Week 2:** Custom events and audiences (SHOULD HAVE)
3. **Week 3:** SEO tools and monitoring (SHOULD HAVE)
4. **Week 4:** Dashboards and automation (NICE TO HAVE)

**Remember:**
- **Track what matters:** Conversions > vanity metrics
- **Start free:** Prove ROI before spending on tools
- **Review regularly:** Data without action is useless
- **Iterate:** Optimize based on what you learn

**Most important:** Your site launched on Feb 2, 2026. Give SEO 3-6 months to show results. Content compounds. Backlinks take time. Be patient, be consistent, and trust the process.

---

**Questions or Need Help?**
- GA4 Setup: [Google Analytics Help](https://support.google.com/analytics)
- GSC Setup: [Search Console Help](https://support.google.com/webmasters)
- Technical Issues: Check browser console, use DebugView
- Strategic Decisions: Review this doc, test hypotheses, measure results

**Good luck! Let the data guide your growth.**
