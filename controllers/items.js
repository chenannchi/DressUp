import {Item} from "../models/item.js"
import {Profile} from "../models/profile.js"

function newItem(req,res){
  res.render("items/new")
}

function create(req,res){
  Item.create(req.body)
  .then(item => {
    console.log(item)
    res.redirect("/")
  })
}

export{
  newItem as new,
  create
}