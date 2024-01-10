import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    geolocation:[{
        countryName: String,
        IP: String,
        loggedIn:Date,
        loggedOut:Date,
        lat:String,
        lon:String
    }],
    
})

export default mongoose.model('User', userSchema);