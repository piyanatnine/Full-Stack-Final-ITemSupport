import { Schema } from 'mongoose';
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        default: null
    },
    imageUrl: {
        type: String,
        default: null
    },
    owned: {
        type: Schema.Types.Number,
        required: true,
        default: 0
    },
    inStock: {
        type: Schema.Types.Number,
        required: true,
        default: 0
    },
})