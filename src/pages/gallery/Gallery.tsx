import React, { useContext, useEffect, useState } from "react";
import { StaticDataContext } from "../../context/StaticContext";
import PageHeader from "../../components/template/pageHeader/PageHeader";
import GalleryThumb from "../../components/module/galleryThumb/GalleryThumb";
import Pagination from "../../components/global/pagination/Pagination";
import "./gallery.scss";
import { GalleryDataType } from "../../dataTypes/StaticData.type";
import SlideShow from "../../components/global/slideShow/SlideShow";

export default function Gallery() {
  // --- data
  const { staticData } = useContext(StaticDataContext);
  const [filteredData, setFilteredData] = useState<GalleryDataType[]>([]);

  // ---pagination states
  const [startIndex, setStartIndex] = useState(0);
  const perPage = 6;

  // ---slider states and methods
  const [slideShow, setslideShow] = useState(false);
  const [slideNumber, setSlideNumber] = useState<number>(0);
  const sliderHandler = (index: number) => {
    setslideShow(true);
    setSlideNumber(index);
  };

  // --- category states and methods
  const [category, setCategory] = useState<string>("همه تصاویر");
  const categoryChangeHandler = (value: string) => {
    setCategory(value);
    if (value === "همه تصاویر") {
      setFilteredData(staticData.gallery);
    } else {
      setFilteredData(
        staticData.gallery.filter((item) => item.category === value)
      );
    }
  };

  useEffect(() => {
    setFilteredData(staticData.gallery);
  }, [staticData]);

  return (
    <>
      <PageHeader title="گالری تصاویر" />

      {staticData?.galleryCategory && (
        <div className="gallery-Category-wrapper">
          <button
            className={`gallery-category ${
              category === "همه تصاویر" ? "active" : ""
            }`}
            onClick={() => categoryChangeHandler("همه تصاویر")}
          >
            همه تصاویر
          </button>

          {staticData.galleryCategory.map((item, index) => (
            <button
              key={index}
              className={`gallery-category ${
                category === item ? "active" : ""
              }`}
              onClick={() => categoryChangeHandler(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {filteredData && (
        <div className="gallery-container container">
          {filteredData
            .slice(startIndex, startIndex + perPage)
            .map((item, index) => (
              <GalleryThumb
                key={item.id}
                gallery={item}
                index={index}
                sliderHandler={sliderHandler}
              />
            ))}
        </div>
      )}

      {filteredData && (
        <Pagination
          dataLength={filteredData.length}
          perPage={perPage}
          startIndex={startIndex}
          setStartIndex={setStartIndex}
        />
      )}

      {filteredData && slideShow && (
        <SlideShow
          data={filteredData}
          slideNumber={slideNumber}
          setShowSlider={setslideShow}
        />
      )}
      {/* {data && gallerySliderShow && (
        <div className="modal-wrapper">
          <SliderModal
            data={data}
            setShowSlider={setGallerySliderShow}
            slideNumber={slideNumber}
          />
        </div>
      )} */}
    </>
  );
}
