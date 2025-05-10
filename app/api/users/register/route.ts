import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";  
import User from '@/models/User';

interface User {
  name: string;
  email: string;
  password: string;
}

export async function GET(){
  connectDB()
  const Users = await User.find()
  return NextResponse.json(
      Users
  );
}


export async function POST(req: Request) {
  try {
    const data = await req.json(); 

    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.email,

    });
    const savedUser = await newUser.save();
    return NextResponse.json(savedUser); 
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error al guardar usuario", error: error.message },
      { status: 400 }
    );
  }
}
