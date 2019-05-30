// routes.js
// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', (req, res) => {
    res.json({
        status: 'API is Working',
        message: 'hello world!',
    });
});

// Import controller
let colorcontroller = require('./models/colormethods');

// Color routes
router.route('/colors')
    .get(colorcontroller.index)
    .post(colorcontroller.new);

router.route('/colors/:colors_id')
    .get(colorcontroller.view)
    .delete(colorcontroller.delete);
    
// Export API routes
module.exports = router;