import Head from 'next/head'
import styles from './home.module.scss'
import {SubscribeButton} from "../components/SubscribeButton";
import {GetStaticProps} from "next";
import {stripe} from "../services/stripe";

type HomeProps = {
    product: {
        priceId: string,
        amount: string,
    }
}

export default function Home({ product }: HomeProps) {

  return (
    <>
      <Head>
        <title>Home | Ig.News</title>
      </Head>
      <main className={styles.contentContainer}>
          <section className={styles.hero}>
              <span>👏 Hey, welcome</span>
              <h1>News about<br /> the <span>React</span> world.</h1>
              <p>
                  Get access to all the publications<br />
                  <span>for { product.amount } month</span>
              </p>
              <SubscribeButton />
          </section>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src='/images/avatar.svg' alt='Girl coding' />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
    const price = await stripe.prices.retrieve('price_1Kyn0FDbJLTy7qDHCN2GtziT')

    const product = {
        priceId: price.id,
        amount: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'BRL',
        }).format(Number(price.unit_amount) / 100),
    }

    return {
        props: {
            product,
        },
        revalidate: 60 * 60 * 24 // 24 Horas
    }
}
