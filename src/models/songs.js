import mongoose from 'mongoose';
const { Schema } = mongoose;

const songSchema = new Schema({
  title: {
    type: String,
    required: [true, 'El nombre es necesario'],
    minlength: [1, 'La cantidad mínima de caracteres es 1']
    },
  artist: {
    type: String,
    required: [true, 'El nombre es necesario'],
    minlength: [1, 'La cantidad mínima de caracteres es 1']
    },
  album: String,
  year: {
    type: Number,
    required: [true, 'El nombre es necesario'],
    min: [1930, 'El año mínimo no puede ser inferior a 1930'],
    max: [new Date().getFullYear(), 'No spuede superar el año actual']
    }
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