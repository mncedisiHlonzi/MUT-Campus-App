const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');

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
    const { announcementText, targetAudience, adminId } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const postSql = 'INSERT INTO posts (posts, adminId) VALUES (?, ?)';
    connection.query(postSql, [announcementText, adminId], (err, result) => {
        if (err) {
            console.error('Error inserting data into posts table:', err);
            return res.status(500).json({ error: 'Error inserting data into posts table', details: err.message });
        }

        const postId = result.insertId;

        if (imagePath) {
            const imageSql = 'INSERT INTO post_images (postId, image_path) VALUES (?, ?)';
            connection.query(imageSql, [postId, imagePath], (err, result) => {
                if (err) {
                    console.error('Error inserting data into post_images table:', err);
                    return res.status(500).json({ error: 'Error inserting data into post_images table', details: err.message });
                }
                insertNotificationAndSendResponse(postId, adminId, res);
            });
        } else {
            insertNotificationAndSendResponse(postId, adminId, res);
        }
    });
});

function insertNotificationAndSendResponse(postId, adminId, res) {
    const notificationSql = 'INSERT INTO notifications (postId, title, fromOffice) VALUES (?, ?, ?)';
    connection.query(notificationSql, [postId, 'Post Announcement', adminId], (err, result) => {
        if (err) {
            console.error('Error inserting data into notifications table:', err);
            return res.status(500).json({ error: 'Error inserting data into notifications table', details: err.message });
        }

        const notificationId = result.insertId;

        // Fetch all students
        connection.query('SELECT studentId FROM students', (err, students) => {
            if (err) {
                console.error('Error fetching students:', err);
                return res.status(500).json({ error: 'Error fetching students', details: err.message });
            }

            // Insert a record for each student
            const studentNotifications = students.map(student => [notificationId, student.studentId]);
            const studentNotificationSql = 'INSERT INTO student_notifications (notificationId, studentId) VALUES ?';
            connection.query(studentNotificationSql, [studentNotifications], (err, result) => {
                if (err) {
                    console.error('Error inserting data into student_notifications table:', err);
                    return res.status(500).json({ error: 'Error inserting data into student_notifications table', details: err.message });
                }

                console.log('Data inserted into MySQL:', result);
                return res.status(200).json({ message: 'Data inserted into MySQL' });
            });
        });
    });
}




app.get('/notifications', authenticateToken, (req, res) => {
    const studentId = req.user.studentId;
    const sql = `
        SELECT n.*, sn.isRead 
        FROM notifications n 
        JOIN student_notifications sn ON n.notificationId = sn.notificationId 
        WHERE sn.studentId = ? 
        ORDER BY n.createdAt DESC
    `;
    connection.query(sql, [studentId], (err, results) => {
        if (err) {
            console.error('Error fetching notifications:', err);
            return res.status(500).json({ error: 'Error fetching notifications' });
        }
        res.status(200).json(results);
    });
});


app.post('/notifications/:notificationId/read', authenticateToken, (req, res) => {
    const notificationId = req.params.notificationId;
    const studentId = req.user.studentId;
    const sql = 'UPDATE student_notifications SET isRead = TRUE WHERE notificationId = ? AND studentId = ?';
    connection.query(sql, [notificationId, studentId], (err, result) => {
        if (err) {
            console.error('Error updating notification:', err);
            return res.status(500).json({ error: 'Error updating notification' });
        }
        res.status(200).json({ message: 'Notification marked as read' });
    });
});

app.get('/notifications/unread-count', authenticateToken, (req, res) => {
    const studentId = req.user.studentId;
    const sql = 'SELECT COUNT(*) as count FROM student_notifications WHERE studentId = ? AND isRead = FALSE';
    connection.query(sql, [studentId], (err, results) => {
        if (err) {
            console.error('Error fetching unread notifications count:', err);
            return res.status(500).json({ error: 'Error fetching unread notifications count' });
        }
        const count = results[0].count;
        res.status(200).json({ count });
    });
});




