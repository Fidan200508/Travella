import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel Planner API",
      version: "1.0.0",
    },
    
    // COMPONENTS - Defines reusable security schemes 
    components: { 
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    
    // Applies the security scheme globally by default
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  
  apis: ["./src/Routes/*.js"], 
};

// Create the Swagger specification object using the options
const swaggerSpec = swaggerJsDoc(options);

// Export the specification so it can be imported and used by index.js
export { swaggerSpec };