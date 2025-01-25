const express = require('express');
const app = express();

const statusCodeDescriptions = {
    200: "OK: The request has succeeded. The meaning of this status depends on the HTTP method used.",
    201: "Created: A new resource has been successfully created as a result of the request.",
    204: "No Content: The server successfully processed the request but is not returning any content.",
    400: "Bad Request: The server cannot process the request due to client-side errors (e.g., malformed syntax).",
    401: "Unauthorized: Authentication is required to access the resource.",
    403: "Forbidden: The server understands the request but refuses to authorize it.",
    404: "Not Found: The server has not found anything matching the request URI. This is often caused by a missing page or resource.",
    405: "Method Not Allowed: The HTTP method used is not allowed for the requested resource.",
    429: "Too Many Requests: The user has sent too many requests in a given amount of time (rate limiting).",
    500: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.",
    502: "Bad Gateway: The server received an invalid response from the upstream server.",
    503: "Service Unavailable: The server is temporarily unable to handle the request due to maintenance or overload.",
    504: "Gateway Timeout: The server did not receive a timely response from the upstream server."
};

// GET endpoint for status information
app.get('/status-info', (req, res) => {
    const code = parseInt(req.query.code); 
    if (isNaN(code)) {
        return res.status(400).json({
            status: 400,
            message: "Bad Request: Please provide a valid numeric HTTP status code."
        });
    }

    if (statusCodeDescriptions[code]) {
        return res.json({
            status: code,
            message: statusCodeDescriptions[code]
        });
    } else {
        return res.status(404).json({
            status: 404,
            message: "Not Found: The status code is not recognized or not supported by this API."
        });
    }
});

// Server setup
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Status Cooode API is running on http://localhost:${PORT}`);
});