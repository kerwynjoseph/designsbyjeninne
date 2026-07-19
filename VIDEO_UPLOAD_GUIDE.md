# How to Upload Videos to Your Portfolio

## Step 1: Save Your Video Files
1. Save your video files (MP4 format recommended) to:
   ```
   /Users/a1/Desktop/Designs By Jeninne/public/videos/
   ```
2. Use descriptive names like:
   - `videography-campaign-01.mp4`
   - `event-coverage-01.mp4`
   - `promo-video-01.mp4`

## Step 2: Update Portfolio Data
Edit the file: `/Users/a1/Desktop/Designs By Jeninne/lib/data/portfolio.ts`

### Add a Video Portfolio Item:
```typescript
{
  id: "videography-campaign-01",
  title: "Your Video Title",
  category: "Videography",
  description: "Description of your video",
  isVideo: true,
  videoUrl: "/videos/your-video-name.mp4",
}
```

### Or Replace an Existing Item:
Find the item you want to replace and update it:
```typescript
{
  id: "videography-campaign-01",
  title: "Videography Campaign",
  category: "Videography",
  description: "Cinematic video content created for brand campaigns and event coverage.",
  isVideo: true,
  videoUrl: "/videos/your-video-name.mp4", // Change this line
}
```

## Step 3: Rebuild and Test
1. Save your changes
2. The website will automatically rebuild with your new videos
3. Videos will appear in the portfolio grid with a play button
4. Click to open in fullscreen lightbox with video controls

## Video Format Recommendations
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (1080p) or higher
- **File Size**: 10-50MB (optimize for web)
- **Duration**: 15 seconds to 5 minutes

## Optimize Your Videos for Web
To compress your videos before uploading:

Using FFmpeg (command line):
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4
```

## Example Portfolio With Videos
Here's a sample portfolio mix:

```typescript
export const portfolioItems: PortfolioItem[] = [
  {
    id: "graphic-design-01",
    title: "Brand Flyer Design",
    category: "Graphic Design",
    imageKey: "portrait",
  },
  {
    id: "video-01",
    title: "Event Promotion Video",
    category: "Videography",
    isVideo: true,
    videoUrl: "/videos/event-promo.mp4",
  },
  {
    id: "graphic-design-02",
    title: "Social Media Graphics",
    category: "Graphic Design",
    imageKey: "square",
  },
  {
    id: "video-02",
    title: "Brand Film",
    category: "Videography",
    isVideo: true,
    videoUrl: "/videos/brand-film.mp4",
  },
  // ... more items
];
```

## Uploading Multiple Videos
1. Save all videos to `/public/videos/` folder
2. Update each item in `portfolio.ts` with its video URL
3. Mix and match images and videos in your portfolio
4. The grid will automatically handle both types

## Troubleshooting

**Video not playing?**
- Check the file path is correct (use `/videos/filename.mp4`)
- Make sure the file exists in `/public/videos/`
- Verify the file is a valid MP4 video

**Video takes too long to load?**
- The file may be too large
- Compress using FFmpeg or a tool like Handbrake
- Aim for 10-30MB per video

**Need to remove a video?**
- Set `isVideo: false` or remove the item from the array
- Delete the video file from `/public/videos/`

## Questions?
If you need help setting up your videos, just let me know!
