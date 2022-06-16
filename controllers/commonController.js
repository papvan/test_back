import {response} from "express";
import cars from "../storage/data.js";
import {body, validationResult} from "express-validator";
import features from "../storage/features.js";

export const calculateAction = (req, res) => {
    const BOOST_DISTANCE = 30; // if car has booster, distance for boosting
    const BOOST_SPEED = 10; // boosting kmh in %
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    let {model, distance} = req.body;
    let car = cars.find(item => item.model === model);
    if (!car) {
        res.status(404).json({error: 'Model Not Found!'});
        return;
    }

    let time = 0;
    if (car.booster) {
        let boostedSpeed = car.kmh + (car.kmh * BOOST_SPEED / 100);

        if (distance > BOOST_DISTANCE) {
            distance -= BOOST_DISTANCE;
            time += calculating(BOOST_DISTANCE, boostedSpeed);
        } else {
            time += calculating(distance, boostedSpeed);
            distance = 0;
        }
    }
    time += calculating(distance, car.kmh);

    time = time.toFixed(2);
    res.status(200).json({ time: time });
};

const calculating = (distance, kmh) => {
    return (distance / kmh);
};

export const validate = () => {
    return [
        body('model', 'Model doesn\'t exists').exists(),
        body('distance', 'Distance doesn\'t exists or less then 0').exists().isInt({min:0}),
    ]
}