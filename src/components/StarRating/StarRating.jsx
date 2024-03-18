
import React from 'react';
import style from './StarRating.module.scss'

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating); // Number of filled stars
  const hasHalfStar = rating % 1 !== 0; // Check if there's a half star

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= filledStars; i++) {
      const starClass = i <= filledStars ? 'fa-solid' : 'fa-regular';
      stars.push(
        <i key={i} className={`fa-star ${starClass} rating-color`}></i>
      );
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className='fa-solid fa-star-half-stroke rating-color'></i>);
    }
    stars.push(
      <span key="rating" className={`ms-2 ${style.fs9} text-muted`}>{rating }</span>
    )
    return stars;
  };


  return <div className="star-rating mb-3">{renderStars()}</div>;
};

export default StarRating;
