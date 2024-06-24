const Blog = require('./model');

// Blog yazısı oluşturma
exports.createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.userId; // auth middleware'i tarafından sağlanır

        const newBlog = new Blog({ title, content, author });
        await newBlog.save();

        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: 'Bir hata meydana geldi', error: error.message });
    }
};

// Blog yazısı güncelleme
exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content, updatedAt: Date.now() }, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog yazısı bulunamadı' });
        }

        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: 'Bir hata meydana geldi', error: error.message });
    }
};

// Blog yazısı silme
exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog yazısı bulunamadı' });
        }

        res.json({ message: 'Blog yazısı başarıyla silindi' });
    } catch (error) {
        res.status(500).json({ message: 'Bir hata meydana geldi', error: error.message });
    }
};

// Tüm blog yazılarını listeleme
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name email'); // `author` alanını populate eder
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Bir hata meydana geldi', error: error.message });
    }
};

// Tek bir blog yazısını getirme
exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id).populate('author', 'name email'); // `author` alanını populate eder

        if (!blog) {
            return res.status(404).json({ message: 'Blog yazısı bulunamadı' });
        }

        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Bir hata meydana geldi', error: error.message });
    }
};
