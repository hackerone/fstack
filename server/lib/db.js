import mongoose from 'mongoose';
import Promise from 'bluebird';
mongoose.Promise = Promise;

const DB_NAME = 'prop';
let db = DB_NAME;

if (process.env.TEST) {
  db = 'test';
}

mongoose.connect('mongodb://localhost/' + db);

export default mongoose;
