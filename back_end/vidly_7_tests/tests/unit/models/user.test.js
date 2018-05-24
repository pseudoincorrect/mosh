const {User} = require('../../../models/user'); 
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('generateAuthToken', () => {
    it('should return a valid json web token', () => {
        payload = {_id: new mongoose.Types.ObjectId().toHexString(), 
            isAdmin: true}        
        user = new User(payload);
        
        token =  user.generateAuthToken();
        decoded = jwt.verify(token, config.get('jwtPrivateKey'));

        expect(decoded).toMatchObject(payload);
    });
});