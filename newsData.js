// src/data/newsData.js

export const categories = ['Home', 'India', 'World', 'Business', 'Technology', 'Sports', 'Entertainment', 'Lifestyle'];

let allArticles = [];
let isLoading = false;
let isDataFetched = false;
let currentLanguage = null;
let currentCategory = null;

// ✅ News API Key from environment variables
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// ✅ Check if API key exists on load
if (!API_KEY) {
    console.error('❌ VITE_NEWS_API_KEY is missing in .env file!');
}

const LANGUAGE_MAP = {
    'en': 'en',
    'te': 'en', // Telugu - fallback to English (NewsAPI doesn't support Telugu)
    'hi': 'hi',
    'ta': 'en', // Tamil - fallback
    'kn': 'en', // Kannada - fallback
};

// ✅ Category to NewsAPI query mapping
const CATEGORY_QUERIES = {
    'home': 'india news',
    'india': 'india',
    'world': 'world international',
    'politics': 'politics government',
    'business': 'business economy finance',
    'technology': 'technology tech AI software',
    'sports': 'sports cricket football IPL',
    'entertainment': 'entertainment bollywood movies',
    'lifestyle': 'lifestyle health food travel',
};

const getCurrentLanguage = () => {
    const i18nLang = localStorage.getItem('i18nextLng') || 'en';
    return LANGUAGE_MAP[i18nLang] || 'en';
};

// ✅ Fetch from NewsAPI
export const fetchNewsData = async (category = 'home', forceRefresh = false) => {
    // ✅ Check API key first
    if (!API_KEY) {
        console.error('❌ API Key is missing! Add VITE_NEWS_API_KEY to your .env file');
        return [];
    }

    const apiLanguage = getCurrentLanguage();
    const normalizedCategory = category?.toLowerCase() || 'home';

    // Check if already loading
    if (isLoading) {
        console.log('⏳ Already loading...');
        while (isLoading) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return allArticles;
    }

    // Check cache
    if (isDataFetched && !forceRefresh && currentCategory === normalizedCategory) {
        console.log('📦 Using cache:', allArticles.length);
        return allArticles;
    }

    isLoading = true;
    currentLanguage = apiLanguage;
    currentCategory = normalizedCategory;

    try {
        const query = CATEGORY_QUERIES[normalizedCategory] || normalizedCategory;

        // ✅ NewsAPI URL - Fixed: Using API_KEY instead of NEWS_API_KEY
        const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=${apiLanguage}&sortBy=publishedAt&pageSize=50&apiKey=${API_KEY}`;

        console.log('═══════════════════════════════════════════');
        console.log('📡 NewsAPI Request');
        console.log('   Category:', normalizedCategory);
        console.log('   Query:', query);
        console.log('   Language:', apiLanguage);

        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP ${response.status}`);
        }

        const data = await response.json();

        console.log('📥 Status:', data.status);
        console.log('📥 Total Results:', data.totalResults);

        if (data.status !== 'ok' || !data.articles) {
            throw new Error('Invalid API response');
        }

        // ✅ Map NewsAPI response to our format
        allArticles = data.articles
            .filter(article => article.title && article.title !== '[Removed]')
            .map((article, index) => ({
                id: `news-${Date.now()}-${index}`,
                title: article.title || 'No Title',
                slug: createSlug(article.title),
                category: normalizedCategory,
                excerpt: article.description || '',
                content: article.content || article.description || '',
                image: article.urlToImage || '/placeholder.jpg',
                author: article.author || article.source?.name || 'News Agency',
                date: article.publishedAt || new Date().toISOString(),
                time: formatDate(article.publishedAt),
                trending: index < 5,
                tags: [],
                views: Math.floor(Math.random() * 1000),
                sourceUrl: article.url,
                sourceName: article.source?.name || 'Unknown',
            }));

        isDataFetched = true;

        console.log('✅ Loaded:', allArticles.length, 'articles');
        console.log('═══════════════════════════════════════════');

        return allArticles;

    } catch (error) {
        console.error('❌ NewsAPI Error:', error.message);
        isDataFetched = false;
        allArticles = [];
        return [];
    } finally {
        isLoading = false;
    }
};

