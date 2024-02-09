
export default function LoggedInHomePage({wallet}) {
  return (
    <main className="w-full h-full flex justify-around items-center">
        <div className="p-10 border border-black rounded-2xl flex flex-col justify-around gap-8">
            <img src="./view.png" alt="upload" />
            View Records
        </div>
        <div className="p-10 border border-black rounded-2xl flex flex-col justify-around gap-8">
            <img src="./upload.png" alt="upload" />
            Upload Records
        </div>
    </main>
  )
}