import mongoose from 'mongoose';
const { Schema } = mongoose;

const songSchema = new Schema({
    title: String,
    artist: String,
    album: String,
    year: Number
});

const Song = mongoose.model('Song', songSchema);


const songRepository = {

    async findAll() {
        const result =  await Song.find({}).exec();
        return result;
      },
      async findById(id) {
        const result = await Song.findById(id).exec();
        return result != null ? result : undefined;
     },
     async create(newSong) {
      const theSong = new Song({
          name : newSong.name,
          description: newSong.description, //! vienen de las cabezeras, hay que ver como se hace
          user_id : undefined, //! viene del tocken
          songs: []
      });
      const result = await theSong.save();
      return result;
    },
    async updateById(id, modified) {
      const saved = await Song.findById(id);
    
      if (saved != null) {
          return await Object.assign(saved, modified).save();
          //! hay que montar la lista de lo que vienen de las cabezeras
      } else
          return undefined;
    }, async delete(id) {
      await Song.findByIdAndRemove(id).exec();
    }


}







export  {
    Song,
    songRepository
}