class ChangeTypeDefaultUser < ActiveRecord::Migration
  def change
    change_column :users, :type, :string, :default => 'AuthorizedUser'
  end
end
