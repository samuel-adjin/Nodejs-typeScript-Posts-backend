import supertest from "supertest";
import app from '../app'

describe("Auth testing",()=>{
   describe("sign up",()=>{
    it("should return an object",()=>{
        supertest(app).post(``)
    })
   })
    
})