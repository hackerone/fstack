import db from 'lib/db';

const bucketItemSchema = new db.Schema({
  bucket_id: db.Schema.Types.ObjectId,
  item_id: db.Schema.Types.ObjectId,
  status: String,
  create_date: Date,
});

const BucketItem = db.model('BucketItem', bucketItemSchema);

export default BucketItem;
