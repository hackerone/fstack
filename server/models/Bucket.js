import db from 'lib/db';

const bucketSchema = new db.Schema({
  name: String,
  description: String,
  slug: String,
  user_id: db.Schema.Types.ObjectId,
  status: String,
  create_date: Date,
});

function getSlug(name) {
  return name.replace(/[^a-z0-9]/ig, '').toLocaleLowerCase();
}

bucketSchema.pre('save', function preSave(next) {
  if (!this.created) {
    this.create_date = new Date();
    if (!this.slug) {
      this.slug = getSlug(this.name);
    }

    Bucket.where({
      user_id: this.user_id,
      slug: this.slug,
    })
    .count()
    .then(count => {
      if (count > 0) {
        this.slug += new Date().getTime();
      }
      next();
    });
  } else {
    next();
  }
});

const Bucket = db.model('Bucket', bucketSchema);

export default Bucket;
