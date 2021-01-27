import mongoose from 'mongoose';
import Song from './songs';
import validator from 'validator';

const { Schema } = mongoose;

const listSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es necesario'],
    minlength: [1, 'La cantidad mínima de caracteres es 1']
    },
  description: String,
  privat : {
    type: Boolean,
    required: [true, 'La privacidad es necesaria']
  },
  user: {
    type: mongoose.ObjectId,
    ref: 'User'
  },
  songs: [{
    type: mongoose.ObjectId,
    ref: 'Song'
  }]
});

const List = mongoose.model('List', listSchema);

const listRepository = {

  async findAll() {
    const result = await List.find({ privat: false }).populate('songs', ['title','artist']).populate('user', 'usuario').exec();
    return result;
  },

  async findAllByUser(id_user) {
    const result = await List.find({}).where('user').equals(id_user).populate('songs', ['title','artist']).populate('user', 'usuario').exec();
    return result;
  },

  async findById(id) {
    const result = await List.findById(id).populate('songs').populate('user', 'usuario').exec();
    return result != null ? result : undefined;
  },

  async create(name, description, user, privat) {
    const theList = new List({
      name: name,
      description: description, 
      user: user,
      privat: privat,
      songs: []
    });
    const result = await theList.save();
    return result;
  },

  async updateById(id, name, description, privat) {

    const saved = await List.findById(id);
    if (saved != null) {
      var modifiedList = Object.create(saved)
      modifiedList.name = name;
      modifiedList.description = description;
      modifiedList.privat = privat;
      return await Object.assign(saved, modifiedList).save();
    } else
      return undefined;
  },

  async delete(id) {
    await List.findByIdAndRemove(id).exec();
  },

  async findSongsById(id){
    const result = await List.findById(id).populate('songs').exec();
    if(result != null){
      return result.songs;
    }else{
      return undefined;
    }
  }


}






export {
  List,
  listRepository
}