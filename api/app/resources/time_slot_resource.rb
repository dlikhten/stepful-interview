class TimeSlotResource < ApplicationResource
  self.type = "time_slot"

  attribute :start_time, :datetime
  attribute :end_time, :datetime

  has_many :coach_time_slots

  filter :available_only, :boolean do
    eq do |scope, value|
      if value
        scope.future_only.available_only
      else
        scope
      end
    end
  end

  filter :exclude_student_overlap, :boolean do
    eq do |scope, value|
      if value
        scope.no_student_overlap(current_user.id)
      else
        scope
      end
    end
  end
end