import { Song,songRepository} from '../models/songs';
import {body, validationResult} from 'express-validator';
import { listRepository } from '../models/lists';
import { listController } from './list';


const songController = {

    todasLasCanciones: async (req, res) => {
        const data = await songRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.status(200).json(data);
        else
            res.status(404).json({
                mensaje: `No hay ninguna canción`
            });
    },

    cancionPorId: async (req, res) => {
        const data = await songRepository.findById(req.params.id);
        if(data != undefined) {
            res.status(200).json(data);
        }else{
            res.status(404).json({
                mensaje: `La canción que busca no existe`
            });
        }
    },

    nuevaCancion: async (req, res) => {
        try {
            let nueva = await songRepository.create(req.body.title, req.body.album, req.body.artist, req.body.year);
            res.status(201).json(nueva);    
        } catch (error) {
            res.status(400).json({Error: error.message});
        }
        
    },

    modificarCancion: async (req, res) => {
        try {
            if(req.body.id != null){
                res.status(409).json({
                    mensaje: `Está intentando modificar el id`
                });
            }else{
                let modific = await songRepository.updateById(req.params.id, {
                    title: req.body.title,
                    artist: req.body.artist, 
                    album: req.body.album,
                    year: req.body.year
                });
                if (modific == undefined)
                    res.status(404).json({
                        mensaje: `La canción que busca no existe`
                    });
                else
                    res.sendStatus(204);
                }
        } catch (error) {
            res.status(400).json({Error: error.message});
        }
        
    },

    eliminarCancion: async (req, res) => {
        const data = await songRepository.findById(req.params.id);
        if(data != undefined){
            //Comprobamos si en alguna lista está la canción y la eliminamos
            let listas = await listRepository.findAlls();
            if (listas.length > 0){
                for (let element = 0; element < listas.length; element++) {
                   for (let index = 0; index < listas[element].songs.length; index++) {
                        if ( listas[element].songs[index] == req.params.id) { 
                            listas[element].songs.pull(req.params.id);
                            await listas[element].save();
                        }
                    } 
                }
            }
            await songRepository.delete(req.params.id);
            res.sendStatus(204);
        }else{
            res.status(404).json({
                mensaje: `La canción que busca no existe`
            });
        } 
    }



}

export {songController}