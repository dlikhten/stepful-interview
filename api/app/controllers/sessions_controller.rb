class SessionsController < ApplicationController
  def index
    respond_with(SessionResource.all(params))
  end

  def show
    respond_with(SessionResource.find(params))
  end
end
