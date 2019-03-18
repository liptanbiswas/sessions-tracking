module.exports = app => {
  const sessions = require("../controllers/sessions.controller.js");

  // Create a new session
  app.post("/sessions", sessions.create);

  // Retrieve all sessions
  app.get("/sessions", sessions.findAll);

  // Retrieve a single session with sessionId
  app.get("/sessions/:sessionId", sessions.findOne);

  // Update a session with sessionId
  app.put("/sessions/:sessionId", sessions.update);

  // Delete a session with sessionId
  app.delete("/sessions/:sessionId", sessions.delete);
};
