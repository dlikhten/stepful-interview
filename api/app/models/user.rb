# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  email      :string           not null
#  name       :text             not null
#  phone      :text             not null
#  user_type  :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class User < ApplicationRecord
  validates :email, uniqueness: true
  validates :phone, presence: true
  validates :name, presence: true

  module USER_TYPES
    COACH = :coach
    STUDENT = :student
  end

  USER_TYPES = %w[coach student]
  enum user_type: USER_TYPES.zip(USER_TYPES).to_h
end
