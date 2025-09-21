source "https://rubygems.org"

# Specify Ruby version for GitHub Pages compatibility
# Comment out for local development with different Ruby versions
# ruby "3.1.6"

# Jekyll version compatible with GitHub Pages
gem "jekyll", "~> 3.10.0"

# Jekyll plugins
gem "jekyll-feed", "~> 0.17"
gem "jekyll-seo-tag", "~> 2.8"
gem "jekyll-sitemap", "~> 1.4"

# Markdown parser
gem "kramdown-parser-gfm"

# Local development gems (not needed for GitHub Pages)
group :development do
  gem "csv"
  gem "logger"
  gem "base64"
  gem "bigdecimal"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
