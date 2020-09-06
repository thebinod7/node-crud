const router = require("express").Router();
const UserController = require("../controllers/user.controller");

const Blob = require("cross-blob");

const axios = require("axios");
const fs = require("fs");
const https = require("https");
const stream = require("stream");

https.globalAgent.options.ca = fs.readFileSync("cert.pem");
const post_url =
  "https://ipfs.deltanetwork.io/api/v0/get?arg=/ipns/QmdMxCJgh1mqmuXGQFnyvA9PWJ4LqvzTiFgUgFKDWniL2m&output=118208590_3217940521619661_961251332283463431_o.jpg&archive=false&compress=false";

router.get("/download", (req, res, next) => {
  axios
    .post(post_url)
    .then((d) => {
      let TYPED_ARRAY = new Uint8Array(d.data);
      const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
      console.log("BASE===>", STRING_CHAR);
      let base64String = btoa(STRING_CHAR);
    })
    .catch((err) => {
      console.log("ERR:", err);
    });
});

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
      res.status(200).send(d);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.get("/users", (req, res) => {
  UserController.listUsers()
    .then((d) => {
      res.json(d);
    })
    .catch((e) => {
      res.status(500).send("Server error.");
    });
});

router.get("/users/:id", (req, res) => {
  UserController.getById(req.params.id)
    .then((d) => {
      if (!d) return res.status(404).send("User does not exist.");
      res.json(d);
    })
    .catch((e) => {
      res.status(500).send("Server error.");
    });
});

router.put("/users/:id", (req, res) => {
  const payload = req.body;
  UserController.updateUser(req.params.id, payload)
    .then((d) => {
      if (!d) return res.status(500).send("Could not update user.");
      res.status(200).send(d);
    })
    .catch((e) => {
      res.status(500).send("Server error.");
    });
});

router.delete("/users/:id", (req, res) => {
  UserController.deleteUser(req.params.id)
    .then((d) => {
      if (d.deletedCount < 1)
        return res.status(404).send("User does not exist.");
      res.status(200).send(d);
    })
    .catch((e) => {
      res.status(500).send("Server error.");
    });
});

module.exports = router;
