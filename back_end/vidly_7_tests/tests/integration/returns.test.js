const moment = require('moment');
const mongoose = require('mongoose');
const request = require('supertest');
const {Rental} = require('../../models/rental');
const {Movie} = require('../../models/movie');
const {User} = require('../../models/user');

describe('returns', () => {
    let server;
    let rental;
    let customerId;
    let movieId;
    let token;
    let movie;

    const exec = async () => {
        return await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId, movieId });
    };

    beforeEach( async () => { 
        server = require('../../index');
        customerId = new mongoose.Types.ObjectId();
        movieId = new mongoose.Types.ObjectId();
        token = new User().generateAuthToken();
        movie = new Movie({
            _id: movieId,
            title: '12345',
            dailyRentalRate: 1,
            numberInStock: 1,
            genre: {name: "12345"}
        });
        await movie.save();
        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345',
                isGold: false
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 1
            } 
        });  
    });

    
    afterEach( async () => { 
        await Rental.remove({});
        await server.close(); 
    });

    it('should return 401 if client is not logged',
    async () => { 
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 400 if customerId is not provided',
    async () => { 
        customerId = '';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 400 if movieId is not provided',
    async () => { 
        movieId = '';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 404 if rental does not exist',
    async () => { 
        await Rental.remove({});
        const res = await exec();
        expect(res.status).toBe(404);
    });

    it('should return 400 if rental already processed',
    async () => { 
        rental.returnDate = new Date();
        await rental.save();
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200 if everything is OK',
    async () => { 
        await rental.save();
        const res = await exec();
        expect(res.status).toBe(200);
    });

    it('should set the return date if input is valid',
    async () => { 
        await rental.save();
        const res = await exec();
        rental = await Rental.findById(rental._id);
        timeDiff = new Date() - rental.returnDate;
        expect(timeDiff).toBeLessThan(10*1000);
    });

    it('should return the rental fees',
    async () => { 
        rental.startDate = moment().add(-10, 'day').toDate();
        await rental.save();
        
        const res = await exec();

        rental = await Rental.findById(rental._id);
        expect(rental.rentalFees).toBe(10);
    });

    it('should update the movie stock',
    async () => { 
        rental.startDate = moment().add(-10, 'day').toDate();
        await rental.save();
        const res = await exec();
        movieInDb = await Movie.findById(movie._id);
        expect(movieInDb.numberInStock).toBe(2);
    });

    it('should return the rental if input is valid',
    async () => { 
        await rental.save();
        const res = await exec();
        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(
            ['customer', 'movie', 'startDate', 
            'returnDate', 'rentalFees' ]));
    });
});