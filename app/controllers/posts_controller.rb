class PostsController < ApplicationController
  def index #indexアクションを定義した
    @posts = Post.all.order(id: "DESC")
  end

  def create
    # ①変数postを設定。投稿を作成した時に、「checked: false」で未読状態にしておく
    post = Post.create(content: params[:content], checked: false)
    # ②Ajaxを実現するために、postテーブルに収納されている変数postをjsonで返す。
    render json:{ post: post }
  end

  def checked
    post = Post.find(params[:id])
    if post.checked then
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json: { post: item }
  end

end
