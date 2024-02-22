import Image from "next/image";
import { Bounce, toast } from "react-toastify";

export default function EditableImage({ link, setLink }) {

  function uploadSuccess() {
    toast.success("Upload Complete", {
      position: "top-center",
      autoClose: 5000,
    });
  }
  function error() {
    toast.error("Error", {
      position: "top-center",
      autoClose: 5000,
    });
  }

  function handleFileChange(ev) {
    const files = ev.target.files;

    if (files?.length === 1) {

      const data = new FormData;
      data.set('file', files[0]);

      fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then(res => {
        if (res.ok) {
          return res.json().then(link => {
            setLink(link)
            uploadSuccess();
          })
        }
        error();
        throw new Error('Something went wrong')
      });

    }



  }

  return (
    <>
      {link && (
        <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Change image</span>
      </label>
    </>
  )
}
