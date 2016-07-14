import mongoose from 'mongoose';
import Promise from 'bluebird';
import {connectionURL} from 'server/config/config';

mongoose.Promise = Promise;

mongoose.connect(connectionURL);

export default mongoose;
