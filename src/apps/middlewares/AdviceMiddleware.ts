import { Request, Response, NextFunction } from "express"
import { validateOrReject, IsNotEmpty, Length, IsString, IsNumber } from 'class-validator'

class UpdateAdviceParms {
 
  @IsNotEmpty()
  @Length(2, 30)
  @IsString()
  title: string
  
  @IsNotEmpty()
  @Length(2, 150)
  @IsString()
  description: string

  @IsNotEmpty()
  deadline: Date
}

class CreateAdviceParms extends UpdateAdviceParms {
  
  @IsNotEmpty()
  @IsNumber()
  classroom: number
}

export default {
  async update(request: Request, response: Response, next: NextFunction) {
  
    const { title, description, deadline } = request.body
    
    const advice = new UpdateAdviceParms()
    
    advice.title = title
    advice.description = description
    advice.deadline = deadline
  
    try{
      await validateOrReject(advice)
  
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  },
  
  async create(request: Request, response: Response, next: NextFunction) {
    
    const { title, description, deadline, classroom } = request.body
    
    const advice = new CreateAdviceParms()
    
    advice.title = title
    advice.description = description
    advice.deadline = deadline
    advice.classroom = classroom
  
    try{
      await validateOrReject(advice)
  
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  }
}