// ✅ Helper: Create URL-friendly slug
const createSlug = (title) => {
    if (!title) return 'untitled';
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 60)
        .trim();
};

// ✅ Helper: Format date
const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    try {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    } catch {
        return 'Recent';
    }
};

// ✅ Get all articles (for home page)
export const getAllArticles = async () => {
    console.log('📋 getAllArticles()');
    await fetchNewsData('home');
    return allArticles;
};

// ✅ Get articles by category
export const getArticlesByCategory = async (category, subcategory = null) => {
    console.log('📁 getArticlesByCategory:', category, subcategory);

    const cat = subcategory || category || 'home';
    await fetchNewsData(cat, true); // Force refresh for new category

    return allArticles;
};

// ✅ Get article by slug
export const getArticleBySlug = async (slug) => {
    console.log('🔍 getArticleBySlug:', slug);

    if (allArticles.length === 0) {
        await fetchNewsData('home');
    }

    return allArticles.find(a => a.slug === slug);
};

// ✅ Get trending articles
export const getTrendingArticles = async () => {
    console.log('🔥 getTrendingArticles()');

    if (allArticles.length === 0) {
        await fetchNewsData('home');
    }

    return allArticles.filter(a => a.trending).slice(0, 5);
};

// ✅ Get related articles
export const getRelatedArticles = async (id, category, limit = 3) => {
    console.log('🔗 getRelatedArticles()');

    return allArticles
        .filter(a => a.id !== id)
        .slice(0, limit);
};

// ✅ Search articles - Fixed: Using API_KEY instead of NEWS_API_KEY
export const searchArticles = async (query) => {
    console.log('🔍 searchArticles:', query);

    if (!query) return [];

    // ✅ Check API key
    if (!API_KEY) {
        console.error('❌ API Key is missing!');
        return [];
    }

    // ✅ Fixed: Using API_KEY
    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=${getCurrentLanguage()}&sortBy=relevancy&pageSize=20&apiKey=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 'ok' && data.articles) {
            return data.articles
                .filter(article => article.title && article.title !== '[Removed]')
                .map((article, index) => ({
                    id: `search-${Date.now()}-${index}`,
                    title: article.title,
                    slug: createSlug(article.title),
                    category: 'search',
                    excerpt: article.description || '',
                    image: article.urlToImage || '/placeholder.jpg',
                    author: article.author || article.source?.name || 'News Agency',
                    date: article.publishedAt,
                    time: formatDate(article.publishedAt),
                    sourceUrl: article.url,
                    sourceName: article.source?.name || 'Unknown',
                }));
        }
    } catch (error) {
        console.error('❌ Search error:', error);
    }

    return [];
};

// ✅ Refresh data
export const refreshNewsData = async () => {
    console.log('🔄 Refreshing...');
    isDataFetched = false;
    allArticles = [];
    currentCategory = null;
    return await fetchNewsData('home', true);
};

// ✅ Utility exports
export const getLoadingState = () => isLoading;
export const getCachedLanguage = () => currentLanguage;
export const getDataFetchedState = () => isDataFetched;
export const getCachedArticlesCount = () => allArticles.length;

// ✅ Debug function
export const debugState = () => {
    console.log('═══════════════════════════════════════════');
    console.log('🐛 DEBUG STATE');
    console.log('   API Key:', API_KEY ? '✅ Loaded' : '❌ Missing');
    console.log('   Loading:', isLoading);
    console.log('   Fetched:', isDataFetched);
    console.log('   Language:', currentLanguage);
    console.log('   Category:', currentCategory);
    console.log('   Articles:', allArticles.length);
    console.log('═══════════════════════════════════════════');
};

export { allArticles };