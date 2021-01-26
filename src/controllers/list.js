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
            res.status(404).json({
                mensaje: `No hay ninguna lista pública`
            });
            
    },

    todasLasListasPorUsuario: async (req, res) => {
        let id = jwt.decode(req.headers.authorization.split(' ')[1]).sub;
        const data = await listRepository.findAllByUser(id);
        if (Array.isArray(data) && data.length > 0) 
            res.status(200).json(data);
        else
        res.status(404).json({
            mensaje: `No hay ninguna lista creada por este usuario`
        });
    },

    listaPorId: async (req, res) => {
        const data = await listRepository.findById(req.params.id);
        if(data != undefined) {
            res.status(200).json(data);
        }else{
            res.status(404).json({
                mensaje: `La lista que busca no existe`
            });
        }
    },

    nuevaLista: async (req, res) => {
        try{
            let id = jwt.decode(req.headers.authorization.split(' ')[1]).sub;
            let nueva = await listRepository.create(req.body.name, req.body.description, id, req.body.privat);
            res.status(201).json(nueva);
        } catch (error) {
            res.status(400).json({Error: error.message});
        }
        
    },

    modificarLista: async (req, res) => {
        try{
            const lista = await listRepository.findById(req.params.id);
            if(lista != undefined){
                let id = jwt.decode(req.headers.authorization.split(' ')[1]).sub;
                if(lista.user.id == id){
                    if(req.body.id != null){
                        res.sendStatus(400);
                    }else{
                        let modific = await listRepository.updateById(req.params.id, req.body.name, req.body.description, req.body.privat);
                        if (modific == undefined)
                            res.status(404).json({
                                mensaje: `La lista que busca no existe`
                            });
                        else
                            res.sendStatus(204);
                        }
                }else{
                    res.status(401).json({
                        mensaje: `No está autorizado para hacer cambios`
                    });
                }
            }else{
                res.status(404).json({
                    mensaje: `La lista que busca no existe`
                });
            }
        } catch (error) {
            res.status(400).json({Error: error.message});
        }
        
    },

    eliminarLista: async (req, res) => { 
        const data = await listRepository.findById(req.params.id);
        if(data != undefined){
            let id = jwt.decode(req.headers.authorization.split(' ')[1]).sub;
            if(data.user.id == id){
                await listRepository.delete(req.params.id);
                res.sendStatus(204);
            }else{
                res.status(401).json({
                    mensaje: `No está autorizado para hacer cambios`
                });
            }
        }else{
            res.status(404).json({
                mensaje: `La lista que busca eliminar no existe`
            });
        }   
        
    },

    anyadirCancion: async (req, res) => {

        let lista = await listRepository.findById(req.params.id1);
        let song = await songRepository.findById(req.params.id2);
        if (song != undefined && lista != undefined) {
            let id = jwt.decode(req.headers.authorization.split(' ')[1]).sub;
            if(lista.user.id == id){
                if(lista.songs.indexOf(req.params.id2) == -1){
                    lista.songs.push(song.id);
                    await lista.save();
                    let data = await listRepository.findById(lista.id1);
                    res.json(data);
                }else{
                    res.status(404).json({
                        mensaje: `La lista que busca no existe`
                    });
                }
            }else{
                res.status(401).json({
                    mensaje: `No está autorizado para hacer cambios`
                });
            }
        } else {
            res.status(404).json({
                mensaje: `La lista o canción que busca no existen`
            });
        }

        
    },

    eliminarCancion: async (req, res) => {

        let lista = await listRepository.findById(req.params.id1);
        if (lista != undefined) {
            let id = jwt.decode(req.headers.authorization.split(' ')[1]).sub;
            if(lista.user.id == id){
                lista.songs.pull(req.params.id2);
                await lista.save();
                let data = await listRepository.findById(lista.id1);
                res.sendStatus(204);
            } else {
                res.status(401).json({
                    mensaje: `No está autorizado para hacer cambios`
                });
            }
        } else {
            res.status(404).json({
                mensaje: `La lista que busca no existe`
            });
        }
        
    },

    listarTodasCanciones: async (req, res) => {
        const list = await listRepository.findById(req.params.id)
        if(list != undefined){
            const songs = await listRepository.findSongsById(req.params.id);
            res.status(200).json(songs);
        }else{
            res.status(404).json({
                mensaje: `La lista que busca no existe`
            });
        } 
        
    },

    obtenerCancion: async (req, res) => {
        const list = await listRepository.findById(req.params.id1)
        if(list != undefined){
            let elemt = list.songs.find(obj => {
                return obj.id === req.params.id2
              });
            if(elemt !== undefined){
                const dataSong = await songRepository.findById(req.params.id2);
                res.status(200).json(dataSong);
            }else{
                res.status(404).json({
                    mensaje: `La canción que busca no se encuentra en esta lista`
                });
            }
        }else{
            res.status(404).json({
                mensaje: `La lista que busca no existe`
            });
        }        
    }


}

export {listController}