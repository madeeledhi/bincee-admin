export default (req, res, next) => {
  console.log('Request received to get aera recommends', req.query)
  const { token, dataSource } = req.body
  if (!token) {
    return res.status(415).send({ message: `${token} is invalid token` })
  }

  if (!dataSource) {
    return res.status(415).send({ message: `${dataSource} is invalid Datasource` })
  }

  return next()
}
