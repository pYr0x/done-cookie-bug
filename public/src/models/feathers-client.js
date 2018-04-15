import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import {CookieStorage} from 'cookie-storage';
import auth from '@feathersjs/authentication-client';

const app = feathers();

// Connect to a different URL
const restClient = rest('');

// Configure an AJAX library (see below) with that client 
app.configure(restClient.fetch(window.fetch));

// configure authentication 
const authOptions = {
    header: 'Authorization', // the default authorization header for REST
    path: 'api/authentication', // the server-side authentication service path
    jwtStrategy: 'jwt', // the name of the JWT authentication strategy 
    entity: 'user', // the entity you are authenticating (ie. a users)
    service: 'users', // the service to look up the entity
    cookie: 'feathers-jwt', // the name of the cookie to parse the JWT from when cookies are enabled server side
    storageKey: 'feathers-jwt', // the key to store the accessToken in localstorage or AsyncStorage on React Native
    storage: new CookieStorage() // Passing a WebStorage-compatible object to enable automatic storage on the client.
};

app.configure(auth(authOptions));

export default app;