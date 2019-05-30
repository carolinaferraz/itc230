module.exports = (app) => {
    const colors = require('./controller');

    // get all
    app.get('/api/v1/colors', colors.getAll);

    //get
    app.get('/api/v1/colors/:name', colors.get);

    // add
    app.post('/api/v1/colors/', colors.add);

    // delete
    app.delete('/api/v1/colors/delete/:name', colors.delete);

}