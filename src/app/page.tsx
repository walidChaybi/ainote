import TypeWriter from "@/components/TypeWriter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

export default function Home() {
  return (
    <div className=" bg-gradient-to-r min-h-screen from-rose-100 to-teal-100 ">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-7xl text-center">
          <span className="font-bold text-teal-500">🤖 AI Notes </span> Taking
          Assistant
        </h1>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-3xl text-center text-slate-700">
          <TypeWriter />
        </h2>
        <div className="mt-8 flex justify-center">
          <Link href="/dashboard">
            <Button className="bg-teal-500 hover:bg-teal-800 font-bold w-[200px] h-[50px] flex items-center">
              Take notes
              <BsFillArrowRightSquareFill className="ml-4" size={15} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
