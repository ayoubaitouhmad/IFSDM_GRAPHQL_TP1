import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from '@apollo/server/standalone';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import {typeDefs} from "./schema.js";
import {resolvers} from "./resolvers.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);
console.log('connected to database');

const server = new ApolloServer({typeDefs , resolvers});

const url = await startStandaloneServer(server,{
    lisen : {port:4000}
})

console.log('connected to server', url);
