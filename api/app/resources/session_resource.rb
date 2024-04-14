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

  filter :active_only, :boolean do
    eq do |scope, value|
      if value
        scope.active_only
      else
        scope
      end
    end
  end

  filter :historical_only, :boolean do
    eq do |scope, value|
      if value
        scope.historical_only
      else
        scope
      end
    end
  end

  def base_scope
    if current_user.nil?
      model.none
    elsif current_user.user_type == 'coach'
      model.where(coach: current_user)
    else
      model.where(student: current_user)
    end
  end
end