source 'https://rubygems.org'
ruby '1.9.3'

gem 'rails', '3.2.13'

group :development, :test do
      gem 'sqlite3'
end

group :production do
      gem 'pg'
end

group :assets do
  gem 'fullcalendar-rails'
  gem 'uglifier', '>= 1.0.3'
  gem 'jquery-ui-rails'
end

gem 'jquery-rails'

group :test, :development do
  gem 'rspec-rails'
  gem 'evergreen', :require =>'evergreen/rails'
  gem 'capybara-webkit'
end
