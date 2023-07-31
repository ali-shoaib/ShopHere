import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Users'
  }
}, {timestamps: true});

export default mongoose.model('tokens', refreshTokenSchema);