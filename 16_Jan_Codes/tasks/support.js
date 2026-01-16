const http = require('http');
const url = require('url');
const fs = require('fs');


const generateTicketId = () => {
    return 'TICKET-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

const server = http.createServer((req, res) => {
    const timestamp = new Date().toLocaleString();
    const pathname = url.parse(req.url, true).pathname;
    
    switch (pathname) {
       case '/complaint':
              const { name,issue,priority } = url.parse(req.url, true).query;
              const ticketId = generateTicketId();
              const logEntry = `Time: ${timestamp}, Name: ${name}, Issue: ${issue}, Priority: ${priority}\n`;
              if (name && issue && priority) {
                   if (priority.toLowerCase() === 'high') {
                       fs.appendFile('urgent.log', logEntry, (err) => {
                           if (err) console.log(err);
                       });
                    }else{
                        fs.appendFile('complaints.log', logEntry, (err) => {
                            if (err) console.log(err);
                        });
                    }
               } 
               else{
                     res.write('Missing required query parameters: name, issue, priority');
               }

               res.write(`Complaint received. Your ticket ID is ${ticketId}`);
               res.end();
               break;
       default:
               res.write('Welcome to the Customer Support System');
               res.end();
    }
});



const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

  