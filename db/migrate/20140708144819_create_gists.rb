class CreateGists < ActiveRecord::Migration
  def change
    create_table :gists do |t|
      t.string :name
      t.belongs_to :user, index: true
      t.text :content

      t.timestamps
    end
  end
end
