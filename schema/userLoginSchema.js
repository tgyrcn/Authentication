module.exports = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "localhost:3000/schema/sitelogin.json",
    title: "Core schema meta-schema",
    definitions: "Site Login Object",
    type: "object",
    properties: {
        userName: {
            description: "User name of the customer",
            type: "string",
            minLength: 1
        },
        password: {
            description: "Password of the customer",
            type: "string",
            minLength: 1
        },
        rememberMe: {
            description: "Remember me flag",
            type: 'boolean',
            default: false
        },
        isAdmin : {
            type : 'boolean',
            default : false
        }    
    },
    required:["userName", "password"]
}