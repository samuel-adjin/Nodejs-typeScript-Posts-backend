declare namespace Express {
    // tslint:disable-next-line:no-empty-interface
    interface User { role: string, email: string, username: string , userId: number}
  
    export interface Request {
      user?: User | undefined;
      
    }
  }