const Sessions = require("../models/sessions.model.js");

// Create and Save a new sessions
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Body can not be empty"
    });
  }

  // Create a sessions
  const sessions = new Sessions({
    loginTime: req.body.loginTime || null,
    logoutTime: req.body.logoutTime || null,
    ip: req.body.ip || null,
    location: req.body.location || null,
    accessRoute: req.body.accessRoute || null,
    cookies: req.body.cookies || null,
    hostname: req.body.hostname || null,
    userTags: req.body.userTags || null
  });

  // Save session in the database
  sessions
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the session."
      });
    });
};

// Retrieve and return all sessions from the database.
exports.findAll = (req, res) => {
  Sessions.find()
    .then(sessions => {
      res.send(sessions);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving sessions."
      });
    });
};

// Find a single session with a sessionId
exports.findOne = (req, res) => {
  Sessions.findById(req.params.sessionId)
    .then(sessions => {
      if (!sessions) {
        return res.status(404).send({
          message: "Session not found with id " + req.params.sessionId
        });
      }
      res.send(sessions);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "ObjectId not found with id " + req.params.sessionId
        });
      }
      return res.status(500).send({
        message: "Error retrieving sessions with id " + req.params.sessionId
      });
    });
};

// Update a session identified by the sessionId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Body can not be empty"
    });
  }

  // Find session and update it with the request body
  Sessions.findOneAndUpdate(
    req.params.sessionId,
    {
      loginTime: req.body.loginTime || null,
      logoutTime: req.body.logoutTime || null,
      ip: req.body.ip || null,
      location: req.body.location || null,
      accessRoute: req.body.accessRoute || null,
      cookies: req.body.cookies || null,
      hostname: req.body.hostname || null,
      userTags: req.body.userTags || null
    },
    { new: true }
  )
    .then(sessions => {
      if (!sessions) {
        return res.status(404).send({
          message: "Session not found with id " + req.params.sessionId
        });
      }
      res.send(sessions);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Session not found with id " + req.params.sessionId
        });
      }
      return res.status(500).send({
        message: "Error updating session with id " + req.params.sessionId
      });
    });
};

// Delete a session with the specified sessionId in the request
exports.delete = (req, res) => {
  Sessions.findOneAndDelete(req.params.sessionId)
    .then(sessions => {
      if (!sessions) {
        return res.status(404).send({
          message: "Session not found with id " + req.params.sessionId
        });
      }
      res.send({ message: "Session deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Session not found with id " + req.params.sessionId
        });
      }
      return res.status(500).send({
        message: "Could not delete session with id " + req.params.sessionId
      });
    });
};
