// src/data/newsData.js

export const categories = ['Home', 'India', 'World', 'Business', 'Technology', 'Sports', 'Entertainment', 'Lifestyle'];

let allArticles = [];
let isLoading = false;
let isDataFetched = false;
let currentLanguage = null;

const LANGUAGE_MAP = {
    'en': 'ENGLISH',
    'te': 'TELUGU',
    'hi': 'HINDI',
    'ta': 'TAMIL',
    'kn': 'KANNADA'
};

const getCurrentLanguage = () => {
    const i18nLang = localStorage.getItem('i18nextLng') || 'en';
    return LANGUAGE_MAP[i18nLang] || 'ENGLISH';
};

// ✅ ALWAYS use proxy path - Works in both dev and production
const getApiUrl = (language) => {
    return `/api/news/posts?language=${language}`;
};

export const fetchNewsData = async (forceRefresh = false) => {
    const apiLanguage = getCurrentLanguage();

    if (currentLanguage && currentLanguage !== apiLanguage) {
        console.log('🌐 Language changed to:', apiLanguage);
        isDataFetched = false;
        allArticles = [];
    }

    if (isLoading || (isDataFetched && !forceRefresh)) {
        console.log('📦 Cached articles:', allArticles.length);
        return allArticles;
    }

    isLoading = true;
    currentLanguage = apiLanguage;

    try {
        const apiUrl = getApiUrl(apiLanguage);

        console.log('═══════════════════════════════════════════');
        console.log('📡 Fetching from:', apiUrl);
        console.log('🌐 Language:', currentLanguage);

        // ✅ Simple fetch - NO custom headers (CORS safe)
        const response = await fetch(apiUrl);

        console.log('📥 Status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Response received');
        console.log('📊 Success:', data.success);
        console.log('📊 Total:', data.total);

        let articlesArray = [];

        if (data.info && Array.isArray(data.info)) {
            articlesArray = data.info;
            console.log('✅ Found in data.info:', articlesArray.length);
        } else if (Array.isArray(data)) {
            articlesArray = data;
        } else if (data.data && Array.isArray(data.data)) {
            articlesArray = data.data;
        } else if (data.posts && Array.isArray(data.posts)) {
            articlesArray = data.posts;
        }

        if (articlesArray.length > 0) {
            console.log('🔍 First article keys:', Object.keys(articlesArray[0]));
        }

        allArticles = articlesArray.map((article, index) => ({
            id: article.id || article._id || article.post_id || article.newsId || index + 1,
            title: article.title || article.heading || article.headline || article.newsTitle || 'No Title',
            slug: article.slug || article.url_slug || article.seoUrl || createSlug(article.title || article.heading || article.newsTitle),
            category: article.category || article.cat || article.section || article.categoryName || 'Home',
            excerpt: article.excerpt || article.description || article.summary || article.shortDesc || article.short_description || '',
            content: article.content || article.body || article.fullContent || article.newsContent || article.text || '',
            image: article.image || article.featured_image || article.thumbnail || article.img || article.imageUrl || article.photo || article.newsImage || '/placeholder.jpg',
            author: article.author || article.authorName || article.author_name || article.writer || article.postedBy || 'Admin',
            date: article.date || article.createdAt || article.created_at || article.publishedAt || article.published_at || article.publishDate || article.newsDate || new Date().toISOString(),
            time: article.time || article.readingTime || article.timeAgo || formatDate(article.date || article.createdAt || article.publishedAt),
            trending: article.trending || article.isTrending || article.is_trending || article.isFeatured || article.featured || false,
            tags: article.tags || article.keywords || [],
            views: article.views || article.viewCount || article.view_count || article.readCount || 0,
        }));

        isDataFetched = true;

        console.log('✅ Loaded:', allArticles.length, 'articles');
        const cats = [...new Set(allArticles.map(a => a.category))];
        console.log('📂 Categories:', cats);
        console.log('═══════════════════════════════════════════');

        return allArticles;
    } catch (error) {
        console.error('═══════════════════════════════════════════');
        console.error('❌ ERROR:', error.message);
        console.error('═══════════════════════════════════════════');
        isDataFetched = false;
        return [];
    } finally {
        isLoading = false;
    }
};

const createSlug = (title) => {
    if (!title) return 'untitled';
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
};

const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    try {
        const date = new Date(dateString);
        const i18nLang = localStorage.getItem('i18nextLng') || 'en';
        const locales = { 'en': 'en-US', 'te': 'te-IN', 'hi': 'hi-IN', 'ta': 'ta-IN', 'kn': 'kn-IN' };
        return date.toLocaleDateString(locales[i18nLang] || 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
        return 'Recent';
    }
};

export const getAllArticles = async () => {
    const apiLang = getCurrentLanguage();
    if (!isDataFetched || currentLanguage !== apiLang) await fetchNewsData();
    return allArticles;
};

export const getArticleBySlug = async (slug) => {
    const apiLang = getCurrentLanguage();
    if (!isDataFetched || currentLanguage !== apiLang) await fetchNewsData();
    return allArticles.find(article => article.slug === slug);
};

export const getArticlesByCategory = async (category) => {
    const apiLang = getCurrentLanguage();
    if (!isDataFetched || currentLanguage !== apiLang) await fetchNewsData();
    if (category === 'Home' || !category) return allArticles;
    return allArticles.filter(article => article.category?.toLowerCase() === category.toLowerCase());
};

export const getTrendingArticles = async () => {
    const apiLang = getCurrentLanguage();
    if (!isDataFetched || currentLanguage !== apiLang) await fetchNewsData();
    const trending = allArticles.filter(article => article.trending).slice(0, 5);
    return trending.length > 0 ? trending : allArticles.slice(0, 5);
};

export const getRelatedArticles = async (currentArticleId, category, limit = 3) => {
    const apiLang = getCurrentLanguage();
    if (!isDataFetched || currentLanguage !== apiLang) await fetchNewsData();
    return allArticles
        .filter(article => article.id !== currentArticleId && article.category?.toLowerCase() === category?.toLowerCase())
        .slice(0, limit);
};

export const searchArticles = async (query) => {
    const apiLang = getCurrentLanguage();
    if (!isDataFetched || currentLanguage !== apiLang) await fetchNewsData();
    const lowerQuery = query.toLowerCase();
    return allArticles.filter(article =>
        article.title?.toLowerCase().includes(lowerQuery) ||
        article.excerpt?.toLowerCase().includes(lowerQuery) ||
        article.content?.toLowerCase().includes(lowerQuery) ||
        article.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
};

export const getLoadingState = () => isLoading;

export const refreshNewsData = async () => {
    console.log('🔄 Refreshing...');
    isDataFetched = false;
    allArticles = [];
    currentLanguage = null;
    return await fetchNewsData(true);
};

export const getCachedLanguage = () => currentLanguage;

export { allArticles };