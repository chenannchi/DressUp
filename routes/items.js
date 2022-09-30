import { Router } from 'express'
import * as itemsCtrl from "../controllers/items.js"

const router = Router()

router.get("/new",isLoggedIn, itemsCtrl.new)
router.post("/",isLoggedIn, itemsCtrl.create)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

export {
  router
}
