const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const multer = require('multer');
const path = require('path');
const { authenticate, authorize } = require('../middleware/auth');


// Cấu hình multer để upload ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });



router.get('/categories', productController.getCategories);
router.get('/trending', productController.getTrending);
router.get('/:id', productController.getProductId);
router.get('/', productController.getProducts);

router.post('/create', authenticate, authorize(['admin']), upload.array('images', 5), productController.postProduct);
router.delete('/:id', authenticate, authorize(['admin']), productController.deleteProduct);
router.put('/:id', authenticate, authorize(['admin']), upload.array('images', 5), productController.updateProduct);

module.exports = router;
