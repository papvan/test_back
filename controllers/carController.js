import {response} from "express";
import { body, validationResult } from 'express-validator';
import cars from '../storage/data.js'
import features from '../storage/features.js'

export const getList = (req, res) => {
    getNewId();
    res.status(200).json( {cars: cars} );
};

export const getOne = (req, res) => {
    let id = parseInt(req.params.id);

    if (!id) {
        res.status(404).json({
            error: 'Car Not Found!',
        });
    }

    let one = cars.find(item => item.id === id);
    res.status(200).json({ item: one });
};

export const createOne = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    const {model, kmh, features, booster} = req.body;
    let newId = getNewId();
    const car = {id: newId, model: model, kmh: kmh, features: features, booster: booster};

    cars.push(car)

    res.status(200).json({item: car});
};

export const updateOne = (req, res) => {
    let id = parseInt(req.params.id);

    if (!id) {
        res.status(404).json({
            error: 'Car Not Found!',
        });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    const {model, kmh, features, booster} = req.body;
    const car = {id: id, model: model, kmh: kmh, features: features, booster: booster};

    let index = cars.findIndex(item => item.id === id);

    cars[index] = car;
    res.status(200).json({ item: cars[index] });
};

export const removeOne = (req, res) => {
    let id = parseInt(req.params.id);

    if (!id) {
        res.status(404).json({
            error: 'Car Not Found!',
        });
    }

    let index = cars.findIndex(item => item.id === id);
    cars.splice(index,1);

    res.status(200).json({});
};

export const getFeatures = (req, res) => {
    res.status(200).json( {items: features} );
};

const getNewId = () => {
    let max = cars.reduce((acc, curr) => acc.id > curr.id ? acc : curr);

    return max.id + 1;

}

export const validate = (method) => {
    switch (method) {
        case 'saveOne': {
            return [
                body('model', 'Model doesn\'t exists').exists(),
                body('kmh', 'Kmh doesn\'t exists').exists().isInt(),
                body('features').optional().isArray(),
                body('booster').optional().isBoolean()
            ]
        }
    }
}