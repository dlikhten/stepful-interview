# == Schema Information
#
# Table name: sessions
#
#  id                  :bigint           not null, primary key
#  end_time            :datetime
#  notes               :text
#  satisfaction_rating :integer
#  start_time          :datetime
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  coach_id            :bigint           not null
#  student_id          :bigint           not null
#
# Indexes
#
#  index_sessions_on_coach_id    (coach_id)
#  index_sessions_on_student_id  (student_id)
#
# Foreign Keys
#
#  fk_rails_...  (coach_id => users.id)
#  fk_rails_...  (student_id => users.id)
#
class Session < ApplicationRecord
  has_one :coach_time_slot
  belongs_to :coach, class_name: 'User'
  belongs_to :student, class_name: 'User'

  validates :start_time, :end_time, presence: true

  scope :active_only, -> { where('end_time > ?', Time.zone.now) }
  scope :overlaps_with, ->(time_slot) {
    time_slot_as_param = {
      start_time: time_slot.start_time,
      end_time: time_slot.end_time,
    }
    where('start_time between :start_time and :end_time', time_slot_as_param).or(where('end_time between :start_time and :end_time', time_slot_as_param))
  }
end
