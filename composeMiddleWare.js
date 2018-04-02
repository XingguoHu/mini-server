function composeMiddleWare(middleWare) {
    // 方式一
    return function (ctx, next) {
        let i = -1;

        function fn(ctx, next) {
            i = i + 1;
            return new Promise(function (resolve, reject) {
                if (!middleWare.length) {
                    return resolve();
                } else if (middleWare.length === i) {
                    return resolve();
                } else {
                    next = middleWare[i];
                    try {
                        resolve(next(ctx, fn));
                    } catch (e) {
                        reject(e);
                    }
                }
            })
        }
        return fn();
    }

    // 方式二
    return function (ctx, next) {
        let i = -1;
        async function fn(ctx, next) {
            i = i + 1;
            if (i > middleWare.length) {
                i = 0;
            }
            if (!middleWare.length) {
                return;
            } else if (middleWare.length === i) {
                return;
            } else {
                next = middleWare[i];
                console.log(next)
                await next(ctx, fn);
            }
        }
        return fn();
    }
}

module.exports = composeMiddleWare;