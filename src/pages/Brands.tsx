import Navigation from "@/components/Navigation";
import BrandGrid from "@/components/BrandGrid";

const Brands = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <BrandGrid />
      </div>
    </div>
  );
};

export default Brands;
