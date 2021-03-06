import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import jwt from 'jsonwebtoken'

import Classroom from '../models/Classroom'
import Student from '../models/Student'

interface TokePayload {
  id: string;
  iat: number;
  exp: number;
}

export default {

  async generate(request: Request, response: Response) {
    const { id } = request.params
    const classroomRespository = getRepository(Classroom) 
    const classroom = await classroomRespository.findOne({ where: { id }}) 
    if(!classroom) {
      return response.sendStatus(404)
    }
    const token = jwt.sign({id: classroom.id}, 'secret') 
    return response.json(token)
  },

  async create(request: Request, response: Response) {
    const { studentId, studentUsername, studentEmail, token } = request.body
    let { classroomId } = request.body

    const classroomRespository = getRepository(Classroom)
    const studentRespository = getRepository(Student)
    
    if(token) {
      const data  = jwt.verify(token, 'secret')
      const { id } = data as TokePayload
      classroomId = id
    }

    const classroom = await classroomRespository.findOne({ where: { id: classroomId }})
    const student = await studentRespository.findOne({ 
      where: [
        { id: studentId },
        { username: studentUsername },
        { email: studentEmail },
      ], 
      relations: ['classrooms']
    })
    
    if(!student || !classroom) {
      return response.sendStatus(400)
    }
    
    student.classrooms.push(classroom)
    
    await studentRespository.save(student)
    
    return response.sendStatus(200)
  },

  async remove(request: Request, response: Response) {
    
    const { studentId, classroomId } = request.body
    
    const classroomRespository = getRepository(Classroom)
    const studentRespository = getRepository(Student)
    
    const classroom = await classroomRespository.findOne({ where: { id: classroomId }})
    const student = await studentRespository.findOne({ where: { id: studentId }, relations: ['classrooms']})
    
    if(!student || !classroom){
      return response.sendStatus(400)
    }

    student.classrooms.filter(classroom => classroom.id !== classroomId)
    
    await studentRespository.save(student)

    return response.sendStatus(200)
  },
}
