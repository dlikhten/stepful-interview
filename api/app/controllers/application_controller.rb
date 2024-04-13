# frozen_string_literal: true

class ApplicationController < ActionController::API
  class UnauthorizedError < StandardError; end

  include Graphiti::Rails::Responders

  register_exception UnauthorizedError, status: 422

  before_action :authenticate_user!

  def show_detailed_exceptions?
    Rails.env.staging?
  end

  def authenticate_user!
    @current_user = User.find_by(email: request.headers['user-id']) if request.headers['user-id'].present?
  end

  attr_reader :current_user
end