app.get('/posts', (req, res) => {
    const sql = `
        SELECT p.*, pi.image_path, COALESCE(c.comment_count, 0) AS comment_count, a.profile_picture, a.office
        FROM posts p
        LEFT JOIN post_images pi ON p.postId = pi.postId
        LEFT JOIN (SELECT postId, COUNT(*) AS comment_count FROM post_comments GROUP BY postId) c ON p.postId = c.postId
        LEFT JOIN admin a ON p.adminId = a.adminId
        ORDER BY p.created_at DESC
    `;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching posts:', err);
            return res.status(500).json({ error: 'Error fetching posts' });
        }
        const posts = results.map(post => {
            if (post.image_path) {
                post.image_path = `http://172.16.21.22:3000/${post.image_path}`;
            }
            if (post.profile_picture) {
                post.profile_picture = `http://172.16.21.22:3000/${post.profile_picture}`;
            }
            return post;
        });
        res.status(200).json(posts);
    });
});


app.post('/posts/:postId/like', authenticateToken, (req, res) => {
    const postId = req.params.postId;
    const studentId = req.user.studentId;

    // Check if the student has already liked the post
    const checkLikeSql = 'SELECT * FROM post_likes WHERE postId = ? AND studentId = ?';
    connection.query(checkLikeSql, [postId, studentId], (err, results) => {
        if (err) {
            console.error('Error checking like:', err);
            return res.status(500).json({ error: 'Error checking like' });
        }

        if (results.length > 0) {
            // If the like exists, remove it
            const deleteLikeSql = 'DELETE FROM post_likes WHERE postId = ? AND studentId = ?';
            connection.query(deleteLikeSql, [postId, studentId], (err) => {
                if (err) {
                    console.error('Error removing like:', err);
                    return res.status(500).json({ error: 'Error removing like' });
                }

                // Decrement the likes count on the post
                const decrementLikeSql = 'UPDATE posts SET likes = likes - 1 WHERE postId = ?';
                connection.query(decrementLikeSql, [postId], (err) => {
                    if (err) {
                        console.error('Error decrementing like:', err);
                        return res.status(500).json({ error: 'Error decrementing like' });
                    }

                    res.status(200).json({ message: 'Like removed' });
                });
            });
        } else {
            // If the like does not exist, add it
            const addLikeSql = 'INSERT INTO post_likes (postId, studentId) VALUES (?, ?)';
            connection.query(addLikeSql, [postId, studentId], (err) => {
                if (err) {
                    console.error('Error adding like:', err);
                    return res.status(500).json({ error: 'Error adding like' });
                }

                // Increment the likes count on the post
                const incrementLikeSql = 'UPDATE posts SET likes = likes + 1 WHERE postId = ?';
                connection.query(incrementLikeSql, [postId], (err) => {
                    if (err) {
                        console.error('Error incrementing like:', err);
                        return res.status(500).json({ error: 'Error incrementing like' });
                    }

                    res.status(200).json({ message: 'Like added' });
                });
            });
        }
    });
});


app.get('/posts/:postId/hasLiked', authenticateToken, (req, res) => {
    const postId = req.params.postId;
    const studentId = req.user.studentId;

    const checkLikeSql = 'SELECT * FROM post_likes WHERE postId = ? AND studentId = ?';
    connection.query(checkLikeSql, [postId, studentId], (err, results) => {
        if (err) {
            console.error('Error checking like:', err);
            return res.status(500).json({ error: 'Error checking like' });
        }

        res.status(200).json({ hasLiked: results.length > 0 });
    });
});

app.delete('/posts/:postId', (req, res) => {
    const postId = req.params.postId;

    // Delete post comments
    const deleteCommentsSql = 'DELETE FROM post_comments WHERE postId = ?';
    connection.query(deleteCommentsSql, [postId], (err, result) => {
        if (err) {
            console.error('Error deleting comments:', err);
            return res.status(500).json({ error: 'Error deleting comments' });
        }

        // Delete post images
        const deleteImagesSql = 'DELETE FROM post_images WHERE postId = ?';
        connection.query(deleteImagesSql, [postId], (err, result) => {
            if (err) {
                console.error('Error deleting images:', err);
                return res.status(500).json({ error: 'Error deleting images' });
            }

            // Delete post likes (if necessary)
            const deleteLikesSql = 'DELETE FROM post_likes WHERE postId = ?';
            connection.query(deleteLikesSql, [postId], (err, result) => {
                if (err) {
                    console.error('Error deleting likes:', err);
                    return res.status(500).json({ error: 'Error deleting likes' });
                }

                // Finally, delete the post itself
                const deletePostSql = 'DELETE FROM posts WHERE postId = ?';
                connection.query(deletePostSql, [postId], (err, result) => {
                    if (err) {
                        console.error('Error deleting post:', err);
                        return res.status(500).json({ error: 'Error deleting post' });
                    }

                    res.status(200).json({ message: 'Post deleted successfully' });
                });
            });
        });
    });
});

  



