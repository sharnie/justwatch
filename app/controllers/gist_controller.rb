class GistController < ApplicationController
  def new
  end

  def create
    @data = params
    render :new
  end
    
end
