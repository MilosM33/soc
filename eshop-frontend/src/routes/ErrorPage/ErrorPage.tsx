import React from "react";
import Layout from "../../components/Layout/Layout";

export interface IErrorPageProps {
  title: string;
  message: string;
  children?: JSX.Element;
}

export default function PageNotFound(props: IErrorPageProps) {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-4xl font-bold">{props.title}</h1>
        <p className="text-xl mt-2">{props.message}</p>
        {props.children}
      </div>
    </Layout>
  );
}
