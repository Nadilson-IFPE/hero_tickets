import mongoose from "mongoose";
import { Event } from "../entities/Event";
import { EventRepository } from "./EventRepository";
import { Location } from "../entities/Location";

const eventSchema = new mongoose.Schema({
    title: String,
    location: {
        latitude: String,
        longitude: String,
    },
    date: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    description: String,
    categories: [String],
    banner: String,
    flyers: [String],
    price: {
        type: Array,
    },
    city: String,
    participants: {
        type: Array,
        ref: 'User',
    },
});

const EventModel = mongoose.model('Event', eventSchema);

class EventRepositoryMongoose implements EventRepository {
    async add(event: Event): Promise<Event> {
        const eventModel = new EventModel(event);

        await eventModel.save();

        return event;
    }

    async findByLocationAnDate(location: Location, date: Date): Promise<Event | undefined> {
        const findEvent = await EventModel.findOne({ location, date }).exec();
        return findEvent ? findEvent.toObject() : undefined;
    }

    async findEventById(id: string): Promise<Event | undefined> {
        const findEvent = await EventModel.findOne({ _id: id }).exec();

        return findEvent ? findEvent.toObject() : undefined;
    }

    async findEventsByCity(city: string): Promise<Event[]> {
        const findEvent = await EventModel.find({ city }).exec();

        return findEvent.map((event) => event.toObject());
    }

    async findEventsByCategory(category: string): Promise<Event[]> {
        const findEvent = await EventModel.find({ categories: category }).exec();

        return findEvent.map((event) => event.toObject());
    }

    async update(event: Event, id: string): Promise<any> {
        const eventUpdate = await EventModel.updateMany({ _id: id }, event);
        console.log(eventUpdate);
        return event;
    }

    async findEventsByName(name: string): Promise<Event[]> {
        const findEvent = await EventModel.find({
            title: {
                $regex: name,
                $options: 'i',
            },
        }).exec();

        return findEvent.map((event) => event.toObject());
    }
}

export { EventRepositoryMongoose };