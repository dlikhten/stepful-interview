# frozen_string_literal: true

class ApplicationResource < Graphiti::Resource
  self.adapter = Graphiti::Adapters::ActiveRecord
  self.endpoint_namespace = '/api'

  attribute :created_at, :datetime, only: [:readable]
  attribute :updated_at, :datetime, only: [:readable]

  def current_user
    context.current_user
  end
end
