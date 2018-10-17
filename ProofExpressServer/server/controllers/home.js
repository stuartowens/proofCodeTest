
function index (req, res) {
    res.render('home/index', {
      title: 'Home',
      campaign: ''
    });
}

function info (req, res) {
    res.render('home/info', {
        title: 'More info'
    });
}

module.exports = {
    index: index,
    info: info
};
