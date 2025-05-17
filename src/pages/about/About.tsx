import React from "react";
import PageHeader from "../../components/template/pageHeader/PageHeader";
import Intro from "../../components/template/intro/Intro";
import Status from "../../components/template/status/Status";
import MenuCategory from "../../components/template/menuCategory/MenuCategory";
import Chefs from "../../components/template/chefs/Chefs";

export default function About() {
  return (
    <>
      <PageHeader title="درباره ما بیشتر بدانید" />
			<Intro />
			<Status />
			<MenuCategory />
			<Chefs />
    </>
  );
}
