import React, { useState } from "react";
import courseImg1 from "../../assests/images/img1.png";
import courseImg2 from "../../assests/images/img2.png";
import courseImg3 from "../../assests/images/img3.png";

const CourseCard = (props) => {
  const { course, infor, cost } = props.item;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [labelButton,setLabelButton] = useState("Thanh Toán")

  const randomCourseImg = () => {
    const imgList = [courseImg1, courseImg2, courseImg3];
    const randomIndex = Math.floor(Math.random() * imgList.length);
    return imgList[randomIndex];
  };

  const handleButtonClick = () => {
    setIsButtonDisabled(true);
    setLabelButton("Chờ xử lí")
  };

  const imgUrl = randomCourseImg();

  return (
    <div className="single__course__item">
      <div className="course__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div>
      <div className="course__details">
        <h6 className="course__title mb-4">{course}</h6>

        <div className=" d-flex justify-content-between align-items-center">
          <p className="lesson d-flex align-items-center gap-1">
            <i class="ri-book-open-line"></i> {infor} bài
          </p>

          <p className="students d-flex align-items-center gap-1">
            <i class="ri-user-line"></i> 12.5K
          </p>
        </div>

        <div className=" d-flex justify-content-between align-items-center">
          <p className="rating d-flex align-items-center gap-1">
            <i class="ri-star-fill"></i> {cost}K
          </p>

          <p className="enroll d-flex align-items-center gap-1">
            <button
              className="btn"
              onClick={handleButtonClick}
              disabled={isButtonDisabled}
            >
              {" "}
              {labelButton}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
