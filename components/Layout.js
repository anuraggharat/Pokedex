import React from "react";
import Head from "next/Head";

export default function Layout({ title, children }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto w-75 p-20 bg-gray-100 pt-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
