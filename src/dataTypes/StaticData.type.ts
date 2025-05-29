import {
  BaseDataType,
  DescriptionType,
  NavbarDataType,
  SocialDataType,
} from "./Main.type";

export interface SliderDataType extends BaseDataType, DescriptionType {
  route: string;
}
export interface StatusDataType extends BaseDataType {
  number: number;
  unit: string;
}

export interface IntroDataType extends BaseDataType, DescriptionType {}
export type RoomCategoryDataType = BaseDataType;
export type menuCategoryDataType = BaseDataType;

export type GalleryDataType = BaseDataType & {
  date: string;
  author: string;
  category: string;
}

export type StaticDataType = {
  navbar: NavbarDataType[];
	adminPanelNavbar: NavbarDataType[];
  social: SocialDataType[];
  HomeSlider: SliderDataType[];
  intro: IntroDataType[];
  status: StatusDataType[];
  roomCategory: RoomCategoryDataType[];
  menuCategory: menuCategoryDataType[];
  galleryCategory: string[];
  gallery: GalleryDataType[];
};
