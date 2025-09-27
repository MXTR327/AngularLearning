import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function reqresInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
)
{
  const newReq = req.clone({
    headers: req.headers.append('x-api-key', 'reqres-free-v1'),
  });
  return next(newReq);
}
