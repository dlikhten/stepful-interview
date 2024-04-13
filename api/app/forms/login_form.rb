class LoginForm < BaseForm
  attr_accessor :email

  def save_transactioned
    user = User.find_by(email: email)

    if user
      @id = user.id

      true
    else
      errors.add(:email, 'not found')

      false
    end
  end
end