import mongoose, { Document, Schema, models, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  college: string;
  email: string;
  password?: string; // Password is required for creation but optional in returned documents
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  college: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
}, {
  toObject: { getters: true },
  toJSON: { getters: true },
});


// When querying, if you need the password, you must explicitly add .select('+password')
UserSchema.pre('save', async function(next) {
    // In a real application, this is where you would hash the password
    // For this educational example, we are storing it in plain text,
    // which is NOT secure and should NEVER be done in production.
    next();
});

const User: Model<IUser> = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;