# Images Directory

This directory contains all image assets for the website.

## 📁 Directory Structure

```
assets/images/
├── README.md                    # This file
├── favicon.ico                  # Site favicon
├── profile-placeholder.jpg      # Profile photo placeholder
├── placeholder-1.jpg            # Homepage featured image 1
├── placeholder-2.jpg            # Homepage featured image 2
├── placeholder-3.jpg            # Homepage featured image 3
├── photography-category.jpg     # Photography category image
├── projects-category.jpg        # Projects category image
├── artwork-category.jpg         # Artwork category image
├── featured-1.jpg              # Portfolio featured image 1
├── featured-2.jpg              # Portfolio featured image 2
├── featured-3.jpg              # Portfolio featured image 3
└── featured-4.jpg              # Portfolio featured image 4
```

## 🖼️ Image Guidelines

### Recommended Specifications

- **Format**: JPEG for photos, PNG for graphics with transparency
- **Quality**: High quality, professional images
- **Dimensions**: 
  - Hero images: 1200x600px
  - Featured images: 800x600px
  - Category images: 600x400px
  - Profile photo: 400x400px
- **File Size**: Optimize for web (max 500KB for large images)
- **Aspect Ratio**: Maintain consistent ratios within categories

### Naming Convention

- Use descriptive, lowercase names
- Separate words with hyphens
- Include category or purpose in filename
- Example: `landscape-sunrise-mountains.jpg`

### Optimization Tips

1. **Compress images** using tools like TinyPNG or ImageOptim
2. **Use appropriate formats**:
   - JPEG for photographs
   - PNG for graphics with transparency
   - WebP for modern browsers (with fallbacks)
3. **Consider responsive images** with multiple sizes
4. **Add descriptive alt text** for accessibility

## 📸 Adding New Images

1. **Optimize your image** for web use
2. **Place in appropriate subdirectory** if organizing by category
3. **Update references** in HTML/Markdown files
4. **Test** on different screen sizes

## 🔍 Image Usage Examples

### In HTML
```html
<img src="/assets/images/your-image.jpg" alt="Descriptive alt text" class="lazy" data-src="/assets/images/your-image.jpg">
```

### In Markdown
```markdown
![Alt text](/assets/images/your-image.jpg)
```

### With Lazy Loading
```html
<img src="/assets/images/placeholder.jpg" alt="Alt text" class="lazy" data-src="/assets/images/actual-image.jpg">
```

## 🚫 Important Notes

- **Don't commit large image files** (>1MB) to version control
- **Use placeholder images** during development
- **Optimize before uploading** to improve site performance
- **Maintain backup copies** of original high-resolution images

## 🛠️ Tools for Image Optimization

- **Online**: TinyPNG, Compressor.io, Squoosh.app
- **Desktop**: ImageOptim (Mac), FileOptimizer (Windows)
- **Command Line**: ImageMagick, jpegoptim, optipng

## 📱 Responsive Images

Consider providing multiple image sizes for different screen resolutions:

```html
<picture>
  <source media="(min-width: 1200px)" srcset="/assets/images/large.jpg">
  <source media="(min-width: 768px)" srcset="/assets/images/medium.jpg">
  <img src="/assets/images/small.jpg" alt="Alt text">
</picture>
```

---

**Remember**: High-quality, optimized images are crucial for a professional portfolio website!
