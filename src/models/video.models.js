import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    videoFile
    : {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    tags: [{
        type: String,
        trim: true
    }],
    duration: {
        type: Number,
        required: true
    },

    isPublished: {
        type: Boolean,
        default: false
    },


},{timestamps : true});

videoSchema.plugin(mongooseAggregatePaginate);
const Video = mongoose.model("Video" , videoSchema);
export default Video;