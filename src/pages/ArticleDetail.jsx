import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getArticleBySlug, getRelatedArticles } from '../data/newsData';
import ArticleContent from '../components/article/ArticleContent';
import ShareButtons from '../components/article/ShareButtons';
import RelatedArticles from '../components/article/RelatedArticles';
import CommentSection from '../components/article/CommentSection';
import Breadcrumb from '../components/common/Breadcrumb';
import RightSidebar from '../components/layout/RightSidebar';

const ArticleDetail = () => {
    const { t } = useTranslation();
    const { slug } = useParams();
    const article = getArticleBySlug(slug);

    if (!article) {
        return <Navigate to="/404" replace />;
    }

    const relatedArticles = getRelatedArticles(article.id, article.category);

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
                        <div className="mt-8">
                            <RelatedArticles articles={relatedArticles} />
                        </div>
                    </div>

                    {/* Right Sidebar - 4 columns - FIXED POSITION */}
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