const http = require('http');
const composeMiddleWare = require('./composeMiddleWare');
const EventEmitter = require('events');

/**
 * 
 * 
 * @class Application
 */
class Application extends EventEmitter{
    /**
     * Creates an instance of Application.
     * 
     * @return {Object} this
     * @memberof Application
     */
    constructor() {
        super();
        this.middleWare = [];
        this.use = this.use.bind(this);
        this.callBack = this.callBack.bind(this);
    }

    /**
     * 创建server
     * 
     * @param {Object} args 
     * @return {Null}
     * @memberof Application
     */
    listen(...args) {
        //处理中间件,保证中间件的调用顺序
        const fn = composeMiddleWare(this.middleWare);
        const server = http.createServer(this.callBack(fn));
        server.listen(...args);
        if (!this.listenerCount('error')){
            this.on('error', this.onError)
        }
    }

    /**
     * 传入中间件
     * 
     * @param {Function} fn
     * @return {Null} 
     * @memberof Application
     */
    use(fn) {
        this.middleWare.push(fn);
    }

    /**
     * server callBack
     * 
     * @param {Object} req 
     * @param {Object} res
     * @return {Null} 
     * @memberof Application
     */
    callBack(fn) {
        return async (req, res) =>{
            try{
                await fn();
            }catch(error){
                this.emit('error', error);
                if (!res.status || typeof res.status !== 'number'){
                    res.statusCode = 500;
                }
                res.end(error.message || '')
            } 
        };
    }
    onError(err){
        console.log(err)
    }
}


const app = new Application();

app.use(async function (ctx, next) {
    await next();
    throw new Error('ff')
    console.log(2);
});

app.use(async function(ctx, next){
    await new Promise(function(resolve, reject){
        setTimeout(function () {
            console.log(5);
            resolve()
        }, 1000)
    })
    console.log(1);
})

app.listen(3000, _ => {
    console.log('server listen 3000')
})