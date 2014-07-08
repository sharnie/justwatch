class VisualsController < ApplicationController
  def index
    @visual  = Visual.new
    @visuals = Visual.all
  end

  def show
  end

  def create
    @visual = Visual.create(visual_params)
    redirect_to visuals_path
  end

  private

    def visual_params
      params.require(:visual).permit(:url)
    end

end
