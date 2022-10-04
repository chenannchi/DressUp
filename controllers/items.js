import { Item } from "../models/item.js"
import { Profile } from "../models/profile.js"
import { User } from "../models/user.js"

function newItem(req, res) {
  res.render("items/new")
}

function create(req,res){
  req.body.owner = req.user.profile._id
  Item.create(req.body)
  .then(item => {
    res.redirect("/items")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/items/new")
  })
}

// function create(req, res) {
//   req.body.owner = req.user.profile._id
//   Item.create(req.body)
//     .then(item => {
//       User.find({ profile: req.user.profile._id })
//       .populate("collections")
//         .then(theUser => {
//           theUser.profile.collections.push(item._id)
//           theUser.profile.save()
//           console.log(theUser)
//           console.log(theUser.profile)
//           res.redirect("/items")
//         })
//         .catch(err => {
//           console.log(err)
//           res.redirect("/items/new")
//         })
//     })
//     .catch(err => {
//       console.log(err)
//       res.redirect("/items/new")
//     })
// }

function index(req, res) {
  Item.find({})
    .then(items => {
      // console.log(items)
      res.render("items/index", {
        items
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/new")
    })
}

// function show(req, res) {
//   Item.findById(req.params.id)
//     .then(item => {
//       console.log(item)
//       res.render("items/show", {
//         item,
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.redirect("/")
//     })
// }

function show(req, res) {
  Item.findById(req.params.id)
    .then(item => {
      // console.log(item)
      res.render("items/show", {
        item,
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
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
          console.log(item)
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

function addToCollection(req, res) {
  // console.log("My collections!!")
  Profile.findById(req.params.profileId)
    .then(profile => {
      // console.log(req.body)
      if (!profile.collections.includes(req.params.itemId)) {
        profile.collections.push(req.params.itemId)
      }
      profile.save()
        .then(() => {
          // console.log(profile.collections)
          res.redirect(`/items/mycollections`)
        })
        .catch(err => {
          console.log(err)
          res.redirect("/items")
        })
    })
}

function indexCollection(req, res) {
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
  addToCollection,
  indexCollection
}