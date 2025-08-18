# Fonts Directory

This directory contains custom fonts used throughout the website.

## 🎯 Current Fonts

### NDOT 47
- **Usage**: Primary font for H1 and H2 headings
- **Files needed**:
  - `NDOT47.woff2` (recommended - best compression)
  - `NDOT47.woff` (fallback for older browsers)
  - `NDOT47.ttf` (fallback for very old browsers)

## 📁 Required Font Files

To use the NDOT 47 font, you need to add these files to this directory:

```
assets/fonts/
├── README.md
├── NDOT47.woff2    # Web Open Font Format 2.0 (best)
├── NDOT47.woff     # Web Open Font Format 1.0 (good)
└── NDOT47.ttf      # TrueType Font (fallback)
```

## 🔧 How to Add NDOT 47 Font

1. **Obtain the font files** from the font provider
2. **Convert to web formats** if you only have TTF:
   - Use online converters like [CloudConvert](https://cloudconvert.com/) or [FontSquirrel](https://www.fontsquirrel.com/tools/webfont-generator)
   - Or use command line tools like `woff2_compress` for WOFF2
3. **Place files** in this directory
4. **Test** the font rendering on your site

## 🎨 Font Features

- **NDOT 47**: Modern, geometric display font perfect for headings
- **Inter**: Clean, readable sans-serif for body text and smaller headings
- **Fallbacks**: System fonts for optimal performance

## 📱 Browser Support

- **WOFF2**: Modern browsers (Chrome 36+, Firefox 39+, Safari 12+)
- **WOFF**: Most browsers (Chrome 6+, Firefox 3.6+, Safari 5.1+)
- **TTF**: Legacy browsers (IE 9+, older mobile browsers)

## ⚠️ Important Notes

- **Font licensing**: Ensure you have proper licenses for web use
- **File sizes**: Optimize font files for web performance
- **Loading**: Fonts are loaded with `font-display: swap` for better performance
- **Fallbacks**: System fonts provide good fallbacks if custom fonts fail to load

## 🚀 Performance Tips

- **WOFF2** provides the best compression (30-50% smaller than WOFF)
- **Preload** fonts for critical text if needed
- **Subset** fonts to include only needed characters
- **Use `font-display: swap`** for better perceived performance

---

**Note**: The NDOT 47 font files are not included in this repository. You need to add them manually after obtaining proper licensing.
