const http = require('http');
/**
 * 
 * 
 * @class Application
 */
class Application{

    /**
     * Creates an instance of Application.
     * 
     * @return {Object} this
     * @memberof Application
     */
    constructor(){
        this.middleWare = null;
        this.use = this.use.bind(this);
        this.callBack = this.callBack.bind(this);
    }

    /**
     * 
     * 
     * @param {Object} args 
     * @return {Null}
     * @memberof Application
     */
    listen(...args){
        const server = http.createServer(this.callBack);
        console.log(args)
        server.listen(...args);
    }
    
    /**
     * 
     * 
     * @param {Function} fn
     * @return {Null} 
     * @memberof Application
     */
    use(fn){
        this.middleWare = fn;
    }

    /**
     * 
     * 
     * @param {Object} req 
     * @param {Object} res
     * @return {Null} 
     * @memberof Application
     */
    callBack(req, res){
        this.middleWare(req, res);
    }
}


const app = new Application();

app.use(function(req, res){
    res.writeHead(200);
    res.end('hello world');
});

app.listen(3000, _=>{ 
    console.log('server listen 3000')
})
