# frozen_string_literal: true

RSpec.shared_context 'resource testing with logged in context', type: :resource do |_parameter|
  let(:graphiti_context) do
    current_user = respond_to?(:logged_in_user) ? logged_in_user : nil

    OpenStruct.new({
                     current_user: current_user,
                     params: params
                   })
  end
  around do |ex|
    Graphiti.with_context(graphiti_context) do
      ex.run
    end
  end
end
