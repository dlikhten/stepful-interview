# frozen_string_literal: true

# == Schema Information
#
# Table name: time_slots
#
#  id         :bigint           not null, primary key
#  end_time   :datetime
#  start_time :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class TimeSlot < ApplicationRecord
  has_many :coach_time_slots
  has_many :sessions, through: :coach_time_slots

  validates :start_time, :end_time, presence: true

  scope :available_only, -> { where(id: CoachTimeSlot.select(:time_slot_id).where(session_id: nil)) }
  scope :future_only, -> { where('start_time > ?', Time.zone.now) }
  scope :no_student_overlap, lambda { |student_id|
    # ideally this should be a more activerecord based query, but for the sake of time I'm just doing it the easiest / fastest way I could think of.
    where('not exists (select 1 from sessions where sessions.student_id = ? and (sessions.start_time between time_slots.start_time and time_slots.end_time OR sessions.end_time between time_slots.start_time and time_slots.end_time))', student_id)
  }
end
