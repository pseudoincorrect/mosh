const express = require('express');
const Joi = require ('joi');
const mongoose = require('mongoose');
const {Customer, validate} = require('../models/customers');

const router = express.Router();

router.get('/', getCustomers);
router.get('/:id', getCustomerById);
router.post('/', saveCustomer);
router.put('/:id', updateCustomer); 
router.delete('/:id', deleteCustomer);

async function getCustomers(req, res){
    const customers = await Customer
        .find()
        .sort({name: "ascending"})
    res.send(customers);
}

async function getCustomerById(req, res) {
    const customer = await Customer
    .findById(req.params.id)
    if (!customer) return res.status(404).send(`the customer with the id ${req.params.id} was not found`);
    res.send(customer);
}

async function saveCustomer (req, res) {
    const {error} = validate(req.body);
    if(error) return res.send(400, error.details[0].message);
    let customer = new Customer ({
        isGold : req.body.isGold,
        phone : req.body.phone,
        name : req.body.name
    });
    customer = await customer.save();
    res.send(customer);
}

async function updateCustomer (req, res) {
    const {error} = validate(req.body);
    if(error) return res.send(400, error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(
        req.params.id, 
        {
            isGold : req.body.isGold,
            phone : req.body.phone,
            name : req.body.name
        },
        {new: true}
    );
    if (!customer) return res.status(404).send(`the customer with the id ${req.params.id} was not found`);
    res.send(customer);
}

async function deleteCustomer (req, res) {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send(`the customer with the id ${req.params.id} was not found`);
    res.send(customer);
}

module.exports = router;