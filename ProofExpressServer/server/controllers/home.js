
function index (req, res) {
    res.render('home/index', {
        title: 'Home',
        campaign: ''
    });
}

module.exports = {
    index: index
};
