
const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore({
  projectId: 'equipo1-ecommerce', 
});

module.exports = { datastore };
