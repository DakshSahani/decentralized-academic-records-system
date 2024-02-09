
export default function LoggedInHomePage({wallet}) {
  return (
    <main className="w-full h-full flex justify-evenly items-center">
        <a className="p-10 border border-black rounded-2xl flex flex-col justify-around gap-8 hover:cursor-pointer">
            <img src="./view.png" alt="upload" />
            View Records
        </a>
        <a className="p-10 border border-black rounded-2xl flex flex-col justify-around gap-8 hover:cursor-pointer">
            <img src="./upload.png" alt="upload" />
            Upload Records
        </a>
    </main>
  )
}