class CreateCoachTimeSlotFormsController < ApplicationController
  def create
    form = CreateCoachTimeSlotFormResource.build(params)

    if form.save
      render jsonapi: form, status: :created
    else
      render jsonapi_errors: form
    end
  end
end