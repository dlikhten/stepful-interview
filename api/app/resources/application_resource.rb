# frozen_string_literal: true

class ApplicationResource < Graphiti::Resource
  self.adapter = Graphiti::Adapters::ActiveRecord
  self.endpoint_namespace = '/api'
  self.autolink = false # keep things simple since we're gonna be ignoring some of the api in this exercise

  attribute :created_at, :datetime, only: [:readable]
  attribute :updated_at, :datetime, only: [:readable]

  def current_user
    context.current_user
  end
end
