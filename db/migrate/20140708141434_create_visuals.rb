class CreateVisuals < ActiveRecord::Migration
  def change
    create_table :visuals do |t|
      t.integer :gist_id
      t.text :url

      t.timestamps
    end
  end
end
