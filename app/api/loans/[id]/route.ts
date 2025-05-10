import { connectDB } from "@/utils/mongoose";
import Loans from '@/models/Loan';
import { NextResponse } from "next/server";


interface Params {
  id: string;
}


export async function GET(req: Request, { params }: { params: Params }) {
  try {
    await connectDB();

    const { id} = await params;
    const loans = await Loans.findById(id);

    if (!loans) {
      return NextResponse.json(
        { message: "El prestamo solicitado no se encuentra" }, {
          status: 404
        }
      );
    }

    return NextResponse.json(loans);
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

    const loan = await Loans.findByIdAndUpdate(id, updatedData ,{ new:true } );

    if (!loan) {
      return NextResponse.json(
        { message: "El loan solicitado no se encuentra" }, {
          status: 404
        }
      );
    }

    return NextResponse.json(loan);
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
    

    const deletedLoans = await Loans.findByIdAndDelete(params.id);

    if (!deletedLoans) {
      return NextResponse.json(
        { message: "El registro solicitado no se encuentra" }, {
          status: 404
        }
      );
    }

    return NextResponse.json({ message: "registro eliminado con éxito" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message }, {
        status: 500
      }
    );
  }
}
