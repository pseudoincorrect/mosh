const request = require('supertest');
const {Genre} = require('../../models/genre');
const {User} = require('../../models/user');

let server;

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach( async () => { 
        server.close(); 
        await Genre.remove({});
    });

    describe('GET /', () => {
        it('should return all genres', async () => {
            const genres=[ {name: 'genre1'}, {name: 'genre2'} ];
            await Genre.collection.insertMany(genres);

            const res = await request(server).get('/api/genres');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(genres.length);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it(`should return the genre associate to 
                    an _id if valid id is passed`, async () => {
            const genre = new Genre({name: "genre1"});
            await genre.save();

            const res = await request(server).get(
                `/api/genres/${genre._id}`);
            
            expect(res.body.name).toBe('genre1');
            expect(res.body).toHaveProperty('name', genre.name);
            
        });

        it(`should return a 404 response 
                        if invalid id is passed`, async () => {
            const res = await request(server).get('/api/genres/1');
            
            expect(res.status).toBe(404); 
        });
    });

    describe('POST /', () => {
        it(`should return a 401 response 
                    if client in not logged in`, async () => {
            const res = await request(server)
                .post('/api/genres')
                .send({ name: 'genre1' });
            
            expect(res.status).toBe(401); 
        });

        it(`should return a 400 error 
                if genre is less than 5 chars`, async () => {
            const token = new User().generateAuthToken();
            console.log('token = ', token);
            
            const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: '1234' });

            expect(res.status).toBe(400); 
        });

    });
});