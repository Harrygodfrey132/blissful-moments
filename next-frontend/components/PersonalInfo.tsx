export default function PersoanlInfo() {
  return (
    <section className="flex gap-12 px-12">
        {/* Profile Image Section */}
        <div className="mt-[-80px]">
          <div className="relative shadow p-2">
            <img
              src="img/profile-img.png"
              alt="Profile"
              className="w-60 h-60 object-cover shadow"
            />
            <label className="absolute border border-black bottom-4 text-sm right-4 bg-white py-2 pr-8 px-4 cursor-pointer">
              Change Image
              <span className="material-icons-outlined absolute ml-1">photo_camera</span>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>

        {/* Editable Content Section */}
        <div>
          <div className="space-y-4 p-4">
            {/* Editable Name */}
            <h1 className="text-4xl flex gap-4 font-medium mb-6 mt-4">
              <span
                className="border border-dashed text-blue-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500"
                contentEditable
                suppressContentEditableWarning
                aria-label="First Name"
                onInput={(e) => console.log("First name:", e.currentTarget.textContent)}
              >
                Patrick
              </span>
              <span
                className="border border-dashed text-blue-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500"
                contentEditable
                suppressContentEditableWarning
                aria-label="Middle Name"
                onInput={(e) => console.log("Middle name:", e.currentTarget.textContent)}
              >Bay</span>
              <span
                className="border border-dashed text-blue-900 p-4 border-gray-300 focus:outline-none focus:border-gray-500"
                contentEditable
                suppressContentEditableWarning
                aria-label="Last Name"
                onInput={(e) => console.log("Last name:", e.currentTarget.textContent)}
              >
                Doyle
              </span>
            </h1>

            {/* Editable Date */}
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-4">
                <select
                  className="p-2 w-24 border-2 h-12 bg-gray-50 border-gray-300 text-blue-900 font-medium"
                  aria-label="Select Day"
                >
                  <option>Day</option>
                </select>
                <select
                  className="p-2 w-24 border-2 h-12 bg-gray-50 border-gray-300 text-blue-900 font-medium"
                  aria-label="Select Month"
                >
                  <option>Month</option>
                </select>
                <select
                  className="p-2 border-2 h-12 bg-gray-50 border-gray-300 text-blue-900 font-medium w-[100px]"
                  aria-label="Select Year"
                >
                  <option>Year</option>
                </select>
              </div>
              <div className="bg-blue-900 font-bold rounded-full w-2 h-2 text-4xl"></div>
              <div className="flex items-center space-x-4">
                <select
                  className="p-2 w-24 border-2 h-12 bg-gray-50 border-gray-300 text-blue-900 font-medium"
                  aria-label="Select Day"
                >
                  <option>Day</option>
                </select>
                <select
                  className="p-2 w-24 h-12 bg-gray-50 border-2 border-gray-300 text-blue-900 font-medium"
                  aria-label="Select Month"
                >
                  <option>Month</option>
                </select>
                <select
                  className="p-2 h-12 bg-gray-50 border-2 border-gray-300 text-blue-900 font-medium w-[100px]"
                  aria-label="Select Year"
                >
                  <option>Year</option>
                </select>
              </div>
            </div>

            {/* Editable Location */}
            <div className="flex items-center relative">
              <span className="material-icons-outlined absolute left-4 text-blue-900">
                location_on
              </span>
              <span
                className="border-2 p-3 border-gray-300 text-blue-900 pl-12 min-w-[690px] focus:outline-none focus:border-blue-600 focus:text-blue-600"
                contentEditable
                suppressContentEditableWarning
                aria-label="Location"
                onInput={(e) => console.log("Location:", e.currentTarget.textContent)}
              >
                Royston, Hertfordshire
              </span>
            </div>
          </div>
        </div>
      </section>
  );
}