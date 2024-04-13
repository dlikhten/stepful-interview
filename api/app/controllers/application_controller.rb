class ApplicationController < ActionController::API
  class UnauthorizedError < StandardError; end

  include Graphiti::Rails::Responders

  register_exception UnauthorizedError, status: 422

  before_action :authenticate_user!

  def show_detailed_exceptions?
    Rails.env.staging?
  end

  def authenticate_user!
    @current_user = User.find_by(email: request.headers["current-email"]) if request.headers["current-email"].present?
  end

  def current_user
    @current_user
  end
end
