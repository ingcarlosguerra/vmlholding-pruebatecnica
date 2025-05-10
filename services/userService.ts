import bcrypt from 'bcryptjs';
import User from "@/models/User";


const registerUser = async (name: string, email: string, password: string) => {
  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear el nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Guardar el usuario
    await newUser.save();

    return newUser;
  } catch (error:any) {
    throw new Error(`Error registrando usuario: ${error.message}`);
  }
};

// Verificar las credenciales de inicio de sesión
const loginUser = async (email: string, password: string) => {
  try {
    // Buscar al usuario por correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Comparar la contraseña
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
