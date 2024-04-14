class CoachTimeSlotResource < ApplicationResource
  self.type = "coach_time_slot"

  attribute :time_slot_id, :integer, only: [:filterable]

  belongs_to :time_slot
  belongs_to :coach, resource: UserResource
  belongs_to :session
end