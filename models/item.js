import mongoose, { Mongoose } from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content:String,
  rating:Number,
  reviewer:{type:Schema.Types.ObjectId, ref:"Profile"}
})

const itemSchema = new Schema({
  name:String,
  brand:String,
  description:String,
  image:String,
  link:String,
  reviews:[reviewSchema],
  owner:{type:Schema.Types.ObjectId, ref:"Profile"}
}, {
  timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

export {
  Item
}
