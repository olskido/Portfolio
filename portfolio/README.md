# Portfolio Website

A beautiful, modern portfolio website built with React and Vite. This portfolio showcases your work, skills, experience, GitHub contributions, tweets, and more.

## Features

- 🎨 **Modern & Beautiful Design** - Sleek, professional design with smooth animations
- 📱 **Fully Responsive** - Looks great on all devices
- 🚀 **Fast & Optimized** - Built with Vite for lightning-fast performance
- 🎭 **Smooth Animations** - Engaging animations and transitions throughout
- 📊 **GitHub Heatmap** - Visual representation of your GitHub contributions
- 🐦 **Twitter Integration** - Display your recent tweets
- 💼 **Vercel Projects** - Auto-display your deployed Vercel projects
- 📝 **Contact Form** - Easy way for visitors to reach out
- 🌈 **Gradient Themes** - Beautiful gradient color schemes

## Sections

1. **Hero/Profile** - Introduction with profile image and social links
2. **About Me** - Personal story and statistics
3. **Skills** - Programming languages and frameworks you know
4. **Work Experience** - Timeline of your professional journey
5. **Projects** - Showcase of your work with moving carousel
6. **GitHub Heatmap** - Visual GitHub contribution graph
7. **Tweets** - Recent tweets from your Twitter account
8. **Contact** - Contact form and information

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the portfolio directory:
```bash
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your API keys (optional for basic usage)

5. Add your profile image:
   - Place your profile image at `public/profile.jpg`
   - Or update the path in `src/components/Hero/Hero.jsx`

6. Update your information:
   - Edit `src/components/Hero/Hero.jsx` - Update name and social links
   - Edit `src/components/About/About.jsx` - Update about me content
   - Edit `src/components/Skills/Skills.jsx` - Update your skills
   - Edit `src/components/Experience/Experience.jsx` - Update work experience
   - Edit `src/components/Contact/Contact.jsx` - Update contact information
   - Edit `src/components/Footer/Footer.jsx` - Update footer content

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

Build the project:
```bash
npm run build
```

The built files will be in the `dist` directory.

Preview the production build:
```bash
npm run preview
```

## API Integrations

### Vercel Projects

To integrate with Vercel API:

1. Get your Vercel API token from [Vercel Account Settings](https://vercel.com/account/tokens)
2. Add `VITE_VERCEL_TOKEN` to your `.env` file
3. Update `src/components/Projects/Projects.jsx` to use the actual API:

```javascript
const response = await axios.get('https://api.vercel.com/v9/projects', {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_VERCEL_TOKEN}`
  }
});
```

### Twitter Integration

To display real tweets:

1. Apply for Twitter API access at [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Get your Bearer Token
3. Add `VITE_TWITTER_BEARER_TOKEN` and `VITE_TWITTER_USERNAME` to `.env`
4. Update `src/components/Twitter/Twitter.jsx` with the Twitter API v2 endpoints

### GitHub Contributions

GitHub doesn't provide a public API for contribution data. The component uses mock data by default. To show real data, you can:

- Use a service like GitHub Contributions API
- Use GitHub GraphQL API with authentication
- Scrape contribution data (not recommended)

## Customization

### Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #ec4899;
  /* ... */
}
```

### Adding Project Images

1. Add project images to `public/images/`
2. Update project data in `src/components/Projects/Projects.jsx`
3. Reference images as `/images/project1.jpg`

### Fonts

The project uses Inter font by default. To change:

1. Add your font import to `src/index.css`
2. Update the `font-family` in the `body` selector

## Project Structure

```
portfolio/
├── public/
│   ├── images/          # Project images
│   └── profile.jpg      # Your profile image
├── src/
│   ├── components/
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Experience/
│   │   ├── Footer/
│   │   ├── GitHubHeatmap/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── Projects/
│   │   ├── Skills/
│   │   └── Twitter/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
└── package.json
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Add environment variables in Netlify dashboard

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on GitHub or contact through the portfolio website.
