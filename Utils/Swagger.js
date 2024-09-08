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
          url: "http://localhost:4000/api/v1",
        },
      ],
    },
    apis:["./routes/*.js"]
  };
  const specs = swaggerjsdoc(options);
  module.exports=specs;