/**
 * Defer a task to execute it asynchronously.
 */
export const nextTick = (function() {
  const callbacks = [];
  let pending = false;
  let timerFunc;

  function nextTickHandler() {
    pending = false;
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  var p = Promise.resolve();
  var logError = err => {
    console.error(err);
  };
  timerFunc = () => {
    p.then(nextTickHandler).catch(logError);
  };

  return function queueNextTick(cb, ctx) {
    let _resolve;
    callbacks.push(() => {
      _resolve(ctx);
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    return new Promise((resolve, reject) => {
      _resolve = resolve;
    });
  };
})();
