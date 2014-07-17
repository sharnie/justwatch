class AddLanguageColumnToGist < ActiveRecord::Migration
  def change
    add_column :gists, :language, :string
  end
end
