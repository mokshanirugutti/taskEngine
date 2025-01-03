import ExploreButton from "./Buttons/Explorebutton";
import { BackgroundLines } from "./ui/background-lines";

export default function(){
    return (
        <div className="px-4 sm:px-6 lg:px-28">
            <BackgroundLines className=" bg-transparent w-fit mx-auto text-center h-fit -z-20" svgOptions={{duration:3}}>



            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold  lg:leading-tight z-10">Manage your  <br /> <span className="text-pink-500">workflow</span>  at ease</h1>

            <p className="w-[80%] py-2 mx-auto">Create and manage your tasks with easy and friendly application to manage tasks</p>
            

            <ExploreButton title="Start using" arrow/>
            <ExploreButton title="Explore more" />


            </BackgroundLines>
            
        </div>
    )
}