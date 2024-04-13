
class LoginFormsController < ApplicationController
  skip_before_action :authenticate_user!

  def create
    form = LoginFormResource.build(params)

    if form.save
      render jsonapi: form, status: :created
    else
      render jsonapi_errors: form
    end
  end
end