class SearchController < ApplicationController
  def show()
    @result = Item.where('name LIKE ?', "%#{params[:id]}%").limit(5)
    respond_to do |format|
      format.js {}
      format.json { render json: @result }
    end
  end

  def index()

  end
end
