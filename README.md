# Market Sentiment Analysis Agent

This agent provides real-time market sentiment analysis using the Fear and Greed Index and cryptocurrency news from multiple sources. Built with Next.js and the Bitte Protocol, it offers comprehensive market sentiment insights and analysis.

## Features

- 🤖 Market Sentiment Analysis
- 📊 Fear and Greed Index Integration
- 📰 Multi-source Cryptocurrency News
- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS for styling
- 📝 TypeScript support
- 🔄 Hot reload development environment

## Quick Start

1. Clone this repository
2. Configure environment variables (create a `.env` or `.env.local` file)

```bash
# Get your API key from https://key.bitte.ai
BITTE_API_KEY='your-api-key'

ACCOUNT_ID='your-account.near'
```

3. Install dependencies:

```bash
pnpm install
```

4. Start the development server:

```bash
pnpm run dev
```

This will:
- Start your Next.js application
- Launch make-agent
- Prompt you to sign a message in Bitte wallet to create an API key
- Launch your agent in the Bitte playground
- Allow you to freely edit and develop your code in the playground environment

5. Build the project locally:

```bash
pnpm run build:dev
```

This will build the project and not trigger `make-agent deploy`

- using just `build` will trigger make-agent deploy and not work unless you provide your deployed plugin url using the `-u` flag.

## Available Tools

The agent includes two powerful market sentiment analysis tools:

### 1. Fear and Greed Index

- Endpoint: `/api/tools/sentiment`
- Provides real-time market sentiment data from Alternative.me
- Returns:
  - Current Fear and Greed Index value (0-100)
  - Value classification (Extreme Fear to Extreme Greed)
  - Timestamp and update information
  - Required attribution

### 2. Cryptocurrency News Aggregator

- Endpoint: `/api/tools/news`
- Aggregates news from multiple sources:
  - CoinDesk
  - Bitcoin Magazine
- Returns:
  - Latest news articles with titles, links, and content
  - Publication dates and authors
  - Categories and media content
  - Source attribution and update timestamps
  - Article counts per source

## AI Agent Configuration

The agent is configured as a specialized market sentiment analysis assistant that:
- Analyzes market sentiment using multiple data points
- Provides insights into market psychology
- Helps users make informed decisions based on sentiment analysis
- Offers context and explanations for market indicators
- Aggregates and analyzes cryptocurrency news from multiple sources

The configuration is defined in `/.well-known/ai-plugin.json` and can be customized by modifying the configuration in `/api/ai-plugins/route.ts`.

## Deployment

1. Push your code to GitHub
2. Deploy to Vercel or your preferred hosting platform
3. Add your `BITTE_API_KEY` to the environment variables
4. The `make-agent deploy` command will automatically run during build

## Learn More

- [Bitte Protocol Documentation](https://docs.bitte.ai)
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Alternative.me Fear & Greed Index](https://alternative.me/crypto/fear-and-greed-index/)
- [CoinDesk RSS Feed](https://www.coindesk.com/arc/outboundfeeds/rss/)
- [Bitcoin Magazine RSS Feed](https://bitcoinmagazine.com/.rss/full/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
