var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
chai.should();

chai.use(chaiHttp);

describe("USERS API", () => {
  // ======LIST ALL USERS======
  describe("GET /users", () => {
    it("It should return all the users", (done) => {
      chai
        .request(server)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  //   ===========GET ONE USER=========
  describe("GET users/:id.", () => {
    it("It should get a user by ID.", (done) => {
      let userId = "5f2a7eee66eb6d3dc2bbe10e";
      chai
        .request(server)
        .get("/users/" + userId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("email");
          res.body.should.have.property("_id").eq(userId);
          done();
        });
    });

    it("It should not get a user by ID.", (done) => {
      let userId = "5f2a7eee66eb6d3dc2bbe100";
      chai
        .request(server)
        .get("/users/" + userId)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq("User does not exist.");
          done();
        });
    });
  });

  describe("POST /users", () => {
    it("It should create new user", (done) => {
      const user = {
        name: "Johny Sins",
        email: "johny@mailinator.com",
        password: "PassTheWord",
      };
      chai
        .request(server)
        .post("/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("_id");
          res.body.should.have.property("email");
          res.body.should.be.a("object");
          res.body.should.have.property("email").eq("johny@mailinator.com");
          done();
        });
    });

    it("It should not create new user", (done) => {
      const user = {
        name: "Johny Sins",
        password: "PassTheWord",
      };
      chai
        .request(server)
        .post("/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(500);
          res.text.should.be.eq("Required field missing.");
          done();
        });
    });
  });

  describe("PUT /users/:id", () => {
    it("It should update a user", (done) => {
      const userId = "5f4a3ed67dc8c0207c518a5b";
      const user = {
        name: "Lionel Messi",
      };
      chai
        .request(server)
        .put("/users/" + userId)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("_id");
          res.body.should.have.property("email");
          res.body.should.be.a("object");
          res.body.should.have.property("_id").eq(userId);
          done();
        });
    });
  });

  describe("DELETE /users/:id", () => {
    it("It should delete a user", (done) => {
      const userId = "5f4a3ed67dc8c0207c518a5b";
      chai
        .request(server)
        .delete("/users/" + userId)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("It should NOT delete a user", (done) => {
      const userId = "5f4a3ed67dc8c0207c518a6b";
      chai
        .request(server)
        .delete("/users/" + userId)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq("User does not exist.");
          done();
        });
    });
  });

  //   =========End of Tests=========
});
