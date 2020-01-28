const systemInfo = require('./systemInfo');

const { getTotalMemory, getFreeMemory, getAllocatedMemory } = systemInfo;

const authorization = 'Basic Qm9oZGFuIDM0NTM0NQ==';
let memoryLimit = 0;

const MemoryFilter = Object.freeze({ total: 'total', free: 'free', allocated: 'allocated' });

function mainPage(res) {
  res.setHeader('Content-Type', 'application/json');
  res.setStatusCode = 200;
  res.write(
    JSON.stringify({
      message: 'This is the home page',
    }),
  );
  res.end();
}

function pageNotFound(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  res.write(
    JSON.stringify({
      message: 'Page not found',
    }),
  );
  res.end();
}

function setMemoryLimit(res, queryParams, auth) {
  if (authorization !== auth) {
    res.write(
      JSON.stringify({
        message: 'Unauthorized',
      }),
    );
    res.statusCode = 401;
    res.end();
    return;
  }
  const { limit = null } = queryParams;
  let msg;
  try {
    if (!limit) {
      res.statusCode = 400;
      msg = 'New value for minimum free memory limit is not valid number';
    } else {
      memoryLimit = Number(limit);
      res.statusCode = 200;
      msg = `Minimum free memory limit is successfully set to ${memoryLimit} MB`;
    }
  } catch (error) {
    res.statusCode = 500;
    msg = 'Internal error occurred';
  }
  res.setHeader('Content-Type', 'application/json');
  res.write(
    JSON.stringify({
      message: msg,
    }),
  );
  res.end();
}

function getMetrics(res, queryParams, auth) {
  if (authorization !== auth) {
    res.write(
      JSON.stringify({
        message: 'Unauthorized',
      }),
    );
    res.statusCode = 401;
    res.end();
    return;
  }
  const { filter = null } = queryParams;
  let metrics = {};
  if (!filter) {
    res.statusCode = 200;
    metrics = {
      message: 'OK',
      total: getTotalMemory(),
      free: getFreeMemory(),
      allocated: getAllocatedMemory(),
    };
    if (getFreeMemory() < memoryLimit) {
      metrics.message += '. Available memory is under the defined limit';
    }
  } else {
    res.statusCode = 200;
    metrics.message = 'OK';
    switch (filter) {
      case MemoryFilter.total:
        metrics.total = getTotalMemory();
        break;
      case MemoryFilter.free:
        metrics.free = getFreeMemory();
        if (getFreeMemory() < memoryLimit) {
          metrics.message += '. Available memory is under the defined limit';
        }
        break;
      case MemoryFilter.allocated:
        metrics.allocated = getAllocatedMemory();
        break;
      default:
        res.statusCode = 400;
        metrics.message = 'Filter value is not valid';
        break;
    }
  }
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(metrics));
  res.end();
}

module.exports = {
  setMemoryLimit,
  mainPage,
  pageNotFound,
  getMetrics,
};
