import bcrypt from 'bcryptjs';

import * as users from './users';
import * as lists from './lists';
import * as songs from './songs';

async function comprobarDatos(){
    
    const result1 = await lists.List.countDocuments({}).exec();
    const result2 = await users.User.countDocuments({}).exec();
    const result3 = await songs.Song.countDocuments({}).exec();
    if (result1 == 0 && result2 == 0 && result3 == 0){
        
        const theUser1 = new users.User({
            nombre: "Luis Miguel López",
            usuario: "luismiLop",
            email: "luismi@salesianos.com",
            password: bcrypt.hashSync("1234", parseInt(process.env.BCRYPT_ROUNDS))
        });
        const user1 = await theUser1.save();
        const theUser2 = new users.User({
            nombre: "Miguel Campo",
            usuario: "miguelCapm",
            email: "miguel.campos@salesianos.com",
            password: bcrypt.hashSync("1234", parseInt(process.env.BCRYPT_ROUNDS))
        });
        const user2 = await theUser2.save();
        const theSong1 = new songs.Song({
            title:"Here's to Us",
            artist: "Halestorm", 
            album: "The Strange Cause of ...",
            year: 2012
        });
        const song1 = await theSong1.save();
        const theSong2 = new songs.Song({
            title:"Light Blue",
            artist: "Vitja", 
            album: "Thirst",
            year: 2019
        });
        const song2 = await theSong2.save();
        const theSong3 = new songs.Song({
            title:"Neverending",
            artist: "Frozen Crown", 
            album: "Crowned in Frost",
            year: 2019
        });
        const song3 = await theSong3.save();
        const theList1 = new lists.List({
            name: "Metal",
            description: "Canciones de power metal", 
            user: user1.id,
            privat: true,
            songs: [song3.id]
          });
          const list1 = await theList1.save();
          const theList2 = new lists.List({
            name: "Rock",
            description: "Canciones de rock", 
            user: user2.id,
            privat: false,
            songs: [song1.id, song2.id]
          });
          const list2 = await theList2.save();
        
        console.log("Datos cargados");
    }
    
}

export default {
    users,
    lists,
    songs,
    comprobarDatos
}