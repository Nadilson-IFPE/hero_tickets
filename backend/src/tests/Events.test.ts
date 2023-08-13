import crypto from 'node:crypto';
import request from 'supertest';
import { App } from '../app';
import { Event } from '../entities/Event';
import { EventUseCase } from "../useCases/EventUseCase";

const app = new App();
const express = app.app;

describe('Event test', () => {
    it('/POST Event', async () => {
        const event = {
            title: 'Abril Pro Rock',
            price: [{ sector: 'Pista', amount: '20' }],
            categories: ['Show'],
            description: 'Evento descrição',
            city: 'Recife',
            location: {
                latitude: -8.05428,
                longitude: -34.8813,
            },
            coupons: [],
            date: new Date(),
            participants: [],
        };

        const response = await request(express)
            .post('/events')
            .field('title', event.title)
            .field('categories', event.categories)
            .field('description', event.description)
            .field('city', event.city)
            .field('coupons', event.coupons)
            .field('location[latitude]', event.location.latitude)
            .field('location[longitude]', event.location.longitude)
            .field('date', event.date.toISOString())
            .field('price[sector]', event.price[0].sector)
            .field('price[amount]', event.price[0].amount)
            .attach('banner', '/Users/Nadilson/Documents/banner.jpg')
            .attach('flyers', '/Users/Nadilson/Documents/flyer1.jpg')
            .attach('flyers', '/Users/Nadilson/Documents/flyer2.jpg');

        if (response.error) {
            console.log('Error:', response.error);
        }

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'Evento criado com sucesso.' });
    });

    it('/GET/:id event by id', async () => {
        const response = await request(express).get(
            '/events/64c10f9641b37087342412f5',
        );

        if (response.error) {
            console.log(response.error);
        }

        expect(response.status).toBe(200);
    });

    it('/GET event by location', async () => {
        const response = await request(express).get(
            '/events?latitude=-8.05428&longitude=-34.8813',
        );

        if (response.error) {
            console.log(response.error);
        }

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('/GET event by category', async () => {
        const response = await request(express).get('/events/category/Show');

        if (response.error) {
            console.log(response.error);
        }

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('/POST event insert user', async () => {
        const response = await request(express)
            .post('/events/64c10f9641b37087342412f5/participants')
            .send({
                name: 'Nadilson',
                //  email: 'nadilson@mail.com'
                email: crypto.randomBytes(10).toString('hex') + '@teste.com',
            });

        if (response.error) {
            console.log(response.error);
        }

        expect(response.status).toBe(200);
    });
});

const eventRepository = {
    add: jest.fn(),
    findEventsByCategory: jest.fn(),
    findByLocationAndDate: jest.fn(),
    findEventsByCity: jest.fn(),
    findEventsByName: jest.fn(),
    findEventById: jest.fn(),
    update: jest.fn(),
};

const eventUseCase = new EventUseCase(eventRepository);

const event = {
    title: 'Abril Pro Rock',
    price: [{ sector: 'Pista', amount: '20' }],
    categories: ['Show'],
    description: 'Evento descrição',
    city: 'Recife',
    location: {
        latitude: -8.05428,
        longitude: -34.8813,
    },
    banner: 'banner.png',
    flyers: ['flyer1.png', 'flyer2.png'],
    coupons: [],
    date: new Date(),
    participants: [],
};

describe('Unit Test', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return an array of events by category', async () => {
        eventRepository.findEventsByCategory.mockResolvedValue([event]);
        const result = await eventUseCase.findEventsByCategory('Show');

        expect(result).toEqual([event]);
        expect(eventRepository.findEventsByCategory).toHaveBeenCalledWith('Show');
    });

    it('should return an array of events by name', async () => {
        eventRepository.findEventsByName.mockResolvedValue([event]);
        const result = await eventUseCase.findEventsByName('Abril Pro Rock');

        expect(result).toEqual([event]);
        expect(eventRepository.findEventsByName).toHaveBeenCalledWith(
            'Abril Pro Rock',
        );
    });

    it('should return an event by Id', async () => {
        eventRepository.findEventById.mockResolvedValueOnce(event);
        const result = await eventUseCase.findEventsById(
            '64c10f9641b37087342412f5',
        );

        expect(result).toEqual(event);
        expect(eventRepository.findEventById).toHaveBeenCalledWith(
            '64c10f9641b37087342412f5',
        );
    });
});