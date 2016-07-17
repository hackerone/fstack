import db from 'lib/db';

const itemSchema = new db.Schema({
  name: String,
  description: String,
  slug: String,
  source: {
    url: String,
    type: String,
    id: String,
    meta: db.Schema.Mixed,
  },
  status: String,
  create_date: Date,
});

const Item = db.model('Item', itemSchema);

export default Item;
