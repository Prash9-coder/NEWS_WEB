// src/data/newsData.js

// Categories for your website
export const categories = ['Home', 'India', 'World', 'Business', 'Technology', 'Sports', 'Entertainment', 'Lifestyle'];

let allArticles = [];
let isLoading = false;
let isDataFetched = false;
let currentLanguage = null;

// Language mapping - i18n code to API format
const LANGUAGE_MAP = {
    'en': 'ENGLISH',
    'te': 'TELUGU',
    'hi': 'HINDI',
    'ta': 'TAMIL',
    'kn': 'KANNADA'
};

// Get current language from localStorage or i18n
const getCurrentLanguage = () => {
    const i18nLang = localStorage.getItem('i18nextLng') || 'en';
    return LANGUAGE_MAP[i18nLang] || 'ENGLISH';
};

// Check if development mode
const isDev = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Fetch data from FastAPI backend
export const fetchNewsData = async (forceRefresh = false) => {
    const apiLanguage = getCurrentLanguage();

    // Check if language changed - refetch if yes
    if (currentLanguage && currentLanguage !== apiLanguage) {
        console.log('🌐 Language changed from', currentLanguage, 'to', apiLanguage);
        isDataFetched = false;
        allArticles = [];
        currentLanguage = apiLanguage;
    }

    // Already fetching or fetched aithe return
    if (isLoading || (isDataFetched && !forceRefresh)) {
        console.log('📦 Using cached articles:', allArticles.length, '| Language:', currentLanguage);
        return allArticles;
    }

    isLoading = true;
    currentLanguage = apiLanguage;

    try {
        console.log('═══════════════════════════════════════════');
        console.log('📡 Fetching news from API...');
        console.log('🌐 Language Header:', currentLanguage);
        console.log('🖥️ Mode:', isDev ? 'Development (Proxy)' : 'Production');

        // ✅ Use proxy in development, direct in production
        const apiUrl = isDev
            ? '/api/news/posts'  // Proxy URL (bypasses CORS)
            : 'https://api.dhuniya.in/news/posts';  // Direct URL

        console.log('🔗 URL:', apiUrl);

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'language': currentLanguage,  // 👈 ENGLISH, TELUGU, HINDI, etc.
            }
        });

        console.log('📥 Response Status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        console.log('✅ API Response received');
        console.log('📊 Success:', data.success);
        console.log('📊 Total available:', data.total);

        // ✅ Articles are in data.info
        let articlesArray = [];

        if (data.info && Array.isArray(data.info)) {
            articlesArray = data.info;
            console.log('✅ Found articles in data.info:', articlesArray.length);
        } else if (Array.isArray(data)) {
            articlesArray = data;
            console.log('✅ Found articles in root array:', articlesArray.length);
        } else if (data.data && Array.isArray(data.data)) {
            articlesArray = data.data;
            console.log('✅ Found articles in data.data:', articlesArray.length);
        } else if (data.posts && Array.isArray(data.posts)) {
            articlesArray = data.posts;
            console.log('✅ Found articles in data.posts:', articlesArray.length);
        } else {
            console.log('⚠️ No articles found in response');
            articlesArray = [];
        }

        // Log first article structure
        if (articlesArray.length > 0) {
            console.log('═══════════════════════════════════════════');
            console.log('🔍 FIRST ARTICLE STRUCTURE:');
            console.log(articlesArray[0]);
            console.log('🔑 AVAILABLE FIELDS:', Object.keys(articlesArray[0]));
            console.log('═══════════════════════════════════════════');
        }

        // Data mapping - API format to your format
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

        console.log('═══════════════════════════════════════════');
        console.log('✅ SUCCESS! Total Articles Loaded:', allArticles.length);

        // Log mapped first article
        if (allArticles.length > 0) {
            console.log('🔄 MAPPED FIRST ARTICLE:');
            console.log('   Title:', allArticles[0].title);
            console.log('   Category:', allArticles[0].category);
            console.log('   Slug:', allArticles[0].slug);
        }

        // Log all categories found
        const foundCategories = [...new Set(allArticles.map(a => a.category))];
        console.log('📂 Categories Found:', foundCategories);
        console.log('═══════════════════════════════════════════');

        return allArticles;
    } catch (error) {
        console.error('❌ ERROR FETCHING NEWS:', error.message);
        console.error('Full Error:', error);
        isDataFetched = false;
        return [];
    } finally {
        isLoading = false;
    }
};

// Helper: Create slug from title
const createSlug = (title) => {
    if (!title) return 'untitled';
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
};

// Helper: Format date
const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    try {
        const date = new Date(dateString);
        const i18nLang = localStorage.getItem('i18nextLng') || 'en';

        // Different date formats for different languages
        const locales = {
            'en': 'en-US',
            'te': 'te-IN',
            'hi': 'hi-IN',
            'ta': 'ta-IN',
            'kn': 'kn-IN'
        };

        return date.toLocaleDateString(locales[i18nLang] || 'en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    } catch {
        return 'Recent';
    }
};

// Get all articles (fetch if not loaded)
export const getAllArticles = async () => {
    const apiLang = getCurrentLanguage();
    if (!isDataFetched || currentLanguage !== apiLang) {
        await fetchNewsData();
    }
    return allArticles;
};

// Get article by slug
export const getArticleBySlug = async (slug) => {
    const apiLang = getCurrentLanguage();
    if (!isDataFetched || currentLanguage !== apiLang) {
        await fetchNewsData();
    }
    return allArticles.find(article => article.slug === slug);
};

// Get articles by category
export const getArticlesByCategory = async (category) => {
    const apiLang = getCurrentLanguage();
    if (!isDataFetched || currentLanguage !== apiLang) {
        await fetchNewsData();
    }

    if (category === 'Home' || !category) return allArticles;

    return allArticles.filter(article =>
        article.category?.toLowerCase() === category.toLowerCase()
    );
};

// Get trending articles - ALWAYS RETURNS ARRAY
export const getTrendingArticles = async () => {
    const apiLang = getCurrentLanguage();
    if (!isDataFetched || currentLanguage !== apiLang) {
        await fetchNewsData();
    }

    const trending = allArticles.filter(article => article.trending).slice(0, 5);

    // If no trending, return latest 5
    if (trending.length === 0) {
        return allArticles.slice(0, 5);
    }

    return trending;
};

// Get related articles
export const getRelatedArticles = async (currentArticleId, category, limit = 3) => {
    const apiLang = getCurrentLanguage();
    if (!isDataFetched || currentLanguage !== apiLang) {
        await fetchNewsData();
    }

    return allArticles
        .filter(article =>
            article.id !== currentArticleId &&
            article.category?.toLowerCase() === category?.toLowerCase()
        )
        .slice(0, limit);
};

// Search articles
export const searchArticles = async (query) => {
    const apiLang = getCurrentLanguage();
    if (!isDataFetched || currentLanguage !== apiLang) {
        await fetchNewsData();
    }

    const lowerQuery = query.toLowerCase();
    return allArticles.filter(article =>
        article.title?.toLowerCase().includes(lowerQuery) ||
        article.excerpt?.toLowerCase().includes(lowerQuery) ||
        article.content?.toLowerCase().includes(lowerQuery) ||
        article.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
};

// Get loading state
export const getLoadingState = () => isLoading;

// Force refresh data
export const refreshNewsData = async () => {
    console.log('🔄 Force refreshing data...');
    isDataFetched = false;
    allArticles = [];
    currentLanguage = null;
    return await fetchNewsData(true);
};

// Get current cached language
export const getCachedLanguage = () => currentLanguage;

// Export the allArticles array
export { allArticles };