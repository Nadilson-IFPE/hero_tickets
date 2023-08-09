import request from "supertest";
import { App } from "../app";

const app = new App();
const express = app.app;

describe('Event test', () => {
    it('/POST Event', async () => {
        const event = {
            title: 'Abril Pro Rock',
            price: [{ sector: 'Pista', amount: '20' }],
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
            .field('description', event.description)
            .field('city', event.city)
            .field('coupons', event.coupons)
            .field('location[latitude]', event.location.latitude)
            .field('location[longitude]', event.location.longitude)
            .field('price[sector]', event.price[0].sector)
            .field('price[amount]', event.price[0].amount)
            .attach('banner', '/Users/Nadilson/Documents/banner.jpg')
            .attach('flyers', '/Users/Nadilson/Documents/flyer1.jpg')
            .attach('flyers', '/Users/Nadilson/Documents/flyer2.jpg');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'Evento criado com sucesso.' });
    });
});