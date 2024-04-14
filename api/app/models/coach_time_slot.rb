# == Schema Information
#
# Table name: coach_time_slots
#
#  id           :bigint           not null, primary key
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  coach_id     :bigint           not null
#  session_id   :bigint
#  time_slot_id :bigint           not null
#
# Indexes
#
#  index_coach_time_slots_on_coach_id      (coach_id)
#  index_coach_time_slots_on_session_id    (session_id)
#  index_coach_time_slots_on_time_slot_id  (time_slot_id)
#
# Foreign Keys
#
#  fk_rails_...  (coach_id => users.id)
#  fk_rails_...  (session_id => sessions.id)
#  fk_rails_...  (time_slot_id => time_slots.id)
#
class CoachTimeSlot < ApplicationRecord
  belongs_to :time_slot
  belongs_to :coach, class_name: 'User'
  belongs_to :session, optional: true
end