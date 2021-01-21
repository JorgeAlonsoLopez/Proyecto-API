import { Song,songRepository} from '../models/songs';
import {body, validationResult} from 'express-validator';


const songController = {

    todasLasCanciones: async (req, res) => {
        const data = await songRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.status(200).json(data);
        else
            res.sendStatus(404);
    },

    cancionPorId: async (req, res) => {
        const data = await songRepository.findById(req.params.id);
        if(data != undefined) {
            res.status(200).json(data);
        }else{
            res.sendStatus(404);
        }
    },

    nuevaCancion: async (req, res) => {
        if(req.body.title != null && req.body.title != undefined && req.body.title != ""){
            let nueva = await songRepository.create(req.body.title, req.body.album, req.body.artist, req.body.year);
            res.status(201).json(nueva);
        }else{
            res.sendStatus(404);
        }
        
    },

    modificarCancion: async (req, res) => {
        if(req.body.id != null){
            res.sendStatus(409);
        }else{
            let modific = await songRepository.updateById(req.params.id, {
                title: req.body.title,
                artist: req.body.artist, 
                album: req.body.album,
                year: req.body.year
            });
            if (modific == undefined)
                res.sendStatus(404);
            else
                res.sendStatus(204);
            }
        
        
    },

    eliminarCancion: async (req, res) => {
        const data = await songRepository.findById(req.params.id);
        if(data != undefined){
            await songRepository.delete(req.params.id);
            res.sendStatus(204);
        }else{
            res.sendStatus(404);
        }   
        
    }



}

export {songController}