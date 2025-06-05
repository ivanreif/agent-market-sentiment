import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

// Define types for RSS feed items based on actual feed structure
interface CategoryObject {
  _: string;
  $: {
    domain: string;
  };
}

interface MediaObject {
  $: {
    url: string;
    type: string;
    medium: string;
  };
}

interface CustomItem extends Parser.Item {
  author?: string;
  creator?: string;
  content?: string;
  media?: MediaObject;
}

interface NewsItem {
  title?: string;
  link?: string;
  pubDate?: string;
  author?: string;
  content?: string;
  categories?: (string | CategoryObject)[];
  media?: MediaObject;
  source: string;
}

const parser = new Parser({
  customFields: {
    item: [
      ['content:encoded', 'content'],
      ['dc:creator', 'author'],
      ['media:content', 'media'],
    ],
  },
});

async function fetchFeed(url: string, source: string): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(url);
    return feed.items.map((item: CustomItem) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      author: item.author || item.creator,
      content: item.content,
      categories: item.categories || [],
      media: item.media,
      source
    }));
  } catch (error) {
    console.error(`Error fetching ${source} feed:`, error);
    return [];
  }
}

export async function GET() {
  try {
    // Fetch from both feeds concurrently
    const [coindeskNews, bitcoinMagNews] = await Promise.all([
      fetchFeed('https://www.coindesk.com/arc/outboundfeeds/rss/', 'CoinDesk'),
      fetchFeed('https://bitcoinmagazine.com/.rss/full/', 'Bitcoin Magazine')
    ]);

    // Combine and sort by date
    const allNews = [...coindeskNews, ...bitcoinMagNews].sort((a, b) => {
      return new Date(b.pubDate || '').getTime() - new Date(a.pubDate || '').getTime();
    });

    // Return the news with proper attribution
    return NextResponse.json({
      data: allNews,
      attribution: "News data provided by CoinDesk and Bitcoin Magazine",
      lastUpdated: new Date().toISOString(),
      totalItems: allNews.length,
      sources: {
        coindesk: coindeskNews.length,
        bitcoinMagazine: bitcoinMagNews.length
      }
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news data' },
      { status: 500 }
    );
  }
}
