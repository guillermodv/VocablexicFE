"use client";
import Wordy from "@/components/Wordy";
import { application } from "@/const";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import "./index.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{application.longName}</title>
        <meta name="description" content={application.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header">
        <h1>{application.name}</h1>
      </header>
      <main className={styles.main}>
        <Wordy />
      </main>
    </div>
  );
}
