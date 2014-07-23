class AddUrlColumnToGists < ActiveRecord::Migration
  def change
    add_column :gists, :url, :string
    add_index :gists, :url, unique: true
  end
end
