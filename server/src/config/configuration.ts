export default () => ({
  database: {
    url: process.env.MONGO_DB,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '60s',
  },
});
