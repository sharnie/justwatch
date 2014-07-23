class ChangeTypeColumnUsers < ActiveRecord::Migration
  def change
    change_column :users, :type, :string, :default => 'Guest'
  end
end
