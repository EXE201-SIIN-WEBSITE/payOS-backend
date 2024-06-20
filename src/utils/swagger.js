import swaggerJsdoc from 'swagger-jsdoc'
    import swaggerUi from 'swagger-ui-express'
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'SIIN Payment API',
          description: "Payment payOS with NodeJS",
          contact: {
            name: "Lãnh chúa Thắng",
            email: "dmthang.longan@gmail.com"
          },
          version: '1.0.0',
        },
        servers: [
          {
            url: "https://payos.exe201-backend.click/",
            description: "Deploy server" 
          }
        ]
      },
      // looks for configuration in specified directories
      apis: ['./src/controllers/*.js']
    }
    const swaggerSpec = swaggerJsdoc(options)
    function swaggerDocs(app, port) {
      // Swagger Page
      app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
      // Documentation in JSON format
      app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
      })
    }
    export default swaggerDocs;
