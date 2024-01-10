import users from "../models/auth.js";
import mongoose from "mongoose";

export const saveLocationData = async (req, res) => {
    const { email: email } = req.params;
    const { countryName, IP, loggedIn, lat, lon } = req.body;
    try {
        const filter = { email: email };
        const updateLocation = await users.findOneAndUpdate(
        filter,
        { $push: { geolocation: { countryName, IP, loggedIn, lat, lon } } },
        { new: true }
        );

        res.status(200).json(updateLocation);
    } catch (error) {
        console.error("There was a problem while saving the location", error);
        res.status(409).json("Couldn't save the location");
    }
};

export const logOutDate = async (req, res) => {
    const { id: _id } = req.params;
    const { loggedOut } = req.body;
    try {
        const updateLoggedOut = await users.findOneAndUpdate(
        { _id } ,
        { $set: { "geolocation.$[element].loggedOut": loggedOut } },
        { arrayFilters: [{ "element.loggedOut": { $exists: false } }], new: true }
        );
        res.status(200).json(updateLoggedOut);
    } catch (error) {
        console.error("There was an error while updating logged out", error);
        res.status(409).json("Couldn't update")
    }
};

export const getLocDetails = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const user = await users.findById(_id)

        const locationDetails = user.geolocation.slice(-6, -1);
        res.status(200).json(locationDetails);

    } catch (error) {
        console.error("There was error while fetching the data", error)
        res.status(404).json("Couldn't Fetch the Data")
    }
}

export const getLatAndLong = async (req, res) => {
    const { id: _id } = req.params;
    try{
        const user = await users.findById(_id)

        const locationDetails = user.geolocation.slice(-1);
        const data = {lat:locationDetails[0].lat, lon:locationDetails[0].lon}
        res.status(200).json({data});
    } catch (error) {
        console.error("There was error while fetching the data", error)
        res.status(404).json("Couldn't Fetch the Data")
    }
}