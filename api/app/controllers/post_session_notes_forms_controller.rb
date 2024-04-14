class PostSessionNotesFormsController < ApplicationController
  def create
    form = PostSessionNotesFormResource.build(params)

    if form.save
      render jsonapi: form
    else
      render jsonapi_errors: form
    end
  end
end