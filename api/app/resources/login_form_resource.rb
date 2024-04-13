class LoginFormResource < FormResource
  self.type = :login_form
  self.model = LoginForm

  attribute :email, :string
end