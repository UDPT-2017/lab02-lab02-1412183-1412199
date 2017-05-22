module.exports = function(req, res){
  res.render('about', {
    title: 'About',
    acc: session.uniqueId,
    name: session.name,
  })
};