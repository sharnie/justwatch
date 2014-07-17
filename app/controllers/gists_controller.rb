class GistsController < ApplicationController
  # sets instance variables @gist & @visual
  # also assigns attributes passed through params
  # to the @gist object
  protect_from_forgery with: :exception, except: [:embed]
  before_action :set_gist_and_visual, except: [:embed]
  before_action :authenticate_user!, except: [:new, :create, :show]

  def new
  end

  def index
    @gists = Gist.all
    @visuals = Visual.all      
  end

  def create
    @gist.user = current_or_guest_user
    @gist.language = "text" if @gist.language.blank?
    if @gist.save
      redirect_to gist_path(@gist)
    else
      flash[:notice] = "Ouuups something went wrong, try again..."
      redirect_to root_path
    end

  end

  def show
    unless @gist.user == current_or_guest_user
      redirect_to root_path
    end
  end

  def embed
    @user = User.find(params[:user_id])
    @gist = @user.gists.find(params[:gist_id])

    respond_to do |format| 
      format.js do
        unless @user.is_authorized_user?
          render 401
        end
      end
    end
  end

  def embed_stylesheet
    @user = User.find(params[:user_id])
    @gist = @user.gists.find(params[:gist_id])

    if @user.is_authorized_user?
      render file: "gists/embed_stylesheet.css"
    else 
      render 401
    end
  end

  def destroy
    @gist.destroy 
    redirect_to gists_path
  end

private

  def set_gist_and_visual
    if params[:id]
      @gist = Gist.find( params[:id] )
      @visual = @gist.visual
    else
      @gist = Gist.new
      @visual = Visual.new
    end

    if params[:gist]
      @gist.assign_attributes(gist_params)
    end
  end

  def gist_params
    params.require(:gist).permit(:name, :language, :content, :visual_attributes => [:url])
  end

end
