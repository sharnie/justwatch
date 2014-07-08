class CreateCanvas < ActiveRecord::Migration
  def change
    create_table :canvas do |t|
      t.integer :gist_id
      t.text :url

      t.timestamps
    end
  end
end
