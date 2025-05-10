// components/TailwindTest.js
export default function TailwindTest() {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      <h1 className="text-3xl font-bold underline mb-4">Título de prueba</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Botón de prueba
      </button>
      <div className="mt-4">
        <div className="bg-green-200 text-green-800 p-2 inline-block">Texto con fondo verde</div>
        <div className="bg-red-200 text-red-800 p-2 inline-block ml-2">Texto con fondo rojo</div>
      </div>
    </div>
  );
}