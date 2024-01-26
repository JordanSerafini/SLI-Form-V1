function FormId() {
  return (
    <>
      <div className="bg-white rounded-xl border-brownperso border-4 p-4 shadow-custom w-9/10 mt-10 flex flex-col gap-6 font-playfair">
        <h2 className="text-xl font-bold border-b border-blue-strong">
          A propos de vous:
        </h2>
        <form className="flex flex-col gap-4">
          <label className="font-semibold text-blue-light">
            Nom / Entreprise:
            <input
              type="text"
              name="name"
              className="form-input mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </label>
          <label className="font-semibold text-blue-light">
            Fonction:
            <input
              type="text"
              name="function"
              className="form-input mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </label>
          <label className="font-semibold text-blue-light">
            Date du jour:
            <input
              type="date"
              name="date"
              className="form-input mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </label>
        </form>
      </div>
    </>
  );
}

export default FormId;
