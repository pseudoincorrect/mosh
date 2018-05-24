const config = require('config');

module.exports = function (){
    // powershell: $env:vidly_jwtPrivateKey = "mySecureKey"
    // powershell: $env:NODE_ENV = "test"
    // powershell: Write-Output $env:vidly_jwtPrivateKey
    if (!config.get('jwtPrivateKey')){
       throw new Error('FATAL ERROR: jwtPrivateKey not defined');
    }
}