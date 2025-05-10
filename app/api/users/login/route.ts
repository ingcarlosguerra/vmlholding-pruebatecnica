import { NextResponse } from "next/server";
import { loginUser } from "@/services/userService";
import { setSessionCookie } from "@/services/sessionService";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await loginUser(email, password);
    const res = NextResponse.json({ message: "Login successful" });
    setSessionCookie(res, user._id.toString());

    return res;
  } catch (error:any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
