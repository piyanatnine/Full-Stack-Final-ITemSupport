import { Schema } from 'mongoose';
const CategorySchema = new Schema({
    idusername: {
        type: Int16Array,
        required: true,
      },
    name: {
        type: String,
        required: true,
        lowercase: true,
    }
})
