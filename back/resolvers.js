import {User} from './models/User.js';

export const resolvers = {
    Query :{
        users:async()=> await User.find()
    },

    Mutation:{
        AddUser:async(_ , {name ,email} )=>{
            const user = new User ({name ,email});
            return await user.save();
        },

        deleteUser:async(_ , {id } )=>{
            await User.findByIdAndDelete(id)
            return true
        },
    }

};