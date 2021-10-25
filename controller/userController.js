const {request, response} = require('express');
const UserModel = require('../models/userModel');
const { Types } = require('mongoose');
const errorCustom = require('../utils/errores');
const UserController = {
    get: async (req = request, res = response) => {
        // throw new Error('jjjjjjjjjjjjjj');
        // return res.status(400).json({ok:false});
        const limite = 5;
        let { skip = 5 } = req.query;
        skip = Number(skip);
        if(skip == 0){

        } else {
            skip -= 1;
        }
        const offset = limite * skip;
        try {
            const users = await UserModel.find().limit(limite).skip(offset);
            const total = await UserModel.countDocuments();
            console.log('skip :>> ', skip);
            console.log('pageIndex :>> ', skip);
            console.log('total :>> ', total);
            skip += 1;
            return res.json({
                users,
                total,
                pageIndex: skip?? 1,
                pageSize: limite
            });
        } catch (error) {
            errorCustom(res, error);
        }
    },

    
    crear: async (req = request, res = response) => {
        console.log('req.body :>> ', req.body);
        const {
            role,
            language,
            email,
            name,
            lastname,
            country,
            countryCode,
            countryCodeName,
            phone,
        } = req.body;
        const currency = req.body.currency.code;
        if( !role, !language, !email, !name, !lastname, !currency, !country, !countryCode, !countryCodeName, !phone){
            return errorCustom(res, '');
        }
        try {
            // throw new Error('jjjjjjjjjjjjjj');
            const userCreate = new UserModel({
                role,
                language,
                email,
                name,
                lastname,
                currency,
                country,
                countryCode,
                countryCodeName,
                phone,
            });
    
            const d = await UserModel.create(userCreate);
            return res.json(d);
        } catch (error) {
            errorCustom(res, error);
        }
    },


    buscarUser: async (req = request, res = response) => {
        const { id } = req.params;
        
        try {
            if(Types.ObjectId.isValid(id)){
                const user = await UserModel.findById(id);
                return res.json(user);
            }
            return res.status(400).json({ok:false, msj: ' el id esta euivocdo'});
        } catch (error) {
            errorCustom(res, error);
        }
    },

    buscarUserMultiple: async (req = request, res = response) => {
        let { name } = req.body;
        let { skip = 0 } = req.query;
        skip = Number(skip);
        const ofsset = skip * 5;
        if(!name){
            errorCustom(res, '');
        }
        name = new RegExp(name, 'i');
        try {
            const users = await UserModel.find({where: { name }}).limit(5).skip(ofsset);
            const total = await UserModel.countDocuments({where: { name }});
            console.log('total :>> ', total);
            if(skip>0){
                skip -= 1;
            }
            return res.json({users, total, pageIndex: skip ?? 1});
        } catch (error) {
            errorCustom(res, error);
        }
    },


    actualizar: async (req = request, res = response) => {
        const { id } = req.params;
        
        if(Types.ObjectId.isValid(id)){

        }
        console.log('id :>> ', id);
        return res.json({ok:true});
    },


    eliminar: async (req = request, res = response) => {
        const { id } = req.params;
        if(Types.ObjectId.isValid(id)){
            const user = await UserModel.findByIdAndDelete(id);
            return res.json(user);
        }
    }
}

module.exports = UserController;