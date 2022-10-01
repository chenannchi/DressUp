import { Router } from 'express'
import * as itemsCtrl from "../controllers/items.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get("/new",isLoggedIn, itemsCtrl.new)
router.get("/", itemsCtrl.index)
router.get("/:id",itemsCtrl.show)
router.post("/",isLoggedIn, itemsCtrl.create)
router.post('/:id/reviews', isLoggedIn, itemsCtrl.createReview)
router.delete("/:id",isLoggedIn, itemsCtrl.delete)



export {
  router
}
