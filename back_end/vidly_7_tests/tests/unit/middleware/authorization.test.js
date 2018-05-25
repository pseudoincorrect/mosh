const authorization = require('../../../middleware/authorization');
const {User} = require('../../../models/user');
const mongoose = require('mongoose');

describe('authorization', () => {

    it('should return the decoded token', () => {
        const user = new User({ isAdmin: true })
        const token = user.generateAuthToken();
        const decoded = { 
            _id: user._id.toHexString(),
            isAdmin: user.isAdmin
        };
        let req = {header: jest.fn().mockReturnValue(token)};
        const res = () => {};
        const next = () => { return;  };

        authorization(req, res, next);

        expect(req.user).toMatchObject(decoded);
    });
});