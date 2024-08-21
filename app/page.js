"use client";
import Wordy from "@/components/Wordy";
import { application } from "@/const";
import useFetchWord from "@/hooks/useFetchWord";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

export default function Home() {
  const { solution } = useFetchWord();
  return (
    <div className={styles.container}>
      <Head>
        <title>{application.longName}</title>
        <meta name="description" content={application.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>{application.name}</h1>
      </header>

      <main className={styles.main}>
        {solution && <Wordy solution={solution} />}
      </main>

      <footer className={styles.footer}>
        <p>{application.footerLabel}</p>
      </footer>
    </div>
  );
}
