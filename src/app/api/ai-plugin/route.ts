import { ACCOUNT_ID, PLUGIN_URL } from "@/app/config";
import { NextResponse } from "next/server";

export async function GET() {
    const pluginData = {
        openapi: "3.0.0",
        info: {
            title: "Market Sentiment Analysis",
            description: "API for analyzing market sentiment using various indicators including the Fear and Greed Index and cryptocurrency news from multiple sources",
            version: "1.0.0",
        },
        servers: [
            {
                url: PLUGIN_URL,
            },
        ],
        "x-mb": {
            "account-id": ACCOUNT_ID,
            assistant: {
                name: "Market Sentiment Assistant",
                description: "A specialized sentiment analysis assistant that helps users understand market sentiment through multiple data points and indicators. It provides insights into market psychology and helps make informed decisions based on sentiment analysis and cryptocurrency news from multiple sources.",
                instructions: "You analyze market sentiment using various indicators, with a primary focus on the Fear and Greed Index and cryptocurrency news from multiple sources. You help users understand market psychology and make informed decisions based on sentiment analysis. When discussing market sentiment, always provide context and explain what the indicators mean for market conditions.",
                tools: [{ type: "sign-message" }]
            },
        },
        paths: {
            "/api/tools/sentiment": {
                get: {
                    summary: "Get Fear and Greed Index",
                    description: "Retrieves the latest Fear and Greed Index data from Alternative.me. The Fear and Greed Index is a market sentiment indicator that measures the emotions and sentiments of the market. It ranges from 0 (Extreme Fear) to 100 (Extreme Greed).",
                    operationId: "getFearAndGreedIndex",
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            data: {
                                                type: "object",
                                                properties: {
                                                    value: {
                                                        type: "string",
                                                        description: "The current Fear and Greed Index value (0-100)"
                                                    },
                                                    value_classification: {
                                                        type: "string",
                                                        description: "The classification of the current value (e.g., 'Fear', 'Neutral', 'Greed')"
                                                    },
                                                    timestamp: {
                                                        type: "string",
                                                        description: "Unix timestamp of when the data was recorded"
                                                    },
                                                    time_until_update: {
                                                        type: "string",
                                                        description: "Time in seconds until the next update"
                                                    }
                                                }
                                            },
                                            attribution: {
                                                type: "string",
                                                description: "Required attribution to Alternative.me"
                                            }
                                        },
                                        required: ["data", "attribution"]
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Error response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                description: "Error message"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/tools/news": {
                get: {
                    summary: "Get Cryptocurrency News",
                    description: "Retrieves the latest cryptocurrency news from multiple sources including CoinDesk and Bitcoin Magazine. The news feed provides real-time updates on cryptocurrency markets, blockchain technology, and related financial news.",
                    operationId: "getCryptoNews",
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            data: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        title: {
                                                            type: "string",
                                                            description: "The title of the news article"
                                                        },
                                                        link: {
                                                            type: "string",
                                                            description: "URL to the full article"
                                                        },
                                                        pubDate: {
                                                            type: "string",
                                                            description: "Publication date of the article"
                                                        },
                                                        author: {
                                                            type: "string",
                                                            description: "Author of the article"
                                                        },
                                                        content: {
                                                            type: "string",
                                                            description: "The article content"
                                                        },
                                                        categories: {
                                                            type: "array",
                                                            items: {
                                                                type: "string"
                                                            },
                                                            description: "Categories or tags associated with the article"
                                                        },
                                                        media: {
                                                            type: "object",
                                                            description: "Media content associated with the article"
                                                        },
                                                        source: {
                                                            type: "string",
                                                            description: "The source of the news article (e.g., 'CoinDesk', 'Bitcoin Magazine')"
                                                        }
                                                    }
                                                }
                                            },
                                            attribution: {
                                                type: "string",
                                                description: "Required attribution to news sources"
                                            },
                                            lastUpdated: {
                                                type: "string",
                                                description: "Timestamp of the last feed update"
                                            },
                                            totalItems: {
                                                type: "integer",
                                                description: "Total number of news items in the feed"
                                            },
                                            sources: {
                                                type: "object",
                                                properties: {
                                                    coindesk: {
                                                        type: "integer",
                                                        description: "Number of articles from CoinDesk"
                                                    },
                                                    bitcoinMagazine: {
                                                        type: "integer",
                                                        description: "Number of articles from Bitcoin Magazine"
                                                    }
                                                }
                                            }
                                        },
                                        required: ["data", "attribution", "lastUpdated", "totalItems", "sources"]
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Error response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                description: "Error message"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    return NextResponse.json(pluginData);
}