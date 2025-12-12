// BackEnd/models/TravelPlan.js

import mongoose from 'mongoose';

const travelPlanSchema = mongoose.Schema({
    //Reference to the user who owns this plan
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    places: [
        {
            name: { type: String, required: true },
            city: { type: String, required: true },
            notes: { type: String },
            visitDate: { type: Date }, 
        },
    ],
    budget: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true 
});

const TravelPlan = mongoose.model('TravelPlan', travelPlanSchema);

export default TravelPlan;