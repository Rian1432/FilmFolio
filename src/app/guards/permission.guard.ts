import { CanActivateChildFn } from '@angular/router';

export const permissionGuard: CanActivateChildFn = (childRoute, state) => {
  console.log('Guarda de rota ativada!')
  return true;
};
