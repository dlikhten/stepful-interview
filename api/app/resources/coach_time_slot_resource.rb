class CoachTimeSlotResource < ApplicationResource
  self.type = "coach_time_slot"

  attribute :time_slot_id, :integer, only: [:filterable]

  belongs_to :time_slot
  belongs_to :coach, resource: UserResource
  belongs_to :session

  def base_scope
    if current_user.nil?
      model.none
    elsif current_user.user_type == 'coach'
      # a coach can see any coach's sessions, that's not a limit, but any active sessions aren't this coach's perview
      model.where(session: nil).or(model.where(coach: current_user))
    else
      # don't show a student anyone elses' sessions, and thus anyone elses' coach time slots, they just don't exist
      model.where(session: nil).or(model.where(session: Session.where(student: current_user)))
    end
  end
end