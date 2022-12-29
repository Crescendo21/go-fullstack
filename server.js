// On importe les modules 'http' et 'app'
const http = require('http');
const app = require('./app');

// Cette fonction normalise le port passé en argument
// Elle le convertit en entier et vérifie qu'il est valide
// Si le port n'est pas valide, elle renvoie la valeur passée en argument
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// On récupère le port à utiliser, en utilisant la variable d'environnement 'PORT'
// Si cette variable n'est pas définie, on utilise le port 3000 par défaut
const port = normalizePort(process.env.PORT || '3000');

// On définit le port à utiliser dans l'application
app.set('port', port);

// Cette fonction gère les erreurs lors de l'écoute du serveur
const errorHandler = error => {
  // Si l'erreur ne concerne pas l'écoute, on la lance
  if (error.syscall !== 'listen') {
    throw error;
  }

  // On récupère l'adresse du serveur
  const address = server.address();
  // On détermine si l'adresse est une chaîne (pipe) ou un port
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  
  // Selon le code d'erreur, on affiche un message d'erreur approprié
  // et on quitte le processus avec un code d'erreur
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// On crée un serveur HTTP en utilisant l'application
const server = http.createServer(app);

// On gère les erreurs lors de l'écoute du serveur
server.on('error', errorHandler);

// Lorsque le serveur commence à écouter, on affiche un message dans la console
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// On fait écouter le serveur sur le port défini
server.listen(port);
