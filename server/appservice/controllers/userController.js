import pool from '../config/db.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' }); // Or your specific storage config



export const getProfile = async (request, response) => {
    console.log("request.user:", request.user);
    const userId = request.user.userId;
    console.log("User ID from token:", userId);
    console.log("Fetching profile for user ID:", userId);
    try {
        const [result] = await pool.query('SELECT user_name, biography, image FROM users WHERE user_id = ?', [userId]);
        console.log("Database query result:", result[0]);
        response.status(200).json({
            user_name: result[0].user_name,
            biography: result[0].biography,
            image: result[0].image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbSYAgHI38DctxxtEawjjNzeRxrpGuprgDTQ&s"
        });

    } catch (error) {
        console.error('Error fetching user profile:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

export const updateProfile = async (request, response) => {
    const userId = request.user.userId;
    const { name, bio } = request.body;

    // If a file was uploaded, use its path; otherwise, keep existing or null
    const imagePath = request.file ? request.file.path : request.body.image;

    try {
        await pool.query(
            'UPDATE users SET user_name = ?, biography = ?, image = ? WHERE user_id = ?',
            [name, bio, imagePath, userId]
        );

        response.status(200).json({
            message: 'Profile updated successfully',
            image: imagePath
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

export const searchUsers = async (request, response) => {
    const query = request.query.query;
    console.log("Search query:", query);
    try {
        const [results] = await pool.query('SELECT user_id, user_name FROM users WHERE user_name LIKE ?', [`%${query}%`]);
        response.status(200).json(results);
    } catch (error) {
        console.error('Error searching users:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

export const getPublicProfile = async (request, response) => {
    const userId = request.params.id;
    console.log("Fetching public profile for user ID:", userId);
    try {
        const [result] = await pool.query('SELECT user_name, biography, image FROM users WHERE user_id = ?', [userId]);
        if (result.length === 0) {
            return response.status(404).json({ error: 'User not found' });
        }
        console.log("Database query result for public profile:", result[0]);
        response.status(200).json({
            user_name: result[0].user_name,
            biography: result[0].biography,
            image: result[0].image
        });
    }
    catch (error) {
        console.error('Error fetching public profile:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
};
