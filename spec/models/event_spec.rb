require 'spec_helper'

describe Event do
  describe "set start" do
    before do
      event = Event.new
      event.start = "2013-05-18 16:00:00 +0900"
    end
    it "utc time" do
      event.start.to_s.should eql("2013-05-18 16:00:00 +0900")
    end
end
