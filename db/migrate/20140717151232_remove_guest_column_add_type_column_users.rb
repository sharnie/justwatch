class RemoveGuestColumnAddTypeColumnUsers < ActiveRecord::Migration
  def change
    remove_column :users, :guest
    add_column :users, :type, :string
  end
end
