import {Request, Response, Router} from 'express';
import {ResponseHandler} from './response_handler';

/**
 * This class represents the default api route reached by not specifying a resource or action
 */
class RootApi {
  /**
   * Dependencies needed for api operation are injected via this constructor.
   * @param responseHandler a handler used for formatting and sending HTTP responses.
   * @param router the express route associated with this class.
   */
  constructor(
    private responseHandler: ResponseHandler,
    private router: Router
  ) {}

  /**
   * This function sets up the handling used for each resource in this route, it will be called only once
   * ,by the api manager.
   */
  async setupRequestHandling() {
    this.router.get('/', async (req: Request, res: Response) => {
      const data = 'API is up and running!';
      const httpStatusCode = 200;
      this.responseHandler.sendHttpResponse(res, httpStatusCode, data, false);
    });
  }
}

export {RootApi};
