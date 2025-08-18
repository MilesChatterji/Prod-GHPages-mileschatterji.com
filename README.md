# Personal Website & Photography Portfolio

A modern, responsive Jekyll website designed for photographers and creative professionals. Features a dark gray color scheme with white text and amber hover effects, left-handed navigation with submenus, and a portfolio showcase system.

## 🎨 Design Features

- **Color Scheme**: Dark gray backgrounds (#2a2a2a, #3a3a3a, #4a4a4a)
- **Text**: White primary text with light gray secondary text
- **Accents**: Amber/orange (#ff8c00) for links and hover effects
- **Navigation**: Left-handed sidebar with expandable submenus
- **Responsive**: Mobile-first design with mobile navigation toggle

## 🚀 Quick Start

### Prerequisites

- Ruby 2.7 or higher
- RubyGems
- GCC and Make

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Jekyll and dependencies**
   ```bash
   bundle install
   ```

3. **Start the development server**
   ```bash
   bundle exec jekyll serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4000`

## 📁 Project Structure

```
├── _layouts/                 # Jekyll layout templates
│   ├── default.html         # Main layout with navigation
│   ├── page.html            # Static page layout
│   ├── post.html            # Blog post layout
│   └── portfolio-item.html  # Portfolio item layout
├── assets/                   # Static assets
│   ├── css/                 # Stylesheets
│   │   ├── main.css         # Main styles with color scheme
│   │   └── navigation.css   # Navigation-specific styles
│   ├── js/                  # JavaScript files
│   │   ├── main.js          # Main functionality
│   │   └── navigation.js    # Navigation functionality
│   └── images/              # Image assets
├── biography/                # Biography section pages
├── portfolio/                # Portfolio section pages
├── contact/                  # Contact section pages
├── _config.yml              # Jekyll configuration
├── Gemfile                  # Ruby dependencies
└── index.html               # Homepage
```

## ⚙️ Configuration

### Customizing Site Information

Edit `_config.yml` to update:
- Site title and description
- Author information
- Navigation structure
- URL settings

### Navigation Structure

The navigation is configured in `_config.yml` under the `navigation` section:

```yaml
navigation:
  - title: Biography
    url: /biography/
    submenu:
      - title: About Me
        url: /biography/about/
      - title: Experience
        url: /biography/experience/
```

### Color Scheme

Colors are defined as CSS custom properties in `assets/css/main.css`:

```css
:root {
    --bg-primary: #2a2a2a;      /* Main background */
    --bg-secondary: #3a3a3a;    /* Secondary background */
    --accent-primary: #ff8c00;  /* Amber accent */
    --text-primary: #ffffff;    /* White text */
}
```

## 📱 Pages & Sections

### Homepage (`index.html`)
- Hero section with call-to-action
- Featured work showcase
- About preview
- Contact preview

### Biography Section
- Main biography overview
- About me details
- Professional experience
- Education background

### Portfolio Section
- Category-based browsing
- Search functionality
- Featured work showcase
- Individual portfolio items

### Contact Section
- Contact methods overview
- Contact form
- Social media links
- Services offered

## 🎯 Customization Guide

### Adding New Portfolio Items

1. Create a new markdown file in the appropriate portfolio subdirectory
2. Use the `portfolio-item` layout
3. Add front matter with metadata:

```markdown
---
layout: portfolio-item
title: "Your Project Title"
subtitle: "Project description"
image: "/assets/images/your-image.jpg"
date: 2024-01-01
tags: [photography, landscape, nature]
gallery:
  - url: "/assets/images/gallery-1.jpg"
    alt: "Gallery image 1"
    caption: "Image description"
---
```

### Adding New Navigation Items

1. Update the `navigation` section in `_config.yml`
2. Create corresponding page files
3. Use appropriate layouts (`page.html`, `post.html`, etc.)

### Customizing Styles

- **Main styles**: Edit `assets/css/main.css`
- **Navigation styles**: Edit `assets/css/navigation.css`
- **Color scheme**: Update CSS custom properties in `:root`

## 🔧 Development

### Building for Production

```bash
bundle exec jekyll build
```

### Testing Locally

```bash
bundle exec jekyll serve --livereload
```

### GitHub Pages Deployment

The site includes a GitHub Actions workflow (`.github/workflows/jekyll-gh-pages.yml`) for automatic deployment to GitHub Pages.

## 📸 Image Optimization

- Use appropriate image formats (JPEG for photos, PNG for graphics)
- Optimize images for web (recommended max width: 1200px)
- Use lazy loading with `data-src` attribute
- Consider using WebP format for better compression

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Content Guidelines

### Writing Style
- Keep content concise and engaging
- Use clear headings and subheadings
- Include relevant keywords for SEO
- Write in a professional yet approachable tone

### Image Guidelines
- High-quality, professional images
- Consistent aspect ratios for portfolio items
- Descriptive alt text for accessibility
- Appropriate file sizes for web

## 🚀 Performance Tips

- Optimize images before uploading
- Use lazy loading for images
- Minimize JavaScript bundle size
- Enable compression on your web server
- Use a CDN for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Jekyll documentation](https://jekyllrb.com/docs/)
2. Review existing GitHub issues
3. Create a new issue with detailed information

## 🔄 Updates & Maintenance

- Regularly update Jekyll and dependencies
- Monitor for security updates
- Backup your content regularly
- Test after major updates

---

**Built with ❤️ using Jekyll**

For more information about Jekyll, visit [jekyllrb.com](https://jekyllrb.com/)
