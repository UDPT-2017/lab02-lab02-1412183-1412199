module.exports = function(req, res){
  res.render('home', {
    title: 'Home',
    acc: session.uniqueId,
    name: session.name,
  })
};
