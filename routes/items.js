import { Router } from 'express'
import * as itemsCtrl from "../controllers/items.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get("/new",isLoggedIn, itemsCtrl.new)
router.get("/", itemsCtrl.index)
router.get("/mycollections", isLoggedIn, itemsCtrl.indexCollection)
router.get("/:id",itemsCtrl.show)
router.get("/:id/edit", isLoggedIn, itemsCtrl.edit)
router.post("/",isLoggedIn, itemsCtrl.create)
router.post('/:id/reviews', isLoggedIn, itemsCtrl.createReview)
router.post("/:itemId/mycollections/:profileId",isLoggedIn, itemsCtrl.addToCollection)
router.delete("/:id",isLoggedIn, itemsCtrl.delete)
router.put("/:id",itemsCtrl.update)



export {
  router
}
