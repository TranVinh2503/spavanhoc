import { createContext } from "react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [id, setID] = useState();

  const [courses, SetCourses] = useState([]);
  const [myCourses, SetMyCourses] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8000/api/all/courses_from_server", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       SetCourses(data);
  //     })
  //     .catch(console.error());
  // }, []);

  function getUserFromToken(token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      if (error.name === "InvalidTokenError") {
        console.log("Invalid token specified");
      } else {
        console.log("Error decoding token:", error.message);
      }
    }
  }

  useEffect(() => {
    const fetchAPI = async () => {
      const IdFromToken = localStorage.getItem("access-token");
      const result = getUserFromToken(IdFromToken);
      setID(result?.user_id);
      setUser(result);
    };
    fetchAPI();
  }, [id]);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      fetch("http://localhost:8000/api/my/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      .then((response) => response.json())
      .then((data) => {
        SetMyCourses(data);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, [user]);
  

  return (
    <AppContext.Provider value={{ user, courses, myCourses }}>
      {children}
    </AppContext.Provider>
  );
};
