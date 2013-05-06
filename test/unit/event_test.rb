require 'test_helper'

class EventTest < ActiveSupport::TestCase
  fixtures :events

  def test_events
    one = events(:one)
    assert_equal "2013-05-08 00:00:00", one.start.to_s
  end 
end
