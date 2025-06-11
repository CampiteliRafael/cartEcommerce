declare namespace Express {
  export interface Response {
    locals: {
      user?: any; 
    }
  }
}