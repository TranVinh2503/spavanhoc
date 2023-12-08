import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/Hero-Section/HeroSection";
import Company from "../components/Company-section/Company";
import About from "../components/About-us/About";
import Courses from "../components/Courses-section/Courses";
import ChooseUs from "../components/Choose-us/ChooseUs";
import Features from "../components/Feature-section/Features";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <Fragment>
      <Header />
      <HeroSection />
      <Company />
      <About />
      <Courses/>
      <ChooseUs />
      <Features />
      <Footer />
      <Outlet />
    </Fragment>
  );
}

export default Home;
