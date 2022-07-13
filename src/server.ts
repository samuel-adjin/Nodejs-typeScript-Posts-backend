import http from 'http';
import debug from 'debug';
import app from './app';


const Debug = debug('farad:server');

const server = http.createServer(app);

server.on('listening',()=>{
    Debug('Connection running')
});
server.on('close',()=>{
    Debug('Server shutting down');
    process.exit(0)
})

export default server;