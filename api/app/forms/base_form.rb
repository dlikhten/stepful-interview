# frozen_string_literal: true

class BaseForm
  include ActiveModel::API
  include ActiveModel::Validations

  attr_accessor :id, :current_user

  # @abstract
  def save_transactioned
    raise 'abstract'
  end

  def save
    result = false
    ActiveRecord::Base.transaction do
      result = save_transactioned
      raise ActiveRecord::Rollback unless result
    end
    result
  end

  protected

  # Save the given base model, but if it is already persisted, we must save all provided models instead since it won't
  # cascade automatically.
  #
  # @return true if all saves are successful, false otherwise
  def save_model(base_model, all_models)
    if base_model.persisted?
      all_models.map(&:save).all?
    else
      base_model.save
    end
  end

  def simple_save(base_model, all_models, &validation_error_block)
    if save_model(base_model, all_models)
      self.id = base_model.id
      true
    else
      all_models.each(&:valid?)
      validation_error_block.call
      false
    end
  end

  # call in the constructor, indicates this form just gets a random uuid and can't be updated (POST only)
  # jsonapi requires an id to be set, this sets a unique one
  def write_only!
    @id = SecureRandom.uuid
  end

  # Import errors from the given model into this form
  #
  # @param [Object] model The model with the errors (assumed already validated)
  # @param [Hash] attribute_mapping key = model attribute, value = form attribute
  def import_error(model, attribute_mapping)
    model.errors.each do |error|
      if attribute_mapping[error.attribute].present?
        errors.import(error, { attribute: attribute_mapping[error.attribute] })
      end

      errors.import(error) if error.attribute == :base
    end
  end
end
