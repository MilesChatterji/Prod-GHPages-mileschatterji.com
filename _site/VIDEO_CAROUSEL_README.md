# Video Carousel System

This video carousel system allows you to showcase YouTube videos in a beautiful, interactive carousel format. It displays video thumbnails in a 3-image carousel with an embedded YouTube player below.

## Features

- **YouTube Thumbnail Carousel**: Shows 3 video thumbnails at once
- **Embedded Video Player**: Plays selected videos directly on the page
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Touch Support**: Swipe navigation on mobile devices
- **Keyboard Navigation**: Arrow keys for navigation
- **Active Video Highlighting**: Current video is visually highlighted

## How to Use

### 1. Create a Video Portfolio Page

Create a new file in your `portfolio/` directory (e.g., `portfolio/videos.html`) with the following structure:

```yaml
---
layout: video-portfolio-item
title: "Your Video Title"
subtitle: "Video description"
date: 2025-01-15
tags: [video, cinematography, film]
videos:
  - youtube_id: "dQw4w9WgXcQ"
    title: "Video Title 1"
  - youtube_id: "9bZkp7q19f0"
    title: "Video Title 2"
  - youtube_id: "jNQXAC9IVRw"
    title: "Video Title 3"
  # Add more videos as needed
---

Your page content here...
```

### 2. Getting YouTube Video IDs

To get a YouTube video ID:

1. **From YouTube URL**: Extract the ID from URLs like:
   - `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → `dQw4w9WgXcQ`
   - `https://youtu.be/dQw4w9WgXcQ` → `dQw4w9WgXcQ`

2. **Using the Utility Function**: You can also use the built-in utility:
   ```javascript
   const videoId = VideoCarousel.extractYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
   // Returns: "dQw4w9WgXcQ"
   ```

### 3. Video Structure

Each video in the `videos` array should have:

```yaml
- youtube_id: "VIDEO_ID_HERE"  # Required: YouTube video ID
  title: "Video Title"         # Optional: Display title
```

### 4. Multiple Video Pages

You can create multiple video portfolio pages by creating different files with the `video-portfolio-item` layout:

- `portfolio/cinematic-videos.html`
- `portfolio/commercial-videos.html`
- `portfolio/documentary-videos.html`

## Technical Details

### Layout File
- **Location**: `_layouts/video-portfolio-item.html`
- **Features**: 
  - YouTube thumbnail carousel
  - Embedded video player
  - Responsive design
  - Touch and keyboard navigation

### CSS Classes
- `.video-carousel-container`: Main container
- `.video-carousel`: Carousel wrapper
- `.video-thumbnail`: Thumbnail container
- `.video-play-overlay`: Play button overlay
- `.video-player-container`: Video player wrapper
- `.video-player`: YouTube iframe
- `.video-title`: Video title display

### JavaScript Class
- **Class**: `VideoCarousel`
- **Features**:
  - Automatic initialization
  - Touch/swipe support
  - Keyboard navigation
  - Video player updates
  - Active video highlighting

## Example Usage

Here's a complete example of a video portfolio page:

```yaml
---
layout: video-portfolio-item
title: "Cinematic Work"
subtitle: "Short films and cinematic projects"
date: 2025-01-15
tags: [cinema, film, short-films]
videos:
  - youtube_id: "dQw4w9WgXcQ"
    title: "The Art of Storytelling"
  - youtube_id: "9bZkp7q19f0"
    title: "Urban Landscapes"
  - youtube_id: "jNQXAC9IVRw"
    title: "Character Study"
  - youtube_id: "kJQP7kiw5Fk"
    title: "Experimental Film"
  - youtube_id: "ZZ5LpwO-An4"
    title: "Documentary Short"
  - youtube_id: "y6120QOlsfU"
    title: "Commercial Work"
  - youtube_id: "pRpeEdMmmQ0"
    title: "Music Video"
---

Welcome to my cinematic work portfolio. This collection showcases various approaches to visual storytelling through film.

Each video demonstrates different techniques in cinematography, editing, and narrative structure.
```

## Browser Support

- **Modern Browsers**: Full support with smooth animations
- **Mobile Devices**: Touch/swipe navigation
- **Accessibility**: Keyboard navigation and ARIA labels
- **Fallbacks**: Graceful degradation for older browsers

## Customization

### Styling
You can customize the appearance by modifying the CSS in `assets/css/main.css`:

- Change carousel colors in the `.video-carousel` section
- Modify video player size in `.video-player`
- Adjust thumbnail appearance in `.video-thumbnail`

### Behavior
Modify the JavaScript in `assets/js/main.js`:

- Change navigation behavior in the `VideoCarousel` class
- Adjust touch sensitivity in `addTouchSupport()`
- Modify video player parameters in `updateVideoPlayer()`

## Troubleshooting

### Common Issues

1. **Videos not loading**: Check that YouTube IDs are correct
2. **Thumbnails not showing**: Verify YouTube video is public
3. **Carousel not working**: Ensure JavaScript is enabled
4. **Mobile issues**: Check touch event handling

### Debug Information

The carousel logs debug information to the console:
- Video count and initialization
- Navigation events
- Video player updates

Check the browser console for detailed information about carousel behavior.
