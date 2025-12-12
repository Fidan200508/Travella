// BackEnd/controllers/planController.js

import TravelPlan from '../models/TravelPlan.js';

//@descGet all travel plans of the current user
//@routeGET /api/plans
//@accessPrivate (Protected)
export const getMyPlans = async (req, res) => {
     //req.user.id comes from the protect middleware
    const plans = await TravelPlan.find({ user: req.user._id }).sort({ startDate: -1 });

    res.json(plans);
};

//@descCreate a new travel plan
//@routePOST /api/plans
//@accessPrivate (Protected)
export const createPlan = async (req, res) => {
    const { title, description, startDate, endDate, places, budget } = req.body;

    try {
        const newPlan = await TravelPlan.create({
            user: req.user._id, 
            title,
            description,
            startDate,
            endDate,
            places,
            budget,
        });

        res.status(201).json(newPlan); //201 Created
    } catch (error) {
        res.status(400).json({ message: "Plan yaratmaq mümkün olmadı.", error: error.message });
    }
};

//@descGet a single plan by ID
//@routeGET /api/plans/:id
//@accessPrivate (Protected)
export const getPlanById = async (req, res) => {
    //1.Find the plan by ID
    const plan = await TravelPlan.findById(req.params.id);

    //2.If plan is not found
    if (!plan) {
        res.status(404).json({ message: 'Səyahət planı tapılmadı.' });
        return;
    }

    //3.Check if the plan belongs to the current user (SECURITY RULE)
    //IDs are converted to string because one may be ObjectId and the other a string
    if (plan.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: 'Bu planı görməyə icazəniz yoxdur.' });
        return;
    }

    res.json(plan);
};

//@descUpdate a travel plan
//@routePUT /api/plans/:id
//@accessPrivate (Protected)
export const updatePlan = async (req, res) => {
    const { title, description, startDate, endDate, places, budget } = req.body;
    const plan = await TravelPlan.findById(req.params.id);

    //1.Check plan existence and user permission
    if (plan && plan.user.toString() === req.user._id.toString()) {
        
        //2.Update fields
        plan.title = title || plan.title;
        plan.description = description || plan.description;
        plan.startDate = startDate || plan.startDate;
        plan.endDate = endDate || plan.endDate;
        plan.places = places || plan.places;
        plan.budget = budget || plan.budget;

        const updatedPlan = await plan.save();
        res.json(updatedPlan);

    } else {
        res.status(404).json({ message: 'Plan tapılmadı və ya sizə aid deyil.' });
    }
};

//@descDelete a travel plan
//@routeDELETE /api/plans/:id
//@accessPrivate (Protected)
export const deletePlan = async (req, res) => {
    const plan = await TravelPlan.findById(req.params.id);

    //1.Check plan existence and user permission
    if (plan && plan.user.toString() === req.user._id.toString()) {
        
        await TravelPlan.deleteOne({ _id: plan._id });
        res.json({ message: 'Plan uğurla silindi.' });

    } else {
        res.status(404).json({ message: 'Plan tapılmadı və ya sizə aid deyil.' });
    }
};