# Photo Gallery Directory

This directory is designed to hold photos for the photo gallery feature on your website.

## How to Use

1. **Add Photos**: Place your photos in this directory (`/assets/images/gallery/`)
2. **Supported Formats**: JPG, JPEG, PNG, GIF, WebP
3. **Recommended Sizes**: 
   - Minimum: 300x300 pixels
   - Optimal: 800x600 pixels or larger
   - Maximum: 4MB per file for web performance

## Gallery Features

- **Responsive Grid**: Photos automatically arrange in a responsive grid
- **Click to Enlarge**: Click any photo to view it in full size
- **Modal View**: Photos open in a beautiful modal overlay
- **Easy Close**: Click the "×" button or press Escape to close
- **Mobile Friendly**: Works perfectly on all device sizes

## Adding Photos

Simply copy your photos into this directory. The gallery will automatically detect and display them. For best results:

- Use descriptive filenames (e.g., `sunset-landscape.jpg`)
- Keep file sizes reasonable (under 2MB recommended)
- Use consistent aspect ratios for a uniform look

## Customization

To customize the gallery:

1. Edit `/portfolio/gallery.html` to modify the layout or add filters
2. Update `/assets/css/main.css` to change styling
3. Modify the JavaScript in the gallery page for additional functionality

## Example Photo Structure

```
/assets/images/gallery/
├── landscape-1.jpg
├── portrait-1.jpg
├── street-photo-1.jpg
├── nature-shot-1.jpg
└── README.md (this file)
```

The gallery will automatically display all images in this directory with hover effects and click-to-enlarge functionality.
