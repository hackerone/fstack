import db from 'lib/db';

const userSchema = new db.Schema({
  first_name: String,
  last_name: String,
  email: String,
  slug: String,
  provider: String,
  provider_id: String,
  status: String,
  create_date: Date
});

function getSlug(email) {
  return email.substr(0, email.indexOf("@")).toLocaleLowerCase();
}

userSchema.pre('save', function (next) {
  if (!this.created) {
    this.slug = getSlug(this.email);
    this.create_date = new Date();

    User.where({
      slug: this.slug
    })
    .count()
    .exec()
    .then(count => {
      if(count > 0) {
        this.slug += new Date().getTime();
      }
      next();
    });
  } else {
    next();
  }
});

const User = db.model('User', userSchema);

export default User;
