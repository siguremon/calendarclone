require 'capybara-webkit'

Evergreen.configure do |config|
  config.driver = :webkit
  config.public_dir = 'public_html'
  config.template_dir = 'templates'
  config.spec_dir = 'spec'
end
