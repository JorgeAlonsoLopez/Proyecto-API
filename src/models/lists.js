import mongoose from 'mongoose';
const { Schema } = mongoose;
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
    const result =  await List.find({}).exec();
    return result;
  },
  async findById(id) {
    const result = await List.findById(id).exec();
    return result != null ? result : undefined;
 },
 async create(newList) {
  const theList = new List({
      name : newList.name,
      description: newList.description, //! vienen de las cabezeras, hay que ver como se hace
      user_id : undefined, //! viene del tocken
      songs: []
  });
  const result = await theList.save();
  return result;
},
async updateById(id, modifiedList) {
  const saved = await User.findById(id);

  if (saved != null) {
      return await Object.assign(saved, modifiedList).save();
      //! hay que montar la lista de lo que vienen de las cabezeras
  } else
      return undefined;
}, async delete(id) {
  await List.findByIdAndRemove(id).exec();
}


}






export  {
  List,
  listRepository
}