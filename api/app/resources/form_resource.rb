# frozen_string_literal: true

class FormResource < Graphiti::Resource
  self.adapter = Graphiti::Adapters::Null
  self.endpoint_namespace = '/api'

  self.attributes_filterable_by_default = false
  self.attributes_sortable_by_default = false
  self.attributes_schema_by_default = false

  self.attributes_readable_by_default = true
  self.attributes_writable_by_default = true

  def current_user
    context.current_user
  end

  def build(model_class)
    model_class.new
  end

  def base_scope
    { id: nil }
  end

  def assign_attributes(model, attributes)
    model.attributes = attributes
  end

  # before saving, we always populate the context into the model so it can be used during saving
  def save(model, _meta = nil)
    %w[user].each do |attr|
      model.send(:"current_#{attr}=", send(:"current_#{attr}")) if model.respond_to?(:"current_#{attr}")
    end
    model.tap { model.save }
  end

  # if you request a form by id, you are asking to hydrate that form to pre-fill a form in the UI, this only works
  # if the form model has a hydrate method.
  def resolve(scope)
    obj = model.new
    obj.id = scope[:id]
    obj.hydrate if obj.respond_to?(:hydrate)
    [obj]
  end

  filter :id, :integer, only: [:eq], single: true do
    eq do |scope, value|
      scope[:id] = value
      scope
    end
  end

  def destroy(_attributes)
    raise 'not permitted'
  end
end
