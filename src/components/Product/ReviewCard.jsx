import React from 'react'
import Rating from '@mui/material/Rating';
import Profile from "../../image/Profile.png"
const ReviewCard = ({ review }) => {
    //Product Rating 
    const options = {
        readOnly: true,
        value: review.rating,
        size: "large",
    };
    return (
        <div className="flex justify-center p-4 bg-white text-gray-800 hover:text-white hover:bg-white/40   rounded-lg shadow-lg w-full  gap-4 transition-transform transform hover:scale-105 hover:shadow-2xl animate-fadeIn">
            {/* Profile Image */}
            <img
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 transition-transform transform hover:scale-110"
                src={Profile}
                alt={review.name}
            />

            {/* Review Content */}
            <div className="flex flex-col w-full">
                {/* Reviewer's Name and Rating */}
                <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-semibold">{review.name}</p>
                    <div className="flex items-center">
                        <Rating {...options} />
                        <span className="text-sm ml-2">({review.rating}/5)</span>
                    </div>
                </div>

                {/* Review Comment */}
                <p className=" mb-2">{review.comment}</p>

                {/* Review Date (optional) */}
            </div>
        </div>

    )
}

export default ReviewCard
