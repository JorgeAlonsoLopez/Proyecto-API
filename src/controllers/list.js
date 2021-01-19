import { List,listRepository} from '../models/lists';
import {body, validationResult} from 'express-validator';
import { Song,songRepository} from '../models/songs';
import { songController } from './song';

const listController = {


    todasLasListas: async (req, res) => {
        const data = await listRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.status(200).json(data);
        else
            res.sendStatus(404);
    },

    todasLasListasPorUsuario: async (req, res) => {
        const data = await listRepository.findAllByUser(req.body.id_user); //! se cambia el id por el tocken
        if (data != undefined) 
            res.status(200).json(data);
        else
            res.sendStatus(404);
    },

    listaPorId: async (req, res) => {
        const data = await listRepository.findById(req.params.id);
        if (Array.isArray(data) && data.length > 0) 
            res.status(200).json(data);
        else
            res.sendStatus(404);
    },

    nuevaLista: async (req, res) => {
        if(req.body.name != null && req.body.name != undefined && req.body.name != ""){
            let nueva = await listRepository.create(req.body.name, req.body.description, req.body.id_user); //! se cambia el id por el tocken
            res.status(201).json(nueva);
        }else{
            res.sendStatus(404);
        }
        
    },

    modificarLista: async (req, res) => {
        if(req.body.id != null){
            res.sendStatus(400);
        }else{
            let modific = await listRepository.updateById(req.params.id, req.body.name, req.body.description);
            if (modific == undefined)
                res.sendStatus(404);
            else
                res.status(204).json(modific);
            }
        
        
    },

    eliminarLista: async (req, res) => {
        const data = await listRepository.findById(req.params.id);
        if(data != undefined){
            await listRepository.delete(req.params.id);
            res.sendStatus(204);
        }else{
            res.sendStatus(404);
        }   
        
    },

    anyadirCancion: async (req, res) => {

        let lista = await listRepository.findById(req.params.id);
        if (lista != undefined) {
            let song = await songRepository.findById(req.params.id2);
            if (song != undefined) {
                lista.songs.push(song.id);
                await lista.save();
                let data = await listRepository.findById(lista.id);
                res.json(data);
            } else {
                res.sendStatus(404);
            }
        } else {
            res.sendStatus(404);
        }
        
    },

    eliminarCancion: async (req, res) => {

        let lista = await listRepository.findById(req.params.id);
        if (lista != undefined) {
            lista.songs.pull(req.params.id2);
            await lista.save();
            let data = await listRepository.findById(lista.id);
            res.status(204).json(data);
        } else {
            res.sendStatus(404);
        }
        
    },

    listarTodasCanciones: async (req, res) => {
        const list = await listRepository.findById(req.params.id)
        if(list != undefined){
            const songs = await listRepository.findSongsById(req.params.id);
            res.status(200).json(songs);
        }else{
            res.sendStatus(404);
        } 
        
    },

    obtenerCancion: async (req, res) => {
        const list = await listRepository.findById(req.params.id1)
        if(list != undefined){
            if(list.songs.index(req.params.id2) !== -1){
                const dataSong = await songRepository.findById(req.params.id2);
                res.status(200).json(dataSong);
            }else{
                res.sendStatus(404);
            }
        }else{
            res.sendStatus(404);
        }        
    }


}

export {listController}