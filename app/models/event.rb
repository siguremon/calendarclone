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
    write_attribute(:start, _parse(start))
  end

  def end=(_end)
    write_attribute(:start, _parse(_end))
  end
end