// Middleware to authenticate the token and extract user information
function authenticateToken(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token, 'student_pro25', (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user;
        next();
    });
}

// Insert a new comment with studentId
app.post('/posts/:postId/comments', authenticateToken, (req, res) => {
    const postId = req.params.postId;
    const { comment, adminProfile } = req.body;
  
    let query, params;
  
    if (adminProfile) {
      // If it's an admin commenting
      const adminId = adminProfile.adminId;
      query = 'INSERT INTO post_comments (postId, comment, adminId) VALUES (?, ?, ?)';
      params = [postId, comment, adminId];
    } else {
      // If it's a student commenting
      const studentId = req.user.studentId;
      query = 'INSERT INTO post_comments (postId, comment, studentId) VALUES (?, ?, ?)';
      params = [postId, comment, studentId];
    }
  
    connection.query(query, params, (err, result) => {
      if (err) {
        console.error('Error inserting comment:', err);
        return res.status(500).json({ error: 'Error inserting comment' });
      }
      res.status(200).json({ message: 'Comment added' });
    });
  });
  


// Get comments for a post along with student information
app.get('/posts/:postId/comments', (req, res) => {
    const postId = req.params.postId;
  
    const commentsSql = `
      SELECT 
        pc.commentId, 
        pc.comment, 
        pc.created_at, 
        s.studentId, 
        s.name AS studentName, 
        s.surname AS studentSurname, 
        s.profile_picture AS studentProfilePicture,
        a.adminId, 
        a.office AS adminOffice, 
        a.profile_picture AS adminProfilePicture
      FROM post_comments pc
      LEFT JOIN students s ON pc.studentId = s.studentId
      LEFT JOIN admin a ON pc.adminId = a.adminId
      WHERE pc.postId = ?
      ORDER BY pc.created_at ASC
    `;
    
    connection.query(commentsSql, [postId], (err, results) => {
      if (err) {
        console.error('Error fetching comments:', err);
        return res.status(500).json({ error: 'Error fetching comments' });
      }
      res.status(200).json(results);
    });
  });
  

  
  

// Example backend endpoint for admin login
app.post('/admin-login', (req, res) => {
    const { password } = req.body;

    // Query to find the admin by password
    connection.query('SELECT adminId FROM admin WHERE password = ?', [password], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Server error');
        }

        if (results.length === 0) {
            return res.status(400).send('Admin not found');
        }

        const adminId = results[0].adminId;
        // Return adminId for frontend navigation
        res.status(200).json({ adminId });
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

app.get('/students/:studentId', (req, res) => {
    const { studentId } = req.params;

    connection.query('SELECT * FROM students WHERE studentId = ?', [studentId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Server error');
        }

        if (results.length === 0) {
            return res.status(400).send('Student not found');
        }

        res.status(200).json(results[0]);
    });
});

app.post('/students/:studentId/profile-picture', authenticateToken, upload.single('profile_picture'), (req, res) => {
    const studentId = req.params.studentId;
    const profilePicture = req.file ? req.file.path : null;

    if (!profilePicture) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const updateSql = 'UPDATE students SET profile_picture = ? WHERE studentId = ?';
    connection.query(updateSql, [profilePicture, studentId], (err, result) => {
        if (err) {
            console.error('Error updating profile picture:', err);
            return res.status(500).json({ error: 'Error updating profile picture' });
        }
        res.status(200).json({ message: 'Profile picture updated', profile_picture: profilePicture });
    });
});


app.post('/voice-my-concern', (req, res) => {
    const { from, subject, message, to, studentId } = req.body;

    const sql = 'INSERT INTO concerns (fromStudent, subject, message, toOffice, studentId) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [from, subject, message, to, studentId], (err, result) => {
        if (err) {
            console.error('Error inserting concern:', err);
            return res.status(500).json({ error: 'Error inserting concern' });
        }
        
        const concernId = result.insertId;

        // Insert notification for the concern
        const notificationSql = 'INSERT INTO concern_notifications (concernId, studentName) VALUES (?, ?)';
        connection.query(notificationSql, [concernId, from], (err, result) => {
            if (err) {
                console.error('Error inserting concern notification:', err);
                return res.status(500).json({ error: 'Error inserting concern notification' });
            }
            
            res.status(200).json({ message: 'Concern sent successfully' });
        });
    });
});



  

