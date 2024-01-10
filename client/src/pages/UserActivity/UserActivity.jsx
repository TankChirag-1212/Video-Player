import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './UserActivity.css';
import { locationDetails } from "../../actions/getLocation";

const UserActivity = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const locationData = useSelector((state) => state.getLocationReducer)

    const formateDate = (date) => {
        let formattedDate = new  Date(date).toLocaleString( 'en-US', {
            day:"numeric",
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        return formattedDate
    }
    
    useEffect(() => {
        dispatch(locationDetails(id));
    }, []);

    return (
        <div>
            <div className="main-container">
            <h1>User Activity</h1>
            {locationData.data !== null ?
            (
                <table className="table table-striped"> 
                    <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Country Name</th>
                        <th>Logged In</th>
                        <th>Logged Out</th>
                        <th>IP address</th>
                    </tr>
                    </thead>
                    <tbody>
                        { locationData.data.map((location, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{location.countryName}</td>
                                <td>{formateDate(location.loggedIn)}</td>
                                <td>{formateDate(location.loggedOut)}</td>
                                <td>{location.IP}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
                )
            }
            </div>
        </div>
    );
};

export default UserActivity;
