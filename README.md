# zacharyking.com.au

Personal website for Zachary King - Fractional GTM Leader.

Built with Astro + Tailwind CSS, deployed on Netlify.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 Deployment

This site is deployed to Netlify with automatic builds from the `main` branch.

### Deploy Process
1. Push changes to GitHub: `git push origin main`
2. Netlify automatically builds and deploys
3. Site live at https://zacharyking.com.au

### Configuration
- Build command: `npm run build`
- Publish directory: `dist`
- See `netlify.toml` for full configuration

## 📝 Content Updates

**To update Calendly URL:**
Edit `src/pages/contact.astro` and update the CalendlyEmbed component URL.

**To add images:**
Place images in `public/images/` directory and reference as `/images/filename.jpg`

## 👀 Want to learn more about Astro?

Check [Astro documentation](https://docs.astro.build)
