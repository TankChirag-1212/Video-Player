import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

import userRoutes from "./routes/user.js";
import locationRoutes from "./routes/location.js";

const app = express();
dotenv.config();

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.get('/', (req, res) => {
    const ip = req.ip
    res.send(`your IP address is ${ip}`)
    // res.send("this is VideoPlayer API***")
});

app.use('/user', userRoutes)
app.use('/locate', locationRoutes)

const port = process.env.PORT || 5000

const uri = process.env.CONNECTION_URL

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(port, () => console.log(`server running on port ${port}`)))
    .catch((err) => console.log(err.message))

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);