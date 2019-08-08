var path = require('path');

exports.redirectView = function(req, res){
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
};

exports.sitemap = function(req, res){
    res.sendFile(path.join(__dirname, '../build', 'sitemap.xml'));
};
