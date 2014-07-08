class GistsController < ApplicationController
  # sets instance variables @gist & @visual
  # also assigns attributes passed through params
  # to the @gist object
  before_action :set_gist_and_visual

  def new
  end

  def index
    @gists = Gist.all
    @visuals = Visual.all
  end

  def create

    if @gist.save
      redirect_to gists_path
    else
      redirect_to gists_path
    end

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
