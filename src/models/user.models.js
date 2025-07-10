import mongoose , {Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true, 
        unique: true,
        lowercase: true,
        index: true
      },
    fullName: {
        type: String,
        required: true,
        trim: true,
        unique: true, 
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }, 
    avatar: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }],
    likedVideos: [{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }],
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    refreshToken: {
        type: String
    },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAuthToken = function() {
    const payload = { id: this._id, username: this.username };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
};
userSchema.methods.generateRefreshToken = function() {
    const payload = { id: this._id, username: this.username };
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });
};
const User = mongoose.model('User', userSchema);

export default User;