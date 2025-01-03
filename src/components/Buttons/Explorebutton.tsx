// Dependencies: pnpm install lucide-react

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type ExploreButtonProps = {
    title :string;
    arrow? :boolean
}

export default function ExploreButton({title,arrow=false}:ExploreButtonProps) {
  return (
    <Button className="group my-1 mx-2 h-12 w-36">
      {title}
      
     {arrow && <ArrowRight
        className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />}
    </Button>
  );
}
