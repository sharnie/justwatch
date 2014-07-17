class GistsController < ApplicationController
  # sets instance variables @gist & @visual
  # also assigns attributes passed through params
  # to the @gist object
  protect_from_forgery with: :exception, except: [:embed]
  before_action :set_gist_and_visual, except: [:embed]
  before_action :authenticate_user!, except: [:new, :create]

  def new
  end

  def index
    @gists = Gist.all
    @visuals = Visual.all      
  end

  def create
    @gist.content = params[:gist][:content]

      if user_signed_in?

        @gist.user = current_user

        if @gist.save
          redirect_to gist_path(@gist)
        else
          flash[:notice] = "Ouuups something went wrong, try again..."
          redirect_to root_path
        end
      else
        
        redirect_to new_user_session_path
      end

  end

  def show
  end

  def embed
    @user = User.find(params[:user_id])
    @gist = @user.gists.find(params[:gist_id])
    respond_to {|format| format.js}
  end

  def embed_stylesheet
    @user = User.find(params[:user_id])
    @gist = @user.gists.find(params[:gist_id])
    render file: "gists/embed_stylesheet.css"
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
    params.require(:gist).permit(:name, :content, :visual_attributes => [:url])
  end

end
