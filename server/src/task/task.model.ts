import { Schema, model, Document } from 'mongoose';
import fs from 'fs';
import path from 'path';

interface Task extends Document {
    title: string,
    description: string,
    date: Date,
    status: 'not_started' | 'complete'
}

const taskSchema = new Schema<Task>({
    title: {
        type: String,
        required: [true, "Title should not be empty!"]
    },
    description: {
        type: String,
        required: [true, "Description should not be empty!"]
    },
    date: {
        type: Date,
        required: [true, "Date should be specified!"]
    },
    status: {
        type: String,
        enum: ['not_started', 'complete'],
        default: 'not_started'
    }
}, { timestamps: true });

export const Task = model<Task>('Task', taskSchema);