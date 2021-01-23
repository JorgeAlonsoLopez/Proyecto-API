import mongoose from 'mongoose';
import Song from './songs';

const { Schema } = mongoose;

const listSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es necesario'],
    minlength: [1, 'La cantidad mínima de caracteres es 1']
    },
  description: String,
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
    const result = await List.find({}).populate('songs', 'title').populate('user', 'usuario').exec();
    return result;
  },

  async findAllByUser(id_user) {
    const result = await List.find({}).where('user').equals(id_user).populate('songs', 'title').populate('user', 'usuario').exec();
    return result;
  },

  async findById(id) {
    const result = await List.findById(id).populate('songs', 'title').exec();
    return result != null ? result : undefined;
  },

  async create(name, description, user) {
    const theList = new List({
      name: name,
      description: description, 
      user: user,
      songs: []
    });
    const result = await theList.save();
    return result;
  },

  async updateById(id, name, description) {

    const saved = await List.findById(id);
    if (saved != null) {
      var modifiedList = Object.create(saved)
      modifiedList.name = name;
      modifiedList.description = description;
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