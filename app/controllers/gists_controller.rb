class GistsController < ApplicationController

  protect_from_forgery with: :exception, except: [:embed]
  before_action :set_gist_and_visual, except: [:embed]
  before_action :authenticate_user!, except: [:new, :create, :show]

  def new
  end

  def edit
  end

  def index
    @gists = current_or_guest_user.gists
    redirect_to root_path unless @gists.any?
  end

  def create
    @gist.language = "text" if @gist.language.blank?
    @gist.user = current_or_guest_user

    respond_to do |format|

      format.html do
        if params[:preview]
          render(partial: 'gists/preview', locals: { gist: @gist } ) and return
        else
          if @gist.save
            redirect_to gist_path(@gist)
          else
            flash[:alert] = @gist.errors.map do |type, msg|
              "#{type.capitalize} #{msg}."
            end.join("\n")
            redirect_to root_path
          end
        end
      end
    end
  end

  def update
    @gist.language = "text" if @gist.language.blank?
    if @gist.save
      redirect_to gist_path(@gist)
    else
      flash[:alert] = @gist.errors.map do |type, msg|
        "#{type.capitalize} #{msg}."
      end.join("\n")
      redirect_to root_path
    end
  end

  def show
    
  end

  def embed
    @user = User.find( params[:user_id] )
    @gist = @user.gists.find_by_url( params[:gist_url] )

    respond_to do |format| 
      if @user.is_authorized_user?
        format.js
        format.css
      else
        format.js{ render 401 }
        format.css{ render 401 }
      end
    end
  end


  def destroy
    @gist.destroy 
    redirect_to gists_path
  end


private

  def set_gist_and_visual
    if params[:url]
      @gist = Gist.find_by_url( params[:url] )
    else
      @gist = Gist.new
    end

    if params[:gist]
      @gist.assign_attributes(gist_params)
    end
  end

  def gist_params
    params.require(:gist).permit(:name, :language, :content, :visual_attributes => [:url])
  end

end
