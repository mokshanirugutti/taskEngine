"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ExploreButton from "./Buttons/Explorebutton";
import Particles from "./ui/particles";

export default function(){
    const { resolvedTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");
  
    useEffect(() => {
      setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme]);
  
  
    return (
        <div className="h-[100vh] w-[100vw]  flex justify-center items-center text-center relative  " > 
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl">   
            <span className="pointer-events-none z-10 whitespace-pre-wrap text-center ">
              <div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold  lg:leading-tight z-10">Manage your  <br />
                 <span className="text-pink-500 drop-shadow-lg">workflow</span> at ease</h1>
                <p className="w-[80%] py-2 mx-auto font-light tracking-wide">Simplify your task management with our user-friendly application</p>
            
                <ExploreButton title="Start using" arrow/>
                <ExploreButton title="Explore more" />
              </div>            
            </span>
            <Particles
              className="absolute inset-0 z-0"
              quantity={100}
              ease={15}
              color={color}
              refresh
            />
        </div>              
      </div>
    )
}