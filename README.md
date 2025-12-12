# Mauro Leonelli

A personal website based on Astro Resume Theme.

## 🚀 Features

- Tailwind CSS: Utilizes utility-first styling for rapid UI development.
- Dark Mode: Built-in dark mode toggle for better UX.
- Theme Customization: Easily adjustable in src/styles/theme.css.
- Responsive Design: Optimized for mobile, tablet, and desktop devices.
- MDX Support: Allows blog posts written in Markdown with JSX components.
- Excellent Lighthouse/PageSpeed scores
- SEO-friendly

## 🧞 Commands

All commands are run from the root of the project, from a terminal:
(Could be use 'npm' instead of bun)

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun run dev`             | Starts local dev server at `localhost:4321`      |
| `bun run build`           | Build your production site to `./dist/`          |
| `bun run preview`         | Preview your build locally, before deploying     |
| `bun run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun run astro -- --help` | Get help using the Astro CLI                     |

# Getting Started

1) Initialize the project
Run one of the commands listed in the Quick Start section.

2) Customize your resume data
Edit your resume data in `src/config/cv.json`

3) Customize theme colors
Modify the color scheme by editing `src/styles/theme.ts` to match your personal branding.

4) Replace your CV file
Put your cv file in `src/public/cv` and then replace the file name in `src/config/cv.json` (basic.cv_file_name)

5) Run the project locally
Once you’ve made your customizations, run the development server:

```
bun run dev
```

Open http://localhost:4321 in your browser to view the result 🚀

## License

Licensed under the MIT License, Copyright © Wasut Panyawiphat.
Licensed under the MIT License, Copyright © Mauro Leonellit.
See [LICENSE](/LICENSE) for more information.