// libs
import type { $Response, $Request } from 'express'

// src

/**
 * Handles PRD request for aera recommends visualization
 * @param {$Request} req
 * @param {$Response} res
 */
export default (req: $Request, res: $Response) => {
  return res.send({ resonse: 'success' })
}
