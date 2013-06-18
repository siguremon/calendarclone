class Event < ActiveRecord::Base
  attr_accessible :allDay, :color, :end, :start, :title

  def _parse(str)
    timezone = Time.zone
    date_parts = Date._parse(str)
    return if date_parts.blank?
    time = DateTime.parse(str)
    if date_parts[:offset].nil?
      ActiveSupport::TimeWithZone.new(nil, timezone, time)
    else
      time.in_time_zone(timezone)
    end
  end

  def start=(start)
    if(start.is_a?(String)) 
      write_attribute(:start, _parse(start))
    else
      super(start)
    end
  end

  def end=(_end)
    if(_end.is_a?(String))
      write_attribute(:end, _parse(_end))
    else
      super(_end)
    end
  end
end
