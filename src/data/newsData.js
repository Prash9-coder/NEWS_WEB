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

export const fetchNewsData = async (forceRefresh = false) => {
    const apiLanguage = getCurrentLanguage();

    if (currentLanguage && currentLanguage !== apiLanguage) {
        console.log('🌐 Language changed to:', apiLanguage);
        isDataFetched = false;
        allArticles = [];
    }

    if (isLoading || (isDataFetched && !forceRefresh)) {
        console.log('📦 Cached:', allArticles.length);
        return allArticles;
    }

    isLoading = true;
    currentLanguage = apiLanguage;

    try {
        // ✅ ALWAYS use /api/ - Works in dev (vite proxy) AND prod (vercel proxy)
        const apiUrl = '/api/news/posts';

        console.log('═══════════════════════════════════════════');
        console.log('📡 Fetching:', apiUrl);
        console.log('🌐 Language:', currentLanguage);

        // ✅ Now header will work because proxy bypasses CORS!
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'language': currentLanguage,
            },
        });

        console.log('📥 Status:', response.status);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        console.log('✅ Success:', data.success, '| Total:', data.total);

        let articlesArray = data.info || data.data || data.posts || (Array.isArray(data) ? data : []);
        console.log('📰 Articles found:', articlesArray.length);

        allArticles = articlesArray.map((article, index) => ({
            id: article.id || article._id || index + 1,
            title: article.title || article.heading || 'No Title',
            slug: article.slug || createSlug(article.title),
            category: article.category || article.cat || 'Home',
            excerpt: article.excerpt || article.description || '',
            content: article.content || article.body || '',
            image: article.image || article.thumbnail || article.img || '/placeholder.jpg',
            author: article.author || 'Admin',
            date: article.date || article.createdAt || new Date().toISOString(),
            time: formatDate(article.date || article.createdAt),
            trending: article.trending || article.featured || false,
            tags: article.tags || [],
            views: article.views || 0,
        }));

        isDataFetched = true;
        console.log('✅ Loaded:', allArticles.length);
        console.log('═══════════════════════════════════════════');

        return allArticles;
    } catch (error) {
        console.error('❌ ERROR:', error.message);
        isDataFetched = false;
        return [];
    } finally {
        isLoading = false;
    }
};

const createSlug = (title) => {
    if (!title) return 'untitled';
    return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim();
};

const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    try {
        return new Date(dateString).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return 'Recent'; }
};

export const getAllArticles = async () => {
    if (!isDataFetched || currentLanguage !== getCurrentLanguage()) await fetchNewsData();
    return allArticles;
};

export const getArticleBySlug = async (slug) => {
    if (!isDataFetched) await fetchNewsData();
    return allArticles.find(a => a.slug === slug);
};

export const getArticlesByCategory = async (category) => {
    if (!isDataFetched) await fetchNewsData();
    if (!category || category === 'Home') return allArticles;
    return allArticles.filter(a => a.category?.toLowerCase() === category.toLowerCase());
};

export const getTrendingArticles = async () => {
    if (!isDataFetched) await fetchNewsData();
    const trending = allArticles.filter(a => a.trending).slice(0, 5);
    return trending.length ? trending : allArticles.slice(0, 5);
};

export const getRelatedArticles = async (id, category, limit = 3) => {
    if (!isDataFetched) await fetchNewsData();
    return allArticles.filter(a => a.id !== id && a.category?.toLowerCase() === category?.toLowerCase()).slice(0, limit);
};

export const searchArticles = async (query) => {
    if (!isDataFetched) await fetchNewsData();
    const q = query.toLowerCase();
    return allArticles.filter(a => a.title?.toLowerCase().includes(q) || a.excerpt?.toLowerCase().includes(q));
};

export const refreshNewsData = async () => {
    isDataFetched = false;
    allArticles = [];
    currentLanguage = null;
    return await fetchNewsData(true);
};

export const getLoadingState = () => isLoading;
export const getCachedLanguage = () => currentLanguage;
export { allArticles };