const request = require('supertest');
const {User} = require('../../models/user');
const {Genre} = require('../../models/genre');

let server; 

describe('authorization middleware', () => {

    beforeEach(() => { server = require('../../index'); });
    afterEach( async () => { 
        await server.close(); 
        await Genre.remove({});
    });

    let token;
    
    async function exec () {
        return await request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: "genre_1" });
    };

    beforeEach(() => { token = new User().generateAuthToken(); });

    it('should return a 401 error if no token is not provided', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return a 400 error if no token is invalid', async () => {
        token = 'a';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return a 200 error if token is valid', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });
});