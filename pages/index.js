import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout, { siteTitle } from '../components/Layout';

import Link from 'next/link'
import utilStyle from "../styles/utils.module.css"
import { getPostsData } from '../lib/post';

//SSGの場合、外部データがあるとgetStaticProps
export async function getStaticProps(){
  const allPostsData = getPostsData(); //id, title, date, thumbnail

  return{
    props:{
      allPostsData,
    },
  };
}

//SSRの場合
// export async function getServerSideProps(context){
//   return{
//     props:{
//       //コンポーネントに渡すためのprops(静的生成のAllpostData)
//     }
//   }
// }

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className='{utilStyle.headingMd}'>
        <p>
          私は人間です
        </p>
      </section>

      <section>
        <h2>✍エンジニアのブログ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({id, title, date, thumbnail}) => (
        <article key={id}>
        <Link href={`/posts/${id}`}>
        <img 
        src={`${thumbnail}`}
        className={styles.thumbnailImage} /></Link>
        <Link href={`/posts/${id}`}>
          <a className={utilStyle.boldText}>{title}</a>
        </Link>
        <br />
        <small className={utilStyle.lightText}>{date}</small>
      </article>

        ))}
      </div>
      </section>

    </Layout>

  )
}
