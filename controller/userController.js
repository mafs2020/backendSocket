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
        if(skip) skip -= 1;
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

    buscador: async (req = request, res = response) => {
        let { termino = '' } = req.body;
        let { skip = 0 } = req.query;
        termino = new RegExp(termino,'i');
        console.log('termino :>> ', termino);
        console.log('skip :>> ', skip);
        const limite = 5;
        skip = Number(skip);
        if(skip) skip -= 1;
        const offset = skip * limite;
        try {
            const total = UserModel.countDocuments({ name: termino });
            const users = UserModel.find({ name: termino }, null, { skip: offset, limit: 5});
            console.log('enviado==============');
            console.log('termino :>> ', termino);
            console.log('skip :>> ', skip);
            console.log('skip2 :>> ', skip || 1);
            const response = await Promise.all([total, users]);
            return res.json({
                total: response[0],
                users: response[1],
                pageIndex: skip || 1,
                pageSize: limite});
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
            return res.status(400).json({ok:false, msj: ' el id esta equivocdo'});
        } catch (error) {
            errorCustom(res, error);
        }
    },



    actualizar: async (req = request, res = response) => {
        const { id } = req.params;
        const {
            role,
            language,
            email,
            name,
            lastname,
            country,
            countryCode,
            countryCodeName,
            phone
        } = req.body;
        const currency = req.body.currency.code;
        if( !role, !language, !email, !name, !lastname, !currency, !country, !countryCode, !countryCodeName, !phone){
            return errorCustom(res, '');
        }
        
        if(Types.ObjectId.isValid(id)){
            try {
                const userUpdate = await UserModel.findByIdAndUpdate(id, {role,
                    language,
                    email,
                    name,
                    lastname,
                    country,
                    countryCode,
                    countryCodeName,
                    phone});
                    return res.json({user: userUpdate});
            } catch (error) {
                return errorCustom(res, '');
            }
        }
        
    },


    eliminar: async (req = request, res = response) => {
        const { id } = req.params;
        if(Types.ObjectId.isValid(id)){
            try {
                const user = await UserModel.findByIdAndDelete(id);
                return res.json(user);
                
            } catch (error) {
                return errorCustom(res, '');
            }
        }
    }
}

module.exports = UserController;