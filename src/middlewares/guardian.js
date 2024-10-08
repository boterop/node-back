import validate from './validate.js';

const ignored_paths = ['/api/login'];

const guardian = async (req, res, next) => {
  const path = req.path;

  for (const ignored_path of ignored_paths) {
    if (path.startsWith(ignored_path)) return next();
  }

  const { authorization } = req.headers;

  let token;

  try {
    token = authorization.split(' ')[1];
  } catch (_err) {
    token = '';
  }

  const { payload, expired } = validate(token);

  if (!payload || expired) {
    return res.status(401).send({
      error: expired ? messages.token_expired : messages.unauthorized,
    });
  }

  req.userId = payload.id;
  next();
};

export default guardian;
