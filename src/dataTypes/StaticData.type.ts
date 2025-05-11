import {
  BaseDataType,
  desc,
  NavbarDataType,
  SocialDataType,
} from "./Main.type";

export interface SliderDataType extends BaseDataType, desc {
  route: string;
}
export interface StatusDataType extends BaseDataType {
  number: number;
  unit: string;
}

export interface IntroDataType extends BaseDataType, desc {}
export type RoomCategoryDataType = BaseDataType;
export type menuCategoryDataType = BaseDataType;

export interface GalleryDataType extends BaseDataType {
  date: string;
  author: string;
  category: string;
}

export type StaticDataType = {
  navbar: NavbarDataType[];
  social: SocialDataType[];
  HomeSlider: SliderDataType[];
  intro: IntroDataType[];
  status: StatusDataType[];
  roomCategory: RoomCategoryDataType[];
  menuCategory: menuCategoryDataType[];
  galleryCategory: string[];
  gallery: GalleryDataType[];
};
