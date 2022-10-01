import {Item} from "../models/item.js"
import {Profile} from "../models/profile.js"

function newItem(req,res){
  res.render("items/new")
}

function create(req,res){
  Item.create(req.body)
  .then(item => {
    // console.log(item)
    res.redirect("/items")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/items/new")
  })
}

function index(req,res){
  Item.find({})
  .then(items => {
    // console.log(items)
    res.render("items/index",{
      items
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/new")
  })
}

function show(req,res){
  Item.findById(req.params.id)
  .then(item => {
    res.render("items/show",{
      item,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export{
  newItem as new,
  create,
  index,
  show,

}