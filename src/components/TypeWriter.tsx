"use client";

import Typewriter from "typewriter-effect";

export default function TypeWriter() {
  return (
    <Typewriter
      options={{
        loop: true,
        deleteSpeed: 50,
        delay: 30,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Powered by GPT-3.5 ")
          .pauseFor(1000)
          .deleteAll()
          .typeString("Taking notes never been faster ")
          .pauseFor(1000)
          .deleteAll()
          .start();
      }}
    />
  );
}
