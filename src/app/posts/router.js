const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth'); // auth middleware'ini içe aktarın
const blogController = require('./controller'); // controller'ı içe aktarın

router.post('/create', auth, blogController.createBlog); // Blog yazısı oluşturma
router.put('/update/:id', auth, blogController.updateBlog); // Blog yazısı güncelleme
router.delete('/delete/:id', auth, blogController.deleteBlog); // Blog yazısı silme
router.get('/', blogController.getAllBlogs); // Tüm blog yazılarını listeleme
router.get('/:id', blogController.getBlogById); // Tek bir blog yazısını getirme

module.exports = router;
