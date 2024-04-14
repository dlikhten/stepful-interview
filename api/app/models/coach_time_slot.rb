# frozen_string_literal: true

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
#  index_coach_time_slots_on_coach_id                   (coach_id)
#  index_coach_time_slots_on_coach_id_and_time_slot_id  (coach_id,time_slot_id) UNIQUE
#  index_coach_time_slots_on_session_id                 (session_id)
#  index_coach_time_slots_on_time_slot_id               (time_slot_id)
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

  validates_uniqueness_of :coach_id, scope: :time_slot_id

  scope :order_by_start_time, ->(dir = 'asc') { joins(:time_slot).order("time_slots.start_time #{dir}") }
  scope :active_only, -> { joins(:time_slot).where('time_slots.end_time > ?', Time.current) }
  scope :overlaps_with, lambda { |time_slot|
    time_slot_as_param = {
      start_time: time_slot.start_time,
      end_time: time_slot.end_time
    }
    scope = joins(:time_slot)

    scope.where('time_slots.start_time between :start_time and :end_time', time_slot_as_param).or(scope.where('time_slots.end_time between :start_time and :end_time', time_slot_as_param))
  }
end
