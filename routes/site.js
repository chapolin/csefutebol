module.exports = function (app) {
  app.get('/', function (req, res) {
  	res.render('index', {section: "home"});
  });

  app.get('/historia', function (req, res) {
  	res.render('history', {section: "history"});
  });

  app.get('/time', function (req, res) {
  	res.render('team', {section: "team"});
  });

  app.get('/elenco', function (req, res) {
  	res.render('staff', {section: "staff"});
  });

  app.get('/agenda', function (req, res) {
  	res.render('calendar', {section: "calendar"});
  });

  app.get('/estatisticas', function (req, res) {
  	res.render('statistics', {section: "statistics"});
  });

  app.get('/midias', function (req, res) {
  	res.render('medias', {section: "medias"});
  });

  app.get('/fotos', function (req, res) {
  	res.render('fotos');
  });
};
