import { Gem } from "lucide-react";
import { Button } from "@ui/button";

const RedeemPromotions: React.FC<{
    spanTitle: string;
    spanMessage: string;
    productImage: string;
  }> = ({ productImage, spanTitle, spanMessage }) => (
    <div className="p-[2px] my-2 sm:mx-10 rounded-2xl bg-gradient-to-tr from-violet-400 via-background to-violet-400">
      <div className="w-52 h-auto bg-slate-50 p-3 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-center">
          <img src={productImage} className="h-32 w-32 mb-1 rounded-md border border-s" />
        </div>
        <span className="text-md font-bold flex items-center justify-center mb-1">
          {spanTitle}
        </span>
        <div className="overflow-hidden">
          <Button className=" w-full" variant="speround" size="sm">
          <Gem className="h-3 w-3 text-white select-none mr-1" />
            {spanMessage}
          </Button>
        </div>
      </div>
    </div>
  );

export default RedeemPromotions;