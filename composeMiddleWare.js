function composeMiddleWare(middleWare) {
    let i = -1;
    //方式一
    // return function fn(ctx, next) {
    //     i = i + 1;
    //     return new Promise(function (resolve, reject) {
    //         if (!middleWare.length) {
    //             return resolve();
    //         } else if (middleWare.length === i) {
    //             return resolve();
    //         } else {
    //             next = middleWare[i];
    //             try{
    //                 resolve(next(ctx, fn));
    //             }catch(e){
    //                 reject(e);
    //             }
    //         }
    //     })
    // }
    //方式二
    return async function fn(ctx, next){
        i = i + 1;
        if (!middleWare.length) {
            return ;
        } else if (middleWare.length === i) {
            return ;
        } else {
            next = middleWare[i];
            try {
                await next(ctx, fn);
            } catch (e) {
                reject(e);
            }
        }
    }
}

module.exports = composeMiddleWare;