import mongoose, { Mongoose } from 'mongoose'

const Schema = mongoose.Schema

const reviewScema = new Schema({
  content:String,
  rating:Number,
  reviewer:{type:mongoose.Schema.Types.ObjectId, ref:"Profile"}
})

const itemSchema = new Schema({
  brand:String,
  description:String,
  imag:String,
  link:String,
  reviews:[reviewScema],
}, {
  timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

export {
  Item
}
