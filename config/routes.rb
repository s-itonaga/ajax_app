Rails.application.routes.draw do
  #[HTTPメソッド] '[URIパターン]', to: '[コントローラー名]#[アクション名]'
  root to: 'posts#index'
  post 'posts',to: 'posts#create'
  get 'posts/:id', to: 'posts#checked'
end
