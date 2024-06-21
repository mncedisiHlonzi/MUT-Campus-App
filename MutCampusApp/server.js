const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use('/uploads', express.static('uploads'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tycoon',
    database: 'mutannouncements'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file); // File details
    console.log(req.body); // Form data

    const { announcementText, targetAudience, adminId } = req.body; // Fetch adminId from request body
    const imagePath = req.file ? req.file.path : null;

    const postSql = 'INSERT INTO posts (posts, adminId) VALUES (?, ?)'; // Include adminId in the insert query
    connection.query(postSql, [announcementText, adminId], (err, result) => {
        if (err) {
            console.error('Error inserting data into posts table:', err);
            return res.status(500).json({ error: 'Error inserting data into posts table', details: err.message });
        }

        const postId = result.insertId;

        const imageSql = 'INSERT INTO post_images (postId, image_path) VALUES (?, ?)';
        connection.query(imageSql, [postId, imagePath], (err, result) => {
            if (err) {
                console.error('Error inserting data into post_images table:', err);
                return res.status(500).json({ error: 'Error inserting data into post_images table', details: err.message });
            }

            console.log('Data inserted into MySQL:', result);
            return res.status(200).json({ message: 'Data inserted into MySQL' });
        });
    });
});

app.get('/posts', (req, res) => {
    const sql = `
        SELECT p.*, pi.image_path, COALESCE(c.comment_count, 0) AS comment_count, a.profile_picture, a.office
        FROM posts p
        LEFT JOIN post_images pi ON p.postId = pi.postId
        LEFT JOIN (SELECT postId, COUNT(*) AS comment_count FROM post_comments GROUP BY postId) c ON p.postId = c.postId
        LEFT JOIN admin a ON p.adminId = a.adminId
    `;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching posts:', err);
            return res.status(500).json({ error: 'Error fetching posts' });
        }
        const posts = results.map(post => {
            if (post.image_path) {
                post.image_path = `http://192.168.101.153:3000/${post.image_path}`;
            }
            if (post.profile_picture) {
                post.profile_picture = `http://192.168.101.153:3000/${post.profile_picture}`;
            }
            return post;
        });
        res.status(200).json(posts);
    });
});


app.post('/posts/:postId/like', (req, res) => {
    const postId = req.params.postId;

    const likeSql = 'UPDATE posts SET likes = likes + 1 WHERE postId = ?';
    connection.query(likeSql, [postId], (err, result) => {
        if (err) {
            console.error('Error updating likes:', err);
            return res.status(500).json({ error: 'Error updating likes' });
        }
        res.status(200).json({ message: 'Like added' });
    });
});

app.get('/posts/:postId/comments', (req, res) => {
    const postId = req.params.postId;

    const commentSql = 'SELECT * FROM post_comments WHERE postId = ?';
    connection.query(commentSql, [postId], (err, results) => {
        if (err) {
            console.error('Error fetching comments:', err);
            return res.status(500).json({ error: 'Error fetching comments' });
        }
        res.status(200).json(results);
    });
});

app.post('/posts/:postId/comments', (req, res) => {
    const postId = req.params.postId;
    const { comment } = req.body;

    const commentSql = 'INSERT INTO post_comments (postId, comment) VALUES (?, ?)';
    connection.query(commentSql, [postId, comment], (err, result) => {
        if (err) {
            console.error('Error inserting comment:', err);
            return res.status(500).json({ error: 'Error inserting comment' });
        }
        res.status(200).json({ message: 'Comment added' });
    });
});

app.get('/admin-profile/:adminId', (req, res) => {
    const adminId = req.params.adminId;
    const sql = 'SELECT adminId, name, position, profile_picture, office FROM admin WHERE adminId = ?'; // Fetch adminId
    connection.query(sql, [adminId], (err, result) => {
        if (err) {
            console.error('Error fetching admin profile:', err);
            return res.status(500).json({ error: 'Error fetching admin profile' });
        }
        res.status(200).json(result[0]);
    });
});

app.post('/admin-profile/:adminId', upload.single('profile_picture'), (req, res) => {
    const adminId = req.params.adminId;
    const { name, position, office } = req.body;
    const profilePicture = req.file ? req.file.path : null;

    let sql = 'UPDATE admin SET name = ?, position = ?, office = ?';
    const params = [name, position, office];

    if (profilePicture) {
        sql += ', profile_picture = ?';
        params.push(profilePicture);
    }

    sql += ' WHERE adminId = ?';
    params.push(adminId);

    connection.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error updating admin profile:', err);
            return res.status(500).json({ error: 'Error updating admin profile' });
        }
        res.status(200).json({ message: 'Profile updated' });
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
