import { cardProductInfo } from "@/lib/constants";
import { Gem } from "lucide-react";
import { Button } from "@ui/button";

const RedeemPromotions = () => {
  return (
    <div className="flex flex-row justify-center mb-6">
      <div className="rounded-xl bg-background w-full sm:w-9/12 p-4 flex flex-col shadow-xl items-center">
        <h1 className="mb-4 text-tertiary font-bold text-xl">
          Productos Disponibles
        </h1>
        <div className="flex flex-col gap-3 px-2 sm:gap-5 w-full mb-2 2xl:px-44">
          <span className="text-xs sm:text-sm text-muted-foreground">
            Descubre las increíbles recompensas que puedes obtener con tus
            puntos. ¡Canjea tus puntos y disfruta de grandes beneficios!
          </span>
          <div className="flex flex-row flex-wrap justify-around gap-5 mb-2">
            {cardProductInfo.map((info, index) => (
              <ProductCard
                key={index}
                title={info.title}
                vendor={info.vendor}
                pointsValue={info.pointsValue}
                productImage={info.productImage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{
  title: string;
  vendor: string;
  pointsValue: string;
  productImage: string;
}> = ({ productImage, title, vendor, pointsValue }) => (
  <div className="flex flex-row gap-x-3 w-[305px] border bg-background p-3 rounded-md shadow-md">
    <div className="flex items-center justify-center">
      <img
        src={productImage}
        className="h-24 w-24 mb-1 p-2 rounded-md border object-contain"
      />
    </div>
    <div className="flex flex-col w-3/4 justify-between my-1">
      <span className="flex justify-start text-primary font-bold">{title}</span>
      <span className="text-xs sm:text-sm text-muted-foreground">
        Redimible en:{" "}
        <span className="ml-1 cursor-pointer text-primary hover:underline">
          {vendor}
        </span>
      </span>
      <Button type="button" variant="special">
        <Gem className="h-3 w-3 select-none mr-1" />
        {pointsValue}
      </Button>
    </div>
  </div>
);

export default RedeemPromotions;
