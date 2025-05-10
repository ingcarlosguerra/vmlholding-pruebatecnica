import { connectDB } from "@/utils/mongoose";
import Users from '@/models/User';
import { NextResponse } from "next/server";


interface Params {
  id: string;
}


export async function GET(req: Request, { params }: { params: Params }) {
  try {
    await connectDB();

    const { id} = await params;
    const user = await Users.findById(id);

    if (!user) {
      return NextResponse.json(
        { message: "El usuario solicitado no se encuentra" }, {
          status: 404
        }
      );
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message }, {
        status: 500
      }
    );
  }
}



export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    await connectDB();
    const { id} = await params;
    const updatedData = await req.json();

    const user = await Users.findByIdAndUpdate(id, updatedData ,{ new:true } );

    if (!user) {
      return NextResponse.json(
        { message: "El usuario solicitado no se encuentra" }, {
          status: 404
        }
      );
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message }, {
        status: 500
      }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    await connectDB();
    

    const deletedUser = await Users.findByIdAndDelete(params.id);

    if (!deletedUser) {
      return NextResponse.json(
        { message: "El user solicitado no se encuentra" }, {
          status: 404
        }
      );
    }

    return NextResponse.json({ message: "user eliminado con éxito" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message }, {
        status: 500
      }
    );
  }
}
