const router = require('express').Router()
const listControler = require('../app/controller/lists.controler')
const favoriteControler = require('../app/controller/favorite.controler')
const listMenuControler = require('../app/controller/listMenu.controler')
const bgControler = require('../app/controller/bgUser.controler')
const test111Controler = require('../app/controller/test111.controler')
const test222Controler = require('../app/controller/test222.controler')

// ********* ****** list ******** ********

router.post('/addList', listControler.addList)
router.get('/showList', listControler.showList)
router.delete('/delAllList', listControler.delAllList)
router.delete('/delOneList', listControler.delOneList)
router.post('/editList', listControler.editList)
// router.get('/listed', listControler.listed)

// **************** ***** favorite ***** *****************

router.post('/addFavorite', favoriteControler.addFavorite)
router.get('/showFavorite', favoriteControler.showFavorite)
router.delete('/delAllFavorite', favoriteControler.delAllFavorite)
router.delete('/delOneFavorite/:id', favoriteControler.delOneFavorite)
router.post('/rate', favoriteControler.rate)
router.get('/showRate', favoriteControler.showRate)

// ******** ******** listMenu ******* ********

router.post('/addToList', listMenuControler.addToList)
router.get('/allItem/:id', listMenuControler.allInList)
router.delete('/delOneItem', listMenuControler.delOneItem)
router.delete('/delAllItem', listMenuControler.delAllItem)
// router.get('/listed', listMenuControler.listed)

// ******* ******* bg ******* **********

router.post('/addBg', bgControler.addBg)
router.get('/getBg/:id', bgControler.getBg)

// ******** ******** test 1 & 2 ********* **********

router.post('/addTest1', test111Controler.addTest)

// *********************************** test 22 *******************
router.post('/addTest2', test222Controler.addTest)
router.get('/getTest2', test222Controler.testing)

module.exports = router