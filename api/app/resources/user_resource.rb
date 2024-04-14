class UserResource < ApplicationResource
  self.type = "user"

  attribute :email, :string
  attribute :phone, :string
  attribute :user_type, :string_enum, writeable: false, allow: User::USER_TYPES
  attribute :name, :string
end