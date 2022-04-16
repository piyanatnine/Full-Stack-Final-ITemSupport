import { Schema } from 'mongoose';
const ItemSchema = new Schema({
    itemCode: {
        type: String,
        required: true,
        index: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null
    },
    imageUrl: {
        type: String,
        default: null
    },
    tags: {
        type: Array,
        default: null
    }
})