app.get('/concerns', (req, res) => {
    const sql = 'SELECT * FROM concerns ORDER BY createdAt DESC';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching concerns:', err);
            return res.status(500).json({ error: 'Error fetching concerns' });
        }
        res.status(200).json(results);
    });
});


  app.get('/concern-notifications', (req, res) => {
    const sql = 'SELECT * FROM concern_notifications ORDER BY createdAt DESC';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching concern notifications:', err);
            return res.status(500).json({ error: 'Error fetching concern notifications' });
        }
        res.status(200).json(results);
    });
});

app.post('/concern-notifications/:notificationId/read', (req, res) => {
    const notificationId = req.params.notificationId;
    const sql = 'UPDATE concern_notifications SET isRead = TRUE WHERE notificationId = ?';
    connection.query(sql, [notificationId], (err, result) => {
        if (err) {
            console.error('Error updating notification:', err);
            return res.status(500).json({ error: 'Error updating notification' });
        }
        res.status(200).json({ message: 'Notification marked as read' });
    });
});

app.get('/concerns/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const sql = `
        SELECT c.concernId, c.fromStudent, c.subject, c.message, c.createdAt, 
               r.response, r.respondedAt
        FROM concerns c
        LEFT JOIN responses r ON c.concernId = r.concernId
        WHERE c.studentId = ? 
        ORDER BY c.createdAt DESC
    `;
    connection.query(sql, [studentId], (err, results) => {
        if (err) {
            console.error('Error fetching concerns:', err);
            return res.status(500).json({ error: 'Error fetching concerns' });
        }
        res.status(200).json(results);
    });
});


app.post('/concerns/:concernId/respond', (req, res) => {
    const concernId = parseInt(req.params.concernId, 10); // Ensure it's an integer
    const { response } = req.body;
    
    if (isNaN(concernId)) {
        return res.status(400).json({ error: 'Invalid concernId' });
    }

    const sql = 'INSERT INTO responses (concernId, response) VALUES (?, ?)';
    connection.query(sql, [concernId, response], (err, result) => {
        if (err) {
            console.error('Error responding to concern:', err);
            return res.status(500).json({ error: 'Error responding to concern' });
        }
        res.status(201).json({ message: 'Response added successfully' });
    });
});

app.get('/concerns/student/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    console.log('Fetching messages, subjects, and responses for studentId:', studentId);
  
    const query = `
      SELECT concerns.concernId AS messageId, concerns.subject, concerns.message, concerns.createdAt AS messageCreatedAt,
             responses.response AS responseMessage, responses.respondedAt AS responseCreatedAt
      FROM concerns
      LEFT JOIN responses ON concerns.concernId = responses.concernId
      WHERE concerns.studentId = ?
      ORDER BY concerns.createdAt DESC
    `;
  
    connection.query(query, [studentId], (err, results) => {
      if (err) {
        console.error('Error fetching concerns, subjects, and responses:', err);  // Log the actual error
        return res.status(500).send('Error fetching concerns, subjects, and responses');
      } else {
        console.log('Fetched concerns, subjects, and responses:', results);
        res.json(results);
      }
    });
});


  
  
  
  
  




  
  




//login endpoint
const jwt = require('jsonwebtoken');
const secretKey = 'student_pro25';

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query to find the student by email
    connection.query('SELECT * FROM students WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Server error');
        }

        if (results.length === 0) {
            return res.status(400).send('Student not found');
        }

        const student = results[0];

        // Compare the provided password with the password from the database
        if (password !== student.password) {
            return res.status(400).send('Invalid password');
        }

        // If password matches, generate a JWT
        const token = jwt.sign({ studentId: student.studentId }, secretKey, { expiresIn: '1h' });

        // Return the token and student information
        res.status(200).json({ message: 'Login successful', token, student });
    });
});

// AI Integration Route
app.post('/get-response', (req, res) => {
    const userMessage = req.body.message.toLowerCase().trim();

    // Query database for the response
    const sql = 'SELECT response FROM chatbot WHERE query = ?';
    connection.query(sql, [userMessage], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ reply: 'Error fetching response from database' });
        }

        // If response found, return it; otherwise, return default response
        if (results.length > 0) {
            res.json({ reply: results[0].response });
        } else {
            res.json({ reply: 'I’m sorry, I don’t understand. Could you please rephrase?' });
        }
    });
});

  
  


app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});