Rails.application.routes.draw do
  scope :api, path: ApplicationResource.endpoint_namespace, defaults: { format: :jsonapi } do
    # standard resources (mostly view-only, use forms for submission)
    resources :time_slots, only: [:index, :show]
    resources :coach_time_slots, only: [:index, :show]
    resources :sessions, only: [:index, :show]

    # forms
    resources :login_forms, only: [:create]
  end
end
