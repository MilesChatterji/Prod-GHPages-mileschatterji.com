# Jekyll Plugin: Gallery Generator
# Automatically scans the gallery directory and generates gallery data

module Jekyll
  class GalleryGenerator < Generator
    safe true
    priority :low

    def generate(site)
      # Define the gallery directory path
      gallery_dir = File.join(site.source, 'assets', 'images', 'gallery')
      
      # Check if gallery directory exists
      unless Dir.exist?(gallery_dir)
        Jekyll.logger.warn "Gallery Generator:", "Gallery directory not found: #{gallery_dir}"
        return
      end

      # Get all image files from the gallery directory
      image_extensions = %w[.jpg .jpeg .png .gif .webp .bmp .tiff]
      images = Dir.glob(File.join(gallery_dir, '*'))
        .select { |file| File.file?(file) && image_extensions.include?(File.extname(file).downcase) }
        .sort_by { |file| File.basename(file) }

      # Generate gallery data
      gallery_data = images.map do |image_path|
        filename = File.basename(image_path)
        basename = File.basename(filename, '.*')
        
        # Create a human-readable name from filename
        human_name = basename.gsub(/[-_]/, ' ').gsub(/\b\w/, &:upcase)
        
        {
          'src' => "/assets/images/gallery/#{filename}",
          'alt' => human_name,
          'caption' => human_name,
          'filename' => filename,
          'basename' => basename
        }
      end

      # Store the gallery data in site.data
      site.data['gallery'] = {
        'images' => gallery_data,
        'count' => gallery_data.length,
        'last_updated' => Time.now.strftime('%Y-%m-%d %H:%M:%S')
      }

      Jekyll.logger.info "Gallery Generator:", "Found #{gallery_data.length} images in gallery"
    end
  end
end
