import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true }
// Is seller will be here.
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;