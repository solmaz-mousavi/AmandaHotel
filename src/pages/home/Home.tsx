import GallerySlider from "../../components/template/gallerySlider/GallerySlider";
import HomeSlider from "../../components/template/homeSlider/HomeSlider";
import Intro from "../../components/template/intro/Intro";
import MenuCategory from "../../components/template/menuCategory/MenuCategory";
import Status from "../../components/template/status/Status";
import "./home.scss";

export default function Home() {
  return (
    <section className="home-wrapper">
      <HomeSlider />
      <Intro />
      <Status />
      <MenuCategory />
      <GallerySlider />
    </section>
  );
}
