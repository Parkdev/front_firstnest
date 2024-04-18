import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import axios from "axios";

function FileUpload() {
  const [files, setFiles] = useState([]);

  const handleFilesChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const uploadFiles = (e) => {
    e.preventDefault();
    const formData = new FormData();

    files.map((file) => {
      formData.append("files", file);
    });

    console.log(Array.from(formData));

    axios
      .post("http://localhost:8000/cats/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "text-white" : "text-white/90"}
                group inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
          >
            <span className="text-sm">Upload images</span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-0 z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                <div className="bg-gray-50 p-4">
                  <label
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    for="multiple_files"
                  >
                    Upload multiple files
                  </label>
                  <input
                    className="block w-full cursor-pointer border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                    id="multiple_files"
                    type="file"
                    onChange={handleFilesChange}
                    multiple
                  />
                  <button
                    className="mt-3 rounded bg-gray-500 px-4 py-1 text-sm font-bold text-white hover:bg-gray-700"
                    onClick={uploadFiles}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default FileUpload;
