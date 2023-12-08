const cors = require("cors");
const sqlite3 = require("sqlite3");
var bodyParser = require("body-parser");
const path = require("path");
// const multer = require("multer");

// const verifyToken = require("./middleware/auth");
// const bcrypt = require("bcrypt");
// const http = require("http");
// let formidable = require("formidable");
// let fs = require("fs");

// const multer = require("multer");
// app.use(multer().none());
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());
const db = new sqlite3.Database("spavanhoc.db");
// app.use(express.static('public'))

app.get("/api/annoucements", (req, res) => {
  db.all(`select * from Announcement`, (err, announcements) => {
    if (!err) {
      res.json(announcements);
    } else {
      res.status(500);
      res.send(err);
    }
  });
});

app.post("/api/register", (req, res) => {
  if (
    req.body != null &&
    req.body.user_name != "" &&
    req.body.password != "" &&
    req.body.role != ""
  ) {
    db.run(
      `insert into User(user_name, password,email,role) values(?, ?,?,?)`,
      [req.body.user_name, req.body.password, req.body.email, req.body.role],
      (err) => {
        if (!err) {
          res.json({
            register: true,
          });
        } else {
          console.log(err);
          res.send(err);
        }
      }
    );
  } else {
    res.json({
      register: false,
    });
  }
});

const secretKey = "mysecret";
app.post("/api/login", (req, res) => {
  db.get(
    `select * from User where user_name = ?`,
    req.body.user_name,
    (err, user) => {
      if (user) {
        if (user.password != req.body.password) {
          res.json("Wrong password, please re-enter");
        } else {
          const token = jwt.sign(
            {
              user_id: user.id,
              role: user.role,
              user_name: user.user_name,
            },
            secretKey,
            {
              expiresIn: "1h",
            }
          );
          if (user.role != 0) {
            res.json({
              login: true,
              token,
            });
          } else {
            res.json({
              login: true,
              admin: true,
              token,
            });
          }
        }
      } else {
        res.json("User name do not exists");
      }
    }
  );
});
app.get("/user/:id", (req, res) => {
  db.get(`select * from User where id = ?`, req.params.id, (err, user) => {
    if (user) {
      res.json({
        user: user,
      });
    } else {
      res.json("User name do not exists");
    }
  });
});

app.get("/api/all/users", (req, res) => {
  db.all(`select * from User`, (err, users) => {
    if (!err) {
      res.json(users);
    }
  });
});

app.get("/api/all/owned_course", (req, res) => {
  db.all(`select * from Owned_course`, (err, owned_course) => {
    if (!err) {
      res.json(owned_course);
    }
  });
});

app.post("/api/add/owned_course", (req, res) => {
  db.run(
    `insert into Owned_course(course_id, user_id_gv,user_id_hs) values(?,?,?)`,
    [req.body.ID_course, req.body.Id_teacher, req.body.ID_student],
    (err) => {
      if (!err) {
        res.json({
          add: true,
        });
      } else {
        console.log(err);
        res.send(err);
      }
    }
  );
});


app.get("/api/all/Checking_course", (req, res) => {
  db.all(`select * from Checking_course`, (err, checking_course) => {
    if (!err) {
      res.json(checking_course);
    }
  });
});

app.post("/api/update/status_checking", (req, res) => {
  db.run(
    `UPDATE Checking_course SET status = ? WHERE id = ?;`,
    [req.body.status, req.body.id],
    (err) => {
      if (!err) {
        res.json({
          update: true,
        });
      } else {
        console.log(err);
        res.send(err);
      }
    }
  );
});

app.get("/api/all/courses_from_server", (req, res) => {
  db.all(
    `select * from Course`,
    (err, courses) => {
      if (!err) {
        res.json(courses);
      }
    }
  );
});

app.get("/api/all/courses", (req, res) => {
  db.all(
    `select Course.id, Course.course, Course.infor, Course.cost from Course
    where Course.id not in (select Owned_course.course_id from Owned_course where Owned_course.user_id = ?)`,
    req.token.user_id,
    (err, courses) => {
      if (!err) {
        res.json(courses);
      }
    }
  );
});
app.post("/api/my/courses", (req, res) => {
  db.all(
    `select * from Course
    where Course.id in (select Owned_course.course_id from Owned_course where (Owned_course.user_id_gv =? OR Owned_course.user_id_hs  = ?))`,
    [req.body.user_id,req.body.user_id],
    (err, courses) => {
      if (!err) {
        res.json(courses);
      }
    }
  );
});
app.post("/api/allcourse/enroll", (req, res) => {
  db.run(
    `insert into Owned_course(course_id, user_id) values(?, ?)`,
    [req.body.course_id, req.body.user_id],
    (err) => {
      if (!err) {
        res.json("Enrolled");
      }
    }
  );
});
app.post("/api/unenroll", (req, res) => {
  db.run(
    `delete from Owned_course where course_id = ? and user_id = ?`,
    [req.body.course_id, req.body.user_id],
    (err) => {
      if (!err) {
        res.json("Unenrolled");
      }
    }
  );
});

app.get("/api/course/:courseid/quizes", (req, res) => {
  db.all(
    `select * from Quiz where course_id = ?`,
    req.params.courseid,
    (err, quizes) => {
      if (!err) {
        res.json(quizes);
      }
    }
  );
});
app.post("/api/course/:courseid/doquiz/:quizid", (req, res) => {
  db.all(
    `select * from Question where quiz_id = ?`,
    req.body.quiz_id,
    (err, questions) => {
      if (!err) {
        res.json(questions);
      }
    }
  );
});

app.listen(8000);
