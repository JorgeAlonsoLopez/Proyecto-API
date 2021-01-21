import mongoose from 'mongoose';
import Song from './songs';

const { Schema } = mongoose;

const listSchema = new Schema({
  name: String,
  description: String,
  user_id: mongoose.ObjectId,
  songs: [{
    type: mongoose.ObjectId,
    ref: 'Song'
  }]
});

const List = mongoose.model('List', listSchema);

const listRepository = {

  async findAll() {
    const result = await List.find({}).exec();
    return result;
  },

  async findAllByUser(id_user) {
    const result = await List.find({}).where('user_id').equals(id_user).exec();
    return result;
  },

  async findById(id) {
    const result = await List.findById(id).exec();
    return result != null ? result : undefined;
  },

  async create(name, description, user_id) {
    const theList = new List({
      name: name,
      description: description, 
      user_id: user_id,
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