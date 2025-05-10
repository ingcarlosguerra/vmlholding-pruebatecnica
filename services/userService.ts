import bcrypt from 'bcryptjs';
import User from "@/models/User";


const registerUser = async (name: string, email: string, password: string) => {
  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    const hashedPassword = await bcrypt.hash(password, 12);


    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });


    await newUser.save();

    return newUser;
  } catch (error:any) {
    throw new Error(`Error registrando usuario: ${error.message}`);
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Contraseña incorrecta");
    }

    return user;
  } catch (error:any) {
    throw new Error(`Error al iniciar sesión: ${error.message}`);
  }
};

export { registerUser, loginUser };
