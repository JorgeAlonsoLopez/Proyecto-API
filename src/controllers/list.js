import { List,listRepository} from '../models/lists';
import {body, validationResult} from 'express-validator';
import { Song,songRepository} from '../models/songs';
import { songController } from './song';
import jwt from 'jsonwebtoken';

const listController = {


    todasLasListas: async (req, res) => {
        const data = await listRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.status(200).json(data);
        else
            res.sendStatus(404);
    },

    todasLasListasPorUsuario: async (req, res) => {
        let id = jwt.decode(req.headers.authorization.split(' ')[1]).sub;
        const data = await listRepository.findAllByUser(id);
        if (data != undefined) 
            res.status(200).json(data);
        else
            res.sendStatus(404);
    },

    listaPorId: async (req, res) => {
        const data = await listRepository.findById(req.params.id);
        if(data != undefined) {
            res.status(200).json(data);
        }else{
            res.sendStatus(404);
        }
    },

    nuevaLista: async (req, res) => {
        let id = jwt.decode(req.headers.authorization.split(' ')[1]).sub;
        if(req.body.name != null && req.body.name != undefined && req.body.name != ""){
            let nueva = await listRepository.create(req.body.name, req.body.description, id);
            res.status(201).json(nueva);
        }else{
            res.sendStatus(404);
        }
        
    },

    modificarLista: async (req, res) => {
        const data = await listRepository.findById(req.params.id);
        let id = jwt.decode(req.headers.authorization.split(' ')[1]).sub;
        if(data != undefined){
            if(data.user_id == id){
                if(req.body.id != null){
                    res.sendStatus(400);
                }else{
                    let modific = await listRepository.updateById(req.params.id, req.body.name, req.body.description);
                    if (modific == undefined)
                        res.sendStatus(404);
                    else
                        res.sendStatus(204);
                    }
            }else{
                res.sendStatus(404);
            }
        }else{
            res.sendStatus(404);
        }
        
    },

    eliminarLista: async (req, res) => { 
        const data = await listRepository.findById(req.params.id);
        if(data != undefined){
            let id = jwt.decode(req.headers.authorization.split(' ')[1]).sub;
            if(data.user_id == id){
                await listRepository.delete(req.params.id);
                res.sendStatus(204);
            }else{
                res.sendStatus(404);
            }
        }else{
            res.sendStatus(404);
        }   
        
    },

    anyadirCancion: async (req, res) => {

        let lista = await listRepository.findById(req.params.id1);
        let song = await songRepository.findById(req.params.id2);
        if (song != undefined && lista != undefined) {
            let id = jwt.decode(req.headers.authorization.split(' ')[1]).sub;
            if(lista.user_id == id){
                if(lista.songs.indexOf(req.params.id2) == -1){
                    lista.songs.push(song.id);
                    await lista.save();
                    let data = await listRepository.findById(lista.id1);
                    res.json(data);
                }else{
                    res.sendStatus(404);
                }
            }else{
                res.sendStatus(404);
            }
        } else {
            res.sendStatus(404);
        }

        
    },

    eliminarCancion: async (req, res) => {

        let lista = await listRepository.findById(req.params.id1);
        if (lista != undefined) {
            let id = jwt.decode(req.headers.authorization.split(' ')[1]).sub;
            if(lista.user_id == id){
                lista.songs.pull(req.params.id2);
                await lista.save();
                let data = await listRepository.findById(lista.id1);
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
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
            if(list.songs.indexOf(req.params.id2) !== -1){
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