import Institute from "../models/instituteModel"
import jwt from "jsonwebtoken"

async function login(req, res, next){
    // const {id, password}
}

async function logut(req, res, next){
    
}

async function register(req, res, next){
    const institute = await Institute.create(req.body)
    res.status(201).send(institute)
}
