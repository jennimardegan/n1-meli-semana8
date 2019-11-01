const express = require('express')
const router = express.Router()
const controller = require('../controllers/filmesController')

router.get('/', controller.get)
router.get('/:diretor', controller.getDiretor)
router.get('/genero/:genero', controller.getGenero)
router.post('/', controller.post)
router.post('/genero', controller.postGenero)

module.exports = router