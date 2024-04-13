Rails.application.routes.draw do
  scope :api, path: ApplicationResource.endpoint_namespace, defaults: { format: :jsonapi } do
    # standard resources (mostly view-only, use forms for submission)

    # forms
    resources :login_forms, only: [:create]
  end
end
