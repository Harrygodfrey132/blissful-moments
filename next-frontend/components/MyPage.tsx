export default function MyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="relative h-64 bg-cover bg-center mt-[89px]" style={{ backgroundImage: `url('img/top-bg.jpg')` }}>

        <div className="absolute bottom-4 right-4">
          <label className="bg-white px-4 py-2 border text-sm border-black  pr-8 shadow cursor-pointer">
            Change Image
            <span className="material-icons-outlined absolute ml-1">photo_camera</span>
            <input
              type="file"
              className="hidden"
            />
          </label>
        </div>
      </header>
      <section className="flex gap-12 px-12">
        <div className="mt-[-80px]">
          <div className="relative shadow p-2 ">
            <img
              src="img/profile-img.png"
              alt="Profile"
              className="w-60 h-60 r object-cover shadow"
            />
            <label className="absolute border border-black bottom-4 text-sm right-4 bg-white py-2 pr-8 px-4 cursor-pointer">
              Change Image
              <span className="material-icons-outlined absolute ml-1">photo_camera</span>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
        <div>
          <div className="space-y-4 p-4">
            {/* Editable Name */}
            <h1 className="text-4xl flex gap-4 font-medium mb-6 mt-4">
              <span
                className="border border-dashed text-blue-light-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500"
                contentEditable
                onInput={(e) => console.log('First name:', e.currentTarget.textContent)}
              >
                Patrick
              </span>
              <span
                className="border border-dashed text-blue-light-900 p-4  border-gray-300 focus:outline-none focus:border-gray-500"
                contentEditable
                onInput={(e) => console.log('Middle name:', e.currentTarget.textContent)}
              >

              </span>
              <span
                className="border border-dashed text-blue-light-900 p-4  border-gray-300 focus:outline-none focus:border-gray-500"
                contentEditable
                onInput={(e) => console.log('Last name:', e.currentTarget.textContent)}
              >
                Doyle
              </span>
            </h1>
            {/* Editable Date */}
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-4">
                <select
                  className="p-2 w-24 border-2 h-12 !bg-gray-50 border-gray-300 placeholder-blue-light-90 text-blue-light-900 font-medium"
                >
                  <option>Day</option>
                </select>
                <select
                  className="p-2 w-24 border-2 h-12 !bg-gray-50 border-gray-300 placeholder-blue-light-90 text-blue-light-900 font-medium"
                >
                  <option>Month</option>
                </select>
                <select
                  className="p-2 border-2 h-12 !bg-gray-50 border-gray-300 placeholder-blue-light-90 text-blue-light-900 font-medium w-[100px]"
                >
                  <option>Year</option>
                </select>
              </div>
              <div className="bg-blue-light-900 font-bold rounded-full w-2 h-2 text-4xl"></div>
              <div className="flex items-center space-x-4">
                <select
                  className="p-2 w-24 border-2 h-12 !bg-gray-50 border-gray-300 placeholder-blue-light-90 text-blue-light-900 font-medium"
                >
                  <option>Day</option>
                </select>
                <select
                  className="p-2 w-24 h-12 !bg-gray-50 border-2 border-gray-300 placeholder-blue-light-90 text-blue-light-900 font-medium"
                >
                  <option>Month</option>
                </select>
                <select
                  className="p-2 h-12 !bg-gray-50 border-2 border-gray-300 placeholder-blue-light-90 text-blue-light-900 font-medium w-[100px]"
                >
                  <option>Year</option>
                </select>
              </div>
            </div>
            {/* Editable Location */}
            <div className="flex items-center relative">
              <span className="material-icons-outlined absolute left-4 text-blue-light-900">location_on</span>
              <span
                className="border-2 p-3 border-gray-300 text-blue-light-900 pl-12 min-w-[690px] focus:outline-none focus:border-blue-600 focus:text-blue-600"
                contentEditable
                onInput={(e) => console.log('Location:', e.currentTarget.textContent)}
              >
                Royston, Hertfordshire
              </span>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}