import { Profile } from "../models/profile.js"
import { User } from "../models/user.js"

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render("profiles/index", {
      profiles,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  User.find({ profile: req.params.id })
  .then(theUser => {
    Profile.findById(req.params.id)
    .then(profile => {
      const isSelf = profile._id.equals(req.user.profile._id)
      res.render("profiles/show", {
        theUser,
        profile,
        isSelf,
      })
    })
    .catch((err) => {
      console.log(err)
      res.redirect("/profiles")
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/profiles")
  })
}

export {
  index,
  show,
}