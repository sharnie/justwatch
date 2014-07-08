class GistsController < ApplicationController

  def index
    @gist = Gist.new
    @visual = Visual.new
    @gists = Gist.all
    @visuals = Visual.all
  end

  def create
    binding.pry
    @gist = Gist.new(gist_params)
    if @gist.save
      redirect_to gists_path
    else
      redirect_to gists_path
    end
  end


  private

  def gist_params
    params.require(:gist).permit(:name, :content, :visual_attributes => [:url])
  end

end
