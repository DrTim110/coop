const fs = require('fs');

const configPath = '../server/config.json';

var config;

try {
    config = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(config);
} catch (e){
    config = createConfig();
}

var newConfig = Object.assign(createConfig(), config);

fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 4) + '\n');

function createConfig(){
    return {
        port: 3001,
        server_name: 'http://localhost',
        client_id: '',
        client_secret: ''
    };
}