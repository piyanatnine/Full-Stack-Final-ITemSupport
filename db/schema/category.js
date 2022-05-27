import { Schema } from 'mongoose';
const CategorySchema = new Schema({
    id: {
        type: Int16Array,
        required: true,
      },
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    prefix: {
        type: String,
        required: true,
        lowercase: true,
    }
})
