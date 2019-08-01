module.exports = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "localhost:3000/schema/siteregister.json",
    title: "Core schema meta-schema",
    definitions: "Site Register Object",
    type: "object",
    properties: {
        userName: {
            description: "User name of the customer",
            type: "string",
            minLength: 1
        },
        email : {
            description : "Email of the customer",
            type : "string",
            minLength : 1,
            format : "email"
        },
        password: {
            description: "Password of the customer",
            type: "string",
            minLength: 1
        }   
    },
    required:["userName", "email", "password"]
}