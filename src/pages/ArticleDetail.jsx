import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { getArticleBySlug, getRelatedArticles } from '../data/newsData';
import ArticleContent from '../components/article/ArticleContent';
import ShareButtons from '../components/article/ShareButtons';
import RelatedArticles from '../components/article/RelatedArticles';
import CommentSection from '../components/article/CommentSection';
import Breadcrumb from '../components/common/Breadcrumb';
import RightSidebar from '../components/layout/RightSidebar';
import Loader from '../components/common/Loader';

const ArticleDetail = () => {
    const { t } = useTranslation();
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log('📰 ArticleDetail: Fetching article:', slug);

                // IMPORTANT: await the async function
                const fetchedArticle = await getArticleBySlug(slug);

                if (!fetchedArticle) {
                    console.log('❌ ArticleDetail: Article not found');
                    setNotFound(true);
                    setLoading(false);
                    return;
                }

                console.log('✅ ArticleDetail: Article found:', fetchedArticle.title);

                // Fetch related articles
                const fetchedRelatedArticles = await getRelatedArticles(
                    fetchedArticle.id,
                    fetchedArticle.category
                );

                console.log('✅ ArticleDetail: Related articles:', fetchedRelatedArticles.length);

                setArticle(fetchedArticle);
                setRelatedArticles(fetchedRelatedArticles);
                setLoading(false);
            } catch (err) {
                console.error('❌ ArticleDetail: Error fetching article:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]); // Re-fetch when slug changes

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center py-8">
                    <p className="text-red-500 text-xl mb-4">❌ Error: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-primary text-white px-6 py-2 rounded hover:bg-accent"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (notFound || !article) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="mt-[140px] min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <Breadcrumb
                    items={[
                        { label: article.category, link: `/category/${article.category.toLowerCase()}` },
                        { label: article.title.substring(0, 50) + '...' }
                    ]}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Main Content - 8 columns */}
                    <div className="lg:col-span-8">
                        <ArticleContent article={article} />
                        <div className="mt-8">
                            <CommentSection />
                        </div>
                        {relatedArticles.length > 0 && (
                            <div className="mt-8">
                                <RelatedArticles articles={relatedArticles} />
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - 4 columns */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-[150px] space-y-6">
                            <ShareButtons article={article} />
                            <RightSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;