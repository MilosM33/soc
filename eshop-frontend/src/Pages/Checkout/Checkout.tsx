import React, { useEffect } from "react";
import Layout from "../../Layout/Layout";

import StatusBar from "../../Components/StatusBar/StatusBar";

import { AiOutlineShoppingCart, AiFillEye } from "react-icons/ai";
import { MdOutlineLocalShipping, MdPayment } from "react-icons/md";
import Button from "../../Components/Forms/Button/Button";
import { IStepProps } from "../../Components/StatusBar/Step";
import { Outlet, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Checkout() {
  const cart = useSelector((state: any) => state.cart);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const [steps, setSteps] = useState<IStepProps[]>([
    {
      children: <AiOutlineShoppingCart></AiOutlineShoppingCart>,
      step: 0,
      completed: true,
      to: "cart",
      canClick: () => true,
    },
    {
      children: <MdOutlineLocalShipping></MdOutlineLocalShipping>,
      step: 1,
      canClick: () => true, //cart.items.length > 0,
      to: "shipping",
      completed: false,
    },
    {
      children: <MdPayment></MdPayment>,
      step: 2,
      completed: false,
      to: "choose-payment",
      canClick: () => true, //cart.items.length > 0,
    },
    {
      children: <AiFillEye></AiFillEye>,
      step: 3,
      completed: false,
      canClick: () => true, //cart.items.length > 0,
      to: "review",
    },
    {
      children: <MdPayment></MdPayment>,
      step: 3,
      completed: false,
      canClick: () => true, //cart.items.length > 0,
      to: "pay",
    },
  ]);

  function changeStep(step: number) {
    if (steps[step].completed) {
      setStep(step);
    }
  }

  function nextStep() {
    // && steps[step].completed;
    if (step < steps.length && steps[step + 1].canClick?.()) {
      setSteps((prev) => {
        const newSteps = [...prev];
        newSteps[step].completed = true;
        return newSteps;
      });

      setStep(step + 1);
    }

    console.log("test");
  }
  function prevStep() {
    if (step > 0) {
      setStep(step - 1);
    }
  }
  useEffect(() => {
    navigate(steps[step].to ?? "");
  }, [step]);
  return (
    <Layout className="mb-[32px]">
      <section className="flex flex-col container mx-auto">
        <StatusBar
          step={step}
          onStepChange={changeStep}
          steps={steps}
          className="lg:w-1/2 lg:mx-auto"
        ></StatusBar>

        <Outlet context={[prevStep, nextStep]}></Outlet>
      </section>
    </Layout>
  );
}
