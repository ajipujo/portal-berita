import { GrReactjs } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Index() {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);

    async function getNews() {
        console.log('Hello');

        const fetchNews = await fetch(`https://newsdata.io/api/1/news?apikey=pub_90521dc1f3f677330e888dcae2c80c776b9c&country=id&page=${page}`);

        const dataNews = await fetchNews.json();
        setPage(dataNews.nextPage);
        const newsSpread = [...news, ...dataNews.results];
        console.log(newsSpread);
        setNews(dataNews.results);
    }

    useEffect(() => {
        getNews();
    }, []);

    const getMoreNews = async () => {
        const getNewsData = await fetch(
            `https://newsdata.io/api/1/news?apikey=pub_90521dc1f3f677330e888dcae2c80c776b9c&country=id&page=${page}`
        );
        const responseData = await getNewsData.json();
        const { results, nextPage } = responseData;
        setNews((news) => [...news, ...results]);
        setPage(nextPage);
    };

    return (
        <>
            <Head>
                <title>Portal Berita</title>
            </Head>
            <div className='w-full md:w-1/3 mx-auto px-3'>
                <div className='w-full flex justify-between items-center my-3'>
                    <span className='text-xl font-bold'>Portal Berita</span>
                    <GrReactjs className='text-xl' />
                </div>
                <div className='w-full flex flex-wrap'>
                    <InfiniteScroll
                        dataLength={news.length}
                        next={getMoreNews}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                        >
                        {news.map((item, index) => (
                            <div className='w-full py-3' key={index}>
                                <div className='card border'>
                                    <div className='w-full flex flex-wrap'>
                                        <div className='w-full md:w-1/3 flex items-center justify-center rounded py-2 md:py-0'>
                                            <img src={item.image_url} alt="" className='w-full' />
                                        </div>
                                        <div className='w-full md:w-2/3 pl-0 md:pl-2'>
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
        </>
    )
}