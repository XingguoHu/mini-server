const http = require('http');
const composeMiddleWare = require('./composeMiddleWare');

/**
 * 
 * 
 * @class Application
 */
class Application {
    /**
     * Creates an instance of Application.
     * 
     * @return {Object} this
     * @memberof Application
     */
    constructor() {
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
        console.log(args)
        server.listen(...args);
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
        return (res, req) =>{
            fn().then(_ =>{
                console.log('end')
            });
        };
    }
}


const app = new Application();

app.use(async function (ctx, next) {
    await next();
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