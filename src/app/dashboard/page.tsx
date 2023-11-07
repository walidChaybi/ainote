import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { BsArrowBarLeft } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import CreateNoteDialog from "@/components/CreateNoteDialog";

export default function Page() {
  return (
    <>
      <div className="grain min-h-screen">
        <div className="max-w-7xl mx-auto p-10">
          <div className="h-14"></div>
          <div className="flex justify-between items-center md:flex flex-col">
            <div className="flex items-center">
              <Link href="/">
                <Button className="bg-teal-500 hover:bg-teal-800 font-bold w-[90px] h-[40px] flex items-center">
                  <BsArrowBarLeft className="mr-2" />
                  Back
                </Button>
              </Link>
              <div className="w-4"></div>
              <h1 className="text-3xl font-bold text-gray-900">My notes</h1>
              <div className="w-4"></div>
              <UserButton />
            </div>
          </div>
          <div className="h-8"></div>
          <Separator />
          <div className="h-8"></div>
          {/* list of notes*/}
          {/* conditionally render */}
          <div className="text-center">
            <h2 className="text-xl text-gray-500">You have no notes yet</h2>
          </div>

          {/* display all notes*/}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <CreateNoteDialog />
          </div>
        </div>
      </div>
    </>
  );
}
