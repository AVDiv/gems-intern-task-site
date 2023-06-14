import Link from "next/link"

export default function Home() {
  return (
  <div className="flex justify-center items-center w-screen h-screen">
    <div className="h-40 bg-sky-100 text-slate-700 font-semibold max-w-xl w-96 rounded-lg shadow-xl">
      <div className="w-full h-1/2 flex items-center justify-center border-b-2 border-sky-600">
        <Link href="/frontend">Frontend Task</Link>
      </div>
      <div className="w-full h-1/2 flex items-center justify-center">
        <Link href="/backend">Backend Task</Link>
      </div>
    </div>
  </div>
  )
}