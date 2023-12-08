import React, { Fragment,useEffect,useContext, useState } from "react";
import HeaderAdmin from "../../components/Header/HeaderAdmin";
import User from "./User/User";
import Checking from "./Checking/Checking";
import OwnedCourse from "./Owned_course/OwnedCourse";
import Courses from "./Course/Courses";
import { AppContext } from "../../context/AppContext";
function Admin() {

    const { user } = useContext(AppContext);
    const [users,setUsers] = useState([])
    const [checkingData,setCheckingData] = useState([])
    const [ownedCourse,SetOwnedCourse] = useState([])
    const [courses,setCourses] = useState([])

    

    useEffect(() => {
      fetch("http://localhost:8000/api/all/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then((response) => response.json())
          .then((data) => {
            setUsers(data)
          })
          .catch(console.error());

    }, []);

    useEffect(() => {
      fetch("http://localhost:8000/api/all/Checking_course", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then((response) => response.json())
          .then((data) => {
            setCheckingData(data)
          })
          .catch(console.error());

    }, []);

    useEffect(() => {
      fetch("http://localhost:8000/api/all/owned_course", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then((response) => response.json())
          .then((data) => {
            SetOwnedCourse(data)
          })
          .catch(console.error());

    }, []);

    useEffect(() => {
      fetch("http://localhost:8000/api/all/courses_from_server", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then((response) => response.json())
          .then((data) => {
            setCourses(data)
          })
          .catch(console.error());

    }, []);

  return (
    <Fragment>
      <HeaderAdmin/>
      <User users={users} />
      <Checking checking_data = {checkingData}/>
      <OwnedCourse owned_course={ownedCourse}/>
      <Courses coursesData={courses}/>
    </Fragment >
    
  );
}

export default Admin;
