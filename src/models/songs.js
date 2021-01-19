import mongoose from 'mongoose';
const { Schema } = mongoose;

const songSchema = new Schema({
  id: mongoose.ObjectId,
  title: String,
  artist: String,
  album: String,
  year: Number
});

const Song = mongoose.model('Song', songSchema);


const songRepository = {

  async findAll() {
    const result = await Song.find({}).exec();
    return result;
  },

  async findById(id) {
    const result = await Song.findById(id).exec();
    return result != null ? result : undefined;
  },

  async create(title, album, artist, year) {
    const theSong = new Song({
      title:title,
      artist: artist, 
      album: album,
      year: year
    });
    const result = await theSong.save();
    return result;
  },

  async updateById(id, modified) {
    const saved = await Song.findById(id);
    if (saved != null) {
      return await Object.assign(saved, modified).save();
    } else
      return undefined;
  }, 
  
  async delete(id) {
    await Song.findByIdAndRemove(id).exec();
  }


}







export {
  Song,
  songRepository
}