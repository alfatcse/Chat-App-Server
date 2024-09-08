const swaggerjsdoc=require("swagger-jsdoc");
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "Chat App Server API",
      },
      servers: [
        {
          url: "https://chat-app-server-414t.onrender.com/api/v1",
        },
      ],
    },
    apis:["./routes/*.js"]
  };
  const specs = swaggerjsdoc(options);
  module.exports=specs;