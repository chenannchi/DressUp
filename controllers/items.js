import { Item } from "../models/item.js"
import { Profile } from "../models/profile.js"

function newItem(req, res) {
  res.render("items/new")
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Item.create(req.body)
  .then(item => {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.collections.push(item._id)
      profile.save()
      res.redirect("/items")
    })
    .catch(err => {
      console.log(err)
      res.redirect("/items/new")
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/items/new")
  })
}

function index(req, res) {
  Item.find({})
  .then(items => {
    res.render("items/index", {
      items
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/new")
  })
}

function show(req, res) {
  let inCollections = 0
  if(req.user){
    Profile.findById(req.user?.profile._id)
    .populate("collections")
    .then(profile => {
      Item.findById(req.params.id)
      .populate("owner")
      .populate({
        path:"reviews",
        populate:{path:"reviewer"}
      })
      .then(item => {
        for (let i = 0; i < profile.collections.length; i++){
          if (profile.collections[i].equals(item)){
            inCollections = 1
            break
          }
        }
        res.render("items/show", {
          item,
          inCollections,
        })
      })
      .catch(err => {
        console.log(err)
        res.redirect("/")
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  }else{
    Item.findById(req.params.id)
    .populate({
      path:"reviews",
      populate:{path:"reviewer"}
    })
    .then(item => {
      res.render("items/show", {
        item,
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  }
}

function deleteItem(req, res) {
  Item.findByIdAndDelete(req.params.id)
  .then(item => {
    res.redirect("/items")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function createReview(req, res) {
  req.body.reviewer = req.user.profile._id
  Item.findById(req.params.id)
  .then(item => {
    item.reviews.push(req.body)
    item.save()
    .then(() => {
      res.redirect(`/items/${item._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Item.findById(req.params.id)
  .then(item => {
    res.render("items/edit", {
      item,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function update(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key]
  }
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(item => {
    res.redirect(`/items/${item._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function addToCollections(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    if (!profile.collections.includes(req.params.itemId)) {
      profile.collections.push(req.params.itemId)
    }
    profile.save()
    .then(() => {
      res.redirect(`/items/${req.params.itemId}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect("/items")
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/items")
  })
}

function deleteFromCollections(req, res) {
  Profile.findById(req.params.profileId)
  .populate("collections")
  .then(profile => {
    let index = -1
    for (let i = 0; i < profile.collections.length; i++){
      if(profile.collections[i]._id.valueOf() === req.params.itemId){
        index = i
        break
      }
    }
    profile.collections.splice(index,1)
    profile.save()
    .then(() => {
      res.redirect(`/items/${req.params.itemId}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect("/items")
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/items")
  })
}

function indexCollections(req, res) {
  Profile.findById(req.user.profile.id)
  .populate("collections")
  .then(profile => {
    res.render("items/mycollections", {
      profile,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/items")
  })
}

export {
  newItem as new,
  create,
  index,
  show,
  deleteItem as delete,
  createReview,
  edit,
  update,
  addToCollections,
  deleteFromCollections,
  indexCollections
}