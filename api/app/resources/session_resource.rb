class SessionResource < ApplicationResource
  self.type = "session"

  attribute :start_time, :datetime
  attribute :end_time, :datetime

  # students shouldn't see notes
  attribute :satisfaction_rating, :integer
  attribute :notes, :string

  belongs_to :coach, resource: UserResource
  belongs_to :student, resource: UserResource
  has_one :coach_time_slot
end