const router = require("express").Router();
const UserController = require("../controllers/user.controller");

router.get("/", (req, res, next) => {
  UserController.listUsers().then((d) => {
    const data = {
      title: "Node Basic",
      message: "Welcome to million dollar app ;)",
      users: d,
    };
    res.render("index", data);
  });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.post("/signup", (req, res) => {
  let payload = req.body;
  UserController.signupUser(payload)
    .then((d) => {
      res.json(d);
    })
    .catch((e) => {
      console.log("ERR:", e);
    });
});

router.get("/users", (req, res) => {
  UserController.listUsers()
    .then((d) => {
      res.json(d);
    })
    .catch((e) => {
      console.log("ERR:", e);
    });
});

router.get("/users/:id", (req, res) => {
  UserController.getById(req.params.id)
    .then((d) => {
      res.json(d);
    })
    .catch((e) => {
      console.log("ERR:", e);
    });
});

router.put("/users/:id", (req, res) => {
  const payload = req.body;
  UserController.updateUser(req.params.id, payload)
    .then((d) => {
      res.json(d);
    })
    .catch((e) => {
      console.log("ERR:", e);
    });
});

router.delete("/users/:id", (req, res) => {
  UserController.deleteUser(req.params.id)
    .then((d) => {
      res.json(d);
    })
    .catch((e) => {
      console.log("ERR:", e);
    });
});

module.exports = router;
